---
title: "Get Test Case execution details"
description: "Get details of all Test Case executions for a particular execution result using REST API."
sidebar:
  label: "Get Test Case execution details"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /execution_results/{executionResultId}/test_case_results
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: executionResultId, desc: "Result ID of the Test Plan execution." }
  responseAttributes:
    - { name: executionId, desc: "Execution ID of the Test Plan." }
    - { name: executionResultId, desc: "Result ID of the Test Plan execution." }
    - { name: result, desc: "Overall result of the execution — e.g. FAILURE." }
    - { name: status, desc: "Overall status of the execution — e.g. STATUS_COMPLETED." }
    - { name: testCases, desc: "Array of Test Case execution detail objects." }
    - { name: testCaseId, desc: "ID of the Test Case." }
    - { name: testCaseName, desc: "Name of the Test Case." }
    - { name: testCaseResultId, desc: "ID of the Test Case result." }
    - { name: isDataDrivenCase, desc: "Whether the Test Case is data-driven." }
    - { name: iterationResults, desc: "Array of iteration result objects for data-driven cases." }
    - { name: iterationResultId, desc: "ID of the iteration result." }
    - { name: setName, desc: "Name of the test data set used for the iteration." }
    - { name: testSuiteId, desc: "ID of the Test Suite." }
    - { name: testSuiteName, desc: "Name of the Test Suite." }
    - { name: testSuiteResultId, desc: "ID of the Test Suite result." }
    - { name: machineId, desc: "ID of the machine the Test Case ran on." }
    - { name: machineTitle, desc: "Title of the machine." }
    - { name: machineResultId, desc: "ID of the machine result." }
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
