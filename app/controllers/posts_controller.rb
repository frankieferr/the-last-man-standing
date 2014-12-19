class PostsController < ApplicationController

  def index

  end

  def all
    respond_to do |format|
      format.html {
        redirect_to "/" and return
      }
      format.json {

        reply = {}
        posts_and_comments = []
        current_man.posts_and_comments.each do |post_and_comments|
          posts_and_comments.push(post_and_comments)
        end

        current_man.friends.each  do |friend|
          friend.posts_and_comments.each do |post_and_comments|
            posts_and_comments.push(post_and_comments)
          end
        end

        posts_and_comments.sort! { |a, b| b["created_at"] <=> a["created_at"] }
        reply["posts_and_comments"] = posts_and_comments
        reply["current_man"] = current_man.username
        render json: reply
      }
    end
  end

  def add
    Post.create(:man_id => current_man.id, :message => params[:message])
    render json: true
  end

  def addComment
    Comment.create(:man_id => current_man.id, :post_id => params[:post_id], :message => params[:message])
    render json: true
  end
end
