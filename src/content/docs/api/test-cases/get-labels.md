---
title: "Get test case labels"
description: "Retrieve all labels (tags) available for test cases in the project."
sidebar:
  label: "Get test case labels"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /tags
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique label identifier." }
    - { name: name, desc: "Label name as displayed in the UI." }
    - { name: type, desc: "Entity type the label applies to — TESTCASE or TEST_CASE." }
    - { name: count, desc: "Number of test cases tagged with this label." }
  response:
    content:
      - id: 1
        name: "Smoke"
        type: "TESTCASE"
        count: 12
      - id: 2
        name: "Regression"
        type: "TESTCASE"
        count: 48
      - id: 3
        name: "Sanity"
        type: "TEST_CASE"
        count: 7
    totalElements: 3
    totalPages: 1
---
