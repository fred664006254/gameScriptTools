class ChatViewTab2 extends CommonViewTab
{
    private _inputTextField:BaseTextField;
	private _lastMsg:string;
    // 滑动列表
	private _scrollList:ScrollList;
	private _checkBox1:CheckBox = undefined;
	public constructor() 
	{
		super();
        this.initView();
	}

	protected initView():void
	{


		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.refreshChat,this);


        let chatList = Api.chatVoApi.getAllianceList();

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

		let lisetBg = BaseBitmap.create("public_9v_bg03");
		lisetBg.width = GameConfig.stageWidth;
		lisetBg.height = GameConfig.stageHeigth - 150 - hh;;
		lisetBg.x = 0;
		lisetBg.y = 0;
		this.addChild(lisetBg);

		bottomBg2.y = lisetBg.y + lisetBg.height  -bottomBg2.height- 10;


		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 30,GameConfig.stageHeigth - 263 - hh);
		this._scrollList = ComponentManager.getScrollList(ChatScrollItem,chatList,rect);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
		this.addChild(this._scrollList);
		this._scrollList.setPosition(10,12);
		// this._scrollList.addTouchTap(this.clickItemHandler,this);
		if(chatList.length > 0 ){
			this._scrollList.setScrollTopByIndex(chatList.length-1);
		}
		


          //输入框
        
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_CONTENT_COMMON,393,46,"public_tc_srkbg05",LanguageManager.getlocal("chatMaxLength"),TextFieldConst.COLOR_WHITE);

		inputTF.x = 20;
		inputTF.y = bottomBg2.y + bottomBg2.height/2 - inputTF.height/2;
		this.addChild(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.maxChars = 40;
        // this._inputTextField.

   
		let sendBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"chatViewSend",this.sentBtnClick,this);
		sendBtn.x = inputTF.x + inputTF.width + 15;
		sendBtn.y = bottomBg2.y + bottomBg2.height/2 - sendBtn.height/2;
		// sendBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChild(sendBtn);
		if(Api.switchVoApi.checkVip1Privilege())
		{	let needVip = Api.vipVoApi.getNeedVip("reachLvelUnlock");
			if(needVip&&Api.playerVoApi.getPlayerLevel() < GameData.chatlevel&&Api.playerVoApi.getPlayerVipLevel()<needVip){
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
		bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
        this.addChild(bottom);

		let contanier = new BaseDisplayObjectContainer();
		this.addChild(contanier);
		let checkBox1 = ComponentManager.getCheckBox(LanguageManager.getlocal("chatShowShare"),null,null,TextFieldConst.COLOR_WARN_YELLOW);
		checkBox1.x = 0;
		checkBox1.y = 0;
		contanier.addChild(checkBox1);
		Api.otherInfoVoApi.getAllianceShareblock()==1?checkBox1.setSelected(false):checkBox1.setSelected(true);
		this._checkBox1 = checkBox1;
		contanier.x = bottom.x + bottom.width/2 - contanier.width/2;
		contanier.y = bottom.y + 70;
		this._checkBox1.addTouchTap(this.selectHandler1,this);
		this.checkShowMoreTip();
	}

	private selectHandler1()
	{
		this.request(NetRequestConst.REQUEST_CHAT_BLOCKSHARE,{dtype:2});
	}

	private refreshChat()
	{
		 let isButtom:boolean = this._scrollList.checkIsAtButtom();
		if(isButtom)
		{
			let chatList = Api.chatVoApi.getAllianceList();
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

	private scrollToButtom():void
	{
		this._scrollList.moveToButtom();
		this.refreshChat();
	}

    private sentBtnClick()
    {

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

		this._lastMsg = txtStr;
		this._inputTextField.text = "";

        //猫玩处理聊天
		if(PlatformManager.checkIsMwSp())
		{
			let server_name = 
			this.request(NetRequestConst.REQUEST_CHAT_MWSIGN, {
				 server_name: ServerCfg.selectServer.sname,
				 chat_channel: 1,
				 chat_content: txtStr,
				 sender_uid: PlatformManager.userId,
				
			});
			return;
		}
		else if(PlatformManager.checkIsWxmgSp())
		{
			let server_name = 
			this.request(NetRequestConst.REQUEST_CHAT_WXSIGN, {
				 server_name: ServerCfg.selectServer.sname,
				 chat_channel: Api.playerVoApi.getPlayerAllianceId(),
				 chat_content: txtStr,
				 sender_uid: PlatformManager.userId,
				
			});
			return;
		}
		//日本处理聊天
		else if(PlatformManager.checkIsJPSp()||PlatformManager.checkIsWdSp())
		{
			let server_name = 
			this.request(NetRequestConst.REQUEST_CHAT_CRY, {
				});
			return;
		}
		NetManager.requestChat(chatData);

    }

	protected receiveData(data: { ret: boolean, data: any }): void {

		if(data.ret == false){
			return;
		}

		if (data.data.cmd == NetRequestConst.REQUEST_CHAT_BLOCKSHARE) {
			this.refreshChat();
			return;
		}
		if(PlatformManager.checkIsWxmgSp()&& data.data.data.msg&&data.data.data.msg&&data.data.data.msg.data.result==1)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
		if(data.data.data.mkey)
		{
			PlatformManager.chat_mkey = data.data.data.mkey;
			
		}
		
		if(PlatformManager.checkIsWxmgSp()||PlatformManager.checkIsJPSp()||PlatformManager.checkIsWdSp())
		{
			if(!this._lastMsg)
			{
				return;
			}
			let chatData:any = {};
			chatData.channel = Api.playerVoApi.getPlayerAllianceId();
			chatData.message = this._lastMsg;
			this._lastMsg = null;
			PlatformManager.analytics37JPPoint("custom_social","lan_send_msg",1);
			NetManager.requestChat(chatData);
			return;
		}

		if(data.data.data.msg&&data.data.data.msg.code&&data.data.data.msg.code == -1)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
		else if(data.data.data.msg&&data.data.data.msg.code&&data.data.data.msg.code == -2)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet2"));
			return;
		}
		else if(data.data.data.msg&&data.data.data.msg.code&&data.data.data.msg.code == -3)
		{
			return;
		}


		let chatData:any = {};
        chatData.channel = Api.playerVoApi.getPlayerAllianceId();
        chatData.message = data.data.data.msg.content;
		NetManager.requestChat(chatData);
	}
	public dispose():void
	{
        // this._inputTextField.removeEventListener();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.refreshChat,this);
		super.dispose();
	}
}