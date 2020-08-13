/**
 * 积分兑换道具板子
 * author dky
 * date 2017/12/7
 * @class AllianceExPopupView
 */

class AllianceExPopupView extends PopupView
{	
	private _pointText:BaseTextField;

	private _scrollList: ScrollList;

	private _index:number = 0;
	private _dataList:any[] = [];

	public constructor() {
		super();
	}

	protected initView():void
	{
		Api.mainTaskVoApi.checkShowGuide("AllianceExPopupView");

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM,this.doBuy,this);

		this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		this._pointText.y = 11;
		this.addChildToContainer(this._pointText);

		// this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		// this._pointText.y = 11;
		// this.addChildToContainer(this._pointText);


		let rect = egret.Rectangle.create();
		rect.setTo(0,0,540,710);


		let allianceVo = Api.allianceVoApi.getAllianceVo();

		let dataList =new Array<any>();
		let cfg = Config.AlliancebaseCfg.allianceShop;
		for (var index = 1; index < Object.keys(cfg).length + 1; index++) {
			let unit = cfg[index.toString()];
			if(cfg[index.toString()]){
				if(unit.content.indexOf('1921') > -1 && !Api.switchVoApi.checkOpenCouncil()){
					continue;
				}
				if(unit.content.indexOf('4015') > -1 && !Api.switchVoApi.checkOpenAllianceWar()){
					continue;
				}
				if(unit.content.indexOf('1740') > -1 && !Api.switchVoApi.checkOpenServantLevel450()){
					continue;
				}
				cfg[index.toString()].id = index.toString();
				dataList.push(cfg[index.toString()]);
			}
			else{
				break;
			}
		}
		dataList.sort((a,b)=>{
			return a.sortId - b.sortId;
		})
		this._dataList = dataList;
		this._scrollList = ComponentManager.getScrollList(AllianceExScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(23 +GameData.popupviewOffsetX,40);

		this.resetPointText();

		let curTaskId = Api.mainTaskVoApi.getCurMainTaskId();
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(curTaskId);
		if (taskCfg){
			if (taskCfg.questType == 701 && (!Api.rookieVoApi.isInGuiding) && (!Api.rookieVoApi.isGuiding) ){
				let taskIndex = this.getMainTaskCanChangeIndex();
				if (taskIndex > -1){
					this._scrollList.setScrollTopByIndex(taskIndex);
				}
			}
		}
		
	}

	public getMainTaskCanChangeIndex():number{
		let data = this._dataList;
		if (!data){
			return -1;
		}

		let myAcVo = Api.allianceVoApi.getMyAllianceVo();
		let acVo = Api.allianceVoApi.getAllianceVo();
		for (let i=0; i < data.length; i++){
			let maxNum = 1;
			if(data[i].limitNum){
				maxNum = data[i].limitNum;
			}
			else{
				maxNum = acVo.level - data[i].needAllianceLv + 1;
			}
			if(maxNum < 1){
				maxNum = 1;
			}
			let num = 0;
			if(myAcVo && myAcVo.shop && myAcVo.shop[String(data[i].id)]){
				num = myAcVo.shop[String(data[i].id)];
			}
			if (maxNum > num){
				return i;
			}
			
		}
		return -1;
	}
	
	private doBuy(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ALLIANCE_SHOPBUY, {shopkey:data.key});
	}

//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		if (!data.ret){
			return;
		}
		
		if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_SHOPBUY) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			let index = this._index;
			let wideItem = <AllianceExScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);

			
			// this._pointText.text = gem.toString();
			this.resetPointText();

		}	
	}


	private resetPointText():void
	{
		let acVo = Api.allianceVoApi.getMyAllianceVo();
		this._pointText.text = LanguageManager.getlocal("allianceBuildScore",[acVo.ctv + "/" + acVo.tctv]);
		this._pointText.x = this.viewBg.width/2 - this._pointText.width/2;
		// this._pointText.text = App.DateUtil.getFormatBySecond(1,2)
	}

	
	public dispose():void
	{	
		Api.mainTaskVoApi.hideGuide();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM,this.doBuy,this);

		// this._pointText = null;
		// this._isLoading = false;
		// this._buyClickId = null;
		this._scrollList = null;
		this._pointText = null;
		this._index = null;
		this._dataList = [];

		super.dispose();
	}
}