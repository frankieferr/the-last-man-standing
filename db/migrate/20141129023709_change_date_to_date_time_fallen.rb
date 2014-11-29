class ChangeDateToDateTimeFallen < ActiveRecord::Migration
  def change
    change_column :fallens, :date, :datetime
    rename_column :fallens, :date, :datetime
  end
end
