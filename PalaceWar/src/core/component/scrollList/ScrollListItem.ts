/**
 * 滑动列表元素类
 * author 陈可
 * date 2017/9/22
 * @class ScrollListItem
 */
class ScrollListItem extends BaseDisplayObjectContainer
{
	private static scrollListItemPool:any = {};
	private static isCanNew:boolean=false;
	protected _index:number=NaN;
	private __data:any=null;
	public constructor()
	{
		super();
	}
	private init(index:number,data:any,itemParam?:any):void
	{
		this._index=index;
		this.__data=data;
		this.initItem(index,data,itemParam);
		this.initBg();
	}

	private initBg():void
	{
		let bg:BaseBitmap=BaseBitmap.create("public_alphabg");
		let rect = this.getBounds();
		bg.width=this.width+this.getSpaceX();
		bg.height=this.height+this.getSpaceY();
		this.addChildAt(bg,0);
		bg.alpha = 0;
	}

	protected initItem(index:number,data:any,itemParam?:any):void
	{
	}

	/**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 5;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}

	/**
	 * 是否是测量边界，默认true，false是使用this.width和this.height
	 */
	protected checkBounds():boolean
	{
		return true;
	}

	public getBounds(resultRect?: egret.Rectangle, calculateAnchor?: boolean): egret.Rectangle
	{
		if(!this.checkBounds())
		{
			resultRect=resultRect||new egret.Rectangle();
			resultRect.setTo(0,0,this.width,this.height);
			return resultRect;
		}
		return super.getBounds(resultRect,calculateAnchor)
	}

	public dispose():void
	{
		this.__data=null;
		this._index=NaN;
		super.dispose();
	}
	/**
	 * 对象池取
	 * @param index 索引
	 * @param data 数据
	 */
	public static create<T extends ScrollListItem>(classDomin:{new():T},index:number,data:any,itemParam?:any):T 
	{
		let targetClassName:string = egret.getQualifiedClassName(classDomin);
		if(ScrollListItem.scrollListItemPool[targetClassName]==null)
		{
			ScrollListItem.scrollListItemPool[targetClassName]=[];
		}
		let scrollListItem = App.DisplayUtil.useObjectPool?ScrollListItem.scrollListItemPool[targetClassName].pop():null;
		if (!scrollListItem)
		{
			ScrollListItem.isCanNew=true;
			scrollListItem = new classDomin();
			ScrollListItem.isCanNew=false;
		}
		scrollListItem.init(index,data,itemParam);
		return scrollListItem;
	}

	/**
	 * 对象池存
	 * @param scrollListItem 
	 */
	public static release(scrollListItem:ScrollListItem):void 
	{
		if(!scrollListItem)
		{
			return;
		}
		scrollListItem.dispose();
		scrollListItem.setPosition(0,0);
		scrollListItem.setScale(1);
		scrollListItem.rotation=0;
		scrollListItem.alpha=1;
		scrollListItem.width=NaN;
		scrollListItem.height=NaN;
		scrollListItem.mask=null;
		scrollListItem.scrollRect=null;
		scrollListItem.filters=null;
		if(App.DisplayUtil.useObjectPool)
		{
			let targetClassName:string = egret.getQualifiedClassName(scrollListItem);
			if(ScrollListItem.scrollListItemPool[targetClassName]==null)
			{
				ScrollListItem.scrollListItemPool[targetClassName]=[];
			}
			let targetPool:ScrollListItem[]=ScrollListItem.scrollListItemPool[targetClassName];
			if(targetPool.indexOf(scrollListItem)<0)
			{
				targetPool.push(scrollListItem);
			}
		}
	}
}