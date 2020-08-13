/**
 *帮会任务
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskView
 */
class AllianceTaskView extends CommonView
{

	private _scrollView:ScrollList = null;
	private _rewardBtn:BaseButton = null;
	private _rewardDesc:BaseTextField = null;
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_REWARD),this.resetRedDot,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT),this.freshView,this);

		let buttombg = BaseBitmap.create("arena_bottom");
		buttombg.y = GameConfig.stageHeigth - buttombg.height - this.container.y;
		this.addChildToContainer(buttombg);

		let rankBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBtnRank",this.rankBtnHandler,this);
		rankBtn.x =  buttombg.x +30;
		rankBtn.y = buttombg.y + buttombg.height/2 - rankBtn.height/2;
		this.addChildToContainer(rankBtn);

		let buffBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBtnBuff",this.buffBtnHandler,this);
		buffBtn.x = buttombg.x + buttombg.width/2 - rankBtn.width/2;
		buffBtn.y = rankBtn.y;
		this.addChildToContainer(buffBtn);

		let rewardBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBtnReward",this.rewardBtnHandler,this);
		rewardBtn.x = buttombg.x + buttombg.width - rewardBtn.width - rankBtn.x; 
		rewardBtn.y = rankBtn.y 
		this.addChildToContainer(rewardBtn);
		this._rewardBtn = rewardBtn;

		let rewardDescStr = "alliancetask_reward_desc";
		// let rewardDescColor = TextFieldConst.COLOR_WARN_RED3;
		if (Api.allianceTaskVoApi.isJoinedAllianceTask()){
			rewardDescStr = "alliancetask_reward_joined_desc";
			// rewardDescColor = TextFieldConst.COLOR_WHITE;
		}
		let rewardDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(rewardDescStr),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		// rewardDesc.setColor(TextFieldConst.COLOR_WHITE);
		rewardDesc.width = 640;
		rewardDesc.textAlign = egret.HorizontalAlign.CENTER;
		rewardDesc.setPosition(0,buttombg.y - 10-rewardDesc.height);
		this.addChildToContainer(rewardDesc);
		this._rewardDesc = rewardDesc;

		let rect = new egret.Rectangle(0,0,622, buttombg.y - 10-rewardDesc.height);
		// let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
		let list = Api.allianceTaskVoApi.getAllTaskList();
		this._scrollView = ComponentManager.getScrollList(AllianceTaskScrollItem,list,rect);
		this._scrollView.y = -10;
		this._scrollView.x = GameConfig.stageWidth/2 - this._scrollView.width/2;
		this.addChildToContainer(this._scrollView);

		this.resetRedDot();
	}

	protected rewardBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCETASKREWARDVIEW);
	}

	private freshView():void{
		let list = Api.allianceTaskVoApi.getAllTaskList();
		this._scrollView.refreshData(list);
		this.resetRedDot();
		let rewardDescStr = "alliancetask_reward_desc";
		// let rewardDescColor = TextFieldConst.COLOR_WARN_RED3;
		if (Api.allianceTaskVoApi.isJoinedAllianceTask()){
			rewardDescStr = "alliancetask_reward_joined_desc";
			// rewardDescColor = TextFieldConst.COLOR_WHITE;
		}
		this._rewardDesc.text = LanguageManager.getlocal(rewardDescStr);
		// this._rewardDesc.setColor(rewardDescColor);
	}

	private resetRedDot():void
	{
		if (Api.allianceTaskVoApi.isShowRewardRed() && (!Api.allianceTaskVoApi.isInNotGetTime()))
		{
			App.CommonUtil.addIconToBDOC(this._rewardBtn);
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
		}
	}

	protected rankBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKRANKPOPUPVIEW,{taskId:null,alliRank:1});
	}

	protected buffBtnHandler()
	{
		let tws = App.DateUtil.getWeeTs(GameData.serverTime);
		if(GameData.serverTime + 1800 >= tws + 86400 )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKBUFFLISTPOPUPVIEW);
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_ALLIANCETASK_INIT,requestData:{}};
	}
	protected getRuleInfo():string
	{
		return "allianceTaskRuleInfo";
	}
	protected getRuleInfoParam():string[]
	{
		return [String(App.DateUtil.formatSvrHourByLocalTimeZone(0).hour)];
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"arena_bottom","progress3","progress3_bg",
			"alliance_taskAttrbg1",
			"alliance_taskAttrbg2",
			"alliance_taskAttrbg3",
			"alliance_taskAttrbg4",
			"alliance_taskAttrbg5",
			"alliance_taskAttrWordbg",
			"alliance_taskbg",
			"alliance_taskbg5",
			"alliance_taskIcon1",
			"alliance_taskIcon2",
			"alliance_taskIcon3",
			"alliance_taskIcon4",
			"alliance_taskIcon5",
			"alliance_taskimg1",
			"alliance_taskwotdbg1",
			"alliance_taskwotdbg2",
			"alliance_taskwotdbg3",
			"alliance_join1",
			"alliance_join3",
			"alliance_join2",
			"alliance_join4",
			"public_icon13",
		]);
	}

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_REWARD),this.resetRedDot,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT),this.freshView,this);
		this._scrollView = null;
		this._rewardBtn = null;
		this._rewardDesc = null;
		super.dispose();
	}
}