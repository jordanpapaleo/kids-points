export default class Api {
  static timeout = 120000

  static headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json'
  }

  constructor (props) {
    const {baseUrl, headers} = props
    this.baseUrl = baseUrl
    this.headers = {
      ...Api.headers
    }

    if (headers) {
      Object.keys(headers).forEach((key) => {
        this.headers[key] = headers[key]
      })
    }
  }

  request (url, options, passThrough) {
    return fetch(url, options).then(
      async (response) => {
        if (response.ok) {
          if (response.status !== 204) {
            let data = await response.json()

            if (passThrough) {
              data = {
                ...passThrough,
                ...data
              }
            }

            return data
          }
        } else {
          throw response
        }
      },
      (err) => {
        console.log(err)
        // throw new Error('Call Failed', err)
      }
    )
  }

  get (url, passThrough, timeout = Api.timeout) {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      method: 'GET',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  post (url, data, passThrough, timeout = Api.timeout) {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
      method: 'POST',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  put (url, data, passThrough, timeout = Api.timeout) {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
      method: 'PUT',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  delete (url, passThrough, timeout = Api.timeout) {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      method: 'DELETE',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }
}
