---
title: "Update a test case"
description: "Update an existing test case within a specified project."
sidebar:
  label: "Update a test case"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /projects/{project_id}/test_cases/{test_case_id}
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project to which the test case belongs." }
    - { name: "test_case_id", desc: "Unique identifier (or human-readable ID) of the test case to update." }
  bodyFields:
    - { name: "title", desc: "The title of the test case." }
    - { name: "description", desc: "A detailed description of the test case." }
    - { name: "template_type", desc: "The type of template used for the test case (e.g., STEPS)." }
    - { name: "preconditions", desc: "Preconditions that must be met before executing the test case." }
    - { name: "steps", desc: "The steps to execute the test case." }
    - { name: "expected_results", desc: "The expected results after executing the test case." }
    - { name: "type_id", desc: "The ID representing the type of the test case." }
    - { name: "status_id", desc: "The ID representing the current status of the test case." }
    - { name: "automation_type_id", desc: "The ID for the automation type associated with the test case." }
    - { name: "project_id", desc: "The ID of the project to which the test case belongs." }
    - { name: "priority_id", desc: "The ID representing the priority of the test case." }
    - { name: "owner_id", desc: "The ID of the user who owns the test case." }
    - { name: "reviewer_id", desc: "The ID of the user who will review the test case." }
    - { name: "folder_id", desc: "The ID of the folder where the test case is stored." }
    - { name: "label_ids", desc: "An array of labels associated with the test case." }
    - { name: "individual_steps", desc: "An array of individual step objects for the test case." }
    - { name: "individual_steps[].step_description", desc: "Description of the individual step." }
    - { name: "individual_steps[].expected_results", desc: "Expected results for the individual step." }
    - { name: "individual_steps[].order", desc: "The order of the step in the test case." }
    - { name: "individual_steps[].step_type", desc: "The type of the individual step." }
    - { name: "individual_steps[].step_group_id", desc: "The ID of the group this step belongs to, if applicable." }
  requestBody:
    title: "Attempt to book a flight with missing required fields"
    description: "Attempt to book a flight with missing required fields"
    template_type: "STEPS"
    preconditions: "User has selected a flight from the search results. User is on the booking page."
    steps: "Leave one or more required fields (e.g., First Name, Last Name, Email) blank. Click the 'Book Now' button."
    expected_results: "An error message is displayed indicating that the required fields are missing. The user is prompted to fill in the missing fields."
    type_id: "75a816d1-8909-47b5-b85b-fbf60a973587"
    status_id: "bafd7f8d-832a-42ea-91df-9a1e5e02a2d9"
    automation_type_id: "3cee45b5-4335-4564-bbdf-4ea9b0306ed3"
    project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
    priority_id: "1d810f8f-7be0-41e4-9971-67ee1f55612e"
    owner_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
    reviewer_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
    folder_id: "580e3972-7f4a-4748-87e6-9b74873e2b93"
    label_ids:
      - "Flight_testcase"
    individual_steps:
      - step_description: "Enter username updated"
        expected_results: "Username is entered successfully"
        order: 150
        step_type: "DEFAULT"
        step_group_id: null
      - step_description: "Enter password updated"
        expected_results: "Password is entered successfully"
        order: 2.0
        step_type: "DEFAULT"
        step_group_id: null
      - step_description: "Click login"
        expected_results: "User is redirected to the dashboard"
        order: 3.0
        step_type: "DEFAULT"
        step_group_id: null
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "A message indicating the result of the operation; empty if successful." }
    - { name: "data.test_case.id", desc: "Unique identifier of the test case." }
    - { name: "data.test_case.title", desc: "The title of the test case." }
    - { name: "data.test_case.description", desc: "The description of the test case." }
    - { name: "data.test_case.template_type", desc: "The type of template used." }
    - { name: "data.test_case.preconditions", desc: "Preconditions for the test case." }
    - { name: "data.test_case.steps", desc: "Steps for the test case." }
    - { name: "data.test_case.expected_results", desc: "Expected results for the test case." }
    - { name: "data.test_case.owner_id", desc: "Identifier of the owner." }
    - { name: "data.test_case.type_id", desc: "Type identifier of the test case." }
    - { name: "data.test_case.status_id", desc: "Current status identifier." }
    - { name: "data.test_case.automation_type_id", desc: "Automation type identifier." }
    - { name: "data.test_case.priority_id", desc: "Priority identifier." }
    - { name: "data.test_case.reviewer_id", desc: "Reviewer identifier." }
    - { name: "data.test_case.folder_id", desc: "Folder identifier." }
    - { name: "data.test_case.project_id", desc: "Project identifier." }
    - { name: "data.test_case.individual_steps", desc: "The individual steps of the test case with their details." }
    - { name: "data.test_case.created_at", desc: "Timestamp of when the test case was created." }
    - { name: "data.test_case.updated_at", desc: "Timestamp of the last update to the test case." }
  response:
    message: ""
    data:
      test_case:
        id: "9c09349f-5c16-4d29-9f8e-194576b6b841"
        title: "Attempt to book a flight with missing required fields"
        description: "Attempt to book a flight with missing required fields"
        template_type: "STEPS"
        preconditions: "User has selected a flight from the search results. User is on the booking page."
        steps: "Leave one or more required fields (e.g., First Name, Last Name, Email) blank. Click the 'Book Now' button."
        expected_results: "An error message is displayed indicating that the required fields are missing. The user is prompted to fill in the missing fields."
        owner_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
        type_id: "75a816d1-8909-47b5-b85b-fbf60a973587"
        status_id: "bafd7f8d-832a-42ea-91df-9a1e5e02a2d9"
        automation_type_id: "3cee45b5-4335-4564-bbdf-4ea9b0306ed3"
        priority_id: "1d810f8f-7be0-41e4-9971-67ee1f55612e"
        reviewer_id: "cbbc40a5-26e9-4b88-8c27-3626c9fbdaa4"
        folder_id: "580e3972-7f4a-4748-87e6-9b74873e2b93"
        project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        individual_steps:
          - id: "a1f2c3d4-5e6f-4a7b-8c9d-0e1f2a3b4c5d"
            step_description: "Enter username updated"
            expected_results: "Username is entered successfully"
            order: 1.0
            step_type: "DEFAULT"
            step_group_id: null
          - id: "b2e3d4c5-6f7a-4b8c-9d0e-1f2a3b4c5d6e"
            step_description: "Enter password updated"
            expected_results: "Password is entered successfully"
            order: 2.0
            step_type: "DEFAULT"
            step_group_id: null
          - id: "c3f4e5d6-7a8b-4c9d-0e1f-2a3b4c5d6e7f"
            step_description: "Click login"
            expected_results: "User is redirected to the dashboard"
            order: 3.0
            step_type: "DEFAULT"
            step_group_id: null
        created_at: 1710675200
        updated_at: 1710682400
---
