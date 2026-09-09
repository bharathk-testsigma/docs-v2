---
title: "Move a folder"
description: "Moves a folder within a project to a new parent folder."
sidebar:
  label: "Move a folder"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /projects/{project_id}/folders/{folder_id}/move
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project that contains the folder." }
    - { name: "folder_id", desc: "Unique identifier of the folder to move." }
  bodyFields:
    - { name: "parent_folder_id", desc: "Identifier of the new parent folder to which the folder will be moved." }
  requestBody:
    parent_folder_id: "c69216e0-e2a9-401f-9e08-77176abce8c4"
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.folder.id", desc: "Unique identifier of the moved folder." }
    - { name: "data.folder.name", desc: "Name of the moved folder." }
    - { name: "data.folder.project_id", desc: "Identifier of the project to which the folder belongs." }
    - { name: "data.folder.children", desc: "Array of child folders, if any." }
    - { name: "data.folder.parent_folder_id", desc: "Identifier of the new parent folder." }
    - { name: "data.folder.order", desc: "Order index of the folder within the parent folder." }
  response:
    message: ""
    data:
      folder:
        id: "c7db032b-d7ca-413b-8bff-74073e9618c4"
        name: "Smoke Tests"
        project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        children: []
        parent_folder_id: "c69216e0-e2a9-401f-9e08-77176abce8c4"
        order: 50
---
