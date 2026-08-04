---
title: "Get a test data profile (v2)"
description: "Retrieve a single test data profile by ID, including its data sets."
sidebar:
  label: "Get profile (v2)"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_data/{profile_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: profile_id, desc: "ID of the test data profile to retrieve. Returns 404 if not found." }
  responseAttributes:
    - { name: id, desc: "Unique test data profile identifier." }
    - { name: testDataName, desc: "Name of the test data profile." }
    - { name: data, desc: "Array of data set objects. Each has name, expectedToFail, and a key-value data map." }
    - { name: createdById, desc: "ID of the user who created the profile." }
    - { name: createdDate, desc: "Creation timestamp (epoch milliseconds)." }
    - { name: updatedDate, desc: "Last update timestamp (epoch milliseconds)." }
  response:
    id: 48
    testDataName: "Login credentials"
    data:
      - name: "Iteration 1"
        expectedToFail: false
        data:
          Username: "alice"
          Password: "s3cret"
      - name: "Iteration 2"
        expectedToFail: true
        data:
          Username: "bob"
          Password: "wrong"
    createdById: 9
    createdDate: 1732176819137
    updatedDate: 1732200000000
---
