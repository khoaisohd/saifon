import superagent from 'superagent';
import merge from 'lodash/merge';
import get from 'lodash/get';

/* eslint-disable */

const headers = {
  'Accept': 'application/json',
  'Accept-Language': 'en',
  'Content-Type': 'application/json',
  'X-Wego-Version': '1',
  'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1',
  'Expires': '-1',
};
/* eslint-enable */

export default class Api {
  constructor(url, newHeaders) {
    this.url = url;
    this.headers = merge(headers, newHeaders);
  }

  post(request = {}) {
    return new Promise((resolve, reject) => {
      superagent.post(this.url)
      .set(this.headers)
      .send(request)
      .end((error, responseJS) => {
        const response = this.parseResponseJS(responseJS);
        return error ? reject(response) : resolve(response);
      });
    });
  }

  get(query = {}) {
    return new Promise((resolve, reject) => {
      superagent.get(this.url)
      .set(this.headers)
      .query(query)
      .end((error, responseJS) => {
        const response = this.parseResponseJS(responseJS);
        return error ? reject(response) : resolve(response);
      });
    });
  }

  parseResponseJS(responseJS) {
    if (!responseJS) {
      return {
        headers: {
          status_code: statusCode,
          message: 'Internal Server Error',
        },
      };
    }

    const contentType = get(responseJS.headers, 'content-type', '');
    const statusCode = responseJS.status;

    let response;
    if (contentType.indexOf('application/json') > -1) {
      response = responseJS.body;
    } else {
      response = {
        headers: {
          status_code: statusCode,
          message: 'Client error or unhandled server error',
        },
      };
    }

    return response;
  }
}
