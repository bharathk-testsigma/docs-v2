---
title: "Update a step group"
description: "Updates an existing step group's title, description, labels, and steps."
sidebar:
  label: "Update a step group"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /projects/{project_id}/step_groups/{step_group_id}
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project the step group belongs to." }
    - { name: "step_group_id", desc: "Identifier of the step group to update." }
  bodyFields:
    - { name: "title", desc: "Descriptive name indicating the purpose of the step group." }
    - { name: "description", desc: "Detailed description providing context for the step group." }
    - { name: "label_ids", desc: "Array of label IDs used to categorize the step group." }
    - { name: "steps", desc: "Ordered array of step objects that belong to the step group." }
    - { name: "steps[].step_description", desc: "Description of the step to be executed." }
    - { name: "steps[].expected_result", desc: "Expected outcome of executing the step." }
    - { name: "steps[].order", desc: "Position of the step within the step group." }
  requestBody:
    title: "Regression Test Step Group - 6"
    description: "Step group for regression test cases"
    label_ids:
      - "3ebf1ec4-f994-4f41-822a-01305e1f78c1"
    steps:
      - step_description: "Open the application and navigate to the login page"
        expected_result: "Login page should be displayed"
        order: 1
      - step_description: "Enter valid credentials and click login updated"
        expected_result: "User should be redirected to the dashboard"
        order: 2
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.step_group.id", desc: "Unique identifier of the step group." }
    - { name: "data.step_group.title", desc: "Updated title of the step group." }
    - { name: "data.step_group.description", desc: "Updated description of the step group." }
    - { name: "data.step_group.human_id", desc: "Human-readable identifier for the step group." }
    - { name: "data.step_group.steps[].id", desc: "Unique identifier of the step." }
    - { name: "data.step_group.steps[].step_description", desc: "Description of the step." }
    - { name: "data.step_group.steps[].expected_results", desc: "Expected results of the step." }
    - { name: "data.step_group.steps[].order", desc: "Order of the step within the step group." }
    - { name: "data.step_group.steps[].step_group_id", desc: "Identifier of the step group the step belongs to." }
    - { name: "data.step_group.steps[].created_at", desc: "Unix timestamp of when the step was created." }
    - { name: "data.step_group.steps[].updated_at", desc: "Unix timestamp of the last update to the step." }
    - { name: "data.step_group.project_id", desc: "Identifier of the project the step group belongs to." }
    - { name: "data.step_group.created_at", desc: "Unix timestamp of when the step group was created." }
    - { name: "data.step_group.updated_at", desc: "Unix timestamp of the last update to the step group." }
  response:
    message: ""
    data:
      step_group:
        id: "b3d9f1a2-6c84-4e57-9a01-2f7c5d8e1b40"
        title: "Regression Test Step Group - 6"
        description: "Step group for regression test cases"
        human_id: "DEMO-SG-1"
        steps:
          - id: "f1c2a3b4-5d6e-47f8-9a0b-1c2d3e4f5a6b"
            step_description: "Open the application and navigate to the login page"
            expected_results: "Login page should be displayed"
            order: 1
            step_group_id: "b3d9f1a2-6c84-4e57-9a01-2f7c5d8e1b40"
            created_at: 1710675200
            updated_at: 1712131200
          - id: "a7b8c9d0-1e2f-43a4-85b6-7c8d9e0f1a2b"
            step_description: "Enter valid credentials and click login updated"
            expected_results: "User should be redirected to the dashboard"
            order: 2
            step_group_id: "b3d9f1a2-6c84-4e57-9a01-2f7c5d8e1b40"
            created_at: 1710675200
            updated_at: 1712131200
        project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        created_at: 1710675200
        updated_at: 1712131200
---
