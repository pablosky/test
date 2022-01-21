module Types
  class MutationType < Types::BaseObject
    field :read_event, mutation: Mutations::ReadEvent 
    field :create_event, mutation: Mutations::CreateEvent   
  end
end
