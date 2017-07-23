$(document).ready(function() {

    
	loadPageContentData();
});	

function loadPageContentData(){
	var expand = {	
			"OrderCustomer" : {
	            "TargetTypeName": "Users"
	        }
	};
	var filter ={};
	
	var orderID = $("#orderIDValue").val();
	
	pullDataFromCloudFunction("Order/"+orderID,"READ","",expand,listOrderDetailsCallback,filter);
	
	expand = {	
			"Product" : {
	            "TargetTypeName": "Product",
	            "Expand" : {
	            	"ProductImages":{
	            		"TargetTypeName": "Files"
	            	}
	            }
	        }
	};
	filter = {
		"OrderNumber" : orderID	
	}
	pullDataFromCloudFunction("ProductOrder","READ","",expand,listOrderProductsCallback,filter);

}

function timeFormat(datetime){
	var rtnDatetime = "";
	if (jsObjNotNullOrUndefined(datetime)) {
		rtnDatetime = datetime.replace("T", " ");
		rtnDatetime = rtnDatetime.substring(0,19);
	}
	return rtnDatetime;
}

//Rules Name, CV, PV, Start Date, End Date
function listOrderDetailsCallback(data){
	var orderStatus = new LinkedMap();
	orderStatus.put("0","Unpaid");
	orderStatus.put("1","Paid");
	orderStatus.put("2","Canceled");
	
	var orderDetails = data.Result;
	console.log("orderDetails:",orderDetails);
	var shipItem = orderDetails.ShippingItem;
	console.log("shipItem"+shipItem);
	//if(shipItem!=null && shipItem!=""){
		
		//pullDataFromCloudWithToken("ShippingFee", "READ", "", "", "","", listAllShippingFeeCallback);
	 	pullDataFromCloudWithToken2("TaxRate", "READ", "", "", "","", function(data){
	 		var strBuffer = new StringBuffer(); 
	 		strBuffer.append("<tr rowID='"+orderDetails.Id+"'>");
	 		strBuffer.append("<td>"+orderDetails.OrderNumber+"</td>");
	 		strBuffer.append("<td>"+timeFormat(orderDetails.CreatedAt)+"</td>"); //new Date(orderDetails.CreatedAt).Format('yyyy-mm-dd HH:mm:ss')
	 		strBuffer.append("<td>"+orderDetails.totalPrice+"</td>");
	 		var taxRate = data.Result[0].TaxRate
	 		if(data.Result[0].TaxStatus==1){
	 			if(taxRate!=null && taxRate!="undefined"){
		 			taxRate = taxRate*100;
		 			strBuffer.append("<td>"+taxRate+"%"+"</td>");
		 		} else{
		 			strBuffer.append("<td>N/A</td>");
		 		}
	 		}else{
	 			
		 			strBuffer.append("<td></td>");
		 		
	 		}
	 		
	 		strBuffer.append("<td>"+orderStatus.get(""+orderDetails.Status)+"</td>");
	 		strBuffer.append("</tr>");
	 		$('#orderInfos tbody').html(strBuffer.toString());
	 		
	 		var customerInfos = orderDetails.OrderCustomer;
	 		if(jsObjNotNullOrUndefined(customerInfos)){
	 			var strBuffer = new StringBuffer(); 
	 			strBuffer.append("<tr rowID='"+customerInfos.Id+"'>");
	 			strBuffer.append("<td>"+customerInfos.FullName+"</td>");
	 			strBuffer.append("<td>"+customerInfos.Email+"</td>");
	 			strBuffer.append("<td>"+customerInfos.HomeAddress+"</td>");
	 			
	 			var deliveryAddress = customerInfos.DeliveryAddress;
	 			if(deliveryAddress == null || deliveryAddress == undefined || deliveryAddress == ''){
	 				deliveryAddress = "N/A";
	 			}
	 			strBuffer.append("<td>"+deliveryAddress+"</td>");
	 			strBuffer.append("<td>"+customerInfos.ContactNumber+"</td>");
	 			strBuffer.append("</tr>");
	 			$('#customerInfos tbody').html(strBuffer.toString());
	 		}
	 		
	 	}, 0, 50);
	//}
	
}

function listOrderProductsCallback(data){

	var orderProducts = data.Result;
	var strBuffer = new StringBuffer(); 
	
	for ( var index in orderProducts) {
		var orderProduct = orderProducts[index];
		var productRow = orderProduct.Product;
		if (jsObjNotNullOrUndefined(productRow)) {
			var productFirstImg = "";
			if (jsObjNotNullOrUndefined(productRow.ProductImages)&&productRow.ProductImages.length>0) {
				productFirstImg = "<br><img height='30px;' width='30px;' src='"+productRow.ProductImages[0].Uri+"'></img>";
			}
			
			var descriptionDisplay = ""
			if (jsObjNotNullOrUndefined(productRow.ProductDescription)&&productRow.ProductDescription.length>0) {
				var length = productRow.ProductDescription[0].length;
				var descriptionDisplayUpdate = productRow.ProductDescription[0].substring(0,50)+"...";
				descriptionDisplay = length<50?productRow.ProductDescription[0]:descriptionDisplayUpdate;
			}
			
			strBuffer.append("<tr rowID='"+orderProduct.Id+"' rowProductID='"+productRow.Id+"'>");
			strBuffer.append("<td>"+productRow.ProductID+" ---- "+productRow.ProductName+productFirstImg+"</td>");
			strBuffer.append("<td>"+descriptionDisplay+"</td>");
			strBuffer.append("<td>"+productRow.cvPrice+"</td>");
			strBuffer.append("<td>"+orderProduct.OrderQTY+"</td>");
			strBuffer.append("<td>"+productRow.cvPrice*orderProduct.OrderQTY+"</td>");
			strBuffer.append("</tr>");
		}
	}

	$('#productsInfos tbody').html(strBuffer.toString());
}
