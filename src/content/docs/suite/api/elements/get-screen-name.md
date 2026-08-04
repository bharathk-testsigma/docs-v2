---
title: "Get a screen name"
description: "Retrieve a single element screen name by its numeric ID."
sidebar:
  label: "Get screen name"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /screen_names/{screen_name_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: screen_name_id, desc: "Numeric ID of the screen name to retrieve. Returns 404 if not found." }
  responseAttributes:
    - { name: id, desc: "Unique screen name identifier." }
    - { name: name, desc: "Name of the screen." }
    - { name: workspaceVersionId, desc: "ID of the workspace version the screen name belongs to." }
  response:
    id: 12
    name: "Login Page"
    workspaceVersionId: 39
---
