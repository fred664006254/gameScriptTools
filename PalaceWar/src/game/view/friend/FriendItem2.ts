/**
 * 好友 结交好友部分
 * author yanyuling
 * ddate 2018/06/21
 * @class FriendItem2
 */
class FriendItem2 extends BaseDisplayObjectContainer
{
	private _scrollView:ScrollList = null;
	private _friendsTxt:BaseTextField;
	private _inputTextField:BaseTextField;
	private _refreshCd:number=0;
	private _refreshBtn:BaseButton;

    public constructor(bottomH:number)
	{
		super();
		this.init(bottomH);
	}

	public init(bottomH:number):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.searchBtnCallBack,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_GETRECONMEND),this.receiveData,this);
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY),this.refreshAfterApplyOrCancel,this);
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_APPLY),this.refreshAfterApplyOrCancel,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_NEW_APPLYCHANGE,this.refreshAfterApplyOrCancel,this);

		
		//输入框
		let tarWidth = 350;
		let tarHeight = 40;
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_QUALITY_GRAY,18,tarWidth,tarHeight,"public_9_bg5",LanguageManager.getlocal("friends_searchTxt"),TextFieldConst.COLOR_WHITE);
        inputTF.x = 80;
		inputTF.y = 30;
        let textField = inputTF.getChildByName("textField");
        // textField.y -= 30;
		this.addChild(inputTF);
		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
        this._inputTextField.height = tarHeight;
        this._inputTextField.width = tarWidth;
		this._inputTextField.maxChars = 20;
		this._inputTextField.textColor = 0x858688;
		

		let searchBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt15",this.searchBtnHandler,this);
		searchBtn.x = inputTF.x + inputTF.width + 5;
		searchBtn.y = inputTF.y + inputTF.height/2 - searchBtn.height/2-3;
		searchBtn.name = "searchBtn";
		this.addChild(searchBtn);
		
		let maskbg = BaseBitmap.create("public_9_viewmask");
		maskbg.width =GameConfig.stageWidth-10;
		maskbg.x =GameConfig.stageWidth/2 -maskbg.width/2;
		maskbg.height = 40;
		maskbg.y = 100;
		this.addChild(maskbg);

		let lineImg =  BaseBitmap.create("public_line3");
		lineImg.width = 460;
		lineImg.x = maskbg.x + maskbg.width/2 - lineImg.width/2;
		lineImg.y = maskbg.y + maskbg.height/2 - lineImg.height/2;
		this.addChild(lineImg);

		let suggestTxt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_WHITE);
		suggestTxt.text = LanguageManager.getlocal("friends_suggestTxt");
		suggestTxt.x = maskbg.x + maskbg.width/2 - suggestTxt.width/2;
		suggestTxt.y = maskbg.y + maskbg.height/2 - suggestTxt.height/2;
		this.addChild(suggestTxt);

		let buttombg = BaseBitmap.create("arena_bottom");
		buttombg.y = bottomH - buttombg.height;
		this.addChild(buttombg);

		this._friendsTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._friendsTxt.x = buttombg.x + 20;
		this._friendsTxt.y = buttombg.y + buttombg.height/2 - this._friendsTxt.height/2-10;
		this.addChild(this._friendsTxt);

		let applyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt4",this.applyBtnHandler,this);
		applyBtn.x = buttombg.x + buttombg.width - applyBtn.width*2 - 50;
		applyBtn.y = buttombg.y + buttombg.height/2 - applyBtn.height/2;
		applyBtn.name = "applyBtn";
		this.addChild(applyBtn);

		let refreshBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt5",this.refreshBtnHandler,this);
		refreshBtn.x = applyBtn.x  + applyBtn.width + 20;
		refreshBtn.y = applyBtn.y ;
		refreshBtn.name = "refreshBtn";
		this.addChild(refreshBtn);
		this._refreshBtn = refreshBtn;

		let rect = new egret.Rectangle(0,maskbg.y + maskbg.height+5,622,bottomH-buttombg.height - maskbg.y - maskbg.height - 10);
		this._scrollView = ComponentManager.getScrollList(FriendScrollItem,[],rect);
		this._scrollView.x = GameConfig.stageWidth/2 - this._scrollView.width/2;
		this._scrollView.y = maskbg.y + maskbg.height;
		this.addChild(this._scrollView);
		if(Api.friendVoApi.recommendList.length == 0){
			this.doRequtstApplyList();
		}else{
			this.doRefreshList();
		}
		this.tick();
		TickManager.addTick(this.tick,this);
	}
	
	protected doRequtstApplyList()
	{
		NetManager.request(NetRequestConst.REQUEST_FRIEND_GETRECONMEND,{});
	}
	protected refreshAfterApplyOrCancel(data: egret.Event): void
	{
		// let rData = data.data.data;
       	// if( rData.ret == 0)
        // {
		// 	egret.callLater(this.doRefreshList,this);
		// }
		egret.callLater(this.doRequtstApplyList,this);
	}

	protected doRefreshList()
	{
		let uiType = null;
		let maxF = GameConfig.config.friendCfg.maxFriend;
		this._friendsTxt.text = LanguageManager.getlocal("friendsNumTxt",[ Api.friendVoApi.getFriendsCount() +"/"+maxF]);
		let dataList = [];
		for (var index = 0; index < Api.friendVoApi.recommendList.length; index++) {
			let tmpData = Api.friendVoApi.recommendList[index];
			if(!Api.friendVoApi.isFriendByUid(tmpData.uid)){
				// tmpData["uiType"] = FriendScrollItem.UITYPE2;
				uiType = FriendScrollItem.UITYPE2;
				dataList.push(tmpData);
			}
		} 
		
		if(this._scrollView)
		{
			this._scrollView.refreshData(dataList,{uiType:uiType});
		}

		let tipTxt = this.getChildByName("tipTxt");
		if(dataList.length == 0){
			if(!tipTxt){
				tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("friends_emptyTip3"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
				tipTxt.x = GameConfig.stageWidth/2 - tipTxt.width/2 ;
				tipTxt.y = GameConfig.stageHeigth/2  - tipTxt.height/2 - 90;
				tipTxt.name = "tipTxt";
				this.addChild(tipTxt);
			}
			tipTxt.visible = true;
		}else{
			if(tipTxt)
			{
				tipTxt.visible = false
			}
		}
	}
	
	protected searchBtnCallBack(data: egret.Event): void
    {
        let rData = data.data.data;
       	if( rData.ret == 0)
        {
			ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,rData.data);
		}else if(rData.ret == -3 && rData.data.usernotexist == 1)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_searchTip1"));
		}
	}
	protected searchBtnHandler()
	{
		let taruid = this._inputTextField.text;
		if(taruid == ""){
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_searchTxt"));
			return;
		}
		if(Number(taruid) == Api.playerVoApi.getPlayerID())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("dinnerCannotSelf"));
			return;
		}
		if (!Number(taruid)  )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_searchTip1"));
			return;
		}
		if(!this._inputTextField.bindData )
		{
			this._inputTextField.bindData = "";
            this._inputTextField.text = "";
		}	
        if(Config.ShieldCfg.checkOnlyShield(taruid)==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
		NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:taruid});
	}

	protected applyBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.FRIENDSAPPLYPOPUPVIEW);
	}

	protected refreshBtnHandler()
	{
		if(this._refreshCd > 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_refreshListTip",[""+this._refreshCd]));
			return;
		}
		this._refreshCd = GameConfig.config.friendCfg.refreshCD;
		this.doRequtstApplyList();
	}

	protected tick()
	{
		if(this._refreshCd > 0)
		{
			this._refreshCd-- ;
			this._refreshBtn.setText(App.DateUtil.getFormatBySecond(this._refreshCd,3),false);
		}else{
			this._refreshBtn.setText("friendsBtnTxt5");
		}
		return true;
	}

	protected receiveData(data: egret.Event): void
    {
        let rData = data.data.data;
       if(rData.ret == 0)
        {
			let data = rData;
			let cmd = rData.cmd;
			if(cmd == NetRequestConst.REQUEST_FRIEND_GETRECONMEND){
				Api.friendVoApi.recommendList = rData.data.commendList;
			}
			this.doRefreshList();
        }
    }

    public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_NEW_APPLYCHANGE,this.refreshAfterApplyOrCancel,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.searchBtnCallBack,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_GETRECONMEND),this.receiveData,this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY),this.refreshAfterApplyOrCancel,this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_APPLY),this.refreshAfterApplyOrCancel,this);
		TickManager.removeTick(this.tick,this);
		this._refreshCd = 0;
		this._scrollView = null;
		this._friendsTxt = null;
		this._inputTextField = null;
		this._refreshBtn = null;

		super.dispose();
	}

}