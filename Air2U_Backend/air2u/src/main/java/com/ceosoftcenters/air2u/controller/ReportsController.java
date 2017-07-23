package com.ceosoftcenters.air2u.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ceosoftcenters.air2u.model.Customers;
import com.ceosoftcenters.air2u.model.LoyaltyPoint;
import com.ceosoftcenters.air2u.model.OrderCustomer;
import com.ceosoftcenters.air2u.model.OrderProduct;
import com.ceosoftcenters.air2u.model.Product;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jxl.Workbook;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("/report")
public class ReportsController {
	
	private String dataUrl = "https://api.everlive.com/v1/o6yuauaw7f5m56jb/";
	
	@RequestMapping("/test")
	public String login(Model model, HttpServletRequest request, HttpServletResponse response) {
		UserObj u = new UserObj();
		u.setUsername("admin");
		u.setPassword("123456");
		u.setGrant_type("password");
		JSONObject jsonObj = JSONObject.fromObject(u);
		
		Map<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("username", "admin");
		paramMap.put("password", "123456");
		paramMap.put("grant_type", "password");
		
		JSONObject data = HttpRequestUtils.httpsPost(dataUrl+"oauth/token", paramMap);
		model.addAttribute("data", data.toString());
		return "";
	}
	
	@RequestMapping("/save_token")
	public String saveToken(@RequestParam(value = "token", required = false) String token, @RequestParam(value = "roleValue", required = false) String roleValue, Model model, HttpServletRequest request, HttpServletResponse response) {
		setSessionKeyValue(request,"token",token);
		setSessionKeyValue(request,"roleValue",roleValue);
		if (roleValue.contains("Root")){
			return "redirect:/admin/adminUsers";
		}else{
			return "redirect:/admin/product";
		}
		
	}
	
