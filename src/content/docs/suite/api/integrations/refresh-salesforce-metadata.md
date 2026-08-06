---
title: "Refresh Salesforce metadata"
description: "Trigger a Salesforce metadata refresh using an API call without logging into the Testsigma application or performing UI actions."
sidebar:
  label: "Refresh Salesforce metadata"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /salesforce_metadata_sync/sync_data
  baseUrl: https://app.testsigma.com/api_private/v1
  bodyFields:
    - { name: id, desc: "Salesforce Metadata Connection ID. Copy it from SF Connections > Metadata Connection > Copy Connection ID." }
  requestBody:
    id: 70
  responseAttributes:
    - { name: id, desc: "Refresh Trigger ID." }
    - { name: metadataSyncResult, desc: "Status of metadata sync process." }
    - { name: metadataSyncType, desc: "Type of metadata sync." }
    - { name: salesforceConnectionId, desc: "Salesforce Connection ID." }
  response:
    id: 133
    metadataSyncResult: "NOT STARTED"
    metadataSyncType: "UPDATE SYNC"
    salesforceConnectionId: 70
---
