class ServerListPopupView extends PopupView
{	
	private _tabIndex = -1;

	private _tabScrollList:ScrollList;
	private _serverScrollList:ScrollList;
	private _tabScrollItem:ServerListTabScrollItem;

	private _curServerList:any[];

	private _allServerList:any[][]=[];

	private _myScrollList:ScrollList;

	public constructor() 
	{
		super();
	}

	protected getBgName():string
	{
		return "serverlist_bg";
	}

	protected getShowHeight():number
	{
		return 740+(PlatformManager.getGameArea()?46:0);
	}
	protected getCloseBtnName():string
	{
		return "sharepopupview_closebtn";
	}

	protected preInit():void
	{
		let ths=this;
		this.getServerList((data:any)=>{
			super.preInit();
		},()=>{
			ths.preInit();
		},this,true);
	}

	private getServerList(successCallback:(data:any)=>void,failCallback:()=>void,thisObj:any,showLoading?:boolean):void
	{
		let ths=this;

		let reqData:any={t:"getserverlist",pid:LoginManager.getLocalUserName()};
		if(ServerCfg.checkServerDebug())
		{
			reqData.debug=1;
		}
		
		let version =PlatformManager.getAppVersion();
		let channel =PlatformManager.getAppid();
		if(version)
		 {
			reqData.version=version;
		}
		if(channel)
		{
			reqData.channel =channel; 
		}
		if(PlatformManager.checkIsIOSShenheSp())
		{
			reqData.isShenhe="1";
		}

		if (App.DeviceUtil.isAndroid()) {
			reqData.os = "android";
		} else if (App.DeviceUtil.isIOS()) {
			reqData.os = "ios";
		}
		if(PlatformManager.checkIsAreaPkg())
		{
			reqData.bigType=PlatformManager.getGameArea();
		}
		console.log("getCfg os", reqData.os);
		showLoading&&NetLoading.show();
		NetManager.http.get(ServerCfg.svrCfgUrl,reqData,(data:any)=>{
			showLoading&&NetLoading.hide();
			ServerCfg.myserver=data.myserver;
			ServerCfg.serverlist=data.serverlist;
			if(successCallback)
			{
				successCallback.call(thisObj,data);
			}
		},()=>{
			showLoading&&NetLoading.hide();
			if(failCallback)
			{
				failCallback.call(thisObj);
			}
		},this);
	}

