---
title: "List addons"
description: "Retrieve a paginated list of addons (Kibbutz plugins) installed in the workspace."
sidebar:
  label: "List addons"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /addons
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number, 0-based. Default 0." }
    - { name: size, desc: "Number of items per page. Default 10." }
    - { name: sort, desc: "Sort field and direction, e.g. id,DESC." }
    - { name: q, desc: "Filter in key:value format, e.g. q=status:ACTIVE. Filterable fields include id, name, displayName, status." }
  responseAttributes:
    - { name: content, desc: "Array of installed addons. Each has id, name, displayName and status." }
    - { name: totalElements, desc: "Total number of addons across all pages." }
  response:
    content:
      - id: 7
        name: "sleep"
        displayName: "Sleep"
        status: "ACTIVE"
      - id: 12
        name: "pdf-compare"
        displayName: "PDF Compare"
        status: "ACTIVE"
    totalElements: 2
---
