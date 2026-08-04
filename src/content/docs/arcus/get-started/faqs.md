---
title: 'FAQs'
description: 'Troubleshooting guides and FAQs for Testsigma Arcus.'
---

<!-- Source: REPO:src/content/docs/arcus/help/index.md -->

This is the home for **Arcus troubleshooting guides and FAQs**.

We're building this section out as we identify the most common questions from
Arcus users. In the meantime, use the search bar or the **Ask** assistant in the
header to search the full documentation.

<!-- Source: qi-home/faqs.md -->

## FAQs

<br>

**Frequently asked questions about QI Home.**

---

## **Frequently Asked Questions**

### **1. What is the difference between Ad-Hoc and Sprints?**

Both generate test cases using QI Home. The difference is in how generation is triggered and where the context comes from. In Ad-Hoc, you manually attach context sources and click Generate. In Sprints, QI Home detects when a sprint starts in your connected project management tool and offers to generate automatically using the sprint stories and linked artifacts. Everything after generation — reviewing test cases, coverage, test plans, and quality metrics — is the same for both. See the [Overview](https://testsigma.com/docs/test-management/qi-home/overview/).

### **2. Why did QI Home skip some scenarios or leave scenario outlines empty?**

QI Home generates full test cases for the scenarios it can complete based on your context. For areas where the context was incomplete or where QI Home identified coverage was needed but could not fully expand the scenario, it creates Remaining Scenario Outlines. These are stubs that mark areas needing coverage. Open the Playground and describe the missing scenarios to fill them. See [Use Playground](https://testsigma.com/docs/test-management/qi-home/use-playground/).

### **3. I clicked Not Now on a sprint notification. Can I still generate test cases?**

Yes. Go to **QI Home > Sprints** tab. Find the sprint with **To Do** status and click **Generate Test Cases** next to it. See [Generate Test Cases](https://testsigma.com/docs/test-management/qi-home/sprints/generate-test-cases/).

### **4. Why is my coverage showing 0%?**

Coverage reflects accepted test cases, not generated ones. Generated test cases start in Pending status. You need to review them and click Save to Library to accept them. Once you accept test cases, coverage updates in real time. See [Review and Accept Test Cases](https://testsigma.com/docs/test-management/qi-home/review-and-accept-test-cases/).

### **5. What happens to test cases I do not accept?**

Unaccepted test cases remain in Pending status and are counted as gaps. They count against your coverage percentage until you either accept or reject them. Rejecting a test case removes it from the gaps count. Leaving it as Pending keeps it as a gap. See [Coverage and Gaps](https://testsigma.com/docs/test-management/qi-home/coverage-and-gaps/).

### **6. Can I edit a test case QI Home generated?**

Yes. Open the test case from the session detail view or from your library. You can edit the title, steps, preconditions, and expected results directly on the test case page.

### **7. Can I regenerate test cases for a sprint after the initial generation?**

Yes. Open the Playground from the session header and write a new prompt describing what you want to add or change. QI Home generates additional test cases and adds them to the existing session. You can also add new context sources before generating. See [Use Playground](https://testsigma.com/docs/test-management/qi-home/use-playground/).

### **8. What is a test library?**

Your test library is where accepted test cases are stored. When you click Save to Library, you select a folder and QI Home saves the test case there. Saved test cases are available for automation, test plan inclusion, and re-use across sessions.

### **9. Why does the Release Gate show "Not Ready" even though I have accepted test cases?**

The Release Gate evaluates Release Readiness, which requires test runs to have been executed. Accepting test cases updates Coverage but does not affect Pass Rate, Confidence, or Release Readiness until test runs complete. Execute at least one test plan to activate the remaining metrics. See [Quality Intelligence Metrics](https://testsigma.com/docs/test-management/qi-home/quality-intelligence-metrics/).

### **10. What is the difference between Release Readiness and Release Gate?**

Release Readiness is a 0 to 100 score that combines Coverage, Pass Rate, and Confidence. Release Gate translates that score into a decision: GO, CONDITIONAL, or NO-GO, based on configurable thresholds. Release Readiness tells you how ready you are. Release Gate tells you whether that readiness meets your project's release standard. See [Quality Intelligence Metrics](https://testsigma.com/docs/test-management/qi-home/quality-intelligence-metrics/).

### **11. Do I need the Testsigma Terminal for Agentic Learning?**

Only for Local execution. Cloud execution uses Testsigma Lab and requires nothing on your machine. If you choose Local Devices in the Learn and Automate dialog, Testsigma Terminal must be running on your desktop. See [Learn Test Case Live (Cloud)](https://testsigma.com/docs/test-management/qi-home/automation/agentic-learning/learn-test-case-live-cloud/) and [Learn Test Case Live (Local)](https://testsigma.com/docs/test-management/qi-home/automation/agentic-learning/learn-test-case-live-local/).

### **12. What happens to the cloud VM when I end a Copilot session?**

The cloud VM is released and any unsaved changes are lost. Use Save and End to save your results before the VM closes. If you click Dismiss, the VM stays running and continues to consume resources until you end the session. See [Execute Test Case in Cloud](https://testsigma.com/docs/test-management/qi-home/automation/copilot/execute-test-case-in-cloud/).

### **13. Can I map a GitHub PR to an Ad-Hoc session instead of a sprint?**

Yes. In the Map to Module dialog, select Adhoc under Map to, then select an existing Ad-Hoc session or create a new one. See [Map GitHub Context](https://testsigma.com/docs/test-management/qi-home/context-mapping/map-github/).

### **14. How do I connect Jira, GitHub, or a CLI tool to my project?**

Go to **Settings > Integrations** from the left navigation. Each integration has its own connection flow. Jira, Azure DevOps, Linear, ClickUp, and Confluence are used as context sources for test generation. GitHub, Claude Code, Cursor, GitHub Copilot, and Codex are used for Developer Context Mapping. Each has a dedicated setup guide. See [Connect GitHub](https://testsigma.com/docs/test-management/qi-home/context-mapping/connect-github/), [Connect Claude Code](https://testsigma.com/docs/test-management/qi-home/context-mapping/connect-claude-code/), [Connect Cursor](https://testsigma.com/docs/test-management/qi-home/context-mapping/connect-cursor/), [Connect GitHub Copilot](https://testsigma.com/docs/test-management/qi-home/context-mapping/connect-github-copilot/), or [Connect Codex](https://testsigma.com/docs/test-management/qi-home/context-mapping/connect-codex/).

---

### **15. What CLI tools does Developer Context Mapping support?**

Developer Context Mapping supports Claude Code, Cursor, GitHub Copilot, and Codex. All four capture coding activity through an Arcus plugin and push it to QI Home as context using the `/arcus:push` command. The mapping flow in QI Home is identical for all four. Context appears in Unmapped Context with a tool-specific badge, and you map it to a sprint or Ad-Hoc session the same way. See [Map Developer Context](https://testsigma.com/docs/test-management/qi-home/context-mapping/map-developer-context/).

---

### **16. What is the difference between `/arcus:map` and `/arcus:push`?**

`/arcus:map <ticket-key>` links the current context to a sprint story before it is sent to QI Home. Running it before you push means the context arrives already mapped and does not land in Unmapped Context. `/arcus:push` uploads the captured context to QI Home. You can push without mapping — the context lands in Unmapped Context and QA maps it from there. Mapping before pushing is recommended because it reduces manual work for QA and ensures the context is attributed to the correct sprint automatically.

---
