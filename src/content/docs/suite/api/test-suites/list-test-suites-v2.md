---
title: "List test suites (v2)"
description: "Retrieve a paginated list of test suites, with tags populated for each suite."
sidebar:
  label: "List test suites (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_suites
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of items per page." }
    - { name: sort, desc: "Sort field and direction, e.g. id,desc." }
  responseAttributes:
    - { name: content, desc: "Array of test suite objects." }
    - { name: id, desc: "Unique test suite identifier." }
    - { name: name, desc: "Name of the test suite." }
    - { name: description, desc: "Description of what the suite covers." }
    - { name: workspaceVersionId, desc: "ID of the workspace version this suite belongs to." }
    - { name: preRequisite, desc: "ID of a prerequisite test suite, if any." }
    - { name: tags, desc: "Tags applied to the test suite." }
    - { name: createdById, desc: "ID of the user who created the suite." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
    - { name: totalElements, desc: "Total number of test suites across all pages." }
  response:
    content:
      - id: 84
        name: "Home Page Tests"
        description: "Smoke tests for the home page"
        workspaceVersionId: 39
        preRequisite: null
        tags: ["smoke"]
        createdById: 9
        createdDate: 1732176819137
      - id: 85
        name: "Checkout Flow"
        description: "End-to-end checkout tests"
        workspaceVersionId: 39
        preRequisite: 84
        tags: ["checkout", "regression"]
        createdById: 9
        createdDate: 1732200000000
    totalElements: 2
    totalPages: 1
---
