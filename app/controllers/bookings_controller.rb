class BookingsController < ApplicationController

    # Get all bookings
    def index
        render json: Booking.all
    end

    # Get booking by booking_id
    def show
        booking_by_id = Booking.find_by(id: params[:id])
        render json: booking_by_id, status: :ok
    end

    # # A User can book a property//Can create a booking
    # def create
    #     booking = @current_user.bookings.create!(booking_params)
    #     render json: booking, status: :created
    # end


    # Only the current user can create a booking//book a property & book by property_id
    def create
    booking = @current_user.bookings.build(booking_params)
    property = Property.find_by(id: params[:property_id])

    if property.nil?
        render json: { error: "Property not found" }, status: :not_found
    else
        booking.property = property

        if booking.save
        render json: { success: "Booking Successfuly created/Property successfully booked" }, status: :created
        else
        render json: { error: "Failed to create booking" }, status: :unprocessable_entity
        end
    end
    end

    # Delete a Booking
    def destroy
        booking = @current_user.bookings.find_by(id: params[:id])
        if booking
          booking.destroy
          render json: { success: "Successfully Deleted Booking" }
        else
          render json: { error: "Booking not found" }, status: :not_found
        end
      end

        
    private
  
    # def booking_params
    #   params.permit(:price, :property_id)
    # end

    def booking_params
        params.permit(:price)
    end

end



