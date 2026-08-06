---
title: "Get an environment"
description: "Retrieve a specific environment and its variables by ID."
sidebar:
  label: "Get an environment"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /environments/{env_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: env_id, desc: "The ID of the environment to retrieve. Found in the URL of the environment's detail page." }
  responseAttributes:
    - { name: id, desc: "Unique environment identifier." }
    - { name: name, desc: "Environment name." }
    - { name: description, desc: "Description of the environment." }
    - { name: variables, desc: "Array of key-value variables. Each has id, key, value, isEncrypted, projectId." }
    - { name: createdById, desc: "ID of the user who created the environment." }
    - { name: updatedById, desc: "ID of the user who last updated it." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
    - { name: updatedDate, desc: "Epoch timestamp of the last update." }
  response:
    id: 10
    name: "Staging"
    description: "Staging environment"
    createdById: 9
    updatedById: 9
    createdDate: 1732176819137
    updatedDate: 1732176819137
    variables:
      - id: 8
        key: "Url"
        value: "https://staging.testsigma.com"
        isEncrypted: false
        projectId: 9
---
