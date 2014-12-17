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
    Friendship.create(:man_id => current_man.id,  :friend_id => friend.id, :accepted => false) if friend && !Friendship.exists(current_man, friend)
    render json: friend
  end

  def delete
    friend = Man.where(:username => params[:username]).first
    friendship = Friendship.get_friendship(current_man, friend) if friend
    friendship.destroy  if friendship
    render json: friend
  end

  def accept
    friend = Man.where(:username => params[:username]).first
    friendship = Friendship.get_request(friend, current_man) if friend
    friendship.accept if friendship
    render json: friend
  end

  def decline
    friend = Man.where(:username => params[:username]).first
    friendship = Friendship.get_request(friend, current_man) if friend
    friendship.decline if friendship
    render json: friend
  end

  def withdraw
    friend = Man.where(:username => params[:username]).first
    friendship = Friendship.get_request(current_man, friend) if friend
    friendship.withdraw if friendship
    render json: friend
  end
end
