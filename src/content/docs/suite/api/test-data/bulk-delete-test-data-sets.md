---
title: "Bulk delete test data sets"
description: "Delete multiple test data sets in a single call using repeatable IDs."
sidebar:
  label: "Bulk delete data sets"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /test_data_sets/bulk
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: ids, desc: "ID of a test data set to delete. Repeat the parameter for each set, e.g. ?ids=1&ids=2." }
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 200 OK on success. No response body." }
---
