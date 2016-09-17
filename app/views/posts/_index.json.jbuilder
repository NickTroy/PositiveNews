json.posts @posts.each do |post|
  json.(post, :name, :text, :id)
end
