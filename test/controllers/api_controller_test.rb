class ApiControllerTest < ActionDispatch::IntegrationTest
  test "create_account fails with missing username" do
    post api_create_account_path, params: { password: '123' }
    assert_response :bad_request
    assert_equal JSON.parse(response.body)['errors']['general'], "Username and password are required."
  end

  test "create_account fails with missing password" do
    post api_create_account_path, params: { username: '123' }
    assert_response :bad_request
    assert_equal JSON.parse(response.body)['errors']['general'], "Username and password are required."
  end

  test "create_account fails with invalid username" do
    post api_create_account_path, params: { username: '123456789', password: '1234567890123456789a' }
    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    username_errors = response_body['errors']['usernameErrors']

  assert_includes username_errors, "Username must be at least 10 characters long"
end

  test "create_account fails with invalid password" do
    post api_create_account_path, params: { username: '1234567890', password: '1234567890123456789' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors']['passwordErrors'], ["Password must be at least 20 characters long", "Password must contain at least one letter and one number", "Password is too weak. Please try a stronger password"]
  end

  test "create_account succeeds with valid username and password" do
    post api_create_account_path, params: { username: '1234567890', password: '12345678awdawdadsdcas90123456789a' }
    assert_response :success
  end
end
