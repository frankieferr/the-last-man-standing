class MenController < ApplicationController
  before_filter :authenticate_man!

  def my_details
  end
end
