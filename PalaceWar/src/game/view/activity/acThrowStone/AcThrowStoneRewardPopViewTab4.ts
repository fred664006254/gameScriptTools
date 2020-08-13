/**
 * 佳人预览
 * author yangchengguo
 * date 2019.8.20
 * @class AcThrowStoneRewardPopViewTab4
 */
class AcThrowStoneRewardPopViewTab4 extends AcCommonViewTab{
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 680;
        bg.setPosition(25, 60);
        this.addChild(bg);

        let msgBg = BaseBitmap.create("acthrowstone_preview_msg_bg");
        msgBg.setPosition(bg.x + bg.width/2 - msgBg.width/2, bg.y);
        this.addChild(msgBg);

        let msgLine = BaseBitmap.create("acthrowstone_preview_line");
        msgLine.setPosition(msgBg.x + msgBg.width/2 - msgLine.width/2, msgBg.y + msgBg.height - msgLine.height + 2);
        this.addChild(msgLine);

        let needData = this.vo.getWifeData();
        let topMsg = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneWifeTopMsg-"+this.getTypeCode(), [String(needData.needNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topMsg.setPosition(msgBg.x + msgBg.width/2 - topMsg.width/2, msgBg.y + msgBg.height/2 - topMsg.height/2);
        this.addChild(topMsg);

        let wifeBg = BaseBitmap.create("acthrowstone_servant_preview_bg");
        wifeBg.setPosition(msgBg.x + msgBg.width/2 - wifeBg.width/2, msgBg.y + msgBg.height);
        this.addChild(wifeBg);

        let wifeId = this.cfg.show1;
        let wifeCfg: Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
        let rect = new egret.Rectangle(0, 0, wifeBg.width, wifeBg.height);
		let maskContan = new BaseDisplayObjectContainer();
		maskContan.width = wifeBg.width;
		maskContan.height = wifeBg.height;
		maskContan.mask = rect;
		maskContan.setPosition(wifeBg.x, wifeBg.y);
        this.addChild(maskContan);

        let boneName = undefined;
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
        }
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
			let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
			droWifeIcon.setScale(0.72);
			droWifeIcon.anchorOffsetY = droWifeIcon.height;
			droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
			droWifeIcon.x = maskContan.width / 2;
			droWifeIcon.y = maskContan.y + maskContan.height;
			maskContan.addChild(droWifeIcon);
		}
		else {
			let wifeImg = BaseLoadBitmap.create(wifeCfg.body);
			wifeImg.width = 640;
			wifeImg.height = 840;
			wifeImg.anchorOffsetY = wifeImg.height;
			wifeImg.anchorOffsetX = wifeImg.width / 2;
			wifeImg.setScale(0.52);
			wifeImg.x = maskContan.width / 2;
			wifeImg.y = maskContan.y + maskContan.height;
			maskContan.addChild(wifeImg);
        }
        
        let wifeLine = BaseBitmap.create("acthrowstone_preview_line");
        wifeLine.setPosition(wifeBg.x + wifeBg.width/2 - wifeLine.width/2, wifeBg.y + wifeBg.height - wifeLine.height + 4);
        this.addChild(wifeLine);

		let skinnamebg = BaseBitmap.create("skin_detail_namebg");
		skinnamebg.setPosition(wifeBg.x, wifeBg.y + 20);
		this.addChild(skinnamebg);

		let skinNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
		skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
		this.addChild(skinNameTxt);

		let buttomBg = BaseBitmap.create("public_9_bg14");
        buttomBg.width = 516;
        buttomBg.height = 244;
        buttomBg.setPosition(wifeBg.x + wifeBg.width / 2 - buttomBg.width / 2, wifeBg.y + wifeBg.height + 7);
        this.addChild(buttomBg);

        let descBg = BaseBitmap.create(`public_9_managebg`);
        descBg.width = 500;
        descBg.height = 134;
        descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
        this.addChild(descBg);

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

        // let wifeDescStr = LanguageManager.getlocal('wifeDesc_' + wifeId);
        let wifeDescTxt = ComponentManager.getTextField(wifeCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        wifeDescTxt.lineSpacing = 3;
        wifeDescTxt.width = descBg.width - 50;
        wifeDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
        this.addChild(wifeDescTxt);
    }

	private get cfg():Config.AcCfg.ThrowStoneCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.getAid(), this.getCode());
	}
	
    private get vo():AcThrowStoneVo{
        return <AcThrowStoneVo>Api.acVoApi.getActivityVoByAidAndCode(this.getAid(), this.getCode());
    }

    private getAid():string{
        return this.aid ? this.aid : this.param.data.aid;
    }

    private getCode():string{
        return this.code ? this.code : this.param.data.code;
    }

    private getTypeCode():string{
        let code = this.getCode();
        if (code == "2"){
            return "1";
        }
        return code;
    }

    public dispose(){
        super.dispose();
    }
}