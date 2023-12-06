import { HTTPTransport } from '../fetch';

export class BaseApi {
  httpTransport: HTTPTransport;
  baseUrl = 'https://ya-praktikum.tech/api/v2';

  constructor(basePath: string) {
    this.httpTransport = new HTTPTransport(this.baseUrl + basePath);
  }
}
