---
title: "Update a test data profile"
description: "Fully update a test data profile's name, columns, and data sets by ID."
sidebar:
  label: "Update profile"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /test_data/{id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the test data profile to update." }
  bodyFields:
    - { name: testDataName, desc: "Updated name of the test data profile." }
    - { name: versionId, desc: "ID of the application version the profile belongs to." }
    - { name: columns, desc: "Array of column (parameter) names. Defaults to empty if omitted." }
    - { name: passwords, desc: "Array of column names to encrypt. Passwords are re-encrypted on update." }
    - { name: renamedColumns, desc: "Map of old column name to new column name. Defaults to empty if omitted." }
    - { name: data, desc: "Array of data set (row) objects, same schema as create." }
    - { name: "data[].name", desc: "Name of the data set. Required, non-empty." }
    - { name: "data[].expectedToFail", desc: "Whether the iteration is expected to fail." }
    - { name: "data[].data", desc: "Key-value map of column names to values for the row." }
    - { name: testDataFolderId, desc: "ID of the folder the profile belongs to." }
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
          Username: "jane.doe"
          Password: "n3w-s3cret!"
  responseAttributes:
    - { name: id, desc: "ID of the updated test data profile." }
    - { name: testDataName, desc: "Name of the test data profile." }
    - { name: data, desc: "Array of data sets in the profile." }
    - { name: columns, desc: "Array of column (parameter) names." }
    - { name: passwords, desc: "Encrypted password columns, if any." }
    - { name: createdById, desc: "ID of the user who created the profile." }
    - { name: updatedById, desc: "ID of the user who last updated the profile." }
    - { name: createdDate, desc: "Creation timestamp (epoch milliseconds)." }
    - { name: updatedDate, desc: "Last update timestamp (epoch milliseconds)." }
    - { name: versionId, desc: "ID of the application version the profile belongs to." }
  status: 202
  statusText: Accepted
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
          Username: "jane.doe"
          Password: "n3w-s3cret!"
    columns:
      - "Username"
      - "Password"
    passwords:
      - "Password"
    createdById: 9
    updatedById: 14
    createdDate: 1732176819137
    updatedDate: 1732250000000
    versionId: 46
---
