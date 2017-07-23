package com.ceosoftcenters.air2u.model;

public class Product {
	private String ProductName;
	private String ProductSpecifications;//product desc
	private String cvPrice;//product total price
	private String pvPrice;//product total point
	private String QTY;//库存数量
	private String OrderQTY;//订单数量
	private String subtotal;
	public Product() {
		super();
	}
	public String getProductName() {
		return ProductName;
	}
	public void setProductName(String productName) {
		ProductName = productName;
	}
	public String getProductSpecifications() {
		return ProductSpecifications;
	}
	public void setProductSpecifications(String productSpecifications) {
		ProductSpecifications = productSpecifications;
	}
	public String getCvPrice() {
		return cvPrice;
	}
	public void setCvPrice(String cvPrice) {
		this.cvPrice = cvPrice;
	}
	public String getPvPrice() {
		return pvPrice;
	}
	public void setPvPrice(String pvPrice) {
		this.pvPrice = pvPrice;
	}
	public String getQTY() {
		return QTY;
	}
	public void setQTY(String qTY) {
		QTY = qTY;
	}
	public String getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(String subtotal) {
		this.subtotal = subtotal;
	}
	public String getOrderQTY() {
		return OrderQTY;
	}
	public void setOrderQTY(String orderQTY) {
		OrderQTY = orderQTY;
	}
	@Override
	public String toString() {
		return "Product [ProductName=" + ProductName + ", ProductSpecifications=" + ProductSpecifications + ", cvPrice="
				+ cvPrice + ", pvPrice=" + pvPrice + ", QTY=" + QTY + ", OrderQTY=" + OrderQTY + ", subtotal="
				+ subtotal + "]";
	}
	
	
	
	
	
	

}
