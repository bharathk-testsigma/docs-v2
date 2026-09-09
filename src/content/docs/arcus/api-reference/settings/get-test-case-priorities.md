---
title: "Get test case priorities"
description: "Retrieves the list of priority levels that can be assigned to test cases."
sidebar:
  label: "Get test case priorities"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_cases/priorities
  baseUrl: https://arcus.testsigma.com/api/v1
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.priorities[].id", desc: "Unique identifier for the priority." }
    - { name: "data.priorities[].name", desc: "Name of the priority." }
    - { name: "data.priorities[].order", desc: "Numerical value indicating the order of the priority relative to others." }
    - { name: "data.priorities[].alias", desc: "Alternative name or shorthand for the priority." }
    - { name: "data.priorities[].icon_url", desc: "URL pointing to an icon representing the priority." }
    - { name: "page_info.page_size", desc: "Number of items returned per page." }
    - { name: "page_info.total_count", desc: "Total number of priorities available." }
    - { name: "page_info.next", desc: "URL for the next page of results, if applicable." }
    - { name: "page_info.prev", desc: "URL for the previous page of results, if applicable." }
  response:
    message: ""
    data:
      priorities:
        - id: "1b9c4e72-0a35-4d18-9f62-7c3e8a1b0d49"
          name: "High"
          order: 70
          alias: "high"
          icon_url: "https://assets.testsigma.com/icons/priorities/high.svg"
        - id: "2c8d5f83-1b46-4e29-8a73-6d4f9b2c1e50"
          name: "Medium"
          order: 2
          alias: "medium"
          icon_url: "https://assets.testsigma.com/icons/priorities/medium.svg"
    page_info:
      page_size: 25
      total_count: 2
      next: ""
      prev: ""
---
