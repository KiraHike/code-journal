/* global data */
/* exported data */

var $imageInput = document.querySelector('#image-url');
var $image = document.querySelector('#image');

$imageInput.addEventListener('blur', addImage);

function addImage(event) {
  $image.setAttribute('src', $imageInput.value);
}
