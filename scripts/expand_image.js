var modal = document.getElementById('Lightbox');
var isReady = false;

var click_handle;

function clicker(event, img_t) {
  if (!img_t.contains(event.target) && isReady) {
    closeImage();
    return;
  }
  isReady = true;
}

function openImage(id) {
  document.getElementById('Lightbox').style.display = 'block';
//   document.getElementById(id).img.src.replace();

  isReady = false;
  click_handle = function clicker_handler(event) {
    var img = document.getElementById(id);
    clicker(event, img);
  }
  window.addEventListener('click', click_handle);
}

function closeImage() {
  document.getElementById('Lightbox').style.display = 'none'
  window.removeEventListener('click', click_handle);
}
