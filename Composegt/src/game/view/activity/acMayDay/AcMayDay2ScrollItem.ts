/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 转盘活动 累计充值itemrender
 */
class AcMayDay2ScrollItem  extends ScrollListItem
{
    //item数据
    private _itemData = undefined;
    //进度条
    private _progress:ProgressBar;
    //已经领取图标
    private _collectFlag:BaseBitmap;
    //领取按钮
    private _collectBtn:BaseButton;
    //充值按钮
    private _chargeBtn:BaseButton;
    //消费信息标头背景图
    private _detailBgImg: BaseBitmap;
    //序号
    private _curIdx:number=0;
    private _rechargeItem = null;

    
    private static _lastReqIdx:number = null;
    private static _lastPos: any = null;
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.MayDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }

    private get vo() : AcMayDayVo{
        return <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }
    
    protected initItem(index:number,data:any)
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.refreshBtnStatus,this);
        this._itemData = data;
        this._curIdx = index;
        let cfgObj : Config.AcCfg.MayDayCfg = Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
		let objList = cfgObj.recharge;
        this._rechargeItem = cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_listbg");
        bg.width = 610;
        bg.height = 246;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("activity_charge_red");
        this._detailBgImg.width = 470;
        this._detailBgImg.y = 3;
        this.addChild(this._detailBgImg);

        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acMayDayTotal_recharge",[String(this._rechargeItem.needGem)])
        Txt1.x = this._detailBgImg.x + 20;
        Txt1.y = this._detailBgImg.y + this._detailBgImg.height/2 - Txt1.height/2;
        this.addChild(Txt1);

        //创建奖励列表
        let rewardArr =  GameData.formatRewardItem(this._rechargeItem.getReward);
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
        this.height = bg.height + 5;

        //进度条
        this._progress = ComponentManager.getProgressBar("progress_type1_yellow","progress_type1_bg",386);
        this._progress.x = 20;
        // progress.y = 185;
        this._progress.y = scroStartY;
        
        this.addChild(this._progress);
        this.refreshBtnStatus();

    }

    //刷新按钮状态
    protected refreshBtnStatus()
    {
        let tmpVo = this.vo;
		if(!tmpVo)
		{
			return;
		}	
        let chargeTotal : number = tmpVo.getChargeNum();
        this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText",[String(chargeTotal),this._rechargeItem.needGem]));
        this._progress.setPercentage(chargeTotal / this._rechargeItem.needGem);
        if (this._collectFlag)
            this.removeChild(this._collectFlag);
            this._collectFlag = null;
        if (this._collectBtn)
            this.removeChild(this._collectBtn);
            this._collectBtn = null;
        if (this._chargeBtn)
            this.removeChild(this._chargeBtn);
            this._chargeBtn = null;

        //根据是否达到金额设置title颜色
        // if (chargeTotal >= this._rechargeItem.needGem)
        // {
        //     this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_green");
        // } else {
        //     this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_red");
        // }
        
        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(this._curIdx + 1) &&  AcMayDay2ScrollItem._lastReqIdx != this._curIdx)
        {
            this.createCollectFlag();
        }
        else
        {
            if (chargeTotal >= this._rechargeItem.needGem)
            {
                let collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"ac_recharge_Btntxt2",this.eventCollectHandler ,this);        
                collectBtn.x = 440;
                collectBtn.y = this._progress.y + this._progress.height/2 -collectBtn.height/2 ;;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }else
            {
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE,"acCarnivalToChargeBtnText",this.goRechargeHandler ,this);        
                chargeBtn.x = 440;
                chargeBtn.y =  this._progress.y + this._progress.height/2 -chargeBtn.height/2 ;
                chargeBtn.name = "costBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
            }
        }
    }

    protected refreshUI()
    {
        if(this._collectBtn)
        {
            this._collectBtn.visible = false;
        }
        if (!this._collectFlag){
            /**
             * 展示已领取
             */
            this.createCollectFlag();
    
            this._collectFlag.setScale(1.5);
         
            egret.Tween.get(this._collectFlag).to({scaleX:1,scaleY:1},300);
        }

    }

    protected createCollectFlag()
    {
        this._collectFlag = BaseBitmap.create("collectflag")
        this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
        // this._collectFlag.setScale(0.7);
        this._collectFlag.x = 450 + this._collectFlag.width/2;
        this._collectFlag.y = this._progress.y + this._progress.height/2-10 ;
        this.addChild(this._collectFlag);
    }

    protected eventCollectHandlerCallBack(event:egret.Event)
    {
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if(AcMayDay2ScrollItem._lastReqIdx != this._curIdx)
        {
            return;
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB),this.eventCollectHandlerCallBack,this);
        AcMayDay2ScrollItem._lastReqIdx = null;
        this.refreshUI();
        let rewards = rData.rewards
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = AcMayDay2ScrollItem._lastPos;
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
    }

    private get acTivityId() : string{
        return `${AcMayDayView.AID}-${AcMayDayView.CODE}`;
    }

    protected eventCollectHandler(event:egret.TouchEvent)
    {
        if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        AcMayDay2ScrollItem._lastReqIdx = this._curIdx;
        AcMayDay2ScrollItem._lastPos = this._progress.localToGlobal(this._progress.width + 80,20);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB),this.eventCollectHandlerCallBack,this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB,{activeId:this.acTivityId,rechargeId:this._curIdx + 1})
    }
    
    protected goRechargeHandler(event:egret.Event)
    {
        if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
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
        return 10;
    }
    public dispose():void
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB),this.eventCollectHandlerCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.refreshBtnStatus,this);
        this._itemData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._curIdx = 0;
        this._rechargeItem = null;
        // this._lastReqIdx = null;
        super.dispose();
    }
}