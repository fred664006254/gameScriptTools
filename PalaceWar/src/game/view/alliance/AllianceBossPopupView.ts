/**
 * 副本
 * author yanyuling
 * date 2017/12/06
 * @class AllianceBossPopupView
 */
class AllianceBossPopupView extends PopupView
{
	// 滑动列表
	private _nodeContainer:BaseDisplayObjectContainer;
	private _scrollList: ScrollList;
	private _topTipTF:BaseTextField;
	private _dataLsit:any[] = [];
	public constructor() 
	{
		super();
	}
	public initView():void
	{		
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.attackCallback, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_LIMITLESSBOSS_REFRESH, this.refreshBossList, this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);
		var zoneStr = 0;
		zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(23).hour; 
		this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_tip1",[zoneStr+""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._topTipTF.x = this.viewBg.width/2 - this._topTipTF.width/2;
		this._topTipTF.y = 20;
		this._nodeContainer.addChild(this._topTipTF);
		
		let tmpList = Config.AlliancebossCfg.getAllainceCfgIdList();
		
		// let tmplidst2 = Config.AllianceelitebossCfg.getAllainceCfgIdList().sort((a:string,b:string)=>{
		// 	return Number(a.substring(1)) - Number(b.substring(1));
		// });

		let alliVo:AllianceVo = Api.allianceVoApi.getAllianceVo();
		let myAlliLv = alliVo.level;
		let dataList = [];
		for (var index = 0; index < tmpList.length; index++) {
			let cfg = Config.AlliancebossCfg.getAllianceCfgByLv(tmpList[index])
			if (cfg.needAllianceLv <= myAlliLv)
			{
				if (cfg.attribution1){
					if (Api.allianceVoApi.checkOpenLimitlessBoss()){
						dataList.unshift(tmpList[index]);
					}
				}
				else{
					dataList.push(tmpList[index]);
				}
			}
		}
		this._dataLsit = dataList;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,this.viewBg.width,690);
		this._scrollList = ComponentManager.getScrollList(AllianceBossScrollItem,dataList,rect);
		this._scrollList.x = 25+GameData.popupviewOffsetX;
		this._scrollList.y = this._topTipTF.y + 30;
		this._nodeContainer.addChild(this._scrollList);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceApplyTip"));

		let bottomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_tip2"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN)
        bottomTipTxt.x = this.viewBg.width/2 - bottomTipTxt.width/2;
        bottomTipTxt.y = this._scrollList.y + rect.height + 10;
        this._nodeContainer.addChild(bottomTipTxt);

	}

	private getBossDatalist():any[]{
		let dataList = [];
		let alliVo:AllianceVo = Api.allianceVoApi.getAllianceVo();
		let myAlliLv = alliVo.level;
		let tmpList = Config.AlliancebossCfg.getAllainceCfgIdList();
		for (var index = 0; index < tmpList.length; index++) {
			let cfg = Config.AlliancebossCfg.getAllianceCfgByLv(tmpList[index])
			if (cfg.needAllianceLv <= myAlliLv)
			{
				if (cfg.attribution1){
					if (Api.allianceVoApi.checkOpenLimitlessBoss()){
						dataList.unshift(tmpList[index]);
					}
				}
				else{
					dataList.push(tmpList[index]);
				}
			}
		}
		return dataList;
	}

	protected showBossLog(event:egret.Event)
	{	
		if (!event.data.ret){
			return;
		}
		let rdata = event.data.data;
		if(rdata.ret == 0)
		{
		
		}
		let dataList = this.getBossDatalist();
		this._scrollList.refreshData(dataList);
	}
	// protected getBgExtraHeight():number
	// {
	// 	return -130;
	// }

	private attackCallback(event:egret.Event){
		if (event.data.ret){
			let rData = event.data.data.data;
			if (rData.hasKill && rData.hasKill == 1){
				let dataList = this.getBossDatalist();
				this._scrollList.refreshData(dataList);
			}
		}
	}

	public refreshBossList():void{
		if (Api.allianceVoApi.checkOpenLimitlessBoss()){
			let alliVo = Api.allianceVoApi.getAllianceVo();
			if (alliVo && alliVo.boss && alliVo.boss.eliteClear){
				alliVo.boss.eliteClear = 0;
			}
			let dataList = this.getBossDatalist();
			this._scrollList.refreshData(dataList);
		}
	}

	protected getShowHeight():number
	{
		return 850;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		,"searchbinfowifebg","progress5","progress3_bg","alliance_effect",
		"allianceBossbg","allianceview_itembossbg","allianceBossbg_limitless"
		]);
	}


	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.attackCallback, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_LIMITLESSBOSS_REFRESH, this.refreshBossList, this);

		// 未婚滑动列表
		this._scrollList = null;
		this._nodeContainer = null;
		this._topTipTF = null;
		this._dataLsit = [];
		super.dispose();
	}
}