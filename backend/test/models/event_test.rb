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
require "test_helper"

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
