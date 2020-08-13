class ChatViewTab4 extends CommonViewTab
{
    private _inputTextField:BaseTextField;
	// 滑动列表
	private _labanum : BaseTextField =null;
	private _scrollList:ScrollList = null;
	private _sendBtn : BaseButton = null;
	private _timer : egret.Timer = null;
	private isNew = false;

	public constructor() 
	{
		super();
        this.initView();
	}

	protected initView():void
	{
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);


		let hh = 60;
		let bottomBg0 = BaseBitmap.create("public_9v_bg02");
		bottomBg0.width = GameConfig.stageWidth;
		bottomBg0.height = GameConfig.stageHeigth - 300 + 100 - hh;
		bottomBg0.x = 0;
		bottomBg0.y = 0;
		this.addChild(bottomBg0);

		let bottomBg2 = BaseBitmap.create("adult_lowbg");
		bottomBg2.x =GameConfig.stageWidth/2 - bottomBg2.width/2;
		this.addChild(bottomBg2);

		  //下面属性背景
		let lababg = BaseBitmap.create("char_cross_hornbg");
		lababg.width = GameConfig.stageWidth;
		lababg.height = 46;
		lababg.x = 0;
		this.addChild(lababg);

		let lisetBg = BaseBitmap.create("public_9v_bg03");
		lisetBg.width = GameConfig.stageWidth;
		lisetBg.height = GameConfig.stageHeigth - 150 - hh;;
		lisetBg.x = 0;
		lisetBg.y = 0;
		this.addChild(lisetBg);
		bottomBg2.y = lisetBg.y + lisetBg.height  -bottomBg2.height- 10;
		lababg.y = bottomBg2.y - lababg.height;



      
		//let item = Config.ItemCfg.getItemCfgById(1651);
		let laba = BaseBitmap.create('public_chatnoticeicon');
		laba.setScale(0.75);
		laba.x = lababg.x + 20;
		laba.y = lababg.y + lababg.height/2 - laba.height/2 * 0.75;
		this.addChild(laba);

		let numDesc = ComponentManager.getTextField(LanguageManager.getlocal('chatviewlabanum'), 22, 0xC6A28C);
		this.setLayoutPosition(LayoutConst.leftverticalCenter, numDesc, laba, [laba.width* 0.75 + 3, 0]);
		this.addChild(numDesc);

		let num = Api.chatVoApi.getLabaNum();
		let numTxt = ComponentManager.getTextField(num.toString(), 22, TextFieldConst.COLOR_BROWN);
		this.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, numDesc, [numDesc.textWidth + 3, 0]);
		this.addChild(numTxt);
		this._labanum = numTxt;

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 30,GameConfig.stageHeigth - 300 - hh);
		this._scrollList = ComponentManager.getScrollList(ChatScrollItem,[],rect,NaN,0);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
		this.addChild(this._scrollList);
		this._scrollList.setPosition(10,12);
		// this._scrollList.addTouchTap(this.clickItemHandler,this);
		this._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));

		
		//输入框
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_CONTENT_COMMON,393,46,"public_tc_srkbg05",LanguageManager.getlocal("chatMaxLength"),TextFieldConst.COLOR_WHITE);
		inputTF.x = 20;
		inputTF.y = bottomBg2.y + bottomBg2.height/2 - inputTF.height/2;
		this.addChild(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.maxChars = GameData.chatMaxChars;;

   
		let sendBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"chatViewSend",this.sentBtnClick,this);
		sendBtn.x = inputTF.x + inputTF.width + 15;
		sendBtn.y = bottomBg2.y + bottomBg2.height/2 - sendBtn.height/2;
		this._sendBtn = sendBtn;
		this.addChild(sendBtn);

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
		
		this.addChild(sendBtn);
		this.fresh_laba();
		let obj = Api.chatVoApi.getCrossList();
		if(!obj.length){
			this.isNew = true;
			NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
				isall : 1,
			});
		}
		else{
			view._scrollList.refreshData(obj);
			view._scrollList.moveToButtom();
		}
		
		//绑定计时器
		this.clearTimer();
		this._timer = new egret.Timer(1000 * 5);
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.show_round, this);
		this._timer.start();

		let bottom: BaseBitmap = BaseBitmap.create("chatview_bottom");
		// bottom.height = 200;
		bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
        this.addChild(bottom);

		this.checkShowMoreTip();
	}

	
	private refreshChatByScroll():void
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		if(isButtom)
		{
			let chatList = Api.chatVoApi.getCrossList();
			this._scrollList.refreshData(chatList);
			this._scrollList.moveToButtom();
			let moreBtn:BaseDisplayObjectContainer=<BaseDisplayObjectContainer>this.getChildByName("moreBtn");
			if(this._scrollList&&this._scrollList.checkIsAtButtom())
			{
				if(moreBtn)
				{
					moreBtn.visible=false;
				}
			}
		}
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
				moreBtn.y = GameConfig.stageHeigth - 400;
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


	private oldLen = 0; 
	private getMsgBack(evt : egret.Event):void{
		let view = this;
		if(evt.data.data.data.crosschat){
			let oldMsg = Api.chatVoApi.getLastCrossMessage();
			if(oldMsg && oldMsg.seq == evt.data.data.data.crosschat[0].seq){
				return;
			}
			Api.chatVoApi.clearCrossChatList();
			Api.chatVoApi.setCrossChatList(evt.data.data.data);
			let chatList = Api.chatVoApi.getCrossList();
			if(evt.data.data.data.isall){
				if(chatList.length > 0 ){
					let isButtom:boolean = this._scrollList.checkIsAtButtom();
					view._scrollList.refreshData(chatList);
					if(isButtom)
					{
						this._scrollList.moveToButtom();
					}
					if(this.isNew){
						this._scrollList.moveToButtom();
						this.isNew = false;
					}
				}
			}
			if(chatList.length > this.oldLen){
				this.checkShowMoreTip();
			}
			this.oldLen = chatList.length;
		}
	}

	private refreshChat()
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		if(isButtom)
		{
			let chatList = Api.chatVoApi.getCrossList();
			this._scrollList.refreshData(chatList);
			this._scrollList.moveToButtom();
		}
		 this.checkShowMoreTip();
	}


	private scrollToButtom():void
	{
		this._scrollList.moveToButtom();
		this.refreshChat();
	}

    private sentBtnClick()
    {	
		if(Api.otherInfoVoApi.getCrossBanet() - GameData.serverTime >0 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet",[App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getCrossBanet(),2)]));
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
		if(Api.chatVoApi.getLabaNum() <= 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("corssserverChatNot"));
			return;
		}	

		Api.chatVoApi._lastTime = GameData.serverTime;
		
        let txtStr:string=this._inputTextField.text;
        let chatData:any = {};
        chatData.channel = 1;
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

		// NetManager.requestChat(chatData);
		NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG, {
			//receiveuid : this.param.data.sender,
			content : txtStr,
			tlv:tlv,
		});
		//this.fresh_laba();
	}
	
	private fresh_laba(){
		let view = this;
		let num = Api.chatVoApi.getLabaNum();
		view._labanum.text = num.toString();
		view._labanum.textColor = num > 0 ? 0x3e9b00 : 0xce1515;
		view._sendBtn.setGray(num <= 0);
	}

	private sendMsgBack(evt : egret.Event):void{
		let view = this;
		if(evt.data.data.ret < 0){
			return;
		}
		view.fresh_laba();
		if(evt.data.data.data.crosschat){
			Api.chatVoApi.setCrossChatList(evt.data.data.data);
			let chatList = Api.chatVoApi.getCrossList();
			let isButtom:boolean = this._scrollList.checkIsAtButtom();
			view._scrollList.refreshData(chatList);
			if(isButtom)
			{
				this._scrollList.moveToButtom();
			}
			this.checkShowMoreTip();
		}
	}

	public closeTimer():void{
		let view = this;
		if(view._timer){
			view._timer.stop();
		}
	}

	private clearTimer():void{
		let view = this;
		if(view._timer){
            view._timer.stop();
			view._timer.removeEventListener(egret.TimerEvent.TIMER, view.show_round, view);
			view._timer = null;
		}
	}


	public refreshWhenSwitchBack():void{
		let view = this;
		//view.closeTimer();
		if(view._timer){
			view._timer.start();
		}
	}

	private show_round():void{
		NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
			isall : 1,
		});
	}

	public dispose():void
	{
		// this._inputTextField.removeEventListener();
		let view = this;
		view.clearTimer();
		view._inputTextField = null;
		view._labanum = null;
		view._scrollList = null;
		view._sendBtn = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);
		super.dispose();
	}
}