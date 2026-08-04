---
title: "Create a test plan"
description: "Creates a new test plan within a specific project."
sidebar:
  label: "Create a test plan"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /projects/{project_id}/test_plans
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project to create the test plan in." }
  bodyFields:
    - { name: "title", desc: "Title of the test plan." }
    - { name: "description", desc: "Detailed description of the test plan." }
    - { name: "start_date", desc: "Start date of the test plan as a Unix timestamp." }
    - { name: "end_date", desc: "End date of the test plan as a Unix timestamp." }
    - { name: "label_ids", desc: "Array of label IDs to associate with the test plan." }
  requestBody:
    title: "Patient Portal Regression"
    description: "Full regression cycle for the Q2 patient portal release."
    start_date: 1710374400
    end_date: 1712966400
    label_ids:
      - "3ebf1ec4-f994-4f41-822a-01305e1f78c1"
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.test_plan.id", desc: "Unique identifier of the created test plan." }
    - { name: "data.test_plan.human_id", desc: "Human-readable identifier of the test plan." }
    - { name: "data.test_plan.title", desc: "Title of the test plan." }
    - { name: "data.test_plan.description", desc: "Description of the test plan." }
    - { name: "data.test_plan.status", desc: "Current status of the test plan." }
    - { name: "data.test_plan.start_date", desc: "Start date of the test plan as a Unix timestamp." }
    - { name: "data.test_plan.end_date", desc: "End date of the test plan as a Unix timestamp." }
    - { name: "data.test_plan.label_ids", desc: "Label IDs associated with the test plan." }
    - { name: "data.test_plan.created_at", desc: "Unix timestamp of when the test plan was created." }
    - { name: "data.test_plan.updated_at", desc: "Unix timestamp of the last update to the test plan." }
  response:
    message: ""
    data:
      test_plan:
        id: "f2a8c1d4-9e63-4b27-8a51-7c0d6e9f3b42"
        human_id: "HCP-P-1"
        title: "Patient Portal Regression"
        description: "Full regression cycle for the Q2 patient portal release."
        status: "ACTIVE"
        start_date: 1710374400
        end_date: 1712966400
        label_ids:
          - "3ebf1ec4-f994-4f41-822a-01305e1f78c1"
        created_at: 1710370000
        updated_at: 1710370000
---
