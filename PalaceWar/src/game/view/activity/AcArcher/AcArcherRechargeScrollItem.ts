/**
  * 黄忠活动充值奖励item
  * author 张朝阳
  * date 2018/6/21
  * @class AcArcherRechargeScrollItem
  */
class AcArcherRechargeScrollItem  extends ScrollListItem
{
    /**
     * 充值进度条
     */
    private _progress:ProgressBar = null;
    /**
     * 充值奖励数据
     */
    private _rewardData:any = null;
    /**
     * 当前的index
     */
    private _id:number = null;
    /**
     * item的bg
     */
    private _itembg:BaseBitmap = null;
    /**
     * 是否是这个档位
     */
    private _isNowRecharge = false;

    private _code:string = null;
    public constructor()
    {
        super();
    }
    /**
	 * 服务器返回数据
	 */
    private get vo() : AcArcherVo{
        return <AcArcherVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACARCHER, this._code);
    }
    /**
     * 初始化item
     */
    protected initItem(index:number,data:any,itemParam:any)
    {
        this._code = itemParam.code;
        this._rewardData = data;
        this._id = index + 1;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMB),this.rechargeRewardHandler,this);
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.updateView,this);

        this._itembg = BaseBitmap.create("public_9_bg14");
        this._itembg.width = 498;
        this._itembg.height = 216;
        this.addChild(this._itembg);

        let detailBg:BaseBitmap = BaseBitmap.create("accarnivalview_tab_red");
        detailBg.setPosition(this._itembg.x,this._itembg.y + 5);
        this.addChild(detailBg);

        let detailTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acMayDayTotal_recharge",[this._rewardData.needGem]),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        detailTF.setPosition(detailBg.x + 10,detailBg.y + detailBg.height / 2 - detailTF.height / 2);
        this.addChild(detailTF);

        let rewardArr:RewardItemVo[] =  GameData.formatRewardItem(this._rewardData.getReward);
        let itemHeigth:number;
        for(var i = 0;i < rewardArr.length;i++)
        {
            let rewardItem: BaseDisplayObjectContainer = GameData.getItemIcon(rewardArr[i],true,true);
            rewardItem.setScale(0.83);
            rewardItem.setPosition(detailTF.x + i % 5 * (rewardItem.width - 12),detailBg.y + detailBg.height + Math.floor(i / 5) * (rewardItem.height - 10) + 10);
            this.addChild(rewardItem);
            //记录item的高度
            itemHeigth = rewardItem.height;
        }
        
        this._itembg.height += Math.floor(rewardArr.length / 5) * itemHeigth + 20;

        this._progress = ComponentManager.getProgressBar("progress5","progress3_bg",320);
        this._progress.setPosition(detailTF.x,this._itembg.y + this._itembg.height - this._progress.height - 22);
        this.addChild(this._progress);
        this.updateView();

    }
    /**
     * 更新UI
     */
    private updateView()
    {
        this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText",[String(this.vo.getChargeNum()),this._rewardData.needGem]))
        let percent:number = this.vo.getChargeNum() / this._rewardData.needGem;
        this._progress.setPercentage(percent);
        
        if(this.vo.isReceive(this._id))
        {
                        
            let receiveBM:BaseBitmap;
            receiveBM = this.getChildByName("receiveBM") as BaseBitmap;
            if(receiveBM == null)
            {
                receiveBM = BaseBitmap.create("collectflag")
            }
            receiveBM.anchorOffsetX = receiveBM.width / 2;
            receiveBM.anchorOffsetY = receiveBM.height / 2;
            let numScale:number = 0.6;
            receiveBM.setScale(numScale);
            receiveBM.setPosition(this._itembg.x + this._itembg.width - receiveBM.width / 2 * numScale - 15,this._itembg.y + this._itembg.height - receiveBM.height / 2 * numScale - 10)
            this.addChild(receiveBM);
            receiveBM.name = "receiveBM";
            if(this.getChildByName("rechargeBtn") != null)
            {
                this.removeChild(this.getChildByName("rechargeBtn"));
            }
             if(this.getChildByName("receiveBtn") != null)
            {
                this.removeChild(this.getChildByName("receiveBtn"));
                receiveBM.setScale(1.2);
                egret.Tween.get(receiveBM).to({scaleX:numScale,scaleY:numScale},300);
            }
        }
        else
        {

            if(this.vo.getChargeNum() < this._rewardData.needGem)
            {
                let rechargeBtn:BaseButton;
                rechargeBtn = this.getChildByName("rechargeBtn") as BaseButton;
                if(rechargeBtn == null)
                {
                    rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"acCarnivalToChargeBtnText",this.rechargeHandler ,this);
                }
                rechargeBtn.setPosition(this._itembg.x + this._itembg.width - rechargeBtn.width - 15,this._itembg.y + this._itembg.height - rechargeBtn.height - 10);
                rechargeBtn.name = "rechargeBtn";
                this.addChild(rechargeBtn);
                if(this.getChildByName("receiveBM") != null)
                {
                    this.removeChild(this.getChildByName("receiveBM"));
                }
                if(this.getChildByName("receiveBtn") != null)
                {
                    this.removeChild(this.getChildByName("receiveBtn"));
                }
            }
            else
            {
                let receiveBtn:BaseButton;
                receiveBtn = this.getChildByName("receiveBtn") as BaseButton;
                if(receiveBtn == null)
                {
                    receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"ac_recharge_Btntxt2",this.receiveHandler ,this);
                }
                receiveBtn.setPosition(this._itembg.x + this._itembg.width - receiveBtn.width - 15,this._itembg.y + this._itembg.height - receiveBtn.height - 10);
                receiveBtn.name = "receiveBtn";
                this.addChild(receiveBtn);
                if(this.getChildByName("receiveBM") != null)
                {
                    this.removeChild(this.getChildByName("receiveBM"));
                }
                if(this.getChildByName("rechargeBtn") != null)
                {
                    this.removeChild(this.getChildByName("rechargeBtn"));
                }
            }
        }
              

    }
    /**
     * 更新充值奖励进度
     */
    private rechargeRewardHandler(event:egret.Event)
    {
        if(!this._isNowRecharge)
        {
            return;
        }

        let data = event.data.data.data;
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
		let rewards = data.rewards;
		let rList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rList);
        this._isNowRecharge = false;
		this.updateView();

    }
    /**
     * 打开充值界面
     */
    private rechargeHandler(event:egret.Event)
    {
        let deltaT = this.vo.et - GameData.serverTime - 86400 * 1;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }
    /**
     * 领取按钮
     */
    private receiveHandler()
    {
        this._isNowRecharge = true;
        let activeId = AcConst.AID_ACARCHER + "-" + this._code
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMB,{activeId : activeId, rechargeId : this._id});
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
        this._progress = null;
        this._rewardData = null;
        this._id = null;
        this._itembg = null;
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.updateView,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMB),this.rechargeRewardHandler,this);
        super.dispose();
    }
}