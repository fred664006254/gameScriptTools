/**
 * 提亲请求列表
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

		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY,this.doRefuse,this);

		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD,this.doChoose,this);

		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY,this.doRefresh,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH,this.doRefresh,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_REFUSEVISIT),this.refuseVisitCallback,this);
		//this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);
		// let gemBgIcon = BaseBitmap.create("public_9_resbg");
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

		let arena_bottom = BaseBitmap.create("arena_bottom");
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom, arena_bottom, this);
		this.addChild(arena_bottom);

		let bottomBg = BaseBitmap.create("public_9_bg23");
		bottomBg.width = GameConfig.stageWidth - 10;
		bottomBg.height = GameConfig.stageHeigth - this.container.y - arena_bottom.height;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2
		bottomBg.y = 0;
		// this.addChildToContainer(bottomBg);

		// let arr = [];
		// let info = Api.adultVoApi.getVisitRequestList();

		// for(let i in info){
		// 	let unit = info[i];
		// 	arr.push({
		// 		id : unit.childId,
		// 		visit : true,
		// 		sex : unit.sex,
		// 		aquality : unit.aquality,
		// 		name : unit.cname,
		// 		fatherName : unit.fname,
		// 		uid : i,
		// 		pro : 1,
		// 		et : unit.end_ts,
		// 		total : unit.attr[0] + unit.attr[1] + unit.attr[2] + unit.attr[3],
		// 	});
		// }

		let rect = egret.Rectangle.create();
		rect.setTo(0,5,GameConfig.stageWidth - 14,bottomBg.height - 20);
		this._scrollList = ComponentManager.getScrollList(AdultMarryRequestScrollItem,null,rect);
		this.addChildToContainer(this._scrollList);
		this.container.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, bottomBg, [0,5]);

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
		if(evt.data.ret){
			App.CommonUtil.showTip(LanguageManager.getlocal('adultrefusereceive', Api.adultVoApi.param));
		}
		
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