	protected initView():void
	{
		let ths=this;
		let topBg:BaseBitmap = BaseBitmap.create("serverlist_topbg");
		topBg.width = 535;
		topBg.height=140;
		topBg.x = this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
		// topBg.y = 20;
		this.addChildToContainer(topBg);

		let lineSp=BaseBitmap.create("public_line3");
		this.addChildToContainer(lineSp);
		
		let lastLoginTF = ComponentManager.getTextField(LanguageManager.getlocal("serverListLastLogin"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		lastLoginTF.x = topBg.x + topBg.width/2 - lastLoginTF.width/2;
		lastLoginTF.y = topBg.y + 15;
		this.addChildToContainer(lastLoginTF);
		
		lineSp.width=lastLoginTF.width+280;
		lineSp.setPosition(lastLoginTF.x+(lastLoginTF.width-lineSp.width)/2,lastLoginTF.y+(lastLoginTF.height-lineSp.height)/2);


		// let myBg = BaseBitmap.create("public_9_bg4");
		// myBg.width = 518;
		// myBg.height = 140;
		// myBg.x = this.viewBg.x + this.viewBg.width/2 - myBg.width/2;
		// myBg.y = 75;
		// this.addChildToContainer(myBg);

		let rect = egret.Rectangle.create();
		let myserverList = ServerCfg.myserver;

		rect.setTo(0,0,434,topBg.height - lastLoginTF.y-lastLoginTF.height-20);
		let myScrollList = ComponentManager.getScrollList(ServerListMyScrollItem,myserverList,rect);
		this._myScrollList=myScrollList;
		this.addChildToContainer(myScrollList);
		myScrollList.x = topBg.x + topBg.width/2 - myScrollList.width/2;
		myScrollList.y = lastLoginTF.y + lastLoginTF.height+5;

		myScrollList.addTouchTap(this.clickItemHandler3, this);

		let topX=topBg.x;
		let topY=topBg.y+10+topBg.height;
		let areaData=GameConfig.getAreaTab();
		if(PlatformManager.getGameArea())
		{
			topY=topBg.y+5+topBg.height;
			
			let areaTab = ComponentManager.getTabBarGroup(this.getTabbarName(),areaData.tab,(data:{index:number})=>{
				App.LogUtil.log("index: " + data.index);
				if(App.DeviceUtil.isRuntime2())
				{
					let areaid=GameConfig.getSubAppIdByArea(areaData.area[data.index]);
					PlatformManager.switchAreaOrLanguage(areaid,PlatformManager.getGameLanguage());
					GameData.curBigType=areaid;
					ths.refreshListData();
				}
				else
				{
					ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
						msg: LanguageManager.getlocal("switchAreaTip"), title: "itemUseConstPopupViewTitle", needCancel: true, handler: this, callback: () => {
							let areaid=GameConfig.getSubAppIdByArea(areaData.area[data.index]);
							PlatformManager.switchAreaOrLanguage(areaid,PlatformManager.getGameLanguage());
							if(App.DeviceUtil.isRuntime2())
							{
								GameData.curBigType=areaid;
								ths.refreshListData();
							}
						}, cancelcallback: () => {
							areaTab.revertSelected();
						}
					});
				}
			},this);
			areaTab.setPosition(topX,topY);
			this.addChildToContainer(areaTab);
			topY=topY+areaTab.height;
		}
		
		let bottomBg = BaseBitmap.create("public_9_managebg");
		bottomBg.width = topBg.width;
		bottomBg.height = 460;
		bottomBg.x = topX;
		bottomBg.y = topY;
		this.addChildToContainer(bottomBg);
		
		
		let lineSp2:BaseBitmap = BaseBitmap.create("public_line3");
		this.addChildToContainer(lineSp2);

		let listTF = ComponentManager.getTextField(LanguageManager.getlocal("serverList"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		listTF.x = bottomBg.x + bottomBg.width/2 - listTF.width/2;
		listTF.y = bottomBg.y+15;
		this.addChildToContainer(listTF);

		lineSp2.width=listTF.width+280;
		lineSp2.setPosition(listTF.x+(listTF.width-lineSp2.width)/2,listTF.y+(listTF.height-lineSp2.height)/2);
		
		let rect2 = egret.Rectangle.create();
		// let test = ServerCfg.serverlist;
		// ServerCfg.serverlist = [
			// {"sname":"30服","zid":"1","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
			// {"sname":"29服","zid":"4","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
			// {"sname":"28服","zid":"2","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
			// {"sname":"27服","zid":"3","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
			// {"sname":"26服","zid":"5","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
			// {"sname":"25服","zid":"6","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
			// {"sname":"24服","zid":"7","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"23服","zid":"8","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"22服","zid":"9","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"21服","zid":"10","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"20服","zid":"11","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"19服","zid":"12","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"18服","zid":"13","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"17服","zid":"14","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"16服","zid":"15","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"15服","zid":"16","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"14服","zid":"17","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"13服","zid":"18","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"12服","zid":"19","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"11服","zid":"20","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"10服","zid":"21","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"9服","zid":"22","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"8服","zid":"23","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"7服","zid":"24","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"6服","zid":"25","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"5服","zid":"26","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"4服","zid":"27","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"3服","zid":"28","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"2服","zid":"29","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
		// 	{"sname":"1服","zid":"30","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
			
			
		// ]

		let leftBg:BaseBitmap=BaseBitmap.create("serverlist_leftbg");
		leftBg.width=156;
		leftBg.height=405;
		this.addChildToContainer(leftBg);
		leftBg.setPosition(bottomBg.x+10,listTF.y+listTF.height+10);

		let test = ServerCfg.serverlist;
		let tabList = this.getTabList(test);
		rect2.setTo(0,0,152,leftBg.height - 10);
		this._tabScrollList = ComponentManager.getScrollList(ServerListTabScrollItem,tabList,rect2);
		this.addChildToContainer(this._tabScrollList);
		this._tabScrollList.x = leftBg.x + (leftBg.width-this._tabScrollList.width)/2;
		this._tabScrollList.y = leftBg.y + 5;
		this._tabScrollList.addTouchTap(this.clickItemHandler, this);

		this.setSelect(0);

		let rect3 = egret.Rectangle.create();
		let serverList = this.getServerListByIndex(0);
		rect3.setTo(0,0,353,leftBg.height+5);
		this._serverScrollList = ComponentManager.getScrollList(ServerListServerScrollItem,serverList,rect3);
		this.addChildToContainer(this._serverScrollList);

		this._serverScrollList.x = leftBg.x+leftBg.width+6;
		this._serverScrollList.y = leftBg.y;
		this._serverScrollList.addTouchTap(this.clickItemHandler2, this);

	}

	private refreshListData():void
	{
		this.getServerList(()=>{
			if(this._myScrollList)
			{
				this._myScrollList.refreshData(ServerCfg.myserver);
			}
	
			if(this._tabScrollList)
			{
				let test = ServerCfg.serverlist;
				let tabList = this.getTabList(test,true);
				this._tabScrollList.refreshData(tabList);
				this.setSelect(0);
			}
	
			if(this._serverScrollList)
			{
				let serverList = this.getServerListByIndex(0);
				this._serverScrollList.refreshData(serverList);
			}
		},()=>{
			this.refreshListData();
		},this,true);
	}

	protected initContainer():void
	{
		super.initContainer();
		// this.container.y=this.viewBg.y+105;
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		if(this.titleTF)
		{
			this.titleTF.y=this.viewBg.y+66-this.titleTF.height/2;
			this.titleTF.textColor=TextFieldConst.COLOR_LIGHT_YELLOW;
		}
		
		this.container.y=this.viewBg.y+103;
		this.closeBtn.x =this.viewBg.x +this.viewBg.width-32-this.closeBtn.width/2;
        this.closeBtn.y = this.viewBg.y+27;
        this._hudieClip.x = this.closeBtn.x-45;
        this._hudieClip.y = this.closeBtn.y-45; 		
	}
	private clickItemHandler(event: egret.TouchEvent): void {
		let index: number = Number(event.data);
		
		this.setSelect(index);
		let serverList = this.getServerListByIndex(index);
		this._serverScrollList.setScrollTop(0);
		this._serverScrollList.refreshData(serverList);
	}

	private clickItemHandler2(event: egret.TouchEvent): void {
		let index: number = Number(event.data);
		
		this.setSelectServer(this._curServerList[index]);
		
		this.hide();
	}

	private clickItemHandler3(event: egret.TouchEvent): void {
		let index: number = Number(event.data);
		
		// this.setSelect(index);
		let myserverList = ServerCfg.myserver;
		this.setSelectServer(myserverList[index]);
		this.hide();
	}

	private setSelectServer(serverData:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,old_zid:string,flag?:number}):boolean
	{
		let result:boolean=false;
		if(serverData)
		{
			result=ServerCfg.setSelectServer(serverData.old_zid?serverData.old_zid:serverData.zid);
			ServerCfg.lastServer = serverData;
		}
		return result;
	}

	private getTabList(data:any[],opera?:boolean):any[]
	{
		// let tabList: Array<number> = new Array();
		// let tabNum = Math.ceil(data.length/10);
		// for (var index = tabNum; index > 0; index--) {

		// 	tabList.push(index);
		// }

		if(opera)
		{
			if(ServerCfg.myserver&&ServerCfg.myserver.length>0)
			{
				let result = this.setSelectServer(ServerCfg.myserver[0]);
				opera=(!result);
			}
		}
		this._allServerList.length=0;
		data.sort((a,b)=>{
			let bzid=b.old_zid?Number(b.old_zid):Number(b.zid);
			let azid=a.old_zid?Number(a.old_zid):Number(a.zid);
			return bzid-azid;
		})
		let list:string[]=[];
		let i:number=0;
		let l:number=data.length;
		let pageIndex:number=0;
		let startIndex:number=-1;
		for(i;i<l;i++)
		{
			if(opera&&data[i].flag==1)
			{
				this.setSelectServer(data[i]);
			}
			let czid:number=data[i].old_zid?Number(data[i].old_zid):Number(data[i].zid);
			if(i==0)
			{
				if(czid%10==0)
				{
					startIndex=czid;
				}
				else
				{
					startIndex=Math.ceil(czid/10)*10;
				}
				if(this._allServerList[pageIndex]==null)
				{
					this._allServerList[pageIndex]=[data[i]];
				}
				if(i==l-1)
				{
					if(PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()){
						list.push(LanguageManager.getlocal("serverListServer")+String(startIndex-9)+"-"+startIndex);
					} else {
						list.push(String(startIndex-9)+"-"+startIndex+LanguageManager.getlocal("serverListServer"));
					}
					
				}
			}
			else
			{
				if(czid<=(startIndex-10))
				{
					if(PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()){
						list.push(LanguageManager.getlocal("serverListServer") + String(startIndex-9)+"-"+startIndex);
					} else {
						list.push(String(startIndex-9)+"-"+startIndex+LanguageManager.getlocal("serverListServer"));
					}
					
					if(czid%10==0)
					{
						startIndex=czid;
					}
					else
					{
						startIndex=Math.ceil(czid/10)*10;
					}
					pageIndex++;
					if(this._allServerList[pageIndex]==null)
					{
						this._allServerList[pageIndex]=[data[i]];
					}
					if(i==l-1)
					{
						if(PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()){
							list.push(LanguageManager.getlocal("serverListServer") + String(startIndex-9)+"-"+startIndex);
						} else {
							list.push(String(startIndex-9)+"-"+startIndex+LanguageManager.getlocal("serverListServer"));
						}
						
					}
				}
				else if(i==l-1)
				{
					if(PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()){
						list.push(LanguageManager.getlocal("serverListServer") + String(startIndex-9)+"-"+startIndex);
					} else {
						list.push(String(startIndex-9)+"-"+startIndex+LanguageManager.getlocal("serverListServer"));
					}
					
					if(this._allServerList[pageIndex])
					{
						this._allServerList[pageIndex].push(data[i]);
					}
				}
				else
				{
					if(this._allServerList[pageIndex])
					{
						this._allServerList[pageIndex].push(data[i]);
					}
				}
			}
		}

		return list;
	}
	private getServerListByIndex(tabIndex):any[]
	{
		this._curServerList = this._allServerList[tabIndex];
		return this._curServerList;
		// let test = ServerCfg.serverlist;

		// // tabIndex = Math.ceil(test.length/10) - tabIndex -1;
		// let aNum = test.length%10;
		// if(test.length>0&&aNum==0)
		// {
		// 	aNum=10;
		// }
		// let startNum:number=tabIndex*10;
		// let endNum:number=tabIndex*10+aNum+10-aNum;

		// if(tabIndex==0)
		// {
		// 	startNum=tabIndex*10;
		// 	endNum=startNum+aNum;
		// }
		// else
		// {
		// 	startNum=tabIndex*10-10+aNum;
		// 	endNum=tabIndex*10+aNum;
		// }
		// endNum=Math.min(test.length,endNum);
		// if(endNum == 0){
		// 	endNum = 10;
		// }
		// let serverList: Array<any> = new Array();

		// for(startNum;startNum<endNum;startNum++)
		// {
		// 	serverList.push(test[startNum]);
		// }
		

		// this._curServerList = serverList;
		// return serverList;
	}
	//刷新选中状态
	private setSelect(tabIndex)
	{
		// let curTabIndex = this._tabIndex;
		if(this._tabIndex == tabIndex)
		{
			return;
		}
		this._tabIndex = tabIndex;
		if(this._tabScrollItem)
		{
			if(this._tabScrollItem.getChildByName("itemBg"))
			{

				let baseBitmap = <BaseBitmap>this._tabScrollItem.getChildByName("itemBg");
				baseBitmap.texture = ResourceManager.getRes("btn_normal_yellow_down");
				var colorMatrix = [
					1,0,0,0,7,
					0,1,0,0,21,
					0,0,1,0,48,
					0,0,0,1,0
				];
				var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
				baseBitmap.filters = [colorFlilter];
				
			}
		}
		this._tabScrollItem =  <ServerListTabScrollItem>this._tabScrollList.getItemByIndex(tabIndex);
		let baseBitmap:BaseBitmap = <BaseBitmap>this._tabScrollItem.getChildByName("itemBg")
		baseBitmap.texture = ResourceManager.getRes("btn_normal_yellow");
		baseBitmap.filters=null;

	}
	protected getResourceList():string[]
	{
		let resArr=[
			"public_9_bg3","public_9_bg4",
			"public_9_probiginnerbg"
		];
		if(PlatformManager.getGameArea())
		{
			resArr.push(ButtonConst.BTN_TAB);
		}
		return super.getResourceList().concat(resArr);
	}

	public dispose():void
	{
		this._tabIndex = -1;

		this._tabScrollList = null;
		this._serverScrollList = null;
		this._tabScrollItem = null;
		this._allServerList.length=0;
		this._myScrollList=null;


		super.dispose();
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CLOSE_SEVERLISTPOPUPVIEW);
	}
}