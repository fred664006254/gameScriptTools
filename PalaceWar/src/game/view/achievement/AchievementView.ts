/**
 * 成就
 * author dku
 * date 2017/10/9
 * @class WifeView
 */
class AchievementView extends CommonView
{
	// 滑动列表
	private _scrollList:ScrollList;
	// // 成就列表
	// private _achievementInfoVoList:Array<AchievementInfoVo>;
	private _oldList:Array<AchievementInfoVo>;

	private _achId:string;

	public constructor() 
	{
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

	protected getBeamName():string
	{	
		return "commonview_beam";
	}

	public initView():void
	{
		// Api.rookieVoApi.curGuideKey = "dinner";
		// Api.rookieVoApi.insertWaitingGuide({"idx":"dinner_1"});
		
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,this.doGetReward,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_REFRESHLIST,this.refreshItem,this);

		// let bottomBg = BaseBitmap.create("public_9_bg23");
		// bottomBg.width = GameConfig.stageWidth-10;
		// bottomBg.height = GameConfig.stageHeigth - 105;
		// bottomBg.x = 5;
		// bottomBg.y = -7;
		// this.addChildToContainer(bottomBg);


		let achList = Api.achievementVoApi.getAchievementInfoVoList();

		this._oldList = achList;

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 600, GameConfig.stageHeigth-150);
		this._scrollList = ComponentManager.getScrollList(AchievementScrollItem, achList, rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.x = 20;
		this._scrollList.y = 100-this.container.y+40;
		// this._scrollList.y = bottomBg.y + bottomBg.height / 2 - this._scrollList.height / 2;


	}

	private doGetReward(event:egret.Event){
		this._achId = event.data.achId;
		this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS,{aid:event.data.achId});
		
	}
	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// this._scrollList.refreshData(achList);
		if (data && data.ret){
			this.refreshItem();

			let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
			
			App.CommonUtil.playRewardFlyAction(rewardList);
		}
	}

	// private refreshItem2()
	// {	
	// 	let index = Api.achievementVoApi.getAchIndexVoById2(this._achId,this._oldList);
	// 	let achScrollItem = <AchievementScrollItem>this._scrollList.getItemByIndex(index);
	
	// 	achScrollItem.refreshData(index);
	// }
	private refreshItem()
	{	
		let list = Api.achievementVoApi.getAchievementInfoVoList()
		// let achScrollItem = <AchievementScrollItem>this._scrollList.getItemByIndex(index);
	
		// achScrollItem.refreshData(index);
		this._scrollList.refreshData(list);
	}

	private clickItemHandler(event: egret.TouchEvent): void {
		let index: number = Number(event.data);
		let achList = Api.achievementVoApi.getAchievementInfoVoList();
		let achVo = achList[index]
		ViewController.getInstance().openView(ViewConst.POPUP.ACHIEVEMENTDETAILPOPUPVIEW,{achId:achVo.id});

	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"progress17_bg", "progress17","progress19", "progress19_bg","progress19_cloud",
					"achievement_state1","achievement_state2","achievement_state3",
					"public_scrollitembg","public_titlebg",
					]);
	}




	public dispose():void
	{
		// Api.rookieVoApi.checkWaitingGuide();
		this._scrollList  = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,this.doGetReward,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACH_REFRESHLIST,this.refreshItem,this);
		// this._achievementInfoVoList = null;
		this._achId = null;
		this._oldList = null;
		super.dispose();
	}
}