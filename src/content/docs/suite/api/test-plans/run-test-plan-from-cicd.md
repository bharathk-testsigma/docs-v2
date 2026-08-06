---
title: "Run a test plan from CI/CD"
description: "Trigger a CI/CD test plan run and wait up to 120 seconds for the result."
sidebar:
  label: "Run from CI/CD"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /ci_cd_execution_results
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: buildNo, desc: "Build number to tag the run with." }
    - { name: environmentId, desc: "ID of the environment to run the test plan in." }
    - { name: applicationVersionId, desc: "ID of the application version to run against." }
    - { name: testCaseIds, desc: "List of test case IDs to run." }
    - { name: runtimeData, desc: "Map of runtime data parameters; can carry TEST_RAIL_RUN_ID." }
    - { name: stepTimeout, desc: "Test step timeout in seconds. Default 30." }
    - { name: pageTimeout, desc: "Page load timeout in seconds. Default 30." }
    - { name: screenshot, desc: "Screenshot capture option (Screenshot enum). Default ALL_TYPES." }
    - { name: environments, desc: "List of test machine configurations — title, executionLabType, isHeadless, targetMachineId, platformOsVersionId, platformBrowserVersionId, platformScreenResolutionId, applicationVersionId." }
    - { name: postPlanHookId, desc: "ID of the post plan hook to run after the plan." }
    - { name: hookData, desc: "List of plugin hook data entries — executionId, name, value, parameterId." }
  requestBody:
    buildNo: "build-1042"
    environmentId: 12
    applicationVersionId: 39
    testCaseIds: [201, 202]
    stepTimeout: 30
    pageTimeout: 30
    screenshot: "ALL_TYPES"
    runtimeData:
      TEST_RAIL_RUN_ID: "R42"
  responseAttributes:
    - { name: id, desc: "Run ID of the triggered test plan run." }
    - { name: executionId, desc: "ID of the test plan that was run." }
    - { name: startTime, desc: "Epoch timestamp when the run started." }
    - { name: endTime, desc: "Epoch timestamp when the run ended. Null while still running." }
    - { name: duration, desc: "Run duration in milliseconds. Null while still running." }
    - { name: result, desc: "Result of the run — QUEUED, PASSED, FAILED, ABORTED, or STOPPED." }
    - { name: status, desc: "Current status of the run." }
    - { name: buildNo, desc: "Build number supplied in the request." }
    - { name: totalCount, desc: "Total number of test cases in the run." }
    - { name: passedCount, desc: "Number of passed test cases." }
    - { name: failedCount, desc: "Number of failed test cases." }
    - { name: triggeredType, desc: "How the run was triggered — API or via the Testsigma app." }
  response:
    id: 337
    executionId: 274
    startTime: 1732176819137
    endTime: 1732176899137
    duration: 80000
    result: "PASSED"
    status: "STATUS_COMPLETED"
    buildNo: "build-1042"
    totalCount: 2
    passedCount: 2
    failedCount: 0
    triggeredType: "API"
---
