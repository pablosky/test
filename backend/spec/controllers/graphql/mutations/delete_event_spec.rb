require 'rails_helper'

RSpec.describe 'delete event ', type: :request do
  
  def delete_event_mutation(event_id: )
    <<~GQL
       mutation {
        deleteEvent(input: {eventId: #{event_id}}) {
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

    it 'deletes an event ' do
      post('/graphql', params: { query: delete_event_mutation(event_id: event.id) })
      expect(Event.count).to eq 0
    end

    it 'gives error message when not found' do
      post('/graphql', params: { query: delete_event_mutation(event_id: event.id + 1) })
      error = JSON.parse(response.body)['errors'].first
      expect(error['message']).to eq "Couldn't find Event with 'id'=#{event.id + 1}"
    end

  end
end