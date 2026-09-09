---
title: "List step groups"
description: "Retrieves a paginated list of step groups for a project."
sidebar:
  label: "List step groups"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/step_groups
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project whose step groups are listed." }
  query:
    - { name: "page_size", desc: "Number of step groups to return per page." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.step_groups[].id", desc: "Unique identifier of the step group." }
    - { name: "data.step_groups[].title", desc: "Title of the step group." }
    - { name: "data.step_groups[].description", desc: "Description of the step group." }
    - { name: "data.step_groups[].human_id", desc: "Human-readable identifier for the step group." }
    - { name: "data.step_groups[].project_id", desc: "Identifier of the project the step group belongs to." }
    - { name: "data.step_groups[].created_at", desc: "Unix timestamp of when the step group was created." }
    - { name: "data.step_groups[].updated_at", desc: "Unix timestamp of the last update to the step group." }
    - { name: "page_info.page_size", desc: "Number of items returned per page." }
    - { name: "page_info.total_count", desc: "Total number of step groups available for the project." }
    - { name: "page_info.next", desc: "URL to the next page of results, if any." }
    - { name: "page_info.prev", desc: "URL to the previous page of results, if any." }
  response:
    message: ""
    data:
      step_groups:
        - id: "b3d9f1a2-6c84-4e57-9a01-2f7c5d8e1b40"
          title: "Regression Test Step Group - 5"
          description: "Step group for regression test cases"
          human_id: "DEMO-SG-1"
          project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
          created_at: 1710675200
          updated_at: 1710675200
        - id: "e5f6a7b8-9c0d-4e1f-8a2b-3c4d5e6f7a8b"
          title: "Smoke Test Step Group - 2"
          description: "Step group for smoke test cases"
          human_id: "DEMO-SG-2"
          project_id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
          created_at: 1709452800
          updated_at: 1712131200
    page_info:
      page_size: 2
      total_count: 9
      next: "https://arcus.testsigma.com/api/v1/projects/c47ade67-0543-4582-a4a5-b7de447c94f5/step_groups?page_size=2&page=2"
      prev: ""
---
