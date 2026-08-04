---
title: "Delete an element"
description: "Delete a specific element from the workspace by ID."
sidebar:
  label: "Delete an element"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /ui_identifiers/{element_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: element_id, desc: "The ID of the element to delete." }
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 200 OK on success. No response body." }
---
