/**
 * 红颜
 * author dmj
 * date 2017/10/9
 * @class WifeView
 */
class WifeView extends CommonView
{

	// 滑动列表
	private _scrollList:ScrollList;
	// wife列表
	private _wifeInfoVoList:Array<WifeInfoVo>;

	private _vigorNumTF:BaseTextField;

	private _wifVoApi:WifeVoApi;
	// 随机传唤按钮
	private _callBtn:BaseButton
	// 恢复精力按钮
	private _recoverBtn:BaseButton

	// private _selectWifeId:number;

	private _rewardData:any;
	private _redDotSp:BaseBitmap = null;

	//cef
	private _wifeStatusBtn:BaseButton;

	//服务器随机宠幸返回数据
	private _loveData:any;

	//随机宠幸列表滚动位置
	private _scrollIndex:number;
	private _checkBox:CheckBox;
	//自动补充
	private _autoMakeup:CheckBox = null;

	public static wifeId;
	public static isMoveing = false;

	//省亲
	private _banishBtn:BaseButton = null;
	private _isBanish:boolean = false;
	private _wifeBanish:WifeBanish = null;
	private _backBtn:BaseButton = null;
	private _wifebattle:BaseDisplayObjectContainer=null;
	private _dropDownContainer:BaseDisplayObjectContainer;
	private _dropDownBtn:BaseButton;
	private _dropDownFlag:BaseBitmap;
	private _dropBtnList:BaseButton[];
	private _lastDropIdx:number=1;
	private tipContainerArr = [];
	private _mainTaskHandKey:string = null;

	public constructor() 
	{
		super();
	}

	protected showGuideAgain():string
	{
		return "wife_2";
	}
	

