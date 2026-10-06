---
title: "List projects"
description: "Get all projects in the account, with their IDs. Most other endpoints need an entity ID, and this is where a project's ID comes from."
sidebar:
  label: "List projects"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: page, desc: "Optional. Page number, starting at 0." }
    - { name: size, desc: "Optional. Results per page. Defaults to 20." }
    - { name: sort, desc: "Optional. Sort order, such as id,desc." }
  responseAttributes:
    - { name: id, desc: "Unique project identifier, used wherever an endpoint takes a project ID." }
    - { name: name, desc: "Name of the project." }
    - { name: description, desc: "Project description." }
    - { name: createdById, desc: "ID of the user who created the project." }
    - { name: createdDate, desc: "Epoch timestamp when the project was created." }
  response:
    - id: 9
      name: "E-commerce Web"
      description: "Web storefront regression"
      createdById: 2
      createdDate: 1732176819137
---
