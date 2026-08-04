---
title: "List environments"
description: "Retrieve all environments configured in the workspace."
sidebar:
  label: "List environments"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /environments
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique environment identifier." }
    - { name: name, desc: "Environment name." }
    - { name: description, desc: "Description of the environment." }
    - { name: variables, desc: "Array of key-value variables defined for this environment." }
    - { name: createdById, desc: "ID of the user who created the environment." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
  response:
    content:
      - id: 10
        name: "Staging"
        description: "Staging environment"
        createdById: 9
        createdDate: 1732176819137
        variables:
          - id: 8
            key: "Url"
            value: "https://staging.testsigma.com"
            isEncrypted: false
      - id: 11
        name: "Production"
        description: "Production environment"
        createdById: 9
        createdDate: 1732200000000
        variables:
          - id: 9
            key: "Url"
            value: "https://app.testsigma.com"
            isEncrypted: false
    totalElements: 2
    totalPages: 1
---
