---
title: "List applications"
description: "Get the IDs and details of all applications across all projects."
sidebar:
  label: "List applications"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /applications
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique application identifier." }
    - { name: name, desc: "Application name." }
    - { name: description, desc: "Application description." }
    - { name: projectId, desc: "ID of the parent project." }
    - { name: applicationType, desc: "Type — WebApplication, AndroidNative, IOSNative, etc." }
    - { name: createdById, desc: "ID of the user who created the application." }
  response:
    - id: 33
      name: "Simply Travel Web"
      description: "Web front-end"
      projectId: 11
      applicationType: "WebApplication"
      createdById: 9
    - id: 34
      name: "Simply Travel Android"
      projectId: 11
      applicationType: "AndroidNative"
      createdById: 9
---
