---
title: "List browsers"
description: "Retrieve the browsers supported for a platform and OS version in the given execution lab."
sidebar:
  label: "List browsers"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /platform/{platform}/{os_version}/browsers
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: platform, desc: "Platform name — Windows, Mac, Linux, Android, iOS." }
    - { name: os_version, desc: "OS version, e.g. 11." }
  query:
    - { name: applicationType, desc: "Application type — WebApplication, AndroidNative, IOSNative, MobileWeb. Required." }
    - { name: executionLabType, desc: "Execution lab — TestsigmaLab, Hybrid, PrivateGrid, BrowserStack, SauceLabs, LambdaTest. Required." }
  responseAttributes:
    - { name: "(array)", desc: "List of supported browser names — for example Chrome, Firefox, Safari, Edge." }
  response:
    - "Chrome"
    - "Firefox"
    - "Edge"
---
