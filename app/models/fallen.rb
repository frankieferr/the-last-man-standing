class Fallen < ActiveRecord::Base

  belongs_to :man


  def medium_of_fall
    medium_of_fall = []

    medium_of_fall.push("Masturbation") if self.masturbation
    medium_of_fall.push("Pornography") if self.pornography
    medium_of_fall.push("Sexual Contact") if self.sexual_contact
    medium_of_fall.push(self.other) if self.other

    return medium_of_fall.join(", ")
  end

  def info
    fallen_hash = self.attributes
    fallen_hash["message"] =   fallen_hash["message"].gsub("\n", "<br>").html_safe
    fallen_hash["date_time"] = fallen_hash["datetime"].in_time_zone("Brisbane").strftime("%d/%m/%Y at %I:%M%p")
    fallen_hash["medium_of_fall"] = self.medium_of_fall
    return fallen_hash
  end
end
