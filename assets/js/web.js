var chatLib = (function(window, document) {	
	var tcDataDefault = {
		"PRODUCTS_VIEWED" : "",
		"PRODUCTS_IN_CART" : "",
		"CART_TOTAL" : "",
		"DISCOUNTS" : "",
		"SEARCH_TERM" : "",
		"ERROR_DETAILS" : "",
		"LOGIN_FAILED" : "",
		"CUSTOMER_DETAILS" : {
			"customerName" : "",				
			"visionAccountId" : "",
			"visionCustomerId" : "",
			"pcan": "",
			"can": "",
			"state":"",
			"btn":"",
			"ban":"",
			"visionId":""
		},
		"EXISTING_CUST_PRODUCTS" : "",
		"MOVES" : "",
		"FIOS_DETAILS" : {
			"fiosReady" : "",
			"quantumEligible" : ""
		},
		"LOCALIZATION_DETAILS" : {
			"address" : "",
			"city" : "",
			"state" : "",
			"zipCode": ""
		},
		"APPLICABLE_PRODUCTS" : "",
		"PRODUCTS_REMOVED" : "",
		"PRODUCTS_ELIGIBLE_FOR_UPGRADE" : "",
		"CHANGE_IN_VALUE" : "",
		"EXISTING_CUST_ADDRESS" : "",
		"MOVE_CUST_ADDRESS" : "",
		"NEW_CUST_ADDRESS" : "",
		"BAN" : "",
		"BTN" : "",
		"STATE" : "",
		"VISIONID": ""
	};
	
	
	var CHAT_DATA_FORMAT = {
		"JSON" : "JSON",
		"XML" : "XML"
	}
	var chatData = {
		"customer-data": {
			"CUSTOMER_DETAILS" : {},
			"FIOS_DETAILS" : {},
			"LOCALIZATION_DETAILS" : {}
		}, 		
		"customer-data-extra": {} 
	};
	
	//APIs to DotCom.
	function setCustomerInfo(name, value) {
		try{

			  if(value ==null  || value == '' || value == 'na' || value == 'NA'){
					return;
			  }
	
				if("Customer_State" == name || "state" == name.toLowerCase() || "vzstate" == name.toLowerCase() ){
						chatData["customer-data"]["CUSTOMER_DETAILS"]["state"] = value;
				}
				if("APPLICABLE_SEVICES" == name || "applicable_sevices" == name.toLowerCase()  || "applicableservices" == name.toLowerCase() ||  "EXISTING_SEVICES" == name || "existing_services" == name.toLowerCase() ){
							 var chtProdTypes= value;
							try{
									chtProdTypes=unescape(chtProdTypes);
									chtProdTypes=chtProdTypes.toUpperCase();
									chtProdTypes=chtProdTypes.replace(/ /g,'');
									chtProdTypes=chtProdTypes.replace(/\+/g,'');
									chtProdTypes=chtProdTypes.replace(/\|/g,',');
									chtProdTypes=chtProdTypes.replace(/HSI/g, "HIGHSPEEDINTERNET");
									chtProdTypes=chtProdTypes.replace(/DSL/g, "HIGHSPEEDINTERNET");
									chtProdTypes=chtProdTypes.replace(/FIOSDATA/g, "FIOSINTERNET");
									chtProdTypes=chtProdTypes.replace(/DTV/g, "DIRECTTV");
								}catch(eex){}
								value=chtProdTypes;

				}
				if("APPLICABLE_SEVICES" == name || "applicable_sevices" == name.toLowerCase() || "applicableservices" == name.toLowerCase()){
						totalAvailable = value;
				}
				if("Customer_Name" == name || "name" == name.toLowerCase()){
						chatData["customer-data"]["CUSTOMER_DETAILS"]["customerName"] = value;
				}
				if("customertype" == name.toLowerCase()) {
					if(value.toLowerCase() == 'con' || value.toLowerCase() == 'residential' ) {
						chatData["customer-data"]["CustomerType"] = 'Consumer';
					}
				}		
				if("customertype" == name.toLowerCase()){
					 if(value.toLowerCase() == 'bus' ||  value.toLowerCase() == 'business'   ||  value.toLowerCase() == 'smb'    ){
							chatData["customer-data"]["CustomerType"] = 'SMB';
						}
				}
				if("lob" == name.toLowerCase()) {
						if(value.toLowerCase() == 'con' ||  value.toLowerCase() == 'residential'  ){
							chatData["customer-data"]["CustomerType"] = 'Consumer';
						}
						else if(value.toLowerCase() == 'bus' ||  value.toLowerCase() == 'business'  ){
							chatData["customer-data"]["CustomerType"] = 'SMB';
						}
				}

				if("visionAccountId" == name || "visionaccountid" == name.toLowerCase()  ){
						chatData["customer-data"]["CUSTOMER_DETAILS"]["visionAccountId"] = value;
				}
				if("visionCustomerId" == name || "visioncustomerid" == name.toLowerCase()  ){
						chatData["customer-data"]["CUSTOMER_DETAILS"]["visionCustomerId"] = value;
				}
				if("Customer_PCAN" == name || "pcan" == name.toLowerCase() ){
						chatData["customer-data"]["CUSTOMER_DETAILS"]["pcan"] = value;
				}
				if("Customer_CAN" == name || "can" == name.toLowerCase()  || "billingcan" == name.toLowerCase() ){
						chatData["customer-data"]["CUSTOMER_DETAILS"]["can"] = value;
				}
				if("Customer_BAN" == name || "ban" == name.toLowerCase() ){
						chatData["customer-data"]["CUSTOMER_DETAILS"]["ban"] = value;
				}
				if("Customer_BTN" == name || "btn" == name.toLowerCase()  || "tn" == name.toLowerCase() ){
						chatData["customer-data"]["CUSTOMER_DETAILS"]["btn"] = value;
				}

				if(null != chatData["customer-data"]["CUSTOMER_DETAILS"]["visionAccountId"]  && null != chatData["customer-data"]["CUSTOMER_DETAILS"]["visionCustomerId"]) {
					chatData["customer-data"]["VISIONID"] = chatData["customer-data"]["CUSTOMER_DETAILS"]["visionAccountId"] + chatData["customer-data"]["CUSTOMER_DETAILS"]["visionCustomerId"];
					chatData["customer-data"]["CUSTOMER_DETAILS"]["VISIONID"] = chatData["customer-data"]["CUSTOMER_DETAILS"]["visionAccountId"] + chatData["customer-data"]["CUSTOMER_DETAILS"]["visionCustomerId"];
				}
				else {
					if("visionAccountId" == name || "visionaccountid" == name.toLowerCase()  || "visionCustomerId" == name || "visioncustomerid" == name.toLowerCase() ) {
						chatData["customer-data"]["VISIONID"] = value;
					}
				}	
				if("FiOS Ready" == name || "fios ready" == name.toLowerCase() || "fiosready" == name.toLowerCase() ){
					chatData["customer-data"]["FIOS_DETAILS"]["fiosReady"] = value;
				}

				if("Quantum Eligible" == name || "quantum eligible" == name.toLowerCase() || "quantumeligible" == name.toLowerCase() ){
					chatData["customer-data"]["FIOS_DETAILS"]["quantumEligible"] = value;
				}

				if( "FiOS Self install" == name || "fios self install" == name.toLowerCase() || "fiosselfinstall" == name.toLowerCase() ){
					chatData["customer-data"]["FIOS_DETAILS"]["fiosSelfInstall"] = value;
				}

				if("address" == name || "city" == name || "state" == name || "zipCode" == name) {
					chatData["customer-data"]["LOCALIZATION_DETAILS"][name] = value;
				}	
				if("visionid" == name.toLowerCase() ) {
						name= name.toUpperCase();
				}

				if("pageId" == name || "PageId" == name || "Page-Id" == name || "page-id" == name) {
					if(null != value && value.length > 0) {
						inqSiteID = parseInt(value);
						chatData["customer-data"][name] = value;
					}
				}		
				else {
					chatData["customer-data"][name] = value;
				}
		}catch(e){}
	}
	
	function setCustomerInfoExtra(name, value) {
		setCustomerInfo(name, value);
	}
	//ends here...
	
	function addUserCookieDetails(){
		var chat_userInfo = readTCCookieInfo('userinfo');
		if(chat_userInfo != null && chat_userInfo != "" && chat_userInfo.toLowerCase() != "null") {
			if(readTCCookieInfo('islogin') != null && readTCCookieInfo('islogin') != "" && readTCCookieInfo('islogin').toLowerCase() != "null") {
				setCustomerInfo("LOGIN_FLAG", "Yes");
			}
		}
		else
			setCustomerInfo("LOGIN_FLAG", "No");
	}
	
	function setDataPass(flag, tcPageId) {
		try{
			addUserCookieDetails();
		if(true == flag) 
		{
			tcData = mergeProps({}, chatData["customer-data"], chatData["customer-data-extra"]);				
			try
			{
				if(tcData !=null){
					if(typeof tcData.globalSessionId == 'undefined' ||   tcData.globalSessionId == null)
					{
						var aTCGlobalSessionId="";
						try{
								aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID');													
								if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_awssit') !=null ){
									aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_awssit');
								}
								else if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_98') !=null ){
									aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_98');
								}
								if(aTCGlobalSessionId !=null && aTCGlobalSessionId != "" ){
									tcData.globalSessionId = aTCGlobalSessionId;
								}
						}catch(err){}						
					}
				} 

			}catch(ee){}
				
				
			if (typeof Inq != "undefined" && Inq != null && window.inqFrame && window.inqFrame.Inq && window.inqFrame.Inq.CM && window.inqFrame.Inq.CM.initialized == true)
			{ 		
				 if(tcPageId !=null && tcPageId !="")
				{
					Inq.reinitChat(tcPageId);						
				}else if(typeof inqSiteID != "undefined" && inqSiteID != null && inqSiteID !="") 
				{ 
						//Inq.reinitChat(inqSiteID);	
						Inq.reinitChat(inqSiteID);					
				}else{
					Inq.reinitChat();	
				}				 
			}
		}
		else {
			tcData = mergeProps({}, chatData["customer-data"], chatData["customer-data-extra"]);
		}	
		}catch(e){}
	}
	
	function mergeProps(){
		for(var i=1; i<arguments.length; i++) {
			for(var key in arguments[i]) {
				if(arguments[i].hasOwnProperty(key)) {
					arguments[0][key] = arguments[i][key];
				}
			}
		}
		return arguments[0];
	}		
		
	
	/*
	if no data, wait for 500ms, and do it for 1500, 2000.
	even after no data, call touch commerce.	
	*/
	//APIs for Touch-Commerce.
	function getChatData(dataFormat) {
		var chatDataInfo = null;
		if(null == dataFormat || dataFormat.trim().length == 0) {
			dataFormat = CHAT_DATA_FORMAT.JSON;
		}
		
		if("JSON" == CHAT_DATA_FORMAT[dataFormat]) {
			chatDataInfo = getJSONData();
		}
		else if("XML" == CHAT_DATA_FORMAT[dataFormat]) {		
			chatDataInfo = getXMLData();
		}		
		return chatDataInfo;
	}
	//ends here...
	
	//Utility functions...
	function getXMLData() {		
		/*
		* 	<chat-data>
				<name>girig</name>
				<btn>1234567890</btn>
				<params>
					<param>	
						<name>others</name><value>Learn</value>
					</param>
				</params>
			</chat-data>"
		*/
	
		var customerXMLData = "<chat-data>";
		var customerData = chatData["customer-data"];
		if(null != customerData) {
			for (var key in customerData) {
				if (customerData.hasOwnProperty(key)) {
					customerXMLData += "<" + key + ">" + encodeURIComponent( customerData[key] ) + "</" + key + ">";
				}
			}		
		}
		
		var customerDataExtra = chatData["customer-data-extra"];
		var params = "";
		if(null != customerDataExtra) {
			params = "<params>";
			for (var key in customerDataExtra) {
				if (customerDataExtra.hasOwnProperty(key)) {
					params += "<param><name>" + key + "</name><value>" + encodeURIComponent( customerDataExtra[key] ) + "</value></param>";
				}
			}		
			params += "</params>";
		}
		
		customerXMLData += params;
		customerXMLData += "</chat-data>";
		return customerXMLData;
		
	}
	function getJSONData() {
		return chatData;
	}
	
	String.prototype.trim = function() {
		var value = this.replace(/(^\s+)/g, "");
		value = value.replace(/(\s+$)/g, "");
		return value;
	}	
	//ends here...
	
	
	
	return {
		//public methods exposed to clients.
		setCustomerInfo : setCustomerInfo, 				//ChatLib.setCustomerInfo("name", "girig");
		setCustomerInfoExtra : setCustomerInfoExtra, 	//ChatLib.setCustomerInfoExtra("others", "Learn");
		getChatData : getChatData, 						//ChatLib.getChatData("XML") or ChatLib.getChatData("JSON")
		setDataPass: setDataPass
		//ends here...
	}
})(window, document);



	
	//var chatLib = null;
	var pendingCalls = [];

	var jsLibNameTC = "inqChatLaunch10004593.js";
	var jsLibPathTC = "/chatskins/launch/";

	var jsLibName = "chatlibtc.js";
	var jsLibPath = "/comm/chatlib/";
	//var jsLibPath = "/SayHello/chatlib/";

	var jqLibName = "jquery-1.7.2.min.js";
	var jqLibPath = "/comm/includes/scripts/jquery/ui/jquery-ui-1.8.20.custom/js/";

	
	//logger info.
	var clientLogServletName = "ClientLogger.serv";
	var clientLogServletPath = "/comm/chat/";
	
	//TC Variables.	
	var inqSiteID = "";//default value...
	var tcData = {};
	
	var tcHostConfig = {
		"PROD" : "https://verizon.inq.com",
		"NON-PROD": "https://verizon-dev.inq.com"	
	}
	
	var dotComHostConfig = {
			"SIT" : "https://wwwawssit.ebiz.verizon.com",
			"PROD": "https://www.verizon.com",
			"STG": "https://www98.verizon.com"
				
		}
	
	var chatHostConfig = {
		"PROD": "https://collaborateext.verizon.com",
		"SIT": "https://collaborateextst.verizon.com",
		"STG": "https://collaborateextstg.verizon.com"
	}
	
	//APIs to DotCom.
	function setCustomerInfo(name, value) {
		/*if(null == chatLib) {
			pendingCalls.push(function() {
				setCustomerInfo(getTCParamName(name),value);
			});
			return;
		}*/
		try {
			chatLib.setCustomerInfo(getTCParamName(name), value);	
		}
		catch(ex) {}
		
	}
	
	function setExtraCustomerInfo(name, value) {
		/*if(null == chatLib) {
			pendingCalls.push(function() {
				setExtraCustomerInfo(getTCParamName(name),value);
			});
			return;
		}*/
		try {
			chatLib.setCustomerInfoExtra(getTCParamName(name), value);
		}
		catch(ex) {}
	}
	
	/*
	DotCom calls this method, whenever the order details are ready.
	The same would be informed to tc by setting order related tc variables.
	*/
	var inqSalesProducts = null;
	var inqSalesQuantities = null;
	var inqSalesPrices = null;
	var inqClientOrderNum = null;
	var inqSalesProductTypes = null;
	var inqOrderType = null;
	var totalAvailable = null;
	var inqOtherInfo = null;
	
	function chatOrderSubmissionDetails(chatTracVar, aimsOrderObject){
		var tcchatLogError="";
				try {

		if(typeof aimsOrderObject != "undefined") {		
			if(null != aimsOrderObject) {
			try{
			inqSalesProducts="";
			inqSalesQuantities="";
			inqSalesPrices="";
			inqClientOrderNum="";
			inqSalesProductTypes="";
			inqOrderType="";
			inqOtherInfo="";
				if(typeof aimsOrderObject.ca != "undefined") {		
					inqSalesProducts = aimsOrderObject.ca;  
					inqSalesProducts=inqSalesProducts.replace(/\|/g,',');
					inqSalesProducts=inqSalesProducts.replace(/-/g, "~");
				}
				if(typeof aimsOrderObject.qn != "undefined") {		
					inqSalesQuantities = aimsOrderObject.qn; 
					try{
					inqSalesQuantities=inqSalesQuantities.replace(/\|/g,',');
					}catch(exx){}
				}
				if(typeof aimsOrderObject.ot != "undefined") {		
					inqOrderType = aimsOrderObject.ot;  
				}
				if(typeof chatTracVar != "undefined"  &&  chatTracVar.indexOf("-" ) !=-1) {	
					try
						{
					    if(chatTracVar.indexOf('MRC=-') != -1 || chatTracVar.indexOf('NRC=-')  ||  chatTracVar.indexOf('TCNRC=-') != -1 || chatTracVar.indexOf('TCMRC=-') != -1){
							chatTracVar=chatTracVar.replace('MRC=-',"MRC=|");	
							chatTracVar=chatTracVar.replace('NRC=-',"NRC=|");	
							chatTracVar=chatTracVar.replace('TCNRC=-',"TCNRC=|");	
							chatTracVar=chatTracVar.replace('TCMRC=-',"TCMRC=|");	
					  }
					  var achttemp =chatTracVar.split('-');
					  var  vchtOtherinfo="";
							for(var i=0; i <achttemp.length; i++)
							{									
									if(achttemp[i] !=null && achttemp[i].indexOf("MRC=") !=-1 && achttemp[i].indexOf("MRC=") ==0 )
										{
											var salesPrice=null;
											salesPrice=achttemp[i].substring(achttemp[i].indexOf("MRC=")+4);
											if(salesPrice !=null && salesPrice.length>0){
												try{
													if(salesPrice.indexOf('|') !=-1){
														salesPrice=salesPrice.replace('|','-');
													}
												salesPrice= parseInt(salesPrice)/100;
												inqSalesPrices=""+salesPrice+"";
												achttemp[i]="MRC="+salesPrice;												
												}catch(eex){}
											}											
										}
										else if(achttemp[i] !=null && achttemp[i].indexOf("MON=") !=-1)
										{											
											inqClientOrderNum=achttemp[i].substring(achttemp[i].indexOf("MON=")+4);											
										}
										else if(achttemp[i] !=null && achttemp[i].indexOf("PROD_SOLD=") !=-1)
										{
											//inqSalesProductTypes=achttemp[i].substring(achttemp[i].indexOf("PROD_SOLD=")+10);											
											var chtProdTypes=achttemp[i].substring(achttemp[i].indexOf("PROD_SOLD=")+10);	
												try{
												chtProdTypes=unescape(chtProdTypes);
												chtProdTypes=chtProdTypes.toUpperCase();
												chtProdTypes=chtProdTypes.replace(/ /g,'');
												chtProdTypes=chtProdTypes.replace(/\+/g,'');
												chtProdTypes=chtProdTypes.replace(/\|/g,',');
												chtProdTypes=chtProdTypes.replace(/HSI/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/DSL/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/FIOSDATA/g, "FIOSINTERNET");
												chtProdTypes=chtProdTypes.replace(/DTV/g, "DIRECTTV");
												if(chtProdTypes.indexOf('FIOSINTERNET') !=-1 &&  chtProdTypes.length >13 && chtProdTypes.indexOf('FIOSINTERNET')==0 &&  !(chtProdTypes.indexOf('FIOSINTERNET,')==0)){
													chtProdTypes=chtProdTypes.replace('FIOSINTERNET','FIOSINTERNET,');
												}
												}catch(eex){}
												inqSalesProductTypes=	chtProdTypes;			
										}
										else if(achttemp[i] !=null && achttemp[i].indexOf("NRC=") !=-1 && achttemp[i].indexOf("NRC=") ==0)
										{
											var salesPrice=null;
											salesPrice=achttemp[i].substring(achttemp[i].indexOf("NRC=")+4);
											if(salesPrice !=null && salesPrice.length>0){
												try{
														if(salesPrice.indexOf('|') !=-1){
															salesPrice=salesPrice.replace('|','-');
													}
												salesPrice= parseInt(salesPrice)/100;
												achttemp[i]="NRC="+salesPrice;
												}catch(eex){}
											}											
										}
										else if(achttemp[i] !=null && achttemp[i].indexOf("TCNRC=|") !=-1){
												achttemp[i]=achttemp[i].replace('|','-');
										}
										else if(achttemp[i] !=null && achttemp[i].indexOf("TCMRC=|") !=-1 ){
												achttemp[i]=achttemp[i].replace('|','-');
										}
										if(vchtOtherinfo !=""){
											vchtOtherinfo=vchtOtherinfo+"~"+achttemp[i];
										}else{
												vchtOtherinfo=achttemp[i];
										}										
								}
							if(totalAvailable != null) {
								inqOtherInfo = vchtOtherinfo+"~Applicable_Products="+totalAvailable;
							}
							else
								inqOtherInfo = vchtOtherinfo;						
					}catch(e1){}
					if((inqSalesPrices ==null || inqSalesPrices =="" )   && typeof aimsOrderObject.pc != "undefined") {		
							inqSalesPrices = aimsOrderObject.pc;  
					}	
					 if(( inqSalesProductTypes ==null || inqSalesProductTypes ==""  ) && typeof aimsOrderObject.attr1 != "undefined") {		
						 	var chtProdTypes=aimsOrderObject.attr1;  				
												try{
												chtProdTypes=unescape(chtProdTypes);
												chtProdTypes=chtProdTypes.toUpperCase();
												chtProdTypes=chtProdTypes.replace(/ /g,'');
												chtProdTypes=chtProdTypes.replace(/\+/g,'');
												chtProdTypes=chtProdTypes.replace(/\|/g,',');
												chtProdTypes=chtProdTypes.replace(/HSI/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/DSL/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/FIOSDATA/g, "FIOSINTERNET");
												chtProdTypes=chtProdTypes.replace(/DTV/g, "DIRECTTV");
												if(chtProdTypes.indexOf('FIOSINTERNET') !=-1 &&  chtProdTypes.length >13 && chtProdTypes.indexOf('FIOSINTERNET')==0 &&  !(chtProdTypes.indexOf('FIOSINTERNET,')==0)){
													chtProdTypes=chtProdTypes.replace('FIOSINTERNET','FIOSINTERNET,');
												}
												}catch(eex){}
												inqSalesProductTypes=	chtProdTypes;			
								//inqSalesProductTypes = chtProdTypes;
									
					}
				}else
				{
						 if(typeof aimsOrderObject.attr1 != "undefined")
							 {		

							 	var chtProdTypes=aimsOrderObject.attr1;  				
												try{
												chtProdTypes=unescape(chtProdTypes);
												chtProdTypes=chtProdTypes.toUpperCase();
												chtProdTypes=chtProdTypes.replace(/ /g,'');
												chtProdTypes=chtProdTypes.replace(/\+/g,'');
												chtProdTypes=chtProdTypes.replace(/\|/g,',');
												chtProdTypes=chtProdTypes.replace(/HSI/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/DSL/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/FIOSDATA/g, "FIOSINTERNET");
												chtProdTypes=chtProdTypes.replace(/DTV/g, "DIRECTTV");
												if(chtProdTypes.indexOf('FIOSINTERNET') !=-1 &&  chtProdTypes.length >13 && chtProdTypes.indexOf('FIOSINTERNET')==0 &&  !(chtProdTypes.indexOf('FIOSINTERNET,')==0)){
													chtProdTypes=chtProdTypes.replace('FIOSINTERNET','FIOSINTERNET,');
												}
												}catch(eex){}
												inqSalesProductTypes=	chtProdTypes;			
								//inqSalesProductTypes = chtProdTypes;
							}
				}
			}catch(err){}
				reInitTCSubmitOrderDetails();
			}
		}
		}
		catch(ex) { 
			tcchatLogError +="Error in chatOrderSubmissionDetails"+ex.description;
		}
		try{
				var aTCGlobalSessionId="";
				var aTCGlobalSessionId25="";
				try{						
					aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID');													
					if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_awssit') !=null ){
						aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_awssit');
					}
					else if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_98') !=null ){
						aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_98');
					}
					if(aTCGlobalSessionId !=null && aTCGlobalSessionId !=""){
						aTCGlobalSessionId=escape(aTCGlobalSessionId);
					}
						
				}catch(err){}

				try{
						aTCGlobalSessionId25= readTCCookieInfo('GlobalSessionID_25');
						if(aTCGlobalSessionId25 !=null){
							aTCGlobalSessionId25=escape(aTCGlobalSessionId25);
						}						
				}catch(err){}
				setTimeout(function() {
					
					var aTCRef=escape(document.referrer);
					if(aTCRef !=null){
						aTCRef=aTCRef.substring(0,100);
					}
                    var ts = new Date().getTime();
                    
                    //Added by girig on 12th May 2017.
                    /*var chatInitiatedPage = "";
                    try {                                                                                                                        
                                    chatInitiatedPage = encodeURIComponent(limitGetUrl(window.location.href));
                    }
                    catch(e) {
                                    chatInitiatedPage = encodeURIComponent(document.referrer);
                    }*/
                    //ends here...
				
					var chatData = {
						"SalesProducts" :inqSalesProducts,
						"SalesQuantities" : inqSalesQuantities,   				
						"SalesPrices" : inqSalesPrices,
						"ClientOrderNum" : inqClientOrderNum,
						"SalesProductTypes" : inqSalesProductTypes,
						"OrderType" : inqOrderType,		
						"ERROR-MESSAGE" : tcchatLogError,		
						"OtherInfo" : inqOtherInfo,						
						"global-session-id" : aTCGlobalSessionId,
						"global-session-id25" : aTCGlobalSessionId25,
						"referrer" : aTCRef
					};
					
					//,"chatInitiatedPage": chatInitiatedPage
					try {
						var log = {
						"log-message" : chatData,
						"log-level" : "warn",
						"log-action" : "ORDER_SUBMISSION",
						"LOG-TO-DB" : "false",
						"log-time-stamp" : new Date().getTime()
					};
					logDetails(log);				
					}catch(e) {
				}			
			}, 200);

		}catch(ex){}
	}

	function callChatOrderConf() {
		var tcchatLogError="";
		try {

		if(typeof order != "undefined") {		
			if(null != order) {
			try{
			inqSalesProducts="";
			inqSalesQuantities="";
			inqSalesPrices="";
			inqClientOrderNum="";
			inqSalesProductTypes="";
			inqOrderType="";
			inqOtherInfo="";
				if(typeof order.ca != "undefined") {		
					inqSalesProducts = order.ca;  
					inqSalesProducts=inqSalesProducts.replace(/\|/g,',');
					inqSalesProducts=inqSalesProducts.replace(/-/g, "~");
				}
				if(typeof order.qn != "undefined") {		
					inqSalesQuantities = order.qn; 
					try{
					inqSalesQuantities=inqSalesQuantities.replace(/\|/g,',');
					}catch(exx){}
				}
				if(typeof order.ot != "undefined") {		
					inqOrderType = order.ot;  
				}
				if(typeof aimsTrackingVar != "undefined"  &&  aimsTrackingVar.indexOf("-" ) !=-1) {	
					try
						{
					    if(aimsTrackingVar.indexOf('MRC=-') != -1 || aimsTrackingVar.indexOf('NRC=-')  ||  aimsTrackingVar.indexOf('TCNRC=-') != -1 || aimsTrackingVar.indexOf('TCMRC=-') != -1){
							aimsTrackingVar=aimsTrackingVar.replace('MRC=-',"MRC=|");	
							aimsTrackingVar=aimsTrackingVar.replace('NRC=-',"NRC=|");	
							aimsTrackingVar=aimsTrackingVar.replace('TCNRC=-',"TCNRC=|");	
							aimsTrackingVar=aimsTrackingVar.replace('TCMRC=-',"TCMRC=|");	
					  }
					  var achttemp =aimsTrackingVar.split('-');
					  var  vchtOtherinfo="";
							for(var i=0; i <achttemp.length; i++)
							{									
									if(achttemp[i] !=null && achttemp[i].indexOf("MRC=") !=-1 && achttemp[i].indexOf("MRC=") ==0 )
										{
											var salesPrice=null;
											salesPrice=achttemp[i].substring(achttemp[i].indexOf("MRC=")+4);
											if(salesPrice !=null && salesPrice.length>0){
												try{
													if(salesPrice.indexOf('|') !=-1){
														salesPrice=salesPrice.replace('|','-');
													}
												salesPrice= parseInt(salesPrice)/100;
												inqSalesPrices=""+salesPrice+"";
												achttemp[i]="MRC="+salesPrice;												
												}catch(eex){}
											}											
										}
										else if(achttemp[i] !=null && achttemp[i].indexOf("MON=") !=-1)
										{											
											inqClientOrderNum=achttemp[i].substring(achttemp[i].indexOf("MON=")+4);											
										}
										else if(achttemp[i] !=null && achttemp[i].indexOf("PROD_SOLD=") !=-1)
										{
											//inqSalesProductTypes=achttemp[i].substring(achttemp[i].indexOf("PROD_SOLD=")+10);											
											var chtProdTypes=achttemp[i].substring(achttemp[i].indexOf("PROD_SOLD=")+10);	
												try{
												chtProdTypes=unescape(chtProdTypes);
												chtProdTypes=chtProdTypes.toUpperCase();
												chtProdTypes=chtProdTypes.replace(/ /g,'');
												chtProdTypes=chtProdTypes.replace(/\+/g,'');
												chtProdTypes=chtProdTypes.replace(/\|/g,',');
												chtProdTypes=chtProdTypes.replace(/HSI/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/DSL/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/FIOSDATA/g, "FIOSINTERNET");
												chtProdTypes=chtProdTypes.replace(/DTV/g, "DIRECTTV");
												if(chtProdTypes.indexOf('FIOSINTERNET') !=-1 &&  chtProdTypes.length >13 && chtProdTypes.indexOf('FIOSINTERNET')==0 &&  !(chtProdTypes.indexOf('FIOSINTERNET,')==0)){
													chtProdTypes=chtProdTypes.replace('FIOSINTERNET','FIOSINTERNET,');
												}
												}catch(eex){}
												inqSalesProductTypes=	chtProdTypes;			
										}
										else if(achttemp[i] !=null && achttemp[i].indexOf("NRC=") !=-1 && achttemp[i].indexOf("NRC=") ==0)
										{
											var salesPrice=null;
											salesPrice=achttemp[i].substring(achttemp[i].indexOf("NRC=")+4);
											if(salesPrice !=null && salesPrice.length>0){
												try{
														if(salesPrice.indexOf('|') !=-1){
															salesPrice=salesPrice.replace('|','-');
													}
												salesPrice= parseInt(salesPrice)/100;
												achttemp[i]="NRC="+salesPrice;
												}catch(eex){}
											}											
										}
										else if(achttemp[i] !=null && achttemp[i].indexOf("TCNRC=|") !=-1){
												achttemp[i]=achttemp[i].replace('|','-');
										}
										else if(achttemp[i] !=null && achttemp[i].indexOf("TCMRC=|") !=-1 ){
												achttemp[i]=achttemp[i].replace('|','-');
										}
										if(vchtOtherinfo !=""){
											vchtOtherinfo=vchtOtherinfo+"~"+achttemp[i];
										}else{
												vchtOtherinfo=achttemp[i];
										}										
								}
								inqOtherInfo = vchtOtherinfo+"~Applicable_Products="+totalAvailable;						
					}catch(e1){}
					if((inqSalesPrices ==null || inqSalesPrices =="" )   && typeof order.pc != "undefined") {		
							inqSalesPrices = order.pc;  
					}	
					 if(( inqSalesProductTypes ==null || inqSalesProductTypes ==""  ) && typeof order.attr1 != "undefined") {		
						 	var chtProdTypes=order.attr1;  				
												try{
												chtProdTypes=unescape(chtProdTypes);
												chtProdTypes=chtProdTypes.toUpperCase();
												chtProdTypes=chtProdTypes.replace(/ /g,'');
												chtProdTypes=chtProdTypes.replace(/\+/g,'');
												chtProdTypes=chtProdTypes.replace(/\|/g,',');
												chtProdTypes=chtProdTypes.replace(/HSI/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/DSL/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/FIOSDATA/g, "FIOSINTERNET");
												chtProdTypes=chtProdTypes.replace(/DTV/g, "DIRECTTV");
												if(chtProdTypes.indexOf('FIOSINTERNET') !=-1 &&  chtProdTypes.length >13 && chtProdTypes.indexOf('FIOSINTERNET')==0 &&  !(chtProdTypes.indexOf('FIOSINTERNET,')==0)){
													chtProdTypes=chtProdTypes.replace('FIOSINTERNET','FIOSINTERNET,');
												}
												}catch(eex){}
												inqSalesProductTypes=	chtProdTypes;			
								//inqSalesProductTypes = chtProdTypes;
									
					}
				}else
				{
						 if(typeof order.attr1 != "undefined")
							 {		

							 	var chtProdTypes=order.attr1;  				
												try{
												chtProdTypes=unescape(chtProdTypes);
												chtProdTypes=chtProdTypes.toUpperCase();
												chtProdTypes=chtProdTypes.replace(/ /g,'');
												chtProdTypes=chtProdTypes.replace(/\+/g,'');
												chtProdTypes=chtProdTypes.replace(/\|/g,',');
												chtProdTypes=chtProdTypes.replace(/HSI/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/DSL/g, "HIGHSPEEDINTERNET");
												chtProdTypes=chtProdTypes.replace(/FIOSDATA/g, "FIOSINTERNET");
												chtProdTypes=chtProdTypes.replace(/DTV/g, "DIRECTTV");
												if(chtProdTypes.indexOf('FIOSINTERNET') !=-1 &&  chtProdTypes.length >13 && chtProdTypes.indexOf('FIOSINTERNET')==0 &&  !(chtProdTypes.indexOf('FIOSINTERNET,')==0)){
													chtProdTypes=chtProdTypes.replace('FIOSINTERNET','FIOSINTERNET,');
												}
												}catch(eex){}
												inqSalesProductTypes=	chtProdTypes;			
								//inqSalesProductTypes = chtProdTypes;
							}
				}
			}catch(err){
					tcchatLogError +="Error in 1111 callChatOrderConf"+err.description;
			}
				reInitTCSubmitOrderDetails();
			}
		}
		}
		catch(ex) { 
			tcchatLogError +="Error in callChatOrderConf"+ex.description;
		}
try{
				var aTCGlobalSessionId="";
				var aTCGlobalSessionId25="";
				try{						
					aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID');													
					if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_awssit') !=null ){
						aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_awssit');
					}
					else if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_98') !=null ){
						aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_98');
					}
					if(aTCGlobalSessionId !=null && aTCGlobalSessionId !=""){
						aTCGlobalSessionId=escape(aTCGlobalSessionId);
					}
					
					
			}catch(err){}

				try{
						aTCGlobalSessionId25= readTCCookieInfo('GlobalSessionID_25');
						if(aTCGlobalSessionId25 !=null){
							aTCGlobalSessionId25=escape(aTCGlobalSessionId25);
						}						
				}catch(err){}
				setTimeout(function() {
					var aTCRef=escape(document.referrer);
					if(aTCRef !=null){
						aTCRef=aTCRef.substring(0,100);
					}
				
					var chatData = {
						"SalesProducts" :inqSalesProducts,
						"SalesQuantities" : inqSalesQuantities,   				
						"SalesPrices" : inqSalesPrices,
						"ClientOrderNum" : inqClientOrderNum,
						"SalesProductTypes" : inqSalesProductTypes,
						"OrderType" : inqOrderType,		
						"ERROR-MESSAGE" : tcchatLogError,		
						"OtherInfo" : inqOtherInfo,						
						"global-session-id" : aTCGlobalSessionId,
						"global-session-id25" : aTCGlobalSessionId25,
						"referrer" : aTCRef
					};
					try {
						var log = {
						"log-message" : chatData,
						"log-level" : "warn",						
     					"log-action" : "ORDER_SUBMISSION",
						"LOG-TO-DB" : "false",
						"log-time-stamp" : new Date().getTime()
					};
					logDetails(log);				
					}catch(e) {
				}			
			}, 200);

		}catch(ex){}
	}	
	
	
	function readTCCookieInfo(cookieName) {
		var cookieValue = null;
		cookieName= cookieName+"=";
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {				
                var cookie = cookies[i].trim();			
                if (cookie.substring(0, cookieName.length) == (cookieName)) {
                    cookieValue = cookie.substring(cookieName.length);
                    break;
                }
            }
        }
        return cookieValue;	
	}
	
	function verifyy() 
	{
		var chatInProgressFlag = false;
		var chatInProgressCookieInfo = readTCCookieInfo("CHAT_IN_PROGRESS");
		if(null != chatInProgressCookieInfo) {
			chatInProgressFlag = ("Y"==chatInProgressCookieInfo) ? true : false;
		}
		
	
		
		if(false == chatInProgressFlag ) {
			return true;
		}
		return false;
	}
	
	function reInit(aPgId) {	
		try{
		if(false == verifyy()) {
			return false;
		}		

		var GsamAct=	readTCCookieInfo('vfyh');
		if(GsamAct !=null && (GsamAct=='8' || GsamAct=='8usa'  ||  GsamAct=='8USA'   || (GsamAct.indexOf('gsl=8') != -1))){
			var aCky= readTCCookieInfo("TC_CHAT_IN_PROGRESS");
			if(aCky  ==null  || aCky == '' || aCky == 'N'){
				try{
					document.getElementById('tc-chat-container-01').style.display='none';				
				}catch(e){}
				return;
			}
		}

		if(typeof aPgId!= 'undefined' && aPgId !=null ){
			
			if(aPgId =='38315384'  || aPgId ==38315384 || aPgId =='38144183'  || aPgId ==38144183 || aPgId =='38144184'  || aPgId ==38144184 || aPgId =='38144185'  || aPgId ==38144185 || aPgId =='38144180'  || aPgId ==38144180 || aPgId =='38144132'  || aPgId ==38144132 || aPgId =='38144133'  || aPgId ==38144133 || aPgId =='38144134'  || aPgId ==38144134 || aPgId =='37060825'  || aPgId ==37060825 || aPgId =='36975300'  || aPgId ==36975300 || aPgId =='36485553'  || aPgId ==36485553 || aPgId == '36485581' || aPgId == 36485581 || aPgId == '36975301' || aPgId == 36975301 || aPgId == '36975299' || aPgId == 36975299){
				inqSiteID=aPgId;						
			}else{
				// inqSiteID=aPgId;
				return;
			}
		}
			
		setTimeout(function() {
			chatLib.setDataPass(true, aPgId);
		}, 100);
		}catch(e){}
	}

	function LaunchTCCustomEvent(aCntxt){
		try{
			if(aCntxt !=null && (aCntxt=='VZT-Machine-Learning-Threshold-Reached' || aCntxt.toLowerCase()=='vzt-machine-learning-threshold-reached')){
				setTimeout("triggerMachineLearning()",5000);
			}
		}catch(e){}
	}
	
	function triggerMachineLearning(){
			Inq.fireCustomEvent('VZT-Machine-Learning-Threshold-Reached');
	}

	function refreshTCChat() {	
		try{
		if(false == verifyy()) {
			return false;
		}		
		
		if (typeof aimsChatCreditFlow != "undefined" &&  aimsChatCreditFlow !=null && aimsChatCreditFlow  ==1)
		{			
			inqSiteID=36745144;
		}else{
			inqSiteID="";
		}
				

		setTimeout(function() {
			chatLib.setDataPass(true);
		}, 100);
		}catch(e){}
	}



	function reInitTestPage(aPgId) {	
		try{
		if(false == verifyy()) {
			return false;
		}		

		if(typeof aPgId!= 'undefined' && aPgId !=null){
			inqSiteID=aPgId;
			//return;
		}
		
				
		setTimeout(function() {
			chatLib.setDataPass(false);
		}, 100);
		}catch(e){}
	}

