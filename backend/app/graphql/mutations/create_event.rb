module Mutations
  class CreateEvent < BaseMutation
    argument :description, String, required: false
    
    type Types::EventType

    def resolve(args)
      event = Event.new args
      event.save!
      event
    rescue StandardError, CustomError, UserReadableError => e
      GraphQL::ExecutionError.new(e.message)
    end
  end

end