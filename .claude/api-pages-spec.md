# Spec: generate Suite API endpoint pages from Bruno collection

REPO: /Users/bharath/work/testsigma-docs-v2
SOURCE OF TRUTH: /Users/bharath/work/testsigma-docs-v2/api-collection (Bruno .bru files; V1 and V2 folders)
TARGET: /Users/bharath/work/testsigma-docs-v2/src/content/docs/suite/api/<folder>/<file>.md

## Page format — frontmatter-only .md (NO body after closing `---`)

Schema is the `api` block in /Users/bharath/work/testsigma-docs-v2/src/content.config.ts (read it).
Study 2–3 existing pages matching your methods as templates before writing anything:

- GET single: src/content/docs/suite/api/environments/get-an-environment.md
- GET list (paginated): src/content/docs/suite/api/environments/list-environments.md
- POST with JSON body: src/content/docs/suite/api/elements/create-an-element.md
- PUT: src/content/docs/suite/api/elements/update-an-element.md
- PATCH: src/content/docs/suite/api/test-data/update-profile-value.md
- DELETE: src/content/docs/suite/api/test-steps/delete-test-step.md
- multipart/form-data: src/content/docs/suite/api/uploads/upload-file.md
- v2 endpoint: src/content/docs/suite/api/results/fetch-test-case-results.md

Frontmatter skeleton:

```yaml
---
title: "<sentence case, verb phrase, e.g. List test cases>"
description: "<one sentence, 9-24 words>"
sidebar:
  label: "<short label — EXACTLY as given in your assignment table>"
  badge: { text: <METHOD>, variant: <see map> }
api:
  method: <GET|POST|PUT|PATCH|DELETE>
  path: /<path relative to baseUrl, params in {curly_braces}, snake_case param names>
  baseUrl: https://app.testsigma.com/api/v1   # or /api/v2 — MUST match the .bru URL
  pathParams: [...]      # only if path has params
  query: [...]           # from params:query in the .bru (page/size/sort etc.)
  bodyFields: [...]      # only for POST/PUT/PATCH — the KEY fields, not every DTO field
  requestBody: {...}     # realistic example. Do NOT paste the giant zeroed DTO from the
                         # .bru — craft a minimal realistic example from the "Key fields"
                         # in the .bru docs block (10-20 fields max, real-looking values)
  formData: {...}        # only for multipart endpoints; file field value is "@filename"
  response: {...}        # realistic synthesized example consistent with the .bru docs
                         # block DTO notes. Paginated lists use the shape:
                         #   response:
                         #     content: [ <2 items> ]
                         #     totalElements: 2
  status: 200            # 201/204 only if the .bru docs block says so
  responseAttributes: [...]  # name+desc for each top-level response field
---
```

Badge variant map: GET=tip, POST=caution, PUT=note, PATCH=default, DELETE=danger.

Rules:
- Every fact about paths, methods, params, body fields comes from the .bru file (url,
  params:path, params:query, body:json, docs block). The docs block lists DTO classes,
  required fields, enums — use it for bodyFields/responseAttributes descriptions.
- Descriptions: plain, factual, no marketing. "ID of the test case." not "The powerful ID".
- Enum values from docs blocks go into the field desc, e.g. "Result — PASSED, FAILED, ABORTED, STOPPED."
- Path params in docs use {snake_case} style even if the .bru uses :camelCase.
- v1 "environment results" = test machine results in product UI; v1 "ui_identifiers" = elements.
- YAML must parse; quote strings containing colons. File must pass the zod schema.
- Do NOT add pageType, verified, or any body prose. Frontmatter only.

## Assignments

Each row: BRU FILE (under api-collection/) → TARGET (under src/content/docs/suite/api/) | title | sidebar label.

### AGENT-A — V1 Test Cases
| V1/Test Cases/Create Test Case.bru → test-cases/create-test-case.md | Create a test case | Create test case |
| V1/Test Cases/Get Test Case.bru → test-cases/get-test-case.md | Get a test case | Get test case |
| V1/Test Cases/List Test Cases.bru → test-cases/list-test-cases.md | List test cases | List test cases |
| V1/Test Cases/Update Test Case.bru → test-cases/update-test-case.md | Update a test case | Update test case |
| V1/Test Cases/Patch Test Case.bru → test-cases/patch-test-case.md | Patch a test case | Patch test case |
| V1/Test Cases/Delete Test Case.bru → test-cases/delete-test-case.md | Delete a test case | Delete test case |

