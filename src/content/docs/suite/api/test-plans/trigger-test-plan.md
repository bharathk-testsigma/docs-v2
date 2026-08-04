---
title: "Trigger a test plan"
description: "Trigger a Test Plan execution remotely. Useful for fully automating continuous testing within a CI/CD pipeline integrated with tools such as Jenkins, TravisCI, GitLab, Codeship, or CircleCI."
sidebar:
  label: "Trigger a test plan"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /execution_results
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: executionId, desc: "ID of the Test Plan to execute." }
    - { name: environmentId, desc: "Optional. ID of the environment to run the test plan in." }
    - { name: executionConfig, desc: "Optional. Saved Execution Config for partial test plan runs; supply either its name or its id." }
    - { name: uploadVersions, desc: "Optional. Map of Device_ID to UPLOAD_VERSION_ID to use specific uploaded app versions." }
  requestBody:
    executionId: 274
    executionConfig:
      name: "config 2"
      id: "2"
    uploadVersions:
      "<Device_ID>": "<UPLOAD_VERSION_ID>"
  responseAttributes:
    - { name: id, desc: "Run ID of the triggered Test Plan run; use it to check live status." }
    - { name: execution, desc: "Test Plan details object; null on the initial trigger response." }
    - { name: executionId, desc: "ID of the Test Plan that was triggered." }
    - { name: startTime, desc: "Epoch timestamp when the run started." }
    - { name: endTime, desc: "Epoch timestamp when the run ended. Null while running." }
    - { name: duration, desc: "Run duration in milliseconds. Null while running." }
    - { name: result, desc: "Result status of the Test Plan - QUEUED, PASSED, FAILED, ABORTED, or STOPPED." }
    - { name: status, desc: "Current status of the Test Plan creation - STATUS_CREATED." }
    - { name: message, desc: "Human-readable status message." }
    - { name: executedBy, desc: "ID of the executor." }
    - { name: buildNo, desc: "Build number specified in the Test Plan trigger call." }
    - { name: environmentId, desc: "Environment ID selected for the run." }
    - { name: totalCount, desc: "Total number of test cases in the run." }
    - { name: failedCount, desc: "Number of failed test cases." }
    - { name: passedCount, desc: "Number of passed test cases." }
    - { name: abortedCount, desc: "Number of aborted test cases." }
    - { name: stoppedCount, desc: "Number of stopped test cases." }
    - { name: notExecutedCount, desc: "Number of not-executed test cases." }
    - { name: preRequisiteFailedCount, desc: "Number of test cases that failed prerequisites." }
    - { name: queuedCount, desc: "Number of queued test cases." }
    - { name: isVisuallyPassed, desc: "Whether visual testing passed. True or False." }
    - { name: environment, desc: "Environment parameter selected for the Test Plan." }
    - { name: childResult, desc: "Child result reference." }
    - { name: reRunParentId, desc: "Parent run ID if this run is a re-run." }
    - { name: reRunType, desc: "Type of re-run." }
    - { name: triggeredType, desc: "How the run was triggered - API or via the Testsigma App." }
    - { name: totalRunningCount, desc: "Total number of running tests." }
    - { name: executionDetails, desc: "Object describing run configuration - timeouts, recovery actions, screenshot option, prerequisite handling." }
    - { name: totalQueuedCount, desc: "Total number of queued tests." }
  response:
    id: 337
    execution: null
    executionId: 274
    startTime: 1633612675726
    endTime: null
    duration: null
    result: "QUEUED"
    status: "STATUS_CREATED"
    message: "Test Plan execution is initiated and waiting to be queued"
    executedBy: 43
    buildNo: null
    environmentId: null
    totalCount: 0
    failedCount: 0
    passedCount: 0
    abortedCount: 0
    stoppedCount: 0
    notExecutedCount: 0
    preRequisiteFailedCount: 0
    queuedCount: 0
    isVisuallyPassed: null
    environment: null
    childResult: null
    reRunParentId: null
    reRunType: null
    triggeredType: "API"
    totalRunningCount: 0
    executionDetails:
      page_timeout: 30
      element_timeout: 30
      recovery_action: "Run_Next_Testcase"
      on_aborted_action: "Reuse_Session"
      screenshot_option: "FAILED_STEPS"
      group_prerequisite_fail: "Abort"
      test_case_prerequisite_fail: "Abort"
      test_step_prerequisite_fail: "Run_Next_Testcase"
      global_param_name: null
    totalQueuedCount: 0
---
