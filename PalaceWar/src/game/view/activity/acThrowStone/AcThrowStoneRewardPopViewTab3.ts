/**
 * 门客预览
 * author yangchengguo
 * date 2019.8.20
 * @class AcThrowStoneRewardPopViewTab3
 */
class AcThrowStoneRewardPopViewTab3 extends AcCommonViewTab{
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

        let needData = this.vo.getServantData();
        let topMsg = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneServantTopMsg-"+this.getTypeCode(), [String(needData.needNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topMsg.setPosition(msgBg.x + msgBg.width/2 - topMsg.width/2, msgBg.y + msgBg.height/2 - topMsg.height/2);
        this.addChild(topMsg);

        let servantBg = BaseBitmap.create("acthrowstone_servant_preview_bg");
        servantBg.setPosition(msgBg.x + msgBg.width/2 - servantBg.width/2, msgBg.y + msgBg.height);
        this.addChild(servantBg);

        let servantId = this.cfg.show2;
        let servantCfg = Config.ServantCfg.getServantItemById(servantId);
        let rect = new egret.Rectangle(0, 0, servantBg.width, servantBg.height);
		let maskContan = new BaseDisplayObjectContainer();
		maskContan.width = servantBg.width;
		maskContan.height = servantBg.height;
		maskContan.mask = rect;
		maskContan.setPosition(servantBg.x, servantBg.y);
        this.addChild(maskContan);

        // let dagonBonesName = Api.servantVoApi.getServantBoneId(servantId);
        // let boneName = undefined;
		// if (servantCfg && dagonBonesName) {
        //     boneName = dagonBonesName + "_ske";
        // }
        let dagonBonesName = "servant_full2_" + servantId;
        let boneName = undefined;
        if (servantCfg && dagonBonesName) {
            boneName = dagonBonesName + "_ske";
        }
        App.LogUtil.log("boneNAME:"+dagonBonesName);
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
			let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
			droWifeIcon.setScale(0.8);
			droWifeIcon.anchorOffsetY = droWifeIcon.height;
			droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
			droWifeIcon.x = maskContan.width / 2;
			droWifeIcon.y = maskContan.y + maskContan.height - 30;
			maskContan.addChild(droWifeIcon);
		}
		else {
			let servantImg = BaseLoadBitmap.create(servantCfg.fullIcon);
            servantImg.width = 405;
            servantImg.height = 467;
            servantImg.anchorOffsetY = servantImg.height;
            servantImg.anchorOffsetX = servantImg.width / 2;
            servantImg.setScale(0.89);
            servantImg.x = maskContan.width / 2;
            servantImg.y = maskContan.y + maskContan.height;
            maskContan.addChild(servantImg);
        }
        
        let servantLine = BaseBitmap.create("acthrowstone_preview_line");
        servantLine.setPosition(servantBg.x + servantBg.width/2 - servantLine.width/2, servantBg.y + servantBg.height - servantLine.height + 4);
        this.addChild(servantLine);

		let skinnamebg = BaseBitmap.create("skin_detail_namebg");
		skinnamebg.setPosition(servantBg.x, servantBg.y + 20);
		this.addChild(skinnamebg);

		let skinNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
		skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
		this.addChild(skinNameTxt);

		let buttomBg = BaseBitmap.create("public_9_bg14");
        buttomBg.width = 516;
        buttomBg.height = 244;
        buttomBg.setPosition(servantBg.x + servantBg.width / 2 - buttomBg.width / 2, servantBg.y + servantBg.height + 7);
        this.addChild(buttomBg);

        let descBg = BaseBitmap.create(`public_9_managebg`);
        descBg.width = 500;
        descBg.height = 134;
        descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
        this.addChild(descBg);

		let aptitudeTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAptitude", [String(Api.servantVoApi.getServantAptitude(servantCfg.id))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		aptitudeTF.setPosition(buttomBg.x + 30, buttomBg.y + 30);
		this.addChild(aptitudeTF);

		let speciality = servantCfg.speciality;
		let str = "";
		for (let i = 0; i < speciality.length; i++) {
			str += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，"
		}

		let servantTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAdvantage", [str.substr(0, str.length - 1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		servantTF.setPosition(buttomBg.x + 30, aptitudeTF.y + 30);
        this.addChild(servantTF);
        
        let servantDescTxt = ComponentManager.getTextField(servantCfg.story, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
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