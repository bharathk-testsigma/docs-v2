---
title: "Create an element"
description: "Create a new element (UI identifier) in the specified application version."
sidebar:
  label: "Create an element"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /ui_identifiers
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: name, desc: "Name for the new element." }
    - { name: locatorType, desc: "Locator strategy — xpath, css_selector, id, name, classname, linktext, tagname." }
    - { name: definition, desc: "The locator expression." }
    - { name: createdBy, desc: "User ID of the creator." }
    - { name: status, desc: "Review status — READY or DRAFT." }
    - { name: screenNameId, desc: "ID of the screen to associate the element with." }
    - { name: applicationVersionId, desc: "ID of the application version." }
    - { name: createdType, desc: "Creation mode — CHROME, ADVANCED, or MANUAL." }
  requestBody:
    name: "Submit Button"
    locatorType: "xpath"
    definition: "//button[@type='submit']"
    createdBy: 9
    status: "READY"
    screenNameId: 12
    applicationVersionId: 39
    createdType: "MANUAL"
  responseAttributes:
    - { name: id, desc: "ID of the newly created element." }
    - { name: name, desc: "Name of the created element." }
    - { name: locatorType, desc: "Locator strategy used." }
    - { name: definition, desc: "Locator expression." }
    - { name: status, desc: "Review status." }
  response:
    id: 103
    name: "Submit Button"
    locatorType: "xpath"
    definition: "//button[@type='submit']"
    status: "READY"
    screenNameId: 12
    applicationVersionId: 39
    createdType: "MANUAL"
    createdById: 9
---
