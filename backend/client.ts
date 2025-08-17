import type { GetUserReq, GetUserRsp } from './api/get-user.api.ts'

async function main() {
  const params: GetUserReq = {
    data: {
      id: 7,
    },
  }
  const rsp = await fetch('http://localhost:3000/api/get-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  const json = (await rsp.json()) as GetUserRsp

  if (json.status == 'ok') {
    console.log({
      status: rsp.status,
      statusText: rsp.statusText,
      headers: rsp.headers,
      user: json.data.user,
    })
  } else {
    console.log({
      status: rsp.status,
      statusText: rsp.statusText,
      headers: rsp.headers,
      error: json.error,
    })
  }
}

main()
