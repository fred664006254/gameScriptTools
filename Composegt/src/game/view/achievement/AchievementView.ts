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
	public initView():void
	{
		// Api.rookieVoApi.curGuideKey = "atkrace";
		// Api.rookieVoApi.insertWaitingGuide({"idx":"atkrace_1"});
		
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,this.doGetReward,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_REFRESHLIST,this.refreshItem,this);

		// let bottomBg = BaseBitmap.create("public_9v_bg03");
		// bottomBg.width = GameConfig.stageWidth;
		// bottomBg.height = GameConfig.stageHeigth - 100+ 30;
		// bottomBg.x = 0;
		// bottomBg.y = -20;
		// this.addChildToContainer(bottomBg);
		

		let border = BaseBitmap.create("commonview_border1");
		border.width = GameConfig.stageWidth;
		border.height = GameConfig.stageHeigth - 100+ 30;
		border.x = 0;
		border.y = -20;
		this.addChildToContainer(border);

		let bottom = BaseBitmap.create("commonview_bottom");
		bottom.x = 0;
		bottom.y = GameConfig.stageHeigth - bottom.height ;
		this.addChild(bottom);

		let leftItem = BaseBitmap.create("commonview_item1");
		leftItem.scaleX = -1;
		leftItem.x = leftItem.width;
		leftItem.y = border.y;
		this.addChildToContainer(leftItem);

		let rightItem = BaseBitmap.create("commonview_item1");
		rightItem.x = border.x + border.width - rightItem.width;
		rightItem.y = border.y;
		this.addChildToContainer(rightItem);


		let achList = Api.achievementVoApi.getAchievementInfoVoList();

		this._oldList = achList;

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 600, border.height - 40);
		this._scrollList = ComponentManager.getScrollList(AchievementScrollItem, achList, rect);
		this._scrollList.y = 2;
		this.addChildToContainer(this._scrollList);
		this._scrollList.x = border.x + border.width / 2 - this._scrollList.width / 2+1;
		this._scrollList.y = border.y + border.height / 2 - this._scrollList.height / 2+ 2;
		// this._scrollList.addTouchTap(this.clickItemHandler, this);


	}
	// 背景图名称
	protected getBgName():string
	{
	
		return "commonview_woodbg";
	}
	private doGetReward(event:egret.Event){
		this._achId = event.data.achId;
		this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS,{aid:event.data.achId});
		
	}
	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// this._scrollList.refreshData(achList);

		this.refreshItem();

		let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
		
		App.CommonUtil.playRewardFlyAction(rewardList);
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
					 "progress6", "progress6_bg",
					"achievement_state1","achievement_state2","achievement_state3",
					// "progress_type1_bg","progress_type1_yellow",
					"progress_type3_bg","progress_type1_yellow2",
					"achievement_bg",
					"commonview_bottom",
					"commonview_border1",
					"commonview_item1",
					"commonview_woodbg",
					
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