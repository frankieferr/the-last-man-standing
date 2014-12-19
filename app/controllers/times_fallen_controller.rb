class TimesFallenController < ApplicationController

  before_filter :authenticate_man!

  def index
  end

  def all
    respond_to do |format|
      format.html {
        redirect_to "/" and return
      }
      format.json {
        fallens = current_man.sorted_fallens
        formattedFallens = []
        fallens.each do |fallen|
          fallen_hash = fallen.attributes
          fallen_hash["message"] =   fallen_hash["message"].gsub("\n", "<br>").html_safe
          fallen_hash["date_time"] = fallen_hash["datetime"].in_time_zone("Brisbane").strftime("%d/%m/%Y at %I:%M%p")
          fallen_hash["reason_for_fall"] = fallen.reason_for_fall
          formattedFallens.push(fallen_hash)
        end

        render json: formattedFallens
      }
    end
  end

end
