class Profile < ActiveRecord::Base
  belongs_to :user
  # http://guides.rubyonrails.org/active_record_validations.html
end
