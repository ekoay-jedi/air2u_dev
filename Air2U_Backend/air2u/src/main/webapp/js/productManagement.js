var productIds = "";

var ImgIdresult = [];
var ImgIdresult2 = [];	

var uploadFlag = false;

var currentPage =0;
var currentnum = 10;

$(document).ready(function() {
	// set the selected menu highlighted.
	$('#side-menu').children('a').removeClass("active");
	$('.Admin-Product').addClass("active");
	// loadCategoryTreeData(); 
	loadPageContentData();
	
	loadAllPageContentData();

	// 点击增加按钮
	//$('.upload-icon').bind('click', addMore);
	// 点击增加按钮
	$('.upload-icon').on('click', addMore);

	$('.close-img').on('click', function(){
		$('#show').attr('src', '');
		$('#show2').attr('src', '');
		$('.show-image').eq(0).css('display', 'none');
		
		$('.show-image2').eq(0).css('display', 'none');
	});
	
	var input = $('#upload1');
	
	
	ImgIdresult = [];
	$('.upload-style').each(function (index, element){
		
		$('.upload-group').on('change', '.upload-file', function(){
			
			var _this = this;
			
			var file = this.files[0];
		    if (window.FileReader) {    
	            
		    	var reader = new FileReader();
	            reader.readAsDataURL(file);
	            
	            //监听文件读取结束后事件    
	            reader.onloadend = function (e) {
	            	var imgSrc = e.target.result;
	            	var imgName = "img";
	    			
	    			var imageBase64 = imgSrc.substring(imgSrc.indexOf(',') + 1, imgSrc.length);
	    			 
	    			var fileObj = {
	    							"id": getNewGUID(),
	    							"Filename" : imgName,
	    							"ContentType" : "image/png",
	    							"base64" : imageBase64
	    						   };
	    			
	    			pullDataFromCloudWithToken("Files", "CREATE", fileObj, "", "", "", 
	    				function(data) {
	    					imgId = data.Result.Id;
	    					ImgIdresult.push(imgId);
	    					
	    					var expand = {}
	    					var fieldsReturn = {
	    						"Id" : 1,
	    						"Filename" : 1,
	    						"Length" : 1,
	    						"Uri" : 1
	    					};
	    					
	    					pullDataFromCloudWithToken("Files/" + imgId, "READ", "", expand, "", fieldsReturn, function(){
	    						var imgURL = data.Result.Uri;
	    						
	    						$(_this).parent().html("<img src='" + imgURL + "' id='" + (num) + "' name='"+imgId +"'	class='he_border1_img img-style'/>"+
	  								  "<div class='entity' >"+
	        	   							 "<a href='#' class='view' id='view" + (num-1) + "'>View</a>"+
	          						 	 "<a href='#' class='delete' id='view" + (num-1) + "'>Delete</a>"+
	          					      "</div>");

	    						uploadFlag = true;
	    						
	    						
	    						//$("#img-upload1").attr('src', imgURL);
	    					});
	    					
	    			});
	            };    
	           
	            $('.upload-group').on('mouseover', '.upload-style', function() {
	     			$(this).children().eq(1).eq(index).css('display', 'block')
	     		})

	     		$('.upload-group').on('mouseout', '.upload-style', function() {
	     			$(this).children().eq(1).eq(index).css('display', 'none')
	        	})

	        	
	        	$('.upload-group').on('click', '.view', function(){
	    			var viewId = "";
	    			viewId = $(this).attr('id');
	    			if(viewId != null && viewId != undefined && viewId != ''){
	    				expandPhoto(viewId)
	    			}
	    		})

	    		$('.upload-group').on('click', '.delete', function(){
	    			// 删除
	    			var viewId = $(this).attr('id');
	    			
	    			var imageIdIndex = $(this).parent().parent().find('img').attr('id');
	    			//imgId = data.Result.Id;
	    			console.log("删除前："+ImgIdresult);
	    			console.log(imageIdIndex);
	    			
	    			ImgIdresult.splice(imageIdIndex, 1);
	    			
	    			var imageId = $(this).parent().parent().find('img').attr('name');
	    			
	    			if(imageId != null && imageId != 'undefined' && imageId != ''){
	    				var el = new Everlive('emqn75r4njlqhrtx');
	        			el.Files.destroySingle({ Id: imageId },
	        			    function(){
	        			        alert('File successfully deleted.');
	        			    },
	        			    function(error){
	        			        alert(JSON.stringify(error));
	        			    });
	    				console.log("删除后："+ImgIdresult);
	    			}
	    			
	    			$(this).parent().parent().css('display', 'none');

	    			$(this).parent().parent().html("");
	    		});
	       } 
			
		})
		
		//----------------edit
		$('.upload-style2').each(function (index, element){
			$('.upload-group2').on('change', '.upload-file', function(){
				
				var _this = this;
				
				var file = this.files[0];
			    if (window.FileReader) {    
		            
			    	var reader = new FileReader();
		            reader.readAsDataURL(file);
		            
		            //监听文件读取结束后事件    
		            reader.onloadend = function (e) {
		            	var imgSrc = e.target.result;
		            	var imgName = "img";
		    			
		    			var imageBase64 = imgSrc.substring(imgSrc.indexOf(',') + 1, imgSrc.length);
		    			 
		    			var fileObj = {
		    							"id": getNewGUID(),
		    							"Filename" : imgName,
		    							"ContentType" : "image/png",
		    							"base64" : imageBase64
		    						   };
		    			
		    			pullDataFromCloudWithToken("Files", "CREATE", fileObj, "", "", "", 
		    				function(data) {
		    					imgId = data.Result.Id;
		    					ImgIdresult2.push(imgId);
		    					
		    					var expand = {}
		    					var fieldsReturn = {
		    						"Id" : 1,
		    						"Filename" : 1,
		    						"Length" : 1,
		    						"Uri" : 1
		    					};
		    					
		    					pullDataFromCloudWithToken("Files/" + imgId, "READ", "", expand, "", fieldsReturn, function(){
		    						var imgURL = data.Result.Uri;
		    						
		    						$(_this).parent().html("<img src='" + imgURL + "' id='" + (num) + "' name='"+imgId +"'	class='he_border1_img img-style'/>"+
		  								  "<div class='entity'  style='display:block;'>"+
		        	   							 "<a href='#' class='view' id='view" + (num) + "'>View</a>"+
		          						 	 "<a href='#' class='delete' id='view" + (num) + "'>Delete</a>"+
		          					      "</div>");

		    						uploadFlag = true;
		    						
		    						console.log("add new =>ImgIdresult："+ImgIdresult2);
		    						//$("#img-upload1").attr('src', imgURL);
		    					});
		    					
		    			});
		            };    
		           
		            console.log("添加新图后："+ImgIdresult2);
		            
		            $('.upload-group2').on('mouseover', '.upload-style2', function() {
		     			$(this).children().eq(1).eq(index).css('display', 'block')
		     		})

		     		$('.upload-group2').on('mouseout', '.upload-style2', function() {
		     			$(this).children().eq(1).eq(index).css('display', 'none')
		        	})
		       } 
				
			})
			
		})	
	})
	
	$('.upload-group2').on('click', '.view', function(){
		var viewId = "";
		viewId = $(this).attr('id');
		console.log("1111"+viewId);
		if(viewId != null && viewId != undefined && viewId != ''){
			expandPhoto(viewId)
		}
		
	})
		    		
	$('.upload-group2').on('click', '.delete', function(){
		// 删除
		var viewId = $(this).attr('id');
		
		var imageIdIndex = $(this).parent().parent().find('img').attr('id');
		//imgId = data.Result.Id;
		console.log("删除前："+ImgIdresult2);
		console.log(imageIdIndex);
		
		ImgIdresult2.splice(imageIdIndex, 1);
		
		var imageId = $(this).parent().parent().find('img').attr('name');
		
		if(imageId != null && imageId != 'undefined' && imageId != ''){
			var el = new Everlive('emqn75r4njlqhrtx');
			el.Files.destroySingle({ Id: imageId },
			    function(){
					
			        alert('File successfully deleted.');
			    },
			    function(error){
			        alert(JSON.stringify(error));
			    });
			
			console.log("删除后："+ImgIdresult2);
		}
		
		$(this).parent().parent().css('display', 'none');

		$(this).parent().parent().html("");
	});
	
	//*****************************************
	getCategory("Search");
	$(".select-opr").unbind('click').bind('click', function(){
		var select_productid = $("input[name='select_productid']").val();
		var select_productname = $("input[name='select_productname']").val();
		var select_pt = $("input[name='select_pt']").val();
		var select_cv = $("input[name='select_cv']").val();
		var select_qty = $("input[name='select_qty']").val();
		
		var select_category = $("#select_category").val();
		var select_producttype = $("#select_producttype").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(select_productid) && select_productid != ""){
			var select_productidFilter = {"ProductID": {"$regex": ".*" + select_productid + ".*"}};
			filters.push(select_productidFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_productname) && select_productname != ""){
			var select_productnameFilter = {"ProductName": {"$regex": ".*" + select_productname + ".*"}};
			filters.push(select_productnameFilter);
		}
		if(jsObjNotNullOrUndefined(select_pt) && select_pt !=""){
			var select_ptFilter = {"pvPrice": {"$eq": select_pt }};
			filters.push(select_ptFilter);
		}
		if(jsObjNotNullOrUndefined(select_cv) && select_cv !=""){
			var select_cvFilter = {"cvPrice": {"$eq": select_cv }};
			filters.push(select_cvFilter);
		}
		if(jsObjNotNullOrUndefined(select_qty) && select_qty !=""){
			var select_qtyFilter = {"QTY": {"$eq": select_qty }};
			filters.push(select_qtyFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_producttype) && select_producttype !="" && select_producttype != '-1'){
			var select_producttypeFilter = {"productType": {"$eq": select_producttype }};
			filters.push(select_producttypeFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_category) && select_category !="" && select_category != '0'){
			var select_categoryFilter = {"ProductCategory": {"$all": [select_category] }};
			filters.push(select_categoryFilter);
		}
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		
		var expand = {
				"ProductCategory" : {
					"TargetTypeName" : "Category",
					"Fields" : {
						"Id" : 1,
						"Categoryname" : 1,
						"Pid" : 1
					},
					"Expand" : {
						"Pid" : {
							"TargetTypeName" : "Category",
							"Fields" : {
								"Id" : 1,
								"Categoryname" : 1,
								"Pid" : 1
							},
							"ReturnAs" : "ParentCategory"
						}
					}
				}
			}

		currentPage =0;
		pullDataFromCloudWithToken2("Product", "READ", "", expand, filter,
					"", listAllProductCallback,0, 10);
	});
	
});


