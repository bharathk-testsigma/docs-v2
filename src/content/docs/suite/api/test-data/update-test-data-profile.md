---
title: "Update a test data profile"
description: "Update an existing test data profile by uploading a new XLSX file in Testsigma using the REST API."
sidebar:
  label: "Update test data profile"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /test_data/update
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: file, desc: "The test data file to upload (multipart file part), e.g. @\"<local_path>\". An .xlsx file. Required." }
    - { name: encryptColumns, desc: "Column names to encrypt. Repeat the field for multiple columns. Optional." }
    - { name: applicationVersionId, desc: "ID of the target application version. Required." }
    - { name: testDataId, desc: "ID of the test data profile to update. Required." }
    - { name: notificationEmail, desc: "Email address to notify once the update completes. Required." }
    - { name: testDataFolderId, desc: "ID of the destination folder. Optional." }
  formData:
    file: "@<local_path>"
    encryptColumns: "Password"
    applicationVersionId: "10"
    testDataId: "77"
    notificationEmail: "example@testsigma.com"
  status: 202
  statusText: Accepted
  responseAttributes:
    - { name: id, desc: "ID of the updated test data profile." }
    - { name: testDataName, desc: "Name of the test data profile." }
    - { name: testData, desc: "Test data payload (null in this response)." }
    - { name: data, desc: "Data payload (null in this response)." }
    - { name: createdById, desc: "User ID of the creator." }
    - { name: updatedById, desc: "User ID of the updater." }
    - { name: columns, desc: "Columns being updated in the test data profile." }
    - { name: createdDate, desc: "Epoch timestamp when the profile was created." }
    - { name: updatedDate, desc: "Epoch timestamp when the profile was last updated." }
    - { name: passwords, desc: "Encrypted password values (null in this response)." }
    - { name: versionId, desc: "ID of the application version the file was uploaded to." }
    - { name: isMigrated, desc: "Whether the profile was migrated." }
    - { name: message, desc: "Status message for the update operation." }
  response:
    id: 77
    testDataName: "TD01"
    testData: null
    data: null
    createdById: 9
    updatedById: 9
    columns:
      - "description"
      - "city"
      - "man"
    createdDate: 1669806346000
    updatedDate: 1669806369000
    passwords: null
    versionId: 69
    isMigrated: true
    message: "We will send an email once the Test data profile is created successfully."
---
