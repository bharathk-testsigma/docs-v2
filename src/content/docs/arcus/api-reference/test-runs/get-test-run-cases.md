---
title: "Get test run cases"
description: "Retrieves the list of test cases associated with a specific test run."
sidebar:
  label: "Get test run cases"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/test_runs/{test_run_id}/test_cases
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project the test run belongs to." }
    - { name: "test_run_id", desc: "Identifier of the test run whose test cases are listed." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.test_cases[].id", desc: "Unique identifier of the test case." }
    - { name: "data.test_cases[].name", desc: "Name of the test case." }
    - { name: "data.test_cases[].status", desc: "Execution status of the test case within the run." }
    - { name: "data.test_cases[].assignee_id", desc: "Unique identifier of the user assigned to the test case." }
  response:
    message: ""
    data:
      test_cases:
        - id: "9ac271b6-4e89-4c93-8c75-2d625efa0b2d"
          name: "Verify login with valid credentials"
          status: "PASSED"
          assignee_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
        - id: "1c4a6347-dec5-4f8e-8b6c-cda33c37c9ce"
          name: "Verify password reset flow"
          status: "FAILED"
          assignee_id: "05782b39-7a2c-4e91-9d6b-8f1340c2ab5e"
---
