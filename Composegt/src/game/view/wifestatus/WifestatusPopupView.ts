/**
 * 册封选择列表
 * author dky
 * date 2018/4/26
 * @class WifestatusPopupView
 */
class WifestatusPopupView extends PopupView
{
	// 滑动列表
	private _scrollList: ScrollList;

	// public _achId:string;

	public static itemId:string;
	private _achIndex:number;

	private _oldList:Array<number>;
	public static wifeId:string;
	public static wifeLevel:string;
	private _oldStar:number;

	public constructor() 
	{
		super();
	}
	protected getBgExtraHeight():number
	{
		return 10;
	}
	public initView():void
	{		

		
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,this.doGetReward,this);

		// this._achId = this.param.data.achId;
		WifestatusPopupView.wifeId = this.param.data.wifeId;
		WifestatusPopupView.wifeLevel = this.param.data.level;

		let bottomBg = BaseBitmap.create("commonview_woodbg");
		bottomBg.width = 546;
		bottomBg.height = 746;//716
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = 0;
		this.addChildToContainer(bottomBg);

		let topBg = BaseBitmap.create("popupview_bg3");
		topBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		topBg.y = -3;
		this.addChildToContainer(topBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,522,700);
		// rect.setTo(0,0,522,660);

		let wifeList = Config.WifestatusCfg.getWifestatusList();

		this._scrollList = ComponentManager.getScrollList(WifestatusPopupScrollItem,wifeList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.x = this.viewBg.width/2 - this._scrollList.width/2;
		this._scrollList.y = 20;
		this._scrollList.addTouchTap(this.clickItemHandler,this);

	}

	private clickItemHandler(event:egret.TouchEvent):void
	{
		
		let index:number = Number(event.data);
		let statusCfg = Config.WifestatusCfg.getWifestatusList()[index];

		let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
		let wifeVo = Api.wifeVoApi.getWifeInfoVoById(WifestatusPopupView.wifeId);


		


		//未解锁
		if(Number(statusCfg.id) > Number(wifestatusVo.level) && statusCfg.id!="2")
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeStatusError2"));
			return;
		}
		if(wifeVo.intimacy < statusCfg.needIntimacy ||wifeVo.glamour < statusCfg.needGlamour)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeStatusLessPro"));
			return;
		}
		if(wifestatusVo.info[statusCfg.id] &&statusCfg.maxNum <= wifestatusVo.info[statusCfg.id].length)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeStatusError1"));
			return;
		}

		if(WifestatusPopupView.wifeLevel == statusCfg.id)
		{
			return;
		}
		//点击丫鬟return 
		if(statusCfg.id == "1"){
			return;
		}

		this._oldStar = Api.wifestatusVoApi.getWifestatusVo().star;
		this.request(NetRequestConst.REQUEST_WIFESTATUS_CONFER, { wifeId:String(this.param.data.wifeId),position:statusCfg.id });
		WifestatusView.wifeLevel = statusCfg.id;
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// this._scrollList.refreshData(achList);
		if(data.data.ret < 0){
			return;
		}
		if(data.data.data.unlockFlag)
		{
			WifestatusView.unlockLevel = Api.wifestatusVoApi.getWifestatusVo().level;
			
		}
		let statusType = 0;//0上封 1 下封
		if(this._oldStar > Api.wifestatusVoApi.getWifestatusVo().star)
		{
			statusType = 1;
		}
		ViewController.getInstance().openView(ViewConst.BASE.WIFESTATUSSHOWVIEW,{wifeId:this.param.data.wifeId,type:statusType})
		
		let container = Api.wifestatusVoApi.getStatusEffect(Api.wifestatusVoApi.getWifestatusVo().star - this._oldStar);
		LayerManager.msgLayer.addChild(container);
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFESTATUS_STATE);
		
		this.hide();
	
	}


	protected getTitleStr():string
	{
		return "wifestatusViewTitle";
	}


	private doGetReward(event:egret.Event)
	{
		this._achIndex = event.data.achIndex;
		this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS,{aid:AchievementDetailPopupView.itemId});
	}

	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"commonview_woodbg","popupview_bg3","wifestatus_curmark"
                //   "wifestatus_itembg_an1","wifestatus_itembg_an2",
					]);
	}

	public dispose():void
	{
		
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,this.doGetReward,this);
		
		// 未婚滑动列表
		this._scrollList = null;
		this._achIndex = null;
		this._oldList = null;
		WifestatusPopupView.wifeId = null;
		WifestatusPopupView.wifeLevel = null;
		this._oldStar = null;
		super.dispose();
	}
}