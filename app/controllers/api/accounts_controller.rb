class Api::AccountsController < ApiController
    skip_before_action :verify_authenticity_token
    wrap_parameters false # Disable automatic wrapping
    include Api::AccountsHelper # Include the helper
  
    def create
        # Ensure required parameters exist
        unless params[:username].present? && params[:password].present?
            return render json: { errors: { general: 'Username and password are required.' } }, status: :bad_request
        end
  
        # Create a new user with permitted parameters
        user = User.new(user_params)
  
        if user.save
            render json: format_success_response(user), status: :created
        else
            render json: format_error_response(user), status: :unprocessable_entity
        end
    end
  
    private
  
    # Strong parameters to whitelist input
    def user_params
        params.permit(:username, :password)
    end
end
  