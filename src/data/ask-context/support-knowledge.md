---
title: Testsigma Support Knowledge — Common Questions
# Every answer below is a Testsigma screen or Testsigma behaviour, so it must not
# reach an Arcus reader. Takes effect on the next index rebuild.
product: suite
---

## Why can't I delete a feature or scenario in Testsigma?

`product: suite` `keywords: delete feature, delete scenario, cannot delete, not permitted to delete, trash, permanently delete`

In Testsigma, a feature cannot be deleted while it still contains scenarios and test cases that are present in the Trash. Deleting a test case moves it to the Trash rather than removing it, so the parent scenario and feature stay blocked until the Trash is cleared.

Delete in this order:

1. Delete the test cases associated with the feature and scenario.
2. Permanently remove those deleted test cases from the Trash. Navigate to **Test Cases → Saved Filters → Trash**.
3. Delete the scenario.
4. Delete the feature.

## Why is Atto or Copilot not available in my account?

`product: suite` `keywords: Atto not available, Copilot, unable to generate steps, don't have access, enable Atto, generate test cases`

Atto must be enabled for your account before it can be used. If Atto or Copilot options are missing, or generating steps fails because your account has no access to the Atto tool, contact your Customer Success Manager (CSM) and request that Atto be enabled for the account.

Once the feature is enabled, you can generate test cases and use Copilot to perform the required operations.

## Can Testsigma identify an Android element when the package name differs but the resource ID is the same?

`product: suite` `keywords: resource id, package name, android element, apk variants, element identification, app variants`

As of June 2026, this capability is not available in the product. A recorded Android element captures the resource ID together with the package name, so the same test case does not carry across app variants that use different package names, such as separate production, release, and UAT builds.

An enhancement request to identify elements by resource ID alone, independent of the package name, has been reviewed and accepted for consideration by the product team. No implementation timeline is committed.

## Is there an NLP to convert a CSV file to XLSM?

`product: suite` `keywords: csv to xlsm, convert csv, xlsm, macro, file conversion, addon`

No built-in NLP converts a CSV file to XLSM format. Testsigma support can build a custom add-on for this conversion and install it in your account, after which the add-on is added to a test case as a step.

Path behavior for that add-on depends on where the test runs:

- **Cloud execution** — leave the XLSM file path blank. The add-on generates a temporary XLSM file during execution.
- **Local execution** — provide the destination path where the XLSM file should be created.

## When will an accepted enhancement request be released?

`product: all` `keywords: enhancement request, feature request, when will it be released, timeline, whats new, roadmap`

Testsigma does not commit to a specific timeline for an accepted enhancement request. Prioritization depends on several factors, including customer demand, overall product direction, and development considerations.

Once an enhancement is live, it is announced in the **What's New** section of the application. The associated support case remains closed while the request is tracked internally. For updates on prioritization, contact your Customer Success Manager (CSM), who has visibility into that information as it becomes available.

## Why does my test fail with "Element Not Found" during execution when the element is clearly visible in the application?

`product: suite` `keywords: element not found, intermittent failures, XPath, locator, test run, dry run, auto-heal, element identification`

The most common cause is that the element's locator (XPath) no longer matches the application's current DOM — typically because the element was updated in the application after the locator was captured, or the stored XPath was edited. The element being visible on screen does not mean the saved XPath still identifies it. To resolve:

1. Open the failing step's element and copy its XPath.
2. Manually validate the XPath in the application (e.g., in browser DevTools) and confirm it correctly identifies/highlights the element in the current DOM.
3. If it does not, update the element with a locator that matches the current DOM, preferably a simple, stable XPath that avoids deep DOM hierarchy.
4. Run a dry run of the test case individually to confirm the step passes before executing it in a test plan.

Auto-healing may also update the locator automatically during execution; review run results to see if an auto-heal was performed, and save the healed locator if correct. If failures persist after the XPath validates manually, share the passing and failing run results with support for deeper analysis.

## Why does my "Click on element" step fail when the page uses iframes?

`product: suite` `keywords: iframe, nested iframe, click on element, switch back to parent page, JavaScript executor, element configuration, driver context`

Click failures around iframes are usually caused by a mismatch between the driver's current iframe context and the element's configuration. Check which case applies:

