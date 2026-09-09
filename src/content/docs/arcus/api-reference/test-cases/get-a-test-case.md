---
title: "Get a test case"
description: "Retrieve the details of a specific test case within a project."
sidebar:
  label: "Get a test case"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/test_cases/{test_case_id}
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project that contains the test case." }
    - { name: "test_case_id", desc: "Unique identifier (or human-readable ID) of the test case to retrieve." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "A message that may contain additional information about the request; usually empty." }
    - { name: "data.test_case.id", desc: "Unique identifier of the test case." }
    - { name: "data.test_case.title", desc: "The title of the test case." }
    - { name: "data.test_case.description", desc: "A detailed description of the test case." }
    - { name: "data.test_case.template_type", desc: "The type of template used for the test case." }
    - { name: "data.test_case.preconditions", desc: "Preconditions that must be met before executing the test case." }
    - { name: "data.test_case.steps", desc: "The steps to execute the test case." }
    - { name: "data.test_case.expected_results", desc: "The expected results from executing the test case." }
    - { name: "data.test_case.human_id", desc: "Human-readable identifier for the test case." }
    - { name: "data.test_case.owner_id", desc: "Identifier of the user who owns the test case." }
    - { name: "data.test_case.type_id", desc: "The type identifier of the test case." }
    - { name: "data.test_case.status_id", desc: "The current status identifier of the test case." }
    - { name: "data.test_case.automation_type_id", desc: "Identifier for the automation type of the test case." }
    - { name: "data.test_case.priority_id", desc: "The priority level identifier of the test case." }
    - { name: "data.test_case.reviewer_id", desc: "Identifier of the reviewer for the test case." }
    - { name: "data.test_case.folder_id", desc: "Identifier of the folder containing the test case." }
    - { name: "data.test_case.project_id", desc: "Identifier of the project associated with the test case." }
    - { name: "data.test_case.created_at", desc: "Timestamp indicating when the test case was created." }
    - { name: "data.test_case.updated_at", desc: "Timestamp indicating when the test case was last updated." }
  response:
    message: ""
    data:
      test_case:
        id: "9c09349f-5c16-4d29-9f8e-194576b6b841"
        title: "Attempt to book a flight with missing required fields"
        description: "Attempt to book a flight with missing required fields"
        template_type: "TCD"
        preconditions: "User has selected a flight from the search results. User is on the booking page."
        steps: "Leave one or more required fields (e.g., First Name, Last Name, Email) blank. Click the 'Book Now' button."
        expected_results: "An error message is displayed indicating that the required fields are missing. The user is prompted to fill in the missing fields."
        human_id: "DEMO-2"
        owner_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
        type_id: "75a816d1-8909-47b5-b85b-fbf60a973587"
        status_id: "bafd7f8d-832a-42ea-91df-9a1e5e02a2d9"
        automation_type_id: "3cee45b5-4335-4564-bbdf-4ea9b0306ed3"
        priority_id: "1d810f8f-7be0-41e4-9971-67ee1f55612e"
        reviewer_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
        folder_id: "580e3972-7f4a-4748-87e6-9b74873e2b93"
        project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        created_at: 1710675200
        updated_at: 1710678800
---
