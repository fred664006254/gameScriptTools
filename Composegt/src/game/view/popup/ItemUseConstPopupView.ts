/**
 * 确认取消弹板
 * author dmj
 * date 2017/10/10
 * @class ItemUseConstPopupView
 */
class ItemUseConstPopupView extends PopupView
{
	private _cancelCallback:Function;
	private _confirmCallback:Function;
	private _handler:any;
	private _cancelBtn:BaseButton;
	public constructor() 
	{
		super();
	}
	// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 30;
	}

	protected initView():void
	{
		let data = this.param.data;
		let itemid = data.id;
		if(data.cancelCallback)
		{
			this._cancelCallback = data.cancelCallback;
		}
		
		this._confirmCallback = data.confirmCallback;
		this._handler = data.handler;
		let iconPic:string = data.icon;
		let iconBg:string = data.iconBg;
		let msg:string = data.msg;
		let num = data.num;
		let useNum = data.useNum || 0;

		let bg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg.width = 520;
		// bg.height = 284;
		bg.height = 350;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 15;
		this.addChildToContainer(bg);

		// let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		// bg2.width = 510;
		// bg2.height = 134;
		// bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
		// bg2.y = bg.y + 10;
		// this.addChildToContainer(bg2);

		// let cor1 = BaseBitmap.create("public_tcdw_bg01");
		// cor1.x = bg2.x;
		// cor1.y = bg2.y;
		// this.addChildToContainer(cor1);

		// let cor2 = BaseBitmap.create("public_tcdw_bg02");
		// cor2.x = bg2.x + bg2.width-cor2.width;
		// cor2.y = bg2.y;
		// this.addChildToContainer(cor2);



		let itemB = BaseBitmap.create("itemview_daoju_bg02");
		itemB.x = this.viewBg.width/2 - itemB.width/2;
		itemB.y = bg.y + 5;
		this.addChildToContainer(itemB);

		let temX = itemB.x + itemB.width/2 - 50 -2;//this.viewBg.x + this.viewBg.width/2 - 50;
		let temY = itemB.y + itemB.height/2 - 50;//29;
		let temW = 100;
		let temH = 100;

		let itembg:BaseBitmap = BaseBitmap.create(iconBg);
		itembg.x = temX
		itembg.y = temY;
		this.addChildToContainer(itembg);
		//点击物品增加文字说明 添加物品iconitem
		let itemCfg : any  = Config.ItemCfg.getItemCfgById(Number(itemid));
		if(!itemCfg){
			itemCfg = GameData.getRewardItemVoByIdAndType(itemid);
		}
		let iconItem = GameData.getItemIcon(itemCfg,true);
		iconItem.x =  temX;
		iconItem.y =  temY;
		this.addChildToContainer(iconItem);
		//中间改为消耗数量
		let numTF:BaseTextField = ComponentManager.getTextField(useNum.toString(),TextFieldConst.FONTSIZE_ACTIVITY_COMMON);;
		numTF.x = temX + 98 - numTF.width;
		numTF.y = temY + 98 - numTF.height;
		this.addChildToContainer(numTF);
		//换行添加当前拥有数目
		let cur_have = LanguageManager.getlocal(num >= useNum ? "itemUseNewTip" : "itemUseNewTip2",[itemCfg.name,App.StringUtil.toString(num)]);
		msg += `\n${cur_have}`;
		let msgTF:BaseTextField = ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
		msgTF.width = 480;
		msgTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.y = temY + temH + 45;
		msgTF.lineSpacing = 10;
		this.addChildToContainer(msgTF);


		let line = BaseBitmap.create("public_line4");
		line.width = 460;
		line.x = this.viewBg.width/2 - line.width/2;
		line.y = (msgTF.y + msgTF.height + 20) > 264 ? msgTF.y + msgTF.height + 20: 264;//this._cancelBtn.y - 10 - line.height;
		this.addChildToContainer(line);

		this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_ORANGE,"cancelBtn",this.clickCancelHandler,this);
		this._cancelBtn.x = this.viewBg.x + this.viewBg.width/4 - this._cancelBtn.width/2+ 20;
		// this._cancelBtn.y = bg.y + bg.height + 15;
		this._cancelBtn.y = line.y + line.height + 15;//bg.y + bg.height - 18 - this._cancelBtn.height;
		// this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);

		bg.height = this._cancelBtn.y + this._cancelBtn.height + 20 - bg.y;
		
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
	}

	protected clickConfirmHandler(data:any):void
	{
		if(this.param.data.useNum && this.param.data.useNum > this.param.data.num)
		{
			if(this.param.data.icon == "itemicon1"){
				App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"))
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"))
			}
			
			this.hide();
			return;
		}
		App.LogUtil.log("clickConfirmHandler");
		if(this._confirmCallback)
		{
			this._confirmCallback.apply(this._handler,[]);
		}
		
		this.hide();
	}

	protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	private clickCancelHandler(param:any):void
	{
		if(this._cancelCallback)
		{
			this._cancelCallback.apply(this._handler,[]);
		}
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"itemview_daoju_bg02"
		]);
	}

	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}

	public dispose():void
	{
		this._cancelCallback = null;
		this._confirmCallback = null;
		this._handler = null;
		this._cancelBtn = null;
		super.dispose();
	}
}