const URL_BASE = 'https://api.chec.io/v1/';
const URL_PRODUCTS = `${URL_BASE}products/`
// const PRODUCTS = fetchData(URL_PRODUCTS)

export class Fetcher {
  fetchData = async (url) => {
    try {
      let response = await fetch(url);
      response = response.data;
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // export const getAllProductNames = () => {
  //   return PRODUCTS.map((product) => {
  //     return product.name;
  //   });
  // }

  // export const getSpecificProduct = (productId) => {
  //   return fetchData(URL_PRODUCTS + productId);
  // }
}
// export const getCategories = () => {

// }