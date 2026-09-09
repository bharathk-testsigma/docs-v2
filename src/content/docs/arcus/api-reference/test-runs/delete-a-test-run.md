---
title: "Delete a test run"
description: "Permanently deletes a specific test run from a project."
sidebar:
  label: "Delete a test run"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /projects/{project_id}/test_runs/{test_run_id}
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project the test run belongs to." }
    - { name: "test_run_id", desc: "Identifier of the test run to delete." }
  status: 204
  statusText: No Content
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 204 No Content on success. No response body." }
---
