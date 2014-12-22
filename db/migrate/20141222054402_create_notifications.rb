class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.integer :man_id
      t.integer :entity_id
      t.string :entity_type
      t.string :message
      t.boolean :read, :default => false
      t.timestamps
    end
  end
end
