---
title: "Get a step group"
description: "Retrieves the details of a specific step group, including its steps and metadata."
sidebar:
  label: "Get a step group"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/step_groups/{step_group_id}
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project the step group belongs to." }
    - { name: "step_group_id", desc: "Identifier of the step group to retrieve." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.step_group.id", desc: "Unique identifier of the step group." }
    - { name: "data.step_group.title", desc: "Title of the step group." }
    - { name: "data.step_group.description", desc: "Description of the step group." }
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
        title: "Regression Test Step Group - 5"
        description: "Step group for regression test cases"
        human_id: "DEMO-SG-1"
        steps:
          - id: "f1c2a3b4-5d6e-47f8-9a0b-1c2d3e4f5a6b"
            step_description: "Open the application and go to the login page"
            expected_results: "Login page should be displayed"
            order: 120
            step_group_id: "b3d9f1a2-6c84-4e57-9a01-2f7c5d8e1b40"
            created_at: 1710675200
            updated_at: 1710675200
          - id: "a7b8c9d0-1e2f-43a4-85b6-7c8d9e0f1a2b"
            step_description: "Enter valid credentials and click login"
            expected_results: "User should be redirected to the dashboard"
            order: 2
            step_group_id: "b3d9f1a2-6c84-4e57-9a01-2f7c5d8e1b40"
            created_at: 1710675200
            updated_at: 1710675200
        project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        created_at: 1710675200
        updated_at: 1710675200
---
