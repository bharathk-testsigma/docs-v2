---
title: "Update a project"
description: "Updates the name and description of an existing project."
sidebar:
  label: "Update a project"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /projects/{project_id}
  baseUrl: https://arcus.testsigma.com/api/v1
  pathParams:
    - { name: "project_id", desc: "Unique identifier of the project to update." }
  bodyFields:
    - { name: "name", desc: "New name of the project." }
    - { name: "description", desc: "Updated description of the project." }
  requestBody:
    name: "Health Care Project (Q2)"
    description: "Regression suite for the patient portal, second quarter"
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.project.id", desc: "Unique identifier of the project." }
    - { name: "data.project.created_at", desc: "Unix timestamp of when the project was created." }
    - { name: "data.project.updated_at", desc: "Unix timestamp of the last update to the project." }
    - { name: "data.project.name", desc: "Updated name of the project." }
    - { name: "data.project.description", desc: "Updated description of the project." }
    - { name: "data.project.human_id_prefix", desc: "Prefix used for the project's human-readable identifier." }
  response:
    message: ""
    data:
      project:
        id: "18c50239-946d-428e-aa0c-260329f5c151"
        created_at: 1709452800
        updated_at: 1714521600
        name: "Health Care Project (Q2)"
        description: "Regression suite for the patient portal, second quarter"
        human_id_prefix: "HCP"
---
