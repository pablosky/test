module Mutations
  class ReadEvent < BaseMutation
    argument :event_id, ID, required: true
    
    type Types::EventType

    def resolve(args)
      event = Event.find args[:event_id]
      event.update!(completed: true)
      event
    end

  end

end