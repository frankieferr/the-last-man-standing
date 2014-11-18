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
    friend = Man.where(:username => params[:username]).first
    Friendship.create(:man_id => current_man.id,  :friend_id => friend.id, :accepted => false)

    render json: friend
  end

  def delete
    friend = Man.where(:username => params[:username]).first
    friendship = Friendship.get_record(current_man, friend)
    friendship.destroy  if friendship
    render json: friend
  end

  def accept
    friend = Man.where(:username => params[:username]).first
    friendship = Friendship.where(:man_id => friend.id,  :friend_id => current_man.id, :accepted => false).first
    friendship.accept if friendship
    render json: friend
  end

  def decline
    friend = Man.where(:username => params[:username]).first
    friendship = Friendship.where(:man_id => friend.id,  :friend_id => current_man.id, :accepted => false).first
    friendship.decline if friendship
    render json: friend
  end

  def withdraw
    friend = Man.where(:username => params[:username]).first
    friendship = Friendship.where(:man_id => current_man.id,  :friend_id => friend.id, :accepted => false).first
    friendship.withdraw if friendship
    render json: friend
  end
end
