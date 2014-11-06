require 'test_helper'

class MenControllerTest < ActionController::TestCase
  test "should get my_details" do
    get :my_details
    assert_response :success
  end

end
