---
title: "Fetch test step results"
description: "Fetch the step-level execution results for a specific test case within a test plan run."
sidebar:
  label: "Fetch test step results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}/test_case_results/{case_id}/step_results
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID." }
    - { name: case_id, desc: "The test case result ID to fetch step results for." }
  responseAttributes:
    - { name: content, desc: "Array of step result objects for the test case." }
    - { name: totalElements, desc: "Total number of step results, if available." }
    - { name: totalPages, desc: "Total number of pages." }
    - { name: pageable, desc: "Pageable metadata." }
    - { name: last, desc: "Whether this is the last page." }
    - { name: numberOfElements, desc: "Number of elements in the current page." }
    - { name: first, desc: "Whether this is the first page." }
    - { name: sort, desc: "Sort metadata." }
    - { name: number, desc: "Current page number." }
    - { name: size, desc: "Page size." }
    - { name: empty, desc: "Whether the page is empty." }
  response:
    content:
      - id: "3c51e933-7e15-41a0-893b-38e38b8258a2"
        testMachineResultId: 1434
        testCaseResultId: 3857
        testCaseId: 609
        stepId: 2847
        type: "NLP_TEXT"
        action: "Navigate to https://simply-travel.testsigma.com/"
        message: "Successfully opened given URL."
        errorCode: null
        errorType: null
        result: "SUCCESS"
        conditionalResult: null
        visualTestResult: null
        startTime: "2024-05-29T07:29:32Z"
        endTime: "2024-05-29T07:29:33Z"
        duration: 1133
        visualEnabled: false
      - id: "c3a8fbeb-b508-41d2-83f7-6a0ca152e234"
        testMachineResultId: 1434
        testCaseResultId: 3857
        testCaseId: 609
        stepId: 2848
        type: "NLP_TEXT"
        action: "Click on Login or Sign Up Button"
        message: "Successfully performed click action."
        errorCode: null
        errorType: null
        result: "SUCCESS"
        conditionalResult: null
        visualTestResult: null
        startTime: "2024-05-29T07:29:37Z"
        endTime: "2024-05-29T07:29:39Z"
        duration: 2040
        visualEnabled: false
      - id: "36bbdc50-ca05-4289-8342-c9e20d0491a4"
        testMachineResultId: 1434
        testCaseResultId: 3857
        testCaseId: 609
        stepId: 2849
        type: "NLP_TEXT"
        action: "Click on Login Button"
        message: "Successfully performed click action."
        errorCode: null
        errorType: null
        result: "SUCCESS"
        conditionalResult: null
        visualTestResult: null
        startTime: "2024-05-29T07:29:42Z"
        endTime: "2024-05-29T07:29:44Z"
        duration: 1539
        visualEnabled: false
      - id: "abefa297-cb14-48f4-b9e8-60db12854c03"
        testMachineResultId: 1434
        testCaseResultId: 3857
        testCaseId: 609
        stepId: 2850
        type: "NLP_TEXT"
        action: "Select the radio button Mobile Number Radio Button"
        message: "Unable to perform click/check action on element, Element is not displayed."
        errorCode: 1000001
        errorType: "ASSERT_ERROR"
        result: "FAILURE"
        conditionalResult: null
        visualTestResult: null
        startTime: "2024-05-29T07:29:47Z"
        endTime: "2024-05-29T07:29:51Z"
        duration: 3803
        visualEnabled: false
      - id: "49b04ef4-40fa-476f-b2a7-17d7a6e68230"
        testMachineResultId: 1434
        testCaseResultId: 3857
        testCaseId: 609
        stepId: 2851
        type: "NLP_TEXT"
        action: "Enter 9876543212 in the Mobile Number Radio Button field"
        message: "Major Test step failed."
        errorCode: null
        errorType: null
        result: "NOT_EXECUTED"
        conditionalResult: null
        visualTestResult: null
        startTime: "2024-05-29T07:29:54Z"
        endTime: "2024-05-29T07:29:54Z"
        duration: 1
        visualEnabled: false
      - id: "0a2c386f-5639-4276-b69e-f8715cd7a85c"
        testMachineResultId: 1434
        testCaseResultId: 3857
        testCaseId: 609
        stepId: 2852
        type: "NLP_TEXT"
        action: "Click on Continue Button"
        message: "Major Test step failed."
        errorCode: null
        errorType: null
        result: "NOT_EXECUTED"
        conditionalResult: null
        visualTestResult: null
        startTime: "2024-05-29T07:29:54Z"
        endTime: null
        duration: 0
        visualEnabled: false
    totalElements: null
    totalPages: 1
    pageable: null
    last: false
    numberOfElements: 6
    first: true
    sort: null
    number: 0
    size: 100
    empty: false
---
