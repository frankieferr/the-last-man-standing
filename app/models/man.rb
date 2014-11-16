class Man < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :trackable

  validates_uniqueness_of      :username,     :case_sensitive => false, :allow_blank => false
  validates_length_of          :username,     :allow_blank => false
  validates_presence_of        :password, :on=>:create
  validates_confirmation_of    :password, :on=>:create
  validates_length_of          :password, :within => Devise.password_length, :allow_blank => true

  has_many :sent, :class_name => "Friendship", :foreign_key => "man_id"
  has_many :friends_1, -> { where(friendships: {accepted: true})  }, :through => :sent, :source => :friend
  has_many :sent_requests, -> { where(friendships: {accepted: false})  }, :through => :sent, :source => :friend

  has_many :received, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :friends_2, -> { where(friendships: {accepted: true})  }, :through => :received, :source => :man
  has_many :received_requests, -> { where(friendships: {accepted: false})  }, :through => :received, :source => :man

  def friends
    friends_1 + friends_2
  end
end
