---
title: "List browser versions"
description: "Retrieve the available versions of a browser for a platform and OS version."
sidebar:
  label: "List browser versions"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /platform/{platform}/{os_version}/browser/{browser_name}/versions
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: platform, desc: "Platform name — Windows, Mac, Linux, Android, iOS." }
    - { name: os_version, desc: "OS version, e.g. 11." }
    - { name: browser_name, desc: "Browser name — Chrome, Firefox, Safari, Edge." }
  query:
    - { name: applicationType, desc: "Application type — WebApplication, AndroidNative, IOSNative, MobileWeb. Required." }
    - { name: executionLabType, desc: "Execution lab — TestsigmaLab, Hybrid, PrivateGrid, BrowserStack, SauceLabs, LambdaTest. Required." }
  responseAttributes:
    - { name: "(array)", desc: "List of available versions for the browser." }
  response:
    - "126"
    - "125"
    - "124"
---
