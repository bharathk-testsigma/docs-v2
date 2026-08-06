---
title: "List OS versions"
description: "Retrieve the OS versions available for a platform in the given execution lab."
sidebar:
  label: "List OS versions"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /platform/{platform}/os_versions
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: platform, desc: "Platform name — Windows, Mac, Linux, Android, iOS." }
  query:
    - { name: applicationType, desc: "Application type — WebApplication, AndroidNative, IOSNative, MobileWeb. Required." }
    - { name: executionLabType, desc: "Execution lab — TestsigmaLab, Hybrid, PrivateGrid, BrowserStack, SauceLabs, LambdaTest. Required." }
  responseAttributes:
    - { name: "(array)", desc: "List of OS versions available for the platform." }
  response:
    - "11"
    - "10"
---
