---
title: "List test runs"
description: "Retrieves a paginated list of test runs for a project."
sidebar:
  label: "List test runs"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/test_runs
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project whose test runs are listed." }
  query:
    - { name: "page_size", desc: "Number of test runs to return per page." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.test_runs[].id", desc: "Unique identifier of the test run." }
    - { name: "data.test_runs[].name", desc: "Name of the test run." }
    - { name: "data.test_runs[].status", desc: "Current status of the test run." }
    - { name: "data.test_runs[].created_at", desc: "Unix timestamp of when the test run was created." }
    - { name: "data.test_runs[].updated_at", desc: "Unix timestamp of the last update to the test run." }
    - { name: "page_info.page_size", desc: "Number of items returned per page." }
    - { name: "page_info.total_count", desc: "Total number of test runs available." }
    - { name: "page_info.next", desc: "URL to the next page of results, if any." }
    - { name: "page_info.prev", desc: "URL to the previous page of results, if any." }
  response:
    message: ""
    data:
      test_runs:
        - id: "7b2f9c14-58a1-4d2e-9f3a-6c1e8d40a2b9"
          name: "Regression suite — patient portal"
          status: "IN_PROGRESS"
          created_at: 1710675200
          updated_at: 1710761600
        - id: "e3d18a52-9f47-4c6b-b21d-77ac0e5b3f10"
          name: "Smoke suite — release 2.4"
          status: "PASSED"
          created_at: 1709452800
          updated_at: 1709539200
    page_info:
      page_size: 25
      total_count: 2
      next: null
      prev: null
---
