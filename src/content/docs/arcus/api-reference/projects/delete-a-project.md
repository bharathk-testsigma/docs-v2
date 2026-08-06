---
title: "Delete a project"
description: "Permanently deletes a specific project by its unique identifier."
sidebar:
  label: "Delete a project"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /projects/{project_id}
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project to delete." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Confirmation message for the deletion; may be empty." }
  response:
    message: "Project deleted successfully."
---
