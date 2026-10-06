---
title: "Get users"
description: "Get all users in the workspace with their roles and status."
sidebar:
  label: "Get users"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /users
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique user identifier." }
    - { name: email, desc: "User's email address." }
    - { name: firstName, desc: "User's first name." }
    - { name: lastName, desc: "User's last name." }
    - { name: userName, desc: "User's login username." }
    - { name: status, desc: "Account status — Active or Inactive." }
    - { name: isAdmin, desc: "Whether the user has admin privileges." }
    - { name: isSuperAdmin, desc: "Whether the user is a super-admin." }
    - { name: isAPIUser, desc: "Whether this is an API-only user." }
    - { name: createdDate, desc: "Epoch timestamp of account creation." }
  response:
    content:
      - id: 9
        email: "admin@testsigma.com"
        firstName: "Admin"
        lastName: "User"
        userName: "admin"
        status: "Active"
        isDeleted: false
        isAdmin: true
        isSuperAdmin: true
        isAPIUser: false
        createdDate: 1658237083000
      - id: 10
        email: "john.doe@example.com"
        firstName: "John"
        lastName: "Doe"
        userName: "john.doe"
        status: "Active"
        isAdmin: false
        isSuperAdmin: false
        isAPIUser: false
        createdDate: 1660000000000
    totalElements: 2
    totalPages: 1
---
