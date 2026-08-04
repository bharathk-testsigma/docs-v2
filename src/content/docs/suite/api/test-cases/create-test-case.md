---
title: "Create a test case"
description: "Create a new test case in the specified application version."
sidebar:
  label: "Create test case"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /test_cases
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: name, desc: "Name of the test case." }
    - { name: description, desc: "Description of the test case." }
    - { name: applicationVersionId, desc: "ID of the application version the test case belongs to." }
    - { name: projectId, desc: "ID of the project." }
    - { name: status, desc: "Test case status — READY, DRAFT, IN_REVIEW, OBSOLETE, REWORK." }
    - { name: priority, desc: "Priority ID. priorityName can be used to set the priority by name." }
    - { name: type, desc: "Test case type ID. typeName can be used to set the type by name." }
    - { name: isStepGroup, desc: "Whether this is a step group instead of a test case." }
    - { name: isDataDriven, desc: "Whether the test case is data-driven." }
    - { name: tags, desc: "Array of tag names to attach to the test case." }
    - { name: testSteps, desc: "Array of test step objects to create with the test case." }
    - { name: testCaseDataDrivenCondition, desc: "Data-driven settings — testDataProfileId, testDataIndex (>= -1), testDataEndIndex (must not exceed the profile's data set count). Required only for data-driven cases." }
    - { name: afterTestCaseConfig, desc: "After-test configuration — afterTestResultOutcome, dataDrivenFrequency." }
  requestBody:
    name: "Verify login with valid credentials"
    description: "Checks that a registered user can log in"
    applicationVersionId: 39
    projectId: 9
    status: "READY"
    priority: 1
    type: 1
    isStepGroup: false
    isDataDriven: false
    tags: ["smoke", "login"]
  responseAttributes:
    - { name: id, desc: "ID of the newly created test case." }
    - { name: name, desc: "Name of the test case." }
    - { name: description, desc: "Description of the test case." }
    - { name: status, desc: "Test case status. statusName holds the display name." }
    - { name: priority, desc: "Priority ID. priorityName holds the display name." }
    - { name: type, desc: "Test case type ID. typeName holds the display name." }
    - { name: isStepGroup, desc: "Whether this is a step group." }
    - { name: isDataDriven, desc: "Whether the test case is data-driven." }
    - { name: applicationVersionId, desc: "ID of the application version." }
    - { name: projectId, desc: "ID of the project." }
    - { name: tags, desc: "Tags attached to the test case." }
    - { name: createdById, desc: "ID of the user who created the test case." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
  response:
    id: 214
    name: "Verify login with valid credentials"
    description: "Checks that a registered user can log in"
    status: "READY"
    statusName: "Ready"
    priority: 1
    priorityName: "Major"
    type: 1
    typeName: "Functional"
    isStepGroup: false
    isDataDriven: false
    applicationVersionId: 39
    projectId: 9
    tags: ["smoke", "login"]
    createdById: 9
    createdDate: 1732176819137
---
