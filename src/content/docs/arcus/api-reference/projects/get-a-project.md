---
title: "Get a project"
description: "Retrieves the details of a specific project by its unique identifier."
sidebar:
  label: "Get a project"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /projects/{project_id}
  baseUrl: https://test-management.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project to retrieve." }
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.project.id", desc: "Unique identifier of the project." }
    - { name: "data.project.created_at", desc: "Unix timestamp of when the project was created." }
    - { name: "data.project.updated_at", desc: "Unix timestamp of the last update to the project." }
    - { name: "data.project.name", desc: "Name of the project." }
    - { name: "data.project.description", desc: "Description of the project." }
    - { name: "data.project.human_id_prefix", desc: "Prefix used for the project's human-readable identifier." }
  response:
    message: ""
    data:
      project:
        id: "18c50239-946d-428e-aa0c-260329f5c151"
        created_at: 1709452800
        updated_at: 1712131200
        name: "Health Care Project"
        description: "Regression suite for the patient portal"
        human_id_prefix: "HCP"
---
