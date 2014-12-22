class PostsController < ApplicationController

  before_filter :authenticate_man!

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
        # Order it in ascending order because in JS we render it prepended
        posts_and_comments.sort! { |a, b| a["created_at"] <=> b["created_at"] }
        reply["posts_and_comments"] = posts_and_comments
        reply["current_man"] = current_man.username
        render json: reply
      }
    end
  end

  def add
    post = Post.create(:man_id => current_man.id, :message => params[:message])
    render json: post.info
  end

  def addComment
    comment = Comment.create(:man_id => current_man.id, :post_id => params[:post_id], :message => params[:message])
    render json: comment.info
  end

  def show
    @post = Post.find_by_id(params[:id])
    redirect_to root_path, :flash => { :error => "You are not friends with the author of the post" } if current_man.id != @post.man.id && current_man.friends.collect(&:id).all? { |id| id != @post.man.id }
  end

  def info
    reply = {}
    post = Post.find_by_id(params[:id])
    reply["posts_and_comments"] = [post.info]
    reply["current_man"] = current_man.username
    render json: reply
  end
end
