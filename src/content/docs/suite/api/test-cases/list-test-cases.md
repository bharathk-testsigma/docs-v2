---
title: "List test cases"
description: "Retrieve a paginated list of test cases, each enriched with its tags."
sidebar:
  label: "List test cases"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_cases
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of items per page. Default 25." }
    - { name: sort, desc: "Sort field and direction, e.g. id,asc. Results can also be filtered via query params matching filterable fields such as name, workspaceVersionId, status, priorityId, isStepGroup, deleted, testCaseType." }
  responseAttributes:
    - { name: content, desc: "Array of test case objects for the requested page." }
    - { name: totalElements, desc: "Total number of test cases across all pages." }
    - { name: totalPages, desc: "Total number of pages." }
  response:
    content:
      - id: 214
        name: "Verify login with valid credentials"
        status: "READY"
        statusName: "Ready"
        priority: 1
        priorityName: "Major"
        isStepGroup: false
        isDataDriven: false
        applicationVersionId: 39
        projectId: 9
        tags: ["smoke", "login"]
      - id: 215
        name: "Verify login with invalid password"
        status: "DRAFT"
        statusName: "Draft"
        priority: 2
        priorityName: "Minor"
        isStepGroup: false
        isDataDriven: true
        applicationVersionId: 39
        projectId: 9
        tags: ["login"]
    totalElements: 2
    totalPages: 1
---
