class AcCrossServerServantRewardViewTab3 extends CommonViewTab {
	private _debrisInfoList: { skinId: string; rewaradVo: RewardItemVo; debrisBg: BaseBitmap; debris: BaseLoadBitmap; numBg: BaseBitmap; numTxt: BaseTextField; receiveBg: BaseBitmap; goticon: BaseBitmap; }[] = [];
	private get api(): AcCrossServerServantVoApi {
		return Api.crossServerServantVoApi;
	}

	public constructor(parm) {
		super();
		this.initView();
		this.param = parm;
	}

	protected getListType(): number {
		return 3;
	}
	protected initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_SERVANTPK_EXCHANGESERVANTSKIN, this.refreashView, this);
		let view = this;
		view.createVS(1);
		view.createVS(2);
	}

	private createVS(area): void {
		let view = this;
		view.width = 570;
		view.height = 663;

		let bg = BaseBitmap.create("crossservantskinbg");
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view, [3, 55 + ((area - 1) * 264)], );
		view.addChild(bg);

		let cfg = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(area));
		//门客图像
		let man = BaseLoadBitmap.create(cfg.body);
		man.setScale(0.6);
		man.width = 405;
		man.height = 430;
		man.mask = new egret.Rectangle(0, 0, 405, 430);
		// view.setLayoutPosition(LayoutConst.leftverticalCenter, man, bg, [20,0]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, man, bg, [100, 0]);
		view.addChild(man);
		//名字背景
		let zchiImg = BaseBitmap.create('crossservantnamebg');
		// view.setLayoutPosition(LayoutConst.lefttop, zchiImg, man, [man.width * man.scaleX + 80,40]);
		zchiImg.setPosition(bg.x + 87, bg.y + 34);
		view.addChild(zchiImg);
		//名字
		let nameTxt = ComponentManager.getTextField(Config.ServantCfg.getServantItemById(view.api.getVsServant(area)).name, 20);
		if (!PlatformManager.checkIsTextHorizontal()) {
			nameTxt.width = 20;
			// view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, zchiImg);
			nameTxt.setPosition(zchiImg.x + zchiImg.width / 2 - nameTxt.width / 2, zchiImg.y + + zchiImg.height / 2 - nameTxt.height / 2);
		}
		else {
			// man.x += 230;
			zchiImg.y += 25;
			zchiImg.width = nameTxt.width + 20;
			zchiImg.x = bg.x + 5;
			nameTxt.setPosition(zchiImg.x + 10, zchiImg.y + zchiImg.height / 2 - nameTxt.height / 2);
		}


		view.addChild(nameTxt);
		//名字背景
		let skinbg = BaseBitmap.create('crossservantskinnamebg');
		// view.setLayoutPosition(LayoutConst.righttop, skinbg, bg, [70,0]);
		skinbg.setPosition(bg.x + 30, bg.y);
		view.addChild(skinbg);
		//名字
		let skinnameTxt = ComponentManager.getTextField(cfg.getSkinName(), 20);
		if (!PlatformManager.checkIsTextHorizontal()) {
			skinnameTxt.width = 20;
			// view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinbg);
			skinnameTxt.setPosition(skinbg.x + skinbg.width / 2 - skinnameTxt.width / 2, skinbg.y + 15);
		}
		else {
			skinbg.y += 10;
			skinbg.x = zchiImg.x;
			skinnameTxt.setPosition(skinbg.x + 10, skinbg.y + skinbg.height / 2 - skinnameTxt.height / 2);
		}

		view.addChild(skinnameTxt);

		//碎片相关
		
		let debrisBgScale = 0.9;
		let debrisBg = BaseBitmap.create("forpeople_bottom");
		debrisBg.setScale(debrisBgScale);
		debrisBg.setPosition(bg.x + bg.width - debrisBg.width - 25, bg.y + 25);
		view.addChild(debrisBg);
		let servantCfg = Config.ServantCfg.getServantItemById(view.api.getVsServant(area));
		// debrisBg.addTouchTap(()=>{
		// 	if(!Api.servantVoApi.getServantObj(servantCfg.id))
		// 	{
		// 		App.CommonUtil.showTip(LanguageManager.getlocal("crossserverNotServantTip",[servantCfg.name]));
		// 		return;
		// 	}
		// 	ViewController.getInstance().openView(ViewConst.POPUP.SKINCOMPOSEPOPUPVIEW,{skinId:cfg.id,aid:this.param.data.aid,code:this.param.data.code,servantId:servantCfg.id});
		// },this);
		let rewaradVo = GameData.formatRewardItem(cfg.exchangeItem)[0];
		let debrisScale = 0.8;
		let debris = BaseLoadBitmap.create("itemicon" + rewaradVo.id);
		debris.width = 100;
		debris.height = 100;
		debris.setScale(debrisScale);
		debris.setPosition(debrisBg.x + debrisBg.width * debrisBgScale / 2 - debris.width * debrisScale / 2, debrisBg.y + debrisBg.height * debrisBgScale / 2 - debris.height * debrisScale / 2);
		
		debris.addTouchTap(() => {
			if (!Api.servantVoApi.getServantObj(servantCfg.id)) {
				App.CommonUtil.showTip(LanguageManager.getlocal("crossserverNotServantTip", [servantCfg.name]));
				return;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.SKINCOMPOSEPOPUPVIEW, { skinId: cfg.id, aid: this.param.data.aid, code: this.param.data.code, servantId: servantCfg.id });
		}, this);

		let numBg = BaseBitmap.create("promotenamebg");
		numBg.width = 90;
		numBg.height = 25;
		numBg.setPosition(debrisBg.x + debrisBg.width * debrisBgScale / 2 - numBg.width / 2, debrisBg.y + debrisBg.height * debrisBgScale - 10);
		

		let debrisNum = Api.itemVoApi.getItemNumInfoVoById(rewaradVo.id);
		let numTxt = ComponentManager.getTextField(debrisNum + "/" + rewaradVo.num, TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// if (cfg.canExchangeItem())
		// {
			view.addChild(debris);
			numTxt.setPosition(numBg.x + numBg.width / 2 - numTxt.width / 2, numBg.y + numBg.height / 2 - numTxt.height / 2);
			view.addChild(numBg);
			view.addChild(numTxt);
		// }
		// else
		// {
			let goticon = BaseLoadBitmap.create("public_had");
			goticon.setPosition(debrisBg.x+7,debrisBg.y+16);
			view.addChild(goticon);
		// }
		

		let receiveBgScale = 0.7;
		let receiveBg = BaseBitmap.create("collectflag");
		receiveBg.setScale(receiveBgScale);
		receiveBg.setPosition(debrisBg.x + debrisBg.width * debrisBgScale / 2 - receiveBg.width * receiveBgScale / 2, debrisBg.y + debrisBg.height * debrisBgScale / 2 - receiveBg.height * receiveBgScale / 2);
		view.addChild(receiveBg);

		let debrisInfo: 
		{ skinId: string; rewaradVo: RewardItemVo; debrisBg: BaseBitmap; debris: BaseLoadBitmap; numBg: BaseBitmap; numTxt: BaseTextField; receiveBg: BaseBitmap; goticon: BaseBitmap; } 
		= { skinId: cfg.id, rewaradVo: rewaradVo, debrisBg: debrisBg, debris: debris, numBg: numBg, numTxt: numTxt, receiveBg: receiveBg, goticon:goticon }
		this._debrisInfoList.push(debrisInfo);

		let timedescbg = BaseBitmap.create('public_searchdescbg');
		timedescbg.width = bg.width - 50;
		timedescbg.height = 30;
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, timedescbg, bg, [0, 10]);
		view.addChild(timedescbg);
		//名字
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossserverSkinGet', [cfg.name]), 20, TextFieldConst.COLOR_WARN_GREEN);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, timedescbg);
		view.addChild(tipTxt);

		//tip
		if (!Api.servantVoApi.getServantObj(servantCfg.id)) {
			let noServantTip = ComponentManager.getTextField(LanguageManager.getlocal("crossserverNotServant", [servantCfg.name]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
			noServantTip.setPosition(bg.x + bg.width / 2 - noServantTip.width / 2, timedescbg.y - noServantTip.height - 5);
			view.addChild(noServantTip);
		}



		let kuang = BaseBitmap.create("crossservantskinkuang");
		kuang.width = 510;
		kuang.height = 260;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, kuang, bg, [-2, -2]);
		view.addChild(kuang);

		this.refreashView();
	}

	private refreashView() {
		for (let i = 0; i < this._debrisInfoList.length; i++) {
			let debrisInfo = this._debrisInfoList[i];

			let cfg = Config.ServantskinCfg.getServantSkinItemById(debrisInfo.skinId);

			// if (Api.servantVoApi.isOwnSkinOfSkinId(debrisInfo.skinId)) {
			if (!cfg.canExchangeItem()){
				debrisInfo.numBg.setVisible(false);
				debrisInfo.numTxt.setVisible(false);
				debrisInfo.receiveBg.setVisible(false);
				debrisInfo.debris.setVisible(false);
				debrisInfo.goticon.setVisible(true);
			}
			else {
				let debrisNum = Api.itemVoApi.getItemNumInfoVoById(debrisInfo.rewaradVo.id);
				let needNum = debrisInfo.rewaradVo.num;
				let str: string = "";
				str = "(" + debrisNum + "/" + needNum + ")";
				if (debrisNum >= needNum) {
					str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN);
				}
				else {
					str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
				}
				debrisInfo.numTxt.text = str;
				debrisInfo.numTxt.setPosition(debrisInfo.numBg.x + debrisInfo.numBg.width / 2 - debrisInfo.numTxt.width / 2, debrisInfo.numBg.y + debrisInfo.numBg.height / 2 - debrisInfo.numTxt.height / 2);
				debrisInfo.numBg.setVisible(true);
				debrisInfo.numTxt.setVisible(true);
				debrisInfo.receiveBg.setVisible(false);
				debrisInfo.debris.setVisible(true);
				debrisInfo.goticon.setVisible(false);
			}
		}
	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_SERVANTPK_EXCHANGESERVANTSKIN, this.refreashView, this);
		this._debrisInfoList = [];
		super.dispose();
	}

}