function viewImg(){
	var viewId = $(this).attr('id');

	expandPhoto(viewId);
}


//添加元素
var num = 1;

function addMore() {
	if(uploadFlag){
		var div = document.createElement('div')
		var icon = $('.upload-icon')[0];
	
		var span = document.createElement('span')
		span.classList.add('upload-text')
		div.appendChild(span)
		num = num+1;
		console.log("num:"+num);
		var input = document.createElement('input')
		input.classList.add('upload-file')
		input.type = 'file'
		input.accept = 'image/jpeg, image/png'
		input.id = 'upload' + num
		div.appendChild(input)
	
	
		div.classList.add('upload-style')
		document.getElementsByClassName('upload-group')[0].insertBefore(div, icon)
		
	}else{
		alert("Please upload image firstly.");
	}

	uploadFlag = false;

	
}
var uploadFlag2 = true;

function addMore2() {
	/*if(ImgIdresult2.length>5){
		$(".upload-group2").find(".upload-icon").before("");
		$(".upload-group2").find(".upload-icon").attr('display','none');

	}else{*/
		if(uploadFlag2){
			$(".upload-group2").find(".upload-icon").before("<div class='upload-style2'>" +
											"<span class='upload-text'></span>" +
											"<input class='upload-file' type='file' accept='image/jpeg, image/png' id='upload1'>" +
										"</div>")
			num = num+1;
		}else{
			alert("Please upload image firstly.");
		}
	//}
	

	uploadFlag = false;

	
}

function expandPhoto(viewId){ 
	
	var src = $("#"+viewId).parent().parent().eq(0).find('img').attr('src');
	
	if(src != null && src != 'undefined'){
		$('#show').attr('src', src)
		$('.show-image').eq(0).css('display', 'block')
		
		$('#show2').attr('src', src)
		$('.show-image2').eq(0).css('display', 'block')
	}
	
	
}  


function loadAllPageContentData(){
	var expand = {
			
		}
					
	pullDataFromCloudWithToken("ProductOrder", "READ", "", expand, "","", listAllProductCallback2);
}

function loadPageContentData() {
	var expand = {
		"ProductCategory" : {
			"TargetTypeName" : "Category",
			"Fields" : {
				"Id" : 1,
				"Categoryname" : 1,
				"Pid" : 1
			},
			"Expand" : {
				"Pid" : {
					"TargetTypeName" : "Category",
					"Fields" : {
						"Id" : 1,
						"Categoryname" : 1,
						"Pid" : 1
					},
					"ReturnAs" : "ParentCategory"
				}
			}
		}
	}
				
	//pullDataFromCloudWithToken("Product", "READ", "", expand, "","", listAllProductCallback);
	pullDataFromCloudWithToken2("Product", "READ", "", expand, "",
			"", listAllProductCallback,0, 10);
}

