class AddFieldsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :name, :string
    add_column :users, :last_name, :string
    add_column :users, :data_nasc, :date
    add_column :users, :cep, :string
    add_column :users, :estado, :string
    add_column :users, :cidade, :string
    add_column :users, :bairro, :string
    add_column :users, :rua, :string
    add_column :users, :possui_doenca, :string
    add_column :users, :possui_crianca, :boolean 
    add_column :users, :possui_risco, :boolean

  end
end
