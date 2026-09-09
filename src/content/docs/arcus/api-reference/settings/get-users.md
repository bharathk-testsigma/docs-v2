---
title: "Get users"
description: "Retrieves a list of all registered users along with their basic details."
sidebar:
  label: "Get users"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /users
  baseUrl: https://test-management.testsigma.com/api/v1
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data[].id", desc: "Unique identifier for the user." }
    - { name: "data[].email", desc: "User's email address." }
    - { name: "data[].first_name", desc: "User's first name." }
    - { name: "data[].last_name", desc: "User's last name." }
    - { name: "data[].created_at", desc: "Timestamp indicating when the user was created." }
    - { name: "data[].updated_at", desc: "Timestamp indicating when the user was last updated." }
    - { name: "data[].status", desc: "Current status of the user (e.g., active, inactive)." }
    - { name: "page_info.page_size", desc: "Number of users returned per page." }
    - { name: "page_info.total_count", desc: "Total number of users available." }
    - { name: "page_info.next", desc: "URL for the next page of results, if applicable." }
    - { name: "page_info.prev", desc: "URL for the previous page of results, if applicable." }
  response:
    message: ""
    data:
      - id: "5f9a82b6-4e79-4162-9da6-7a3c2e5f4183"
        email: "jane.doe@example.com"
        first_name: "Jane"
        last_name: "Doe"
        created_at: 1710675200
        updated_at: 1710675200
        status: "active"
      - id: "6a0b93c7-5f80-4273-8eb7-8b4d3f6a5294"
        email: "john.smith@example.com"
        first_name: "John"
        last_name: "Smith"
        created_at: 1710761600
        updated_at: 1710761600
        status: "inactive"
    page_info:
      page_size: 25
      total_count: 2
      next: ""
      prev: ""
---