function previousAdd(){
	currentPage = currentPage -1;
	
	var expand = {
			"ProductCategory" : {
				"TargetTypeName" : "Category",
				"Fields" : {
					"Id" : 1,
					"Categoryname" : 1,
					"Pid" : 1
				},
				"Expand" : {
					"Pid" : {
						"TargetTypeName" : "Category",
						"Fields" : {
							"Id" : 1,
							"Categoryname" : 1,
							"Pid" : 1
						},
						"ReturnAs" : "ParentCategory"
					}
				}
			}
		}
	
	$('.next').removeClass('disabled');	
	if(currentPage < 0){
		currentPage =0;
		$(".previous").addClass('disabled');
	}else{
		var select_productid = $("input[name='select_productid']").val();
		var select_productname = $("input[name='select_productname']").val();
		var select_pt = $("input[name='select_pt']").val();
		var select_cv = $("input[name='select_cv']").val();
		var select_qty = $("input[name='select_qty']").val();
		
		var select_category = $("#select_category").val();
		var select_producttype = $("#select_producttype").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(select_productid) && select_productid != ""){
			var select_productidFilter = {"ProductID": {"$regex": ".*" + select_productid + ".*"}};
			filters.push(select_productidFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_productname) && select_productname != ""){
			var select_productnameFilter = {"ProductName": {"$regex": ".*" + select_productname + ".*"}};
			filters.push(select_productnameFilter);
		}
		if(jsObjNotNullOrUndefined(select_pt) && select_pt !=""){
			var select_ptFilter = {"pvPrice": {"$eq": select_pt }};
			filters.push(select_ptFilter);
		}
		if(jsObjNotNullOrUndefined(select_cv) && select_cv !=""){
			var select_cvFilter = {"cvPrice": {"$eq": select_cv }};
			filters.push(select_cvFilter);
		}
		if(jsObjNotNullOrUndefined(select_qty) && select_qty !=""){
			var select_qtyFilter = {"QTY": {"$eq": select_qty }};
			filters.push(select_qtyFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_producttype) && select_producttype !="" && select_producttype != '-1'){
			var select_producttypeFilter = {"productType": {"$eq": select_producttype }};
			filters.push(select_producttypeFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_category) && select_category !="" && select_category != '0'){
			var select_categoryFilter = {"ProductCategory": {"$all": [select_category] }};
			filters.push(select_categoryFilter);
		}
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		
		var expand = {
				"ProductCategory" : {
					"TargetTypeName" : "Category",
					"Fields" : {
						"Id" : 1,
						"Categoryname" : 1,
						"Pid" : 1
					},
					"Expand" : {
						"Pid" : {
							"TargetTypeName" : "Category",
							"Fields" : {
								"Id" : 1,
								"Categoryname" : 1,
								"Pid" : 1
							},
							"ReturnAs" : "ParentCategory"
						}
					}
				}
			}

		//currentPage =0;
		pullDataFromCloudWithToken2("Product", "READ", "", expand, filter,
					"", listAllProductCallback,currentPage, 10);
		
		/*pullDataFromCloudWithToken2("Product", "READ", "", expand, "",
				"", listAllProductCallback,currentPage, 10);*/
	}
};

function nextAdd(){
	var expand = {
			"ProductCategory" : {
				"TargetTypeName" : "Category",
				"Fields" : {
					"Id" : 1,
					"Categoryname" : 1,
					"Pid" : 1
				},
				"Expand" : {
					"Pid" : {
						"TargetTypeName" : "Category",
						"Fields" : {
							"Id" : 1,
							"Categoryname" : 1,
							"Pid" : 1
						},
						"ReturnAs" : "ParentCategory"
					}
				}
			}
		}
	
	$(".previous").removeClass('disabled');
	if(currentnum < 10){
		
	}else{
		if(currentPage<0){
			currentPage = 0;
		}
		
		var select_productid = $("input[name='select_productid']").val();
		var select_productname = $("input[name='select_productname']").val();
		var select_pt = $("input[name='select_pt']").val();
		var select_cv = $("input[name='select_cv']").val();
		var select_qty = $("input[name='select_qty']").val();
		
		var select_category = $("#select_category").val();
		var select_producttype = $("#select_producttype").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(select_productid) && select_productid != ""){
			var select_productidFilter = {"ProductID": {"$regex": ".*" + select_productid + ".*"}};
			filters.push(select_productidFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_productname) && select_productname != ""){
			var select_productnameFilter = {"ProductName": {"$regex": ".*" + select_productname + ".*"}};
			filters.push(select_productnameFilter);
		}
		if(jsObjNotNullOrUndefined(select_pt) && select_pt !=""){
			var select_ptFilter = {"pvPrice": {"$eq": select_pt }};
			filters.push(select_ptFilter);
		}
		if(jsObjNotNullOrUndefined(select_cv) && select_cv !=""){
			var select_cvFilter = {"cvPrice": {"$eq": select_cv }};
			filters.push(select_cvFilter);
		}
		if(jsObjNotNullOrUndefined(select_qty) && select_qty !=""){
			var select_qtyFilter = {"QTY": {"$eq": select_qty }};
			filters.push(select_qtyFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_producttype) && select_producttype !="" && select_producttype != '-1'){
			var select_producttypeFilter = {"productType": {"$eq": select_producttype }};
			filters.push(select_producttypeFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_category) && select_category !="" && select_category != '0'){
			var select_categoryFilter = {"ProductCategory": {"$all": [select_category] }};
			filters.push(select_categoryFilter);
		}
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		
		var expand = {
				"ProductCategory" : {
					"TargetTypeName" : "Category",
					"Fields" : {
						"Id" : 1,
						"Categoryname" : 1,
						"Pid" : 1
					},
					"Expand" : {
						"Pid" : {
							"TargetTypeName" : "Category",
							"Fields" : {
								"Id" : 1,
								"Categoryname" : 1,
								"Pid" : 1
							},
							"ReturnAs" : "ParentCategory"
						}
					}
				}
			}

		/*//currentPage =0;
		pullDataFromCloudWithToken2("Product", "READ", "", expand, filter,
					"", listAllProductCallback,currentPage, 10);*/
		
		currentPage = currentPage +1;
		pullDataFromCloudWithToken2("Product", "READ", "", expand, filter,
				"", listAllProductCallback,currentPage, 10);
	}
}
var allExistedProductIds = "";


function listAllProductCallback2(data) {
	allExistedProductIds = "";
	var allps = data.Result;
	for ( var index in allps) {
		var pRow = allps[index];
		var p = pRow.Product;
		if(p!=null){
			allExistedProductIds = allExistedProductIds+" "+p;
			}
		}
}

function judgeProductHasOrder(pid){
	var retVal = true;
	if(allExistedProductIds.indexOf(pid) > 0){
		retVal= false;
	}
	return retVal;
}

