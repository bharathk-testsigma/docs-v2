---
title: "Get upload versions"
description: "Retrieve all versions of an uploaded file, identified by its upload ID."
sidebar:
  label: "Get upload versions"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /upload_versions
  baseUrl: https://app.testsigma.com/api/v1
  query:
    - { name: query, desc: "Filter by upload — e.g. uploadId:147." }
  responseAttributes:
    - { name: id, desc: "Unique identifier of the file version." }
    - { name: createdById, desc: "ID of the user who created the version." }
    - { name: updatedById, desc: "ID of the user who last updated the version." }
    - { name: createdDate, desc: "Epoch timestamp when the version was created." }
    - { name: updatedDate, desc: "Epoch timestamp when the version was last updated." }
    - { name: name, desc: "Name of the uploaded file." }
    - { name: appPath, desc: "Path where the file is stored." }
    - { name: fileName, desc: "Filename including extension." }
    - { name: uploadType, desc: "Type of upload — e.g. Attachment." }
    - { name: fileSize, desc: "Size of the file in bytes." }
    - { name: preSignedURL, desc: "Pre-signed URL granting temporary access to the file." }
    - { name: signed, desc: "Whether the pre-signed URL is signed." }
  response:
    - id: 147
      createdById: 43
      updatedById: 43
      createdDate: 1633535450000
      updatedDate: 1635322081221
      name: "test-file"
      appPath: "testsigmatech.com/uploads/11/147/Testfile.pdf"
      fileName: "Testfile.pdf"
      uploadType: "Attachment"
      testsigmaAppId: null
      testsigmaSauceLabsAppId: null
      browserStackAppId: null
      sauceLabsAppId: null
      fileSize: 334666
      preSignedURL: "https://s3.amazonaws.com/.../Testfile.pdf?X-Amz-Signature=..."
      signed: false
---
