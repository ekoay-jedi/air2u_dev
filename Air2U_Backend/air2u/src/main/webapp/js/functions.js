function callAjax(ajaxURL, callback, datastring){
	var dataStr = isBlank(datastring) ? "{}" : datastring.toString();
	jQuery.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: ajaxURL,
		data: dataStr,
		dataType: "json",
		success: callback
	});
}

var cloudAppInfos = {
	"appID" : "emqn75r4njlqhrtx",
	"restfulUrl" : "https://api.everlive.com/v1/",
};

var cloudAPImethodMap = new LinkedMap();
cloudAPImethodMap.put("CREATE","POST");
cloudAPImethodMap.put("UPDATE","PUT");
cloudAPImethodMap.put("DELETE","DELETE");
cloudAPImethodMap.put("READ","GET");

function pullDataFromCloudWithToken(requestUrl,method,dataObj,expandExpress,filterExpress,fieldsReturnExpress,callback){
	var cloudUrl = cloudAppInfos.restfulUrl;
	cloudUrl += cloudAppInfos.appID;
	cloudUrl += "/";
	var method = isBlank(method) ? cloudAPImethodMap.get("READ") : cloudAPImethodMap.get(method);
	var expandExpress = isBlank(expandExpress) ? JSON.stringify({}) : JSON.stringify(expandExpress);
	var fieldsReturnExpress = isBlank(fieldsReturnExpress) ? JSON.stringify({}) : JSON.stringify(fieldsReturnExpress);
	var filterExpress = isBlank(filterExpress) ? JSON.stringify({}) : JSON.stringify(filterExpress);
	var dataStr = isBlank(dataObj) ? JSON.stringify({}) : JSON.stringify(dataObj);
	var queryFilter = isBlank(queryFilter) ? JSON.stringify({}) : JSON.stringify(queryFilter);
	$.ajax({
	    type: method,
	    url: cloudUrl+requestUrl,
	    headers: {"Authorization" : $("#tokenValue").val(),
	    		  "X-Everlive-Expand" : expandExpress,
	    		  "X-Everlive-Fields" : fieldsReturnExpress,
	    		  "X-Everlive-Filter" : filterExpress
	    		  },
	    contentType: "application/json",
	    data: dataStr,
	    success: callback,
	    error: function (error) {
	        //alert(JSON.stringify(error));
	    	$('.errorMessageInAlertModal').text(error.responseText);
	    	$("#informationAlertModal").modal('show');
	    }
	});	
}


function pullDataFromCloudWithToken2(requestUrl,method,dataObj,expandExpress,filterExpress2,fieldsReturnExpress,callback,skip,take){
	var cloudUrl = cloudAppInfos.restfulUrl;
	cloudUrl += cloudAppInfos.appID;
	cloudUrl += "/";
	var method = isBlank(method) ? cloudAPImethodMap.get("READ") : cloudAPImethodMap.get(method);
	var expandExpress = isBlank(expandExpress) ? JSON.stringify({}) : JSON.stringify(expandExpress);
	var fieldsReturnExpress = isBlank(fieldsReturnExpress) ? JSON.stringify({}) : JSON.stringify(fieldsReturnExpress);
	var filterExpress = isBlank(filterExpress2) ? JSON.stringify({}) : JSON.stringify(filterExpress2);
	var dataStr = isBlank(dataObj) ? JSON.stringify({}) : JSON.stringify(dataObj);
	var queryFilter = isBlank(queryFilter) ? JSON.stringify({}) : JSON.stringify(queryFilter);
	$.ajax({
	    type: method,
	    url: cloudUrl+requestUrl,
	    headers: {"Authorization" : $("#tokenValue").val(),
	    		  "X-Everlive-Expand" : expandExpress,
	    		  "X-Everlive-Fields" : fieldsReturnExpress,
	    		  "X-Everlive-Filter" : filterExpress,
	    		  "X-Everlive-Skip" : skip*10,
	    		  "X-Everlive-Take" : take
	    		  },
	    contentType: "application/json",
	    data: dataStr,
	    success: callback,
	    error: function (error) {
	        //alert(JSON.stringify(error));
	    	$('.errorMessageInAlertModal').text(error.responseText);
	    	$("#informationAlertModal").modal('show');
	    }
	});	
}

