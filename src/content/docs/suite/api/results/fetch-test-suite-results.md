---
title: "Fetch test suite results"
description: "Fetch the execution results for a specific test suite within a test plan run."
sidebar:
  label: "Fetch test suite results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}/test_suite_results/{suite_result_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID." }
    - { name: suite_result_id, desc: "The test suite result ID to fetch." }
  query:
    - { name: query, desc: "Filter using <parameter><operator><value> chained with commas, e.g. query=testPlanId:1,result:PASSED" }
  responseAttributes:
    - { name: id, desc: "Test suite result ID." }
    - { name: testRunId, desc: "ID of the parent test run." }
    - { name: result, desc: "Result for this suite." }
    - { name: startTime, desc: "Suite run start time." }
    - { name: endTime, desc: "Suite run end time." }
    - { name: duration, desc: "Duration in milliseconds." }
    - { name: deviceConfiguration, desc: "Device configuration for the suite run, if any." }
    - { name: metrics, desc: "Object with aggregated pass/fail/count metrics for the suite." }
    - { name: appDetails, desc: "Application details for the run, if any." }
  response:
    id: 1383
    testRunId: 517
    result: "FAILURE"
    startTime: "2024-05-29T07:29:19Z"
    endTime: "2024-05-29T07:30:33Z"
    duration: 74000
    deviceConfiguration: null
    metrics:
      id: 293
      testDeviceResultId: 1434
      testPlanResultId: 517
      totalCount: 2
      failedCount: 1
      passedCount: 1
      stoppedCount: 0
      notExecutedCount: 0
      queuedCount: 0
      runningCount: 0
      consolidatedTotalCount: 2
      consolidatedFailedCount: 1
      consolidatedPassedCount: 1
      consolidatedStoppedCount: 0
      consolidatedNotExecutedCount: 0
      consolidatedQueuedCount: 0
      consolidatedRunningCount: 0
      result: "FAILURE"
      latestResult: "FAILURE"
      duration: 62000
      consolidatedDuration: 62000
    appDetails: null
---
