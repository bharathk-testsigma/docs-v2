---
title: "Why Does the Try Again Error Appear While Installing the Testsigma Agent in a Proxy Environment?"
description: "Learn why the Try again error appears during Testsigma Agent installation when a proxy blocks browser requests and how approving proxies fixes it."
sidebar:
  order: 25.23
---

---

In Testsigma, while installing the agent, you may see an error message prompting you to try again. This occurs because the browser routes the request through a proxy that is unable to forward it to the installed application. To proceed, you must approve certain proxies on your end. This article explains how to resolve the issue. 

![Issue](https://s3.amazonaws.com/website-static-docs.testsigma.com/new_images/projects/Updated_Doc_Images/try_again_error_1.png)

![Local Network Access](https://s3.amazonaws.com/website-static-docs.testsigma.com/new_images/projects/Updated_Doc_Images/try_again_error_2.png)

---

## **Steps to Resolve the Issue**

1. Update your proxy configuration to allow the following domains:
   - ***.local**
   - **local.testsigmaagent.com**

2. Ensure these domains are excluded from proxy restrictions or added to the proxy allowlist, based on your organization’s proxy settings.

3. Save the proxy configuration changes and restart the browser.

4. Retry installing the Testsigma agent.

---