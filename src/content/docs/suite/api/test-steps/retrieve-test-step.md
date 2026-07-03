---
title: "Retrieve a test step"
description: "Fetch a specific test step by its ID."
sidebar:
  label: "Retrieve a test step"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_steps/{id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: id, desc: "Identifier of the test step." }
  responseAttributes:
    - { name: id, desc: "Step ID." }
    - { name: action, desc: "Action description." }
    - { name: type, desc: "Step type." }
    - { name: stepOrder, desc: "Execution order in the test case." }
    - { name: testCaseId, desc: "Parent test case ID." }
    - { name: templateId, desc: "Associated NLP template ID." }
  response:
    id: 12345
    action: "Click on the login button"
    type: "NLP_TEXT"
    stepOrder: 1.0
    testCaseId: 123
    templateId: 456
---
