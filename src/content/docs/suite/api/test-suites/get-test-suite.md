---
title: "Get a test suite"
description: "Retrieve a single test suite by its abstract suite ID, including its tags."
sidebar:
  label: "Get test suite"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_suites/{suite_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: suite_id, desc: "The abstract suite ID of the test suite to retrieve. Returns 404 if not found." }
  responseAttributes:
    - { name: id, desc: "Unique test suite identifier." }
    - { name: name, desc: "Name of the test suite." }
    - { name: description, desc: "Description of what the suite covers." }
    - { name: workspaceVersionId, desc: "ID of the workspace version this suite belongs to." }
    - { name: preRequisite, desc: "ID of a prerequisite test suite, if any." }
    - { name: tags, desc: "Tags applied to the test suite." }
    - { name: createdById, desc: "ID of the user who created the suite." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
  response:
    id: 84
    name: "Home Page Tests"
    description: "Smoke tests for the home page"
    workspaceVersionId: 39
    preRequisite: null
    tags: ["smoke"]
    createdById: 9
    createdDate: 1732176819137
---
