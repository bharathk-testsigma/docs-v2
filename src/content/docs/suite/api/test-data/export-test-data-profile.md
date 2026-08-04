---
title: "Export a test data profile"
description: "Download a test data profile as an XLSX file by ID."
sidebar:
  label: "Export profile"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_data/{id}/export
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the test data profile to export. Returns 404 if not found." }
  response: "(binary .xlsx file)"
  responseAttributes:
    - { name: "(file)", desc: "The profile as an .xlsx spreadsheet, returned as a Content-Disposition attachment." }
---
