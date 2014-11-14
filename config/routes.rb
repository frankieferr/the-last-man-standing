TheLastManStanding::Application.routes.draw do

  get "friends" => "friends#index"
  get "friends/getAll" => "friends#getAll"
  post "friends/add"
  delete "friends/remove"
  patch "friends/accept"
  delete "friends/decline"
  # Update details
  get "my_details" => "men#my_details"
  patch "men/update_details" => "men#update_details"

  # Change password
  get "change_password" => "men#change_password"
  patch "men/update_password" => "men#update_password"

  # Get all men
  get "men/all" => "men#all"


  # Route to get the current man
  get "men/current" => "men#current"


  # DEVISE
  devise_for :men, :path => '', :path_names => { :sign_in => "sign_in", :sign_out => "sign_out" }, :skip => [:registrations]
  as :man do
    post '/' => 'devise/registrations#create', :as => 'man_registration'
    get '/sign_up' => 'devise/registrations#new', :as => 'new_man_registration'
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
