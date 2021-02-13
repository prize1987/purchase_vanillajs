const request = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      return {
        ok: true,
        data: data,
      };
    } else {
      throw {
        message: data.message,
        status: response.status,
      };
    }
  } catch (err) {
    return {
      ok: false,
      data: err,
    };
  }
};

const api = {
  fetchOptions: async () => {
    const url = 'https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options';
    return request(url);
  },

  fetchSubOptions: async (id) => {
    const url = `https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options/${id}`;
    return request(url);
  },

  fetchStocks: async (optionIds) => {
    const url = `https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/stocks/${optionIds}`;
    return request(url);
  },
};

export { api };
