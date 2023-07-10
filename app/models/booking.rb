class Booking < ApplicationRecord
    belongs_to :user
    belongs_to :property

    # validates :user, presence: true
    # uniqueness: {message: "Property has been booked"}
end
