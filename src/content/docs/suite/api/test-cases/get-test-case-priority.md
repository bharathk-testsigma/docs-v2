---
title: "Get a test case priority"
description: "Retrieve a single test case priority by ID. Returns 404 if not found."
sidebar:
  label: "Get a priority"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_case_priorities/{id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: id, desc: "ID of the test case priority to retrieve." }
  responseAttributes:
    - { name: id, desc: "Unique priority identifier." }
    - { name: name, desc: "Priority name." }
  response:
    id: 1
    name: "Critical"
---
