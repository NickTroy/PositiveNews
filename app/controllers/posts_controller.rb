class PostsController < ApplicationController
  def index
    @posts = Post.all.includes(:likes).order('created_at DESC')

    respond_to do |format|
      format.html
      format.json { render 'posts/_index.json.jbuilder', status: 200 }
    end
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render 'posts/_show.json.jbuilder', status: 201
    end
  end

  def dislike
    @dislike = Dislike.where(post_id: params[:post_id], user_id: current_user.id).first
    @like = Like.where(post_id: params[:post_id], user_id: current_user.id).first
    if @dislike.nil?
      @dislike = Dislike.create(post_id: params[:post_id], user_id: current_user.id)
      @like.destroy unless @like.nil?
      @post = Post.find(params[:post_id])
      render 'posts/_show.json.jbuilder', status: 200
      return
    else
      @dislike.destroy
      @post = Post.find(params[:post_id])
      render 'posts/_show.json.jbuilder', status: 200
    end
  end

  def like
    @like = Like.where(post_id: params[:post_id], user_id: current_user.id).first
    @dislike = Dislike.where(post_id: params[:post_id], user_id: current_user.id).first
    if @like.nil?
      @like = Like.create(post_id: params[:post_id], user_id: current_user.id)
      @dislike.destroy unless @dislike.nil?
      @post = Post.find(params[:post_id])
      render 'posts/_show.json.jbuilder', status: 200
      return
    else
      @like.destroy
      @post = Post.find(params[:post_id])
      render 'posts/_show.json.jbuilder', status: 200
    end
  end

  private

  def post_params
    params.require(:post).permit(:name, :text, :url, :kind)
  end
end
