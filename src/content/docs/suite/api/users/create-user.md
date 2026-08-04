---
title: "Create a user"
description: "Invite a new user to the workspace with a role and project mappings."
sidebar:
  label: "Create user"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /users
  baseUrl: https://app.testsigma.com/api/v2
  bodyFields:
    - { name: email, desc: "Email address of the user to invite. Key field." }
    - { name: roleId, desc: "ID of the role to assign. Key field." }
    - { name: isAdmin, desc: "Whether the user is an administrator." }
    - { name: status, desc: "User status — Active, Pending, Waitlist." }
    - { name: licensePoolType, desc: "License pool — TENANT, COMMON_POOL, RESERVED_POOL." }
    - { name: type, desc: "User type. Default PRODUCT_USER." }
    - { name: userProjectMappingRequests, desc: "Array mapping the user to projects with per-project roles. Each has projectId and roleId." }
    - { name: addToTms, desc: "Whether to also add the user to test management." }
  requestBody:
    email: "arun.mehta@example.com"
    roleId: 4
    isAdmin: false
    status: "Pending"
    licensePoolType: "TENANT"
    type: "PRODUCT_USER"
    addToTms: false
    userProjectMappingRequests:
      - projectId: 9
        roleId: 4
  responseAttributes:
    - { name: id, desc: "ID of the newly created user." }
    - { name: email, desc: "Email address of the created user." }
    - { name: status, desc: "User status — Active, Pending, Waitlist." }
    - { name: roleId, desc: "ID of the assigned role." }
    - { name: isAdmin, desc: "Whether the user is an administrator." }
  response:
    id: 21
    email: "arun.mehta@example.com"
    status: "Pending"
    roleId: 4
    isAdmin: false
---
