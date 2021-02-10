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

function renderEntry(object) {
  var $liRow = document.createElement('li');
  $liRow.setAttribute('class', 'entry-item row');

  var $liImageCol = document.createElement('span');
  $liImageCol.setAttribute('class', 'column-full column-half');
  $liRow.append($liImageCol);

  var $liImage = document.createElement('img');
  $liImage.setAttribute('src', object.url);
  $liImageCol.append($liImage);

  var $liTextCol = document.createElement('span');
  $liTextCol.setAttribute('class', 'column-full column-half');
  $liRow.append($liTextCol);

  var $liHead = document.createElement('h3');
  var $liHeadText = document.createTextNode(object.title);
  $liHead.append($liHeadText);
  $liTextCol.append($liHead);

  var $liPara = document.createElement('p');
  var $liParaText = document.createTextNode(object.notes);
  $liPara.append($liParaText);
  $liTextCol.append($liPara);

  return $liRow;
}

var $entryList = document.querySelector('.entry-list');

for (var i = 0; i < data.entries.length; i++) {
  var $entry = renderEntry(data.entries[i]);
  $entryList.append($entry);
}
