package com.ceosoftcenters.air2u.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/main")
public class MainFunctions {
	
	@RequestMapping("/login")
	public String login(Model model, HttpServletRequest request, HttpServletResponse response) {
		invalidateTheSessionIfNeed(request);
		return "login";
	}
	
	@RequestMapping("/save_token")
	public String saveToken(@RequestParam(value = "token", required = false) String token,
			@RequestParam(value = "roleValue", required = false) String roleValue,
			@RequestParam(value = "userID", required = false) String userID, Model model, HttpServletRequest request, HttpServletResponse response) {
		setSessionKeyValue(request,"token",token);
		setSessionKeyValue(request,"roleValue",roleValue);
		setSessionKeyValue(request,"userID",userID);
		
		if (roleValue.contains("Root")){
			return "redirect:/admin/adminUsers";
		}else if (roleValue.equals("Manager")){
			return "redirect:/admin/adminManagers";
		}else{
			return "redirect:/admin/product";
		}
		
	}

	public void setSessionKeyValue(HttpServletRequest request, String attributeKey, String attributeValue){
		HttpSession session = request.getSession();		
		session.setAttribute(attributeKey, attributeValue);
	}
	
	public void invalidateTheSessionIfNeed(HttpServletRequest request){
		HttpSession session = request.getSession();
		session.invalidate();
	}
//	@RequestMapping("/error")
//	public String errorPage(Model model, @RequestParam(value="lastName", required=false) String exceptions) {
//		Users users = new Users();
//		users.setEmail("lawry.guo@123.com");
//		users.setUsername("admin");
//		users.setPassword("");
//		users = usersService.create(users);
////		
////		users = usersService.findUserByEmail("lawry.guo@yahoo.com");
////		
////		model.addAttribute("users", (users==null?1:0));
//		return "error";
//	}	
}
