/**
* 进度奖励
* date 2020.7.21
* author ycg
* @name AcGoodMatchDetailPopupViewTab4
*/
class AcGoodMatchDetailPopupViewTab4 extends CommonViewTab{
    private _exchangeContainer:BaseDisplayObjectContainer = null;

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    private get cfg():Config.AcCfg.GoodMatchCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    
    private get vo():AcGoodMatchVo{
        return <AcGoodMatchVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_EXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

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
        let skinCfg = Config.WifeCfg.getWifeCfgById(skinId);
        let bgStr = "previewbg_wifeskin";
        let bg = BaseLoadBitmap.create(bgStr); //544 400  522 393
        container.addChild(bg);
        bg.width = 522;
        bg.height = 400;
        let bgMask = new egret.Rectangle(0, 4, 522, 393);
        bg.mask = bgMask;
        bg.x = container.width/2 - bg.width/2;
        bg.y = -4;

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
            let wifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wifeIcon.setScale(0.65);
            wifeIcon.anchorOffsetY = wifeIcon.height;
            wifeIcon.anchorOffsetX = wifeIcon.width / 2;
            wifeIcon.x = maskContan.width / 2;
            wifeIcon.y = maskContan.y + maskContan.height - 6;//-5
            maskContan.addChild(wifeIcon);
        }
        else {
            let wifeImg = BaseLoadBitmap.create(skinCfg.body);
            wifeImg.width = 640;
            wifeImg.height = 840;
            wifeImg.anchorOffsetY = wifeImg.height;
            wifeImg.anchorOffsetX = wifeImg.width / 2;
            wifeImg.setScale(0.45);
            wifeImg.x = maskContan.width / 2;
            wifeImg.y = maskContan.y + maskContan.height - 5;
            maskContan.addChild(wifeImg);
        }
	
        let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x + 10, bg.y + 35);
        container.addChild(skinnamebg);

        let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
        container.addChild(skinNameTxt);

        let buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 522; //525
        buttomBg.height = 286; //274
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 3);
        container.addChild(buttomBg);

        //初始魅力
        let initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [skinCfg.glamour + '']);
        let initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        initialCharmTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
        container.addChild(initialCharmTxt);
        //加成门客
        let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        let servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [servantCfg.name]);
        let servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        servantAddTxt.setPosition(buttomBg.x + 30, initialCharmTxt.y + 30);
        container.addChild(servantAddTxt);

        let descBg = BaseBitmap.create(`public_scrolllistbg`); //public_9_managebg
        descBg.width = 500;
        descBg.height = 130;
        descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, servantAddTxt.y + servantAddTxt.height + 20);
        container.addChild(descBg);

        let wifeDescTxt = ComponentManager.getTextField(skinCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        wifeDescTxt.lineSpacing = 3;
        wifeDescTxt.width = descBg.width - 40;
        wifeDescTxt.setPosition(descBg.x + 20, descBg.y + descBg.height/2 - wifeDescTxt.height/2);
        container.addChild(wifeDescTxt);
	
        let topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(container.width / 2 - topbg.width / 2, 1);
        container.addChild(topbg);

        let toolItemVo = this.vo.getShowSkinData();
        let topStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchDetailSkinTopMsg", this.getTypeCode()), [""+toolItemVo.num, toolItemVo.name]);
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

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acGoodMatchDetailSKinExchange", this.getTypeCode()), this.exchangeBtnClick, this);
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
        if (!this.vo.isStart){
            this.vo.showAcEndTip();
            return ;
        }
        let toolItemVo = this.vo.getShowSkinData();
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        if (currNum >= toolItemVo.num){
            //兑换
            NetManager.request(NetRequestConst.REQUEST_ACGOODMATCH_EXCHANGE, {activeId: this.vo.aidAndCode});
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
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_EXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._exchangeContainer = null;
        super.dispose();
    }
}