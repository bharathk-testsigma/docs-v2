---
title: "Get an application"
description: "Retrieve a specific application and its details by ID."
sidebar:
  label: "Get application"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /applications/{application_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: application_id, desc: "The ID of the application to retrieve." }
  responseAttributes:
    - { name: id, desc: "Unique application identifier." }
    - { name: name, desc: "Application name." }
    - { name: description, desc: "Application description." }
    - { name: projectId, desc: "ID of the parent project." }
    - { name: applicationType, desc: "Type — WebApplication, AndroidNative, IOSNative, etc." }
    - { name: createdById, desc: "ID of the user who created the application." }
  response:
    id: 33
    name: "Simply Travel Web"
    description: "Web front-end"
    projectId: 11
    applicationType: "WebApplication"
    createdById: 9
---
