/**
  * 特别宝箱物品展示
  * author  jiangliuyang
  * date 2019/1/7
  * @class AcRechargeBoxSPPopupView
  */
class AcRechargeBoxSPPopupView extends PopupView{
	private _rechargeBtn:BaseButton = null;
	private _receiveBtn:BaseButton = null;
	private _allReceiveBM:BaseBitmap = null;
	private _aid:string = null;
	private _code:string = null;
	private _boxNeedGem:string = null;
	private _desc2:BaseTextField = null;

	private _scrollList:ScrollList = null;
	private _isSingle:boolean = true;
	private _boxCfg: any = null;

	public constructor() {
		super();
	}
	public initView()
	{

		this._aid = this.param.data.aid;
		this._code = this.param.data.code;
		this._boxNeedGem =  this.param.data.boxId;
		let cfg = <Config.AcCfg.RechargeBoxSPCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
		let boxCfg = cfg.getBoxData(String(this._boxNeedGem ));
		this._boxCfg = boxCfg;
		if(boxCfg.childList.length == 1){
			this._isSingle = true;
			App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.refreshSingleView,this);
			App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD,this.getRewardSingleHandler,this);
			//只有一个档位
			this.initSingleView(boxCfg);

		} else {
			this._isSingle = false;
			App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.refreshMultiView,this);
			App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD,this.getRewardMultiHandler,this);	
			//多个档位
			this.initMultiView(boxCfg);

		}
		
	}
	private initSingleView(boxCfg)
	{
		let bg = BaseBitmap.create("public_tc_bg01");
		bg.width = 520;
		bg.height = 200;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
		this.addChildToContainer(bg);

		let rewardbg = BaseBitmap.create("public_tc_bg03");
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
			let startWidth = (rewardbg.width - rewardDBWidth * rewardVoList.length - 10)  / (rewardVoList.length + 1);
			rewardDB.setPosition(5 + rewardbg.x + startWidth + 6 + (i * (rewardDBWidth + startWidth)),rewardbg.y + rewardbg.height / 2 - rewardDB.height / 2 + 10);
			// rewardDB.x = 0;
			// rewardDB.y = rewardbg.y + rewardbg.height / 2 - rewardDB.height / 2 + 10;
			this.addChildToContainer(rewardDB);

		}

		let desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc1"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN); //0x20eb37
		desc1.setPosition(rewardbg.x + rewardbg.width / 2 - desc1.width / 2, rewardbg.y + rewardbg.height + 10);
		this.addChildToContainer(desc1);
		if(this._code == "3"){
			desc1.visible = false;
		}

		let desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc2",["0"]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		desc2.setPosition(desc1.x + desc1.width / 2 - desc2.width / 2, desc1.y + desc1.height + 8);
		this.addChildToContainer(desc2);
		this._desc2 = desc2;
		
		this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acRechargeBoxSPPopupViewGoRecharge",this.rechargeClick,this);
		this._rechargeBtn.setPosition(desc2.x + desc2.width / 2 - this._rechargeBtn.width / 2,bg.y + bg.height + 20);
		this.addChildToContainer(this._rechargeBtn);

		this._receiveBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acRechargeBoxSPPopupViewReceive",this.receiveClick,this);
		this._receiveBtn.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._receiveBtn.width / 2,this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._receiveBtn.height / 2);
		this.addChildToContainer(this._receiveBtn);

        if(ResourceManager.hasRes("acrechargeboxspview_receive_"+this._code)){
		    this._allReceiveBM = BaseBitmap.create("acrechargeboxspview_receive_"+this._code);
        } else {
		    this._allReceiveBM = BaseBitmap.create("acrechargeboxspview_receive_1");
        }


		this._allReceiveBM.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._allReceiveBM.width / 2,this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._allReceiveBM.height / 2);
		this.addChildToContainer(this._allReceiveBM);

		this.refreshSingleView();

	}


	private initMultiView(boxCfg)
	{
		

		let boxCfgList = boxCfg.childList;

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 520, 705);
		this._scrollList = ComponentManager.getScrollList(AcRechargeBoxSPPopupScrollItem, boxCfgList, rect,{aid:this._aid,code:this._code});
		this._scrollList.x = this.viewBg.width/2 - this._scrollList.width/2;//this.container.width/2 - this._scrollList.width/2;
		this._scrollList.y = 10;
		this.addChildToContainer(this._scrollList);		

		
	}
	/**
	 * 刷新界面
	 */
	private refreshSingleView()
	{
		let vo = <AcRechargeBoxSPVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
		let cfg =  <Config.AcCfg.RechargeBoxSPCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
		let boxCfg =  cfg.getBoxData(this._boxNeedGem);
		let rechargeNum = vo.getBoxReChargeNum(this._boxNeedGem);
		let receiveNum = vo.getBoxReceiveNum(this._boxNeedGem);
		let numStr = Number(boxCfg.limit) - receiveNum;
		this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc2",[String(numStr)]);
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

	private refreshMultiView()
	{
		let boxCfgList = this._boxCfg.childList;
		this._scrollList.refreshData(boxCfgList,{aid:this._aid,code:this._code});
	}

	private getRewardSingleHandler(event:egret.Event)
	{
		let vo = <AcRechargeBoxSPVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code)
		let deltaT = vo.et - GameData.serverTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		let ret = event.data.data.ret;
		if(ret != 0){
			return;
		}
		let data = event.data.data.data;
		Api.servantVoApi.checkServantChangeRewards(data.cfrewards,data.rewards,data.otherrewards);
		// ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards,"otherRewards":data.otherrewards,"isPlayAni":true});
		this.refreshSingleView();
	}

	private getRewardMultiHandler(event:egret.Event)
	{
		let vo = <AcRechargeBoxSPVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code)
		let deltaT = vo.et - GameData.serverTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		let ret = event.data.data.ret;
		if(ret != 0){
			return;
		}
		let data = event.data.data.data;
		Api.servantVoApi.checkServantChangeRewards(data.cfrewards,data.rewards,data.otherrewards);
		// ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards,"otherRewards":data.otherrewards,"isPlayAni":true});
		this.refreshMultiView();
	}

	/**
	 * 前往充值按钮
	 */
	private rechargeClick()
	{
		if(""+this._code == "5"){
			App.CommonUtil.showTip(LanguageManager.getlocal("acRechargeBoxSP_rechargetip-code5"));
            return;
		}
		let vo = <AcRechargeBoxSPVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code)
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
		let vo = <AcRechargeBoxSPVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
		if(!vo || !vo.isStart){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
		}
		let cfg = <Config.AcCfg.RechargeBoxSPCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
		let boxCfg = cfg.getBoxData(String(this._boxNeedGem));
		let activeId = this._aid + "-" + this._code;
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD,{"activeId":activeId,"rechargeId":boxCfg.id});
	}
	protected getTitleStr():string
	{
		return "acRechargeBoxSPPopupViewTitle";
	}
	protected getShowHeight():number
	{
		if(this._isSingle){
			return 380;
		} else {
			return 800;
		}
		
	}
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD,this.getRewardSingleHandler,this);
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshSingleView,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD,this.getRewardMultiHandler,this);
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshMultiView,this);
		this._rechargeBtn = null;
		this._receiveBtn = null;
		this._allReceiveBM = null;
		this._aid = null;
		this._code = null;
		this._boxNeedGem = null;

		this._scrollList = null;
		super.dispose();
	}
	
}