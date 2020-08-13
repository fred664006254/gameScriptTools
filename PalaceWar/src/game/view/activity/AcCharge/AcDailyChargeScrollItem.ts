/**
 * 充值活动，每日充值列表节点
 * author yanyuling
 * date 2017/11/08
 * @class AcDailyChargeScrollItem
 */
class AcDailyChargeScrollItem  extends ScrollListItem
{
    private _uiData = undefined;
    private _progress:ProgressBar;
    private _collectFlag:BaseBitmap;
    private _rechargeItem = null;
    private _collectBtn:BaseButton;
    private _chargeBtn:BaseButton;
    private _curIdx:number=0;
    private _lastReqIdx:number = null;
   
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V,this.refreshBtnStatus,this);

        this._uiData = data;
        this._curIdx = index;
        let totalVo = Api.acVoApi.getActivityVoByAidAndCode("dailyCharge");
        let cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("dailyCharge",totalVo.code);
        this._rechargeItem = cfgObj.getRechargeItemById(this._uiData);
       
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 598;
        bg.height = 246;
        this.addChild(bg);

        let charge_redBg = BaseBitmap.create("activity_charge_red");
        charge_redBg.y = 5;
        this.addChild(charge_redBg);

        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acDaily_recharge_txt1",[String(this._rechargeItem.needGem)])
        Txt1.x = charge_redBg.x+20;
        Txt1.y = charge_redBg.y + 10;
        this.addChild(Txt1);

        let rewardArr =  GameData.formatRewardItem(this._rechargeItem.reward);
		let scroStartY = 60;
        let tmpX = 14;
        for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            // tmpX =  20+ index * (iconItem.width+10);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width+7);
            if (tmpX > bg.width-8)
            {
                tmpX = 14;
                scroStartY += iconItem.height + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width+7);
            }
            
			this.addChild(iconItem);
		}
        scroStartY += 130;
        bg.height = scroStartY + 60;
        this.height = bg.height+5;
        
        let progress = ComponentManager.getProgressBar("progress5","progress3_bg",386);
        progress.x = 20;
        // progress.y = 185;
        progress.y = scroStartY;
        this.addChild(progress);
        this._progress = progress
        // progress.setText(tmpVo.v + "/"+ rechargeItem.needGem);
        this.refreshBtnStatus();
    }

    protected refreshBtnStatus()
    {
        let tmpVo = <AcDailyChargeVo>Api.acVoApi.getActivityVoByAidAndCode("dailyCharge");
        if(tmpVo == null || tmpVo.v == null)
        {
            return;
        }
        this._progress.setText(LanguageManager.getlocal("acrecharge_yuan",[String(tmpVo.v),this._rechargeItem.needGem]));
        this._progress.setPercentage(tmpVo.v / this._rechargeItem.needGem);
        if (this._collectFlag)
            this.removeChild(this._collectFlag);
            this._collectFlag = null;
        if (this._collectBtn)
            this.removeChild(this._collectBtn);
            this._collectBtn = null;
        if (this._chargeBtn)
            this.removeChild(this._chargeBtn);
            this._chargeBtn = null;

        if (tmpVo.flags[this._uiData])
        {
            this.createCollectFlag();
        }
        else
        {
            if (tmpVo.v >= this._rechargeItem.needGem)
            {
                let collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"ac_recharge_Btntxt2",this.eventCollectHandler ,this);        
                collectBtn.x = this._progress.x + this._progress.width + 20;
                collectBtn.y = this._progress.y + this._progress.height/2 -collectBtn.height/2 ;
                collectBtn.name = "collectBtn"
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }else
            {
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"ac_recharge_Btntxt1",this.goRechargeHandler ,this);        
                chargeBtn.x = this._progress.x + this._progress.width + 20;
                chargeBtn.y =  this._progress.y + this._progress.height/2 -chargeBtn.height/2 ;
                chargeBtn.name = "chargeBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
            }
        }
    }
    protected refreshUI()
    {
        if(this.getChildByName("collectBtn"))
        {
             this.getChildByName("collectBtn").visible = false;
        }
        if (this._collectFlag)
            this.removeChild(this._collectFlag);
            this._collectFlag = null;
        /**
         * 展示已领取
         */
        
        this.createCollectFlag();
        this._collectFlag.visible = false;
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:0.7,scaleY:0.7},300);

    }

    protected createCollectFlag()
    {
        this._collectFlag = BaseBitmap.create("collectflag")
        this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
        this._collectFlag.setScale(0.7);
        this._collectFlag.x = this._progress.x + this._progress.width + 100;
        this._collectFlag.y = this._progress.y + this._progress.height/2-10 ;
        this.addChild(this._collectFlag);
    }

    protected eventCollectHandlerCallBack(event:egret.Event)
    {
        this.removeUIListener();
        if (!event.data.ret){
            return ;
        }
        let rData = event.data.data.data;
        let ret = event.data.data.ret
        let rkey = rData.rkey;
        // if (ret != 0 || this._lastReqIdx != this._curIdx)
        // {
        //     return;
        // }
        if (ret != 0 || rkey != this._uiData)
        {
            return;
        }
        this._lastReqIdx = null;
        this.refreshUI();
        let  rewards = rData.rewards
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = this._progress.localToGlobal(this._progress.width + 50,20);
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
        

    }

    protected eventCollectHandler(event:egret.TouchEvent)
    {
        this.addUIListener();
        this._lastReqIdx = this._curIdx;
        let totalVo = Api.acVoApi.getActivityVoByAidAndCode("dailyCharge");
        NetManager.request(NetRequestConst.REQUEST_RECHARGE_GETDAILYREWARD,{activeId:"dailyCharge-"+totalVo.code,rkey:this._uiData})
    }
    
    protected goRechargeHandler(event:egret.Event)
    {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
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
    public addUIListener()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETDAILYREWARD),this.eventCollectHandlerCallBack,this);

    }
    public removeUIListener()
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETDAILYREWARD),this.eventCollectHandlerCallBack,this);

    }
    public dispose():void
    {
        this.removeUIListener();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V,this.refreshBtnStatus,this);

        this._uiData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._curIdx = 0;
        this._rechargeItem = null;
        this._lastReqIdx = null;

        super.dispose();
    }
}
