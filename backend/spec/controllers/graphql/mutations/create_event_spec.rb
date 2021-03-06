require 'rails_helper'

RSpec.describe 'create event ', type: :request do
  
  def create_event_mutation(description: , name:, value:)
    <<~GQL
       mutation {
        createEvent(input: {description: "#{description}", name: "#{name}", value: #{value}}) {
          id
          name
          description
          category
          completed
          value
        }
      }
    GQL
  end

  context '#call' do

    it 'creates an event ' do
      post('/graphql', params: { query: create_event_mutation(description: 'this is a description for the event', name: 'name', value: 2) })
      event = JSON.parse(response.body)["data"]['createEvent']
      expect(event['id'].present?).to be_truthy
      expect(event['description']).to eq 'this is a description for the event'
      expect(event['name']).to eq 'name'
      expect(event['value']).to eq 2
    end

    # it 'gives error message when not found' do
    #   post('/graphql', params: { query: create_event_mutation(event.id + 1) })
    #   read_event = JSON.parse(response.body)['errors'].first
    #   expect(read_event['message']).to eq "Couldn't find Event with 'id'=#{event.id + 1}"
    # end

  end
end