---
title: "List environments (v2)"
description: "Retrieve a paginated list of environments, each populated with its variables."
sidebar:
  label: "List environments (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /environments
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of environments per page." }
    - { name: sort, desc: "Sort field and direction, e.g. sort=id,DESC." }
    - { name: q, desc: "Filter in key:value format. Filterable fields include id, name, projectId, workspaceVersionId." }
  responseAttributes:
    - { name: content, desc: "Array of environments on this page, each with its variables." }
    - { name: totalElements, desc: "Total number of environments across all pages." }
    - { name: totalPages, desc: "Total number of pages." }
  response:
    content:
      - id: 10
        name: "Staging"
        description: "Staging environment"
        projectId: 9
        variables:
          - id: 8
            key: "Url"
            value: "https://staging.testsigma.com"
            isEncrypted: false
      - id: 11
        name: "Production"
        description: "Production environment"
        projectId: 9
        variables:
          - id: 9
            key: "Url"
            value: "https://app.testsigma.com"
            isEncrypted: false
    totalElements: 2
    totalPages: 1
---
