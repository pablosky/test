module Types
  class EventMetricType < Types::BaseObject
    description "A nice event metrics"
    field :metrics, GraphQL::Types::JSON, null: true
  end
end