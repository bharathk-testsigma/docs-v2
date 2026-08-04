---
title: "JUnit report import"
description: "Imports JUnit XML test results into a test run within a project via file upload."
sidebar:
  label: "JUnit report import"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /projects/{project_id}/junit-import/test-run/{test_run_id}
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project to import results into." }
    - { name: "test_run_id", desc: "Identifier of the test run the results are imported against." }
  formData:
    junit_xml: "@results.xml"
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Message describing the outcome — a success confirmation, or error details if the import failed." }
  response:
    message: ""
---
