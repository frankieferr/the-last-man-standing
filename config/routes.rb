TheLastManStanding::Application.routes.draw do

  get "/notifications" => "notifications#index"
  get "/notifications/all" => "notifications#all"
  get "/notifications/:id/show" => "notifications#show"

  get "/posts/all" => "posts#all"
  post "/posts/add" => "posts#add"
  post "/posts/addComment" => "posts#addComment"
  get "/posts/:id/info" => "posts#info"

  get "/ladder" => "ladder#index"
  get "/ladder/info" => "ladder#info"
  get "/ladder/recently_fallen" => "ladder#recently_fallen"

  get "/times_fallen" => "times_fallen#index"
  get "/times_fallen/all" => "times_fallen#all"

  get "/friends" => "friends#index"

  get "/friends/getAllFriends" => "friends#getAllFriends"
  get "/friends/getAllSentRequests" => "friends#getAllSentRequests"
  get "/friends/getAllReceivedRequests" => "friends#getAllReceivedRequests"
  get "/friends/getAllSuggestedFriends" => "friends#getAllSuggestedFriends"

  post "/friends/add"
  delete "/friends/delete"
  patch "/friends/accept"
  delete "/friends/decline"
  delete "/friends/withdraw"

  # Update details
  get "/my_details" => "men#my_details"
  patch "/men/update_details" => "men#update_details"

  # Change password
  get "/change_password" => "men#change_password"
  patch "/men/update_password" => "men#update_password"

  # Get all men
  get "/men/all" => "men#all"

  # Route to create new fallen record for man
  post "/men/fell" => "men#fell"


  # Route to get the current man
  get "/men/current" => "men#current"


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
