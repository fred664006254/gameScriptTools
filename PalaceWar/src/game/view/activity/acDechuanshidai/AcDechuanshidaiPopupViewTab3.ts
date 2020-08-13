/*
author : qinajun
desc : 门客预览
*/
class AcDechuanshidaiPopupViewTab3 extends AcCommonViewTab
{
	//滑动列表
	private _nodeContainer:BaseDisplayObjectContainer = null;

	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	private get cfg() : Config.AcCfg.DechuanshidaiCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDechuanshidaiVo{
        return <AcDechuanshidaiVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
	
	protected initView():void
	{	
		let view = this;
		// let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.height = 660;
		view.width = 545;
		let code = this.getUiCode();
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 535;
		Bg.height = 658;
        Bg.x = 30;
        Bg.y = 55;
		view.addChild(Bg);

		let wifeId = view.cfg.getServant(code);
        let wifeCfg: Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        let isWife = false;
        if(wifeCfg){
            isWife = true;
		}
		let need = 0;
		//佳人
		if (isWife){
			for(let i in view.cfg.recharge){
				let unit : Config.AcCfg.DSRechargeItemCfg = view.cfg.recharge[i];
				if(unit.getReward.indexOf(wifeId) > -1){
					need = unit.needGem;
					break;
				}
			}
			let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
			let bg = BaseLoadBitmap.create(`sevendayssignupview_infobg_7`);
			bg.width = 536;
			bg.height = 400;
			bg.setPosition(this.width / 2 - bg.width / 2 + 13, 90);
			this.addChild(bg);

			let rect = new egret.Rectangle(0, 0, 536, 368);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 536;
			maskContan.height = 368;
			maskContan.mask = rect;
			maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
			this.addChild(maskContan);

			let boneName = undefined;
			let wife = null;
			if (wifeCfg && wifeCfg.bone) {
				boneName = wifeCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
				wife.width = 354;
				wife.height = 611;
				wife.mask = new egret.Rectangle(-354, -800, 914, 700);
				wife.setScale(0.7);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [270, 468]);
			}
			else {
				wife = BaseLoadBitmap.create(wifeCfg.body);
				wife.setScale(0.5);
				wife.mask = new egret.Rectangle(0, 0, 640, 700);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [125, 49]);
			}
			view.addChild(wife);

			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 536;
			topbg.height = 40;
			topbg.setPosition(this.width / 2 - topbg.width / 2 + 13, 56);
			this.addChild(topbg);

			let topbgLine = BaseLoadBitmap.create("herosavebeauty_sideline");
			topbgLine.width = 536;
			topbgLine.setPosition(topbg.x, topbg.y - 2);
			this.addChild(topbgLine);
			
			let str = LanguageManager.getlocal("battlepassunlockwifetip",[String(need), wifeCfg.name]);
			let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 - 2);
			this.addChild(topDesc);

			let skinnamebg = BaseLoadBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			skinnamebg.setScale(0.9);
			this.addChild(skinnamebg);

