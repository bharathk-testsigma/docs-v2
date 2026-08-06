---
title: "Update a file"
description: "Upload a new version of an existing file in Testsigma Uploads, identified by its upload ID."
sidebar:
  label: "Update a file"
  badge: { text: PUT, variant: note }
api:
  method: PUT
  path: /uploads/{uploadId}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: uploadId, desc: "ID of the upload to update. Available from the API response when the file was created, or via the Copy Path option on the Uploads page." }
  bodyFields:
    - { name: projectId, desc: "ID of the project the file belongs to." }
    - { name: name, desc: "Name for the upload." }
    - { name: uploadType, desc: "Type of upload — e.g. Attachment." }
    - { name: platformType, desc: "Platform the file targets — e.g. TestsigmaLab." }
    - { name: isPublic, desc: "Whether the file is publicly accessible." }
    - { name: applicationId, desc: "ID of the associated application." }
    - { name: version, desc: "Version label for the file." }
    - { name: fileContent, desc: "The new file content (multipart file part)." }
  formData:
    projectId: 24
    name: "APIFileUpdated"
    uploadType: "Attachment"
    platformType: "TestsigmaLab"
    isPublic: true
    applicationId: 43
    version: "v101"
    fileContent: "@app.apk"
  responseAttributes:
    - { name: id, desc: "Unique upload identifier." }
    - { name: createdById, desc: "ID of the user who created the upload." }
    - { name: updatedById, desc: "ID of the user who last updated the upload." }
    - { name: createdDate, desc: "Epoch timestamp when the upload was created." }
    - { name: updatedDate, desc: "Epoch timestamp when the upload was last updated." }
    - { name: name, desc: "Name of the upload." }
    - { name: latestVersionId, desc: "ID of the latest version of the file." }
    - { name: latestVersion, desc: "Object describing the latest version (id, path, fileName, fileSize, status, preSignedURL, etc.)." }
    - { name: versions, desc: "Placeholder field, not currently used." }
    - { name: supportedDeviceType, desc: "Placeholder field, not currently used." }
    - { name: isFlutter, desc: "Whether the upload is a Flutter project." }
  response:
    id: 62
    createdById: 10
    updatedById: 10
    createdDate: 1681974023000
    updatedDate: 1681974187126
    name: "APIFileUpdated"
    latestVersionId: 68
    latestVersion:
      id: 68
      createdById: 10
      updatedById: 10
      createdDate: 1681974023000
      updatedDate: 1681974023000
      name: "v101"
      path: "46091/uploads/24/68/example.png"
      fileName: "example.png"
      uploadType: "Attachment"
      testsigmaSauceLabsAppId: null
      testsigmaBrowserstackAppId: null
      fileSize: 181368
      preSignedURL: "https://s3.amazonaws.com/.../Testfile.pdf?X-Amz-Signature=..."
      signed: false
      status: "SUCCESS"
      uploadName: "APIFileUpdated"
      signStatus: "NONE"
      uploadId: 62
    versions: null
    supportedDeviceType: null
    isFlutter: false
---
