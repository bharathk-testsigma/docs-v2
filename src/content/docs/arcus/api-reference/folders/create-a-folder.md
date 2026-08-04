---
title: "Create a folder"
description: "Creates a new folder within a project to organize test assets hierarchically."
sidebar:
  label: "Create a folder"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /projects/{project_id}/folders
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project in which the folder is created." }
  bodyFields:
    - { name: "name", desc: "Name of the folder to be created." }
    - { name: "order", desc: "Order in which the folder should be displayed." }
  requestBody:
    name: "Regression Suite"
    order: 20
  status: 201
  statusText: Created
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.folder.id", desc: "Unique identifier of the created folder." }
    - { name: "data.folder.name", desc: "Name of the created folder." }
    - { name: "data.folder.project_id", desc: "Identifier of the project to which the folder belongs." }
    - { name: "data.folder.children", desc: "Array of child folders, if any." }
    - { name: "data.folder.parent_folder_id", desc: "Identifier of the parent folder, if applicable." }
    - { name: "data.folder.order", desc: "Order index of the folder." }
  response:
    message: ""
    data:
      folder:
        id: "a1f3c2d8-7b4e-4f91-9c2a-6e8d5b3a1c47"
        name: "Regression Suite"
        project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        children: []
        parent_folder_id: ""
        order: 1
---
