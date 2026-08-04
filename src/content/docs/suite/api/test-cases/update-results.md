---
title: "Update Test Case Results Using API"
description: "Update Test Case results as Passed, Failed, or Not Executed for an execution run using the REST API."
sidebar:
  label: "Update results"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /execution_results/{run_id}/override
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: run_id, desc: "ID of the execution run. Can be obtained from the Run Results." }
  bodyFields:
    - { name: testCaseResultId, desc: "ID of the Test Case result." }
    - { name: comment, desc: "Comment you want to add to change the result." }
    - { name: result, desc: "The result you want to override the current result with." }
  requestBody:
    - testCaseResultId: 3646
      comment: "Modifying the results 1"
      result: "SUCCESS"
  responseAttributes:
    - { name: errors, desc: "Errors in request fields if there are any." }
    - { name: message, desc: "Message of overridden results." }
  response:
    errors: []
    message: "Overridden the results successfully"
---
