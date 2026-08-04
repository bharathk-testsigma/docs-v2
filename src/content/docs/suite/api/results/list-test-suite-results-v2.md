---
title: "List test suite results (v2)"
description: "Retrieve a paginated list of test suite results for a specific test plan run."
sidebar:
  label: "List test suite results (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}/test_suite_results
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID." }
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of results per page. Default 10." }
    - { name: sort, desc: "Sort order, e.g. sort=id,desc." }
    - { name: query, desc: "Filter using <parameter><operator><value> chained with commas, e.g. query=result:PASSED" }
  responseAttributes:
    - { name: content, desc: "Array of test suite result objects for the run." }
    - { name: totalElements, desc: "Total number of test suite results matching the query." }
    - { name: totalPages, desc: "Total number of pages available." }
  response:
    content:
      - id: 1383
        suiteId: 54
        startTime: "2024-05-29T07:28:10Z"
        endTime: "2024-05-29T07:30:05Z"
        duration: 115000
        result: "FAILURE"
      - id: 1382
        suiteId: 53
        startTime: "2024-05-29T07:28:10Z"
        endTime: "2024-05-29T07:29:20Z"
        duration: 70000
        result: "SUCCESS"
    totalElements: 2
    totalPages: 1
---
