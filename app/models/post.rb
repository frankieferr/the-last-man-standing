class Post < ActiveRecord::Base
  belongs_to :man
  has_many :comments

  def commentsHashes
    comments = []
    self.comments.each do |comment|
      commentHash = comment.attributes
      commentHash["message"] = commentHash["message"].gsub("\n", "<br>").html_safe
      commentHash["date_time"] = commentHash["created_at"].in_time_zone("Brisbane").strftime("%d/%m/%Y at %I:%M%p")
      commentHash["man_username"] = comment.man.username
      commentHash["man_name"] = comment.man.name
      comments.push(commentHash)
    end
    return comments
  end
end
