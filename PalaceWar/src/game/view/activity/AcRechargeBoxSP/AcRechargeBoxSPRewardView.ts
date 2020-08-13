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

		let bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - this.titleBg.height + 10;
        bottomBg.x = 0; 
        bottomBg.y = this.titleBg.y + this.titleBg.height - 12; 
		this.addChildToContainer(bottomBg);
		
		let listBg = BaseBitmap.create("public_9_bg43");
        listBg.width = bottomBg.width - 30;
        listBg.height = bottomBg.height - 55;
        listBg.x = bottomBg.x + 15; 
        listBg.y = bottomBg.y + 25; 
		this.addChildToContainer(listBg);
		
		//多个档位
		this.initMultiView(boxCfg);
	}



	private initMultiView(boxCfg)
	{
		let boxCfgList = boxCfg.childList;

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 620, GameConfig.stageHeigth - this.titleBg.height + 5 - 65);
		this._scrollList = ComponentManager.getScrollList(AcRechargeBoxSPRewardScrollItem, boxCfgList, rect,{aid:this._aid,code:this._code});
		this._scrollList.x = 10;
		this._scrollList.y = this.titleBg.y + this.titleBg.height - 7 + 25;
		this.addChildToContainer(this._scrollList);	
		this._scrollList.bounces = false;	
	}


	private refreshMultiView()
	{
		let boxCfgList = this._boxCfg.childList;
		this._scrollList.refreshData(boxCfgList,{aid:this._aid,code:this._code});
	}



	private getRewardMultiHandler(event:egret.Event)
	{
		if (event && event.data && event.data.ret){
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
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
			let data = event.data.data.data;
			// Api.servantVoApi.checkServantChangeRewards(data.cfrewards,data.rewards,data.otherrewards);
			App.LogUtil.log("getRewardMultiHandler: "+data.rewards);
			if (data.replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: data.replacerewards });
			}
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards, "otherRewards":data.otherrewards,"isPlayAni":true});
			this.refreshMultiView();
		}
	}

	/**
	 * 前往充值按钮
	 */
	private rechargeClick()
	{
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

	public getTypeCode():string{
		return this.param.data.code;
	}

	protected getTitleStr():string
	{
		return "";
	}

	protected getResourceList():string[]{
		let list:string[] = [];
		if (this.getTypeCode() == "1"){
			list = [
				"acrechargeboxspview_title_bg"+this.getTypeCode(),
			];
		}
		else{
			list = [
				"acrechargeboxspview_title_bg1",
			];
		}
		return super.getResourceList().concat(list).concat([
			"acrechargeboxspview_rewardbg0", "acrechargeboxspview_rewardbg1", "acrechargeboxspview_rewardbg2", "acrechargeboxsp_line", "acwealthcarpview_servantskintxt", "acgiftreturnview_common_skintxt"
		]);
	}

	protected getTitleBgName():string
	{	
		let str = "acrechargeboxspview_title_bg"+this.getTypeCode();
		App.LogUtil.log("titlebgNAME: "+str);
		return "acrechargeboxspview_title_bg"+this.getTypeCode();
	}

	protected isHideTitleBgShadow():boolean{
		return true;
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