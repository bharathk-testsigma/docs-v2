---
title: "Get test plan favourites/configs"
description: "Retrieve all the Test Plan Favourites/Saved Execution Configs that have been set, used for partial test plan runs."
sidebar:
  label: "Get test plan configs"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /saved_execution_configs
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique Execution Config identifier." }
    - { name: name, desc: "Name of the saved Execution Config." }
    - { name: query, desc: "JSON-encoded query defining which suites/cases the config includes or excludes." }
    - { name: executionConfigType, desc: "Type of the config - e.g. SAVED_CONFIG." }
    - { name: executionConfigCondition, desc: "Whether the matched items are INCLUDED or EXCLUDED." }
    - { name: createdByUser, desc: "Object describing the creating user, or null." }
  response:
    - id: 2
      name: "rest conf inc 1"
      query: "[{\"key\": \"suiteId\", \"value\": [114], \"operation\": \"NOT_IN\"}]"
      executionConfigType: "SAVED_CONFIG"
      executionConfigCondition: "EXCLUDED"
      createdByUser: null
    - id: 3
      name: "plan o1 exclude 2"
      query: "[{\"key\": \"suiteId\", \"value\": [132, 130], \"operation\": \"NOT_IN\"}]"
      executionConfigType: "SAVED_CONFIG"
      executionConfigCondition: "EXCLUDED"
      createdByUser:
        id: 9
        email: "bhanu@qateamtestingsprint.com"
        firstName: "Bhanu"
        lastName: "prakash"
        userName: "bhanu"
        status: "Active"
        isDeleted: false
        isAdmin: true
        isSuperAdmin: true
        userType: null
        isAPIUser: false
        isCrowdUser: false
        isMasked: false
        gdpr: false
        createdDate: 1657951985000
        updatedDate: 1657951992000
        createdById: null
        updatedById: 9
        privileges: []
        authType: null
        identityServiceId: "7308"
    - id: 4
      name: "update inc to exc 2 suites to 3 suites"
      query: "[{\"key\": \"suiteId\", \"value\": [132, 131, 130], \"operation\": \"NOT_IN\"}, {\"key\": \"reviewedBy\", \"value\": [9], \"operation\": \"NOT_IN\"}, {\"key\": \"assignee\", \"value\": [9], \"operation\": \"NOT_IN\"}]"
      executionConfigType: "SAVED_CONFIG"
      executionConfigCondition: "EXCLUDED"
      createdByUser: null
---
