/**
 * 页签按钮
 * author dmj
 * date 2017/9/12
 * @class TabBar
 */
class TabBar extends BaseButton 
{
	/**是否为选中状态，true：选中 */
	private _selected:boolean;
	/**是否为锁定状态，true：锁定 */
	private _locked:boolean = false;
	/**锁定图标 */
	private _lockIcon:BaseBitmap;
	private _butterfly:CustomMovieClip;

	public tabIdx:number = 0;

	public constructor() 
	{
		super();
	}

	public eventHandler(event:egret.TouchEvent):void
	{
		if(super.isEnable() == false)
		{
			return;
		}
		switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				this.setBigin(true);
				super.updateButtonImage(BaseButton.BTN_STATE2);
				break;
			case egret.TouchEvent.TOUCH_END:
				if(this.isBegin())
				{
					this.callbackHanler([this]);
					this.setBigin(false);
				}
				break;
			case egret.TouchEvent.TOUCH_CANCEL:
				super.updateButtonImage(BaseButton.BTN_STATE1);
				this.setBigin(false);
				break;
		}
	}

	/**
	 * 设置按钮选中状态
	 * @param isSelected 
	 */
	public setSelected(isSelected:boolean):void
	{
		this._selected = isSelected;
		if(isSelected == true)
		{
			super.updateButtonImage(BaseButton.BTN_STATE2);
		}
		else
		{
			super.updateButtonImage(BaseButton.BTN_STATE1);
		}
		this.touchEnabled = !isSelected;
	}

	public isSelected():boolean
	{
		return this._selected;
	}

	public setHudiePos():void
	{
		if(this._butterfly){
			this._butterfly.setPosition(this.x + this.width - this._butterfly.width/2-2,this.y-this._butterfly.height/2);
		}
	}

	/**
	 * 设置按钮锁定状态
	 * @param isLocked 
	 */
	public setLocked(isLocked:boolean):void
	{
		if(this._locked != isLocked){
			this._locked = isLocked;
			if(isLocked == true)
			{
				this.addLockIcon();
			}
			else
			{
				this.removeLockIcon();
				this.setGray(false);
			}
		}
	}

	public isLocked():boolean
	{
		return this._locked;
	}

	private addLockIcon():void
	{
		if(this._lockIcon == null)
		{
			this._lockIcon = BaseBitmap.create("lockIcon");
			App.LogUtil.log("lockIcon: " + this._lockIcon + "w:" +this.width + "w2:" + this._lockIcon.width + " h:=" + this.height +"h2:=" + this._lockIcon.height);
			this._lockIcon.x = this.width - this._lockIcon.width - 5;
			this._lockIcon.y = this.height/2 -this._lockIcon.height/2;
			this.addChild(this._lockIcon);
			this.setGray(true);
		}
		else
		{
			this._lockIcon.visible = true;
		}
		
	}

	private removeLockIcon():void
	{
		if(this._lockIcon && this.contains(this._lockIcon))
		{
			this.removeChild(this._lockIcon);
			this._lockIcon = null;
		}
	}

	public dispose():void
	{
		if(this._lockIcon && this.contains(this._lockIcon))
		{
			this.removeChild(this._lockIcon);
			this._lockIcon = null;
		}
		this._selected = null;
		this._locked = null;
		this._butterfly = null;
		this.tabIdx = 0;
		super.dispose();
	}
}