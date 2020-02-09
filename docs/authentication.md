---
description: All API Requests have to be authenticated.
---

# Authentication

You can do so by providing the Authorization header \(or an `access_token` querystring\) with your token as the value.

### Getting the API Token

{% hint style="info" %}
Fetch token here: [https://docs.skywarder.cf/token.html](https://skywarder.cf/token.html)
{% endhint %}

### Code Samples

Here are some code snippets on how to add custom headers in different languages:

| Endpoint | URL | Token |
| :--- | :--- | :--- |
| `report` | [https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD](https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD) | a1234567890 |

#### cURL

```bash
curl --header "Authorization: a1234567890" https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD
```

```bash
curl -X GET \
  https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD \
  -H 'Authorization: a1234567890' \
```

#### C

```csharp
public string Get(string url)
{
    WebHeaderCollection headers = new WebHeaderCollection();
    headers.Add("Authorization: a1234567890");
    HttpWebRequest getRequest = (HttpWebRequest)WebRequest.Create(url);
    getRequest.Method = "GET";
    getRequest.Headers = headers;
    WebResponse apiResponse = getRequest.GetResponse();
    StreamReader reader = new StreamReader(apiResponse.GetResponseStream(), Encoding.UTF8);
    string responseString = reader.ReadToEnd();
    reader.Close();
    apiResponse.Close();

    return responseString;
}
```

#### C\# RestSharp

```csharp
var client = new RestClient("https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "a1234567890");
IRestResponse response = client.Execute(request);
```

#### Java OK HTTP

```java
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD")
  .get()
  .addHeader("Authorization", "a1234567890")
  .build();

Response response = client.newCall(request).execute();
```

#### Java Unirest

```java
HttpResponse<String> response = Unirest.get("https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD")
  .header("Authorization", "a1234567890")
  .asString();
```

#### Javascript jQuery AJAX

We don’t recommend that you access the API on the client side as you will be exposing your token publicly. However, this is how you would do it with [jQuery](https://api.jquery.com):

```javascript
var settings = {
  async: true,
  crossDomain: true,
  url: "https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD",
  method: "GET",
  headers: {
    Authorization: "a1234567890"
  }
};

$.ajax(settings).done(function(response) {
  console.log(response);
});
```

#### NodeJS

```javascript
const request = require("request");
request("https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD", {
  headers: { Authorization: "a1234567890" }
});
```

#### PHP

```php
$token = "a1234567890";
$opts = [
    "http" => [
        "header" => "Authorization:" . $token
    ]
];

$context = stream_context_create($opts);

$test = file_get_contents("https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD", true, $context);
```

#### PHP HttpRequest

```php
<?php

$request = new HttpRequest();
$request->setUrl('https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD');
$request->setMethod(HTTP_METH_GET);

$request->setHeaders(array(
  'Authorization' => 'a1234567890'
));

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
```

#### PHP pecl\_http

```php
<?php

$client = new http\Client;
$request = new http\Client\Request;

$request->setRequestUrl('https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD');
$request->setRequestMethod('GET');
$request->setHeaders(array(
  'Authorization' => 'a1234567890'
));

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();
```

#### Python http.client \(Python 3\)

```python
import http.client

conn = http.client.HTTPConnection("api.skywarder.cf")

headers = {
    'Authorization': "a1234567890",
}

conn.request("GET", "/v1/report?username=USERNAME&password=PASSWORD", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```

#### Python \(aiohttp\)

Asynchronous python using the [aiohttp](https://aiohttp.readthedocs.io/) library.

```python
import aiohttp
headers = {"Authorization": "a1234567890"}
url = "https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD"
async with aiohttp.ClientSession() as session:
    async with session.get(url, headers=headers) as resp:
        data = await resp.json()
```

#### Python \(requests\)

Synchronous \(blocking\) Python using the [requests](https://docs.python-requests.org/) library.

```python
import aiohttp
headers = {"Authorization": "a1234567890"}
url = "https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD"
async with aiohttp.ClientSession() as session:
    async with session.get(url, headers=headers) as resp:
        data = await resp.json()
```

#### Ruby \(NET::Http\)

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'a1234567890'

response = http.request(request)
puts response.read_body
```

#### Swift \(NSURL\)

```swift
import Foundation

let headers = [
  "Authorization": "a1234567890",
  "Cache-Control": "no-cache",
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.skywarder.cf/v1/report?username=USERNAME&password=PASSWORD")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

