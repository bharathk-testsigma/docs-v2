---
title: "List iteration results"
description: "Retrieve a paginated list of data-driven iteration results for a test case result within a run."
sidebar:
  label: "List iteration results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}/test_case_results/{test_case_result_id}/iteration_results
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID." }
    - { name: test_case_result_id, desc: "The test case result ID whose iterations to list." }
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of results per page. Default 10." }
    - { name: sort, desc: "Sort order, e.g. sort=id,desc." }
    - { name: query, desc: "Filter using <parameter><operator><value> chained with commas, e.g. query=result:PASSED" }
  responseAttributes:
    - { name: content, desc: "Array of iteration result objects for the test case result." }
    - { name: totalElements, desc: "Total number of iteration results matching the query." }
    - { name: totalPages, desc: "Total number of pages available." }
  response:
    content:
      - id: 921
        testCaseId: 609
        testDataSetName: "Set 1"
        startTime: "2024-05-29T07:29:31Z"
        endTime: "2024-05-29T07:29:43Z"
        duration: 11820
        result: "SUCCESS"
      - id: 922
        testCaseId: 609
        testDataSetName: "Set 2"
        startTime: "2024-05-29T07:29:43Z"
        endTime: "2024-05-29T07:29:55Z"
        duration: 11218
        result: "FAILURE"
    totalElements: 2
    totalPages: 1
---
