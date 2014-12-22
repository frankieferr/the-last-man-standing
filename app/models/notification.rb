class Notification < ActiveRecord::Base
  belongs_to :man
  belongs_to :entity, :polymorphic => true

  def info
    notification_hash = self.attributes
    notification_hash["date_time"] =   notification_hash["created_at"].in_time_zone("Brisbane").strftime("%d/%m/%Y at %I:%M%p")
    notification_hash["message"] =   (notification_hash["message"].gsub("\n", "<br>") + ": " + "<i>" + self.entity.preview + "</i>").html_safe
    notification_hash["link"] = '<a href="/notifications/' + self.id.to_s + '/show">View</a>'.html_safe
    return notification_hash
  end
end
