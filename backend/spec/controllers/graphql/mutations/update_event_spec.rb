require 'rails_helper'

RSpec.describe 'update event ', type: :request do
  def update_event_data_mutation(args: )
    <<~GQL
       mutation {
        updateEvent(input: { eventData:{ id: #{args[:id]}, name: "#{args[:name]}", value: #{args[:value]}, description: "#{args[:description]}"}}){
          id
          value
          name
          description
          category
        }
      }
    GQL
  end

  context '#call' do

    let!(:event) { Event.create(description: 'description', category: 0, completed: false) }

    it 'sets the event updated data' do
      post('/graphql', params: { query: update_event_data_mutation(args: {id: event.id, name: 'new name', value: 1, description: 'new desc'}) })
      read_event = JSON.parse(response.body)["data"]['updateEvent']
      expect(read_event['name']).to eq 'new name'
    end
  end
end