/**
  * 钱庄 
  * @class AcBankBoxView2
  */
class BankBoxPopupView extends PopupView{
	private _rechargeBtn:BaseButton = null;
	private _receiveBtn:BaseButton = null;
	private _allReceiveBM:BaseBitmap = null;
	private _aid:string = null;
	private _code:string = null;
	private _boxNeedGem:string = null;
	private _desc2:BaseTextField = null;
	public constructor() {
		super();
	}
	public initView()
	{
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.refreshView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWBANKBOXREWARD,this.getRewardHandler,this);
		this._aid =  this.param.data.aid;
		this._code = this.param.data.code;
		this._boxNeedGem =  this.param.data.boxId;
		let cfg = <Config.AcCfg.BankBoxCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
		let boxCfg = cfg.getBoxData(String(this._boxNeedGem )); 

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 250;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
		this.addChildToContainer(bg);

		let rewardbg = BaseBitmap.create("public_9_bg44");
		rewardbg.width = 502;
		rewardbg.height = 110;
		rewardbg.setPosition(bg.x + bg.width / 2 - rewardbg.width / 2, bg.y + 10);
		this.addChildToContainer(rewardbg);

		let rewardVoList = GameData.formatRewardItem(boxCfg.getReward);
		
		for(let i = 0;i<rewardVoList.length;i++)
		{

			let rewardDB = GameData.getItemIcon(rewardVoList[i],true,true);
			rewardDB.setScale(0.8);
			let rewardDBWidth  = rewardDB.width - 7;
			let startWidth = (rewardbg.width - rewardDBWidth * rewardVoList.length)  / (rewardVoList.length + 1);
			rewardDB.setPosition(rewardbg.x + startWidth + 6 + (i * (rewardDBWidth + startWidth)),rewardbg.y + rewardbg.height / 2 - rewardDB.height / 2 + 10);
			this.addChildToContainer(rewardDB);

		}

		let desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxPopupViewDesc1"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
		desc1.setPosition(rewardbg.x + rewardbg.width / 2 - desc1.width / 2, rewardbg.y + rewardbg.height + 10);
		this.addChildToContainer(desc1);

		let desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxPopupViewDesc2",["0"]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		desc2.setPosition(desc1.x + desc1.width / 2 - desc2.width / 2, desc1.y + desc1.height + 5);
		this.addChildToContainer(desc2);
		this._desc2 = desc2;
		
		this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE,"acRechargeBoxPopupViewGoRecharge",this.rechargeClick,this);
		this._rechargeBtn.setPosition(desc2.x + desc2.width / 2 - this._rechargeBtn.width / 2,desc2.y + desc2.height + 5);
		this.addChildToContainer(this._rechargeBtn);

		this._receiveBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acRechargeBoxPopupViewReceive",this.receiveClick,this);
		this._receiveBtn.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._receiveBtn.width / 2,this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._receiveBtn.height / 2);
		this.addChildToContainer(this._receiveBtn);

		this._allReceiveBM = BaseBitmap.create("acrechargeboxview_receive");
		this._allReceiveBM.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._allReceiveBM.width / 2,this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._allReceiveBM.height / 2);
		this.addChildToContainer(this._allReceiveBM);

		this.refreshView();
	}
	/**
	 * 刷新界面
	 */
	private refreshView()
	{
		let vo = <AcBankBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
		let cfg =  <Config.AcCfg.BankBoxCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
		let boxCfg =  cfg.getBoxData(this._boxNeedGem);
		let rechargeNum = vo.getBoxReChargeNum(this._boxNeedGem);
		let receiveNum = vo.getBoxReceiveNum(this._boxNeedGem);
		let numStr = Number(boxCfg.limit) - receiveNum;
		this._desc2.text = LanguageManager.getlocal("acRechargeBoxPopupViewDesc2",[String(numStr)]);
		if(Number(boxCfg.limit) <= receiveNum)
		{
			this._rechargeBtn.setVisible(false);
			this._receiveBtn.setVisible(false);
			this._allReceiveBM.setVisible(true);
		}
		else
		{
			if(rechargeNum > receiveNum )
			{
				this._rechargeBtn.setVisible(false);
				this._receiveBtn.setVisible(true);
				this._allReceiveBM.setVisible(false);
			}
			else
			{
				this._rechargeBtn.setVisible(true);
				this._receiveBtn.setVisible(false);
				this._allReceiveBM.setVisible(false);
			}
		}
		
	}
	private getRewardHandler(event:egret.Event)
	{
		let vo = <AcBankBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code)
		let deltaT = vo.et - GameData.serverTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		let data = event.data.data.data;
		ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards,"otherRewards":data.otherrewards,"isPlayAni":true});
		this.refreshView();
	}
	/**
	 * 前往充值按钮
	 */
	private rechargeClick()
	{
		let vo = <AcBankBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code)
		let deltaT = vo.et - GameData.serverTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
	}
	/**
	 * 领取按钮
	 */
	private receiveClick()
	{
		let cfg = <Config.AcCfg.BankBoxCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
		let boxCfg = cfg.getBoxData(String(this._boxNeedGem));
		let activeId = this._aid + "-" + this._code;
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETTWBANKBOXREWARD,{"activeId":activeId,"rechargeId":boxCfg.id});
	}
	protected getTitleStr():string
	{
		return "acRechargeBoxPopupViewTitle";
	}
	protected getShowHeight():number
	{
		return 340;
	}
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWBANKBOXREWARD,this.getRewardHandler,this);
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshView,this);
		this._rechargeBtn = null;
		this._receiveBtn = null;
		this._allReceiveBM = null;
		this._aid = null;
		this._code = null;
		this._boxNeedGem = null;
		super.dispose();
	}
	
}