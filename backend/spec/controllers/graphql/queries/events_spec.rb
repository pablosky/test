require 'rails_helper'

RSpec.describe 'events ', type: :request do
  def events_query(from: , to:)
    <<~GQL
       query {
        events(from: "#{from}", to: "#{to}"){
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

    let!(:event) { Event.create(description: 'description', category: 0, completed: false, created_at: Date.new(2020, 1, 1) ) }
    let!(:event2) { Event.create(description: 'description2', category: 0, completed: false, created_at: Date.new(2021, 2, 1)) }

    it 'gets the events data' do
      post('/graphql', params: { query: events_query(from: Date.new(2020, 1, 1).iso8601, to: Date.new(2021, 2, 1).iso8601) })
      read_event = JSON.parse(response.body)["data"]['events']
      expect(read_event.count).to eq 2
    end

    it 'gets the events filtered by created_at timestamp' do
      post('/graphql', params: { query: events_query(from: Date.new(2020, 1, 1).iso8601, to: Date.new(2020, 11, 1).iso8601) })
      read_event = JSON.parse(response.body)["data"]['events']
      expect(read_event.count).to eq 1
    end
  end
end