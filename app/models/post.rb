class Post < ActiveRecord::Base
  belongs_to :man
  has_many :comments

  def commentsHashes
    comments = []
    self.comments.each do |comment|
      comments.push(comment.info)
    end
    return comments
  end

  def info
    postHash = self.attributes
    postHash["message"] = postHash["message"].gsub("\n", "<br>").html_safe
    postHash["date_time"] = postHash["created_at"].in_time_zone("Brisbane").strftime("%d/%m/%Y at %I:%M%p")
    postHash["man_username"] = self.man.username
    postHash["man_name"] = self.man.name
    postHash["comments"] = self.commentsHashes
    return postHash
  end
end
