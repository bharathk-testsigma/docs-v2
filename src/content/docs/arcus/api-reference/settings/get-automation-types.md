---
title: "Get automation types"
description: "Retrieves the list of automation types available in the test case management system."
sidebar:
  label: "Get automation types"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_cases/automation_types
  baseUrl: https://test-management.testsigma.com/api/v1
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.automation_types[].id", desc: "Unique identifier for the automation type." }
    - { name: "data.automation_types[].name", desc: "Name of the automation type." }
    - { name: "data.automation_types[].order", desc: "Numerical value indicating the display order of the automation type." }
    - { name: "data.automation_types[].alias", desc: "Alternative name or identifier for the automation type." }
    - { name: "data.automation_types[].icon_url", desc: "URL pointing to an icon representing the automation type." }
    - { name: "page_info.page_size", desc: "Number of items returned per page." }
    - { name: "page_info.total_count", desc: "Total number of automation types available." }
    - { name: "page_info.next", desc: "URL for the next page of results, if applicable." }
    - { name: "page_info.prev", desc: "URL for the previous page of results, if applicable." }
  response:
    message: ""
    data:
      automation_types:
        - id: "a1f3c9d2-6b54-4e87-9a21-0d4e7c2f8b10"
          name: "Web Application"
          order: 60
          alias: "web"
          icon_url: "https://assets.testsigma.com/icons/automation/web.svg"
        - id: "b8e2d471-3c09-4f16-8d75-2a6b9e1c4f33"
          name: "Mobile Web"
          order: 2
          alias: "mobile_web"
          icon_url: "https://assets.testsigma.com/icons/automation/mobile-web.svg"
    page_info:
      page_size: 25
      total_count: 2
      next: ""
      prev: ""
---
