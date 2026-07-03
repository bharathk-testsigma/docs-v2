---
title: "Unable to Start the Agent?"
pagetitle: "Unable to Start the Agent?"
description: "Learn how to resolve agent startup issues in Testsigma Terminal caused by missing or corrupted files or conflicts with other applications."
search_keyword: ""
sidebar:
  order: 11.95
---

---

Once you have logged in, downloaded and extracted the required files to start the agent, you may encounter issues due to a missing or corrupted file or a conflicting application. This article discusses how to resolve the issue. 

Agent is responsible for performing local executions. For more information on agents, please refer to the [documentation on Testsigma Agent](https://testsigma.com/docs/agent/overview/).

---

## **Steps to Resolve the Issue**

1. In the **Testsigma Terminal** window, click **Retry**. This tries to restart the agent. 
   ![Retry](https://s3.amazonaws.com/website-static-docs.testsigma.com/new_images/projects/Updated_Doc_Images/start_agent_1.png)

2. If the issue persists, click **Force Reset and Restart**. 
   ![Force Reset](https://s3.amazonaws.com/website-static-docs.testsigma.com/new_images/projects/Updated_Doc_Images/start_agent_2.png)

:::note[NOTE]
Please note that clicking **Force Reset and Restart** is irreversible and will remove all existing configurations and any downloaded additional packages. 
![Info](https://s3.amazonaws.com/website-static-docs.testsigma.com/new_images/projects/Updated_Doc_Images/start_agent_3.png)
:::

3. **Testsigma Terminal** removes the existing files and starts a new installation.

---