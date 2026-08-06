---
title: "List supported platforms"
description: "Retrieve the platform types (OS families) supported for an application type and execution lab."
sidebar:
  label: "List platforms"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /platform
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: applicationType, desc: "Application type — WebApplication, AndroidNative, IOSNative, MobileWeb. Required." }
    - { name: executionLabType, desc: "Execution lab — TestsigmaLab, Hybrid, PrivateGrid, BrowserStack, SauceLabs, LambdaTest. Required." }
  responseAttributes:
    - { name: "(array)", desc: "List of supported platform names — for example Windows, Mac, Linux, Android, iOS." }
  response:
    - "Windows"
    - "Mac"
    - "Linux"
---
