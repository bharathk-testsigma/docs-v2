---
title: "Get test case priorities"
description: "Retrieve all test case priority levels defined in the project."
sidebar:
  label: "Get test case priorities"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_case_priorities
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique priority identifier." }
    - { name: name, desc: "Internal priority name." }
    - { name: displayName, desc: "Human-readable display name shown in the UI." }
    - { name: projectId, desc: "ID of the project this priority belongs to." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
  response:
    content:
      - id: 46
        name: "Critical"
        displayName: "Critical"
        projectId: 10
        createdDate: 1550593550000
      - id: 47
        name: "Major"
        displayName: "Major"
        projectId: 10
        createdDate: 1550593550000
      - id: 48
        name: "Medium"
        displayName: "Medium"
        projectId: 10
        createdDate: 1550593550000
      - id: 49
        name: "Low"
        displayName: "Low"
        projectId: 10
        createdDate: 1550593550000
    totalElements: 4
    totalPages: 1
---
