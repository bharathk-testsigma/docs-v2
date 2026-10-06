---
title: "Create multiple test steps"
description: "Create multiple test steps in a test case in a single request."
sidebar:
  label: "Create multiple test steps"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /test_steps/bulk
  baseUrl: https://app.testsigma.com/api/v2
  bodyFields:
    - { name: testCaseId, desc: "Target test case ID." }
    - { name: steps, desc: "Array of step objects to create, inserted in the order listed." }
    - { name: "steps[].templateId", desc: "NLP template ID for the step. Mandatory for NLP_TEXT steps." }
    - { name: "steps[].elementId", desc: "The ID of the element associated with the step (required for templates with ${ui-identifier} in grammar)." }
    - { name: "steps[].text", desc: "Step input or parameter value." }
    - { name: "steps[].type", desc: "Step type: NLP_TEXT or STEP_GROUP." }
  requestBody:
    testCaseId: 9
    steps:
      - templateId: 1044
        elementId: 567
        text: "https://www.google.com"
        type: "NLP_TEXT"
      - templateId: 37
        type: "NLP_TEXT"
  responseAttributes:
    - { name: "(array)", desc: "Returns an array of the newly created test step objects. Steps are inserted immediately after previousStepId and their order is assigned automatically." }
  response:
    - id: 5847
      action: "Navigate to https://www.google.com"
      type: "NLP_TEXT"
      testCaseId: 9
      stepGroupId: null
    - id: 5848
      action: "Click"
      type: "NLP_TEXT"
      testCaseId: 9
      stepGroupId: null
---
