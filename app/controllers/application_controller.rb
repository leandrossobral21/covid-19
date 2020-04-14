class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:name, :email, :password_confirmation, :password, :possui_doenca, :possui_crianca, :possui_risco, :fullname, :last_name, :rua, :cep, :bairro, :cidade, :estado, :doenca, :data_nasc)}
    devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:name, :email, :password_confirmation, :password, :possui_doenca,:possui_crianca, :possui_risco, :current_password, :fullname, :last_name, :rua, :cep, :bairro, :cidade, :estado, :doenca, :data_nasc)}
  end
end