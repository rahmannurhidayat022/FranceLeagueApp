const req = {
  status: async (response) => {
    try {
      console.log(response.status);
      return await Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.statusText);
    }
  },
  json: async (response) => {
    try {
      return await response.json();
    } catch (error) {
      return console.log(error.statusText);
    }
  },
  Error: (err) => {
    console.log("Req Error : " + err);
  },
};

export default req;
