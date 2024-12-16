require 'zxcvbn'

class User < ApplicationRecord
  has_secure_password

  # Custom validations for username
  validates :username, presence: { message: 'Username is required' }
  validates :username, length: { 
    in: 10..50, 
    too_short: 'Username must be at least 10 characters long',
    too_long: 'Username must be less than 50 characters'
  }
  validates :username, uniqueness: { message: 'Username is already taken' }

  # Custom validations for password
  validates :password, presence: { message: 'Password is required' }
  validates :password, length: {
    in: 20..50,
    too_short: 'Password must be at least 20 characters long',
    too_long: 'Password must be less than 50 characters'
  }
  validate :validate_password_complexity
  validate :validate_password_strength

  private

  # Ensure password contains at least one letter and one number
  def validate_password_complexity
    return if password.blank?

    unless password.match?(/^(?=.*[a-zA-Z])(?=.*\d)/)
      errors.add(:password, 'Password must contain at least one letter and one number')
    end
  end

  # Ensure password has a Zxcvbn score >= 2
  def validate_password_strength
    return if password.blank?

    zxcvbn = Zxcvbn::Tester.new
    score = zxcvbn.test(password).score

    if score < 2
      errors.add(:password, 'Password is too weak. Please try a stronger password')
    end
  end
end
