/**
 * author : qianjun
 * desc : 劳动活动 累计充值itemrender
 */
class AcAnnualPrayChargeItem  extends ScrollListItem
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
    private _rechargeItem : Config.AcCfg.AnnualPrayRechargeItemCfg = null;
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.AnnualPray2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcAnnualPray2020Vo{
        return <AcAnnualPray2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_ANNUALPRAY2020;
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
	protected initItem(index:number,data:Config.AcCfg.AnnualPrayRechargeItemCfg,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 530;
		view.height = 210 + 10;
		this._itemData = data.id;
        this._curIdx = this._itemData;
        this._rechargeItem = data;//cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height - 10;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("accarnivalview_tab_red");
        this._detailBgImg.y = 5;
        this._detailBgImg.x = 2;
        this.addChild(this._detailBgImg);

        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acMayDayTotal_recharge",[String(this._rechargeItem.needGem)])
        Txt1.x = this._detailBgImg.x+20;
        Txt1.y = this._detailBgImg.y + 13;
        this.addChild(Txt1);

        let str = this._rechargeItem.getReward;
        if(data.specialGift){
            str = `1036_1_${data.specialGift}_${this.getUiCode()}|${str}`;
        }
        let rewardArr =  GameData.formatRewardItem(str);
        let scroStartY = 70;
        let len = Math.min(5, rewardArr.length)
        let tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
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
        this._progress = ComponentManager.getProgressBar("progress5","progress3_bg",350);
        this._progress.x = 15;
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

        //根据是否达到金额设置title颜色
        if (chargeTotal >= this._rechargeItem.needGem)
        {
            this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_green");
        } else {
            this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_red");
        }
        
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
                collectBtn.y = this._progress.y + this._progress.height/2 -collectBtn.height/2 ;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }else
            {
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"acCarnivalToChargeBtnText",this.goRechargeHandler ,this);        
                chargeBtn.x = this._progress.x + this._progress.width + 10;
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
        this._collectFlag.x = this._progress.x + this._progress.width + 80;
        this._collectFlag.y = this._progress.y + this._progress.height/2-10 ;
        this.addChild(this._collectFlag);
    }

    protected eventCollectHandler(event:egret.TouchEvent) {
        if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this.vo.lastidx = this._itemData;
        this.vo.lastpos = this._collectBtn.localToGlobal(this._collectBtn.width/2 + 50,20);
        NetManager.request(NetRequestConst.REQUEST_ANNUALPRAY_RECHARGE,{
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