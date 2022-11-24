const imagesToLoad = document.querySelectorAll('picture img[data-src]');
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};
const options = {
  rootMargin: '0px 0px 300px 0px',
  threshold: 0
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((items) => {
    items.forEach((item) => {
      console.log('ITEM IS');
      console.log(item);
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
        console.log('ITEM TARGET IS');
        console.log(item.target);  
      }
    });
  }, options);
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}