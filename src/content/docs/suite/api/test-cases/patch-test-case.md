---
title: "Patch a test case"
description: "Update an existing test case by ID using the PATCH method."
sidebar:
  label: "Patch test case"
  badge: { text: PATCH, variant: default }
api:
  method: PATCH
  path: /test_cases/{id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the test case to update. The path ID overrides any ID in the body." }
  bodyFields:
    - { name: name, desc: "Updated name of the test case." }
    - { name: description, desc: "Updated description." }
    - { name: applicationVersionId, desc: "ID of the application version the test case belongs to." }
    - { name: projectId, desc: "ID of the project." }
    - { name: status, desc: "Test case status — READY, DRAFT, IN_REVIEW, OBSOLETE, REWORK." }
    - { name: priority, desc: "Priority ID. priorityName can be used to set the priority by name." }
    - { name: type, desc: "Test case type ID. typeName can be used to set the type by name." }
    - { name: isStepGroup, desc: "Whether this is a step group instead of a test case." }
    - { name: isDataDriven, desc: "Whether the test case is data-driven." }
    - { name: tags, desc: "Array of tag names to attach to the test case." }
    - { name: testCaseDataDrivenCondition, desc: "Data-driven settings — testDataProfileId, testDataIndex (>= -1), testDataEndIndex (must not exceed the profile's data set count). Required only for data-driven cases." }
  requestBody:
    name: "Verify login with valid credentials"
    description: "Checks that a registered user can log in"
    applicationVersionId: 39
    projectId: 9
    status: "READY"
    priority: 2
    type: 1
    isStepGroup: false
    isDataDriven: false
    tags: ["smoke", "login"]
  responseAttributes:
    - { name: id, desc: "ID of the updated test case." }
    - { name: name, desc: "Updated name of the test case." }
    - { name: description, desc: "Updated description." }
    - { name: status, desc: "Test case status. statusName holds the display name." }
    - { name: priority, desc: "Priority ID. priorityName holds the display name." }
    - { name: type, desc: "Test case type ID. typeName holds the display name." }
    - { name: isStepGroup, desc: "Whether this is a step group." }
    - { name: isDataDriven, desc: "Whether the test case is data-driven." }
    - { name: applicationVersionId, desc: "ID of the application version." }
    - { name: projectId, desc: "ID of the project." }
    - { name: tags, desc: "Tags attached to the test case." }
    - { name: updatedById, desc: "ID of the user who last updated the test case." }
    - { name: updatedDate, desc: "Epoch timestamp of the last update." }
  response:
    id: 214
    name: "Verify login with valid credentials"
    description: "Checks that a registered user can log in"
    status: "READY"
    statusName: "Ready"
    priority: 2
    priorityName: "Minor"
    type: 1
    typeName: "Functional"
    isStepGroup: false
    isDataDriven: false
    applicationVersionId: 39
    projectId: 9
    tags: ["smoke", "login"]
    updatedById: 9
    updatedDate: 1732200000000
---
