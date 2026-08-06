---
title: "Delete a test data profile"
description: "Delete a test data profile by ID if it is not in use."
sidebar:
  label: "Delete profile"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /test_data/{id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the test data profile to delete. Returns 422 if the profile is referenced by a test case or another entity." }
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 200 OK on success. No response body." }
---
