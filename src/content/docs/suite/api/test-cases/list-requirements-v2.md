---
title: "List requirements (v2)"
description: "Retrieve a paginated list of requirements; filterable by ID, name, project, and parent."
sidebar:
  label: "List requirements (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /requirements
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number to retrieve, starting at 0." }
    - { name: size, desc: "Number of requirements per page." }
    - { name: sort, desc: "Sort field and direction, e.g. id,DESC." }
    - { name: q, desc: "Filter in key:value format, e.g. q=projectId:12. Filterable fields include id, name, projectId, parentId." }
  responseAttributes:
    - { name: id, desc: "Unique requirement identifier." }
    - { name: name, desc: "Requirement name." }
    - { name: projectId, desc: "ID of the project the requirement belongs to." }
    - { name: parentId, desc: "ID of the parent requirement, if any." }
  response:
    content:
      - id: 45
        name: "Password reset flow"
        projectId: 12
        parentId: 40
      - id: 40
        name: "User authentication"
        projectId: 12
        parentId: null
    totalElements: 2
---
