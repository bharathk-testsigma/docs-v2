---
title: "List test case priorities (v2)"
description: "Retrieve a paginated list of test case priorities; filterable by ID and name."
sidebar:
  label: "List priorities (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_case_priorities
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of priorities per page." }
    - { name: sort, desc: "Sort field and direction, e.g. id,desc." }
  responseAttributes:
    - { name: id, desc: "Unique priority identifier." }
    - { name: name, desc: "Priority name." }
  response:
    content:
      - id: 2
        name: "Major"
      - id: 1
        name: "Critical"
    totalElements: 2
---
