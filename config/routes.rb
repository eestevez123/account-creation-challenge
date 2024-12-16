Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/', to: 'application#render_react', as: :root
  get 'signup/*all', to: 'application#render_react', as: :signup
  get '/create-account', to: 'application#render_react', as: :create_account
  get '/logout', to: 'application#render_react', as: :logout
end
