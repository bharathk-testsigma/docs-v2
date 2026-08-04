---
title: "List test data profiles"
description: "Retrieve a paginated list of test data profiles in the workspace."
sidebar:
  label: "List profiles"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_data
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of profiles per page." }
    - { name: sort, desc: "Sort order, e.g. id,asc." }
    - { name: testDataName, desc: "Filter by profile name." }
    - { name: versionId, desc: "Filter by application version ID." }
    - { name: testDataFolderId, desc: "Filter by folder ID." }
  responseAttributes:
    - { name: content, desc: "Array of test data profiles on this page." }
    - { name: totalElements, desc: "Total number of profiles across all pages." }
    - { name: totalPages, desc: "Total number of pages." }
  response:
    content:
      - id: 48
        testDataName: "LoginCredentials"
        columns:
          - "Username"
          - "Password"
        createdById: 9
        createdDate: 1732176819137
        versionId: 46
      - id: 49
        testDataName: "CheckoutData"
        columns:
          - "ProductName"
          - "Quantity"
        createdById: 9
        createdDate: 1732200000000
        versionId: 46
    totalElements: 2
    totalPages: 1
---
