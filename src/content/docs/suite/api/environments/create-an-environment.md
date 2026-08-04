---
title: "Create an environment"
description: "Create a new environment with variables for dynamic test configuration."
sidebar:
  label: "Create an environment"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /environments
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: name, desc: "Name of the new environment." }
    - { name: description, desc: "Optional description." }
    - { name: projectId, desc: "ID of the project to create the environment in." }
    - { name: variables, desc: "Array of key-value pairs. Each entry needs key, value, isEncrypted, projectId." }
  requestBody:
    name: "QA Environment"
    description: "Environment for QA testing"
    projectId: 9
    variables:
      - key: "Url"
        value: "https://qa.testsigma.com"
        isEncrypted: false
        projectId: 9
      - key: "ApiKey"
        value: "your-api-key"
        isEncrypted: true
        projectId: 9
  responseAttributes:
    - { name: id, desc: "ID of the newly created environment." }
    - { name: name, desc: "Environment name." }
    - { name: variables, desc: "Created variables with generated IDs." }
  response:
    id: 12
    name: "QA Environment"
    description: "Environment for QA testing"
    projectId: 9
    createdById: 9
    createdDate: 1732300000000
    variables:
      - id: 15
        key: "Url"
        value: "https://qa.testsigma.com"
        isEncrypted: false
        projectId: 9
---
