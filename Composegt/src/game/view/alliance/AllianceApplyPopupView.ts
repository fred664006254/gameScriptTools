/**
 * 申请
 * author dky
 * date 2017/11/29
 * @class AllianceApplyPopupView
 */
class AllianceApplyPopupView extends PopupView
{
	// 滑动列表
	private _scrollList: ScrollList;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _curTabIdx=0;

	private _applyData :any;
	private _index:number = 0;
	private _allianceVo :AllianceVo;

	private _soundBB:BaseBitmap;
	private _soundState:BaseTextField;
	private _soundText:BaseTextField;
	private _type:string = "";

	// private _punishRewardList: any = {};
	private _applyTxt:BaseTextField;

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_AGREEAPPLY,this.doApply,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_REFUSEAPPLY,this.doCancel,this);
		// this._rankData = this.param.data.acData;
		this._allianceVo = Api.allianceVoApi.getAllianceVo();


		let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 530;
        bg1.height = 600;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 60;
        this.addChildToContainer(bg1);


		this._soundText = ComponentManager.getTextField(LanguageManager.getlocal("allianceJoinTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._soundText.x = 50;
		this._soundText.y = 20;
		this.addChildToContainer(this._soundText);


		this._soundBB = BaseBitmap.create("btn_swicth");
		this._soundBB.x = this._soundText.x + this._soundText.width + 10;
		this._soundBB.y = this._soundText.y + this._soundText.height/2 - this._soundBB.height/2;
		this.addChildToContainer(this._soundBB);
		this._soundBB.addTouchTap(this.sonndHander,this);
		// this._soundBB.addTouch(this.sonndHander,this,null);	


		this._soundState = ComponentManager.getTextField("ON", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._soundState.x = this._soundBB.x + 15;;
		this._soundState.y = this._soundBB.y + this._soundBB.height/2 - this._soundState.height/2;
		this.addChildToContainer(this._soundState);

		// this._type = LocalStorageManager.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
		let color = TextFieldConst.COLOR_WARN_GREEN2;
		if(this._allianceVo.switch == 0){
			this._type = "ON";
		}
		else{
			this._type = "OFF";
		}
		if(this._type == ""){
			this._type = "ON";
		}
		if(this._type != "ON"){
			this._soundBB.skewY = 180;
			this._soundBB.x = this._soundBB.x + this._soundBB.width;
			this._soundState.x = this._soundBB.x - 50;
			color = TextFieldConst.COLOR_WHITE;
		}else{
			
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;

		
		// let applyData = Api.allianceVoApi.getMyAllianceVo().apply;
		let dataList = this._applyData;

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg1.width - 10,bg1.height - 70);
		this._scrollList = ComponentManager.getScrollList(AllianceApplyScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
		this._scrollList.x = bg1.x + 10;
		this._scrollList.y = bg1.y + 10;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceApplyTip"));

		let rankeStr  = "";
		if(dataList.length){
			rankeStr = LanguageManager.getlocal("allianceApplyPopupApplyNum") + dataList.length;
		}
		else{
			rankeStr = LanguageManager.getlocal("allianceApplyPopupApplyNum") + 0;
		}
		
		this._applyTxt = ComponentManager.getTextField(rankeStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        this._applyTxt.x = bg1.x + 20;
        this._applyTxt.y = bg1.y + bg1.height  + 30;
        this.addChildToContainer(this._applyTxt);

		//一键拒绝
		let allMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"adultMarryRequestRefuseAll",this.refuseAllHandler,this);
		allMarryBtn.x = bg1.x + bg1.width - allMarryBtn.width - 30;
		allMarryBtn.y = bg1.y + bg1.height + 12;
		// allMarryBtn.
		this.addChildToContainer(allMarryBtn);
		// allMarryBtn.setColor(TextFieldConst.COLOR_BLACK);
		

	}

	private refuseAllHandler()
	{
		if(!this._scrollList.getItemByIndex(0)){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTip"));
			return ;
		}
		this.request(NetRequestConst.REQUEST_ALLIANCE_REFUSEALLAPPLY, { });
	}
	private sonndHander(param:any):void
	{
		let switch1 = 0;
		let color = TextFieldConst.COLOR_WARN_GREEN2;
		if(this._type == "" || this._type == "ON" ){
			this._type = "OFF";
		}
		else{
			this._type = "ON";
		}
		// LocalStorageManager.set(LocalStorageConst.LOCAL_SOUND_SWITCH,this._type);
		if(this._type != "ON"){
			this._soundBB.skewY = 180;
			this._soundBB.x = this._soundBB.x + this._soundBB.width;
			this._soundState.x = this._soundBB.x - 50;
			color = TextFieldConst.COLOR_WHITE;
			switch1 = 1;
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceJoinTip2"));
		}else{
			this._soundBB.skewY = 0;
			this._soundBB.x = this._soundText.x + this._soundText.width + 10;
			this._soundState.x = this._soundBB.x + 15;
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceJoinTip1"));
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;
		this.request(NetRequestConst.REQUEST_ALLIANCE_SETSWITCH,{switch:switch1});
	}
	/**
	 * 获取
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_ALLIANCE_GETALLIANCEAPPLY,requestData:{}};
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
			this.hide();
			return;
		}
		if (data.data.data.allianceFlag == 3 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
			this.hide();
			return;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETALLIANCEAPPLY)
		{
			this._applyData  = data.data.data.allianceapply;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_ACCEPT)
		{
			this._applyData  = data.data.data.allianceapply;
			this._scrollList.refreshData(this._applyData);
		}
		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_REFUSEAPPLY)
		{
			this._applyData  = data.data.data.allianceapply;
			this._scrollList.refreshData(this._applyData);
		}

		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_REFUSEALLAPPLY)
		{
			this._applyData  = [];
			this._scrollList.refreshData(this._applyData);
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTip2"));
		}

		if(data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_SETSWITCH)
		{
		
		}

		let rankeStr  = "";
		if(this._applyData && this._applyData.length){
			rankeStr = LanguageManager.getlocal("allianceApplyPopupApplyNum") + this._applyData.length;
		}
		else{
			rankeStr = LanguageManager.getlocal("allianceApplyPopupApplyNum") + 0;
		}
		if(this._applyTxt){
			this._applyTxt.text = rankeStr;
		}
		
	}
	private doApply(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ALLIANCE_ACCEPT,{auid:event.data.uid});
	}
	private doCancel(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ALLIANCE_REFUSEAPPLY,{auid:event.data.uid});
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

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE,this.doApply,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE,this.doCancel,this);
		// 未婚滑动列表
		this._scrollList = null;

		this._timeTF = null;

		this._selectChildData = null;
		this._allianceVo = null;
		this._index = null;
		this._soundBB = null;
		this._soundState = null;
		this._type = "";
		this._selectChildData = null;
		this._curTabIdx=0;

		this._applyData = null;

		super.dispose();
	}
}