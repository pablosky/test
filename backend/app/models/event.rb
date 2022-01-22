# == Schema Information
#
# Table name: events
#
#  id          :bigint           not null, primary key
#  category    :integer
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  completed   :boolean          default(FALSE)
#  name        :string
#  value       :integer
#
class Event < ApplicationRecord
  #add enum category
end
