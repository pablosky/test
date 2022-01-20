module Mutations
  class ReadEvent < BaseMutation
    argument :event_id, ID, required: true
    
    type Types::EventType

    def resolve(args)
      event = Event.find args[:event_id]
      raise 'not found' unless event
      event.update!(completed: true)
      event
    rescue StandardError, CustomError, UserReadableError => e
      GraphQL::ExecutionError.new(e.message)
    end
  end

end