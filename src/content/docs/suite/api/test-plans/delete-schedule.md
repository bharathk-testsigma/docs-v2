---
title: "Delete a scheduled test plan"
description: "Delete an existing test plan schedule using the REST API."
sidebar:
  label: "Delete a schedule"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /schedule_executions/{scheduleId}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: scheduleId, desc: "The ID of the required schedule of the selected plan. The DELETE method removes the respective schedule and returns status code 202." }
  status: 202
  statusText: Accepted
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 202 Accepted on success. No response body." }
---
