/**
 * 提亲请求列表
 * author dky
 * date 2017/10/31
 * @class AdultMarryRequestView
 */
class AdultMarryRequestView extends CommonView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;


	private _confirmCallback:Function;
	private _handler:any;

	private _timeTF:BaseTextField;

	private _selectChildData:any;

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CLOSECHOOSE,this.hide,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY,this.doRefuse,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD,this.doChoose,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY,this.doRefresh,this);


		this._handler = this.param.data.handler;
		this._confirmCallback = this.param.data.confirmCallback;

		this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);

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


		// let gemBgIcon = BaseBitmap.create("public_hb_bg01");
		// gemBgIcon.x = 230;
		// gemBgIcon.y = 21;
		// this.addChildToContainer(gemBgIcon);

		// let gemBg = BaseLoadBitmap.create("itemicon1");
		// gemBg.setScale(0.5);
		// gemBg.x = 230;
		// gemBg.y = gemBgIcon.y + gemBgIcon.height/2 - 100/2 + 23;
		// this.addChildToContainer(gemBg);

		// let gem = Api.playerVoApi.getPlayerGem();
		// let gemText = ComponentManager.getTextField(gem.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		// gemText.x = 280;
		// gemText.y = gemBgIcon.y + gemBgIcon.height/2 - gemText.height/2;
		// this.addChildToContainer(gemText);


		// let bottomBg = BaseBitmap.create("public_tc_bg01");
		// bottomBg.width = 520;
		// bottomBg.height = GameConfig.stageHeigth - 500;
		// bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;

		// bottomBg.y = 75;
		// this.addChildToContainer(bottomBg);


		

		// let requestList = 
		// [
		// 	{aid:111,uid:111,childId:"c12",fatherName:"111",aquality:7,name:"111",needGem:111,needItemId:"1401"},
		// 	{aid:111,uid:111,childId:"c12",fatherName:"222",aquality:7,name:"222",needGem:111,needItemId:"1401"},
		// 	{aid:111,uid:111,childId:"c12",fatherName:"333",aquality:7,name:"333",needGem:111,needItemId:"1401"},
		// 	{aid:111,uid:111,childId:"c12",fatherName:"444",aquality:7,name:"444",needGem:111,needItemId:"1401"},
		// 	{aid:111,uid:111,childId:"c12",fatherName:"555",aquality:7,name:"555",needGem:111,needItemId:"1401"}

		// ]
		
	
		

		let rect = egret.Rectangle.create();
		// rect.setTo(0,0,508,bottomBg.height - 20);
		// rect.setTo(0,5,GameConfig.stageWidth - 14,bottomBg.height - 20);
		rect.setTo(0,5,GameConfig.stageWidth - 14, GameConfig.stageHeigth - this.container.y - arena_bottom.height - 10);
		this._scrollList = ComponentManager.getScrollList(AdultMarryRequestScrollItem,null,rect);
		this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(bottomBg.x + 5 ,bottomBg.y + 10);
		// this.container.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, bottomBg, [0,5]);
		this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
		this._scrollList.y = 5;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyTip2") )

		


		//一键拒绝
		let allMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"adultMarryRequestRefuseAll",this.refuseAllHandler,this);
		allMarryBtn.x = bottomBg.x + bottomBg.width/2 - allMarryBtn.width/2;
		allMarryBtn.y = bottomBg.y + bottomBg.height + 12;
		// allMarryBtn.
		this.addChildToContainer(allMarryBtn);
		// allMarryBtn.setColor(TextFieldConst.COLOR_BLACK);



	}


	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(!data.ret ){
			return;
		}
		if (data.data.cmd == NetRequestConst.REQUEST_RADULT_GETPROPOSEE) {
			this._scrollList.refreshData(data.data.data.minfo)
		}
		else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE) {
			this._scrollList.refreshData(data.data.data.minfo)
		}
		if(data.data && data.data.data&&data.data.data.minfo)
		{
			this.param.data.confirmCallback2.apply(this.param.data.handler,[1]);
		}
		else
		{
			this.param.data.confirmCallback2.apply(this.param.data.handler,[2]);
		}
	}
	private refreshHandler()
	{

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
		this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);
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

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"adult_middlebg",
					]);
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY,this.doRefuse,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD,this.doChoose,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY,this.doRefresh,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CLOSECHOOSE,this.hide,this);
		// 未婚滑动列表
		this._scrollList = null;


		this._confirmCallback = null;
		this._handler = null;

		this._timeTF = null;

		this._selectChildData = null;
		super.dispose();
	}
}