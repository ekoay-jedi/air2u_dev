package com.ceosoftcenters.air2u.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jxl.Workbook;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

@Controller
@RequestMapping("/admin")
public class AdminFunctions {
	
	public boolean adminCheckingIfLogin(HttpServletRequest request, String attributeKey) {
		boolean isLogin = false;
		
		HttpSession session = request.getSession();		
		Object token = session.getAttribute(attributeKey);
		if (token!=null) {
			isLogin=true;
		}
		return isLogin;
	}
	
	@RequestMapping("/orders")
	public String orderManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		if (adminCheckingIfLogin(request,"token")) {
			return "adminOrdersManagement";
		}else {
			return "redirect:/main/login";
		}
	}
	
	@RequestMapping("/orderDetail")
	public String orderDetailPage(@RequestParam(value = "orderId", required = false) String orderID, ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		model.addAttribute("orderId",orderID);
		
		if (adminCheckingIfLogin(request,"token")) {
			return "adminOrderDetailAndPrint";
		}else {
			return "redirect:/main/login";
		}
		
	}
	
	@RequestMapping("/roles")
	public String roleManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		
		if (adminCheckingIfLogin(request,"token")) {
			return "adminRolesManagement";
		}else {
			return "redirect:/main/login";
		}
		
	}
	
	@RequestMapping("/adminUsers")
	public String adminUsersManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		if (adminCheckingIfLogin(request,"token")) {
			return "adminAdminUsersManagement";
		}else {
			return "redirect:/main/login";
		}
	}
	

	@RequestMapping("/adminManagers")
	public String adminManagersManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		if (adminCheckingIfLogin(request,"token")) {
			return "adminManagersManagement";
		}else {
			return "redirect:/main/login";
		}
	}
	
	@RequestMapping("/adminCustomers")
	public String adminCustomerUsersManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		if (adminCheckingIfLogin(request,"token")) {
			return "adminCustomerUsersManagement";
		}else {
			return "redirect:/main/login";
		}
	}
	
	@RequestMapping("/points")
	public String adminPointsManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		if (adminCheckingIfLogin(request,"token")) {
			return "adminLoyaltyPointRuleManagement";
		}else {
			return "redirect:/main/login";
		}
	}
	
	@RequestMapping("/category")
	public String categoryManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) { 
		if (adminCheckingIfLogin(request,"token")) {
			return "categoryManagement";
		}else {
			return "redirect:/main/login";
		}
	}
	
	@RequestMapping("/product")
	public String productManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) { 
		if (adminCheckingIfLogin(request,"token")) {
			return "productManagement";
		}else {
			return "redirect:/main/login";
		}
	}
	
	@RequestMapping("/taxation")
	public String taxationManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) { 
		if (adminCheckingIfLogin(request,"token")) {
			return "taxationManagement";
		}else {
			return "redirect:/main/login";
		}
	}
	
	@RequestMapping("/shippingFees")
	public String shippingFeesManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) { 
		if (adminCheckingIfLogin(request,"token")) {
			return "shippingFeesManagement";
		}else {
			return "redirect:/main/login";
		}
	}
	
	@RequestMapping("/logout")
	public String logout(Model model, HttpServletRequest request, HttpServletResponse response) {
		invalidateTheSessionIfNeed(request);
		return "redirect:/main/login";
	}

	public void setSessionKeyValue(HttpServletRequest request, String attributeKey, String attributeValue){
		HttpSession session = request.getSession();		
		session.setAttribute(attributeKey, attributeValue);
	}
	
	public void invalidateTheSessionIfNeed(HttpServletRequest request){
		HttpSession session = request.getSession();
		session.invalidate();
	}
	
	@RequestMapping("/loyaltyPoints")
	public String adminLoyaltyPointsManagement(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		if (adminCheckingIfLogin(request,"token")) {
			return "adminLoyaltyPointsManagement";
		}else {
			return "redirect:/main/login";
		}
	}
	
	@RequestMapping("/pushNotification")
	public String pushNotification(ModelMap model, HttpServletRequest request, HttpServletResponse response) { 
		if (adminCheckingIfLogin(request,"token")) {
			return "pushNotification";
		}else {
			return "redirect:/main/login";
		}
	}
	
	
	@RequestMapping(value="/generate_invoice",method=RequestMethod.POST)
	@ResponseBody
	private String generateInvoice(
			HttpServletRequest request, HttpServletResponse response,
			@RequestBody String list) throws WriteException, IOException {
		
		String path = AdminFunctions.class.getResource("/").getPath();
		String websiteUrl = path.replace("/WEB-INF/classes", "");
		String imgfileDir = websiteUrl + "img/logo.png";

		String invoicefileDir = websiteUrl + "invoice/";
		File invoicefile = new File(invoicefileDir);
		if (!invoicefile.exists()) {
			invoicefile.mkdirs();
			System.out.println(invoicefile + "create successfully");
		}
		
		GenerarteInvoicePDF gen = new GenerarteInvoicePDF();
		String result = gen.generateInvocie(invoicefileDir+"invoice.pdf", imgfileDir);
		return result;
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
