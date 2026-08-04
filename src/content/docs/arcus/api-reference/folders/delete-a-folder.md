---
title: "Delete a folder"
description: "Deletes a specific folder within a project."
sidebar:
  label: "Delete a folder"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /projects/{project_id}/folders/{folder_id}
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project that contains the folder." }
    - { name: "folder_id", desc: "Unique identifier of the folder to delete." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message indicating the result of the deletion; may be empty." }
  response:
    message: ""
---
