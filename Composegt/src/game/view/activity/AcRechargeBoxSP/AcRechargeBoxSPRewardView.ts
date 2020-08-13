/**
  * 特别宝箱物品展示
  * author  jiangliuyang
  * date 2019/1/7
  * @class AcRechargeBoxSPPopupView
  */
class AcRechargeBoxSPRewardView extends CommonView{
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
	
	
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.refreshMultiView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD,this.getRewardMultiHandler,this);	
		//多个档位
		this.initMultiView(boxCfg);


		// if (ResourceManager.hasRes("acrechargeboxspview_title_txt"+this._code))
		// {
		let titletxt = BaseBitmap.create("acrechargeboxspview_rewardtitle");
		titletxt.x = GameConfig.stageWidth/2 - titletxt.width/2;
		titletxt.y = 5;
		this.addChild(titletxt);
		// }

		let border = BaseBitmap.create("public_9v_bg03");
		border.width = 640;
		border.height = GameConfig.stageHeigth - 69;
		border.y = 69;
		this.addChild(border);
	}



	private initMultiView(boxCfg)
	{
		

		let boxCfgList = boxCfg.childList;

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, GameConfig.stageHeigth - 69 - 20);
		this._scrollList = ComponentManager.getScrollList(AcRechargeBoxSPRewardScrollItem, boxCfgList, rect,{aid:this._aid,code:this._code});
		this._scrollList.x = this.viewBg.width/2 - this._scrollList.width/2;
		this._scrollList.y = 69+4;
		this.addChildToContainer(this._scrollList);		

		
	}


	private refreshMultiView()
	{
		let boxCfgList = this._boxCfg.childList;
		this._scrollList.refreshData(boxCfgList,{aid:this._aid,code:this._code});
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
		return "";
	}
	protected getTitleBgName():string
	{
		// if(ResourceManager.hasRes("acrechargeboxspview_title_bg"+this._code)){
		// 	return "acrechargeboxspview_title_bg"+this._code;
		// } else {
		// 	return "commonview_db_04";
		// }

		return "acrechargeboxspview_title_bg7";
	}
	public dispose()
	{

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