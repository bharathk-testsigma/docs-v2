---
title: "List run results (v2)"
description: "Retrieve a paginated list of test plan run results across the workspace."
sidebar:
  label: "List run results (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number, starting at 0." }
    - { name: size, desc: "Number of results per page. Default 10." }
    - { name: sort, desc: "Sort order, e.g. sort=id,desc." }
    - { name: query, desc: "Filter using <parameter><operator><value> chained with commas, e.g. query=result:PASSED" }
  responseAttributes:
    - { name: content, desc: "Array of test run result objects." }
    - { name: totalElements, desc: "Total number of run results matching the query." }
    - { name: totalPages, desc: "Total number of pages available." }
  response:
    content:
      - id: 517
        testPlanId: 42
        startTime: "2024-05-29T07:28:02Z"
        endTime: "2024-05-29T07:30:11Z"
        duration: 129000
        result: "FAILURE"
      - id: 516
        testPlanId: 42
        startTime: "2024-05-28T11:02:45Z"
        endTime: "2024-05-28T11:04:12Z"
        duration: 87000
        result: "SUCCESS"
    totalElements: 2
    totalPages: 1
---