//------------------
/*function pullDataFromCloudWithToken2(requestUrl,method,dataObj,expandExpress,filterExpress,fieldsReturnExpress,callback,skip,take){
	var cloudUrl = cloudAppInfos.restfulUrl;
	cloudUrl += cloudAppInfos.appID;
	cloudUrl += "/";
	var method = isBlank(method) ? cloudAPImethodMap.get("READ") : cloudAPImethodMap.get(method);
	var expandExpress = isBlank(expandExpress) ? JSON.stringify({}) : JSON.stringify(expandExpress);
	var fieldsReturnExpress = isBlank(fieldsReturnExpress) ? JSON.stringify({}) : JSON.stringify(fieldsReturnExpress);
	var filterExpress = isBlank(filterExpress) ? JSON.stringify({}) : JSON.stringify(filterExpress);
	var dataStr = isBlank(dataObj) ? JSON.stringify({}) : JSON.stringify(dataObj);
	var queryFilter = isBlank(queryFilter) ? JSON.stringify({}) : JSON.stringify(queryFilter);
	$.ajax({
	    type: method,
	    url: cloudUrl+requestUrl,
	    headers: {
	    	      "Authorization" : $("#tokenValue").val(),
	    		  "X-Everlive-Expand" : expandExpress,
	    		  "X-Everlive-Fields" : fieldsReturnExpress,
	    		  "X-Everlive-Filter" : filterExpress,
	    		  "X-Everlive-Skip" : skip*10,
	    		  "X-Everlive-Take" : take
	    		  },
	    contentType: "application/json",
	    data: dataStr,
	    success: callback,
	    error: function (error) {
	        //alert(JSON.stringify(error));
	    	$('.errorMessageInAlertModal').text(error.responseText);
	    	$("#informationAlertModal").modal('show');
	    }
	});	
}*/
//------------------

function pullDataFromCloudWithTokenAndSort(requestUrl,method,dataObj,expandExpress,filterExpress,fieldsReturnExpress,sortExpress,callback){
	var cloudUrl = cloudAppInfos.restfulUrl;
	cloudUrl += cloudAppInfos.appID;
	cloudUrl += "/";
	var method = isBlank(method) ? cloudAPImethodMap.get("READ") : cloudAPImethodMap.get(method);
	var expandExpress = isBlank(expandExpress) ? JSON.stringify({}) : JSON.stringify(expandExpress);
	var fieldsReturnExpress = isBlank(fieldsReturnExpress) ? JSON.stringify({}) : JSON.stringify(fieldsReturnExpress);
	var filterExpress = isBlank(filterExpress) ? JSON.stringify({}) : JSON.stringify(filterExpress);
	var sortExpress = isBlank(sortExpress) ? JSON.stringify({}) : JSON.stringify(sortExpress);
	var dataStr = isBlank(dataObj) ? JSON.stringify({}) : JSON.stringify(dataObj);
	var queryFilter = isBlank(queryFilter) ? JSON.stringify({}) : JSON.stringify(queryFilter);
	$.ajax({
	    type: method,
	    url: cloudUrl+requestUrl,
	    headers: {"Authorization" : $("#tokenValue").val(),
	    		  "X-Everlive-Expand" : expandExpress,
	    		  "X-Everlive-Fields" : fieldsReturnExpress,
	    		  "X-Everlive-Filter" : filterExpress,
	    		  "X-Everlive-Sort" : sortExpress
	    		  },
	    contentType: "application/json",
	    data: dataStr,
	    success: callback,
	    error: function (error) {
	        //alert(JSON.stringify(error));
	    	$('.errorMessageInAlertModal').text(error.responseText);
	    	$("#informationAlertModal").modal('show');
	    }
	});	
}

/////////////////////
function pullDataFromCloudFunction(requestUrl,method,dataObj,expandExpress,callback,queryFilter,skip,take){
	var cloudUrl = cloudAppInfos.restfulUrl;
	cloudUrl += cloudAppInfos.appID;
	cloudUrl += "/";
	var method = isBlank(method) ? cloudAPImethodMap.get("READ") : cloudAPImethodMap.get(method);
	var expandExpress = isBlank(expandExpress) ? JSON.stringify({}) : JSON.stringify(expandExpress);
	var dataStr = isBlank(dataObj) ? JSON.stringify({}) : JSON.stringify(dataObj);
	var queryFilter = isBlank(queryFilter) ? JSON.stringify({}) : JSON.stringify(queryFilter);
	$.ajax({
	    type: method,
	    url: cloudUrl+requestUrl,
	    headers: {"Authorization" : $("#tokenValue").val(),
	    		  "X-Everlive-Expand" : expandExpress,
	    		  "X-Everlive-Filter" : queryFilter,
	    		  "X-Everlive-Skip" : skip * 10,
	    		  "X-Everlive-Take" : take
	    		  },
	    contentType: "application/json",
	    data: dataStr,
	    success: callback,
	    error: function (error) {
	        //alert(JSON.stringify(error));
	    	$('.errorMessageInAlertModal').text(error.responseText);
	    	$("#informationAlertModal").modal('show');
	    }
	});	
}

