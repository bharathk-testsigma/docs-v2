---
title: "Get test case statuses"
description: "Retrieves the list of available test case statuses used in the test management workflow."
sidebar:
  label: "Get test case statuses"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_cases/statuses
  baseUrl: https://arcus.testsigma.com/api/v1
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.statuses[].id", desc: "Unique identifier for the status." }
    - { name: "data.statuses[].name", desc: "Name of the status." }
    - { name: "data.statuses[].order", desc: "Integer representing the order of the status in the list." }
    - { name: "data.statuses[].alias", desc: "Alternative name or identifier for the status." }
    - { name: "data.statuses[].icon_url", desc: "URL pointing to an icon representing the status." }
    - { name: "page_info.page_size", desc: "Number of items returned per page." }
    - { name: "page_info.total_count", desc: "Total number of statuses available." }
    - { name: "page_info.next", desc: "URL for the next page of results, if applicable." }
    - { name: "page_info.prev", desc: "URL for the previous page of results, if applicable." }
  response:
    message: ""
    data:
      statuses:
        - id: "e2a47c91-8b03-4d56-a719-5c8f0e2b6d14"
          name: "Active"
          order: 80
          alias: "active"
          icon_url: "https://assets.testsigma.com/icons/statuses/active.svg"
        - id: "f5d18b62-9c47-4a03-bd28-6e9a1f3c0b75"
          name: "Draft"
          order: 2
          alias: "draft"
          icon_url: "https://assets.testsigma.com/icons/statuses/draft.svg"
    page_info:
      page_size: 25
      total_count: 2
      next: ""
      prev: ""
---
