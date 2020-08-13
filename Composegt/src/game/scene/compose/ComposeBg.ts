class ComposeBg extends BaseDisplayObjectContainer
{
	// private _lv:BaseDisplayObjectContainer;;
	// private _cell:BaseLoadBitmap;
	// private _lvT:BaseTextField;
	// private _lvbm:BaseLoadBitmap;
	// private _shadow:BaseBitmap;
	private _data:ComposemapItemVo;
	// private _cellRect:egret.Rectangle;
	// public _isComposeing:boolean = false;
	constructor(data:ComposemapItemVo)
	{
		super();
		this.init(data);
		let {pixX,pixY}=ComposeStatus.getPixPosByCellPos(data.x,data.y);
		this.setPosition(pixX,pixY-ComposeStatus.cellBgSize.h*0.5);
	}


	private init(data:ComposemapItemVo)
	{
		this._data=data;

		let bg=BaseLoadBitmap.create("composetile");
		// lvbg.width=lvbg.height=31;
		bg.width = ComposeStatus.cellBgSize.w;
		bg.height = ComposeStatus.cellBgSize.h;
		bg.setPosition(-bg.width/2,0);
		this.addChild(bg);


		// this.name=this._data.id;
	}

	

	

	private _zIndex:number=-1;

	public update():void
	{
		// this.name=Config.MapinfoCfg.getIdByPos(this._data.x,this._data.y)+"100";
	}

	public updatePos():void 
	{
		this.update();
	}

	public dispose()
	{
		// this.removeSelected();
		// this._cell=null;
		this._data=null;
		// this._cellRect=null;
		// this._lvT=null;
		// this._lv=null;
		// this._isComposeing = false;
		super.dispose();
	}
}