require 'test_helper'

class FriendsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get add" do
    get :add
    assert_response :success
  end

  test "should get remove" do
    get :remove
    assert_response :success
  end

  test "should get accept" do
    get :accept
    assert_response :success
  end

  test "should get decline" do
    get :decline
    assert_response :success
  end

end