function pullDataFromCloudFunction22(requestUrl,method,dataObj,expandExpress,callback,queryFilter,skip,take,sortExpress){
	var cloudUrl = cloudAppInfos.restfulUrl;
	cloudUrl += cloudAppInfos.appID;
	cloudUrl += "/";
	var method = isBlank(method) ? cloudAPImethodMap.get("READ") : cloudAPImethodMap.get(method);
	var expandExpress = isBlank(expandExpress) ? JSON.stringify({}) : JSON.stringify(expandExpress);
	var dataStr = isBlank(dataObj) ? JSON.stringify({}) : JSON.stringify(dataObj);
	var queryFilter = isBlank(queryFilter) ? JSON.stringify({}) : JSON.stringify(queryFilter);
	var sortExpress = isBlank(sortExpress) ? JSON.stringify({}) : JSON.stringify(sortExpress);
	
	$.ajax({
	    type: method,
	    url: cloudUrl+requestUrl,
	    headers: {"Authorization" : $("#tokenValue").val(),
	    		  "X-Everlive-Expand" : expandExpress,
	    		  "X-Everlive-Filter" : queryFilter,
	    		  "X-Everlive-Skip" : skip * 10,
	    		  "X-Everlive-Take" : take,
	    		  "X-Everlive-Sort" : sortExpress,
	    		  "X-Everlive-Sort" : sortExpress
	    		  },
	    contentType: "application/json",
	    data: dataStr,
	    success: callback,
	    error: function (error) {
	        //alert(JSON.stringify(error));
	    	$('.errorMessageInAlertModal').text(error.responseText);
	    	$("#informationAlertModal").modal('show');
	    }
	});	
}


function pullDataFromCloudFunction2(requestUrl,method,dataObj,expandExpress,callback,queryFilter,skip,take){
	var cloudUrl = cloudAppInfos.restfulUrl;
	cloudUrl += cloudAppInfos.appID;
	cloudUrl += "/";
	var method = isBlank(method) ? cloudAPImethodMap.get("READ") : cloudAPImethodMap.get(method);
	var expandExpress = isBlank(expandExpress) ? JSON.stringify({}) : JSON.stringify(expandExpress);
	var dataStr = isBlank(dataObj) ? JSON.stringify({}) : JSON.stringify(dataObj);
	var queryFilter = isBlank(queryFilter) ? JSON.stringify({}) : JSON.stringify(queryFilter);
	$.ajax({
	    type: method,
	    url: cloudUrl+requestUrl,
	    headers: {"Authorization" : $("#tokenValue").val(),
	    		  "X-Everlive-Expand" : expandExpress,
	    		  "X-Everlive-Filter" : queryFilter,
	    		  "X-Everlive-Skip" : skip * 10,
	    		  "X-Everlive-Take" : take
	    		  },
	    contentType: "application/json",
	    data: dataStr,
	    success: callback,
	    error: function (error) {
	        //alert(JSON.stringify(error));
	    	$('.errorMessageInAlertModal').text(error.responseText);
	    	$("#informationAlertModal").modal('show');
	    }
	});	
}

