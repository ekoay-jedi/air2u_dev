$(document).ready(function(){
	if($("#userRoleValue").val().indexOf("Root")!="-1"){
		$(".side-menu-root").removeClass("side-menu-hidden").addClass("side-menu-show");
		$(".side-menu-admin").removeClass("side-menu-show").addClass("side-menu-hidden");
	
	}else if($("#userRoleValue").val().indexOf("Manager")!="-1"){
		$(".side-menu-root").removeClass("side-menu-hidden").addClass("side-menu-show");
		$(".side-menu-admin").removeClass("side-menu-show").addClass("side-menu-hidden");
	
	}else{
		$(".side-menu-admin").removeClass("side-menu-hidden").addClass("side-menu-show");
		$(".side-menu-root").removeClass("side-menu-show").addClass("side-menu-hidden");
	}
});
