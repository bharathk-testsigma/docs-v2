---
title: "Trigger a rerun"
description: "Trigger the rerun of selected test cases from a test run result using REST API."
sidebar:
  label: "Trigger a rerun"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /execution_results
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: executionId, desc: "Test Plan execution ID." }
    - { name: executionResultId, desc: "Test Plan execution result ID." }
    - { name: isReRun, desc: "Whether this request is a rerun. Set to true." }
    - { name: reRunType, desc: "Test cases to rerun — ALL_TESTS, ONLY_FAILED_TESTS, ALL_ITERATIONS, ONLY_FAILED_ITERATIONS, or USER_PICKED." }
    - { name: testCaseResultRequests, desc: "Array of Test Case result objects to rerun, each identified by id. For data-driven cases also accepts iterationReRunType (ALL/FAILED/PASSED/USER_PICKED) and iterationResultIds." }
  requestBody:
    executionId: 336
    executionResultId: 467
    isReRun: true
    reRunType: "USER_PICKED"
    testCaseResultRequests:
      - id: 2880
      - id: 2874
  responseAttributes:
    - { name: id, desc: "ID of the Test Plan Result." }
    - { name: execution, desc: "Nested Execution object with Test Plan details (id, applicationVersionId, name, description, etc.)." }
    - { name: executionId, desc: "Test Plan execution ID." }
    - { name: startTime, desc: "Epoch timestamp when the rerun started." }
    - { name: endTime, desc: "Epoch timestamp when the rerun ended." }
    - { name: duration, desc: "Duration of the execution." }
    - { name: result, desc: "Result status of the Test Plan — QUEUED, PASSED, FAILED, ABORTED, or STOPPED." }
    - { name: status, desc: "Current status of the Test Plan creation — e.g. STATUS_CREATED." }
    - { name: message, desc: "Human-readable status message." }
    - { name: executedBy, desc: "ID of the executor." }
    - { name: buildNo, desc: "Build number specified in the Test Plan trigger call." }
    - { name: environmentId, desc: "ID of the selected environment." }
    - { name: totalCount, desc: "Total number of tests." }
    - { name: failedCount, desc: "Number of failed tests." }
    - { name: passedCount, desc: "Number of passed tests." }
    - { name: stoppedCount, desc: "Number of stopped tests." }
    - { name: notExecutedCount, desc: "Number of tests not executed." }
    - { name: queuedCount, desc: "Number of queued tests." }
    - { name: runningCount, desc: "Number of running tests." }
    - { name: reRunParentId, desc: "ID of the parent execution result this rerun derives from." }
    - { name: triggeredType, desc: "How the Test Plan was triggered — API or via the Testsigma app." }
    - { name: totalRunningCount, desc: "Total number of running tests." }
    - { name: executionDetails, desc: "Object with global execution settings (timeouts, recovery action, screenshot option, prerequisite-fail actions, etc.)." }
    - { name: totalQueuedCount, desc: "Total number of queued tests." }
    - { name: consolidatedResult, desc: "Consolidated result across the execution." }
    - { name: consolidatedStatus, desc: "Consolidated status across the execution." }
    - { name: resultType, desc: "Type of result — e.g. ORIGINAL." }
    - { name: isReRunEnabled, desc: "Whether rerun is enabled for this result." }
  response:
    id: 487
    execution: null
    executionId: 336
    startTime: 1679291448332
    endTime: null
    duration: null
    result: "QUEUED"
    status: "STATUS_CREATED"
    message: "Test Plan execution is initiated and waiting to be queued"
    executedBy: 10
    buildNo: null
    environmentId: null
    totalCount: 0
    failedCount: 0
    passedCount: 0
    stoppedCount: 0
    notExecutedCount: 0
    queuedCount: 0
    runningCount: 0
    visualTestResult: null
    environment: null
    childResult: null
    reRunParentId: 469
    triggeredType: "API"
    totalRunningCount: 0
    executionDetails:
      page_timeout: 30
      element_timeout: 30
      recovery_action: "Run_Next_Testcase"
      on_aborted_action: "Reuse_Session"
      screenshot_option: "ALL_TYPES"
      group_prerequisite_fail: "Abort"
      test_case_prerequisite_fail: "Abort"
      test_step_prerequisite_fail: "Run_Next_Testcase"
      global_param_name: null
    totalQueuedCount: 0
    mobileInspectionId: null
    environmentResultsDTO: null
    executionResultConfig: null
    isReRunEnabled: false
    consolidatedResult: "QUEUED"
    consolidatedStatus: "STATUS_CREATED"
    resultType: "ORIGINAL"
    consolidatedDuration: null
    runTestCasesInParallel: false
    runTestSuitesInParallel: false
    scheduledId: null
    testPlanHookResults: null
---
