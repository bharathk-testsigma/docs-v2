---
title: "List external entity mappings"
description: "Retrieve all external entity mappings, such as Jira or TestRail links, for a given entity."
sidebar:
  label: "List entity mappings"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /external_entity_mappings/entityType/{entity_type}/entityId/{entity_id}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: entity_type, desc: "Entity type — TEST_CASE, TEST_PLAN, REQUIREMENT, TEST_STEP." }
    - { name: entity_id, desc: "Numeric ID of the entity." }
  responseAttributes:
    - { name: "(array)", desc: "List of external entity mappings. Each has id, entityType, entityId, externalId and applicationId." }
  response:
    - id: 18
      entityType: "TEST_CASE"
      entityId: 431
      externalId: "PROJ-101"
      applicationId: 3
    - id: 19
      entityType: "TEST_CASE"
      entityId: 431
      externalId: "PROJ-118"
      applicationId: 3
---
