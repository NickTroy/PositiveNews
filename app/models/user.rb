class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable
  has_many :posts
  has_many :likes, dependent: :destroy
  has_many :dislikes, dependent: :destroy
end
