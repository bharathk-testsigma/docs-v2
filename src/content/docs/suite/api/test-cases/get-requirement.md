---
title: "Get a requirement"
description: "Retrieve a single requirement by its numeric ID. Returns 404 if not found."
sidebar:
  label: "Get a requirement"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /requirements/{id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: id, desc: "ID of the requirement to retrieve." }
  responseAttributes:
    - { name: id, desc: "Unique requirement identifier." }
    - { name: name, desc: "Requirement name." }
    - { name: projectId, desc: "ID of the project the requirement belongs to." }
    - { name: parentId, desc: "ID of the parent requirement, if any." }
  response:
    id: 45
    name: "Password reset flow"
    projectId: 12
    parentId: 40
---
