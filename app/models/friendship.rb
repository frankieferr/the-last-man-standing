class Friendship < ActiveRecord::Base
  belongs_to :man
  belongs_to :friend, :class_name => "Man"

  validates_uniqueness_of :friend_id, :scope => :man_id
  validates_uniqueness_of :man_id, :scope => :friend_id

  def accept
    self.update_attributes(:accepted => true)
  end

  def reject
    self.destroy
  end

  def withdraw
    self.destroy
  end


end
