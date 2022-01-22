module Mutations
  class UpdateEvent < BaseMutation
    argument :event_data, Inputs::EventAttributes, required: true
    
    type Types::EventType

    def resolve(args)
      event = Event.find args[:event_data][:id]
      event.update!(args[:event_data].to_h)
      event
    rescue StandardError, CustomError, UserReadableError => e
      GraphQL::ExecutionError.new(e.message)
    end
  end

end