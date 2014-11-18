class Friendship < ActiveRecord::Base
  belongs_to :man
  belongs_to :friend, :class_name => "Man"

  validates_uniqueness_of :friend_id, :scope => :man_id
  validates_uniqueness_of :man_id, :scope => :friend_id

  def accept
    self.update_attributes(:accepted => true)
  end

  def decline
    self.destroy
  end

  def withdraw
    self.destroy
  end

  def self.get_record(man, friend)
    friendship = Friendship.where(:man_id => man.id, :friend_id => friend.id).first
    return friendship if friendship

    friendship = Friendship.where(:man_id => friend.id, :friend_id => man.id).first
    return friendship
  end


end
