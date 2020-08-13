/**
 * 门客衣装
 * author ycg
 * date 2020.2.19
 * @class AcSkinOfLibaiDetailPopupViewTab4
 */
class AcSkinOfLibaiDetailPopupViewTab4 extends CommonViewTab{
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 680;
        bg.setPosition(25, 50);
        this.addChild(bg);

        let wifeBg = BaseBitmap.create("acthreekingdomrecharge_skinbg");
        wifeBg.setPosition(bg.x + bg.width/2 - wifeBg.width/2, bg.y);
        this.addChild(wifeBg);
        let wifeBgRect = new egret.Rectangle(wifeBg.width /2 - bg.width/2 + 3, 0, bg.width - 6, wifeBg.height);
        wifeBg.mask = wifeBgRect;

        let skinId = this.cfg.show;
        let skinCfg: Config.ServantskinItemCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let rect = new egret.Rectangle(0, 0, wifeBg.width, wifeBg.height-7);
		let maskContan = new BaseDisplayObjectContainer();
		maskContan.width = wifeBg.width;
		maskContan.height = wifeBg.height - 7;
		maskContan.mask = rect;
		maskContan.setPosition(wifeBg.x, wifeBg.y);
        this.addChild(maskContan);

        let boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
			let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
			droWifeIcon.setScale(0.9);
			droWifeIcon.anchorOffsetY = droWifeIcon.height;
			droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2;
            if (skinId == 10361){
                droWifeIcon.x = maskContan.width / 2 - 25;
            }
			droWifeIcon.y = maskContan.y + maskContan.height;
			maskContan.addChild(droWifeIcon);
		}
		else {
			let skinImg = BaseLoadBitmap.create(skinCfg.body);
			skinImg.width = 406;
			skinImg.height = 467;
			skinImg.anchorOffsetY = skinImg.height;
			skinImg.anchorOffsetX = skinImg.width / 2;
			skinImg.setScale(0.9);
			skinImg.x = maskContan.width / 2;
			skinImg.y = maskContan.y + maskContan.height;
			maskContan.addChild(skinImg);
        }
        
        let wifeLine = BaseBitmap.create("acthrowstone_preview_line");
        wifeLine.setPosition(wifeBg.x + wifeBg.width/2 - wifeLine.width/2, wifeBg.y + wifeBg.height - wifeLine.height + 4);
        this.addChild(wifeLine);

		let skinnamebg = BaseBitmap.create("skin_detail_namebg");
		skinnamebg.setPosition(wifeBg.x, wifeBg.y + 20);
		this.addChild(skinnamebg);

		let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
		skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        this.addChild(skinNameTxt);

        let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        this.addChild(servantNameTxt);
        
        let msgBg = BaseBitmap.create("acthrowstone_preview_msg_bg");
        msgBg.setPosition(bg.x + bg.width/2 - msgBg.width/2, bg.y);
        this.addChild(msgBg);

        let msgLine = BaseBitmap.create("acthrowstone_preview_line");
        msgLine.setPosition(msgBg.x + msgBg.width/2 - msgLine.width/2, msgBg.y + msgBg.height - msgLine.height + 2);
        this.addChild(msgLine);

        let needData = this.vo.getShowSkinData();
        let topMsg = ComponentManager.getTextField(LanguageManager.getlocal("acSkinoflibaiSkinTopMsg-"+this.getTypeCode(), [String(needData.needNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topMsg.setPosition(msgBg.x + msgBg.width/2 - topMsg.width/2, msgBg.y + msgBg.height/2 - topMsg.height/2);
        this.addChild(topMsg);

		let buttomBg = BaseBitmap.create("public_9_bg14");
        buttomBg.width = 516;
        buttomBg.height = 274;
        buttomBg.setPosition(wifeBg.x + wifeBg.width / 2 - buttomBg.width / 2, wifeBg.y + wifeBg.height + 4);
        this.addChild(buttomBg);

        let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg.x + buttomBg.width / 2 - skinTipTxt.width / 2, buttomBg.y + 20);
        this.addChild(skinTipTxt);

        let addAbility = skinCfg.addAbility;
        for (let index = 0; index < addAbility.length; index++) {
            let bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index,addAbility[index], [skinCfg.id]);
            bnode.setPosition(skinTipTxt.x -5 + index%2*245, skinTipTxt.y + skinTipTxt.height + 5+ Math.floor(index/2)*92);
            this.addChild(bnode);
        }
    }

	private get cfg() : Config.AcCfg.SkinOfLibaiCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcSkinOfLibaiVo{
        return <AcSkinOfLibaiVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private getTypeCode():string{
        let code = this.code;
        if (code == "2"){
            return "1";
        }
        return code;
    }
    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

    public dispose(){
        super.dispose();
    }
}