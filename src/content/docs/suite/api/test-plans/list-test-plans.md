---
title: "List test plans"
description: "Get the details of all test plans using the REST API."
sidebar:
  label: "List test plans"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_plans
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: query, desc: "Filter expression, e.g. applicationVersionId:<versionid>. The ID of the application version where the test plan is scheduled." }
  responseAttributes:
    - { name: content, desc: "Array of test plan objects." }
    - { name: id, desc: "Unique test plan identifier." }
    - { name: applicationVersionId, desc: "ID of the application version the test plan belongs to." }
    - { name: name, desc: "Name of the test plan." }
  response:
    content:
      - id: 185
        applicationVersionId: 52
        name: "TP 1"
---
