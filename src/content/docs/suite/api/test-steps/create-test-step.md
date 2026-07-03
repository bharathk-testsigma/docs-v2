---
title: "Create a test step"
description: "Create a single test step in a test case."
sidebar:
  label: "Create a test step"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /test_steps
  baseUrl: https://app.testsigma.com/api/v2
  bodyFields:
    - { name: testCaseId, desc: "The ID of the test case where you want to add the new step." }
    - { name: templateId, desc: "Identifier for the type of action performed. Mandatory for NLP_TEXT steps (set stepGroupId to null)." }
    - { name: previousStepId, desc: "The ID of the step that the new step should follow." }
    - { name: elementId, desc: "The ID of the element associated with this step (required for templates with ${ui-identifier} in grammar)." }
    - { name: text, desc: "The value of the step's action, e.g. the URL to navigate to." }
    - { name: type, desc: "Step type: NLP_TEXT (Natural Language Processing text step) or STEP_GROUP (a group of steps executed together)." }
  requestBody:
    testCaseId: 9
    templateId: 1044
    previousStepId: 223
    elementId: 567
    text: "https://www.google.com"
    type: "NLP_TEXT"
  responseAttributes:
    - { name: id, desc: "Unique numerical identifier for the newly created test step." }
    - { name: action, desc: "Human-readable description of the action the step performs." }
    - { name: type, desc: "Step type: NLP_TEXT or STEP_GROUP." }
    - { name: conditionType, desc: "Condition applied to the step, if any." }
    - { name: testCaseId, desc: "Parent test case ID." }
    - { name: stepGroupId, desc: "Step group ID for STEP_GROUP steps; null for NLP_TEXT steps." }
  response:
    id: 5846
    action: "Navigate to https://www.google.com"
    type: "NLP_TEXT"
    conditionType: null
    testCaseId: 9
    stepGroupId: null
---
