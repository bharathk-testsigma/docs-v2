---
title: "Update an environment variable"
description: "Add or update a single variable in an environment."
sidebar:
  label: "Update variable"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /environments/{env_id}/variable
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: env_id, desc: "The ID of the environment that holds the variable." }
  bodyFields:
    - { name: id, desc: "ID of an existing variable to update. Omit to add a new variable." }
    - { name: key, desc: "Variable name." }
    - { name: value, desc: "Variable value. Required." }
    - { name: isEncrypted, desc: "Whether the value is stored encrypted. Required." }
    - { name: projectId, desc: "ID of the project the variable belongs to. Required." }
    - { name: variableUpdateType, desc: "VariableUpdateType enum value controlling how the variable is applied." }
  requestBody:
    id: 8
    key: "Url"
    value: "https://staging.testsigma.com"
    isEncrypted: false
    projectId: 9
  responseAttributes:
    - { name: id, desc: "Unique environment identifier." }
    - { name: name, desc: "Environment name." }
    - { name: description, desc: "Description of the environment." }
    - { name: variables, desc: "Array of key-value variables, including the added or updated one." }
    - { name: updatedById, desc: "ID of the user who last updated the environment." }
    - { name: updatedDate, desc: "Epoch timestamp of the last update." }
  response:
    id: 10
    name: "Staging"
    description: "Staging environment"
    createdById: 9
    updatedById: 9
    createdDate: 1732176819137
    updatedDate: 1732261000000
    variables:
      - id: 8
        key: "Url"
        value: "https://staging.testsigma.com"
        isEncrypted: false
        projectId: 9
---
