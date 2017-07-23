var ImgIdresult = [];
var ImgIdresult2 = [];	

var currentPage =0;
var currentnum = 10;

$(document).ready(function() {
	// set the selected menu highlighted.
	$('#side-menu').children('a').removeClass("active");
	$('.Admin-Category').addClass("active"); 
	
	var checkSubmitFlg = false;
	$('.save-category').unbind('click').bind('click',function(){
		if (!checkSubmitFlg){
            //第一次提交
            checkSubmitFlg = true;
            saveCategory();
        }else{
            return false;
        }
		
	});
		
	loadPageContentData();
	getProduct();

	
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
	    			/*//imgId = data.Result.Id;
	    			console.log("删除前："+ImgIdresult);
	    			console.log(imageIdIndex);*/
	    			
	    			ImgIdresult.splice(0, 1);
	    			
	    			var imageId = $(this).parent().parent().find('img').attr('name');
	    			
	    			if(imageId != null && imageId != 'undefined' && imageId != ''){
	    				var el = new Everlive('emqn75r4njlqhrtx');
	        			el.Files.destroySingle({ Id: imageId },
	        			    function(){
	        			       // alert('File successfully deleted.');
	        			    },
	        			    function(error){
	        			        alert(JSON.stringify(error));
	        			    });
	        			
	    				console.log("删除后："+ImgIdresult);
	    			}
	    			
	    			
	    			$(this).parent().parent().html("<div class='upload-group'>" +
	    												"<div class='upload-style'>" +
	    													"<span class='upload-text'></span>" +
	    													"<input class='upload-file' type='file' accept='image/jpeg, image/png' id='upload1'>" +
	    												 "</div>" +
	    											"</div>");

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
		  								  "<div class='entity' style='display:block;'>"+
		        	   							 "<a href='#' class='view' id='view" + (num-1) + "'>View</a>"+
		          						 	 "<a href='#' class='delete' id='view" + (num-1) + "'>Delete</a>"+
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
		
		ImgIdresult2.splice(0, 1);
		
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
		
		$(this).parent().parent().html("<div class='upload-group'>" +
				"<div class='upload-style'>" +
					"<span class='upload-text'></span>" +
					"<input class='upload-file' type='file' accept='image/jpeg, image/png' id='upload1'>" +
				 "</div>" +
			"</div>");
		//$(this).parent().parent().css('display', 'none');

		$(this).parent().parent().html("");
	});
	
	
	//------------------
	var expand = {};
	var filter = { "Pid" : { "$ne" : "0" } };
	var fieldsReturn = {
		"Id" : 1,
		"Categoryname" : 1
	};
	var sortExp = { "Categoryname" : 1 };
	pullDataFromCloudWithTokenAndSort("Category", "READ", "", expand, filter ,fieldsReturn, sortExp, function(data){
		var category = data.Result;
		var strBuffer = new StringBuffer(); 
		strBuffer.append("<option value='0' selected='selected'>No Category</option>");
		for ( var index in category) {
			var categoryRow = category[index];
			strBuffer.append("<option value='"+categoryRow.Categoryname+"'>"+categoryRow.Categoryname+"</option>");
			 
		}
		$('#select_category').html(strBuffer.toString());
	}); 
	
	$(".select-opr").unbind('click').bind('click', function(){
		
		var select_category = $("input[name='select_category']").val();
		var filters = new Array();
		if(jsObjNotNullOrUndefined(select_category) && select_category !=""){
			var select_descFilter = {"Categoryname": {"$regex": ".*" + select_category + ".*"}};
			filters.push(select_descFilter);
		}
		var filter2 ={};
		if (filters.length > 0) {
			filter2 ={ "$and": filters };
		}
		var expand = {
				"Pid" : {
					"TargetTypeName" : "Category",
					"Fields" : {
						"Id" : 1,
						"Categoryname" : 1
					}
				}
			};
			var fieldsReturn = {
				"Id" : 1,
				"Categoryname" : 1,
				"Pid" : 1,
				"cateImgUrl" : 1
			};
			currentPage =0;
			pullDataFromCloudFunction("Category","READ","",expand,listAllCategoriesCallback,filter2,0,10);
	});
	
	//******************
	
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
		num ++
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
	if(uploadFlag2){
		$(".upload-group2").find(".upload-icon").before("<div class='upload-style2'>" +
										"<span class='upload-text'></span>" +
										"<input class='upload-file' type='file' accept='image/jpeg, image/png' id='upload1'>" +
									"</div>")
		
	}else{
		alert("Please upload image firstly.");
	}

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

