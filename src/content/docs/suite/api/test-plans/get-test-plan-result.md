---
title: "Get test plan result"
description: "Poll the status of a triggered test plan run by its execution result ID."
sidebar:
  label: "Get test plan result"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /execution_results/{run_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: run_id, desc: "The execution result ID returned when you triggered the test plan." }
  responseAttributes:
    - { name: id, desc: "Execution result ID." }
    - { name: status, desc: "Current run status — STATUS_IN_PROGRESS, STATUS_COMPLETED, QUEUED." }
    - { name: result, desc: "Final result — PASSED, FAILURE, ABORTED, NOT_EXECUTED. Null while in progress." }
    - { name: executionId, desc: "ID of the test plan configuration that was executed." }
    - { name: startTime, desc: "Epoch timestamp when the run started." }
    - { name: endTime, desc: "Epoch timestamp when the run ended. Null if still running." }
    - { name: totalCount, desc: "Total number of test cases in the run." }
    - { name: passedCount, desc: "Number that passed." }
    - { name: failedCount, desc: "Number that failed." }
    - { name: abortedCount, desc: "Number that were aborted." }
    - { name: queuedCount, desc: "Number still queued." }
  response:
    id: 1234
    executionId: 42
    status: "STATUS_COMPLETED"
    result: "PASSED"
    startTime: 1680000000000
    endTime: 1680003600000
    totalCount: 24
    passedCount: 22
    failedCount: 2
    abortedCount: 0
    queuedCount: 0
    notExecutedCount: 0
---
