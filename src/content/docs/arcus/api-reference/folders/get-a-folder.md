---
title: "Get a folder"
description: "Retrieves the details of a specific folder within a project."
sidebar:
  label: "Get a folder"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/folders/{folder_id}
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project that contains the folder." }
    - { name: "folder_id", desc: "Unique identifier of the folder whose details are requested." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.folder.id", desc: "Unique identifier of the folder." }
    - { name: "data.folder.name", desc: "Name of the folder." }
    - { name: "data.folder.project_id", desc: "Identifier of the project to which the folder belongs." }
    - { name: "data.folder.children", desc: "Array of child folders, if any." }
    - { name: "data.folder.parent_folder_id", desc: "Identifier of the parent folder, if applicable." }
    - { name: "data.folder.order", desc: "Order index of the folder." }
  response:
    message: ""
    data:
      folder:
        id: "e8db64d3-9291-44d9-9e30-69438c272f05"
        name: "Regression Suite"
        project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        children: []
        parent_folder_id: ""
        order: 30
---
