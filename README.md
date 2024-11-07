# Flutter BaaS

[中文](README_CN.md) | [English](README.md)

This project organizes the BaaS (Backend as a Service) platforms and their plugin support in the Flutter ecosystem, helping developers with technology selection and service migration.

## Platform Comparison

### Firebase
- Advantages:
  - Most complete functionality, mature ecosystem
  - Deep integration with Google services
  - Comprehensive documentation, active community
- Disadvantages:
  - Closed source, cannot be self-hosted
  - Incomplete support for Windows platform
  - Access restrictions in some regions

### Supabase
- Advantages:
  - Open source, can be self-hosted
  - Comprehensive support across all platforms
  - Native support for PostgreSQL
  - Compatible with Firebase's API
- Disadvantages:
  - Some advanced features are still under development
  - Relatively smaller community

### Appwrite
- Advantages:
  - Fully open source, can be self-hosted
  - Relatively complete functionality
- Disadvantages:
  - Flutter plugin maintenance is not very active
  - Documentation and examples are relatively scarce

### AWS Amplify
- Advantages:
  - Integration with AWS ecosystem
  - Enterprise-level support
- Disadvantages:
  - Flutter plugin maintenance is not proactive
  - Not available in some countries and regions
  - Configuration is relatively complex

### PocketBase
- Advantages:
  - Lightweight and easy to deploy
  - Open source, active community
  - Active development
- Disadvantages:
  - Version 1.0 has not been released yet
  - Relatively basic functionality

## Regional Availability

When choosing a BaaS service, consider the access restrictions in the target users' regions:

- Firebase: Access restricted in mainland China, Iran, and other regions
- AWS Amplify: Restricted in mainland China (requires ICP), Crimea, Cuba, Iran, North Korea, Syria, and other regions
- Supabase/Appwrite/PocketBase: Can be self-hosted, not subject to regional restrictions

This project organizes various popular BaaS platform plugins for Flutter, making it easier for everyone to view, use, and facilitate migration.

The absence of certain features does not imply weakness in BaaS capabilities, as third-party plugins or APIs from other services can supplement them.

## Plugin Cross-Platform Support Monitoring (Updated Weekly)

### [Firebase Plugins](https://firebase.google.com/docs/flutter)

