class ApplicationController < ActionController::Base

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:name, :email, :password_confirmation, :password, :fullname, :rua, :cep, :bairro, :cidade, :estado, :doenca, :fumante)}
    devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:name, :email, :password_confirmation, :password, :current_password, :fullname, :rua, :cep, :bairro, :cidade, :estado, :doenca, :fumante)}
  end
end
