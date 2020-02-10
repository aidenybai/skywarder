---
description: API Reference for Skywarder's exposed endpoints.
---

# Endpoints

{% api-method method="get" host="https://api.skywarder.cf" path="/v1/gradebook" %}
{% api-method-summary %}
Fetch Gradebook
{% endapi-method-summary %}

{% api-method-description %}
This endpoint retrieves class data based off of course id and bucket id.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Bearer Token
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-query-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
The username of the student to retrieve
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=true %}
The password of the student to retrieve
{% endapi-method-parameter %}

{% api-method-parameter name="course" type="string" required=true %}
The course id of the course to retrieve
{% endapi-method-parameter %}

{% api-method-parameter name="bucket" type="string" required=true %}
The bucket id of the course to retrieve
{% endapi-method-parameter %}

{% api-method-parameter name="skyward" type="string" required=false %}
Custom Skyward URL
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Gradebook successfully retrieved.
{% endapi-method-response-example-description %}

```
{
  raw: "<!doctype html>\n<html lang='en'>\n<head>\n<meta http-equiv='Content-Type' charset='ISO-8859-1'>".
  data: {
    course: "PHYSICS 2 AP", // name of the course
    instructor: "Jennifer Smith", // name of the instructor
    lit: { // information about the specific bucket
      name: "S1", // bucket's alias
      begin: "08/20/2018", // bucket's begin date
      end: "12/20/2018" // bucket's end date
    },
    period: 1, // course's order in the day
    score: 99.5, // score recieved (usually contains a decimal)
    grade: 100, // score after rounding (always a whole number)
    gradeAdjustment: 1.5, // points added to average to get score (null if no adjustment)
    breakdown: [ // buckets which make up this bucket's score (null if no breakdown)
      {
        lit: "Q2", // bucket's alias
        score: 95.5, // score recieved
        grade: 96, // score after rounding
        weight: 50, // part that this bucket's score makes up the parent bucket's score (out of 100)
      },
      {
        lit: "Q1",
        grade: 100,
        score: 100,
        weight: 50,
      },
    ],
    gradebook: [ // grade categories which make up this bucket's score
      {
        category: "Major", // category title
        breakdown: [ // buckets which make up this category (undefined if no breakdown)
          {
            lit: "Q2", // bucket's alias
            weight: 70, // part that this bucket's score makes up this category's score (out of 100)
            dates: {
              begin: "10/22/2018", // bucket's begin date
              end: "12/20/2018", // bucket's end date
            },
            score: 96.5, // score recieved
            grade: 97, // score after rounding
            points: {
              earned: 965, // sum of all assignments' earned points
              total: 1000, // sum of all assignments' total points
            },
          },
          /* etc. */
        ],
        assignments: [ // assignments which make up this category
          {
            title: "TEST IV",
            score: 100, // score recieved (null if no score)
            grade: 100, // score after rounding (null if no grade)
            points: {
              earned: 100, // earned points (null if no earned)
              total: 100, // total points (null if no total)
            },
            date: "09/07/18", // date the assignment is/was due
            meta: [ // assignment modifiers
              {
                type: "absent", // modifier type (e.g. 'absent', 'noCount', or 'missing')
                note: "Parent note received within 5d", // extra message
              }
            ],
          },
          /* etc. */
        ]
      },
      /* etc. */
    ]
  }
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 400,
  error: "Bad Request",
  message: "Invalid query"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 401,
  error: "Unauthorized"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=403 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 403,
  error: "Forbidden",
  message: "Try again some time"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Could not find anything matching this query.
{% endapi-method-response-example-description %}

```
{
  statusCode: 404,
  error: "Not Found"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 500,
  error: "Internal Server Error",
  message: "An internal server error occurred"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=503 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 503,
  error: "Service Unavailable",
  message: "Unavailable"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://api.skywarder.cf" path="/v1/history" %}
{% api-method-summary %}
Fetch History
{% endapi-method-summary %}

{% api-method-description %}
This endpoint retrieves student academic history.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Bearer Token
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-query-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
The username of the student to retrieve
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=true %}
The password of the student to retrieve
{% endapi-method-parameter %}

