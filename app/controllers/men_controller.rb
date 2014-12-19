class MenController < ApplicationController
  before_filter :authenticate_man!

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

  def my_details
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

  def change_password
  end

  def update_password
    if current_man.update(password_params)
      sign_in current_man, :bypass => true
    end
    respond_to do |format|
      format.html {
        redirect_to "/my_details" and return
      }
      format.json {
        render json: current_man
      }
    end
  end

  def all
    respond_to do |format|
      format.html {
        redirect_to "/" and return
      }
      format.json {
        render json: (Man.all.to_a - [current_man])
      }
    end
  end

  def fell
    current_man.fell(params[:fallen])
    respond_to do |format|
      format.html {
        redirect_to "/" and return
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

    def password_params
      params.require(:man).permit(:password, :password_confirmation)
    end
end
