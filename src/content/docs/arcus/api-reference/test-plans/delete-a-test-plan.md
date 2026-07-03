---
title: "Delete a test plan"
description: "Permanently deletes a specific test plan from a project."
sidebar:
  label: "Delete a test plan"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /projects/{project_id}/test_plans/{test_plan_id}
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project that contains the test plan." }
    - { name: "test_plan_id", desc: "Unique identifier of the test plan to delete." }
  status: 204
  statusText: No Content
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 204 No Content on success. No response body." }
---
