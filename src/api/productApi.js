import axios from "axios";

const API = "https://fakestoreapi.com/products";

export const fetchProducts = async () => {
    const response = await axios.get(API);
    return response.data;
};