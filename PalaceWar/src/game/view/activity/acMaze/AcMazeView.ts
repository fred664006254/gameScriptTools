/**
  * 赵云活动
  * author 张朝阳
  * date 2018/7/7
  * @class AcMazeView
  */
class AcMazeView extends AcCommonView {

	public static AID :string = null;
	public static CODE :string = null;
	public static ACTIVEID:String = null;
	public static TASKID:String = null;
	public static RECHARGEID:String = null;
	private _mazeTab:BaseDisplayObjectContainer = null;
	private _taskTab:BaseDisplayObjectContainer = null;
	private _rechargeTab:BaseDisplayObjectContainer = null;
	private _bg:BaseBitmap = null;
	private _line:BaseBitmap = null;
	private _lingBg:BaseBitmap = null;
	/**
	 * 服务器返回数据
	 */
	private get vo() : AcMazeVo{
        return <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	public constructor() {
		super();
	}
		/**获取资源数组 */
	protected getResourceList(): string[]
	{
		return super.getResourceList().concat(["acmazeview_infobg","acmazeview_maze","acmazeview_bg","acturntable_rankicon_down", "acturntable_rankicon",
		"activity_charge_red","accarnivalview_tab_red","signin_had_get","progress5","progress3_bg","acmazeline","acmazeten",
		"critmyspeed1","critmyspeed2","critmyspeed3","critmyspeed4","critmyspeed5","critmyflash1","critmyflash2","critmyflash3",
		"acmazeline","atkrace_crit_bg","atkrace_crit_text","acmazeten","acmazeview_line",
		"dragonboattarbg","acmazeview_buttombg"
		]);
	}
	public initView()
	{
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.refreshView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY,this.refreshView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC,this.refreshView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB,this.refreshView,this);
		AcMazeView.AID = this.aid;
		AcMazeView.CODE = this.code;
		AcMazeView.ACTIVEID = AcMazeView.AID + "-" + AcMazeView.CODE;
		let bottomBg = BaseLoadBitmap.create("servant_bottombg");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - 75;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY()
		this.addChildToContainer(bottomBg);
		this._bg = BaseBitmap.create("acmazeview_bg");
		this._bg.setPosition(0,GameConfig.stageHeigth - this._bg.height - 120);
		this.addChildToContainer(this._bg);

		this._lingBg =  BaseBitmap.create("dragonboattarbg");
		this._lingBg.y = -70;
		this.addChildToContainer(this._lingBg);

		this._line = BaseBitmap.create("acmazeview_line");
		this._line.y = -8;
		this.addChildToContainer(this._line);

		this._mazeTab = <BaseDisplayObjectContainer>this.tabbarGroup.getChildAt(0);
		this._taskTab = <BaseDisplayObjectContainer>this.tabbarGroup.getChildAt(1);
		this._rechargeTab = <BaseDisplayObjectContainer>this.tabbarGroup.getChildAt(2);

		this.refreshView();
	}
	private refreshView()
	{
		if(this.vo.isFree)
		{
			App.CommonUtil.addIconToBDOC(this._mazeTab);
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(this._mazeTab);
		}
		if(this.vo.isHaveTaskRedDot())
		{
			App.CommonUtil.addIconToBDOC(this._taskTab);
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(this._taskTab);
		}
		if(this.vo.isHaveRechargeRedDot())
		{
			App.CommonUtil.addIconToBDOC(this._rechargeTab);
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(this._rechargeTab);
		}
		
	}
	/**
	 * tabbar 的监听事件
	 */
	protected clickTabbarHandler(data:any):void
	{
        super.clickTabbarHandler(data);
		if(data.index == 0)
		{
			this._bg.setVisible(true);
		}
		else
		{
			this._bg.setVisible(false);
		}
    }
	/**
	 * 设置tabbar 的文本
	 */
	protected getTabbarTextArr():Array<string>
	{
		return [
			"AcMazeViewTitle",
			"AcMazeViewTaskTitle",
			"acRechargeViewTitle",
		];
	}
	protected getSoundBgName():string
	{
		return SoundConst.MUSIC_CHALLENGE;
	}
	protected getTitleStr():string
	{
		return "AcMazeViewTitle";
	}
	protected getRuleInfo():string
	{
		return "acMazeRule";
    } 
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshView,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY,this.refreshView,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC,this.refreshView,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB,this.refreshView,this);
		this._mazeTab = null;
		this._taskTab = null;
		this._rechargeTab = null;
		this._bg = null;
		this._line = null;
		super.dispose();
	}
	
}