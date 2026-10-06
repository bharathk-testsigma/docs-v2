---
title: "Get an upload"
description: "Retrieve the details of a single uploaded file by its upload ID, including a pre-signed download URL."
sidebar:
  label: "Get an upload"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /uploads/{uploadId}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: uploadId, desc: "ID of the upload to retrieve. Available from the Uploads page via the Copy Path option." }
  responseAttributes:
    - { name: id, desc: "Unique upload identifier." }
    - { name: projectId, desc: "ID of the project the file belongs to." }
    - { name: createdById, desc: "ID of the user who created the upload." }
    - { name: updatedById, desc: "ID of the user who last updated the upload." }
    - { name: createdDate, desc: "Epoch timestamp when the file was created." }
    - { name: updatedDate, desc: "Epoch timestamp when the file was last updated." }
    - { name: name, desc: "Name of the file." }
    - { name: appPath, desc: "Path of the file in the application's storage." }
    - { name: fileName, desc: "Filename including extension." }
    - { name: uploadType, desc: "Type of upload — e.g. Attachment." }
    - { name: version, desc: "Version label of the file, if any." }
    - { name: platformType, desc: "Platform the file targets — e.g. TestsigmaLab." }
    - { name: isPublic, desc: "Whether the file is publicly accessible." }
    - { name: uploadStatus, desc: "Upload status — e.g. Completed." }
    - { name: fileSize, desc: "Size of the file in bytes." }
    - { name: preSignedURL, desc: "Pre-signed URL granting temporary access to the file." }
    - { name: signed, desc: "Whether the pre-signed URL is signed." }
  response:
    id: 147
    projectId: 11
    createdById: 43
    updatedById: 43
    createdDate: 1633535450000
    updatedDate: 1635322081221
    name: "test-file"
    appPath: "testsigmatech.com/uploads/11/147/Testfile.pdf"
    fileName: "Testfile.pdf"
    uploadType: "Attachment"
    version: null
    testsigmaAppId: null
    browserStackAppId: null
    sauceLabsAppId: null
    platformType: "TestsigmaLab"
    isPublic: null
    uploadStatus: "Completed"
    message: "Uploaded successfully"
    status: 1
    fileSize: 334666
    preSignedURL: "https://s3.amazonaws.com/.../Testfile.pdf?X-Amz-Signature=..."
    signed: false
---
