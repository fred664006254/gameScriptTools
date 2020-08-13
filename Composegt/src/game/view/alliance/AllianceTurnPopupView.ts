/**
 * 成员列表
 * author dky
 * date 2017/11/30
 * @class AllianceTurnPopupView
 */
class AllianceTurnPopupView extends PopupView
{
	// 滑动列表
	private _scrollList: ScrollList;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _curTabIdx=0;

	// private _applyData :any;
	private _index:number = 0;
	private _allianceVo :AllianceVo;


	// private _punishRewardList: any = {};

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_TRANSFER,this.doApply,this);
		// this._rankData = this.param.data.acData;
		this._allianceVo = Api.allianceVoApi.getAllianceVo();


		let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 530;
        bg1.height = 544;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 60;
        this.addChildToContainer(bg1);

		let numStr = LanguageManager.getlocal("alliance_wealth",[this._allianceVo.wealth.toString()]) ;
		let memberText = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		memberText.x = 50;
		memberText.y = 20;
		this.addChildToContainer(memberText);

		let costStr = LanguageManager.getlocal("alliance_turnCost",["10000"]) ;
		let costText = ComponentManager.getTextField(costStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		costText.x = memberText.x;
		costText.y = bg1.y + bg1.height + 10;
		this.addChildToContainer(costText);

		let obStr = LanguageManager.getlocal("alliance_turnObject") ;
		let obText = ComponentManager.getTextField(obStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		obText.x = memberText.x;
		obText.y = costText.y + costText.height + 10;
		this.addChildToContainer(obText);
		
		// let applyData = Api.allianceVoApi.getMyAllianceVo().apply;
		let dataList = Api.allianceVoApi.getAllianceTurnVoList();

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg1.width - 20,bg1.height - 20);
		this._scrollList = ComponentManager.getScrollList(AllianceTurnScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
		this._scrollList.x = bg1.x + 10;
		this._scrollList.y = bg1.y + 10;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceTurnTip"));
		


	}

	private refuseAllHandler()
	{
		if(!this._scrollList.getItemByIndex(0)){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTip"));
			return ;
		}
		this.request(NetRequestConst.REQUEST_ALLIANCE_REFUSEALLAPPLY, { });
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
		if (data.data.data.allianceFlag == 1 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
			this.hide();
			return;
		}
		if (data.data.data.allianceFlag == 2 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg2"));
			return;
		}
		if (data.data.data.allianceFlag == 3 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
			return;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETMEMBER)
		{
			// this._applyData  = data.data.data.allianceapply;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_TRANSFER)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_turnSuccess"));
			this.hide();
		}

	}
	private doApply(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ALLIANCE_TRANSFER,{auid:event.data.auid});
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
	protected getTitleStr(){

        return "alliance_changePo1";
    }


	public dispose():void
	{

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_TRANSFER,this.doApply,this);
		// 未婚滑动列表
		this._scrollList = null;

		this._timeTF = null;

		this._selectChildData = null;
		this._allianceVo = null;
		this._index = null;
		this._curTabIdx = null;


		super.dispose();
	}
}