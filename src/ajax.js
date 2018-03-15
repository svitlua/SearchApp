const API_KEY="7edb69c4b4354f74a66b2029776a7948";

export default {
  async fetchSearchImages(query){
    try {
      const response = await fetch(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${query}&$format=json`,
        {
        headers: {
          "Ocp-Apim-Subscription-Key": API_KEY
        },
      });
      const responseJson = await response.json();
      return responseJson.value;
    } catch (error) {
      console.error(error);
      }
  }
};
