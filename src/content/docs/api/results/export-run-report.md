---
title: "Export a test plan run report"
description: "Generate a report for a whole test plan run in XML, PDF, or Excel format. This endpoint replaces the deprecated JUnit endpoint."
sidebar:
  label: "Export run report"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /reports/execution_result/{run_id}
  baseUrl: https://app.testsigma.com/api/v1
  status: 202
  statusText: Accepted
  pathParams:
    - { name: run_id, desc: "The ID of the test plan run to export." }
  query:
    - { name: format, desc: "Report format — xml, pdf, or xlsx. Defaults to pdf." }
    - { name: screenshot, desc: "Test step screenshots in a PDF report — ALL_TYPES, FAILED_STEPS, or NONE. PDF only." }
    - { name: visualScreenshot, desc: "Visual testing screenshots in a PDF report — ALL_TYPES, FAILED_STEPS, or NONE. PDF only." }
    - { name: resolution, desc: "Screenshot resolution in a PDF report — LOW or HIGH. LOW generates faster. PDF only." }
  responseAttributes:
    - { name: status, desc: "Generation state — IN_PROGRESS, SUCCESS, or FAILED. A failure returns 200 with status FAILED, not a server error." }
    - { name: reportId, desc: "ID of the generated report, returned once generation succeeds." }
    - { name: url, desc: "Download endpoint for the generated report, returned once generation succeeds." }
  response:
    status: "IN_PROGRESS"
---

Report generation is asynchronous, and the same endpoint both triggers the report and returns its progress. Send the request once to start generation, send it again with the same `format` and screenshot options until `status` reads `SUCCESS`, then download the artifact from the `url` in the response. Changing the options between calls requests a different report.

The exported XML uses the Testsigma schema, not JUnit XML, so pipeline steps that parse JUnit output do not accept it. The `screenshot`, `visualScreenshot`, and `resolution` parameters apply to PDF only; `xml` and `xlsx` accept and ignore them. PDF export is an Enterprise feature — contact support@testsigma.com to enable it. A `409` means the run is not complete yet, and a `403` means PDF export is not enabled for the account.
