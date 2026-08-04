---
title: "List test cases (v2)"
description: "Retrieve a paginated list of test cases with tags; filterable by name, type, priority, and status."
sidebar:
  label: "List test cases (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_cases
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of test cases per page." }
    - { name: sort, desc: "Sort field and direction, e.g. id,desc." }
  responseAttributes:
    - { name: id, desc: "Unique test case identifier." }
    - { name: name, desc: "Test case name." }
    - { name: description, desc: "Description of the test case." }
    - { name: status, desc: "Test case status." }
    - { name: priority, desc: "ID of the test case priority." }
    - { name: type, desc: "ID of the test case type." }
    - { name: isStepGroup, desc: "Whether this test case is a step group." }
    - { name: workspaceVersionId, desc: "ID of the workspace version the test case belongs to." }
    - { name: tags, desc: "Tags applied to the test case." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
  response:
    content:
      - id: 214
        name: "Login with valid credentials"
        description: "Verify a registered user can log in"
        status: "READY"
        priority: 2
        type: 1
        isStepGroup: false
        workspaceVersionId: 12
        tags: ["smoke", "login"]
        createdDate: 1732176819137
      - id: 213
        name: "Checkout with saved card"
        description: "Verify checkout using a saved payment method"
        status: "DRAFT"
        priority: 1
        type: 1
        isStepGroup: false
        workspaceVersionId: 12
        tags: ["checkout"]
        createdDate: 1732176500000
    totalElements: 2
---
