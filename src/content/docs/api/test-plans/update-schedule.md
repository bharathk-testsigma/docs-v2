---
title: "Update a scheduled test plan"
description: "Update an existing test plan schedule using the REST API."
sidebar:
  label: "Update a schedule"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /schedule_executions/{scheduleId}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: scheduleId, desc: "The ID of the required schedule of the selected plan." }
  bodyFields:
    - { name: name, desc: "The name you want to give to the test schedule." }
    - { name: executionId, desc: "Test plan ID from the GET API." }
    - { name: scheduleType, desc: "How frequently you want to run tests — ONCE, HOURLY, DAILY, WEEKLY, MONTHLY." }
    - { name: status, desc: "Status of the schedule, e.g. ACTIVE." }
    - { name: nextInterval, desc: "Date and time (yyyy-MM-dd'T'HH:mm:ss.SSS) to trigger the test plan." }
    - { name: timezone, desc: "The timezone you want to follow." }
  requestBody:
    name: "Updated schedule"
    executionId: 180
    scheduleType: "WEEKLY"
    status: "ACTIVE"
    nextInterval: "2022-12-20T15:28:00.000"
    timezone: "PST"
  responseAttributes:
    - { name: id, desc: "The ID of the schedule." }
    - { name: executionId, desc: "Test plan ID from the GET API." }
    - { name: name, desc: "The name given to the test schedule." }
    - { name: comments, desc: "Comments on the schedule." }
    - { name: scheduleType, desc: "How frequently tests run — ONCE, HOURLY, DAILY, WEEKLY, MONTHLY." }
    - { name: nextInterval, desc: "Epoch timestamp of the next trigger interval." }
    - { name: nextIntervalUTC, desc: "Next trigger interval in UTC." }
    - { name: createdById, desc: "The user ID of the creator." }
    - { name: createdDate, desc: "Date when the schedule was created." }
    - { name: updatedById, desc: "The user ID of the updater." }
    - { name: updatedDate, desc: "Date when the schedule was updated." }
    - { name: status, desc: "Status of the schedule." }
  response:
    id: 16
    executionId: 180
    name: "Updated schedule"
    comments: null
    scheduleType: "WEEKLY"
    nextInterval: 1671578880000
    nextIntervalUTC: "2022-12-20T23:28:00Z"
    createdById: 9
    createdDate: 1670995456000
    updatedById: 10
    updatedDate: 1671548631732
    status: "ACTIVE"
---
