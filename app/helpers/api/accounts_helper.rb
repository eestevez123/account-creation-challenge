module Api::AccountsHelper
  # Format success response
  def format_success_response(user)
    {
        message: 'Account created successfully',
        user: {
            id: user.id,
            username: user.username
        }
    }
  end

  # Format error response
  def format_error_response(user)
    {
      errors: {
            usernameErrors: user.errors[:username],
            passwordErrors: user.errors[:password]
      }
    }
  end
end