var isInitDone=false;

	function reInitTCSubmitOrderDetails() {	
		try{
		if(false == verifyy() || false == isInitDone) {
			return false;
		}		

		setTimeout(function() {
			chatLib.setDataPass(true);
		}, 100);
		}catch(e){}
	}

	function init() {		
		isInitDone=true;
		if(false == verifyy()) {
			return false;
		}	
		setTimeout(function() {
			chatLib.setDataPass(false);
		}, 100);
	}	
	//ends here...
	
	//APIs for Touch-Commerce.
	function getChatData(dataFormat) {
		/*if(null == chatLib) {
			pendingCalls.push(function() {
				getChatData(dataFormat);
			});
			return;
		}*/	
		return chatLib.getChatData(dataFormat);
	}		
	
	//var TCSSOTimer=null;
	
	function stopTCSSOTimer(){
		try{
			
			
			setTimeout("try{stopSessionTimoutTimer();}catch(e){}", 1000);
			//var url = getDotComHostTC(getHost())+"/foryourhome/ordering/ChatAjax.aspx";
			//var url = "https://sit-signin.verizon.com/sso/authsso/keepSessionAlive.jsp";
			//makeOneWayRequest(url);
			//if(TCSSOTimer ==null){
				//TCSSOTimer=setInterval("makeOneWayRequest('"+url+"');",60000);
			//}
			
		}catch(e){
			//alert(e.description);
		}
		
		
	}
	
	function stopTCSSOTimerRefresh(){
		try{
			
			
			setTimeout("try{stopSessionTimoutTimer();}catch(e){}", 30000);
			//var url = getDotComHostTC(getHost())+"/foryourhome/ordering/ChatAjax.aspx";
			//var url = "https://sit-signin.verizon.com/sso/authsso/keepSessionAlive.jsp";
			//makeOneWayRequest(url);
			//if(TCSSOTimer ==null){
				//TCSSOTimer=setInterval("makeOneWayRequest('"+url+"');",60000);
			//}
			
		}catch(e){
			//alert(e.description);
		}
		
		
	}
	
	
