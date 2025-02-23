import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export async function getImages(query, page) {

    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: '48819387-421892b97c727b1ba27e3124c',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
    });
    const url = `${BASE_URL}?${params}`;
    try {
        const response = await axios.get(url); 
        return response.data;
    }
    catch(error) {
            console.error('Error fetching images:', error);
            throw error;
        };
}