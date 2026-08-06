---
title: "List schedules"
description: "Retrieve a paginated list of scheduled test plans."
sidebar:
  label: "List schedules"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /schedule_executions
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of items per page." }
    - { name: sort, desc: "Sort field and direction, e.g. id,desc." }
  responseAttributes:
    - { name: id, desc: "ID of the schedule." }
    - { name: name, desc: "Name of the schedule." }
    - { name: executionId, desc: "ID of the test plan the schedule triggers." }
    - { name: scheduleType, desc: "How frequently tests run — ONCE, HOURLY, DAILY, WEEKLY, MONTHLY." }
    - { name: nextInterval, desc: "Epoch timestamp of the next trigger interval." }
    - { name: status, desc: "Status of the schedule, e.g. ACTIVE." }
    - { name: createdById, desc: "ID of the user who created the schedule." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
  response:
    content:
      - id: 21
        name: "Nightly regression"
        executionId: 180
        scheduleType: "DAILY"
        nextInterval: 1732233600000
        status: "ACTIVE"
        createdById: 10
        createdDate: 1732176819137
      - id: 22
        name: "Weekly smoke"
        executionId: 182
        scheduleType: "WEEKLY"
        nextInterval: 1732752000000
        status: "ACTIVE"
        createdById: 10
        createdDate: 1732200000000
    totalElements: 2
    totalPages: 1
---
