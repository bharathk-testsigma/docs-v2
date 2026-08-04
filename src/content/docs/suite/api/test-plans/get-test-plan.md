---
title: "Get a test plan"
description: "Retrieve a single test plan by ID, including its tags and execution environments."
sidebar:
  label: "Get test plan"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_plans/{plan_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: plan_id, desc: "The ID of the test plan to retrieve. Returns 404 if not found." }
  responseAttributes:
    - { name: id, desc: "Unique test plan identifier." }
    - { name: name, desc: "Name of the test plan." }
    - { name: description, desc: "Description of the test plan." }
    - { name: workspaceVersionId, desc: "ID of the workspace version the test plan belongs to." }
    - { name: environmentId, desc: "ID of the environment used by the test plan, if any." }
    - { name: tags, desc: "Tags applied to the test plan." }
    - { name: testDevices, desc: "Execution environments (test devices) configured for the plan." }
    - { name: createdById, desc: "ID of the user who created the test plan." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
  response:
    id: 185
    name: "Smoke Test Plan"
    description: "Nightly smoke run"
    workspaceVersionId: 52
    environmentId: 10
    tags: ["smoke", "nightly"]
    testDevices:
      - id: 310
        title: "Chrome on Windows"
        agentId: null
        suiteIds: [84, 85]
    createdById: 9
    createdDate: 1732176819137
---
