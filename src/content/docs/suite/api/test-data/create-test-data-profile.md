---
title: "Create a test data profile"
description: "Create a new test data profile with columns and data sets."
sidebar:
  label: "Create profile"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /test_data
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: testDataName, desc: "Name of the test data profile." }
    - { name: versionId, desc: "ID of the application version the profile belongs to." }
    - { name: columns, desc: "Array of column (parameter) names." }
    - { name: passwords, desc: "Array of column names to encrypt. Defaults to empty if omitted." }
    - { name: renamedColumns, desc: "Map of old column name to new column name. Defaults to empty if omitted." }
    - { name: data, desc: "Array of data set (row) objects." }
    - { name: "data[].name", desc: "Name of the data set. Required, non-empty." }
    - { name: "data[].description", desc: "Description of the data set." }
    - { name: "data[].expectedToFail", desc: "Whether the iteration is expected to fail." }
    - { name: "data[].data", desc: "Key-value map of column names to values for the row." }
    - { name: "data[].position", desc: "Position of the row in the profile." }
    - { name: testDataFolderId, desc: "ID of the folder to place the profile in." }
  requestBody:
    testDataName: "LoginCredentials"
    versionId: 46
    columns:
      - "Username"
      - "Password"
    passwords:
      - "Password"
    data:
      - name: "Set 1"
        description: "Valid user"
        expectedToFail: false
        position: 0
        data:
          Username: "john.doe"
          Password: "s3cret!"
  responseAttributes:
    - { name: id, desc: "ID of the newly created test data profile." }
    - { name: testDataName, desc: "Name of the test data profile." }
    - { name: data, desc: "Array of data sets in the profile." }
    - { name: columns, desc: "Array of column (parameter) names." }
    - { name: passwords, desc: "Encrypted password columns, if any." }
    - { name: createdById, desc: "ID of the user who created the profile." }
    - { name: updatedById, desc: "ID of the user who last updated the profile." }
    - { name: createdDate, desc: "Creation timestamp (epoch milliseconds)." }
    - { name: updatedDate, desc: "Last update timestamp (epoch milliseconds)." }
    - { name: versionId, desc: "ID of the application version the profile belongs to." }
  status: 201
  statusText: Created
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
    updatedDate: 1732176819137
    versionId: 46
---
