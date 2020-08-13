/**
 * 泰拳活动 商店
 * author ycg
 * date 2019.9.25
 * @class AcPunishShopPopupView
 */
class AcPunishShopPopupView extends PopupView{
    private _scrollList:ScrollList = null;
    private _shopTopContainer:BaseDisplayObjectContainer = null;
    private _storeTopContainer:BaseDisplayObjectContainer = null;
    private _scoreTopContainer:BaseDisplayObjectContainer = null;
    private _bottomTip:BaseTextField = null;
    private _btnIndex:number = 0;
    private _bg:BaseBitmap = null;

    public constructor(){
        super();
    }

    protected getOffsetX():number
	{
		return 23;
	}

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refreshView,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM, this.refreshShop, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP, this.refreshExchange, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_PUNISHADDENERGY, this.refreshStoreUse, this);

        let tabName:string[] = ["acPunishShopTabName-"+this.getTypeCode(), "acPunishStoreTabName-"+this.getTypeCode(), "acPunishExPopupViewTitle"];
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName,this.tabBtnClickHandler, this);
        tabbarGroup.x = 35+GameData.popupviewOffsetX-6;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);

        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 540;
        bg.height = 700;
        bg.setPosition(20+GameData.popupviewOffsetX-6, 52);
        this.addChildToContainer(bg);
        this._bg = bg;

        let titleBg = BaseBitmap.create("countrywarrewardview_itembg");
        titleBg.width = bg.width;
        titleBg.setPosition(bg.x + bg.width/2 - titleBg.width/2, bg.y + 3);
        this.addChildToContainer(titleBg);

        //商店顶部
        let shopTopContainer = new BaseDisplayObjectContainer();
        shopTopContainer.width = bg.width;
        shopTopContainer.height = titleBg.height;
        shopTopContainer.setPosition(titleBg.x, titleBg.y);
        this.addChildToContainer(shopTopContainer);
        this._shopTopContainer = shopTopContainer;

        let shopTopIcon = BaseBitmap.create("public_icon1");
        shopTopIcon.name = "shopTopIcon";
        shopTopIcon.setScale(0.8);
        shopTopIcon.y = shopTopContainer.height/2 - shopTopIcon.height/2 * shopTopIcon.scaleY;
        shopTopContainer.addChild(shopTopIcon);

        let shopNum = ComponentManager.getTextField(""+Api.playerVoApi.getPlayerGemStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        shopTopIcon.x = shopTopContainer.width/2 - (shopTopIcon.width * shopTopIcon.scaleX + shopNum.width)/2;
        shopNum.setPosition(shopTopIcon.x + shopTopIcon.width * shopTopIcon.scaleX, shopTopContainer.height/2 - shopNum.height/2);
        shopNum.name = "shopNum";
        shopTopContainer.addChild(shopNum);

        //仓库顶部
        let storeTopContainer = new BaseDisplayObjectContainer();
        storeTopContainer.width = bg.width;
        storeTopContainer.height = titleBg.height;
        storeTopContainer.setPosition(titleBg.x, titleBg.y);
        this.addChildToContainer(storeTopContainer);
        this._storeTopContainer = storeTopContainer;
        storeTopContainer.visible = false;

        let storeNumInfo = ComponentManager.getTextField(LanguageManager.getlocal("acPunishCurrEnergy-"+this.getTypeCode(), [""+this.vo.energy]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        storeNumInfo.name = "storeNumInfo";
        storeNumInfo.y = storeTopContainer.height/2 - storeNumInfo.height/2;
        storeTopContainer.addChild(storeNumInfo);

        //积分顶部
        let scoreTopContainer = new BaseDisplayObjectContainer();
        scoreTopContainer.width = bg.width;
        scoreTopContainer.height = titleBg.height;
        scoreTopContainer.setPosition(titleBg.x, titleBg.y);
        this.addChildToContainer(scoreTopContainer);
        this._scoreTopContainer = scoreTopContainer;
        scoreTopContainer.visible = false;

        let scoreNumInfo = ComponentManager.getTextField(LanguageManager.getlocal("acPunishCurrScore-"+this.getTypeCode(), [""+this.vo.score]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        scoreNumInfo.name = "scoreNumInfo";
        scoreNumInfo.y = scoreTopContainer.height/2 - scoreNumInfo.height/2;
        scoreTopContainer.addChild(scoreNumInfo);

        let dataList = [];
        let dataCfg = this.cfg.punishList;
        for (let key in dataCfg){
            let currData = {id:Number(key), data:dataCfg[key]};
            dataList.push(currData);
        }
        dataList.sort((a, b)=>{return a.id - b.id});
        let rect =  new egret.Rectangle(0, 0, 530, bg.height - titleBg.height - 10);
        let scrollList = ComponentManager.getScrollList(AcPunishShopScrollItem, dataList, rect, {aid:this.aid, code:this.code, type:0});
        scrollList.setPosition(bg.x + 5, bg.y + titleBg.height + 5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;

        this.refreshTopView();

        //底部提示 
        let bottomTip = ComponentManager.getTextField(LanguageManager.getlocal("acPunishShopBottomTip-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomTip.setPosition(bg.x + bg.width/2 - bottomTip.width/2, bg.y + bg.height + 60);
        this.addChildToContainer(bottomTip);
        this._bottomTip = bottomTip;
        // this._scrollList.verticalScrollPolicy = "off";
    }

    //tabbar 点击事件
    private tabBtnClickHandler(params:any):void{
        App.LogUtil.log("param.index"+params.index);
        let btnIndex = params.index;
        this._btnIndex = btnIndex;
        let dataList = [];
        if (btnIndex == 0 || btnIndex == 1){
            let dataCfg = this.cfg.punishList;
            for (let key in dataCfg){
                let currData = {id:Number(key), data:dataCfg[key]};
                dataList.push(currData);
            }
            dataList.sort((a, b)=>{return a.id - b.id});
        }
        else if (btnIndex == 2){
            let dataCfg = this.cfg.shop;
            for (let key in dataCfg){
                let currData = {id:Number(key), data:dataCfg[key]};
                dataList.push(currData);
            }
            dataList.sort((a, b)=>{return a.id - b.id});
        }

        this.refreshTopView();
        this.refreshBottomTip();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code, type:btnIndex});
    }

    //刷新顶部显示
    private refreshTopView():void{
        let index = this._btnIndex;
        if (index == 0){
            this._shopTopContainer.visible = true;
            this._storeTopContainer.visible = false;
            this._scoreTopContainer.visible = false;
            let shopIcon = <BaseBitmap>this._shopTopContainer.getChildByName("shopTopIcon");
            let shopNum = <BaseTextField>this._shopTopContainer.getChildByName("shopNum");
            shopNum.text = Api.playerVoApi.getPlayerGemStr();
            shopIcon.x = this._shopTopContainer.width/2 - (shopIcon.width*shopIcon.scaleX + shopNum.width)/2;
            shopNum.x = shopIcon.x + shopIcon.width*shopIcon.scaleX;
        }
        else if (index == 1){
            this._shopTopContainer.visible = false;
            this._storeTopContainer.visible = true;
            this._scoreTopContainer.visible = false;
            let storeNumInfo = <BaseTextField>this._storeTopContainer.getChildByName("storeNumInfo");
            storeNumInfo.text = LanguageManager.getlocal("acPunishCurrEnergy-"+this.getTypeCode(), [""+this.vo.energy]);
            storeNumInfo.x = this._storeTopContainer.width/2 - storeNumInfo.width /2;
        }
        else if (index == 2){
            this._shopTopContainer.visible = false;
            this._storeTopContainer.visible = false;
            this._scoreTopContainer.visible = true;
            let scoreNumInfo = <BaseTextField>this._scoreTopContainer.getChildByName("scoreNumInfo");
            scoreNumInfo.text = LanguageManager.getlocal("acPunishCurrScore-"+this.getTypeCode(), [""+this.vo.score]);
            scoreNumInfo.x = this._scoreTopContainer.width/2 - scoreNumInfo.width/2;
        }
    }

    //刷新底部显示
    private refreshBottomTip():void{
        let index = this._btnIndex;
        this._bottomTip.visible = false;
        if (index == 0){
            this._bottomTip.visible = true;
            this._bottomTip.text = LanguageManager.getlocal("acPunishShopBottomTip-"+this.getTypeCode());
        }
        else if (index == 1){
            this._bottomTip.visible = true;
            this._bottomTip.text = LanguageManager.getlocal("acPunishStoreBottomTip-"+this.getTypeCode());
        }
        this._bottomTip.x = this._bg.x + this._bg.width/2 - this._bottomTip.width/2;
    }

    //刷新view
    private refreshView():void{
        let btnIndex = this._btnIndex;
        let dataList:any = [];
        if (btnIndex == 0 || btnIndex == 1){
            let dataCfg = this.cfg.punishList;
            for (let key in dataCfg){
                let currData = {id:Number(key), data:dataCfg[key]};
                dataList.push(currData);
            }
            dataList.sort((a, b)=>{return a.id - b.id});
        }
        else if (btnIndex == 2){
            let dataCfg = this.cfg.shop;
            for (let key in dataCfg){
                let currData = {id:Number(key), data:dataCfg[key]};
                dataList.push(currData);
            }
            dataList.sort((a, b)=>{return a.id - b.id});
        }

        this.refreshTopView();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code, type:btnIndex});
    }

    //商店购买
    private refreshShop(evt:egret.Event):void{
        let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }  
    }

    //道具使用
    private refreshStoreUse(evt:egret.Event):void{
        let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let strList = [];
        if (rData.getEnergy){
            let flyStr = LanguageManager.getlocal("acPunishGetEnergtTxt-"+this.getTypeCode(), [String(rData.getEnergy)]);
            App.LogUtil.log("flyStr: "+flyStr);
            strList.push({tipMessage:flyStr});
            App.CommonUtil.playRewardFlyAction(strList);
        }

        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);

        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    }

    //积分兑换
    private refreshExchange(evt:egret.Event):void{
        let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    }

    private getTypeCode():string{
        if (this.code == "13"){
            return "12";
        }
        return this.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get vo():AcPunishVo{
        return <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.PunishCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    protected getTitleStr():string{
        return "acPunishShopTitle-"+this.getTypeCode();
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat([
            "progress2_bg", "progress2", "countrywarrewardview_itembg"
        ]).concat(list);
    }

    protected getShowHeight():number{
        return 850;
    }

    protected getShowWidth():number
	{
		return 580;
	}

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refreshView,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM, this.refreshShop, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP, this.refreshExchange, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_PUNISHADDENERGY, this.refreshStoreUse, this);


        this._scrollList = null;
        this._shopTopContainer = null;
        this._storeTopContainer = null;
        this._scoreTopContainer = null;
        this._btnIndex = 0;
        this._bottomTip = null;

        super.dispose();
    }
}