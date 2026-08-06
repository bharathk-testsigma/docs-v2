---
title: "List screen names"
description: "Retrieve a paginated list of element screen names."
sidebar:
  label: "List screen names"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /screen_names
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of screen names per page." }
    - { name: sort, desc: "Sort field and direction, e.g. sort=id,DESC." }
    - { name: q, desc: "Filter in key:value format. Filterable fields include id, name, workspaceVersionId." }
  responseAttributes:
    - { name: content, desc: "Array of screen names on this page." }
    - { name: totalElements, desc: "Total number of screen names across all pages." }
    - { name: totalPages, desc: "Total number of pages." }
  response:
    content:
      - id: 12
        name: "Login Page"
        workspaceVersionId: 39
      - id: 13
        name: "Dashboard"
        workspaceVersionId: 39
    totalElements: 2
    totalPages: 1
---
