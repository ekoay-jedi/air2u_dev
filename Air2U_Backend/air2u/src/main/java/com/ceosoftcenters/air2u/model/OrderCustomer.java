package com.ceosoftcenters.air2u.model;

public class OrderCustomer {
	private String userName;
	private String email;
	private String DeliveryAddress;
	private String HomeAddress;
	private String ContactNumber;
	
	public OrderCustomer() {
		super();
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDeliveryAddress() {
		return DeliveryAddress;
	}
	public void setDeliveryAddress(String deliveryAddress) {
		DeliveryAddress = deliveryAddress;
	}
	public String getHomeAddress() {
		return HomeAddress;
	}
	public void setHomeAddress(String homeAddress) {
		HomeAddress = homeAddress;
	}
	public String getContactNumber() {
		return ContactNumber;
	}
	public void setContactNumber(String contactNumber) {
		ContactNumber = contactNumber;
	}
	@Override
	public String toString() {
		return "OrderCustomer [userName=" + userName + ", email=" + email + ", DeliveryAddress=" + DeliveryAddress
				+ ", HomeAddress=" + HomeAddress + ", ContactNumber=" + ContactNumber + "]";
	}
	
	
}
