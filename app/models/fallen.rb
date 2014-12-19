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
end
