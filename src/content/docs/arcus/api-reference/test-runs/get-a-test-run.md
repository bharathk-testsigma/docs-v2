---
title: "Get a test run"
description: "Retrieves the details of a specific test run by its identifier."
sidebar:
  label: "Get a test run"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/test_runs/{test_run_id}
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project the test run belongs to." }
    - { name: "test_run_id", desc: "Identifier of the test run to retrieve." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.test_run.id", desc: "Unique identifier of the test run." }
    - { name: "data.test_run.human_id", desc: "Human-readable identifier for the test run." }
    - { name: "data.test_run.name", desc: "Name of the test run." }
    - { name: "data.test_run.status", desc: "Current status of the test run." }
    - { name: "data.test_run.created_at", desc: "Unix timestamp of when the test run was created." }
    - { name: "data.test_run.updated_at", desc: "Unix timestamp of the last update to the test run." }
    - { name: "data.test_run.results[].test_case_id", desc: "Unique identifier of the test case in the result." }
    - { name: "data.test_run.results[].status", desc: "Execution status of the individual test case." }
  response:
    message: ""
    data:
      test_run:
        id: "7b2f9c14-58a1-4d2e-9f3a-6c1e8d40a2b9"
        human_id: "DEMO-R-1"
        name: "Regression suite — patient portal"
        status: "IN_PROGRESS"
        created_at: 1710675200
        updated_at: 1710761600
        results:
          - test_case_id: "9ac271b6-4e89-4c93-8c75-2d625efa0b2d"
            status: "PASSED"
          - test_case_id: "1c4a6347-dec5-4f8e-8b6c-cda33c37c9ce"
            status: "FAILED"
---
