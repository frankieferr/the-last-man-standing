class LadderController < ApplicationController

  before_filter :authenticate_man!

  def index

  end

  def info

    respond_to do |format|
      format.html {
        redirect_to "/" and return
      }
      format.json {
        reply = []

        friend_info = {username: current_man.username,
                       name: current_man.name,
                       times_fallen: current_man.times_fallen,
                       number_of_days: current_man.number_of_days}
        reply.push(friend_info)

        current_man.friends.each  do |friend|
          friend_info = {username: friend.username,
                         name: friend.name,
                         times_fallen: friend.times_fallen,
                         number_of_days: friend.number_of_days}
          reply.push(friend_info)
        end

        reply.sort! { |a, b| [a[:number_of_days], b[:times_fallen]] <=> [b[:number_of_days], a[:times_fallen]] }
        render json: reply.reverse
      }
    end
  end

end
