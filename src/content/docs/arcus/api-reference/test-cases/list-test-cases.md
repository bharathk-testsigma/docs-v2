---
title: "List test cases"
description: "Retrieve a paginated list of test cases associated with a specific project."
sidebar:
  label: "List test cases"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/test_cases
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project whose test cases are being requested." }
  query:
    - { name: "page_size", desc: "Number of test cases to return per page." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "A message that may contain additional information about the response; empty if no message." }
    - name: "data.test_cases[].id"
      desc: "Unique identifier for the test case."
    - name: "data.test_cases[].title"
      desc: "The title of the test case."
    - name: "data.test_cases[].description"
      desc: "A detailed description of the test case."
    - name: "data.test_cases[].template_type"
      desc: "The type of template used for the test case."
    - name: "data.test_cases[].human_id"
      desc: "Human-readable identifier for the test case."
    - name: "data.test_cases[].owner_id"
      desc: "Identifier of the user who owns the test case."
    - name: "data.test_cases[].type_id"
      desc: "The type identifier of the test case."
    - name: "data.test_cases[].status_id"
      desc: "The current status identifier of the test case."
    - name: "data.test_cases[].automation_type_id"
      desc: "Identifier for the type of automation applied."
    - name: "data.test_cases[].priority_id"
      desc: "The priority level identifier of the test case."
    - name: "data.test_cases[].folder_id"
      desc: "Identifier of the folder containing the test case."
    - name: "data.test_cases[].project_id"
      desc: "Identifier of the project to which the test case belongs."
    - name: "data.test_cases[].individual_steps[].id"
      desc: "Unique identifier for the step."
    - name: "data.test_cases[].individual_steps[].step_description"
      desc: "A description of the step."
    - name: "data.test_cases[].individual_steps[].expected_results"
      desc: "The expected outcome of the step."
    - name: "data.test_cases[].individual_steps[].order"
      desc: "The order in which the step should be executed."
    - name: "data.test_cases[].individual_steps[].step_type"
      desc: "The type of the step."
    - name: "data.test_cases[].individual_steps[].test_case_id"
      desc: "Identifier of the test case this step belongs to."
    - name: "data.test_cases[].individual_steps[].created_at"
      desc: "Timestamp when the step was created."
    - name: "data.test_cases[].individual_steps[].updated_at"
      desc: "Timestamp when the step was last updated."
    - { name: "page_info.page_size", desc: "The number of test cases returned in the response." }
    - { name: "page_info.total_count", desc: "The total number of test cases available for the project." }
    - { name: "page_info.next", desc: "A link to the next page of results, if applicable." }
    - { name: "page_info.prev", desc: "A link to the previous page of results, if applicable." }
  response:
    message: ""
    data:
      test_cases:
        - id: "9c09349f-5c16-4d29-9f8e-194576b6b841"
          title: "Attempt to book a flight with missing required fields"
          description: "Attempt to book a flight with missing required fields"
          template_type: "TCD"
          human_id: "DEMO-2"
          owner_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
          type_id: "75a816d1-8909-47b5-b85b-fbf60a973587"
          status_id: "bafd7f8d-832a-42ea-91df-9a1e5e02a2d9"
          automation_type_id: "3cee45b5-4335-4564-bbdf-4ea9b0306ed3"
          priority_id: "1d810f8f-7be0-41e4-9971-67ee1f55612e"
          folder_id: "580e3972-7f4a-4748-87e6-9b74873e2b93"
          project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
          individual_steps:
            - id: "a1f2c3d4-5e6f-4a7b-8c9d-0e1f2a3b4c5d"
              step_description: "Navigate to the flight booking page"
              expected_results: "The booking page is displayed"
              order: 1.0
              step_type: "DEFAULT"
              test_case_id: "9c09349f-5c16-4d29-9f8e-194576b6b841"
              created_at: 1710675200
              updated_at: 1710675200
        - id: "d07c9975-afd5-4874-93e2-2186ec3efa47"
          title: "Verify successful flight booking with valid details"
          description: "Book a flight with all required fields populated correctly"
          template_type: "STEPS"
          human_id: "DEMO-3"
          owner_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
          type_id: "75a816d1-8909-47b5-b85b-fbf60a973587"
          status_id: "bafd7f8d-832a-42ea-91df-9a1e5e02a2d9"
          automation_type_id: "3cee45b5-4335-4564-bbdf-4ea9b0306ed3"
          priority_id: "1d810f8f-7be0-41e4-9971-67ee1f55612e"
          folder_id: "580e3972-7f4a-4748-87e6-9b74873e2b93"
          project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
          individual_steps:
            - id: "b2e3d4c5-6f7a-4b8c-9d0e-1f2a3b4c5d6e"
              step_description: "Enter all required passenger details"
              expected_results: "Passenger details are accepted"
              order: 1.0
              step_type: "DEFAULT"
              test_case_id: "d07c9975-afd5-4874-93e2-2186ec3efa47"
              created_at: 1710678800
              updated_at: 1710678800
    page_info:
      page_size: 25
      total_count: 2
      next: ""
      prev: ""
---
