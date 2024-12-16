require "test_helper"

class Api::AccountsControllerTest < ActionDispatch::IntegrationTest
  # Test missing parameters
  test "should return bad request if username and password are missing" do
    post "/api/create-account", params: {}
    assert_response :bad_request
    response_body = JSON.parse(response.body)
    assert_equal "Username and password are required.", response_body["errors"]["general"]
  end

  # Test successful user creation
  test "should create user and return success response" do
    valid_params = { username: "testuser123123123", password: "StrongPassword123dawdawdawd1231231" }
    assert_difference("User.count", 1) do
      post "/api/create-account", params: valid_params
    end
    assert_response :created
    response_body = JSON.parse(response.body)
    assert response_body["user"]["id"].present?
    assert_equal "testuser123123123", response_body["user"]["username"]
  end

  # Test user creation failure due to validation error
  test "should return validation errors if user creation fails" do
    User.create!(username: "testuser123123123", password: "AnotherPassword123dawdawdawd1231231") # Duplicate username
    invalid_params = { username: "testuser123123123", password: "AnotherPassword123dawdawdawd1231231" }
    post "/api/create-account", params: invalid_params
    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert_includes response_body["errors"]["usernameErrors"], "Username is already taken"
  end
end
