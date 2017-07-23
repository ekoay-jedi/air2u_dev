package com.ceosoftcenters.air2u.model;

import java.util.List;

public class OrderProduct {
	
	//order info
	private String OrderNumber;
	private String totalPrice;
	private String totalPV;
	private String Status;
	private String CreatedAt;
	private String tax;
	private int taxstatus;
	private String ShippingItem;
	private String shippingCharge;
	
	
	//customer info
	private OrderCustomer OrderCustomer;
	
	//shipping info
	private String shippingInfo;
	
	//earn point
	private String EarnedPV;
	
	//products
	private List<Product> Product;

	public String getOrderNumber() {
		return OrderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		OrderNumber = orderNumber;
	}

	public String getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getTotalPV() {
		return totalPV;
	}

	public void setTotalPV(String totalPV) {
		this.totalPV = totalPV;
	}

	public String getStatus() {
		return Status;
	}

	public void setStatus(String status) {
		Status = status;
	}

	public String getCreatedAt() {
		return CreatedAt;
	}

	public void setCreatedAt(String createdAt) {
		CreatedAt = createdAt;
	}

	public String getTax() {
		return tax;
	}

	public void setTax(String tax) {
		this.tax = tax;
	}

	public String getShippingItem() {
		return ShippingItem;
	}

	public void setShippingItem(String shippingItem) {
		ShippingItem = shippingItem;
	}

	public OrderCustomer getOrderCustomer() {
		return OrderCustomer;
	}

	public void setOrderCustomer(OrderCustomer orderCustomer) {
		OrderCustomer = orderCustomer;
	}

	public String getShippingInfo() {
		return shippingInfo;
	}

	public void setShippingInfo(String shippingInfo) {
		this.shippingInfo = shippingInfo;
	}

	public String getEarnedPV() {
		return EarnedPV;
	}

	public void setEarnedPV(String earnedPV) {
		EarnedPV = earnedPV;
	}

	public List<Product> getProduct() {
		return Product;
	}

	public void setProduct(List<Product> product) {
		Product = product;
	}

	public OrderProduct() {
		super();
	}

	public int getTaxstatus() {
		return taxstatus;
	}

	public void setTaxstatus(int taxstatus) {
		this.taxstatus = taxstatus;
	}

	

	public OrderProduct(String orderNumber, String totalPrice, String totalPV, String status, String createdAt,
			String tax, int taxstatus, String shippingItem, String shippingCharge,
			com.ceosoftcenters.air2u.model.OrderCustomer orderCustomer, String shippingInfo, String earnedPV,
			List<com.ceosoftcenters.air2u.model.Product> product) {
		super();
		OrderNumber = orderNumber;
		this.totalPrice = totalPrice;
		this.totalPV = totalPV;
		Status = status;
		CreatedAt = createdAt;
		this.tax = tax;
		this.taxstatus = taxstatus;
		ShippingItem = shippingItem;
		this.shippingCharge = shippingCharge;
		OrderCustomer = orderCustomer;
		this.shippingInfo = shippingInfo;
		EarnedPV = earnedPV;
		Product = product;
	}

	public String getShippingCharge() {
		return shippingCharge;
	}

	public void setShippingCharge(String shippingCharge) {
		this.shippingCharge = shippingCharge;
	}

	
	
	
	
	
}
