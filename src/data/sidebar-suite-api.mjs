// ────────────────────────────────────────────────────────────────────────────
//  The Suite REST API sidebar tree — the ONE piece of the retired V2 IA that
//  V6 still uses. Extracted 2026-08-14 when sidebar-suite-v2.mjs and
//  sidebar-suite-v4.mjs were deleted as dead weight (git history keeps both,
//  including the section commentary this serialization dropped).
//
//  Scope: only endpoints the legacy Gatsby docs actually document — 55 of the
//  134 in the Bruno collection; the generated rest were deleted 2026-08-11.
//  9 pages that v1 covers were missing from this list until 2026-10-01 (list
//  projects/applications/environments, stop a run, the 5 report exports).
//  The route middleware (starlightRouteData.ts) strips this group off every
//  regular page and unwraps it on /suite/api/ pages — see sidebar-suite.mjs.
// ────────────────────────────────────────────────────────────────────────────

export const restApis = {
	"label": "REST APIs",
	"collapsed": true,
	"items": [
		{
			"slug": "suite/api/overview"
		},
		{
			"label": "Projects",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/projects/get-projects"
				},
				{
					"slug": "suite/api/projects/get-applications"
				},
				{
					"slug": "suite/api/projects/get-users"
				},
				{
					"slug": "suite/api/projects/list-uploads"
				}
			]
		},
		{
			"label": "Test Cases",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/test-cases/get-test-case-execution-details"
				},
				{
					"slug": "suite/api/test-cases/get-labels"
				},
				{
					"slug": "suite/api/test-cases/get-priorities"
				},
				{
					"slug": "suite/api/test-cases/get-requirements"
				},
				{
					"slug": "suite/api/test-cases/trigger-rerun"
				},
				{
					"slug": "suite/api/test-cases/update-results"
				}
			]
		},
		{
			"label": "Test Steps",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/test-steps/list-test-case-steps"
				},
				{
					"slug": "suite/api/test-steps/retrieve-test-step"
				},
				{
					"slug": "suite/api/test-steps/create-test-step"
				},
				{
					"slug": "suite/api/test-steps/create-multiple-test-steps"
				},
				{
					"slug": "suite/api/test-steps/update-test-step"
				},
				{
					"slug": "suite/api/test-steps/delete-test-step"
				},
				{
					"slug": "suite/api/test-steps/search-nlp-templates"
				}
			]
		},
		{
			"label": "Test Suites",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/test-suites/get-test-suites"
				}
			]
		},
		{
			"label": "Test Plans",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/test-plans/list-test-plans"
				},
				{
					"slug": "suite/api/test-plans/get-test-plan-configs"
				},
				{
					"slug": "suite/api/test-plans/trigger-test-plan"
				},
				{
					"slug": "suite/api/test-plans/stop-test-plan"
				},
				{
					"slug": "suite/api/test-plans/get-test-plan-result"
				},
				{
					"slug": "suite/api/test-plans/get-test-case-results"
				},
				{
					"slug": "suite/api/test-plans/schedule-test-plan"
				},
				{
					"slug": "suite/api/test-plans/update-schedule"
				},
				{
					"slug": "suite/api/test-plans/delete-schedule"
				}
			]
		},
		{
			"label": "Test Data",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/test-data/upload-test-data-profile"
				},
				{
					"slug": "suite/api/test-data/create-profile-value"
				},
				{
					"slug": "suite/api/test-data/update-profile-value"
				}
			]
		},
		{
			"label": "Environments",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/environments/list-environments"
				},
				{
					"slug": "suite/api/environments/get-an-environment"
				},
				{
					"slug": "suite/api/environments/create-an-environment"
				},
				{
					"slug": "suite/api/environments/update-an-environment"
				}
			]
		},
		{
			"label": "Elements",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/elements/get-elements"
				},
				{
					"slug": "suite/api/elements/get-an-element"
				},
				{
					"slug": "suite/api/elements/create-an-element"
				},
				{
					"slug": "suite/api/elements/update-an-element"
				}
			]
		},
		{
			"label": "Uploads",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/uploads/upload-file"
				},
				{
					"slug": "suite/api/uploads/get-upload"
				},
				{
					"slug": "suite/api/uploads/get-upload-versions"
				},
				{
					"slug": "suite/api/uploads/update-file"
				}
			]
		},
		{
			"label": "Results",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/results/fetch-test-plan-results"
				},
				{
					"slug": "suite/api/results/fetch-test-suite-results"
				},
				{
					"slug": "suite/api/results/fetch-test-case-results"
				},
				{
					"slug": "suite/api/results/fetch-test-step-results"
				},
				{
					"slug": "suite/api/results/fetch-test-machine-results"
				},
				{
					"slug": "suite/api/results/export-run-report"
				},
				{
					"slug": "suite/api/results/export-suite-report"
				},
				{
					"slug": "suite/api/results/export-machine-report"
				},
				{
					"slug": "suite/api/results/export-case-report"
				},
				{
					"slug": "suite/api/results/download-report"
				},
				{
					"slug": "suite/api/results/get-junit-report"
				}
			]
		},
		{
			"label": "Integrations",
			"collapsed": true,
			"items": [
				{
					"slug": "suite/api/integrations/refresh-salesforce-metadata"
				},
				{
					"slug": "suite/api/integrations/get-refresh-status"
				}
			]
		}
	]
};

export default restApis;
