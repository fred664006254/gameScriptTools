/**
  * 赵云活动Tab3
  * author 张朝阳
  * date 2018/7/7
  * @class AcMazeViewTab3
  */
class AcMazeViewTab3 extends AcCommonViewTab {
	private _scrollList:ScrollList;
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
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.refreshView,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC,this.refreshView,this);
		let bg = BaseBitmap.create("public_9_bg43");
		bg.width = 620;
		bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 25;
		bg.setPosition( GameConfig.stageWidth / 2 - bg.width / 2 , 10) ;
		this.addChild(bg);

		let rect = new egret.Rectangle(0,0,bg.width,bg.height)
		this._scrollList = ComponentManager.getScrollList(AcMazeRechargeScrollItem,null,rect);
		this._scrollList.setPosition(bg.x + 10,bg.y);
		this.addChild(this._scrollList);
		this.refreshView()

	}
	private refreshView()
	{
		let rechargeData = this.vo.getSortRecharge();
		rechargeData.sort((a:Config.AcCfg.RechargeItemCfg,b:Config.AcCfg.RechargeItemCfg) =>{return a.sortId - b.sortId});
		this._scrollList.refreshData(rechargeData);
	}
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshView,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC,this.refreshView,this);
		this._scrollList = null;
		super.dispose();
	}

}