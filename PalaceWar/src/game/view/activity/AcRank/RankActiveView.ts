/**
 * 冲榜
 * author dky
 * date 2018/2/27
 * @class RankActiveView
 */
class RankActiveView extends CommonView
{
	// 滑动列表
	private _scrollList:ScrollList;
	// // 成就列表
	// private _achievementInfoVoList:Array<AchievementInfoVo>;
	// private _oldList:Array<AchievementInfoVo>;

	private _achId:string;

	public constructor() 
	{
		super();
	}
	public initView():void
	{


		let bottomBg = BaseBitmap.create("public_9_bg23");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - 105;
		bottomBg.x = 0;
		bottomBg.y = -7;
		this.addChildToContainer(bottomBg);


		let achList = Api.acVoApi.getRanActives();

		// this._oldList = achList;
		achList.sort((a,b)=>{return a['sortId']- b['sortId'];});
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, bottomBg.width, bottomBg.height - 8);
		this._scrollList = ComponentManager.getScrollList(RankActiveScrollItem, achList, rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.x = bottomBg.x + bottomBg.width / 2 - this._scrollList.width / 2 + 4;
		this._scrollList.y = bottomBg.y + bottomBg.height / 2 - this._scrollList.height / 2;
		// this._scrollList.addTouchTap(this.clickItemHandler, this);


	}


	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"progress5", "progress3_bg","progress6", "progress6_bg",
					"achievement_state1","achievement_state2","achievement_state3",
					"ranactivecellbg","rankactivenamebg",
					"rankbgs_1","rankbgs_2","rankbgs_3",
					"rankinglist_rankn1",
					"rankinglist_rankn2",
					"rankinglist_rankn3",
					
					
					]);
	}




	public dispose():void
	{
		// Api.rookieVoApi.checkWaitingGuide();
		this._scrollList  = null;

		// this._achievementInfoVoList = null;
		this._achId = null;
		// this._oldList = null;
		super.dispose();
	}
}