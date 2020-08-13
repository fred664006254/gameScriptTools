/**
 * 私聊
 * author qianjun
 */
class PriChatView extends CommonView
{
   
	public constructor() 
	{
		super();
    }

    private _inputTextField:BaseTextField;
    // 滑动列表
	private _scrollList:ScrollList;
    private _openTime : number = 0;
	protected initView():void
	{
		let view = this;
		view._openTime = GameData.serverTime;
		let data = view.param.data;

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SENDMSG), view.sendMsgCallBack, view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, view.refreshChat, view);
		let chatList = Api.chatVoApi.getPriChatList(data.sender);

		let hh = 60;

		let bottomBg0 = BaseBitmap.create("public_9v_bg02");
		bottomBg0.width = GameConfig.stageWidth;
		bottomBg0.height = GameConfig.stageHeigth - this.container.y -hh;
		bottomBg0.x = 0;
		bottomBg0.y = -15;
		this.addChildToContainer(bottomBg0);

		let bottomBg2 = BaseBitmap.create("adult_lowbg");
		bottomBg2.x =GameConfig.stageWidth/2 - bottomBg2.width/2;
		this.addChildToContainer(bottomBg2);

		let lisetBg = BaseBitmap.create("public_9v_bg03");
		lisetBg.width = GameConfig.stageWidth;
		lisetBg.height = GameConfig.stageHeigth - this.container.y + 15-hh;
		lisetBg.x = 0;
		lisetBg.y = -15;
		

		bottomBg2.y = lisetBg.y + lisetBg.height  -bottomBg2.height- 10;
        
        let maskBg:BaseBitmap = BaseBitmap.create("char_cross_hornbg");
		maskBg.width = lisetBg.width-14;
		maskBg.height = 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskBg, lisetBg);
        view.addChildToContainer(maskBg);
		this.addChildToContainer(lisetBg);

        let nameTxt = ComponentManager.getTextField(data.sendername, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, maskBg);
        view.addChildToContainer(nameTxt);
 
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 30,GameConfig.stageHeigth - 210-hh);
		this._scrollList = ComponentManager.getScrollList(ChatScrollItem,chatList,rect);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
		this._scrollList.y = maskBg.y + maskBg.height+10;
		this._scrollList.x = 15;
		this.addChildToContainer(this._scrollList);
		if(chatList.length > 0 ){
			this._scrollList.setScrollTopByIndex(chatList.length-1);
		}

		   //输入框
        
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_CONTENT_COMMON,393,46,"public_tc_srkbg05",LanguageManager.getlocal("chatMaxLength"),TextFieldConst.COLOR_WHITE);
		inputTF.x = 20;
		inputTF.y = bottomBg2.y + bottomBg2.height/2 - inputTF.height/2;
		this.addChildToContainer(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.maxChars = 40;
   
		let sendBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"chatViewSend",this.sentBtnClick,this);
		sendBtn.x = inputTF.x + inputTF.width + 15;
		sendBtn.y = bottomBg2.y + bottomBg2.height/2 - sendBtn.height/2;
		view._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
 
		view.addChildToContainer(sendBtn);
		if(Api.switchVoApi.checkVip1Privilege()){
			if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel&&Api.playerVoApi.getPlayerVipLevel()<1){
				App.DisplayUtil.changeToGray(sendBtn);
			}
		}
		else{
			if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel){
				App.DisplayUtil.changeToGray(sendBtn);
			}
		}

		let bottom: BaseBitmap = BaseBitmap.create("chatview_bottom");
		// bottom.height = 200;
		bottom.y = GameConfig.stageHeigth -  bottom.height;
        this.addChild(bottom);

		view.checkShowMoreTip();
    }
    
    protected getTitleStr():string{
        return 'chatViewTab3Title';
    }

	private refreshChatByScroll():void
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		if(isButtom)
		{
			this._openTime = GameData.serverTime;
			// let chatList = Api.chatVoApi.getPriChatList(this.param.sender);

			// this._scrollList.refreshData(chatList);
			// this._scrollList.moveToButtom();
			// let moreBtn:BaseButton=<BaseButton>this.getChildByName("moreBtn");
			// if(this._scrollList&&this._scrollList.checkIsAtButtom())
			// {
			// 	if(moreBtn)
			// 	{
			// 		moreBtn.visible=false;
			// 	}
			// }
		}
	}

	private sendMsgCallBack(evt : egret.Event):void{
		let view = this;
		if(evt.data.data.ret >= 0){
			Api.chatVoApi.setPriChatList(evt.data.data.data[0]);
		}
		// if(evt.data.data.data && evt.data.data.data[0] == 'Success'){
			
		// 	// NetManager.request(NetRequestConst.REQUEST_PRICHAT_GETMSG, {
		// 	// 	isall : 0
		// 	// });
		// }
	}
	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"servant_bottombg",
					"wifeview_bottombg","shield_cn",
					"chatview_arrow","chatview_bottom",
					"chatview_inputbg","char_cross_hornbg","chat_morebg","chatview_arrow","adult_lowbg",
					]);
	}

	private refreshChat()
	{ 
		let view = this;
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		let chatList = Api.chatVoApi.getPriChatList(this.param.data.sender);
		this._scrollList.refreshData(chatList);
		if(isButtom)
		{
			this._scrollList.moveToButtom();
			view._openTime = GameData.serverTime;
		}
		this.checkShowMoreTip();
	}

	private checkShowMoreTip():void
	{
		let moreBtn:BaseDisplayObjectContainer=<BaseDisplayObjectContainer>this.getChildByName("moreBtn");
		if(this._scrollList&&this._scrollList.checkIsAtButtom())
		{
			if(moreBtn)
			{
				moreBtn.visible=false;
			}
		}
		else
		{
			if(!moreBtn)
			{
				// let moreBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.scrollToButtom,this);
				
				let moreBtn = new BaseDisplayObjectContainer();
				moreBtn.width = 610;
				moreBtn.height = 40;
				moreBtn.name = "moreBtn";
				moreBtn.x = 640/2 - 610/2;
				// moreBtn.y = 575;  960 - 575   385
				moreBtn.y = GameConfig.stageHeigth - 250;
				moreBtn.addTouchTap(this.scrollToButtom,this);

				let moreBtnImg: BaseBitmap = BaseBitmap.create("chatview_morebg");
				
				moreBtn.addChild(moreBtnImg);

				let moreBtnText: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("chatHaveNewMsg"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
				moreBtnImg.width = moreBtnText.width + 60;
				moreBtnImg.x = GameConfig.stageWidth-moreBtnImg.width;
				
				moreBtnText.x = moreBtnImg.x + 40;
				moreBtnText.y = moreBtnImg.y + moreBtnImg.height / 2 - moreBtnText.height/2;
				moreBtn.addChild(moreBtnText);

				this.addChild(moreBtn);
			}
			else
			{
				moreBtn.visible=true;
			}
		}
	}


	private scrollToButtom():void
	{
		let view = this;
		view._scrollList.moveToButtom();
		view._openTime = GameData.serverTime;
		view.refreshChat();
	}

    private sentBtnClick()
    {
		if(Api.switchVoApi.checkOpenPrichatSendMsg()){//PlatformManager.checkIsTWBSp()
			App.CommonUtil.showTip(LanguageManager.getlocal("noChat"));
			return;
		}

		if(Api.switchVoApi.checkVip1Privilege())
		{
			let needVip = Api.vipVoApi.getNeedVip("reachLvelUnlock");
			if(needVip&&Api.playerVoApi.getPlayerLevel() < GameData.chatlevel&&Api.playerVoApi.getPlayerVipLevel()<needVip){
				App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc2",[Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel),needVip+""]));
				return;
			}

		}
		else{
			if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel){
				App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel)]));
				return;
			}

		}
		if(!this._inputTextField.bindData)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatInputTip"));
			return;
		}	
		 if(this._inputTextField.text.length <= 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatInputTip"));
			return;
		}	
		if(GameData.serverTime - Api.chatVoApi._lastTime < 5)
		{
			let times = String( Api.chatVoApi._lastTime - GameData.serverTime + 5);
			// Api.chatVoApi._lastTime = GameData.serverTime;
			App.CommonUtil.showTip(LanguageManager.getlocal("chatTimeTip",[times]));
			return;
		}

		Api.chatVoApi._lastTime = GameData.serverTime;

		if(Config.ShieldCfg.checkShield(this._inputTextField.text)==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
		if(App.StringUtil.checkChar(this._inputTextField.text))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
        let txtStr:string=this._inputTextField.text;
        let chatData:any = {};
        chatData.channel = Api.playerVoApi.getPlayerAllianceId();
        chatData.message = txtStr;

		this._inputTextField.text = "";
		let tlv:string = "";
		let ttitleid = Api.playerVoApi.getTitleid();
		let titleInfo2:TitleInfoVo = Api.itemVoApi.getTitleInfoVoById(Number(ttitleid));
		if(titleInfo2){
			let itemCfg = titleInfo2.itemCfg ;
			if( itemCfg && itemCfg.emperorLvUpNeed && itemCfg.emperorLvUpNeed.length > 0 ){
				tlv = ""+titleInfo2.lv;
			}
		}
		NetManager.request(NetRequestConst.REQUEST_PRICHAT_SENDMSG, {
			receiveuid : this.param.data.sender,
			content : txtStr,
			tlv:tlv,
		});
		// NetManager.requestChat(chatData);

    }
	public dispose():void
	{
        // this._inputTextField.removeEventListener();
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.refreshChat,this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.refreshChat,this);
		let view = this;
		if(Api.chatVoApi.getUnreadMsgNum(view.param.data.sender)){
			NetManager.request(NetRequestConst.REQUEST_PRICHAT_SETREAD, {
				receiveuid : view.param.data.sender 
			});
		}
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SENDMSG), view.sendMsgCallBack, view);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, view.refreshChat, view);
		super.dispose();
	}
}