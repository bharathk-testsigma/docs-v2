---
title: "Get a step result asset"
description: "Redirect to a presigned URL for a named step result asset, such as a screenshot."
sidebar:
  label: "Get step result asset"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}/test_case_results/{test_case_result_id}/step_results/step_result_asset/{asset_name}/{type}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID." }
    - { name: test_case_result_id, desc: "The test case result ID the asset belongs to." }
    - { name: asset_name, desc: "Name of the asset file, e.g. screenshot.png." }
    - { name: type, desc: "Asset type — a ScreenshotType enum value, e.g. SCREENSHOT." }
  status: 302
  statusText: "Found"
  response: null
---
