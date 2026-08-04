---
title: "Update an element"
description: "Update an existing element's locator or metadata."
sidebar:
  label: "Update an element"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /ui_identifiers/{element_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: element_id, desc: "The ID of the element to update." }
  bodyFields:
    - { name: name, desc: "Updated element name." }
    - { name: locatorType, desc: "Updated locator strategy." }
    - { name: definition, desc: "Updated locator expression." }
    - { name: status, desc: "Updated review status — READY or DRAFT." }
    - { name: screenNameId, desc: "Updated screen ID." }
    - { name: applicationVersionId, desc: "Application version ID." }
  requestBody:
    name: "Submit Button"
    locatorType: "css_selector"
    definition: "button[type='submit']"
    status: "READY"
    screenNameId: 12
    applicationVersionId: 39
    createdType: "MANUAL"
  responseAttributes:
    - { name: id, desc: "ID of the updated element." }
    - { name: name, desc: "Updated element name." }
    - { name: locatorType, desc: "Updated locator strategy." }
    - { name: definition, desc: "Updated locator expression." }
    - { name: status, desc: "Current review status." }
  response:
    id: 103
    name: "Submit Button"
    locatorType: "css_selector"
    definition: "button[type='submit']"
    status: "READY"
    screenNameId: 12
    applicationVersionId: 39
    createdType: "MANUAL"
    createdById: 9
---