			let skinNameTitle = ComponentManager.getTextField(LanguageManager.getlocal('wife') , TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTitle.width = 120;
			skinNameTitle.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTitle.setPosition(57, 138);
			this.addChild(skinNameTitle);

			let skinNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			skinNameTxt.width = 120;
			skinNameTxt.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTxt.setPosition(57, 162);
			this.addChild(skinNameTxt);

			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 210;
			buttomBg.setPosition(this.width / 2 - buttomBg.width / 2 + 13, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 524;
			buttomBg2.height = 204;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);

			let descBg = BaseBitmap.create(`public_9_managebg`);
			descBg.width = 500;
			descBg.height = 95;
			descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
			this.addChild(descBg);

			//let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
			//初始魅力
			let initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [wifeCfg.glamour + '']);
			let initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			initialCharmTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
			this.addChild(initialCharmTxt);
			//加成门客
			let servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [servantCfg.name]);
			let servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			servantAddTxt.setPosition(buttomBg.x + 30, initialCharmTxt.y + 30);
			this.addChild(servantAddTxt);

			let wifeDescStr = LanguageManager.getlocal('wifeDesc_' + wifeId);
			let wifeDescTxt = ComponentManager.getTextField(wifeDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			wifeDescTxt.lineSpacing = 3;
			wifeDescTxt.width = descBg.width - 50;
			wifeDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
			this.addChild(wifeDescTxt);
		}
		else {
			let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(wifeId);
			let dagonBonesName = `servant_full2_${wifeId}`;

			let bg = BaseLoadBitmap.create(`acchristmasview_rewardmidbg`);
			bg.width = 536;
			bg.height = 400;
			bg.setPosition(this.width / 2 - bg.width / 2 + 25, 90);
			this.addChild(bg);

			let rect = new egret.Rectangle(0, 0, 536, 368);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 536;
			maskContan.height = 368;
			maskContan.mask = rect;
			maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
			this.addChild(maskContan);

			let boneName = undefined;
			let servant = null;
			if (servantCfg && dagonBonesName) {
				boneName = dagonBonesName + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				servant = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
				servant.setScale(0.8);
				servant.mask = new egret.Rectangle(-354, -609, 914, 580);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servant, bg, [267, 419]);
			}
			else {
				servant  = BaseLoadBitmap.create(servantCfg.fullIcon);
				servant.width = 405;
				servant.height = 467;
				servant.setScale(0.8);
				servant.mask = new egret.Rectangle(0, 0, 405, 467);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servant, bg, [110, 20]);
			}
			view.addChild(servant);

			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 536;
			topbg.height = 40;
			topbg.setPosition(this.width / 2 - topbg.width / 2 + 25, 58);
			this.addChild(topbg);

			let topbgLine = BaseLoadBitmap.create("herosavebeauty_sideline");
			topbgLine.width = 536;
			topbgLine.setPosition(topbg.x, topbg.y);
			this.addChild(topbgLine);

			let str = LanguageManager.getlocal(`acDechuanshidaitip2-${code}`,[servantCfg.name]);
			let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 - 2);
			this.addChild(topDesc);

			let skinnamebg = BaseLoadBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			skinnamebg.setScale(0.9);
			this.addChild(skinnamebg);

			let skinNameTitle = ComponentManager.getTextField(LanguageManager.getlocal('servant'), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTitle.width = 120;
			skinNameTitle.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTitle.setPosition(57, 138);
			this.addChild(skinNameTitle);

			let skinNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			skinNameTxt.width = 120;
			skinNameTxt.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTxt.setPosition(57, 162);
			this.addChild(skinNameTxt);


			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 210;
			buttomBg.setPosition(this.width / 2 - buttomBg.width / 2 + 25, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 524;
			buttomBg2.height = 204;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);


			let descBg = BaseBitmap.create(`public_9_managebg`);
			descBg.width = 500;
			descBg.height = 95;
			descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
			this.addChild(descBg);

			//综合资质
			let aptitudeStr = LanguageManager.getlocal("acCommonServantPopupViewcAptitude", [Api.servantVoApi.getServantAptitude(wifeId)+'']);
			let aptitudeTxt = ComponentManager.getTextField(aptitudeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			aptitudeTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
			this.addChild(aptitudeTxt);
			//门客特长
			let speciality = servantCfg.speciality;
			let specialityStr = "";
			for (let i = 0; i < speciality.length; i++) {
				specialityStr += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，"
			}
			let servantTFStr = LanguageManager.getlocal('acCommonServantPopupViewcAdvantage', [specialityStr.substr(0, specialityStr.length - 1)]);
			let servantTF = ComponentManager.getTextField(servantTFStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			//let servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			servantTF.setPosition(buttomBg.x + 30, aptitudeTxt.y + 30);
			this.addChild(servantTF);

			let servantDescStr = servantCfg.story;
			let servantDescTxt = ComponentManager.getTextField(servantDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			servantDescTxt.lineSpacing = 3;
			servantDescTxt.width = descBg.width - 50;
			servantDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
			this.addChild(servantDescTxt);

			if(servantCfg.quality2)
			{	
				let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
				cornerImg.x = 475;
				cornerImg.y = 403;
				cornerImg.setScale(1.3);
				this.addChild(cornerImg);
			}
		}
	}

	public dispose():void
	{	
		this._nodeContainer =null;
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
		super.dispose();
	}
}