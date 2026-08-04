---
title: "Get a JUnit report"
description: "Retrieve the JUnit XML report for a completed run result."
sidebar:
  label: "Get JUnit report"
  badge: { text: GET, variant: tip }
api:
  method: GET
  path: /reports/junit/{execution_result_id}
  baseUrl: https://app.testsigma.com/api/v1
  pathParams:
    - { name: execution_result_id, desc: "The ID of the run result to generate the JUnit report for." }
  responseAttributes:
    - { name: testsuites, desc: "Root XML element with aggregate test, failure, and error counts." }
    - { name: testsuite, desc: "One element per test suite in the run, with its own counts and duration." }
    - { name: testcase, desc: "One element per test case, including any failure details." }
  response: |
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites tests="4" failures="1" errors="0" time="141.0">
      <testsuite name="Smoke Suite" tests="4" failures="1" errors="0" time="141.0">
        <testcase name="Login with valid credentials" time="23.0"/>
        <testcase name="Search for a product" time="31.0"/>
        <testcase name="Add product to cart" time="45.0">
          <failure message="Element not found: add-to-cart button"/>
        </testcase>
        <testcase name="Checkout" time="42.0"/>
      </testsuite>
    </testsuites>
---
