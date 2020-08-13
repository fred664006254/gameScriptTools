/**
 * 衣装预览
 * date 2020.6.15
 * @class AcNightSkyDetailPopupViewTab3
 */
class AcNightSkyDetailPopupViewTab3 extends CommonViewTab{
    private _exchangeContainer:BaseDisplayObjectContainer = null;

    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACNIGHTSKY_EXCHANGE, this.exchangeCallback, this);
        let view = this;

        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(26, 53);
        this.addChild(rewardBg);

        let container = new BaseDisplayObjectContainer();
        container.width = 530;
        this.addChild(container);
        container.x = rewardBg.x;
        container.y = 57;
        
        let skinId = this.cfg.show;
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let bgStr = "acthreekingdomrecharge_skinbg";
        let skinBg = skinCfg.getSkinPreviewBg();
        let isOwn = false;
        if (skinBg && ResourceManager.hasRes(skinBg)){
            bgStr = skinBg;
            isOwn = true;
        }
        let bg = BaseLoadBitmap.create(bgStr); //540 400  522 393
        container.addChild(bg);
        if (!isOwn){
            bg.width = 540;
            bg.height = 400;
            let bgMask = new egret.Rectangle(18, 4, 522, 393);
            bg.mask = bgMask;
            bg.x = container.width/2 - bg.width/2 - 7;
            bg.y = -4;
        }
        else{
            bg.width = 522;
            bg.height = 400;
            let bgMask = new egret.Rectangle(0, 4, 522, 393);
            bg.mask = bgMask;
            bg.x = container.width/2 - bg.width/2;
            bg.y = -4;
        }

        let rect = new egret.Rectangle(0, 0, 522, 364);
		let maskContan = new BaseDisplayObjectContainer();
		maskContan.width = 522;
		maskContan.height = 364;
		maskContan.mask = rect;
		maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 29);
        container.addChild(maskContan);

        if (isOwn){
            let skinEffBone = skinCfg.getSkinEffectBone();
            let skinEffBoneName = skinEffBone + "_ske";
            if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && skinEffBoneName && RES.hasRes(skinEffBoneName)){
                let skinEff = App.DragonBonesUtil.getLoadDragonBones(skinEffBone);
                skinEff.setScale(0.8);
                skinEff.setPosition(maskContan.width/2, 140);
                maskContan.addChild(skinEff);
            }
        }

        let boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
			let droIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
			droIcon.setScale(0.8);
			droIcon.anchorOffsetY = droIcon.height;
			droIcon.anchorOffsetX = droIcon.width / 2;
            droIcon.x = maskContan.width / 2;
			droIcon.y = maskContan.y + maskContan.height;
			maskContan.addChild(droIcon);
		}
		else {
			let skinImg = BaseLoadBitmap.create(skinCfg.body);
			skinImg.width = 406;
			skinImg.height = 467;
			skinImg.anchorOffsetY = skinImg.height;
			skinImg.anchorOffsetX = skinImg.width / 2;
			skinImg.setScale(0.85);
			skinImg.x = maskContan.width / 2;
			skinImg.y = maskContan.y + maskContan.height;
			maskContan.addChild(skinImg);
        }
        
        let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x + 14, bg.y + 35);
        container.addChild(skinnamebg);

        let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        container.addChild(skinNameTxt);

        let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        container.addChild(servantNameTxt);
        
        let skinTitle = App.CommonUtil.getServantSkinFlagById(skinId);
        if (skinTitle){
            skinTitle.setPosition(bg.x + bg.width/2 - skinTitle.width/2, bg.y + bg.height - skinTitle.height - 60);
            container.addChild(skinTitle);
        }

        let topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(container.width / 2 - topbg.width / 2, 1);
        container.addChild(topbg);

        let toolItemVo = this.vo.getShowSkinData();
        let topStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkySkinTopMsg", this.getTypeCode()), [""+toolItemVo.num, toolItemVo.name]);
        let topDesc = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 +2);
        container.addChild(topDesc);

        let topbgLine = BaseBitmap.create("ackite_skintopline");
        topbgLine.setPosition(container.width / 2 - topbgLine.width / 2, topbg.y + topbg.height);
        container.addChild(topbgLine);

		let buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 520;
        buttomBg.height = 285;
        buttomBg.setPosition(container.width/2 - buttomBg.width / 2, bg.y + bg.height + 4);
        container.addChild(buttomBg);

        let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg.x + buttomBg.width / 2 - skinTipTxt.width / 2, buttomBg.y + 15);
        container.addChild(skinTipTxt);

        let addAbility = skinCfg.addAbility;
        for (let index = 0; index < addAbility.length; index++) {
            let bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index,addAbility[index], [skinCfg.id, null, "public_scrolllistbg"]);
            bnode.setPosition(skinTipTxt.x -5 + index%2*245, skinTipTxt.y + skinTipTxt.height + 15+ Math.floor(index/2)*92);
            container.addChild(bnode);
        }

        //兑换
        let exchangeContainer = new BaseDisplayObjectContainer();
        container.addChild(exchangeContainer);
        this._exchangeContainer = exchangeContainer;

        let exchangeBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_skinprocessbg", this.getTypeCode()));
        exchangeContainer.addChild(exchangeBg);
        exchangeContainer.width = exchangeBg.width;
        exchangeContainer.height = exchangeBg.height;
        exchangeContainer.setPosition(container.width/2 - exchangeBg.width/2, bg.y + bg.height - exchangeBg.height);

        let toolIcon = BaseLoadBitmap.create(toolItemVo.icon);
        toolIcon.width = 100;
        toolIcon.height = 100;
        toolIcon.setScale(0.7);
        toolIcon.setPosition(10, exchangeContainer.height/2 - toolIcon.height * toolIcon.scaleY /2 - 5);

        let progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 300);
        progress.setPosition(toolIcon.x + toolIcon.width * toolIcon.scaleX - 15, exchangeContainer.height/2 - progress.height/2);
        exchangeContainer.addChild(progress);
        exchangeContainer.addChild(toolIcon);
        progress.name = "progress";

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acNightSkyDetailSkinget", this.getTypeCode()), this.exchangeBtnClick, this);
        exchangeBtn.setPosition(exchangeContainer.width - exchangeBtn.width - 5, exchangeContainer.height/2 - exchangeBtn.height/2);
        exchangeContainer.addChild(exchangeBtn); 
        exchangeBtn.name = "exchangeBtn";
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        if (currNum < toolItemVo.num){
            exchangeBtn.setEnable(false);
        }

        

        progress.setPercentage(currNum / toolItemVo.num);
        progress.setText(""+currNum + "/"+toolItemVo.num);
    
    }

    private exchangeBtnClick():void{


        if ((!this.vo.isStart)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }

        let toolItemVo = this.vo.getShowSkinData();
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        if (currNum >= toolItemVo.num){
            //兑换
            NetManager.request(NetRequestConst.REQUEST_ACNIGHTSKY_EXCHANGE, {activeId: this.vo.aidAndCode});
        }
    }

    private exchangeCallback(evt: egret.Event){
        if (!evt.data.ret){
            return ;
        }
        let rData = evt.data.data.data;
        let rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }

        this.refreshUi();
    }

    private refreshUi():void{
        let toolItemVo = this.vo.getShowSkinData();
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        let progress = <ProgressBar>this._exchangeContainer.getChildByName("progress");
        progress.setPercentage(currNum / toolItemVo.num);
        progress.setText(""+currNum+"/"+toolItemVo.num);
        let exchangeBtn = <BaseButton>this._exchangeContainer.getChildByName("exchangeBtn");
        if (currNum < toolItemVo.num){
            exchangeBtn.setEnable(false);
        }
        else{
            exchangeBtn.setEnable(true);
        }
    }

    private get cfg() : Config.AcCfg.NightSkyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNightSkyVo{
        return <AcNightSkyVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
        if (this.code == "4"){
            return "3";
        }
        return this.code;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACNIGHTSKY_EXCHANGE, this.exchangeCallback, this);
        this._exchangeContainer = null;
        super.dispose();
    }
}