---
title: "List test plans (v2)"
description: "Retrieve a paginated list of test plans, with tags populated for each plan."
sidebar:
  label: "List test plans (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_plans
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of items per page." }
    - { name: sort, desc: "Sort field and direction, e.g. id,desc." }
  responseAttributes:
    - { name: content, desc: "Array of test plan objects." }
    - { name: id, desc: "Unique test plan identifier." }
    - { name: name, desc: "Name of the test plan." }
    - { name: description, desc: "Description of the test plan." }
    - { name: workspaceVersionId, desc: "ID of the workspace version the test plan belongs to." }
    - { name: environmentId, desc: "ID of the environment used by the test plan, if any." }
    - { name: tags, desc: "Tags applied to the test plan." }
    - { name: createdById, desc: "ID of the user who created the test plan." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
    - { name: totalElements, desc: "Total number of test plans across all pages." }
  response:
    content:
      - id: 185
        name: "Smoke Test Plan"
        description: "Nightly smoke run"
        workspaceVersionId: 52
        environmentId: 10
        tags: ["smoke", "nightly"]
        createdById: 9
        createdDate: 1732176819137
      - id: 186
        name: "Regression Test Plan"
        description: "Full regression before release"
        workspaceVersionId: 52
        environmentId: 11
        tags: ["regression"]
        createdById: 9
        createdDate: 1732200000000
    totalElements: 2
    totalPages: 1
---