function test_mouseover(){
}

function test_moverout(){
}


function loadPageContentData() {
	var expand = {
		"Pid" : {
			"TargetTypeName" : "Category",
			"Fields" : {
				"Id" : 1,
				"Categoryname" : 1
			}
		}
	};
	var fieldsReturn = {
		"Id" : 1,
		"Categoryname" : 1,
		"Pid" : 1,
//		"ParentCategory" : 1,
		"cateImgUrl" : 1
	};
	pullDataFromCloudWithToken2("Category", "READ", "", expand, "",
			fieldsReturn, listAllCategoriesCallback,0, 10);

}

function previousAdd(){
	currentPage = currentPage -1;
	
	var expand = {
			"Pid" : {
				"TargetTypeName" : "Category",
				"Fields" : {
					"Id" : 1,
					"Categoryname" : 1
				}
			}
		};
		var fieldsReturn = {
			"Id" : 1,
			"Categoryname" : 1,
			"Pid" : 1,
			"cateImgUrl" : 1
		};
		
	$('.next').removeClass('disabled');	
	if(currentPage < 0){
		currentPage =0;
		$(".previous").addClass('disabled');
	}else{
		var select_category = $("input[name='select_category']").val();
		var filters = new Array();
		if(jsObjNotNullOrUndefined(select_category) && select_category !=""){
			var select_descFilter = {"Categoryname": {"$regex": ".*" + select_category + ".*"}};
			filters.push(select_descFilter);
		}
		var filter2 ={};
		if (filters.length > 0) {
			filter2 ={ "$and": filters };
		}
		var expand = {
			"Pid" : {
				"TargetTypeName" : "Category",
				"Fields" : {
					"Id" : 1,
					"Categoryname" : 1
				}
			}
		};
		var fieldsReturn = {
			"Id" : 1,
			"Categoryname" : 1,
			"Pid" : 1,
			"cateImgUrl" : 1
		};
		//currentPage =0;
		//pullDataFromCloudFunction("Category","READ","",expand,listAllCategoriesCallback,filter2,0,10);
			
		
		pullDataFromCloudWithToken2("Category", "READ", "", expand, filter2,
				fieldsReturn, listAllCategoriesCallback, currentPage, 10);
	}
};

function nextAdd(){
	var expand = {
			"Pid" : {
				"TargetTypeName" : "Category",
				"Fields" : {
					"Id" : 1,
					"Categoryname" : 1
				}
			}
		};
		var fieldsReturn = {
			"Id" : 1,
			"Categoryname" : 1,
			"Pid" : 1,
//			"ParentCategory" : 1,
			"cateImgUrl" : 1
		};
	
	$(".previous").removeClass('disabled');
	if(currentnum < 10){
		
	}else{
		if(currentPage<0){
			currentPage = 0;
		}
		var select_category = $("input[name='select_category']").val();
		var filters = new Array();
		if(jsObjNotNullOrUndefined(select_category) && select_category !=""){
			var select_descFilter = {"Categoryname": {"$regex": ".*" + select_category + ".*"}};
			filters.push(select_descFilter);
		}
		var filter2 ={};
		if (filters.length > 0) {
			filter2 ={ "$and": filters };
		}
		var expand = {
			"Pid" : {
				"TargetTypeName" : "Category",
				"Fields" : {
					"Id" : 1,
					"Categoryname" : 1
				}
			}
		};
		var fieldsReturn = {
			"Id" : 1,
			"Categoryname" : 1,
			"Pid" : 1,
			"cateImgUrl" : 1
		};
		
		pullDataFromCloudWithToken2("Category", "READ", "", expand, filter2,
				fieldsReturn, listAllCategoriesCallback, currentPage, 10);
		
		currentPage = currentPage +1;
		
		/*pullDataFromCloudWithToken2("Category", "READ", "", expand, "",
				fieldsReturn, listAllCategoriesCallback, currentPage, 10);	*/
	}
}
	

