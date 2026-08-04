---
title: "List projects"
description: "Get the IDs and details of all projects in the workspace."
sidebar:
  label: "List projects"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique project identifier." }
    - { name: name, desc: "Project name." }
    - { name: description, desc: "Project description." }
    - { name: projectType, desc: "Application type — WebApplication, AndroidNative, IOSNative, etc." }
    - { name: hasMultipleApps, desc: "Whether the project contains multiple apps." }
    - { name: hasMultipleVersions, desc: "Whether the project uses versioning." }
    - { name: isDemo, desc: "Whether this is a demo project." }
    - { name: createdById, desc: "ID of the user who created the project." }
  response:
    - id: 11
      name: "Simply Travel (Demo)"
      description: "Demo application. Feel free to delete."
      projectType: "WebApplication"
      hasMultipleApps: true
      hasMultipleVersions: true
      isDemo: true
      createdById: 9
    - id: 12
      name: "Checkout"
      projectType: "WebApplication"
      isDemo: false
      createdById: 9
---
