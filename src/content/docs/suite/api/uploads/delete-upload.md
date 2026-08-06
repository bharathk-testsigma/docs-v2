---
title: "Delete an upload"
description: "Delete an uploaded file from the workspace by ID."
sidebar:
  label: "Delete file"
  badge: { text: DELETE, variant: danger }
api:
  method: DELETE
  path: /uploads/{upload_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: upload_id, desc: "The ID of the upload to delete. Returns 404 if not found." }
  response: null
  responseAttributes:
    - { name: "(empty)", desc: "Returns 200 OK on success. No response body." }
---