function listAllCategoriesCallback(data) {

	var allCategories = data.Result;
	
	currentnum = allCategories.length;
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
	var pid;
	var parentId;
	var cateImgUrl;
	strBuffer
			.append("<table class='table dataTable table-striped table-bordered table-hover  dataTable no-footer dtr-inline' id='category_table'>");
	strBuffer.append("<thead>");
	strBuffer.append("<tr class='table-header'>");
	strBuffer.append("<th width='10%'>#</th>");
	strBuffer.append("<th width='30%'>Category</th>");
	strBuffer.append("<th width='30%'>Parent Category</th>");
	strBuffer.append("<th width='30%'>Operation</th>");
	strBuffer.append("</tr>");
	strBuffer.append("</thead>");
	strBuffer.append("<tbody>");
	for ( var index in allCategories) {
		var categoryRow = allCategories[index];
		var categoryNum = parseInt(index) + 1;
		// alert(categoryRow.ParentCategory);
		parentCategory = (categoryRow.Pid == null) ? "No Parent Category"
				: categoryRow.Pid.Categoryname;
		//pid = (categoryRow.Pid == undefined) ? "" : categoryRow.Pid;
		parentId = (categoryRow.Pid == null) ? "0"
				: categoryRow.Pid.Id;
		cateImgUrl = (categoryRow.cateImgUrl == undefined) ? ""
				: categoryRow.cateImgUrl;
		// alert(categoryRow.ParentCategory);
		strBuffer.append("<tr rowID='" + categoryRow.Id + "' name='"
				+ cateImgUrl + "'>");
		strBuffer.append("<td>" + categoryNum + "</td>");
		strBuffer.append("<td>" + categoryRow.Categoryname + "</td>");
		strBuffer.append("<td name = '" + parentId + "'>" + parentCategory
				+ "</td>");
		// strBuffer.append("<td>"+parentCategory+"</td>");
		strBuffer
				.append("<td><i class='glyphicon glyphicon-edit cursorPointer' onclick='updateCategory(this)'></i> " +
						"  <i class='glyphicon glyphicon-remove cursorPointer' onclick='comfirmCheckOfDeleteCategory(this)'></i></td>");
		strBuffer.append("</tr>");
	}
	strBuffer.append("</tbody>");
	strBuffer.append("</table>");
	$('.tableDiv').html(strBuffer.toString());
	
	
	
	
	$('#category_table').DataTable( {
		"responsive" : true,
		"autoWidth": false,
		"aoColumnDefs" : [ {
			"bSortable" : false,
			"aTargets" : [ 3 ]
		} ],
		"bAutoWidth": false
    });
	
	$('#category_table_length').css({ display: "none"});
	$('#category_table_info').parent().parent().css({ display: "none"});
	
	$('#category_table_filter').css({ display: "none"});
}

//function loadCategoryTreeData() {
//	$("#categoryTreeModalAdd").find(".modal-body").html("<div id='treeviewAdd'></div>");
//	$("#categoryTreeModalEdit").find(".modal-body").html("<div id='treeviewEdit'></div>");
//	var expand = {};
//	var fieldsReturn = {
//		"Id" : 1,
//		"Categoryname" : 1,
//		"Pid" : 1
//	};
//	pullDataFromCloudWithToken("Category", "READ", "", expand, "",
//			fieldsReturn, initCategoryTree);
//
//}

/**
 * init Category Tree
 * 
 * @param data
 * @returns
 */
