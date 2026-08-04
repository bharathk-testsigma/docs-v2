---
title: "Update a custom function"
description: "Upload a Java file to recompile and update an existing custom function."
sidebar:
  label: "Update custom function"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /custom_functions/{id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: id, desc: "ID of the custom function to update." }
  bodyFields:
    - { name: projectId, desc: "ID of the project the custom function belongs to." }
    - { name: javaFile, desc: "The .java file to upload (multipart file part). The function is recompiled from this file." }
  formData:
    projectId: 24
    javaFile: "@MyFunction.java"
  responseAttributes:
    - { name: id, desc: "ID of the updated custom function." }
    - { name: className, desc: "Class name derived from the uploaded file name." }
    - { name: projectId, desc: "ID of the project the function belongs to." }
  response:
    id: 118
    className: "MyFunction"
    projectId: 24
---
