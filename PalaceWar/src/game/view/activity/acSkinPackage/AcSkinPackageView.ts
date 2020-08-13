class AcSkinPackageView extends PopupView
{	
	private _code:string = null;
	private _vo:AcSkinPackageVo = null;
	private _cfg:Config.AcCfg.SkinPackageCfg = null;
	private _desc:BaseBitmap = null;
	private _descText:BaseBitmapText|BaseTextField = null;
	private _btn:BaseButton = null;
	private _time:BaseTextField = null;
	private _icons:BaseDisplayObjectContainer[] = [];
	private _num:BaseBitmap = null;

	private _btnType:number = 0;  //1 领奖   2 ，充值   3 , max   4 结束
	private _rewards:string = null;

    public constructor() 
	{
		super();
	}

    protected getResourceList():string[]
	{	
		this._code = this.param.data;

		let array  = super.getResourceList();

		if (Number(this._code)>3)
		{
			array.push("acskinpackage_title"+this._code);
			array.push("rechargegift_rewardbg-1");
			array.push("acgiftreturnview_common_skintxt");
		}

		return array.concat([
			
            "acd_bg"+this._code,"sharepopupview_closebtn_down","sharepopupview_closebtn","recharge_fnt",
			
        ]);
	}

    protected initView():void
	{	
		this._vo = <AcSkinPackageVo>Api.acVoApi.getActivityVoByAidAndCode("skinPackage",this._code);
		this._cfg = Config.AcCfg.getCfgByActivityIdAndCode("skinPackage", this._code)

		let closebtn:BaseButton = ComponentManager.getButton("sharepopupview_closebtn","",this.hide,this);
		closebtn.setPosition(536,GameConfig.stageHeigth/2-210);
		this.addChild(closebtn);

		this._desc = BaseBitmap.create("skinpackage_"+this._code+"word1");
		this._desc.setPosition(355,GameConfig.stageHeigth/2-112);
		this.addChild(this._desc);

		this._num= BaseBitmap.create();
		this._num.setPosition(70,GameConfig.stageHeigth/2+155);
		this.addChild(this._num);

		this._descText = ComponentManager.getBitmapText("","recharge_fnt",TextFieldConst.COLOR_BLACK);
		this._descText.y = this._desc.y+37;
		this.addChild(this._descText);
		if (!Api.switchVoApi.checkOpenBMFont()){
			let priceTxt = <BaseTextField>this._descText;
			priceTxt.bold = true;
		}

		this._time = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN2);
		this.addChild(this._time);
		this.tick();

		this._btn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"",this.clickHandle,this);
		this._btn.setPosition(GameConfig.stageWidth/2-this._btn.width/2,GameConfig.stageHeigth/2+284);
		this.addChild(this._btn);

		let tip:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acSkinPackageTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED2);
		tip.setPosition(GameConfig.stageWidth-35-tip.width,GameConfig.stageHeigth/2+121);
		this.addChild(tip);
		
		let wife = null;
		//龙骨
		if (this._code == "4")
		{
			let skinCfg:any =  Config.WifeCfg.getWifeCfgById(this.getRewardsId());
			let boneName = undefined;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ( Api.wifeVoApi.isHaveBone(boneName) && (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                wife.setScale(0.65);
				wife.x = 190;
				wife.y = GameConfig.stageHeigth/2+160;
			}
			else {
				wife = BaseLoadBitmap.create(skinCfg.body);
				wife.width = 640;
				wife.height = 840;
                wife.setScale(0.45);
				wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = 170;
				wife.y =  GameConfig.stageHeigth/2+143;
            }
            this.addChild(wife);

		}
		else if (this._code == "5")
		{
			let skinCfg:any = Config.WifeskinCfg.getWifeCfgById(this.getRewardsId());
			let boneName = undefined;
			
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                wife.setScale(0.65);
				wife.x = 190;
				wife.y = GameConfig.stageHeigth/2+160;
			}
			else {
				wife = BaseLoadBitmap.create(skinCfg.body);
				wife.width = 640;
				wife.height = 840;
                wife.setScale(0.45);
				wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = 170;
				wife.y =  GameConfig.stageHeigth/2+143;
            }
            this.addChild(wife);
		}

		if (wife)
		{
			let rewardBg = BaseBitmap.create("rechargegift_rewardbg-1");
        	rewardBg.setPosition(GameConfig.stageWidth/2 - rewardBg.width/2, GameConfig.stageHeigth/2+146);
			this.addChild(rewardBg);


			let titlepic = BaseBitmap.create("acskinpackage_title"+this._code);
        	titlepic.setPosition(GameConfig.stageWidth/2 - titlepic.width/2, GameConfig.stageHeigth/2-316);
			this.addChild(titlepic);

			 
		}
		if (Number(this._code)>3)
		{
			//衣装预览
			let skinContainer = this.getSkinBtnContainer();
			skinContainer.setPosition(GameConfig.stageWidth/2-200, GameConfig.stageHeigth/2+36);
			this.addChild(skinContainer);
		}

		

		this.resetInfo();

		if (Number(this._code)>3 && this.checkHasRewards() && this._btnType != 3)
		{
			let hasText = ComponentManager.getTextField(LanguageManager.getlocal("acSkinPackageHadTip-"+this._code),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			hasText.width = 500;
			hasText.lineSpacing = 5;
			hasText.textAlign = egret.HorizontalAlign.CENTER;
			hasText.setPosition(GameConfig.stageWidth/2-hasText.width/2,   GameConfig.stageHeigth/2+395);
			this.addChild(hasText);
		}
    }


	private getSkinBtnContainer():BaseDisplayObjectContainer{

        let container = new BaseDisplayObjectContainer();
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(0, 0);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		container.addChild(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);
        
        let skinTxtStr = "acgiftreturnview_common_skintxt";
 
		let skinTxt = BaseBitmap.create(skinTxtStr);
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		container.addChild(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create(skinTxtStr);
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
		container.addChild(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		//透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
		touchPos.height = 40;
		touchPos.setPosition(25, 57);
        container.addChild(touchPos);

		let curFlag:number = this._vo.getCurFlag();
		if (curFlag >= this._cfg.getRewardMax())
		{
			curFlag = this._cfg.getRewardMax()-1;
			this._btnType = 3;
		}
		let needGem:number = this._cfg.getGemNeed(curFlag);
        
		touchPos.addTouchTap(() => {

			if (this._code == "4")
			{	
				let wifeid = this.getRewardsId();
				let skinId = Config.WifeCfg.formatRewardItemVoStr(wifeid);
				let topMsg = LanguageManager.getlocal("acSkinPackageGiftPreviewTip-"+this._code, [String(needGem)]);
				let data = {
					data:[{idType: skinId, topMsg:topMsg, scale: 0.65, bgName:""}]
				};
				 ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
			}
			else if (this._code == "5")
			{	
				let wifeid = this.getRewardsId();
				let  skinId = Config.WifeskinCfg.formatRewardItemVoStr(wifeid);
				let topMsg = LanguageManager.getlocal("acSkinPackageGiftPreviewTip-"+this._code, [String(needGem)]);
				let data = {
					data:[{idType: skinId, topMsg:topMsg, scale: 0.55, bgName:"",offY:-15}]
				};
				 ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
			}
			else if (this._code == "6")
			{	
				 ViewController.getInstance().openView(ViewConst.POPUP.ACTREASUREHUNTOFFICEVIEW,{
					aid : AcConst.AID_TREASUREHUNT,
					code : 1
				})
			}
           
		}, this);
        return container;
    }


	private checkHasRewards():boolean
	{	
		let curFlag:number = this._vo.getCurFlag();
		if (curFlag >= this._cfg.getRewardMax())
		{
			curFlag = this._cfg.getRewardMax()-1;
		}
		let rewardsStr = this._cfg.getItemCfg(curFlag).getReward;
		let rewardsVo = GameData.formatRewardItem(rewardsStr);
		for (let i=0; i<rewardsVo.length; i++)
		{
			let onevo = rewardsVo[i];
			if (onevo.type == 10 )
			{	
				if (Api.wifeVoApi.getWifeInfoVoById(onevo.id))
				{
					return true;
				}
			}
			if (onevo.type == 16 )
			{	
				if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(onevo.id))
				{
					return true;
				}
			}
			if (onevo.type == 20 )
			{	
				if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(String(onevo.id)) || Api.otherInfoVoApi.isHasSceneNotAboutUnlock(String(onevo.id), "cityScene") || Api.otherInfoVoApi.isHasSceneNotAboutUnlock(String(onevo.id), "searchScene"))
				{
					return true;
				}
			}
		}

		return false;
	}

	private getRewardsId():number
	{	
		let curFlag:number = this._vo.getCurFlag();
		if (curFlag >= this._cfg.getRewardMax())
		{
			curFlag = this._cfg.getRewardMax()-1;
		}
		let rewardsStr = this._cfg.getItemCfg(curFlag).getReward;
		let rewardsVo = GameData.formatRewardItem(rewardsStr);
		for (let i=0; i<rewardsVo.length; i++)
		{
			let onevo = rewardsVo[i];
			if (onevo.type == 10 || onevo.type == 16)
			{
				return onevo.id;
			}
		}
		return 0;
	}

	private 

	private resetInfo():void
	{	
		let curFlag:number = this._vo.getCurFlag();
		

		if (curFlag >= this._cfg.getRewardMax())
		{
			curFlag = this._cfg.getRewardMax()-1;
			this._btnType = 3;
		}
		let needGem:number = this._cfg.getGemNeed(curFlag);
		if (this._btnType == 3)
		{	
			// if (this._cfg.getRewardMax()==1)
			// {
			// 	this._desc.texture = ResourceManager.getRes("skinpackage_"+this._code+"word2");
			// }
			// else
			// {
				this._desc.texture = ResourceManager.getRes("skinpackage_"+this._code+"word3");
			// }
			
			this._descText.visible = false;
			// this._desc.x =395;
		}
		else
		{
			let xgem:number = needGem - this._vo.chargeNum;
			if (xgem<0)
			{
				xgem = 0;
			}
			if (xgem>0 )
			{	
				this._descText.visible = true;
				this._desc.texture = ResourceManager.getRes("skinpackage_"+this._code+"word1");
				this._descText.text = String(xgem);
				this._descText.x = this._desc.x+105-this._descText.width;
			}	
			else
			{
				this._descText.visible = false;
				this._desc.texture = ResourceManager.getRes("skinpackage_"+this._code+"word2");
			}
		}

		if (this._icons.length > 0)
		{
			 for (var k in this._icons) {
				var v = this._icons[k];
				v.dispose();
			}
			this._icons.length = 0;
		}

		this._icons = this._cfg.getItemCfg(curFlag).rewardIcons;
		this._num.texture = ResourceManager.getRes("skinpackage"+(curFlag+1))

		let offsetx = 265;
		if (this._cfg.getRewardMax()==1)
		{
			this._num.texture = ResourceManager.getRes("skinpackage");
			this.removeChild(this._num);
			this.addChild(this._num);
			this._num.setPosition(58,GameConfig.stageHeigth/2+168);
		}

		for (var k in this._icons) 
		{
			var v = this._icons[k];
			v.setScale(0.8);
			v.setPosition(offsetx+(Number(k)-1)*100, GameConfig.stageHeigth/2+155);
			this.addChild(v);
		}

		
		
		if (this._vo.chargeNum>=needGem )
		{	
			if (this._btnType == 3)
			{
				this._btn.setText("candyGetAlready");
				this._btn.setEnable(false);
			}
			else
			{
				this._btnType = 1;
				this._btn.setText("DragonBoatDayLq");
			}
		}
		else
		{
			if (this._vo.checkIsInEndShowTime())
			{
				this._btnType = 4;
				this._btn.setText("shareOver");
				this._btn.setEnable(false);
			}
			else
			{
				this._btnType = 2;
				this._btn.setText("gotocharge");
			}	
		}
	}


	private clickHandle():void
	{	
		if(GameData.serverTime>this._vo.et)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}

		if (this._btnType ==1 )
		{	
			this._rewards = this._cfg.getItemCfg(this._vo.getCurFlag()).getReward;
			let curFlag:number = this._vo.getCurFlag()+1;
			this.request(NetRequestConst.REQUEST_ACTIVITY_GETSKINPACKAGEREWARD,{activeId:"skinPackage" + "-" + this._code,rkey:curFlag});
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
			this.hide();
		}
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if (data.ret)
		{
			let rData = data.data.data;
			let iconModels:RewardItemVo[] = GameData.formatRewardItem(rData.rewards);
			App.CommonUtil.playRewardFlyAction(iconModels);
			this.resetInfo();

			if (rData.replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
			}
		}
		
	}

	private tick():void
	{	
		if (this._vo.checkIsInEndShowTime())
		{
			this._time.text = LanguageManager.getlocal("crossIntimacyCDTime4");
			if (this._btnType == 2)
			{
				this._btnType = 4;
				this._btn.setText("shareOver");
				this._btn.setEnable(false);
			}
		}
		else
		{
			this._time.text = LanguageManager.getlocal("timelimitwifeview_time",[this._vo.acCountDownNoExtra]);
		}
		this._time.setPosition(GameConfig.stageWidth/2-this._time.width/2,GameConfig.stageHeigth/2+258);
	}

	protected getBgName():string
	{
		return "acskinpackage_bg"+this._code;
	}
	protected getTitleBgName():string
	{
		return null;
	}
	protected getTitleStr():string
	{
		return ""
	}
	protected getCloseBtnName():string
	{
		return null;
	}

    public dispose():void
	{
		this._code = null;
		this._vo = null;
		this._desc = null;
		this._descText = null;
		this._btn = null;
		this._time = null;
		this._cfg = null;
		this._icons.length = 0;
		this._btnType = 0;
		this._rewards = null;
		this._num = null;

		super.dispose();
	}
}