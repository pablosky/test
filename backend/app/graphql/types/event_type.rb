module Types
  class EventType < Types::BaseObject
    description "A nice event"
    field :id, ID, null: true
    field :name, String, null: true
    field :value, Integer, null: true
    field :description, String, null: true
    field :category, String, null: true
    field :completed, Boolean, null: true
    field :created_at, String, null: true
  end
end