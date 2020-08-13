/**
  * 黄忠活动排行榜
  * author 张朝阳
  * date 2018/7/22
  * @class AcMazeTaskScrollItem
  */
class AcMazeRechargeScrollItem extends ScrollListItem
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
    // private _id:number = null;
    /**
     * item的bg
     */
    private _itembg:BaseBitmap = null;

    private _receiveBM:BaseBitmap = null;

    private _receiveBtn:BaseButton = null;

    private _rechargeBtn:BaseButton = null;
	public constructor() 
	{
		super();
	}
	/**
	 * 服务器返回数据
	 */
	private get vo() : AcMazeVo{
        return <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any):void
	{
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.refreshView,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC,this.reviceClickHandler,this);

		this._rewardData = data;
        // this._id = index + 1;
		// this.width = 600;
		// this.height = 240;
		this._itembg = BaseBitmap.create("public_9_bg14");
        this._itembg.width = 600;
        this._itembg.height = 240;
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
            rewardItem.setScale(0.95);
            rewardItem.setPosition(detailTF.x + i % 5 * rewardItem.width,detailBg.y + detailBg.height + Math.floor(i / 5) * (rewardItem.height) + 10);
            this.addChild(rewardItem);
            //记录item的高度
            itemHeigth = rewardItem.height;
        }
        
        this._itembg.height += Math.floor(rewardArr.length / 5) * itemHeigth + 20;

        this._progress = ComponentManager.getProgressBar("progress5","progress3_bg",386);
        this._progress.setPosition(detailTF.x,this._itembg.y + this._itembg.height - this._progress.height - 22);
        this.addChild(this._progress);

        this._receiveBM = BaseBitmap.create("collectflag");
            
        this._receiveBM.anchorOffsetX = this._receiveBM.width / 2;
        this._receiveBM.anchorOffsetY = this._receiveBM.height / 2;
        let numScale:number = 0.6;
        this._receiveBM.setScale(numScale);
        this._receiveBM.setPosition(this._itembg.x + this._itembg.width - this._receiveBM.width / 2 * numScale - 15,this._itembg.y + this._itembg.height - this._receiveBM.height / 2 * numScale - 10)
        this.addChild(this._receiveBM);

        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"acCarnivalToChargeBtnText",this.rechargeHandler ,this);
        this._rechargeBtn.setPosition(this._itembg.x + this._itembg.width - this._rechargeBtn.width - 15,this._itembg.y + this._itembg.height - this._rechargeBtn.height - 10);
        this.addChild(this._rechargeBtn);

        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"ac_recharge_Btntxt2",this.receiveHandler ,this);
        this._receiveBtn.setPosition(this._itembg.x + this._itembg.width - this._receiveBtn.width - 15,this._itembg.y + this._itembg.height - this._receiveBtn.height - 10);
        this.addChild(this._receiveBtn);

        this.refreshView();

	}

	/**
     * 更新UI
     */
    private refreshView()
    {
        this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText",[String(this.vo.getChargeNum()),this._rewardData.needGem]))
        let percent:number = this.vo.getChargeNum() / this._rewardData.needGem;
        this._progress.setPercentage(percent);
        if(this.vo.isReceive(this._rewardData.id))
        {
            this._receiveBM.setVisible(true);
            this._rechargeBtn.setVisible(false);
            this._receiveBtn.setVisible(false);
        }
        else
        {

            if(this.vo.getChargeNum() < this._rewardData.needGem)
            {
                this._receiveBM.setVisible(false);
                this._rechargeBtn.setVisible(true);
                this._receiveBtn.setVisible(false);
            }
            else
            {
                this._receiveBM.setVisible(false);
                this._rechargeBtn.setVisible(false);
                this._receiveBtn.setVisible(true);
            }
        }
              

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
        AcMazeView.TASKID = this._rewardData.id;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC,{"activeId":AcMazeView.ACTIVEID,"rechargeId":this._rewardData.id});
    }
      /**
     * 更新充值奖励进度
     */
    private reviceClickHandler(event:egret.Event)
    {
        if( AcMazeView.TASKID != this._rewardData.id)
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
		this.refreshView();

    }

	public getSpaceY():number
	{
		return 5;
	}
	
	public dispose():void
	{
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshView,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC,this.reviceClickHandler,this);
        this._progress = null;
        this._rewardData = null;
        // this._id = null;
        this._itembg = null;
        this._receiveBM = null;
        this._receiveBtn = null;
        this._rechargeBtn = null;
		super.dispose();
	}
}