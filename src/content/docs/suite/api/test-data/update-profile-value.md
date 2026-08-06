---
title: "Update profile value"
description: "Update values in a test data profile using the REST API."
sidebar:
  label: "Update profile value"
  badge: { text: PATCH, variant: default }
api:
  method: PATCH
  path: /test_data/{id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the test data profile." }
  bodyFields:
    - { name: id, desc: "ID of the test data profile." }
    - { name: testDataName, desc: "Name of the test data profile." }
    - { name: testData, desc: "Legacy inline test data; set to null when using the data array." }
    - { name: data, desc: "Array of data set objects to update in the profile." }
    - { name: "data[].name", desc: "Name of the data set (iteration)." }
    - { name: "data[].expectedToFail", desc: "Whether the iteration is expected to fail." }
    - { name: "data[].data", desc: "Key-value map of parameter names to values for the iteration." }
  requestBody:
    id: 48
    testDataName: "update parameter with api call"
    testData: null
    data:
      - name: "Iteration name"
        expectedToFail: true
        data:
          Username: "bhanu"
          Password: "7893"
          User1: "bsk@450.com"
          User2: "1479"
          User3: "bhanuprakash"
  responseAttributes:
    - { name: id, desc: "ID of the test data profile." }
    - { name: testDataName, desc: "Name of the test data profile." }
    - { name: data, desc: "Inline data payload; null when data sets are stored." }
    - { name: createdById, desc: "ID of the user who created the profile." }
    - { name: updatedById, desc: "ID of the user who last updated the profile." }
    - { name: columns, desc: "Array of parameter (column) names in the profile." }
    - { name: createdDate, desc: "Creation timestamp (epoch milliseconds)." }
    - { name: updatedDate, desc: "Last update timestamp (epoch milliseconds)." }
    - { name: passwords, desc: "Encrypted password columns, if any." }
    - { name: versionId, desc: "Version ID of the test data profile." }
    - { name: message, desc: "Status message, if any." }
  response:
    id: 48
    testDataName: "update"
    data: null
    createdById: 9
    updatedById: 14
    columns: ["User2", "Username", "User1", "User3", "Password"]
    createdDate: 1677479567000
    updatedDate: 1677492944204
    passwords: null
    versionId: 46
    message: null
---
