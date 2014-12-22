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
          formattedFallens.push(fallen.info)
        end

        render json: formattedFallens
      }
    end
  end

end
