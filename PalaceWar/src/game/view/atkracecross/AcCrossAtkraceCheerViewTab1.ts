//衣装预览
class AcCrossAtkraceCheerViewTab1 extends CommonViewTab
{
    private _progress:ProgressBar = null;
    private _exchangeBtn:BaseButton = null;
    private _isUp:boolean = false;

	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
    }
    
    protected getUiCode():string{
        let code = "";
        switch(Number(this.code)){
            default:
                code = `7`;
                break;
        }
        return code;        
    }
	
    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get vo() : AcCrossServerAtkRaceVo{
        return <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }	
	private get cfg() : Config.AcCfg.CrossServerAtkRaceCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

	protected initView():void
	{
        let baseView = <AcCrossAtkraceCheerView>ViewController.getInstance().getView("AcCrossAtkraceCheerView");
        this.height = baseView.tabHeight;
        this.width = GameConfig.stageWidth;

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshView,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_EXCHANGE, this.exchangeCallback, this);

        let bg = BaseBitmap.create("atkracecross_bgfengyun");
        this.addChild(bg);
        
        let bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_skininfobg", this.getUiCode(), "7"));
        bottomBg.setPosition(this.width/2 - bottomBg.width/2, this.height - bottomBg.height);

        let exchangeContainer = new BaseDisplayObjectContainer();
        let exchangeBg = BaseLoadBitmap.create("luckdrawprogressbg-1");
        exchangeBg.width = 640;
        exchangeBg.height = 107;
        exchangeContainer.addChild(exchangeBg);
        exchangeContainer.width = exchangeBg.width;
        exchangeContainer.height = exchangeBg.height;
        exchangeContainer.setPosition(this.width/2 - exchangeBg.width/2, bottomBg.y - exchangeBg.height - 32);
        
        //skin
        //门客衣装
        let skinId = this.vo.getShowSkinId();
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let skinBoneName = skinCfg.bone+"_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && skinBoneName && RES.hasRes(skinBoneName) && App.CommonUtil.check_dragon()) {
            let skin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            skin.anchorOffsetY = skin.height;
            skin.setScale(1.1);
            skin.setPosition(GameConfig.stageWidth/2, exchangeContainer.y - 20+(1136-GameConfig.stageHeigth)/2);
            this.addChild(skin);
        }
        else{
            let skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.setScale(1.1);
            skinImg.x = GameConfig.stageWidth/2 - skinImg.width/2;
            skinImg.y = exchangeContainer.y + 10+(1136-GameConfig.stageHeigth)/8;
            this.addChild(skinImg);
        }

        let skinEff = App.CommonUtil.getServantSkinFlagById(skinId);
        if (skinEff){
            skinEff.setPosition(this.width/2 - skinEff.width/2, exchangeContainer.y - skinEff.height - 30);
            this.addChild(skinEff);
        }
        this.addChild(exchangeContainer);

        //skinFlag
        let skinFlag = BaseBitmap.create(App.CommonUtil.getResByCode("accrossatkrace_skinflag", this.code));
        skinFlag.setPosition(20, 50);
        this.addChild(skinFlag);

        //skin detail
        this.showSkinDetailInfo();

        this.addChild(bottomBg);
        //skin info
        let skinGetInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossAtkraceSkinGet", this.getUiCode(), "7")), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        skinGetInfo.setPosition(bottomBg.x + bottomBg.width/2 - skinGetInfo.width/2, bottomBg.y + 81);
        this.addChild(skinGetInfo);


        //兑换相关
        let toolItemVo = GameData.formatRewardItem(this.cfg.change.needNum)[0];
        let toolIcon = BaseLoadBitmap.create(toolItemVo.icon);
        toolIcon.width = 100;
        toolIcon.height = 100;
        toolIcon.setScale(1);
        toolIcon.setPosition(10, exchangeContainer.height/2 - toolIcon.height * toolIcon.scaleY /2);

        let progress = ComponentManager.getProgressBar("progress21", "progress21_bg", 360);
        progress.setPosition(toolIcon.x + toolIcon.width * toolIcon.scaleX + 10, exchangeContainer.height/2 - progress.height/2 - 10);
        exchangeContainer.addChild(progress);
        exchangeContainer.addChild(toolIcon);
        this._progress = progress;

        let exchangeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossAtkraceSkinChangeInfo", this.getUiCode(), "7"), [""+toolItemVo.num, toolItemVo.name]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        exchangeTip.setPosition(toolIcon.x + toolIcon.width * toolIcon.scaleX + 5, progress.y + progress.height + 20);
        exchangeContainer.addChild(exchangeTip);

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "acCrossserverPowerCheerScoreShopExchange", this.exchangeBtnClick, this);
        exchangeBtn.setPosition(exchangeContainer.width - exchangeBtn.width - 13, exchangeContainer.height/2 - exchangeBtn.height/2 - 10);
        exchangeContainer.addChild(exchangeBtn); 
        exchangeBtn.name = "exchangeBtn";
        this._exchangeBtn = exchangeBtn;
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        if (currNum < toolItemVo.num){
            exchangeBtn.setEnable(false);
        }

        progress.setPercentage(currNum / toolItemVo.num);
        progress.setText(""+currNum+"/"+toolItemVo.num);
        progress.setTextColor(TextFieldConst.COLOR_WHITE);	
    }

    private exchangeBtnClick():void{
        if (!this.vo.isStart){
            this.vo.showAcEndTip();
            return;
        }
        let toolItemVo = GameData.formatRewardItem(this.cfg.change.needNum)[0];
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        if (currNum >= toolItemVo.num){
            //兑换
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_EXCHANGE, {activeId: this.vo.aidAndCode});
        }
    }

    private showSkinDetailInfo():void{
        let container = new BaseDisplayObjectContainer();
        this.addChild(container);
        container.width = this.width;
        let skinId = this.vo.getShowSkinId();
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_skindetailbg", this.getUiCode(), "7"));
        bottomBg.width = GameConfig.stageWidth; //525
        bottomBg.height = 300; //289
        container.height = bottomBg.height;
        bottomBg.setPosition(container.width / 2 - bottomBg.width / 2, 60); // +5
        container.addChild(bottomBg);

        //top
        let skinUp = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_skindetailtitle", this.getUiCode(), "7"));
        container.addChild(skinUp);
        container.setPosition(this.width/2 - container.width/2, this.height - 184);
        container.height = bottomBg.height + skinUp.height - 4;

        let upFlag = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_skindetailarrow", this.getUiCode(), "7"));
        upFlag.setPosition(skinUp.x + skinUp.width/2 - upFlag.width/2, skinUp.y - 5);
        container.addChild(upFlag);
        let upTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerSkinDetail1", this.getUiCode(), "7")), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        upTip.anchorOffsetX = upTip.width/2;
        upTip.setPosition(skinUp.x + skinUp.width/2, skinUp.y + 39);
        container.addChild(upTip)

        let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 580;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(bottomBg.x + bottomBg.width / 2 - skinTipTxt.width / 2, bottomBg.y + 15);
        container.addChild(skinTipTxt);

        let addAbility = skinCfg.addAbility;
        for (let index = 0; index < addAbility.length; index++) {
            let bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index,addAbility[index], [skinCfg.id, null, "public_scrolllistbg"]);
            bnode.setPosition(skinTipTxt.x -5 + 30 + index%2*(245+40), skinTipTxt.y + skinTipTxt.height + 20+ Math.floor(index/2)*(92+8));
            container.addChild(bnode);
        }
        let isMove = false;
        skinUp.addTouchTap(()=>{
            if (isMove){
                return;
            }
            upFlag.scaleY = this._isUp ? 1 : -1;
            upFlag.y = this._isUp ? skinUp.y - 5 : skinUp.y - 5 + upFlag.height;
            upTip.text = LanguageManager.getlocal(this._isUp ? App.CommonUtil.getCnByCode("acCrossServerPowerSkinDetail1", this.getUiCode(), "7") : App.CommonUtil.getCnByCode("acCrossServerPowerSkinDetail2", this.getUiCode(), "7"));
            upTip.anchorOffsetX = upTip.width/2;
            if (!this._isUp){
                isMove = true;
                egret.Tween.get(container,{loop:false}).to({y: this.height - 184 - container.height + 65}, 200).call(()=>{
                    isMove = false;
                    this._isUp = true;
                }, this);
            }
            else{
                isMove = true;
                egret.Tween.get(container,{loop:false}).to({y: this.height - 184}, 200).call(()=>{
                    isMove = false;
                    this._isUp = false;
                }, this);
            }
        }, this, null);
    }
    
	public exchangeCallback(event:egret.Event):void{
		if (!event.data.ret){
            return;
        }
        let data = event.data.data.data;
        let rewards = data.rewards;
        let rList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rList);
        if (data.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": data.replacerewards });
        }
    }
    
    private refreshView():void{
        let toolItemVo = GameData.formatRewardItem(this.cfg.change.needNum)[0];
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        if (currNum < toolItemVo.num){
            this._exchangeBtn.setEnable(false);
        }

        this._progress.setPercentage(currNum / toolItemVo.num);
        this._progress.setText(""+currNum+"/"+toolItemVo.num);
    }

	public dispose():void
	{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshView,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_EXCHANGE, this.exchangeCallback, this);
        this._progress = null;
        this._exchangeBtn = null;
        this._isUp = false;

		super.dispose();
	}

}