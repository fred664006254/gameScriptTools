/**
 * 狂欢节活动每日消费的列表item
 * author jiangliuyang
 * date 2018/4/11
 * @class AcCarnivalChargeScrollItem
 */
class AcCarnivalCostScrollItem  extends ScrollListItem
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

    protected initItem(index:number,data:any)
    {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.eventCollectHandlerCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_COST,this.refreshBtnStatus,this);

        this._itemData = data;

        this._curIdx = index;
        let totalVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCost");
        let cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("carnivalCost",totalVo.code);
        this._rechargeItem = cfgObj.getRechargeItemById(this._itemData);


        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 598;
        bg.height = 246;
        this.addChild(bg);


        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("accarnivalview_tab_red");
        this._detailBgImg.y = 5;
        this._detailBgImg.x = 2;
        this.addChild(this._detailBgImg);


        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acCarnivalCostItemTitle",[String(this._rechargeItem.needGem)])
        Txt1.x = this._detailBgImg.x+20;
        Txt1.y = this._detailBgImg.y + 10;
        this.addChild(Txt1);

        //创建奖励列表
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
        this.height = bg.height;

        //进度条
        this._progress = ComponentManager.getProgressBar("progress5","progress3_bg",386);
        this._progress.x = 20;
        // progress.y = 185;
        this._progress.y = scroStartY;
        
        this.addChild(this._progress);
        this.refreshBtnStatus();

    }

    //刷新按钮状态
    protected refreshBtnStatus()
    {
        let tmpVo = <AcCarnivalCostVo>Api.acVoApi.getActivityVoByAidAndCode("carnivalCost");
        // if(!tmpVo || !tmpVo.v)
        // {
        //     return;
        // }
        this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText",[String(tmpVo.v),this._rechargeItem.needGem]));
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

        //根据是否达到金额设置title颜色
        if (tmpVo.v >= this._rechargeItem.needGem)
        {
            this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_green");
        } else {
            this._detailBgImg.texture = ResourceManager.getRes("accarnivalview_tab_red");
        }
        
        //检查是否创建已经领取标签
        if (tmpVo.flags[this._itemData])// && AcCarnivalCostScrollItem._lastReqIdx != this._curIdx)
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
                
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"acCarnivalToCostBtnText",this.goRechargeHandler ,this);        
                chargeBtn.x = this._progress.x + this._progress.width + 20;
                chargeBtn.y =  this._progress.y + this._progress.height/2 -chargeBtn.height/2 ;
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
        /**
         * 展示已领取
         */
        if(!this._collectFlag)
        {
            this.createCollectFlag();
        }   
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
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.eventCollectHandlerCallBack,this);
        let rData = event.data.data.data;
        let ret = event.data.data.ret;
        if(ret != 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if (AcCarnivalCostScrollItem._lastReqIdx != this._curIdx)
        {
            return;
        }
        AcCarnivalCostScrollItem._lastReqIdx = null;
        this.refreshUI();
        let  rewards = rData.rewards
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = AcCarnivalCostScrollItem._lastPos;
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
        

    }

    protected eventCollectHandler(event:egret.TouchEvent)
    {
        AcCarnivalCostScrollItem._lastReqIdx = this._curIdx;
        AcCarnivalCostScrollItem._lastPos = this._progress.localToGlobal(this._progress.width + 50,20);
        let totalVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCost");
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.eventCollectHandlerCallBack,this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST,{activeId:"carnivalCost-"+totalVo.code,rkey:this._itemData})
    }
    
    protected goRechargeHandler(event:egret.Event)
    {
        ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
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
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.eventCollectHandlerCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_COST,this.refreshBtnStatus,this);
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
