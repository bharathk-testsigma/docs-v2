---
title: "List roles"
description: "Retrieve a paginated list of roles defined in the workspace."
sidebar:
  label: "List roles"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /roles
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number, 0-based. Default 0." }
    - { name: size, desc: "Number of items per page. Default 10." }
    - { name: sort, desc: "Sort field and direction, e.g. id,DESC." }
    - { name: q, desc: "Filter in key:value format, e.g. q=name:Tester. Filterable fields include id and name." }
  responseAttributes:
    - { name: content, desc: "Array of roles. Each has id and name." }
    - { name: totalElements, desc: "Total number of roles across all pages." }
  response:
    content:
      - id: 2
        name: "Administrator"
      - id: 4
        name: "Tester"
    totalElements: 2
---