1. A previous step already switched into the required iframe, and the element is inside that same iframe: remove the nested iframe reference from the element configuration, click **Update**, and re-execute. Configuring an additional nested iframe on an element when the flow has already switched into that iframe causes the interaction to fail.
2. A previous step switched into an iframe, but the target element is on the parent page: add the step **Switch back to the parent page** before the click, since the driver cannot interact with elements outside the iframe it is in.
3. If a standard click still fails due to the element's interactability state at runtime, use **click on element using JavaScript executor** to trigger the click reliably.

## How do I click the action icon in each table row, and why does Testsigma keep overwriting my XPath?

`product: suite` `keywords: dynamic xpath, runtime variable, auto heal, table row iteration, pipeline operator, xpath overwritten, dropdown`

Testsigma rewrites an XPath only when Auto Heal fires — i.e., the given locator matched no elements. To iterate table rows with a loop counter, the runtime variable must be wrapped in the pipeline operator: use `(//tbody//tr)[$|i|]/td[last()]//button`, not `(//tbody//tr)[$i]/td[last()]//button`. Without `$|i|` the XPath returns no match and Auto Heal replaces it with a locator pointing to the originally recorded (first-row) element. To stop modification entirely, edit the element and uncheck the Auto Heal option. If clicks pass but each row's menu never opens, a previously opened dropdown overlay may be intercepting clicks: press the ESC key after each row's validation to close the open dropdown, then click the next row.

## How can I bulk update elements from Draft to Ready status?

`product: suite` `keywords: bulk update, element status, Draft, Ready, Element Review Management, Submit for review, Select All`

There is no dedicated bulk action for moving elements through the review workflow. If your elements are stuck in "Draft" because review management is enabled, the recommended approach is to disable the **Element Review Management** toggle in your review management settings. With the toggle disabled, element statuses can be updated from Draft to Ready without routing each element through the review process. Bulk selection, including **Select All**, works on the Elements list, and **Submit for review** remains available for applicable elements when review management is on. Note that disabling the toggle is suitable only if you do not require elements to be reviewed by test managers before being marked as Ready.

## Why does Testsigma keep creating duplicate elements for the same button, and how do I avoid element sprawl?

`product: suite` `keywords: duplicate element, dynamic DOM, element capture, new page state, Step Groups, reusable components, element sprawl`

When the DOM changes dynamically between element captures (for example, similar buttons with shifting attributes), Testsigma treats the updated page state as a new page, so a new element is created on each capture. This is a known behavior in the platform, not a defect in your project. To avoid the resulting duplicates, use Step Groups as reusable components instead of relying on individually captured elements for each occurrence. Building common interactions into Step Groups significantly reduces element sprawl and minimizes maintenance overhead as your test suite scales.

## Why does the Recorder capture a generic iframe instead of the specific frame my element is in?

`product: suite` `keywords: recorder, iframe, frameset, frame, element capture, xpath, extension version, Manage Extensions`

On pages that use framesets, the Recorder could capture an element against a generic parent iframe (for example `//iframe[@id='...']`) instead of the specific frame the element actually resides in (for example `//frame[@id='fraMenu']`). This was a bug in the Testsigma Recorder browser extension and is fixed in extension version 9.0.9.

