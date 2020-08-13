/**
 * 选择门客弹板
 * author dmj
 * date 2017/9/28
 * @class ServantSelectedPopupView
 */
class ServantSelectedPopupView extends PopupView
{
	/**使用道具时 */
	public static TYPE_USE_ITEM:number = 1;
	/**战斗时 */
	public static TYPE_BATTLE:number = 2;
	/**学习时 */
	public static TYPE_STUDY:number = 3;

	/**
	 * 战斗，可以恢复一次
	 */
	public static TYPE_BATTLE_REC1:number=4;
	/**帮会  */
	public static TYPE_ALLIANCE:number =5 ;
	/**围剿鳌拜 */
	public static TYPE_WIPEBOSS:number = 7;

	public static TYPE_CROSSSERVERWIPEBOSS:number = 8

	public static USE_TYOE_ITEMID:number = 0;
	// 道具id	
	private _itemId:number = 0;
	private _nameTF:BaseTextField = null;
	private _scrollList:ScrollList = null;
	private _callback:Function = null;
	private _handler:any = null;
	private _selectedServantId:number = 0;
	private _index:number;
	private _type:number = 0;
	public constructor() 
	{
		super();
		
	}

	private getType():number
	{
		return Number(this.param.data.type);
	}

	protected getResourceList():string[]
	{
		let resArr:string[]=["popupview_bg3","popupview_bg4","popupview_bg5"];
		if(this.getType()==ServantSelectedPopupView.TYPE_BATTLE||this.getType()==ServantSelectedPopupView.TYPE_BATTLE_REC1||this.getType()==ServantSelectedPopupView.TYPE_ALLIANCE||this.getType()==ServantSelectedPopupView.TYPE_WIPEBOSS||this.getType()==ServantSelectedPopupView.TYPE_CROSSSERVERWIPEBOSS)
		{
			resArr.push("boss_gotowar");
		}
		return super.getResourceList().concat(resArr);
	}
	/**
	 * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
	 */
	protected initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_SERVANT,this.clickItemHandler,this);
		



		this._callback = this.param.data.callback;
		this._handler = this.param.data.handler;
		let type:number = Number(this.param.data.type);
		this._type = type;
		let msgName:string = "";
		let msgDesc:string = "";
		if(type == ServantSelectedPopupView.TYPE_USE_ITEM)
		{
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useCallback,this);
			this._itemId = Number(this.param.data.itemId);
			ServantSelectedPopupView.USE_TYOE_ITEMID = this._itemId;
			let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(this._itemId);
			msgName = itemInfoVo.name + "x" + itemInfoVo.num;
			msgDesc = itemInfoVo.desc;
		}
		else if(type == ServantSelectedPopupView.TYPE_BATTLE)
		{

		}
		else if(type==ServantSelectedPopupView.TYPE_BATTLE_REC1)
		{

		}
		else if(type == ServantSelectedPopupView.TYPE_STUDY)
		{

		}
		else if(type == ServantSelectedPopupView.TYPE_ALLIANCE)
		{

		}
		let startY = 20;

		let newTitleBg = BaseBitmap.create("popupview_bg3");
		newTitleBg.x = this.viewBg.width/2 - newTitleBg.width/2;
		newTitleBg.y = this.viewBg.y-5;
		newTitleBg.name = "newTitleBg";
		
		let baseH = 740;
		this.addChildToContainer(newTitleBg);

		if(msgName || msgDesc){


			let newLine = BaseBitmap.create("popupview_bg5");
			let newRedBg = BaseBitmap.create("popupview_bg4");
			newLine.name = "newLine";
			newRedBg.name = "newRedBg";
			newLine.width = newRedBg.width;
			newLine.x = this.viewBg.width/2 - newLine.width/2;
			newLine.y = newTitleBg.y + 10;

			newRedBg.x = this.viewBg.width/2 - newRedBg.width/2;
			newRedBg.y = newLine.y;
			this.addChildToContainer(newLine);
			this.addChildToContainer(newRedBg);
			startY += 50;
			baseH += 50;
		}
		newTitleBg.height = baseH;
		if(msgName)
		{

			this._nameTF = ComponentManager.getTextField(msgName,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._nameTF.x = 55;
			this._nameTF.y = 30;
			this._nameTF.setColor(TextFieldConst.COLOR_WARN_YELLOW_NEW);
			this.addChildToContainer(this._nameTF);
		}
		if(msgDesc)
		{



			let descTF = ComponentManager.getTextField(msgDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			descTF.textAlign = TextFieldConst.ALIGH_RIGHT;
			descTF.x = this.viewBg.width - 55 - descTF.width;
			descTF.y = 30;
			descTF.setColor(TextFieldConst.COLOR_WARN_YELLOW_NEW);
			this.addChildToContainer(descTF);
		}
		// let baseBg = BaseBitmap.create("popupview_bg3");
		// baseBg.height = 700;
		// baseBg.x = this.viewBg.width/2 - baseBg.width/2;
		// baseBg.y = -3;
		// baseBg.visible = false;
		// this.addChildToContainer(baseBg);
		// let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		// bg.width = 520;
		// bg.height = 640;
		// bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		// bg.y = 45;
		// this.addChildToContainer(bg);
		// bg.visible = false;
		// if (!msgName && !msgDesc ) 
		// {
		// 	bg.height += 40;
		// 	bg.y -= 40;
		// }

		let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,524,700);
		/*
		if(type == ServantSelectedPopupView.TYPE_BATTLE)
		{
			this._scrollList = ComponentManager.getScrollList(BossSelectedScrollItem,this.param.data.info,rect);
		}
		else if(type == ServantSelectedPopupView.TYPE_BATTLE_REC1)
		{
			this._scrollList = ComponentManager.getScrollList(BossRecSelectedScrollItem,this.param.data.info,rect);
		}
		else if(type == ServantSelectedPopupView.TYPE_ALLIANCE)
		{
			this._scrollList = ComponentManager.getScrollList(AllianceBossSelectScrollItem,this.param.data.info,rect);
		}
		else {
			this._scrollList = ComponentManager.getScrollList(ServantSelectedScrollItem,servantInfoVoList,rect);
		}
		*/
		switch(type){
			case ServantSelectedPopupView.TYPE_BATTLE:
				// baseBg.visible = true;
				// bg.visible = false;
				this._scrollList = ComponentManager.getScrollList(BossSelectedScrollItem,this.param.data.info,rect);
				break;
			case ServantSelectedPopupView.TYPE_BATTLE_REC1:
				this._scrollList = ComponentManager.getScrollList(BossRecSelectedScrollItem,this.param.data.info,rect);
				break;
			case ServantSelectedPopupView.TYPE_ALLIANCE:
				this._scrollList = ComponentManager.getScrollList(AllianceBossSelectScrollItem,this.param.data.info,rect);
				break;
			case ServantSelectedPopupView.TYPE_WIPEBOSS:
				this._scrollList = ComponentManager.getScrollList(AcWipeBossSelectScrollItem,this.param.data.info,rect,this.param.data.code);
				break;
			case ServantSelectedPopupView.TYPE_CROSSSERVERWIPEBOSS:
				this._scrollList = ComponentManager.getScrollList(AcCrossServerWipeBossSelectScrollItem,this.param.data.info,rect,this.param.data.code);
				break;
			default:
				this._scrollList = ComponentManager.getScrollList(ServantSelectedScrollItem,servantInfoVoList,rect);
				break;
		}
		
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(this.viewBg.width/2 - this._scrollList.width/2,startY);
	}

	/** 发送请求返回数据后，对数据进行刷新 */
	private useCallback(event:egret.Event):void
	{
		
		if(this._type == ServantSelectedPopupView.TYPE_USE_ITEM)
		{
			let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(this._itemId);
			this._nameTF.text = itemInfoVo.name + "x" + itemInfoVo.num;
			let curItemScrollItem = <ItemScrollItem>this._scrollList.getItemByIndex(this._index);
			curItemScrollItem.update();
		}
		
	}
	/**点击具体门客按钮事件 */
	private clickItemHandler(event:egret.Event):void
	{
		let data = event.data;
		this._index = Number(data.index);
		this._selectedServantId = Number(data.id);

		switch(this._type){
			case ServantSelectedPopupView.TYPE_USE_ITEM:
				let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(this._itemId);
				if(itemInfoVo.num >= ItemView.MAX_NUM)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:itemInfoVo.id,callback:this.callbackHandler,handler:this});
				}
				else
				{
					if(itemInfoVo.num <= 0)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
					}
					else
					{
						this.callbackHandler(1,this._itemId);
					}
				}
				break;

			case ServantSelectedPopupView.TYPE_BATTLE:
			case ServantSelectedPopupView.TYPE_BATTLE_REC1:
			case ServantSelectedPopupView.TYPE_ALLIANCE:
			case ServantSelectedPopupView.TYPE_WIPEBOSS:
			case ServantSelectedPopupView.TYPE_CROSSSERVERWIPEBOSS:
				this._callback.apply(this._handler,[data]);
				this.hide();
				break; 
			case ServantSelectedPopupView.TYPE_STUDY:
				this._callback.apply(this._handler,data);
				break;
		}
		/*
		if(this._type == ServantSelectedPopupView.TYPE_USE_ITEM)
		{
			let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(this._itemId);
			if(itemInfoVo.num >= ItemView.MAX_NUM)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:itemInfoVo.id,callback:this.callbackHandler,handler:this});
			}
			else
			{
				if(itemInfoVo.num <= 0)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
				}
				else
				{
					this.callbackHandler(1,this._itemId);
				}
			}
		}
		else if(this._type == ServantSelectedPopupView.TYPE_BATTLE||this._type == ServantSelectedPopupView.TYPE_BATTLE_REC1||this._type == ServantSelectedPopupView.TYPE_ALLIANCE)
		{
			this._callback.apply(this._handler,[data]);
			this.hide();
		}
		else if(this._type == ServantSelectedPopupView.TYPE_STUDY)
		{
			// 
			this._callback.apply(this._handler,data);
		}
		*/
	}

	/**回调函数处理，使用道具时会用 */
	private callbackHandler(itemNum:number,itemId:number):void
	{
		let data = {};
		if(this._type == ServantSelectedPopupView.TYPE_USE_ITEM)
		{
			data = [itemNum,itemId,this._selectedServantId];
			
		}
		this._callback.apply(this._handler,data);
	}

	protected getBgExtraHeight():number
	{
		// return 40;
		return 19;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SELECTED_SERVANT,this.clickItemHandler,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useCallback,this);
		this._itemId = 0;
		this._nameTF = null;
		this._scrollList = null;
		this._callback =null;
		this._handler =null;
		this._selectedServantId = 0;	
		this._index = 0;
		this._type = 0;
		super.dispose();
	}
}