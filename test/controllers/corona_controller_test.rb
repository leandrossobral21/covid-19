require 'test_helper'

class CoronaControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get corona_index_url
    assert_response :success
  end

end