### AGENT-B — V1 Test Data + Test Data Sets
| V1/Test Data/Create Test Data.bru → test-data/create-test-data-profile.md | Create a test data profile | Create profile |
| V1/Test Data/Get Test Data.bru → test-data/get-test-data-profile.md | Get a test data profile | Get profile |
| V1/Test Data/List Test Data.bru → test-data/list-test-data-profiles.md | List test data profiles | List profiles |
| V1/Test Data/Update Test Data.bru → test-data/update-a-test-data-profile.md | Update a test data profile | Update profile |
| V1/Test Data/Delete Test Data.bru → test-data/delete-test-data-profile.md | Delete a test data profile | Delete profile |
| V1/Test Data/Export Test Data.bru → test-data/export-test-data-profile.md | Export a test data profile | Export profile |
| V1/Test Data Sets/List Test Data Sets.bru → test-data/list-test-data-sets.md | List test data sets | List data sets |
| V1/Test Data Sets/Update Test Data Set.bru → test-data/update-test-data-set.md | Update a test data set | Update data set |
| V1/Test Data Sets/Delete Test Data Set.bru → test-data/delete-test-data-set.md | Delete a test data set | Delete data set |
| V1/Test Data Sets/Bulk Delete Test Data Sets.bru → test-data/bulk-delete-test-data-sets.md | Bulk delete test data sets | Bulk delete data sets |

PLUS ONE FIX: src/content/docs/suite/api/test-data/update-test-data-profile.md currently
documents POST /test_data/upload, but the source of truth (V1/Test Data/Update Test Data
Profile (Upload).bru) says it is PUT /api/v1/test_data/update. Rewrite that page's `api:`
block (method, path, formData/bodyFields) to match the .bru. Keep title/label/description.

### AGENT-C — V1 Results
| V1/ExecutionResults/List Execution Results.bru → results/list-run-results.md | List run results | List run results |
| V1/ExecutionResults/Export Date-Based Result Summary.bru → results/export-run-results-summary.md | Export run results summary | Export results summary |
| V1/JunitReports/Get JUnit Report.bru → results/get-junit-report.md | Get a JUnit report | Get JUnit report |
| V1/Test Case Results/List Test Case Results.bru → results/list-test-case-results.md | List test case results | List test case results |
| V1/Test Suite Results/List Test Suite Results.bru → results/list-test-suite-results.md | List test suite results | List test suite results |
| V1/EnvironmentResults/List Environment Results.bru → results/list-test-machine-results.md | List test machine results | List test machine results |

Note: v1 environment_results = test machine results in the product UI; title/label use
"test machine", the api.path stays /environment_results.

### AGENT-D — V1 Agents, Custom Functions, CI/CD, Schedules
| V1/Agents/Create Dynamic Agent.bru → agents/create-dynamic-agent.md | Create a dynamic agent | Create dynamic agent |
| V1/Agents/Delete Agent.bru → agents/delete-agent.md | Delete an agent | Delete agent |
| V1/CustomFunctions/Create Custom Function.bru → custom-functions/create-custom-function.md | Create a custom function | Create custom function |
| V1/CustomFunctions/Update Custom Function.bru → custom-functions/update-custom-function.md | Update a custom function | Update custom function |
| V1/CustomFunctions/Get File Id.bru → custom-functions/get-file-id.md | Get a custom function file ID | Get file ID |
| V1/CICDTestPlanResults/Run Test Plan (CICD).bru → test-plans/run-test-plan-from-cicd.md | Run a test plan from CI/CD | Run from CI/CD |
| V1/ScheduleTestPlans/List Schedules.bru → test-plans/list-schedules.md | List schedules | List schedules |

### AGENT-E — V1 leftovers + V2 Projects group
| V1/Applications/Get Application.bru → projects/get-application.md | Get an application | Get application |
| V1/Projects/Get Project Id By Name.bru → projects/get-project-id-by-name.md | Get a project ID by name | Get project ID by name |
| V1/Environments/Update Environment Variable.bru → environments/update-environment-variable.md | Update an environment variable | Update variable |
| V1/Elements/Delete Element.bru → elements/delete-an-element.md | Delete an element | Delete an element |
| V1/Uploads/Delete Upload.bru → uploads/delete-upload.md | Delete an upload | Delete file |
| V2/Projects/List projects.bru → projects/list-projects-v2.md | List projects (v2) | List projects (v2) |
| V2/Applications/List applications.bru → projects/list-applications-v2.md | List applications (v2) | List applications (v2) |
| V2/Applications/Get application by id.bru → projects/get-application-v2.md | Get an application (v2) | Get application (v2) |
| V2/Application Versions/List application versions.bru → projects/list-application-versions.md | List application versions | List application versions |
| V2/Folders/List folders.bru → projects/list-folders.md | List folders | List folders |

### AGENT-F — V2 Test Cases group
| V2/TestCases/List test cases.bru → test-cases/list-test-cases-v2.md | List test cases (v2) | List test cases (v2) |
| V2/TestCases/Get test case.bru → test-cases/get-test-case-v2.md | Get a test case (v2) | Get test case (v2) |
| V2/TestCasePriorities/List test case priorities.bru → test-cases/list-test-case-priorities-v2.md | List test case priorities (v2) | List priorities (v2) |
| V2/TestCasePriorities/Get test case priority.bru → test-cases/get-test-case-priority.md | Get a test case priority | Get a priority |
| V2/TestCaseTypes/List test case types.bru → test-cases/list-test-case-types.md | List test case types | List types |
| V2/TestCaseTypes/Get test case type.bru → test-cases/get-test-case-type.md | Get a test case type | Get a type |
| V2/Requirements/List requirements.bru → test-cases/list-requirements-v2.md | List requirements (v2) | List requirements (v2) |
| V2/Requirements/Get requirement by id.bru → test-cases/get-requirement.md | Get a requirement | Get a requirement |