1. Update the Testsigma Recorder extension to version 9.0.9 or later. If the browser has not auto-updated it, uninstall the extension and reinstall the latest version from the Chrome Web Store (or your browser's add-on store).
2. Verify the installed version by navigating to Manage Extensions in your browser and checking the recorder version.
3. Re-record the element; it should now be captured with reference to the correct frame.

As a temporary workaround on older versions, manually change the captured element's frame reference to the correct frame.

## Why can't I record test cases in an Incognito window?

`product: suite` `keywords: incognito, Allow in Incognito, recorder extension, Chrome, mobile web, recording, extension permissions`

Recording fails in Incognito mode when the Testsigma Recorder browser extension does not have permission to run in Incognito windows.

1. Open your browser's extensions page (e.g., Manage Extensions in Chrome) and open the details for the Testsigma Recorder extension.
2. Enable the **Allow in Incognito** option.
3. Retry recording in an Incognito tab.

## Can I block a specific API or network call during test recording and execution?

`product: suite` `keywords: block api, network call, recorder, proxy, dev tools, test execution`

Testsigma does not currently provide a direct option to block specific network or API calls during test recording or execution. If your application only reaches the desired page when a particular API call is blocked (something you can do manually via the browser's inspect/dev tools), the same cannot yet be configured natively in a recorded test.

As a workaround, this can be achieved using external tools such as proxies: route the test traffic through a proxy and configure the proxy to block the required API URL. The test then runs against the application with that call blocked, without any change to the test steps themselves.

## How do I set a breakpoint or debug point in a test case?

`product: suite` `keywords: breakpoint, debug mode, pause execution, Copilot, debug point, android testing, live editor`

There is no separate debug mode toggle; breakpoints are set through Copilot. To pause execution at a specific step:

1. Open the test case and click the **Copilot** option within it.
2. A dropdown appears for setting the initial debug point.
3. From the dropdown, select the step where execution should pause.
4. Execution begins from step 1 and pauses at the chosen step, letting you inspect state and debug from there.

This works for web and mobile (including Android) test cases.

## Why are my auto-generated XPaths index-based and fragile, and how do I get more stable locators when recording?

`product: suite` `keywords: index-based xpath, fragile locator, Accessibility ID, locator precedence, android recorder, relative locator, dynamic UI`

During Android recording, the recorder may capture XPaths built from index values, e.g. `//android.view.View[@index="2"]/following-sibling::android.view.View[@index="4"]//android.view.View[@index="0"]//android.view.View[@index="0"]`. Because these rely on element position, they can break in dynamic UIs: if elements are added or the layout changes, index values shift and the locator points to the wrong element or fails.

The recommended approach is to use Accessibility ID as the preferred locator strategy wherever possible — it is far more stable than index-based XPaths for dynamic mobile apps. Set Accessibility ID as the locator precedence in the recorder's settings before recording; the recorder will then prioritize Accessibility IDs over index-based XPaths when capturing elements.

## My scroll step clicks the wrong item or can't reach a value hidden in a dropdown — how do I make it reliable?

`product: suite` `keywords: scroll NLP, dropdown, XPath element, click wrong element, offset, wait until visible, LWC combobox`

When a page has multiple buttons with the same label or a dropdown whose value is not visible without scrolling, coordinate-based scrolling is fragile — page animation or scroll movement can cause the click to land on a different element. Instead of scrolling:

1. Create an element with a unique XPath locator rather than the default Accessibility ID. For values driven by a Test Data Profile, parameterize the XPath, e.g. `//span[@title="@|ParameterName|"]`, so one element matches whichever value the profile supplies.
2. Use the **Click on Element** NLP on that element — no scrolling or looping logic is needed, as the click targets the element directly.
3. Add a **Wait until element is visible** step before interacting, so slow-loading elements are ready before the click.

If a dropdown (for example a Salesforce LWC combobox) does not open on the first click, add the click step twice. For scrolling inside a scrollable container, the **Scroll the element to testdata offset vertically** NLP is available — start with an offset around 900 and adjust.

## Scroll and swipe steps are not reaching an element on my iOS app — what should I do?

`product: suite` `keywords: iOS scroll, swipe, scroll to element, while loop, mobile app, element not visible, logout`

Screen-level scroll and swipe steps on mobile move by fixed amounts and may stop before an off-screen element (for example a button at the bottom of a settings page) comes into view. The reliable pattern is element-based:

1. Create an element for the target control (capture it via the recorder so the locator is correct).
2. Use the element-based scroll NLP that scrolls to that specific element, instead of generic screen scroll or swipe steps.
3. Wrap the scroll step in a while loop that repeats until the element is visible, then perform the tap/click on the element.

This scrolls exactly as far as needed regardless of screen size or list length, and works where repeated fixed swipes fail. If the element still is not found, recapture it with a stable locator (ID or XPath) and retry at the test step level.

## How do I automate uploading a file (PDF, Word, Excel, image) in a web application test?

`product: suite` `keywords: upload file, type=file, Upload file using element, uploads, test data type, record element, attachment`

1. Record the upload element in your application — the element where the attribute `type=file` is present.
2. Upload the required file to Testsigma's **Uploads** section.
3. In your test case, add the NLP step **Upload file using element**: select the test data type as **uploads**, choose the required file, and in elements select the recorded upload element.

This works for any file type your application accepts (PDF, JPEG, Word, Excel, PowerPoint).

## Where is a downloaded file stored during test execution, and how do I validate its contents?

`product: suite` `keywords: downloaded file, download folder, file links are blocked, Get latest downloaded file path, add-on, PDF validation, cloud execution`

In cloud executions, downloaded files are stored in a temporary path; in local executions they go to the machine's downloads folder. In cloud environments, opening a downloaded file directly in a browser tab is blocked by provider security restrictions — errors like "file links are blocked – your organization does not allow you to view this site" are expected there, so in-browser content verification is not possible in cloud runs. Local runs (or Copilot) have file system access and can open the file.

To reference the file, install the add-on **Get latest downloaded file path** and use its NLP: "Get latest downloaded file path and store in runtime variable variable-name". For content validation, install the PDF or Excel action add-ons. To install: go to the Add-ons section, search under new and updated Add-ons, install, then refresh the page and use the NLP in your test case.

## How do I remove unwanted text from a runtime variable and keep only the value I need?

`product: suite` `keywords: runtime variable, extract data, regex, omit text, add-on, store variable`

To strip unwanted text from a runtime variable, install the **Extract Data from Runtime Variable Using Regex** add-on from the add-ons marketplace and use its NLP step in your test case. Provide a regular expression that captures only the portion you want; the matched value is stored back into a runtime variable. For example, to extract the value between the labels "Policy Holder" and "Premium" in a string like "Policy Holder Regress Ucc Premium", use a lookbehind/lookahead pattern: `(?<=Policy Holder\s).+?(?=\sPremium)`. This keeps only the text between the two labels and discards the surrounding words.

## Why does my regex fail with "Matching data with given regex is not found in given data" on content from a mailbox function?

`product: suite` `keywords: regex not found, store content, mailbox function, runtime variable, extract data, lookbehind`

This happens when the actual content in the two runs differs. A variable populated by a mailbox (email) function contains the full email body, while a hardcoded variable usually holds only a trimmed portion — so a regex tuned to the shorter text may not match the longer content. Fix it by anchoring the regex to a stable label immediately before the value and matching only the value's characters, instead of bounding it with surrounding sentence text. For example, to extract a policy number that follows the label "Policy Number", use `(?<=Policy Number\s)[A-Za-z0-9]+`. This pattern works whether the source text is hardcoded or retrieved through mailbox functions, because it depends only on the label directly preceding the value.

## Why is the code from the "Generate TOTP" step rejected with "You didn't enter the expected verification code"?

`product: suite` `keywords: Generate TOTP, verification code rejected, secret key, MFA, Entra ID, 2FA add-on`

If the **Generate TOTP** add-on step generates a code, stores it in the runtime variable, and enters it correctly, but the application still rejects it, the cause is almost always the secret key rather than the add-on. The secret key configured in the test is no longer recognized by the identity provider — for example, Microsoft Entra ID policies can automatically remove or invalidate TOTP registrations, which also shows up as the registration disappearing from the account's Security info page shortly after it is added. To resolve:

1. Check with your IT team whether any policy removes or invalidates TOTP registrations for the account.
2. Once the registration is stable, re-enroll the authenticator method and obtain the new secret key.
3. Update the secret key in the Testsigma test step and re-run.

## Why does my If condition using "verify that the current page displays text" evaluate to true when the text is not visible on the page?

`product: suite` `keywords: if-else condition, verify text displays, page source, DOM, hidden element, conditional NLP`

The "verify that the current page displays text" validation historically checked the application's XML/page source: if the text existed anywhere in the page source, the condition passed — even when the matching element was hidden (for example, inside a collapsed dropdown or an off-screen menu). So an If condition could evaluate to true for text a user cannot see, sending execution down the wrong branch and failing on a later click against a non-interactable element. The underlying NLP logic has since been updated so that text present in the DOM but not displayed on the UI no longer causes the condition to evaluate to true; existing test cases need no modification. If an If block still misbehaves, inspect the element's recorded code in the test results to see the page source captured at runtime and check for duplicate hidden occurrences of the text.
