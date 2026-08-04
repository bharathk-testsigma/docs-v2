---
title: "Update a test data set"
description: "Update a single test data set using request parameters instead of a JSON body."
sidebar:
  label: "Update data set"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /test_data_sets
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: id, desc: "ID of the test data set to update. Required." }
    - { name: testDataProfileId, desc: "ID of the test data profile the set belongs to." }
    - { name: name, desc: "Updated name of the data set." }
    - { name: description, desc: "Updated description of the data set." }
    - { name: expectedToFail, desc: "Whether the iteration is expected to fail — true or false." }
    - { name: data, desc: "JSON object of column-to-value pairs for the set." }
    - { name: position, desc: "Position of the set within the profile." }
    - { name: order, desc: "Order of the set within the profile." }
    - { name: oldName, desc: "Previous name of the data set, when renaming." }
  responseAttributes:
    - { name: id, desc: "ID of the updated test data set." }
    - { name: testDataProfileId, desc: "ID of the test data profile the set belongs to." }
    - { name: name, desc: "Name of the data set." }
    - { name: description, desc: "Description of the data set." }
    - { name: expectedToFail, desc: "Whether the iteration is expected to fail." }
    - { name: position, desc: "Position of the set within the profile." }
    - { name: data, desc: "Column-to-value map for the set." }
  response:
    id: 120
    testDataProfileId: 48
    name: "Set 1"
    description: "Valid user"
    expectedToFail: false
    position: 0
    data:
      Username: "jane.doe"
      Password: "s3cret!"
---
