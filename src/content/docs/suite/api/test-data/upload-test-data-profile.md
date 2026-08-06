---
title: "Upload a test data profile"
description: "Upload an XLSX file to create a new test data profile in Testsigma using the REST API."
sidebar:
  label: "Upload test data profile"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /test_data/upload
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: file, desc: "The local file to upload (multipart file part), e.g. @\"<local_path>\". An XLS/XLSX file." }
    - { name: encryptedColumns, desc: "Columns to encrypt. Use \",\" to separate multiple column names." }
    - { name: applicationVersionId, desc: "ID of the application version where the file is to be uploaded." }
    - { name: name, desc: "Name to give the uploaded test data profile." }
    - { name: notificationEmail, desc: "Email address to notify once the upload completes." }
  formData:
    file: "@<local_path>"
    encryptedColumns: "Password"
    applicationVersionId: "10"
    name: "TestData01"
    notificationEmail: "example@testsigma.com"
  responseAttributes:
    - { name: id, desc: "ID of the created test data profile." }
    - { name: testDataName, desc: "Name of the test data profile." }
    - { name: testData, desc: "Test data payload (null on creation)." }
    - { name: data, desc: "Data payload (null on creation)." }
    - { name: createdById, desc: "User ID of the creator." }
    - { name: updatedById, desc: "User ID of the updater." }
    - { name: columns, desc: "Columns in the test data profile (null on creation)." }
    - { name: createdDate, desc: "Epoch timestamp when the profile was created." }
    - { name: updatedDate, desc: "Epoch timestamp when the profile was last updated." }
    - { name: passwords, desc: "Encrypted password values (null on creation)." }
    - { name: versionId, desc: "ID of the application version the file was uploaded to." }
    - { name: isMigrated, desc: "Whether the profile was migrated (null on creation)." }
    - { name: message, desc: "Status message for the upload operation." }
  response:
    id: 78
    testDataName: "API 01"
    testData: null
    data: null
    createdById: 10
    updatedById: 10
    columns: null
    createdDate: 1669806564576
    updatedDate: 1669806564576
    passwords: null
    versionId: 69
    isMigrated: null
    message: "We will send an email once the Test data profile is created successfully."
---
