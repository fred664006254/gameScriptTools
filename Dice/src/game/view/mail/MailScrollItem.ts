/**
 * 商店滑动item
 * author dmj
 * date 2017/10/28
 * @class ShopScrollItem
 */
/*
 *@description: dice mail item 从江山美人改的
 *@author: hwc 
 *@update date: 2020-04-09 11:08:18
 *@version 2.1.0
 */
class MailScrollItem extends ScrollListItem
{
	// 选择状态
	private _mailInfoVo:MailInfoVo;
	// 背景
	private _bg:BaseBitmap;
	// 是否开始点击
	private _isBegin:boolean;
	// 邮件标题
	private _mailTitleTF:BaseTextField;
	// 未读邮件
	private readMail:false;
	// 选中sp
	private _selectedSp:BaseBitmap = null;
	private _selectedIndex:number;
	private _mailID;
	
	public constructor() 
	{
		super();
	}
	protected initItem(index:number,data:any)
    {
		this._selectedIndex = index;
		this._mailInfoVo = Api.MymailVoApi.getMailByMailID(data);
		this._mailID = data;
		let temW = 503;
		let temH = 135;
		this.width = temW;
		this.height = temH;

		let contain = new BaseDisplayObjectContainer();
		

		// this.width = temW;
		this.height = temH + 10;
		let bg:BaseBitmap = BaseBitmap.create("mail_list_item_bg");
		this._bg = bg;
		bg.width = temW;
		bg.height = temH;
		bg.y = 17;
		this.addChild(bg);
		
		// let timeBg = BaseBitmap.create();
		// this.addChild(timeBg);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, timeBg, bg, [0,0]);

		if(this._mailInfoVo.isread == 0){
			contain.setPosition(4, 0);
			this.addChild(contain);
			let new_mail: BaseBitmap = BaseBitmap.create("mail_view_label");
			new_mail.x = 0;
			new_mail.y = 0;
			contain.addChild(new_mail);

			let txt = ComponentMgr.getTextField(LangMger.getlocal("newemail"), TextFieldConst.SIZE_24, ColorEnums.white);
			contain.addChild(txt);
			txt.setPosition(15,20);
			txt.stroke = 2;
			txt.strokeColor = ColorEnums.mail_strokeColor_1;
			txt.rotation = -20;
			
		}
		

		let xuxian = BaseBitmap.create("mail_view_xuxian");
		this.addChild(xuxian);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, xuxian, bg, [20,46]);

		let titlestr = this.cutTxt(this._mailInfoVo.title, 9); // 
		let titleTF:BaseTextField = ComponentMgr.getTextField(titlestr,TextFieldConst.SIZE_28, ColorEnums.white);
		titleTF.x = 77;
		titleTF.y = 11 + bg.y;
		this.addChild(titleTF);
		this._mailTitleTF = titleTF;
		titleTF.strokeColor = ColorEnums.mail_strokeColor_1;

		let timeTF:BaseTextField = ComponentMgr.getTextField(this._mailInfoVo.timeStr,TextFieldConst.SIZE_20, ColorEnums.white);
		timeTF.x = temW - timeTF.width - 20;
		timeTF.y = titleTF.y ;
		this.addChild(timeTF);
		timeTF.strokeColor = ColorEnums.mail_strokeColor_1;

		let showTxt = this.cutTxt(this._mailInfoVo.content);
		let contentTF:BaseTextField = ComponentMgr.getTextField(showTxt, TextFieldConst.SIZE_20, ColorEnums.mail_color_1);
		contentTF.height = 70;
		contentTF.width = 465;
		contentTF.x = 20;
		contentTF.y = titleTF.y + titleTF.height + 15;
		contentTF.lineSpacing = 3;
		this.addChild(contentTF);
		
		this.controlSelectedState(2);
		this.updateMailState();
		this.addTouch(this.clickItemHandler,this,null,true);
		// TickMgr.addTick(this.tick,this);
	}

	private cutTxt(context:string, len?:number):string{
		len = len || 60;
		if(!context || context.length <= 0)
			return "";
		let tem:string = ``;
		if(context.length > len){
			tem = context.substr(0, len);
			tem += "...";
		} else {
			tem = context;
		}
		return tem;
	}

	private tick():void{
		
	}

	public clickItemHandler(event:egret.TouchEvent):void
	{
		switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				this._isBegin = true;
				this.controlSelectedState(1);
				SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
				break;
			case egret.TouchEvent.TOUCH_END:
				if(this._isBegin)
				{
					this._isBegin = false;
					this.callbackHanler();
					this.controlSelectedState(2);
				}
				break;
			case egret.TouchEvent.TOUCH_CANCEL:
				this._isBegin = false;
				this.controlSelectedState(2);
				break;
		}
	}
	/**
	 * 
	 * @param state 1:选中，2：非选中
	 */
	private controlSelectedState(state:number):void
	{
		if(this._bg)
		{
			var curButtonName:string = "";
			switch(state)
			{
				case 1:
					if(this._selectedSp )
					{
						this._selectedSp.visible = true;
					}
					break;
				case 2:
					if(this._selectedSp)
					{
						this._selectedSp.visible = false;
					}
					break;
			}
		}
	}
	/**
	 * 更新邮件状态
	 * @param state 0:未读，1:已读
	 */
	public updateMailState():void
	{
	}

	public callbackHanler(param?:any[]):void
	{
		ViewController.getInstance().openView(ViewConst.MAINDETAILPOPUPVIEW, {index:this._selectedIndex, "mailID":this._mailID});
	}

	public getSpaceY():number
	{
		return 10;
	}

	public getSpaceX():number{
		return 0;
	}

	public dispose():void
    {
		this._bg = null;
		this._mailInfoVo = null;
		this._mailTitleTF = null;
		super.dispose();
	}
}