---
title: "List post plan hooks"
description: "Retrieve a paginated list of plugin post-plan hooks configured on test plans."
sidebar:
  label: "List post plan hooks"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /post_plan_hooks
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of items per page." }
    - { name: sort, desc: "Sort field and direction, e.g. id,DESC." }
    - { name: q, desc: "Filter in key:value format, e.g. q=testPlanId:185. Filterable fields include id, testPlanId, pluginId." }
  responseAttributes:
    - { name: content, desc: "Array of post-plan hook objects." }
    - { name: id, desc: "Unique post-plan hook identifier." }
    - { name: testPlanId, desc: "ID of the test plan the hook is attached to." }
    - { name: pluginId, desc: "ID of the plugin that runs after the test plan completes." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
    - { name: totalElements, desc: "Total number of post-plan hooks across all pages." }
  response:
    content:
      - id: 12
        testPlanId: 185
        pluginId: 301
        createdDate: 1732176819137
      - id: 13
        testPlanId: 186
        pluginId: 305
        createdDate: 1732200000000
    totalElements: 2
    totalPages: 1
---
