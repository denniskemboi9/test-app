class PropertiesController < ApplicationController

    skip_before_action :authorize, only: [:index, :show]
    
    # Show All Properties
    def index
      property = Property.all
      render json: property
    end
    
    # Show Property by ID
    def show
      property_by_id = Property.find_by(id: params[:id])
      if property_by_id
        render json: property_by_id, status: :ok
      else
        render json: { error: "Property doesn't exist"}, status: :not_found
      end
    end
  
    # Create New Property
    def create
      property = @current_user.properties.create!(property_params)
      render json: { success: "Successfully added property" }, status: :created
    end
  
    # Delete Property
    def destroy
      property = Property.find_by(id: params[:id])
      property.destroy
      render json: {success: "Property Deleted Succesfully"}
    end
  
    # Action to Approve properties - Only by Admin
    def approve
      current_user=User.find_by(id: session[:user_id])
      if current_user.is_admin==true
        property = Property.find_by(id: params[:id]) #value or null
        if property
            property.update(is_approved: true)
            render json: {success: "Property Approved... Can be seen by users"}, status: :created
        else
            render json: {error: "Property not found"}, status: :not_found
        end
      else
          render json: {error: "Only admin can perform such operation"}, status: :not_found
      end
    end
  
    # Get all approved properties
    def approvedproperties
      properties = Property.where(is_approved: true) 
      render json: properties
    end
  
    private
    def property_params
      params.permit(:name, :description, :price, :location, :image_url)
    end
  
  end
  