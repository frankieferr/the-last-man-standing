class Friendship < ActiveRecord::Base
  belongs_to :man
  belongs_to :friend, :class_name => "Man"
end
