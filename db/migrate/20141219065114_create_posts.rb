class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :man_id
      t.string :message
      t.timestamps
    end
  end
end
