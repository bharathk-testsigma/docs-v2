---
title: "List projects"
description: "Retrieves a paginated list of projects, with optional filtering by query parameters."
sidebar:
  label: "List projects"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects
  baseUrl: https://test-management.testsigma.com/api/v1
  query:
    - { name: "page_size", desc: "Number of projects to return per page." }
    - { name: "name__NEQ", desc: "Excludes projects whose name matches the given value." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.projects[].id", desc: "Unique identifier of the project." }
    - { name: "data.projects[].created_at", desc: "Unix timestamp of when the project was created." }
    - { name: "data.projects[].updated_at", desc: "Unix timestamp of the last update to the project." }
    - { name: "data.projects[].name", desc: "Name of the project." }
    - { name: "data.projects[].description", desc: "Description of the project." }
    - { name: "data.projects[].human_id_prefix", desc: "Prefix used for the project's human-readable identifier." }
    - { name: "page_info.page_size", desc: "Number of items returned per page." }
    - { name: "page_info.total_count", desc: "Total number of projects available." }
    - { name: "page_info.next", desc: "URL to the next page of results, if any." }
    - { name: "page_info.prev", desc: "URL to the previous page of results, if any." }
  response:
    message: ""
    data:
      projects:
        - id: "18c50239-946d-428e-aa0c-260329f5c151"
          created_at: 1709452800
          updated_at: 1712131200
          name: "Health Care Project"
          description: "Regression suite for the patient portal"
          human_id_prefix: "HCP"
        - id: "a91f3c2d-7b64-4e18-9f02-5c8a1d6e4b73"
          created_at: 1707436800
          updated_at: 1710115200
          name: "Banking Platform"
          description: "End-to-end tests for the core banking app"
          human_id_prefix: "BNK"
    page_info:
      page_size: 2
      total_count: 17
      next: "https://test-management.testsigma.com/api/v1/projects?page_size=2&page=2"
      prev: ""
---
