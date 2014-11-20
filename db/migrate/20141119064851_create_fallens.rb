class CreateFallens < ActiveRecord::Migration
  def change
    create_table :fallens do |t|
      t.integer :man_id
      t.date :date
      t.string :message

      t.timestamps
    end
  end
end
