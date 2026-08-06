---
title: "Create a project"
description: "Creates a new project with a name, description, and human-readable ID prefix."
sidebar:
  label: "Create a project"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /projects
  baseUrl: https://test-management.testsigma.com/api/v1
  bodyFields:
    - { name: "name", desc: "Name of the project." }
    - { name: "description", desc: "Brief description of the project." }
    - { name: "human_id_prefix", desc: "Prefix used for the project's human-readable identifier." }
  requestBody:
    name: "Health Care Project"
    description: "Regression suite for the patient portal"
    human_id_prefix: "HCP"
  status: 200
  statusText: OK
  responseAttributes:
    - { name: "message", desc: "Status message for the request; may be empty." }
    - { name: "data.project.id", desc: "Unique identifier of the created project." }
    - { name: "data.project.created_at", desc: "Unix timestamp of when the project was created." }
    - { name: "data.project.updated_at", desc: "Unix timestamp of the last update to the project." }
    - { name: "data.project.name", desc: "Name of the project." }
    - { name: "data.project.description", desc: "Description of the project." }
    - { name: "data.project.human_id_prefix", desc: "Prefix used for the project's human-readable identifier." }
  response:
    message: ""
    data:
      project:
        id: "c47ade67-0543-4582-a4a5-b7de447c94f5"
        created_at: 1710675200
        updated_at: 1710675200
        name: "Health Care Project"
        description: "Regression suite for the patient portal"
        human_id_prefix: "HCP"
---
