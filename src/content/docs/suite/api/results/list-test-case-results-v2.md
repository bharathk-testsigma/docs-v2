---
title: "List test case results (v2)"
description: "Retrieve a paginated list of test case results for a specific test plan run."
sidebar:
  label: "List test case results (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}/test_case_results
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID." }
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of results per page. Default 20." }
    - { name: sort, desc: "Sort order, e.g. sort=id,desc." }
    - { name: query, desc: "Filter using <parameter><operator><value> chained with commas, e.g. query=result:PASSED" }
  responseAttributes:
    - { name: content, desc: "Array of test case result objects for the run." }
    - { name: totalElements, desc: "Total number of test case results matching the query." }
    - { name: totalPages, desc: "Total number of pages available." }
  response:
    content:
      - id: 3857
        testCaseId: 609
        startTime: "2024-05-29T07:29:31Z"
        endTime: "2024-05-29T07:29:55Z"
        duration: 23038
        result: "FAILURE"
        isDataDriven: false
      - id: 3856
        testCaseId: 608
        startTime: "2024-05-29T07:29:02Z"
        endTime: "2024-05-29T07:29:30Z"
        duration: 27412
        result: "SUCCESS"
        isDataDriven: false
    totalElements: 2
    totalPages: 1
---
