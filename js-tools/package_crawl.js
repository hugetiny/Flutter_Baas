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
        branch: 'main'
    },
    {
        id: 'supabase.io',
        title: 'Supabase Plugins',
        docBase: 'https://supabase.com/docs/reference/dart/start',
        sourceBase: 'https://github.com/supabase/supabase-flutter/tree/main/packages/',
        apiBase: 'https://api.github.com/repos/supabase/supabase-flutter/contents/packages',
        branch: 'main'
    },
    // {
    //     id: 'appwrite.io',
    //     title: 'Appwrite Plugins',
    //     docBase: 'https://appwrite.io/docs/quick-starts/flutter',
    // },
    // {
    //     id: 'amplify.aws',
    //     title: 'AWS Amplify Plugins',
    //     docBase: 'https://docs.amplify.aws/flutter',
    // },
    // {
    //     id: 'pocketbase.io',
    //     title: 'Pocketbase Plugins',
    //     docBase: 'https://pocketbase.io/docs',
    // }
];

// 获取 GitHub 仓库中的包名列表
async function fetchGithubPackages(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        return response.data
            .filter(item => item.type === 'dir' && !item.name.startsWith('_'))
            .map(item => item.name);
    } catch (error) {
        console.error('获取 GitHub 包列表失败:', error.message);
        return [];
    }
}

// 获取包的 pubspec.yaml 内容
async function fetchPackageInfo(publisher, packageName) {
    try {
        const repoPath = publisher.apiBase.split('github.com/repos/')[1].split('/contents')[0];
        let rawUrl = `https://raw.githubusercontent.com/${repoPath}/refs/heads/${publisher.branch}/packages/${packageName}/pubspec.yaml`;

        try {
            console.log(`尝试获取: ${rawUrl}`);
            const response = await axios.get(rawUrl);
            const pubspec = yaml.load(response.data);
            return processPackageInfo(packageName, pubspec);
        } catch (error) {
            rawUrl = `https://raw.githubusercontent.com/${repoPath}/refs/heads/${publisher.branch}/packages/${packageName}/${packageName}/pubspec.yaml`;
            console.log(`尝试二级目录: ${rawUrl}`);
            const response = await axios.get(rawUrl);
            const pubspec = yaml.load(response.data);
            return processPackageInfo(packageName, pubspec);
        }
    } catch (error) {
        console.log(`获取包 ${packageName} 的 pubspec.yaml 失败:`, error.message);
        return null;
    }
}

// 获取仓库的默认分支
async function getDefaultBranch(apiUrl) {
    try {
        const repoApiUrl = `https://api.github.com/repos/${apiUrl.split('github.com/')[1].split('/contents')[0]}`;
        const response = await axios.get(repoApiUrl);
        return response.data.default_branch;
    } catch (error) {
        console.error('获取默认分支失败:', error.message);
        return 'main'; // 默认返回 main
    }
}

// 处理包信息的辅助函数
function processPackageInfo(packageName, pubspec) {
    const platforms = [];
    if (!pubspec.flutter || !pubspec.flutter?.plugin) {
        platforms.push('Android', 'iOS', 'web', 'macOS', 'Windows', 'Linux');
    }
    else if (pubspec.flutter?.plugin?.platforms) {
        if (pubspec.flutter.plugin.platforms.android) platforms.push('Android');
        if (pubspec.flutter.plugin.platforms.ios) platforms.push('iOS');
        if (pubspec.flutter.plugin.platforms.web) platforms.push('web');
        if (pubspec.flutter.plugin.platforms.macos) platforms.push('macOS');
        if (pubspec.flutter.plugin.platforms.windows) platforms.push('Windows');
        if (pubspec.flutter.plugin.platforms.linux) platforms.push('Linux');
    }

    return {
        name: packageName,
        platforms: platforms.join(', ')
    };
}

// 提取公共写入 README 的方法
async function writeToReadme(content, title) {
    const readmePath = '../README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    const pluginsStart = readmeContent.indexOf(`### [${title}`);
    if (pluginsStart === -1) {
        console.error(`未找到 ${title} 部分`);
        return;
    }

    let nextSectionStart = readmeContent.indexOf('\n### [', pluginsStart + 1);
    if (nextSectionStart === -1) {
        nextSectionStart = readmeContent.length;
    }

    const updatedContent =
        readmeContent.slice(0, pluginsStart) +
        content +
        readmeContent.slice(nextSectionStart);

    fs.writeFileSync(readmePath, updatedContent, 'utf-8');
    console.log(`README.md 已更新，${title} 部分已完全替换。`);
}

// 生成插件表格
async function generateTable(publisher) {
    try {
        const githubPackages = await fetchGithubPackages(publisher.apiBase);
        console.log(`在 GitHub 中找到 ${githubPackages.length} 个包`);

        const packages = [];
        for (const packageName of githubPackages) {
            const packageInfo = await fetchPackageInfo(publisher, packageName);
            if (packageInfo) {
                packages.push(packageInfo);
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }

        if (packages.length === 0) {
            console.error(`${publisher.title} 没有成功获取到任何包信息`);
            process.exit(1);
        }

        let tableContent = `### [${publisher.title}](${publisher.docBase})\n\n`;
        tableContent += `| Name | pub.dev | View Source | Android | iOS | Web | MacOS | Windows | Linux |\n`;
        tableContent += `| ---- | ------- | ----------- | ------- | --- | --- | ----- | ------- | ----- |\n`;

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

            tableContent += `| ${pkg.name} | ${pubDevBadge} | ${viewSource} | ${platformSupport.Android} | ${platformSupport.iOS} | ${platformSupport.web} | ${platformSupport.macOS} | ${platformSupport.Windows} | ${platformSupport.Linux} |\n`;
        }

        console.log(`生成的表格内容预览:\n${tableContent.slice(0, 200)}...`);
        await writeToReadme(tableContent, publisher.title);
    } catch (error) {
        console.error(`处理 ${publisher.title} 时发生错误:`, error.message);
        process.exit(1);
    }
}

// 执行所有更新
async function updateAll() {
    try {
        for (const publisher of PUBLISHERS) {
            await generateTable(publisher);
        }
        console.log('所有更新完成');
    } catch (error) {
        console.error('更新过程发生错误:', error.message);
        process.exit(1);
    }
}

// 执行更新
updateAll();
