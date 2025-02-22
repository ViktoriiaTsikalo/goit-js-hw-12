import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImages } from './js/pixabay-api';
import { imagesRender } from './js/render-functions';

let lightbox = new SimpleLightbox('.gallery a', { 
    captionsData: 'alt',
    captionDelay: 250,
});

const refs = {
    formEl: document.querySelector('#search-images'),
    galleryEl: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    btnLoadMore: document.querySelector('#button-load')
};

const params = {
    query: '',
    page: 1,
    total: 100,
}

refs.formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    params.query = e.target.elements.query.value.trim();
    params.page = 1;
    refs.loader.style.display = 'block';
    refs.galleryEl.innerHTML = ''; 
    try {
        const images = await getImages(params.query, params.page);
        if (images.hits.length === 0) {
            hideLoadButton()
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            return null;
        } else {
        const allImages = images.hits;
        const markup = allImages.map(imagesRender).join('');
        refs.galleryEl.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();
            params.total = images.totalHits;
    }
        } catch (error) {console.error('Error fetching images:', error);
                iziToast.error({
                    message: 'Something went wrong. Please try again later.',
                    position: 'topRight',
                })
        } finally{
            refs.loader.style.display = 'none';
        };
checkBtnStatus();
    e.target.reset();
});

refs.btnLoadMore.addEventListener('click', async (e) => {
    params.page += 1;
    refs.loader.style.display = 'block';
         try {
        const images = await getImages(params.query, params.page);
             if (images.hits.length === 0) {
            
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            return null;
        } else {
        const allImages = images.hits;
        const markup = allImages.map(imagesRender).join('');
        refs.galleryEl.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();
            params.total = images.totalHits;
    }
        } catch (error) {console.error('Error fetching images:', error);
                iziToast.error({
                    message: 'Something went wrong. Please try again later.',
                    position: 'topRight',
                })
        } finally{
            refs.loader.style.display = 'none';
        };
    checkBtnStatus();
    scrollPage();
})

function showLoadButton() {
    refs.btnLoadMore.classList.remove('hidden');
}

function hideLoadButton() {
    refs.btnLoadMore.classList.add('hidden');
}

function checkBtnStatus() {
    const perPage = 40;
    const maxPage = Math.ceil(params.total / perPage);
    if (params.page >= maxPage) {
        hideLoadButton();
        iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
        })
    } else {
        showLoadButton();
   }
}

function scrollPage() {
    const picture = refs.galleryEl.firstElementChild.getBoundingClientRect();
    const height = picture.height * 2 + 48;
    scrollBy({
        top: height,
        behavior: 'smooth',
    })
}