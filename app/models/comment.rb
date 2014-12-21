class Comment < ActiveRecord::Base
  belongs_to :man
  belongs_to :post

  def info
    commentHash = self.attributes
    commentHash["message"] = commentHash["message"].gsub("\n", "<br>").html_safe
    commentHash["date_time"] = commentHash["created_at"].in_time_zone("Brisbane").strftime("%d/%m/%Y at %I:%M%p")
    commentHash["man_username"] = self.man.username
    commentHash["man_name"] = self.man.name
    return commentHash
  end
end
