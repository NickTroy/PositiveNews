Rails.application.routes.draw do
  root 'posts#index'

  resources :posts do
    put '/like', to: 'posts#like'
    put '/dislike', to: 'posts#dislike'
  end
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
