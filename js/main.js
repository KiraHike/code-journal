/* global data */
/* exported data */

var $dataViewEntryForm = document.querySelector('#formView');
var $dataViewEntries = document.querySelector('#entriesView');

if (data.view === 'entry-form') {
  $dataViewEntries.className = 'view hidden';
  $dataViewEntryForm.className = 'view';
} else {
  $dataViewEntries.className = 'view';
  $dataViewEntryForm.className = 'view hidden';
}

var $imageInput = document.querySelector('#image-url');
var $image = document.querySelector('#image');

function addImage(event) {
  $image.setAttribute('src', $imageInput.value);
}

$imageInput.addEventListener('blur', addImage);

var $newEntryForm = document.querySelector('#entry-form');
var $entryList = document.querySelector('.entry-list');
var $entry;

function changeViewEntries() {
  data.view = 'entries';
  $dataViewEntries.className = 'view';
  $dataViewEntryForm.className = 'view hidden';
}

function changeViewForm() {
  data.view = 'entry-form';
  $dataViewEntries.className = 'view hidden';
  $dataViewEntryForm.className = 'view';
}

var titleValue = $newEntryForm.elements.title.value;
var notesValue = $newEntryForm.elements.notes.value;
var imageValue = $newEntryForm.elements.url.value;
var entryObj = {
  url: imageValue,
  title: titleValue,
  notes: notesValue,
  entryId: data.nextEntryId
};

function clickSave(event) {
  event.preventDefault();
  data.nextEntryId++;
  data.entries.unshift(entryObj);
  $entry = renderEntry(entryObj);
  $entryList.prepend($entry);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
  changeViewEntries();
}

$newEntryForm.addEventListener('submit', clickSave);

function renderEntry(object) {
  var $liRow = document.createElement('li');
  $liRow.className = 'entry-item row';
  $liRow.setAttribute('data-entry-id', object.entryId);

  var $liImageCol = document.createElement('span');
  $liImageCol.setAttribute('class', 'column-full column-half');
  $liRow.append($liImageCol);

  var $liImage = document.createElement('img');
  $liImage.setAttribute('src', object.url);
  $liImageCol.append($liImage);

  var $liTextCol = document.createElement('span');
  $liTextCol.setAttribute('class', 'column-full column-half');
  $liRow.append($liTextCol);

  var $liEditIcon = document.createElement('i');
  $liEditIcon.setAttribute('class', 'blue fas fa-pen');
  $liTextCol.append($liEditIcon);

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

var i;

function contentLoaded(event) {
  for (i = 0; i < data.entries.length; i++) {
    $entry = renderEntry(data.entries[i]);
    $entryList.append($entry);
  }
}

window.addEventListener('DOMContentLoaded', contentLoaded);

var $navBar = document.querySelector('.nav-bar');
var $viewList = document.querySelectorAll('.view');

function changeViewNav(event) {
  if (event.target.matches('.nav-link')) {
    var dataViewValue = event.target.getAttribute('data-view');
    data.view = dataViewValue;
    for (i = 0; i < $viewList.length; i++) {
      if ($viewList[i].getAttribute('data-view') === dataViewValue) {
        $viewList[i].className = 'view';
      } else {
        $viewList[i].className = 'view hidden';
      }
    }
  }
}

$navBar.addEventListener('click', changeViewNav);

$entryList.addEventListener('click', editEntry);

var closestElement;
var dataEntryIDValue;

var $formHead = document.querySelector('h2');

function editEntry(event) {
  if (event.target.matches('i')) {
    closestElement = event.target.closest('li');
    dataEntryIDValue = Number(closestElement.getAttribute('data-entry-id'));
    for (i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === dataEntryIDValue) {
        data.editing = data.entries[i];
      }
    }
    changeViewForm();
    $newEntryForm.elements.title.value = data.editing.title;
    $newEntryForm.elements.notes.value = data.editing.notes;
    $newEntryForm.elements.url.value = data.editing.url;
    $formHead.textContent = 'Edit Entry';
    addImage();
  }
}