	/**
	 * function: generate customers_list_report
	 * @param request
	 * @param response
	 * @param list
	 * @return
	 * @throws WriteException
	 * @throws IOException
	 */
	@RequestMapping(value="/gen_report",method=RequestMethod.POST)
	@ResponseBody
	private String genReport(
			HttpServletRequest request, HttpServletResponse response,
			@RequestBody String list) throws WriteException, IOException {
		
		String path = ReportsController.class.getResource("/").getPath();
		String websiteUrl = path.replace("/WEB-INF/classes", "");
		String fileDir = websiteUrl + "files/";
		File file = new File(fileDir);
		if (!file.exists()) {
			file.mkdirs();
			System.out.println(fileDir + "create successfully");
		}
		String path2 = fileDir + "customer_list_report.xls";
		System.out.println(path2);
		WritableWorkbook wbook = null;
		try {
			wbook = Workbook.createWorkbook(new File(path2));
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		WritableSheet wsheet = wbook.createSheet("Customers List", 0);
		
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		java.util.List<LinkedHashMap<String, Customers>> list2 = new ArrayList<LinkedHashMap<String, Customers>>();
		try {
			objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			list2 = (java.util.List) objectMapper.readValue(list, java.util.List.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		java.util.List<Customers> cust_list = new ArrayList<>();
		for(int i = 0; i<list2.size();i++){
			Customers customers = new Customers();
			LinkedHashMap map = list2.get(i);
			Iterator iter = map.keySet().iterator(); 
			while (iter.hasNext()) { 
				Object key = iter.next(); 
				Object val = map.get(key); 
				if(key.equals("Username")){
					if(null != val){
						customers.setUsername(val.toString());
					}
				}
				if(key.equals("DisplayName")){
					if(null != val){
						customers.setDisplayName(val.toString());
					}
				}
				
				if(key.equals("Email")){
					if(null != val){
						customers.setEmail(val.toString());
					}
				}
				
				if(key.equals("ContactNumber")){
					if(null != val){
						customers.setContactNumber(val.toString());
					}
				}
				
				if(key.equals("HomeAddress")){
					if(null != val){
						customers.setHomeAddress(val.toString());
					}
				}
				
				if(key.equals("IntroducerEmail")){
					if(null != val){
						customers.setIntroducerEmail(val.toString());
					}
				}
				
				if(key.equals("IntroducerContact")){
					if(null != val){
						customers.setIntroducerContact(val.toString());
					}
				}
				
				if(key.equals("IntroducerName")){
					if(null != val){
						customers.setIntroducerName(val.toString());
					}
				}
			}
			cust_list.add(customers);
		}
		
		wsheet = generateReport(wsheet, cust_list);
		wbook.write();
		wbook.close();
		
		return "success";
	}
	
	/**
	 * function: generate loyalty_point_report
	 * @param request
	 * @param response
	 * @param list
	 * @return
	 * @throws WriteException
	 * @throws IOException
	 */
	@RequestMapping(value="/gen_report_loyalty_point",method=RequestMethod.POST)
	@ResponseBody
	private String genLoyaltyPoint(
			HttpServletRequest request, HttpServletResponse response,
			@RequestBody String list) throws WriteException, IOException {
		
		String path = ReportsController.class.getResource("/").getPath();
		String websiteUrl = path.replace("/WEB-INF/classes", "");
		String fileDir = websiteUrl + "files/";
		File file = new File(fileDir);
		if (!file.exists()) {
			file.mkdirs();
			System.out.println(fileDir + "create successfully");
		}
		String path2 = fileDir + "loyalty_point_report.xls";
		WritableWorkbook wbook = null;
		try {
			wbook = Workbook.createWorkbook(new File(path2));
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		WritableSheet wsheet = wbook.createSheet("Loyalty Point List", 0);
		
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		java.util.List<LinkedHashMap<Object, Object>> list2 = new ArrayList<LinkedHashMap<Object, Object>>();
		try {
			objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			list2 = objectMapper.readValue(list, java.util.List.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		java.util.List<LoyaltyPoint> cust_list = new ArrayList<>();
		for(int i = 0; i<list2.size();i++){
			LoyaltyPoint loyaltyPoint = new LoyaltyPoint();
			LinkedHashMap map = list2.get(i);
			Iterator iter = map.keySet().iterator(); 
			while (iter.hasNext()) { 
				Object key = iter.next(); 
				Object val = map.get(key); 
				if(key.equals("totalPV")){
					if(null != val){
						loyaltyPoint.setTotalPV(val.toString());
					}
				}
				if(key.equals("OrderCustomer")){
					if(null!=val){
						LinkedHashMap<String, String> orderCus = (LinkedHashMap<String, String>) val;
						for(Map.Entry<String,String> entry : orderCus.entrySet()) {
							if(entry.getKey().equals("Email")){
								loyaltyPoint.setEmail(String.valueOf(entry.getValue()));
							}
							if(entry.getKey().equals("LatestAwardedPoint")){
								loyaltyPoint.setLatestAwardedPoint(String.valueOf(entry.getValue()));
							}
							if(entry.getKey().equals("CurrentPoint")){
								loyaltyPoint.setCurrentPoint(String.valueOf(entry.getValue()));
							}
						}
					}
					
				}
				
			}
			cust_list.add(loyaltyPoint);
		}
		
		wsheet = generateLoyaltyPointReport(wsheet, cust_list);
		wbook.write();
		wbook.close();
		
		return "success";
	}
	
	/**
	 * function: generate loyalty_point_report
	 * @param request
	 * @param response
	 * @param list
	 * @return
	 * @throws WriteException
	 * @throws IOException
	 */
	@RequestMapping(value="/gen_invocie_pdf",method=RequestMethod.POST)
	@ResponseBody
	private String genInvociePDF(
			HttpServletRequest request, HttpServletResponse response,
			@RequestBody String josn) throws WriteException, IOException {
		System.out.println("json:"+josn);
		String path = ReportsController.class.getResource("/").getPath();
		String websiteUrl = path.replace("/WEB-INF/classes", "");
		String fileDir = websiteUrl + "files/";
		String imgfileDir = websiteUrl + "img/logo.png";
		File file = new File(fileDir);
		if (!file.exists()) {
			file.mkdirs();
		}
		String path2 = fileDir + "invoice.pdf";
		
		OrderProduct orderProductDto = new OrderProduct();
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Map orderProduct = (Map) objectMapper.readValue(josn.split("%@%")[0], Map.class);
		
		
		
		//get order info
		orderProductDto.setOrderNumber(orderProduct.get("OrderNumber")==null? "":orderProduct.get("OrderNumber").toString());
		orderProductDto.setTotalPrice(orderProduct.get("totalPrice")==null? "":orderProduct.get("totalPrice").toString());
		orderProductDto.setTotalPV(orderProduct.get("totalPV")==null? "":orderProduct.get("totalPV").toString());
		orderProductDto.setStatus(orderProduct.get("Status")==null? "":orderProduct.get("Status").toString());
		orderProductDto.setShippingItem(orderProduct.get("ShippingItem")==null? "":orderProduct.get("ShippingItem").toString());
		orderProductDto.setCreatedAt(orderProduct.get("CreatedAt")==null? "":orderProduct.get("CreatedAt").toString());

		//gettaxrate 
		Map taxrate = (Map) objectMapper.readValue(josn.split("%@%")[2], Map.class);
		orderProductDto.setTax(taxrate.get("TaxRate") == null ? "" : taxrate.get("TaxRate").toString());
		orderProductDto.setTaxstatus(taxrate.get("TaxStatus") == null ? 0 : (int) taxrate.get("TaxStatus"));
		
		
		//get customer info
		OrderCustomer orderCustomer = new OrderCustomer();
		Map customerInfoMap = (Map) orderProduct.get("OrderCustomer");
		Iterator iter = customerInfoMap.keySet().iterator(); 
		while(iter.hasNext()){
			Object key = iter.next(); 
			Object val = customerInfoMap.get(key); 
			if(key.equals("Username")){
				if(null != val){
					orderCustomer.setUserName(val.toString());
				}
			}
			if(key.equals("Email")){
				if(null != val){
					orderCustomer.setEmail(val.toString());
				}
			}
			if(key.equals("HomeAddress")){
				if(null != val){
					orderCustomer.setHomeAddress(val.toString());
				}
			}
			if(key.equals("DeliveryAddress")){
				if(null != val){
					orderCustomer.setDeliveryAddress(val.toString());
				}
			}
			if(key.equals("ContactNumber")){
				if(null != val){
					orderCustomer.setContactNumber(val.toString());
				}
			}
			
		}
		orderProductDto.setOrderCustomer(orderCustomer);
		
		//get shippingcharges
		String shippingCharges = josn.split("%@%")[3]==null?"":josn.split("%@%")[3];
		orderProductDto.setShippingCharge(shippingCharges);
		
		
		//get Product info
		List products = objectMapper.readValue(josn.split("%@%")[1], List.class);
		List<Product> list_product = new ArrayList<>();
		for(int i =0;i<products.size();i++){
			Product product = new Product();
			Map productMap = (Map) products.get(i);
			Map productMap2 = (Map) productMap.get("Product");
			
			product.setOrderQTY(productMap.get("OrderQTY")==null ? "" : (String) productMap.get("OrderQTY"));
			Iterator iter2 = productMap2.keySet().iterator(); 
			if(iter2!=null){
				while(iter2.hasNext()){
					Object key = iter2.next(); 
					Object val = productMap2.get(key); 
					if(key.equals("ProductName")){
						if(null != val){
							product.setProductName(val.toString());
						}
					}
					if(key.equals("ProductSpecifications")){
						if(null != val){
							product.setProductSpecifications(val.toString());
						}
					}
					if(key.equals("QTY")){
						if(null != val){
							product.setQTY(val.toString());
						}
					}
					if(key.equals("pvPrice")){
						if(null != val){
							product.setPvPrice(val.toString());
						}
					}
					if(key.equals("cvPrice")){
						if(null != val){
							product.setCvPrice(val.toString());
						}
					}
				}
			}
			
			
			list_product.add(product);
		}
		
		orderProductDto.setProduct(list_product);
		
		GenerarteInvoicePDF2 generarteInvoicePDF2 = new GenerarteInvoicePDF2();
		generarteInvoicePDF2.generateInvocie(path2, imgfileDir,orderProductDto);
		
		return "success";
	}
	

	public void setSessionKeyValue(HttpServletRequest request, String attributeKey, String attributeValue){
		HttpSession session = request.getSession();		
		session.setAttribute(attributeKey, attributeValue);
	}
	
	public void invalidateTheSessionIfNeed(HttpServletRequest request){
		HttpSession session = request.getSession();
		session.invalidate();
	}
	
	public WritableSheet generateReport(WritableSheet wsheet,java.util.List<Customers> list){
        try {
            // add excel content
        	WritableFont font = new WritableFont(WritableFont.createFont("Arial"), 12, WritableFont.BOLD, true, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
    		WritableCellFormat fontFormat = new WritableCellFormat(font);
    		//set the width of column
    		wsheet.setColumnView(0, 5);  
    		wsheet.setColumnView(1, 20);  
    		wsheet.setColumnView(2, 20);  
    		wsheet.setColumnView(3, 20);  
    		wsheet.setColumnView(4, 20);  
    		wsheet.setColumnView(5, 20);  
    		wsheet.setColumnView(6, 20); 
    		wsheet.setColumnView(7, 20); 
    		wsheet.setColumnView(8, 20); 
    		wsheet.setColumnView(9, 20); 
    		//add title
        	wsheet.addCell(new jxl.write.Label(0, 0, "#",fontFormat));
        	wsheet.addCell(new jxl.write.Label(1, 0, "Customer Id",fontFormat));
        	wsheet.addCell(new jxl.write.Label(2, 0, "Customer Name",fontFormat));
        	wsheet.addCell(new jxl.write.Label(3, 0, "Email",fontFormat));
        	wsheet.addCell(new jxl.write.Label(4, 0, "Content",fontFormat));
        	wsheet.addCell(new jxl.write.Label(5, 0, "Address",fontFormat));
        	wsheet.addCell(new jxl.write.Label(6, 0, "Introducer Id",fontFormat));
        	wsheet.addCell(new jxl.write.Label(7, 0, "Introducer",fontFormat));
        	wsheet.addCell(new jxl.write.Label(8, 0, "Introducer Email",fontFormat));
            wsheet.addCell(new jxl.write.Label(9, 0, "Introducer Contact",fontFormat));

            // add content
            if(null!=list && list.size()>0){
            	for (int i = 0; i < list.size() ; i++) {
                	Customers customers = (Customers)list.get(i);

                	wsheet.addCell(new jxl.write.Label(0, i+1, String.valueOf(i+1)));

                    wsheet.addCell(new jxl.write.Label(1, i+1, customers.getEmail()==null ? "" : customers.getEmail()));
                    wsheet.addCell(new jxl.write.Label(2, i+1, customers.getUsername()==null ? "" : customers.getUsername()));
                    wsheet.addCell(new jxl.write.Label(3, i+1, customers.getEmail()==null ? "" : customers.getEmail()));
                    wsheet.addCell(new jxl.write.Label(4, i+1, customers.getContactNumber()==null ? "" : customers.getContactNumber()));
                    wsheet.addCell(new jxl.write.Label(5, i+1, customers.getHomeAddress()==null ? "" : customers.getHomeAddress()));
                    wsheet.addCell(new jxl.write.Label(6, i+1, customers.getIntroducerEmail()==null ? "" : customers.getIntroducerEmail()));
                    wsheet.addCell(new jxl.write.Label(7, i+1, customers.getIntroducerName()==null ? "" : customers.getIntroducerName()));
                    wsheet.addCell(new jxl.write.Label(8, i+1, customers.getIntroducerEmail()==null ? "" : customers.getIntroducerEmail()));
                    wsheet.addCell(new jxl.write.Label(9, i+1, customers.getIntroducerContact()==null ? "" : customers.getIntroducerContact()));
                }
            }
            
        } catch (Exception e) {
        	throw new RuntimeException("Error in generating customer list report.");
        }
		return wsheet; 
	}
	
	public WritableSheet generateLoyaltyPointReport(WritableSheet wsheet,List<LoyaltyPoint> list){
        try {
            // add excel content
        	WritableFont font = new WritableFont(WritableFont.createFont("Arial"), 12, WritableFont.BOLD, true, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
    		WritableCellFormat fontFormat = new WritableCellFormat(font);
    		//set the width of column
    		wsheet.setColumnView(0, 5);  
    		wsheet.setColumnView(1, 40);  
    		wsheet.setColumnView(2, 20);  
    		wsheet.setColumnView(3, 20);  
    		wsheet.setColumnView(4, 20);  
    	
    		//add title
        	wsheet.addCell(new jxl.write.Label(0, 0, "#",fontFormat));
        	wsheet.addCell(new jxl.write.Label(1, 0, "Customer Name",fontFormat));
        	wsheet.addCell(new jxl.write.Label(2, 0, "Latest Pt Earned",fontFormat));
        	wsheet.addCell(new jxl.write.Label(3, 0, "Current Available Pt",fontFormat));
        	wsheet.addCell(new jxl.write.Label(4, 0, "Pending Pt",fontFormat));
        	

            // add content
            if(null!=list && list.size()>0){
            	for (int i = 0; i < list.size() ; i++) {
                	LoyaltyPoint loyaltyPoint = (LoyaltyPoint)list.get(i);
            		wsheet.addCell(new jxl.write.Label(0, i+1, String.valueOf(i+1)));
                    wsheet.addCell(new jxl.write.Label(1, i+1, loyaltyPoint.getEmail()==null ? "" : loyaltyPoint.getEmail()));
                    wsheet.addCell(new jxl.write.Label(2, i+1, loyaltyPoint.getLatestAwardedPoint()==null ? "" : loyaltyPoint.getLatestAwardedPoint()));
                    wsheet.addCell(new jxl.write.Label(3, i+1, loyaltyPoint.getCurrentPoint()==null ? "" : loyaltyPoint.getCurrentPoint()));
                    wsheet.addCell(new jxl.write.Label(4, i+1, loyaltyPoint.getTotalPV()==null ? "" : loyaltyPoint.getTotalPV()));
                }
            }
            
        } catch (Exception e) {
        	throw new RuntimeException("Error in generating customer list report.");
        }
		return wsheet; 
	}

}
