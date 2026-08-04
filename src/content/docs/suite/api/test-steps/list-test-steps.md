---
title: "List all test steps"
description: "Retrieve a paginated list of test steps across test cases, filterable by test case ID."
sidebar:
  label: "List all test steps"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_steps
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of items per page." }
    - { name: sort, desc: "Sort field and direction, e.g. id,desc." }
  responseAttributes:
    - { name: content, desc: "Array of test step objects." }
    - { name: id, desc: "Unique test step identifier." }
    - { name: testCaseId, desc: "ID of the test case the step belongs to." }
    - { name: action, desc: "Natural language action performed by the step." }
    - { name: type, desc: "Step type, e.g. NLP_TEXT." }
    - { name: stepOrder, desc: "Position of the step within its test case." }
    - { name: totalElements, desc: "Total number of test steps across all pages." }
  response:
    content:
      - id: 12345
        testCaseId: 123
        action: "Navigate to https://www.example.com"
        type: "NLP_TEXT"
        stepOrder: 1.0
      - id: 12346
        testCaseId: 123
        action: "Click on the login button"
        type: "NLP_TEXT"
        stepOrder: 2.0
    totalElements: 2
    totalPages: 1
---
