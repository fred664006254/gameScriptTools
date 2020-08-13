/**
 * 来访列表
 * author qianjun
 * date 2017/10/31
 * @class AdultVisitRequestView
 */
class AdultVisitRequestView extends CommonView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;
	private _selectChildData:any;
	private _visitnumTxt : BaseTextField;

	public constructor() 
	{
		super();
	}

	protected getTitleStr():string{
		return "adultvisit";
	}

	public initView():void
	{		
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH,this.doRefresh,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_REFUSEVISIT),this.refuseVisitCallback,this);


		let inBg = BaseBitmap.create("public_9v_bg02");
		inBg.width = GameConfig.stageWidth;
		inBg.height = GameConfig.stageHeigth - this.container.y-10;
		this.addChildToContainer(inBg);

		let arena_bottom = BaseBitmap.create("adult_lowbg");
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom, arena_bottom, this);
		this.addChild(arena_bottom);

		let bottomBg = BaseBitmap.create("public_9v_bg03");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth -this.container.y+20;
		bottomBg.x = 0;
		bottomBg.y = this.container.y - 20;
		this.addChild(bottomBg);


		let rect = egret.Rectangle.create();
		rect.setTo(0,5,GameConfig.stageWidth - 14, GameConfig.stageHeigth - this.container.y - arena_bottom.height - 10);
		this._scrollList = ComponentManager.getScrollList(AdultMarryRequestScrollItem,null,rect);
		this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
		this._scrollList.y = 5;
		this.addChildToContainer(this._scrollList);
		// this.container.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, bottomBg, [0,5]);

		this._scrollList.setEmptyTip(LanguageManager.getlocal("adultnovisit") )
		// //一键拒绝
		// let allMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"adultMarryRequestRefuseAll",this.refuseAllHandler,this);
		// this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allMarryBtn, arena_bottom);
		// // allMarryBtn.
		// this.addChild(allMarryBtn);
		// allMarryBtn.setColor(TextFieldConst.COLOR_BLACK);
		let visitnum = Api.adultVoApi.getVisitNum();
		let visitnumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultvisitnum', [visitnum.toString(), Config.SadunCfg.maxReception.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, visitnumTxt, arena_bottom);
		// visitnumTxt.x = GameConfig.stageWidth/2 - visitnumTxt.width/2 ;
		// visitnumTxt.y = GameConfig.stageHeigth - 50;
		this._visitnumTxt = visitnumTxt;
		this.addChild(visitnumTxt);

		this.request(NetRequestConst.REQUEST_SADUN_GETINFO,null);
	}


	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(!data.ret ){
			return;
		}
		// if(data.data && data.data.data&&data.data.data.minfo)
		// {
		// 	this.param.data.confirmCallback2.apply(this.param.data.handler,[1]);
		// }
		// else
		// {
		// 	this.param.data.confirmCallback2.apply(this.param.data.handler,[2]);
		// }
	}
	private refreshHandler()
	{

	}

	private refuseVisitCallback(evt):void{
		//App.CommonUtil.showTip(LanguageManager.getlocal('adultrefusereceive'), []);
	}

	//拒绝某个联姻
	private doRefuse(event:egret.Event)
	{
		this._selectChildData = event.data;
		// ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id,confirmCallback: this.selectMarryHander, handler: this });
		this.request(NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE, { aid: event.data.id,isBatch:0 });
	}

	//选择某个联姻
	private doChoose(event:egret.Event)
	{
		this._selectChildData = event.data;
		ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSECHILDVIEW, { childInfo: event.data.childInfo,confirmCallback: this.selectMarryHander, handler: this });
		
	}

	//刷新列表
	private doRefresh(event:egret.Event)
	{
		let view = this;
		let info = Api.adultVoApi.getVisitRequestList();
		let arr = [];
		for(let i in info){
			let unit = info[i];
			arr.push({
				id : unit.childId,
				visittype : true,
				sex : unit.sex,
				aquality : unit.aquality,
				name : unit.cname,
				fatherName : unit.fname,
				uid : i,
				pro : 1,
				et : unit.end_ts,
				attr : unit.attr,
				total : unit.attr[0] + unit.attr[1] + unit.attr[2] + unit.attr[3]
			});
		}
		arr.sort((a,b)=>{
			return a.et - b.et;
		});
		this._scrollList.refreshData(arr);
		this._visitnumTxt.text = LanguageManager.getlocal('adultvisitnum', [Api.adultVoApi.getVisitNum().toString(), Config.SadunCfg.maxReception.toString()]);
		//this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);
	}

	//选好了道具
	private selectMarryHander(type:number)
	{
		this.doRefresh(null);
	}


	private refuseAllHandler()
	{
		if(!this._scrollList.getItemByIndex(0)){
			App.CommonUtil.showTip(LanguageManager.getlocal("adultEmptyTip2"));
			return ;
		}
		this.request(NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE, { isBatch:1 });
	}


	private marryOneHandler()
	{
		
		// ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id,confirmCallback: this.chooseOneCallBack, handler: this });
		// this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id });
	}
	private chooseAllCallBack(type:number)
	{
		// this.request(NetRequestConst.REQUEST_RADULT_PROPOSEALL, { childId: this._adultInfoVo.id ,protype:type});
		
	}
	private chooseOneCallBack(type:number)
	{
		// App.LogUtil.log(type);
		
	}

	public hide():void
	{
		super.hide();
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"adult_lowbg",
		]);
	}

	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["wifeViewTab1Title",
	// 			"wifeViewTab2Title"
	// 	];
	// }

	// protected getRuleInfo():string
	// {
	// 	return "wife_description";
	// }

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH,this.doRefresh,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_REFUSEVISIT),this.refuseVisitCallback,this);
		// 未婚滑动列表
		this._scrollList = null;
		this._selectChildData = null;
		this._visitnumTxt = null;
		super.dispose();
	}
}