function pullDataFromCloudFunctionForMulti(requestUrl,method,dataObj,expandExpress,callback,queryFilter,skip,Take){
	var cloudUrl = cloudAppInfos.restfulUrl;
	cloudUrl += cloudAppInfos.appID;
	cloudUrl += "/";
	var method = isBlank(method) ? cloudAPImethodMap.get("READ") : cloudAPImethodMap.get(method);
	var expandExpress = isBlank(expandExpress) ? JSON.stringify({}) : JSON.stringify(expandExpress);
	var dataStr = isBlank(dataObj) ? JSON.stringify({}) : JSON.stringify(dataObj);
	var queryFilter = isBlank(queryFilter) ? JSON.stringify({}) : JSON.stringify(queryFilter);
	var count = 0;
	$.ajax({
	    type: method,
	    url: cloudUrl+requestUrl,
	    headers: {"Authorization" : $("#tokenValue").val(),
	    		  "X-Everlive-Expand" : expandExpress,
	    		  "X-Everlive-Filter" : queryFilter,
	    		  "X-Everlive-Skip" : skip*50,
	    		  "X-Everlive-Take" : 50
	    		  },
	    contentType: "application/json",
	    data: dataStr,
	    success: callback,
	    error: function (error) {
	        //alert(JSON.stringify(error));
	    	$('.errorMessageInAlertModal').text(error.responseText);
	    	$("#informationAlertModal").modal('show');
	    }
	});	
}

function getCount(tableName){
	var cloudUrl = cloudAppInfos.restfulUrl;
	cloudUrl += cloudAppInfos.appID;
	cloudUrl += "/";
	var requestUrl = tableName+'/_count'
	$.ajax({
	    url: cloudUrl+requestUrl,
	    type: "GET",
	    headers: {"Authorization" : $("#tokenValue").val()},
	    success: function(data){
	    	var countVal = data.Result;
	    	console.log("countVal:"+countVal)
	    },
	    error: function(error){
	        alert(JSON.stringify(error));
	    }
	});
}


function htmlspecialchars(string, quote_style, charset, double_encode) {
	  //       discuss at: http://phpjs.org/functions/htmlspecialchars/
	  //      original by: Mirek Slugen
	  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  //      bugfixed by: Nathan
	  //      bugfixed by: Arno
	  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
	  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
	  //       revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  //         input by: Ratheous
	  //         input by: Mailfaker (http://www.weedem.fr/)
	  //         input by: felix
	  // reimplemented by: Brett Zamir (http://brett-zamir.me)
	  //             note: charset argument not supported
	  //        example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
	  //        returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
	  //        example 2: htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES']);
	  //        returns 2: 'ab"c&#039;d'
	  //        example 3: htmlspecialchars('my "&entity;" is still here', null, null, false);
	  //        returns 3: 'my &quot;&entity;&quot; is still here'

	  var optTemp = 0,
	    i = 0,
	    noquotes = false;
	  if (typeof quote_style === 'undefined' || quote_style === null) {
	    quote_style = 2;
	  }
	  string = string.toString();
	  if (double_encode !== false) { // Put this first to avoid double-encoding
	    string = string.replace(/&/g, '&amp;');
	  }
	  string = string.replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;');

	  var OPTS = {
	    'ENT_NOQUOTES': 0,
	    'ENT_HTML_QUOTE_SINGLE': 1,
	    'ENT_HTML_QUOTE_DOUBLE': 2,
	    'ENT_COMPAT': 2,
	    'ENT_QUOTES': 3,
	    'ENT_IGNORE': 4
	  };
	  if (quote_style === 0) {
	    noquotes = true;
	  }
	  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
	    quote_style = [].concat(quote_style);
	    for (i = 0; i < quote_style.length; i++) {
	      // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
	      if (OPTS[quote_style[i]] === 0) {
	        noquotes = true;
	      } else if (OPTS[quote_style[i]]) {
	        optTemp = optTemp | OPTS[quote_style[i]];
	      }
	    }
	    quote_style = optTemp;
	  }
	  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
	    string = string.replace(/'/g, '&#039;');
	  }
	  if (!noquotes) {
	    string = string.replace(/"/g, '&quot;');
	  }

	  return string;
}

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //month   
    "d+" : this.getDate(),                    //date   
    "h+" : this.getHours(),                   //hour   
    "m+" : this.getMinutes(),                 //minute
    "s+" : this.getSeconds(),                 //second   
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter   
    "S"  : this.getMilliseconds()             //millisecond   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};  

function isBlank(object){
	// should not consider 0, 0 == '' is true.
	if(object == 0){
		return false;
	}
	return (object == undefined) || (object == null) || (object == '');
}

