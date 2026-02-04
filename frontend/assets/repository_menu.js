$(function() {
  var $target = $('li.repo-container .btn-group > ul.dropdown-menu');

  if ($('[data-toggle="dropdown"]:contains("Plug-ins")').length > 0) {
    $target = $('[data-toggle="dropdown"]:contains("Plug-ins")').parent().find('.dropdown-menu');
  }

  $target.append('<li><a class="dropdown-item px-4 py-1" href="/plugins/yale_accessions/department_codes">Department Codes</a></li>');
})
