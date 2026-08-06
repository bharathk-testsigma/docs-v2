---
title: "Get a test case"
description: "Retrieve a single test case by its ID."
sidebar:
  label: "Get test case"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_cases/{id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the test case to retrieve. Returns 404 if not found." }
  responseAttributes:
    - { name: id, desc: "Unique test case identifier." }
    - { name: name, desc: "Name of the test case." }
    - { name: description, desc: "Description of the test case." }
    - { name: status, desc: "Test case status — READY, DRAFT, IN_REVIEW, OBSOLETE, REWORK. statusName holds the display name." }
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
