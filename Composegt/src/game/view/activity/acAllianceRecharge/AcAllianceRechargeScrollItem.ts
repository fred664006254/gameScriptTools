/**
 * author : jiangliuyang
 * date : 2019.2.11
 * desc :帮会充值 累计充值item
 */
class AcAllianceRechargeScrollItem  extends ScrollListItem
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
    private _aid:string  = "";
    private _code : string = '';
    private _bg:BaseBitmap =null;

   
    
    private static _lastReqIdx:number = null;
    private static _lastPos: any = null;
    private _unrechargeMark: BaseTextField = null;
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.AllianceRechargeCfg{
        
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
    }

    private get vo() : AcAllianceRechargeVo{
        return <AcAllianceRechargeVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
    }

    private get acTivityId() : string{
        return `${this._aid}-${this._code}`;
	}
    
    protected initItem(index:number,data:any,itemParam?:any)
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCERECHARGE_REFRESHVO,this.refreshBtnStatus,this);
        this._itemData = data;
        this._code = itemParam.code;
        this._aid = itemParam.aid
        this._curIdx = index;

        //背景图片
        let bg = BaseBitmap.create("public_listbg");
        bg.width = 608;
        bg.height = 215;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("acalliancerecharge_scrolltitle");
        this._detailBgImg.y = 5;
        this._detailBgImg.x = 2;
        this.addChild(this._detailBgImg);

        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        if(this._itemData.count > 0){
            Txt1.text = LanguageManager.getlocal("acAllianceRechargeCount",[String(this._itemData.count)]);
        } else {
            Txt1.text = LanguageManager.getlocal("acAllianceRechargeTotal",[String(this._itemData.total)]);
        }
        
        Txt1.x = this._detailBgImg.x + 10;
        Txt1.y = 11;
        this.addChild(Txt1);
        this._detailBgImg.width = Txt1.width + 10 + 40;


        //创建奖励列表
        let rewardArr =  GameData.formatRewardItem(this._itemData.getReward);
        // let scroStartY = 95;
        // let tmpX = 14;
        let startX = 14;
        let startY = 60;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            // iconItem.x = tmpX;
            iconItem.setScale(0.77);

            iconItem.x = startX + (index % 5) * (iconItem.width * iconItem.scaleX + 6);
            iconItem.y = startY + Math.floor(index / 5) * (iconItem.height * iconItem.scaleY + 6);

            this.addChild(iconItem);
        }
        


        //进度条
        this._progress = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",568);
        this._progress.x = 20; 
        this._progress.y = startY + Math.floor((rewardArr.length -1) / 5) * (106 * 0.77 + 6) + 106 * 0.77 + 20;
        
        this.addChild(this._progress);
        bg.height = this._progress.y + this._progress.height + 30;
        this._bg =bg;
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
        let chargeCount : number = tmpVo.getRtotal();
        let chargeTotal : number = tmpVo.getRenum();
        if(this._itemData.count > 0){
            
            this._progress.setText(LanguageManager.getlocal("acAllianceRechargeProgress",[String(chargeCount),this._itemData.count]));
            this._progress.setPercentage(chargeCount / this._itemData.count);
        } else {
            
            this._progress.setText(LanguageManager.getlocal("acAllianceRechargeProgress",[String(chargeTotal),this._itemData.total]));
            this._progress.setPercentage(chargeTotal / this._itemData.total);
        }
        
        if (this._collectFlag)
            this.removeChild(this._collectFlag);
            this._collectFlag = null;
        if (this._collectBtn)
            this.removeChild(this._collectBtn);
            this._collectBtn = null;
        if (this._chargeBtn)
            this.removeChild(this._chargeBtn);
            this._chargeBtn = null;
        if(this._unrechargeMark){
            this._unrechargeMark.visible = false;
        }

        
        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(this._itemData.id) &&  AcAllianceRechargeScrollItem._lastReqIdx != this._curIdx)
        {
            this.createCollectFlag();
        }
        else
        {
            if (((this._itemData.count > 0 && chargeCount >= this._itemData.count) || (this._itemData.total > 0 && chargeTotal >= this._itemData.total )) && this.vo.getRechargeFlag()==1)
            {
                let collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"ac_recharge_Btntxt2",this.eventCollectHandler ,this);        
               
                collectBtn.x = 465; 
                collectBtn.y = 90;
                collectBtn.name = "collectBtn";  
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }  else  {
                // _unrechargeMark
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acCarnivalToChargeBtnText",this.goRechargeHandler ,this);        
              
                chargeBtn.x = 465; 
                chargeBtn.y = 90;
                chargeBtn.name = "costBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;

                if (((this._itemData.count > 0 && chargeCount >= this._itemData.count) || (this._itemData.total > 0 && chargeTotal >= this._itemData.total )) && this.vo.getRechargeFlag()!=1)
                {
                    this._unrechargeMark = ComponentManager.getTextField(LanguageManager.getlocal("acAllianceRechargeBuyDes1"),18,0xff0000);
                    this._unrechargeMark.x = chargeBtn.x + chargeBtn.width/2 - this._unrechargeMark.width/2;
                    this._unrechargeMark.y = chargeBtn.y - 5 - this._unrechargeMark.height;
                    this.addChild(this._unrechargeMark);
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
        egret.Tween.get(this._collectFlag).to({scaleX:1,scaleY:1},300);
    }

    protected createCollectFlag()
    {
        if(!this._collectFlag){
            this._collectFlag = BaseBitmap.create("collectflag")
            this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
            // this._collectFlag.setScale(0.7);
            this._collectFlag.x = 520;//this._progress.x + this._progress.width + 100;
            this._collectFlag.y = 100;//this._progress.y + this._progress.height/2-10 ;
            this.addChild(this._collectFlag);
        }

    }

    protected eventCollectHandlerCallBack(event:egret.Event)
    {
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if(AcAllianceRechargeScrollItem._lastReqIdx != this._curIdx)
        {
            return;
        }
        if(rData.getFailFlag==1)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acAllianceRechargeErr"));
            return;
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGEREWARD),this.eventCollectHandlerCallBack,this);
        AcAllianceRechargeScrollItem._lastReqIdx = null;
        this.refreshUI();
        let rewards = rData.rewards;
        let rewardList =  GameData.formatRewardItem(rewards);
        // let pos = AcAllianceRechargeScrollItem._lastPos;
        App.CommonUtil.playRewardFlyAction(rewardList);
    }

    protected eventCollectHandler(event:egret.TouchEvent)
    {
        if(GameData.serverTime>this.vo.et){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        AcAllianceRechargeScrollItem._lastReqIdx = this._curIdx;
        AcAllianceRechargeScrollItem._lastPos = this._progress.localToGlobal(this._progress.width + 50,20);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGEREWARD),this.eventCollectHandlerCallBack,this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGEREWARD,{activeId:this.acTivityId,rkey:this._itemData.id})
    }
    
    protected goRechargeHandler(event:egret.Event)
    {
        if(this.vo.isActivityPeriod()==false){
            App.CommonUtil.showTip(LanguageManager.getlocal("acAllianceRechargeError"));
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
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGEREWARD),this.eventCollectHandlerCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCERECHARGE_REFRESHVO,this.refreshBtnStatus,this);
        this._itemData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._bg =null;
        this._curIdx = 0; 



        this._detailBgImg = null;

        this._aid = "";
        this._code = '';
   

   
    
    // private static _lastReqIdx:number = null;
    // private static _lastPos: any = null;
        this._unrechargeMark = null;
        super.dispose();
    }
}