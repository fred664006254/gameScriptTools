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
    private buildTxt:BaseTextField =null;

    
    private static _lastReqIdx:number = null;
    private static _lastPos: any = null;
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.DoubleSeventhCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcDoubleSeventhView.AID, AcDoubleSeventhView.CODE);
    }

    private get vo() : AcDoubleSeventhVo{
        return <AcDoubleSeventhVo>Api.acVoApi.getActivityVoByAidAndCode(AcDoubleSeventhView.AID, AcDoubleSeventhView.CODE);
    }

    private get acTivityId() : string{
        return `${AcDoubleSeventhView.AID}-${AcDoubleSeventhView.CODE}`;
    }
    
    protected initItem(index:number,data:any)
    {
        let view = this;
		view.width = 535;
		view.height = 342 + 7;
		this._itemData = data.key - 1;
        this._curIdx = this._itemData;
		let objList = view.vo.getArr(`recharge`);
        this._rechargeItem = view.cfg.recharge[this._itemData + 1];//cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_tc_bg01");
        bg.x=10;
        bg.y =bg.y+42;
        bg.width = 535;
        bg.height = 342;
        this.addChild(bg);

        let bg2 = BaseBitmap.create("public_tc_bg03");
        bg2.width = view.width-20;
        bg2.height = 330;
        this.addChild(bg2); 
        bg2.x=bg.x+10;
        bg2.y=bg.y+10;
        

        let key = data.key;
        let topbg = BaseBitmap.create("public_up3");
        topbg.width =view.width-30;;
        topbg.height =31;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg2, [0,5]);
        view.addChild(topbg);

        var nameStr = "acDoubleSeventhViewBuild";
        if(AcDoubleSeventhView.CODE=="2")
        {
             var nameStr = "architectureName";
        } 
        else if(AcDoubleSeventhView.CODE =="3")
        {
            var nameStr = "acDoubleSeventhBuildName-";
        } 
        
        let buildTxt = null;
        if(AcDoubleSeventhView.CODE =="3"){
            buildTxt = ComponentManager.getTextField(LanguageManager.getlocal(nameStr+key+"_3"), 22, TextFieldConst.COLOR_BROWN);
        } else {
            buildTxt = ComponentManager.getTextField(LanguageManager.getlocal(nameStr+key), 22, TextFieldConst.COLOR_BROWN);
        }

        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, buildTxt, topbg,[10,-50]);
        view.addChild(buildTxt);
        this.buildTxt= buildTxt;

        let leftLine = BaseBitmap.create("public_v_huawen01");
		leftLine.x = this.buildTxt.x - 20 - leftLine.width;
		leftLine.y = this.buildTxt.y + this.buildTxt.height/2 - leftLine.height/2 ;
        this.addChild(leftLine);

		let rightLine = BaseBitmap.create("public_v_huawen01");
		rightLine.scaleX = -1;
		rightLine.x = this.buildTxt.x + this.buildTxt.width + 20 + rightLine.width;
		rightLine.y = this.buildTxt.y + this.buildTxt.height/2 - rightLine.height/2 ;
        this.addChild(rightLine);

        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acDoubleSeventhChargeItem`, [view.cfg.recharge[key].needGem.toString(), buildTxt.text]), 18, TextFieldConst.COLOR_BROWN);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, topbg, [0,topbg.height-35]);
        view.addChild(descTxt);
 
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
        bg2.height = scroStartY + 10;
        this.height = bg.height+27+20; 

        //进度条
        this._progress = ComponentManager.getProgressBar("progress_type1_yellow","progress_type1_bg",324);
        this.setLayoutPosition(LayoutConst.leftbottom, this._progress, bg, [25,30]);
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
                let collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"ac_recharge_Btntxt3",this.eventCollectHandler ,this);        
                collectBtn.x = this._progress.x + this._progress.width + 20;
                collectBtn.y = this._progress.y + this._progress.height/2 -collectBtn.height/2 ;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }else
            {
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acCarnivalToChargeBtnText",this.goRechargeHandler ,this);        
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
        this._itemData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._curIdx = 0;
        this._rechargeItem = null;
        this.buildTxt = null;
        super.dispose();
    }
}