---
title: "List test case types"
description: "Retrieve a paginated list of test case types; filterable by ID and name."
sidebar:
  label: "List types"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_case_types
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of types per page." }
    - { name: sort, desc: "Sort field and direction, e.g. id,desc." }
  responseAttributes:
    - { name: id, desc: "Unique type identifier." }
    - { name: name, desc: "Type name." }
  response:
    content:
      - id: 2
        name: "Regression"
      - id: 1
        name: "Functional"
    totalElements: 2
---
