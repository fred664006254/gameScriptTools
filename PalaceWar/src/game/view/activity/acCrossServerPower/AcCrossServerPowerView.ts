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

	protected getResourceList():string[]
	{
		let list:string[] = [];
		if (this.vo && this.vo.checkIsFengyun()){
			list = [
				`crosspowertitle-`+this.getUiCode()+`${this.vo.isCrossLeague()?`_multicross`:``}`
			];
		}
		return super.getResourceList().concat([
			"crossserverinti_detailbg-1","crossserverintibg-1",`crosspowertitle${this.vo.isCrossLeague()?`_multicross`:``}`,
			"public_9_wordbg2","crosspowerenter","crosspowerenter_down","crossserverpower_canjoin","crosspowerenterbg-1",
			"crosspowerenterbg-"+this.getUiCode(), "crosspowerentertopbg-"+this.getUiCode(), "acwealthcarpview_servantskintxt",
		]).concat(list);
	}

	protected initTitle() : void{

	}

	protected getBgName():string
	{
		return `crosspowerenterbg-`+this.getUiCode();
	}

	protected getCloseBtnName():string
	{
		return ButtonConst.POPUP_CLOSE_BTN_1;
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


	public initView():void
	{	
		let view = this;
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER, {});
		
		if (this.getUiCode() == "7"){
			let skinBg = BaseBitmap.create(App.CommonUtil.getResByCode("crosspowerentertopbg", this.getUiCode()));
			skinBg.setPosition(0, GameConfig.stageHeigth - skinBg.height);

			if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang()){
				view.addChildToContainer(skinBg);
			}
			else{
				//门客衣装
				let skinId = this.vo.getShowSkinId();
				let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
				let skinBoneName = skinCfg.bone+"_ske";
				if ((!Api.switchVoApi.checkCloseBone()) && skinBoneName && RES.hasRes(skinBoneName) && App.CommonUtil.check_dragon()) {
					let skin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					skin.anchorOffsetY = skin.height;
					skin.setScale(1.2);
					skin.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth - 310);
					this.addChildToContainer(skin);
				}
				else{
					let skinImg = BaseLoadBitmap.create(skinCfg.body);
					skinImg.width = 405;
					skinImg.height = 467;
					skinImg.anchorOffsetY = skinImg.height;
					skinImg.setScale(1.1);
					skinImg.x = GameConfig.stageWidth/2 - skinImg.width/2;
					skinImg.y = GameConfig.stageHeigth - 340;
					this.addChildToContainer(skinImg);
				}
				view.addChildToContainer(skinBg);

				//衣装预览
				let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
				skinTxtEffect.width = 208;
				skinTxtEffect.height = 154;
				skinTxtEffect.setPosition(GameConfig.stageWidth/2 - skinTxtEffect.width/2, GameConfig.stageHeigth - 455);
				skinTxtEffect.blendMode = egret.BlendMode.ADD;
				this.addChildToContainer(skinTxtEffect);
				skinTxtEffect.playWithTime(-1);
		
				let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
				skinTxt.anchorOffsetX = skinTxt.width / 2;
				skinTxt.anchorOffsetY = skinTxt.height / 2;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
				this.addChildToContainer(skinTxt);
				egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
		
				let skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
				skinTxt1.anchorOffsetX = skinTxt1.width / 2;
				skinTxt1.anchorOffsetY = skinTxt1.height / 2;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
				this.addChildToContainer(skinTxt1);
				skinTxt1.blendMode = egret.BlendMode.ADD;
				skinTxt1.alpha = 0;
				egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
				// skinTxt1.addTouchTap(() => {
				// 	ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERPOWERCHEERVIEW , {aid: this.aid, code: this.code});
				// }, this);

				let alpha = BaseBitmap.create(`public_alphabg`);
				alpha.width = 160;
				alpha.height = 70;
				alpha.setPosition(skinTxt.x - alpha.width/2, skinTxt.y - 40);
				this.addChildToContainer(alpha);
				alpha.addTouchTap(() => {
					ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERPOWERCHEERVIEW , {aid: this.aid, code: this.code});
				}, this);
			}
		}

		//参赛资格
		let canJoin = this.vo.getIsCanJoin();
		let canJoinImgStr = App.CommonUtil.getResByCode(`crossserverpower_canjoin`, this.getUiCode());
		view._canJoinImg = BaseLoadBitmap.create(App.CommonUtil.getCrossLeagueRes(canJoinImgStr, view.vo.isCrossLeague()));
		view._canJoinImg.visible = canJoin;
		view.addChildToContainer(view._canJoinImg);
		view._canJoinImg.y = -15;
		
		let titleImgStr = App.CommonUtil.getResByCode(`crosspowertitle`, this.getUiCode());
		App.LogUtil.log("titleImgStr "+titleImgStr);
		let title = BaseBitmap.create(App.CommonUtil.getCrossLeagueRes(titleImgStr,view.vo.isCrossLeague()));
		title.x = (GameConfig.stageWidth - 409) / 2;
		title.y = 23;
		view.addChildToContainer(title);

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

		view._enterBtn = ComponentManager.getButton(`crosspowerenter`, '', view.enterInHandler,this);
		if(view._cdType > 1 && view._cdType < 4){
			view._enterBtn.setEnable(true);
		}
		else{
			//灰化
			view._enterBtn.setEnable(false);
		}
		//进入按钮
		view._enterBtn.setPosition(GameConfig.stageWidth / 2 - 208 / 2, bottomBg.y - 179 - 25);
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
		let ruleStr = App.CommonUtil.getCnByCode("crossPowerRule", view.getUiCode());
		let ruleInfoStr = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(ruleStr,view.vo.isCrossLeague()));
		if (this.getUiCode() == "7"){
			let lv = LanguageManager.getlocal("officialTitle"+this.cfg.needLv);
			ruleInfoStr = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(ruleStr,view.vo.isCrossLeague()), [lv]);
		}
		let ruleDesc : BaseTextField = ComponentManager.getTextField(ruleInfoStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleDesc.width = GameConfig.stageWidth - 20;
		ruleDesc.lineSpacing = 6;
		ruleDesc.x = timeDesc.x;
		ruleDesc.y = view._cdTimeDesc.y + view._cdTimeDesc.textHeight + 5;
		view.addChildToContainer(ruleDesc);

		// view.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [-20,-20]);
		 view.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [0,0]);
	}

	protected getUiCode():string
	{
		let code = `1`;
		switch(Number(this.code)){
			default:
				code = `1`;
				if (this.vo.checkIsFengyun()){
					code = "7";
				}
				break;
		}
		return code;
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
				code : this.code,
				getUiCode : this.getUiCode(),
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
		super.dispose();
	}
}