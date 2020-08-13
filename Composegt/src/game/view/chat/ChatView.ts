/**
 * 聊天
 * author dky
 * date 2017/10/25
 * @class ChatView
 */
class ChatView extends CommonView
{
	private _public_dot3 : BaseBitmap = null;
	private _unreadNum : BaseTextField = null;
	// private _prichatbottom : BaseBitmap = null;
	public constructor() 
	{
		super();
	}
	public initView():void
	{
		NetManager.chat.checkAndReConnect();

		PlatformManager.analytics37JPPoint("custom_social","open_chat",1);

		// let bottomBg0 = BaseBitmap.create("public_9v_bg02");
		// bottomBg0.width = GameConfig.stageWidth;
		// bottomBg0.height = GameConfig.stageHeigth - 300 + 100;
		// bottomBg0.x = 0;
		// bottomBg0.y = 115;
		// this.addChildToContainer(bottomBg0);

		// let bottomBg2 = BaseBitmap.create("adult_lowbg");
		// bottomBg2.x =GameConfig.stageWidth/2 - bottomBg2.width/2;
		
		// this.addChildToContainer(bottomBg2);

		// let lisetBg = BaseBitmap.create("public_9v_bg03");
		// lisetBg.width = GameConfig.stageWidth+14;
		// lisetBg.height = GameConfig.stageHeigth - 150;
		// lisetBg.x = -7;
		// lisetBg.y = -70;
		// this.addChildToContainer(lisetBg);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.fresh_red,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.fresh_red,this);

		// let bottom: BaseBitmap = BaseBitmap.create("chatview_bottom");
		// // bottom.height = 200;
		// bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
		
		// //  egret.setTimeout(()=>{
        //                this.addChildToContainer(bottom);
                    // },this,10);
		
		// let pribottom = BaseBitmap.create('prichatview_bottom');
		// this.setLayoutPosition(LayoutConst.horizontalCentertop, pribottom, bottom, [0,24]);
		// this.addChildToContainer(pribottom);
		// this._prichatbottom = pribottom;

		//红点3
		if(this.getTabbarTextArr().length >= 3){
			let public_dot3 = BaseBitmap.create("public_dot2");
			this.addChild(public_dot3); ;
			public_dot3.scaleX = public_dot3.scaleY = 1.5;
			// public_dot3.x = this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width-5;
			public_dot3.x = 430;
			public_dot3.y = this.tabbarGroup.y; 
			public_dot3.visible = false;
			this._public_dot3 = public_dot3; 

			let unreadTxt = ComponentManager.getTextField('', 17, TextFieldConst.COLOR_QUALITY_WHITE);
			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, unreadTxt, public_dot3);
			this.addChild(unreadTxt);
			this._unreadNum = unreadTxt;
			unreadTxt.visible = public_dot3.visible;
			this.fresh_red();
		}
	}

    public get tabHeight():number{
        let view = this;
        return view.tabViewData[0].height;
    } 

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"adult_lowbg","chatview_morebg",
					"wifeview_bottombg","shield_cn",
					"chat_share_bg_1","chat_share_bg_2","chat_share_bg_3",
					"itemicon1501", "itemicon1511","chatlaba","char_cross_hornbg","chatview_arrow","chat_morebg",
					"chatview_bottom",
					]);
	}


	protected getTabbarTextArr():Array<string>
	{
		let tab = ["chatViewTab1Title"];
		if(!Api.switchVoApi.checkOpenShenhe())
		{
			tab.push("chatViewTab2Title");
			tab.push("chatViewTab3Title");
			if(Api.switchVoApi.openCrossChat()){
				tab.push(`chatViewTab4Title`);
			}
		}
		return tab;
	}
	// (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{	
		if(index == 1 && Api.playerVoApi.getPlayerAllianceId() == 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoAlliance") );
			return false;
		}
		if(index == 2 && !Api.switchVoApi.openChatType3()){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatViewTab3_notopen2") );
			return false;
		}
		return true;
	}

	private fresh_red():void{
         //第三页 红点
         if(this._public_dot3)
         {
			this._unreadNum.visible = this._public_dot3.visible = Api.chatVoApi.isNewMsg();
			this._unreadNum.text =  Api.chatVoApi.getUnreadMsgNum().toString();
			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._unreadNum,this._public_dot3);
         }
		 let selTab = this.selectedTabIndex;
		 //帮会聊天
		 if(selTab != 1 &&  Api.chatVoApi.isShowRedForAllianeChat()  &&this.tabbarGroup){
			//  this.addRedPoint(1);
			 this.tabbarGroup.addRedPoint(1,null,false,-12,8);
		}else{
			this.removeRedPoint(1);
			Api.chatVoApi.isNewAlliMsg = false;
		}
	}

	protected clickTabbarHandler(data:any){
		// this._prichatbottom.alpha = data.index == 2 ? 1 : 0;
		super.clickTabbarHandler(data);
		if(data.index != 3){
			let chatviewtab : any = this.tabViewData[3];
			if(chatviewtab){
				chatviewtab.closeTimer();
			}
		}
		if(data.index == 1){
			Api.chatVoApi.isNewAlliMsg = false;
			this.removeRedPoint(1);
		}
	}

	// protected getRuleInfo():string
	// {
	// 	return "wife_description";
	// }
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
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.fresh_red,this);
		this._public_dot3 = null;
		super.dispose();
	}
}