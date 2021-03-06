json.(@post, :name, :text, :id, :kind, :url)
json.created_at @post.created_at.to_i * 1000
json.likes_count @post.likes.count
json.dislikes_count @post.dislikes.count
json.user do
  json.id @post.user.id
  json.name @post.user.name
end
