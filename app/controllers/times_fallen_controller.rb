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
        fallens = current_man.fallens.to_a.reverse
        formattedFallens = []
        fallens.each do |fallen|
          fallen = fallen.attributes
          fallen["date_time"] = fallen["datetime"].in_time_zone("Brisbane").strftime("%d/%m/%Y at %I:%M%p")
          formattedFallens.push(fallen)
        end

        render json: formattedFallens
      }
    end
  end

end
