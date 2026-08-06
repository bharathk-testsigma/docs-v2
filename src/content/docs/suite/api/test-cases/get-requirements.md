---
title: "Get requirements"
description: "Retrieve all test requirements linked to the project's application version."
sidebar:
  label: "Get requirements"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /requirements
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique requirement identifier." }
    - { name: requirementName, desc: "Name of the requirement." }
    - { name: requirementDescription, desc: "Detailed description of the requirement." }
    - { name: requirementTypeId, desc: "ID of the requirement type category." }
    - { name: applicationVersionId, desc: "ID of the application version this requirement targets." }
    - { name: plannedManualCount, desc: "Number of planned manual test cases." }
    - { name: plannedAutomationCount, desc: "Number of planned automated test cases." }
    - { name: startTime, desc: "Epoch timestamp for planned start." }
    - { name: endTime, desc: "Epoch timestamp for planned end." }
  response:
    content:
      - id: 71
        requirementName: "User Authentication"
        requirementDescription: "All login and logout flows"
        requirementTypeId: 78
        applicationVersionId: 47
        plannedManualCount: 5
        plannedAutomationCount: 10
        startTime: 1658114333000
        endTime: 1660706333000
        createdById: 9
    totalElements: 1
    totalPages: 1
---
