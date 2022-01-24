module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :events, [EventType], null: true do
      description 'shows all events'
      argument :from, GraphQL::Types::ISO8601DateTime, required: true
      argument :to, GraphQL::Types::ISO8601DateTime, required: true
    end

    field :events_metrics,  EventMetricType, null: true do
      description 'shows all events'
      argument :from, GraphQL::Types::ISO8601DateTime, required: true
      argument :to, GraphQL::Types::ISO8601DateTime, required: true
      argument :range_filter, String, required: true
    end

    def events(from: , to: )
      Event.where(created_at: (from..to))
    end

    def events_metrics(from: , to:, range_filter:)
      # must show averages per minute/hour/day
      events = Event.where(created_at: (from..to))
      events = events.group_by_day(:created_at).average(:value) if range_filter == 'day'
      events = events.group_by_hour(:created_at).average(:value) if range_filter == 'hour'
      events = events.group_by_minute(:created_at).average(:value) if range_filter == 'minute'
      {
        metrics: events.to_a
      }
    end
  end
end
