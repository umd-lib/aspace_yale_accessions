require 'date'

module FourIdGenerator

  def self.included(base)
    base.extend(ClassMethods)
    base.class_eval do  
      @repo_unique_constraints = self.repo_unique_constraints.reject { |v| v[:json_property] == :id_0  }
    end 
  end


  def self.inside_import?
    # Requests through the web UI will come in with a high priority, whereas
    # migrations and batch imports will not.
    !RequestContext.get(:is_high_priority)
  end


  @accession_fy_generator = lambda {|json|
    date = Date.parse(json['accession_date'])
    "#{date.month > 6 ? date.year + 1 : date.year}"
  }




  @sequence_generator = lambda {|json|

    type = json["jsonmodel_type"]
    repo = RequestContext.get(:repo_id) 


    # Resources are unique to a repo
    # Accessions are unique to a repo and fiscal year ( id_0 )
    sequence_name = type == 'resource' ? 
        "#{type}_#{repo}" : 
        "#{type}_#{repo}_#{json['id_0']}" 

    seq = Sequence.get(sequence_name)
    seq = Sequence.get(sequence_name) if seq < 1

    seq.to_s.rjust(4, '0')
  }
  
  @import_generator = lambda {|json|
    "import"
  }


  def self.accession_fy_generator
    @accession_fy_generator
  end


  def self.sequence_generator
    @sequence_generator
  end


  def self.import_generator
    @import_generator
  end


  module ClassMethods
  end

end
