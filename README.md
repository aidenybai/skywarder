# Skywarder API
Powerful REST API for interacting with Skyward via scraping.

BaseURL: [https://api.skywarder.cf](https://api.skywarder.cf)

## Code Documentation

| Component    | Progress | Status          | Description                       |
|--------------|----------|-----------------|-----------------------------------|
| /controllers | 100%     | **DONE**        | Express routes                    |
| /middleware  | 100%     | **DONE**        | Middleware helper functions       |
| /models      | 100%     | **DONE**        | Mongoose related stuff            |
| /skye        | 60%      | **IN PROGRESS** | Sub-library for scraping Skyward  |
| /src         | 100%     | **DONE**        | Express serverside & registration |

## API Reference

| Endpoint      | Method | Description                   | Parameters                                       |
|---------------|--------|-------------------------------|--------------------------------------------------|
| /v1/token     | GET    | Get API bearer token          |                                                  |
| /v1/report    | GET    | Get student report            | access_token, username, password                 |
| /v1/gradebook | GET    | Get student gradebook data    | access_token, username, password, course, bucket |
| /v1/history   | GET    | Get student academic history  | access_token, username, password                 |

By [Aiden Bai](https://aiden.codes)