| Name | pub.dev | View Source | Android | iOS | Web | MacOS | Windows | Linux |
| ---- | ------- | ----------- | ------- | --- | --- | ----- | ------- | ----- |
| cloud_firestore | [![cloud_firestore pub.dev badge](https://img.shields.io/pub/v/cloud_firestore.svg)](https://pub.dev/packages/cloud_firestore) | [`cloud_firestore`](https://github.com/firebase/flutterfire/tree/main/packages/cloud_firestore) | ✔ | ✔ | ✔ | ✔ | ✔ | N/A |
| cloud_functions | [![cloud_functions pub.dev badge](https://img.shields.io/pub/v/cloud_functions.svg)](https://pub.dev/packages/cloud_functions) | [`cloud_functions`](https://github.com/firebase/flutterfire/tree/main/packages/cloud_functions) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_analytics | [![firebase_analytics pub.dev badge](https://img.shields.io/pub/v/firebase_analytics.svg)](https://pub.dev/packages/firebase_analytics) | [`firebase_analytics`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_analytics) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_app_check | [![firebase_app_check pub.dev badge](https://img.shields.io/pub/v/firebase_app_check.svg)](https://pub.dev/packages/firebase_app_check) | [`firebase_app_check`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_app_check) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_app_installations | [![firebase_app_installations pub.dev badge](https://img.shields.io/pub/v/firebase_app_installations.svg)](https://pub.dev/packages/firebase_app_installations) | [`firebase_app_installations`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_app_installations) | ✔ | ✔ | N/A | ✔ | N/A | N/A |
| firebase_auth | [![firebase_auth pub.dev badge](https://img.shields.io/pub/v/firebase_auth.svg)](https://pub.dev/packages/firebase_auth) | [`firebase_auth`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_auth) | ✔ | ✔ | ✔ | ✔ | ✔ | N/A |
| firebase_core | [![firebase_core pub.dev badge](https://img.shields.io/pub/v/firebase_core.svg)](https://pub.dev/packages/firebase_core) | [`firebase_core`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_core) | ✔ | ✔ | ✔ | ✔ | ✔ | N/A |
| firebase_crashlytics | [![firebase_crashlytics pub.dev badge](https://img.shields.io/pub/v/firebase_crashlytics.svg)](https://pub.dev/packages/firebase_crashlytics) | [`firebase_crashlytics`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_crashlytics) | ✔ | ✔ | N/A | ✔ | N/A | N/A |
| firebase_data_connect | [![firebase_data_connect pub.dev badge](https://img.shields.io/pub/v/firebase_data_connect.svg)](https://pub.dev/packages/firebase_data_connect) | [`firebase_data_connect`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_data_connect) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| firebase_database | [![firebase_database pub.dev badge](https://img.shields.io/pub/v/firebase_database.svg)](https://pub.dev/packages/firebase_database) | [`firebase_database`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_database) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_dynamic_links | [![firebase_dynamic_links pub.dev badge](https://img.shields.io/pub/v/firebase_dynamic_links.svg)](https://pub.dev/packages/firebase_dynamic_links) | [`firebase_dynamic_links`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_dynamic_links) | ✔ | ✔ | N/A | N/A | N/A | N/A |
| firebase_in_app_messaging | [![firebase_in_app_messaging pub.dev badge](https://img.shields.io/pub/v/firebase_in_app_messaging.svg)](https://pub.dev/packages/firebase_in_app_messaging) | [`firebase_in_app_messaging`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_in_app_messaging) | ✔ | ✔ | N/A | N/A | N/A | N/A |
| firebase_messaging | [![firebase_messaging pub.dev badge](https://img.shields.io/pub/v/firebase_messaging.svg)](https://pub.dev/packages/firebase_messaging) | [`firebase_messaging`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_messaging) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_ml_model_downloader | [![firebase_ml_model_downloader pub.dev badge](https://img.shields.io/pub/v/firebase_ml_model_downloader.svg)](https://pub.dev/packages/firebase_ml_model_downloader) | [`firebase_ml_model_downloader`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_ml_model_downloader) | ✔ | ✔ | N/A | ✔ | N/A | N/A |
| firebase_performance | [![firebase_performance pub.dev badge](https://img.shields.io/pub/v/firebase_performance.svg)](https://pub.dev/packages/firebase_performance) | [`firebase_performance`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_performance) | ✔ | ✔ | ✔ | N/A | N/A | N/A |
| firebase_remote_config | [![firebase_remote_config pub.dev badge](https://img.shields.io/pub/v/firebase_remote_config.svg)](https://pub.dev/packages/firebase_remote_config) | [`firebase_remote_config`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_remote_config) | ✔ | ✔ | ✔ | ✔ | N/A | N/A |
| firebase_storage | [![firebase_storage pub.dev badge](https://img.shields.io/pub/v/firebase_storage.svg)](https://pub.dev/packages/firebase_storage) | [`firebase_storage`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_storage) | ✔ | ✔ | ✔ | ✔ | ✔ | N/A |
| firebase_vertexai | [![firebase_vertexai pub.dev badge](https://img.shields.io/pub/v/firebase_vertexai.svg)](https://pub.dev/packages/firebase_vertexai) | [`firebase_vertexai`](https://github.com/firebase/flutterfire/tree/main/packages/firebase_vertexai) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |

### [Supabase Plugins](https://supabase.com/docs/reference/dart/start)

| Name | pub.dev | View Source | Android | iOS | Web | MacOS | Windows | Linux |
| ---- | ------- | ----------- | ------- | --- | --- | ----- | ------- | ----- |
| functions_client | [![functions_client pub.dev badge](https://img.shields.io/pub/v/functions_client.svg)](https://pub.dev/packages/functions_client) | [`functions_client`](https://github.com/supabase/supabase-flutter/tree/main/packages/functions_client) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| gotrue | [![gotrue pub.dev badge](https://img.shields.io/pub/v/gotrue.svg)](https://pub.dev/packages/gotrue) | [`gotrue`](https://github.com/supabase/supabase-flutter/tree/main/packages/gotrue) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| postgrest | [![postgrest pub.dev badge](https://img.shields.io/pub/v/postgrest.svg)](https://pub.dev/packages/postgrest) | [`postgrest`](https://github.com/supabase/supabase-flutter/tree/main/packages/postgrest) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| realtime_client | [![realtime_client pub.dev badge](https://img.shields.io/pub/v/realtime_client.svg)](https://pub.dev/packages/realtime_client) | [`realtime_client`](https://github.com/supabase/supabase-flutter/tree/main/packages/realtime_client) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| storage_client | [![storage_client pub.dev badge](https://img.shields.io/pub/v/storage_client.svg)](https://pub.dev/packages/storage_client) | [`storage_client`](https://github.com/supabase/supabase-flutter/tree/main/packages/storage_client) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| supabase | [![supabase pub.dev badge](https://img.shields.io/pub/v/supabase.svg)](https://pub.dev/packages/supabase) | [`supabase`](https://github.com/supabase/supabase-flutter/tree/main/packages/supabase) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| supabase_flutter | [![supabase_flutter pub.dev badge](https://img.shields.io/pub/v/supabase_flutter.svg)](https://pub.dev/packages/supabase_flutter) | [`supabase_flutter`](https://github.com/supabase/supabase-flutter/tree/main/packages/supabase_flutter) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| yet_another_json_isolate | [![yet_another_json_isolate pub.dev badge](https://img.shields.io/pub/v/yet_another_json_isolate.svg)](https://pub.dev/packages/yet_another_json_isolate) | [`yet_another_json_isolate`](https://github.com/supabase/supabase-flutter/tree/main/packages/yet_another_json_isolate) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |

### [AWS Amplify Plugins](https://docs.amplify.aws/flutter)
| Name | pub.dev | View Source | Android | iOS | Web | MacOS | Windows | Linux |
| ---- | ------- | ----------- | ------- | --- | --- | ----- | ------- | ----- |
| Analytics | [![analytics pub.dev badge](https://img.shields.io/pub/v/analytics.svg)](https://pub.dev/packages/analytics) | [analytics](https://pub.dev/packages/analytics) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| API (REST) | [![api__rest_ pub.dev badge](https://img.shields.io/pub/v/api__rest_.svg)](https://pub.dev/packages/api__rest_) | [api__rest_](https://pub.dev/packages/api__rest_) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| API (GraphQL) | [![api__graphql_ pub.dev badge](https://img.shields.io/pub/v/api__graphql_.svg)](https://pub.dev/packages/api__graphql_) | [api__graphql_](https://pub.dev/packages/api__graphql_) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Authentication | [![authentication pub.dev badge](https://img.shields.io/pub/v/authentication.svg)](https://pub.dev/packages/authentication) | [authentication](https://pub.dev/packages/authentication) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| DataStore | [![datastore pub.dev badge](https://img.shields.io/pub/v/datastore.svg)](https://pub.dev/packages/datastore) | [datastore](https://pub.dev/packages/datastore) | ✔ | ✔ | N/A | N/A | N/A | N/A |
| Storage | [![storage pub.dev badge](https://img.shields.io/pub/v/storage.svg)](https://pub.dev/packages/storage) | [storage](https://pub.dev/packages/storage) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Notifications | [![notifications pub.dev badge](https://img.shields.io/pub/v/notifications.svg)](https://pub.dev/packages/notifications) | [notifications](https://pub.dev/packages/notifications) | ✔ | ✔ | N/A | N/A | N/A | N/A |

## Future Plans

1. Provide migration guides between popular platforms
2. Implement a Firebase example project with switchable backends
3. Supplement more comparison information for BaaS platforms
4. Add performance and cost comparison data

## Contribution

Contributions through Issues and PRs are welcome to improve this project.

## License

MIT License
