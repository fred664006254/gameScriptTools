/**
 * 头像框的组建
 * @author 张朝阳
 * data 2018/9/6
 * @class HeadContainer
 */
class HeadContainer extends BaseDisplayObjectContainer
{
	/** 头像 */
	private _head:BaseLoadBitmap = null;
	/** 头像框 */
	private _headBg:BaseDisplayObjectContainer = null;

	private _headEffect:CustomMovieClip = null;

	public constructor() {
		super();
	}

	/**
	 * 入口函数
	 */
	public init(headName:string,headinfo:any,needCircle:boolean=false):void
	{
		this._headBg = App.CommonUtil.getHeadPic(headinfo);
		this.addChild(this._headBg);

		
		
		let circlemask;
		if (needCircle)
		{	
			let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 114, 114);
			this._head = BaseLoadBitmap.create(headName,rect);
			this._head.x = -10;
			this._head.y = -10;
			// this._head.setScale(0.85)

			// let circle:egret.Shape = new egret.Shape();
			// circle.graphics.beginFill(0x0000ff);
			// circle.graphics.drawCircle(46,50,42);
			// circle.graphics.endFill();
			// this._head.mask = circle;
			// circlemask = circle;
		}
		else
		{	
			this._head = BaseLoadBitmap.create(headName);
			this._head.x = 0;
			this._head.y = -7;
			this._head.setScale(2/3)
		}
		
		this.width = 103;
		this.height = 100;
		let ptitleinfo = App.CommonUtil.getPtitleInfo(headinfo);
		let headbgName = ptitleinfo.ptitle;
		// if ("4041" == headbgName)
		// {
		// 	this._headEffect = ComponentManager.getCustomMovieClip("headcircle_anim",10,100);
		// 	this._headEffect.x = -22;
		// 	this._headEffect.y = -22; 
		// 	this.addChild(this._headEffect);
		// 	this._headEffect.playWithTime(0);
		// }

		let eff = App.CommonUtil.getHeadEffect(headbgName);
		if(eff){
			this._headEffect = eff;
			this.addChild(this._headEffect);
			this._headEffect.setPosition(this.width / 2, this.height / 2);
		}
		// return;
		if (circlemask)
		{
			this.addChild(circlemask);
		}
		this.addChild(this._head);

	}
	/**
	 * 头像换图
	 */
	public setHeadRes(headName:string)
	{
		this._head.setload(headName);
	}
	/**
	 * 头像框换图
	 */
	public setHeadBgRes(headbginfo:any)
	{
		this._headBg.dispose();
		this._headBg = null;

		this._headBg = App.CommonUtil.getHeadPic(headbginfo);
		this.addChildAt(this._headBg,0);
	}
	/**
	 * 头像框和头像一起换图
	 */
	public setRes(headName:string,headbginfo:any,needCircle:boolean=false)
	{
		this.setHeadRes(headName);
		this.setHeadBgRes(headbginfo);

		let ptitleinfo = App.CommonUtil.getPtitleInfo(headbginfo);
		let headbgName = ptitleinfo.ptitle;
		if (this._headEffect)
		{
			this._headEffect.dispose();
			this._headEffect = null;
		}

		let eff = App.CommonUtil.getHeadEffect(headbgName);
		if(eff){
			this._headEffect = eff;
			this.addChild(this._headEffect);
			this._headEffect.setPosition(this.width / 2, this.height / 2);
		}
	}
	public dispose():void
	{
		this._head = null;
		this._headBg = null;
		this._headEffect = null;

		super.dispose();
	}

}