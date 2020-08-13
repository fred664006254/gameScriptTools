/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 七夕活动充值奖励itemrender
 */
class AcDoubleSeventhAwardScrollItem  extends ScrollListItem
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
    //序号
    private _curIdx:number=0;
    private _rechargeItem = null;

    
    private static _lastReqIdx:number = null;
    private static _lastPos: any = null;
    
    public constructor()
    {
        super();
    }

    private get codeResStr() : string
    {
        let str = ``;
        switch(String(this._code)){
            case `1`:
                str = "";
                break;
            case `4`:
                str = `_code3`;
                break;
            default :
                str = ("_code"+this._code);
                break;
        }
        return str;
    }
    
    private get cfg() : Config.AcCfg.DoubleSeventhCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACDOUBLESEVENTH, this._code);
    }

    private get vo() : AcDoubleSeventhVo{
        return <AcDoubleSeventhVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACDOUBLESEVENTH, this._code);
    }

    private get acTivityId() : string{
		let seventhview : any = <AcCommonView>ViewController.getInstance().getView('AcDoubleSeventhView');
        return `${AcConst.AID_ACDOUBLESEVENTH}-${this._code}`;
    }
    
    private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 502;
		view.height = 342 + 7;
		this._itemData = data.key - 1;
        this._curIdx = this._itemData;
		let objList = view.vo.getArr(`recharge`);
        this._rechargeItem = view.cfg.recharge[this._itemData + 1]//cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = 342;
        this.addChild(bg);

        let key = data.key;
        let topbg = BaseBitmap.create("acsevenitemtopbg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0,5]);
        view.addChild(topbg);

        let buildTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acDoubleSeventhViewBuild${key}` + this.codeResStr), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, buildTxt, topbg);
        view.addChild(buildTxt);

        let zsxian1 = BaseBitmap.create("acsevenitemzshi");
		zsxian1.x = buildTxt.x - 20 - zsxian1.width;
		zsxian1.y = buildTxt.y + buildTxt.height/2 - zsxian1.height/2 ;
        // view.setLayoutPosition(LayoutConst.leftverticalCenter, zsxian1, topbg, [80,0]);
        view.addChild(zsxian1);

        let zsxian2 = BaseBitmap.create("acsevenitemzshi");
        zsxian2.scaleX = -1;
        // view.setLayoutPosition(LayoutConst.rightverticalCenter, zsxian2, topbg, [199,0]);
		zsxian2.x = buildTxt.x + buildTxt.width + 20 + zsxian2.width;
		zsxian2.y = buildTxt.y + buildTxt.height/2 - zsxian2.height/2 ;
        view.addChild(zsxian2);

        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acDoubleSeventhChargeItem` + this.codeResStr, [view.cfg.recharge[key].needGem.toString(), buildTxt.text]), 18, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, topbg, [0,topbg.height + 10]);
        view.addChild(descTxt);

        // //消费红色标头   改变领取状态的时候需要更改这个图片
        // let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        // Txt1.text = LanguageManager.getlocal("acMayDayTotal_recharge",[String(this._rechargeItem.needGem)])
        // Txt1.x = this._detailBgImg.x+20;
        // Txt1.y = this._detailBgImg.y + 10;
        // this.addChild(Txt1);
        //创建奖励列表
        let rewardArr =  GameData.formatRewardItem(this._rechargeItem.getReward);
        let scroStartY = descTxt.y + descTxt.textHeight + 20;

        let len = rewardArr.length >= 5 ? 5 : rewardArr.length;
        let tmpX = (bg.width - len * 84 - (len - 1) * 10) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(84/108);
            // tmpX =  20+ index * (iconItem.width+10);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 10);
            if (tmpX > bg.width - 10)
            {
                tmpX = (bg.width - len * 84 - (len - 1) * 10) / 2;
                scroStartY += iconItem.height * iconItem.scaleY + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 10);
            }
            
            this.addChild(iconItem);
        }
        scroStartY += 130;
        bg.height = scroStartY + 30;
        this.height = bg.height;

        let hua1 = BaseBitmap.create("acsevenhuawen");
        view.setLayoutPosition(LayoutConst.leftbottom, hua1, bg, [0,0]);
        view.addChild(hua1);

        let hua2 = BaseBitmap.create("acsevenhuawen");
        hua2.scaleX = -1;
        view.setLayoutPosition(LayoutConst.rightbottom, hua2, bg, [85,0]);
        view.addChild(hua2);
        //进度条
        this._progress = ComponentManager.getProgressBar("progress5","progress3_bg",324);
        this.setLayoutPosition(LayoutConst.leftbottom, this._progress, bg, [10,20]);
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
        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(this._itemData + 1) &&  AcDoubleSeventhAwardScrollItem._lastReqIdx != this._curIdx)
        {
            this.createCollectFlag();
        }
        else
        {
            if (chargeTotal >= this._rechargeItem.needGem)
            {   
                let btr:string = "ac_recharge_Btntxt3";
                if (this._code == "5")
                {
                    btr = "ac_recharge_Btntxt4";
                }
                let collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,btr,this.eventCollectHandler ,this);        
                collectBtn.x = this._progress.x + this._progress.width + 20;
                collectBtn.y = this._progress.y + this._progress.height/2 -collectBtn.height/2 ;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }else
            {
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"acCarnivalToChargeBtnText",this.goRechargeHandler ,this);        
                chargeBtn.x = this._progress.x + this._progress.width + 20;
                chargeBtn.y =  this._progress.y + this._progress.height/2 -chargeBtn.height/2 ;
                chargeBtn.name = "costBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
                if(!this.vo.isInActivity()){
                    this._chargeBtn.setEnable(false);
                }
            }
        }
    }

    protected refreshUI()
    {
        if(this.getChildByName("collectBtn"))
        {
            this.getChildByName("collectBtn").visible = false;
        }
        if (this._collectFlag){
            this.removeChild(this._collectFlag);
            this._collectFlag = null;
        }
        /**
         * 展示已领取
         */
        this.createCollectFlag();
        this._collectFlag.visible = false;
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        egret.Tween.get(this._collectFlag).to({scaleX:0.7,scaleY:0.7},300);
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
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(AcDoubleSeventhAwardScrollItem._lastReqIdx != this._curIdx)
        {
            return;
        }
        AcDoubleSeventhAwardScrollItem._lastReqIdx = null;
        this.refreshUI();
        let rewards = rData.rewards
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = AcDoubleSeventhAwardScrollItem._lastPos;
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
    }

    protected eventCollectHandler(event:egret.TouchEvent)
    {
        let view = this;
        if(!view.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        let awardview = ViewController.getInstance().getView('AcDoubleSeventhAwardView');
        if(awardview){
            awardview.hide();
        }
        // AcDoubleSeventhAwardScrollItem._lastReqIdx = this._curIdx;
        // AcDoubleSeventhAwardScrollItem._lastPos = this._collectBtn.localToGlobal(this._collectBtn.width/2 + 50,20);
        //NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE,{activeId:this.acTivityId,rechargeId:this._itemData + 1})
    }
    
    protected goRechargeHandler(event:egret.Event)
    {
        let view = this;
        if(!view.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
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
        return 5;
    }
    public dispose():void
    {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE),this.eventCollectHandlerCallBack,this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.refreshBtnStatus,this);
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