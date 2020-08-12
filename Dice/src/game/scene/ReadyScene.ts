class ReadyScene extends BaseScene
{
	private _MyCardTabName = `MyCardTeamType`;
	private _mycardgroup : BaseDisplayObjectContainer = null;
	private _teamid = 1;

	// 需要刷新数据的UI
	// user info
	private inviteRedPiont:BaseBitmap;
	private menuRedPiont:BaseBitmap;
	private userName:BaseTextField;
	private trideName:BaseTextField;
	private infoCapNum:BaseTextField;

	// task
	private taskBtn:BaseButton;
	private taskNumBg:BaseBitmap;
	private taskNum:BaseTextField;
	private taskProgress:ProgressBar;
	private taskNum1:BaseTextField;
	private taskNumBg1:BaseBitmap;

	// war order
	private _warOrder = null;
	private warOrderNum:BaseTextField;
	private warProgress:ProgressBar;
	private warCrown:BaseBitmap;
	private warHaveBuyGroup:BaseDisplayObjectContainer;
	private warRewardGroup:BaseDisplayObjectContainer;
	private _isBegin : boolean = false;
	private huangguan:CustomMovieClip = null;
	private freegetall:BaseBitmap = null;
	private warbox: BaseBitmap = null;
	private getall: BaseBitmap = null;
	private tiao: CustomMovieClip = null;
	private waritem:BaseDisplayObjectContainer = null;

	// battle
	private battle:BaseDisplayObjectContainer = null;
	private pveBtnTxt: BaseTextField;
	private pveBtn: BaseButton;
	private pveTip:any = {};
	private bossIcon:BaseLoadBitmap = null;
	private bossTile:BaseBitmap = null;
	private tileName:BaseTextField = null;
	private lastBossIndex = 0;
	private bossTab:TabBarGroup = null;
	private sNum: number = 0;
	private laseCardNum:number = 0;
	private wacthad1:BaseButton = null;
	private huo:CustomMovieClip = null;

	public pvpBtn: BaseButton;
	
	private dtime1:number = 600;
	private dtime2:number = 3000;
	private _taskdbArr:BaseLoadDragonBones[]=[];
	private _extendtip:ExtendTip = null;

	// 首冲入口
	private firstRecEnterBtn: BaseButton;
	private firstRecEnterBtnLight: BaseLoadBitmap;
	private firstRecEnterBtnLabel: BaseLoadBitmap;

	public dispose():void{
		let view = this;
		egret.Tween.removeTweens(this.warbox);
		console.log(new Date());
		view._teamid = 1;
		view._mycardgroup = null;
		this.tiao = null;
		this.waritem = null;
		this.freegetall = null;
		this.getall = null;
		this.warbox = null;
		this.huo = null;
		this.huangguan = null;
		this.battle = null;
		this.laseCardNum = 0;
		this.lastBossIndex = 0;
		this.wacthad1 = null;
		this.taskNum1 = null;
		this.taskNumBg1 = null;
		this.sNum = 0;
		this.bossTab = null;
		this.tileName = null;
		this.bossIcon = null;
		this.bossTile = null;
		this.warOrderNum = null;
		this.warProgress = null;
		this.inviteRedPiont = null;
		this.menuRedPiont = null;
		this.trideName = null;
		this.userName = null;
		this.infoCapNum = null;
		this.taskBtn = null;
		this.taskNumBg = null;
		this.taskNum = null;
		this.taskProgress = null;
		this.pveBtnTxt = null;
		this.pvpBtn = null;
		this.pveTip = null;
		this.pveBtn = null;
		this.warCrown = null;
		this.warHaveBuyGroup = null;
		view.warRewardGroup = null;
		view._isBegin = false;
		view._warOrder = null;
		for(let i in view._taskdbArr){
            let unit = view._taskdbArr[i];
            if(unit){
                unit.dispose();
                unit = null;
            }
        }
		view._taskdbArr = null;
		this._extendtip = null;
		this.firstRecEnterBtn = null;
		this.firstRecEnterBtnLabel = null;
		this.firstRecEnterBtnLight = null;
		view._findTime = 0;
        if(view._findTimeCount!=-1)
		{
			egret.clearTimeout(view._findTimeCount);
			view._findTimeCount=-1;
		}
        view._findNum = 1;
		super.dispose();
	}

	public constructor()
	{
		super();
	}


	private _battleType:number=0;
	protected init():void
	{
		super.init();
		this.name = `ReadyScene`;
		let view = this;
		view.width = GameConfig.stageWidth;
		this.nameInfoView(view);
		//协同宝箱部分
		let task =  view.taskView();

		// 任务部分
		let taskBtn = ComponentMgr.getButton("ab_task_icon_bg", "", ()=>{
			ViewController.getInstance().openView(ViewConst.TASK_POPUPVIEW, {});
		}, this);
		this.addChild(taskBtn);
		taskBtn.x = task.x + task.width;
		taskBtn.y = task.y + 1;
		let icon = BaseBitmap.create("real_task_icon");
		taskBtn.addChild(icon);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, icon, taskBtn, [0,0]);
		icon.y = -13;
		let txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
		txt.stroke = 2;
		txt.strokeColor = ColorEnums.black;
		taskBtn.addChild(txt);
		txt.text = LangMger.getlocal("readytask");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, txt, taskBtn, [0,0]);
		txt.y = 75;
		let redbg = BaseBitmap.create("public_reward_tip_bg");
		redbg.x = -9;
		redbg.y = -4;
		taskBtn.addChild(redbg);
		this.taskNumBg1 = redbg;

		let resNum = ComponentMgr.getTextField("1", TextFieldConst.SIZE_20, ColorEnums.white, false);
		resNum.width = redbg.width;
		resNum.textAlign = egret.HorizontalAlign.CENTER;
		resNum.x = redbg.x;
		resNum.y = redbg.y + (redbg.height - resNum.height) / 2;
		resNum.stroke = 1;
		//resNum.strokeColor = 
		taskBtn.addChild(resNum);
		this.taskNum1 = resNum;
		
		// 战令部分
		let warOrder = view.warOrderView();
		warOrder.anchorOffsetX = warOrder.width / 2;
		warOrder.anchorOffsetY = warOrder.height / 2;
		warOrder.x = taskBtn.x + task.width + warOrder.anchorOffsetX;
		warOrder.y = taskBtn.y + warOrder.anchorOffsetY;
		view.addChild(warOrder);
		view._warOrder = warOrder;

		//选取卡组部分
		let group =  view.createCardGroup();


		let autoX = GameConfig.stageHeigth - group.y - group.height - 117;
		autoX = autoX / 2;

		let battle = view.battleView();
		battle.x = 0;
		battle.y = group.y + group.height + autoX - battle.height / 2;
		view.addChild(battle);
		view.refresh();

		let tab = Api.LineVoApi.getCurLine() - 1;
		if(tab){
			view.clickTabbarHandler({index : tab, no : true}); 
			view.selectedTabIndex = tab;
			view.tabbarGroup.selectedIndex = tab;
		}
		this.refreshFirstRecBtn();
		// this.openNoticePopupView();

     	//弹出每日签到
		if(Api.SwitchVoApi.checkOpenSign()){
			if(Api.GameinfoVoApi.getIsFinishNewGuide()){
				if (!Api.SigninfoVoApi.gethasSign()) {
					this.freshSignRedPiont();
					ViewController.getInstance().openView(ViewConst.SINGINPOPUPVIEW, {})
				} 
			}
			return;
		}
		
	}

	/**
	 * 打开公告
	 */
	private openNoticePopupView() {
		let isDaliy: boolean = true;
		let __isDaliyTip:number = parseInt(App.CommonUtil.getLocalStorageWithUid(LocalStorageConst.LOCAL_NOTICE_NOT_TIP));
		if (!__isDaliyTip) {
			isDaliy = false
		} else {
			let _now: number = Math.floor(new Date().getTime() / 1000);
			isDaliy = App.DateUtil.isSameDay(_now, __isDaliyTip);
		}

		if (!isDaliy) {
			ViewController.getInstance().openView(ViewConst.NOTICEPOPUPVIEW, {})
		}
	}

	private openSignView():void
	{
		if(Api.GameinfoVoApi.getIsFinishNewGuide()&&Api.SwitchVoApi.checkOpenSign())
		{
			this.freshSignRedPiont();
			if (!Api.SigninfoVoApi.gethasSign()) {
				ViewController.getInstance().openView(ViewConst.SINGINPOPUPVIEW, {})
			} 
		}
	}
	protected getMsgConstEventArr():string[]{
		return [
			MsgConst.MODEL_USERINFO, MsgConst.MODEL_DAILYTASK, MsgConst.MODEL_GAMEINFO, MsgConst.MODEL_MYMAIL, MsgConst.FLY_EFFECT, MsgConst.FINISH_GUIDE_BUBBLE, 
			MsgConst.MODEL_SIGNINFO, `loadtoshowddddd`, MsgConst.MODEL_INVITEFRIEND, MsgConst.MODEL_ACHIEVEMENT
		];
	}

	protected getNetConstEventArr():string[]{
		return [
			NetConst.USER_OPENCARDBOX, NetConst.ADVERTISE_WATCH,NetConst.SIGNINFO_SIGN,NetConst.BATTLE_FIND
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
			case MsgConst.MODEL_USERINFO:
			case MsgConst.MODEL_GAMEINFO:
				view.refresh();
				break;
			case MsgConst.MODEL_INVITEFRIEND:
				view.redPiont();
				break;
			case MsgConst.MODEL_DAILYTASK:
			case MsgConst.MODEL_ACHIEVEMENT:
				view.freshTask();
				break;
			case MsgConst.MODEL_MYMAIL:
				view.freshMailRedPiont();
				break;
			case MsgConst.FLY_EFFECT:
				view.playeffect();
				break;
			case MsgConst.FINISH_GUIDE_BUBBLE:
				view.openSignView();
				view.guidebubble();
				break;
			case MsgConst.MODEL_SIGNINFO:
				view.refreshFirstRecBtn();
				break;
			case `loadtoshowddddd`:
				view.shownn();
				break;
			default:
				break;
		}
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
			case NetConst.USER_OPENCARDBOX:
				view.openCardBox(evt);
				break;
			case NetConst.ADVERTISE_WATCH:
				view.wacthAdsuccess(evt);
				break;
			case NetConst.SIGNINFO_SIGN:
				view.freshSignRedPiont();
				break;
			case NetConst.BATTLE_FIND:
				view.findResult(evt);
				break;
			default:
				break;
		}
	}

	private findResult(e:egret.Event):void{
		if(Api.GameinfoVoApi.checlIsInGuideId(1)){
			let isSuccess:boolean=false;
			//type 1对战 2协同
			let type = 1;
			let rdata=e.data;
			if(rdata.ret){
				let result = rdata.data.data.matchFlag;
				if(result){
					if(result == 1){
						if(rdata.data.data.randSeed){
							BattleStatus.randSeed = rdata.data.data.randSeed;
						}
						if(type == 2){
							Api.UserinfoVoApi.setFreshCard(false);
						}
						isSuccess=true;
						if(Api.GameinfoVoApi.checlIsInGuideId(1)){
							App.CommonUtil.sendNewGuideId(1);
							Api.GameinfoVoApi.setCurGudingId(2);
							App.MsgHelper.removeEvt(NetConst.BATTLE_FIND, this.findResult, this);
						}
						Api.BattleVoApi.startBattle(type+'');
					}
					else if(result == 2){
						isSuccess=true;
						App.CommonUtil.showTip(LangMger.getlocal(`warcreateroomtip8`));
					}
				}
			}
			if(!isSuccess){
				let t=egret.getTimer()-this._findTime;
				if(t>=980){
					this.find();
				}
				else{
					this._findTimeCount = egret.setTimeout(this.find,this,1000-t);
				}
			}	
		}
    }

	private guidebubble():void{
		//最高等级是2级以下账号，在对战模式和协作模式那里，出间歇性文字气泡
		let maxScore = Api.UserinfoVoApi.getMaxScore();
		let needScore = Config.LevelCfg.getLevelNeedScore(2);
		if(maxScore <= needScore && Api.GameinfoVoApi.getIsFinishNewGuide()){
			let left = true;
			egret.Tween.get(this, {loop : true}).wait(5000).call(()=>{
				maxScore = Api.UserinfoVoApi.getMaxScore();
				if(maxScore <= needScore){
					let btn = left ? this.pvpBtn : this.pveBtn;
					let point = new egret.Point(btn.localToGlobal().x + btn.width/2 + (left? -40 : 0), btn.localToGlobal().y - 20);
					let exttip = new ExtendTip(`ready_bubble`);//ready_bubble
					exttip.init(LangMger.getlocal(`readybattletip${left?1:2}`), point, false, 300, egret.HorizontalAlign.CENTER, 3000);
					if(left){
						exttip.bg.scaleX = 1;
						exttip.bg.x = 0;	
					} else {
						exttip.bg.scaleX = -1;
						exttip.bg.x = exttip.bg.width;
					}
					this.addChild(exttip);
					left = !left;
				}
				else{
					egret.Tween.removeTweens(this);
				}

				let hand = <BaseBitmap>this.battle.getChildByName(`hand`);
				if(Api.UserinfoVoApi.getSumb()<4){
					if(!hand){
						hand = BaseBitmap.create(`guide_hand`);
						hand.touchEnabled = false;
						hand.name = `hand`;
						this.battle.addChild(hand);
						hand.setPosition(this.pvpBtn.x + this.pvpBtn.width/2, this.pvpBtn.y + this.pvpBtn.height/2 -20);
						egret.Tween.get(hand,{loop:true})
						.to({scaleX: 0.9,scaleY:0.9}, 500)
						.to({scaleX: 1,scaleY:1}, 500)
					}
				}
				else{
					if(hand){
						hand.dispose();
						hand = null;
					}
				}
			}).wait(5000);
		}
	}

	private warOrderHandler(event:egret.TouchEvent):void{
		let view = this;
		switch(event.type){
			case egret.TouchEvent.TOUCH_BEGIN:
				view._isBegin = true;
				view.scaleState();
				SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
				break;
			case egret.TouchEvent.TOUCH_END:
				if(view._isBegin){
					view._isBegin = false;
					view.scaleState();
					ViewController.getInstance().openView(ViewConst.ROYALPASSVIEW, {});
				}
				break;
			case egret.TouchEvent.TOUCH_CANCEL:
				view._isBegin = false;
				view.scaleState();
				break;
		}
	}

	private scaleState():void{
		let view = this;
		let lastScaleX:number=view.scaleX;
		let lastScaleY:number=view.scaleY;
		if(view._isBegin == true)
		{
			view._warOrder.scaleX*=0.9;
			view._warOrder.scaleY*=0.9;

		}
		else
		{
			view._warOrder.scaleX /=0.9;
			view._warOrder.scaleY /=0.9;
		}
		// view._warOrder.x+=(view._warOrder.width*lastScaleX-view._warOrder.width*view._warOrder.scaleX)/2;
		// view._warOrder.y+=(view._warOrder.height*lastScaleY-view._warOrder.height*view._warOrder.scaleY)/2;
	}

	// tick 处理
	protected tick(){
		this.sNum++;
		if(this.sNum >=5){
			this.lastBossIndex ++;
			this.lastBossIndex = this.lastBossIndex % Config.MonsterCfg.getBossNum();
			this.bossTabOnclick({index:this.lastBossIndex});
		}
		if(!PlatMgr.checkIsIOSShenheSp() && this.wacthad1){
			if(!Api.GameinfoVoApi.getIsGuiding()){
				this.wacthad1.visible = Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3) && !Api.GameinfoVoApi.getADhuo();
				this.wacthad1.setGray(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3));
				// Api.AdvertiseVoApi.setPlayHuo(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3));
				this.huo.visible = Api.GameinfoVoApi.getADhuo();
			} else {
				this.wacthad1.visible = false;
			}
		}
		if(this.pveTip["dtime"]){
			this.pveTip["dtime"].text = `${App.DateUtil.getFormatBySecond(Api.ShopVoApi.getTodayRefresLimitTime())}`;
		}
		if(this.pveTip["wacthAD"]){
			this.pveTip["wacthAD"].visible = true && Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_4) && (Api.GameinfoVoApi.getOperationNum() <= 0);
			this.pveTip["wacthAD"].setGray(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_4));
		}
	}

	// 播放动效
	private playeffect() {
		Api.UserinfoVoApi.setFreshCard(true);
		App.CommonUtil.showCollectEffect(`task_power`, new egret.Point(320, 567), new egret.Point(60,200),()=>{
			this.freshTask();
		});
		
	}

	// 刷新整个界面
	private refresh(){
		if(this.userName){
			this.userName.text = Api.UserinfoVoApi.getName();
			this.redPiont();
		}
		if(this.trideName){
			this.trideName.text = (Api.UserinfoVoApi.getMygname() == "") ? LangMger.getlocal("readyscene_no_tribe") : Api.UserinfoVoApi.getMygname();
		}
		if(this.infoCapNum){
			this.infoCapNum.text = App.StringUtil.formatIntToStringWith3figure(Api.UserinfoVoApi.getScore() , 3);
		}
		this.freshTask();

		if(this.warProgress){
			let score = Api.UserinfoVoApi.getScore();
			let curid = Config.RoyalpassCfg.getNowProgressId(score);
			let prevNeed = Config.RoyalpassCfg.getPrevNeedByScore(score);
			let nextNeed =  Api.GameinfoVoApi.getRoyalFirstNotReward(Api.UserinfoVoApi.getMaxScore());// Config.RoyalpassCfg.getNextNeedByScore(score);
			let maxlevel = !nextNeed;
			let isgetall = Api.GameinfoVoApi.isGetAllRoyalPassReard();
			let isgetRoyalpass = Api.GameinfoVoApi.getIsBuyRoyalPass();

			let str = ``;
			let per = 0;
			if(isgetall || maxlevel){
				str = `${score}/${nextNeed}`;
				if(isgetall){
					this.tiao.visible = this.warProgress.visible = this.warbox.visible = false;
					this.freegetall.visible = !isgetRoyalpass;
					this.waritem.visible = !isgetRoyalpass;
					this.getall.visible = isgetRoyalpass;
					// this.warProgress.setText(LangMger.getlocal(isgetRoyalpass ? `royalpassgetall` : `royalpassgmore`));
					// this.warProgress.setTextSize(TextFieldConst.SIZE_18);
				}
				per = 1;
			}
			else{
				this.tiao.visible = this.warProgress.visible = this.warbox.visible = true;
				this.waritem.visible = true;
				this.freegetall.visible = false;
				this.getall.visible = false;
				str = `${score}/${nextNeed}`;
            	per =  score/nextNeed;
				// str = `${score - prevNeed}/${nextNeed - prevNeed}`;
				// per =  score >= prevNeed ? ((score - prevNeed)/(nextNeed - prevNeed)) : 0;
				this.warProgress.setText(``);
			}
			this.warOrderNum.text = str;
			this.warProgress.setPercentage(per);
			
			
			this.warHaveBuyGroup.visible = isgetRoyalpass;
			this.huangguan.visible = this.warCrown.visible = !this.warHaveBuyGroup.visible;
			this.warRewardGroup.visible = Api.GameinfoVoApi.checkRedPoint();
			if(Api.GameinfoVoApi.checkRedPoint()){
				// 第一下 0.1秒从0向左16度 然后0.1秒向右摆30度，然后0.1秒向左摆26度，然后0.2秒向右摆20度，然后0.2秒向左摆15度，然后0.2秒向右摆10度，然后用0.2秒向左摆5度回到0.
				egret.Tween.get(this.warbox, {loop: true})
				.to({rotation: 16}, 100)
				.to({rotation: -14},100)
				.to({rotation: 12}, 100)
				.to({rotation: -8}, 200)
				.to({rotation: 7}, 200)
				.to({rotation: -3}, 200)
				.to({rotation: 0}, 200)
				.wait(200);
			} else {
				egret.Tween.removeTweens(this.warbox);
			}
		}

		if(this.pveBtnTxt){
			this.pveBtnTxt.text = `${Api.GameinfoVoApi.getOperationNum()}/${Config.TogetherCfg.getOperationMaxNum()}`;
			if(Api.GameinfoVoApi.getOperationNum() > 0){
				this.pveTip["pvp2"].visible = false;
				this.pveTip["wacthAD"].visible = false;
				this.pveBtnTxt.setColor(ColorEnums.white);
				this.pveBtnTxt.strokeColor = ColorEnums.strokeBlue;
			// } else if (!Api.GameinfoVoApi.getIsBuyAssitance()) {
			// 	this.pveBtnTxt.setColor(ColorEnums.red2);
			// 	this.pveBtnTxt.strokeColor = ColorEnums.white;
			// 	this.pveTip["tipIcon"].texture = ResMgr.getRes("shopassisticon");
			// 	this.pveTip["tipTxt"].text = LangMger.getlocal("opration_better");
			// 	this.pveTip["mask_op"].visible = true;
			// 	this.pveTip["tipIcon"].visible = true;
			// 	this.pveTip["tipTxt"].visible = true;
			// 	this.pveTip["wacthAD"].visible = false;
			// 	this.pveTip["tipIcon"].scaleX = this.pveTip["tipIcon"].scaleY = 0.7;
			// 	App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this.pveTip["tipIcon"], this.pveTip["mask_op"], [0,0]);
			// 	App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, this.pveTip["tipTxt"], this.pveTip["mask_op"], [0,0]);
			// 	this.pveTip["tipTxt"].x = this.pveTip["tipIcon"].x + this.pveTip["tipIcon"].width * 0.7;
			} else {
				this.pveBtnTxt.setColor(ColorEnums.red2);
				this.pveBtnTxt.strokeColor = ColorEnums.white;
				this.pveTip["dtime"].text = `${App.DateUtil.getFormatBySecond(Api.ShopVoApi.getTodayRefresLimitTime())}`
				this.pveTip["pvp2"].visible = true;
				this.pveTip["wacthAD"].visible = true && Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_4);
				this.pveTip["wacthAD"].setGray(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_4));

				if(PlatMgr.checkIsIOSShenheSp())
				{
					this.pveTip["wacthAD"].visible = false;
				}
			}
		}

		if(this.tileName){
			this.tileName.text = LangMger.getlocal(`dice_battle_skin_title_${Api.LineVoApi.getCurSkin()}`);
		}
		if(this.wacthad1){
			if(Api.GameinfoVoApi.getIsGuiding()){
				this.wacthad1.visible = false;
			} else {
				this.wacthad1.visible = Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3) && !Api.GameinfoVoApi.getADhuo();
				this.wacthad1.setGray(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3));
				this.battle.setChildIndex(this.wacthad1, this.battle.getChildIndex(this.pvpBtn) + 1);
				this.huo.visible = Api.GameinfoVoApi.getADhuo();

				//IOS提审时不显示广告按钮
				if(PlatMgr.checkIsIOSShenheSp())
				{
					this.wacthad1.visible = false;
				}
			}
			// this.wacthad1.visible = Api.GameinfoVoApi.getIsGuiding();	
		}
	}

	// 协同宝箱刷新
	private freshTask(){
		if(!Api.UserinfoVoApi.getFreshCard()){
			return
		}
		let boxnum = Api.UserinfoVoApi.getCardBox(); //  Api.UserinfoVoApi.getCardBox() +
		if(this.taskNum ){
			if(boxnum > 0){
				this.taskNum.text = String((boxnum > 99) ? 99 : boxnum);;
				// this.taskBtn.setBtnBitMap("task_yellow");
				this.taskNum.visible = true;
				this.taskNumBg.visible = true;
				for(let i in this._taskdbArr){
					let unit = this._taskdbArr[i];
					if(unit){
						unit.visible = true;
					}
				}
			} else {
				this.taskBtn.setBtnBitMap("ab_task_icon_bg");
				this.taskNum.visible = false;
				this.taskNumBg.visible = false;
				for(let i in this._taskdbArr){
					let unit = this._taskdbArr[i];
					if(unit){
						unit.visible = false;
					}
				}
			}
		}
		if(this.taskProgress){
			let curcap = Api.UserinfoVoApi.getPorgressInfo().curCard;
			curcap = (curcap > 999)?999 : curcap;
			let view = this;

			if(curcap > 99 || Api.UserinfoVoApi.getPorgressInfo().needcard > 99)
			{
				view.taskProgress.setTextSize(TextFieldConst.SIZE_20);
			}
			else
			{
				view.taskProgress.setTextSize(TextFieldConst.SIZE_24);
			}
			if(Api.UserinfoVoApi.getStatus() == 1){
				this.laseCardNum = curcap;
				this.taskProgress.setPercentage(Api.UserinfoVoApi.getPorgressInfo().por, `${curcap}/${Api.UserinfoVoApi.getPorgressInfo().needcard}`);
				Api.UserinfoVoApi.setStatus(2);
			} else {
				App.CommonUtil.changeNumTween(this.laseCardNum > curcap ? 0 : this.laseCardNum, curcap, 500, (num)=>{
					view.taskProgress.setText(`${num}/${Api.UserinfoVoApi.getPorgressInfo().needcard}`);
				});
				let por = this.taskProgress.getPercent();
				if(por > Api.UserinfoVoApi.getPorgressInfo().por){
					this.taskProgress.setPercentage(0);
				}
				this.taskProgress.tweenTo(Api.UserinfoVoApi.getPorgressInfo().por, 1500, null, ()=>{
					this.taskProgress.setPercentage(Api.UserinfoVoApi.getPorgressInfo().por);
				}, this);
				// this.taskProgress.setPercentage(Api.UserinfoVoApi.getPorgressInfo().por);
				this.laseCardNum = curcap;
			}
		}
		if(this.taskNum1){
			let tasknum = Api.DailytaskVoApi.getDailyBox() + Api.AchievementVoApi.getAchCanRewardNum();
			if(tasknum > 0){
				this.taskNum1.text = String((tasknum > 99) ? 99 : tasknum);
				// this.taskBtn.setBtnBitMap("task_yellow");
				this.taskNum1.visible = true;
				this.taskNumBg1.visible = true;
			} else {
				this.taskNum1.visible = false;
				this.taskNumBg1.visible = false;
			}
		}
	}

	// 刷新邮件红点
	private freshMailRedPiont(){
		this.menuRedPiont.visible = Api.MymailVoApi.hasUnreadMail();
		Api.RedpointVoApi.setRedPointStatus("mymail", Api.MymailVoApi.hasUnreadMail());
	}

	private redPiont(){
		this.inviteRedPiont.visible = Api.InviteFriendVoApi.checkRedPoint();
		this.menuRedPiont.visible = Api.RedpointVoApi.checkRedPoint("mysign") ||  Api.RedpointVoApi.checkRedPoint("mymail");
	}

	// 刷新签到红点
	private freshSignRedPiont(){
		if(Api.SwitchVoApi.checkOpenSign()){
			if(Api.GameinfoVoApi.getIsFinishNewGuide()){
				this.menuRedPiont.visible = Api.SigninfoVoApi.getSignHsa();
				Api.RedpointVoApi.setRedPointStatus("mysign", Api.SigninfoVoApi.getSignHsa());
			}
			return;
		}
	}


	private nameInfoView(view:any):void{
		// view 容器
		let nameView:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		nameView.width = GameConfig.stageWidth - 10;
		nameView.x = 5;
		nameView.y = 80;
		view.addChild(nameView);

		let userInfoBtn = ComponentMgr.getButton("ab_userinfo_bg", "", this.infoOnclickHandler, this);
		nameView.addChild(userInfoBtn);
		userInfoBtn.x = 0;
		userInfoBtn.y = 0;
		// userInfoBtn.setBtnSize(480, 71);
		
		let tribe = BaseBitmap.create("ab_tribe_icon");
		userInfoBtn.addChild(tribe);
		tribe.x = 20;
		tribe.y = 7;
		
		let txtcon = new BaseDisplayObjectContainer();
		txtcon.x = tribe.x + tribe.width + 20;
		txtcon.height = userInfoBtn.height;
		
		txtcon.y = 0;
		userInfoBtn.addChild(txtcon);
		// 名字
		let nameText = ComponentMgr.getTextField("这是玩家名字", TextFieldConst.SIZE_20, ColorEnums.white);
		nameText.x = 0;
		nameText.y =  9;//(tribe.height / 2 - nameText.height) / 2 + 2;
		nameText.bold = true;
		txtcon.addChild(nameText);
		this.userName = nameText;

		// 公会
		let levelText = ComponentMgr.getTextField("Lv.999", TextFieldConst.SIZE_20, ColorEnums.white);
		levelText.x = nameText.x;
		levelText.y = 40;//userInfoBtn.height / 2 + ( userInfoBtn.height / 2 - levelText.height) / 2 - 3;
		txtcon.addChild(levelText);
		levelText.bold = true;
		this.trideName = levelText;

		txtcon.width = userInfoBtn.width / 2;

		//杯数
		let capTextBg = BaseBitmap.create("ab_cap_num_bg");
		capTextBg.width = 92;
		capTextBg.height = 27;
		userInfoBtn.addChild(capTextBg);
		capTextBg.y = 22;//(userInfoBtn.height - capTextBg.height) / 2 - 2;
		capTextBg.x = 266;//userInfoBtn.width - capTextBg.width - 10;
		
		let cap = BaseBitmap.create("trophy_icon");
		cap.setScale(0.42);
		cap.x = 247;//capTextBg.x + capTextBg.width - cap.width * cap.scaleX- 5;
		cap.y = 13;//userInfoBtn.y + (userInfoBtn.height - cap.height * cap.scaleY) / 2;
		userInfoBtn.addChild(cap);

		let capTxt:BaseTextField = ComponentMgr.getTextField("1", TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.white);
		capTxt.width = capTextBg.width;
		capTxt.x = capTextBg.x + 5;
		capTxt.y = capTextBg.y + 1;
		capTxt.textAlign = egret.HorizontalAlign.CENTER;
		userInfoBtn.addChild(capTxt);
		this.infoCapNum = capTxt;

		let mailBtn = ComponentMgr.getButton("ab_btn_icon_bg", "", this.inviteBtnClickHandler, this);
		mailBtn.x = userInfoBtn.x + userInfoBtn.width + 24;
		mailBtn.y = userInfoBtn.y;
		nameView.addChild(mailBtn);

		let mailIcon = BaseBitmap.create("ab_inviteicon");
		if(!Api.SwitchVoApi.checkOpenInviteFriend())
		{
			App.DisplayUtil.changeToGray(mailIcon);
		}
		mailBtn.addChild(mailIcon);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mailIcon, mailBtn, [0,-5]);

		this.inviteRedPiont = BaseBitmap.create("red_point");
		mailBtn.addChild(this.inviteRedPiont);
		this.inviteRedPiont.x = mailIcon.x + mailIcon.width - this.inviteRedPiont.width;
		this.inviteRedPiont.y = -8;
		this.inviteRedPiont.visible = Api.InviteFriendVoApi.checkRedPoint();

		let mailtxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendTab1"), TextFieldConst.SIZE_24, ColorEnums.white);
		mailBtn.addChild(mailtxt);
		mailtxt.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, mailtxt, mailBtn, [0,10]);

		let menuBtn = ComponentMgr.getButton("ab_btn_icon_bg", "", this.settingBtnClickHandler, this);
		menuBtn.x = mailBtn.x + mailBtn.width + 19;
		menuBtn.y = userInfoBtn.y;
		nameView.addChild(menuBtn);

		let menuIcon = BaseBitmap.create("ab_settingicon");
		menuBtn.addChild(menuIcon);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, menuIcon, menuBtn, [0,-5]);
		
		this.menuRedPiont = BaseBitmap.create("red_point");
		menuBtn.addChild(this.menuRedPiont);
		this.menuRedPiont.x = menuIcon.x + menuIcon.width - this.menuRedPiont.width;
		this.menuRedPiont.y = -8;
		this.menuRedPiont.visible = false;
		
		let menutxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_32, ColorEnums.white);
		menuBtn.addChild(menutxt);
		menutxt.width = menuBtn.width;
		menutxt.textAlign = egret.HorizontalAlign.CENTER;
		menutxt.text = LangMger.getlocal("readyscene_menu");
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, menutxt, menuBtn, [0,10]);
	}

	// 创建首冲按钮
	private createFirstRecBtn(isRew: boolean = false) {
		let view = this;
		if (!this.firstRecEnterBtn) {
			this.firstRecEnterBtn = ComponentMgr.getButton("firstrec_enter_icon", "", this.onFirstRecTap, this);
			view.addChild(this.firstRecEnterBtn);
			this.firstRecEnterBtn.anchorOffsetX = 39;
			this.firstRecEnterBtn.anchorOffsetY = 44;
			this.firstRecEnterBtn.x = 55;
			if (this._mycardgroup) {
				this.firstRecEnterBtn.y = this._mycardgroup.y + this._mycardgroup.height + 64;
			} else {
				this.firstRecEnterBtn.y = GameConfig.stageHeigth * 0.6 - 60;
			}
			this.firstRecEnterBtnLabel = BaseLoadBitmap.create('firstrec_enter_label');
			view.addChild(this.firstRecEnterBtnLabel);
			this.firstRecEnterBtnLabel.x = this.firstRecEnterBtn.x - 29;
			this.firstRecEnterBtnLabel.y = this.firstRecEnterBtn.y + 36;
		}

		egret.Tween.removeTweens(this.firstRecEnterBtn);

		if (isRew) {
			if (!this.firstRecEnterBtnLight) {
				this.firstRecEnterBtnLight = BaseLoadBitmap.create("firstrec_enter_light");
				this.firstRecEnterBtn.addChild(this.firstRecEnterBtnLight);
				this.firstRecEnterBtnLight.x = -15;
				this.firstRecEnterBtnLight.y = -18;
				
				egret.Tween
				.get(this.firstRecEnterBtnLight, {loop: true})
				.to({alpha: 0}, 2000)
				.to({alpha: 1}, 2000)
			}

			egret.Tween
			.get(this.firstRecEnterBtn, {loop: true})
			.to({rotation: 30}, 50)
			.to({rotation: -30}, 100)
			.to({rotation: 30}, 100)
			.to({rotation: -30}, 100)
			.to({rotation: 30}, 100)
			.to({rotation: -30}, 100)
			.to({rotation: 0}, 50)
			.wait(1000)
		} else {
			egret.Tween
			.get(this.firstRecEnterBtn, {loop: true})
			.to({rotation: 30}, 50)
			.to({rotation: -30}, 100)
			.to({rotation: 30}, 100)
			.to({rotation: -30}, 100)
			.to({rotation: 30}, 100)
			.to({rotation: -30}, 100)
			.to({rotation: 0}, 50)
			.wait(5000)
		}
	}

	// 隐藏首冲按钮
	private hideFirstRecBtn() {
		if (this.firstRecEnterBtnLight) {
			this.firstRecEnterBtnLight.dispose();
			this.firstRecEnterBtnLight = null;
		}
		if (this.firstRecEnterBtn) {
			this.firstRecEnterBtnLabel.dispose();
			this.firstRecEnterBtnLabel = null;
			this.firstRecEnterBtn.dispose();
			this.firstRecEnterBtn = null;
		}
	}

	private onFirstRecTap() {
		ViewController.getInstance().openView(ViewConst.FIRSTRECPOPUPVIEW, {});
	}

	// 刷新首冲按钮状态
	private refreshFirstRecBtn() {
		if (!Api.SwitchVoApi.checkOpenFirstRecharge()) {
			this.hideFirstRecBtn();
			return;
		}
		const __status = Api.SigninfoVoApi.isFirstRecharge();
		switch (__status) {
			case 0:
				this.createFirstRecBtn(false);
				break;
			case 1:
				this.createFirstRecBtn(true);
				break;
			default:
				this.hideFirstRecBtn();
				break;
		}
	}

	private taskView(){
		// task 主容器
		let taskBtn = ComponentMgr.getButton("ab_task_icon_bg", "", ()=>{
			ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
				title : LangMger.getlocal("boxname_1006"),
				handler : this,
				needCancel : false,
				callback : ()=>{
					if(Api.UserinfoVoApi.getCardBox() >= 1){
						Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
						NetManager.request(NetConst.USER_OPENCARDBOX, {});
					} else {
						App.CommonUtil.showTip(LangMger.getlocal("syspowerNotEnough"));
					}
				},
				needClose : 1,
				boxId : "1006",
				isbuy : false,
				// costIcon : `ab_mainui_gem`,
				// costNum : data.costGem,
				// clickNotAutoHide: true,
			});   
			if(Api.GameinfoVoApi.checlIsInStepId(31)){
				App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
			}
		}, this);
		this.addChild(taskBtn);
		taskBtn.x = 15;
		taskBtn.y = 165;
		this.taskBtn = taskBtn;

		let scale = 0.4;
		// let box:BaseLoadBitmap = BaseLoadBitmap.create(res);
		let box:BaseBitmap = BaseBitmap.create("ab_task_icon");
		// box.width = 266;
		// box.height = 194;
		// box.x = 0 + (taskBtn.width - box.width * scale) / 2;
		box.y = -8;
		box.x = 0;
		taskBtn.addChild(box);

		
		if(App.CommonUtil.check_dragon()){
			let tasklight = App.DragonBonesUtil.getLoadDragonBones(`royalpass_klj_1`);
			taskBtn.addChild(tasklight);
			tasklight.blendMode = egret.BlendMode.ADD;
			this._taskdbArr.push(tasklight);
			tasklight.x = 61;
			tasklight.y = 63;
		};

		let redbg = BaseBitmap.create("public_reward_tip_bg");
		redbg.x = -9;
		redbg.y = -4;
		taskBtn.addChild(redbg);
		this.taskNumBg = redbg;

		let resNum = ComponentMgr.getTextField("1", TextFieldConst.SIZE_20, ColorEnums.white, false);
		resNum.width = redbg.width;
		resNum.stroke = 1;
		resNum.textAlign = egret.HorizontalAlign.CENTER;
		resNum.x = redbg.x;
		resNum.y = redbg.y + (redbg.height - resNum.height) / 2;
		taskBtn.addChild(resNum);
		this.taskNum = resNum;

		let progress = ComponentMgr.getProgressBar("ab_task_bar","ab_task_progress", taskBtn.width - 20);
		progress.x = 4;
		progress.y = 73;//79 + (46 - progress.height) / 2 - 3;
		taskBtn.addChild(progress);
		this.taskProgress = progress;
		progress.setPercentage(0);

		let energyIcon = BaseBitmap.create("task_power");
		energyIcon.x = -3;
		energyIcon.y = 72;
		energyIcon.setScale(0.8);
		taskBtn.addChild(energyIcon);
		return taskBtn;
	}

	private warOrderView(){
		let warOrder = new BaseDisplayObjectContainer();
		warOrder.width = 470;
		warOrder.height = 117;
		let warOrderBg = BaseBitmap.create("ab_war_bg");
		warOrder.addChild(warOrderBg);
		warOrderBg.addTouch(this.warOrderHandler, this);

		let all = new BaseDisplayObjectContainer();
		warOrder.addChild(all);
		this.waritem = all;

		let cap = BaseBitmap.create("trophy_icon");
		cap.setScale(0.42);
		warOrder.addChild(cap);
		cap.x = 10;
		cap.y = 11;

		let bigBird = BaseBitmap.create("ab_war_order_icon");
		all.addChild(bigBird);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, bigBird, warOrderBg, [7,0]);

		let txt = ComponentMgr.getTextField("1", TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.white);
		txt.x = cap.x + cap.width * cap.scaleX;
		txt.y = cap.y + (cap.height * cap.scaleX - txt.height) / 2;
		warOrder.addChild(txt);
		this.warOrderNum = txt;

		let progress = ComponentMgr.getProgressBar("ab_readyscene_war_progress","war_order_bar", 203);
		progress.setProgressMode();
		progress.x = cap.x;
		progress.y = warOrderBg.height / 2 + (warOrderBg.height / 2 - progress.height) / 2 - 5;
		all.addChild(progress);
		this.warProgress = progress;

		let freegetall = BaseBitmap.create("freegetallreward");
		warOrder.addChild(freegetall);
		freegetall.x = progress.x;
		freegetall.y = progress.y - 10;
		freegetall.visible = false;
		this.freegetall = freegetall;

		let getall = BaseBitmap.create("royalgetall");
		warOrder.addChild(getall);
		getall.x = 80;
		getall.y = 54;
		getall.visible = false;
		this.getall = getall;

		let tiao= ComponentMgr.getCustomMovieClip("tiao",10);
		tiao.blendMode = egret.BlendMode.ADD;
		tiao.playWithTime(0);
		all.addChild(tiao);
		tiao.x = progress.x - 10;
		tiao.y = progress.y - 9;
		this.tiao = tiao;

		let box = BaseBitmap.create("ab_task_icon");
		box.name = "warbox";
		box.anchorOffsetX = box.width / 2;
		box.anchorOffsetY = box.height / 2;
		box.rotation = 0
		this.warbox = box;
		all.addChild(box);
		box.setScale(0.5);
		box.setPosition(progress.x + progress.width, progress.y + progress.height / 2);

		let titlebit = BaseBitmap.create("royalreadyname");
		all.addChild(titlebit);
		titlebit.setScale(0.8);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, titlebit, bigBird, [0,0]);
		titlebit.y = 10;

		let crown = BaseBitmap.create("crown");
		all.addChild(crown);
		crown.setScale(0.8);
		this.warCrown = crown;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, crown, titlebit, [0,0]);
		crown.y = 39;

		let huangguan= ComponentMgr.getCustomMovieClip("huangguan",10, 100);
		huangguan.blendMode = egret.BlendMode.ADD;
		huangguan.playWithTime(0);
		all.addChild(huangguan);
		huangguan.x = crown.x - 10;
		huangguan.y = crown.y - 10;
		this.huangguan = huangguan;

		let group = new BaseDisplayObjectContainer();
		all.addChild(group);
		this.warHaveBuyGroup = group;

		let haveTxt = ComponentMgr.getTextField(LangMger.getlocal(`royalpasshaveget`), TextFieldConst.SIZE_28, 0xFFEF43);
		haveTxt.stroke = 2;
		haveTxt.strokeColor = 0x892300;
		group.addChild(haveTxt);
		haveTxt.width = bigBird.width;
		haveTxt.textAlign = egret.HorizontalAlign.CENTER;
		
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, crown, [0,0]);

		let rewardGroup = new BaseDisplayObjectContainer();
		warOrder.addChild(rewardGroup);
		rewardGroup.width = 309;
		rewardGroup.height = 125;
		this.warRewardGroup = rewardGroup;
		rewardGroup.touchEnabled = false;

		// let rewardbg = BaseBitmap.create(`war_order_bg2`);
		// rewardGroup.addChild(rewardbg);

		if(App.CommonUtil.check_dragon()){
			let tasklight = App.DragonBonesUtil.getLoadDragonBones(`royalpass_klj_3`);
			tasklight.touchEnabled = false;
			rewardGroup.addChild(tasklight);
			tasklight.blendMode = egret.BlendMode.ADD;
			tasklight.x = 150;
			tasklight.y = 55;
		}
	
		// let getTxt = ComponentMgr.getTextField(LangMger.getlocal(`royalpasscanget`), TextFieldConst.SIZE_18, 0x4FFF42);
		// getTxt.stroke = 2;
		// getTxt.strokeColor = 0;
		// rewardGroup.addChild(getTxt);
		// getTxt.setPosition(180, 20);
		let getTip = BaseBitmap.create("readyscenecanrewardtip");
		rewardGroup.addChild(getTip);
		getTip.setPosition(166, 14);	
		return warOrder;
	}
	// 战场的东西
	private battleView(){
		let battle = new BaseDisplayObjectContainer();
		battle.width = GameConfig.stageWidth;
		this.battle = battle;

		let bg = BaseBitmap.create("ab_boss_bg");
		bg.x = (battle.width - bg.width) / 2;
		battle.addChild(bg);

		let boss_tile = BaseBitmap.create("ab_boss_tile_bg");
		battle.addChild(boss_tile);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, boss_tile, bg, [0,10]);


		let bossIcon = BaseLoadBitmap.create("boss_icon_1001");
		battle.addChild(bossIcon);
		bossIcon.setScale(0.82);
		this.bossIcon = bossIcon;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bossIcon, boss_tile, [0,25]);

		let title = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
		battle.addChild(title);
		title.width = boss_tile.width - 118;
		title.textAlign = egret.HorizontalAlign.CENTER; 
		title.text = LangMger.getlocal(`dice_battle_skin_title_${Api.LineVoApi.getCurSkin()}`);
		title.x = boss_tile.x + (boss_tile.width - title.width) / 2;
		title.y = boss_tile.y + 36;
		title.stroke = 1.5;
		this.tileName = title;

		let ruleBtn = ComponentMgr.getButton("ab_public_rulebtn", "", this.ruleBtnOnclick, this);
		battle.addChild(ruleBtn);
		ruleBtn.x = title.x + title.width;
		ruleBtn.y = boss_tile.y + 32;

		// boss 下面的小按钮
		let bossArr = Config.MonsterCfg.getBossKeys();
		let tem:string[] = [];

		for (let index = 0; index < bossArr.length; index++) {
			tem[index] = "";
		}
		
		let bossTab = ComponentMgr.getTabBarGroup("boss_tab_btn", tem,this.bossTabOnclick,this, bossArr);
		battle.addChild(bossTab);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bossTab, bg, [0,- bossTab.height - 10]);
		this.bossTab = bossTab;

		let pveBtn=ComponentMgr.getButton("ab_readyscene_fight_btn","",this.clickHandler,this,[1]);
		pveBtn.setPosition(60, bg.height + 60);
		battle.addChild(pveBtn);
		pveBtn.name = `pveBtn`;
		this.pvpBtn = pveBtn;
		pveBtn.setBtnTouchOnbg();

		let huo= ComponentMgr.getCustomMovieClip("huo",10, 80);
		huo.playWithTime(0);
		pveBtn.addChild(huo);
		huo.x = -54;
		huo.y = -76;
		huo.visible = false;
		this.huo = huo;

		let pveIcon = BaseBitmap.create("pvp_btn_icon");
		pveBtn.addChild(pveIcon);
		pveIcon.anchorOffsetY = pveIcon.height / 2;
		pveIcon.x = (pveBtn.width - pveIcon.width) / 2;
		pveIcon.y = 10;
		let pveTxt = ComponentMgr.getTextField(LangMger.getlocal("fight_model"),TextFieldConst.SIZE_40, ColorEnums.white);
		pveTxt.width = pveBtn.width;
		pveTxt.textAlign = egret.HorizontalAlign.CENTER;
		pveBtn.addChild(pveTxt);
		pveTxt.y = 55;//81 + (69 - pveTxt.height) / 2;
		pveTxt.strokeColor = ColorEnums.btnStrokeOrange;

		let pveAd = ComponentMgr.getButton("readywatchad1", "", this.wacthADOnclick, this, [AdConst.ADV_3]);
		battle.addChild(pveAd);
		pveAd.x = pveBtn.x - 26;
		pveAd.y = pveBtn.y - 42;
		pveAd.setGray(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3));
		pveAd.visible = false;
		this.wacthad1 = pveAd;

		// if(App.CommonUtil.check_dragon()){
		// 	let dz1 = App.DragonBonesUtil.getLoadDragonBones(`royalpass_dz_1`);
		// 	pveBtn.addChild(dz1);
		// 	dz1.setPosition(pveBtn.width/2,68);
		// 	dz1.blendMode = egret.BlendMode.ADD;

		// 	let dz2 = App.DragonBonesUtil.getLoadDragonBones(`royalpass_dz_2`);
		// 	pveBtn.addChild(dz2);
		// 	dz2.setPosition(pveBtn.width/2,26);
		// }

		let pvpBtn=ComponentMgr.getButton("ab_readyscene_operation_btn","",this.clickHandler,this,[2]);
		pvpBtn.setPosition(GameConfig.stageWidth-60-pvpBtn.width,pveBtn.y);
		battle.addChild(pvpBtn);
		let pvpIcon = BaseBitmap.create("pve_btn_icon");
		pvpBtn.addChild(pvpIcon);
		pvpIcon.anchorOffsetY = pvpIcon.height / 2;
		pvpIcon.x = (pvpBtn.width - pvpIcon.width) / 2;
		pvpIcon.y = 10;

		let pvpTxt = ComponentMgr.getTextField(LangMger.getlocal("operation_model_title",),
				TextFieldConst.SIZE_40, ColorEnums.white);

		pvpBtn.addChild(pvpTxt);
		pvpTxt.y = 55;//81 + (69 - pvpTxt.height) / 2;
		pvpTxt.strokeColor = ColorEnums.btnStrokeBlue;

		let pvpNumTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_40, ColorEnums.white);
		pvpBtn.addChild(pvpNumTxt);
		pvpNumTxt.width = pvpTxt.width;
		pvpNumTxt.textAlign = egret.HorizontalAlign.CENTER;
		pvpNumTxt.text = `${Api.GameinfoVoApi.getOperationNum()}/${Config.TogetherCfg.getOperationMaxNum()}`
		pvpNumTxt.y = pvpTxt.y + pvpTxt.height;
		pvpTxt.strokeColor = ColorEnums.btnStrokeBlue;
		
		pvpTxt.x = (pvpBtn.width - pvpTxt.width) / 2;
		pvpNumTxt.x = pvpTxt.x;
		
		let pvp2 = new BaseDisplayObjectContainer();
		pvpBtn.addChild(pvp2);
		// 提示购买协同次数
		let mask_op = BaseBitmap.create("watchadopmask");
		pvp2.addChild(mask_op);
		// mask_op.width = pvpBtn.width;
		// mask_op.alpha = 0.5
		// mask_op.height = 70;
		mask_op.x = 0;
		mask_op.y = -30;
		// mask_op.visible = false;
		// icon
		let tipIcon = BaseBitmap.create(`public_icon1`);
		pvp2.addChild(tipIcon);
		tipIcon.setPosition(74, 82);
		// tipIcon.visible = false;
		
		// 文字
		let tipTxt = ComponentMgr.getTextField(` ${Config.TogetherCfg.getNeedGem()}`, TextFieldConst.SIZE_22, ColorEnums.white);
		tipTxt.stroke = 2;
		pvp2.addChild(tipTxt);
		tipTxt.setPosition(110, 93);
		// tipTxt.visible = false;

		// 倒计时
		let dtime = ComponentMgr.getTextField('00:00:00', TextFieldConst.SIZE_22, ColorEnums.white);
		pvp2.addChild(dtime);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dtime, mask_op, [0,56]);
		// sb 文字提示
		let dtTip = ComponentMgr.getTextField(LangMger.getlocal("readypvptiponcd"), TextFieldConst.SIZE_22, ColorEnums.white);
		pvp2.addChild(dtTip);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, dtTip, mask_op, [0,0]);
		dtTip.y = dtime.y + dtime.height + 5; 

		// 观看广告按钮
		let wacthAD = ComponentMgr.getButton("readywatchad2", "", this.wacthADOnclick, this, [AdConst.ADV_4]);
		battle.addChild(wacthAD);
		wacthAD.x = pvpBtn.x + 153;
		wacthAD.y = pvpBtn.y - 42;
		wacthAD.visible = false;

		this.pveTip["pvp2"] = pvp2;
		this.pveTip["dtime"] = dtime;
		this.pveTip["wacthAD"] = wacthAD;

		this.pveBtnTxt = pvpNumTxt;
		this.pveBtn = pvpBtn;
		this.guidebubble();
		return battle;
	}

	private ruleBtnOnclick(param){
		ViewController.getInstance().openView(ViewConst.MONSTERINFOVIEW);
	}

	private bossTabOnclick(param){
		// 点击boss 下面的按钮的回调
		let bossKeys = Config.MonsterCfg.getBossKeys();
		let view = this;
		egret.Tween.removeTweens(this.bossIcon);
		let t = egret.Tween.get(this.bossIcon);
		t.to({alpha: 0}, this.dtime1)
		.call(()=>{
			this.bossIcon.setload(`boss_icon_${bossKeys[param['index']]}`, null,{
				callback:()=>{
					App.MsgHelper.dispEvt("loadtoshowddddd");
				},
				callbackThisObj:view
			});
			this.sNum = 0;
			this.lastBossIndex = param.index;
			// this.bossIcon.alpha = 0;
			this.bossTab.selectedIndex = this.lastBossIndex;
			egret.Tween.removeTweens(this.bossIcon);
		}, this)
		// .to({alpha: 1}, this.dtime2);
		// NOTE: 修改切换效果，透明度消失 100 => 60 消失, 出现 0 => 100;
	}

	private shownn(){
		this.bossIcon.alpha = 0;
		this.sNum = 0;
		let t = egret.Tween.get(this.bossIcon);
		t.to({alpha: 1}, this.dtime2)
		.call(()=>{
			this.sNum = 0;
			egret.Tween.removeTweens(this.bossIcon);
		});
	}

	private wacthADOnclick(param){
		
		let re = App.CommonUtil.watchAd(param);
	
	}

	private wacthAdsuccess(evt){
		// 看成功后的回调
		if(evt.data && evt.data.ret){
			let type = Api.AdvertiseVoApi.getAdtype();
			switch (type) {
				case AdConst.ADV_3:
					Api.AdvertiseVoApi.setPlayHuo(true);
					this.huo.visible = Api.GameinfoVoApi.getADhuo();
					this.wacthad1.visible = false;
					break;
				case AdConst.ADV_4:
					this.pveTip["wacthAD"].setGray(true);
					break;
				case AdConst.ADV_5:
					let rewards = evt.data.data.data.rewards;
					ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
						rewards : rewards,
						title : LangMger.getlocal(`sysGetReward`),
						isBoxBuy : false,//连续购买模式
						specialBoxId : "1007",
						handler : this,
						needCancel : true,
						closecallback : ()=>{
							App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
						},
					});
					break
				default:
					break;
			}
		}
	}

	private openCardBox(event){
		let data = event.data.data.data;
		let rewards = data.rewards;
        let ret = event.data.ret;
        if(ret){
            ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
				rewards : rewards,
				title : LangMger.getlocal(`sysGetReward`),
				isBoxBuy : false,//连续购买模式
				specialBoxId : "1006",
				handler : this,
				needCancel : true,
				closecallback : ()=>{
					App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
				},
			});
        }
    }

	private createCardGroup(){
		let view = this;
		let group = new BaseDisplayObjectContainer();
		group.width = 587;
		group.height = 254;
		view.addChild(group);
		view._mycardgroup = group;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, view, [0,300]);
				
		let card_bg = BaseBitmap.create(`ab_card_bg`);
		// card_bg.width = group.width;
		// card_bg.height = group.height;
		card_bg.setPosition(0, 60);
		group.addChild(card_bg);

		// let tabbg = BaseBitmap.create(`card_group_tab_bg`);
		// tabbg.width = 260;
		// tabbg.height = 36;
		// group.addChild(tabbg);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tabbg, card_bg, [0,20]);

		// view.setChildIndex(view.tabbarGroup, view.getChildIndex(group));
		view.changeTab(view._MyCardTabName);
		view.setTabBarPosition();
		return group;
	}

	protected initTabbarGroup():void{
		let view = this;
		let tabBarTextArr:string[]=view.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0){	
			view.tabbarGroup = ComponentMgr.getTabBarGroup(view.getTabbarName(),tabBarTextArr,view.clickTabbarHandler, view, null, '', 0, false, 235, 68);
			view.addChild(view.tabbarGroup);
			view.tabbarGroup.selectedIndex=this._selectedTabIndex;
			view.tabbarGroup.setColor(ColorEnums.white,ColorEnums.cardSel);
		}
	}

	protected getTabPos():{x:number,y:number}{
		let x = 0;
		let y = 0;
		if(this._mycardgroup){
			x = this._mycardgroup.x + 12;
			y = this._mycardgroup.y + 70;
		}

        return {
            x : x, 
            y : y
        }
    }
    
	protected clickTabbarHandler(data:any):void{
		let view = this;
		App.LogUtil.log("index: " + data.index);
		let index = Number(data.index);
		view.lastSelectedTabIndex = view.selectedTabIndex;
		view.selectedTabIndex = index;
		view._teamid = index + 1;
		if(!data.no){
			NetManager.request(NetConst.DICE_CHOOSELINE,{
				lineNo : view._teamid
			});
		}
		view.changeTab(view._MyCardTabName);
	}

	protected changeTab(name?:string):void{
		if(!name){
			name = this._MyCardTabName;
		} 
		let tabveiwClass:any = egret.getDefinitionByName(name + "Tab" + (this.selectedTabIndex+1));
		let pos = this.getTabPos();
		if(tabveiwClass)
		{
			let commViewTab:ViewTab=<ViewTab>this.tabViewData[this.selectedTabIndex];
			if(commViewTab)
			{
				commViewTab.setPosition(pos.x,pos.y);
				this.addChild(commViewTab);
				commViewTab.refreshWhenSwitchBack();
			}
			else
			{
				let tabView:ViewTab = new tabveiwClass();
				this.tabViewData[this.selectedTabIndex] = tabView;
				// tabView["param"]=this.param;
				
				tabView.setPosition(pos.x,pos.y);
				this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex] && this.lastSelectedTabIndex != this.selectedTabIndex)
			{
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
	}

	protected setTabBarPosition():void{
		let view = this;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view._mycardgroup, [0,16]);
		for(let i = 0; i < 3; ++ i){
			let tab = view.tabbarGroup.getTabBar(i);
			let txt:BaseTextField = <BaseTextField>tab.getChildByName("btnTxt");
			txt.width = 65; // 给的按钮图片有透明区，左右不对称
			txt.textAlign = egret.HorizontalAlign.CENTER;
			txt.bold = true;
			txt.setPosition(0, 10);
			// tab.setTextPos(26.5,10);
			// tab.setTextOffY(-15);
			tab.x = i * 80;
		}
	}

	protected getTabbarTextArr():Array<string>
	{
		return [`1`,`2`,`3`];
	}
	// 页签图名称
	protected getTabbarName():string|string[]
	{
		return `ab_tab_btn`;
	}

	protected inviteBtnClickHandler():void
	{
		if(Api.SwitchVoApi.checkOpenInviteFriend()){
			ViewController.getInstance().openView(ViewConst.INVITEFRIENDPOPUPVIEW);
		}
		else{
			App.CommonUtil.showTip(LangMger.getlocal(`mainui_inpro_des`));
		}
		
		//ViewController.getInstance().openView(ViewConst.MAILPOPUPVIEW);
	}

	protected settingBtnClickHandler():void
	{
		ViewController.getInstance().openView(ViewConst.MENUPOPUPVIEW, {});
	}

	protected infoOnclickHandler():void{
		ViewController.getInstance().openView(ViewConst.USERINFO_POPUPVIEW, {});
	}

	private clickHandler(battleType:number):void
	{
		this._battleType=battleType;
		let type = battleType;
		//1对战 2协同
		if(type == 1){
			// if(!this.pvpBtn.touchEnabled){
			// 	this.pvpBtn.touchEnabled = true;
			// 	App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
			// 	return;
			// }
			if(Api.GameinfoVoApi.checlIsInGuideId(1)){
				this.find();
				App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
				//App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
			}
			else{
				ViewController.getInstance().openView(ViewConst.WARCHOOSEPOPUPVIEW, {
					type : type
				});
			}
		} else {
			if(Api.GameinfoVoApi.getOperationNum() > 0){
				ViewController.getInstance().openView(ViewConst.WARCHOOSEPOPUPVIEW, {
					type : type
				});
			// } else if (!Api.GameinfoVoApi.getIsBuyAssitance()) {
			// 	App.MsgHelper.dispEvt(MsgConst.GOSHOP, {index:ShopConst.SHOP_SPECIALVIP_INDEX});
			} else {
				let costGem = Config.TogetherCfg.getNeedGem();
				if(Api.UserinfoVoApi.getGem() < Config.TogetherCfg.getNeedGem()){
					App.CommonUtil.gemNotEnough(1);
				} else {
					ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
						title : LangMger.getlocal("buy_operation_title"),
						msg : LangMger.getlocal("buy_operation_des", [String(costGem), String(Config.TogetherCfg.getOperationMaxNum())]),
						handler : this,
						needCancel : false,
						callback : ()=>{
							//发消息去买
							NetManager.request(NetConst.USER_RESETJNUM, {});
						},
						needClose: 1,
						confirmTxt: String(costGem),
						iconURL: `ab_mainui_gem`
					});
				}
			}
		}
	
	}

	private _findTime:number=0;
	private _findTimeCount:number=-1;
	private _findNum:number=1;
	private _end = false;

	private find():void{
        if(this._end){
           if(this._findTimeCount!=-1){
			    egret.clearTimeout(this._findTimeCount);
			    this._findTimeCount=-1;
		    }
            return;
        }
        //type 1对战 2协同
        let type = 1;
		if(this._findTimeCount!=-1)
		{
			egret.clearTimeout(this._findTimeCount);
			this._findTimeCount=-1;
		}
        this._findTime=egret.getTimer();
        
		NetManager.request(NetConst.BATTLE_FIND,{
            findType:type,
            findNum:this._findNum
        });
		this._findNum++;
	}

	protected getResourceList():string[]
	{//这里只能是空数组，配置资源
		return [];
	}

	protected refreshAfterShow(bool:boolean=false):void
	{
		super.refreshAfterShow(bool);
		this.lastSelectedTabIndex = -1;
		if(this.tabbarGroup){
			let tab = Api.LineVoApi.getCurLine() - 1;

			this.clickTabbarHandler({index : tab, no : true}); 
			this.selectedTabIndex = tab;
			this.tabbarGroup.selectedIndex = tab;
		}
		this.refresh();
		if(Api.GameinfoVoApi.checlIsInGuideId(16)){
			App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
		}
	}

	protected getBgName():string{
		return "public_ab_scenebg"
	}
}