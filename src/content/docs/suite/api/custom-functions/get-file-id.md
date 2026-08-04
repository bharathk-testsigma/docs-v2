---
title: "Get a custom function file ID"
description: "Retrieve the file ID for a custom function class within a project."
sidebar:
  label: "Get file ID"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /custom_functions/{project_id}/{class_name}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: project_id, desc: "ID of the project the custom function belongs to." }
    - { name: class_name, desc: "Class name of the custom function." }
  response: 245
  responseAttributes:
    - { name: "(body)", desc: "The file ID (integer) of the custom function class within the project." }
---
