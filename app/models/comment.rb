class Comment < ActiveRecord::Base
  belongs_to :man
  belongs_to :post
  has_many :notifications, :as => :entity

  def info
    commentHash = self.attributes
    commentHash["message"] = commentHash["message"].gsub("\n", "<br>").html_safe
    commentHash["date_time"] = commentHash["created_at"].in_time_zone("Brisbane").strftime("%d/%m/%Y at %I:%M%p")
    commentHash["man_username"] = self.man.username
    commentHash["man_name"] = self.man.name
    return commentHash
  end

  def preview
    preview = self.message.gsub("\n", "...")
    preview = preview [0, 12] + "..." if preview.length > 15
    return preview
  end

  def notify
    ownerOfPost = self.post.man

    if ownerOfPost.id != self.man.id
      Notification.create(:man_id => ownerOfPost.id,
                          :entity => self,
                          :message => self.man.username + " has commented on your post")
    end


    listOfCommenter = self.post.comments.collect(&:man).uniq

    listOfCommenter.each do |commenter|
      if commenter.id != self.man.id && commenter.id != ownerOfPost.id
        Notification.create(:man_id => commenter.id,
                            :entity => self,
                            :message => self.man.username + " has commented on " + self.post.man.username + "'s post")
      end
    end
  end
end
