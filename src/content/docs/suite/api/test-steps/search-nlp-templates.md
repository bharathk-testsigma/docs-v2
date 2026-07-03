---
title: "Search NLP templates"
description: "Search NLP templates to use when creating test steps."
sidebar:
  label: "Search NLP templates"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /test_steps/nlp/{applicationType}/templates/{searchText}
  baseUrl: https://app.testsigma.com/api/v2
  pathParams:
    - { name: applicationType, desc: "One of: WebApplication, MobileWeb, IOSNative, AndroidNative, Rest, Salesforce." }
    - { name: searchText, desc: "Keywords used to search for templates." }
  responseAttributes:
    - { name: id, desc: "Unique identifier of the template." }
    - { name: keyword, desc: "Keyword associated with the step (e.g. click)." }
    - { name: grammar, desc: "NLP grammar expression for the step." }
    - { name: action, desc: "Action executed by the step." }
  response:
    - id: 456
      keyword: "click"
      grammar: "Click on the ${ui-identifier}"
      action: "click"
---
