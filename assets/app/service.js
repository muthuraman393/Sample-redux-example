app.factory('Entry', function($resource) {
  return $resource('assets/api/data.json'); // Note the full endpoint address
});