module Mutations
  class DeleteEvent < BaseMutation
    argument :event_id, ID, required: true
    
    type Types::EventType

    def resolve(args)
      event = Event.find args[:event_id]
      event.destroy #fires the callbacks use delete for other reasons
      event
    rescue StandardError, CustomError, UserReadableError => e
      GraphQL::ExecutionError.new(e.message)
    end
  end

end