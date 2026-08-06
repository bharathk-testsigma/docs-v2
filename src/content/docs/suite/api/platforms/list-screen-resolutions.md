---
title: "List screen resolutions"
description: "Retrieve the screen resolutions supported for a platform and OS version."
sidebar:
  label: "List screen resolutions"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /platform/{platform}/{os_version}/screen_resolutions
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: platform, desc: "Platform name — Windows, Mac, Linux, Android, iOS." }
    - { name: os_version, desc: "OS version, e.g. 11." }
  query:
    - { name: applicationType, desc: "Application type — WebApplication, AndroidNative, IOSNative, MobileWeb. Required." }
    - { name: executionLabType, desc: "Execution lab — TestsigmaLab, Hybrid, PrivateGrid, BrowserStack, SauceLabs, LambdaTest. Required." }
  responseAttributes:
    - { name: "(array)", desc: "List of supported screen resolutions." }
  response:
    - "1920x1080"
    - "1366x768"
---