	protected clickGuideAgain():void
	{
		 super.clickGuideAgain();
		 this.refreshSort(this._lastDropIdx);
		 this._scrollList.setScrollTop(0);
		 App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getContainerY():number
	{
		return 14;
	}

    protected getBigFrame():string
	{	
		return null;
	}

	protected getTitlePic():string
	{	
		return Api.switchVoApi.checkIsInBlueWife() ? "wifeviewtitle_blueType" : "wifeviewtitle";
	}

	

	// protected getTitlePic():string
	// {	
	// 	return null;
	// }

	public initView():void
	{	
		// this.titleTF.text = LanguageManager.getlocal("wifeViewTitle");
		this.titleBmp.setRes(this.getTitlePic());
		this.titleBmp.x = GameConfig.stageWidth/2-this.titleBmp.width/2;

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);
		// SoundManager.playEffect(SoundConst.EFFECT_WIFE);
		this.playEffect(SoundConst.EFFECT_WIFE,true);
		RookieCfg.changeRookieCfg();
		Api.rookieVoApi.checkNextStep();

		Api.mainTaskVoApi.isKeepGuide = true;
		Api.mainTaskVoApi.checkShowGuide();

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL),this.callWifeCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY),this.recoverEnergyCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshItem,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshItem,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE),this.refreshItem,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.refreshItem,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFESTATUS,this.checkRedPoint,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO,this.checkRedPoint,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.setSexCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
		
		//大背景
		let bigBg:BaseBitmap = BaseBitmap.create("wife_listbg");
		bigBg.y = GameConfig.stageHeigth - bigBg.height - this.getTitleButtomY();
		this.addChildToContainer(bigBg);

		let bottom:BaseBitmap = BaseBitmap.create("arena_bottom");
		bottom.height += 20; 
		bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;
		this.addChildToContainer(bottom);

		this._wifVoApi = Api.wifeVoApi;
		this._wifeInfoVoList = this._wifVoApi.getWifeInfoVoList();

		this._dropBtnList = [];
		this._lastDropIdx = Api.otherInfoVoApi.getWifeSortId();


		if(this._wifeInfoVoList.length <= 0)
		{
			return;
		}
		// let bottomBg = BaseBitmap.create("public_9_bg23");
		// bottomBg.width = GameConfig.stageWidth-10;
		// bottomBg.height = GameConfig.stageHeigth - 230;
		// bottomBg.x = 5;
		// bottomBg.y = 0;
		// this.addChildToContainer(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 14,GameConfig.stageHeigth - 190);

		let wifeList = new Array<WifeInfoVo>();
		wifeList.push(null);
		wifeList=wifeList.concat(this._wifeInfoVoList);
		let key = ``;
		switch(Number(this._lastDropIdx)){
			case 1:
				break;
			case 2:
				key = `intimacy`;
				break;
			case 3:
				key = `glamour`;
				break;
			case 4:
				key = `artistry`;
				break;
		}
		if(key != ""){
			wifeList.sort((a,b)=>{
				if(a && b){
					let isexcilea = Api.wifebanishVoApi.getIsWifeBanishing(a.id.toString());
					let isexcileb = Api.wifebanishVoApi.getIsWifeBanishing(b.id.toString());
					if(isexcilea && isexcileb){
						if(key != ``){
							return b[key] - a[key];
						}
						return -1;
					}
					else if(isexcilea){
						return 1;
					}
					else if(isexcileb){
						return -1;
					}
					else{
						if(key != ``){
							return b[key] - a[key];
						}
						return -1;
					}
				}
			});
		}
		
		wifeList.push(null);
		// let wife1 = new Array<WifeInfoVo>;
		// [wifeList].concat(this._wifeInfoVoList).concat(wifeList);
		// egret.log(wifeList.length)
		this._scrollList = ComponentManager.getScrollList(WifeScrollItem1,wifeList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(7,-15);
		// this._scrollList.addTouchTap(this.clickItemHandler,this);

		// this._scrollList.setScrollTop(300,0);
		
		this._dropDownBtn = ComponentManager.getButton("common_select_frame","",this.dropDownBtnClickHandler,this,[0]);
		this._dropDownBtn.x = 40;
		this._dropDownBtn.y = bottom.y + 7;
		this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
		this.addChildToContainer(this._dropDownBtn);
		this._dropDownBtn.setText("wife_dropTxt"+this._lastDropIdx);
		this._dropBtnList.push(this._dropDownBtn);

		this._dropDownFlag = BaseBitmap.create("common_arrow_1");
		this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height/2;
		this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width -this._dropDownFlag.width-3 ;
		this._dropDownFlag.y =this._dropDownBtn.y + this._dropDownBtn.height -this._dropDownFlag.height/2-3;
		this.addChildToContainer(this._dropDownFlag);

		this._dropDownContainer = new BaseDisplayObjectContainer();
		
		this._dropDownContainer.visible = false;
		this._dropDownContainer.x = this._dropDownBtn.x;
		this._dropDownContainer.y = this._dropDownBtn.y - this._dropDownBtn.height;
		
		let dropCfg=[
			"wife_dropTxt1","wife_dropTxt2","wife_dropTxt3"
		]
		if(Api.switchVoApi.checkOpenWifeBattle()){
			dropCfg.push(`wife_dropTxt4`);
		}

		for (var index = 1; index <=dropCfg.length; index++) {
			let tmpBtn = ComponentManager.getButton("common_select_frame","",this.dropDownBtnClickHandler,this,[index]);
			this._dropBtnList.push(tmpBtn);
			tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
			tmpBtn.y = -tmpBtn.height*(index-1) -3;
			this._dropDownContainer.addChild(tmpBtn);
			tmpBtn.setText(dropCfg[index-1]);
		}

		let vigorTF = ComponentManager.getTextField(LanguageManager.getlocal("vigorDesc") + ":",18);
		vigorTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
		vigorTF.x = 40;
		vigorTF.y = this._scrollList.y + this._scrollList.height + 20;
		this.addChildToContainer(vigorTF);

		this._vigorNumTF = ComponentManager.getTextField(this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum(),18);
		this._vigorNumTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;	
		this._vigorNumTF.x = vigorTF.x + vigorTF.width + 15;
		this._vigorNumTF.y = vigorTF.y;
		this.addChildToContainer(this._vigorNumTF);
		
		let vipTipTxt = ComponentManager.getTextField("",18);
		vipTipTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
		vipTipTxt.x = vigorTF.x ;
		vipTipTxt.y = vigorTF.y +35;
		this.addChildToContainer(vipTipTxt);

		//一件传唤
		let needVip = GameConfig.config.wifebaseCfg.needVip;
		if(Api.playerVoApi.getPlayerVipLevel() >= needVip)
		{
			// vigorTF.visible = this._vigorNumTF.visible = true;
			// vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt2");
			let checkbox = ComponentManager.getCheckBox(LanguageManager.getlocal("wifeBatchTxt2"));
			checkbox.x = vipTipTxt.x + vipTipTxt.width+190;
			checkbox.y = vigorTF.y + 35;
			this.addChildToContainer(checkbox);
			this._checkBox = checkbox;
			this._checkBox.addTouchTap(this.selectHandler,this);

			//自动补充
			this._autoMakeup = ComponentManager.getCheckBox(LanguageManager.getlocal("searchTwoKeyDesc"));
			this._autoMakeup.setPosition(vigorTF.x ,vigorTF.y + 35);
			this.addChildToContainer(this._autoMakeup);
			this._autoMakeup.addTouchTap(this.autoMakeupCheck,this);
			let isShow = LocalStorageManager.get(LocalStorageConst.LOCAL_WIFE_AUTO_MAKEUP+Api.playerVoApi.getPlayerID());
			if(isShow && isShow != "")
			{
				this._autoMakeup.setSelected(true);
			}

		}else
		{
			vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt",[needVip]);
			// vigorTF.visible = this._vigorNumTF.visible = false;
			vipTipTxt.y = vigorTF.y + 45;
		}

		this._callBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"callBtn",this.clickCallBtn,this);
		this._callBtn.x = GameConfig.stageWidth - this._callBtn.width - 60;
		this._callBtn.y = bottom.y + bottom.height - this._callBtn.height - 13;
		this.addChildToContainer(this._callBtn);
		this._callBtn.setColor(TextFieldConst.COLOR_BLACK);

		vigorTF.x = this._callBtn.x + (this._callBtn.width - vigorTF.width - this._vigorNumTF.width - 15) / 2;
		vigorTF.y = this._callBtn.y - vigorTF.height - 5;
		this._vigorNumTF.x = vigorTF.x + vigorTF.width + 15;
		this._vigorNumTF.y = vigorTF.y;
		if(Api.playerVoApi.getPlayerVipLevel() >= needVip){
	
			vipTipTxt.x = this._callBtn.x + (this._callBtn.width - vipTipTxt.width) / 2;
			vipTipTxt.y = vigorTF.y;
		}

		this._recoverBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"recoverVigor",this.clickCallBtn,this);
		this._recoverBtn.x = GameConfig.stageWidth - this._recoverBtn.width - 60;
		this._recoverBtn.y = this._callBtn.y 
		this.addChildToContainer(this._recoverBtn);
		this._recoverBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._recoverBtn.visible = false;
		this.tick();
		var unLockBtn:BaseButton;
		if(Api.switchVoApi.checkCloseText())
		{
			unLockBtn = ComponentManager.getButton("wifelookbtn_hexie",null,this.unLockClick,this); 
		}
		else
		{
			unLockBtn = ComponentManager.getButton("wifelookbtn",null,this.unLockClick,this); 
		}
		unLockBtn.x = 15;
		unLockBtn.y = 0;
		unLockBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(unLockBtn);
		if(Api.switchVoApi.checkIsInBlueWife()){
			unLockBtn.setBtnBitMap(`wifelookbtn_blueType`);
		}

		if(Api.switchVoApi.checkTWShenhe())
		{
			unLockBtn.visible =false;
		} 

		if (!Api.rookieVoApi.isGuiding && !Api.rookieVoApi.isInGuiding){
			let taskId = Api.mainTaskVoApi.getCurMainTaskId();
			let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
			if (taskCfg)
			{
				let taskType = taskCfg.questType;
				if (taskType == 301 || taskType == 401){
					let btn = this._callBtn;
					if (this._wifVoApi.getEnergyNum() <= 0){
						btn = this._recoverBtn;
					}
					this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
						this.container,
						btn.x + btn.width/2 - 10,
						btn.y,
						[btn],
						taskType,
						true,
						function(){
							return true;
						},
						this
					);
				}
			}
		}

		if(Api.switchVoApi.checkOpenWifeStatus())
		{
			this._wifeStatusBtn = ComponentManager.getButton(Api.switchVoApi.checkIsInBlueWife() ? "wifestatus_btn_male":"wifestatus_btn",null,this.wifestatusClick,this);
			this._wifeStatusBtn.x = 15;
			this._wifeStatusBtn.y = unLockBtn.y + unLockBtn.height ;
			this._wifeStatusBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(this._wifeStatusBtn);
		}
		

		let servant_mask = BaseBitmap.create("servant_mask");
		servant_mask.width = GameConfig.stageWidth;
		servant_mask.x = 0;
		servant_mask.y = GameConfig.stageHeigth - this.container.y - bottom.height - 140;
		this.addChildToContainer(servant_mask);

		this.addChildToContainer(this._dropDownContainer);
		if (!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkOpenBanish() || (Api.unlocklist2VoApi.checkShowOpenFunc() && (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebanish") || Api.unlocklist2VoApi.checkNeedShowByName("wifebanish"))))
		{
			this._banishBtn = ComponentManager.getButton("wifebanish_btn",null,this.banishHandle,this);
			this._banishBtn.x = GameConfig.stageWidth - this._banishBtn.width - 5;
			this._banishBtn.y = 95;
			this.addChild(this._banishBtn);
			if ( Api.wifeVoApi.getWifeNum() <= Config.BanishCfg.getNumNeed())
			{
				App.DisplayUtil.changeToGray(this._banishBtn);
			}
			else
			{
				if (LocalStorageManager.get(LocalStorageConst.LOCAL_BANISH_REDDOT+Api.playerVoApi.getPlayerID()) != "1" || Api.wifebanishVoApi.checkNpcMessage())
				{
					let redDotSp:BaseBitmap = BaseBitmap.create("public_dot2");
					redDotSp.setPosition(this._banishBtn.width-redDotSp.width-5,20);
					this._banishBtn.addChild(redDotSp);
					redDotSp.name = "reddot";
				}
			}
			if (Api.unlocklist2VoApi.checkShowOpenFunc() && Api.unlocklist2VoApi.checkNeedShowByName("wifebanish")){
				this._banishBtn.visible = false;
				// App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
				Api.unlocklist2VoApi.checkWaitingShowInFunc("wife", "wifebanish");
			}
			else{
				this._banishBtn.visible = true;
			}

		}

		if(Api.switchVoApi.checkOpenWifeBattle()){
			let group : BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			group.width = 158;
			group.height = 153;
			this.addChildToContainer(group);

			let shanzi = BaseBitmap.create(`wifebattleshanzi`);
			group.addChild(shanzi);

			if(Api.wifebattleVoApi.checkCanJoin()){
				App.DisplayUtil.changeToNormal(group);
				if(this.checkHaveBuff()){
					let clip = ComponentManager.getCustomMovieClip(`wifebattleicon`, 8);
					clip.width = 260;
					clip.height = 200;
					clip.blendMode = egret.BlendMode.ADD;
					clip.setPosition((group.width - clip.width)/2, (group.height - clip.height)/2);
					clip.playWithTime(-1);
					group.addChild(clip);
				}
			}
			else{
				App.DisplayUtil.changeToGray(group);
			}
			group.addTouchTap(()=>{
				if(Api.wifebattleVoApi.checkCanJoin()){
					ViewController.getInstance().openView(ViewConst.COMMON.WIFEBATTLEVIEW);
				}
				else{
					App.CommonUtil.showTip(Api.wifebattleVoApi.getLockedString());
				}
			}, this);
			this._wifebattle = group;

			if(Api.unlocklist2VoApi.checkShowOpenFunc()){
				if (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebattle")){
					group.visible = Api.playerVoApi.getPlayerLevel() >= 3;
				}
				else{
					group.visible = false;
				}
				if (Api.playerVoApi.getPlayerLevel() >= 3){
					Api.unlocklist2VoApi.checkWaitingShowInFunc("wife","wifebattle");
				}
			}
			else{
				group.visible = Api.playerVoApi.getPlayerLevel() >= 3;	
			}
			group.x = GameConfig.stageWidth - group.width - 15;
			group.y = GameConfig.stageHeigth - this.container.y - bottom.height - group.height;

		}
		this.checkRedPoint();
	}

	public dropDownBtnClickHandler(btnIdx:number){
		let tmpIdx = this._lastDropIdx;
		for (var index = 1; index < this._dropBtnList.length; index++) {
			this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
		}
		this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
		if (this._dropDownContainer.visible)
		{
			this._dropDownFlag.scaleY = 1;
			this._dropDownContainer.visible = false;
		}else
		{
			this._dropDownFlag.scaleY = -1;
			this._dropDownContainer.visible = true;
		}
		if (btnIdx > 0 )
		{
			this._dropDownBtn.setText("wife_dropTxt"+btnIdx);
			this._lastDropIdx = btnIdx;
		}

		if(tmpIdx == this._lastDropIdx)
		{
			return;
		}
		this.refreshSort(btnIdx);
		NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDWIIFESORT,{wsortId:this._lastDropIdx});	

		// let keys = Api.servantVoApi.getServantInfoIdListWithSort(btnIdx);
		//
		//NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT,{sortId:this._lastDropIdx});	
	}

	private refreshSort(btnIdx)
	{
		//排序数据，刷新列表
		this._wifeInfoVoList = this._wifVoApi.getWifeInfoVoList();
		let wifeList = new Array<WifeInfoVo>();
		wifeList.push(null);
		wifeList=wifeList.concat(this._wifeInfoVoList);
		let key = ``;
		switch(Number(btnIdx)){
			case 1:
				break;
			case 2:
				key = `intimacy`;
				break;
			case 3:
				key = `glamour`;
				break;
			case 4:
				key = `artistry`;
				break;
		}

		if(key != ""){
			wifeList.sort((a,b)=>{
				if(a && b){
					let isexcilea = Api.wifebanishVoApi.getIsWifeBanishing(a.id.toString());
					let isexcileb = Api.wifebanishVoApi.getIsWifeBanishing(b.id.toString());
					if(isexcilea && isexcileb){
						if(key != ``){
							return b[key] - a[key];
						}
						return -1;
					}
					else if(isexcilea){
						return 1;
					}
					else if(isexcileb){
						return -1;
					}
					else{
						if(key != ``){
							return b[key] - a[key];
						}
						return -1;
					}
				}
			});
		}
		
		wifeList.push(null);
		this._scrollList.refreshData(wifeList);	
	}

	private freshOpenFunc(evt:egret.Event):void{
		if (evt && evt.data){
			let key = evt.data.key;
			if (key == "wifebanish"){
				if (this._banishBtn){
					this._banishBtn.visible = true;
				}
			}
			else if (key == "wifebattle"){
				if (this._wifebattle){
					this._wifebattle.visible = true;
				}
			}
		}
	}

	private banishHandle():void
	{
		if (Api.wifeVoApi.getWifeNum() <= Config.BanishCfg.getNumNeed())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("banish_locked"));
			return;
		}

		if (!this._wifeBanish)
		{
			this.request(NetRequestConst.REQUEST_WIFE_GETWIFEBANISHMODEL,{});
		}
		else
		{
			this.banishHandleCallback();
		}

		if (this._guideBtn)
		{	
			if (!this._wifeBanish || this._isBanish)
			{
				this._guideBtn.visible = false;
			}
			else
			{
				this._guideBtn.visible = true;
			}
		}
	}

	private checkHaveBuff():boolean
	{
		let modelList:AcBaseVo[] = Api.acVoApi.getRanActives();
		for(let i in modelList){
			let unit = modelList[i];
			if(unit.atype == `22`){
				let t = unit.et - GameData.serverTime - 86400 * 1;
				if(t>0){
					return true;
				}
			}
		}
		return false;
	}

	private banishHandleCallback():void
	{
		if (!this._wifeBanish)
		{
			this._wifeBanish = new WifeBanish();
			this._wifeBanish.init();
			this._wifeBanish.y = this.container.y;

			this._backBtn = ComponentManager.getButton("wife_back_btn",null,this.banishHandle,this);
			this._backBtn.x = 10;
			this._backBtn.y = 160;
			this.addChild(this._backBtn);

			if (this._banishBtn.getChildByName("reddot"))
			{
				this._banishBtn.removeChild(this._banishBtn.getChildByName("reddot"));
				LocalStorageManager.set(LocalStorageConst.LOCAL_BANISH_REDDOT+Api.playerVoApi.getPlayerID(),"1")
			}
		}

		this._isBanish = !this._isBanish;

		if (this._isBanish)
		{
			this.addChildAt(this._wifeBanish,this.getChildIndex(this.container));
			this.removeChild(this.container);
			this._backBtn.visible = true;
			this._banishBtn.visible = false;
			// this.titleTF.text = LanguageManager.getlocal("banishViewTitle2");
			this.titleBmp.setRes("wifeviewtitle_banish");
			this.titleBmp.x = GameConfig.stageWidth/2-this.titleBmp.width/2;
		}
		else
		{
			this.addChildAt(this.container,this.getChildIndex(this._wifeBanish));
			this.removeChild(this._wifeBanish);

			this._backBtn.visible = false;
			this._banishBtn.visible = true;

			this._wifeInfoVoList = this._wifVoApi.getWifeInfoVoList();
			let wifeList = new Array<WifeInfoVo>();
			wifeList.push(null);
			wifeList=wifeList.concat(this._wifeInfoVoList);
			wifeList.push(null);
			this._scrollList.refreshData(wifeList);
			// this.titleTF.text = LanguageManager.getlocal("wifeViewTitle");
			this.titleBmp.setRes(this.getTitlePic());
			this.titleBmp.x = GameConfig.stageWidth/2-this.titleBmp.width/2;
		}
		if (this.titleTF)
		{
			this.titleTF.x = this.width/2 - this.titleTF.width/2;
		}
		
	}

	protected receiveData(data: { ret: boolean, data: any }): void
	{	
		
		if (data.ret) {
			this.banishHandleCallback();
			if (data.data.data.wifeIds && data.data.data.wifeIds.length > 0)
			{	
				let wifeStr:string="";

				let wifeIds = data.data.data.wifeIds;
				for (let k in wifeIds)
				{
					if (wifeStr!="")
					{
						wifeStr+="、";
					}
					let cfg = Config.WifeCfg.getWifeCfgById(wifeIds[k]);
					wifeStr += cfg.name;
				}

				if (wifeIds.length>1)
				{	
					wifeStr = LanguageManager.getlocal("banishing_end_decs2",[wifeStr,String(wifeIds.length)]);
				}
				else
				{	
					wifeStr = LanguageManager.getlocal("banishing_end_decs",[wifeStr]);
				}

				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					"msg": wifeStr ,
					"needCancel":false,
					"title":"banishing_end",
					"callback":null,
					"handler":null,
				});
			}
		}
	}

	protected getResourceList():string[]
	{
		var _resArr:Array<string> = [
					"wifeview_namebg","wifeview_charmicon","common_select_frame","common_select_frame_down","common_arrow_1",
					"wifeview_vigoricon","wifeview_unlockmask","wife_listbg",`wifehome2`,
					"arena_bottom","wifehalfbg",`servantexiletiipbg`,'wifehalfbg2',`wifeview_artistryicon`,
					"servant_mask","wifeview_itembg","wifeview_lockbg","wifeview_itembg2","wifestatus_btn_down","wifestatus_btn"
					];
		if(Api.switchVoApi.checkIsInBlueWife()){
			_resArr.push("wifestatus_btn_male_down")
			_resArr.push("wifestatus_btn_male");
			_resArr.push("wifelookbtn_blueType_down")
			_resArr.push("wifelookbtn_blueType");
		}
		if(Api.switchVoApi.checkCloseText())
		{
			_resArr.push("wifelookbtn_hexie_down")
			_resArr.push("wifelookbtn_hexie");
		}
		else
		{
			_resArr.push("wifelookbtn_down")
			_resArr.push("wifelookbtn");
		}

		if (Api.switchVoApi.checkOpenBanish())
		{	
			_resArr.push("wifebanish_btn");
			_resArr.push("wifebanish_btn_down");
			_resArr.push("wifeviewtitle_banish");
			if ( Api.wifeVoApi.getWifeNum() > Config.BanishCfg.getNumNeed())
			{
				_resArr.push("wifebanish");
				_resArr.push("banish_house");
				_resArr.push("bookroom_tipbg");
				_resArr.push("forpeople_top");
				_resArr.push("wife_banishing_bg");
				_resArr.push("dinner_line");
				_resArr.push("wife_banishing_text");
			}
		}

		if (Api.switchVoApi.checkOpenWifeBattle())
		{	
			_resArr.push("wifebattlebottombg");
			_resArr.push("wifebattleflower1");
			_resArr.push("wifebattleflower2");
			_resArr.push("wifebattlenpc1");
			_resArr.push("wifebattlenpc2");
			_resArr.push("wifebattleshanzi");
			_resArr.push("wifebattletxt");
		}

		if (Api.switchVoApi.checkOpenBlueWife())
		{	
			_resArr.push("wifechangesex");
		}

		return super.getResourceList().concat(_resArr);
	}

	private unLockClick()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.WIFEUNLOCKVIEW)
	}

	private wifestatusClick()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW)
		this.hide();
	}

	private checkRedPoint(){
		//一键册封
		if(Api.wifestatusVoApi.getIsConfer())
		{
			if(this._redDotSp == null && this._wifeStatusBtn)
			{
				this._redDotSp = BaseBitmap.create("public_dot2");
				this._redDotSp.x = this._wifeStatusBtn.x + this._wifeStatusBtn.width - this._redDotSp.width -30;
				this._redDotSp.y = this._wifeStatusBtn.y +20;
				this.addChildToContainer(this._redDotSp);
			}
			else
			{
				if(this._redDotSp)
				{
					this._redDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._redDotSp)
			{
				this._redDotSp.visible = false;
			}
		}

		if(this._wifebattle){
			if(Api.playerVoApi.getPlayerLevel() >= 3){
				if (Api.unlocklist2VoApi.checkShowOpenFunc()){
					if (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebattle")){
						this._wifebattle.visible = true;
					}
					else{
						this._wifebattle.visible = false;
					}
				}
				else{
					this._wifebattle.visible = true;
				}
				if(Api.wifebattleVoApi.checkCanJoin()){
					App.DisplayUtil.changeToNormal(this._wifebattle);
					if(Api.wifebattleVoApi.checkNpcMessage()){
						App.CommonUtil.addIconToBDOC(this._wifebattle);
					}
					else{
						App.CommonUtil.removeIconFromBDOC(this._wifebattle);
					}
				}
				else{
					App.DisplayUtil.changeToGray(this._wifebattle)
				}
			}
			else{
				this._wifebattle.visible = false;
			}
		}
		
	}
	private selectHandler()
	{
		if(this._checkBox.checkSelected())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeBatchCallTip2"));
			this._callBtn.setText("wifeBatchTxt2");
		}else{
			this._callBtn.setText("callBtn");
		}
	}

	private autoMakeupCheck():void
	{
		if(this._autoMakeup.checkSelected())
		{
			LocalStorageManager.set(LocalStorageConst.LOCAL_WIFE_AUTO_MAKEUP+Api.playerVoApi.getPlayerID(),"true");
		}
		else
		{
			LocalStorageManager.set(LocalStorageConst.LOCAL_WIFE_AUTO_MAKEUP+Api.playerVoApi.getPlayerID(),"");
		}
	}

	
	private clickCallBtn(param:any):void
	{	
		if(WifeView.isMoveing){
			return;
		}
		Api.rookieVoApi.checkNextStep();
		// todo随机传唤
		if(this._wifVoApi.getEnergyNum() > 0)
		{
			let batchV = false
			if (this._checkBox && this._checkBox.checkSelected())
			{
				batchV = true;
			}
			NetManager.request(NetRequestConst.REQUEST_WIFE_CALL,{autoFlag:batchV});
		}
		else
		{
			let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(GameConfig.config.wifebaseCfg.needItem));
			if(itemInfoVo && itemInfoVo.num > 0)
			{
				let message:string = LanguageManager.getlocal("useItemMsg",[itemInfoVo.name + "x1",LanguageManager.getlocal("vigorDesc")]);
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{confirmCallback:this.confirmCallbackHandler,handler:this,icon:itemInfoVo.icon,iconBg:itemInfoVo.iconBg,num:itemInfoVo.num,msg:message, id : Number(GameConfig.config.wifebaseCfg.needItem), useNum:1});
			}
			else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("vigorNumNoEnoughMsg"));
			}
		}
	}

	private confirmCallbackHandler():void
	{
		if(WifeView.isMoveing){
			return;
		}
		NetManager.request(NetRequestConst.REQUEST_WIFE_RECOVERENERGY,null);
	}

	// private clickItemHandler(event:egret.TouchEvent):void
	// {
	// 	let index:number = Number(event.data);
	// 	let wifeInfoVo = this._wifeInfoVoList[index];
	// 	let id = wifeInfoVo.id;
	// 	// todo打开宠幸妻妾界面
	// 	ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{id,handler:this});

	// 	SoundManager.stopEffect(SoundConst.EFFECT_WIFE);

	// 	this._selectWifeId = id;

	// }

	
	// 随机传唤后端返回数据后
	private callWifeCallback(event:egret.Event):void
	{
		if(!event.data.ret){
			return;
		}
		let rdata = event.data.data.data;
		this._loveData = rdata;
		this.tick();
		this.checkAutoMakeup();
		this.refreshSort(this._lastDropIdx);
		//一键传唤
		if (this._checkBox && this._checkBox.checkSelected())
		{
			let autoCallWife = rdata.autoCallWife;
			if(this._autoMakeup && this._autoMakeup.checkSelected()){
				//勾选了一键补充
				let rewardsShowArr = [];
				for(let i = 0; i < autoCallWife.length; ++ i){
					let unit = autoCallWife[i];
					let wifeid = unit[0];
					let num = unit[1];
					let isbless = unit[2];

					let wifecfg = Config.WifeCfg.getWifeCfgById(wifeid);
					rewardsShowArr.push(LanguageManager.getlocal(`wifeCallTip${isbless ? 2 : 1}`, [wifecfg.name, num]));
				}
				if(this._tipSar.length<=0)
				{ 
					this._tipSar=this._tipSar.concat(rewardsShowArr); 
					this.playRewardTip();
				}
				else
				{
					this._tipSar=this._tipSar.concat(rewardsShowArr);
				} 
			}
			else{
				ViewController.getInstance().openView(ViewConst.BASE.WIFECALLBATCHSUCCESSVIEW,[autoCallWife])
			}
			// ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW,[rdata.servantArr,this._lastUseNum,this._selectedItemInfoVo.name])
			
			return 
		}

		let id = this._loveData.callWife[0];
		if (Api.rookieVoApi.isEnRookie())
		{	
			ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW,{id:id});
			return;
		}


		if(rdata.lucky)
		{
			TimerManager.doTimer(2000,1,this.showLucky,this);
		}

		
		this._scrollList.addEventListener(egret.Event.COMPLETE,this.moveComplete,this);
		this.container.touchChildren = false;

		let index = this.getWifeIndexVoById(id);

		WifeView.isMoveing = true;

		this._scrollIndex = index;

		this._scrollList.setScrollTopByIndex(index,500);

		let wideItem = <WifeScrollItem1>this._scrollList.getItemByIndex(index);
		
		wideItem.refreshData(id);

		if(rdata.rewards)
		{
			this._rewardData = rdata.rewards;
			// let rewards= GameData.formatRewardItem(rdata.rewards);
			// if(rewards&&rewards.length>0)
			// {
			// 	App.CommonUtil.playRewardFlyAction(rewards);
			// }
		}
	}

	private getWifeIndexVoById(wifeId):number{
		let view = this;
		let idx = 0;
		let list : any = view._scrollList;
		for(let i in list._dataList){
			let unit = list._dataList[i];
			if(unit && Number(unit.id) === Number(wifeId)){
				idx = Number(i);
			}
		}
		return idx;
	}

	private refreshItem(p:any){

		if(!p.data.ret){
			return;
		}

		if (p.data.ret == true && p.data.data.data.lucky) {
			this.showLucky();
		}

		this.refreshSort(this._lastDropIdx);
		let index = this.getWifeIndexVoById(WifeView.wifeId);
		let wideItem = <WifeScrollItem1>this._scrollList.getItemByIndex(index);
		if(wideItem && WifeView.wifeId){
			wideItem.refreshData(WifeView.wifeId);
		}
		// 问候不补充
		// this.checkAutoMakeup();
	}

	// 列表滑动结束后
	private moveComplete(event:egret.Event):void
	{
		this.container.touchChildren = true;
		this._scrollList.removeEventListener(egret.Event.COMPLETE,this.moveComplete,this);

		let posX = this._scrollList.getItemByIndex(this._scrollIndex).x;
		let posY = this._scrollList.getItemByIndex(this._scrollIndex).y;

		var targetPoint: egret.Point = this._scrollList.getItemByIndex(this._scrollIndex).localToGlobal(0,0);
	

		// 播放召唤动画，更新数据
		let index:number = Number(event.data);
		let wifeInfoVo = this._wifeInfoVoList[index];
		let id = this._loveData.callWife[0];

		let childData:any = null;
			if(this._loveData.childArr.length > 0){
				childData = this._loveData.childArr[0]
			} 
		// if(this._rewardData)
		// {
		// 	let rewards= GameData.formatRewardItem(this._rewardData);
		// 	if(rewards&&rewards.length>0)
		// 	{
		// 		App.CommonUtil.playRewardFlyAction(rewards);
		// 	}
		// }
		ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW,{id:id,type:1,x:targetPoint.x,y:targetPoint.y,childData:childData,rewards:this._rewardData});
		
	}

	private showLucky():void
	{
		App.CommonUtil.showGodbless("wife");
	}

	// 使用精力丹后端返回数据后
	private recoverEnergyCallback(event:egret.Event) 
	{
		if(!event.data.ret){
			return;
		}
		let rdata = event.data.data.data;
		this.tick();
	}

	public tick():void
	{
		if(this._vigorNumTF == null)
		{
			return;
		}
		if(this._wifVoApi.getEnergyNum() > 0)
		{
			this._callBtn.visible = true;
			this._recoverBtn.visible = false;
			this._vigorNumTF.text = this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum();
		}
		else
		{	
			this._callBtn.visible = false;
			this._recoverBtn.visible = true;
			this._vigorNumTF.text = App.DateUtil.getFormatBySecond(this._wifVoApi.getRecoverEnergyTime(),1);			
		}
		if (this._wifeBanish)
		{
			this._wifeBanish.tick();
		}
	}

	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["wifeViewTab1Title",
	// 			"wifeViewTab2Title"
	// 	];
	// }

	private checkAutoMakeup():void
	{
		if (this._autoMakeup && this._autoMakeup.checkSelected() && this._wifVoApi.getEnergyNum() <= 0)
		{	
			if (Api.itemVoApi.getItemNumInfoVoById(Number(GameConfig.config.wifebaseCfg.needItem))>0)
			{
				this.confirmCallbackHandler();
			}
			else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("vigorNumNoEnoughMsg"));
			}
		}
	}

	private doGuide()
	{
		this.hide();
	}
	protected getRuleInfo():string
	{
		if (!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkOpenBanish() || (Api.unlocklist2VoApi.checkShowOpenFunc() && (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebanish") || Api.unlocklist2VoApi.checkNeedShowByName("wifebanish"))))
		{
			return "wife_description_with_banish";
		}
		else
		{
			return "wife_description";
		}
	}

	protected getExtraRuleInfo():string
    {   
		let params:string[] = [];
		if (!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkOpenBanish() || (Api.unlocklist2VoApi.checkShowOpenFunc() && (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebanish") || Api.unlocklist2VoApi.checkNeedShowByName("wifebanish"))))
        {
           params.push(LanguageManager.getlocal("wife_descriptionPart1"));
        }
        else
        {
            params.push("");
        }
		if ( Api.switchVoApi.checkWifeExpExchangeOpen())
        {
           params.push(LanguageManager.getlocal("wife_descriptionPart2"));
        }
        else
        {
            params.push("");
        }
		if ( Api.switchVoApi.checkOpenBlueWife())
        {
           params.push(LanguageManager.getlocal("wife_descriptionPart3"));
        }
        else
        {
            params.push("");
        }
		if ( Api.switchVoApi.checkOpenWifeBattle())
        {
		   params.push(LanguageManager.getlocal("wife_descriptionPart4"));
		   params.push(LanguageManager.getlocal("wife_descriptionPart5"));
        }
        else
        {
			params.push("");
			params.push("");
        }

		if ( Api.switchVoApi.checkOpenWifeExSkill())
        {
           params.push(LanguageManager.getlocal("wife_descriptionPart6"));
        }
        else
        {
            params.push("");
        }

        return LanguageManager.getlocal("wife_descriptionSpell2",params);
    }

	public hide():void
	{
		if(Api.rookieVoApi.isInGuiding && !Api.rookieVoApi.isGuiding){
			return;
		}
		if(Api.rookieVoApi.isInGuiding){
			// Api.rookieVoApi.checkWaitingGuide();
			Api.rookieVoApi.checkNextStep();
		}
		
		super.hide();
	}

	private setSexCallback(event : egret.Event):void{
		if(!event.data.ret){
			return;
		}
		let index = this.getWifeIndexVoById(WifeView.wifeId);
		let wideItem = <WifeScrollItem1>this._scrollList.getItemByIndex(index);
		if(wideItem && WifeView.wifeId){
			wideItem.refreshData(WifeView.wifeId);
		}
	}

	//一键传唤
	private _tipTipTimeOut:number=-1;
	private _tipMask:BaseBitmap;
	private _tipSar = [];
	private playRewardTip():void
	{
		if(!this._tipMask)
		{
			this._tipMask = BaseBitmap.create("public_9_bg8");
			this._tipMask.width=GameConfig.stageWidth;
			this._tipMask.height=GameConfig.stageHeigth;
			this._tipMask.alpha=0;
			this._tipMask.touchEnabled=false; 
			LayerManager.msgLayer.addChild(this._tipMask);
		}
		//一键寻访奖励飘字
		// let strArr:string[]=this.ar;
		let offY:number=70;
		let tipContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		let tipBg:BaseBitmap=BaseBitmap.create("public_itemtipbg2");
		tipContainer.addChild(tipBg);
		this.tipContainerArr.push(tipContainer);

		let tipTxt:BaseTextField=ComponentManager.getTextField(this._tipSar.shift(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		tipBg.width=tipBg.width+tipTxt.width;
		tipTxt.setPosition((tipBg.width-tipTxt.width)/2,(tipBg.height-tipTxt.height)/2);
		tipContainer.addChild(tipTxt);

		tipContainer.setPosition((GameConfig.stageWidth-tipContainer.width)/2,(GameConfig.stageHeigth-tipContainer.height)/2+offY);
		console.log(tipContainer.y);
		LayerManager.msgLayer.addChild(tipContainer);
		if(this._tipMask["count"]==null)
		{
			this._tipMask["count"]=0;
		}
		else{
			tipContainer.y -= 9;
		}
		this._tipMask["count"]++;
		let ths=this;
		egret.Tween.get(tipContainer).to({y:tipContainer.y-offY*2},1000).call(function(tipContainer:BaseDisplayObjectContainer){
			if(tipContainer)
			{
				tipContainer.dispose();
			}
			if(ths._tipMask)
			{
				ths._tipMask["count"]--;
				if(!ths._tipMask["count"])
				{
					BaseBitmap.release(ths._tipMask);
					ths._tipMask=null;

					// let rData = Api.wifeVoApi.getWaitShowWife();
					// if(rData)
					// { 	
					// 	ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
					// } 
				}
			}
		},this,[tipContainer]);
		if(this._tipTipTimeOut<0)
		{
			this._tipTipTimeOut=egret.setInterval(this.playRewardTip,this,300,this._tipSar);
		}
		if(this._tipSar.length<1)
		{
			if(this._tipTipTimeOut>-1)
			{
				egret.clearInterval(this._tipTipTimeOut);
				this._tipTipTimeOut=-1;
			}
		}
	}


	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFESTATUS,this.checkRedPoint,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO,this.checkRedPoint,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL),this.callWifeCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY),this.recoverEnergyCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshItem,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshItem,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE),this.refreshItem,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.refreshItem,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.setSexCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
		if(this._scrollList)
		{
			this._scrollList = null;
		}

		if(this._wifeInfoVoList)
		{
			this._wifeInfoVoList = null;
		}
		if(this._vigorNumTF)
		{
			this._vigorNumTF = null;
		}
		if(this._wifVoApi)
		{
			this._wifVoApi = null;
		}
		this._redDotSp = null;
		this._loveData = null;
		WifeView.wifeId = null;
		WifeView.isMoveing = false;
		this._rewardData = null;
		this._wifeStatusBtn = null;
		this._checkBox = null;
		this._banishBtn = null;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
		this._isBanish = false;
		this._backBtn = null;
		this.container.dispose();
		if (this._wifeBanish)
		{	
			this._wifeBanish.dispose();
			this._wifeBanish = null;
		}
		this._autoMakeup = null;
		this._wifebattle = null;
		Api.mainTaskVoApi.isKeepGuide = false;
		Api.mainTaskVoApi.hideGuide();
		this._lastDropIdx = 1;

		if(this.tipContainerArr&&this.tipContainerArr.length>0)
		{
			for(let i:number=0;i<this.tipContainerArr.length; i++)
			{
				let tipObj = this.tipContainerArr[i];
				egret.Tween.removeTweens(tipObj);
				tipObj.dispose();
				tipObj = null;
				if(i==this.tipContainerArr.length-1)
				{
					egret.clearInterval(this._tipTipTimeOut);
					this._tipTipTimeOut=-1;
					this._tipSar =[]; 
					this._tipMask = null;
				}
			}	 
		}
		super.dispose();
	}
}