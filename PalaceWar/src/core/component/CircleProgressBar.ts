/**
 * 圆形进度条
 * author dky
 * date 2017/11/6
 * @class CircleProgressBar
 */
class CircleProgressBar extends BaseDisplayObjectContainer
{
	private _shape:egret.Shape;
	private _percentage:number = 0;
	private _bitmap:BaseBitmap;
	public constructor() 
	{
		super();
	}

	public init(barName:string):void
	{
		this._bitmap = BaseBitmap.create(barName);
        this.addChild(this._bitmap);


		this._shape = new egret.Shape();
        this._shape.x = this.width / 2;
        this._shape.y = this.height / 2;
        this.addChild(this._shape);


        this._bitmap.mask = this._shape;
		// this._shape.graphics.clear();

		// this._shape.graphics.beginFill(0x00ffff, 1);
		// this._shape.graphics.moveTo(this._bitmap.width/2, this._bitmap.height/2);
		// this._shape.graphics.lineTo(this._bitmap.width, 0);
		// this._shape.graphics.drawArc(0, 0, this._bitmap.width/2, 0, this._percentage * Math.PI / 180);
		// this._shape.graphics.lineTo(0, 0);
		// this._shape.graphics.endFill();
		this._shape.rotation = 90;

	}

	public setPercentage(percentage:number)
	{
		this._shape.graphics.clear();

		let par = percentage*360/100
		if(par <= 0)
		{
			return;
		}
		if(par > 360)
		{
			par = 360;
		}

		this._shape.graphics.beginFill(0x00ffff, 1);
		this._shape.graphics.moveTo(this._bitmap.width/2, this._bitmap.height/2);
		this._shape.graphics.lineTo(this._bitmap.width, 0);
		this._shape.graphics.drawArc(0, 0, this._bitmap.width/2, 0, par * Math.PI / 180);
		this._shape.graphics.lineTo(0, 0);
		this._shape.graphics.endFill();

	}

	public dispose():void
	{
		if(this._shape)
		{
			this._shape = null;
		}
		this._percentage = 0;
		this._bitmap = null;
		super.dispose();
	}
}