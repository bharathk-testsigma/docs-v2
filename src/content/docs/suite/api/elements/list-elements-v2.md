---
title: "List elements (v2)"
description: "Retrieve a paginated list of UI elements with their associated tags."
sidebar:
  label: "List elements (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /elements
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of elements per page." }
    - { name: sort, desc: "Sort field and direction, e.g. sort=id,DESC." }
    - { name: q, desc: "Filter in key:value format. Filterable fields include id, name, screenNameId, workspaceVersionId." }
  responseAttributes:
    - { name: content, desc: "Array of UI elements on this page, each with its UI_IDENTIFIER tags." }
    - { name: totalElements, desc: "Total number of elements across all pages." }
    - { name: totalPages, desc: "Total number of pages." }
  response:
    content:
      - id: 101
        name: "Login Button"
        locatorType: "xpath"
        definition: "//button[@id='login-btn']"
        screenNameId: 12
        workspaceVersionId: 39
        tags: ["login", "smoke"]
      - id: 102
        name: "Username Field"
        locatorType: "id"
        definition: "username"
        screenNameId: 12
        workspaceVersionId: 39
        tags: []
    totalElements: 2
    totalPages: 1
---
