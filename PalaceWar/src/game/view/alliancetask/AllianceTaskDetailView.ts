/**
 *帮会任务
 * author yanyuling
 * date 2018/07/23
 * @class AllianceTaskDetailView
 */
class AllianceTaskDetailView extends CommonView
{
	private _scrollView:ScrollList = null;
	private _taskId:string;
	private _scrolNode:BaseDisplayObjectContainer;
	private _serIdList = [];
	private _scrolItemList = [];
	private _isReversed:boolean = false;
	private _reSortBtn:BaseButton;
	private _progress:ProgressBar;
	private _bg:BaseLoadBitmap;
	private _isFighting:boolean = false;

	private _autoBattleBtn:BaseButton = null;
	private _autoBattleView:BattleAuto = null;

	public constructor() 
	{
		super();
	}

	public initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT),this.sendBtnHandlerCallBack,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_EXTRA),this.sendBtnHandlerCallBack,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_TASK_BUY_AND_SEND,this.sendAgainHandler , this);
		
		this._taskId = this.param.data.taskId;
		let taskcfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
		let bg = BaseLoadBitmap.create("allianceTask_pkbg" + this._taskId);
		bg.y = GameConfig.stageHeigth -this.container.y - 1136;
		this._bg = bg;
		this.addChildToContainer(bg);
		this.showTaskAni();

		this._progress = ComponentManager.getProgressBar("progress3","progress3_bg",550);
		this._progress.x = GameConfig.stageWidth/2 - this._progress.width/2 ;
		this._progress.y = 5;
		this._progress.setPercentage(0.5);
		this.addChildToContainer(this._progress);

		
		let buttombg = BaseBitmap.create("arena_bottom");
		buttombg.y = GameConfig.stageHeigth - buttombg.height - this.container.y;
		this.addChildToContainer(buttombg);

		let sendBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceTaskSendBtnTxt",this.sendBtnHandler,this);
		sendBtn.x = buttombg.x + buttombg.width/2 - sendBtn.width/2;
		sendBtn.y =  buttombg.y + buttombg.height/2 - sendBtn.height/2;
		this.addChildToContainer(sendBtn);
		
		let listbg = BaseBitmap.create("alliance_taskwotdbg3");
		listbg.height = 198;
		listbg.y = buttombg.y - listbg.height;
		this.addChildToContainer(listbg);

		let rankImgBg = BaseBitmap.create("alliance_iconbg");
		rankImgBg.x = 15;
		rankImgBg.y = listbg.y - rankImgBg.height - 10;;
		this.addChildToContainer(rankImgBg);

		let rankBtn = ComponentManager.getButton("allianc_rankicon","",this.rankBtnHandler,this);
		rankBtn.x = rankImgBg.x + rankImgBg.width/2 - rankBtn.width/2 -5;
		rankBtn.y = rankImgBg.y + rankImgBg.height/2 - rankBtn.height/2 -10 ;
		this.addChildToContainer(rankBtn);

		let imgName = BaseBitmap.create("alliance_rank");
		imgName.x = rankImgBg.x + rankImgBg.width/2 - imgName.width/2 ;
		imgName.y = rankImgBg.y + rankImgBg.height - imgName.height ;
		this.addChildToContainer(imgName);

		let attrbg = BaseBitmap.create("alliance_taskAttrbg1");
		attrbg.x = listbg.x + 5;
		attrbg.y = listbg.y + 5;
		this.addChildToContainer(attrbg);

		let taskProTxt = ComponentManager.getTextField("",18);
		let proTxt = LanguageManager.getlocal("servantInfo_speciality" + taskcfg.type);
		let limitlessTaskId = Api.allianceTaskVoApi.getLimitlessTaskId();
		if (limitlessTaskId == this._taskId){
			proTxt = LanguageManager.getlocal("servantInfo_speciality7");
		}
		taskProTxt.text = LanguageManager.getlocal("allianceTaskDetailNeedTxt",[proTxt])
		taskProTxt.x = attrbg.x + 10;
		taskProTxt.y = attrbg.y + attrbg.height/2 - taskProTxt.height/2;
		this.addChildToContainer(taskProTxt);

		let reSortBtn = ComponentManager.getButton("servant_dropBtn","allianceTaskSortBtnTxt2",this.reSortBtnHandler,this);
		reSortBtn.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		reSortBtn.setScale(0.8);
		reSortBtn.x = listbg.x + listbg.width - reSortBtn.width*0.8 - 3 ;
		reSortBtn.y = attrbg.y ;
		this.addChildToContainer(reSortBtn);
		this._reSortBtn = reSortBtn;

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth-10, listbg.height - 10);
		this._serIdList = Api.allianceTaskVoApi.getAllianceTaskServantList(this._taskId);
		Api.allianceTaskVoApi.setAllianceTaskSelectedServantId(this._serIdList[0]);
		this._scrolNode = new BaseDisplayObjectContainer();
		for (var index = 0; index < this._serIdList.length; index++) {
			let tmpNode = new AllianceTaskDetailScrollItem();
			tmpNode.initItem(this._serIdList[index],this._taskId);
			tmpNode.x = (tmpNode.width*tmpNode.scaleX  + 14) * index; //10
			tmpNode.y = 5;
			this._scrolNode.addChild(tmpNode);
			this._scrolItemList.push(tmpNode);
		}

		let tmpScro = ComponentManager.getScrollView(this._scrolNode,rect);
		tmpScro.verticalScrollPolicy = "off";
		tmpScro.x = 5;
		tmpScro.y = attrbg.y + attrbg.height + 2;
		this.addChildToContainer(tmpScro);
		this.refreshUiInfo();
		
		
		let autoBattleNeedVipLv:number = Config.VipCfg.getUnlockLvel("allianceTask");
		if (autoBattleNeedVipLv != null)
		{
			let posY:number = GameConfig.stageHeigth - 282;
			if (Api.playerVoApi.getPlayerVipLevel() < autoBattleNeedVipLv) 
			{
				let reachText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("autoBattleTip_AllianceQuest",[String(autoBattleNeedVipLv)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
				reachText.setPosition(GameConfig.stageWidth - reachText.width - 10,  posY-reachText.height-6);

				let blackBgRect: BaseBitmap = BaseBitmap.create("public_itemtipbg");
				blackBgRect.scaleX = -1;
				blackBgRect.width = reachText.width + 55;
				blackBgRect.height = 36;
				blackBgRect.x= GameConfig.stageWidth ;
				blackBgRect.y= reachText.y-7;
				this.addChild(blackBgRect);
				this.addChild(reachText);
			}
			else
			{
				this._autoBattleBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"autoBattle_AllianceQuest",this.autoBattleHandle,this);
				this._autoBattleBtn.setPosition(GameConfig.stageWidth-this._autoBattleBtn.width -6,posY-this._autoBattleBtn.height-6);
				this.addChild(this._autoBattleBtn);

				let serId = Api.allianceTaskVoApi.getAllianceTaskSelectedServantId();
				let pkt = Api.allianceVoApi.getAllianceTaskPKTimes(serId);
				if (pkt>0) {
					this._autoBattleBtn.visible = false;
				}
			}
		}
	}

	private autoBattleHandle():void
	{
		if (!this._autoBattleView)
		{	
			if (this.sendBtnHandler())
			{
				this._autoBattleBtn.visible = false;
				this._autoBattleView = new BattleAuto();
				this._autoBattleView.init(3,this.autoBattleCallback,this);
				LayerManager.maskLayer.addChild(this._autoBattleView);
			}
		}
	}

	private autoBattleCheck():void
	{	
		let serId = Api.allianceTaskVoApi.getAllianceTaskSelectedServantId();
		let pkt = Api.allianceVoApi.getAllianceTaskPKTimes(serId);
		if (this._autoBattleView)
		{
			if (pkt==0)
			{
				this.sendBtnHandler();
			}
			else
			{
				this.autoBattleCallback();
			}
		}
		else
		{
			if (pkt==0 && this._autoBattleBtn)
			{
				this._autoBattleBtn.visible = true;
			}
		}
	}

	private autoBattleCallback():void
	{
		if (this._autoBattleView)
		{
			this._autoBattleView.dispose();
			this._autoBattleView= null;

			let serId = Api.allianceTaskVoApi.getAllianceTaskSelectedServantId();
			let pkt = Api.allianceVoApi.getAllianceTaskPKTimes(serId);
			if (pkt==0 && this._autoBattleBtn)
			{
				this._autoBattleBtn.visible = true;
			}
		}
	}

	protected refreshUiInfo()
	{
		let taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(this._taskId);
		let cfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
		let limitlessTaskId = Api.allianceTaskVoApi.getLimitlessTaskId();
		if (limitlessTaskId == this._taskId){
			this._progress.setPercentage(1);
			this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt1"));
		}
		else{
			if(taskinfo){
				this._progress.setPercentage(taskinfo.v/cfg.value);
				if(taskinfo.v >= cfg.value){
					this._progress.setText(LanguageManager.getlocal("bookRoomServant_studyComplete"));
				}else{
					this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt",[taskinfo.v + "/"+cfg.value]));
				}
			}else{
				this._progress.setPercentage(0);
				this._progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt",[ "0/"+cfg.value]));
			}
		}
	}

	protected showTaskAni()
	{
		this._taskId = this.param.data.taskId;
		let taskcfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
		if(taskcfg.type == 2 ){
			let upgradeClip = ComponentManager.getCustomMovieClip("alliancetask_frame" + taskcfg.type,6,70);
			upgradeClip.setScale(1.8);
			upgradeClip.playWithTime(0);

			let aniNode = new BaseDisplayObjectContainer();
			aniNode.addChild(upgradeClip);
			aniNode.x = this._bg.x - 162;
			aniNode.y = this._bg.y + 700;
			this.addChildToContainer(aniNode);
			egret.Tween.get(aniNode,{loop:true}).to({x:754,y:30+(GameConfig.stageHeigth-960)},10000).set({x:-162,y:700}).wait(200);
		}else if(taskcfg.type == 3){
			let poscfg = {
				["103"]:[
					{x:139,y:518},
					{x:269,y:535},
					{x:443,y:510,flipx:1},
				],
				["107"]:[
					{x:177,y:585},
					{x:198,y:704},
					{x:430,y:748,flipx:1},
					{x:508,y:549,flipx:1},
				],
				["111"]:[
					{x:81,y:705},
					{x:109,y:539},
					{x:228,y:589},
					{x:271,y:813},
					{x:446,y:507,flipx:1},
				],
			}
			let curcfg = poscfg[this._taskId];
			let idx = 1;
			let aniNode = new BaseDisplayObjectContainer();
			for (var key in curcfg) {
				let upgradeClip = ComponentManager.getCustomMovieClip("alliancetask_frame" + taskcfg.type,6,300);
				// upgradeClip.setScale(2);
				upgradeClip.x = curcfg[key].x;
				upgradeClip.y = curcfg[key].y;
				if(curcfg[key].flipx){
					upgradeClip.scaleX = -1;
				}
				egret.Tween.get(upgradeClip,{loop:false}).wait(260*idx).call(()=>{
					upgradeClip.playWithTime(0);
				},this);
				idx++ ;
				aniNode.addChild(upgradeClip);
			}
			aniNode.x = this._bg.x ;
			aniNode.y = this._bg.y ;
			this.addChildToContainer(aniNode);

		}
		// alliancetask_frame2
	}
	protected reSortBtnHandler()
	{
		this._isReversed = !this._isReversed ;
		if(this._isReversed)
		{
			this._reSortBtn.setText("allianceTaskSortBtnTxt3");
		}else{
			this._reSortBtn.setText("allianceTaskSortBtnTxt2");
		}
		this._scrolItemList.reverse();
		for (var index = 0; index < this._scrolItemList.length; index++) {
			let tmpNode = this._scrolItemList[index];
			tmpNode.x = (tmpNode.width*tmpNode.scaleX  + 14) * index;
			tmpNode.y = 5;
		}
	}

	protected sortServantsAfterFight()
	{
		this._serIdList =  Api.allianceTaskVoApi.getAllianceTaskServantList(this._taskId);
		this._scrolItemList.sort((dataA:AllianceTaskDetailScrollItem,dataB:AllianceTaskDetailScrollItem)=>{
			let pkA = dataA.getPkTimes();
			let pkB = dataB.getPkTimes();
			if(pkA == pkB)
			{
				return this._serIdList.indexOf( dataA.getSerid() ) - this._serIdList.indexOf(dataB.getSerid());
			}
			return pkA - pkB;
		});
		let cellIdx:number = 0;
		if(this._isReversed)
		{
			this._scrolItemList.reverse();
			let candoId:string = null;
			let myAlliance = Api.allianceVoApi.getMyAllianceVo();
			let taskservant = myAlliance.info.taskservant;
			if (taskservant)
			{
				for (let index = this._serIdList.length-1; index >=0; index--) {
					let tmpSerid = this._serIdList[index];
					if(tmpSerid && !taskservant[tmpSerid] )
					{
						candoId = tmpSerid;
						cellIdx = index;
						break;
					}
				}
			}

			Api.allianceTaskVoApi.setAllianceTaskSelectedServantId(candoId);
		}
		else
		{
			Api.allianceTaskVoApi.setAllianceTaskSelectedServantId(this._serIdList[0]);
		}
		
		for (var index = 0; index < this._scrolItemList.length; index++) {
			let tmpNode = this._scrolItemList[index];
			if(index == cellIdx){
				tmpNode.eventHandler();
			}
			tmpNode.x = (tmpNode.width*tmpNode.scaleX  + 14) * index;
			tmpNode.y = 5;
		}

	}

	protected rankBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKRANKPOPUPVIEW,{taskId:this._taskId});
	}

	protected sendBtnHandler():boolean
	{
		if(this._isFighting)
		{
			return false;
		}
		// ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKRANKPOPUPVIEW);
		let serId = Api.allianceTaskVoApi.getAllianceTaskSelectedServantId();
		let pkt = Api.allianceVoApi.getAllianceTaskPKTimes(serId);
		if(pkt == 2){
			//提示无法出战
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskSendTip2"));
			return false;
		}
		if(Api.allianceTaskVoApi.getAllianceTaskFlag(this._taskId))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceTask_completeTip"));
			if (this._autoBattleView)
			{
				this.autoBattleCallback();
			}
			if (this._autoBattleBtn && this._autoBattleBtn.visible)
			{
				this._autoBattleBtn.visible = false;
			}
			return false;
		}

		let tws = App.DateUtil.getWeeTs(GameData.serverTime);
		if(GameData.serverTime + 1800 >= tws + 86400 )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
			return false;
		}

		let limitlessTaskId = Api.allianceTaskVoApi.getLimitlessTaskId();
		if (this._taskId == limitlessTaskId && !Api.allianceTaskVoApi.isOpenLimitlessTask()){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
			return false;
		}

		if(pkt == 1){
            let itemId = 1090;
            let ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId)
            //出恢复弹窗
            let mesObj = {
                confirmCallback: this.sendAgainHandler,
                handler : this, 
                icon : "itemicon"+itemId,
                iconBg:"itembg_1", 
                num: ownNum, 
                msg: LanguageManager.getlocal("allianceTaskServantRecover",[""+1]),
                id : itemId,
                useNum : 1,
                linespacing : 6,
                height : 250
            };
            // itemName_109
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
			return false;
        }
		this._isFighting = true ;
		NetManager.request(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT,{tid:this._taskId,servantId:serId });

		return true;
	}

	protected sendAgainHandler()
	{
		this._isFighting = true ;
		let serId = Api.allianceTaskVoApi.getAllianceTaskSelectedServantId();
		NetManager.request(NetRequestConst.REQUEST_ALLIANCETASK_EXTRA,{tid:this._taskId,servantId:serId });
	}
	protected sendBtnHandlerCallBack(event:egret.Event)
	{
		// 
		if(!event.data.ret)
		{
			this._isFighting = false;
			if (event.data && event.data.data && event.data.data.data){
				let rdata = event.data.data;
				let isalreadyfight = rdata.data.isalreadyfight;
				if(isalreadyfight){
					App.CommonUtil.showTip(LanguageManager.getlocal("alliancetask_isalreadyfightTip"));
				}else{
					App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
				}
				
			}
			return ;
		}

		let rdata = event.data.data;
		
		let rewardStr = GameData.formatRewardItem(rdata.data.rewards);
		let atkv = rdata.data.atkv;//此次造成的伤害
		//播放动画
		let serId = Api.allianceTaskVoApi.getAllianceTaskSelectedServantId();
		let tarItem:AllianceTaskDetailScrollItem = undefined;
		for (var index = 0; index < this._scrolItemList.length; index++) {
			let tmpNode = <AllianceTaskDetailScrollItem>this._scrolItemList[index];
			if(tmpNode.getSerid() == serId)
			{
				tarItem = tmpNode;
				break;
			}
		}

		this.refreshUiInfo();

		let newItem = new AllianceTaskDetailScrollItem();
		newItem.initItem(serId,this._taskId,true);
		newItem.setMaskVisible(false);
		let ani = ComponentManager.getCustomMovieClip("alliacetask_serAni",8,100);
		
		let itemW =  newItem.width * newItem.scaleX;
		let itemH = newItem.height * newItem.scaleY;
		let gPos = tarItem.localToGlobal();
		newItem.anchorOffsetX = itemW/2;
		newItem.anchorOffsetY = itemH/2;
		newItem.x = gPos.x + itemW/2;
		newItem.y = gPos.y + itemH/2;
		this.addChild(newItem);

		ani.setScale(3*newItem.scaleX);
		ani.anchorOffsetX = 120;
		ani.anchorOffsetY = 123;
		newItem.addChild(ani);
		
		let tarPosX = GameConfig.stageWidth/2 ;
		let tarPosY = GameConfig.stageHeigth/2 -100 ;
		let tmpThis =this;
		egret.Tween.get(newItem,{loop:false}).to({x: newItem.x *0.6 + tarPosX*0.4, y:tarPosY*0.4 + newItem.y * 0.6 , scaleX:1.36, scaleY:1.36},180).to({x:tarPosX, y:tarPosY , scaleX:0.8, scaleY:0.8},120).call(this.sortServantsAfterFight, this).wait(500).call(()=>{
		// this.sortServantsAfterFight();
			let limitlessTaskId = Api.allianceTaskVoApi.getLimitlessTaskId();
			let flyStr1 = LanguageManager.getlocal("allianceTask_fightV",[""+atkv]) ;
			let list:any[] = [{tipMessage:flyStr1}];
			if (this._taskId != limitlessTaskId){
				list = list.concat(rewardStr);
			}
			else{
				list = rewardStr;
			}
			App.CommonUtil.playRewardFlyAction(list);
		},this).wait(200).to({alpha:0},300).call(()=>{
			tmpThis._isFighting = false;
			this.removeChild(newItem);
			newItem = null;

			let serId = Api.allianceTaskVoApi.getAllianceTaskSelectedServantId();
			let pkt = Api.allianceVoApi.getAllianceTaskPKTimes(serId);
			if (pkt == 0 && tmpThis._autoBattleView)
			{
				tmpThis.sendBtnHandler();
			}
			else if (pkt == 0 && !tmpThis._autoBattleView && tmpThis._autoBattleBtn && !tmpThis._autoBattleBtn.visible)
			{
				tmpThis._autoBattleBtn.visible = true;
			}
			else if (pkt != 0 && tmpThis._autoBattleView)
			{
				tmpThis.autoBattleCallback();
			}

		},this);

		egret.Tween.get(ani,{loop:false}).wait(300).call(()=>{
			ani.playWithTime(1);
		},this).wait(500);//.to({alpha:0},300);

		
		
	}
	
	protected getTitleStr():string
	{
		return "allianceTaskName" + this.param.data.taskId;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"servant_dropBtn","servant_dropBtn_down","servant_lvbg","servant_cardbg_selected",
			"alliancetask_frame2","alliancetask_frame3","alliacetask_serAni",
		]);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_EXTRA),this.sendBtnHandlerCallBack,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT),this.sendBtnHandlerCallBack,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_TASK_BUY_AND_SEND,this.sendAgainHandler , this);

		if (this._autoBattleView)
		{
			this._autoBattleView.dispose();
			this._autoBattleView= null;
		}

		this._scrollView = null;
		this._taskId = "";
		this._serIdList = [];
		this._scrolItemList = [];
		this._scrolNode = null;
		this._isReversed = false;
		this._reSortBtn  = null;;
		this._progress = null;
		this._bg = null;
		this._isFighting = false;

		this._autoBattleBtn = null;
		this._autoBattleView = null;

		super.dispose();
	}
}