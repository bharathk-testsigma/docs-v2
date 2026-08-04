---
title: "List folders"
description: "Retrieve a paginated list of folders, with optional field filters."
sidebar:
  label: "List folders"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /folders
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of items per page. Default 10." }
    - { name: sort, desc: "Sort field and direction, e.g. sort=id,DESC." }
    - { name: q, desc: "Filter in key:value format, e.g. q=name:Regression. Filterable fields include id, name, parentId, workspaceVersionId." }
  responseAttributes:
    - { name: id, desc: "Unique folder identifier." }
    - { name: name, desc: "Folder name." }
    - { name: parentId, desc: "ID of the parent folder, or null for top-level folders." }
    - { name: workspaceVersionId, desc: "ID of the workspace version the folder belongs to." }
  response:
    content:
      - id: 5
        name: "Regression"
        parentId: null
        workspaceVersionId: 39
      - id: 6
        name: "Smoke"
        parentId: 5
        workspaceVersionId: 39
    totalElements: 2
---