function DataString(){
	this.sb = new StringBuffer();

	this.put = function(key, value){
		if(isBlank(value))return;
		this.sb.append(key);
		this.sb.append('=');
		this.sb.append(value);
		this.sb.append('&');
	};
	
	this.append = function(string){
		if(isBlank(string))return;
		this.sb.append(string);
		this.sb.append('&');
	};
	
	this.toString = function(){
		return this.sb.toString();
	};
	
	this.isEmpty = function(){
		var s = jQuery.trim(this.toString());
		return isBlank(s) || s == '';
	};
	
	
}

/*StringBuffer implementation*/
function StringBuffer(){
	this.buffer = [];
}
StringBuffer.prototype.append = function append(string){
	this.buffer.push(string);
	return this;
};
StringBuffer.prototype.toString = function toString(){
	return this.buffer.join("");
};
StringBuffer.prototype.clear = function toString(){
	this.buffer = [];
};
/*End StringBuffer*/

/*BEGIN LinkedMap*/
/*
	functions - 
	map.put(key, value);
	map.remove(key);            //removes and returns the element keyed on "key". this resizes the map
	map.get(key);                   //returns but does not remove the element keyed on "key"
	map.elementAt(idx)         // the map is backed by a list (hence the Link!). return the elements at "idx"
	map.length();
	
	to iterate the map, do something like -
	for(var idx = 0; idx < map.length(); idx++){
	    map.elementAt(idx);
	}
 * 
 */
function LinkedMap(){
	this.list = new Array();
	this.indices = new Object();

	this.put = function(key, value){
		//check to see if this value is in there. if so overwrite
		var isNew = false;
		
		var idx = this.indices[key];
		if( isBlank(idx) ){
			idx = this.list.length;
			isNew = true;
		}
		this.list[idx] = new KeyVal(key, value);
		this.indices[key] = idx;
		return isNew;
	};
	
	this.remove = function(key){
		var idx = this.indices[key];
		if( isBlank(idx) ) return null;
		
		delete (this.indices[key]);
		var removed = this.list.splice(idx, 1);
		
		//shift indices since list was altered. yea yea. complexity
		//and blah blah.  if you find a better way to do this, be my guest.
		for(var k in this.indices){
			var toShift = this.indices[k];
			if( toShift > idx ){
				this.indices[k] = toShift-1;
				if(!isBlank(this.list[toShift-1].value.index)){
					this.list[toShift-1].value.index = toShift; 
				}
			}
		}
		
		return removed[0].value;
	};
	this.reorderIndex = function(){
		if(!isBlank(this.list)){
			for(var k=0,len=this.list.length; k<len; k++){
				this.list[k].value.index = k + 1;
			}
		}
	};

	this.moveElement = function(oldIdx, newIdx){
		var valsChanged = new Array();
		var keyValToMove = this.list[oldIdx];
		//return if val doesn't exist, or new idx is out of bounds, or old index is equal to new one i.e not moving 
		if( isBlank(keyValToMove) || newIdx > this.list.length || oldIdx == newIdx )return;
		var keyToMove = keyValToMove.key;
		var goingDown = newIdx < oldIdx;
		
		var numToShift = Math.abs(oldIdx - newIdx);
		var iter = 0;
		var runner = oldIdx;
		while(iter < numToShift){
			//runner = 1;
			var nextIdx;
			if(goingDown){
				nextIdx = runner - 1;
			}else{
				nextIdx = runner + 1;
			}
			
			
			this.list[runner] = this.list[nextIdx];
			
			
			
			//update the values in the map pointing to the list
			var keyValMoved = this.list[runner];
			var key = keyValMoved.key;
			this.indices[key] = runner;
			
			//if the value has an index field, update it, too
			if(!isBlank(keyValMoved.value.index)){
				keyValMoved.value.index = runner;
				this.list[runner] = keyValMoved;
			}
			runner = nextIdx;
			
			valsChanged.push(keyValMoved.value);
			iter++;
		}
		

		//if the value has an index field, update it, too
		if(!isBlank(keyValToMove.value.index)){
			keyValToMove.value.index = newIdx;
		}
		
		this.list[newIdx] = keyValToMove;
		this.indices[keyToMove] = newIdx;
		
		valsChanged.push(keyValToMove.value);
		return valsChanged; 
	};
	
	this.get = function(key){
		var idx = this.indices[key];
		if(isBlank(idx))return null;
		return this.list[idx].value;
	};
	
	this.elementAt = function(idx){
		if(isBlank(this.list[idx]))return null;
		return this.list[idx].value;
	};
	
	this.length = function(){
		return this.list.length;
	};
}

