---
title: "Update an environment"
description: "Update an existing environment's name, description, or variable values."
sidebar:
  label: "Update an environment"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /environments/{env_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: env_id, desc: "The ID of the environment to update." }
  bodyFields:
    - { name: name, desc: "Updated environment name." }
    - { name: description, desc: "Updated description." }
    - { name: id, desc: "Environment ID (must match the path parameter)." }
    - { name: projectId, desc: "Project ID the environment belongs to." }
    - { name: variables, desc: "Full array of variables. Include id for existing variables to update them." }
  requestBody:
    id: 10
    name: "Staging"
    description: "Updated staging environment"
    projectId: 9
    variables:
      - id: "8"
        key: "Url"
        value: "https://new-staging.testsigma.com"
        isEncrypted: false
        projectId: 9
  responseAttributes:
    - { name: id, desc: "Environment identifier." }
    - { name: name, desc: "Updated environment name." }
    - { name: variables, desc: "Updated variables array." }
    - { name: updatedDate, desc: "Epoch timestamp of the update." }
  response:
    id: 10
    name: "Staging"
    description: "Updated staging environment"
    projectId: 9
    updatedById: 9
    updatedDate: 1732400000000
    variables:
      - id: 8
        key: "Url"
        value: "https://new-staging.testsigma.com"
        isEncrypted: false
        projectId: 9
---
