---
title: "Register a tunnel"
description: "Register a Testsigma Connect tunnel and receive a client certificate for the connection."
sidebar:
  label: "Register tunnel"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /connect/register
  baseUrl: https://app.testsigma.com/api/v2
  bodyFields:
    - { name: name, desc: "Tunnel name." }
    - { name: clientInfo, desc: "Object describing the connecting client — clientVersion, hostname, osName, osArch." }
  requestBody:
    name: "office-tunnel"
    clientInfo:
      clientVersion: "1.4.2"
      hostname: "build-agent-01"
      osName: "Linux"
      osArch: "amd64"
  responseAttributes:
    - { name: name, desc: "Name of the registered tunnel." }
    - { name: certificate, desc: "PEM-encoded client certificate issued for the tunnel connection." }
    - { name: clientInfo, desc: "Client details recorded at registration — clientVersion, hostname, osName, osArch." }
  response:
    name: "office-tunnel"
    certificate: "-----BEGIN CERTIFICATE-----\nMIIC8zCCAdugAwIBAgIUJ...\n-----END CERTIFICATE-----"
    clientInfo:
      clientVersion: "1.4.2"
      hostname: "build-agent-01"
      osName: "Linux"
      osArch: "amd64"
---
