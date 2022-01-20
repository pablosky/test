require 'rails_helper'

RSpec.describe 'read event ', type: :request do
  
  def read_event_mutation(event_id)
    <<~GQL
       mutation {
        readEvent(input: {eventId: #{event_id}}) {
          id
          description
          category
          completed
        }
      }
    GQL
  end

  context '#call' do

    let!(:event) { Event.create(description: 'description', category: 0, completed: false) }

    it 'sets the event as completed' do
      post('/graphql', params: { query: read_event_mutation(event.id) })
      read_event = JSON.parse(response.body)["data"]['readEvent']
      expect(read_event['completed']).to be_truthy
    end

  end
end