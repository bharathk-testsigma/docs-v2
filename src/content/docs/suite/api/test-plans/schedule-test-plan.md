---
title: "Schedule a test plan"
description: "Create a schedule for a test plan using the REST API."
sidebar:
  label: "Schedule a test plan"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /schedule_executions
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: name, desc: "The name you want to give to the test schedule." }
    - { name: executionId, desc: "Test plan ID from the GET API." }
    - { name: scheduleType, desc: "How frequently you want to run tests — ONCE, HOURLY, DAILY, WEEKLY, MONTHLY." }
    - { name: status, desc: "Status of the schedule, e.g. ACTIVE." }
    - { name: nextInterval, desc: "Date and time (yyyy-MM-dd'T'HH:mm:ss.SSS) to trigger the test plan. Sample data: 2022-12-14T11:13:00.000" }
    - { name: timezone, desc: "The timezone you want to follow." }
  requestBody:
    name: "New Test Plan Schedule"
    executionId: 180
    scheduleType: "ONCE"
    status: "ACTIVE"
    nextInterval: "2022-12-14T11:13:00.000"
    timezone: "EST"
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
    id: 21
    executionId: 180
    name: "New Test Plan Schedule"
    comments: null
    scheduleType: "WEEKLY"
    nextInterval: 1671016380000
    nextIntervalUTC: "2022-12-14T11:13:00Z"
    createdById: 10
    createdDate: 1671006911289
    updatedById: 10
    updatedDate: 1671006911289
    status: "ACTIVE"
---
