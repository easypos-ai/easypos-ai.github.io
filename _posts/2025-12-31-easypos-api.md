---
layout: post
title: 关于EASYPOS的API接口调用
date: 2025-12-23
categories: blog
tags: []
description: Java是最好的语言。
---
## 简述

该文档用于说明EASYPOS接口调用规范。

## 规范

请求头中必须包含有以下字段


| 字段名         | 说明                | 类型                                     |
| -------------- | ------------------- | ---------------------------------------- |
| X-EASYPOS-KEY  | 接口调用密钥        | String(32)                               |
| Timestamp      | 调用时间戳          | 时间戳（毫秒) 与调用服务器时间差不得过大 |
| X-EASYPOS-SIGN | 签名MD5后大写字符串 | String(32)                               |

## 签名获取方式

签名采用MD5算法加密
例：

```plaintext
key:3e2c65883b723c3ab5ec31ff0cfedbf3
timestamp:1766448488000
签名串:timestamp=1766448488000&key=3e2c65883b723c3ab5ec31ff0cfedbf3
签名(sign):4B98B0F13FBF210F9D5B5A0BD2DB4F7B
```

以上面签名为例，调用接口需要传入的请求头如下


| 字段名         | 值                               |
| -------------- | -------------------------------- |
| X-EASYPOS-KEY  | 3e2c65883b723c3ab5ec31ff0cfedbf3 |
| Timestamp      | 1766448488000                    |
| X-EASYPOS-SIGN | 4B98B0F13FBF210F9D5B5A0BD2DB4F7B |

## 完整调用样例

说明:营业额统计接口，统计2025-12-20 ~ 2025-12-21 的营业额，仅作样例
接口:http://localhost:8080/pos/open/sq/page/turnover-time-period.api


| 参数        | 说明     | 类型                     |
|-----------|--------|------------------------|
| beginDate | 开始日期   | 日期 Date yyyy-MM-dd     |
| endDate   | 结束日期   | 日期 Date yyyy-MM-dd     |
| start     | 起始数    | 起始条目,第几条开始查 默认值0       |    
| pageSize  | 单次查询数量 | 单次查询数量 pageSize<=10000 |

curl

```curl
curl --location 'http://localhost:8080/pos/open/sq/page/turnover-time-period.api?pageSize=10&start=0' \
--header 'X-EASYPOS-KEY: 3e2c65883b723c3ab5ec31ff0cfedbf3' \
--header 'Timestamp: 1766448488000' \
--header 'X-EASYPOS-SIGN: 4B98B0F13FBF210F9D5B5A0BD2DB4F7B' \
--header 'Content-Type: application/json' \
--data '{
    "beginDate":"2025-12-20",
    "endDate":"2025-12-21"
}'
```

java

```java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\r\n    \"beginDate\":\"2025-12-20\",\r\n    \"endDate\":\"2025-12-21\"\r\n}");
Request request = new Request.Builder()
  .url("http://localhost:8080/pos/open/sq/page/turnover-time-period.api?pageSize=10&start=0")
  .method("POST", body)
  .addHeader("X-EASYPOS-KEY", "3e2c65883b723c3ab5ec31ff0cfedbf3")
  .addHeader("Timestamp", "1766448488000")
  .addHeader("X-EASYPOS-SIGN", "4B98B0F13FBF210F9D5B5A0BD2DB4F7B")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();
```

javascript

```js
const axios = require('axios');
let data = JSON.stringify({
  "beginDate": "2025-12-20",
  "endDate": "2025-12-21"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8080/pos/open/sq/page/turnover-time-period.api',
  headers: { 
    'X-EASYPOS-KEY': '3e2c65883b723c3ab5ec31ff0cfedbf3', 
    'Timestamp': '1766448488000', 
    'X-EASYPOS-SIGN': '4B98B0F13FBF210F9D5B5A0BD2DB4F7B', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

python

```python
import http.client
import json

conn = http.client.HTTPConnection("localhost", 8080)
payload = json.dumps({
  "beginDate": "2025-12-20",
  "endDate": "2025-12-21"
})
headers = {
  'X-EASYPOS-KEY': '3e2c65883b723c3ab5ec31ff0cfedbf3',
  'Timestamp': '1766448488000',
  'X-EASYPOS-SIGN': '4B98B0F13FBF210F9D5B5A0BD2DB4F7B',
  'Content-Type': 'application/json'
}
conn.request("POST", "/pos/open/sq/page/turnover-time-period.api", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))
```

## 注意事项

请勿泄露接口信息和密钥信息！
