---
title: "Get a test plan"
description: "Retrieves the details of a specific test plan by its unique identifier."
sidebar:
  label: "Get a test plan"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/test_plans/{test_plan_id}
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project that contains the test plan." }
    - { name: "test_plan_id", desc: "Unique identifier of the test plan to retrieve." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.test_plan.id", desc: "Unique identifier of the test plan." }
    - { name: "data.test_plan.human_id", desc: "Human-readable identifier of the test plan." }
    - { name: "data.test_plan.title", desc: "Title of the test plan." }
    - { name: "data.test_plan.description", desc: "Description of the test plan." }
    - { name: "data.test_plan.status", desc: "Current status of the test plan." }
    - { name: "data.test_plan.start_date", desc: "Start date of the test plan as a Unix timestamp." }
    - { name: "data.test_plan.end_date", desc: "End date of the test plan as a Unix timestamp." }
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
        created_at: 1710370000
        updated_at: 1710716800
---