function listAllProductCallback(data) {
	productIds = "";
	var allProducts = data.Result;
	
	currentnum = allProducts.length;
	
	var sumCount = JSON.stringify(data.Count);
	var currentCount = currentnum;
	
	if(currentnum > 10){
		currentnum = 10;
	}
	
	if(currentCount == 0 && sumCount == 0){
		$('.pager-fenye-tip').html("No data available.");
	}else if(currentCount == 0 && sumCount !=0){
		$('.pager-fenye-tip').html("Page: "+ convertData(currentPage + 1) +", 0 of " + sumCount +" items.");
	}else{
		if(parseInt(currentPage + 1) == 1){
			$('.pager-fenye-tip').html("Page: "+ convertData(currentPage + 1) +", 1 - "+  currentCount + " of " + sumCount +" items.");
		}else{
			$('.pager-fenye-tip').html("Page: "+ convertData(currentPage + 1) +", " +
					(parseInt(currentPage)*10 +1) + " - "+  parseInt((parseInt(currentPage)*10) + currentCount) + " of " + sumCount +" items.");
		}
	}
	
	$('.fenye-list').html("<li><a href='#' class='previous' onclick='previousAdd();'>Previous</a></li>" +
						  "<li><a href='#' class='next' onclick='nextAdd();'>Next</a></li>");
	
	
	var strBuffer = new StringBuffer();
	var parentCategory;
	var category;
	var categoryId;
	var cateImgUrl;
	strBuffer.append("<table width='100%;' class='table dataTable table-striped table-bordered table-hover  dataTable no-footer dtr-inline' id='product_table'>");
	strBuffer.append("<thead>");
	strBuffer.append("<tr class='table-header'>");
	strBuffer.append("<th width='5%'>#</th>");
	strBuffer.append("<th width='15%'>Product ID</th>");
	strBuffer.append("<th width='15%'>Product Name</th>");
	strBuffer.append("<th width='10%'>Air pt</th>");
	strBuffer.append("<th width='10%'>CV(RM)</th>");
	strBuffer.append("<th width='10%'>QTY</th>");
	strBuffer.append("<th width='15%'>Category</th>");
	strBuffer.append("<th width='15%'>Sub Category</th>");
	strBuffer.append("<th width='15%'>Product Type</th>");
	strBuffer.append("<th width='5%'>Operation</th>");
	strBuffer.append("</tr>");
	strBuffer.append("</thead>");
	strBuffer.append("<tbody>");
	
	var productTypes = new LinkedMap();
	productTypes.put("0","Only Cash");
	productTypes.put("1","Only Point");
	productTypes.put("2","Cash+Point");
	
	for ( var index in allProducts) {
		var productRow = allProducts[index];
		var productNum = parseInt(index) + 1;
		// alert(categoryRow.ParentCategory);
		if (productRow.ProductCategory != null && productRow.ProductCategory != undefined && productRow.ProductCategory !=""){
			category = productRow.ProductCategory.Categoryname ;
			categoryId = productRow.ProductCategory.Id;
			if(productRow.ProductCategory.ParentCategory != null && productRow.ProductCategory.ParentCategory != undefined && productRow.ProductCategory.ParentCategory !=""){
				parentCategory = productRow.ProductCategory.ParentCategory.Categoryname;
			}else{
				parentCategory = "No Category";
			}
		}else{
			category = "No Sub Category";
			categoryId = "";
		}
//		parentCategory = (productRow.ProductCategory.Category == null) ? "No Category" : productRow.ProductCategory.Category;
//		pid = (categoryRow.Pid == undefined) ? "" : categoryRow.Pid;
//		parentId = (categoryRow.ParentCategory == null) ? "" : categoryRow.ParentCategory.Id;
//		cateImgUrl = (categoryRow.cateImgUrl == undefined) ? ""	: categoryRow.cateImgUrl;
		// alert(categoryRow.ParentCategory);
//		if(productRow.ProductDescription == null && productRow.ProductDescription == undefined && productRow.ProductDescription ==""){
//			
//		}
		var productId = productRow.ProductID;
		productIds = productIds+" "+productId;
		strBuffer.append("<tr rowID='" + productRow.Id + "' name='"+ productRow.ProductImages +"' value='" + productRow.ProductDescription +"'>");
		strBuffer.append("<td>" + productNum + "</td>");
		strBuffer.append("<td>" + productId + "</td>");
		strBuffer.append("<td>" + productRow.ProductName + "</td>");
		strBuffer.append("<td>" + productRow.pvPrice + "</td>");
		strBuffer.append("<td>" + productRow.cvPrice + "</td>");
		strBuffer.append("<td>" + productRow.QTY + "</td>");
		
		strBuffer.append("<td>" + parentCategory + "</td>");
		strBuffer.append("<td name = '" + categoryId + "'>" + category + "</td>");
		
		if(productRow.productType == null || productRow.productType == undefined || productRow.productType == ""){
			strBuffer.append("<td>N/A</td>");
		}else{
			strBuffer.append("<td>" + productTypes.get(productRow.productType) + "</td>");
		}
		
		//strBuffer.append("<td type='hidden'>" + productRow.ProductDescription + "</td>");
		// strBuffer.append("<td>"+parentCategory+"</td>");
		strBuffer.append("<td><i class='glyphicon glyphicon-edit cursorPointer' onclick='updateProduct(this)'></i>  " +
				"  <i class='glyphicon glyphicon-remove cursorPointer' onclick='comfirmCheckOfDeleteProduct(this)'></i></td>");
		strBuffer.append("<input type='hidden' name='" + productRow.ProductDescription + "' value='" + productRow.ProductSpecifications + "' />");
		strBuffer.append("</tr>");
	}
	strBuffer.append("</tbody>");
	strBuffer.append("</table>");
	$('.tableDiv').html(strBuffer.toString());
	$('#product_table').DataTable({
		responsive : true,
		"autoWidth": false,
		"aoColumnDefs" : [ {
			"bSortable" : false,
			"aTargets" : [ 9 ]
		} ],
		"bAutoWidth": false 
	});
	
	$('#product_table_length').css({ display: "none"});
	$('#product_table_info').parent().parent().css({ display: "none"});
	$('#product_table_filter').css({ display: "none"});
	
	//$('#product_table').css("width","");
}

/** add category begin * */

function openAddCategory(){
	$("#addCategoryModal").modal('show');
	$("#addImgInput")
	.html(
			"<label class='control-label' for='categoryImageAdd'>Category Image:</label> "
					+ "<input id='categoryImageAdd' name='' type='file' multiple=true class='file-loading'>");
	initImageInputToAdd();
	getParentCategory("Add");
	
}
function initImageInputToAdd() {
	$('#categoryImageAdd').fileinput({
		allowedFileExtensions : [ 'jpg', 'png' ],
		showRemove : true,
		showUpload : false,
		browseClass: 'btn btn-primary'
	});
}

function getParentCategory(operationVal){
	var expand = {};
	var filter = { "Pid" : "0" };
	var fieldsReturn = {
		"Id" : 1,
		"Categoryname" : 1
	};
	var sortExp = { "Categoryname" : 1 };
	if (operationVal=="Add"){
		pullDataFromCloudWithTokenAndSort("Category", "READ", "", expand, filter ,fieldsReturn, sortExp, writeDataToParentCategoryAdd); //with field sort
	}else{
		pullDataFromCloudWithTokenAndSort("Category", "READ", "", expand, filter ,fieldsReturn, sortExp, writeDataToParentCategoryEdit); //with field sort
	}
}

var selectedCategory = '';

function writeDataToParentCategoryEdit(data){
	var category = data.Result;
	var strBuffer = new StringBuffer(); 
	strBuffer.append("<option value='' selected='selected'>No Parent Category</option>");
	for ( var index in category) {
		var categoryRow = category[index];
		if(selectedCategory == categoryRow.Categoryname){
			strBuffer.append("<option value='"+categoryRow.Id+"' selected>"+categoryRow.Categoryname+"</option>");
		}else{
			strBuffer.append("<option value='"+categoryRow.Id+"'>"+categoryRow.Categoryname+"</option>");
		}
		
	}
	$('#productCategoryEdit').html(strBuffer.toString());
	addProductModalSaveAndCancel();
	
}


function writeDataToParentCategoryAdd(data){
	var category = data.Result;
	var strBuffer = new StringBuffer(); 
	strBuffer.append("<option value='' selected='selected'>No Parent Category</option>");
	for ( var index in category) {
		var categoryRow = category[index];
		strBuffer.append("<option value='"+categoryRow.Id+"'>"+categoryRow.Categoryname+"</option>");
		 
	}
	$('#parentCategoryAdd').html(strBuffer.toString());
	addProductModalSaveAndCancel();
}


