/**
 * 收缩mainUI活动图标
 * author shaoliang
 * date 2018/10/27
 * @class ExtendIcon
 */

class CommonExtend extends BaseDisplayObjectContainer
{

    public _status:number = 0;   // 0 合起  1 展开
    private _arrow:BaseLoadBitmap = null;
    private _textIcon:BaseLoadBitmap = null;

	private _callbackF:Function = null;
	private _obj:any = null;

	public _isInCDTime:boolean = false;

    public constructor() {
		super();
	}

    public init(f:Function,o:any,isExtend:boolean=false):void
	{
		this._obj = o;
		this._callbackF = f;
		
        this._arrow = BaseLoadBitmap.create("common_extend1");
		this.addChild(this._arrow);

        this._textIcon = BaseLoadBitmap.create("common_extend_text1");
        this._textIcon.setPosition(-9 , 58);
		this.addChild(this._textIcon);

		if (isExtend)
		{
			this._arrow.setload("common_extend2");
			this._textIcon.setload("common_extend_text2");
			this._status = 1;
		}

        this.anchorOffsetX=35;
		this.anchorOffsetY=35;

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

	public pickup():void
	{

		if (this._isInCDTime)
		{
			return;
		}

		this._status = this._status ? 0 : 1;

		this._textIcon.setload("common_extend_text"+String(this._status+1));
		this._arrow.setload("common_extend"+String(this._status+1));
		
		this._callbackF.apply(this._obj);
	}

	public packUp():void
	{
		this._status = 0;
		this._textIcon.setload("common_extend_text"+String(this._status+1));
		this._arrow.setload("common_extend"+String(this._status+1));
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