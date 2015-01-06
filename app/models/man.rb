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

  has_many :posts

  has_many :notifications

  def friends
    return sent_friends + received_friends
  end

  def number_of_days
    if (self.times_fallen == 0)
      return (Date.today - self.created_at.to_date).to_i
    end
    number_of_days = (Date.today - self.sorted_fallens.first.datetime.to_date).to_i

    return 0 if number_of_days < 0

    return number_of_days
  end

  def sorted_fallens
    self.fallens.sort! { |a, b| b[:datetime] <=> a[:datetime] }
  end

  def friend?(man)
    friendships = Friendship.where("(man_id = ? AND friend_id = ? AND accepted = 't') OR " +
                                   "(man_id = ? AND friend_id = ? AND accepted = 't')",
                                    self.id, man.id, man.id, self.id)

    return !friendships.nil? && friendships.count != 0
  end

  def times_fallen
    return self.fallens.count
  end

  def posts_and_comments
    posts_and_comments = []
    self.posts.each do |post|
      posts_and_comments.push(post.info)
    end

    return posts_and_comments
  end

  def fell(fallen)
    Fallen.create(:man_id => self.id,
                  :datetime => fallen[:datetime] || Date.now,
                  :message => fallen[:message] || "",
                  :masturbation => fallen[:masturbation] || false,
                  :pornography => fallen[:pornography] || false,
                  :sexual_contact => fallen[:sexual_contact] || false,
                  :other => fallen[:other],
                  )
  end

  def unread_notifications
    self.notifications.where(:read => false)
  end

  def mutual_friends(man)

    mutual_friends = []
    return mutual_friends if self.friends.count == 0

    friends_ids = self.friends.collect(&:id)

    friendships = Friendship.where("man_id = ? AND friend_id IN (?) AND accepted = 't'",
                      man.id, friends_ids).to_a

    if friendships.count > 0
      friendships.each do |friendship|
        mutual_friends.push(friendship.friend)
      end
    end

    friendships = Friendship.where("man_id IN (?) AND friend_id = ?  AND accepted = 't'",
                      friends_ids, man.id).to_a

    if friendships.count > 0
      friendships.each do |friendship|
        mutual_friends.push(friendship.man)
      end
    end

    return mutual_friends
  end

  def mutual_friends_message(mutual_friends)
    if mutual_friends.count <= 3
      return mutual_friends.collect(&:username).join(", ")
    end

    return mutual_friends[0, 3].collect(&:username).join(", ") + " and " + (mutual_friends.count - 3).to_s + " more."
  end

  def mutual_friends_info(man)
    mutual_friends = self.mutual_friends(man)
    return nil if mutual_friends.nil? || mutual_friends.count == 0

    mutual_friends_info = {}
    mutual_friends_info["username"] = man.username
    mutual_friends_info["name"] = man.name
    mutual_friends_info["email"] = man.email
    mutual_friends_info["mutual_friends_count"] = mutual_friends.count
    mutual_friends_info["mutual_friends"] = self.mutual_friends_message(mutual_friends)
    return mutual_friends_info
  end

  def all_mutual_friends
    all_mutual_friends = []
    unfriends = Man.all.to_a - [self] - self.friends.to_a - self.received_requests.to_a - self.sent_requests.to_a
    return all_mutual_friends if unfriends.nil? || unfriends.count == 0

    unfriends.each do |unfriend|
      mutual_friends = self.mutual_friends_info(unfriend)
      all_mutual_friends.push(mutual_friends) if !mutual_friends.nil?
    end

    # Sort in descending order of the number of mutual friends so that it lists them in that order
    all_mutual_friends.sort! { |a, b| b["mutual_friends_count"] <=> a["mutual_friends_count"] }

    return all_mutual_friends
  end

  def info(man)
    manHash = {}
    manHash["username"] = self.username
    manHash["name"] = self.name
    manHash["email"] = self.email
    mutual_friends = self.mutual_friends(man)
    if mutual_friends && mutual_friends.count > 0
      manHash["mutual_friends"] = "Mutual Friends: " + self.mutual_friends_message(mutual_friends)
    end
    manHash["friend"] = self.friend?(man)
    return manHash
  end
end
