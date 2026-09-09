---
title: "Assign user to test run case"
description: "Assigns a user to a test case within a specific test run."
sidebar:
  label: "Assign user to test run case"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /projects/{project_id}/test_runs/{test_run_id}/assign_user
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project the test run belongs to." }
    - { name: "test_run_id", desc: "Identifier of the test run containing the test case." }
  bodyFields:
    - { name: "user_id", desc: "Unique identifier of the user to assign to the test case." }
    - { name: "test_case_id", desc: "Unique identifier of the test case to assign the user to." }
  requestBody:
    user_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
    test_case_id: "9ac271b6-4e89-4c93-8c75-2d625efa0b2d"
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Confirmation message indicating the user was assigned; may be empty." }
  response:
    message: ""
---
