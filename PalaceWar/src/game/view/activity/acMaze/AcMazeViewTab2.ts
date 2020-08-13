/**
  * 赵云活动Tab2
  * author 张朝阳
  * date 2018/7/7
  * @class AcMazeViewTab2
  */
class AcMazeViewTab2 extends AcCommonViewTab {

	private _scrollList:ScrollList = null;
	public constructor() {
		super();
		this.initView();
	}
	/**
	 * 配置文件数据
	 */
	private get cfg() : Config.AcCfg.MazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	/**
	 * 服务器返回数据
	 */
	private get vo() : AcMazeVo{
        return <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	public initView()
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB,this.refreshData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACMAZE_TASK,this.refreshData,this);
		let bg = BaseBitmap.create("public_9_bg43");
		bg.width = 620;
		bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 25;
		bg.setPosition( GameConfig.stageWidth / 2 - bg.width / 2 , 10) ;
		this.addChild(bg);

		let rect = new egret.Rectangle(0,0,bg.width,bg.height)
		this._scrollList = ComponentManager.getScrollList(AcMazeTaskScrollItem,null,rect);
		this._scrollList.setPosition(bg.x + 10,bg.y);
		this.addChild(this._scrollList);
		this.refreshData();
	}
	private refreshData()
	{
		let taskData = this.vo.getSortTask();
		taskData.sort((a:Config.AcCfg.TaskItemCfg,b:Config.AcCfg.TaskItemCfg) =>{return a.sortId - b.sortId});
		this._scrollList.refreshData(taskData);
	}
	public refreshWhenSwitchBack()
	{
		this.refreshData();
	}
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB,this.refreshData,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACMAZE_TASK,this.refreshData,this);
		this._scrollList = null;
		super.dispose();
	}
}