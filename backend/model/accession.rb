require_relative 'mixins/accession_id_generator.rb'

Accession.class_eval do
  include YaleAccessionIdGenerator
end


Accession.properties_to_auto_generate.push ({
  :property => :id_1,
  :generator => YaleAccessionIdGenerator.id_1_generator,
  :only_if => proc {|json| !YaleAccessionIdGenerator.inside_import? && json[:id_0] =~ /import/ }
})



Accession.properties_to_auto_generate.push ({
  :property => :id_0,
  :generator => YaleAccessionIdGenerator.id_0_generator,
  :only_if => proc { true }
})


Accession.properties_to_auto_generate.push ({
  :property => :id_2,
  :generator => YaleAccessionIdGenerator.id_2_generator,
  :only_if => proc {|json| !YaleAccessionIdGenerator.inside_import? && json[:id_2].nil? && !json[:id_1].nil? }
})
