import axios from 'axios';

const main_url = 'https://api.debank.com';

const useAPIRequest = () => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };

  const postData = async ({ baseUrl = main_url, url, body = {}, method }) => {
    try {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     config['headers'] = {
    //       ...config.headers,
    //       Authorization: 'Bearer ' + token.replace(/"/g, ''),
    //     };
    //   }

      const request = await axios({
        method,
        url: `${baseUrl}/${url}`,
        data: body,
        ...config,
      });
      const { data } = request;
      return { status: true, statusCode: request.status, ...data };
    } catch (error) {
      return { status: false, message: 'An error has occurred', error };
    }
  };

  return { postData };
};

export default useAPIRequest;
