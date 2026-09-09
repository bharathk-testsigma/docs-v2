---
title: "Complete a test plan"
description: "Marks a specific test plan as complete within a project."
sidebar:
  label: "Complete a test plan"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /projects/{project_id}/test_plans/{test_plan_id}/complete
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project that contains the test plan." }
    - { name: "test_plan_id", desc: "Unique identifier of the test plan to mark as complete." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "status", desc: "Indicates whether the operation succeeded or failed." }
    - { name: "message", desc: "Descriptive message providing context about the outcome." }
    - { name: "data.test_plan.id", desc: "Unique identifier of the completed test plan." }
    - { name: "data.test_plan.status", desc: "Status of the test plan after completion." }
    - { name: "data.test_plan.completed_at", desc: "Unix timestamp of when the test plan was marked complete." }
  response:
    status: "success"
    message: "Test plan marked as complete."
    data:
      test_plan:
        id: "f2a8c1d4-9e63-4b27-8a51-7c0d6e9f3b42"
        status: "COMPLETED"
        completed_at: 1712966400
---
