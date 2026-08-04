---
title: "Get a test case (v2)"
description: "Retrieve a single test case by ID, including its tags. Returns 404 if not found."
sidebar:
  label: "Get test case (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_cases/{id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: id, desc: "ID of the test case to retrieve." }
  responseAttributes:
    - { name: id, desc: "Unique test case identifier." }
    - { name: name, desc: "Test case name." }
    - { name: description, desc: "Description of the test case." }
    - { name: status, desc: "Test case status." }
    - { name: priority, desc: "ID of the test case priority." }
    - { name: type, desc: "ID of the test case type." }
    - { name: isStepGroup, desc: "Whether this test case is a step group." }
    - { name: workspaceVersionId, desc: "ID of the workspace version the test case belongs to." }
    - { name: tags, desc: "Tags applied to the test case." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
  response:
    id: 214
    name: "Login with valid credentials"
    description: "Verify a registered user can log in"
    status: "READY"
    priority: 2
    type: 1
    isStepGroup: false
    workspaceVersionId: 12
    tags: ["smoke", "login"]
    createdDate: 1732176819137
---
