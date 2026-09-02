---
title: "Export a test suite report"
description: "Generate a report for a single test suite within a run, in XML, PDF, or Excel format."
sidebar:
  label: "Export suite report"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /reports/suite_result/{suite_result_id}
  baseUrl: https://app.testsigma.com/api/v1
  status: 202
  statusText: Accepted
  pathParams:
    - { name: suite_result_id, desc: "The ID of the test suite result to export. Not shown in the UI — copy it from the Test Suite request in the browser's Network tab on the Run Results page." }
  query:
    - { name: format, desc: "Report format — xml, pdf, or xlsx. Defaults to pdf." }
    - { name: screenshot, desc: "Test step screenshots in a PDF report — ALL_TYPES, FAILED_STEPS, or NONE. PDF only." }
    - { name: visualScreenshot, desc: "Visual testing screenshots in a PDF report — ALL_TYPES, FAILED_STEPS, or NONE. PDF only." }
    - { name: resolution, desc: "Screenshot resolution in a PDF report — LOW or HIGH. PDF only." }
  responseAttributes:
    - { name: status, desc: "Generation state — IN_PROGRESS, SUCCESS, or FAILED." }
    - { name: reportId, desc: "ID of the generated report, returned once generation succeeds." }
    - { name: url, desc: "Download endpoint for the generated report, returned once generation succeeds." }
  response:
    status: "IN_PROGRESS"
---

Generation is asynchronous: send the same request again until `status` reads `SUCCESS`, then download from the `url` in the response. The report starts at a `testSuite` root, with its test cases and steps nested inside.
