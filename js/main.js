/* global data */
/* exported data */

var $imageInput = document.querySelector('#image-url');
var $image = document.querySelector('#image');

function addImage(event) {
  $image.setAttribute('src', $imageInput.value);
}

$imageInput.addEventListener('blur', addImage);

var $newEntryForm = document.querySelector('#entry-form');

function clickSave(event) {
  event.preventDefault();
  var titleValue = $newEntryForm.elements.title.value;
  var notesValue = $newEntryForm.elements.notes.value;
  var imageValue = $newEntryForm.elements.url.value;
  var entryObj = {
    url: imageValue,
    title: titleValue,
    notes: notesValue,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entryObj);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
}

$newEntryForm.addEventListener('submit', clickSave);
