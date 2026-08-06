---
title: "Fetch test plan results"
description: "Fetch the execution results for an entire test plan run by its run ID."
sidebar:
  label: "Fetch test plan results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID to fetch results for." }
  query:
    - { name: query, desc: "Filter using <parameter><operator><value> chained with commas, e.g. query=testPlanId:1,result:PASSED" }
  responseAttributes:
    - { name: id, desc: "Test plan result ID." }
    - { name: testPlanId, desc: "ID of the test plan." }
    - { name: buildNo, desc: "Build number for the run." }
    - { name: result, desc: "Overall result of the run." }
    - { name: startTime, desc: "Run start time." }
    - { name: endTime, desc: "Run end time." }
    - { name: duration, desc: "Run duration in milliseconds." }
    - { name: executor, desc: "User who executed the run." }
    - { name: triggeredType, desc: "How the run was triggered, e.g. MANUAL." }
    - { name: metrics, desc: "Object with aggregated pass/fail/count metrics for the plan." }
  response:
    id: 517
    testPlanId: 420
    buildNo: "run69"
    result: "FAILURE"
    startTime: "2024-05-29T07:29:19Z"
    endTime: "2024-05-29T07:33:17Z"
    duration: 238000
    executor: "bharath.k@testsigma.com"
    triggeredType: "MANUAL"
    metrics:
      id: 162
      testPlanResultId: 517
      totalCount: 8
      failedCount: 4
      passedCount: 4
      stoppedCount: 0
      notExecutedCount: 0
      queuedCount: 0
      runningCount: 0
      consolidatedPlanTotalCount: 8
      consolidatedPlanFailedCount: 4
      consolidatedPlanPassedCount: 4
      consolidatedPlanStoppedCount: 0
      consolidatedPlanNotExecutedCount: 0
      consolidatedPlanQueuedCount: 0
      consolidatedPlanRunningCount: 0
      result: "FAILURE"
      latestResult: "FAILURE"
      duration: 226000
      consolidatedDuration: 226000
---
