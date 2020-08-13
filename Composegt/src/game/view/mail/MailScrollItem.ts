/**
 * 商店滑动item
 * author dmj
 * date 2017/10/28
 * @class ShopScrollItem
 */
class MailScrollItem extends ScrollListItem
{
	// 未读取状态
	private static TYPE_UNREAD:number = 1;
	// 已读取
	private static TYPE_READ:number = 2;
	// 选择状态
	private _mailInfoVo:MailInfoVo;
	// 背景
	private _bg:BaseBitmap;
	// 是否开始点击
	private _isBegin:boolean;
	// 邮件标题
	private _mailTitleTF:BaseTextField;
	// 邮件icon
	private _icon:BaseBitmap;
	// 选中sp
	private _selectedSp:BaseBitmap = null;
	private _selectedIndex:number;
	public constructor() 
	{
		super();
	}
	protected initItem(index:number,data:any)
    {
		this._selectedIndex = index;
		this._mailInfoVo = <MailInfoVo>data;
		let temW = 530;
		let temH = 144;
		 
		let bg:BaseBitmap = BaseBitmap.create("public_listbg3");
		this._bg = bg;
		bg.width = temW;
		bg.height = temH;
		this.addChild(bg); 
        
        // let leftBg = BaseBitmap.create("public_left");
        // leftBg.width = 139;
        // leftBg.height = 129;
        // leftBg.x =  5;
        // leftBg.y =  bg.y + bg.height/2 -leftBg.height/2-3; 
        // this.addChild(leftBg); 

		this._selectedSp = BaseBitmap.create("public_9_bg29");
		this._selectedSp.width = temW + 8;
		this._selectedSp.height = temH + 3;
		this._selectedSp.x = this._bg.x + this._bg.width/2 - this._selectedSp.width/2;
		this._selectedSp.y = this._bg.y + this._bg.height/2 - this._selectedSp.height/2 - 3;
		this.addChild(this._selectedSp);

		let iconbg:BaseBitmap = BaseBitmap.create("mail_iconbg");
		iconbg.x = 20;
		iconbg.y = temH/2 - iconbg.height/2;
		this.addChild(iconbg);

		

		let icon:BaseBitmap;
		if(this._mailInfoVo.istouch)
		{
			 icon = BaseBitmap.create("mail_rewardicon");
		}
		else
		{
			 icon = BaseBitmap.create("mail_icon");
		}
		icon.x = iconbg.x + iconbg.width/2 - icon.width/2;
		icon.y = temH/2 - icon.height/2;
		this.addChild(icon);
		this._icon = icon;

		let titleTF:BaseTextField = ComponentManager.getTextField(this._mailInfoVo.title,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		titleTF.x = iconbg.x + iconbg.width + 40;
		titleTF.y = 30; 
		titleTF.width =	330;
		this.addChild(titleTF);
		this._mailTitleTF = titleTF;

		let timeTF:BaseTextField = ComponentManager.getTextField(this._mailInfoVo.timeStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		timeTF.x = titleTF.x;
		timeTF.y = titleTF.y + titleTF.height + 20;
		this.addChild(timeTF);
		
		this.controlSelectedState(2);
		this.updateMailState();
		this.addTouch(this.clickItemHandler,this,null,true);
	}

	public clickItemHandler(event:egret.TouchEvent):void
	{
		switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				this._isBegin = true;
				this.controlSelectedState(1);
				SoundManager.playEffect(SoundConst.EFFECT_CLICK);
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
		this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this._mailInfoVo.mid);
		if(this._mailInfoVo.isread)
		{
			if(this._icon)
			{
				App.DisplayUtil.changeToGray(this._icon);
				this._mailTitleTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
			}
		}
		else
		{
			this._mailTitleTF.setColor(TextFieldConst.COLOR_WARN_GREEN_NEW);
		}
	}

	public callbackHanler(param?:any[]):void
	{
		// if(param)
		// {
		// 	this._param = param;
		// }
		// if(this._callback)
		// {
		// 	this._callback.apply(this._handler,this._param);
		// }
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAIL_DETAIL,{"mailId":this._mailInfoVo.mid,"index":this._selectedIndex});
	}

	public getSpaceY():number
	{
		return -8;
	}

	public dispose():void
    {
		super.dispose();
	}
}