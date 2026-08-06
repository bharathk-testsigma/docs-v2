---
title: "List test suite results"
description: "Retrieve a paginated list of test suite results."
sidebar:
  label: "List test suite results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_suite_results
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of results per page. Default 50." }
    - { name: sort, desc: "Sort order, e.g. id,asc." }
    - { name: testPlanResultId, desc: "Filter by test plan result ID. Optional." }
    - { name: suiteId, desc: "Filter by test suite ID. Optional." }
    - { name: result, desc: "Filter by result. Optional." }
    - { name: status, desc: "Filter by status. Optional." }
  responseAttributes:
    - { name: id, desc: "Unique test suite result identifier." }
    - { name: suiteId, desc: "ID of the test suite." }
    - { name: testPlanResultId, desc: "ID of the parent test plan result." }
    - { name: result, desc: "Result of the test suite run." }
    - { name: status, desc: "Current status of the test suite run." }
    - { name: startTime, desc: "Epoch timestamp when the suite run started." }
    - { name: endTime, desc: "Epoch timestamp when the suite run ended." }
    - { name: duration, desc: "Duration in milliseconds." }
  response:
    content:
      - id: 1383
        suiteId: 27
        testPlanResultId: 517
        result: "FAILURE"
        status: "STATUS_COMPLETED"
        startTime: 1732176540000
        endTime: 1732176594038
        duration: 54038
      - id: 1382
        suiteId: 26
        testPlanResultId: 517
        result: "SUCCESS"
        status: "STATUS_COMPLETED"
        startTime: 1732176480000
        endTime: 1732176538000
        duration: 58000
    totalElements: 2
    totalPages: 1
---
