---
title: "List applications"
description: "Get all applications in the account, with their IDs and types."
sidebar:
  label: "List applications"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /applications
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Optional. Page number, starting at 0." }
    - { name: size, desc: "Optional. Results per page." }
    - { name: sort, desc: "Optional. Sort order, such as id,desc." }
    - { name: projectId, desc: "Optional. Narrow the list to one project's applications." }
  responseAttributes:
    - { name: id, desc: "Unique application identifier, used wherever an endpoint takes an application ID." }
    - { name: name, desc: "Name of the application." }
    - { name: projectId, desc: "ID of the project the application belongs to." }
    - { name: applicationType, desc: "The application type — web, mobile web, Android, iOS, Salesforce, Windows, or REST API." }
    - { name: createdDate, desc: "Epoch timestamp when the application was created." }
  response:
    - id: 47
      name: "Storefront"
      projectId: 9
      applicationType: "WebApplication"
      createdDate: 1732176819137
---
