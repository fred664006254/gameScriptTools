/**
 *帮会任务
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskView
 */
class AllianceTaskView extends CommonView
{

	private _scrollView:ScrollList = null;
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		
		// let buttombg = BaseBitmap.create("arena_bottom");
		// buttombg.y = GameConfig.stageHeigth - buttombg.height - this.container.y;
		// this.addChildToContainer(buttombg);

        let border = BaseBitmap.create("public_9v_bg03");
		border.width = GameConfig.stageWidth;
		border.height = GameConfig.stageHeigth - 100+ 30;
		border.x = 0;
		border.y = -20;
		this.addChildToContainer(border);

        //最底部背景
        let buttombg = BaseBitmap.create("adult_lowbg");
        buttombg.x = GameConfig.stageWidth /2 - buttombg.width/2;
        buttombg.y = GameConfig.stageHeigth - buttombg.height -this.container.y - 21;
		this.addChildToContainer(buttombg);

		let rankBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceBtnRank",this.rankBtnHandler,this);
		rankBtn.x =  buttombg.x + buttombg.width/2 - 202 - rankBtn.width/2;
		rankBtn.y = buttombg.y + buttombg.height/2 - rankBtn.height/2 + 5;
		this.addChildToContainer(rankBtn);

		let buffBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceBtnBuff",this.buffBtnHandler,this);
		buffBtn.x = buttombg.x + buttombg.width/2 - rankBtn.width/2;
		buffBtn.y = rankBtn.y;
		this.addChildToContainer(buffBtn);

		let rewardBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceBtnReward",this.rewardBtnHandler,this);
		rewardBtn.x = buttombg.x + buttombg.width/2 + 202 - rankBtn.width/2; 
		rewardBtn.y = rankBtn.y 
		this.addChildToContainer(rewardBtn);

		let rect = new egret.Rectangle(0,0,622, buttombg.y - 10);
		let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
		this._scrollView = ComponentManager.getScrollList(AllianceTaskScrollItem,list,rect);
		this._scrollView.y = -10;
		this._scrollView.x = GameConfig.stageWidth/2 - this._scrollView.width/2;
		this.addChildToContainer(this._scrollView);
	}

	protected rewardBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCETASKREWARDVIEW);
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
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"arena_bottom","progress_type1_yellow2","progress_type3_bg",
			"alliance_taskAttrbg1",
			"alliance_taskAttrbg2",
			"alliance_taskAttrbg3",
			"alliance_taskAttrbg4",
			"alliance_taskAttrWord1",
			"alliance_taskAttrWord2",
			"alliance_taskAttrWord3",
			"alliance_taskAttrWord4",
			"alliance_taskbg",
			"alliance_taskIcon1",
			"alliance_taskIcon2",
			"alliance_taskIcon3",
			"alliance_taskIcon4",
			"alliance_taskIcon5",
			"adult_lowbg",
			"achievement_state1",
			"isover",
			"alliance_task_statebg",
			"studyatk_upfnt","studyatk_uparrow"
		]);
	}

	public dispose():void
	{
		this._scrollView = null;
		super.dispose();
	}
}