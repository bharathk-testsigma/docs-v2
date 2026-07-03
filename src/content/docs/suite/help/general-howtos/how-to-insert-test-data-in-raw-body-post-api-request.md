---
title: "How to Insert Test Data in RAW Body for POST API?"
description: "Learn how to insert test data into the RAW body of a POST API request. Step-by-step guide for inserting test data into the RAW body of a POST API call in Testsigma"
sidebar:
  order: 25.38
---

---

You can insert test data into the raw body of a POST API request by using Test Data Profiles (TDPs) and Data Generators. This allows you to send dynamic values instead of hard-coded data.


To quickly help you understand, this video demonstrates how to insert test data in RAW Body for POST API request.
<video controls style="width:100%;height:auto;border-radius:8px;">
  <source src="https://s3.amazonaws.com/website-static-docs.testsigma.com/new_images/projects/Updated_Doc_Images/Insert_Raw_Data_in_POST_API.mp4" type="video/mp4" />
</video>


---

## **Test Data References**

- To reference a parameter from a Test Data Profile, use: **"@|&lt;ParameterName&gt;|"**
- To generate dynamic data at runtime, use: **"!|&lt;FunctionName&gt;(arguments)|"**

---

## **Example: Posting a Pet to Swagger Petstore**

```bash
{
  "id": "!|Number.digits(int:3)|",
  "category": {
    "id": 1,
    "name": "dog"
  },
  "name": "@|DogName|",
  "photoUrls": [
    "https://example.com/photo1.png"
  ],
  "tags": [
    {
      "id": 101,
      "name": "friendly"
    }
  ],
  "status": "available"
}
```

<br>

**In this example:**

- The **id** is generated dynamically using the Number.digits function from **Data Generators**, which creates a random 3-digit number at runtime.
- The name is parameterized with the **DogName** field from the **Test Data Profile**.
- Other fields, such as category, tags, and status are static but can also be parameterized if needed.

---