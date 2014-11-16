class FriendsController < ApplicationController
  before_filter :authenticate_man!

  def index
  end

  def getAllFriends
    render json: current_man.friends
  end

  def getAllSentRequests
    render json: current_man.sent_requests
  end

  def getAllReceivedRequests
    render json: current_man.received_requests
  end

  def add
    friend = Man.where(:username => params[:username])
    if friend.count == 1
      friend = friend.first
      Friendship.create(:man_id => current_man.id,  :friend_id => friend.id, :accepted => false)
    end

    render json: friend
  end

  def remove
  end

  def accept
  end

  def decline
  end
end
