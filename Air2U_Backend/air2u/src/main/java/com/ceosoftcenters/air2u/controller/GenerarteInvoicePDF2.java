package com.ceosoftcenters.air2u.controller;

import java.awt.Color;
import java.io.FileOutputStream;

import com.ceosoftcenters.air2u.model.OrderCustomer;
import com.ceosoftcenters.air2u.model.OrderProduct;
import com.ceosoftcenters.air2u.model.Product;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public class GenerarteInvoicePDF2 {
	public String generateInvocie(String invoicefileDir, String logoDir,OrderProduct orderProduct){

		try 
	    {
	         Document document = new Document(PageSize.A4, 1, 1, 1, 1); 
	         PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(invoicefileDir));

	        //设置字体
	        BaseFont bfChinese = BaseFont.createFont();
	        com.itextpdf.text.Font FontChinese24 = new com.itextpdf.text.Font(bfChinese, 24, com.itextpdf.text.Font.BOLD);
	        com.itextpdf.text.Font FontChinese18 = new com.itextpdf.text.Font(bfChinese, 18, com.itextpdf.text.Font.BOLD); 
	        com.itextpdf.text.Font FontChinese14 = new com.itextpdf.text.Font(bfChinese, 14, com.itextpdf.text.Font.BOLD);
	        com.itextpdf.text.Font FontChinese16 = new com.itextpdf.text.Font(bfChinese, 16, com.itextpdf.text.Font.BOLD);
	        com.itextpdf.text.Font FontChinese12 = new com.itextpdf.text.Font(bfChinese, 12, com.itextpdf.text.Font.NORMAL);
	        com.itextpdf.text.Font FontChinese11Bold = new com.itextpdf.text.Font(bfChinese, 11, com.itextpdf.text.Font.BOLD);
	        com.itextpdf.text.Font FontChinese11 = new com.itextpdf.text.Font(bfChinese, 11, com.itextpdf.text.Font.ITALIC);
	        com.itextpdf.text.Font FontChinese11Normal = new com.itextpdf.text.Font(bfChinese, 11, com.itextpdf.text.Font.NORMAL);
	        com.itextpdf.text.Font FontChineseBold = new com.itextpdf.text.Font(bfChinese, 13, com.itextpdf.text.Font.BOLD);
	        com.itextpdf.text.Font FontChineseNormal = new com.itextpdf.text.Font(bfChinese, 11, com.itextpdf.text.Font.NORMAL);
	        com.itextpdf.text.Font FontChinese9 = new com.itextpdf.text.Font(bfChinese, 9, com.itextpdf.text.Font.NORMAL);
	        com.itextpdf.text.Font FontChinese9_bold = new com.itextpdf.text.Font(bfChinese, 9, com.itextpdf.text.Font.BOLD);
	        com.itextpdf.text.Font FontChinese25 = new com.itextpdf.text.Font(bfChinese, 25, com.itextpdf.text.Font.NORMAL,new BaseColor(0, 191, 255));
	        com.itextpdf.text.Font specialFont14 = new com.itextpdf.text.Font(bfChinese, 16, com.itextpdf.text.Font.NORMAL,new BaseColor(Color.white));
	        
	        document.open();
	       
	        float[] widths = { 0.12f,0.56f,0.08f, 0.24f};
	        PdfPTable topTable = new PdfPTable(widths);
	        topTable.getDefaultCell().setBorder(0);
			   
	        //左上
	        PdfPTable titleLeftTable = new PdfPTable(1);
	        titleLeftTable.getDefaultCell().setBorder(0);
		       
	        String LogoimagePath = logoDir /*"e:/logo.png"*/;
	        
	        Image logoImage = Image.getInstance(LogoimagePath); 
	        logoImage.scaleAbsolute(120, 50);
	        PdfPCell barcode_cell = new PdfPCell(logoImage);
	        barcode_cell.setBorderWidth(0f);
	        barcode_cell.setVerticalAlignment(0);
	        barcode_cell.setPaddingLeft(-30);
	        titleLeftTable.addCell(barcode_cell);
	        PdfPCell air2uStr = new PdfPCell(new Paragraph("Air2U"));
	        air2uStr.setBorderWidth(0f);
	        air2uStr.setPaddingLeft(8);
	        titleLeftTable.addCell(air2uStr);
	        
	        topTable.addCell(titleLeftTable);
	        
	        //左2
	        PdfPTable titleLeftSecTable = new PdfPTable(1);
	        titleLeftSecTable.getDefaultCell().setBorder(0);
	        PdfPCell firstLineInSecTableCell = new PdfPCell(new Paragraph("AQUA-POWER SDN,BHD(618943-W)",FontChineseBold));
	        firstLineInSecTableCell.setBorderWidth(0f);
	        PdfPCell secondLineInSecTableCell = new PdfPCell(new Paragraph("NO.24 jalan & 152 Taman Perindustrian OUG",FontChinese9));
	        secondLineInSecTableCell.setBorderWidth(0f);
	        PdfPCell thirdLineInSecTableCell = new PdfPCell(new Paragraph("Batu @ Jalan Puchong.55100 Kuala Lumpu",FontChinese9));
	        thirdLineInSecTableCell.setBorderWidth(0f);
	        PdfPCell forthLineInSecTableCell = new PdfPCell(new Paragraph("Tel: 503-7755 6761 Email:support@air2u.com.my",FontChinese9));
	        forthLineInSecTableCell.setBorderWidth(0f);
	        
	        titleLeftSecTable.addCell(firstLineInSecTableCell);
	        titleLeftSecTable.addCell(secondLineInSecTableCell);
	        titleLeftSecTable.addCell(thirdLineInSecTableCell);
	        titleLeftSecTable.addCell(forthLineInSecTableCell);
	        topTable.addCell(titleLeftSecTable);
	        
	        //左三（空白）
	        PdfPTable titleLeftThirTable = new PdfPTable(1);
	        titleLeftThirTable.getDefaultCell().setBorder(0);
	        topTable.addCell(titleLeftThirTable);
	        
	        //左四
	        PdfPTable titleLeftForthTable = new PdfPTable(1);
	        titleLeftForthTable.getDefaultCell().setBorder(0);
	        PdfPCell invoiceStrCell = new PdfPCell(new Paragraph("Invoice",FontChinese25));
	        invoiceStrCell.setBorderWidth(0f);
	        titleLeftForthTable.addCell(invoiceStrCell);
	        
	        topTable.addCell(titleLeftForthTable);
	        document.add(topTable);
	        
	        //addressAndemail
	        float[] widths2 = { 0.50f,0.50f};
	        PdfPTable addressAndEmailTable = new PdfPTable(widths2);
	        addressAndEmailTable.getDefaultCell().setBorder(0);
	        
	        //left
	        PdfPTable addressAndEmailLeftTable = new PdfPTable(1);
	        addressAndEmailLeftTable.getDefaultCell().setBorder(0);
	        addressAndEmailLeftTable.setSpacingBefore(40);
	        
	        PdfPCell title1 = new PdfPCell(new Paragraph("Custmer Name",FontChinese16));
	        title1.setBorderWidth(0f);
	        addressAndEmailLeftTable.addCell(title1);
	        PdfPCell customerName = new PdfPCell(new Paragraph(orderProduct.getOrderCustomer().getUserName(),FontChinese12));
	        customerName.setBorderWidth(0f);
	        addressAndEmailLeftTable.addCell(customerName);
	        PdfPCell addressCell = new PdfPCell(new Paragraph(orderProduct.getOrderCustomer().getHomeAddress(),FontChinese12));
	        addressCell.setBorderWidth(0f);
	        addressAndEmailLeftTable.addCell(addressCell);
	        PdfPCell emiptyCell = new PdfPCell(new Paragraph("",FontChinese12));
	        emiptyCell.setBorderWidth(0f);
	        addressAndEmailLeftTable.addCell(emiptyCell);
	        PdfPCell emailCell = new PdfPCell(new Paragraph(orderProduct.getOrderCustomer().getEmail(),FontChinese12));
	        emailCell.setBorderWidth(0f);
	        addressAndEmailLeftTable.addCell(emailCell);
	        PdfPCell contactCell = new PdfPCell(new Paragraph(orderProduct.getOrderCustomer().getContactNumber(),FontChinese12));
	        contactCell.setBorderWidth(0f);
	        addressAndEmailLeftTable.addCell(contactCell);
	        addressAndEmailTable.addCell(addressAndEmailLeftTable);
	        
	        //right
	        PdfPTable addressAndEmailRightTable = new PdfPTable(1);
	        addressAndEmailRightTable.getDefaultCell().setBorder(0);
	        addressAndEmailRightTable.setSpacingBefore(40);
	        PdfPCell title2 = new PdfPCell(new Paragraph("Delivery Address",FontChinese16));
	        title2.setBorderWidth(0f);
	        addressAndEmailRightTable.addCell(title2);
	        PdfPCell deliveryAddressCell = new PdfPCell(new Paragraph(orderProduct.getOrderCustomer().getHomeAddress(),FontChinese12));
	        deliveryAddressCell.setBorderWidth(0f);
	        addressAndEmailRightTable.addCell(deliveryAddressCell);
	        addressAndEmailTable.addCell(addressAndEmailRightTable);
	        
	        document.add(addressAndEmailTable);
	        
	        //OrderInformation
	        float[] widths3 = { 0.32f,0.16f,0.16f,0.16f,0.10f,0.10f};
	        PdfPTable orderInformationTable = new PdfPTable(widths3);
	        orderInformationTable.setSpacingBefore(40);
	        
	        PdfPCell titleCell = new PdfPCell(new Paragraph("Order Information:",specialFont14));
	        titleCell.setBackgroundColor(new BaseColor(0, 191, 255));
	        titleCell.setBorderWidth(0f);
	        orderInformationTable.addCell(titleCell);
	        PdfPCell emptyCell = new PdfPCell(new Paragraph(""));
	        emptyCell.setBackgroundColor(new BaseColor(0, 191, 255));
	        emptyCell.setBorderWidth(0f);
	        orderInformationTable.addCell(emptyCell);
	        orderInformationTable.addCell(emptyCell);
	        orderInformationTable.addCell(emptyCell);
	        orderInformationTable.addCell(emptyCell);
	        orderInformationTable.addCell(emptyCell);
	        
	        PdfPCell orderTitleCell1 = new PdfPCell(new Paragraph("Order Number",FontChineseBold));
	        orderTitleCell1.setBorderWidth(0f);
	        orderInformationTable.addCell(orderTitleCell1);
	        PdfPCell orderTitleCell2 = new PdfPCell(new Paragraph("CreatedAt",FontChineseBold));
	        orderTitleCell2.setBorderWidth(0f);
	        orderInformationTable.addCell(orderTitleCell2);
	        PdfPCell orderTitleCell3 = new PdfPCell(new Paragraph("Total Price",FontChineseBold));
	        orderTitleCell3.setBorderWidth(0f);
	        orderInformationTable.addCell(orderTitleCell3);
	        PdfPCell orderTitleCell4 = new PdfPCell(new Paragraph("Total Point",FontChineseBold));
	        orderTitleCell4.setBorderWidth(0f);
	        orderInformationTable.addCell(orderTitleCell4);
	        PdfPCell orderTitleCell5 = new PdfPCell(new Paragraph("Tax",FontChineseBold));
	        orderTitleCell5.setBorderWidth(0f);
	        orderInformationTable.addCell(orderTitleCell5);
	        PdfPCell orderTitleCell6 = new PdfPCell(new Paragraph("Status",FontChineseBold));
	        orderTitleCell6.setBorderWidth(0f);
	        orderInformationTable.addCell(orderTitleCell6);
	        
	        PdfPCell orderNumberCell1 = new PdfPCell(new Paragraph(orderProduct.getOrderNumber(),FontChineseNormal));
	        orderNumberCell1.setPaddingTop(8f);
	        orderNumberCell1.setBorderWidth(0f);
	        orderInformationTable.addCell(orderNumberCell1);
	        PdfPCell createAtCell2 = new PdfPCell(new Paragraph(orderProduct.getCreatedAt(),FontChineseNormal));
	        createAtCell2.setPaddingTop(8f);
	        createAtCell2.setBorderWidth(0f);
	        orderInformationTable.addCell(createAtCell2);
	        String totalPrice = orderProduct.getTotalPrice();
	        if(orderProduct.getTaxstatus() == 1){
	        	//add taxrate to total price
	        	double taxrate = Double.parseDouble(orderProduct.getTax());
	        	double totalPriceWithTax = Double.parseDouble(totalPrice)*(1+taxrate);
	        	totalPrice = totalPriceWithTax+"";
	        }
	        PdfPCell priceCell3 = new PdfPCell(new Paragraph(totalPrice,FontChineseNormal));
	        priceCell3.setPaddingTop(8f);
	        priceCell3.setBorderWidth(0f);
	        orderInformationTable.addCell(priceCell3);
	        PdfPCell totalPointCell4 = new PdfPCell(new Paragraph(orderProduct.getTotalPV(),FontChineseNormal));
	        totalPointCell4.setPaddingTop(8f);
	        totalPointCell4.setBorderWidth(0f);
	        orderInformationTable.addCell(totalPointCell4);
	        PdfPCell taxCell5 = new PdfPCell(new Paragraph(Double.parseDouble(orderProduct.getTax())*100+"%",FontChineseNormal));
	        taxCell5.setPaddingTop(8f);
	        taxCell5.setBorderWidth(0f);
	        orderInformationTable.addCell(taxCell5);
	        PdfPCell paidCell6 = new PdfPCell(new Paragraph(orderProduct.getStatus().equals("0") ? "Unpaid" : "Paid",FontChineseNormal));
	        paidCell6.setPaddingTop(8f);
	        paidCell6.setBorderWidth(0f);
	        orderInformationTable.addCell(paidCell6);
	        
	        document.add(orderInformationTable);
	        
	        //products
	        float[] widths4 = { 0.32f,0.16f,0.16f,0.10f,0.10f,0.16f};
	        PdfPTable productsTable = new PdfPTable(widths4);
	        productsTable.setSpacingBefore(40);
	        
	        PdfPCell productTitleCell = new PdfPCell(new Paragraph("Products:",specialFont14));
	        productTitleCell.setBackgroundColor(new BaseColor(0, 191, 255));
	        productTitleCell.setBorderWidth(0f);
	        productsTable.addCell(productTitleCell);
	        PdfPCell emptyCell2 = new PdfPCell(new Paragraph(""));
	        emptyCell2.setBackgroundColor(new BaseColor(0, 191, 255));
	        emptyCell2.setBorderWidth(0f);
	        productsTable.addCell(emptyCell2);
	        productsTable.addCell(emptyCell2);
	        productsTable.addCell(emptyCell2);
	        productsTable.addCell(emptyCell2);
	        productsTable.addCell(emptyCell2);
	        
	        PdfPCell productTitleCell1 = new PdfPCell(new Paragraph("Product",FontChineseBold));
	        productTitleCell1.setBorderWidth(0f);
	        productsTable.addCell(productTitleCell1);
	        PdfPCell descriptionCell2 = new PdfPCell(new Paragraph("Description",FontChineseBold));
	        descriptionCell2.setBorderWidth(0f);
	        productsTable.addCell(descriptionCell2);
	        PdfPCell unitPriceCell3 = new PdfPCell(new Paragraph("Unit Price",FontChineseBold));
	        unitPriceCell3.setBorderWidth(0f);
	        productsTable.addCell(unitPriceCell3);
	        PdfPCell pointCell4 = new PdfPCell(new Paragraph("Point",FontChineseBold));
	        pointCell4.setBorderWidth(0f);
	        productsTable.addCell(pointCell4);
	        PdfPCell qtyCell5 = new PdfPCell(new Paragraph("QTY",FontChineseBold));
	        qtyCell5.setBorderWidth(0f);
	        productsTable.addCell(qtyCell5);
	        PdfPCell subtotalCell6 = new PdfPCell(new Paragraph("Subtotal",FontChineseBold));
	        subtotalCell6.setBorderWidth(0f);
	        productsTable.addCell(subtotalCell6);
	        
	        for(Product product : orderProduct.getProduct()){
	        	PdfPCell productCellValue = new PdfPCell(new Paragraph(product.getProductName(),FontChineseNormal));
		        productCellValue.setPaddingTop(8f);
		        productCellValue.setBorderWidth(0f);
		        productsTable.addCell(productCellValue);
		        PdfPCell descriptionCellValue = new PdfPCell(new Paragraph(product.getProductSpecifications(),FontChineseNormal));
		        descriptionCellValue.setPaddingTop(8f);
		        descriptionCellValue.setBorderWidth(0f);
		        productsTable.addCell(descriptionCellValue);
		        PdfPCell unitPriceCellValue = new PdfPCell(new Paragraph(product.getCvPrice(),FontChineseNormal));
		        unitPriceCellValue.setPaddingTop(8f);
		        unitPriceCellValue.setBorderWidth(0f);
		        productsTable.addCell(unitPriceCellValue);
		        PdfPCell pointCellValue = new PdfPCell(new Paragraph(product.getPvPrice(),FontChineseNormal));
		        pointCellValue.setPaddingTop(8f);
		        pointCellValue.setBorderWidth(0f);
		        productsTable.addCell(pointCellValue);
		        PdfPCell qtyCellValue = new PdfPCell(new Paragraph(product.getOrderQTY(),FontChineseNormal));
		        System.out.println("product.getOrderQTY():"+product.getOrderQTY());
		        qtyCellValue.setPaddingTop(8f);
		        qtyCellValue.setBorderWidth(0f);
		        productsTable.addCell(qtyCellValue);
		        PdfPCell subtotalCellValue = new PdfPCell(new Paragraph(product.getSubtotal(),FontChineseNormal));
		        subtotalCellValue.setPaddingTop(8f);
		        subtotalCellValue.setBorderWidth(0f);
		        productsTable.addCell(subtotalCellValue);
	        }
	        
	        
	        document.add(productsTable);
	        
	        //shipping
	        float[] widths5 = { 0.50f,0.50f};
	        PdfPTable shippingTable = new PdfPTable(widths5);
	        shippingTable.setSpacingBefore(40);
	        
	        PdfPCell shippingTitleCell = new PdfPCell(new Paragraph("Shipping",specialFont14));
	        shippingTitleCell.setBackgroundColor(new BaseColor(0, 191, 255));
	        shippingTitleCell.setBorderWidth(0f);
	        shippingTable.addCell(shippingTitleCell);
	        emptyCell2.setBackgroundColor(new BaseColor(0, 191, 255));
	        emptyCell2.setBorderWidth(0f);
	        shippingTable.addCell(emptyCell2);
	        
	        PdfPCell CODCell1 = new PdfPCell(new Paragraph(orderProduct.getShippingItem(),FontChineseBold));
	        CODCell1.setPadding(8f);
	        CODCell1.setBorderWidth(0f);
	        shippingTable.addCell(CODCell1);
	        PdfPCell codValueCell = new PdfPCell(new Paragraph("$"+orderProduct.getShippingCharge(),FontChineseBold));
	        codValueCell.setPadding(8f);
	        codValueCell.setBorderWidth(0f);
	        shippingTable.addCell(codValueCell);
	        document.add(shippingTable);
	        
	        //Point Earn
	        float[] widths6 = { 0.60f,0.60f};
	        PdfPTable pointearnTable = new PdfPTable(widths6);
	        pointearnTable.setSpacingBefore(40);
	        
	        PdfPCell pointearnTitleCell = new PdfPCell(new Paragraph("Point Earn",specialFont14));
	        pointearnTitleCell.setBackgroundColor(new BaseColor(0, 191, 255));
	        pointearnTitleCell.setBorderWidth(0f);
	        pointearnTable.addCell(pointearnTitleCell);
	        emptyCell2.setBackgroundColor(new BaseColor(0, 191, 255));
	        emptyCell2.setBorderWidth(0f);
	        pointearnTable.addCell(emptyCell2);
	        
	        PdfPCell pointearnCellValue = new PdfPCell(new Paragraph(orderProduct.getEarnedPV(),FontChineseBold));
	        pointearnCellValue.setPadding(8f);
	        pointearnCellValue.setBorderWidth(0f);
	        pointearnTable.addCell(pointearnCellValue);
	        PdfPCell emptyCell3 = new PdfPCell(new Paragraph(""));
	        emptyCell3.setBorderWidth(0f);
	        pointearnTable.addCell(emptyCell3);
	        document.add(pointearnTable);
	        
	        
	        document.close();
	        
	        /*PdfPCell invoiceToAddress = new PdfPCell(new Paragraph("INVOICE TO: Customer address",FontChinese12));
	        //invoiceToAddress.setHorizontalAlignment(2);
	        invoiceToAddress.setPaddingLeft(0);
	        invoiceToAddress.setVerticalAlignment(0);
	        invoiceToAddress.setBorderWidth(0f);
	        invoiceToAddress.setBorder(0);
	        invoiceToAddress.setBorderWidth(0f);
	        
	        titleLeftTable.addCell(invoiceToAddress);
	        
	        topTable.addCell(titleLeftTable);
	        //右上1
	        PdfPTable TopRightTable = new PdfPTable(1);
	        TopRightTable.getDefaultCell().setBorder(0);
	        
	        PdfPTable titleTopRightTable = new PdfPTable(1);
	        titleTopRightTable.getDefaultCell().setBorder(0);
	        PdfPCell companyName = new PdfPCell(new Paragraph("Air2U company name and number",FontChinese18));
	        companyName.setHorizontalAlignment(0);
	        companyName.setVerticalAlignment(0);
	        companyName.setPaddingLeft(0);
	        companyName.setBorder(0);
	        titleTopRightTable.addCell(companyName);
	        //右上2
	        PdfPCell companyaddress = new PdfPCell(new Paragraph("Air2U address and contact information",FontChinese12));
	        companyaddress.setHorizontalAlignment(0);
	        companyaddress.setVerticalAlignment(0);
	        companyaddress.setPaddingLeft(0);
	        companyaddress.setMinimumHeight(10f);
	        companyaddress.setPaddingTop(10f);
	        companyaddress.setBorder(0);
	        titleTopRightTable.addCell(companyaddress);
	        
	        PdfPCell type = new PdfPCell(new Paragraph("INVOICE/DELIVERY/ORDER",FontChinese18));
	        type.setHorizontalAlignment(2);
	        type.setVerticalAlignment(0);
	        type.setPaddingLeft(0);
	        type.setMinimumHeight(10f);
	        type.setPaddingTop(20f);
	        type.setPaddingBottom(15f);
	        type.setBorder(0);
	        titleTopRightTable.addCell(type);
	        
	        TopRightTable.addCell(titleTopRightTable);
	        
	        float[] invoicewidths = { 0.35f, 0.35f,0.3f};
	        PdfPTable invoiceTopRightTable = new PdfPTable(invoicewidths);
	        invoiceTopRightTable.getDefaultCell().setBorder(0);
	        //第一行
	        PdfPCell nullVal = new PdfPCell(new Paragraph("",FontChinese18));
	        nullVal.setBorder(0);
	        nullVal.setBorderWidth(0f);
	        invoiceTopRightTable.addCell(nullVal);
	        
	        PdfPCell invoiceNumber = new PdfPCell(new Paragraph("INVOICE #:",FontChinese12));
	        invoiceNumber.setHorizontalAlignment(2);
	        invoiceNumber.setVerticalAlignment(0);
	        invoiceNumber.setPaddingLeft(0);
	        invoiceNumber.setMinimumHeight(10f);
	        invoiceNumber.setPaddingTop(10f);
	        invoiceNumber.setBorder(0);
	        invoiceNumber.setBorderWidth(0f);
	        invoiceTopRightTable.addCell(invoiceNumber);
	        
	        invoiceTopRightTable.addCell(nullVal);
	        
	        //第二行
	        invoiceTopRightTable.addCell(nullVal);
	        
	        PdfPCell proforma = new PdfPCell(new Paragraph("PROFORMA INV.#:",FontChinese12));
	        proforma.setHorizontalAlignment(2);
	        proforma.setVerticalAlignment(0);
	        proforma.setPaddingLeft(0);
	        proforma.setMinimumHeight(10f);
	        proforma.setBorder(0);
	        proforma.setBorderWidth(0f);
	        invoiceTopRightTable.addCell(proforma);
	        
	        invoiceTopRightTable.addCell(nullVal);
	        
	        //第3行
	        invoiceTopRightTable.addCell(nullVal);
	        
	        PdfPCell date = new PdfPCell(new Paragraph("Date:",FontChinese12));
	        date.setHorizontalAlignment(2);
	        date.setVerticalAlignment(0);
	        date.setPaddingLeft(0);
	        date.setMinimumHeight(10f);
	        date.setBorder(0);
	        date.setBorderWidth(0f);
	        invoiceTopRightTable.addCell(date);
	        
	        invoiceTopRightTable.addCell(nullVal);
	        
	        //第4行
	        invoiceTopRightTable.addCell(nullVal);
	        
	        PdfPCell page = new PdfPCell(new Paragraph("PAGE:",FontChinese12));
	        page.setHorizontalAlignment(2);
	        page.setVerticalAlignment(0);
	        page.setPaddingLeft(0);
	        page.setMinimumHeight(10f);
	        page.setBorder(0);
	        page.setBorderWidth(0f);
	        invoiceTopRightTable.addCell(page);
	        
	        invoiceTopRightTable.addCell(nullVal);
	        
	        TopRightTable.addCell(invoiceTopRightTable);
	        
	        topTable.addCell(TopRightTable);
	        document.add(topTable);

	        Paragraph attn = new Paragraph("ATTN: Customer Name",FontChinese12);
	        attn.setIndentationLeft(60);  
	        attn.setSpacingBefore(10f);
	        document.add(attn);
	        
	        //加入空行
	        Paragraph blankRow31 = new Paragraph(18f, " ", FontChinese11); 
	      
	        
	        Paragraph cashItems = new Paragraph("Cash Items",FontChinese12);
	        cashItems.setIndentationLeft(60); 
	        cashItems.setSpacingBefore(10f);
	        document.add(cashItems);
	        document.add(blankRow31);
	        
	        //cash items table
            PdfPTable cashItemTable = new PdfPTable(6);
            int width8[] = {10,30,10,15,20,15};
            cashItemTable.setWidths(width8); 
            PdfPCell cell81 = new PdfPCell(new Paragraph("ITEM",FontChinese11Normal));
            PdfPCell cell82 = new PdfPCell(new Paragraph("DESCRIPTION",FontChinese11Normal));
            PdfPCell cell83 = new PdfPCell(new Paragraph("QTY",FontChinese11Normal));
            PdfPCell cell84 = new PdfPCell(new Paragraph("U/M",FontChinese11Normal));
            PdfPCell cell85 = new PdfPCell(new Paragraph("U.PRICE",FontChinese11Normal));
            PdfPCell cell86 = new PdfPCell(new Paragraph("AMOUNT",FontChinese11Normal));
            BaseColor lightGrey = new BaseColor(0xCC,0xCC,0xCC);
            //表格高度
            cell81.setFixedHeight(25);
            cell82.setFixedHeight(25);
            cell83.setFixedHeight(25);
            cell84.setFixedHeight(25);
            cell85.setFixedHeight(25);
            cell86.setFixedHeight(25);
            //水平居中
            cell81.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell82.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell83.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell84.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell85.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell86.setHorizontalAlignment(Element.ALIGN_CENTER);
            //垂直居中
            cell81.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell82.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell83.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell84.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell85.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell86.setVerticalAlignment(Element.ALIGN_MIDDLE);
            //边框颜色
            cell81.setBorderColor(lightGrey);
            cell82.setBorderColor(lightGrey);
            cell83.setBorderColor(lightGrey);
            cell84.setBorderColor(lightGrey);
            cell85.setBorderColor(lightGrey);
            cell86.setBorderColor(lightGrey);
            //去掉左右边框
            cell81.disableBorderSide(8);
            cell82.disableBorderSide(4);
            cell82.disableBorderSide(8);
            cell83.disableBorderSide(4);
            cell83.disableBorderSide(8);
            cell84.disableBorderSide(4);
            cell84.disableBorderSide(8);
            cell85.disableBorderSide(4);
            cell85.disableBorderSide(8);
            cell86.disableBorderSide(4);
            cashItemTable.addCell(cell81);
            cashItemTable.addCell(cell82);
            cashItemTable.addCell(cell83);
            cashItemTable.addCell(cell84);
            cashItemTable.addCell(cell85);
            cashItemTable.addCell(cell86);
            document.add(cashItemTable);
            
	        document.add(blankRow31);
            
            float[] totalAmtWidth = { 0.60f, 0.2f,0.2f};
	        PdfPTable totalAmtTable = new PdfPTable(totalAmtWidth);
	        totalAmtTable.getDefaultCell().setBorder(0);
	        //第一行
	        totalAmtTable.addCell(nullVal); 
            
	        PdfPCell totalAmt = new PdfPCell(new Paragraph("TOTAL AMT:",FontChinese12));
	        totalAmt.setHorizontalAlignment(2);
	        totalAmt.setVerticalAlignment(0);
	        totalAmt.setPaddingLeft(0);
	        totalAmt.setMinimumHeight(10f);
	        totalAmtTable.addCell(totalAmt);
	        
	        Paragraph rm2 = new Paragraph("RM",FontChinese12);
	        rm2.setIndentationLeft(20); 
	        rm2.setSpacingBefore(10f);
	        
	        PdfPCell rm = new PdfPCell(rm2);
	        rm.setVerticalAlignment(Element.ALIGN_MIDDLE);
	        rm.setPaddingLeft(0);
	        rm.setMinimumHeight(10f);
	        rm.setBorder(0);
	        
	        totalAmtTable.addCell(rm);
	        
	        //第一行
	        totalAmtTable.addCell(nullVal); 
            
	        PdfPCell totalQty = new PdfPCell(new Paragraph("TOTAL QTY:",FontChinese12));
	        totalQty.setHorizontalAlignment(2);
	        totalQty.setVerticalAlignment(0);
	        totalQty.setPaddingLeft(0);
	        totalQty.setMinimumHeight(10f);
	        totalAmtTable.addCell(totalQty);
	        
	        totalAmtTable.addCell(nullVal); 
	        
	        document.add(totalAmtTable);
            
	        //------point items
	        Paragraph pointItems = new Paragraph("Point Items",FontChinese12);
	        pointItems.setIndentationLeft(60); 
	        pointItems.setSpacingBefore(10f);
	        document.add(pointItems);
	        
	        document.add(blankRow31);
	        
	        //point items table
            PdfPTable pointItemTable = new PdfPTable(6);
            cashItemTable.setWidths(width8); 
            PdfPCell cell812 = new PdfPCell(new Paragraph("ITEM",FontChinese11Normal));
            PdfPCell cell822 = new PdfPCell(new Paragraph("DESCRIPTION",FontChinese11Normal));
            PdfPCell cell832 = new PdfPCell(new Paragraph("QTY",FontChinese11Normal));
            PdfPCell cell842 = new PdfPCell(new Paragraph("U/M",FontChinese11Normal));
            PdfPCell cell852 = new PdfPCell(new Paragraph("U.PRICE",FontChinese11Normal));
            PdfPCell cell862 = new PdfPCell(new Paragraph("AMOUNT",FontChinese11Normal));
            //表格高度
            cell812.setFixedHeight(25);
            cell822.setFixedHeight(25);
            cell832.setFixedHeight(25);
            cell842.setFixedHeight(25);
            cell852.setFixedHeight(25);
            cell862.setFixedHeight(25);
            //水平居中
            cell812.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell822.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell832.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell842.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell852.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell862.setHorizontalAlignment(Element.ALIGN_CENTER);
            //垂直居中
            cell812.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell822.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell832.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell842.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell852.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell862.setVerticalAlignment(Element.ALIGN_MIDDLE);
            //边框颜色
            cell812.setBorderColor(lightGrey);
            cell822.setBorderColor(lightGrey);
            cell832.setBorderColor(lightGrey);
            cell842.setBorderColor(lightGrey);
            cell852.setBorderColor(lightGrey);
            cell862.setBorderColor(lightGrey);
            //去掉左右边框
            cell812.disableBorderSide(8);
            cell822.disableBorderSide(4);
            cell822.disableBorderSide(8);
            cell832.disableBorderSide(4);
            cell832.disableBorderSide(8);
            cell842.disableBorderSide(4);
            cell842.disableBorderSide(8);
            cell852.disableBorderSide(4);
            cell852.disableBorderSide(8);
            cell862.disableBorderSide(4);
            pointItemTable.addCell(cell812);
            pointItemTable.addCell(cell822);
            pointItemTable.addCell(cell832);
            pointItemTable.addCell(cell842);
            pointItemTable.addCell(cell852);
            pointItemTable.addCell(cell862);
            document.add(pointItemTable);
            
            //加入空行
	        document.add(blankRow31);
            
	        document.add(blankRow31);
	        
            float[] totalPtnWidth = { 0.60f, 0.20f,0.2f};
	        PdfPTable totalPtnTable = new PdfPTable(totalPtnWidth);
	        totalPtnTable.getDefaultCell().setBorder(0);
	        //第一行
	        totalPtnTable.addCell(nullVal); 
            
	        PdfPCell totalptn = new PdfPCell(new Paragraph("TOTAL Ptn:",FontChinese12));
	        totalptn.setHorizontalAlignment(2);
	        totalptn.setVerticalAlignment(0);
	        totalptn.setPaddingLeft(0);
	        totalptn.setMinimumHeight(10f);
	        totalPtnTable.addCell(totalptn);
	        
	        totalPtnTable.addCell(nullVal); 
	        
	        document.add(blankRow31);
	        //第2行
	        totalPtnTable.addCell(nullVal); 
            
	        PdfPCell totalQty2 = new PdfPCell(new Paragraph("TOTAL QTY:",FontChinese12));
	        totalQty2.setHorizontalAlignment(2);
	        totalQty2.setVerticalAlignment(0);
	        totalQty2.setPaddingLeft(0);
	        totalQty2.setMinimumHeight(10f);
	        totalPtnTable.addCell(totalQty2);
	        
	        totalPtnTable.addCell(nullVal); 
	        
	        document.add(totalPtnTable);
            
	        //加入空行
	        document.add(blankRow31);
	        
	        float[] remarkWidth = { 0.55f, 0.45f};
	        PdfPTable remarkTable = new PdfPTable(remarkWidth);
	        remarkTable.getDefaultCell().setBorder(0);
	        
	        
	        PdfPCell cell_remark = new PdfPCell(new Paragraph("Remarks:",FontChinese12));
	        cell_remark.setHorizontalAlignment(0);
	        cell_remark.setVerticalAlignment(0);
	        cell_remark.setPaddingLeft(0);
	        cell_remark.setMinimumHeight(10f);
	        cell_remark.setPaddingTop(10f);
	        remarkTable.addCell(cell_remark);
	        remarkTable.addCell(nullVal); 
	      
	        document.add(remarkTable);
	       
	        document.add(blankRow31);
	        document.add(blankRow31);
	        
	        PdfContentByte cb_third = writer.getDirectContent();
			cb_third.moveTo(0, 270);
			cb_third.lineTo(700, 270);
			cb_third.stroke();
			
	        //------------
	       
			Paragraph paragraph1 = new Paragraph("Note:",FontChinese12);
			paragraph1.setSpacingBefore(0f);
			document.add(paragraph1);
			
			Paragraph paragraph2 = new Paragraph("1) GOOD SOLD ARE NOT RETURNABLE.",FontChinese12);
			paragraph2.setSpacingBefore(0f);
			document.add(paragraph2);
			
			Paragraph paragraph3 = new Paragraph("2) PAYMENT BY CHEQUE SHOULD CROSSED AND MADE IN FAVOUR OF",FontChinese12);
			paragraph3.setSpacingBefore(0f);
			document.add(paragraph3);
			
			Paragraph paragraph4 = new Paragraph("Air2U (A/C#:BANK:)",FontChinese12);
			paragraph4.setSpacingBefore(0f);
			document.add(paragraph4);
			
			Paragraph paragraph5 = new Paragraph("3) INTEREST RATE AT 1.5% PER MONTH WILL BE CHARGED ON ALL OVERDUE ACCOUNTS.",FontChinese12);
			paragraph5.setSpacingBefore(0f);
			document.add(paragraph5);
			
	        document.add(blankRow31);
	        document.add(blankRow31);
	        
	        Paragraph paragraph6= new Paragraph("Air2U",FontChinese12);
	        paragraph6.setSpacingBefore(0f);
			document.add(paragraph6);
			
			document.add(blankRow31);
	        document.add(blankRow31);
	        document.add(blankRow31);
	        document.add(blankRow31);
		        
			 PdfContentByte left_bottom = writer.getDirectContent();
			 left_bottom.moveTo(0, 60);
			 left_bottom.lineTo(250, 60);
			 left_bottom.stroke();
			 
			 
			 PdfContentByte right_bottom = writer.getDirectContent();
			 right_bottom.moveTo(350, 60);
			 right_bottom.lineTo(700, 60);
			 right_bottom.stroke();
			 
			 float[] last = { 0.5f,0.2f, 0.3f};
			 PdfPTable bottomTable = new PdfPTable(last);
			 bottomTable.setSpacingBefore(0f);
			 bottomTable.getDefaultCell().setBorder(0);
		        
			Paragraph paragraph7= new Paragraph("AUTHORISED SIGNATURE",FontChinese12);
	        paragraph7.setSpacingBefore(0f);
	        bottomTable.addCell(paragraph7);
	        
	        bottomTable.addCell(nullVal);
				
	        Paragraph paragraph8= new Paragraph("RECEIVED BY",FontChinese12);
	        paragraph8.setSpacingBefore(0f);
	        bottomTable.addCell(paragraph8);
	        
	        document.add(bottomTable);
	         document.close();
	         return "success";*/
	    } catch (Exception ex) 
	    {
	      ex.printStackTrace();
	    }
		return "failure";
	}
}