### AGENT-G — V2 Test Data, Elements, Screen Names, Environments
| V2/TestData/List test data.bru → test-data/list-test-data-profiles-v2.md | List test data profiles (v2) | List profiles (v2) |
| V2/TestData/Get test data.bru → test-data/get-test-data-profile-v2.md | Get a test data profile (v2) | Get profile (v2) |
| V2/Elements/List elements.bru → elements/list-elements-v2.md | List elements (v2) | List elements (v2) |
| V2/Elements/Get element by id.bru → elements/get-an-element-v2.md | Get an element (v2) | Get an element (v2) |
| V2/Element Screen Names/List screen names.bru → elements/list-screen-names.md | List screen names | List screen names |
| V2/Element Screen Names/Get screen name by id.bru → elements/get-screen-name.md | Get a screen name | Get screen name |
| V2/Environments/List environments.bru → environments/list-environments-v2.md | List environments (v2) | List environments (v2) |
| V2/Environments/Get environment by id.bru → environments/get-an-environment-v2.md | Get an environment (v2) | Get an environment (v2) |

### AGENT-H — V2 Test Plans, Suites, Steps, Devices, Hooks
| V2/TestPlans/List test plans.bru → test-plans/list-test-plans-v2.md | List test plans (v2) | List test plans (v2) |
| V2/TestPlans/Get test plan.bru → test-plans/get-test-plan.md | Get a test plan | Get test plan |
| V2/TestSuites/List test suites.bru → test-suites/list-test-suites-v2.md | List test suites (v2) | List test suites (v2) |
| V2/TestSuites/Get test suite.bru → test-suites/get-test-suite.md | Get a test suite | Get test suite |
| V2/TestDevices/List test devices.bru → test-plans/list-test-devices.md | List test devices | List test devices |
| V2/Post Plan Hooks/List post plan hooks.bru → test-plans/list-post-plan-hooks.md | List post plan hooks | List post plan hooks |
| V2/TestStep/List test steps.bru → test-steps/list-test-steps.md | List all test steps | List all test steps |

### AGENT-I — V2 Results
| V2/TestRunResults/List test run results.bru → results/list-run-results-v2.md | List run results (v2) | List run results (v2) |
| V2/TestCaseResults/List test case results.bru → results/list-test-case-results-v2.md | List test case results (v2) | List test case results (v2) |
| V2/TestCaseResults/Is step result upload completed.bru → results/step-result-upload-status.md | Check step result upload status | Step result upload status |
| V2/TestCaseIterationResults/List iteration results.bru → results/list-iteration-results.md | List iteration results | List iteration results |
| V2/TestDeviceResults/List test device results.bru → results/list-test-machine-results-v2.md | List test machine results (v2) | List test machine results (v2) |
| V2/TestSuiteResults/List test suite results.bru → results/list-test-suite-results-v2.md | List test suite results (v2) | List test suite results (v2) |
| V2/TestStepResults/Get step result asset.bru → results/get-step-result-asset.md | Get a step result asset | Get step result asset |

### AGENT-J — V2 Platforms, Users & Roles, Tunnel, Addons, Agents, Mappings
| V2/Platforms/List supported platforms.bru → platforms/list-supported-platforms.md | List supported platforms | List platforms |
| V2/Platforms/List OS versions.bru → platforms/list-os-versions.md | List OS versions | List OS versions |
| V2/Platforms/List browsers.bru → platforms/list-browsers.md | List browsers | List browsers |
| V2/Platforms/List browser versions.bru → platforms/list-browser-versions.md | List browser versions | List browser versions |
| V2/Platforms/List screen resolutions.bru → platforms/list-screen-resolutions.md | List screen resolutions | List screen resolutions |
| V2/Users/List users.bru → users/list-users-v2.md | List users (v2) | List users (v2) |
| V2/Users/Get user.bru → users/get-user.md | Get a user | Get user |
| V2/Users/Create user.bru → users/create-user.md | Create a user | Create user |
| V2/Roles/List roles.bru → users/list-roles.md | List roles | List roles |
| V2/Roles/Get role by id.bru → users/get-role.md | Get a role | Get role |
| V2/Connect Tunnel/Register tunnel.bru → tunnel/register-tunnel.md | Register a tunnel | Register tunnel |
| V2/Connect Tunnel/Deregister tunnel.bru → tunnel/deregister-tunnel.md | Deregister a tunnel | Deregister tunnel |
| V2/Addons/List addons.bru → addons/list-addons.md | List addons | List addons |
| V2/Agents/List agents.bru → agents/list-agents.md | List agents | List agents |
| V2/External Entity Mappings/List mappings for entity.bru → integrations/list-external-entity-mappings.md | List external entity mappings | List entity mappings |

## Agent output

Return one line per file written: `<repo-relative path> OK` (or the error if a .bru
file was missing/ambiguous). Do not print file contents.
