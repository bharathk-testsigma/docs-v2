---
title: "List users (v2)"
description: "Retrieve a paginated list of users in the workspace."
sidebar:
  label: "List users (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /users
  baseUrl: https://app.testsigma.com/api/v2
  query:
    - { name: page, desc: "Page number, 0-based. Default 0." }
    - { name: size, desc: "Number of items per page. Default 10." }
    - { name: sort, desc: "Sort field and direction, e.g. id,desc." }
  responseAttributes:
    - { name: content, desc: "Array of users. Each has id, firstName, lastName, email, status, roleId and admin flags." }
    - { name: totalElements, desc: "Total number of users across all pages." }
  response:
    content:
      - id: 9
        firstName: "Priya"
        lastName: "Nair"
        email: "priya.nair@example.com"
        status: "Active"
        roleId: 2
        isAdmin: true
        isSuperAdmin: false
      - id: 14
        firstName: "Arun"
        lastName: "Mehta"
        email: "arun.mehta@example.com"
        status: "Pending"
        roleId: 4
        isAdmin: false
        isSuperAdmin: false
    totalElements: 2
---
