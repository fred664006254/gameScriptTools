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

	public static achInfoVo;
	public static achCfg;
	public static stage;
	public static curValue;
	public static value;

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,this.doGetReward,this);

		// this._achId = this.param.data.achId;

		Api.achievementVoApi.setUIItemId(this.param.data.achId);
		Api.achievementVoApi.setSortAchInfoVo(Api.achievementVoApi.getAchievementInfoVoById(this.param.data.achId))
		Api.achievementVoApi.setSortAchCfg(Config.AchievementCfg.getAchievementCfgById(this.param.data.achId));
		Api.achievementVoApi.setSortStage(Api.achievementVoApi.getSortAchInfoVo().stage);
		let acfg = Api.achievementVoApi.getSortAchCfg();
		Api.achievementVoApi.setSortCurValue(acfg.value[Api.achievementVoApi.getAchProById(this.param.data.achId)]);
		Api.achievementVoApi.setSortValue(acfg.value);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,522,640);
		// console.time('testForEach');
		let detailList = Api.achievementVoApi.getAchDetailList(Api.achievementVoApi.getUIItemId());
		// console.timeEnd('testForEach');
		this._oldList = detailList;

		this._scrollList = ComponentManager.getScrollList(AchievementDetailScrollItem,detailList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.x = 25+GameData.popupviewOffsetX;
		this._scrollList.y = 20;

	}


	private doGetReward(event:egret.Event)
	{
		this._achIndex = event.data.achIndex;
		this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS,{aid:Api.achievementVoApi.getUIItemId()});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// this._scrollList.refreshData(achList);
		if (data && data.ret){
			let index = Api.achievementVoApi.getAchDetailIndexVoById2(Api.achievementVoApi.getUIItemId(),this._achIndex,this._oldList)
			let achScrollItem = <AchievementDetailScrollItem>this._scrollList.getItemByIndex(index);
		
			achScrollItem.refreshData(index);

			let achScrollItem2 = <AchievementDetailScrollItem>this._scrollList.getItemByIndex(index + 1);
			if(achScrollItem2)
			{
				achScrollItem2.refreshData(index + 1);
			}

			let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
			
			App.CommonUtil.playRewardFlyAction(rewardList);

			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_REFRESHLIST,{"achId":Api.achievementVoApi.getUIItemId()});
		}
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