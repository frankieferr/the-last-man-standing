class FriendsController < ApplicationController
  def index
  end

  def getAll
    render json: current_man.all_friends
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
