---
title: "List folders"
description: "Retrieves a paginated list of folders associated with a specific project."
sidebar:
  label: "List folders"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/folders
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project whose folders are listed." }
  query:
    - { name: "page_size", desc: "Number of folders to return per page." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.folders[].id", desc: "Unique identifier of the folder." }
    - { name: "data.folders[].name", desc: "Name of the folder." }
    - { name: "data.folders[].project_id", desc: "Identifier of the project to which the folder belongs." }
    - { name: "data.folders[].children", desc: "Array of child folders, if any." }
    - { name: "data.folders[].parent_folder_id", desc: "Identifier of the parent folder, if applicable." }
    - { name: "data.folders[].order", desc: "Order index of the folder." }
    - { name: "page_info.page_size", desc: "Number of items returned in this response." }
    - { name: "page_info.total_count", desc: "Total number of folders available." }
    - { name: "page_info.next", desc: "URL for the next page of results, if available." }
    - { name: "page_info.prev", desc: "URL for the previous page of results, if available." }
  response:
    message: ""
    data:
      folders:
        - id: "e8db64d3-9291-44d9-9e30-69438c272f05"
          name: "Regression Suite"
          project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
          children: []
          parent_folder_id: ""
          order: 40
        - id: "c69216e0-e2a9-401f-9e08-77176abce8c4"
          name: "Smoke Tests"
          project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
          children: []
          parent_folder_id: ""
          order: 2
    page_info:
      page_size: 3
      total_count: 2
      next: ""
      prev: ""
---
