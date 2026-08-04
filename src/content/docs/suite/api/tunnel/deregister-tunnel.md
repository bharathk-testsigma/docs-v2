---
title: "Deregister a tunnel"
description: "Deregister a Testsigma Connect tunnel by name and remove the associated client metadata."
sidebar:
  label: "Deregister tunnel"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /connect/deregister/name/{name}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: name, desc: "Name of the tunnel to deregister. Required." }
  query:
    - { name: hostname, desc: "Client hostname whose metadata should be cleaned up. Required." }
  status: 204
  statusText: No Content
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 204 No Content on success. No response body." }
---
