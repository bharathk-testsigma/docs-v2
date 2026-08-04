---
title: "Delete a test case"
description: "Delete a test case by its ID."
sidebar:
  label: "Delete test case"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /test_cases/{id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the test case to delete. Returns 404 if not found." }
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 200 OK on success. No response body." }
---
