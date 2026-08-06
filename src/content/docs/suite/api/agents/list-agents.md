---
title: "List agents"
description: "Retrieve a paginated list of test agents registered in the workspace."
sidebar:
  label: "List agents"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /agents
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number, 0-based. Default 0." }
    - { name: size, desc: "Number of items per page. Default 10." }
    - { name: sort, desc: "Sort field and direction, e.g. id,DESC." }
    - { name: q, desc: "Filter in key:value format, e.g. q=title:local-agent. Filterable fields include id, title, status." }
  responseAttributes:
    - { name: content, desc: "Array of registered agents. Each has id, title, agentVersion, osType and status." }
    - { name: totalElements, desc: "Total number of agents across all pages." }
  response:
    content:
      - id: 3
        title: "local-agent"
        agentVersion: "4.1.9"
        osType: "WINDOWS"
        status: true
      - id: 5
        title: "ci-agent"
        agentVersion: "4.1.9"
        osType: "LINUX"
        status: false
    totalElements: 2
---
