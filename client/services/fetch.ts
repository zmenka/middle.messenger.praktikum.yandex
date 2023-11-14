enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type Options = {
	url: string;
	headers?: { [key: string]: string };
	method: METHODS;
	queryParams?: { [key: string]: string | number },
	body?: object,
	timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>

// TODO добавить проверки
function queryStringify(params: { [key: string]: string | number }): string {
	return Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
}

function withQuery(url: string, params: { [key: string]: string | number }) {
  const queryString = queryStringify(params);
  return queryString ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString : url;
}

export class HTTPTransport {
	get = (url: string, options: OptionsWithoutMethod) => {

		return this.request(url, { ...options, method: METHODS.GET });
	};

	post = (url: string, options: OptionsWithoutMethod) => {
		return this.request(url, { ...options, method: METHODS.POST });
	};

	put = (url: string, options: OptionsWithoutMethod) => {
		return this.request(url, { ...options, method: METHODS.PUT });
	};

	delete = (url: string, options: OptionsWithoutMethod) => {
		return this.request(url, { ...options, method: METHODS.DELETE });
	};

	request = (url: string, options: Options) => {
		const { method, headers = {}, queryParams = {}, body, timeout = 5000 } = options;

		return new Promise(function (resolve, reject) {
			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;

			xhr.open(method, withQuery(url, queryParams));

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.timeout = timeout;

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (isGet || !body) {
				xhr.send();
			} else {
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(body));
			}
		});
	};
}

