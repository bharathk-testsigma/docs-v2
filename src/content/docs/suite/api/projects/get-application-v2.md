---
title: "Get an application (v2)"
description: "Retrieve a single application by its numeric ID."
sidebar:
  label: "Get application (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /applications/{application_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: application_id, desc: "The numeric ID of the application to retrieve. Returns 404 if not found." }
  responseAttributes:
    - { name: id, desc: "Unique application identifier." }
    - { name: name, desc: "Application name." }
    - { name: description, desc: "Application description." }
    - { name: applicationType, desc: "Type — WebApplication, AndroidNative, IOSNative, etc." }
    - { name: workspaceId, desc: "ID of the workspace (project) the application belongs to." }
  response:
    id: 33
    name: "Simply Travel Web"
    description: "Web front-end"
    applicationType: "WebApplication"
    workspaceId: 11
---
