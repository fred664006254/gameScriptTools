class AcCrossServerWifeBattleChatViewTab2 extends CommonViewTab
{
    private _inputTextField:BaseTextField;
	private _lastMsg:string;
	// 滑动列表
	// private _labanum : BaseTextField =null;
	private _scrollList:ScrollList = null;
	private _checkBox1:CheckBox = undefined;

    private aid:string = null;
    private code :string = null;
	public constructor(param:any) 
	{
		super();
        this.aid = param.data.aid;
        this.code = param.data.code;
        this.initView();
	}
	private get cfg() : Config.AcCfg.CrossServerWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
	protected initView():void
	{
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS+TransType.CrossAc,this.refreshTrans,this);

      



 		// let chatList = Api.chatVoApi.getAllianceList();
		let chatList = Api.chatVoApi.getacCrossList();
		if(!chatList.length){
			NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
				isall : 1,
				activeId : this.activeId
			});
		}
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

        if(!this.vo.isCanJoin){
            
            sendBtn.setGray(true);
        }

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

		/*
		let checkBox1 = ComponentManager.getCheckBox(LanguageManager.getlocal("chatShowShare"),null,null,TextFieldConst.COLOR_WARN_YELLOW);
		checkBox1.x = 0;
		checkBox1.y = 0;
		contanier.addChild(checkBox1);
		Api.otherInfoVoApi.getAllianceShareblock()==1?checkBox1.setSelected(false):checkBox1.setSelected(true);
		this._checkBox1 = checkBox1;
		contanier.x = bottom.x + bottom.width/2 - contanier.width/2;
		contanier.y = bottom.y + 70;
		this._checkBox1.addTouchTap(this.selectHandler1,this);
		*/

		this.checkShowMoreTip();

	}
	private selectHandler1()
	{
		// this.request(NetRequestConst.REQUEST_CHAT_BLOCKSHARE,{dtype:2});
	}
	private get activeId(){
		// let mainview : any = ViewController.getInstance().getView('ChatActivityCrossView');
		// return mainview.activeID;
        return this.aid +"-" + this.code;
	}

	private refreshChatByScroll():void
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		if(isButtom)
		{
			let chatList = Api.chatVoApi.getacCrossList();
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

	private isNew = false;
	private oldLen = 0;
	private getMsgBack(evt : egret.Event):void{
		let view = this;
		if(evt.data.data.ret >= 0){
			if(evt.data.data.data.crosschat){
				let oldMsg = Api.chatVoApi.getLastAcCrossMessage();
				if(oldMsg && oldMsg.seq == evt.data.data.data.crosschat[0].seq){
					return;
				}
				
				Api.chatVoApi.clearAcCrossChatList();
				Api.chatVoApi.setAccrossChatList(evt.data.data.data);
				let chatList = Api.chatVoApi.getacCrossList();
				if(evt.data.data.data.isall){
					if(chatList.length > 0 ){
						view._scrollList.refreshData(chatList);
						view._scrollList.moveToButtom();
					}
				}
				else{
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
				if(chatList.length > this.oldLen){
					this.checkShowMoreTip();
				}
				this.oldLen = chatList.length;
			}
		}
	}

	private refreshChat()
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		if(isButtom)
		{
			let chatList = Api.chatVoApi.getacCrossList();
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
        if(!this.vo.isCanJoin){
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattle_chatcannotjointip"));
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

		Api.chatVoApi._lastTime = GameData.serverTime;
		
        let txtStr:string=this._inputTextField.text;
        let chatData:any = {};
        chatData.channel = 1;
        chatData.message = txtStr;

		this._inputTextField.text = "";

		// NetManager.requestChat(chatData);
		NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG, {
			//receiveuid : this.param.data.sender,
			content : txtStr,
			activeId : this.activeId
		});
		//this.fresh_laba();
	}

	private sendMsgBack(evt : egret.Event):void{
		let view = this;
		if(evt.data.data.ret < 0){
			return;
		}
		if(evt.data.data.data.crosschat){
			Api.chatVoApi.setAccrossChatList(evt.data.data.data);
			let chatList = Api.chatVoApi.getacCrossList();
			let isButtom:boolean = this._scrollList.checkIsAtButtom();
			view._scrollList.refreshData(chatList);
			if(isButtom)
			{
				this._scrollList.moveToButtom();
			}
			this.checkShowMoreTip();
		}
	}

	// public closeTimer():void{
	// 	let view = this;
	// 	if(view._timer){
	// 		view._timer.stop();
	// 	}
	// }

	// private clearTimer():void{
	// 	let view = this;
	// 	if(view._timer){
    //         view._timer.stop();
	// 		view._timer.removeEventListener(egret.TimerEvent.TIMER, view.show_round, view);
	// 		view._timer = null;
	// 	}
	// }


	// public refreshWhenSwitchBack():void{
	// 	let view = this;
	// 	//view.closeTimer();
	// 	if(view._timer){
	// 		view._timer.start();
	// 	}
	// }

	// private show_round():void{
	// 	NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
	// 		isall : 1,
	// 		activeId : this.activeId
	// 	});
	// 	// App.LogUtil.log(22);
	// }

	private refreshTrans()
	{
		let isButtom:boolean = this._scrollList.checkIsAtButtom();
		this._scrollList.refreshData(Api.chatVoApi.getacCrossList());
		if(isButtom)
		{			
			this._scrollList.moveToButtom();
		}
	}

	public dispose():void
	{
		// this._inputTextField.removeEventListener();
		let view = this;
		// view.clearTimer();
		// view._inputTextField = null;
		// view._labanum = null;
		// view._scrollList = null;
		// view._sendBtn = null;

        this._inputTextField = null;
	    this._lastMsg = null;

	    this._scrollList = null;
	    this._checkBox1 = undefined;


        this.aid = null;
        this.code = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS+TransType.CrossAc,this.refreshTrans,this);
		super.dispose();
	}
}