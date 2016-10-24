class AddColumnTypeToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :kind, :string, default: "simple"
  end
end
