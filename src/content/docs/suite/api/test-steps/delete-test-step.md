---
title: "Delete a test step"
description: "Delete a specific test step from a test case."
sidebar:
  label: "Delete a test step"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /test_steps/{id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: id, desc: "Identifier of the test step to delete." }
  status: 204
  statusText: No Content
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 204 No Content on success. No response body." }
---
