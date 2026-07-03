---
title: "Testsigma Agent Cleanup"
description: "Know the possible reasons why Testsigma agent pops up and then closes unexpectedly. Learn steps to fix the issue by following the troubleshooting steps"
sidebar:
  order: 24.36
---


---

After an automatic update of the Testsigma agent, you might face issues where the agent pops up and then closes unexpectedly. This can occur if the agent is not correctly registered or there's a conflict between the *agent.UUID* in the *agent.properties* file and the system environment. In this case, cleanup of the agent is necessary.

---

## **Troubleshooting Steps**

1. **Terminate the Agent:** If the agent is active, completely shut it down.


2. **Remove Configuration Files:** Go to the system's application data directory (this location varies by OS) and delete the folder containing the agent's configuration files. 

:::note[NOTE]
This directory might be hidden by default and require changing your system settings to access it.
:::


3. **Reinstall the Agent:** After removing the configuration files, download the latest version of the agent from the Testsigma application.


4. **Start the Agent:** Start the Agent once the download is complete. *For more information, refer to the [documentation on starting Testsigma agent](https://testsigma.com/docs/agent/setup-on-windows-mac-linux/#start-the-testsigma-agent-server-as-a-process).*


---