class Inputs::EventAttributes < Types::BaseInputObject
  description "Attributes for creating or updating events"
  argument :id, ID, required: false
  argument :name, String, required: false
  argument :value, Integer, required: false
  argument :description, String, required: false
  argument :category, String, required: false
  argument :completed, Boolean, required: false
  argument :created_at, String, required: false
end