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
//  regular page and unwraps it on /api/ pages — see sidebar-suite.mjs.
// ────────────────────────────────────────────────────────────────────────────

export const restApis = {
	"label": "REST APIs",
	"collapsed": true,
	"items": [
		{
			"slug": "api/overview"
		},
		{
			"label": "Projects",
			"collapsed": true,
			"items": [
				{
					"slug": "api/projects/get-projects"
				},
				{
					"slug": "api/projects/get-applications"
				},
				{
					"slug": "api/projects/get-users"
				},
				{
					"slug": "api/projects/list-uploads"
				}
			]
		},
		{
			"label": "Test Cases",
			"collapsed": true,
			"items": [
				{
					"slug": "api/test-cases/get-test-case-execution-details"
				},
				{
					"slug": "api/test-cases/get-labels"
				},
				{
					"slug": "api/test-cases/get-priorities"
				},
				{
					"slug": "api/test-cases/get-requirements"
				},
				{
					"slug": "api/test-cases/trigger-rerun"
				},
				{
					"slug": "api/test-cases/update-results"
				}
			]
		},
		{
			"label": "Test Steps",
			"collapsed": true,
			"items": [
				{
					"slug": "api/test-steps/list-test-case-steps"
				},
				{
					"slug": "api/test-steps/retrieve-test-step"
				},
				{
					"slug": "api/test-steps/create-test-step"
				},
				{
					"slug": "api/test-steps/create-multiple-test-steps"
				},
				{
					"slug": "api/test-steps/update-test-step"
				},
				{
					"slug": "api/test-steps/delete-test-step"
				},
				{
					"slug": "api/test-steps/search-nlp-templates"
				}
			]
		},
		{
			"label": "Test Suites",
			"collapsed": true,
			"items": [
				{
					"slug": "api/test-suites/get-test-suites"
				}
			]
		},
		{
			"label": "Test Plans",
			"collapsed": true,
			"items": [
				{
					"slug": "api/test-plans/list-test-plans"
				},
				{
					"slug": "api/test-plans/get-test-plan-configs"
				},
				{
					"slug": "api/test-plans/trigger-test-plan"
				},
				{
					"slug": "api/test-plans/stop-test-plan"
				},
				{
					"slug": "api/test-plans/get-test-plan-result"
				},
				{
					"slug": "api/test-plans/get-test-case-results"
				},
				{
					"slug": "api/test-plans/schedule-test-plan"
				},
				{
					"slug": "api/test-plans/update-schedule"
				},
				{
					"slug": "api/test-plans/delete-schedule"
				}
			]
		},
		{
			"label": "Test Data",
			"collapsed": true,
			"items": [
				{
					"slug": "api/test-data/upload-test-data-profile"
				},
				{
					"slug": "api/test-data/create-profile-value"
				},
				{
					"slug": "api/test-data/update-profile-value"
				}
			]
		},
		{
			"label": "Environments",
			"collapsed": true,
			"items": [
				{
					"slug": "api/environments/list-environments"
				},
				{
					"slug": "api/environments/get-an-environment"
				},
				{
					"slug": "api/environments/create-an-environment"
				},
				{
					"slug": "api/environments/update-an-environment"
				}
			]
		},
		{
			"label": "Elements",
			"collapsed": true,
			"items": [
				{
					"slug": "api/elements/get-elements"
				},
				{
					"slug": "api/elements/get-an-element"
				},
				{
					"slug": "api/elements/create-an-element"
				},
				{
					"slug": "api/elements/update-an-element"
				}
			]
		},
		{
			"label": "Uploads",
			"collapsed": true,
			"items": [
				{
					"slug": "api/uploads/upload-file"
				},
				{
					"slug": "api/uploads/get-upload"
				},
				{
					"slug": "api/uploads/get-upload-versions"
				},
				{
					"slug": "api/uploads/update-file"
				}
			]
		},
		{
			"label": "Results",
			"collapsed": true,
			"items": [
				{
					"slug": "api/results/fetch-test-plan-results"
				},
				{
					"slug": "api/results/fetch-test-suite-results"
				},
				{
					"slug": "api/results/fetch-test-case-results"
				},
				{
					"slug": "api/results/fetch-test-step-results"
				},
				{
					"slug": "api/results/fetch-test-machine-results"
				},
				{
					"slug": "api/results/export-run-report"
				},
				{
					"slug": "api/results/export-suite-report"
				},
				{
					"slug": "api/results/export-machine-report"
				},
				{
					"slug": "api/results/export-case-report"
				},
				{
					"slug": "api/results/download-report"
				},
				{
					"slug": "api/results/get-junit-report"
				}
			]
		},
		{
			"label": "Integrations",
			"collapsed": true,
			"items": [
				{
					"slug": "api/integrations/refresh-salesforce-metadata"
				},
				{
					"slug": "api/integrations/get-refresh-status"
				}
			]
		}
	]
};

export default restApis;