function saveCategory() {
	addModalSpinner();
	if (categoryInputsValidation($('#categoryAdd'))){
		saveImage();
	}else{
		addModalSaveAndCancel();
	}

}
function saveImage() { 
	var imgId; 

	// upload Img
	var imageSrc = $(".file-preview-image").attr("src");
	if (imageSrc == undefined || imageSrc == null || imageSrc == "") {
		imgId = "";
		createCategory(imgId);
	} else {

		imgId = uploadImg();
	}

}

function uploadImg() {
	var imageSrc = $(".file-preview-image").attr("src");
	var imageBase64 = imageSrc.substring(imageSrc.indexOf(",") + 1, imageSrc.length);
//	var imageBase64 = $(".file-preview-image").attr("src").replace(
//			"data:image/jpeg;base64,", "");
	var imageName = $(".file-caption-name").attr("title");
	
	var imgId;
	var fileObj = {
		"Filename" : imageName,
		"ContentType" : "image/png",
		"base64" : imageBase64
	};

	pullDataFromCloudWithToken("Files", "CREATE", fileObj, "", "", "",
			function(data) {
				imgId = data.Result.Id;
				createCategory(imgId);
			});
}

function createCategory(imgId) {
	var category;
	var categoryname = $('#categoryAdd').val();
	var pid; 
	var parentCategoryVal = $("#parentCategoryAdd").val();

	if(imgId == ""){
		category = {
				"Categoryname" : categoryname,
				"Pid" : parentCategoryVal  
			};
	}else{
		category = {
				"Categoryname" : categoryname,
				"Pid" : parentCategoryVal, 
				"cateImgUrl" : imgId
			};
	}
	
	
	pullDataFromCloudWithToken("Category", "CREATE", category, "", "", "", createCategoryCallback);
	 
	
}

/**
 * add category end
 */


/**
 * Add new Product begin
 */
/**
 * init Add Product begin
 */
function openAddProduct(){
	
	$("#addProductImgsInput")
	
	getCategory("Add");
	$("#addProductModal").modal('show');
}
function getCategory(operationVal){
	var expand = {};
	var filter = { "Pid" : { "$ne" : "0" } };
	var fieldsReturn = {
		"Id" : 1,
		"Categoryname" : 1
	};
	var sortExp = { "Categoryname" : 1 };
	if (operationVal=="Add"){
		pullDataFromCloudWithTokenAndSort("Category", "READ", "", expand, filter ,fieldsReturn, sortExp, writeDataToCategoryAdd); //with field sort
	}else if(operationVal=="Search"){
		pullDataFromCloudWithTokenAndSort("Category", "READ", "", expand, filter ,fieldsReturn, sortExp, writeDataToCategorySearch); //with field sort
	}else{
		pullDataFromCloudWithTokenAndSort("Category", "READ", "", expand, filter ,fieldsReturn, sortExp, writeDataToParentCategoryEdit); //with field sort
	}
	
 
}

function writeDataToCategoryAdd(data){
	var category = data.Result;
	var strBuffer = new StringBuffer(); 
	strBuffer.append("<option value='0' selected='selected'>No Category</option>");
	for ( var index in category) {
		var categoryRow = category[index];
		strBuffer.append("<option value='"+categoryRow.Id+"'>"+categoryRow.Categoryname+"</option>");
		 
	}
	$('#productCategoryAdd').html(strBuffer.toString());
	addProductModalSaveAndCancel();
}

function writeDataToCategorySearch(data){
	var category = data.Result;
	var strBuffer = new StringBuffer(); 
	strBuffer.append("<option value='0' selected='selected'>No Category</option>");
	for ( var index in category) {
		var categoryRow = category[index];
		strBuffer.append("<option value='"+categoryRow.Id+"'>"+categoryRow.Categoryname+"</option>");
		 
	}
	$('#select_category').html(strBuffer.toString());
	//addProductModalSaveAndCancel();
}
/**
 * init Add Product end
 */

/**
 * create Product begin
 */
function saveProduct(){
	//create Product first
	
	addProductModalSpinner();
	var productID = $("#productIDAdd").val();
	var productName = $("#productNameAdd").val();
	var productPV = $("#productPVAdd").val();
	var productCV = $("#productCVAdd").val();
	var productQTY = $("#productQTYAdd").val();
	var productCategory = $("#productCategoryAdd").val();
	var productDesc = $("#productDescAdd").val();
	var productSesc = $("#productSescAdd").val();
	var productType = $("#productTypeAdd").val();
	
	if(productCV == null || productCV == undefined || productCV == ''){
		productCV = 0;
	}
	if(productPV == null || productPV == undefined || productPV == ''){
		productPV = 0;
	}
	var objProduct = { 
					   "ProductID" : productID,
					   "ProductName" : productName,
					   "pvPrice" : productPV,
					   "cvPrice" : productCV,
					   "QTY" : productQTY,
					   "productType" : productType,
					   "ProductCategory" : productCategory,
					   "ProductDescription" : [productDesc],
					   "ProductSpecifications" : productSesc,
					   "ProductImages" : ImgIdresult
					};
	if (productInputsValidation($('#productIDAdd'), $('#productNameAdd'), $('#productCategoryAdd'), $("#productPVAdd"), $("#productCVAdd"), "Add")){
		pullDataFromCloudWithToken("Product", "CREATE", objProduct, "", "", "",	function(data){
			//alert("create success");
			
			addProductModalSaveAndCancel();
			$('#addProductModal').modal('hide');
			var expand = {};
			refreshTableContent();
			
			ImgIdresult = [];
			$('#addProductModal').find('.upload-group').html("<div class='upload-style'>" +
								"<span class='upload-text'></span>" +
								"<input class='upload-file' type='file' accept='image/jpeg, image/png' id='upload1'>" +
								"</div>" +
								"<div class='upload-icon' style='background: white;' onclick='addMore();'>+</div>");
		});
	}else{
		addProductModalSaveAndCancel();
	}
	
	$('#productCategoryAdd').parent().css("display","");
}


function uploadProductImg(data){
	//addProductModalSaveAndCancel();
	var productSYSId = data.Result.Id;
	if (productSYSId != null && productSYSId != undefined && productSYSId != ""){
		var filesCount = $('#productImagesAdd').fileinput('getFilesCount');
		//var imgCount = $("#addProductImgsInput").find("img").attr("src");
		if(filesCount > 0){
			for(var i = 0; i < filesCount; i++){
				createProductImg(productSYSId
						        , $("#addProductImgsInput").find("img:eq(" +2*i+")").attr("title")
						        , $("#addProductImgsInput").find("img:eq(" +2*i+")").attr("src")
						        );
			}
		}else{
			
			createProductCallback();
		} 
	}else{
		createProductCallback();
	}
}


