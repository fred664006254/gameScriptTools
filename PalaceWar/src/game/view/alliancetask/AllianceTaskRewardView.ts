/**
 *帮会任务奖励
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskRewardView
 */
class AllianceTaskRewardView extends PopupView
{

	private _scrollView:ScrollList = null;
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		let rect = new egret.Rectangle(0,0,530, 565 );
		// let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
		let list = Api.allianceTaskVoApi.getNormalTaskList();
		this._scrollView = ComponentManager.getScrollList(AllianceTaskRewardScrollItem,list,rect);
		this._scrollView.y = 10;
		this._scrollView.x = this.viewBg.width/2 - this._scrollView.width/2;
		this.addChildToContainer(this._scrollView);

		let tipbg = BaseBitmap.create("public_searchdescbg");
		tipbg.width = 500;
		tipbg.x = this.viewBg.width/2 - tipbg.width/2;
		tipbg.y = 610;
		// tipbg.x = this.viewBg.width/2 - tipbg.width/2;

		this.addChildToContainer(tipbg);

		let tipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.text = LanguageManager.getlocal("alliancetask_rewardTip");
		tipTxt.lineSpacing = 6;
		tipTxt.x = this.viewBg.width/2  - tipTxt.width/2 ;
		tipTxt.y = tipbg.y + tipbg.height/2 - tipTxt.height/2 ;
        this.addChildToContainer(tipTxt);
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{

	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		// return {requestType:NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE,requestData:{}};
		return null;
	}

	protected getRuleInfo():string
	{
		return "alliancetask_getRewardRuleInfo";
	}
	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	protected getShowHeight():number
	{
		return 660;
	}


	public dispose():void
	{
		this._scrollView = null;
		super.dispose();
	}
}