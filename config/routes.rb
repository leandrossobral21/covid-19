Rails.application.routes.draw do
  get 'corona/index'
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
   root 'corona#index'
end
