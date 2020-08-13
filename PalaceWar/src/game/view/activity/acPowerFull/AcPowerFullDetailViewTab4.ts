/**
 * 衣装预览
 * date 2020.6.2
 * @class AcPowerFullDetailViewTab4
 */
class AcPowerFullDetailViewTab4 extends CommonViewTab{
    private _exchangeContainer:BaseDisplayObjectContainer = null;

    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    private get cfg():Config.AcCfg.PowerFullCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcPowerFullVo{
        return <AcPowerFullVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
        return this.code;
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_EXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
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
        let skinBg = skinCfg.getSkinPreviewBg();
        let isOwn = false;
        let bgStr = "previewbg_servantskin";
        if (skinBg && ResourceManager.hasRes(skinBg)){
            bgStr = skinBg;
            isOwn = true;
        }
        let bg = BaseLoadBitmap.create(bgStr); //544 400  522 393
        container.addChild(bg);
        // let bgMask = new egret.Rectangle(0, 4, 522, 393);
        // bg.mask = bgMask;
        // // bg.x = container.width/2 - bg.width/2;
        // bg.y = -4;

        if (isOwn){
            bg.width = 544;
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

        let rect = new egret.Rectangle(0,0,522,364);
        let maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 522; // 544
        maskContan.height = 364;
        maskContan.mask =rect;
        maskContan.setPosition(container.width / 2 - maskContan.width / 2, bg.y + 29);
        container.addChild(maskContan);

        let boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantIcon.setScale(0.75);
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
            skinImg.setScale(0.8);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 5;
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
            skinTitle.setPosition(bg.x + bg.width/2 - skinTitle.width/2, bg.y + bg.height - skinTitle.height - 70);
            container.addChild(skinTitle);
        }

        let buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 522; //525
        buttomBg.height = 286; //274
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 3);
        container.addChild(buttomBg);

        let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg.x + buttomBg.width / 2 - skinTipTxt.width / 2, buttomBg.y + 20);
        container.addChild(skinTipTxt);

        let addAbility = skinCfg.addAbility;
        for (let index = 0; index < addAbility.length; index++) {
            let bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index,addAbility[index], [skinCfg.id]);
            bnode.setPosition(buttomBg.x + 10 + index%2*250, skinTipTxt.y + skinTipTxt.height + 5+ Math.floor(index/2)*92);
            container.addChild(bnode);
        }

        // let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // buttomTipTxt.setPosition(buttomBg.x + buttomBg.width / 2 - buttomTipTxt.width / 2, buttomBg.y + buttomBg.height - buttomTipTxt.height - 10);
        // container.addChild(buttomTipTxt);
	
        let topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(container.width / 2 - topbg.width / 2, 1);
        container.addChild(topbg);

        let toolItemVo = this.vo.getShowSkinData();
        let topStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullDetailSkinTopmsg", this.getTypeCode()), [""+toolItemVo.num, toolItemVo.name]);
        let topDesc = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 +2);
        container.addChild(topDesc);

        let topbgLine = BaseBitmap.create("ackite_skintopline");
        topbgLine.setPosition(container.width / 2 - topbgLine.width / 2, topbg.y + topbg.height);
        container.addChild(topbgLine);

        //兑换
        let exchangeContainer = new BaseDisplayObjectContainer();
        container.addChild(exchangeContainer);
        this._exchangeContainer = exchangeContainer;

        let exchangeBg = BaseBitmap.create("acpowerfull_skinexchangebg");
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

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acPowerFullDetailSKinExchange", this.getTypeCode()), this.exchangeBtnClick, this);
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
        let toolItemVo = this.vo.getShowSkinData();
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        if (currNum >= toolItemVo.num){
            //兑换
            NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_EXCHANGE, {activeId: this.vo.aidAndCode});
        }
    }

    private exchangeCallback(evt: egret.Event){
        if (!evt.data.ret){
            return ;
        }
        let rData = evt.data.data.data;
        let localKey = "exchangeDialog"+this.vo.aidAndCode+Api.playerVoApi.getPlayerID()+this.vo.st;
        let isShow = LocalStorageManager.get(localKey);
        if (isShow && isShow != ""){
            this.showRewardView(rData);
        }
        else{
            let view = this;
            let keyStr = "exchangeDialog_"+this.getTypeCode();
            let startCfg = view.cfg[keyStr];
            LocalStorageManager.set(localKey, String(this.vo.st));
            let bgName = App.CommonUtil.getResByCode("acpowerfull_bg", this.getTypeCode());
            ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,{
                aid : view.aid,
                code : view.getTypeCode(),
                AVGDialog : startCfg,
                visitId : "1",
                talkKey: "acPowerFullExchangeDialog",
                bgName: bgName,
                callBack: ()=>{
                    view.showRewardView(rData);
                },
                obj: view,
            });
        }
        this.refreshView();
    }

    private showRewardView(rData:any):void{
        let rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    }

    private refreshView():void{
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

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_EXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._exchangeContainer = null;
        super.dispose();
    }
}