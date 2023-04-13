$(function() {
  var $target = $('li.repo-container .btn-group > ul.dropdown-menu');

  if ($('li.repo-container .dropdown-submenu > a:contains("Plug-ins")').length > 0) {
    $target = $('li.repo-container .dropdown-submenu > a:contains("Plug-ins")').parent().find('.dropdown-menu');
  }

  $target.append('<li><a href="/plugins/yale_accessions/department_codes">Department Codes</a></li>');
})
