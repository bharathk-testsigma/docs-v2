---
title: "Create a custom function"
description: "Upload a Java file to create a custom function in a project."
sidebar:
  label: "Create custom function"
  badge: { text: POST, variant: caution }
api:
  method: POST
  path: /custom_functions
  baseUrl: https://app.testsigma.com/api/v1
  bodyFields:
    - { name: projectId, desc: "ID of the project the custom function belongs to." }
    - { name: javaFile, desc: "The .java file to upload (multipart file part). The class and function name are derived from the file name." }
  formData:
    projectId: 24
    javaFile: "@MyFunction.java"
  responseAttributes:
    - { name: id, desc: "ID of the newly created custom function." }
    - { name: className, desc: "Class name derived from the uploaded file name." }
    - { name: projectId, desc: "ID of the project the function was created in." }
  response:
    id: 118
    className: "MyFunction"
    projectId: 24
---
