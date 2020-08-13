class ServerListPopupView extends PopupView
{	
	private _tabIndex = -1;

	private _tabScrollList:ScrollList;
	private _serverScrollList:ScrollList;
	private _tabScrollItem:ServerListTabScrollItem;

	private _curServerList:any[];

	private _allServerList:any[][]=[];

	public constructor() 
	{
		super();
	}

	protected preInit():void
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

		NetManager.http.get(ServerCfg.svrCfgUrl,reqData,(data:any)=>{
			ServerCfg.myserver=data.myserver;
			ServerCfg.serverlist=data.serverlist;
			super.preInit();
		},()=>{
			ths.preInit();
		},this);
	}

	protected initView():void
	{
		
		// let titleBg:BaseBitmap = BaseBitmap.create("public_tc_bg02");
		// titleBg.width = 250;
		// titleBg.x = this.viewBg.x + this.viewBg.width/2 - titleBg.width/2;
		// titleBg.y = 20;
		// this.addChildToContainer(titleBg);
		
		//上次登录
		let myBg = BaseBitmap.create("load_1");
		myBg.width = 561;
		myBg.height = 205;
		myBg.x = this.viewBg.x + this.viewBg.width/2 - myBg.width/2;
		myBg.y = 120;
		this.addChildToContainer(myBg);


		let lastLoginTF = ComponentManager.getTextField(LanguageManager.getlocal("serverListLastLogin"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		lastLoginTF.x = this.viewBg.x + this.viewBg.width/2 - lastLoginTF.width/2;// 270;//titleBg.x + titleBg.width/2 - lastLoginTF.width/2;
		lastLoginTF.y = 140;//titleBg.y + titleBg.height/2 - lastLoginTF.height/2;
		this.addChildToContainer(lastLoginTF);

		let line1 = BaseBitmap.create("public_v_huawen01");
		line1.x = lastLoginTF.x - 20 - line1.width;//80;
		line1.y = lastLoginTF.y+1; //+ 30;
		this.addChildToContainer(line1);

		let line2 = BaseBitmap.create("public_v_huawen01");
		line2.scaleX = -1;
		line2.x = lastLoginTF.x + lastLoginTF.width + 20 + line2.width; //550;
		line2.y = line1.y;
		this.addChildToContainer(line2);


		let rect = egret.Rectangle.create();
		let myserverList = ServerCfg.myserver;

		rect.setTo(0,0,538,myBg.height - 30);
		let myScrollList = ComponentManager.getScrollList(ServerListMyScrollItem,myserverList,rect);
		this.addChildToContainer(myScrollList);
		myScrollList.x = myBg.x + myBg.width/2 - myScrollList.width/2;
		myScrollList.y = 170;//myBg.y + myBg.height/2 - myScrollList.height/2;
		myScrollList.addTouchTap(this.clickItemHandler3, this);


		// let titleBg2:BaseBitmap = BaseBitmap.create("public_tc_bg02");
		// titleBg2.width = 250;
		// titleBg2.x = this.viewBg.x + this.viewBg.width/2 - titleBg2.width/2;
		// titleBg2.y = myBg.y + myBg.height + 10;
		// this.addChildToContainer(titleBg2);

		let topX=myBg.x;
		let topY=myBg.y+40+myBg.height;
		let hopesIdArr=PlatformManager.all_ab_subs;
		let l=hopesIdArr.length;
		let curAppId=PlatformManager.getAppid();
		let ishopes=l>1;
		if(ishopes)
		{
			// topY=topY+30;
			let platNameArr:string[]=[];
			let defaultSelect=0;
			for (let index = 0; index < l; index++) 
			{
				const appId = hopesIdArr[index];
				platNameArr.push("platName_"+appId);
				if(appId==curAppId)
				{
					defaultSelect=index;
				}
			}
			// topY=myBg.y+5+myBg.height;
			let areaTab = ComponentManager.getTabBarGroup("btn_serverlist_tab",platNameArr,(data:{index:number})=>{
				let idx=data.index;
				App.LogUtil.log("index: " + idx,hopesIdArr[idx]);
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
					msg: LanguageManager.getlocal("switchAreaTip"), title: "itemUseConstPopupViewTitle", needCancel: true, handler: this, callback: () => {
						PlatformManager.setABTestFlag(hopesIdArr[idx]);
					}, cancelcallback: () => {
						areaTab.revertSelected();
					}
				});
			},this);
			areaTab.selectedIndex=defaultSelect;
			areaTab.setPosition(topX,topY);
			this.addChildToContainer(areaTab);
			topY=topY+areaTab.height;
		}
		
		let listTF = ComponentManager.getTextField(LanguageManager.getlocal("serverList"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		listTF.x = lastLoginTF.x;//titleBg2.x + titleBg2.width/2 - listTF.width/2;
		listTF.y = 337;//titleBg2.y + titleBg2.height/2 - listTF.height/2;
		this.addChildToContainer(listTF);

		let line12 = BaseBitmap.create("public_v_huawen01");
		line12.x = listTF.x - 20 - line12.width;
		line12.y = listTF.y+1; //+ 30;
		this.addChildToContainer(line12);

		let line22 = BaseBitmap.create("public_v_huawen01");
		line22.scaleX = -1;
		line22.x = listTF.x + listTF.width + 20 + line22.width;//550;
		line22.y = line12.y;
		this.addChildToContainer(line22);


		let bottomBg = BaseBitmap.create("load_2");
		bottomBg.width = 561;
		bottomBg.height = ishopes?521-30:521;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;

		bottomBg.y = topY;//370;
		this.addChildToContainer(bottomBg);

		

		// let lineBB = BaseBitmap.create("serverlist_line");
		// lineBB.x = 203;
		// lineBB.y = bottomBg.y + bottomBg.height/2 - lineBB.height/2;
		// this.addChildToContainer(lineBB);

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

		let serverBg = BaseBitmap.create("load_5"); 
		serverBg.x = 50;
		serverBg.y = bottomBg.y+10;//380;
		this.addChildToContainer(serverBg); 
		if(ishopes)
		{
			serverBg.scaleY=(serverBg.height-30)/serverBg.height;
		}

		let test = ServerCfg.serverlist;
		let tabList = this.getTabList(test);
		rect2.setTo(0,0,170,bottomBg.height - 20);
		this._tabScrollList = ComponentManager.getScrollList(ServerListTabScrollItem,tabList,rect2);
		this.addChildToContainer(this._tabScrollList);
		this._tabScrollList.x = serverBg.x //+ 10;
		this._tabScrollList.y = bottomBg.y + bottomBg.height/2 - this._tabScrollList.height/2;
		this._tabScrollList.addTouchTap(this.clickItemHandler, this);

		this.setSelect(0);
	
		
		let rect3 = egret.Rectangle.create();
		let serverList = this.getServerListByIndex(0);
		rect3.setTo(0,0,352,bottomBg.height - 25);
		this._serverScrollList = ComponentManager.getScrollList(ServerListServerScrollItem,serverList,rect3);
		this.addChildToContainer(this._serverScrollList);

		this._serverScrollList.x = 234;
		this._serverScrollList.y = bottomBg.y + bottomBg.height/2 - this._tabScrollList.height/2//+20;
		this._serverScrollList.addTouchTap(this.clickItemHandler2, this);

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
		
		// this.setSelect(index);
		if(this._curServerList[index].old_zid)
		{
			ServerCfg.setSelectServer(this._curServerList[index].old_zid);
		}
		else
		{
			ServerCfg.setSelectServer(this._curServerList[index].zid);
		}
		this.hide();
	}

	private clickItemHandler3(event: egret.TouchEvent): void {
		let index: number = Number(event.data);
		
		// this.setSelect(index);
		let myserverList = ServerCfg.myserver;
		let zid = myserverList[index].zid;
		if(myserverList[index].old_zid)
		{
			zid = myserverList[index].old_zid;
		}
		ServerCfg.setSelectServer(zid);
		this.hide();
	}

	private getTabList(data:any[]):any[]
	{
		// let tabList: Array<number> = new Array();
		// let tabNum = Math.ceil(data.length/10);
		// for (var index = tabNum; index > 0; index--) {

		// 	tabList.push(index);
		// }
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
		let serverTitle = LanguageManager.getlocal("serverListServer");
		if(PlatformManager.checkIsJPSp()||PlatformManager.checkIsViSp())
		{
			serverTitle = "";
		}
		for(i;i<l;i++)
		{
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
					list.push(String(startIndex-9)+"-"+startIndex+serverTitle);
				}
			}
			else
			{
				if(czid<=(startIndex-10))
				{
					list.push(String(startIndex-9)+"-"+startIndex+serverTitle);
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
						list.push(String(startIndex-9)+"-"+startIndex+serverTitle);
					}
				}
				else if(i==l-1)
				{
					list.push(String(startIndex-9)+"-"+startIndex+serverTitle);
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
				baseBitmap.texture = ResourceManager.getRes("btn_loginbg_down");
				
			}
		}
		this._tabScrollItem =  <ServerListTabScrollItem>this._tabScrollList.getItemByIndex(tabIndex);
		if(this._tabScrollItem)
		{
			let baseBitmap:BaseBitmap = <BaseBitmap>this._tabScrollItem.getChildByName("itemBg")
			baseBitmap.texture = ResourceManager.getRes("btn_loginbg");

		}
		
	}
	protected resetBgSize():void
	{
		this.viewBg.height = this.getShowHeight();
		this.viewBg.y = GameConfig.stageHeigth/2-this.viewBg.height/2;//40;
		this.closeBtn.y = 45;
		// this.titleTF.x = 258;
		this.titleTF.size =TextFieldConst.FONTSIZE_BUTTON_COMMON;
		this.titleTF.x = this.viewBg.x + this.viewBg.width/2 - this.titleTF.width/2;
		// this.setLayoutPosition(LayoutConst.horizontalCenter,this.titleTF,this.viewBg);
		this.titleTF.y = this.viewBg.y+30;
		if(Api.rookieVoApi.isGuiding||Api.rookieVoApi.isInGuiding)
		{
			this.hide();
			return;
		}
		
		
	}
	protected getShowHeight():number
	{
		if(PlatformManager.all_ab_subs.length>1)
		{
			return 908+46;
		}
		return 908;
	}
	protected getCloseBtnName():string
	{
		return "load_closebtn";
	}
	protected getBgName():string
	{
		return "load_bg";
	}

	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"serverlist_line","serverlist_usericon",
					"serverbtn_tab","serverbtn_tab_down","public_9_probiginnerbg", 
				 	"public_tc_srkbg05","public_tc_bg02","btn_loginbg","btn_loginbg_down","public_v_huawen01"
					]);
	}

	public dispose():void
	{
		this._tabIndex = -1;

		this._tabScrollList = null;
		this._serverScrollList = null;
		this._tabScrollItem = null;
		this._allServerList.length=0;


		super.dispose();
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CLOSE_SEVERLISTPOPUPVIEW);
	}
}