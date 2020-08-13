/**
 * author:qianjun
 * desc:跨服权势活动首页
*/
class AcCrossServerPowerView extends AcCommonView
{
	private _canJoinImg : BaseLoadBitmap = null;
	private _cdTimeDesc : BaseTextField = null;
	private _cdType :number = 0;//倒计时类型 0即将开始 1:准备倒计时  2:结束倒计时   3:展示期 4活动结束
	private _countDownText : BaseTextField = null;
	private _countDownTime : number = 0;
	private _enterBtn : BaseButton = null;

	private servantContainer:BaseDisplayObjectContainer;
	public constructor() 
	{
		super();
	}

	private get api() : CrossPowerVoApi{
        return Api.crossPowerVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
	protected isShowOpenAni():boolean
	{
		return false;
	}

	protected getResourceList():string[]
	{
		let baseRes = [
			"crossserverinti_detailbg-1","crossserverintibg-1",
			// "crosspowertitle","crossserverpower_canjoin",
			"public_9_wordbg2","crosspowerenter","crosspowerenter_down",
			"punish_reward_icon",
			"punish_rank_icon",
			"punish_rank_name",
			"rechargevie_db_01"
		];

		let resList = null;
		if(this.cfg.specialReward){
			resList = baseRes.concat([
				"crosspowerenterbg_special",
				"atkracecross_namebg",
				"atkracecross_showbtnbg",
				// "atkracecross_showbtnicon",
				this.getDefaultRes("crosspowerenterbg_showbtnicon","10"),
				"atkracecross_showbtntxt",
				"atkracecross_threetip",
				"atkracecross_threetipflower",
		
			]);
		} else {
			resList = baseRes.concat([
				"crosspowerenterbg",
			]);
		}

		return super.getResourceList().concat(resList);
		// return super.getResourceList().concat([
		// 	"crossserverinti_detailbg-1","crossserverintibg-1",
		// 	// "crosspowertitle","crossserverpower_canjoin",
		// 	"public_9_wordbg2","crosspowerenter","crosspowerenter_down","crosspowerenterbg",
		// 	"punish_reward_icon",
		// 	"punish_rank_icon",
		// 	"punish_rank_name",
		// 	"rechargevie_db_01"
		// ]);
	}

	protected initTitle() : void{

	}

	protected getBgName():string
	{
		if(this.cfg.specialReward){
			return "crosspowerenterbg_special";
		} else {
			return "crosspowerenterbg";
		}

	}

	protected getCloseBtnName():string
	{
		return ButtonConst.COMMON_CLOSE_1;
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = (GameConfig.stageHeigth - 1136);
		}
	}

