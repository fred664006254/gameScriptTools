/**
 * 聊天
 * author dky
 * date 2017/10/25
 * @class ChatView
 */
class ChatView extends CommonView
{	
	//私聊小红点
	private _public_dot3 : BaseBitmap = null;
	private _unreadNum : BaseTextField = null;
	private _prichatbottom : BaseBitmap = null;
	//小红点
	// private _lastTime:number[] = [];
	// private _redDot: BaseBitmap[] = [];

	public constructor() 
	{
		super();
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	public initView():void
	{
		// NetManager.chat.checkAndReConnect();


		let bottom: BaseBitmap = BaseBitmap.create("chatview_bottom");

		bottom.height = 200;
		
		bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
		this.addChildToContainer(bottom);
		
		let pribottom = BaseBitmap.create('prichatview_bottom');
		this.setLayoutPosition(LayoutConst.horizontalCentertop, pribottom, bottom, [0,24]);
		this.addChildToContainer(pribottom);
		this._prichatbottom = pribottom;

		let lisetBg = BaseBitmap.create("servant_bottombg");
		lisetBg.width = GameConfig.stageWidth+14;
		lisetBg.height = GameConfig.stageHeigth - 250;
		lisetBg.x = -7;
		lisetBg.y = -70;
		this.addChildToContainer(lisetBg);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.fresh_red,this);
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.resetReddot,this);
		//红点4
		if(this.getTabbarTextArr().length >= 4){
			let public_dot3 = BaseBitmap.create("public_dot2");
			this.tabbarGroup.addChild(public_dot3);
			// public_dot3.scaleX = public_dot3.scaleY = 1.5;
			if (Api.switchVoApi.openCrossChat())
			{
				public_dot3.x = GameConfig.stageWidth - 61;
			}
			else
			{
				public_dot3.x = GameConfig.stageWidth - 181;
			}
			
			public_dot3.y = -3; 
			public_dot3.visible = false;
			this._public_dot3 = public_dot3; 
			public_dot3.name = "reddot";
			this.fresh_red();
		}
		// for (let i:number = 0;i<3;i++)
		// {	
		// 	let t:string = LocalStorageManager.get(LocalStorageConst.LOCAL_CHAT_LASTTIME+Api.playerVoApi.getPlayerID()+"_chat"+i);
		// 	if(!t || t == "")
		// 	{
		// 		this._lastTime.push(0);
		// 	}
		// 	else
		// 	{
		// 		this._lastTime.push(Number(t));
		// 	}

		// 	let public_dot3 = BaseBitmap.create("public_dot2");
		// 	this.tabbarGroup.addChild(public_dot3);
		// 	public_dot3.x = this.tabbarGroup.getTabBar(i).x+90;
		// 	public_dot3.y = 10; 

		// 	this._redDot.push(public_dot3);
		// }
		// this.resetReddot();
	}

	// private resetReddot():void
	// {
	// 	for (let i:number = 0;i<3;i++)
	// 	{
	// 		if (i == this.tabbarGroup.selectedIndex)
	// 		{
	// 			this._redDot[i].visible = false;
	// 			if (GameData.serverTime > this._lastTime[i])
	// 			{
	// 				this._lastTime[i] = GameData.serverTime;
	// 			}
	// 		}
	// 		else
	// 		{
	// 			let lastTime:number = Api.chatVoApi.getLastTime(i);
	// 			if (lastTime == -1)
	// 			{
	// 				this._redDot[i].visible = false;
	// 			}
	// 			else
	// 			{	
	// 				this._redDot[i].visible = (lastTime > this._lastTime[i]);
	// 			}
	// 		}
	// 	}
	// }



    public get tabHeight():number{
        let view = this;
        return view.tabViewData[0].height;
    } 

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"servant_bottombg",
					"wifeview_bottombg","shield_cn",
					"chatview_arrow","chatview_bottom",
					"commonview_tabbar_bg2",
					"chatview_inputbg","mainui_missionIcon1","prichatview_bottom","chatlaba","chat_share_bg","emoticon_btn"
					]);
	}


	protected getTabbarTextArr():Array<any>
	{
		let tab = [["chatViewTab1Title",0]];
		tab.push(["chatViewTabTitleShare",1]);
		if(!Api.switchVoApi.checkOpenShenhe())
		{
			tab.push(["chatViewTab2Title",2]);
			if(Api.switchVoApi.openCrossChat()){
				tab.push([`chatViewTab4Title`,3]);
			}
			tab.push(["chatViewTab3Title",4]);
		}
		return tab;
	}

	protected initTabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{	//btn_tab_small

			let tabbg = BaseBitmap.create("commonview_tabbar_bg2");
			tabbg.x = 0;
			
			this.addChild(tabbg);

			this.tabbarGroup = ComponentManager.getTabBarChatGroup(ButtonConst.BTN2_SMALL_TAB2,tabBarTextArr,this.clickTabbarHandler,this);
			this.addChild(this.tabbarGroup);
			 this.tabbarGroup.setSpace(0);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY()+14;
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			this.tabbarGroup.x = 45;
			this.tabbarGroup.y+=14;
			tabbg.y =this.tabbarGroup.y-10;
		}
	}

	// (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{	
		if(index == 2 && Api.playerVoApi.getPlayerAllianceId() == 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoAlliance") );
			return false;
		}
		return true;
	}

	private fresh_red():void{
         //第三页 红点
         if(this._public_dot3)
         {
			this._public_dot3.visible = Api.chatVoApi.isNewMsg(); //this._unreadNum.visible = 
			// this._unreadNum.text =  Api.chatVoApi.getUnreadMsgNum().toString();
			// this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._unreadNum,this._public_dot3);
         } 
	}

	protected clickTabbarHandler(data:any){
		if (data.index == 0 || data.index==2 || data.index== 3)
		{
			this._prichatbottom.alpha = 1;
		}
		else
		{
			this._prichatbottom.alpha = 0
		}
		App.LogUtil.log("clicktabbar hander:"+data.index);
		super.clickTabbarHandler(data);
		if(data.index != 3){
			let chatviewtab : any = this.tabViewData[3];
			if(chatviewtab){
				chatviewtab.closeTimer();
			}
		}
		// if(this._redDot[data.index]){
		// 	this._redDot[data.index].visible = false;
		// }
		
		// if (GameData.serverTime > this._lastTime[data.index])
		// {
		// 	this._lastTime[data.index] = GameData.serverTime;
		// }
	}

	private doDinnerGuide()
	{
		this.hide();
	}
	protected doQuickAlliance()
	{
		this.hide();
		App.CommonUtil.showTip(LanguageManager.getlocal("alliance_beKick"));
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.fresh_red,this);
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.resetReddot,this);
		this._public_dot3 = null;

		// this._redDot.length = 0;
		// for (let i:number = 0; i<3;i++)
		// {
		// 	LocalStorageManager.set(LocalStorageConst.LOCAL_CHAT_LASTTIME+Api.playerVoApi.getPlayerID()+"_chat"+i,String(this._lastTime[i]));
		// }
		// this._lastTime.length = 0;

		super.dispose();

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHAT_COME);
	}
}