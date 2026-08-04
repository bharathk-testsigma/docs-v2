---
title: "Get a project ID by name"
description: "Resolve a project name to its numeric project ID."
sidebar:
  label: "Get project ID by name"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_name}/id
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: project_name, desc: "The exact name of the project to resolve, e.g. My Project." }
  responseAttributes:
    - { name: "(number)", desc: "The numeric ID of the project with the given name." }
  response: 11
---