	protected getTitleStr():string
	{
		return "crosspower";
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
				dragon.y = GameConfig.stageHeigth - 146 + 35 ;

				this.servantContainer.addChild(dragon);
				let mask = BaseBitmap.create("public_9v_bg01");
				mask.width = 640;
				mask.height = GameConfig.stageHeigth - 146;
				dragon.mask = mask;
				this.servantContainer.addChild(mask);

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
				bm.y = GameConfig.stageHeigth - 146 - bm.height * tarScale + 35;
				this.servantContainer.addChild(bm);

				let mask = BaseBitmap.create("public_9v_bg01");
				mask.width = 640;
				mask.height = GameConfig.stageHeigth - 146;
				bm.mask = mask;
				this.servantContainer.addChild(mask);
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

		let btnIcon = BaseBitmap.create(this.getDefaultRes("crosspowerenterbg_showbtnicon","10"));
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
	public initView():void
	{	

		if(this.cfg.specialReward){
			this.servantContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(this.servantContainer);
		}
		let view = this;
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER, {});

		let titleRes = "crosspowertitle";
		if(ResourceManager.hasRes("crosspowertitle"+"-"+this.cfg.getCrossServerType())){
			titleRes = "crosspowertitle"+"-"+this.cfg.getCrossServerType();
		}

		let title = BaseLoadBitmap.create(titleRes); 
		title.width = 528;
		title.height = 153;

		view.addChildToContainer(title);
		view.setLayoutPosition(LayoutConst.horizontalCenter,title,view);
		title.y = 23;
		
		//参赛资格
		let canJoin = this.vo.getIsCanJoin();
		let canJoinRes = "crossserverpower_canjoin";
		if(ResourceManager.hasRes("crossserverpower_canjoin" + "-"+this.cfg.getCrossServerType())){
			canJoinRes = "crossserverpower_canjoin" + "-"+this.cfg.getCrossServerType();
		}
		view._canJoinImg = BaseLoadBitmap.create(canJoinRes);
		view._canJoinImg.width = 241;
		view._canJoinImg.height = 91;
		view._canJoinImg.visible = canJoin;
		view.addChildToContainer(view._canJoinImg);
		
		
		//底部
		let vo = view.vo;
		let bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 146;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
		view.addChildToContainer(bottomBg);
		//当前时间段
		view._cdType = vo.judgeTimeProcess();
		if(view._cdType > 0 && view._cdType < 4){
			if(view._cdType == 1){
				view._countDownTime = vo.st + 2 * 3600 - GameData.serverTime;
			}
			else if(view._cdType == 2){
				view._countDownTime = vo.et - 24 * 3600 - GameData.serverTime;
			}
			else{
				view._countDownTime = vo.et - GameData.serverTime;
			}
			view.api.setCountDownTime(view._countDownTime);
		}

		if(this.cfg.specialReward){
			this.createSpecial(152 );
		}

		view._enterBtn = ComponentManager.getButton(`crosspowerenter`, '', view.enterInHandler,this);
		if(view._cdType > 1 && view._cdType < 4){
			view._enterBtn.setEnable(true);
		}
		else{
			//灰化
			view._enterBtn.setEnable(false);
		}
		//进入按钮
		// view._enterBtn.setPosition(GameConfig.stageWidth / 2 - 208 / 2, bottomBg.y - 179 - 25);
		view.setLayoutPosition(LayoutConst.horizontalCenter,view._enterBtn,view);
		view.addChildToContainer(this._enterBtn);
		view._enterBtn.y = bottomBg.y - 179 - 25-100;

		if(this.cfg.specialReward){
			this._enterBtn.y = GameConfig.stageHeigth - 158 - this._enterBtn.height;
		}

		//活动时间
		let timeDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeDesc.x = 10;
		timeDesc.y = bottomBg.y + 20;
		view.addChildToContainer(timeDesc);
		//活动倒计时时间
		view._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		view._cdTimeDesc.x = timeDesc.x;
		view._cdTimeDesc.y = timeDesc.y + timeDesc.textHeight + 5;
		view.addChildToContainer(this._cdTimeDesc);
		if(view._countDownTime > 0){
			view._countDownText = ComponentManager.getTextField(view.vo.getCountTimeStr(view._countDownTime), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
			view._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.textWidth , this._cdTimeDesc.y);
			view.addChildToContainer(view._countDownText);
		}
		//规则描述
		let ruleDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`crossPowerRule-${view.code}`), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleDesc.width = GameConfig.stageWidth - 20;
		ruleDesc.lineSpacing = 6;
		ruleDesc.x = timeDesc.x;
		ruleDesc.y = view._cdTimeDesc.y + view._cdTimeDesc.textHeight + 5;
		view.addChildToContainer(ruleDesc);

		// view.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [-20,-20]);

		if(PlatformManager.hasSpcialCloseBtn())
		{
			if(canJoin==true)
			{
				this.closeBtn.y =80;
			}
			else
			{
				this.closeBtn.y =0;
			}
		
		}
		
	}

	public tick():void
	{	
		let view = this;
		if (view._countDownText) {
			-- view._countDownTime;
			view.api.setCountDownTime(view._countDownTime);
			view._countDownText.text = view.vo.getCountTimeStr(view._countDownTime);
			if (view._countDownTime <= 0) {
				view._cdType = view.vo.judgeTimeProcess();
				if(view._cdType == 2){
					view._enterBtn.setEnable(true);
					view._countDownTime = view.vo.et - 86400 - GameData.serverTime;
				}
				else if(view._cdType == 3){
					view._countDownTime = view.vo.et - GameData.serverTime;
				}
				else if(view._cdType == 4){
					view._enterBtn.setEnable(false);
					view.hide();
					App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
					return;
				}
				view.api.setCountDownTime(view._countDownTime);
				view._cdTimeDesc.text = LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`);
				view._countDownText.text = view.vo.getCountTimeStr(view._countDownTime);
			}
		}
	}

	private enterInHandler() : void{
		let view = this;
		if(view._cdType > 1 && view._cdType < 4){
			ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERCROSSENTERVIEW,{
				aid : this.aid,
				code : this.code
			});
			this.hide();
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime0`));
		}
	}

	 

	public dispose():void
	{
		let view = this;
		view._canJoinImg = null;
		view._cdTimeDesc = null;
		view._enterBtn.removeTouchTap();
		view._enterBtn = null;
		this.servantContainer = null;
		super.dispose();
	}
}