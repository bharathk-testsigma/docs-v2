---
title: "List run results"
description: "Retrieve a paginated list of test plan run results."
sidebar:
  label: "List run results"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /execution_results
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of results per page. Default 50." }
    - { name: sort, desc: "Sort order, e.g. id,desc." }
  responseAttributes:
    - { name: id, desc: "Unique run result identifier." }
    - { name: executionId, desc: "ID of the test plan that was run." }
    - { name: buildNo, desc: "Build number associated with the run, if any." }
    - { name: startTime, desc: "Epoch timestamp when the run started." }
    - { name: endTime, desc: "Epoch timestamp when the run ended." }
    - { name: duration, desc: "Run duration in milliseconds." }
    - { name: result, desc: "Overall result of the run." }
    - { name: status, desc: "Current status of the run." }
    - { name: triggeredType, desc: "How the run was triggered (manual, scheduled, CI/CD)." }
    - { name: executedById, desc: "ID of the user who triggered the run." }
  response:
    content:
      - id: 517
        executionId: 42
        buildNo: "1024"
        startTime: 1732176819137
        endTime: 1732176960274
        duration: 141137
        result: "FAILURE"
        status: "STATUS_COMPLETED"
        triggeredType: "MANUAL"
        executedById: 9
      - id: 516
        executionId: 42
        buildNo: "1023"
        startTime: 1732090400000
        endTime: 1732090520000
        duration: 120000
        result: "SUCCESS"
        status: "STATUS_COMPLETED"
        triggeredType: "SCHEDULED"
        executedById: 9
    totalElements: 2
    totalPages: 1
---
