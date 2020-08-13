/**
 * 充值活动，档位返还元宝列表节点
 * author 赵占涛
 */
class AcRechargeRebateScrollItem  extends ScrollListItem
{
    private _uiData = undefined;
    private _rechargeItem = null;
    private _collectBtn:BaseButton;
    private _chargeBtn:BaseButton;
    private _curIdx:number=0;
    private _lastReqIdx:number = null;

    private _txt2:BaseTextField = null;
    private _gemIcon1:BaseLoadBitmap = null;
    private _num1:BaseBitmapText|BaseTextField = null;
    private _txtMulti:BaseTextField = null;

    private _txt3:BaseTextField = null;
    private _gemIcon2:BaseLoadBitmap = null;
    private _num2:BaseBitmapText|BaseTextField = null;
  
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARGEREBATE_REFRESH_V,this.refreshBtnStatus,this);

        this._uiData = data;
        this._curIdx = index;
        let rechargeRebateVo = <AcRechargeRebateVo>Api.acVoApi.getActivityVoByAidAndCode("rechargeRebate");
        let cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("rechargeRebate",rechargeRebateVo.code);
        let rechargeItem = cfgObj.getList()[data];
        this._rechargeItem = rechargeItem;

        let bg = BaseBitmap.create("activity_db_01");
        bg.width = 606;
        bg.height = 158;
        this.addChild(bg);

        let charge_redBg = BaseBitmap.create("activity_charge_red");
        charge_redBg.width = 550;
        charge_redBg.y = 3;
        this.addChild(charge_redBg);
        let rechargeGem = Config.RechargeCfg.getRechargeItemCfgByKey(this._rechargeItem.needGem).gemCost;
        
        let Txt1 = ComponentManager.getTextField(LanguageManager.getlocal("rechargeRebate_itemTitle", [String(rechargeGem)]),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        if(Config.RechargeCfg.getRechargeItemCfgByKey(this._rechargeItem.needGem).id=="g7")
        {
            Txt1.text="イベント期間中士族の手札を購入"
        }
        else if(Config.RechargeCfg.getRechargeItemCfgByKey(this._rechargeItem.needGem).id=="g8")
        {
            Txt1.text="イベント期間中王族の手札を購入"
        }
        Txt1.x = charge_redBg.x+20;
        Txt1.name = "Txt1";
        Txt1.y = charge_redBg.y + 7;
        this.addChild(Txt1);

        // 返利数
        let Txt2 = ComponentManager.getTextField(LanguageManager.getlocal("rechargeRebate_itemPre"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
        Txt2.x = 39;
        Txt2.y = 85;
        this.addChild(Txt2);        
        let itemicon1 = BaseLoadBitmap.create("itemicon1");
        itemicon1.width = 100;
        itemicon1.height = 100;
        itemicon1.setScale(0.45);
        itemicon1.x = Txt2.x + Txt2.width + 10 - itemicon1.width / 2 * itemicon1.scaleX;
        itemicon1.y = Txt2.y + Txt2.height/2 - itemicon1.height/2 * itemicon1.scaleY;
        this.addChild(itemicon1);        
        let numLb: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(rechargeItem.getGem + "", "recharge_fnt");
		numLb.x = itemicon1.x + itemicon1.width * itemicon1.scaleX + 10;
		numLb.y = Txt2.y + Txt2.height/2 - numLb.height/2;
        this.addChild(numLb);
        this._txt2 = Txt2;
        this._gemIcon1 = itemicon1;
        this._num1 = numLb;
        let txtMulti = ComponentManager.getTextField(LanguageManager.getlocal("rechargeRebate_multi"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
        txtMulti.x = numLb.x + numLb.width + 10;
        txtMulti.y = Txt2.y + Txt2.height/2 - txtMulti.height/2;
        this.addChild(txtMulti); 
        this._txtMulti = txtMulti;
        // 共返利数
        let Txt3 = ComponentManager.getTextField(LanguageManager.getlocal("rechargeRebate_itemTotalGet"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
        Txt3.x = 39;
        Txt3.y = 85;
        this.addChild(Txt3);        
        let itemicon1_1 = BaseLoadBitmap.create("itemicon1");
        itemicon1_1.width = 100;
        itemicon1_1.height = 100;
        itemicon1_1.setScale(0.45);
        itemicon1_1.x = Txt3.x + Txt3.width + 10 - itemicon1_1.width / 2 * itemicon1_1.scaleX;
        itemicon1_1.y = Txt3.y + Txt3.height/2 - itemicon1_1.height/2 * itemicon1_1.scaleY;
        this.addChild(itemicon1_1);        
        let numLb2: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(rechargeItem.getGem + "", "recharge_fnt");
		numLb2.x = itemicon1_1.x + itemicon1_1.width * itemicon1_1.scaleX + 10;
		numLb2.y = Txt3.y + Txt3.height/2 - numLb2.height/2;
        this.addChild(numLb2);
        this._txt3 = Txt3;
        this._gemIcon2 = itemicon1_1;
        this._num2 = numLb2;

        this.refreshBtnStatus();
    }

     protected refreshBtnStatus()
    {
        let tmpVo = <AcRechargeRebateVo>Api.acVoApi.getActivityVoByAidAndCode("rechargeRebate");
        if(tmpVo == null)
        {
            return;
        }
        let needDay = String(this._rechargeItem.needDay)

        if (this._collectBtn){
            this.removeChild(this._collectBtn);
            this._collectBtn = null;
        }
        if (this._chargeBtn) {
            this.removeChild(this._chargeBtn);
            this._chargeBtn = null;
        }
        let multiCount = tmpVo.getCollectNum(this._rechargeItem.needGem);
        if (multiCount > 0)
        {
            let collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"ac_recharge_Btntxt2",this.eventCollectHandler ,this);        
            collectBtn.x = 502 - collectBtn.width/2;
            collectBtn.y = 88 - collectBtn.height/2;
            collectBtn.name = "collectBtn";
            this.addChild(collectBtn);
            this._collectBtn = collectBtn;
            this._txt3.visible = true;
            this._gemIcon2.visible = true;
            this._num2.visible = true;
            this._txt2.y = 85 - 18 - this._txt2.height/2;
            this._gemIcon1.y = this._txt2.y + this._txt2.height/2 - this._gemIcon1.height/2 * this._gemIcon1.scaleX - 3;
            this._num1.y = this._txt2.y + this._txt2.height/2 - this._num1.height/2 - 3;
            this._txt3.y = 85 + 18 - this._txt3.height/2;
            this._gemIcon2.y = this._txt3.y + this._txt3.height/2 - this._gemIcon2.height/2 * this._gemIcon2.scaleY - 3;
            this._num2.y = this._txt3.y + this._txt3.height/2 - this._num2.height/2 - 3;
            this._num2.text = String(multiCount * this._rechargeItem.getGem);
            this._txtMulti.text = LanguageManager.getlocal("rechargeRebate_multi", [String(multiCount)])
            this._txtMulti.visible = true;
            this._txtMulti.y = this._txt2.y + this._txt2.height/2 - this._txtMulti.height/2;
        }else
        {
            let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE,"ac_recharge_Btntxt1",this.goRechargeHandler ,this);        
            chargeBtn.x = 502 - chargeBtn.width/2;
            chargeBtn.y = 88 - chargeBtn.height/2;
            chargeBtn.name = "chargeBtn";
            this.addChild(chargeBtn);
            this._chargeBtn = chargeBtn;
            this._txt3.visible = false;
            this._gemIcon2.visible = false;
            this._num2.visible = false;
            this._txtMulti.visible = false;
            this._txt2.y = 85 - this._txt2.height/2;
            this._gemIcon1.y = this._txt2.y + this._txt2.height/2 - this._gemIcon1.height/2 * this._gemIcon1.scaleY - 3;
            this._num1.y = this._txt2.y + this._txt2.height/2 - this._num1.height/2 - 3;

        }
        
    }

    protected eventCollectHandler(event:egret.TouchEvent)
    {   let tmpVo = Api.acVoApi.getActivityVoByAidAndCode("rechargeRebate");
        if(!tmpVo || !tmpVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        this.addUIListener();
        this._lastReqIdx = this._curIdx;
        NetManager.request(NetRequestConst.REQUEST_RECHARGE_GETRECHARGETYPEREWARD,{activeId:"rechargeRebate-"+tmpVo.code,rechargeId:this._uiData})
    }
    
    protected goRechargeHandler(event:egret.Event)
    {
        if(Config.RechargeCfg.getRechargeItemCfgByKey(this._rechargeItem.needGem).id=="g7")
        {
            ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);        
        }
        else if(Config.RechargeCfg.getRechargeItemCfgByKey(this._rechargeItem.needGem).id=="g8"){
            ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD); 
        }
        else{
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);        
        }
        
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_AC_RECHARGE_CLOSE);
    }
    public getSpaceX():number
	{
		return 10;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}

    protected eventCollectHandlerCallBack(event:egret.Event)
    {
        this.removeUIListener();
        let rData = event.data.data.data;
        let ret = event.data.data.ret
        if (ret != 0 || this._lastReqIdx != this._curIdx)
        {
            return;
        }
        this._lastReqIdx = null;
        let  rewards = rData.rewards
        let rewardList =  GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
    }
    public addUIListener()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETRECHARGETYPEREWARD),this.eventCollectHandlerCallBack,this);
    }
    public removeUIListener()
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETRECHARGETYPEREWARD),this.eventCollectHandlerCallBack,this);
    }
    public dispose():void
    {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RECHARGEREBATE_REFRESH_V,this.refreshBtnStatus,this);
        this.removeUIListener();
        this._uiData = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._curIdx = 0;
        this._rechargeItem = null;
        this._lastReqIdx  = null;
        this._txt2=null;
        this._gemIcon1=null;
        this._num1=null;
        this._txtMulti=null;

        this._txt3=null;
        this._gemIcon2=null;
        this._num2=null;
        
        super.dispose();
    }
}
