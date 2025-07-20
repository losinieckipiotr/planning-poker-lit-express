import type { GetUserReq, GetUserRsp } from './api/get-user.api'

const params: GetUserReq = {
  data: {
    id: Math.round(Math.random() * 100),
  },
}

async function main() {
  const rsp = await fetch('http://localhost:3000/api/get-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  const json: GetUserRsp = await rsp.json()

  if (json.status == 'ok') {
    console.log({
      status: rsp.status,
      statusText: rsp.statusText,
      headers: rsp.headers,
      json: json,
    })
  } else {
    console.log({
      status: rsp.status,
      statusText: rsp.statusText,
      headers: rsp.headers,
    })
    console.log(JSON.parse(json.error))
  }
}

main()
