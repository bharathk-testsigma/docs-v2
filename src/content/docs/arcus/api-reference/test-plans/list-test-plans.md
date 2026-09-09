---
title: "List test plans"
description: "Retrieves a paginated list of test plans for a specific project."
sidebar:
  label: "List test plans"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}/test_plans
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project whose test plans are listed." }
  query:
    - { name: "page_size", desc: "Number of test plans to return per page." }
    - { name: "name__NEQ", desc: "Excludes test plans whose name matches the given value." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.test_plans[].id", desc: "Unique identifier of the test plan." }
    - { name: "data.test_plans[].human_id", desc: "Human-readable identifier of the test plan." }
    - { name: "data.test_plans[].name", desc: "Name of the test plan." }
    - { name: "data.test_plans[].description", desc: "Description of the test plan." }
    - { name: "data.test_plans[].status", desc: "Current status of the test plan." }
    - { name: "data.test_plans[].created_at", desc: "Unix timestamp of when the test plan was created." }
    - { name: "data.test_plans[].updated_at", desc: "Unix timestamp of the last update to the test plan." }
    - { name: "page_info.page_size", desc: "Number of items returned per page." }
    - { name: "page_info.total_count", desc: "Total number of test plans available." }
    - { name: "page_info.next", desc: "URL to the next page of results, if any." }
    - { name: "page_info.prev", desc: "URL to the previous page of results, if any." }
  response:
    message: ""
    data:
      test_plans:
        - id: "f2a8c1d4-9e63-4b27-8a51-7c0d6e9f3b42"
          human_id: "HCP-P-1"
          name: "Patient Portal Regression"
          description: "Full regression cycle for the Q2 patient portal release."
          status: "ACTIVE"
          created_at: 1710370000
          updated_at: 1710716800
        - id: "6b9d0e72-3f15-4c88-a204-8e1f5a7c2d90"
          human_id: "HCP-P-2"
          name: "Smoke Suite Nightly"
          description: "Nightly smoke checks for critical patient workflows."
          status: "COMPLETED"
          created_at: 1709452800
          updated_at: 1710115200
    page_info:
      page_size: 2
      total_count: 9
      next: "https://arcus.testsigma.com/api/v1/projects/bd57bbc6-e83e-4f09-927d-fc48b3509cdf/test_plans?page_size=2&page=2"
      prev: ""
---
