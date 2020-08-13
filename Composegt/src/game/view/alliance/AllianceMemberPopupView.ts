/**
 * 成员列表
 * author dky
 * date 2017/11/30
 * @class AllianceMemberPopupView
 */
class AllianceMemberPopupView extends PopupView
{
	// 滑动列表
	private _scrollList: ScrollList;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _curTabIdx=0;

	// private _applyData :any;
	private _index:number = 0;
	private _allianceVo :AllianceVo;
	private _memberText:BaseTextField;


	// private _punishRewardList: any = {};

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_EXITALLIANCE,this.doQuit,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_KICKALLIANCE,this.doRefresh,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE,this.quitAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.quitAlliance,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_DISBAND,this.quitAlliance,this);
		// this._rankData = this.param.data.acData;
		this._allianceVo = Api.allianceVoApi.getAllianceVo();


		let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 530;
        bg1.height = 600;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 60;
        this.addChildToContainer(bg1);

		let numStr = LanguageManager.getlocal("allianceMemberNum") + this._allianceVo.mn + "/" + this._allianceVo.maxmn;
		this._memberText = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._memberText.x = 50;
		this._memberText.y = 20;
		this.addChildToContainer(this._memberText);
		
		// let applyData = Api.allianceVoApi.getMyAllianceVo().apply;
		let dataList = Api.allianceVoApi.getAllianceMemberInfoVoList();

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg1.width - 20,bg1.height - 20);
		this._scrollList = ComponentManager.getScrollList(AllianceMemberScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
		this._scrollList.x = bg1.x + 10;
		this._scrollList.y = bg1.y + 10;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceApplyTip"));

	}

	private refuseAllHandler()
	{
		if(!this._scrollList.getItemByIndex(0)){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTip"));
			return ;
		}
		this.request(NetRequestConst.REQUEST_ALLIANCE_REFUSEALLAPPLY, { });
	}
	private quitAlliance()
	{
		this.hide();
		
	}
	/**
	 * 获取
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_ALLIANCE_GETMEMBER,requestData:{}};
	}
		//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(data.data.ret < 0){
			return;
		}
		
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETMEMBER)
		{
			// this._applyData  = data.data.data.allianceapply;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE)
		{
			this.hide();
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceMemberQuitSuccess"));			
			
		}
		
	}

	private doRefresh()
	{
		let dataList = Api.allianceVoApi.getAllianceMemberInfoVoList();
		this._scrollList.refreshData(dataList);
		let numStr = LanguageManager.getlocal("allianceMemberNum") + this._allianceVo.mn + "/" + this._allianceVo.maxmn;
		this._memberText.text = numStr;
	}
	private doQuit(event:egret.Event){
		// let data  = event.data;
		// this._index = data.index;
		this.request(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE,{});

	}


	private rankBtnClick()
	{

	}

	protected tabBtnClickHandler(params:any)
    {
        this._curTabIdx = params.index
        this.refreshRankList();
    }
    protected refreshRankList()
    {
	}


	public hide():void
	{
		super.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"dinner_rankbg","dinnerrankpopupview",
					]);
	}


	public dispose():void
	{

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_EXITALLIANCE,this.doQuit,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_KICKALLIANCE,this.doRefresh,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE,this.quitAlliance,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.quitAlliance,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_DISBAND,this.quitAlliance,this);
		// 未婚滑动列表
		this._scrollList = null;

		this._timeTF = null;

		this._selectChildData = null;
		this._allianceVo = null;
		this._index = null;
		this._curTabIdx = 0;
		this._memberText = null;


		super.dispose();
	}
}