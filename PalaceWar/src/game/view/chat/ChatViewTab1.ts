class ChatViewTab1 extends CommonViewTab
{
    private _inputTextField:BaseTextField;
    // 滑动列表
	private _scrollList:ScrollList;
	private _sendBtn:BaseButton=null;
	private _emoticonBtn:BaseButton = null;
	public constructor() 
	{
		super();
        this.initView();
	}

	protected initView():void
	{


		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.refreshChat,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS,this.refreshTrans,this);

        let chatList = Api.chatVoApi.getWorldList1();



        //下面属性背景
		let bottomBg:BaseBitmap = BaseBitmap.create("chatview_inputbg");

		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - 143 - 110 - bottomBg.height + 30;
		this.addChild(bottomBg);

		let listBg:BaseBitmap = BaseBitmap.create("public_9_bg32"); 
		listBg.width = GameConfig.stageWidth - 30;
		listBg.height = GameConfig.stageHeigth - 143 - 110 - bottomBg.height;
		listBg.x = 15;
		listBg.y = 12;
		this.addChild(listBg);


		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 50,GameConfig.stageHeigth - 263 - 110);
		this._scrollList = ComponentManager.getScrollList(ChatScrollItem,chatList,rect,NaN,0);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
		this.addChild(this._scrollList);
		this._scrollList.setPosition(25,12);
		// this._scrollList.addTouchTap(this.clickItemHandler,this);
		if(chatList.length > 0 ){
			this._scrollList.moveToButtom();
		}
		this._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
		


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
		this._sendBtn=sendBtn;

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

		this.checkShowMoreTip();
		let chatStatus:ChatSocketStatus=new ChatSocketStatus({w:GameConfig.stageWidth,h:bottomBg.y+bottomBg.height});
		this.addChild(chatStatus);
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

	private refreshChatByScroll():void
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		if(isButtom)
		{
			let chatList = Api.chatVoApi.getWorldList1();
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

	private emoticonBtnClick():void{
		if(Api.switchVoApi.checkCloseChat())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("noChat"));
			return;
		}
		if(Api.otherInfoVoApi.getBanet() - GameData.serverTime >0 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet",[App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getBanet(),2)]));
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.EMOTICONVIEW, {channel:1, type:0});
	}

	private refreshChat()
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		if(isButtom)
		{
			let chatList = Api.chatVoApi.getWorldList1();
			this._scrollList.refreshData(chatList);
			this._scrollList.moveToButtom();
		}
		 this.checkShowMoreTip();
	}

	private refreshTrans()
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		this._scrollList.refreshData(Api.chatVoApi.getWorldList1());
		if(isButtom)
		{			
			this._scrollList.moveToButtom();
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
		if(Api.otherInfoVoApi.getBanet() - GameData.serverTime >0 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet",[App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getBanet(),2)]));
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

		console.log("this1:"+this.hashCode);
		NetManager.requestChat(chatData,this.requestChatCallBack,this);
		this._sendBtn.setEnable(false);
		this._sendBtn.setText("chatWsSending");

	}
	private requestChatCallBack(data:{status:"success"|"timeout"|"fail"}):void
	{
		if(this._sendBtn)
		{
			this._sendBtn.setEnable(true);
			this._sendBtn.setText("chatViewSend");
		}
	}
	public dispose():void
	{
		this._sendBtn=null;
        // this._inputTextField.removeEventListener();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.refreshChat,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS,this.refreshTrans,this);
		super.dispose();
	}
}