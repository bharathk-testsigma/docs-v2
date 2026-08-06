---
title: "List test case results"
description: "Retrieve a paginated list of test case results, each with a resolved video URL."
sidebar:
  label: "List test case results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_case_results
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of results per page. Default 50." }
    - { name: sort, desc: "Sort order, e.g. id,asc." }
    - { name: testCaseId, desc: "Filter by test case ID. Optional." }
    - { name: testPlanResultId, desc: "Filter by test plan result ID. Optional." }
    - { name: testSuiteResultId, desc: "Filter by test suite result ID. Optional." }
    - { name: result, desc: "Filter by result. Optional." }
    - { name: status, desc: "Filter by status. Optional." }
    - { name: isStepGroup, desc: "Filter by whether the result is for a step group. Optional." }
  responseAttributes:
    - { name: id, desc: "Unique test case result identifier." }
    - { name: testCaseId, desc: "ID of the test case." }
    - { name: testPlanResultId, desc: "ID of the parent test plan result." }
    - { name: testSuiteResultId, desc: "ID of the parent test suite result." }
    - { name: result, desc: "Result of the test case run." }
    - { name: status, desc: "Current status of the test case run." }
    - { name: startTime, desc: "Epoch timestamp when the test case run started." }
    - { name: endTime, desc: "Epoch timestamp when the test case run ended." }
    - { name: duration, desc: "Duration in milliseconds." }
    - { name: isStepGroup, desc: "Whether this result is for a step group." }
    - { name: videoUrl, desc: "Resolved URL of the run recording video." }
  response:
    content:
      - id: 3857
        testCaseId: 609
        testPlanResultId: 517
        testSuiteResultId: 1383
        result: "FAILURE"
        status: "STATUS_COMPLETED"
        startTime: 1732176571000
        endTime: 1732176594038
        duration: 23038
        isStepGroup: false
        videoUrl: "https://app.testsigma.com/videos/3857.mp4"
      - id: 3856
        testCaseId: 608
        testPlanResultId: 517
        testSuiteResultId: 1383
        result: "SUCCESS"
        status: "STATUS_COMPLETED"
        startTime: 1732176540000
        endTime: 1732176568000
        duration: 28000
        isStepGroup: false
        videoUrl: "https://app.testsigma.com/videos/3856.mp4"
    totalElements: 2
    totalPages: 1
---
