---
title: "Get a test case type"
description: "Retrieve a single test case type by ID. Returns 404 if not found."
sidebar:
  label: "Get a type"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_case_types/{id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: id, desc: "ID of the test case type to retrieve." }
  responseAttributes:
    - { name: id, desc: "Unique type identifier." }
    - { name: name, desc: "Type name." }
  response:
    id: 1
    name: "Functional"
---
