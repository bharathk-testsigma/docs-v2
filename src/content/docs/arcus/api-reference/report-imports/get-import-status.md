---
title: "Get import status"
description: "Retrieves the status of a specific JUnit import job for a project."
sidebar:
  label: "Get import status"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/junit-imports/{import_id}/status
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project the import belongs to." }
    - { name: "import_id", desc: "Unique identifier of the JUnit import whose status is retrieved." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "status", desc: "Current status of the import (e.g. pending, in_progress, completed, failed)." }
    - { name: "details", desc: "Object with additional information about the import, including error messages or logs if it failed." }
  response:
    status: "completed"
    details: {}
---