function createProductImg(productSYSId, imgName, imgSrc){
	var imageBase64 = imgSrc.substring(imgSrc.indexOf(',') + 1, imgSrc.length);
		 
	var fileObj = {
					"id": getNewGUID(),
					"Filename" : imgName,
					"ContentType" : "image/png",
					"base64" : imageBase64
					};
	
	pullDataFromCloudWithToken("Files", "CREATE", fileObj, "", "", "", 
		function(data) {
			imgId = data.Result.Id;
			
			ImgIdresult.push(imgId);
			console.log("imgId:"+imgId);
			var fileObj = { 
						"ProductImages" : ImgIdresult
					};
			
			pullDataFromCloudWithToken("Product/" + productSYSId, "UPDATE", fileObj, "", "", "", 
			function(data) {
				createProductCallback();
			});	
			
		});

}

function updateImgForProduct(productSYSId, imgId){
	// "f21fcb00-e0ae-11e6-88b7-01e9a89455fd"
//	var t = "b5472270-e0b1-11e6-9f35-2b4da6b578c3";
	
	/*var expand = {
			"ProductCategory" : {
				"TargetTypeName" : "Category",
				"Fields" : {
					"Id" : 1,
					"Categoryname" : 1,
					"Pid" : 1
				},
				"Expand" : {
					"Pid" : {
						"TargetTypeName" : "Category",
						"Fields" : {
							"Id" : 1,
							"Categoryname" : 1,
							"Pid" : 1
						},
						"ReturnAs" : "ParentCategory"
					}
				}
			}
		}
				*/
	
	pullDataFromCloudWithToken("Product/" + productSYSId, "READ", "", "", "","", function(data){
		//var Imgresult = [];
		var productImg = data.Result.ProductImages;
		console.log("productImg:"+productImg);
		if (productImg != undefined) {
			for (i = 0; i < productImg.length; i++) {
				Imgresult.push(productImg[i]);
			}
		}
		Imgresult.push(imgId);
		//alert(data.Result.ProductImages.length);
		var fileObj = { 
				//'$set' : { "ProductImages" : imgId }
					"ProductImages" : Imgresult
				};
		
		pullDataFromCloudWithToken("Product/" + productSYSId, "UPDATE", fileObj, "", "", "", 
		function(data) {
			createProductCallback();
		});	
		
	});
		
}

/**
 * create Product end
 */

/**
 * Add new Product end
 */

/**
 * Edit Product begin
 */
function updateProduct(obj){
	var productSYSId = $(obj).parents('tr').attr("rowid");
	
	var res = judgeProductHasOrder(productSYSId);
	if(res){
		if(productSYSId != null && productSYSId != ""){
			$("#editProductModal").modal('show');
			editProductModalSaveAndCancel();
			//$('#loadingModal').modal('show');
			var imgURI = $(obj).parents('tr').attr("name");
				
			/*$("#editProductImgsInput")
					.html(
							"<label class='control-label' for='productImagesEdit'>Product Images <span style='color:red;'>(Tip: Please upload 300*200 pixel picture)</span>:</label> "
									+ "<input id='productImagesEdit' name='' type='file' multiple=true class='file-loading'>");*/
			if (imgURI == "" || imgURI == null || typeof(imgURI) == "undefined" || imgURI == "undefined") {
				/*$('#productImagesEdit').fileinput({
					//showPreview : false,
					//autoReplace : true,
			        dropZoneEnabled: false,//
					autoReplace: true,
					showRemove : true,
				    maxFileCount: 6,
				    showUpload : false,
					uploadUrl: '#',
					allowedFileExtensions : [ 'jpg' ],
				    browseClass: 'btn btn-primary' 
				});*/
				
				//$("#loadingModal").modal('hide');
			} else {
				getProductImgsInfo(imgURI);
				
			}
			var oldProdcutID = $(obj).parents('tr').children('td:nth-child(2)').text();
			
			productIds = productIds.replace(oldProdcutID,"");
			$("#productIDEdit").attr("name", $(obj).parents('tr').attr("rowid"));  
			$("#productIDEdit").val($(obj).parents('tr').children('td:nth-child(2)').text());
			$("#productNameEdit").val($(obj).parents('tr').children('td:nth-child(3)').text()); 
			$("#productPVEdit").val($(obj).parents('tr').children('td:nth-child(4)').text()); 
			$("#productCVEdit").val($(obj).parents('tr').children('td:nth-child(5)').text()); 
			$("#productQTYEdit").val($(obj).parents('tr').children('td:nth-child(6)').text()); 
			
			getCategory("Edit");
			
			selectedCategory = $(obj).parents('tr').children('td:nth-child(8)').text();
			
			$("#productCategoryEdit").val(); 
			$("#productCategoryEdit").attr("name", $(obj).parents('tr').children('td:nth-child(8)').text());  
			
			$("#productDescEdit").val($(obj).parents('tr').children('input:last').attr("name"));  
			$("#productSescEdit").val($(obj).parents('tr').children('input:last').attr("value"));  
			
			
			var productTypes = new LinkedMap();
			productTypes.put("0","Only Cash");
			productTypes.put("1","Only Point");
			productTypes.put("2","Cash+Point");
			var productType = $(obj).parents('tr').children('td:nth-child(9)').text();
			
			var strBuffer = new StringBuffer(); 
			if(productType == "Only Cash" || productType =="N/A"){
				strBuffer.append("<option value='0' selected>Only Cash</option>" +
						  "<option value='1'>Only Point</option>" +
						  "<option value='2'>Cash+Point</option>");
			}else if(productType == "Only Point"){
				strBuffer.append("<option value='0'>Only Cash</option>" +
						  "<option value='1' selected>Only Point</option>" +
						  "<option value='2'>Cash+Point</option>");
			}else{
				strBuffer.append("<option value='0'>Only Cash</opt ion>" +
						  "<option value='1'>Only Point</option>" +
						  "<option value='2' selected>Cash+Point</option>");
			}
			
			$('#productTypeEdit').html(strBuffer.toString());
			
		}
	} else{
		$('#forbiddenDeleteModal2').modal('show');
		editModalSaveAndCancel();
		
		//$("#forbiddenDeleteModal2").modal('show');
	}
	
	
	
}

function getProductImgsInfo(imgURIVal){  
	var fileId = new Array();
	fileId = imgURIVal.split(","); 
	var fileFilter = {
		"Id" :  { "$in" : fileId }

	};
	var fieldsReturn = {
		"Id" : 1,
		"Filename" : 1,
		"Length" : 1,
		"Uri" : 1
	};
	pullDataFromCloudWithToken("Files", "READ", "", "", fileFilter, fieldsReturn, initImageInputToProductEdit);

	 
}

function initImageInputToProductEdit(data){
	var imgInfo = data.Result;
	var uriResult = [];
	var config = []; 
	
	ImgIdresult2 = [];
	
	$('#editProductModal').find('.upload-group2').html("");
	for(var i = 0; i < imgInfo.length; i++ ){
		uriResult.push(imgInfo[i].Uri);
		var imgBasicInfo = {"caption": imgInfo[i].Filename, "size" :imgInfo[i].Length, "key":imgInfo[i].Id, url:""}
		config.push(imgBasicInfo);
		
		
		ImgIdresult2.push(imgInfo[i].Id);
		$('#editProductModal').find('.upload-group2').append("<div class='upload-style2'><img src='" + imgInfo[i].Uri + "' id='" + (i) + "' name='"+ imgInfo[i].Id +"'	class='he_border1_img img-style'/>"+
				  "<div class='entity'  style='display:block;'>"+
							 "<a href='#' class='view' id='view" + (i) + "' onclick='viewImg();'>View</a>"+
				 	 "<a href='#' class='delete' id='view" + (i) + "'>Delete</a>"+
			      "</div></div>");

			uploadFlag = true;
			
	}
	console.log("编辑初始化："+ImgIdresult2);
	
	$('#editProductModal').find('.upload-group2').append("<div class='upload-icon' style='background: white;' onclick='addMore2();'>+</div>");


}


