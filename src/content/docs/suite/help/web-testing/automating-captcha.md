---
title: "Why Bypass CAPTCHA in Test Automation?"
description: "CAPTCHA prevents bots from manipulating web services by verifying that the user is human. This article discusses the need of bypassing CAPTCHA in Test Automation"
sidebar:
  order: 25.16
---

---

CAPTCHA is a security measure that helps protect from spam and proves you are human and not a computer/bot trying to access the protected account. This article discusses some FAQs on automating CAPTCHA during testing. 

---

## **1. Why is CAPTCHA used?**
**Ans:** CAPTCHA prevents bots from manipulating web services by verifying that the user is human. It also ensures that real users interact with the website, protecting against automated scraping, spam, fraud, and unauthorized access.

---

## **2. Can I automate CAPTCHA testing in my test environment?**
**Ans:** Yes, it is possible to automate CAPTCHA interactions, but there are some challenges as CAPTCHA systems constantly evolve. However, the industry's best practice is to recommend bypassing it in the test environment so your tests won't have to interact with the CAPTCHA. Automating the CAPTCHA contradicts the intended purpose of this security measure, as it aims to avoid human verification. 

---