---
title: "Update test run case status"
description: "Updates the execution status of one or more test cases within a test run."
sidebar:
  label: "Update test run case status"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /projects/{project_id}/test_runs/{test_run_id}/test_cases
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project the test run belongs to." }
    - { name: "test_run_id", desc: "Identifier of the test run whose test cases are updated." }
  bodyFields:
    - { name: "data", desc: "Sent as multipart/form-data (not a raw JSON body). A text field holding a JSON object with a test_run_cases array (fields below)." }
    - { name: "test_run_cases[].test_case_id", desc: "Unique identifier of the test case to update." }
    - { name: "test_run_cases[].test_run_status_id", desc: "Identifier of the status to set for the test case." }
    - { name: "test_run_cases[].user_id", desc: "Unique identifier of the user executing the test case." }
    - { name: "test_run_cases[].description", desc: "Additional details about the test case execution." }
    - { name: "attachments_0_0", desc: "Optional file attachment for the result (e.g. a screenshot). Use incrementing suffixes for multiple attachments." }
  requestBody:
    data:
      test_run_cases:
        - test_case_id: "1c4a6347-dec5-4f8e-8b6c-cda33c37c9ce"
          test_run_status_id: "0ba381b5-c018-40c6-b6fa-10d6e556ef9d"
          user_id: "05782b39-ed88-4bd5-84e2-705bb1610da2"
          description: "Test case execution done Via API - 5"
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Confirmation message indicating the test run cases were updated; may be empty." }
  response:
    message: ""
---
