module Types
  class MutationType < Types::BaseObject
    field :read_event, mutation: Mutations::ReadEvent    
  end
end
