const axios = require('axios');
const fs = require('fs');
const yaml = require('js-yaml');


const PUBLISHERS = [
    {
        id: 'firebase.google.com',
        title: 'Firebase Plugins',
        docBase: 'https://firebase.google.com/docs/flutter',
        sourceBase: 'https://github.com/firebase/flutterfire/tree/main/packages/',
        apiBase: 'https://api.github.com/repos/firebase/flutterfire/contents/packages',
        branch: 'main',
        packageType: 'nested-same-name'
    },
    {
        id: 'supabase.io',
        title: 'Supabase Plugins',
        docBase: 'https://supabase.com/docs/reference/dart/start',
        sourceBase: 'https://github.com/supabase/supabase-flutter/tree/main/packages/',
        apiBase: 'https://api.github.com/repos/supabase/supabase-flutter/contents/packages',
        branch: 'main',
        packageType: 'root-level'
    },
    {
        id: 'amplify.aws',
        title: 'AWS Amplify Plugins',
        docBase: 'https://docs.amplify.aws/flutter',
        sourceBase: 'https://github.com/aws-amplify/amplify-flutter/tree/main/packages/',
        apiBase: 'https://api.github.com/repos/aws-amplify/amplify-flutter/contents/packages',
        branch: 'main',
        validPackages: [
            'amplify_analytics_pinpoint', 'amplify_api', 'amplify_auth_cognito',
            'amplify_authenticator', 'amplify_push_notifications', 'amplify_datastore',
            'amplify_flutter', 'amplify_storage_s3'
        ],
        packageType: 'whitelist'
    }
];


class GitHubService {
    static async fetchDirectories(apiUrl) {
        const response = await axios.get(apiUrl);
        return response.data.filter(item =>
            item.type === 'dir' && !item.name.startsWith('_')
        );
    }

    static async fetchSubDirectories(apiUrl, dirName) {
        const response = await axios.get(`${apiUrl}/${dirName}`);
        return response.data.filter(item =>
            item.type === 'dir' && !item.name.startsWith('_')
        );
    }
}


class PackageService {
    static async fetchGithubPackages(apiUrl, publisher) {
        try {
            let allPackages = [];

            switch (publisher.packageType) {
                case 'root-level':
                    const directories = await GitHubService.fetchDirectories(apiUrl);
                    allPackages = directories.map(dir => dir.name);
                    break;

                case 'nested-same-name':
                    allPackages = await this.handleNestedSameNamePackages(apiUrl);
                    break;

                case 'whitelist':
                    allPackages = await this.handleWhitelistPackages(publisher);
                    break;
            }

            return allPackages;
        } catch (error) {
            console.error('Failed to fetch GitHub package list:', error.message);
            return [];
        }
    }

    static async handleNestedSameNamePackages(apiUrl) {
        const packages = [];
        const directories = await GitHubService.fetchDirectories(apiUrl);

        for (const dir of directories) {
            try {
                const subDirectories = await GitHubService.fetchSubDirectories(apiUrl, dir.name);
                const matchingSubDir = subDirectories.find(subDir => subDir.name === dir.name);

                if (matchingSubDir) {
                    packages.push({ name: dir.name, parentDir: dir.name });
                }
                await this.delay();
            } catch (error) {
                console.log(`Skipping subdirectory scan for ${dir.name}: ${error.message}`);
            }
        }
        return packages;
    }

    static async handleWhitelistPackages(publisher) {
        const packages = [];
        const [owner, repo] = publisher.apiBase.split('github.com/repos/')[1].split('/contents')[0].split('/');

        for (const packageName of publisher.validPackages) {
            try {
                // 使用 GitHub API 搜索文件夹
                const searchUrl = `https://api.github.com/search/code?q=path:packages+filename:pubspec.yaml+repo:${owner}/${repo}`;
                const response = await axios.get(searchUrl);

                // 在搜索结果中查找匹配的包
                const matchingFile = response.data.items.find(item =>
                    item.path.endsWith(`/${packageName}/pubspec.yaml`)
                );

                if (matchingFile) {
                    // 从路径中提取父目录
                    const fullPath = matchingFile.path;
                    const parentPath = fullPath.substring('packages/'.length, fullPath.lastIndexOf('/'));

                    if (parentPath === packageName) {
                        packages.push(packageName);
                    } else {
                        packages.push({
                            name: packageName,
                            parentDir: parentPath
                        });
                    }
                }

                await this.delay(1000); // GitHub Search API 有更严格的速率限制
            } catch (error) {
                console.log(`Error searching for package ${packageName}: ${error.message}`);
            }
        }

        return packages;
    }

