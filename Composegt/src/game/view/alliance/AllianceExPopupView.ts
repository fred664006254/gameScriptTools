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
	private _dataList = [];
	public constructor() {
		super();
	}

	protected initView():void
	{
		Api.mainTaskVoApi.checkShowGuide("AllianceExPopupView");
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM,this.doBuy,this);

		this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._pointText.y = 11;
		this.addChildToContainer(this._pointText);

		// this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		// this._pointText.y = 11;
		// this.addChildToContainer(this._pointText);

		let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 670;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 50;
        this.addChildToContainer(bg1);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg1.width-20,bg1.height-20);


		let allianceVo = Api.allianceVoApi.getAllianceVo();

		let dataList =new Array<any>();
		let cfg = Config.AlliancebaseCfg.allianceShop;
		// for (var index = 1; index < 20; index++) {
		// 	if(cfg[index.toString()]){
		// 		if(allianceVo.level >= (cfg[index.toString()].needAllianceLv - 1) ){
		// 			dataList.push(cfg[index.toString()]);
		// 		}
				
		// 	}
		// 	else{
		// 		break;
		// 	}
		// }

		for (var index = 1; index < Object.keys(cfg).length + 1; index++) {
			let unit = cfg[index.toString()];
			if(cfg[index.toString()]){
				if(unit.content.indexOf('1921') > -1 && !Api.switchVoApi.checkOpenCouncil()){
					continue;
				}
				if(unit.content.indexOf('4101') > -1 && !Api.switchVoApi.checkOpenAllianceWar()){
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
			return a.id - b.id;
		})
		this._dataList = dataList;
		this._scrollList = ComponentManager.getScrollList(AllianceExScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bg1.x + 10 ,bg1.y + 10);

		this.resetPointText();
	}
	
	private doBuy(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ALLIANCE_SHOPBUY, {shopkey:data.key});
	}

//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_SHOPBUY) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			// let index = this._index;
			// for (var index2 = 0; index < this._dataList.length; index++) {
			// 	if(this._dataList[index2].id == this._index){
			// 		index = index2;
			// 		break;
			// 	}
			// }
			this._scrollList.refreshData(this._dataList);
			// let wideItem = <AllianceExScrollItem>this._scrollList.getItemByIndex(index);
		
			// wideItem.refreshData(index);

			
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
		this._dataList = null;

		super.dispose();
	}
}