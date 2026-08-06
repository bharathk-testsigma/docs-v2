---
title: "Check step result upload status"
description: "Check whether all step results have finished uploading for a given test case result."
sidebar:
  label: "Step result upload status"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_runs/{run_id}/test_case_results/is_step_result_upload_completed/{id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: run_id, desc: "The test plan run ID." }
    - { name: id, desc: "The test case result ID to check." }
  response: true
---
