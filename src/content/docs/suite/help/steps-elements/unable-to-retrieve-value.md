---
title: "Unable to Retrieve Text from a Text Field"
description: "This article helps you troubleshoot if you cannot retrieve a stored value in a text element | Learn how to retrieve a value stored in text element"
sidebar:
  order: 24.11
---

---

When working with text fields, you may not be able to retrieve the entered value using ***Store text from the element element into a variable test data***. This occurs because text fields store data in the element’s value attribute, not as visible text.

To retrieve the correct data, use ***Store the value for the attribute attribute of the element element into a variable test data*** NLP.

---

## **Issue**

The test step ***Store text from the element element into a variable test data*** does not return any value when used on a text field.

---

## **Cause**

Text fields such as `<input>` and `<textarea>` store user-entered data in the `value` attribute, rather than as inner text within the element.

---

## **Resolution**

Use ***Store the value for the attribute attribute of the element element into a variable test data***.

---

## **Steps to Identify Whether an Element Contains Text or a Value**

1. Right-click on the element and select **Inspect**.
![Inspect](https://s3.amazonaws.com/website-static-docs.testsigma.com/new_images/projects/Updated_Doc_Images/Inspect.png)

2. In the **Elements** panel, locate the highlighted element.
![Elements](https://s3.amazonaws.com/website-static-docs.testsigma.com/new_images/projects/Updated_Doc_Images/Locate_element.png)

3. Check how the data is stored:
   - If the data appears between tags (for example, `<span>Text</span>`), use ***Store text from the element element into a variable test data***.
   - If the data appears in an attribute (for example, `value=”Text”`), use ***Store the value for the attribute attribute of the element element into a variable test data***.

---