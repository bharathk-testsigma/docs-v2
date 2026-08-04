---
title: "Create a dynamic agent"
description: "Create a dynamic agent, optionally backed by an external grid configuration."
sidebar:
  label: "Create dynamic agent"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /agents
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: name, desc: "Name for the new agent." }
    - { name: agentType, desc: "Type of the agent (AgentType enum)." }
    - { name: visibleToAll, desc: "Whether the agent is visible to all users." }
    - { name: maxSession, desc: "Maximum number of parallel sessions the agent allows." }
    - { name: externalConfig, desc: "External agent configuration — url, authenticationEnabled, userName, password, type (ExternalAgentType), browserList (list of OSBrowserType)." }
  requestBody:
    name: "Dynamic Grid Agent"
    agentType: "DYNAMIC"
    visibleToAll: true
    maxSession: 5
    externalConfig:
      url: "https://grid.example.com:4444/wd/hub"
      authenticationEnabled: false
      type: "GRID"
      browserList: ["Chrome", "Firefox"]
  responseAttributes:
    - { name: id, desc: "ID of the newly created agent." }
    - { name: name, desc: "Name of the agent." }
    - { name: agentType, desc: "Type of the agent." }
    - { name: visibleToAll, desc: "Whether the agent is visible to all users." }
    - { name: maxSession, desc: "Maximum number of parallel sessions." }
    - { name: jwtApiKey, desc: "JWT API key issued for the agent." }
    - { name: createdById, desc: "ID of the user who created the agent." }
    - { name: createdDate, desc: "Epoch timestamp of creation." }
  response:
    id: 42
    name: "Dynamic Grid Agent"
    agentType: "DYNAMIC"
    visibleToAll: true
    maxSession: 5
    jwtApiKey: "eyJhbGciOiJIUzUxMiJ9.eyJhZ2VudElkIjo0Mn0.example"
    createdById: 9
    createdDate: 1732176819137
---
