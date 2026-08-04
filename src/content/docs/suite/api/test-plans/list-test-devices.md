---
title: "List test devices"
description: "Retrieve a paginated list of test devices, the execution environments configured in test plans."
sidebar:
  label: "List test devices"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_devices
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of items per page." }
    - { name: sort, desc: "Sort field and direction, e.g. id,desc." }
  responseAttributes:
    - { name: content, desc: "Array of test device (execution environment) objects." }
    - { name: id, desc: "Unique test device identifier." }
    - { name: testPlanId, desc: "ID of the test plan this device belongs to." }
    - { name: title, desc: "Display title of the test device, e.g. browser and OS combination." }
    - { name: agentId, desc: "ID of the local agent running this device, if any." }
    - { name: suiteIds, desc: "IDs of the test suites assigned to this device." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
    - { name: totalElements, desc: "Total number of test devices across all pages." }
  response:
    content:
      - id: 310
        testPlanId: 185
        title: "Chrome on Windows"
        agentId: null
        suiteIds: [84, 85]
        createdDate: 1732176819137
      - id: 311
        testPlanId: 185
        title: "Safari on macOS"
        agentId: 42
        suiteIds: [84]
        createdDate: 1732200000000
    totalElements: 2
    totalPages: 1
---
