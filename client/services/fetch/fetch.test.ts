import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport } from './fetch.ts';

describe('HTTPTransport', function () {
  let http: HTTPTransport;
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    http = new HTTPTransport('');

    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = function (xhr: any) {
      requests.push(xhr);
    };

    // @ts-expect-error: because of typing conflict
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
  });

  afterEach(() => {
    xhr.restore();
  });

  it(`Should correctly add query params at the end of the url if it already exists another quary params`, () => {
    http.get('test?key1=test1', { queryParams: { key2: 'test2' } });

    expect(requests[0].url).to.contain('?key1=test1&key2=test2');
  });

  it('Should stringify query params for GET request where all params are strings', () => {
    http.get('test', { queryParams: { key1: 'test1', key2: 'test2' } });

    expect(requests[0].url).to.contain('?key1=test1&key2=test2');
  });

  it('Should stringify query params for GET request where some params are numers', () => {
    http.get('test', { queryParams: { key1: 'test1', key2: 1234 } });

    expect(requests[0].url).to.contain('?key1=test1&key2=1234');
  });

  it('Should encode query params for GET request', () => {
    http.get('test', { queryParams: { key1: '1+2' } });

    expect(requests[0].url).to.contain('?key1=1%2B2');
  });

  it('Should encode query params with special symbols for GET request', () => {
    http.get('test', { queryParams: { key1: '<div>' } });

    expect(requests[0].url).to.contain('?key1=%3Cdiv%3E');
  });

  it(`Should encode query params's names with special symbols for GET request`, () => {
    http.get('test', { queryParams: { a$2: '345' } });

    expect(requests[0].url).to.contain('?a%242=345');
  });

  it(`Should add headers to GET request`, () => {
    http.get('test', { headers: { 'X-Test': 'one' } });
    expect(requests[0].requestHeaders).to.include({ 'X-Test': 'one' });
  });

  it(`Should add header {'Content-Type': 'application/json'} for POST request with body`, () => {
    http.post('test', { body: { data: 'test' } });
    console.log('CHECK', requests[0].requestHeaders);
    expect(requests[0].requestHeaders['Content-Type']).to.match(/application\/json/);
  });

  it(`Should not add header {'Content-Type': 'application/json'} for POST request without body`, () => {
    http.post('test');
    expect(requests[0].requestHeaders['Content-Type']).to.not.match(/application\/json/);
  });

  it(`Should not add header {'Content-Type': 'application/json'} for GET request`, () => {
    http.get('test');
    expect(requests[0].requestHeaders['Content-Type']).to.not.match(/application\/json/);
  });
});
