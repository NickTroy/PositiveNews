json.posts @posts.each do |post|
  json.(post, :name, :text, :id)
  json.created_at post.created_at.to_i * 1000
  json.user do
    json.id post.user.id
    json.name post.user.name
  end
end
