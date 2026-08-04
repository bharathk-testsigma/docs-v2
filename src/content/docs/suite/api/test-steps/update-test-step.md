---
title: "Update a test step"
description: "Update an existing test step."
sidebar:
  label: "Update a test step"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /test_steps/{id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: id, desc: "The ID of the test step to update." }
  bodyFields:
    - { name: testCaseId, desc: "Target test case ID the step belongs to." }
    - { name: templateId, desc: "NLP template ID for the step. Mandatory for NLP_TEXT steps (set stepGroupId to null)." }
    - { name: elementId, desc: "The ID of the element associated with this step (required for templates with ${ui-identifier} in grammar)." }
    - { name: text, desc: "Step input or parameter value." }
    - { name: type, desc: "Step type: NLP_TEXT or STEP_GROUP." }
  requestBody:
    testCaseId: 9
    templateId: 1044
    elementId: 567
    text: "your password"
    type: "NLP_TEXT"
  responseAttributes:
    - { name: id, desc: "Unique identifier of the test step." }
    - { name: action, desc: "Action description generated from the step." }
    - { name: type, desc: "Step type: NLP_TEXT or STEP_GROUP." }
    - { name: conditionType, desc: "Condition applied to the step, if any." }
    - { name: testCaseId, desc: "Parent test case ID." }
    - { name: stepGroupId, desc: "Step group ID for STEP_GROUP steps; null for NLP_TEXT steps." }
  response:
    id: 12
    action: "Enter password in the Enter Password field"
    type: "NLP_TEXT"
    conditionType: null
    testCaseId: 1
    stepGroupId: null
---
