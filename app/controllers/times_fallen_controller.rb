class TimesFallenController < ApplicationController
  def index
  end

  def all
    respond_to do |format|
      format.html {
        redirect_to "/" and return
      }
      format.json {
        render json: current_man.fallens.reverse
      }
    end
  end

end
