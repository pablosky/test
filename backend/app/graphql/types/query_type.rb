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

    def events(from: , to: )
      Event.where(created_at: (from..to))
    end
  end
end
