---
title: "Get test case types"
description: "Retrieves the available test case types that can be used in test planning and execution."
sidebar:
  label: "Get test case types"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_cases/types
  baseUrl: https://arcus.testsigma.com/api/v1
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.types[].id", desc: "Unique identifier for the test case type." }
    - { name: "data.types[].name", desc: "Name of the test case type." }
    - { name: "data.types[].order", desc: "Order in which the test case type appears." }
    - { name: "data.types[].alias", desc: "Alternative name or identifier for the test case type." }
    - { name: "data.types[].icon_url", desc: "URL pointing to an icon representing the test case type." }
    - { name: "page_info.page_size", desc: "Number of items returned per page." }
    - { name: "page_info.total_count", desc: "Total number of test case types available." }
    - { name: "page_info.next", desc: "URL for the next page of results, if applicable." }
    - { name: "page_info.prev", desc: "URL for the previous page of results, if applicable." }
  response:
    message: ""
    data:
      types:
        - id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
          name: "Functional"
          order: 90
          alias: "functional"
          icon_url: "https://assets.testsigma.com/icons/types/functional.svg"
        - id: "d91be238-7a16-4c50-bf83-1e6d2a9f0c47"
          name: "Regression"
          order: 2
          alias: "regression"
          icon_url: "https://assets.testsigma.com/icons/types/regression.svg"
    page_info:
      page_size: 25
      total_count: 2
      next: ""
      prev: ""
---