    static async fetchPackageInfo(publisher, packageInfo) {
        try {
            const repoPath = publisher.apiBase.split('github.com/repos/')[1].split('/contents')[0];
            const packageName = typeof packageInfo === 'string' ? packageInfo : packageInfo.name;
            const parentDir = typeof packageInfo === 'string' ? '' : packageInfo.parentDir;
            const packagePath = parentDir ? `${parentDir}/${packageName}` : packageName;

            const rawUrl = `https://raw.githubusercontent.com/${repoPath}/refs/heads/${publisher.branch}/packages/${packagePath}/pubspec.yaml`;
            console.log(`Trying to fetch: ${rawUrl}`);

            const response = await axios.get(rawUrl);
            const pubspec = yaml.load(response.data);
            return this.processPackageInfo(packageName, pubspec);
        } catch (error) {
            console.log(`Failed to fetch pubspec.yaml for package ${packageName}:`, error.message);
            return null;
        }
    }

    static processPackageInfo(packageName, pubspec) {
        const platforms = [];
        if (!pubspec.flutter || !pubspec.flutter?.plugin) {
            platforms.push('Android', 'iOS', 'web', 'macOS', 'Windows', 'Linux');
        } else if (pubspec.flutter?.plugin?.platforms) {
            const platformMap = {
                android: 'Android', ios: 'iOS', web: 'web',
                macos: 'macOS', windows: 'Windows', linux: 'Linux'
            };

            Object.entries(platformMap).forEach(([key, value]) => {
                if (pubspec.flutter.plugin.platforms[key]) platforms.push(value);
            });
        }

        return {
            name: packageName,
            platforms: platforms.join(', ')
        };
    }

    static delay(ms = 100) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}


class ReadmeService {
    static async writeToReadme(content, title) {
        const readmePaths = ['../README.md', '../README_CN.md'];

        for (const readmePath of readmePaths) {
            try {
                let readmeContent = fs.readFileSync(readmePath, 'utf-8');
                const pluginsStart = readmeContent.indexOf(`### [${title}`);

                if (pluginsStart === -1) {
                    console.error(`Section ${title} not found in ${readmePath}`);
                    continue;
                }

                const nextSectionStart = readmeContent.indexOf('\n##', pluginsStart + 1);
                const endPos = nextSectionStart === -1 ? readmeContent.length : nextSectionStart;

                const updatedContent =
                    readmeContent.slice(0, pluginsStart) +
                    content +
                    readmeContent.slice(endPos);

                fs.writeFileSync(readmePath, updatedContent, 'utf-8');
                console.log(`${readmePath} has been updated, section ${title} has been updated while preserving other content.`);
            } catch (error) {
                console.error(`Error updating ${readmePath}:`, error.message);
            }
        }
    }

    static generateTableContent(packages, publisher) {
        let content = `### [${publisher.title}](${publisher.docBase})\n\n`;
        content += `| pub.dev | View Source | Android | iOS | Web | MacOS | Windows | Linux |\n`;
        content += `| ------- | ----------- | ------- | --- | --- | ----- | ------- | ----- |\n`;

        for (const pkg of packages) {
            const platforms = new Set(pkg.platforms.split(', '));
            const platformSupport = {
                Android: platforms.has('Android') ? '✔' : 'N/A',
                iOS: platforms.has('iOS') ? '✔' : 'N/A',
                web: platforms.has('web') ? '✔' : 'N/A',
                macOS: platforms.has('macOS') ? '✔' : 'N/A',
                Windows: platforms.has('Windows') ? '✔' : 'N/A',
                Linux: platforms.has('Linux') ? '✔' : 'N/A'
            };

            const pubDevBadge = `[![${pkg.name} pub.dev badge](https://img.shields.io/pub/v/${pkg.name}.svg)](https://pub.dev/packages/${pkg.name})`;
            const viewSource = `[\`${pkg.name}\`](${publisher.sourceBase}${pkg.name})`;

            content += `| ${pubDevBadge} | ${viewSource} | ${platformSupport.Android} | ${platformSupport.iOS} | ${platformSupport.web} | ${platformSupport.macOS} | ${platformSupport.Windows} | ${platformSupport.Linux} |\n`;
        }

        return content;
    }
}


async function generateTable(publisher) {
    try {
        const githubPackages = await PackageService.fetchGithubPackages(publisher.apiBase, publisher);
        console.log(`Found ${githubPackages.length} packages on GitHub`);

        const packages = [];
        for (const packageInfo of githubPackages) {
            const packageData = await PackageService.fetchPackageInfo(publisher, packageInfo);
            if (packageData) {
                packages.push(packageData);
                await PackageService.delay(500);
            }
        }

        if (packages.length === 0) {
            console.error(`No package information successfully retrieved for ${publisher.title}`);
            process.exit(1);
        }

        const tableContent = ReadmeService.generateTableContent(packages, publisher);
        console.log(`Preview of generated table content:\n${tableContent.slice(0, 500)}...`);
        await ReadmeService.writeToReadme(tableContent, publisher.title);
    } catch (error) {
        console.error(`Error occurred while processing ${publisher.title}:`, error.message);
        process.exit(1);
    }
}

async function updateAll() {
    try {
        for (const publisher of PUBLISHERS) {
            await generateTable(publisher);
        }
        console.log('All updates completed');
    } catch (error) {
        console.error('Error occurred during the update process:', error.message);
        process.exit(1);
    }
}

updateAll();
