---
title: "Get test case execution details"
description: "Retrieve the details of all test case executions for a given test plan run result."
sidebar:
  label: "Get test case results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /execution_results/{run_id}/test_case_results
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: run_id, desc: "The execution result ID (Run ID) whose test case results you want to retrieve." }
  responseAttributes:
    - { name: executionId, desc: "ID of the Test Plan that was executed." }
    - { name: executionResultId, desc: "Run ID (execution result ID) of the run." }
    - { name: result, desc: "Overall result status - SUCCESS, FAILURE, ABORTED, STOPPED." }
    - { name: status, desc: "Current status of the run - e.g. STATUS_COMPLETED." }
    - { name: testCases, desc: "Array of test case result objects for the run." }
    - { name: testCaseId, desc: "ID of the test case." }
    - { name: testCaseName, desc: "Name of the test case." }
    - { name: testCaseResultId, desc: "Result ID for the test case execution." }
    - { name: isDataDrivenCase, desc: "Whether the test case is data driven." }
    - { name: iterationResults, desc: "Array of per-iteration results for data driven test cases." }
    - { name: testSuiteId, desc: "ID of the parent test suite." }
    - { name: testSuiteName, desc: "Name of the parent test suite." }
    - { name: testSuiteResultId, desc: "Result ID for the test suite execution." }
    - { name: machineId, desc: "ID of the machine the test ran on." }
    - { name: machineTitle, desc: "Title of the machine the test ran on." }
    - { name: machineResultId, desc: "Result ID for the machine execution." }
  response:
    executionId: 268
    executionResultId: 986
    result: "FAILURE"
    status: "STATUS_COMPLETED"
    testCases:
      - testCaseId: 413
        testCaseName: "03 data driven small"
        testCaseResultId: 7975
        result: "FAILURE"
        isDataDrivenCase: true
        iterationResults:
          - iterationResultId: 7963
            setName: "examples"
            result: "SUCCESS"
          - iterationResultId: 7976
            setName: "travels"
            result: "FAILURE"
          - iterationResultId: 7965
            setName: "examples 1"
            result: "FAILURE"
        testSuiteId: 197
        testSuiteName: "02 DD Small"
        testSuiteResultId: 2295
        machineId: 414
        machineTitle: "machine 2"
        machineResultId: 2370
---
