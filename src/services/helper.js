export const httpRequest = async (
    method,
    endPoint,
    data = null,
    params = {},
    headers = {}
  ) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/${endPoint}`;
        
      // Append query parameters to the URL
      Object.keys(params).forEach((key) => {
        url.searchParams.append(key, params[key]);
      });
  
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };
  
      if (data) {
        options.body = JSON.stringify(data);
      }
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.log(error);
      return error; 
    }
  };