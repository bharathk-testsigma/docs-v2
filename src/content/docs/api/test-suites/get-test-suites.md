---
title: "Get test suites"
description: "Retrieve all test suites in the project with their last run status."
sidebar:
  label: "Get test suites"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_suites
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique test suite identifier." }
    - { name: name, desc: "Name of the test suite." }
    - { name: description, desc: "Description of what the suite covers." }
    - { name: appVersionId, desc: "ID of the application version this suite belongs to." }
    - { name: preRequisite, desc: "ID of a prerequisite test suite, if any." }
    - { name: lastRun.result, desc: "Result of the latest run — PASSED, FAILURE, ABORTED, etc." }
    - { name: lastRun.totalCount, desc: "Total number of test cases in the last run." }
    - { name: lastRun.passedCount, desc: "Number of test cases that passed." }
    - { name: lastRun.failedCount, desc: "Number of test cases that failed." }
    - { name: createdById, desc: "ID of the user who created the suite." }
  response:
    content:
      - id: 84
        name: "Home Page Tests"
        description: "Smoke tests for the home page"
        appVersionId: 39
        preRequisite: null
        createdById: 9
        createdDate: 1567753941000
        lastRun:
          id: 951
          result: "PASSED"
          status: "STATUS_COMPLETED"
          totalCount: 8
          passedCount: 8
          failedCount: 0
          startTime: 1657912101000
          endTime: 1657912630000
      - id: 85
        name: "Checkout Flow"
        description: "End-to-end checkout tests"
        appVersionId: 39
        createdById: 9
        createdDate: 1570000000000
        lastRun:
          id: 952
          result: "FAILURE"
          status: "STATUS_COMPLETED"
          totalCount: 5
          passedCount: 3
          failedCount: 2
    totalElements: 2
    totalPages: 1
---
