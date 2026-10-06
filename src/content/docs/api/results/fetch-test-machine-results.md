---
title: "Fetch test machine results"
description: "Fetch the execution results for a specific test machine within a test plan run."
sidebar:
  label: "Fetch test machine results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}/test_device_results/{device_result_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID." }
    - { name: device_result_id, desc: "The test machine (device) result ID to fetch." }
  query:
    - { name: query, desc: "Filter using <parameter><operator><value> chained with commas, e.g. query=testPlanId:1,result:PASSED" }
  responseAttributes:
    - { name: id, desc: "Test machine result ID." }
    - { name: testRunId, desc: "ID of the parent test run." }
    - { name: result, desc: "Result for this machine." }
    - { name: startTime, desc: "Machine run start time." }
    - { name: endTime, desc: "Machine run end time." }
    - { name: duration, desc: "Duration in milliseconds." }
    - { name: deviceConfiguration, desc: "Object describing the device/browser/OS the run executed on." }
    - { name: metrics, desc: "Object with aggregated pass/fail/count metrics for the machine." }
    - { name: appDetails, desc: "Application details for the run, if any." }
  response:
    id: 1434
    testRunId: 517
    result: "FAILURE"
    startTime: "2024-05-29T07:29:19Z"
    endTime: "2024-05-29T07:31:40Z"
    duration: 141000
    deviceConfiguration:
      title: "Windows Chrome"
      osVersion: "11"
      browser: "GoogleChrome"
      browserVersion: "123.0"
      resolution: "1920x1080"
      platform: "Windows"
      deviceName: null
      hostName: "agent.testsigma.com"
      osType: "WINDOWS"
    metrics:
      id: 165
      testDeviceResultId: 1434
      testPlanResultId: 517
      totalCount: 4
      failedCount: 2
      passedCount: 2
      stoppedCount: 0
      notExecutedCount: 0
      queuedCount: 0
      runningCount: 0
      consolidatedTotalCount: 4
      consolidatedFailedCount: 2
      consolidatedPassedCount: 2
      consolidatedStoppedCount: 0
      consolidatedNotExecutedCount: 0
      consolidatedQueuedCount: 0
      consolidatedRunningCount: 0
      result: "FAILURE"
      latestResult: "FAILURE"
      duration: 129000
      consolidatedDuration: 129000
    appDetails: null
---
