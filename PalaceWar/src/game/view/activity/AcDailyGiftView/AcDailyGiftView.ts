/*
author : jiang
date : 2018.8.28
desc : 小额礼包
*/
class AcDailyGiftView extends AcCommonView{
    public constructor(){
        super();
    }

    private bgImg:BaseLoadBitmap = null;
    private titleText: BaseTextField = null;
    private dailyGiftBtn: BaseButton = null;
    private dailyGiftText: BaseTextField = null;
    private dailyGiftRedPoint: BaseBitmap = null;
    private _scrollList:ScrollList = null;
    private _code: string = null;
    private _collectFlag:BaseBitmap;
    private _giftBtnNode:BaseDisplayObjectContainer;

    private get vo(): AcDailyGiftVo
    {
        return <AcDailyGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    
	protected get code():string
	{
        if(this._code == null){
            let list:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(this.aid);
            this._code = list[0].code.toString();
        }
        return this._code;
	}

    public initView(){
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO,this.updateStatus,this); 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT),this.dailyGiftCallback,this);

        let vo = <AcDailyGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let bg = BaseLoadBitmap.create("acdailygiftview_bg" + this.getUiCode());//+this.code);
        bg.y = -15;
        bg.width = 640;
        bg.height = 245;
        this.addChildToContainer(bg);
        
        let wordImg = BaseLoadBitmap.create("acdailygiftview_word"+this.code);
        wordImg.width = 400;
        wordImg.height = 63;
        wordImg.x = bg.x + bg.width/2 - wordImg.width/2 ;
        wordImg.y = bg.y + 25;
        this.addChildToContainer(wordImg);

        
        this.titleText = ComponentManager.getTextField(LanguageManager.getlocal("dailyGiftTitleText"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        this.titleText.x = bg.x + 5;
        this.titleText.y =  bg.y + 170;
        this.titleText.lineSpacing = 5;
        if(this.getUiCode() != "1")
        {
            let zoneStr =App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
            this.titleText.text = LanguageManager.getlocal("dailyGiftTitleText-" + this.code,[String(vo.acCountDown),String(zoneStr)]);
            this.titleText.y = bg.y + bg.height - this.titleText.height - 3;
        }
        this.addChildToContainer(this.titleText);
        
        let acdailygift_package_bg = BaseBitmap.create("acdailygift_package_bg");
        acdailygift_package_bg.x = GameConfig.stageWidth - acdailygift_package_bg.width - 10;
        acdailygift_package_bg.y = bg.y + 150;
        this.addChildToContainer(acdailygift_package_bg);

        let giftBtn = BaseBitmap.create("acnewyear_big_package");
        giftBtn.addTouchTap(this.dailyGiftBtnHandler,this);
        this._giftBtnNode = new BaseDisplayObjectContainer();
        this._giftBtnNode.addChild(giftBtn);
        this.addChildToContainer(this._giftBtnNode);
        this._giftBtnNode.x = acdailygift_package_bg.x + acdailygift_package_bg.width/2 - this._giftBtnNode.width/2;
        this._giftBtnNode.y = acdailygift_package_bg.y + acdailygift_package_bg.height/2 - this._giftBtnNode.height/2;

        let promotenamebg = BaseBitmap.create("promotenamebg");
        promotenamebg.width = 130;
        promotenamebg.height = 25; 
        promotenamebg.x = acdailygift_package_bg.x + acdailygift_package_bg.width/2 - promotenamebg.width/2 ;
        promotenamebg.y = acdailygift_package_bg.y + acdailygift_package_bg.height - 15;
        this.addChildToContainer(promotenamebg);

        this.dailyGiftText = ComponentManager.getTextField(LanguageManager.getlocal("dailyGiftBtnText"),16,TextFieldConst.COLOR_QUALITY_GREEN);
        this.dailyGiftText.x = promotenamebg.x + promotenamebg.width/2 - this.dailyGiftText.width/2 ;
        this.dailyGiftText.y = promotenamebg.y + promotenamebg.height/2 - this.dailyGiftText.height/2 ;
        this.addChildToContainer(this.dailyGiftText);

        let line:BaseBitmap=BaseBitmap.create("public_line");
		line.width =640;  
		line.y = bg.y + bg.height - 10;
		this.addChildToContainer(line);

        let bottom = BaseBitmap.create("arena_bottom");
        bottom.x = GameConfig.stageWidth/2 - bottom.width / 2;
        bottom.y = GameConfig.stageHeigth  - bottom.height - this.container.y + 30 - 24;
        this.addChildToContainer(bottom);

        let bottomText = ComponentManager.getTextField(LanguageManager.getlocal("dailyGiftBottomText"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomText.x = bottom.x + bottom.width / 2 - bottomText.width / 2;
        bottomText.y = bottom.y + 15;
        bottomText.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(bottomText);

        let border = BaseBitmap.create("public_9_bg22");
        border.width = GameConfig.stageWidth;
        border.y = bg.y + bg.height;
        border.height = bottom.y - border.y;
        this.addChildToContainer(border);

        let borderInner = BaseBitmap.create("public_9_bg32");
        borderInner.width = GameConfig.stageWidth-26;
        borderInner.y = border.y + 20;
        borderInner.x = border.x + 13;
        borderInner.height = border.height - 45;
        this.addChildToContainer(borderInner);
        
        let cfgObj : Config.AcCfg.DailyGiftCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let dailyGiftCfg = cfgObj.dailyCost;
        let list = [];
        let dailyCostData = null;
        for (let key in dailyGiftCfg) {
            dailyCostData = dailyGiftCfg[key];
            let cfg: Config.RechargeItemCfg  = Config.RechargeCfg.getRechargeItemCfgByKey(dailyCostData["cost"]);
            let data = {
                cfg: cfg,
                limit: dailyCostData["limit"],
                rechargeId:dailyCostData["cost"],
                rechargeCount:vo.ainfo[dailyCostData["cost"]],
                aid:this.aid, 
                code:this.code,
            }
            list.push(data);
        }
      
        let rect = new egret.Rectangle(0,0,borderInner.width,borderInner.height-10);
        this._scrollList = ComponentManager.getScrollList(AcDailyGiftScrollItem,list,rect,this.getUiCode());
        this._scrollList.x = borderInner.x + 3;//bottomBg.x;
        this._scrollList.y = borderInner.y + 3;
        this.addChildToContainer(this._scrollList);

        this.updateStatus();
        this.tick();
    }

    private dailyGiftBtnHandler()
    {
        if (this.getUiCode() != "1") {
            let vo = <AcDailyGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            if (vo.checkAcEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
        }
        //每日奖励
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT,{activeId : this.aid+"-"+this.code});
    }

    private dailyGiftCallback(event):void
    {
        let data:{ret:boolean,data:any}=event.data;
    
        if(data.data.ret == 0){
            //领取成功
            let rewObj = GameData.formatRewardItem(data.data.data.rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
            this.createCollectFlag();
            this._collectFlag.setScale(1.0);
            this._collectFlag.visible = false;
            this._collectFlag.setScale(1.3);
            this._collectFlag.visible = true;
            egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:0.6,scaleY:0.6},300);
        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("dailyGiftFailure"));
        }
    }

    protected receivePushData(event:egret.Event):void
	{
        let data:{ret:boolean,data:any}=event.data;
		if(data.data.ret == 0 && data.data.cmd==NetPushConst.PUSH_PAY){
            let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(data.data.data.payment.itemId);
            let rewards = "1_1_" + cfg.gemCost + "|" + data.data.data.rewards;
            let rewObj = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
			if(data.data.data.payment){
				let itemid=data.data.data.payment.itemId;
				PlatformManager.analyticsPay(itemid,data.data.data.payment.orderId);
			}
		}
	}

    private updateStatus(): void{
        let vo = <AcDailyGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.freegift != 1){
            this.createCollectFlag();
            this._collectFlag.setScale(0.6);
            this._collectFlag.visible = true;
            App.CommonUtil.removeIconFromBDOC(this._giftBtnNode);
            this._giftBtnNode.visible = false;
        }else{
            App.CommonUtil.addIconToBDOC(this._giftBtnNode);
            this._giftBtnNode.visible = true;
            if(this._collectFlag){
                this._collectFlag.visible = false;
            }
        }

        if(this._scrollList != null){
            let cfgObj : Config.AcCfg.DailyGiftCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            
            let dailyGiftCfg = cfgObj.dailyCost;
            let list = [];
            let dailyCostData = null;
            for (let key in dailyGiftCfg) {
                dailyCostData = dailyGiftCfg[key];
                let cfg: Config.RechargeItemCfg  = Config.RechargeCfg.getRechargeItemCfgByKey(dailyCostData["cost"]);
                list.push({cfg: cfg,limit: dailyCostData["limit"],rechargeId:dailyCostData["cost"],rechargeCount:vo.ainfo[dailyCostData["cost"]],aid:this.aid, code:this.code,});
            }
            this._scrollList.refreshData(list,this.getUiCode());
        }
    }
    
    protected createCollectFlag()
    {
        if(!this._collectFlag)
        {
            this._collectFlag = BaseBitmap.create("collectflag")
            this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
            this._collectFlag.x = this._giftBtnNode.x + this._giftBtnNode.width/2 ;
            this._collectFlag.y = this._giftBtnNode.y + this._giftBtnNode.height/2;
            this.addChildToContainer(this._collectFlag);
        }
    }
    public tick() {
        if (this.getUiCode() != "1") {
            let vo = <AcDailyGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            if (vo.checkAcEnd()) {
                this.titleText.text = LanguageManager.getlocal("dailyGiftTitleTextEndTime");
                this.titleText.setColor(TextFieldConst.COLOR_QUALITY_ORANGE)
            }
            else {
                let zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
                this.titleText.text = LanguageManager.getlocal("dailyGiftTitleText-" + this.code, [String(vo.acCountDown), String(zoneStr)]);
                this.titleText.setColor(TextFieldConst.COLOR_WHITE)
            }
        }
    }
    protected getRuleInfo():string
	{
		return super.getRuleInfo();
    } 
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            // "rechargevie_db_01","itemicon1","adult_lowbg","activity_db_01",
            "acnewyear_big_package",
            "arena_bottom",
            "promotenamebg",
            "acdailygift_package_bg",
            "acdailygiftview_titlebg1","acdailygiftview_titlebg2","acdailygiftview_titlebg3",
            "acdailygift_costbg","acdailygift_costflag",`acdailygiftview_title`,`acdailygiftview_titlebg1-7`,`acdailygiftview_titlebg2-7`,`acdailygiftview_titlebg3-7`

        ]);
    } 
    protected getUiCode(): string {
        if (this.code == "1" || this.code == "2" || this.code == "3" || this.code == "4") {
            return "1";
        }
        else if (this.code == "5" || this.code == "6") {
            return "2";
        }
        else if (this.code == "5" || this.code == "6") {
            return "2";
        }
        else if (this.code == "7" || this.code == "8") {
            return "7";
        }
        return super.getUiCode();
    }

    protected getTitleStr():string
    {
        return Number(this.getUiCode()) == 7 ? null : `dailyGift_Title`;
    }

    protected getTitleBgName():string
    {
        return Number(this.getUiCode()) == 7 ? `acdailygiftview_title` : super.getTitleBgName();
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getContainerY():number
	{
		return Number(this.getUiCode()) < 7 ? 0 : this.titleBg.height;
	}

    public dispose():void
	{   
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO,this.updateStatus,this); 
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT),this.dailyGiftCallback,this);

        this.bgImg  = null;
        this.titleText = null;
        this.dailyGiftBtn = null;
        this.dailyGiftText = null;
        this.dailyGiftRedPoint = null;
        this._scrollList = null;
        this._code = null;
        this._collectFlag = null;
        this._giftBtnNode = null;
        
        super.dispose();
    }
}