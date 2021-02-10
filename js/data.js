/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', store);

var previousEntriesJSON = localStorage.getItem('js-local-storage');

if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

function store(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('js-local-storage', dataJSON);
}
