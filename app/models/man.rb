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
  has_many :sent_friends, -> { where(friendships: {accepted: true})  }, :through => :sent, :source => :friend
  has_many :sent_requests, -> { where(friendships: {accepted: false})  }, :through => :sent, :source => :friend

  has_many :received, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :received_friends, -> { where(friendships: {accepted: true})  }, :through => :received, :source => :man
  has_many :received_requests, -> { where(friendships: {accepted: false})  }, :through => :received, :source => :man

  has_many :fallens

  def friends
    return sent_friends + received_friends
  end

  def number_of_days
    if (self.times_fallen == 0)
      return (Date.today - self.created_at.to_date).to_i
    end

    return (Date.today - self.fallens.last.date).to_i
  end

  def times_fallen
    return self.fallens.count
  end

  def fell(message = "")
    Fallen.create(:man_id => self.id, :date => Date.today, :message => message)
  end
end
