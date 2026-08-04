---
title: "Get a role"
description: "Retrieve a single role by its numeric ID. Returns 404 if not found."
sidebar:
  label: "Get role"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /roles/{id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: id, desc: "Numeric ID of the role to retrieve." }
  responseAttributes:
    - { name: id, desc: "Unique role identifier." }
    - { name: name, desc: "Role name." }
  response:
    id: 4
    name: "Tester"
---
