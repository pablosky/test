class AddReadStatusToEvent < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :completed, :boolean, default: false
  end
end
