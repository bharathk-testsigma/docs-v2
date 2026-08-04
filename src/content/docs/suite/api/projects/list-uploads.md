---
title: "List uploads"
description: "Get all uploaded files (APKs, IPAs, attachments) available in the workspace."
sidebar:
  label: "List uploads"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /uploads
  baseUrl: https://app.testsigma.com/api/v1
  responseAttributes:
    - { name: id, desc: "Unique upload identifier." }
    - { name: name, desc: "Name of the uploaded file." }
    - { name: fileName, desc: "Original filename of the upload." }
    - { name: fileSize, desc: "Size of the file in bytes." }
    - { name: uploadType, desc: "Type — Attachment, AppActivity, etc." }
    - { name: createdById, desc: "ID of the user who uploaded the file." }
    - { name: createdDate, desc: "Epoch timestamp when the file was uploaded." }
  response:
    - id: 5
      name: "SampleApp.apk"
      fileName: "SampleApp-v2.3.apk"
      fileSize: 4812344
      uploadType: "AppActivity"
      createdById: 9
      createdDate: 1680000000000
---
