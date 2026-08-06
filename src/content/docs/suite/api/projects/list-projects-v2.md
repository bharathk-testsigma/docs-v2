---
title: "List projects (v2)"
description: "Retrieve a paginated list of projects, with optional field filters."
sidebar:
  label: "List projects (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of items per page. Default 10." }
    - { name: sort, desc: "Sort field and direction, e.g. sort=id,DESC." }
    - { name: q, desc: "Filter in key:value format, e.g. q=name:Checkout. Filterable fields include id, name, appType, userId. Non-admin users only see projects they own." }
  responseAttributes:
    - { name: id, desc: "Unique project identifier." }
    - { name: name, desc: "Project name." }
    - { name: description, desc: "Project description." }
    - { name: appType, desc: "Application type of the project." }
    - { name: createdById, desc: "ID of the user who created the project." }
  response:
    content:
      - id: 11
        name: "Simply Travel (Demo)"
        description: "Demo application. Feel free to delete."
        appType: "WebApplication"
        createdById: 9
      - id: 12
        name: "Checkout"
        description: "Checkout flows"
        appType: "WebApplication"
        createdById: 9
    totalElements: 2
---
