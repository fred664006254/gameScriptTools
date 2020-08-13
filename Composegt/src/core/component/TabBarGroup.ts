/**
 * 页签按钮组
 * author dmj
 * date 2017/9/12
 * @class TabBarGroup
 */
class TabBarGroup extends BaseDisplayObjectContainer
{
	/**tabbar集合 */
	private _tbArr:Array<TabBar>;
	/**参数 */
	private _param:any;
	/**点击按钮回调函数 */
	private _callback:({param:any,index:number})=>void;
	/**tabbar所属对象 */
	private _handler:any;
	/**按钮排布方式 */
	private _align:string;
	/**按钮之间间距 */
	private _space:number = 12;
	/**当前选中按钮的索引 */
	private _selectedIndex:number = 0;

	/** 上一个选中按钮的索引 */
	private _lastSelectedIndex:number=0;

	// 按钮文字颜色
	private _color:number;
	// 选中按钮文字颜色
	private _selectedColor:number;

	/**表示菜单横向排列 */
	public static ALIGN_HORIZONTAL:string = "horizontal";
	/**表示菜单竖向排列 */
	public static ALIGN_VERTICAL:string = "vertical";


	public constructor() 
	{
		super();
	}
	/**
	 * 初始化TabBar
	 * @param buttonName     按钮图片名称
	 * @param textArr        所有按钮显示文字
	 * @param callback       按钮回调函数
	 * @param handler        按钮所属对象
	 * @param param          参数
	 */
	public init(buttonName:string|string[],textArr:Array<string>,callback:({param:any,index:number})=>void,handler:any,param?:any,showPic?:boolean):void
	{
		this._callback = callback;
		this._handler = handler;
		this._param = param;
		this._align = TabBarGroup.ALIGN_HORIZONTAL;
		if(textArr.length > 0)
		{
			this._tbArr = new Array<TabBar>();
			for(var i = 0;i < textArr.length;i++)
			{
				let btnName:string = "";
				if(typeof(buttonName) == "string")
				{
					btnName = buttonName;
				}
				else
				{
					btnName = buttonName[i];
				}
				var tb:TabBar = new TabBar();
				let fontSize = TextFieldConst.FONTSIZE_TITLE_COMMON;
				if(PlatformManager.checkIsKRSp()||PlatformManager.checkIsKRNewSp())
				{
					fontSize = TextFieldConst.FONTSIZE_TITLE_SMALL;
				}
				if(PlatformManager.checkIsViSp())
				{
					fontSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
				}
				if(showPic){
					tb.init(btnName,'',this.clickButtonHandler,this,null,fontSize);
				}
				else{
					tb.init(btnName,textArr[i],this.clickButtonHandler,this,null,fontSize);
				}
				//tb.init(btnName,textArr[i],this.clickButtonHandler,this,null,fontSize);
				this.addChild(tb);
				this._tbArr.push(tb);
			}
			this.buildTabTar();
			this.updateState(this._selectedIndex);
		}
	}
	/**
	 * 设置默认选中的按钮
	 */
	public set selectedIndex(index:number)
	{
		this._lastSelectedIndex=this._selectedIndex;
		this._selectedIndex = index;
		this.updateState(this._selectedIndex);
	}

	/**
	 * 回退到上一个选中状态，适用于点击后条件不满足再恢复状态
	 */
	public revertSelected():void
	{
		let tmpLastIndex=this._lastSelectedIndex;
		this.selectedIndex=this._lastSelectedIndex;
		this._lastSelectedIndex=tmpLastIndex;
	}


	public setColor(color:number,selectedColor:number):void
	{
		this._color = color;
		this._selectedColor = selectedColor;
		this.updateState(this._selectedIndex);
	}

	/**设置按钮排布方式 */
	public setAligh(align:string):void
	{
		this._align = align;
		this.buildTabTar();
	}
	/**设置按钮间距 */
	public setSpace(space:number):void
	{
		this._space = space;
		this.buildTabTar();
	}
	/**
	 * 按钮间添加分割线
	 * @param lineImage 
	 */
	public addLine(lineImage:string):void
	{
		for(var i = 0;i < this._tbArr.length;i++)
		{
			var tb:TabBar = this._tbArr[i];
			if(tb)
			{
				let lineSp:BaseBitmap = BaseBitmap.create(lineImage);
				if(this._align == TabBarGroup.ALIGN_HORIZONTAL)
				{
					lineSp.x = tb.x + tb.width + this._space/2 - lineSp.width/2;
					lineSp.y = tb.y + tb.height/2 - lineSp.height/2;
				}
				else
				{
					lineSp.x = tb.x + tb.width/2 - lineSp.width/2
					lineSp.y = tb.y + tb.height + this._space/2 - lineSp.height/2;
				}
				this.addChild(lineSp);
			}
		}
		

		switch(this._align)
		{
			case TabBarGroup.ALIGN_HORIZONTAL:
				break;
			case TabBarGroup.ALIGN_VERTICAL:
				break;
		}
	}

