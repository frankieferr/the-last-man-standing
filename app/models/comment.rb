class Comment < ActiveRecord::Base
  belongs_to :man
  belongs_to :post
end
