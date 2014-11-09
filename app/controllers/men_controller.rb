class MenController < ApplicationController
  before_filter :authenticate_man!

  def my_details
  end

  def current
    respond_to do |format|
      format.html {
        redirect_to "/my_details" and return
      }
      format.json {
        render json: current_man
      }
    end
  end

  def update_details
    current_man.update(man_params)
    respond_to do |format|
      format.html {
        redirect_to "/my_details" and return
      }
      format.json {
        render json: current_man
      }
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def man_params
      params.require(:man).permit(:name, :email)
    end
end
