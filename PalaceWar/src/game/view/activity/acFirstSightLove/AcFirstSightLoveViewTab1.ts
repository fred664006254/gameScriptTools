/**
 * 倾心礼包
 * author ycg
 * date 2019.10.17
 * @class AcFirstSightLoveViewTab1
 */
class AcFirstSightLoveViewTab1 extends AcCommonViewTab{
    public _scrollList:ScrollList = null;
    public _timeCountDown:BaseTextField = null;

    public constructor(){
        super();
        egret.callLater(this.initView, this);
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshUI,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BUY, this.requestBuyCallBack, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.LogUtil.log("initView: code: "+this.code);
        let parentView = <AcFirstSightLoveView>ViewController.getInstance().getView("AcFirstSightLoveView");
        App.LogUtil.log("parent tab1: "+parentView.getChildShowHeight());
        this.width = GameConfig.stageWidth;
        this.height = parentView.getChildShowHeight();
        let infoBgStr = ResourceManager.hasRes("ac_firstsightlove_love_infobg-"+this.getTypeCode()) ? "ac_firstsightlove_love_infobg-"+this.getTypeCode() : "ac_firstsightlove_love_infobg-1";
        let infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.width/2 - infoBg.width/2, 15);
        this.addChild(infoBg);

        let acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveLoveDesc-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        acDesc.width = infoBg.width - 40;
        acDesc.lineSpacing = 5;
        acDesc.setPosition(infoBg.x + infoBg.width/2 - acDesc.width/2, infoBg.y + 20);
        this.addChild(acDesc);

        let acTime = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveTime-"+this.getTypeCode(), [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        acTime.setPosition(acDesc.x, acDesc.y + acDesc.height +5);
        this.addChild(acTime);

        let timeCountDown = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveCountDown-"+this.getTypeCode(), [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeCountDown.anchorOffsetX = timeCountDown.width/2;
        timeCountDown.setPosition(infoBg.x + infoBg.width/2 - 6, infoBg.y + infoBg.height - 25);
        this.addChild(timeCountDown);
        this._timeCountDown = timeCountDown;

        let listBg = BaseBitmap.create("public_9_probiginnerbg");
        listBg.width = this.width - 30;
        listBg.height = this.height - infoBg.y - infoBg.height - 30;
        listBg.setPosition(infoBg.x + infoBg.width/2 - listBg.width/2, infoBg.y + infoBg.height + 5);
        this.addChild(listBg);

        let dataList = this.cfg.festivalList1;
        let rect =  new egret.Rectangle(0, 0, listBg.width - 20, listBg.height - 10);
        let scrollList = ComponentManager.getScrollList(AcFirstSightLoveViewScrollItem1, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(listBg.x + 8, listBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList; 

        TickManager.addTick(this.tick, this);
    }

    protected receivePushData(event: egret.Event): void {
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

    private requestBuyCallBack(evt:egret.Event){
        let rData = evt.data.data.data;
        if (rData){
            let rewObj = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    }

    public refreshView():void{
        App.LogUtil.log("refreshview ");
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, { activeId: this.vo.aidAndCode});
        App.LogUtil.log("refreshui ");
        let dataList = this.cfg.festivalList1;
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
    }

    public refreshUI():void{
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, { activeId: this.vo.aidAndCode});
        App.LogUtil.log("refreshui ");
        let dataList = this.cfg.festivalList1;
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
    }

    public refreshWhenSwitchBack(){
        App.LogUtil.log("tab1  refreshWhenSwitchBack");
        let dataList = this.cfg.festivalList1;
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
    }

    public tick():void{
        this._timeCountDown.text = LanguageManager.getlocal("acFirstSightLoveCountDown-"+this.getTypeCode(), [this.vo.getCountDown()]);
        this._timeCountDown.anchorOffsetX = this._timeCountDown.width/2;
    }

    public getTypeCode():string{
        return this.code;
    }

    private get cfg():Config.AcCfg.FirstSightLoveCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcFirstSightLoveVo{
        return <AcFirstSightLoveVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public dispose():void{
        TickManager.removeTick(this.tick, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshUI,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BUY, this.requestBuyCallBack, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._scrollList = null;
        this._timeCountDown = null;
        super.dispose();
    }
}