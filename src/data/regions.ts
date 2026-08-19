/**
 * Regional API hosts — the single source of truth.
 *
 * Testsigma serves each tenant from a regional host, so the base URL on every
 * endpoint page depends on where the reader's account lives. The endpoint pages
 * keep the US host in their `api.baseUrl` frontmatter (it is the canonical
 * value and needs no migration); ApiMarkdownContent.astro wraps whichever host
 * it recognises in a `[data-ts-host]` span and its region picker rewrites those
 * spans client-side. Nothing else may hardcode a regional host — the base-URL
 * table on the API overview pages and tests/api-reference.test.mjs both derive
 * from this file, so adding a region is a one-line change here.
 *
 * Hosts are grouped into FAMILIES so a product served from its own domain can
 * carry its own region list (Arcus did, until its removal — see git history).
 * A family with one entry renders no picker at all.
 */

export interface Region {
	/** Stable id, persisted in localStorage so a choice survives navigation. */
	id: string;
	label: string;
	/** Host only — no scheme, no path. Always served over https. */
	host: string;
}

/**
 * Suite, and the `api_private` Salesforce endpoints, which share the app.* host.
 * US first: it is the default for a reader who has never picked.
 */
export const SUITE_REGIONS: Region[] = [
	{ id: 'us', label: 'US', host: 'app.testsigma.com' },
	{ id: 'eu', label: 'EU', host: 'app-eu.testsigma.com' },
	{ id: 'in', label: 'India', host: 'app-in.testsigma.com' },
];

const FAMILIES: Region[][] = [SUITE_REGIONS];

/** Every host this repo is allowed to use in an `api.baseUrl`. */
export const CANONICAL_HOSTS: string[] = FAMILIES.flatMap((f) => f.map((r) => r.host));

/** The host each family is authored with — what frontmatter should contain. */
export const DEFAULT_HOSTS: string[] = FAMILIES.map((f) => f[0].host);

/**
 * The regions offered for a given host, or a single-entry list when the host is
 * not part of a known family (so callers can always render something).
 */
export function regionsForHost(host: string): Region[] {
	return (
		FAMILIES.find((f) => f.some((r) => r.host === host)) ?? [{ id: 'us', label: 'US', host }]
	);
}
