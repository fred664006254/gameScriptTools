class ChatViewTab4 extends CommonViewTab
{
    private _inputTextField:BaseTextField;
	// 滑动列表
	private _labanum : BaseTextField =null;
	private _freeTimes : BaseTextField =null;
	private _scrollList:ScrollList = null;
	private _sendBtn : BaseButton = null;
	private _timer : egret.Timer = null;

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
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS+TransType.Cross,this.refreshTrans,this);
		// chatList.forEach((data)=>{
		// 	data.chattype = 'cross';
		// });
        //下面属性背景
		let bottomBg:BaseBitmap = BaseBitmap.create("chatview_inputbg");

		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - 143 - 110 - bottomBg.height + 30;
		this.addChild(bottomBg);
		//let item = Config.ItemCfg.getItemCfgById(1651);
		let laba = BaseBitmap.create('chatlaba');

		let listBg:BaseBitmap = BaseBitmap.create("public_9_bg32"); 
		listBg.width = GameConfig.stageWidth - 30;
		listBg.height = GameConfig.stageHeigth - 143 - 110 - bottomBg.height - laba.height;
		listBg.x = 15;
		listBg.y = 12;
		this.addChild(listBg);


		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 50,listBg.height - 10);
		this._scrollList = ComponentManager.getScrollList(ChatScrollItem,[],rect,NaN,0);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
		this.addChild(this._scrollList);
		this._scrollList.setPosition(25,12);
		// this._scrollList.addTouchTap(this.clickItemHandler,this);
		this._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
		//喇叭
		this.setLayoutPosition(LayoutConst.lefttop, laba, listBg, [0,listBg.height+5]);
		this.addChild(laba);

		let numDesc = ComponentManager.getTextField(LanguageManager.getlocal('chatviewlabanum'), 22, TextFieldConst.COLOR_BLACK);
		this.setLayoutPosition(LayoutConst.leftverticalCenter, numDesc, laba, [laba.width + 3, 0]);
		this.addChild(numDesc);

		let num = Api.chatVoApi.getLabaNum();
		let numTxt = ComponentManager.getTextField(num.toString(), 22, TextFieldConst.COLOR_WARN_GREEN);
		this.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, numDesc, [numDesc.textWidth + 3, 0]);
		this.addChild(numTxt);
		this._labanum = numTxt;

		if (PlatformManager.checkIsRuSp())
		{	
			let num1 = GameData.crossChatFreeTimes - Api.otherInfoVoApi.getCrosschatNum();
			let str = LanguageManager.getlocal("chatFreeTimes",[String(num1),String(GameData.crossChatFreeTimes)]);
			let freeTime = ComponentManager.getTextField(str, 22, TextFieldConst.COLOR_BLACK);
			freeTime.setPosition(GameConfig.stageWidth-freeTime.width-30,numTxt.y);
			this.addChild(freeTime);
			this._freeTimes = freeTime;
		}

		//输入框
		let inputWidth = 463;
		if (this.isShowEmoticonBtn()){
			inputWidth = 403;
		}
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,inputWidth,48,"public_chatinputbg",LanguageManager.getlocal("chatMaxLength"),0xa4917f);

		inputTF.x = 20;
		inputTF.y = bottomBg.y + bottomBg.height/2 - inputTF.height/2;
		this.addChild(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.maxChars = GameData.chatMaxNumber();
        // this._inputTextField.

		//表情按钮  input 463 48
		let emoticonBtn = ComponentManager.getButton("emoticon_btn", "", this.emoticonBtnClick, this);
		emoticonBtn.x = inputTF.x + inputTF.width + 8;
		emoticonBtn.y = bottomBg.y + bottomBg.height/2 - emoticonBtn.height/2;
		this.addChild(emoticonBtn);
		emoticonBtn.visible = false;
   
		let sendBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"chatViewSend",this.sentBtnClick,this);
		sendBtn.x = inputTF.x + inputTF.width + 2;
		// sendBtn.x = emoticonBtn.x + emoticonBtn.width + 10;
		sendBtn.y = bottomBg.y + bottomBg.height/2 - sendBtn.height/2;
		sendBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._sendBtn = sendBtn;

		if (this.isShowEmoticonBtn()){
			emoticonBtn.visible = true;
			sendBtn.x = emoticonBtn.x + emoticonBtn.width + 10;
		}

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
	}

	private isShowEmoticonBtn():boolean{
		if (!Api.switchVoApi.checkEmoticonOpen()){
			return false;
		}
		if(Api.switchVoApi.checkVip1Privilege()){
			if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel&&Api.playerVoApi.getPlayerVipLevel()<1){
				return false;
			}
		}
		else{
			if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel){
				return false;
			}
		}
		return true;
	}

	private isNew = false;
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

	private emoticonBtnClick():void{
		if(Api.switchVoApi.checkCloseChat())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("noChat"));
			return;
		}
		if(Api.otherInfoVoApi.getCrossBanet() - GameData.serverTime >0 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet",[App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getCrossBanet(),2)]));
			return;
		}
		if(Api.chatVoApi.getLabaNum() <= 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("corssserverChatNot"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.EMOTICONVIEW, {channel:1,type:1});
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
				moreBtn.y = GameConfig.stageHeigth - 385;
				moreBtn.addTouchTap(this.scrollToButtom,this);

				let moreBtnImg: BaseBitmap = BaseBitmap.create("public_9_bg33");
				moreBtnImg.width = 610;
				moreBtnImg.height = 40;
				moreBtnImg.scaleY = -1;
				moreBtnImg.x = 0;
				moreBtnImg.y = 0 + moreBtnImg.height;
				
				moreBtn.addChild(moreBtnImg);

				let moreBtnText: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("chatHaveNewMsg"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
				moreBtnText.x = moreBtn.width / 2 - moreBtnText.width / 2;
				moreBtnText.y = moreBtn.height / 2 - moreBtnText.height/2;
				moreBtn.addChild(moreBtnText);

				let moreBtnArrow: BaseBitmap = BaseBitmap.create("chatview_arrow");
				moreBtnArrow.x = moreBtnText.x + moreBtnText.width + 5;
				moreBtnArrow.y = moreBtnText.y + moreBtnText.height/2 - moreBtnArrow.height/2;
				moreBtn.addChild(moreBtnArrow);

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
		this._scrollList.moveToButtom();
		this.refreshChat();
	}

    private sentBtnClick()
    {	
		if(Api.switchVoApi.checkCloseChat())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("noChat"));
			return;
		}
		if(Api.otherInfoVoApi.getCrossBanet() - GameData.serverTime >0 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet",[App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getCrossBanet(),2)]));
			return;

		}
		if(Api.switchVoApi.checkVip1Privilege()){
			if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel&&Api.playerVoApi.getPlayerVipLevel()<1){
				App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc2",[Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel)]));
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
		let num = Api.chatVoApi.getLabaNum()
		if (PlatformManager.checkIsRuSp())
		{
			if (GameData.crossChatFreeTimes > Api.otherInfoVoApi.getCrosschatNum())
			{
				num += (GameData.crossChatFreeTimes - Api.otherInfoVoApi.getCrosschatNum());
			}
		}

		if(num <= 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("corssserverChatNot"));
			return;
		}	
		let txtStr:string=this._inputTextField.text;
		// iOS源生包屏蔽	emoji
		if (Api.chatVoApi.isShieldEmoji())
		{
			if (Api.chatVoApi.checkHasEmoji(txtStr))
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldEmojiTip"));
				return;
			}
		}



		Api.chatVoApi._lastTime = GameData.serverTime;
		
        let chatData:any = {};
        chatData.channel = 1;
        chatData.message = txtStr;

		this._inputTextField.text = "";

		// NetManager.requestChat(chatData);
		NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG, {
			//receiveuid : this.param.data.sender,
			content : txtStr,
		});
		//this.fresh_laba();
	}
	
	private fresh_laba(){
		let view = this;
		let num = Api.chatVoApi.getLabaNum();
		view._labanum.text = num.toString();
		view._labanum.textColor = num > 0 ? 0x3e9b00 : 0xce1515;

		if (PlatformManager.checkIsRuSp())
		{
			if (GameData.crossChatFreeTimes > Api.otherInfoVoApi.getCrosschatNum())
			{
				num += (GameData.crossChatFreeTimes - Api.otherInfoVoApi.getCrosschatNum());
			}
			let num1 = GameData.crossChatFreeTimes - Api.otherInfoVoApi.getCrosschatNum();
			num1 = num1<0 ? 0 :num1;
			let str = LanguageManager.getlocal("chatFreeTimes",[String(num1),String(GameData.crossChatFreeTimes)]);
			this._freeTimes.text = str;
		}

		view._sendBtn.setGray(num <= 0);
	}

	protected tick():void
	{
		if (PlatformManager.checkIsRuSp() && this._freeTimes)
		{	
			let num1 = GameData.crossChatFreeTimes - Api.otherInfoVoApi.getCrosschatNum();
			num1 = num1<0 ? 0 :num1;
			let str = LanguageManager.getlocal("chatFreeTimes",[String(num1),String(GameData.crossChatFreeTimes)]);
			this._freeTimes.text = str;
		}
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
			this.tick();

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
		// console.log(22);
	}

	private refreshTrans()
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		this._scrollList.refreshData(Api.chatVoApi.getCrossList());
		if(isButtom)
		{			
			this._scrollList.moveToButtom();
		}
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
		this._freeTimes = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS+TransType.Cross,this.refreshTrans,this);
		super.dispose();
	}
}