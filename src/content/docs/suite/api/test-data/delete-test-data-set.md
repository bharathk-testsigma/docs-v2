---
title: "Delete a test data set"
description: "Delete a single test data set from a profile by ID."
sidebar:
  label: "Delete data set"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /test_data_sets/{id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the test data set to delete. Returns 404 if not found." }
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 200 OK on success. No response body." }
---
