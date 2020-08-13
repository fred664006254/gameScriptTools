/**
 * 收缩mainUI活动图标
 * author shaoliang
 * date 2018/10/27
 * @class ExtendIcon
 */

class ExtendIcon extends BaseDisplayObjectContainer
{

    public _status:number = 0;   // 0 合起  1 展开
    private _arrow:BaseBitmap = null;
    private _textIcon:BaseBitmap = null;

	private _callbackF:Function = null;
	private _obj:any = null;

	public _isInCDTime:boolean = false;

    public constructor() {
		super();
	}

    public init(f:Function,o:any):void
	{
		this.width = 80;
		this.height = 80;
		this._obj = o;
		this._callbackF = f;

        let iconBg:BaseBitmap = BaseBitmap.create("public_alphabg");
		iconBg.width = 80;
		iconBg.height = 80;
		this.addChild(iconBg);
		
        this._arrow = BaseBitmap.create("mainui_packup_arrow");

		this._arrow.rotation = -180;
		this._arrow.x = this._arrow.width;
		this._arrow.y = this._arrow.height - 7;
		this.addChild(this._arrow);

        this._textIcon = BaseBitmap.create("mainui_packup_text1");
		this._textIcon.setPosition(iconBg.width/2 - this._textIcon.width/2 , iconBg.height - this._textIcon.height/2 -20);
		this.addChild(this._textIcon);

        this.anchorOffsetX=this._arrow.width/2;
		this.anchorOffsetY=this._arrow.height/2;

        this.addTouch((event:egret.TouchEvent,iconContainer:BaseDisplayObjectContainer)=>{

				if (this._isInCDTime)
				{
					return;
				}
				switch(event.type)
				{
					case egret.TouchEvent.TOUCH_BEGIN:
						iconContainer.setScale(0.95);
					break;
					case egret.TouchEvent.TOUCH_CANCEL:
						iconContainer.setScale(1);
					break;
					case egret.TouchEvent.TOUCH_END:
						iconContainer.setScale(1);
					break;
				}
			},this,[this]);

		this.addTouchTap(this.pickup,this);
    }

	private pickup():void
	{

		if (this._isInCDTime)
		{
			return;
		}

		this._status = this._status ? 0 : 1;

		this._textIcon.texture = ResourceManager.getRes("mainui_packup_text"+String(this._status+1));

		if (this._status)
		{
			this._arrow.rotation = 0;
			this._arrow.x = 0;
			this._arrow.y = -7;
		}
		else
		{
			this._arrow.rotation = -180;
			this._arrow.x = this._arrow.width;
	
			this._arrow.y = this._arrow.height - 7;
		}
		this._callbackF.apply(this._obj);
	}

	public packUp():void
	{
		this._status = 0;
		this._textIcon.texture = ResourceManager.getRes("mainui_packup_text"+String(this._status+1));
		this._arrow.rotation = -180;
		this._arrow.x = this._arrow.width;
		this._arrow.y = this._arrow.height - 7;
	}

    public dispose():void
	{	
		this._isInCDTime = false;
        this._status = 0;
        this._arrow = null;
        this._textIcon = null;

		this._obj = null;
		this._callbackF = null;

        super.dispose();
    }

}