enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  headers?: { [key: string]: string };
  method: METHODS;
  queryParams?: { [key: string]: string | number };
  body?: object;
  timeout?: number;
  withCredentials?: boolean;
};

function queryStringify(params: { [key: string]: string | number }): string {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

function withQuery(url: string, params: { [key: string]: string | number }) {
  const queryString = queryStringify(params);
  return queryString
    ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString
    : url;
}

type HTTPMethod = (
  url: string,
  options?: Omit<Options, 'method'>
) => Promise<unknown>;
export class HTTPTransport {
  _basePath: string;

  constructor(basePath: string) {
    this._basePath = basePath;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: Options) => {
    const {
      method,
      headers = {},
      queryParams = {},
      body,
      timeout = 60000,
      withCredentials = true,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      const isGet = method === METHODS.GET;

      xhr.open(method, withQuery(this._basePath + url, queryParams));

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.onload = function () {
        const status = xhr.status || 0;
        if (status >= 200 && status < 300) {
          resolve(xhr.response);
        } else {
          reject({ status, reason: xhr.response?.reason });
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (isGet || !body) {
        xhr.send();
      } else if (body instanceof FormData) {
        xhr.send(body);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));
      }
    });
  };
}

