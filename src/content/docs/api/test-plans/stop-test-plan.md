---
title: "Stop a test plan run"
description: "Stop a running test plan execution or rerun. Setting result to STOPPED stops the run instead of updating it."
sidebar:
  label: "Stop a test plan run"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /execution_results/{run_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: run_id, desc: "The ID of the run to stop, from the trigger response or the Run Results page URL." }
  bodyFields:
    - { name: canStopAll, desc: "true stops all executions of the run; false stops only this one. Defaults to true." }
    - { name: result, desc: "Set to STOPPED to stop the run." }
  requestBody:
    canStopAll: true
    result: "STOPPED"
  responseAttributes:
    - { name: id, desc: "ID of the test plan result that was stopped." }
    - { name: execution, desc: "The test plan details as a nested object, including its ID, name, and configuration." }
    - { name: result, desc: "Result status of the test plan — STOPPED once the stop lands." }
    - { name: status, desc: "Current status — STATUS_COMPLETED once stopped." }
    - { name: message, desc: "Human-readable status message, such as \"User stopped the Test Plan\"." }
    - { name: duration, desc: "Run duration in milliseconds up to the stop." }
    - { name: totalCount, desc: "Total number of test cases in the run." }
    - { name: totalRunningCount, desc: "Total number of tests still running." }
  response:
    id: 1165
    executionId: 339
    startTime: 1679304114000
    endTime: 1679304125763
    duration: 11763
    result: "STOPPED"
    status: "STATUS_COMPLETED"
    message: "User stopped the Test Plan"
    executedBy: 12
    totalCount: 1
    runningCount: 1
    totalRunningCount: 0
    consolidatedResult: "STOPPED"
    consolidatedStatus: "STATUS_COMPLETED"
    resultType: "ORIGINAL"
---
