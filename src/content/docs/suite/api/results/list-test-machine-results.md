---
title: "List test machine results"
description: "Retrieve a paginated list of test machine results for test plan runs."
sidebar:
  label: "List test machine results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /environment_results
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of results per page. Default 50." }
    - { name: sort, desc: "Sort order, e.g. id,desc." }
    - { name: executionResultId, desc: "Filter by run result ID. Optional." }
  responseAttributes:
    - { name: id, desc: "Unique test machine result identifier." }
    - { name: executionResultId, desc: "ID of the parent run result." }
    - { name: result, desc: "Result of the test machine run." }
    - { name: status, desc: "Current status of the test machine run." }
    - { name: startTime, desc: "Epoch timestamp when the machine run started." }
    - { name: endTime, desc: "Epoch timestamp when the machine run ended." }
    - { name: duration, desc: "Duration in milliseconds." }
  response:
    content:
      - id: 1434
        executionResultId: 517
        result: "FAILURE"
        status: "STATUS_COMPLETED"
        startTime: 1732176519000
        endTime: 1732176660000
        duration: 141000
      - id: 1433
        executionResultId: 516
        result: "SUCCESS"
        status: "STATUS_COMPLETED"
        startTime: 1732090400000
        endTime: 1732090520000
        duration: 120000
    totalElements: 2
    totalPages: 1
---
