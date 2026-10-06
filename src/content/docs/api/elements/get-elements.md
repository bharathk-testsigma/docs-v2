---
title: "Get elements"
description: "Retrieve all elements (UI identifiers) available in the project."
sidebar:
  label: "Get elements"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /ui_identifiers
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique element identifier." }
    - { name: name, desc: "Name of the element." }
    - { name: locatorType, desc: "Locator strategy — xpath, css_selector, id, name, classname, linktext, tagname." }
    - { name: definition, desc: "The locator expression used to find the element." }
    - { name: status, desc: "Review status — READY or DRAFT." }
    - { name: screenNameId, desc: "ID of the screen the element belongs to." }
    - { name: applicationVersionId, desc: "ID of the application version." }
    - { name: createdType, desc: "How the element was created — CHROME, ADVANCED, or MANUAL." }
    - { name: createdById, desc: "ID of the user who created the element." }
  response:
    content:
      - id: 101
        name: "Login Button"
        locatorType: "xpath"
        definition: "//button[@id='login-btn']"
        status: "READY"
        screenNameId: 12
        applicationVersionId: 39
        createdType: "CHROME"
        createdById: 9
      - id: 102
        name: "Email Input"
        locatorType: "id"
        definition: "email-input"
        status: "READY"
        screenNameId: 12
        applicationVersionId: 39
        createdType: "MANUAL"
        createdById: 9
    totalElements: 2
    totalPages: 1
---
