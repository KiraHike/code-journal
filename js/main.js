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
  if ($formHead.textContent === 'New Entry') {
    titleValue = $newEntryForm.elements.title.value;
    notesValue = $newEntryForm.elements.notes.value;
    imageValue = $newEntryForm.elements.url.value;
    entryObj = {
      url: imageValue,
      title: titleValue,
      notes: notesValue,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(entryObj);
    $entry = renderEntry(entryObj);
    $entryList.prepend($entry);
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $newEntryForm.reset();
    changeViewEntries();
  } else {
    entryObj = data.editing;
    titleValue = $newEntryForm.elements.title.value;
    notesValue = $newEntryForm.elements.notes.value;
    imageValue = $newEntryForm.elements.url.value;
    entryObj = {
      url: imageValue,
      title: titleValue,
      notes: notesValue,
      entryId: data.editing.entryId
    };
    data.entries[dataEntriesIndex] = entryObj;
    $entry = renderEntry(entryObj);
    closestElement.replaceWith($entry);
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $newEntryForm.reset();
    $formHead.textContent = 'New Entry';
    $buttonContainer.className = 'button-container right';
    $deleteButton.className = 'button-delete view hidden';
    changeViewEntries();
  }
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

function contentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
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
    for (var i = 0; i < $viewList.length; i++) {
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
var dataEntriesIndex;
var $buttonContainer = document.querySelector('.button-container');
var $deleteButton = document.querySelector('.button-delete');
var $modal = document.querySelector('.modal');
var $buttonYes = document.querySelector('.button-yes');
var $buttonNo = document.querySelector('.button-no');

function editEntry(event) {
  if (event.target.matches('i')) {
    closestElement = event.target.closest('li');
    dataEntryIDValue = Number(closestElement.getAttribute('data-entry-id'));
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === dataEntryIDValue) {
        dataEntriesIndex = i;
        data.editing = data.entries[i];
      }
    }
    changeViewForm();
    $newEntryForm.elements.title.value = data.editing.title;
    $newEntryForm.elements.notes.value = data.editing.notes;
    $newEntryForm.elements.url.value = data.editing.url;
    $formHead.textContent = 'Edit Entry';
    $buttonContainer.className = 'button-container space';
    $deleteButton.className = 'button-delete view';
    addImage();
  }
}

$deleteButton.addEventListener('click', function (event) {
  $modal.className = 'modal view';
});

$buttonYes.addEventListener('click', function (event) {
  dataEntryIDValue = data.editing.entryId;
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === dataEntryIDValue) {
      dataEntriesIndex = i;
    }
  }
  data.entries.splice(dataEntriesIndex, 1);
  var $children = $entryList.childNodes;
  for (i = 0; i < $children.length; i++) {
    if (Number($children[i].getAttribute('data-entry-id')) === dataEntryIDValue) {
      $children[i].remove();
    }
  }
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
  $formHead.textContent = 'New Entry';
  $buttonContainer.className = 'button-container right';
  $deleteButton.className = 'button-delete view hidden';
  $modal.className = 'modal view hidden';
  changeViewEntries();
});

$buttonNo.addEventListener('click', function (event) {
  $modal.className = 'modal view hidden';
});
