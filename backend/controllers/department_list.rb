class ArchivesSpaceService < Sinatra::Base

  Endpoint.post('/repositories/:repo_id/department_lists')
	  .description("Create a department list")
  	.params(["department_list", JSONModel(:department_list), "The record to create", :body => true],
            ["repo_id", :repo_id])
  	.permissions([:manage_repository])
  	.returns([200, :created]) \
  do 
    handle_create(DepartmentList, params[:department_list])
  end


  Endpoint.get('/repositories/:repo_id/department_lists')
  	.description("Get a list of departments lists")
  	.params(["repo_id", :repo_id])
  	.paginated(false)
		.permissions([])
  	.returns([200, "[(:department_list)]"]) \
  do 
    handle_unlimited_listing(DepartmentList, {:repo_id => params[:repo_id]})
  end


  Endpoint.get('/repositories/:repo_id/department_lists/:id')
  	.description('Get a department list')
  	.params(["id", :id],
            ["repo_id", :repo_id])
  	.permissions([:view_repository])
		.returns([200, "(:department_list)"]) \
  do
    json_response(DepartmentList.to_jsonmodel(params[:id]))
  end


  Endpoint.post('/repositories/:repo_id/department_lists/:id')
	  .description("Update a department list")
  	.params(["id", :id],
            ["department_list", JSONModel(:department_list), "The updated record", :body => true],
            ["repo_id", :repo_id])
  	.permissions([:manage_repository])
  	.returns([200, :created]) \
  do 
    handle_update(DepartmentList, params[:id], params[:department_list])
  end

end
