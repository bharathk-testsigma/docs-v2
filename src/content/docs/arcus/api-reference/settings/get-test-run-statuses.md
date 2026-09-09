---
title: "Get test run statuses"
description: "Retrieves the list of statuses that can be associated with test runs."
sidebar:
  label: "Get test run statuses"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/statuses
  baseUrl: https://arcus.testsigma.com/api/v1
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.statuses[].id", desc: "Unique identifier for the status." }
    - { name: "data.statuses[].name", desc: "Name of the status." }
    - { name: "data.statuses[].order", desc: "Order in which the status appears." }
    - { name: "data.statuses[].icon_url", desc: "URL pointing to an icon representing the status." }
    - { name: "data.statuses[].alias", desc: "Alternative name or identifier for the status." }
    - { name: "page_info.page_size", desc: "Number of items returned per page." }
    - { name: "page_info.total_count", desc: "Total number of statuses available." }
    - { name: "page_info.next", desc: "URL for the next page of results, if applicable." }
    - { name: "page_info.prev", desc: "URL for the previous page of results, if applicable." }
  response:
    message: ""
    data:
      statuses:
        - id: "3d7e6094-2c57-4f30-9b84-5e1a0c3d2f61"
          name: "Running"
          order: 100
          icon_url: "https://assets.testsigma.com/icons/run-statuses/running.svg"
          alias: "running"
        - id: "4e8f71a5-3d68-4051-8c95-6f2b1d4e3072"
          name: "Completed"
          order: 2
          icon_url: "https://assets.testsigma.com/icons/run-statuses/completed.svg"
          alias: "completed"
    page_info:
      page_size: 25
      total_count: 2
      next: ""
      prev: ""
---