//function initCategoryTree(data) {
//	// alert(data.Result); // this will be what we always use in a AJAX
//	// callback.
//	var allCategories = data.Result;
//
//	for (var i = 0; i < allCategories.length; i++) {
//		allCategories[i]["icon"] = allCategories[i]["Id"];
//		allCategories[i]["text"] = allCategories[i]["Categoryname"];
//		// delete data[i].Id;
//		delete allCategories[i].Categoryname;
//		// delete data[i].Meta;
//	}
//
//	function fn(data, pid) {
//		var result = [], temp;
//		for ( var i in data) {
//			if (data[i].Pid == pid) {
//				result.push(data[i]);
//				temp = fn(data, data[i].Id);
//				if (temp.length > 0) {
//					data[i].nodes = temp;
//				}
//			}
//		}
//		return result;
//	}
//
//	var jsonTree = JSON.stringify(fn(allCategories, 0));
//	$('#treeviewAdd').treeview({
//		backColor : "#FFFFFF",
//		color : "#f5907c",
//		selectedBackColor: '#f5907c',
//		onhoverColor: '#f7e7ce',
//		data : jsonTree,
//		onNodeSelected : function(e, o) { 
//				var tree = $('#treeviewAdd');
//				var node = tree.treeview('getNode', o.nodeId);
//				$("#parentCategoryAdd").attr("name", node.Id);
//				$("#parentCategoryAdd").val(node.text);
//		}
//	});
//	$('#treeviewEdit').treeview({
//		backColor : "#FFFFFF",
//		color : "#f5907c",
//		selectedBackColor: '#f5907c',
//		onhoverColor: '#f7e7ce',
//		data : jsonTree,
//		onNodeSelected : function(e, o) {
//				var tree = $('#treeviewEdit');
//				var node = tree.treeview('getNode', o.nodeId);
//				$("#parentCategoryEdit").attr("name", node.Id);
//				$("#parentCategoryEdit").val(node.text);
//				
////				foreach (TreeNode t in tree.Nodes) {
////	                DiGui(tn);
////	            }
////
////	            alert(JSON.stringify(arr));
//				
//		}
//	});
//}






/** add category begin * */

/**
 * init Image plugin
 */