function KeyVal(key, value){
	this.key = key;
	this.value = value;
}
/*END LinkedMap*/

function getEngDateString(dateVal) {  
        var MonthArray = [
            {num: 0, str: 'Jan'},
            {num: 1, str: 'Feb'},
            {num: 2, str: 'Mar'},
            {num: 3, str: 'Apr'},
            {num: 4, str: 'May'},
            {num: 5, str: 'June'},
            {num: 6, str: 'July'},
            {num: 7, str: 'Aug'},
            {num: 8, str: 'Sep'},
            {num: 9, str: 'Oct'},
            {num: 10, str: 'Nov'},
            {num: 11, str: 'Dec'}];
    
        var date =new Date(dateVal-0);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var MonthStr = MonthArray[month].str;
        
        var thour = date.getHours();
		var tMinute = date.getMinutes();
		var tSecond = date.getSeconds();

        var dayStr = day.toString();

        if(dayStr.substr(-1) == "1"){
            dayStr += "st,";
        }else if(dayStr.substr(-1) == "2"){
            dayStr += "nd,";
        }else{
            dayStr += "th,"
        }
        
        if(thour<10){
        	thour ="0"+thour;
        }
        if(tMinute<10){
        	tMinute = "0"+tMinute;
        }
        if(tSecond<10){
        	tSecond = "0"+tSecond;
        }
        var str = MonthStr + "  " + dayStr +"  "  + year+" " +thour+":"+tMinute+":"+tSecond ;
        return str;
 }


function getEngDateString2(dateVal) {  
    var MonthArray = [
        {num: 0, str: 'Jan'},
        {num: 1, str: 'Feb'},
        {num: 2, str: 'Mar'},
        {num: 3, str: 'Apr'},
        {num: 4, str: 'May'},
        {num: 5, str: 'June'},
        {num: 6, str: 'July'},
        {num: 7, str: 'Aug'},
        {num: 8, str: 'Sep'},
        {num: 9, str: 'Oct'},
        {num: 10, str: 'Nov'},
        {num: 11, str: 'Dec'}];

    var date =new Date(dateVal-0);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var MonthStr = MonthArray[month].str;
    
    var thour = date.getHours();
	var tMinute = date.getMinutes();
	var tSecond = date.getSeconds();

    var dayStr = day.toString();

    if(dayStr.substr(-1) == "1"){
        dayStr += "st,";
    }else if(dayStr.substr(-1) == "2"){
        dayStr += "nd,";
    }else{
        dayStr += "th,"
    }

    var str = MonthStr + "  " + dayStr +"  "  + year+" ";
    return str;
};

function addBGClolr(obj){
	$(obj).addClass("high-light");
};
		
function removeBGColor(obj){
	$(obj).removeClass("high-light");
};

function getCurrentDate(){
	 var currentDate = new Date();
	 var year = currentDate.getFullYear();
	 var month = (currentDate.getMonth()+1);
	 var date = currentDate.getDate();
   	 if(month<10){
   		 month = "0"+month;
   	 }
   	 if(date<10){
   		 date = "0"+date;
   	 }
   	 return ""+year+"-"+month+"-"+date;
};

function getCurrentDateTime(){
	 var currentDate = new Date();
	 var year = currentDate.getFullYear();
	 var month = (currentDate.getMonth()+1);
	 var date = currentDate.getDate();
  	 
	 var hours = currentDate.getHours();
	 var minutes = currentDate.getMinutes();    
	 var seconds = currentDate.getSeconds();   
	 
	 if(month<10){
  		 month = "0"+month;
  	 }
  	 if(date<10){
  		 date = "0"+date;
  	 }
  	 if(hours<10){
  		hours ="0"+hours;
  	 }
  	 if(minutes<10){
  		minutes = "0"+minutes;
  	 }
  	 if(seconds<10){
  		seconds = "0"+seconds;
  	 }
  	 return ""+year+"-"+month+"-"+date +" "+ hours +":" + minutes + ":"+seconds;
};

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(), 
        "h+": this.getHours(),
        "m+": this.getMinutes(), 
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//2016-11-08 22:00:00
function formatDateToStr(now)   {     
	 var currentDate = new Date(now);
	 var year = currentDate.getFullYear();
	 var month = (currentDate.getMonth()+1);
	 var date = currentDate.getDate();
 	 
	 var hours = currentDate.getHours();
	 var minutes = currentDate.getMinutes();    
	 var seconds = currentDate.getSeconds();   
	 
	 if(month<10){
 		 month = "0"+month;
 	 }
 	 if(date<10){
 		 date = "0"+date;
 	 }
 	 if(hours<10){
 		hours ="0"+hours;
 	 }
 	 if(minutes<10){
 		minutes = "0"+minutes;
 	 }
 	 if(seconds<10){
 		seconds = "0"+seconds;
 	 }
 	 return ""+year+"-"+month+"-"+date +" "+ hours +":" + minutes + ":"+seconds;
}     

