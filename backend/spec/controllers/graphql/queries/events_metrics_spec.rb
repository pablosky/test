require 'rails_helper'

RSpec.describe 'events_metrics ', type: :request do
  def events_query(from: , to:, range_filter:)
    <<~GQL
       query {
        eventsMetrics(from: "#{from}", to: "#{to}", rangeFilter: "#{range_filter}"){
          metrics
        }
      }
    GQL
  end

  context '#call' do

    let!(:event) { Event.create(description: 'description', category: 0, completed: false, created_at: Date.new(2020, 1, 1) ) }
    let!(:event2) { Event.create(description: 'description2', category: 0, completed: false, created_at: Date.new(2021, 2, 1)) }

    it 'gets the events data' do
      post('/graphql', params: { query: events_query(from: Date.new(2020, 1, 1).iso8601, to: Date.new(2021, 2, 1).iso8601, range_filter: 'day') })
      read_event = JSON.parse(response.body)["data"]['eventsMetrics']
      expect(read_event['metrics'].present?).to be_truthy
    end

  end
end