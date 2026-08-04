---
title: "Get an environment (v2)"
description: "Retrieve a single environment by ID, including all resolved project and environment variables."
sidebar:
  label: "Get an environment (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /environments/{environment_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: environment_id, desc: "Numeric ID of the environment to retrieve. Returns 404 if not found." }
  responseAttributes:
    - { name: id, desc: "Unique environment identifier." }
    - { name: name, desc: "Environment name." }
    - { name: description, desc: "Description of the environment." }
    - { name: projectId, desc: "ID of the project the environment belongs to." }
    - { name: variables, desc: "Array of resolved variables (project and environment scope). Each has id, key, value, isEncrypted." }
  response:
    id: 10
    name: "Staging"
    description: "Staging environment"
    projectId: 9
    variables:
      - id: 8
        key: "Url"
        value: "https://staging.testsigma.com"
        isEncrypted: false
      - id: 9
        key: "ApiKey"
        value: "********"
        isEncrypted: true
---
