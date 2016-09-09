import superagent from 'superagent';
import get from 'lodash/get';

class ApiCaller {
  post(url, request = {}) {
    return new Promise((resolve, reject) => {
      superagent.post(url)
      .send(request)
      .end((error, responseJS) => {
        const response = this.parseResponseJS(responseJS);
        return error ? reject(response) : resolve(response);
      });
    });
  }

  get(url, query = {}) {
    return new Promise((resolve, reject) => {
      superagent.get(url)
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

export default ApiCaller;
