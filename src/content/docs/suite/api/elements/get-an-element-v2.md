---
title: "Get an element (v2)"
description: "Retrieve a single UI element by its numeric ID, including its tags."
sidebar:
  label: "Get an element (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /elements/{element_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: element_id, desc: "Numeric ID of the element to retrieve. Returns 404 if not found." }
  responseAttributes:
    - { name: id, desc: "Unique element identifier." }
    - { name: name, desc: "Name of the element." }
    - { name: locatorType, desc: "Locator strategy used to find the element." }
    - { name: definition, desc: "The locator expression." }
    - { name: screenNameId, desc: "ID of the screen name the element belongs to." }
    - { name: workspaceVersionId, desc: "ID of the workspace version." }
    - { name: tags, desc: "UI_IDENTIFIER tags associated with the element." }
  response:
    id: 101
    name: "Login Button"
    locatorType: "xpath"
    definition: "//button[@id='login-btn']"
    screenNameId: 12
    workspaceVersionId: 39
    tags: ["login", "smoke"]
---
