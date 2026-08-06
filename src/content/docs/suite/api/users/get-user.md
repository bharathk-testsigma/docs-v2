---
title: "Get a user"
description: "Retrieve a single user by ID. Returns 404 if the user is not found."
sidebar:
  label: "Get user"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /users/{id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: id, desc: "ID of the user to retrieve." }
  responseAttributes:
    - { name: id, desc: "Unique user identifier." }
    - { name: firstName, desc: "User's first name." }
    - { name: lastName, desc: "User's last name." }
    - { name: email, desc: "User's email address." }
    - { name: status, desc: "User status — Active, Pending, Waitlist." }
    - { name: roleId, desc: "ID of the role assigned to the user." }
    - { name: isAdmin, desc: "Whether the user is an administrator." }
    - { name: isSuperAdmin, desc: "Whether the user is a super administrator." }
  response:
    id: 9
    firstName: "Priya"
    lastName: "Nair"
    email: "priya.nair@example.com"
    status: "Active"
    roleId: 2
    isAdmin: true
    isSuperAdmin: false
---
