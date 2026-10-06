---
title: "Get Salesforce metadata refresh status"
description: "Check the status of a Salesforce metadata refresh using an API call."
sidebar:
  label: "Get refresh status"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /salesforce_metadata_sync/{triggerId}/fetchMetaDataSyncResultStatus
  baseUrl: https://app.testsigma.com/api_private/v1
  pathParams:
    - { name: triggerId, desc: "Refresh Trigger ID returned when the metadata refresh was triggered." }
  responseAttributes:
    - { name: status, desc: "Status of metadata sync process." }
    - { name: message, desc: "Additional information of sync process." }
  response:
    status: "IN_PROGRESS"
    message: "Metadata refresh already in progress"
---
