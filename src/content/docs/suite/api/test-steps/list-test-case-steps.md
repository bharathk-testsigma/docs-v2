---
title: "List test case steps"
description: "Retrieve all steps of a specific test case in their execution order."
sidebar:
  label: "List test case steps"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_steps/find_all/{testCaseId}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: testCaseId, desc: "Identifier of the test case." }
  responseAttributes:
    - { name: "(array)", desc: "Returns an array of test step objects in step sequence order." }
  response:
    - id: 12345
      action: "Navigate to https://www.google.com"
      type: "NLP_TEXT"
      stepOrder: 1.0
      testCaseId: 123
    - id: 12346
      action: "Click on the login button"
      type: "NLP_TEXT"
      stepOrder: 2.0
      testCaseId: 123
---