function saveProductEdit(){
	editModalSpinner();
	var productId = $("#productIDEdit").attr("name"); 
	var productIDEdit = $("#productIDEdit").val();   
	var productNameEdit = $("#productNameEdit").val(); 
	var productPVEdit = $("#productPVEdit").val(); 
	var productCVEdit = $("#productCVEdit").val(); 
	var productQTYEdit = $("#productQTYEdit").val(); 
	var productCategoryEdit = $("#productCategoryEdit").val();   
	var productDescEdit = $("#productDescEdit").val();  
	var productSescEdit = $("#productSescEdit").val();  
	var productType = $("#productTypeEdit").val();
	
	console.log("edit:=="+ImgIdresult2);
	
	var productObj = {
			"ProductID" : productIDEdit,
			"ProductName" : productNameEdit,
			"pvPrice" : productPVEdit,
			"cvPrice" : productCVEdit,
			"QTY" : productQTYEdit,
			"productType" : productType,
			"ProductCategory" : productCategoryEdit,
			"ProductDescription" : [productDescEdit],
			"ProductSpecifications" : productSescEdit,
			"ProductImages" : ImgIdresult2
		};
	
	//----------------------
	/*var expand = {};

	var res = judgeCurCustomerHasOrder(userID);
	if(res){
		if(userID != null && userID != ""){
			var userObj = {};
			deleteModalSpinner();
			pullDataFromCloudFunction("Users/"+userID,"DELETE",userObj,expand,deleteRoleCallback);	
		}
	} else{
		//this custome has orders
		$('#forbiddenDeleteModal').modal('show');
		
	}*/
	
	var res = judgeProductHasOrder(productId);
	console.log(res);
	if(res){
		
		if(productId != null && productId != ""){
			if (productInputsValidation($('#productIDEdit'),$('#productNameEdit'), $("#productCategoryEdit"),$("#productPVEdit"), $("#productCVEdit") ,"Edit")){
				pullDataFromCloudWithToken("Product/" + productId,"UPDATE", productObj, "", "", "",editProductCallback);
			}else{
				editProductModalSaveAndCancel();
			}
		}
	} else{
		$('#editProductModal').modal('hide');
		//this custome has orders
		//$('#forbiddenDeleteModal2').modal('show');
		
		alert("The product already has been purchased, you cannot update this record !");
	}
	
	
		
//	if(roleInputsValidation($('#roleNameAdd'),$('#roleCodeAdd'))){
//		pullDataFromCloudWithToken("AppRoles","CREATE",roleObj,expand,createRoleCallback);
//	} else {
//		addModalSaveAndCancel();
//	}
	
	
}

/**
 * Edit Product end
 */
