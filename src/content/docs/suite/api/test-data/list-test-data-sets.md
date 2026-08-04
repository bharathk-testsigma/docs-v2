---
title: "List test data sets"
description: "Retrieve a paginated list of test data sets across profiles."
sidebar:
  label: "List data sets"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_data_sets
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of data sets per page. Default page size is 2000." }
    - { name: sort, desc: "Sort order, e.g. id,asc." }
    - { name: testDataProfileId, desc: "Filter by test data profile ID." }
    - { name: name, desc: "Filter by data set name." }
  responseAttributes:
    - { name: content, desc: "Array of test data sets on this page. Each has id, testDataProfileId, name, description, expectedToFail, position, and a column-to-value data map." }
    - { name: totalElements, desc: "Total number of data sets across all pages." }
    - { name: totalPages, desc: "Total number of pages." }
  response:
    content:
      - id: 120
        testDataProfileId: 48
        name: "Set 1"
        description: "Valid user"
        expectedToFail: false
        position: 0
        data:
          Username: "john.doe"
          Password: "s3cret!"
      - id: 121
        testDataProfileId: 48
        name: "Set 2"
        description: "Invalid user"
        expectedToFail: true
        position: 1
        data:
          Username: "john.doe"
          Password: "wrong-pass"
    totalElements: 2
    totalPages: 1
---
