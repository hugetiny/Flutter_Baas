# Flutter BaaS

[English](README.md) | [中文](README_CN.md)

本项目整理了 Flutter 生态中主流的 BaaS (Backend as a Service) 平台及其插件支持情况，帮助开发者进行技术选型和服务迁移。

## 平台对比

### Firebase
- 优势：
  - 功能最完整，生态最成熟
  - 与 Google 服务深度集成
  - 文档完善，社区活跃
- 劣势：
  - 闭源，无法自部署
  - Windows 平台支持不完善
  - 部分地区访问受限

### Supabase
- 优势：
  - 开源，可自部署
  - 全平台支持完善
  - PostgreSQL 原生支持
  - 兼容 Firebase 的 API
- 劣势：
  - 部分高级功能仍在开发中
  - 社区相对较小

### Appwrite
- 优势：
  - 完全开源，可自部署
  - 功能相对完整
- 劣势：
  - Flutter 插件维护不够活跃
  - 文档和示例相对较少

### AWS Amplify
- 优势：
  - AWS 生态集成
  - 企业级支持
- 劣势：
  - Flutter 插件维护不积极
  - 部分国家和地区无法使用
  - 配置相对复杂

### PocketBase
- 优势：
  - 轻量级，易于部署
  - 开源，社区活跃
  - 开发活跃
- 劣势：
  - 尚未发布 1.0 版本
  - 功能相对基础

## 地区可用性

在选择 BaaS 服务时，需要考虑目标用户所在地区的访问限制：

- Firebase：中国大陆、伊朗等地区访问受限
- AWS Amplify：中国大陆（需 ICP）、克里米亚、古巴、伊朗、朝鲜、叙利亚等地区受限
- Supabase/Appwrite/PocketBase：可自部署，不受地区限制

这个项目是我对Flutter各种流行的Baas平台插件的整理，方便大家查看和使用以及为迁移提供方便。

功能的缺失并不意味着BaaS能力的强弱，可以用第三方插件或者其他服务的API来补充。

## 插件跨平台支持监控（每周更新）

### [Firebase Plugins](https://firebase.google.com/docs/flutter)

| Name | View Source | Android | iOS | Web | MacOS | Windows | Linux |
| ---- | ----------- | ------- | --- | --- | ----- | ------- | ----- |
| cloud_firestore | [`cloud_firestore`](https://github.com/firebase/flutterfire/tree/main/packages/cloud_firestore) | ✔ | ✔ | ✔ | ✔ | ✔ | N/A |
| cloud_functions | [`cloud_functions`](https://github.com/firebase/flutterfire/tree/main/packages/cloud_functions) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_analytics | [`firebase_analytics`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_analytics) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_app_check | [`firebase_app_check`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_app_check) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_app_installations | [`firebase_app_installations`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_app_installations) | ✔ | ✔ | N/A | ✔ | N/A | N/A |
| firebase_auth | [`firebase_auth`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_auth) | ✔ | ✔ | ✔ | ✔ | ✔ | N/A |
| firebase_core | [`firebase_core`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_core) | ✔ | ✔ | ✔ | ✔ | ✔ | N/A |
| firebase_crashlytics | [`firebase_crashlytics`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_crashlytics) | ✔ | ✔ | N/A | ✔ | N/A | N/A |
| firebase_data_connect | [`firebase_data_connect`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_data_connect) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| firebase_database | [`firebase_database`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_database) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_dynamic_links | [`firebase_dynamic_links`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_dynamic_links) | ✔ | ✔ | N/A | N/A | N/A | N/A |
| firebase_in_app_messaging | [`firebase_in_app_messaging`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_in_app_messaging) | ✔ | ✔ | N/A | N/A | N/A | N/A |
| firebase_messaging | [`firebase_messaging`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_messaging) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_ml_model_downloader | [`firebase_ml_model_downloader`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_ml_model_downloader) | ✔ | ✔ | N/A | ✔ | N/A | N/A |
| firebase_performance | [`firebase_performance`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_performance) | ✔ | ✔ | ✔ | N/A | N/A | N/A |
| firebase_remote_config | [`firebase_remote_config`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_remote_config) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_storage | [`firebase_storage`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_storage) | ✔ | ✔ | ✔ | ✔ | ✔ | N/A |
| firebase_vertexai | [`firebase_vertexai`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_vertexai) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |

### [Supabase Plugins](https://supabase.com/docs/reference/dart/start)

| Name | View Source | Android | iOS | Web | MacOS | Windows | Linux |
| ---- | ----------- | ------- | --- | --- | ----- | ------- | ----- |
| functions_client | [`functions_client`](https://github.com/supabase/supabase-flutter/tree/main/packages/functions_client) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| gotrue | [`gotrue`](https://github.com/supabase/supabase-flutter/tree/main/packages/gotrue) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| postgrest | [`postgrest`](https://github.com/supabase/supabase-flutter/tree/main/packages/postgrest) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| realtime_client | [`realtime_client`](https://github.com/supabase/supabase-flutter/tree/main/packages/realtime_client) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| storage_client | [`storage_client`](https://github.com/supabase/supabase-flutter/tree/main/packages/storage_client) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| supabase | [`supabase`](https://github.com/supabase/supabase-flutter/tree/main/packages/supabase) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| supabase_flutter | [`supabase_flutter`](https://github.com/supabase/supabase-flutter/tree/main/packages/supabase_flutter) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| yet_another_json_isolate | [`yet_another_json_isolate`](https://github.com/supabase/supabase-flutter/tree/main/packages/yet_another_json_isolate) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |

## 未来计划

1. 提供各热门平台间迁移指南
2. 实现可切换后端的 Firebase 示例项目
3. 补充更多 BaaS 平台的对比信息
4. 添加性能和成本对比数据

## 贡献

欢迎提交 Issue 和 PR 来完善这个项目。

## 许可证

MIT License
