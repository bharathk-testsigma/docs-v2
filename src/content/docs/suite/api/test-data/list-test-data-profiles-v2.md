---
title: "List test data profiles (v2)"
description: "Retrieve a paginated list of test data profiles, each with its data sets."
sidebar:
  label: "List profiles (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_data
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of profiles per page." }
    - { name: sort, desc: "Sort field and direction, e.g. sort=id,desc." }
  responseAttributes:
    - { name: content, desc: "Array of test data profiles on this page, each with its data sets." }
    - { name: totalElements, desc: "Total number of test data profiles across all pages." }
    - { name: totalPages, desc: "Total number of pages." }
  response:
    content:
      - id: 48
        testDataName: "Login credentials"
        data:
          - name: "Iteration 1"
            expectedToFail: false
            data:
              Username: "alice"
              Password: "s3cret"
        createdById: 9
        createdDate: 1732176819137
      - id: 49
        testDataName: "Checkout users"
        data:
          - name: "Iteration 1"
            expectedToFail: false
            data:
              Email: "bob@example.com"
        createdById: 9
        createdDate: 1732200000000
    totalElements: 2
    totalPages: 1
---