function addModalSaveAndCancel() {
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"
			+ "<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveCategory();'>Save</button>";
	$(".addCategoryModalFooter").html(footerHtmlStr);
}
function addModalSpinner() {
	$(".addCategoryModalFooter")
			.html(
					"<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function addProductModalSpinner() {
	$(".addProductModalFooter")
			.html(
					"<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function addProductModalSaveAndCancel() {
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"
			+ "<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveProduct();'>Save</button>";
	$(".addProductModalFooter").html(footerHtmlStr);
}
function editProductModalSaveAndCancel() {
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"
			+ "<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveProductEdit();'>Save</button>";
	$(".editProductModalFooter").html(footerHtmlStr);
}

function editModalSaveAndCancel() {
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"
			+ "<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveProductEdit();'>Save</button>";
	$(".editProductModalFooter").html(footerHtmlStr);
}
function editModalSpinner() {
	$(".editProductModalFooter")
			.html(
					"<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}



function productInputsValidation(productIDObj, productNameObj, productCategoryObj, productPVObj, productCVObj, operation) {
	var validInputs = false;

	var productID = productIDObj.val();
	var productName = productNameObj.val();
	var productCategory = productCategoryObj.val();
	var productPV = productPVObj.val();
	var productCV = productCVObj.val();
	
	var errorTipObj2ID;
	var errorTipObj2Name;
	var errorTipObj2Category;
	var errorTipProductPV;
	var errorTipProductCV;
	
	if (operation == "Add"){
		errorTipObj2ID = $(".errorTipProductIDAdd");
		errorTipObj2Name = $(".errorTipProductNameAdd");
		errorTipObj2Category = $(".errorTipProductCategoryAdd");
		errorTipProductPV = $(".errorTipProductPVAdd");
		errorTipProductCV = $(".errorTipProductCVAdd");
		
	}else{
		errorTipObj2ID = $(".errorTipProductIDEdit");
		errorTipObj2Name = $(".errorTipProductNameEdit");
		errorTipObj2Category = $(".errorTipProductCategoryEdit");
		
		errorTipProductPV = $(".errorTipProductPVEdit");
		errorTipProductCV = $(".errorTipProductCVEdit");
		
	}

	// remove Error Tip
	$(".errorTip").addClass("displayNone");
	$(".col-md-4").removeClass("has-error");
	errorTipObj2ID.parent().css("display","none");
	errorTipObj2Name.parent().css("display","none");
	//errorTipObj2Category.parent().css("display","none");
	//errorTipProductPV.parent().css("display","none");
	//errorTipProductCV.parent().css("display","none");
	
	
	var validateProductID = false;
	if (productID == 'undefined' || productID == null || productID.length < 1) {
		//errorTipObj2ID.parent().parent().removeClass("has-error").addClass("has-error");
		errorTipObj2ID.parent().css("display","");
		errorTipObj2ID.text("Product ID is required.");
		errorTipObj2ID.addClass("displayNone").removeClass("displayNone");
	} else {
		if (productID.length < 5 || productID.length > 45) {
			//errorTipObj2ID.parent().parent().removeClass("has-error").addClass("has-error");
			errorTipObj2ID.parent().css("display","");
			errorTipObj2ID.text("Length is 5 - 45.");
			errorTipObj2ID.addClass("displayNone").removeClass("displayNone");
			 
		} else {
			validateProductID = true;
		}
	}
	
	if(productIds.indexOf(productID) > 0){
		//errorTipObj2ID.parent().parent().removeClass("has-error").addClass("has-error");
		errorTipObj2ID.parent().css("display","");
		errorTipObj2ID.text("Product ID is existed.");
		errorTipObj2ID.addClass("displayNone").removeClass("displayNone");
		validateProductID = false;
	}
	

	var validateProductName = false;
	if (productName == 'undefined' || productName == null || productName.length < 1) {
		//errorTipObj2Name.parent().parent().removeClass("has-error").addClass("has-error");
		errorTipObj2Name.parent().css("display","");
		errorTipObj2Name.text("Product Name is required.");
		errorTipObj2Name.addClass("displayNone").removeClass("displayNone");
	} else {
		if (productName.length < 2 || productName.length > 45) {
			//errorTipObj2Name.parent().parent().removeClass("has-error").addClass("has-error");
			errorTipObj2Name.parent().css("display","");
			errorTipObj2Name.text("Length is 2 - 45.");
			errorTipObj2Name.addClass("displayNone").removeClass("displayNone");
		} else {
			validateProductName = true;
		}
	}

	var validateProductCategory = false;
	if (productCategory == 'undefined' || productCategory == null || productCategory== '0') {
		//errorTipObj2Category.parent().removeClass("has-error").addClass("has-error");
		errorTipObj2Category.parent().css("display","");
		errorTipObj2Category.text("Category is required.");
		errorTipObj2Category.addClass("displayNone").removeClass("displayNone");
	} else {
		validateProductCategory = true;
	}
	
	var reg = /^\d+(?=\.{0,1}\d+$|$)/;

	var validatePV = false;
	var productPv = productPVObj.val();
	if (productPv=='undefined' || productPv=='' || productPv==null) {
		/*productPVObj.parent().removeClass("has-error").addClass("has-error");
		$(".errorTipProductPVAdd").css("display","");
		$(".errorTipProductPVAdd").text("Air pt is required.");
		$(".errorTipProductPVAdd").addClass("displayNone").removeClass("displayNone");*/
		validatePV = true;
	} else {
		if (!($.isNumeric(productPv))) {
			productPVObj.parent().removeClass("has-error").addClass("has-error");
			$(".errorTipProductPVAdd").css("display","");
			$(".errorTipProductPVAdd").text("Air pt isnot numeric.");
			$(".errorTipProductPVAdd").addClass("displayNone").removeClass("displayNone");
		} else {
			//validateTotalAmount = true;
			if(!reg.test(productPv)){
				productPVObj.parent().removeClass("has-error").addClass("has-error");
				//productPVObj.prev().text("Air pt price cannot less than 0.");
				//productPVObj.prev().addClass("displayNone").removeClass("displayNone");
				validatePV = false;
			}else{
				validatePV = true;
			}
			
		}
	}
	
	var validateCV = false;
	var productCv = productCVObj.val();
	if (productCv=='undefined' || productCv=='' || productCv==null) {
		/*productCVObj.parent().removeClass("has-error").addClass("has-error");
		$(".errorTipProductCVAdd").css("display","");
		$(".errorTipProductCVAdd").text("CV is required.");
		$(".errorTipProductCVAdd").addClass("displayNone").removeClass("displayNone");*/
		validateCV = true;
	} else {
		if (!($.isNumeric(productCv))) {
			productCVObj.parent().removeClass("has-error").addClass("has-error");
			$(".errorTipProductCVAdd").css("display","");
			$(".errorTipProductCVAdd").text("CV isnot numeric.");
			$(".errorTipProductCVAdd").addClass("displayNone").removeClass("displayNone");
		} else {
			//validateTotalAmount = true;
			if(!reg.test(productCv)){
				productCVObj.parent().removeClass("has-error").addClass("has-error");
				//productCVObj.prev().text("CV price cannot less than 0.");
				//productCVObj.prev().addClass("displayNone").removeClass("displayNone");
				validateCV = false;
			}else{
				validateCV = true;
			}
			
		}
	}
	
	
	if (validateProductID && validateProductName && validateProductCategory && validatePV && validateCV) {
		validInputs = true;
	}else{
		validInputs = false;
	}
	
	return validInputs;
}

function categoryInputsValidation(categoryNameObj) {
	var validInputs = false;

	var categoryName = categoryNameObj.val(); 

	// remove Error Tip
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");

	//var validateCategoryName = false;
	if (categoryName == 'undefined' || categoryName == null || categoryName.length < 1) {
		categoryNameObj.parent().removeClass("has-error").addClass("has-error");
		categoryNameObj.prev().text("Category Name is required.");
		categoryNameObj.prev().addClass("displayNone").removeClass("displayNone");
	} else {
		if (categoryName.length < 5 || categoryName.length > 45) {
			categoryNameObj.parent().removeClass("has-error").addClass("has-error");
			categoryNameObj.prev().text("Length is 5 - 45.");
			categoryNameObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			validInputs = true;
		}
	}

	 
	return validInputs;
}

var findSelectableNodes = function(searchVal) {
    return $('#treeviewEdit').treeview('search', [ searchVal, { ignoreCase: false, exactMatch: false } ]);
  };



function comfirmCheckOfDeleteProduct(obj){
	var productSYSId = $(obj).parents('tr').attr("rowid");
	$("#toDeleteItemID").val(productSYSId);
	$('#deleteModal').modal('show');
}

function deleteProduct(){
	var productSYSId = $("#toDeleteItemID").val();
	
	var res = judgeProductHasOrder(productSYSId);
	console.log(res);
	if(res){
		
		if(productSYSId != null && productSYSId != ""){
			var expand = {};
			
			var productObj = {};
			pullDataFromCloudWithToken("Product/"+productSYSId,"DELETE",productObj,expand,"","",deleteProductCallback);	
		}
	} else{
		$('#editProductModal').modal('hide');
		//this custome has orders
		//$('#forbiddenDeleteModal2').modal('show');
		
		alert("The product already has been purchased,  you cannot delete this record !");
	}
	
	
}

function deleteProductCallback(data) {
	$('#deleteModal').modal('hide');
	refreshTableContent2();
}

function createCategoryCallback(data) {
	addModalSaveAndCancel();
	$('#addCategoryModal').modal('hide');
	var expand = {};
	cancelDialog();
	//loadCategoryTreeData();
}

function createProductCallback() {
	addProductModalSaveAndCancel();
	$('#addProductModal').modal('hide');
	var expand = {};
	refreshTableContent();
	
	ImgIdresult = [];
}

function editProductCallback(data) {
	editModalSaveAndCancel();
	$('#editProductModal').modal('hide');
	var expand = {};
	refreshTableContent2();
}

function closeNotLastCategoryModal(){
	$('#deleteNotLastCategoryModal').modal('hide');
}
function refreshTableContent() {
	cancelDialog();
	currentPage = 0;
	
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData();
	
	
}

function refreshTableContent2() {
	cancelDialog();
	//currentPage = 0;
	
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData2();
	
	
}


function loadPageContentData2() {
	var expand = {
		"ProductCategory" : {
			"TargetTypeName" : "Category",
			"Fields" : {
				"Id" : 1,
				"Categoryname" : 1,
				"Pid" : 1
			},
			"Expand" : {
				"Pid" : {
					"TargetTypeName" : "Category",
					"Fields" : {
						"Id" : 1,
						"Categoryname" : 1,
						"Pid" : 1
					},
					"ReturnAs" : "ParentCategory"
				}
			}
		}
	}
				
	//pullDataFromCloudWithToken("Product", "READ", "", expand, "","", listAllProductCallback);
	pullDataFromCloudWithToken2("Product", "READ", "", expand, "",
			"", listAllProductCallback,currentPage, 10);
}

function cancelDialog() {
	
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("input").val("");
	$("input").text("");
	$("textarea").val("");
	$("textarea").text("");
	//$(textarea)
}

function cancelTreeDialog() {

}
