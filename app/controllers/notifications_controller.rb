class NotificationsController < ApplicationController

  def index

  end

  def all
    respond_to do |format|
      format.html {
        redirect_to "/" and return
      }
      format.json {
        notifications = current_man.notifications.reverse
        formattedNotifications = []
        notifications.each do |notification|
          formattedNotifications.push(notification.info)
        end

        render json: formattedNotifications
      }
    end
  end

  def show
    notification = Notification.find_by_id(params[:id])
    if !notification || current_man.id != notification.man.id
      redirect_to root_path, :flash => { :error => "That is not your notification to view" }
      return
    end
    @post = notification.entity.post
    if current_man.id != @post.man.id && current_man.friends.collect(&:id).all? { |id| id != @post.man.id }
      redirect_to root_path, :flash => { :error => "You are not friends with the author of the post" }
      return
    end

    notification.update_attributes(:read => true)
  end
end
