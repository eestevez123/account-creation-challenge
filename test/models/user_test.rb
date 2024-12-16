require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # Test username presence validation
  test "should not save user without username" do
    user = User.new(password: 'StrongPassword1234567890')
    assert_not user.valid?, "User should not be valid without a username"
    assert_includes user.errors[:username], "Username is required"
  end

  # Test username length validations
  test "should not save user with username shorter than 10 characters" do
    user = User.new(username: '123456789', password: 'StrongPassword1234567890')
    assert_not user.valid?, "User should not be valid with short username"
    assert_includes user.errors[:username], "Username must be at least 10 characters long"
  end

  test "should not save user with username longer than 50 characters" do
    long_username = 'a' * 51
    user = User.new(username: long_username, password: 'StrongPassword1234567890')
    assert_not user.valid?, "User should not be valid with long username"
    assert_includes user.errors[:username], "Username must be less than 50 characters"
  end

  test "should save user with username between 10 and 50 characters" do
    valid_username = '1234567890'
    user = User.new(username: valid_username, password: 'StrongPassword1234567890')
    assert user.valid?, "User should be valid with a username between 10 and 50 characters"
  end

  # Test username uniqueness validation
  test "should not save user with duplicate username" do
    User.create!(username: 'uniqueusername', password: 'StrongPassword1234567890')
    duplicate_user = User.new(username: 'uniqueusername', password: 'AnotherStrongPassword1234567890')
    assert_not duplicate_user.valid?, "User should not be valid with duplicate username"
    assert_includes duplicate_user.errors[:username], "Username is already taken"
  end

  # Test password presence validation
  test "should not save user without password" do
    user = User.new(username: 'validusername')
    assert_not user.valid?, "User should not be valid without a password"
    assert_includes user.errors[:password], "Password is required"
  end

  # Test password length validations
  test "should not save user with password shorter than 20 characters" do
    user = User.new(username: 'validusername', password: 'short')
    assert_not user.valid?, "User should not be valid with short password"
    assert_includes user.errors[:password], "Password must be at least 20 characters long"
  end

  test "should not save user with password longer than 50 characters" do
    long_password = 'a' * 51
    user = User.new(username: 'validusername', password: long_password)
    assert_not user.valid?, "User should not be valid with long password"
    assert_includes user.errors[:password], "Password must be less than 50 characters"
  end

  # Test password complexity validation
  test "should not save user without letter and number in password" do
    user = User.new(username: 'validusername', password: 'passwordonly')
    assert_not user.valid?, "User should not be valid without a number in password"
    assert_includes user.errors[:password], "Password must contain at least one letter and one number"

    user.password = '1234567890'
    assert_not user.valid?, "User should not be valid without a letter in password"
    assert_includes user.errors[:password], "Password must contain at least one letter and one number"
  end
end
