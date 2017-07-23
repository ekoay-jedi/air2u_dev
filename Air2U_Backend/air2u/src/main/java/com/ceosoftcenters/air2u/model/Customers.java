package com.ceosoftcenters.air2u.model;

public class Customers {

	private String Username;
	private String Status;
	private String Email;
	private String Card;
	private String LatestAwardedPoint;
	private String CurrentPoint;
	private String ContactNumber;
	private String AppRoles;
	private String Avatar;
	private String IsVerified;
	
	private String IdentityProvider;
	private String Role;
	private String CreatedAt;
	private String ModifiedAt;
	private String CreatedBy;
	private String ModifiedBy;
	private String Owner;
	private String FullName;
	private String Id;
	private String Meta;
	private String Permissions;
	
	private String IntroducerEmail;
	private String IntroducerContact;
	private String IntroducerName;
	private String DisplayName;
	private String HomeAddress;
	
	
	
	public String getHomeAddress() {
		return HomeAddress;
	}


	public void setHomeAddress(String homeAddress) {
		HomeAddress = homeAddress;
	}


	public String getDisplayName() {
		return DisplayName;
	}


	public void setDisplayName(String displayName) {
		DisplayName = displayName;
	}


	public Permissions permissions;
	

	public Customers() {
		super();
	}


	public String getUsername() {
		return Username;
	}


	public void setUsername(String username) {
		Username = username;
	}


	public String getStatus() {
		return Status;
	}


	public void setStatus(String status) {
		Status = status;
	}


	public String getEmail() {
		return Email;
	}


	public void setEmail(String email) {
		Email = email;
	}


	public String getCard() {
		return Card;
	}


	public void setCard(String card) {
		Card = card;
	}


	public String getLatestAwardedPoint() {
		return LatestAwardedPoint;
	}


	public void setLatestAwardedPoint(String latestAwardedPoint) {
		LatestAwardedPoint = latestAwardedPoint;
	}


	public String getCurrentPoint() {
		return CurrentPoint;
	}


	public void setCurrentPoint(String currentPoint) {
		CurrentPoint = currentPoint;
	}


	public String getContactNumber() {
		return ContactNumber;
	}


	public void setContactNumber(String contactNumber) {
		ContactNumber = contactNumber;
	}


	public String getAppRoles() {
		return AppRoles;
	}


	public void setAppRoles(String appRoles) {
		AppRoles = appRoles;
	}


	public String getAvatar() {
		return Avatar;
	}


	public void setAvatar(String avatar) {
		Avatar = avatar;
	}


	public String getIsVerified() {
		return IsVerified;
	}


	public void setIsVerified(String isVerified) {
		IsVerified = isVerified;
	}


	public String getIdentityProvider() {
		return IdentityProvider;
	}


	public void setIdentityProvider(String identityProvider) {
		IdentityProvider = identityProvider;
	}


	public String getRole() {
		return Role;
	}


	public void setRole(String role) {
		Role = role;
	}


	public String getCreatedAt() {
		return CreatedAt;
	}


	public void setCreatedAt(String createdAt) {
		CreatedAt = createdAt;
	}


	public String getModifiedAt() {
		return ModifiedAt;
	}


	public void setModifiedAt(String modifiedAt) {
		ModifiedAt = modifiedAt;
	}


	public String getCreatedBy() {
		return CreatedBy;
	}


	public void setCreatedBy(String createdBy) {
		CreatedBy = createdBy;
	}


	public String getModifiedBy() {
		return ModifiedBy;
	}


	public void setModifiedBy(String modifiedBy) {
		ModifiedBy = modifiedBy;
	}


	public String getOwner() {
		return Owner;
	}


	public void setOwner(String owner) {
		Owner = owner;
	}


	public String getFullName() {
		return FullName;
	}


	public void setFullName(String fullName) {
		FullName = fullName;
	}


	public String getId() {
		return Id;
	}


	public void setId(String id) {
		Id = id;
	}


	public String getMeta() {
		return Meta;
	}


	public void setMeta(String meta) {
		Meta = meta;
	}


	public String getPermissions() {
		return Permissions;
	}
	
	


	public void setPermissions(String permissions) {
		Permissions = permissions;
	}


	public void setPermissions(Permissions permissions) {
		this.permissions = permissions;
	}


	public String getIntroducerEmail() {
		return IntroducerEmail;
	}


	public void setIntroducerEmail(String introducerEmail) {
		IntroducerEmail = introducerEmail;
	}


	public String getIntroducerContact() {
		return IntroducerContact;
	}


	public void setIntroducerContact(String introducerContact) {
		IntroducerContact = introducerContact;
	}


	public String getIntroducerName() {
		return IntroducerName;
	}


	public void setIntroducerName(String introducerName) {
		IntroducerName = introducerName;
	}


	@Override
	public String toString() {
		return "Customers [Username=" + Username + ", Status=" + Status + ", Email=" + Email + ", Card=" + Card
				+ ", LatestAwardedPoint=" + LatestAwardedPoint + ", CurrentPoint=" + CurrentPoint + ", ContactNumber="
				+ ContactNumber + ", AppRoles=" + AppRoles + ", Avatar=" + Avatar + ", IsVerified=" + IsVerified
				+ ", IdentityProvider=" + IdentityProvider + ", Role=" + Role + ", CreatedAt=" + CreatedAt
				+ ", ModifiedAt=" + ModifiedAt + ", CreatedBy=" + CreatedBy + ", ModifiedBy=" + ModifiedBy + ", Owner="
				+ Owner + ", FullName=" + FullName + ", Id=" + Id + ", Meta=" + Meta + ", Permissions=" + Permissions
				+ ", IntroducerEmail=" + IntroducerEmail + ", IntroducerContact=" + IntroducerContact
				+ ", IntroducerName=" + IntroducerName + ", permissions=" + permissions + "]";
	}


	
	



	
	
	
	
}
