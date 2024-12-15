Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Root route renders the React app
  get '/', to: 'application#render_react', as: :root

  # Explicit route for /create-account
  get '/create-account', to: 'application#render_react', as: :create_account
end