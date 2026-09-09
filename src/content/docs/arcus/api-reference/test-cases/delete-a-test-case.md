---
title: "Delete a test case"
description: "Delete a specific test case identified by its unique ID from a project."
sidebar:
  label: "Delete a test case"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /projects/{project_id}/test_cases/{test_case_id}
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project from which the test case will be deleted." }
    - { name: "test_case_id", desc: "Unique identifier (or human-readable ID) of the test case to delete." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "A message indicating the result of the operation; may be empty on successful deletion." }
  response:
    message: ""
---
