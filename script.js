//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image from ${url}`);
  });
}

function downloadImages() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  output.innerHTML = '';
  error.textContent = '';
  loading.style.display = 'block';

  const promises = images.map(img => downloadImage(img.url));

  Promise.all(promises)
    .then(imgElements => {
      loading.style.display = 'none';
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loading.style.display = 'none';
      error.textContent = err;
    });
}

btn.addEventListener("click", downloadImages);
