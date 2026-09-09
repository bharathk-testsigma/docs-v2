---
title: "Update a test run"
description: "Updates the attributes of an existing test run, such as its title, status, and schedule."
sidebar:
  label: "Update a test run"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /projects/{project_id}/test_runs/{test_run_id}
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project the test run belongs to." }
    - { name: "test_run_id", desc: "Identifier of the test run to update." }
  bodyFields:
    - { name: "title", desc: "Title of the test run." }
    - { name: "description", desc: "Detailed description of the test run." }
    - { name: "status", desc: "Current status of the test run (e.g. ACTIVE)." }
    - { name: "project_id", desc: "Unique identifier of the project the test run belongs to." }
    - { name: "human_id", desc: "Human-readable identifier for the test run." }
    - { name: "selection_type", desc: "Type of test case selection for the run (e.g. STATIC)." }
    - { name: "start_date", desc: "Start date of the test run as a Unix timestamp." }
    - { name: "end_date", desc: "End date of the test run as a Unix timestamp." }
    - { name: "assignee_id", desc: "Unique identifier of the user assigned to the test run." }
    - { name: "label_names", desc: "Array of labels associated with the test run." }
    - { name: "environment_ids", desc: "Array of environment identifiers the test run executes against." }
  requestBody:
    title: "Regression suite — patient portal (updated)"
    description: "Executing regression test cases"
    status: "ACTIVE"
    project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
    human_id: "DEMO-001"
    selection_type: "STATIC"
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
    - { name: "data.test_run.id", desc: "Unique identifier of the test run." }
    - { name: "data.test_run.title", desc: "Updated title of the test run." }
    - { name: "data.test_run.description", desc: "Updated description of the test run." }
    - { name: "data.test_run.status", desc: "Updated status of the test run." }
    - { name: "data.test_run.project_id", desc: "Unique identifier of the project the test run belongs to." }
    - { name: "data.test_run.human_id", desc: "Updated human-readable identifier for the test run." }
    - { name: "data.test_run.selection_type", desc: "Type of test case selection for the run." }
    - { name: "data.test_run.start_date", desc: "Updated start date as a Unix timestamp." }
    - { name: "data.test_run.end_date", desc: "Updated end date as a Unix timestamp." }
    - { name: "data.test_run.assignee_id", desc: "Unique identifier of the user assigned to the test run." }
    - { name: "data.test_run.label_names", desc: "Updated labels associated with the test run." }
    - { name: "data.test_run.environment_ids", desc: "Updated environment identifiers the test run executes against." }
  response:
    message: ""
    data:
      test_run:
        id: "7b2f9c14-58a1-4d2e-9f3a-6c1e8d40a2b9"
        title: "Regression suite — patient portal (updated)"
        description: "Executing regression test cases"
        status: "ACTIVE"
        project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        human_id: "DEMO-001"
        selection_type: "STATIC"
        start_date: 1710675200
        end_date: 1710761600
        assignee_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
        label_names:
          - "Smoke"
          - "Regression"
        environment_ids: []
---
