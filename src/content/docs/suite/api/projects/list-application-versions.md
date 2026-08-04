---
title: "List application versions"
description: "Retrieve a paginated list of application versions, with optional field filters."
sidebar:
  label: "List application versions"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /application_versions
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of items per page. Server default is 20." }
    - { name: sort, desc: "Sort field and direction, e.g. sort=id,DESC." }
    - { name: q, desc: "Filter in key:value format, e.g. q=applicationId:33. Filterable fields include id, versionName, applicationId, workspaceId." }
  responseAttributes:
    - { name: id, desc: "Unique application version identifier." }
    - { name: versionName, desc: "Name of the application version." }
    - { name: applicationId, desc: "ID of the application this version belongs to." }
  response:
    content:
      - id: 39
        versionName: "1.0"
        applicationId: 33
      - id: 40
        versionName: "2.0"
        applicationId: 33
    totalElements: 2
---
