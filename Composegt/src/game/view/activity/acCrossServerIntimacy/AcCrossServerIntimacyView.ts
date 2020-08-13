/**
 * author:qianjun
 * desc:跨服亲密活动首页
*/
class AcCrossServerIntimacyView extends AcCommonView
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

	public static AID:string = null;
	public static CODE:string = null;

	private get api() : CrossImacyVoApi{
        return Api.crossImacyVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerIntimacyCfg{
        // return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
	}

    private get vo() : AcCrossServerIntimacyVo{
        return <AcCrossServerIntimacyVo>Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
    }
	protected isShowOpenAni():boolean
	{
		return false;
	}
	protected getResourceList():string[]
	{
		// return super.getResourceList().concat([
		// 	"crossserverinti_detailbg-1","crossserverinti_enterin-1","crossserverintibg-1",
		// 	"crossserverinti_detailbg-4","crossserverinti_enterin-4","crossserverintibg-4",
		
		// 	"public_9_wordbg2","crossserverinti_flagword",
		// 	"rechargevie_db_01"
		// ]);

		let baseRes =[
			"crossserverinti_detailbg-1","crossserverinti_enterin-1",
			"crossserverinti_detailbg-4","crossserverinti_enterin-4",
		
			"public_9_wordbg2","crossserverinti_flagword",
			"rechargevie_db_01"
		];
		let resList = [];
		if(this.cfg.specialReward){
			resList = baseRes.concat([
				"crossserverintibg_special",
				"atkracecross_namebg",
				"atkracecross_showbtnbg",
				// "atkracecross_showbtnicon",
				this.getDefaultRes("crossserverinti_showbtnicon","10"),
				"atkracecross_showbtntxt",
				"atkracecross_threetip",
				"atkracecross_threetipflower",
			]);
		} else {
			resList = baseRes.concat([
				"crossserverintibg-1",
				"crossserverintibg-4",
			]);
		}
		return super.getResourceList().concat(resList);

	}

	protected initTitle() : void{

	}

	protected getBgName():string
	{
		if(this.cfg.specialReward){
			return "crossserverintibg_special";
		} else {
			if(RES.hasRes(`crossserverintibg-${this.code}`))
			{
				return `crossserverintibg-${this.code}`;
			}
			return `crossserverintibg-1`;
		}

	}

	protected getCloseBtnName():string
	{
		// return ButtonConst.POPUP_CLOSE_BTN_1;
		return "btn_lantern";
	}

	protected getTitleStr():string
	{
		return "atkracecross";
	}

	public initView():void
	{	
		if(this.cfg.specialReward){
			this.servantContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(this.servantContainer);
		}
		let view = this;
		view.viewBg.height = 1136;
		view.viewBg.width = 640;
		
		let flagword = "crossserverinti_flagword";
		let crossserverinti_flagword = null;

		if(ResourceManager.hasRes("crossserverinti_flagword"+"-"+this.cfg.getCrossServerType()))
		{
			flagword = "crossserverinti_flagword"+"-"+this.cfg.getCrossServerType();
			crossserverinti_flagword = BaseLoadBitmap.create(flagword);
			crossserverinti_flagword.width = 528;
			crossserverinti_flagword.height = 153;
			crossserverinti_flagword.x = GameConfig.stageWidth/2 - crossserverinti_flagword.width/2;
			crossserverinti_flagword.y = 30;
			view.addChildToContainer(crossserverinti_flagword);
		} else {

			flagword = "crossserverinti_flagword";
			crossserverinti_flagword = BaseLoadBitmap.create(flagword);
			crossserverinti_flagword.width = 582;
			crossserverinti_flagword.height = 140;
			crossserverinti_flagword.x = GameConfig.stageWidth/2 - crossserverinti_flagword.width/2;
			crossserverinti_flagword.y = 0;
			view.addChildToContainer(crossserverinti_flagword);

		}

		


		AcCrossServerIntimacyView.AID = view.aid;
		AcCrossServerIntimacyView.CODE = view.code; 
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYIMACY, {});
		//参赛资格
		let canJoin = this.vo.getIsCanJoin();
		/*
		if(RES.hasRes(`crossserverinti_canjoin-${this.code}`))
		{
			view._canJoinImg = BaseLoadBitmap.create(`crossserverinti_canjoin-${this.code}`);
		}
		else{
			view._canJoinImg = BaseLoadBitmap.create(`crossserverinti_canjoin-1`);
		}
		*/

		// if(ResourceManager.hasRes("crossserverinti_canjoin"))
		

		if(ResourceManager.hasRes("crossserverinti_canjoin-"+this.cfg.getCrossServerType())){
			view._canJoinImg = BaseLoadBitmap.create("crossserverinti_canjoin-"+this.cfg.getCrossServerType());
			view._canJoinImg.visible = canJoin;
			view._canJoinImg.width = 241;
			view._canJoinImg.height = 91;
			view._canJoinImg.x = -5;
		} else {
			view._canJoinImg = BaseLoadBitmap.create("crossserverinti_canjoin-1");
			view._canJoinImg.visible = canJoin;
			view._canJoinImg.width = 407;
			view._canJoinImg.height = 39;
			view._canJoinImg.x = GameConfig.stageWidth/2 - view._canJoinImg.width/2;
			view._canJoinImg.y = crossserverinti_flagword.y + crossserverinti_flagword.height + 15;
		}

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
		if(RES.hasRes(`crossserverinti_enterin-${view.code}`))
		{
			view._enterBtn = ComponentManager.getButton(`crossserverinti_enterin-${view.code}`, '', view.enterInHandler,this);
		}
		else{
			view._enterBtn = ComponentManager.getButton(`crossserverinti_enterin-1`, '', view.enterInHandler,this);
		}
		
		if(view._cdType > 1 && view._cdType < 4){
			view._enterBtn.setEnable(true);
		}
		else{
			//灰化
			view._enterBtn.setEnable(false);
		}
		//进入按钮
		view._enterBtn.setPosition(GameConfig.stageWidth / 2 - 208 / 2, bottomBg.y - 120);
		view.addChildToContainer(this._enterBtn);
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
		let ruleDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`crossIntimacyRule-${view.code}`), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleDesc.width = 620;//GameConfig.stageWidth - 100;
		ruleDesc.lineSpacing = 6;
		ruleDesc.x = timeDesc.x;
		ruleDesc.y = view._cdTimeDesc.y + view._cdTimeDesc.textHeight + 5;
		view.addChildToContainer(ruleDesc);
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

		let btnIcon = BaseBitmap.create(this.getDefaultRes("crossserverinti_showbtnicon","10"));
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
	private enterInHandler() : void{
		let view = this;
		if(view._cdType > 1 && view._cdType < 4){
			ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERINTIMACYENTERVIEW,{
				aid : this.aid,
				code : this.code
			});
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