/*	function refreshSSOJSFile(){
		var scriptPathTC = "https://sit-signin.verizon.com/sso/resources/js/sessionAlert.js?cRand="+Math.random();
		var chatLibScriptTagTC = document.createElement('script');
		chatLibScriptTagTC.setAttribute("type", "text/javascript");
		chatLibScriptTagTC.setAttribute("src", scriptPathTC);
		if (chatLibScriptTagTC.readyState) {
			chatLibScriptTagTC.onreadystatechange = function () { 
			if (this.readyState == 'complete' || this.readyState == 'loaded') {
				//alert("TC script loaded successfully");
				//load chat library (bridge).
				//initializeChatLib();
			}
		  };
		} 
		else { 
		  chatLibScriptTagTC.onload = function(){
			//alert("TC script loaded successfully");
			//load chat library (bridge).
			//initializeChatLib();			
		  };
		}
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(chatLibScriptTagTC);	
		
	}
	*/
	function startTCSSOTimer(){
		try{	
			setTimeout("try{startSessionTimeoutTimer();}catch(e){}", 10000);						
		}catch(e){
			//alert(e.description);
		}
		
		
	}
	
	function captureCustJourney(){
		var aTCGlobalSessionId="";
		
		try{						
			aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID');													
			if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_awssit') !=null ){
				aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_awssit');
			}
			else if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_98') !=null ){
				aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_98');
			}
			if(aTCGlobalSessionId !=null && aTCGlobalSessionId !=""){
				aTCGlobalSessionId=escape(aTCGlobalSessionId);
			}
		}catch(err){}

				
		try {
			var aTCRef=escape(document.referrer);
			if(aTCRef !=null){
				aTCRef=aTCRef.substring(0,100);
			}
			
			var aDtURL=escape(top.location.href);
			if(aDtURL !=null){
				aDtURL=aDtURL.substring(0,100);
			}
			
			var chatData = {
					
					"global-session-id" : aTCGlobalSessionId,
					"LOG-TO-DB" : "TRUE",
					"EVENT" : "CUST_JOURNEY",
					"dotcomURL" : aDtURL,
					"referrer" : aTCRef
				};	
						var log = {
						"log-message" : chatData,
						"log-level" : "warn",
						"log-action" : "CUST_JOURNEY",
						"LOG-TO-DB" : "true",
						"log-time-stamp" : new Date().getTime()
						
					};
					logDetails(log);				
			}catch(e) {}
	}

	var createTCCookie = function(name, value) {			
		document.cookie = name+"="+escape(value)+";path=/;";
	};
	var deleteCookie = function(name) {	
		document.cookie = name+"=;path=/";
	};
	
	
	var session = {};
	/******** LISTENERS *******/
	/* Chat Launched Listener Example */
	var chatLaunchedListener = {
		onChatLaunched: function(evt) {
			//alert("Chat Launched: chatID=" + evt.chatID + ", customerID = " + evt.customerID);
			session["chat-session-id"] = evt.chatID;
			session["chat-customer-id"] = evt.customerID;
			session["local-time-stamp"] = new Date().getTime();
            //On 16th Aug. 2017 - to capture logged-in user cookie info.
            try {
                  var userInfoCookie = readTCCookieInfo("userinfo");
                  if(null != userInfoCookie) {
                         session["customer-cookie"] = userInfoCookie;
                         var log = {
                                       "log-message" : session,
                                       "log-level" : "warn",
                                       "log-action" : "SAVE_CUSTOMER_COOKIE",
                                       "LOG-TO-DB" : "true",
                                       "log-time-stamp" : new Date().getTime()
                         };
                         logDetails(log);                                                                                
                  }                          
            }
            catch(e) {
                  
            }                                               
            //ends here...

			//set the cookie TC_CHAT_IN_PROGRESS
			createTCCookie("TC_CHAT_IN_PROGRESS", "Y");			
			stopTCSSOTimer();
			//evts	
			if(typeof chatEventListeners["onChatLaunched"] != "undefined" && typeof chatEventListeners["onChatLaunched"] === "function") {
				chatEventListeners["onChatLaunched"](JSON.stringify(session));
			}
			
		}
	};
	
	/* Chat Closed Event Listener Example */
	var chatClosedListener = {
		onChatClosed: function(evt) {
			var logMsg = "Chat Closed: chatID=" + evt.chatID + ", customerID = " + evt.customerID + ", agentID = " + evt.agentID;
			//remove the cookie TC_CHAT_IN_PROGRESS
			deleteCookie("TC_CHAT_IN_PROGRESS");			
			startTCSSOTimer();
			try {
				var log = {
					"log-message" : logMsg,
					"log-level" : "warn",
					"log-action" : "CLOSE_CHAT",
					"LOG-TO-DB" : "false",
					"log-time-stamp" : new Date().getTime()
				};
				logDetails(log);							
			}
			catch(e) {
			
			}
			
			//evts	
			if(typeof chatEventListeners["onChatClosed"] != "undefined" && typeof chatEventListeners["onChatClosed"] === "function") {
				chatEventListeners["onChatClosed"](JSON.stringify(session));
			}
			
		}
	};		
	
	
	/* C2C Displayed Listener Example */
	var c2cDisplayed = {
		onC2CDisplayed: function(evt) {
			//alert("C2C Displayed");
		}
	};
	/* C2C Clicked Listener Example */
	var c2cClickedListener = {
		onC2CClicked: function(evt) {
			//alert("C2C Clicked");
		}
	};

	/* Agent Listener Example */
	var agentListener = {
		onAgentAssigned: function(evt) {
			//alert("agentID=" + evt.agentID + ", agentAttributes=" + evt.agtAttrs + ", buID=" + evt.businessUnitID + ", agentGroupID=" + evt.agentGroupID);
			//0719
			var agentSalesCode = "VZID";
			try {
				if(null != evt.agtAttrs) { 
					var agentAttrs = evt.agtAttrs;
					var agentSalesCodeIdx = agentAttrs.indexOf("agentSalesCode");
					if(agentSalesCodeIdx != -1) {
						var commaIdx = agentAttrs.indexOf(",", agentSalesCodeIdx+1);
						if(commaIdx != -1) {
							agentSalesCode = agentAttrs.substring(agentSalesCodeIdx, commaIdx);
						}
						else {
							agentSalesCode = agentAttrs.substring(agentSalesCodeIdx);
						}			
						//0721
						if(null != agentSalesCode) {
							var eqIdx = agentSalesCode.indexOf("=");
							if(eqIdx != -1) {
								agentSalesCode = agentSalesCode.substring(eqIdx+1);
							}
						}
						//ends here...					
					}
				}							
			}
			catch(e) {
				
			}
			session["agent-sales-code"] = agentSalesCode;						
			//ends here...
			
			session["agent-id"] = evt.agentID;									
			//setAgentInfo(session);		

			//evts	
			if(typeof chatEventListeners["onAgentAssigned"] != "undefined" && typeof chatEventListeners["onAgentAssigned"] === "function") {
				chatEventListeners["onAgentAssigned"](JSON.stringify(session));
			}			
		}
	};

	/* Click to Chat State Changed Example */
	var c2cStateChanged = {
		onC2CStateChanged: function(evt) {
			//alert("C2C State Changed - rule= " + evt.bizRuleName + ", oldstate: " + evt.oldState + ", newstate: " + evt.newState);
		}
	};	
	
	/* Initialize the Sale Landing Listener
	product: "<string value>, quantity: "<string value> */
	var saleLandingListener = {
		onSaleEvent: function(evt) {
			//alert("Sale Landing: products=" + evt.products + ", quantities = " + evt.quantities);
		}
	};
	
	/* Sale Qualified Event Listener */
	var saleQualifiedListener = {
		onSaleQualifiedEvent: function(evt) {
//			alert("Sale Qualified: chatID=" + evt.chatID + ", customerID = " + evt.customerID + ", agentID = " + evt.agentID + ", bizRuleName = " + evt.bizRuleName);
			try{
			if(typeof session["agent-id"] == 'undefined'  || session["agent-id"] ==null || session["agent-id"] == 'undefined' || session["agent-id"] == ''){
				session["agent-id"] = evt.agentID;
			}
			if(typeof session["chat-session-id"] == 'undefined'  || session["chat-session-id"]==null || session["chat-session-id"] == 'undefined' || session["chat-session-id"] == ''){
				session["chat-session-id"] = evt.chatID;
			}
			if(typeof session["agent-sales-code"] == 'undefined'  || session["agent-sales-code"]==null || session["agent-sales-code"] == 'undefined' || session["agent-sales-code"] == ''){
				session["agent-sales-code"] ="VZID";
			}
			}catch(e){}
			//ends here...
			
			setAgentInfo(session);		
				if( typeof _satellite != 'undefined' && typeof digitalData != 'undefined' && digitalData !=null){
			    	
			    	//--------------------------------------------DTM Integration ----------------------------------------------
			    	
			    	try{

						var ctProp2="residential";
						var ctProp3="learn";	
						var agentId = session["agent-id"];
						if(null != agentId) 
						{
							var atIndex = agentId.indexOf("@");
							if(atIndex != -1) 
								{
									agentId = agentId.substring(0, atIndex);
								}
						}
						
						if (typeof digitalData.page.businessUnit != 'undefined'){
							ctProp2= digitalData.page.businessUnit;
						}
						if (typeof digitalData.page.pageType != 'undefined'){
							ctProp3= digitalData.page.pageType;
						}

				    	var chatUpdateEvent = { 
				    			 eventInfo: 
				    			 { 
				    			 eventName: "pageViewUpdate", 
				    			 type: "interactiveChat", 
				    			 action: "tcChat", 
				    			 timeStamp: new Date(), 
				    			 processed: 
				    			 { 
				    			 adobeAnalytics: false //dtm will change this to true once processed 
				    			 } 
				    			 }, 
				    			 page: 
				    			 { 
				    			 pfxID:"cht",
				    			 pageName: "TCchatwindow", //same value as #hdn_simplepageName 
				    			 detailPageName: "TC initiated chat"+"|"+ctProp2+" _"+ctProp3, //same value as #hdn_detailpageName 
				    			 applicationName: "TouchCommercechat",
								 chatRepID:agentId 
				    			 },
				    			 userProfile:
				    			 {
				    			 profileID:"Chat User "+session["chat-session-id"]+"| EnterpriseID "+agentId
				    			 },	
								 scEvents: "event48" //String of events as in #hdn_events
				    			 }; 

				    			 //Push it onto the event array on digitalData object 
				    			 window.digitalData = window.digitalData || {}; 
	 							 window.digitalData.page.chatRepID= agentId;
				    			 window.digitalData.events = digitalData.events || []; 
				    			 window.digitalData.events.push(chatUpdateEvent); 


				    			 //Create and dispatch an event trigger 
				    			 if (typeof sendCustomEvent !='undefined'){
				    				 sendCustomEvent("pageViewUpdate");
				    			 }else{
				    				 sendCustomEventChat("pageViewUpdate");
				    			 }
				    	}catch(ee){
							//alert(ee.description);
						}
			    	
			    	//--------------------------------------DTM integration end--------------------------------------------------
			    	
			    }else{				
					try{
						//sitecatalyst calls
						var temp_pfxID = s_837.pfxID;
						var temp_simplepageName = s_837.simplepageName;
						var temp_prop5 = s_837.prop5;
						var temp_prop48 = s_837.prop48;
						var temp_detailpageName = s_837.detailpageName;
					    var temp_events=s_837.events;
						var temp_prop3 = s_837.prop3;
						var agentId = session["agent-id"];
						if(null != agentId) 
						{
							var atIndex = agentId.indexOf("@");
							if(atIndex != -1) 
								{
									agentId = agentId.substring(0, atIndex);
								}
						}	
						s_837.pfxID="cht";
						s_837.simplepageName="TCchatwindow";
						s_837.prop5="Chat User "+session["chat-session-id"]+"| EnterpriseID "+agentId;
						s_837.prop48="TouchCommercechat";
						s_837.detailpageName= "TC initiated chat"+"|"+s_837.prop2+" _"+s_837.prop3; 
						s_837.events="event48";
						if(typeof IsAccessoriesCompFlow != 'undefined' && IsAccessoriesCompFlow !=null && (IsAccessoriesCompFlow == true || IsAccessoriesCompFlow.toLowerCase() == 'true')){
								s_837.prop3 = "accessories";
						}
						var s_code=s_837.t();
						setTimeout("resetSiteCatParams('"+temp_pfxID+"','"+temp_simplepageName+"','"+temp_prop5+"','"+temp_prop48+"' ,'"+temp_detailpageName+"' ,'"+temp_prop3+"' ,'"+temp_events+"');",500);
					}catch(e){}
			    }
		}
	};
	

		function sendCustomEventChat(evt) {
		  if (document.createEvent && document.body.dispatchEvent) {
		    var event = document.createEvent('Event');
		    event.initEvent(evt, true, true); //can bubble, and is cancellable
		    document.body.dispatchEvent(event);
		  } else if (window.CustomEvent && document.body.dispatchEvent) {
		    var event = new CustomEvent(evt, {
		      bubbles: true,
		      cancelable: true
		    });
		    document.body.dispatchEvent(event);
		  }
		}


	/* Sold listener example */
	var soldListener = {
		onSoldEvent: function(evt) {
			//alert("Sale Completed: saleID=" + evt.saleID + ", agentID = " + evt.agentID + ", products = " + evt.products + ", quantities = " + evt.quantities);
		}
	};
	
	/* Survey Launch listener example */
	var surveyLaunchListener = {
		onSurveyLaunchEvent: function(evt) {
			//evt.evtType values: LAUNCHED or CLOSED
			//alert("Survey Launched: chatType=" + evt.chatType + ", evtType = " + evt.evtType);			
		}
	};
	
	
	/* Chat Engaged Listener Example */
	var chatEngagedListener = {
		onChatEngagedEvent: function(evt) {
			//evt.chatType values: C2C,POPUP, or PERSISTENT	
			//alert("Chat Engaged: chatID=" + evt.chatID + ", chatType=" + evt.chatType + ", evtType=" + evt.evtType);
		}
	};	
	//ends here...
	/******** END OF LISTENERS *******/
	
	/* register all listeners */
	var InqRegistry = {
		chatListeners: [chatLaunchedListener, chatClosedListener, agentListener],
		listeners: [c2cDisplayed, c2cClickedListener, c2cStateChanged],
		saleListeners: [saleLandingListener, saleQualifiedListener, soldListener, surveyLaunchListener, chatEngagedListener]
	};	
	/* end of register all listeners */
	
	function firePendingCalls() {
		if(null != pendingCalls && pendingCalls.length > 0) {
			for(var idx=0; idx < pendingCalls.length; idx++) {
				(pendingCalls[idx])();
			}
		}
	}

	function resetSiteCatParams(stpfxID, stsimplepageName, stprop5, stprop48, stdetailpageName, stprop3, stEvent)
	{
					s_837.pfxID=stpfxID;
					s_837.simplepageName=stsimplepageName;
					s_837.prop5=stprop5;
					s_837.prop48 =  stprop48;
					s_837.detailpageName =  stdetailpageName;
					s_837.events =stEvent;
					s_837.prop3=stprop3;
	}

	function getHost() {
		var chatLibTag = document.getElementById("chatLib");
		var sourceInfo = "";
		var sourceHost = "";
		if(null != chatLibTag) {
			if (chatLibTag.getAttribute.length !== undefined) {
				sourceInfo = chatLibTag.src;
			} else {
				sourceInfo = chatLibTag.getAttribute('src', -1);
			}
			
			if(null != sourceInfo){
				var sourceInfoArr = sourceInfo.split("/");
				if( (sourceInfoArr instanceof Array) && (sourceInfoArr.length >= 2) ){
					sourceHost = sourceInfoArr[0] + "//" + sourceInfoArr[2];
				}
			}			
		}
		else {
			//added a temporary code as per the request.
			if(null != window.location.href && (window.location.href.indexOf("vzrewards.verizon.com") != -1 || window.location.href.indexOf("shop.verizon.com") != -1)) {
				return chatHostConfig["PROD"];
			}
			//ends here...
			
			//added a generic code on 20th July 2017 to handle any urls.
            if (null != document.querySelector) {
                  try {
                         var chatScriptTag = document.querySelector("script[src$='vztc.js']");
                         if(null != chatScriptTag) {
                                var chatScriptSrc = chatScriptTag.src;
                                if(null != chatScriptSrc){
                                       var sourceInfoArr = chatScriptSrc.split("/");
                                       if( (sourceInfoArr instanceof Array) && (sourceInfoArr.length >= 2) ){
                                              sourceHost = sourceInfoArr[0] + "//" + sourceInfoArr[2];
                                              return sourceHost;
                                       }
                                }                    
                         }                                 
                  }
                  catch(e) {
                         //let the below flow continue to identify host based on url.
                  }
            }
            //ends here...
			//Go by URL to identify the host.
			var urlInfo = window.location.href;
			if(null != urlInfo) {			

				if(urlInfo.indexOf("sit-activate") != -1 ||  urlInfo.indexOf("wwwawssit.ebiz.verizon.com") != -1 || urlInfo.indexOf("wwwawsuat.ebiz.verizon.com") != -1 || urlInfo.indexOf("www25.verizon.com") != -1 || urlInfo.indexOf("www26.verizon.com") != -1  || urlInfo.indexOf("www35.verizon.com") != -1 || urlInfo.indexOf("shopawssit.ebiz") != -1) {
					//SIT
					sourceHost = chatHostConfig["SIT"];
				}
				else if(urlInfo.indexOf("stg-") != -1 ||  urlInfo.indexOf("www98.verizon.com") != -1 || urlInfo.indexOf("smallbizrewardstest") != -1  || urlInfo.indexOf("vzrewardstest-stg") != -1) {
					//STG
					sourceHost = chatHostConfig["STG"];
				}
				else if(urlInfo.indexOf("www.verizon.com") != -1) {
					//PROD
					sourceHost = chatHostConfig["PROD"];
				}
				else {
					//Set the default to PROD.
					//Before setting the default to PROD, check the Environment and set the environment's host accordingly.
					if(urlInfo.indexOf("sit-chat.ebiz.verizon.com") != -1 || urlInfo.indexOf("collaborateextst.verizon.com") != -1) {
						//Just in case if it is accessed from test page in SIT.
						sourceHost = chatHostConfig["SIT"];
					}
					else if(urlInfo.indexOf("stg-chat.ebiz.verizon.com") != -1 || urlInfo.indexOf("collaborateextstg.verizon.com") != -1) {
						//Just in case if it is accessed from test page in STG.
						sourceHost = chatHostConfig["STG"];
					}
					else if(urlInfo.indexOf("chat.ebiz.verizon.com") != -1 || urlInfo.indexOf("collaborateext.verizon.com") != -1) {
						//Just in case if it is accessed from test page in PROD.
						sourceHost = chatHostConfig["PROD"];
					}				
					else {
						//Set the default to PROD.
						sourceHost = chatHostConfig["PROD"];
					}					
				}
			}
			else {
				//Set the default to PROD.
				sourceHost = chatHostConfig["PROD"];
			}
		}		
		
		return sourceHost;
	}


