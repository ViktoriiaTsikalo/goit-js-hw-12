export function imagesRender(obj) {
    return `<div
  class="image-container fb js-image-container"
  style="justify-content: start"
>
  <div class="image-card card">
    <a class="photo-container" href="${obj.largeImageURL
}">
      <img src="${obj.webformatURL}" alt="${obj.tags}" class="photo" />
    </a>
    <ul class="image-body">
      <li>
        <h2>Likes</h2>
        <p>${obj.likes}</p>
      </li>
      <li>
        <h2>Views</h2>
        <p>${obj.views}</p>
      </li>
      <li>
        <h2>Comments</h2>
        <p>${obj.comments}</p>
      </li>
      <li>
        <h2>Downloads</h2>
        <p>${obj.downloads}</p>
      </li>
    </ul>
  </div>
</div>`
}