---
title: "Fetch test case results"
description: "Fetch the execution results for a specific test case within a test plan run."
sidebar:
  label: "Fetch test case results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}/test_case_results/{case_result_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID." }
    - { name: case_result_id, desc: "The test case result ID to fetch." }
  query:
    - { name: query, desc: "Filter using <parameter><operator><value> chained with commas, e.g. query=testPlanId:1,result:PASSED" }
  responseAttributes:
    - { name: id, desc: "Test case result ID." }
    - { name: testCaseId, desc: "ID of the test case." }
    - { name: startTime, desc: "Test case run start time." }
    - { name: endTime, desc: "Test case run end time." }
    - { name: duration, desc: "Duration in milliseconds." }
    - { name: result, desc: "Result for this test case." }
    - { name: isDisabled, desc: "Whether the test case is disabled." }
    - { name: isDataDriven, desc: "Whether the test case is data-driven." }
    - { name: metrics, desc: "Object with aggregated pass/fail/count metrics for the test case." }
    - { name: appDetails, desc: "Application details for the run, if any." }
  response:
    id: 3857
    testCaseId: 609
    startTime: "2024-05-29T07:29:31Z"
    endTime: "2024-05-29T07:29:55Z"
    duration: 23038
    result: "FAILURE"
    isDisabled: false
    isDataDriven: false
    metrics:
      id: 1089
      testCaseResultId: 3857
      testSuiteResultId: 1383
      testDeviceResultId: 1434
      testPlanResultId: 517
      totalCount: 6
      failedCount: 1
      passedCount: 3
      stoppedCount: 0
      notExecutedCount: 2
      queuedCount: 0
      skippedCount: 0
      runningCount: 0
      result: "FAILURE"
      latestResult: "FAILURE"
      duration: 23038
      consolidatedDuration: 23038
    appDetails: null
---