function jsObjNotNullOrUndefined(jsObj){
	var isNotNullOrUndefined = false;
	if (jsObj!=null && jsObj != "undefined") {
		isNotNullOrUndefined = true;
	}
	return isNotNullOrUndefined;
}

function getCurrentHours(){
	 var currentDate = new Date();
	 var hours = currentDate.getHours();
  	 return hours;
};

var t;
var count = 1;
var flag_btn_click = false;

var count_down = 31;
function timedCount(){
	t=setTimeout("timedCount()",1000);
	count = Number(count) + 1;
	document.onmousedown=function(event){ 
		if(!flag_btn_click){
			stopCount();
		}
	};
	
	document.onkeydown=function(event){ 
		stopCount();
	};
	if(count>= 29*60+30 && count <=30*60){
		$("#autoLogout").addClass("in");
		
		$("#autoLogout").removeClass("display-none").addClass("display-block");
		$("#autoLogout").find(".time-count").html(count_down-1);
		
		count_down = count_down - 1;
		if(count_down == 0){
			autoLogout();
		}
	}
};

function stopCount(){
	count = 0;
	clearTimeout(t);
	t=setTimeout("timedCount()",1000);
};

function autoLogout(){
	flag_btn_click = true;
	var username = $(".userNameLable").html();
	window.location = '../main/logout?username='+username;
};

function goOnOperation(){
	$("#autoLogout").removeClass("in");
	$("#autoLogout").removeClass("display-block").addClass("display-none");
	
	count = 0;
	clearTimeout(t);
	t=setTimeout("timedCount()",1000);
	flag_btn_click = false;
	count_down = 31;
}

String.prototype.endWith=function(s){
	if(s==null||s==""||this.length==0||s.length>this.length){
		return false;
	}
		
	if(this.substring(this.length-s.length)==s){
		return true;
	}else{
		return false;
	}
	return true;
}

String.prototype.startWith=function(s){
	if(s==null||s==""||this.length==0||s.length>this.length){
		return false;
	}
	if(this.substr(0,s.length)==s){
		 return true;
	}else{
		return false;
	}
	return true;
}

Date.prototype.DateDiff = function(strInterval, dtEnd) {   
    var dtStart = this;  
    if (typeof dtEnd == 'string'){   
        dtEnd = StringToDate(dtEnd);  
    }  
    switch (strInterval) {   
        case 's' :return parseInt((dtEnd - dtStart) / 1000);  
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}  

Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(), 
        "h+": this.getHours(),  
        "m+": this.getMinutes(),  
        "s+": this.getSeconds(), 
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds() 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function StringToDate(DateStr){   
	
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {   
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
}

function StringToDatesubOne(DateStr){ 
	var myDate = new Date();
	var hour = myDate.getHours();      //获取当前小时数(0-23)
	var strArr= DateStr.split('-');  
    var newStr = strArr[0]+"-"+strArr[1]+"-"+parseInt(parseInt(strArr[2])+1);
    
	var converted = Date.parse(newStr); 
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {   
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],parseInt(arys[2]+1));  
    }  
    return myDate;  
}



function StringToDatesubOne2(DateStr){ 
	var myDate = new Date();
	var hour = myDate.getHours();      //获取当前小时数(0-23)
    if(hour<8){
    	var strArr= DateStr.split('-');  
        var newStr = strArr[0]+"-"+strArr[1]+"-"+parseInt(parseInt(strArr[2])-1);
        
    	var converted = Date.parse(newStr); 
        var myDate = new Date(converted);  
        if (isNaN(myDate))  
        {   
            var arys= DateStr.split('-');  
            myDate = new Date(arys[0],--arys[1],parseInt(arys[2]-1));  
        }  
        return myDate;  
    }else{
    	var strArr= DateStr.split('-');  
        var newStr = strArr[0]+"-"+strArr[1]+"-"+parseInt(parseInt(strArr[2]));
        
    	var converted = Date.parse(newStr); 
        var myDate = new Date(converted);  
        if (isNaN(myDate))  
        {   
            var arys= DateStr.split('-');  
            myDate = new Date(arys[0],--arys[1],parseInt(arys[2]));  
        }  
        return myDate;  
    }
	
	
}

