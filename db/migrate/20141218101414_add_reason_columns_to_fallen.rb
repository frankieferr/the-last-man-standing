class AddReasonColumnsToFallen < ActiveRecord::Migration
  def change
    add_column :fallens, :masturbation, :boolean, :default => false
    add_column :fallens, :pornography, :boolean, :default => false
    add_column :fallens, :sexual_contact, :boolean, :default => false
    add_column :fallens, :other, :string
  end
end
