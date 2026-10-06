---
title: "Download a generated report"
description: "Download the artifact of a generated report by its report ID. Redirects to a short-lived download link."
sidebar:
  label: "Download report"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /reports/download/{report_id}
  baseUrl: https://app.testsigma.com/api/v1
  status: 302
  statusText: Found
  pathParams:
    - { name: report_id, desc: "The reportId returned by an export endpoint once its status reads SUCCESS." }
  response: "Redirects to a short-lived link that serves the report file."
---

The response redirects to a short-lived download link, so follow the redirect within the same request rather than storing the link for later. Each call generates a fresh link, which is why the same `report_id` stays valid for repeat downloads.
