require 'rspec'
require 'spec_helper'
require 'json'
require_relative '../model/mixins/four_id_generator'

describe 'FourIdGenerator' do

  before(:all) do
    @dog_repo = Repository.create_from_json(JSONModel(:repository).from_hash(:repo_code => "Bark", :name => "Dogs"))
    @cat_repo = Repository.create_from_json(JSONModel(:repository).from_hash(:repo_code => "Meow", :name => "Cats"))
  end
  
  it "understands what a fiscal year is" do
    FourIdGenerator.accession_fy_generator.call({'accession_date' => '2013-07-01'}).should eq('2014')
    FourIdGenerator.accession_fy_generator.call({'accession_date' => '2013-06-01'}).should eq('2013')
  end
  
  it "builds resource ids as 'sequence #' + 'department name'" do
    opts = {:id_0 => nil, :id_1 => "A Department", :id_2 => nil, :id_3 => nil}
    id_2 = SecureRandom.hex 
    resource = create_resource(opts.merge(:id_2 => id_2))
    id = JSON.parse(resource.identifier)
    id[0].should_not be_nil # sequence number 
    id[1].should eq("A Department")
    id[2].should eq(id_2)
    id[3].should be_nil
  end
 
  it "bumps the sequence for resources correctly" do
    opts = {:id_0 => nil, :id_1 => "dogge",  :id_2 => nil, :id_3 => nil}
    # each repo should have their own sequences... 
    [@dog_repo, @cat_repo].each do |repo|
      # and each department should have their own sequences... 
      RequestContext.open(:repo_id => repo.id) do 
        sequence = 0 
        10.times do 
          id_2 = SecureRandom.hex
          resource = create_resource(opts.merge(:id_2 => id_2) )
          id_0 = JSON.parse(resource.identifier).first.to_i
          id_0.should eq( sequence + 1 )
          sequence = id_0
        end
      end
    end
  end

  it "builds accession ids as 'fy' + 'sequence #' + 'department name'" do
    opts = { :id_0 => nil, :id_1 => nil, :id_2 => "A Department", :id_3 => nil,  :accession_date => "2017-07-03"   }
    id_3 = SecureRandom.hex
    accession = create_accession(opts.merge(:id_3 => id_3))
    id = JSON.parse(accession.identifier)
    id[0].should eq("2018") # fiscal year based on the accession_date
    id[1].should_not be_nil # sequence number
    id[2].should eq("A Department")
    id[3].should eq(id_3)
  end
  
  it "bumps the sequence for accessions correctly" do
    opts = { :id_0 => nil, :id_1 => nil, :id_2 => "katt", :id_3 => nil }
    # each repo should have their own sequences... 
    [@dog_repo, @cat_repo].each do |repo|
      RequestContext.open(:repo_id => repo.id) do 
        # and each year should have its own range as well... 
        [ "2017-01-01", "2016-01-01", "2015-01-01" ].each do |fy| 
          sequence = 0 
          10.times do 
            id_3 = SecureRandom.hex 
            accession = create_accession(opts.merge(:accession_date => fy, :id_3 => id_3))
            id_1 = JSON.parse(accession.identifier)[1].to_i
            id_1.should eq( sequence + 1 )
            sequence = id_1
          end
        end
      end
    end 
  end

end
