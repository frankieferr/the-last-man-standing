class Fallen < ActiveRecord::Base

  belongs_to :man


  def reason_for_fall
    reason_for_fall = []

    reason_for_fall.push("Masturbation") if self.masturbation
    reason_for_fall.push("Pornography") if self.pornography
    reason_for_fall.push("Sexual Contact") if self.sexual_contact
    reason_for_fall.push(self.other) if self.other

    return reason_for_fall.join(", ")
  end

  def info
    fallen_hash = self.attributes
    fallen_hash["message"] =   fallen_hash["message"].gsub("\n", "<br>").html_safe
    fallen_hash["date_time"] = fallen_hash["datetime"].in_time_zone("Brisbane").strftime("%d/%m/%Y at %I:%M%p")
    fallen_hash["reason_for_fall"] = self.reason_for_fall
    return fallen_hash
  end
end
