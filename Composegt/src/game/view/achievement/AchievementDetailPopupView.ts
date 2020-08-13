/**
 * 成就详情列表
 * author dky
 * date 2017/11/6
 * @class AchievementDetailPopupView
 */
class AchievementDetailPopupView extends PopupView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;

	// public _achId:string;

	public static itemId:string;
	private _achIndex:number;

	private _oldList:Array<number>;

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,this.doGetReward,this);

		// this._achId = this.param.data.achId;
		AchievementDetailPopupView.itemId = this.param.data.achId;

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,516,642);

		let detailList = Api.achievementVoApi.getAchDetailList(AchievementDetailPopupView.itemId);

		this._oldList = detailList;

		let scrollListBg = BaseBitmap.create("public_tc_bg01");
		scrollListBg.width = 534;
		scrollListBg.height = 667;
		scrollListBg.x = GameConfig.stageWidth / 2 - scrollListBg.width / 2-4;
		scrollListBg.y = 40;
		this.addChildToContainer(scrollListBg);


		this._scrollList = ComponentManager.getScrollList(AchievementDetailScrollItem,detailList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.x = scrollListBg.x + scrollListBg.width/2 - 516/2;
		this._scrollList.y = 40 + scrollListBg.height/2 - 640/2 -1 ;

	}


	private doGetReward(event:egret.Event)
	{
		this._achIndex = event.data.achIndex;
		this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS,{aid:AchievementDetailPopupView.itemId});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// this._scrollList.refreshData(achList);

		let index = Api.achievementVoApi.getAchDetailIndexVoById2(AchievementDetailPopupView.itemId,this._achIndex,this._oldList)
		let achScrollItem = <AchievementDetailScrollItem>this._scrollList.getItemByIndex(index);
	
		achScrollItem.refreshData(index);

		let achScrollItem2 = <AchievementDetailScrollItem>this._scrollList.getItemByIndex(index + 1);
		if(achScrollItem2)
		{
			achScrollItem2.refreshData(index + 1);
		}

		let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
		
		App.CommonUtil.playRewardFlyAction(rewardList);

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_REFRESHLIST,{"achId":AchievementDetailPopupView.itemId});
	}

	public dispose():void
	{
		
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,this.doGetReward,this);
		
		// 未婚滑动列表
		this._scrollList = null;
		this._achIndex = null;
		this._oldList = null;
		super.dispose();
	}
}