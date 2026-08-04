---
title: "Update a test plan"
description: "Updates an existing test plan within a specific project."
sidebar:
  label: "Update a test plan"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /projects/{project_id}/test_plans/{test_plan_id}
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project that contains the test plan." }
    - { name: "test_plan_id", desc: "Unique identifier of the test plan to update." }
  bodyFields:
    - { name: "title", desc: "Updated title of the test plan." }
  requestBody:
    title: "Patient Portal Regression - Updated"
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.test_plan.id", desc: "Unique identifier of the test plan." }
    - { name: "data.test_plan.human_id", desc: "Human-readable identifier of the test plan." }
    - { name: "data.test_plan.title", desc: "Updated title of the test plan." }
    - { name: "data.test_plan.description", desc: "Description of the test plan." }
    - { name: "data.test_plan.status", desc: "Current status of the test plan." }
    - { name: "data.test_plan.updated_at", desc: "Unix timestamp of the last update to the test plan." }
  response:
    message: ""
    data:
      test_plan:
        id: "f2a8c1d4-9e63-4b27-8a51-7c0d6e9f3b42"
        human_id: "HCP-P-2"
        title: "Patient Portal Regression - Updated"
        description: "Full regression cycle for the Q2 patient portal release."
        status: "ACTIVE"
        updated_at: 1710803200
---
