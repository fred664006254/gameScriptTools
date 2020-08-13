class AcDailyActivityView extends AcCommonView{
    public constructor(){
        super();
    }

    private buyBtn:BaseButton = undefined;
    private _getList:ScrollList = undefined;
    private _curgid:string = undefined;
    private _topScrolView:ScrollView;
    private _cdText:BaseTextField;
    private _buyTimesText:BaseTextField;
    private _acVo:AcDailyActivityVo = undefined;
    private _boxNameTxt:BaseTextField;
    private _boxDesceTxt:BaseTextField;
    private _boxList = [];
    private _lastBoxBtn:BaseButton;
    private  cfgObj : Config.AcCfg.DailyActivityCfg = undefined;
    private _worthTxt: BaseBitmapText|BaseTextField= undefined;
    private _btnList:BaseButton[] = [];

    private _topbg3 = null;
    public initView(){
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYACTIVITY_REFRESH,this.refreshFromNotify,this);
        this._acVo =  <AcDailyActivityVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this.cfgObj = Config.AcCfg.DailyActivityCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

        if(this._acVo.isShowRedDot){
            NetManager.request(NetRequestConst.REQYEST_ACTIVITY_DAILY_CHECKRED,{activeId:this.aid + "-" + this.code});
        }

        let resBar:ResBar = ComponentManager.getResBar(1,true,145);
		resBar.setPosition(10,32);
		this.addChild(resBar);
        if (PlatformManager.hasSpcialCloseBtn()) {
			resBar.setPosition(100,32);
		}
        let topbg = BaseBitmap.create("public_9v_bg02");
        topbg.width = GameConfig.stageWidth;
        topbg.height = GameConfig.stageHeigth - this.container.y;
        topbg.x = GameConfig.stageWidth/2 - topbg.width/2;
        topbg.y = -10;
        this.addChildToContainer(topbg);

        let topbg1 = BaseBitmap.create("acdailyactivity_topbg1");
        topbg1.width = 626;
        topbg1.height = 130;
        topbg1.x = GameConfig.stageWidth/2 - topbg1.width/2;
        // topbg1.y = -10;
         topbg1.y = 70;
        this.addChildToContainer(topbg1);

        let bottombg = BaseBitmap.create("adult_lowbg");
        bottombg.height = 80;
        bottombg.x = GameConfig.stageWidth/2 - bottombg.width/2;
        bottombg.y = GameConfig.stageHeigth - this.container.y -bottombg.height ;
        this.addChildToContainer(bottombg);

        // this.buyBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acPunishBuyItemBuy",this.buyBtnHandler,this);
        // this.buyBtn.setBtnCdSecond(10);
        // this.buyBtn.setScale(0.8);
        // this.buyBtn.x = bottombg.x + bottombg.width/2 - this.buyBtn.width/2 * this.buyBtn.scaleX ;
        // this.buyBtn.y = bottombg.y + bottombg.height/2 - this.buyBtn.height/2 * this.buyBtn.scaleY ;
        // this.addChildToContainer(this.buyBtn);
        
        let topbg3 = BaseLoadBitmap.create("acdailyactivity_topbg3-"+this.code);
        topbg3.width = 624;
        topbg3.height = 233;
        topbg3.x = GameConfig.stageWidth/2 - topbg3.width/2;
        topbg3.y = topbg1.y + topbg1.height + 2;
        this.addChildToContainer(topbg3);
        this._topbg3 = topbg3;
        if(PlatformManager.checkIsViSp()||PlatformManager.checkIsKRSp()||PlatformManager.checkIsKRNewSp()){
            this._boxNameTxt = ComponentManager.getTextField("", 20);
        } else {
            this._boxNameTxt = ComponentManager.getTextField("", 26);
        }
        
		this._boxNameTxt.x = GameConfig.stageWidth/2 ;
        //目前只有日文较长,
        if (PlatformManager.checkIsJPSp()){
            this._boxNameTxt.x = GameConfig.stageWidth/2 -20;
        }
		this._boxNameTxt.y = this._topbg3.y + 40;// + 26 - this._boxNameTxt.height;
		this.addChildToContainer(this._boxNameTxt);

        this._boxDesceTxt = ComponentManager.getTextField("", 18);
		this._boxDesceTxt.x = this._boxNameTxt.x ;
		this._boxDesceTxt.y = this._topbg3.y + 40 + 40 ;
        this._boxDesceTxt.multiline = true;
        this._boxDesceTxt.lineSpacing = 4;
        // this._boxDesceTxt.textAlign = egret.HorizontalAlign.CENTER;
		this.addChildToContainer(this._boxDesceTxt);

        let vipTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("addVipExpTip"),18,0x00eb55)
        vipTipTxt.x = this._boxDesceTxt.x;
        vipTipTxt.y = this._boxDesceTxt.y + 50;
        this.addChildToContainer(vipTipTxt);

        this._buyTimesText =  ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._buyTimesText.x = this._boxNameTxt.x;
		this._buyTimesText.y = vipTipTxt.y + 30 ;
		this.addChildToContainer(this._buyTimesText);

        this._cdText =  ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._cdText.x = this._boxNameTxt.x;
		this._cdText.y = this._buyTimesText.y + 24;
		this.addChildToContainer(this._cdText);

        let _worthimg = BaseBitmap.create("acdailyactivity_discountbg");
        _worthimg.x = topbg3.x + topbg3.width - _worthimg.width -  20;
        _worthimg.y = topbg3.y + 5;
        this.addChildToContainer(_worthimg);

        // this._worthTxt = ComponentManager.getTextField("100", 22, TextFieldConst.COLOR_WHITE);
        this._worthTxt = ComponentManager.getBitmapText("100", "recharge2_fnt");
        this._worthTxt.setScale(0.78);
		this._worthTxt.x = _worthimg.x + _worthimg.width/2 -2  ;
		this._worthTxt.y = _worthimg.y + 40 ;
        this.addChildToContainer( this._worthTxt);

        let rewatdbg = BaseBitmap.create("atkracecross_rewatdbg1");
        rewatdbg.x = GameConfig.stageWidth/2 - topbg3.width/2;
        rewatdbg.y = topbg3.y + topbg3.height + 2;
        this.addChildToContainer(rewatdbg);

        let line: BaseBitmap = BaseBitmap.create("atkracecross_rewatdbg1_1");
		line.width = 460;
        line.x = GameConfig.stageWidth/2 - line.width/2;
        line.y = rewatdbg.y + rewatdbg.height/2 - line.height/2;
        this.addChildToContainer(line);

        let rewardTxt =  ComponentManager.getTextField(LanguageManager.getlocal("acDailyActivity_rewardtxt"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		rewardTxt.x =  GameConfig.stageWidth/2 - rewardTxt.width/2;
		rewardTxt.y = rewatdbg.y + rewatdbg.height/2 - rewardTxt.height/2;
		this.addChildToContainer(rewardTxt);

        let list = this.cfgObj.getList();
        let keys = Object.keys(list);
        keys.sort();

        this._curgid = keys[0];
        let topListNode = new BaseDisplayObjectContainer();
        topListNode.height = topbg1.height;
        let fntSize = 18;
        let offY = 0;
        let nameOff = 0;
        if(PlatformManager.checkIsViSp()||PlatformManager.checkIsKRSp()||PlatformManager.checkIsKRNewSp()){
            fntSize = 16;
            offY = 10;
            nameOff = 3;
        }
        let index = 0;
        if(!Api.switchVoApi.checkOpenDailyActivity1RmbTap())
        {
            // index = 1;
            keys.splice(0,1)
        }
        for (index; index < keys.length; index++) {
            let tmpKey = keys[index];
            let boxres = this.getBoxImgPre(index);
            let box = ComponentManager.getButton("acdailyactivity_boxbtn","",this.boxBtnHandler2,this,[tmpKey]);
            
            // if(Api.switchVoApi.checkOpenDailyActivity1RmbTap())
            // {
            //     box.x = 10 + (box.width+10) * (index-1)
            // }else{
                box.x = 10 + (box.width+10) * index
            // }
            box.y = topListNode.height-box.height + offY;
            topListNode.addChild(box);
            box.name = "BoxBtn" + tmpKey;

            // if(index == 0||Api.switchVoApi.checkOpenDailyActivity1RmbTap()&&index == 1)
            if(index == 0)
            {
                this._lastBoxBtn = box;
                this._lastBoxBtn.updateButtonImage(BaseButton.BTN_STATE2);
                this._curgid = tmpKey;
            }
            this._boxList[tmpKey] = box;

            let cost = this.cfgObj.getRechargeItemById(tmpKey).cost;

            let boxName = ComponentManager.getTextField("", fntSize, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxName.text = LanguageManager.getlocal("acDailyActivity_boxname_"+cost );
            boxName.x = box.x + box.width/2-boxName.width/2;

            boxName.y = 108 - nameOff;//box.y + box.height - boxName.height - 4 - nameOff;
            topListNode.addChild(boxName);

            let boxImg = BaseLoadBitmap.create("acdailyactivity_box" + (index + 1) ); 
            boxImg.width = 98;
            boxImg.height = 96;
            boxImg.x = box.x + box.width/2-boxImg.width/2;
            boxImg.y = boxName.y - boxImg.height -2 + nameOff;
            topListNode.addChild(boxImg);
            boxImg.addTouchTap(this.boxBtnHandler,this,[tmpKey]);

            let rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(cost);
            let btnTxt = LanguageManager.getlocal("anyMoney",[""+rechargecfgObj.cost]);
            

            let buyBtnTmp =  ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"",this.buyBtnHandler,this);
            buyBtnTmp.setText(btnTxt,false);
            buyBtnTmp.setBtnCdSecond(60);
            buyBtnTmp.setScale(0.8);
            buyBtnTmp.x = bottombg.x + bottombg.width/2 - buyBtnTmp.width/2 * buyBtnTmp.scaleX ;
            buyBtnTmp.y = bottombg.y + bottombg.height/2 - buyBtnTmp.height/2 * buyBtnTmp.scaleY ;
            this.addChildToContainer(buyBtnTmp);
            
            this._btnList.push(buyBtnTmp);

        }
        topListNode.width += 20;
        let rect = new egret.Rectangle(0,0,620,topbg1.height+10);
        let scrolView = ComponentManager.getScrollView(topListNode,rect);
        scrolView.verticalScrollPolicy = "off";
        scrolView.bounces = false;
        scrolView.x = 10;
        scrolView.y = topbg1.y+2;
        this.addChildToContainer(scrolView);
        this._topScrolView = scrolView;

        let  innerHeight = bottombg.y  - rewatdbg.y - rewatdbg.height - 10;
        let rect2 = new egret.Rectangle(0,0,GameConfig.stageWidth - 20,innerHeight);
        this._getList = ComponentManager.getScrollList(AcDailyActivityScrollItem,[],rect2);
        this._getList.x = GameConfig.stageWidth/2 - this._getList.width/2;
        this._getList.y = rewatdbg.y + rewatdbg.height + 5 ;
        this.addChildToContainer(this._getList);
        
        let border = BaseBitmap.create("public_9v_bg03");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - this.container.y;
        border.anchorOffsetY = border.height;
        border.y = GameConfig.stageHeigth - this.container.y;
        this.addChildToContainer(border);

        this.refreshRewardItems();
        this.showBtn(0);
    }
    
    private refreshFromNotify()
    {
        this._acVo =  <AcDailyActivityVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this.refreshbuyTimes();
    }
    protected buyBtnHandler()
    {
        if(!this._acVo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        let boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        let cost = boxCfg.cost;
        if( this._acVo.getBuyTimes(cost) >= boxCfg.limit){
           App.CommonUtil.showTip(LanguageManager.getlocal("acDailyActivity_buyTips"));
           return;
        }
        PlatformManager.pay(cost);
    }
       /**
     * 显示btn按钮
     */
    private showBtn(index:number)
    {
        if(!Api.switchVoApi.checkOpenDailyActivity1RmbTap())
        {
            // index = 1;
            index = index-1;
        }
        
        if(index<0){
            index = 0
        }   
        for(let i = 0;i < this._btnList.length;i++)
        {
            if(index == i)
            {
                this._btnList[i].setVisible(true);
            }
            else
            {
                this._btnList[i].setVisible(false);
            }
        }
    }

    protected receivePushData(event:egret.Event):void
	{
		let data:{ret:boolean,data:any}=event.data;
		if(data.data.ret == 0 && data.data.cmd==NetPushConst.PUSH_PAY)
		{
            this.showBuyRewards();
            this.refreshbuyTimes();
			if(data.data.data.payment)
			{
				let itemid=data.data.data.payment.itemId;
			}
		}
	}

    protected showBuyRewards()
    {
        let boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        let rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.cost);
        let getReward = "1_1_" + rechargecfgObj.gemCost + "|" + rechargecfgObj.getReward;
        let rewObj = GameData.formatRewardItem(getReward);
        App.CommonUtil.playRewardFlyAction(rewObj);
    }

    protected boxBtnHandler2(param:any)
    {
        this.boxBtnHandler(null,param);
    }

    protected boxBtnHandler(obj:any,param:any)
    {
        if(param == this._curgid ){
            return;
        }
        this._curgid = param;
        this._lastBoxBtn.updateButtonImage(BaseButton.BTN_STATE1);
        let btn = <BaseButton>this._boxList[param];
        btn.updateButtonImage(BaseButton.BTN_STATE2);
        this._lastBoxBtn = btn;
        
        this.refreshUIInfo();
        this.showBtn(Number(param));
    }

    private getBoxImgPre(idx:number|string)
    {
        idx = Number(idx);
        let resStr = "acdailyactivity_box";
        if(idx <= 1){
            return resStr += 1;
        }
        else if(idx >= 5){
            return resStr += 3;
        }else{
            return resStr += 2;
        }
    }
   
    protected refreshUIInfo()
    {
        this.refreshRewardItems();
    }

    protected refreshRewardItems()
    {
        let boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        let cost = boxCfg.cost;
        let rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(cost);
        let rewards = "1_1_" + rechargecfgObj.gemCost + "|" + rechargecfgObj.getReward;
        this._getList.refreshData(GameData.formatRewardItem(rewards));
        this._boxNameTxt.text = LanguageManager.getlocal("acDailyActivity_boxname_"+cost);
        this._boxNameTxt.y = this._topbg3.y + 40 + 26 - this._boxNameTxt.height;
        this._boxDesceTxt.text = LanguageManager.getlocal("acDailyActivity_boxDesc_"+cost);
        this._worthTxt.text = boxCfg.show * 100 + "%";
        this._worthTxt.anchorOffsetX =  this._worthTxt.width/2 * this._worthTxt.scaleX ;
        this.refreshbuyTimes();
       
    }

    protected refreshbuyTimes()
    {
        let boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        let times = this._acVo.getBuyTimes(boxCfg.cost);
        let limt = boxCfg.limit;
        let str = (limt - times) + "/" + limt ;
        this._buyTimesText.text = LanguageManager.getlocal("acDailyActivity_buyTimes",[str]);
    }

    public tick()
	{
        if(this._acVo.isStart ){
            this._cdText.text = LanguageManager.getlocal("acDailyActivity_acCD",[this._acVo.acCountDown]);
        }else{
            this._cdText.text = "";
        }
	}

    protected switchHandler(param:any)
    {
        let changeW = 505;
		let scroL = this._topScrolView.scrollLeft;
		if(param ==  "right"){
			if (scroL + changeW > this._topScrolView.getMaxScrollLeft()){
				scroL = this._topScrolView.getMaxScrollLeft() ;
			}else{
				scroL += changeW;
			}
		}
		if(param == "left"){
			if (scroL - changeW < 0){
				scroL =  0;
			}else{
				scroL -= changeW;
			}
		}
		this._topScrolView.setScrollPosition(0,scroL);
    }

    protected getTitleStr():string
    {
        return "acDailyActivityViewTitle";
    }

    protected getTitleBgName():string
	{
		return "commonview_db_04"
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "acdailyactivity_boxbtn_down", "acdailyactivity_boxbtn",
            "acdailyactivity_discountbg","acdailyactivity_topbg1","adult_lowbg",
            "atkracecross_rewatdbg1","atkracecross_rewatdbg1_1","commonview_db_04",
            "recharge2_fnt",
            // "btn_leftpage_down","btn_leftpage",
        ]);
    } 

    public dispose():void
	{   
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYACTIVITY_REFRESH,this.refreshFromNotify,this);

        this.buyBtn = null;
        this._getList = null;
        this._curgid = null;
        this._cdText = null;
        this._buyTimesText = null;
        this._acVo = null;
        this._boxNameTxt = null;
        this._boxDesceTxt = null;
        this._boxList = [];
        this._lastBoxBtn = null;
        this.cfgObj = null;
        this._topScrolView = null;
        this._worthTxt = null;
        this._btnList = [];
        this._topbg3 = null;
        super.dispose();
    }

}