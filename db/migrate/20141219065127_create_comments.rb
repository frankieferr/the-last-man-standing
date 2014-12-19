class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :man_id
      t.integer :post_id
      t.string :message

      t.timestamps
    end
  end
end