	public addRedPoint(index:number,icon?:string,isLeft?:boolean,offX?:number,offY?:number):void
	{
		let l:number=this._tbArr.length;
		for(var i = 0;i < l;i++)
		{
			if(i == index)
			{
				App.CommonUtil.addIconToBDOC(this._tbArr[i],icon,isLeft,offX,offY);
			}
		}
	}

	public removeRedPoint(index:number):void
	{
		let l:number=this._tbArr.length;
		for(var i = 0;i < l;i++)
		{
			if(i == index)
			{
				App.CommonUtil.removeIconFromBDOC(this._tbArr[i]);
			}
		}
	}

	public setLocked(index:number,isLocked:boolean):void
	{
		for(var i = 0;i < this._tbArr.length;i++)
		{
			if(i == index)
			{
				this._tbArr[i].setLocked(isLocked);
			}
		}
	}
	/**
	 * 添加状态图标，如：红点
	 * @param index 索引 
	 * @param icon 
	 */
		public showStatusIcon(index:number,icon:string = "",isLeft?:boolean):void
	{
		for(var i = 0;i < this._tbArr.length;i++)
		{
			if(i == index)
			{
				// this._tbArr[i].showStatusIcon(icon);
				App.CommonUtil.addIconToBDOC(this._tbArr[i],icon,isLeft);
				
			}
		}
	}
	/**
	 * 移除状态图标
	 * @param index 
	 */
	public removeStatusIcon(index:number):void
		{
			for(var i = 0;i < this._tbArr.length;i++)
			{
				if(i == index)
				{
				// this._tbArr[i].removeStatusIcon();
				App.CommonUtil.removeIconFromBDOC(this._tbArr[i]);
			}
		}
	}

	/**构建TabBar */
	private buildTabTar():void
	{
		var temWidth:number = 0;
		var temHeight:number = 0;
		switch(this._align)
		{
			case TabBarGroup.ALIGN_HORIZONTAL:
				for(var i = 0;i < this._tbArr.length;i++)
				{
					var tb:TabBar = this._tbArr[i];
					if(tb)
					{
						temHeight = tb.height;
						tb.x = (tb.width + this._space) * i;
						tb.y = 0;
						if(i == 0)
						{
							temWidth += tb.width; 
						}
						else
						{
							temWidth += tb.width + this._space;
						}
					}
				}
				this.width = temWidth;
				this.height = temHeight;
				break;
			case TabBarGroup.ALIGN_VERTICAL:
				for(var i = 0;i < this._tbArr.length;i++)
				{
					var tb:TabBar = this._tbArr[i];
					if(tb){
						temWidth = tb.width;
						tb.x = 0;
						tb.y = (tb.height + this._space) * i;
						if(i == 0)
						{
							temHeight += tb.height; 
						}
						else
						{
							temHeight += tb.height + this._space;
						}
					}
				}
				this.width = temWidth;
				this.height = temHeight;
				break;
		}
	}

	/**点击TabBar处理 */
	private clickButtonHandler(param:any):void
	{
		var target:TabBar;
		if(param)
		{
			target = <TabBar>param;
		}
		else
		{
			return;
		}
		var index:number = this._tbArr.indexOf(target);
		if(index == this._selectedIndex)
		{
			App.LogUtil.log("selected");
			return;
		}
		if(target.isLocked() == true)
		{
			target.setSelected(false);
		}
		else
		{
			this._selectedIndex = index;
			this.updateState(index);
		}

		this._callback.call(this._handler,{param:this._param,index:index});
	}

	/**更改TabBar状态 */
	private updateState(selectedIndex:number):void
	{
		for(var i = 0;i < this._tbArr.length;i++)
		{
			var tb:TabBar = this._tbArr[i];
			if(tb)
			{
				if(i == selectedIndex)
				{
					tb.setSelected(true);
					tb.setColor(this._selectedColor);
				}
				else
				{
					tb.setSelected(false);
					tb.setColor(this._color);
				}
			}
		}
	}
	/** 获取一个按钮 */
	public getTabBar(index:number):TabBar
	{
		return this._tbArr[index];
	}
	public dispose():void
	{
		if(this._tbArr)
		{
			for(var i = 0;i < this._tbArr.length;i++)
			{
				var tb:TabBar = this._tbArr[i];
				tb.dispose();
				tb = null;
			}
			this._tbArr = null;
		}
		this._param = null;
		this._callback = null;
		this._handler = null;
		this._align = null;
		this._space = null;
		this._selectedIndex = null;
		this._lastSelectedIndex=0;
		super.dispose();
	}
}