{% api-method-parameter name="skyward" type="string" required=false %}
Custom Skyward URL
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  raw: "<!doctype html>\n<html lang='en'>\n<head>\n<meta http-equiv='Content-Type' charset='ISO-8859-1'>".
  data: [{
    dates: {
      begin: "2019", // school year begin date
      end: "2020", // school year end date
    },
    grade: 12, // grade of student during the school year
    courses: [ // courses taken during the year
      {
        course: "PHYSICS 2 AP", // course name
        scores: [
          {
            grade: 100, // grade recieved
            lit: "S1", // bucket alias
          },
          /* etc. */
        ]
      },
      /* etc. */
    ]
  }]
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 400,
  error: "Bad Request",
  message: "Invalid query"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 401,
  error: "Unauthorized"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=403 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 403,
  error: "Forbidden",
  message: "Try again some time"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 404,
  error: "Not Found"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 500,
  error: "Internal Server Error",
  message: "An internal server error occurred"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=503 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 503,
  error: "Service Unavailable",
  message: "Unavailable"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://api.skywarder.cf" path="/v1/report" %}
{% api-method-summary %}
Fetch Report
{% endapi-method-summary %}

{% api-method-description %}
This endpoint retrieves all courses in a report card.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Bearer Token
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-query-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
The username of the student to retrieve
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=true %}
The password of the student to retrieve
{% endapi-method-parameter %}

{% api-method-parameter name="skyward" type="string" required=false %}
Custom Skyward URL
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  raw: "<!doctype html>\n<html lang='en'>\n<head>\n<meta http-equiv='Content-Type' charset='ISO-8859-1'>".
  data: {
    course: 12345, // the five-digit course ID
    scores: [
      {
        bucket: "TERM 1",
        score: "A"
      },
      {
        bucket: "TERM 2",
        score: "A"
      },
      {
        bucket: "TERM 3",
        score: "A"
      },
    ]
  }
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 400,
  error: "Bad Request",
  message: "Invalid query"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 401,
  error: "Unauthorized"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=403 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 403,
  error: "Forbidden",
  message: "Try again some time"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 404,
  error: "Not Found"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 500,
  error: "Internal Server Error",
  message: "An internal server error occurred"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=503 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 503,
  error: "Service Unavailable",
  message: "Unavailable"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://api.skywarder.cf" path="/v1/login" %}
{% api-method-summary %}
Check Authentication
{% endapi-method-summary %}

{% api-method-description %}
This endpoint authenticates an account with credentials.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Bearer Token
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-query-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
The username of the student to retrieve
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=true %}
The password of the student to retrieve
{% endapi-method-parameter %}

{% api-method-parameter name="skyward" type="string" required=false %}
Custom Skyward URL
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  code: "200",
  message: "true"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 400,
  error: "Bad Request",
  message: "Invalid query"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 401,
  error: "Unauthorized"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=403 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 403,
  error: "Forbidden",
  message: "Try again some time"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 404,
  error: "Not Found"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 500,
  error: "Internal Server Error",
  message: "An internal server error occurred"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=503 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 503,
  error: "Service Unavailable",
  message: "Unavailable"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://api.skywarder.cf" path="/v1/lock" %}
{% api-method-summary %}
Lock User
{% endapi-method-summary %}

{% api-method-description %}
This endpoint initiates a lock attack on a user.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Bearer Token
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-query-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
The username of the student to attack
{% endapi-method-parameter %}

{% api-method-parameter name="requests" type="number" required=true %}
The amount of login requests to send
{% endapi-method-parameter %}

{% api-method-parameter name="skyward" type="string" required=false %}
Custom Skyward URL
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{ 
  code: "200", 
  message: "REQUESTS requests sent to TARGET" 
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 400,
  error: "Bad Request",
  message: "Invalid query"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 401,
  error: "Unauthorized"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=403 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 403,
  error: "Forbidden",
  message: "Try again some time"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 404,
  error: "Not Found"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 500,
  error: "Internal Server Error",
  message: "An internal server error occurred"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=503 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  statusCode: 503,
  error: "Service Unavailable",
  message: "Unavailable"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

