class PostsController < ApplicationController
  def index
    @posts = Post.all.order('created_at DESC')
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render 'posts/_show.json.jbuilder', status: 201
    end
  end

  private

  def post_params
    params.require(:post).permit(:name, :text, :url, :kind)
  end
end
