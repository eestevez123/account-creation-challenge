Rails.application.routes.draw do
  # API Routes
  namespace :api do
    post '/create-account', to: 'accounts#create'
    # Add more API endpoints here
  end

  # Front-End Routes (React rendering)
  get '/', to: 'application#render_react', as: :root
  get 'signup/*all', to: 'application#render_react', as: :signup
  get '/create-account', to: 'application#render_react', as: :create_account
  get '/logout', to: 'application#render_react', as: :logout
end
