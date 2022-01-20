class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.integer :category
      t.string :description

      t.timestamps
    end
  end
end
