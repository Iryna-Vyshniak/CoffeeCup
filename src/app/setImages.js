export function setImages(query) {
  const API_KEY = '34184941-e8330cc74475028632abc6a98';

  const randomNumber = max => {
    return Math.floor(Math.random() * max);
  };

  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`
  )
    .then(response => response.json())
    .then(data => {
      let defaultImg = `https://images.unsplash.com/photo-1561882468-9110e03e0f78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80`;

      const images = [];
      const usedImages = new Set();
      for (let i = 0; i < 50; i++) {
        let imgIndex = randomNumber(data.hits.length);
        let img = data.hits[imgIndex];
        while (usedImages.has(img.largeImageURL)) {
          imgIndex = randomNumber(data.hits.length);
          img = data.hits[imgIndex];
        }
        images.push(img);
        usedImages.add(img.largeImageURL);
      }
      console.log(images);
      return images;
    });
}

// setImages('latte');
// console.log(setImages('latte'));
