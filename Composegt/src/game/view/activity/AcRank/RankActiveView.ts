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


		let bottomBg = BaseBitmap.create("commonview_woodbg");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - 69;
		bottomBg.x = 0;
		bottomBg.y = 69;
		this.addChildToContainer(bottomBg);

		let foot = BaseBitmap.create("commonview_bottom");
		foot.x = 0;
		foot.y = bottomBg.y + bottomBg.height - foot.height;
		this.addChildToContainer(foot);

		let achList = Api.acVoApi.getRanActives();
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 636, bottomBg.height - 41);

		let overList = [];
		let removeObj = null;
		for(let i = achList.length - 1; i >= 0; i--){
			if(achList[i].et - 86400 - GameData.serverTime <=0){
				removeObj =  achList[i];
				achList.splice(i,1);
				overList.push(removeObj);
			}
		}
		let curOverList = [];
		for(let j = overList.length - 1; j >=0; j --){
			curOverList.push(overList[j]);
		}
		
		


		this._scrollList = ComponentManager.getScrollList(RankActiveScrollItem, achList.concat(curOverList), rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
		this._scrollList.y =80;
		
		// let bottomBgFrame = BaseBitmap.create("public_9v_bg03");
		// bottomBgFrame.width = 640;
		// bottomBgFrame.height = GameConfig.stageHeigth - 70;
		// bottomBgFrame.x = 0;
		// bottomBgFrame.y = 70;
		// this.addChild(bottomBgFrame); 

	}

	protected getTitleBgName():string
	{
		return "commonview_titlebg2"
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					
					"achievement_state1","achievement_state2","achievement_state3",
					,"rechargevie_db_01",
					"activity_charge_red","recharge_diban_01",
					"commonview_titlebg2",
					"commonview_woodbg",
					"commonview_bottom",
					"activity_rank_listbg",

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