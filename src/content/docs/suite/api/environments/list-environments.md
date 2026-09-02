---
title: "List environments"
description: "Get all environments in the account, with their variables."
sidebar:
  label: "List environments"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /environments
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Optional. Page number, starting at 0." }
    - { name: size, desc: "Optional. Results per page." }
    - { name: sort, desc: "Optional. Sort order, such as id,desc." }
    - { name: projectId, desc: "Optional. Narrow the list to one project's environments." }
  responseAttributes:
    - { name: id, desc: "Unique environment identifier." }
    - { name: name, desc: "Name of the environment." }
    - { name: description, desc: "Environment description." }
    - { name: variables, desc: "The environment's variables, each with its key, value, and isEncrypted flag." }
    - { name: createdDate, desc: "Epoch timestamp when the environment was created." }
  response:
    - id: 10
      name: "Test environment1"
      description: "Test Environment"
      createdDate: 1732176819137
      variables:
        - id: 8
          key: "Url"
          value: "https://google.com"
          isEncrypted: false
          projectId: 9
---
