---
title: "List applications (v2)"
description: "Retrieve a paginated list of applications, with optional field filters."
sidebar:
  label: "List applications (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /applications
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of items per page. Default 10." }
    - { name: sort, desc: "Sort field and direction, e.g. sort=id,DESC." }
    - { name: q, desc: "Filter in key:value format, e.g. q=name:Simply Travel Web. Filterable fields include id, name, applicationType, workspaceId." }
  responseAttributes:
    - { name: id, desc: "Unique application identifier." }
    - { name: name, desc: "Application name." }
    - { name: description, desc: "Application description." }
    - { name: applicationType, desc: "Type — WebApplication, AndroidNative, IOSNative, etc." }
    - { name: workspaceId, desc: "ID of the workspace (project) the application belongs to." }
  response:
    content:
      - id: 33
        name: "Simply Travel Web"
        description: "Web front-end"
        applicationType: "WebApplication"
        workspaceId: 11
      - id: 34
        name: "Simply Travel Android"
        description: "Android app"
        applicationType: "AndroidNative"
        workspaceId: 11
    totalElements: 2
---
