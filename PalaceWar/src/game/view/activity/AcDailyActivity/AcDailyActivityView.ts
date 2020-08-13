class AcDailyActivityView extends AcCommonView {
    public constructor() {
        super();
    }

    private buyBtn: BaseButton = undefined;
    private _getList: ScrollList = undefined;
    private _curgid: string = undefined;
    private _topScrolView: ScrollView;
    private _cdText: BaseTextField;
    private _buyTimesText: BaseTextField;
    private _acVo: AcDailyActivityVo = undefined;
    private _boxNameTxt: BaseTextField;
    private _boxDesceTxt: BaseTextField;
    private _boxList = [];
    private _lastBox: BaseBitmap;
    private cfgObj: Config.AcCfg.DailyActivityCfg = undefined;
    private _worthTxt: BaseBitmapText | BaseTextField = undefined;

    private _btnList: BaseButton[] = [];
    public initView() {

        if (PlatformManager.checkNeedCheckPurchase()) 
		{
			PlatformManager.client.checkPurchase(ServerCfg.selectServer.zid);
		}

        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYACTIVITY_REFRESH, this.refreshFromNotify, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.refreshFromNotify,this);
        this._acVo = <AcDailyActivityVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this.cfgObj = Config.AcCfg.DailyActivityCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

        if (this._acVo.isShowRedDot) {
            NetManager.request(NetRequestConst.REQYEST_ACTIVITY_DAILY_CHECKRED, { activeId: this.aid + "-" + this.code });
        }
        let topbg1 = BaseBitmap.create("acdailyactivity_topbg1");
        topbg1.x = GameConfig.stageWidth / 2 - topbg1.width / 2;
        topbg1.y = -15;
        this.addChildToContainer(topbg1);

        let topbg2 = BaseBitmap.create("acdailyactivity_topbg2");
        topbg2.x = GameConfig.stageWidth / 2 - topbg2.width / 2;
        topbg2.y = topbg1.y;
        this.addChildToContainer(topbg2);

        let arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["left"]);
        arrow_leftBtn.anchorOffsetX = arrow_leftBtn.width / 2;
        arrow_leftBtn.scaleX = arrow_leftBtn.scaleY = 0.75;
        arrow_leftBtn.x = 25;
        arrow_leftBtn.y = topbg2.y + topbg2.height / 2 - arrow_leftBtn.height / 2 - 5;
        this.addChildToContainer(arrow_leftBtn);

        let arrow_rightBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["right"]);
        arrow_rightBtn.anchorOffsetX = arrow_rightBtn.width / 2;
        arrow_rightBtn.scaleX = -1 * 0.75;
        arrow_rightBtn.scaleY = 0.75;
        let tarRightPosX = GameConfig.stageWidth - arrow_leftBtn.x;
        arrow_rightBtn.x = tarRightPosX
        arrow_rightBtn.y = arrow_leftBtn.y;
        this.addChildToContainer(arrow_rightBtn);

        let bottombg = BaseBitmap.create("arena_bottom");
        bottombg.x = GameConfig.stageWidth / 2 - bottombg.width / 2;
        bottombg.y = GameConfig.stageHeigth - this.container.y - bottombg.height;
        this.addChildToContainer(bottombg);

        // this.buyBtn = ComponentManager.getButton("recharge_bigbtn","acPunishBuyItemBuy",this.buyBtnHandler,this);
        // this.buyBtn.setBtnCdSecond(10);
        // this.buyBtn.x = bottombg.x + bottombg.width/2 - this.buyBtn.width/2;
        // this.buyBtn.y = bottombg.y + bottombg.height/2 - this.buyBtn.height/2+3;
        // this.addChildToContainer(this.buyBtn);

        let midbg = BaseBitmap.create("public_9_bg22");
        midbg.x = GameConfig.stageWidth / 2 - midbg.width / 2;
        midbg.y = topbg2.y + topbg2.height - 10;
        midbg.height = bottombg.y - midbg.y;
        this.addChildToContainer(midbg);

        let topbg3 = BaseLoadBitmap.create("acdailyactivity_topbg3-" + this.code);
        topbg3.width = 600;
        topbg3.height = 254;
        topbg3.x = GameConfig.stageWidth / 2 - topbg3.width / 2;
        topbg3.y = midbg.y + 18;
        this.addChildToContainer(topbg3);

        let line: BaseBitmap = BaseBitmap.create("public_line3");
        line.width = 460;
        line.x = GameConfig.stageWidth / 2 - line.width / 2;
        line.y = topbg3.y + 10;
        this.addChildToContainer(line);

        this._boxNameTxt = ComponentManager.getTextField("", 26, TextFieldConst.COLOR_WARN_YELLOW);
        this._boxNameTxt.x = GameConfig.stageWidth / 2;
        // this._boxNameTxt.y = line.y + line.height / 2 - 13;
        this._boxNameTxt.y = topbg3.y + 6;
        this.addChildToContainer(this._boxNameTxt);

        this._cdText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._cdText.x = topbg3.x + 10;
        this._cdText.y = topbg3.y + topbg3.height - 27;
        this.addChildToContainer(this._cdText);

        this._buyTimesText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._buyTimesText.x = topbg3.x + topbg3.width - 12;
        this._buyTimesText.y = this._cdText.y;
        this.addChildToContainer(this._buyTimesText);

        let descbg = BaseBitmap.create("acdailyactivity_descbg");
        descbg.height = 120;
        descbg.x = topbg3.x;
        descbg.y = topbg3.y + topbg3.height / 2 - descbg.height / 2
        this.addChildToContainer(descbg);

        this._boxDesceTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._boxDesceTxt.x = descbg.x + descbg.width / 2 - this._boxDesceTxt.width / 2;
        this._boxDesceTxt.y = descbg.y + 12;
        this._boxDesceTxt.multiline = true;
        this._boxDesceTxt.lineSpacing = 4;
        this._boxDesceTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(this._boxDesceTxt);

        let _worthimg = BaseBitmap.create("acdailyactivity_worth");
        _worthimg.x = descbg.x + descbg.width / 2 - _worthimg.width - 30;
        _worthimg.y = descbg.y + descbg.height - _worthimg.height - 3;
        if(PlatformManager.checkIsThSp())
        {
             _worthimg.x = descbg.x + descbg.width / 2 - _worthimg.width + 25;
        }
        this.addChildToContainer(_worthimg);

        this._worthTxt = ComponentManager.getBitmapText("", "dailyactivity_fnt", TextFieldConst.COLOR_LIGHT_YELLOW);
        this._worthTxt.x = _worthimg.x + _worthimg.width;
        this._worthTxt.y = _worthimg.y + 2;
        if(PlatformManager.checkIsThSp())
        {
             this._worthTxt.y = _worthimg.y + 6;
        }
        this.addChildToContainer(this._worthTxt);

        let innerbg = BaseBitmap.create("public_9_managebg");
        innerbg.width = GameConfig.stageWidth - 40;
        innerbg.height = midbg.height - topbg3.height - 50 - 30;
        innerbg.x = GameConfig.stageWidth / 2 - innerbg.width / 2;
        innerbg.y = topbg3.y + topbg3.height + 5;
        this.addChildToContainer(innerbg);
        if(PlatformManager.checkIsEnSp())
        {
             innerbg.height = midbg.height - topbg3.height - 50 - 50;
        }

        let list = this.cfgObj.getList();
        let keys = Object.keys(list);
        keys.sort();

        this._curgid = keys[0];
        let topListNode = new BaseDisplayObjectContainer();
        for (var index = 0; index < keys.length; index++) {
            let tmpKey = keys[index];
            let boxres = this.getBoxImgPre(index);
            let box = BaseBitmap.create(boxres);
            box.addTouchTap(this.boxBtnHandler, this, [tmpKey]);
            box.x = 10 + (box.width + 10) * index
            box.y = 7;
            topListNode.addChild(box);
            if (index == 0) {
                box.texture = ResourceManager.getRes(boxres + "_down");
                this._lastBox = box;
            }
            let cost = this.cfgObj.getRechargeItemById(tmpKey).cost;
            let boxName = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxName.text = LanguageManager.getlocal("acDailyActivity_boxname_" + cost);
            boxName.x = box.x + box.width / 2 - boxName.width / 2;
            boxName.y = boxName.y + 110;
            topListNode.addChild(boxName);
            let buyBtnTmp = ComponentManager.getButton("recharge_bigbtn", "acPunishBuyItemBuy", this.buyBtnHandler, this);
            if(PlatformManager.checkIsXlySp()&&Api.playerVoApi.getPlayerVipLevel()<1)
            {
                buyBtnTmp.setBtnCdSecond(0);
            }
            else 
            {
                buyBtnTmp.setBtnCdSecond(30);
            }
            
            buyBtnTmp.x = bottombg.x + bottombg.width / 2 - buyBtnTmp.width / 2;
            buyBtnTmp.y = bottombg.y + bottombg.height / 2 - buyBtnTmp.height / 2 + 3;
            this.addChildToContainer(buyBtnTmp);
            let rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(cost);
            let params:string[]=[];
            if(PlatformManager.checkisLocalPrice()&&rechargecfgObj.platFullPrice)
            {
                params.push(rechargecfgObj.platFullPrice);
                params.push("");
            }
            else
            {
                params.push("" + rechargecfgObj.cost);
            }
            let btnTxt = LanguageManager.getlocal("anyMoney", params);
            buyBtnTmp.setText(btnTxt, false);
            this._btnList.push(buyBtnTmp);

        }

        let rect = new egret.Rectangle(0, 0, 520, topbg1.height);
        let scrolView = ComponentManager.getScrollView(topListNode, rect);
        scrolView.verticalScrollPolicy = "off";
        scrolView.bounces = false;
        scrolView.x = 60;
        scrolView.y = topbg1.y;
        this.addChildToContainer(scrolView);
        this._topScrolView = scrolView;

        let rect2 = new egret.Rectangle(0, 0, innerbg.width, innerbg.height - 10);
        this._getList = ComponentManager.getScrollList(AcDailyActivityScrollItem, [], rect2);
        this._getList.x = innerbg.x + 2;
        this._getList.y = innerbg.y + 5;
        this.addChildToContainer(this._getList);
        this.refreshRewardItems();

        let vipTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("addVipExpTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN)
        vipTipTxt.setPosition(innerbg.x + innerbg.width / 2 - vipTipTxt.width / 2, innerbg.y + innerbg.height + 10);
        this.addChildToContainer(vipTipTxt);

        if(PlatformManager.checkIsEnSp())
        {   
            let zoneStr =App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
            let timeZoneDes = ComponentManager.getTextField(LanguageManager.getlocal("actimeZoneTip",[zoneStr+""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN)
            timeZoneDes.y= vipTipTxt.y +vipTipTxt.height+5;
            timeZoneDes.x = vipTipTxt.x + vipTipTxt.width / 2 - timeZoneDes.width / 2 
            this.addChildToContainer(timeZoneDes);
        }

    }

    private refreshFromNotify() {
        this._acVo = <AcDailyActivityVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this.refreshbuyTimes();
    }
    protected buyBtnHandler() 
    {
        if(PlatformManager.checkIsXlySp())
        {
            if(Api.playerVoApi.getPlayerVipLevel()<1)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acdailyBuyDes"));
                return;
            }   
        }

        if (!this._acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        } 

        let boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        let cost = boxCfg.cost;
        if (this._acVo.getBuyTimes(cost) >= boxCfg.limit) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acDailyActivity_buyTips"));
            this.refreshFromNotify();
            return;
        }
        if (GameData.idcardSwitch==true && GameData.idcardNormal==1 && Api.gameinfoVoApi.getRealnameRewards()==null)
		{	
			ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
		}
        PlatformManager.checkPay(cost);
    }

    protected receivePushData(event: egret.Event): void {
        let data: { ret: boolean, data: any } = event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
            this.showBuyRewards();
            this.refreshbuyTimes();
            if (data.data.data.payment) {
                let itemid = data.data.data.payment.itemId;
                PlatformManager.analyticsPay(itemid, data.data.data.payment.orderId);
            }
        }
    }

    protected showBuyRewards() {
        let boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        let rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.cost);
        let getReward = "1_1_" + rechargecfgObj.gemCost + "|" + rechargecfgObj.getReward;
        let rewObj = GameData.formatRewardItem(getReward);
        App.CommonUtil.playRewardFlyAction(rewObj);
    }
    protected boxBtnHandler(obj: any, param: any) {
        if (param == this._curgid) {
            return;
        }

        if (obj.target) {
            let resStr = this.getBoxImgPre(this._curgid);
            let resStr2 = this.getBoxImgPre(param);
            this._lastBox.texture = ResourceManager.getRes(resStr);
            let target: BaseBitmap = <BaseBitmap>obj.target;
            target.texture = ResourceManager.getRes(resStr2 + "_down");
            this._lastBox = target;
        }
        this._curgid = param;
        this.refreshUIInfo();
        this.showBtn(Number(param));
    }
    /**
     * 显示btn按钮
     */
    private showBtn(index: number) {
        for (let i = 0; i < this._btnList.length; i++) {
            if (index == i) {
                this._btnList[i].setVisible(true);
                if (PlatformManager.checkIsEnLang()) {
                    let boxCfg = this.cfgObj.getRechargeItemById(String(index));
                    let times = this._acVo.getBuyTimes(boxCfg.cost);
                    let limt = boxCfg.limit;
                    let rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.cost);
                    if (Number(times) == Number(limt)) {
                        // TickManager.removeTick(this._btnList[i].tick, this._btnList[i]);
                        // this._btnList[i].setText(LanguageManager.getlocal("anyMoney", [String(rechargecfgObj.cost)]), false)
                        this._btnList[i].clearBtnTick();
                        this._btnList[i].setEnable(false);
                    }
                }

            }
            else {
                this._btnList[i].setVisible(false);
            }
        }
    }

    private getBoxImgPre(idx: number | string) {
        idx = Number(idx);
        let resStr = "acdailyactivity_box";
        if (idx <= 1) {
            return resStr += 1;
        }
        else if (idx >= 5) {
            return resStr += 3;
        } else {
            return resStr += 2;
        }
    }

    protected refreshUIInfo() {
        this.refreshRewardItems();
    }

    protected refreshRewardItems() {
        let boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        let cost = boxCfg.cost;
        let rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(cost);
        // let btnTxt = LanguageManager.getlocal("anyMoney",[""+rechargecfgObj.cost]);
        // this.buyBtn.setText(btnTxt,false);
        let rewards = "1_1_" + rechargecfgObj.gemCost + "|" + rechargecfgObj.getReward;
        this._getList.refreshData(GameData.formatRewardItem(rewards));
        this._boxNameTxt.text = LanguageManager.getlocal("acDailyActivity_boxname_" + cost);
        this._boxNameTxt.anchorOffsetX = this._boxNameTxt.width / 2;
        this._boxDesceTxt.text = LanguageManager.getlocal("acDailyActivity_boxDesc_" + cost);
        this._boxDesceTxt.anchorOffsetX = this._boxDesceTxt.width / 2;
        this._worthTxt.text = boxCfg.show * 100 + "%";
        this.refreshbuyTimes();
        this.showBtn(0);
    }

    protected refreshbuyTimes() {
        let boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        let times = this._acVo.getBuyTimes(boxCfg.cost);
        let limt = boxCfg.limit;
        let str = (limt - times) + "/" + limt;
        this._buyTimesText.text = LanguageManager.getlocal("acDailyActivity_buyTimes", [str]);
        this._buyTimesText.anchorOffsetX = this._buyTimesText.width;
        if (limt <= times) {
            // this.buyBtn.setEnable(false);
        } else {
            // this.buyBtn.setEnable(true);
        }
        if (PlatformManager.checkIsEnLang()) {
            this.showBtn(Number(this._curgid));
        }

    }

    public tick() {
        if (this._acVo.isStart) {
            this._cdText.text = LanguageManager.getlocal("acFourPeople_acCD", [this._acVo.acCountDown]);
        } else {
            this._cdText.text = "";
        }
    }

    protected switchHandler(param: any) {
        let changeW = 505;
        let scroL = this._topScrolView.scrollLeft;
        if (param == "right") {
            if (scroL + changeW > this._topScrolView.getMaxScrollLeft()) {
                scroL = this._topScrolView.getMaxScrollLeft();
            } else {
                scroL += changeW;
            }
        }
        if (param == "left") {
            if (scroL - changeW < 0) {
                scroL = 0;
            } else {
                scroL -= changeW;
            }
        }
        this._topScrolView.setScrollPosition(0, scroL);

        // this.refreshUIInfo();
    }

    protected getTitleStr(): string {
        return "acDailyActivityViewTitle";
    }

    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "acdailyactivity_box1_down", "acdailyactivity_box1", "acdailyactivity_box2_down", "dailyactivity_fnt", "acdailyactivity_worth",
            "acdailyactivity_box2", "acdailyactivity_box3_down",
            "acdailyactivity_box3", "acdailyactivity_topbg1", "acdailyactivity_topbg2", "acdailyactivity_descbg",
            "arena_bottom", "recharge_bigbtn_down", "recharge_bigbtn",
        ]);
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYACTIVITY_REFRESH, this.refreshFromNotify, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.refreshFromNotify,this);

        this.buyBtn = null;
        this._getList = null;
        this._curgid = null;
        this._cdText = null;
        this._buyTimesText = null;
        this._acVo = null;
        this._boxNameTxt = null;
        this._boxDesceTxt = null;
        this._boxList = null;
        this._lastBox = null;
        this.cfgObj = null;
        this._btnList = [];
        super.dispose();
    }

}