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
	// 邮件倒计时
	private _mailCDTF:BaseTextField;
	/**是否永久 */
	private _extra:any=null;
	public constructor() 
	{
		super();
	}
	protected initItem(index:number,data:any)
    {
		this._selectedIndex = index;
		this._mailInfoVo = <MailInfoVo>data;
		let temW = 510;
		let temH = 126;
		// this.width = temW;
		// this.height = temH;
		let bg:BaseBitmap = BaseBitmap.create("public_popupscrollitembg");
		this._bg = bg;
		bg.width = temW;
		bg.height = temH;
		this.addChild(bg);
		// let btn:BaseButton = ComponentManager.getButton("public_9_bg35","",this.clickItemHandler,this);
		// this.addChild(btn);

		this._selectedSp = BaseBitmap.create("public_9_bg16");
		this._selectedSp.width = temW;
		this._selectedSp.height = temH;
		this._selectedSp.x = this._bg.x + this._bg.width/2 - this._selectedSp.width/2;
		this._selectedSp.y = this._bg.y + this._bg.height/2 - this._selectedSp.height/2;
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

		let titleTF:BaseTextField = ComponentManager.getTextField(this._mailInfoVo.title,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN4);
		titleTF.x = iconbg.x + iconbg.width + 10;
		titleTF.y = 17;
		this.addChild(titleTF);
		this._mailTitleTF = titleTF;

		let timeTF:BaseTextField = ComponentManager.getTextField(this._mailInfoVo.timeStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		timeTF.x = titleTF.x;
		timeTF.y = titleTF.y + titleTF.height + 20;
		this.addChild(timeTF);

		let st = this._mailInfoVo.st;
		let str = '';
		//Config.GameprojectCfg.deleteEmail
		let cd = (st + Config.GameprojectCfg.deleteEmail * 86400) - GameData.serverTime;
		if(cd > 86400){
			str = Math.floor(cd / 86400) + LanguageManager.getlocal(`date_day2`);
		}
		else{
			if(cd <= 0){
				cd = 0;
				str = LanguageManager.getlocal(`mailOver`);
			}
			else{
				str = App.DateUtil.getFormatBySecond(cd,3);
			}
		}
		if (data.extra) {
			this._extra = data.extra;
		}
		if (this._extra&&this._extra.forever && this._extra.forever == 1) {
			str = LanguageManager.getlocal("mailPermanentCD");
		}
		
		let CdTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`mailCDTip`, [str]),TextFieldConst.FONTSIZE_CONTENT_SMALL,cd > 86400 ? TextFieldConst.COLOR_WARN_GREEN4 : 0xce1515);
		CdTF.x = titleTF.x;
		CdTF.y = titleTF.y + titleTF.height + 50;
		this.addChild(CdTF);
		this._mailCDTF = CdTF;
		
		this.controlSelectedState(2);
		this.updateMailState();
		this.addTouch(this.clickItemHandler,this,null,true);
		TickManager.addTick(this.tick,this);
	}

	private tick():void{
		let view = this;
		let st = this._mailInfoVo.st;
		let str = '';//Config.GameprojectCfg.deleteEmail
		let cd = (st + Config.GameprojectCfg.deleteEmail * 86400) - GameData.serverTime;
		if(cd > 86400){
			str = Math.floor(cd / 86400) + LanguageManager.getlocal(`date_day2`);
		}
		else{
			if(cd <= 0){
				cd = 0;
				str = LanguageManager.getlocal(`mailOver`);
			}
			else{
				str = App.DateUtil.getFormatBySecond(cd,3);
			}
		}
		if (this._extra&&this._extra.forever && this._extra.forever == 1) {
			str = LanguageManager.getlocal("mailPermanentCD");
		}
		this._mailCDTF.text = LanguageManager.getlocal(`mailCDTip`, [str]);
		this._mailCDTF.textColor = cd > 86400 ? TextFieldConst.COLOR_WARN_GREEN4 : 0xce1515;
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
				this._mailTitleTF.setColor(TextFieldConst.COLOR_BROWN);
			}
		}
		else
		{
			this._mailTitleTF.setColor(TextFieldConst.COLOR_WARN_GREEN4);
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
		return 5;
	}

	public dispose():void
    {
		TickManager.removeTick(this.tick,this);
		this._extra=null;
		super.dispose();
	}
}