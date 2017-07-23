package com.ceosoftcenters.air2u.model;

public class Permissions {
	
	public String CanRead;
	public String CanUpdate;
	public String CanDelete;
	public Permissions() {
		super();
	}
	public String getCanRead() {
		return CanRead;
	}
	public void setCanRead(String canRead) {
		CanRead = canRead;
	}
	public String getCanUpdate() {
		return CanUpdate;
	}
	public void setCanUpdate(String canUpdate) {
		CanUpdate = canUpdate;
	}
	public String getCanDelete() {
		return CanDelete;
	}
	public void setCanDelete(String canDelete) {
		CanDelete = canDelete;
	}
	@Override
	public String toString() {
		return "Permissions [CanRead=" + CanRead + ", CanUpdate=" + CanUpdate + ", CanDelete=" + CanDelete + "]";
	}
	
	

}
