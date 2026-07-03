---
title: "Get an element"
description: "Retrieve a specific element by its ID."
sidebar:
  label: "Get an element"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /ui_identifiers/{element_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: element_id, desc: "The ID of the element to retrieve." }
  responseAttributes:
    - { name: id, desc: "Unique element identifier." }
    - { name: name, desc: "Name of the element." }
    - { name: locatorType, desc: "Locator strategy — xpath, css_selector, id, name, classname, linktext, tagname." }
    - { name: definition, desc: "The locator expression used to find the element." }
    - { name: status, desc: "Review status — READY or DRAFT." }
    - { name: screenNameId, desc: "ID of the screen the element belongs to." }
    - { name: applicationVersionId, desc: "ID of the application version." }
    - { name: createdType, desc: "How the element was created — CHROME, ADVANCED, or MANUAL." }
  response:
    id: 101
    name: "Login Button"
    locatorType: "xpath"
    definition: "//button[@id='login-btn']"
    status: "READY"
    screenNameId: 12
    applicationVersionId: 39
    createdType: "CHROME"
    createdById: 9
---
