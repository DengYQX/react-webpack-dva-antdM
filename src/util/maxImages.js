import noImg from '%/noImg.jpg';

function maxImages (url) {
  const div = document.createElement('div');
  div.setAttribute('class', 'maxImagesContent');
  div.setAttribute('id', 'maxImagesElemnt');
  const img = document.createElement('img');
  img.setAttribute('id', 'imagesElemnt');
  img.src = url
  div.appendChild(img)
  document.body.appendChild(div);

  document.getElementById('maxImagesElemnt').addEventListener('click', function(){
      document.body.removeChild(this)
  }, false)
  document.getElementById('imagesElemnt').addEventListener('load', function(e){
    this.setAttribute('style', `width: ${e.path[0].width}px; height: ${e.path[0].height}px;`)
  }, false)
  document.getElementById('imagesElemnt').addEventListener('error', function(e){
    this.src = noImg;
  }, false)
}

export default maxImages;
