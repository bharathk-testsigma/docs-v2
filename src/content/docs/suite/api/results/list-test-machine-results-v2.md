---
title: "List test machine results (v2)"
description: "Retrieve a paginated list of test machine (device) results for a specific test plan run."
sidebar:
  label: "List test machine results (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}/test_device_results
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID." }
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of results per page. Default 10." }
    - { name: sort, desc: "Sort order, e.g. sort=id,desc." }
    - { name: query, desc: "Filter using <parameter><operator><value> chained with commas, e.g. query=result:PASSED" }
  responseAttributes:
    - { name: content, desc: "Array of test machine result objects for the run." }
    - { name: totalElements, desc: "Total number of test machine results matching the query." }
    - { name: totalPages, desc: "Total number of pages available." }
  response:
    content:
      - id: 1434
        testDeviceId: 88
        testPlanResultId: 517
        startTime: "2024-05-29T07:28:05Z"
        endTime: "2024-05-29T07:30:09Z"
        duration: 124000
        result: "FAILURE"
      - id: 1433
        testDeviceId: 87
        testPlanResultId: 517
        startTime: "2024-05-29T07:28:05Z"
        endTime: "2024-05-29T07:29:41Z"
        duration: 96000
        result: "SUCCESS"
    totalElements: 2
    totalPages: 1
---
