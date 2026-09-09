---
title: "List test runs for a test plan"
description: "Retrieves the test runs associated with a specific test plan."
sidebar:
  label: "List test runs for a test plan"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/test_plans/{test_plan_id}/test_runs
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project that contains the test plan." }
    - { name: "test_plan_id", desc: "Unique identifier of the test plan whose test runs are listed." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.test_runs[].id", desc: "Unique identifier of the test run." }
    - { name: "data.test_runs[].status", desc: "Current status of the test run (e.g., PASSED, FAILED)." }
    - { name: "data.test_runs[].started_at", desc: "Unix timestamp indicating when the test run started." }
    - { name: "data.test_runs[].ended_at", desc: "Unix timestamp indicating when the test run ended." }
    - { name: "data.test_runs[].duration", desc: "Total time taken for the test run, in seconds." }
    - { name: "data.test_runs[].results", desc: "Detailed results of the test execution." }
    - { name: "page_info.page_size", desc: "Number of items returned per page." }
    - { name: "page_info.total_count", desc: "Total number of test runs available." }
    - { name: "page_info.next", desc: "URL to the next page of results, if any." }
    - { name: "page_info.prev", desc: "URL to the previous page of results, if any." }
  response:
    message: ""
    data:
      test_runs:
        - id: "8756d172-0c4f-4e37-9493-30a67d321863"
          status: "PASSED"
          started_at: 1710374400
          ended_at: 1710378000
          duration: 3600
          results:
            total: 42
            passed: 42
            failed: 0
        - id: "c0e4b9a1-2d76-4f53-91ac-5b8e3f6d20c7"
          status: "FAILED"
          started_at: 1710460800
          ended_at: 1710465300
          duration: 4500
          results:
            total: 42
            passed: 38
            failed: 4
    page_info:
      page_size: 2
      total_count: 5
      next: "https://arcus.testsigma.com/api/v1/projects/bd57bbc6-e83e-4f09-927d-fc48b3509cdf/test_plans/8756d172-0c4f-4e37-9493-30a67d321863/test_runs?page_size=2&page=2"
      prev: ""
---
