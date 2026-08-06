---
title: "Stop a rerun"
description: "Stop the rerun of already executing test cases from a test run result using REST API."
sidebar:
  label: "Stop a rerun"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /execution_results/{run_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: run_id, desc: "ID of the run result to stop." }
  bodyFields:
    - { name: canStopAll, desc: "Set true to stop all executions, or false to stop only some executions. Defaults to true." }
    - { name: result, desc: "Result to set for the execution — e.g. STOPPED." }
  requestBody:
    canStopAll: true
    result: "STOPPED"
  responseAttributes:
    - { name: id, desc: "ID of the Test Plan Result." }
    - { name: execution, desc: "Nested Execution object with Test Plan details (id, applicationVersionId, name, description, etc.)." }
    - { name: executionId, desc: "Test Plan execution ID." }
    - { name: startTime, desc: "Epoch timestamp when the execution started." }
    - { name: endTime, desc: "Epoch timestamp when the execution ended." }
    - { name: duration, desc: "Duration of the execution in milliseconds." }
    - { name: result, desc: "Result status of the Test Plan — QUEUED, PASSED, FAILED, ABORTED, or STOPPED." }
    - { name: status, desc: "Current status of the Test Plan creation — e.g. STATUS_COMPLETED." }
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
    - { name: triggeredType, desc: "How the Test Plan was triggered — API or MANUAL." }
    - { name: totalRunningCount, desc: "Total number of running tests." }
    - { name: executionDetails, desc: "Object with global execution settings (timeouts, recovery action, screenshot option, prerequisite-fail actions, etc.)." }
    - { name: totalQueuedCount, desc: "Total number of queued tests." }
    - { name: consolidatedResult, desc: "Consolidated result across the execution." }
    - { name: consolidatedStatus, desc: "Consolidated status across the execution." }
    - { name: resultType, desc: "Type of result — e.g. ORIGINAL." }
  response:
    id: 1165
    execution:
      id: 339
      applicationVersionId: 47
      name: "12 small plan pass"
      description: null
      mailList: "manoharkrishna@testsigma.com"
      elementTimeOut: 30
      pageTimeOut: 30
      environmentId: null
      screenshot: "ALL_TYPES"
      recoveryAction: "Run_Next_Testcase"
      onAbortedAction: "Reuse_Session"
      onSuitePreRequisiteFail: "Abort"
      onStepPreRequisiteFail: "Run_Next_Testcase"
      reRunType: "NONE"
      isManual: false
      applicationVersion: null
      lastRun: null
      slack: null
      createdDate: 1677482960000
      updatedDate: 1679304114000
      createdById: 9
      updatedById: 12
      matchBrowserVersion: false
      notificationStatusList: ["1", "0", "9", "5", "3", "6"]
      msTeamsConnectorNotificationEnabled: false
      retrySessionCreation: false
      retrySessionCreationTimeout: null
      lastRunId: 1165
      googleChatConnectorNotificationEnabled: false
      slackConnectorNotificationEnabled: false
      entityType: "EXECUTION"
      environments: []
      hookData: null
      postHookId: null
      postPlanHook: null
      visualTestResultTimeOut: 2
      onTestCasePreRequisiteFail: "Abort"
      executionType: "CUSTOM"
    executionId: 339
    startTime: 1679304114000
    endTime: 1679304125763
    duration: 11763
    result: "STOPPED"
    status: "STATUS_COMPLETED"
    message: "User stopped the Test Plan"
    executedBy: 12
    buildNo: null
    environmentId: null
    totalCount: 1
    failedCount: 0
    passedCount: 0
    stoppedCount: 0
    notExecutedCount: 0
    queuedCount: 0
    runningCount: 1
    visualTestResult: null
    environment: null
    childResult: null
    reRunParentId: null
    triggeredType: "MANUAL"
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
    consolidatedResult: "STOPPED"
    consolidatedStatus: "STATUS_COMPLETED"
    resultType: "ORIGINAL"
    consolidatedDuration: 11763
    runTestCasesInParallel: false
    runTestSuitesInParallel: false
    scheduledId: null
    testPlanHookResults: null
---