function	updateSalesQualificationDetails(tcaChatID, tcaAgentId, tcaAgentSalesCode, tcaAgentGroupId) {

				if(typeof setChatAgentInfo == 'undefined'  && (typeof chatCompensationFlow != 'undefined' && chatCompensationFlow !=null && (chatCompensationFlow == true || chatCompensationFlow.toLowerCase() == 'true')) ||
					(typeof IsAccessoriesCompFlow != 'undefined' && IsAccessoriesCompFlow !=null && (IsAccessoriesCompFlow == true || IsAccessoriesCompFlow.toLowerCase() == 'true'))){
						var tcchatLogError="";
						var SourceApp="sales-contactus";
						if(typeof IsAccessoriesCompFlow != 'undefined' && IsAccessoriesCompFlow !=null && (IsAccessoriesCompFlow == true || IsAccessoriesCompFlow.toLowerCase() == 'true')){
							SourceApp = "accessories";
						}
						try
						{			
							if(null != tcaAgentId) 
							{
								var atIndex = tcaAgentId.indexOf("@");
								if(atIndex != -1) {
									tcaAgentId = tcaAgentId.substring(0, atIndex);
								}
							}
							
						}
						catch(err) 
						{
			   				tcchatLogError +="Error in setChatAgentInfo"+err.description;
						}
						var aTCGlobalSessionId="";
						var aTCGlobalSessionId25="";
						try{
								aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID');									
								if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_awssit') !=null ){
									aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_awssit');
								}
								else if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_98') !=null ){
									aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_98');
								}
								if(aTCGlobalSessionId !=null && aTCGlobalSessionId !=""){
									aTCGlobalSessionId=escape(aTCGlobalSessionId);
								}
						}catch(err){}
						try{
								aTCGlobalSessionId25= readTCCookieInfo('GlobalSessionID_25');				
								if(aTCGlobalSessionId25 !=null){
										aTCGlobalSessionId25=escape(aTCGlobalSessionId25);
								}			
							}catch(err){}
						setTimeout(function() {
							var aTCRef=escape(document.referrer);							
							if(aTCRef !=null){
								aTCRef=aTCRef.substring(0,100);
							}
							
							var aDtURL=escape(top.location.href);
							if(aDtURL !=null){
								aDtURL=aDtURL.substring(0,100);
							}
							
							var ts = new Date().getTime();
							
							//Added by girig on 12th May 2017.
							/*var chatInitiatedPagechatInitiatedPage = "";
							try {								
								chatInitiatedPage = encodeURIComponent(limitGetUrl(window.location.href));
							}
							catch(e) {
								chatInitiatedPage = encodeURIComponent(document.referrer);
							} */
							//ends here...
							
							var chatData = {
								"chat-session-id" : tcaChatID,
								"agent-Id" : tcaAgentId,
								"agent-sales-code" : tcaAgentSalesCode,
								"agent-group-id" :tcaAgentGroupId,
								"global-session-id" : aTCGlobalSessionId,
								"global-session-id25" : aTCGlobalSessionId25,
								"LOG-TO-DB" : "TRUE",
								"source-app" : SourceApp,
								"lob" : "consumer",
								"chatCompensationFlow":"true",
								"ERROR" : tcchatLogError,
								"EVENT" : "INTERACTIVE_CHAT",
								"dotcomURL" : aDtURL,
								"referrer" : aTCRef
								// "chatInitiatedPage": chatInitiatedPage
							};
							
							//,"chatInitiatedPage": chatInitiatedPage
							
							try {
								//Yet to save into DB.
								var log = {
								"log-message" : chatData,
								"log-level" : "warn",
								"log-action" : "INTERACTIVE_CHAT",
								"LOG-TO-DB" : "true",
								"log-time-stamp" : new Date().getTime()
								};
								logDetails(log);				
							}			
							catch(e) {
					}			
				}, 200);
			}
}
	
	function limitGetUrl(url) {
		var MAX_SIZE = 200;
		var newUrl = url;
		try {
			if(null !=url) {
				var len = url.length;
				if(len > MAX_SIZE) {
					newUrl = url.substring(0, MAX_SIZE);					
				}
			}
		}
		catch(e) {
			throw e;
		}
		return newUrl;
	}
	function setAgentInfo(session) {
	
		var agentId = session["agent-id"];
		var tcchatLogError="";
		try {			
			if(null != agentId) {
				var atIndex = agentId.indexOf("@");
				if(atIndex != -1) {
					agentId = agentId.substring(0, atIndex);
				}
			}
			//0719
			setChatAgentInfo(agentId, session["chat-session-id"], session["agent-sales-code"]);
		}
		catch(err) {
			   		tcchatLogError +="Error in setChatAgentInfo"+err.description;
		}
	    var aTCGlobalSessionId="";
		var aTCGlobalSessionId25="";

		try{						
			aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID');													
			if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_awssit') !=null ){
				aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_awssit');
			}
			else if((typeof aTCGlobalSessionId == 'undefined' || aTCGlobalSessionId == null) && readTCCookieInfo('GlobalSessionID_98') !=null ){
				aTCGlobalSessionId= readTCCookieInfo('GlobalSessionID_98');
			}
			if(aTCGlobalSessionId !=null && aTCGlobalSessionId != "" ){
				tcData.globalSessionId = aTCGlobalSessionId;
				aTCGlobalSessionId = escape(aTCGlobalSessionId);
			}
		}catch(err){}

		try{
				aTCGlobalSessionId25= readTCCookieInfo('GlobalSessionID_25');				
					if(aTCGlobalSessionId25 !=null){
							aTCGlobalSessionId25=escape(aTCGlobalSessionId25);
						}			
		}catch(err){}

		setTimeout(function() {
			/*saveAgentInfo();				
			1.	 chatSessionId (primary)
			2.	agentSalesCode
			3.	timestamp
			4.	dotcom map data
			5.	dotcomsessionId
			6.	globalsessionId
			7.	referrer
			*/
	
			var aTCRef=escape(document.referrer);
			if(aTCRef !=null){
				aTCRef=aTCRef.substring(0,100);
			}
			var aDtURL=escape(top.location.href);
			if(aDtURL !=null){
				aDtURL=aDtURL.substring(0,100);
			}
			var ts = new Date().getTime();
			var chatData = {
				"chat-session-id" : session["chat-session-id"],
				"agent-Id" : agentId,
				"agent-sales-code" : session["agent-sales-code"],
				"global-session-id" : aTCGlobalSessionId,
				"global-session-id25" : aTCGlobalSessionId25,
				"LOG-TO-DB" : "TRUE",
				"lob" : "consumer",
				"chatCompensationFlow":"false",
				"ERROR" : tcchatLogError,
				"EVENT" : "INTERACTIVE_CHAT",
				"dotcomURL" : aDtURL,
				"referrer" : aTCRef
			};					
			try {
				//Yet to save into DB.
				var log = {
					"log-message" : chatData,
					"log-level" : "warn",
					"log-action" : "INTERACTIVE_CHAT",
					"LOG-TO-DB" : "true",
					"log-time-stamp" : new Date().getTime()
				};
				logDetails(log);				
			}			
			catch(e) {
			
			}			
		}, 200);
		
	}
	
	//it will be registered with on-load.
	function triggerTouchCommerce(timeInMillis) {
		setTimeout(function() {
			var data = null;
			var chatData = getChatData("JSON");
			if(null != chatData) {
				data = chatData["customer-data"];				
			}
			if(null == data) {
				//If the data is not available after 3 attempts within 2 sec, then call the init();
				if(2000 === timeInMillis) {
					init();
					return;
				}
				//Lets wait for few ms...ex: 0.5 sec, 1 sec and 2 sec.
				timeInMillis = timeInMillis + 500;				
				triggerTouchCommerce(timeInMillis);
				return;
			}
			init();			
		}, timeInMillis);
	}

	//0721
	function setTouchCommerceChatLibIfEnabled() {
		var hashText = location.hash;
		if(hashText.indexOf( "#enable-tcchat-dev-users") !=-1) {			
			return true;
		}
		try{
			var aCky= readTCCookieInfo("TC_CHAT_IN_PROGRESS");
			if(aCky  !=null && aCky == 'Y'){
				return true;
			}
		}catch(e){}
		return false;
	}
	
	var paramsMappingConfig = {	
		"aimsSessionId" : ["AIMSSessionID"], 
		"actCode" : ["ActCode"], 
		"BAN": ["BAN", "Customer_BAN", "CustomerBAN", "ban"], 
		"BTN": ["Customer_BTN", "tn", "altbtn", "btn", "tnl", "CustomerBTN"],
		"CAN" :["Customer_CAN", "AccountNumber", "accountNumber", "accountnumber", "billingcan", "CustomerCAN"],		
		"PCAN" : ["Customer_PCAN", "pcan", "CustomerPCAN"],
		"businessAddress" : ["Business_Address"],
		"businessName" : ["Business_Name"],
		"crr" : ["CRR"],
		"customerSavedOrder" : ["CUSTOMER_SAVED_ORDER"],
		"chatType" : ["ChatType"],
		"city" : ["City", "CITY"],
		"coupon" : ["Coupon"],
		"CustomerType" : ["CustomerType", "customerType", "custType", "customerType", "custype"],
		"address": ["Address", "Customer_ServiceAddress", "MOVE_CUST_ADDRESS", "AddressLine1", "Customer_BillingAddress", "CustomerBillingAddress"],
		"state" : ["Customer_State", "state", "vzstate", "STATE", "SPECIAL STATE"],
		"dotcomSessionId" : ["DOTCOM_SESSIONID", "DOTCOMSESSIONID", "dotcomsid"],
		"globalSessionId" : ["GlobalSessionID", "GlobalSessionId", "globalsessionid", "globalSessionID", "GlobalSessionid"],
		"email" : ["email", "Email", "CustomerEmail", "E-mail"],
		"fiosReady": ["FiOSReady", "FiOS Ready", "fiosReady", "fiosready"],
		"fiosSelfInstall": ["FiOSSelfInstall", "selfinstall", "fiosSelfInstall", "FiOS Self install"],
		"guiSessionId": ["GUI_SESSION_ID", "GUISessionId", "GUI_SESSION_ID", "GuiSessionId", "guisessionid"],
		"isTablet": ["isTablet", "IsTablet"],
		"lob": ["lob", "LOB", "lobl", "lobType"],
		"mon": ["mon", "MON", "MasterOrderNumber", "Master_Order_Number", "ORDER_NUMBER"],
		"name": ["name", "Name", "CustName", "custname", "customerName"],
		"other": ["other", "OTHER"],
		"quantumEligible": ["quantumEligible", "QuantumEligible", "Quantum Eligible", "quantumeligible", "quantumEligible"],
		"questionCategory": ["questCategory", "QuestionCategory", "Category", "FromCenter",	"WorkGroup", "QuestionType", "SupportCategory"],
		"question": ["question", "Question"], 
		"questionCatId": ["questionCatId", "QuestionCategoryId", "questCategoryId"],
		"quet": ["Quet"],
		"quetCatId": ["QuetCatId"],
		"quetCategory": ["QuetCategory"],
		"quetSubCategory": ["QuetSubCategory"],
		"queueId": ["QueueId", "queueId", "Queueid", "queueid"],
		"rbiIndicatory" : ["RBI_Indicator"],
		"salesIndicator": ["salesIndicator"],
		"siDescription": ["SI_Description", "SI_description"],
		"siIssue": ["SI_Issue"],
		"siEligible": ["SI_eligible", "Selfinstall", "selfInstall"],
		"sourcePage": ["Source_PAGE", "SourcePage", "Source_Page", "SOURCE_PAGE", "sourcePage", "sourcepage", "Source Page"],
		"specialState": ["SPECIAL_STATE", "Special_State"],
		"subCategory": ["SUBCATEGORY"],
		"searchTerm": ["SearchTerm"],
		"techScheduled": ["TechScheduled"],
		"userId": ["UserId", "userid"],
		"vodIndicator": ["VOD_Indicator"],
		"verbage": ["Verbage"],
		"visionAccountId": ["VisionAccountId", "visionAccountId", "visionaccountid", "visionaccid"], 
		"visionCustomerId": ["visioncustomerid", "VisioncustomerId", "VisionCustomerID", "VisionCustomerId", "visioncustid"],
		"VISIONID": ["VISIONID", "VisionID", "visionId"],
		"zipCode": ["ZIP_CODE", "ZipCode", "Zipcode", "zipcode", "zip"],
		"addressId": ["addressid", "AddressID", "addressId"],
		"aimsFlow": ["aimsFlow"],
		"aimsUrl": ["aimsUrl"],
		"appId": ["AppID", "appId", "appid"],
		"contactUs": ["contactUs"],
		"contactUsRegistration": ["contactUsRegistration"],
		"customerVerificationFieldName": ["customerVerificationFieldName"],
		"customerVerificationFieldValue": ["customerVerificationFieldValue"],		
		"isMobile": ["isMobile", "isMobileFlow"],
		"lang": ["lang", "language"],
		"mobileGUISession": ["mobileGUISession"], 
		"productCode": ["productcode"],
		"section": ["section"],
		"service": ["service"],
		"FIOSINTERNET": ["FIOS INTERNET"],
		"FiOS": ["FIOS"],
		"FiOSTV": ["FIOSTV", "FIOS TV"],
		"street": ["st"],
		"channel": ["ChName"],
		"applicableServices": ["applicable_services", "APPLICABLE_SEVICES"],
		"loginFlag": ["LoginFlag", "Login_Flag", "LOGIN_FLAG"],
		"CRV_Number": ["CRV_Number", "CRV_NUMBER"],
        "EXISTING_SERVICES": ["EXISTING_SEVICES", "existing_sevices"], 
		"videocktId": ["videocktid", "VideocktId"]		
        
	}

	var tcParamsMap = (function(config) {
		var paramsMap = {};
		try {
			if(null == config) {
				return paramsMap;
			}			
			for(var configKey in config) {
				var configArr = config[configKey];
				if(null != configArr && configArr.length > 0) {
					var arraySize = configArr.length;
					for(var idx=0; idx < arraySize ; idx++) {
						paramsMap[configArr[idx]] = configKey;
					}
				}
			}
		}
		catch(e) {
		
		}
		return paramsMap;
	})(paramsMappingConfig)
	
	function getTCParamName(paramName) {		
		var tcParamName = "";
		if(typeof tcParamsMap == "undefined" || null == tcParamsMap) {
			tcParamName = paramName;
		}else{		
			tcParamName = tcParamsMap[paramName];
		}
		if(null == tcParamName) {
			tcParamName = paramName;
		}					
		return tcParamName;
	}

	//logger.
	var makeOneWayRequest = function(url) {
		var img  = new Image();
		img.src = url;			
	};
	
	function logDetails(log) {
		try {
			var logString = JSON.stringify(log);
			var url = getHost() + clientLogServletPath + clientLogServletName + "?log="+logString; 
			makeOneWayRequest(url);
		}			
		catch(e) {	}
	}
	
	//evts
	/*
	If the caller interested to consume chat events, they can
	override the events and make use of it.
	*/
	var chatEventListeners = {
		onChatLaunched : function(evt) {},
		onChatClosed: function(evt) {},		
		onAgentAssigned: function(evt) {}
	};	
	
	//0727.
	function initializeJQuery(){
		$ = window.jQuery.noConflict(true);
	}	
	function loadJQueryIfNotAvailable(){
		if (window.jQuery === undefined) {
			var scriptSourceHostJQ = getHost();
			var scriptNameJQ = jqLibName;
			var scriptPathJQ = scriptSourceHostJQ + jqLibPath + scriptNameJQ;
			
			
			
		    var jqScriptTag = document.createElement('script');
		    jqScriptTag.setAttribute("type","text/javascript");

		    jqScriptTag.setAttribute("src", scriptPathJQ);
		    if (jqScriptTag.readyState) {
		    	jqScriptTag.onreadystatechange = function () { // For old versions of IE
		          if (this.readyState == 'complete' || this.readyState == 'loaded') {
		        	  initializeJQuery();
		          }
		      };
		    } else { // Other browsers
		    	jqScriptTag.onload = function(){
		    	  initializeJQuery();
		      };
		    }
		    // Try to find the head, otherwise default to the documentElement
		    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(jqScriptTag);
		}
	}
	
	//loadJQueryIfNotAvailable();
	//ends here...
	
	//initializeChatLib();
	
	/*String.prototype.trim = function() {
		alert(this);
		var value = this.replace(/(^\s+)/g, "");
		value = value.replace(/(\s+$)/g, "");
		return value;
	}*/
	//http://sit-chat.ebiz.verizon.com/chat/chatlib/Chat.js 
	
	(function loadTouchCommerceChatLib() {
	
		//0721
		//If AIMS Chat is enabled, dont load the TC Script.
		var runtimeChatLibInfo = 1;
	//runtimeChatLib=0;
	var GsamAct=	readTCCookieInfo('vfyh');
	//alert(readTCCookieInfo("TC_CHAT_IN_PROGRESS"));
	if(GsamAct !=null && (GsamAct=='8' || GsamAct=='8usa'  ||  GsamAct=='8USA'   || (GsamAct.indexOf('gsl=8') != -1))){
		var aCky= readTCCookieInfo("TC_CHAT_IN_PROGRESS");
			if(aCky  ==null  || aCky == '' || aCky == 'N'){
				return;
			}
	 }
		//ends here...
	
		var scriptSourceHostTC = getHostTC(getHost());
		var scriptNameTC = jsLibNameTC;
		var scriptPathTC = scriptSourceHostTC + jsLibPathTC + scriptNameTC;
		var chatLibScriptTagTC = document.createElement('script');
		chatLibScriptTagTC.setAttribute("type", "text/javascript");
		chatLibScriptTagTC.setAttribute("src", scriptPathTC);
		if (chatLibScriptTagTC.readyState) {
			chatLibScriptTagTC.onreadystatechange = function () { 
			if (this.readyState == 'complete' || this.readyState == 'loaded') {
				//alert("TC script loaded successfully");
				//load chat library (bridge).
				//initializeChatLib();
			}
		  };
		} 
		else { 
		  chatLibScriptTagTC.onload = function(){
			//alert("TC script loaded successfully");
			//load chat library (bridge).
			//initializeChatLib();			
		  };
		}
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(chatLibScriptTagTC);	
		var aCky= readTCCookieInfo("TC_CHAT_IN_PROGRESS");
			if(aCky  !=null && aCky == 'Y'){
				stopTCSSOTimerRefresh();
			}else{
				startTCSSOTimer();
			}
			
			try{
				captureCustJourney();				
			}catch(e){}
	})();

	function getHostTC(hostInfo) {
		var hostTC = tcHostConfig["PROD"];
		if(null == hostInfo) {
			//returning the Prod Url of TC Lib.
			return hostTC; 
		}
		switch(hostInfo) {
			case chatHostConfig["SIT"]:
				hostTC = tcHostConfig["NON-PROD"];
				break;
				
			case chatHostConfig["STG"]:
				hostTC = tcHostConfig["NON-PROD"];
				break;
				
			case chatHostConfig["PROD"]:
				hostTC = tcHostConfig["PROD"];
				break;
		
			default:
				hostTC = tcHostConfig["PROD"];
		}
		return hostTC;		
	}
	
	function getDotComHostTC(hostInfo) {
		var hostTC = dotComHostConfig["PROD"];
		if(null == hostInfo) {
			//returning the Prod Url of TC Lib.
			return hostTC; 
		}
		switch(hostInfo) {
			case chatHostConfig["SIT"]:
				hostTC = dotComHostConfig["SIT"];
				break;
				
			case chatHostConfig["STG"]:
				hostTC = dotComHostConfig["STG"];
				break;
				
			case chatHostConfig["PROD"]:
				hostTC = dotComHostConfig["PROD"];
				break;
		
			default:
				hostTC = dotComHostConfig["PROD"];
		}
		return hostTC;		
	}
	
	function initializeChatLib() {
		var scriptSourceHost = getHost();
		var scriptName = jsLibName;
		var scriptPath = scriptSourceHost + jsLibPath + scriptName;
	    var chatLibScriptTag = document.createElement('script');
	    chatLibScriptTag.setAttribute("type", "text/javascript");
	    chatLibScriptTag.setAttribute("src", scriptPath);
	    if (chatLibScriptTag.readyState) {
			chatLibScriptTag.onreadystatechange = function () { 
	        if (this.readyState == 'complete' || this.readyState == 'loaded') {
				chatLib = window.tcChatLib;
				//alert("Chat Library script loaded successfully");
				firePendingCalls();
			}
	      };
	    } 
		else { 
	      chatLibScriptTag.onload = function(){
	    	  chatLib = window.tcChatLib;
			  //alert("Chat Library script loaded successfully");
			  firePendingCalls();
	      };
	    }
	    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(chatLibScriptTag);
		
	};
	
	(function() {
		if (window.addEventListener) {
			window.addEventListener('load', triggerTouchCommerce, false); 
			//0721
			window.addEventListener('hashchange', setTouchCommerceChatLibIfEnabled, false);			
		} 
		else if (window.attachEvent) {
			window.attachEvent('onload', triggerTouchCommerce);
			//0721
			window.attachEvent('onhashchange', setTouchCommerceChatLibIfEnabled);			
		}
	})();
/*********************************************************************/
/*						ends here...								 */	
/*********************************************************************/
