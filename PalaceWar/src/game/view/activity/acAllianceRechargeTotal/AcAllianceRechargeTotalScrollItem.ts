/**
 * author : qianjun
 * date : 2018.4.14
 * desc :帮会充值 累计充值itemrender
 */
class AcAllianceRechargeTotalScrollItem  extends ScrollListItem
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
    private _code : string = '';
    private _bg:BaseBitmap =null;
    
    public constructor()
    {
        super();
    }

    private get vo() : AcAllianceRechargeTotalVo{
        return <AcAllianceRechargeTotalVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_AllIANCERECHARGETOTAL, this._code);
    }

    private get acTivityId() : string{
        return `${AcConst.AID_AllIANCERECHARGETOTAL}-${this._code}`;
	}
    
    protected initItem(index:number,data:any,itemParam?:any)
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH2,this.refreshBtnStatus,this);
        this._itemData = data;
        this._code = itemParam;
        this._curIdx = index;
        // let cfgObj = this.cfg;
	  
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 608;
        bg.height = 215;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("acmidautumnview_titlebg");
        this._detailBgImg.y = 5;
        this._detailBgImg.x = 2;
        this.addChild(this._detailBgImg);

        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acAlliaceTotalrecharge-"+this._code,[String(this._itemData.total)])
        Txt1.x = this._detailBgImg.width/2-Txt1.width/2;
        Txt1.y = 11;
        this.addChild(Txt1);

        //创建奖励列表
        let rewardArr =  GameData.formatRewardItem(this._itemData.getReward);
        let scroStartY = 95;
        let tmpX = 14;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.x = tmpX;
            iconItem.setScale(0.77);
            iconItem.y = scroStartY;
            tmpX += (iconItem.width+7-20);
            if (tmpX > bg.width-198)
            {
                tmpX = 14;
                scroStartY += iconItem.height-5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width+7-20);
            }

            this.addChild(iconItem);
        }
        scroStartY += 130; 

        bg.height = scroStartY;
        this._bg =bg;
        //进度条
        this._progress = ComponentManager.getProgressBar("progress7","progress7_bg",568);
        this._progress.x = 20; 
        this._progress.y = 45//scroStartY-180;
        
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
        this._progress.setText(LanguageManager.getlocal("acAlliance_progress",[String(chargeTotal),this._itemData.total]));
        this._progress.setPercentage(chargeTotal / this._itemData.total);
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
        if (tmpVo.isGetRecharge(this._curIdx + 1))
        {
            this.createCollectFlag();
        }
        else
        {
            if (chargeTotal >= this._itemData.total&&this.vo.getRechargeFlag()==1)
            {
                let collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"ac_recharge_Btntxt2",this.eventCollectHandler ,this);        
                collectBtn.setScale(0.9);
                collectBtn.x = this._progress.x + this._progress.width-collectBtn.width+20; 
                collectBtn.y =  this._bg.height/2-collectBtn.height/2+20;//this._progress.y+70;;//this._progress.y+50; //+ this._progress.height/2 -collectBtn.height/2 ;
                collectBtn.name = "collectBtn";  
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }else
            {
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"acCarnivalToChargeBtnText",this.goRechargeHandler ,this);        
                chargeBtn.setScale(0.9);
                chargeBtn.x = this._progress.x + this._progress.width-chargeBtn.width+20; 
                chargeBtn.y =  this._bg.height/2-chargeBtn.height/2+20;//this._progress.y+70;
                chargeBtn.name = "costBtn";
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
        this._collectFlag.x = 520;//this._progress.x + this._progress.width + 100;
        this._collectFlag.y = 138;//this._progress.y + this._progress.height/2-10 ;
        this.addChild(this._collectFlag);
    }

    public refreshView(rewards){
        this.refreshUI();
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = this._progress.localToGlobal(this._progress.x + this._progress.width - 100,20);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    }

    protected eventCollectHandler(event:egret.TouchEvent)
    {
        if(GameData.serverTime>this.vo.et){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        this.vo.index = this._curIdx;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGETOTALREWARD,{activeId:this.acTivityId,rkey:this._curIdx + 1})
    }
    
    protected goRechargeHandler(event:egret.Event)
    {
        if(this.vo.isActivityPeriod()==false){
            App.CommonUtil.showTip(LanguageManager.getlocal("acAlliancollect_error"));
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
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH2,this.refreshBtnStatus,this);
        this._itemData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._bg =null;
        this._curIdx = 0; 
        super.dispose();
    }
}