function openAddCategory(){
	$("#addCategoryModal").modal('show');
	/*$("#addImgInput")
	.html(
			"<label class='control-label' for='categoryImageAdd'>Category Image:</label> "
					+ "<input id='categoryImageAdd' name='' type='file' multiple=true class='file-loading'>");
	initImageInputToAdd();*/
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

function writeDataToParentCategoryAdd(data){
	var category = data.Result;
	var strBuffer = new StringBuffer(); 
	strBuffer.append("<option value='0' selected='selected'>No Parent Category</option>");
	for ( var index in category) {
		var categoryRow = category[index];
		strBuffer.append("<option value='"+categoryRow.Id+"'>"+categoryRow.Categoryname+"</option>");
		 
	}
	$('#parentCategoryAdd').html(strBuffer.toString());
	addModalSaveAndCancel();
}


function saveCategory() {
	//$('.save-category').addClass('disabled','disabled');
	/**/
	addModalSpinner();
	setTimeout(setSaveCategory, 5000 );
	

}

function setSaveCategory(){
	if (categoryInputsValidation($('#categoryAdd'))){
		saveImage();
	}else{
		addModalSaveAndCancel();
	}
};

function saveImage() { 
	var imgId; 

	/*// upload Img
	var imageSrc = $(".file-preview-image").attr("src");
	if (imageSrc == undefined || imageSrc == null || imageSrc == "") {
		imgId = "";
		createCategory(imgId);
	} else {

		imgId = uploadImg();
	}*/
	imgId = "";
	createCategory(imgId);

}

/*function uploadImg() {
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
}*/

function createCategory(imgId) {
	var category;
	var categoryname = $('#categoryAdd').val();
	var pid; 
	var parentCategoryVal = $("#parentCategoryAdd").val();

	var urlInfo = "";
	if(ImgIdresult.length>0){
		urlInfo = ImgIdresult[0];
	}
	
	category = {
			"Categoryname" : categoryname,
			"Pid" : parentCategoryVal, 
			"cateImgUrl" : urlInfo
		};
	
	
	var name = $("#parentCategoryAdd").find("option:selected").text(); 
	
	if(categoryname == name){
		$(".errorTipCategoryAdd").removeClass("has-error").addClass("has-error");
		$(".errorTipCategoryAdd").text("Main category and sub category should not be the same.");
		$(".errorTipCategoryAdd").addClass("displayNone").removeClass("displayNone");
	}else{
		$('#addCategoryModal').modal('hide');
		pullDataFromCloudWithToken("Category", "CREATE", category, "", "", "", createCategoryCallback);
	}
	
	
	 
	
}

/**
 * add category end
 */

/**
 * update Category begin
 */
function initImageInputToEdit(data) {
	var imgInfo = data.Result;
	var uriResult = [];
	var config = []; 
	
	ImgIdresult2 = [];
	
	
	console.log("imgInfo.length："+imgInfo.length);
	
	uriResult.push(imgInfo.Uri);
	var imgBasicInfo = {"caption": imgInfo.Filename, "size" :imgInfo.Length, "key":imgInfo.Id, url:""}
	config.push(imgBasicInfo);
	
	if(imgInfo.Uri != null && imgInfo.Uri != undefined && imgInfo.Uri!=''){
		$('#editCategoryModal').find('.upload-group2').html("");
		
		ImgIdresult2.push(imgInfo.Id);
		$('#editCategoryModal').find('.upload-group2').append("<div class='upload-style2'><img src='" + imgInfo.Uri + "' id='" +0 + "' name='"+ imgInfo.Id +"'	class='he_border1_img img-style'/>"+
				  "<div class='entity' style='display:block;'>"+
							 "<a href='#' class='view' id='view" + 0 + "' onclick='viewImg();'>View</a>"+
				 	 "<a href='#' class='delete' id='view" + 0 + "'>Delete</a>"+
			      "</div></div>");

			uploadFlag = true;
		
	}
	
			
	
	
}

function initImageInputToEdit2() {

	$('#categoryImageEdit').fileinput({

		allowedFileExtensions : [ 'jpg', 'png' ],
		showRemove : true,
		showUpload : false,
		browseClass: 'btn btn-primary'

	});
	$("#loadingModal").modal('hide');
	$("#editCategoryModal").modal('show');
}

function deleteSingleImg(imgURI) {
	if(imgURI != null && imgURI != ""){
		var expand = {} ;
		var dataObj = {};
		var fieldsReturn = {};
		var filter = {};
		pullDataFromCloudWithToken("Files/" + imgURI, "DELETE",dataObj,expand,filter,fieldsReturn,function(data) {
			// return;
		});
	}
	
}
function updateCategory(obj) {
	
	var categoryID = $(obj).parents('tr').attr("rowid");;
	
	var filter = {
			productCategory:categoryID
	}
	
	var filter = {"ProductCategory":{"$eq": categoryID } };
	
	pullDataFromCloudFunction("Product", "READ", "", "",
				 function(data){
		if(data.Count == 0){
			
			//disableNode
			$('#loadingModal').modal('show');
			var imgURI = $(obj).parents('tr').attr("name");
			
			getImg(imgURI);
			
			$("#categoryEdit").attr("name", $(obj).parents('tr').attr("rowid")); // cateId
			$("#categoryEdit").val($(obj).parents('tr').children('td:nth-child(2)').text()); // cateName
			$("#categoryOldPidEdit").val($(obj).parents('tr').children('td:nth-child(3)').attr("name")); // pid
			$("#categoryImage").attr("name", imgURI);
			checkChildCategory($(obj).parents('tr').attr("rowid"));
			editModalSaveAndCancel();
			
		} else if(data.Count > 0){
			$('#forbiddenDeleteModal').modal('show');
			editModalSaveAndCancel();
		}
		
	},filter);
	
	
	
}
function checkChildCategory(cateID){
	var expand = {};
	var filter = { "Pid" : cateID };
	var fieldsReturn = {
		"Id" : 1,
		"Categoryname" : 1
	}; 
	pullDataFromCloudWithToken("Category", "READ", "", expand, filter ,fieldsReturn, function(data){
		var childCounts = data.Count;
		if (childCounts>0){
			$('#parentCategoryEdit').attr("disabled", true).html("<option value='0' selected='selected'>No Parent Category</option>");
		}else{
			$('#parentCategoryEdit').removeAttr("disabled");
			getParentCategory("Edit");
		}
		  
	});  
	 
	//getParentCategory("Edit");
}
function writeDataToParentCategoryEdit(data){
	var category = data.Result;
	var strBuffer = new StringBuffer(); 
	var categoryID = $("#categoryEdit").attr("name");
	var categoryPid = $("#categoryOldPidEdit").val();
	
	if (categoryPid=="0"){
		strBuffer.append("<option value='0' selected='selected'>No Parent Category</option>");
	}else{
		strBuffer.append("<option value='0'>No Parent Category</option>");
	}
	
	for ( var index in category) {
		var categoryRow = category[index];
		if (categoryRow.Id != categoryID){
			if (categoryRow.Id == categoryPid){
				strBuffer.append("<option value='"+categoryRow.Id+"' selected='selected'>"+categoryRow.Categoryname+"</option>");
			} else{
				strBuffer.append("<option value='"+categoryRow.Id+"'>"+categoryRow.Categoryname+"</option>");
			}
		}

		 
	}
	$('#parentCategoryEdit').html(strBuffer.toString());
	editModalSaveAndCancel();
}

function getImg(imgURI) {
	console.log("imgURI:"+imgURI);
	
	if(imgURI != null && imgURI != undefined && imgURI != ''){
		var expand = {

		}
		var fieldsReturn = {
			"Id" : 1,
			"Filename" : 1,
			"Length" : 1,
			"Uri" : 1
		}
		pullDataFromCloudWithToken("Files/" + imgURI, "READ", "", expand, "",
				fieldsReturn, initImageInputToEdit);
	}
	
	$("#loadingModal").modal('hide');
	$("#editCategoryModal").modal('show');
}

function saveCategoryEdit() {
	editModalSpinner();
	var categoryId = $("#categoryEdit").attr("name"); // 
	var categoryNewName = $("#categoryEdit").val(); 
	var categoryNewPid = $("#parentCategoryEdit").val(); 
	var imageId = $("#categoryImage").attr("name");
	var imageSrc = $("#editImgInput").find(".file-preview-image").attr("src");
	var parentCateId;
	
	
	if (categoryInputsValidation($('#categoryEdit'))){
		judgeCurrentCategoryHasProductForUpdate(categoryNewName,imageId,categoryNewPid);
//		updateCategoryData(categoryNewName, imageId, categoryNewPid);
		/*if(imageId == undefined || imageId == null || imageId == ""){
			if(imageSrc != null && imageSrc != undefined && imageSrc != ""){
				createNewImgEdit(categoryNewName, categoryNewPid);
			}else if(imageSrc == null || imageSrc == undefined || imageSrc == ""){
				imageId = null; 
				updateCategoryData(categoryNewName, imageId, categoryNewPid);
			}
		}else {
			if(imageSrc == null || imageSrc == undefined || imageSrc == ""){
				deleteSingleImg(imageId);
				imageId = null; 
				
				updateCategoryData(categoryNewName, imageId, categoryNewPid);
			}else if (imageSrc.substring(0, 4) == "http") {
				updateCategoryData(categoryNewName, imageId, categoryNewPid);
			}else if(imageSrc != null && imageSrc != undefined && imageSrc != "" && imageSrc.substring(0, 4) != "http") {
					var imageName = $("#editImgInput").find(".file-caption-name").attr("title");
					//var extName = (imageName.substring(imageName.lastIndexOf('.') + 1, imageName.lenght)).toLowerCase()=="png" ? "png": "jpeg";
					//var imageSrc = $("#editImgInput").find(".file-preview-image").attr("src");
					var imageBase64 = imageSrc.substring(imageSrc.indexOf(',') + 1, imageSrc.length);
					//var imageName = $("#editImgInput").find(".file-caption-name").attr("title");
					var fileObj = {
							"Filename": imageName,
							"ContentType":"image/png",
							"base64" : imageBase64
					};
					pullDataFromCloudWithToken("Files/" + imageId + "/Content", "UPDATE",fileObj, "", "", "", function(data) {
								updateCategoryData(categoryNewName, imageId, categoryNewPid);
							});
				}
			}*/
			
	}else{
		editModalSaveAndCancel();
	} 
}

 

function createNewImgEdit(categoryNewName, categoryNewPid) {
	var imageSrc = $("#editImgInput").find(".file-preview-image").attr("src");
	var imageBase64 = imageSrc.substring(imageSrc.indexOf(',') + 1, imageSrc.length);
//	var imageBase64 = $("#editImgInput").find(".file-preview-image")
//			.attr("src").replace("data:image/jpeg;base64,", "");
	var imageName = $("#editImgInput").find(".file-caption-name").attr("title");
	var imgId;
	var fileObj = {
		"Filename" : imageName,
		"ContentType" : "image/png",
		"base64" : imageBase64
	};

	pullDataFromCloudWithToken("Files", "CREATE", fileObj, "", "", "",
			function(data) {
				imgId = data.Result.Id;
				//updateParentCategory(categoryOldName, categoryNewName, imgId);
				updateCategoryData(categoryNewName, imgId, categoryNewPid);
			});
	return imgId;
}

function updateCategoryData(categoryNewName, imgId, categoryNewPid) {
	var parentCateId;
	var categoryId = $("#categoryEdit").attr("name");
	var pid;
	if (categoryNewPid == undefined || categoryNewPid == null || categoryNewPid == "") {
		pid = 0;
	}else{
		pid = categoryNewPid;
	} 
	
	var urlInfo = "";
	if(ImgIdresult2.length>0){
		urlInfo = ImgIdresult2[0];
	}
	
	var categoryObj = 
		{ 
			"Categoryname" : categoryNewName,
			"Pid" : pid, 
			"cateImgUrl" : imgId,
			"cateImgUrl" : urlInfo
		};
	pullDataFromCloudWithToken("Category/"+categoryId, "UPDATE", categoryObj,"", "", "", editCategoryCallback);
	 
	
}


/**
 * update Category end
 * 
 */
function addModalSaveAndCancel() {
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"
			+ "<button type='button' class='btn btn-primary save-category' onclick='javascript:void(0);saveCategory();'>Save</button>";
	$(".addCategoryModalFooter").html(footerHtmlStr);
}

function addModalSpinner() {
	$(".addCategoryModalFooter").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function editModalSaveAndCancel() {
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"
					  + "<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveCategoryEdit();'>Save</button>";
	$(".editCategoryModalFooter").html(footerHtmlStr);
}

function editModalSpinner() {
	$(".editCategoryModalFooter").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
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
		if (categoryName.length < 3 || categoryName.length > 45) {
			categoryNameObj.parent().removeClass("has-error").addClass("has-error");
			categoryNameObj.prev().text("Length is 3 - 45.");
			categoryNameObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			validInputs = true;
		}
	} 
	return validInputs;
}

function comfirmCheckOfDeleteCategory(obj) {
	  
	var categoryID = $(obj).parents('tr').attr("rowid");;
	
	var expand = {};
	var filter = { "Pid" : categoryID };
	var fieldsReturn = {
		"Id" : 1,
		"Categoryname" : 1
	}; 
	pullDataFromCloudWithToken("Category", "READ", "", expand, filter ,fieldsReturn, function(data){
		var childCounts = data.Count;
		if (childCounts > 0){
			$('#deleteNotLastCategoryModal').modal('show');
		}else{
			$("#toDeleteItemID").val(categoryID);
			$('#deleteIsLastCategoryModal').modal('show');
		}	  
	});  
}

function deleteCategory() {
	//deleteSingleImg(imageId);
	var categoryID = $("#toDeleteItemID").val();
	//var categoryName = $("#toDeleteItemID").attr("name");
	// detele Category 
	var res = judgeCurCategoryHasproduct(categoryID);
	if(res){
		if(categoryID != null && categoryID != ""){
			judgeCurrentCategoryHasProduct(categoryID)
		}	
	} else{
		$('#forbiddenDeleteModal').modal('show');
	}
	
}

function deleteCategoryCallback(data) {
	$('#deleteIsLastCategoryModal').modal('hide');
	refreshTableContent2();
}

function refreshTableContent2() {
	cancelDialog();
	$('.tableDiv')
			.html(
					"<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData2();
}


function loadPageContentData2() {
	var expand = {
		"Pid" : {
			"TargetTypeName" : "Category",
			"Fields" : {
				"Id" : 1,
				"Categoryname" : 1
			}
		}
	};
	var fieldsReturn = {
		"Id" : 1,
		"Categoryname" : 1,
		"Pid" : 1,
//		"ParentCategory" : 1,
		"cateImgUrl" : 1
	};
	pullDataFromCloudWithToken2("Category", "READ", "", expand, "",
			fieldsReturn, listAllCategoriesCallback,currentPage, 10);

}

function createCategoryCallback(data) {
	$(".addCategoryModalFooter").html("");
	
	addModalSaveAndCancel();
	
	//var expand = {};
	refreshTableContent();
	
	$("#addCategoryModal").find(".upload-opr").html("<div class='upload-style'>" +
													"<span class='upload-text'></span>" +
													"<input class='upload-file' type='file' accept='image/jpeg, image/png' id='upload1'>" +
													"</div>")
		
	
	ImgIdresult = [];
	$('#addCategoryModal').modal('hide');
}

function editCategoryCallback(data) {
	editModalSaveAndCancel();
	$('#editCategoryModal').modal('hide');
	var expand = {};
	refreshTableContent2();
}

function closeNotLastCategoryModal(){
	$('#deleteNotLastCategoryModal').modal('hide');
}
function refreshTableContent() {
	cancelDialog();
	currentPage = 0;
	$('.tableDiv')
			.html(
					"<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData();
	
	
}

function cancelDialog() {
	 
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("input").val("");
	$("input").text("");
}

function cancelTreeDialog() {

}

function judgeCurCategoryHasproduct(categoryID){
	var retVal = true;
	if(allExistedCategoryIds.indexOf(categoryID) > 0){
		retVal= false;
	}
	return retVal;
}

function judgeCurrentCategoryHasProduct(categoryID){
	var filter = {
			productCategory:categoryID
	}
	
	var filter = {"ProductCategory":{"$eq": categoryID } };
	
	pullDataFromCloudFunction("Product", "READ", "", "",
				 function(data){
		if(data.Count == 0){
			//there's no product
			var expand = {};
			var dataObj = {};
			var fieldsReturn = {};
			var filter = {};
			pullDataFromCloudWithToken("Category/" + categoryID, "DELETE", dataObj, expand, filter, fieldsReturn, deleteCategoryCallback);
		} else if(data.Count > 0){
			$('#forbiddenDeleteModal').modal('show');
			editModalSaveAndCancel();
		}
		
	},filter);
	
}

function judgeCurrentCategoryHasProductForUpdate(categoryNewName,imageId,categoryNewPid){
	var categoryId = $("#categoryEdit").attr("name");
	console.log("categoryId:",categoryId);
	var filter = {"ProductCategory":{"$eq": categoryId } };
	
	pullDataFromCloudFunction("Product", "READ", "", "",
				function(data){
		if(data.Count == 0){
			//there's no product, could update category
			updateCategoryData(categoryNewName, imageId, categoryNewPid)
		} else if(data.Count > 0){
			$('#forbiddenDeleteModal').modal('show');
			editModalSaveAndCancel();
		}
		
	},filter);
}

function getProduct() {
	var expand = {	
			"ProductCategory" : {
	            "TargetTypeName": "Category",
	            "Fields" : {
					"Id" : 1
				}
	        }
	};
				
	pullDataFromCloudWithToken("Product", "READ", "", expand, "","",getAllCategoryIds);

}
var allExistedCategoryIds = "";

//get all customerUSerId from order if this user has orders
function getAllCategoryIds(data) {
	allExistedCategoryIds = "";
	var allProduct = data.Result;
	for ( var index in allProduct) {
		var productRow = allProduct[index];
		var Category = productRow.ProductCategory;
		if(Category!=null){
			allExistedCategoryIds = allExistedCategoryIds+" "+Category.Id;
			}
		}
}

