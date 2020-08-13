/**
 * author : qianjun
 * desc : 累计充值itemrender
 */
class AcSingleDay2019ChargeIItem  extends ScrollListItem
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
    private _rechargeItem : Config.AcCfg.SingleDayNewRechargeItem = null;
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.SingleDay2019Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDay2019Vo{
        return <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_SINGLEDAY2019;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private _code : string = '';
	protected initItem(index:number,data:Config.AcCfg.SingleDayNewRechargeItem,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 627;
		view.height = 237;
		this._itemData = data.id;
        this._curIdx = this._itemData;
        this._rechargeItem = data;//cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        let code = view.getUiCode();
        let bg = BaseBitmap.create(`newsingledaytab2bottombg-${code}`);
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        let detailBgImg = BaseBitmap.create("acmidautumnview_titlebg");
        detailBgImg.width = 607;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailBgImg, bg, [0,5]);
        this.addChild(detailBgImg);

        let line = BaseBitmap.create(`public_line3`);
		view.addChild(line);

		let roundTxt = ComponentManager.getTextField(``, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        roundTxt.text = LanguageManager.getlocal("acMayDayTotal_recharge",[String(this._rechargeItem.needGem)])
        line.width = roundTxt.textWidth + 280;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, detailBgImg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
        view.addChild(roundTxt);

        let str = `1032_0_${this._rechargeItem.specialReward}_${this.getUiCode()}|` + this._rechargeItem.getReward;
        let rewardArr =  GameData.formatRewardItem(str);
		let row = Math.ceil(rewardArr.length / 5);//行数
        
        let rewardBg = BaseBitmap.create("public_9_managebg");
		rewardBg.width = 570;
		rewardBg.height = row * 108 * 0.85 + (row - 1) * 5 + 10;
		view.addChild(rewardBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardBg, detailBgImg, [0,detailBgImg.height+10]);

        
       
        let scroStartY = 60;
        let len = Math.min(5, rewardArr.length)
        let tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX +7);
            if (tmpX > bg.width-8)
            {
                tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width  * iconItem.scaleX +7);
            }
            
            this.addChild(iconItem);
        }
        scroStartY += 110;
        bg.height = scroStartY + 60;
        this.height = bg.height;

        //进度条
        this._progress = ComponentManager.getProgressBar("progress3","progress3_bg",435);
        this._progress.x = 25;
        // progress.y = 185;
        this._progress.y = rewardBg.y + rewardBg.height + 30;
        
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
        this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText",[String(chargeTotal),this._rechargeItem.needGem.toString()]));
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
        if (tmpVo.isGetRecharge(this._itemData))
        {
            this.createCollectFlag();
        }
        else
        {
            if (chargeTotal >= this._rechargeItem.needGem)
            {
                let collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"ac_recharge_Btntxt2",this.eventCollectHandler ,this);        
                collectBtn.x = this._progress.x + this._progress.width + 10;
                collectBtn.y = this._progress.y + this._progress.height -collectBtn.height;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }else
            {
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"acCarnivalToChargeBtnText",this.goRechargeHandler ,this);        
                chargeBtn.x = this._progress.x + this._progress.width + 10;
                chargeBtn.y =  this._progress.y + this._progress.height -chargeBtn.height;
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
        this._collectFlag.x = this._progress.x + this._progress.width + 80;
        this._collectFlag.y = this._progress.y + this._progress.height-30 ;
        this.addChild(this._collectFlag);
    }

    protected eventCollectHandler(event:egret.TouchEvent) {
        if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this.vo.lastidx = this._itemData;
        this.vo.lastpos = this._collectBtn.localToGlobal(this._collectBtn.width/2 + 50,20);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRECHARGE,{
            activeId:this.acTivityId,
            rkey:this._itemData
        })
    }
    
    protected goRechargeHandler(event:egret.Event){
        if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

    public getSpaceX():number
    {
        return 0;
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
        // this._lastReqIdx = null;
        super.dispose();
    }
}