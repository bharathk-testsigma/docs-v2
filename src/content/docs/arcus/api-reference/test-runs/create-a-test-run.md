---
title: "Create a test run"
description: "Creates a new test run in a project from a static selection of test cases."
sidebar:
  label: "Create a test run"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /projects/{project_id}/test_runs
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project the test run belongs to." }
  bodyFields:
    - { name: "title", desc: "Title of the test run." }
    - { name: "description", desc: "Brief description of the test run." }
    - { name: "status", desc: "Status of the test run (e.g. ACTIVE)." }
    - { name: "project_id", desc: "Unique identifier of the project the test run belongs to." }
    - { name: "human_id", desc: "Human-readable identifier for the test run." }
    - { name: "selection_type", desc: "Type of test case selection (e.g. STATIC)." }
    - { name: "static_selection_filters", desc: "Array of filters used to select the test cases included in the run." }
    - { name: "static_selection_filters[].field", desc: "Field the filter is applied to (e.g. id)." }
    - { name: "static_selection_filters[].operator", desc: "Operator used for filtering (e.g. IN)." }
    - { name: "static_selection_filters[].values", desc: "Array of values to match against the field." }
    - { name: "start_date", desc: "Start date of the test run as a Unix timestamp." }
    - { name: "end_date", desc: "End date of the test run as a Unix timestamp." }
    - { name: "assignee_id", desc: "Unique identifier of the user assigned to the test run." }
    - { name: "label_names", desc: "Array of labels associated with the test run." }
    - { name: "environment_ids", desc: "Array of environment identifiers the test run executes against." }
  requestBody:
    title: "Regression suite — patient portal"
    description: "Executing regression test cases"
    status: "ACTIVE"
    project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
    human_id: "DEMO-001"
    selection_type: "STATIC"
    static_selection_filters:
      - field: "id"
        operator: "IN"
        values:
          - "9ac271b6-4e89-4c93-8c75-2d625efa0b2d"
    start_date: 1710675200
    end_date: 1710761600
    assignee_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
    label_names:
      - "Smoke"
      - "Regression"
    environment_ids: []
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.test_run.id", desc: "Unique identifier of the created test run." }
    - { name: "data.test_run.human_id", desc: "Human-readable identifier for the test run." }
    - { name: "data.test_run.created_at", desc: "Unix timestamp of when the test run was created." }
    - { name: "data.test_run.updated_at", desc: "Unix timestamp of the last update to the test run." }
    - { name: "data.test_run.title", desc: "Title of the test run." }
    - { name: "data.test_run.description", desc: "Description of the test run." }
    - { name: "data.test_run.status", desc: "Status of the test run." }
    - { name: "data.test_run.project_id", desc: "Unique identifier of the project the test run belongs to." }
    - { name: "data.test_run.selection_type", desc: "Type of test case selection used for the run." }
    - { name: "data.test_run.start_date", desc: "Start date of the test run as a Unix timestamp." }
    - { name: "data.test_run.end_date", desc: "End date of the test run as a Unix timestamp." }
    - { name: "data.test_run.assignee_id", desc: "Unique identifier of the user assigned to the test run." }
    - { name: "data.test_run.label_names", desc: "Labels associated with the test run." }
    - { name: "data.test_run.environment_ids", desc: "Environment identifiers the test run executes against." }
  response:
    message: ""
    data:
      test_run:
        id: "7b2f9c14-58a1-4d2e-9f3a-6c1e8d40a2b9"
        human_id: "DEMO-R-1"
        created_at: 1710675200
        updated_at: 1710675200
        title: "Regression suite — patient portal"
        description: "Executing regression test cases"
        status: "ACTIVE"
        project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        selection_type: "STATIC"
        start_date: 1710675200
        end_date: 1710761600
        assignee_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
        label_names:
          - "Smoke"
          - "Regression"
        environment_ids: []
---