function getGUID(len, radix){
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}

function getNewGUID(){
	/*var timestamp = Date.parse(new Date())+""; 
    return timestamp;*/
	var mydate = new Date();
	var year = mydate.getFullYear()+"";
	var month = mydate.getMonth()+1; 
	if(month<10){
		month = "0"+month;
	} else{
		month = month+"";
	}
	var day = mydate.getDate();
	if(day<10){
		day = "0"+day;
	} else{
		day = day+"";
	}
	var hour = mydate.getHours(); 
	var min = mydate.getMinutes()+""; 
	var sec = mydate.getSeconds()+"";
	var msec = mydate.getMilliseconds()+""; 
	return year+month+day+hour+min+sec+msec+"";
}

function getCurMonth(){
	var mydate = new Date();
	var month = mydate.getMonth()+1; 
	return month
}

function getCurDay(){
	var mydate = new Date();
	var day = mydate.getDate();
	return day;
}

function getBrower(){
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	if(isOpera){
    	return "Opera";
    }

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if(isFirefox){
    	return "FireFox";
    }

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    if(isSafari){
    	return "Safari";
    }
    
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if(isIE){
    	return "IE";
    }


    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    if(isChrome){
    	return "Chrome";
    }
}

function getOsVersion(){  
    var opName = "";  
    var Name = "";  
    var ua = window.navigator.userAgent;  
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");  
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC")  
            || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");  
       
    if (isMac){  
        opName = "Mac";  
                Name   = "Mac";  
    }else if(isWin){  
                var osN = ua.substr(ua.indexOf("Windows NT ")+19, 2);  
            var osV = ua.substr(ua.indexOf("Windows NT ")+11, 3);  
              
            switch (osV) {  
                case "5.0":  
                    opName = "Windows XP2000";  
                    Name   = "Win2000";  
                    break;  
                case "5.1":  
                    opName = "Windows XP ";  
                    Name   = "WinXP";  
                    break;  
                case "5.2":  
                    opName = "Windows 2003";  
                    Name   = "Win2003";  
                    break;  
                case "6.1":  
                    opName = "Windows 7 "+osN;  
                    Name   = "Win7";  
                    break;  
                default:  
                    Name = "Other";  
                    break;  
            }  
    }else{  
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;  
        if (isUnix){  
                    opName = "Unix";  
                        Name = "Unix";  
        }else{  
            var isLinux = (String(navigator.platform).indexOf("Linux") > -1);  
            if (isLinux){  
                            opName = "Linux";  
                        Name   = "Linux";  
            }else{  
                Name = "Other";  
            }  
        }            
    }  
    return Name; 
}  


function pushNotification(){
	
//	var el = new Everlive('emqn75r4njlqhrtx');
//	el.push.notifications.create(notification,
//	    function(data){
//	        alert(JSON.stringify(data));
//	    },
//	    function(error){
//	        alert(JSON.stringify(error));
//	    });
	
//	var Everlive = require('everlive-sdk');

	var el = new Everlive({'appId' : 'emqn75r4njlqhrtx',
		'masterKey' : 'CsWA258EDUwLhN9YcwA6rJ95KmhsezLj'});
	var info = {
		"Message":'Hello2222'
	};
//	el.push.notifications.create(info,
//	    function(data){
//	        console.log(JSON.stringify(data));
//	    },
//	    function(error){
//	        console.log(JSON.stringify(error));
//	    });
};


function convertData(num){
	 var num = num.toString();
	 
	if(num.substr(-1) == "1"){
		num += "st";
    }else if(num.substr(-2) == "2"){
    	num += "nd.";
    }else{
    	num += "th"
    }
	return num;

}


//Array.prototype.contains = function (obj) {  
//    var i = this.length;  
//    while (i--) {  
//        if (this[i] === obj) {  
//            return true;  
//        }  
//    }  
//    return false;  
//}  
