class AtkracecrossSummaryView  extends CommonView
{

	private _countDownTime:number = 0;
	private _countDownText:BaseTextField = null;
	private _enterBtn:BaseButton = null;
	private _cdTimeDesc:BaseTextField = null;
	private _cdType:number = 1;//倒计时类型 1:开始倒计时  2:战斗倒计时   3:领奖倒计时

	private _openDesc:BaseTextField = null;
	private _isCanJoin:number = null; // 0 没资格  1 有资格
	private aid:string;
	private _crossServerType :string = null;
	public static curCrossServerType:string = null;

	private servantContainer:BaseDisplayObjectContainer;
	public constructor() 
	{
		super();
		this.aid="crossServerAtkRace";
	}
	private get cfg() : Config.AcCfg.CrossServerAtkRaceCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
	protected get code():string
	{
		if(this.param && this.param.data){
			return this.param.data;
		} else {
			return "";
		}
		
	}
	//根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } else {
            return resName+"-"+defaultCode;
        }
    }
	// protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	//刷新跨服擂台活动数据
	// 	return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK,requestData:{}};
	// }
	
	private refreshInfo():void
	{	
		this.request(NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK,{});
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let crossVo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		if (crossVo.info && crossVo.info.iscanjoin == 1)
		{
			this._isCanJoin = 1;
			if(LanguageManager.checkHasKey("atkraceCrossOpenDesc2-"+this.cfg.getCrossServerType())){
				this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc2-"+this.cfg.getCrossServerType());
			} else {
				this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc2");
			}
			
			let canJoinImg = BaseLoadBitmap.create("atkracecross_canjoin-"+this.cfg.getCrossServerType());
			canJoinImg.width  = 241;
			canJoinImg.height = 91;
			canJoinImg.x = -5;
			this.addChildToContainer(canJoinImg);

			if(PlatformManager.hasSpcialCloseBtn())
			{
				this.closeBtn.y =80;
			
			}
		}
		else 
		{
			// this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3");
			this._isCanJoin = 0;
			if(LanguageManager.checkHasKey("atkraceCrossOpenDesc3-"+this.cfg.getCrossServerType())){
				this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3-"+this.cfg.getCrossServerType());
			} else {
				this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3");
			}

		}
	}

	protected getResourceList():string[]
	{
		let baseRes = ["atkracecross_title","btn_enter_race","atkracecross_timebg"];
		// return super.getResourceList().concat([
		// "atkracecross_bg","atkracecross_title","btn_enter_race","atkracecross_timebg"
		// ]);

		let resList = null;
		if(this.cfg.specialReward){
			resList = baseRes.concat([
				"atkracecross_bg_special",
				"atkracecross_namebg",
				"atkracecross_showbtnbg",
				// "atkracecross_showbtnicon",
				this.getDefaultRes("atkracecross_showbtnicon","10"),
				"atkracecross_showbtntxt",
				"atkracecross_threetip",
				"atkracecross_threetipflower"
			]);
		} else {
			resList = baseRes.concat([
				"atkracecross_bg"
			]);
		}


		return super.getResourceList().concat(resList);

	}

	protected getBgName():string
	{
		if(this.cfg.specialReward){
			return "atkracecross_bg_special";
		} else {
			return "atkracecross_bg";
		}
		
	}
	private createSpecial(y:number):void
	{

		let rewardItemVo = GameData.formatRewardItem(this.cfg.specialReward);
		if(rewardItemVo[0].type == 8){
			//门客
			
			let dragon = null;
			if(RES.hasRes("servant_full2_" + rewardItemVo[0].id + "_ske") && App.CommonUtil.check_dragon() ){
				dragon = App.DragonBonesUtil.getLoadDragonBones("servant_full2_" + rewardItemVo[0].id);
				dragon.setScale(1);
				dragon.x = 320;
				dragon.y = 1136 - 168 + 35;
				this.servantContainer.addChild(dragon);
			} else {
				let bm = null;
				// let skinW =640;
				// let skinH = 482;
				// let tarScale = 1;
	
				// bm = BaseLoadBitmap.create("servant_full_" + rewardItemVo[0].id);

				let skinW =640;
				let skinH = 840;
				let tarScale = 0.8;
	
				bm = BaseLoadBitmap.create("wife_full_" + rewardItemVo[0].id);
				bm.width = skinW;
				bm.height = skinH;
				bm.setScale(tarScale);
				bm.x = 320 - skinW * tarScale / 2;
				bm.y = y+20;
				this.servantContainer.addChild(bm);
			}

			let servantCfg:Config.ServantItemCfg = Config.ServantCfg.getServantItemById(rewardItemVo[0].id);
			if(PlatformManager.checkIsViSp()){
				let name = ComponentManager.getTextField(servantCfg.name, 24,TextFieldConst.COLOR_BLACK);

				let nameBg = BaseBitmap.create("atkracecross_namebg");
				nameBg.height = name.width + 50;
				nameBg.anchorOffsetX = 26;
				nameBg.anchorOffsetY = nameBg.height/2;
				nameBg.rotation = -90;
				nameBg.x = 10 + nameBg.height/2;
				nameBg.y = GameConfig.stageHeigth /2 - nameBg.width/2;
				this.servantContainer.addChild(nameBg);

				
			
				name.x = nameBg.x - name.width/2 ;
				name.y = nameBg.y - name.height/2;
				
				this.servantContainer.addChild(name);
			} else {
				let nameBg = BaseBitmap.create("atkracecross_namebg");
				nameBg.x = 30;
				nameBg.y = GameConfig.stageHeigth /2 - nameBg.height/2;
				this.servantContainer.addChild(nameBg);

				let name = ComponentManager.getTextField(servantCfg.name, 24,TextFieldConst.COLOR_BLACK);
				name.width = 24;
				name.x = nameBg.x + nameBg.width/2 - name.width/2 - 10;
				name.y = nameBg.y + nameBg.height/2 - name.height/2;
				
				this.servantContainer.addChild(name);
			}


		}
		



		let tip = BaseBitmap.create("atkracecross_threetip");
		tip.x = GameConfig.stageWidth / 2 - tip.width/2;
		tip.y = y;
		this.servantContainer.addChild(tip);

		let tipFlower = BaseBitmap.create("atkracecross_threetipflower");
		tipFlower.x = tip.x + 60;
		tipFlower.y = tip.y + 52;
		this.servantContainer.addChild(tipFlower);

		let btn = ComponentManager.getButton("atkracecross_showbtnbg",null,this.detailBtnClick,this);
		btn.x = GameConfig.stageWidth - 10 - btn.width;
		btn.y = tip.y + tip.height;
		this.servantContainer.addChild(btn);

		let btnIcon = BaseBitmap.create(this.getDefaultRes("atkracecross_showbtnicon","10"));
		btnIcon.x = btn.width/2 - btnIcon.width/2;
		btnIcon.y = btn.height/2 - btnIcon.height/2;
		btn.addChild(btnIcon);

		let btnTxt = BaseBitmap.create("atkracecross_showbtntxt");
		btnTxt.x = btn.width/2 - btnTxt.width / 2 ;
		btnTxt.y = btn.height - btnTxt.y - 40;
		btn.addChild(btnTxt);


	}

	private detailBtnClick():void
	{

		let rewardItemVo = GameData.formatRewardItem(this.cfg.specialReward);

		ViewController.getInstance().openView(ViewConst.COMMON.SERVANTWIFEDETAILVIEW,{servantId: rewardItemVo[0].id, wifeId: rewardItemVo[0].id});
	}

	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return ButtonConst.POPUP_CLOSE_BTN_1;
	}

	// 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,640,1136);
			this.viewBg = BaseLoadBitmap.create(bgName,rect);
			this.viewBg.setPosition(0,(GameConfig.stageHeigth-this.viewBg.height)*0.1);
			this.addChild(this.viewBg); 
		}
	
	}

	public initView():void
	{	

		if(this.cfg.specialReward){
			this.servantContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(this.servantContainer);
		}



		this._crossServerType = this.cfg.getCrossServerType();
		AtkracecrossSummaryView.curCrossServerType = this._crossServerType;
		this.viewBg.y = GameConfig.stageHeigth-this.viewBg.height;
		let titlePic:BaseLoadBitmap = null;
		if(ResourceManager.hasRes("atkracecross_title-"+this.cfg.getCrossServerType())){
			titlePic = BaseLoadBitmap.create("atkracecross_title-"+this.cfg.getCrossServerType());
			titlePic.width = 528;
			titlePic.height = 153;
			titlePic.setPosition(GameConfig.stageWidth/2 - titlePic.width/2,10);
		} else {
			titlePic = BaseLoadBitmap.create("atkracecross_title");
			titlePic.width = 518;
			titlePic.height = 150;
			titlePic.setPosition(GameConfig.stageWidth/2 - titlePic.width/2,10);
		}
		this.addChildToContainer(titlePic);
		//顶部
		let topBg:BaseBitmap = BaseBitmap.create("public_v_bg01");
		topBg.height = 128;
		topBg.setPosition(GameConfig.stageWidth/2 - topBg.width/2,152);
		this.addChildToContainer(topBg);

		if(this.cfg.specialReward){
			this.createSpecial(topBg.y + topBg.height);
		}
		//进入擂台按钮
		this._enterBtn = ComponentManager.getButton("btn_enter_race",null,this.enterRackHandler,this,null,0);
		this._enterBtn.setPosition(GameConfig.stageWidth/2 - this._enterBtn.width/2,550);
		if(this.cfg.specialReward){
			this._enterBtn.setPosition(GameConfig.stageWidth/2 - this._enterBtn.width/2,GameConfig.stageHeigth - 158 - this._enterBtn.height);
		}
		this.addChildToContainer(this._enterBtn);

		//底部
		let bottomBg:BaseBitmap = BaseBitmap.create("public_bottombg1");
		bottomBg.height = 168;
		bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2,GameConfig.stageHeigth - bottomBg.height);
		this.addChildToContainer(bottomBg);
		
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let timeDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime",[crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		timeDesc.x =24;
		timeDesc.y =bottomBg.y+30;
		this.addChildToContainer(timeDesc);

		let qualiStr = "atkracecrossQualification";
		if(LanguageManager.checkHasKey("atkracecrossQualification-"+this._crossServerType)){
			qualiStr = "atkracecrossQualification-"+this._crossServerType;
		} 

		let qualification:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(qualiStr), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		qualification.x =timeDesc.x;
		qualification.y =timeDesc.y + 35;
		qualification.width = GameConfig.stageWidth - qualification.x*2;
		qualification.lineSpacing = 6;
		this.addChildToContainer(qualification);

		let timeNumber:number = 7200;
		let timeNumber2:number = 3600*24;
		if (crossVo.st > GameData.serverTime - timeNumber)
		{	
			this._enterBtn.visible = false;
			this._cdType = 1;
			this._countDownTime = timeNumber - GameData.serverTime + crossVo.st 
		}
		else if (crossVo.et > GameData.serverTime + timeNumber2)
		{
			this._cdType = 2;
			this._countDownTime = crossVo.et -  GameData.serverTime - timeNumber2;
		}
		else {
			this._cdType = 3;
			this._countDownTime = crossVo.et -  GameData.serverTime;
		}
		//test code 
		// this._cdType = 2;
		// this._countDownTime = 10;


		
	
		this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossCDTime"+this._cdType), TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._cdTimeDesc.y =topBg.y + 12;
		this.addChildToContainer(this._cdTimeDesc);

	

		//倒计时
		this._countDownText = ComponentManager.getTextField(this.getCountTimeStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xe50404);
		this._cdTimeDesc.x =GameConfig.stageWidth/2 - this._cdTimeDesc.width/2 - this._countDownText.width/2;
		this._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.width , this._cdTimeDesc.y);
		this.addChildToContainer(this._countDownText);

		let leftLine = BaseBitmap.create("public_v_huawen01");
		leftLine.x = this._cdTimeDesc.x - 20 - leftLine.width;
		leftLine.y = this._countDownText.y + this._countDownText.height/2 - leftLine.height/2// + 3;

		let rightLine = BaseBitmap.create("public_v_huawen01");
		rightLine.scaleX = -1;
		rightLine.x = this._countDownText.x + this._countDownText.width + 20 + rightLine.width;
		rightLine.y = this._countDownText.y + this._countDownText.height/2 - rightLine.height/2 //+ 3;

		this.addChildToContainer(leftLine);
		this.addChildToContainer(rightLine);

		if (this._cdType == 3)
		{
			this._countDownText.visible = false;
			this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
			this._cdTimeDesc.x =GameConfig.stageWidth/2 - this._cdTimeDesc.width/2;
		}
		
		this._openDesc = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		this._openDesc.width = 600;
		this._openDesc.setPosition(GameConfig.stageWidth/2 - this._openDesc.width/2 , this._countDownText.y+50);
		this._openDesc.lineSpacing = 6;
		this._openDesc.textAlign = egret.HorizontalAlign.CENTER;
		this.addChildToContainer(this._openDesc);

		if (crossVo.st > GameData.serverTime - 300)
		{	
			// this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc1");

			if(LanguageManager.checkHasKey("atkraceCrossOpenDesc1-"+this.cfg.getCrossServerType())){
				this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc1-"+this.cfg.getCrossServerType());
			} else {
				this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc1");
			}


			TimerManager.doTimer(crossVo.st - GameData.serverTime + 300,1,this.refreshInfo,this);
		}
		else 
		{
			this.refreshInfo();
		}
	}

	private enterRackHandler():void
	{

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_INDEX), this.enterCallback, this);

		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_INDEX, {activeId:crossVo.aidAndCode});
	}
	private enterCallback(data):void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_INDEX), this.enterCallback, this);
		if(this._isCanJoin == 0){
			let zonerankinfos:any = data.data.data.data.zonerankinfos;
			 if(zonerankinfos && zonerankinfos[0]){
				 
			 } else {
				 return;
			 }
		}
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSVIEW,{crossServerType:this.cfg.getCrossServerType()});
	}
	public tick():void
	{	
		if (this._countDownText) {
			this._countDownTime--;
			this._countDownText.text = this.getCountTimeStr();

			if (this._countDownTime < 0) {
				this.refreshEnterBtn();
			}
		}
	}

	private refreshEnterBtn():void
	{
		this._cdType += 1;
		

		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let timeNumber:number = 7200;
		let timeNumber2:number = 3600*24;
		if (this._cdType == 2)
		{	
			this._enterBtn.visible = true;
			this._countDownTime = crossVo.et -  GameData.serverTime - timeNumber2;
		}
		else if (this._cdType == 3)
		{
			this._countDownTime = crossVo.et -  GameData.serverTime;
			this._countDownText.visible = false;
			this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND);
		}
		else if (this._cdType == 4)
		{	
			ViewController.getInstance().hideAllView();
			let tipStr = "atkracecrossEndTip";
			if(LanguageManager.checkHasKey("atkracecrossEndTip-"+this._crossServerType)){
				tipStr = "atkracecrossEndTip-"+this._crossServerType;
			}
			App.CommonUtil.showTip(LanguageManager.getlocal(tipStr));
			return;
		}

		this._cdTimeDesc.text = LanguageManager.getlocal("atkracecrossCDTime"+this._cdType);
		this._countDownText.text = this.getCountTimeStr();

		if (this._cdType == 3)
		{
			this._cdTimeDesc.x =GameConfig.stageWidth/2 - this._cdTimeDesc.width/2;
		}
	}


	private getCountTimeStr():string
	{	
		let time:number = this._countDownTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_INDEX), this.enterCallback, this);
		TimerManager.remove(this.refreshInfo,this);
		this._countDownTime = 0;
		this._countDownText = null;
		this._enterBtn = null;
		this._cdTimeDesc = null;
		this._openDesc = null;
		this._isCanJoin = null;
		this._crossServerType = null;
		AtkracecrossSummaryView.curCrossServerType = null;
		this.servantContainer = null;
		super.dispose();
	}
}