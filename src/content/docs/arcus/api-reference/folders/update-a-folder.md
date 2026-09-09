---
title: "Update a folder"
description: "Updates the name or display order of a specific folder within a project."
sidebar:
  label: "Update a folder"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /projects/{project_id}/folders/{folder_id}
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project that contains the folder." }
    - { name: "folder_id", desc: "Unique identifier of the folder to update." }
  bodyFields:
    - { name: "name", desc: "New name of the folder." }
    - { name: "order", desc: "Order in which the folder should be displayed. A value of -1 indicates the order is not set." }
  requestBody:
    name: "Regression Suite (Updated)"
    order: -1
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.folder.id", desc: "Unique identifier of the folder." }
    - { name: "data.folder.name", desc: "Updated name of the folder." }
    - { name: "data.folder.project_id", desc: "Identifier of the project to which the folder belongs." }
    - { name: "data.folder.children", desc: "Array of child folders, if any." }
    - { name: "data.folder.parent_folder_id", desc: "Identifier of the parent folder, if applicable." }
    - { name: "data.folder.order", desc: "Updated order index of the folder." }
  response:
    message: ""
    data:
      folder:
        id: "c69216e0-e2a9-401f-9e08-77176abce8c4"
        name: "Regression Suite (Updated)"
        project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        children: []
        parent_folder_id: ""
        order: -1
---
