class FriendsController < ApplicationController
  before_filter :authenticate_man!

  def index
  end

  def getAllFriends
    friends = current_man.friends
    formattedFriends = []
    friends.each do |friend|
      formattedFriends.push(friend.info(current_man))
    end
    render json: formattedFriends || {status: "none"}
  end

  def getAllSentRequests
    sent_requests = current_man.sent_requests
    formattedSentRequests = []
    sent_requests.each do |sent_request|
      formattedSentRequests.push(sent_request.info(current_man))
    end
    render json: formattedSentRequests || {status: "none"}
  end

  def getAllReceivedRequests
    received_requests = current_man.received_requests
    formattedReceivedRequests = []
    received_requests.each do |received_request|
      formattedReceivedRequests.push(received_request.info(current_man))
    end
    render json: formattedReceivedRequests || {status: "none"}
  end

  def getAllSuggestedFriends
    render json: current_man.suggested_friends || {status: "none"}
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
