/**
 * 衣装预览
 * date 2020.4.2
 * @class AcKiteDetailPopupViewTab4
 */
class AcKiteDetailPopupViewTab4 extends CommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        let view = this;

        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(46, 50);
        this.addChild(rewardBg);

        let container = new BaseDisplayObjectContainer();
        container.width = 530;
        this.addChild(container);
        container.x = 46;
        container.y = 55;
        
        let skinId = this.cfg.corePrize;
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let bg = BaseBitmap.create("ackite_skinbg");
        container.addChild(bg);
        bg.x = container.width/2 - bg.width/2;

        let rect = new egret.Rectangle(0,0,522, 364);
        let maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 522; // 544
        maskContan.height = 364;
        maskContan.mask =rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
        container.addChild(maskContan);

        let boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantIcon.setScale(0.8);
            servantIcon.anchorOffsetY = servantIcon.height;
            servantIcon.anchorOffsetX = servantIcon.width / 2;
            servantIcon.x = maskContan.width / 2;
            servantIcon.y = maskContan.y + maskContan.height - 6;//-5
            maskContan.addChild(servantIcon);
        }
        else {
            let skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.85);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 5;
            maskContan.addChild(skinImg);
        }
	
        let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 30);
        container.addChild(skinnamebg);

        let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        container.addChild(skinNameTxt);
        
        let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        container.addChild(servantNameTxt);
            
        let titleEff = App.CommonUtil.getServantSkinFlagById(skinId);
        if (titleEff){
            titleEff.setPosition(bg.x + bg.width/2 - titleEff.width/2, bg.y + bg.height - titleEff.height - 10);
            container.addChild(titleEff);
        }
	
        let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 530;
        buttomBg.height = 290;
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height - 3);
        container.addChild(buttomBg);
        buttomBg.visible = false;

        let buttomBg2 = BaseBitmap.create("public_popupscrollitembg");
        buttomBg2.width = 520; //525
        buttomBg2.height = 285; //289
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2 + 10); // +5
        container.addChild(buttomBg2);

        let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 15);
        container.addChild(skinTipTxt);

        let addAbility = skinCfg.addAbility;
        for (let index = 0; index < addAbility.length; index++) {
            let bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index,addAbility[index], [skinCfg.id, null, "public_scrolllistbg"]);
            bnode.setPosition(skinTipTxt.x -5 + index%2*245, skinTipTxt.y + skinTipTxt.height + 15+ Math.floor(index/2)*92);
            container.addChild(bnode);
        }

        let topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(container.width / 2 - topbg.width / 2, 0);
        container.addChild(topbg);

        let skinNeed = this.vo.getSkinNeedData();
        
        let topStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteSkinTopMsg", this.getTypeCode()), [""+skinNeed]);
        let topDesc = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 +2);
        container.addChild(topDesc);

        let topbgLine = BaseBitmap.create("ackite_skintopline");
        topbgLine.setPosition(container.width / 2 - topbgLine.width / 2, topbg.y + topbg.height);
        container.addChild(topbgLine);

        let bgLine = BaseBitmap.create("ackite_skintopline");
        bgLine.setPosition(container.width / 2 - bgLine.width / 2, bg.y + bg.height);
        container.addChild(bgLine);
    }

    private get cfg() : Config.AcCfg.KiteCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcKiteVo{
        return <AcKiteVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
    }

    public dispose():void{
        super.dispose();
    }
}