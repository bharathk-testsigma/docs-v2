---
title: "Export a test case report"
description: "Generate a report for a single test case within a run, in XML, PDF, or Excel format."
sidebar:
  label: "Export case report"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /reports/case_result/{case_result_id}
  baseUrl: https://app.testsigma.com/api/v1
  status: 202
  statusText: Accepted
  pathParams:
    - { name: case_result_id, desc: "The ID of the test case result to export, from the test case results endpoints." }
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

Generation is asynchronous: send the same request again until `status` reads `SUCCESS`, then download from the `url` in the response. For a data-driven test case, the `testCase` element carries `testDataProfile` and `testDataSet` attributes naming the profile and data set of each iteration; both are omitted when the test case uses no profile.
