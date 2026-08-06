---
title: "Export run results summary"
description: "Start an XLS export of a date-based run result summary for an application version."
sidebar:
  label: "Export results summary"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /execution_results/dateResults/export
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: applicationVersionId, desc: "ID of the application version to export results for. Required." }
    - { name: startDate, desc: "Start date of the summary range. Required." }
    - { name: endDate, desc: "End date of the summary range. Required." }
    - { name: timezone, desc: "Timezone used for the date range. Optional." }
  responseAttributes:
    - { name: id, desc: "Unique identifier of the export job." }
    - { name: name, desc: "Name of the generated export file." }
    - { name: status, desc: "Current status of the export job." }
    - { name: createdDate, desc: "Epoch timestamp when the export was started." }
  response:
    id: 118
    name: "run-results-summary-2024-05-29.xlsx"
    status: "IN_PROGRESS"
    createdDate: 1732176819137
---
