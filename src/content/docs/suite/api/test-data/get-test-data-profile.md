---
title: "Get a test data profile"
description: "Retrieve a single test data profile by ID, including its data sets."
sidebar:
  label: "Get profile"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_data/{id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the test data profile to retrieve. Returns 404 if not found." }
  responseAttributes:
    - { name: id, desc: "ID of the test data profile." }
    - { name: testDataName, desc: "Name of the test data profile." }
    - { name: data, desc: "Array of data sets in the profile. Each has name, description, expectedToFail, and a column-to-value data map." }
    - { name: columns, desc: "Array of column (parameter) names." }
    - { name: passwords, desc: "Encrypted password columns, if any." }
    - { name: createdById, desc: "ID of the user who created the profile." }
    - { name: updatedById, desc: "ID of the user who last updated the profile." }
    - { name: createdDate, desc: "Creation timestamp (epoch milliseconds)." }
    - { name: updatedDate, desc: "Last update timestamp (epoch milliseconds)." }
    - { name: versionId, desc: "ID of the application version the profile belongs to." }
  response:
    id: 48
    testDataName: "LoginCredentials"
    data:
      - id: 120
        testDataProfileId: 48
        name: "Set 1"
        description: "Valid user"
        expectedToFail: false
        position: 0
        data:
          Username: "john.doe"
          Password: "s3cret!"
    columns:
      - "Username"
      - "Password"
    passwords:
      - "Password"
    createdById: 9
    updatedById: 9
    createdDate: 1732176819137
    updatedDate: 1732180000000
    versionId: 46
---
