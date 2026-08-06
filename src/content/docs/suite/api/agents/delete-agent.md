---
title: "Delete an agent"
description: "Delete the agent with the given ID."
sidebar:
  label: "Delete agent"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /agents/{id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the agent to delete." }
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 200 OK on success. No response body." }
---
