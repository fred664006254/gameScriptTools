/**
 * 滑动列表类
 * author 陈可
 * date 2017/9/22
 * @class ScrollList
 */
class ScrollList extends ScrollView
{
	private _scrollListItemArr:ScrollListItem[]=[];
	private _scrollListHeightArr:egret.Rectangle[]=[];
	private _scrollRect:egret.Rectangle=undefined;
	private _lastPos:egret.Point=null;
	private _curShowItem:{min:number,max:number}=null;
	private _widthCount:number=-1;
	private _dataList:any[]=[];
	private _listItemClass:any;
	private _moveCompleteCallBack:Function;
	private _moveComPleteCallBackObj:any;
	private _lastX:number=0;
	private _lastY:number=0;
	/**
	 * 每次刷新数量，就是每页数量
	 */
	private _pageNum:number=20;
	/**
	 * 页面数量最大值
	 */
	private _maxPage:number=1;
	/**
	 * 当前初始化到的页面
	 */
	private _curPageIndex:number=1;

	/**
	 * itemParam 元素对象的参数，分别原样传到scrollListItem的initData方法
	 */
	private _itemParam:any;
	//自动填充
	private _isFill:boolean = false;
	//使用height代替bounds
	private _useHeight:boolean = false;
	public constructor(pageNum:number=20)
	{
		super();
		this.horizontalScrollPolicy="off";
		if(pageNum<1)
		{
			this._pageNum=99999999;
		}
		else
		{
			this._pageNum=pageNum;
		}
	}
	/**
	 * 初始化ScrollList
	 * @param ScrollListItemClass 
	 * @param dataList 
	 * @param scrollRect 
	 */
	public init(ScrollListItemClass:{new();},dataList:any[],scrollRect:egret.Rectangle,itemParam:any,isFill:boolean=false,useHeight:boolean=false):void
	{
		this._listItemClass=ScrollListItemClass;
		this._scrollRect=scrollRect;
		this._itemParam=itemParam;
		this._isFill = isFill;
		this._useHeight = useHeight;
		let content=new BaseDisplayObjectContainer();
		this.content=content;
		this.setContent(this.content);

		if(dataList==null||(!dataList.length)||dataList.length<1)
		{
			this.width=scrollRect.width;
			this.height=scrollRect.height;
			this.addEventListener(egret.Event.CHANGE,this.changeHandler,this);
			this.addEventListener(egret.Event.COMPLETE,this.moveCompleteHandler,this);
			return;
		}
		this._maxPage=Math.ceil(dataList.length/this._pageNum);
		this._dataList=dataList;
		while(this.checkIsAtButtom()&&this._curPageIndex<=this._maxPage)
		{
			this.initNextPage();
		}
		this.addEventListener(egret.Event.CHANGE,this.changeHandler,this);
		this.addEventListener(egret.Event.COMPLETE,this.moveCompleteHandler,this);
		this.width=scrollRect.width;
		this.height=scrollRect.height;
	}

	private initNextPage():void
	{
		let startIdx:number=(this._curPageIndex-1)*this._pageNum;
		let endIdx:number=this._curPageIndex*this._pageNum<=this._dataList.length?this._curPageIndex*this._pageNum:this._dataList.length;
		this.initListData(startIdx,endIdx);
		this._curPageIndex++;
	}

	private initListData(stIdx:number,endIdx:number):void
	{
		let data:any=undefined;
		let scrollListItem:ScrollListItem=undefined;
		let isCheckCount:boolean=false;
		if(this._widthCount>1)
		{
			if(stIdx%this._widthCount!=0)
			{
				stIdx=this._widthCount*Math.ceil(stIdx/this._widthCount);
			}
			if(endIdx%this._widthCount!=0)
			{
				endIdx=this._widthCount*Math.ceil(endIdx/this._widthCount);
				if(endIdx>=this._dataList.length)
				{
					endIdx=this._dataList.length;
				}
			}
			isCheckCount=true;
		}
		if(stIdx>=endIdx)
		{
			return;
		}
		let itemHeight = 0;
		let itemWidth = 0;
		for(var i:number=stIdx;i<endIdx;i++)
		{
			data=this._dataList[i];
			scrollListItem=ScrollListItem.create(this._listItemClass,i,data,this._itemParam);
			// scrollListItem["init"](i,data);
			if (itemHeight==0)
			{
				itemHeight = scrollListItem.height+scrollListItem.getSpaceY();
				itemWidth = scrollListItem.width-scrollListItem.getSpaceX();
			}
			if(this._lastX+scrollListItem.width-scrollListItem.getSpaceX()>this._scrollRect.width)
			{
				if(this._widthCount<0)
				{
					this._widthCount=i>0?i:1;
					if(isCheckCount==false&&this._widthCount>1)
					{
						if(endIdx%this._widthCount!=0)
						{
							endIdx=this._widthCount*Math.ceil(endIdx/this._widthCount);
							if(endIdx>=this._dataList.length)
							{
								endIdx=this._dataList.length;
							}
						}
						isCheckCount=true;
					}
				}
				if(i>0)
				{
					this._lastX=0;
					if(this._scrollListItemArr.length>0)
					{
						this._lastY=this._lastY+this._scrollListItemArr[this._scrollListItemArr.length-1].height;
					}
					else
					{
						this._lastY=this._lastY+scrollListItem.height;
					}
				}
			}
			scrollListItem.setPosition(this._lastX,this._lastY);
			// content.addChild(scrollListItem);
			this._scrollListItemArr.push(scrollListItem);
			let itemRect:egret.Rectangle=scrollListItem.getBounds();
			itemRect.x+=scrollListItem.x;
			itemRect.y+=scrollListItem.y;
			if (this._useHeight)
			{
				itemRect.height = scrollListItem.height;
			}
			this._scrollListHeightArr.push(itemRect);
			if(this._lastX+scrollListItem.width-scrollListItem.getSpaceX()<=this._scrollRect.width||this._widthCount==1)
			{
				this._lastX+=scrollListItem.width;
			}
		}
		//补充
		if (this._isFill)
		{	
			let myWithCouth = Math.floor(this._scrollRect.width/itemWidth);
			if (myWithCouth>1 )
			{
				let start1:number = endIdx;
				let end1:number ;
				if (endIdx%myWithCouth == 0)
				{
					end1 = endIdx;
				}
				else
				{
					end1 = start1-endIdx%myWithCouth+myWithCouth;
				}
				

				let heightCount = Math.ceil(this._scrollRect.height/itemHeight);
				let curHeight = Math.ceil(endIdx/myWithCouth);

				if (heightCount>curHeight)
				{
					end1 += (heightCount-curHeight)*myWithCouth;
				}

				for(let i:number=start1;i<end1;i++)
				{
					let scrollListItem=ScrollListItem.create(this._listItemClass,i,null,this._itemParam);
					if(this._lastX+scrollListItem.width-scrollListItem.getSpaceX()>this._scrollRect.width)
					{
						if(i>0)
						{
							this._lastX=0;
							if(this._scrollListItemArr.length>0)
							{
								this._lastY=this._lastY+this._scrollListItemArr[this._scrollListItemArr.length-1].height;
							}
							else
							{
								this._lastY=this._lastY+scrollListItem.height;
							}
						}
					}
					scrollListItem.setPosition(this._lastX,this._lastY);
					// content.addChild(scrollListItem);
					this._scrollListItemArr.push(scrollListItem);
					let itemRect:egret.Rectangle=scrollListItem.getBounds();
					itemRect.x+=scrollListItem.x;
					itemRect.y+=scrollListItem.y;
					if (this._useHeight)
					{
						itemRect.height = scrollListItem.height;
					}
					this._scrollListHeightArr.push(itemRect);
					if(this._lastX+scrollListItem.width-scrollListItem.getSpaceX()<=this._scrollRect.width||myWithCouth==1)
					{
						this._lastX+=scrollListItem.width;
					}
				}
			}
		}

		if(scrollListItem)
		{
			this.content.width=scrollListItem.width;
		}
		this.content.height=scrollListItem?this._lastY+scrollListItem.height:this._lastY;
	}

	public setEmptyTip(emptyStr:string,color?:number):void
	{
		let content=this.content;
		if(content &&(content instanceof egret.DisplayObjectContainer))
		{
			let emptyTxt:BaseTextField=<BaseTextField>content.getChildByName("emptyTxt");
			if(emptyTxt)
			{
				emptyTxt.text=emptyStr;
				emptyTxt.visible=true;
			}
			else
			{
				if(this._ScrV_Props_._scrollStarted == false)
				{
					this.setScrollTop(0);
				}
				emptyTxt=ComponentMgr.getTextField(emptyStr,TextFieldConst.SIZE_CONTENT_COMMON);
				content.addChild(emptyTxt);
				emptyTxt.name="emptyTxt";
				if(this._dataList&&this._dataList.length>0)
				{
					emptyTxt.visible=false;
				}
			}
			if(color){
				emptyTxt.textColor = color;
			}
			emptyTxt.setPosition((this._scrollRect.width-emptyTxt.width)/2,(this._scrollRect.height-emptyTxt.height)/2);
		}
	}

	private checkEmptyTip(isShow:boolean):void
	{
		let content=this.content;
		if(content &&(content instanceof egret.DisplayObjectContainer))
		{
			if(this._ScrV_Props_._scrollStarted = false)
			{
				this.setScrollTop(0);
			}
			let emptyTxt:BaseTextField=<BaseTextField>content.getChildByName("emptyTxt");
			if(emptyTxt)
			{
				emptyTxt.visible=isShow;
			}
		}
	}

	private moveCompleteHandler(e:egret.Event):void
	{
		if(this._moveCompleteCallBack)
		{
			this._moveCompleteCallBack.call(this._moveComPleteCallBackObj);
		}
	}

	public getItemByIndex(index:number):ScrollListItem
	{
		return this._scrollListItemArr[index];
	}

	/**
	 * 根据数据刷新列表
	 * @param dataList 数据列表，非必须，如果和初始化是同一个数据对象，无需传
	 * @param itemParam 刷新元素对象的参数，分别原样传到scrollListItem的initData方法，默认值是NaN，传NaN或者不传的话不刷新
	 */
	public refreshData(dataList?:any[],itemParam:any=NaN):void
	{
		if(this._ScrV_Props_._isHTweenPlaying||this._ScrV_Props_._isVTweenPlaying)
		{
			this._onScrollFinished();
		}
		this._dataList=dataList;
		if(itemParam!=NaN)
		{
			this._itemParam=itemParam;
		}
		let l:number=this._scrollListItemArr.length;
		// let className:string=egret.getQualifiedClassName(this._scrollListItemArr[0]);
		for(var i:number=l-1;i>=0;i--)
		{
			ScrollListItem.release(this._scrollListItemArr.pop());
		}
		this._scrollListHeightArr.length=0;

		if(this._dataList==null||(!this._dataList.length)||this._dataList.length<1)
		{
			this._maxPage=0;
			this.checkEmptyTip(true);
			this.setArrow();
			return;
		}
		this._maxPage=Math.ceil(dataList.length/this._pageNum);
		this.checkEmptyTip(false);
		this._lastX=this._lastY=0;
		let lastInitFullPage:number=Math.floor(l/this._pageNum);
		if(l%this._pageNum==0)
		{
			l=Math.min((l==0?this._pageNum:l),dataList.length);
		}
		else
		{
			l=Math.min((lastInitFullPage+1)*this._pageNum,dataList.length);
		}
		if(Math.ceil(l/this._pageNum)!=this._curPageIndex)
		{
			this._curPageIndex=Math.ceil(l/this._pageNum);
		}
		// l=l<this._pageNum?(Math.min(this._pageNum,dataList.length)):Math.min(l,dataList.length);
		this.initListData(0,l);
		if(this._dataList.length>0)
		{
			this._curPageIndex++;
		}
		this.width=this._scrollRect.width;
		this.height=this._scrollRect.height;
		this._lastPos=null;
		this._curShowItem=null;
		this.setScrollTop(this.scrollTop);
		this.changeHandler(null);
		this.setArrow();
	}

	public removeItem(idx:number):void
	{
		if(this._dataList[idx])
		{
			this._dataList.splice(idx,1);
		}
		let item=this._scrollListItemArr[idx];
		if(this._scrollListItemArr[idx])
		{
			this._scrollListItemArr.splice(idx,1);
		}
		if(this._scrollListHeightArr[idx])
		{
			this._scrollListHeightArr.splice(idx,1);
		}
		if(item.parent)
		{
			item.dispose();
		}
		this.refreshData(this._dataList);
	}

	private changeHandler(e:egret.Event):void
	{
		if(this._lastPos==null||this.scrollRect.y!=this._lastPos.y)
		{
			let lastMin:number=this._curShowItem?this._curShowItem.min:-1;
			let lastMax:number=this._curShowItem?this._curShowItem.max:-1;
			let containMin:number=NaN;
			let containMax:number=NaN;
			let isFind:boolean=false;
			let l:number=this._scrollListItemArr.length;
			let useRect:egret.Rectangle=egret.Rectangle.create();
			useRect.copyFrom(this.scrollRect);
			useRect.width=this._scrollRect.width;
			useRect.height=this._scrollRect.height;
			let islookDown:boolean=true;
			if(this._lastPos==null||this.scrollRect.y>this._lastPos.y)
			{
				islookDown=true;
				let findMin:number=lastMin==-1?0:lastMin;
				for(let i:number=findMin;i<l;i++)
				{
					let rect:egret.Rectangle = this._scrollListHeightArr[i];
					if(useRect.intersects(rect))
					{
						if(isNaN(containMin))
						{
							containMin=i;
						}
						isFind=true;
					}
					else
					{
						if(isFind&&isNaN(containMax))
						{
							containMax=i+this._widthCount-1;
							break;
						}
					}
				}
			}
			else
			{
				islookDown=false;
				let findMax:number=this._curShowItem.max>=l?l-1:this._curShowItem.max;
				for(let i:number=findMax;i>=0;i--)
				{
					let rect:egret.Rectangle = this._scrollListHeightArr[i];
					if(useRect.intersects(rect))
					{
						if(isNaN(containMax))
						{
							containMax=i+1;
						}
						isFind=true;
					}
					else
					{
						if(isFind&&isNaN(containMin))
						{
							containMin=i-this._widthCount+1;
							break;
						}
					}
				}
			}
			if(isNaN(containMax))
			{
				containMax=l-1;
			}
			if(isNaN(containMin))
			{
				containMin=0;
			}
			if(containMin<0)
			{
				containMin=0;
			}
			if(containMax>l-1)
			{
				containMax=l-1;
			}
			if(this._curShowItem)
			{
				this._curShowItem.min=containMin;
				this._curShowItem.max=containMax;
			}
			else
			{
				this._curShowItem={min:containMin,max:containMax};
			}
			if(lastMin==-1&&lastMax==-1)
			{
				for(let i:number=containMin;i<=containMax;i++)
				{
					this.showItem(i,islookDown);
				}
			}
			else
			{
				//无交集
				if(lastMax < containMin || lastMin > containMax){
					let start = lastMax < containMin ? lastMin : (containMax + 1);
					let end = lastMax < containMin ? (containMin - 1) : lastMax;
					for(let i:number=start;i<=end;i++){
						this.hideItem(i,islookDown);
					}
					for(let i:number=containMin;i<=containMax;i++){
						this.showItem(i,islookDown);
					}
				}
				else{
					//有交集
					if(lastMin!=containMin)
					{
						let big:number=lastMin>containMin?lastMin:containMin;
						let small:number=lastMin<containMin?lastMin:containMin;
						let opera:(index:number,islookDown:boolean)=>void=null;
						if(islookDown)
						{
							opera=lastMin<containMin?this.hideItem:this.showItem;
						}
						else
						{
							opera=lastMin<containMin?this.hideItem:this.showItem;
						}
						for(let i:number=small;i<big;i++)
						{
							opera.call(this,i,islookDown);
						}
					}
					if(lastMax!=containMax)
					{
						let big:number=lastMax>containMax?lastMax:containMax;
						let small:number=lastMax<containMax?lastMax:containMax;
						let opera:(index:number,islookDown:boolean)=>void=lastMax>containMax?this.hideItem:this.showItem;
						// if(islookDown)
						// {
							opera=lastMax>containMax?this.hideItem:this.showItem;
						// }
						// else
						// {
						// 	opera=lastMax<containMax?this.hideItem:this.showItem;
						// }
						for(let i:number=small;i<=big;i++)
						{
							opera.call(this,i,islookDown);
						}
					}
					// for(let i:number=containMin;i<=containMax;i++){
					// 	this.showItem(i);
					// }
					// let big:number=lastMin>containMin?lastMin:containMin;
					// let small:number=lastMin<containMin?lastMin:containMin;
					// let opera:(index:number)=>void=null;
					// opera=lastMin<containMin?this.hideItem:this.showItem;
					
					// for(let i:number=small;i<=big;i++)
					// {
					// 	opera.call(this,i);
					// }
						
					// if(lastMin < containMin){
					// 	for(let i:number=lastMin;i<containMin;i++){
					// 		this.hideItem(i);
					// 	}

					// }
					// if(lastMax > containMax){
					// 	for(let i:number=(containMax+1);i<=lastMax;i++){
					// 		this.hideItem(i);
					// 	}
					// }
				}
			}
			// this._lastMin = lastMin;
			// this._lastMax = lastMax;
			// this._nowMin = containMin;
			// this._nowMax = containMax;
			// App.LogUtil.show(lastMin,lastMax,">>",containMin,containMax);
			if(!this._lastPos)
			{
				this._lastPos=egret.Point.create(this.scrollRect.x,this.scrollRect.y);
			}
			else
			{
				this._lastPos.setTo(this.scrollRect.x,this.scrollRect.y);
			}
		}
		if(this.checkIsAtButtom()&&this._curPageIndex<=this._maxPage)
		{
			this.initNextPage();
		}
	}

	private hideItem(index:number,islookDown:boolean):void
	{
		if(this.content instanceof egret.DisplayObjectContainer)
		{
			let item:ScrollListItem=this._scrollListItemArr[index];
			if(this.content.contains(item))
			{
				this.content.removeChild(item);
				// App.LogUtil.show("remove",index);
			}
		}
	}
	private showItem(index:number,islookDown:boolean):void
	{
		if(this.content instanceof egret.DisplayObjectContainer)
		{
			let item:ScrollListItem=this._scrollListItemArr[index];
			if(item&&this.content&&this.content.contains(item)==false)
			{
				let scaleV=islookDown?1:-1;
				let checkItem=this._scrollListItemArr[index+scaleV];
				if(checkItem&&this._lastPos)
				{
					let cidx=this.content.getChildIndex(checkItem);
					cidx+=(islookDown?0:1);
					this.content.addChildAt(item,cidx);
				}
				else
				{
					this.content.addChild(item);
				}
				// App.LogUtil.show("show",index);
			}
		}
	}

	public setContentHeight(num : number):void{
		if(this.content){
			this.content.height += num;
		}
	}

	/**
     * 添加触摸回调
     */ 
    public addTouchTap(touchTapHandler:(e:egret.TouchEvent,...args)=>void,touchTapHandlerThisObj:any,touchTapHandlerParams?:any[])
    {
		let ths=this;
        if(this._touchTapHelper==null)
        {
			//局部调用，勿改
			let tapHandler=function(event:egret.TouchEvent,...args):void
			{
				if(event.type==egret.TouchEvent.TOUCH_END)
				{
					let scrollRect:egret.Rectangle=ths.scrollRect;
					let offx:number=scrollRect?scrollRect.x:0;
					let offy:number=scrollRect?scrollRect.y:0;
					let min:number=ths._curShowItem?ths._curShowItem.min:0;
					let max:number=ths._curShowItem?ths._curShowItem.max:ths._scrollListItemArr.length-1;
					let checkRect:egret.Rectangle=egret.Rectangle.create();
					let {x,y} = ths.content.globalToLocal(event.stageX,event.stageY);
					for(var i:number=min;i<=max;i++)
					{
						let item=ths._scrollListItemArr[i];
						let tmpX:number=ths._scrollListHeightArr[i].x;
						let tmpY:number=ths._scrollListHeightArr[i].y;
						let itemRect:egret.Rectangle=ths._scrollListItemArr[i].getBounds(ths._scrollListHeightArr[i]);
						itemRect.x=tmpX;
						itemRect.y=tmpY;
						checkRect.setTo(itemRect.x,itemRect.y,itemRect.width-item.getSpaceX(),itemRect.height-item.getSpaceY());
						if(checkRect.contains(x,y))
						{
							let btnList:BaseButton[]=this.findBtn(item);
							let btnL:number=btnList.length;
							for(let ii:number=0;ii<btnL;ii++)
							{
								let childRect:egret.Rectangle=btnList[ii].getBounds();
								childRect.x=itemRect.x+btnList[ii].x;
								childRect.y=itemRect.y+btnList[ii].y;
								if(childRect.contains(x,y))
								{
									return;
								}
							}
							//处理点击逻辑
							event.data=i;
							if(touchTapHandler)
							{
								let params:any[]=[event];
								if(args&&args.length>0)
								{
									params.concat(args);
								}
								touchTapHandler.apply(touchTapHandlerThisObj,params);
							}
							break;
						}
					}
					egret.Rectangle.release(checkRect);
				}
			}
            this._touchTapHelper = TouchHelper.addTouch(this.content, tapHandler,this,touchTapHandlerParams,true);
        }
    }

	private findBtn(item:egret.DisplayObjectContainer):BaseButton[]
	{
		let btnList:BaseButton[]=[];
		let itemChildNum:number=item.numChildren;
		for(let ii:number=0;ii<itemChildNum;ii++)
		{
			let child=item.getChildAt(ii);
			if(child instanceof BaseButton)
			{
				btnList.push(child);
			}
			else if(child instanceof egret.DisplayObjectContainer)
			{
				this.findBtn(child);
			}
		}
		return btnList;
	}

	/**
	 * 移动到指定位置
	 * @param index 元素索引
	 * @param duration 缓动时间 
	 */
	public setScrollTopByIndex(index:number,duration?:number):void
	{
		if(index>=this._scrollListItemArr.length)
		{
			if(this._scrollListItemArr.length>=this._dataList.length)
			{
				index=this._scrollListItemArr.length-1;
			}
			else if(this._curPageIndex<=this._maxPage)
			{
				this.initNextPage();
				return this.setScrollTopByIndex(index,duration);
			}
			else
			{
				index=this._scrollListItemArr.length-1;
			}
		}
		let scrollTop:number=this._scrollListHeightArr[index].y+this._scrollListHeightArr[index].height/2;
		let endRect:egret.Rectangle=this._scrollListHeightArr[this._scrollListHeightArr.length-1];
		let maxY:number=endRect.y+endRect.height;
		let isTop:boolean=false;
		let isEnd:boolean=false;
		if(scrollTop<this._scrollRect.height/2)
		{
			scrollTop=0;
		}
		else if(scrollTop>maxY-this._scrollRect.height/2)
		{
			scrollTop=maxY-this._scrollRect.height;
		}
		else
		{  
			scrollTop=this._scrollListHeightArr[index].y + this._scrollListHeightArr[index].height/2 - this._scrollRect.height/2;
		}
		this.setScrollTop(scrollTop, duration);
	}

	public setScrollLeftByIndex(index:number,duration?:number):void
	{
		if(index>=this._scrollListItemArr.length)
		{
			if(this._scrollListItemArr.length>=this._dataList.length)
			{
				index=this._scrollListItemArr.length-1;
			}
			else if(this._curPageIndex<=this._maxPage)
			{
				this.initNextPage();
				return this.setScrollTopByIndex(index,duration);
			}
			else
			{
				index=this._scrollListItemArr.length-1;
			}
		}
		let scrollLeft:number=this._scrollListHeightArr[index].x+this._scrollListHeightArr[index].width/2;
		let endRect:egret.Rectangle=this._scrollListHeightArr[this._scrollListHeightArr.length-1];
		let maxX:number=endRect.x+endRect.width;
		if(scrollLeft<this._scrollRect.width/2)
		{
			scrollLeft=0;
		}
		else if(scrollLeft>maxX-this._scrollRect.width/2)
		{
			scrollLeft=maxX-this._scrollRect.width;
		}
		else
		{
			scrollLeft=this._scrollListHeightArr[index].x+this._scrollListHeightArr[index].width/2-this._scrollRect.width/2;
		}
		this.setScrollLeft(scrollLeft, duration);
	}

	/**
	 * 移动到底部
	 * @param duration 缓动时间
	 * 
	 */
	public moveToButtom(duration?:number):void
	{
		if(this._scrollListHeightArr)
		{
			if(this.checkIsAtButtom()==false)
			{
				let index:number=this._scrollListHeightArr.length-1;
				this.setScrollTopByIndex(index);
			}
		}
	}

	/**
	 * 检测是否在底部
	 */
	public checkIsAtButtom():boolean
	{
		if(this._scrollListHeightArr.length>0)
		{
			let lastIndex:number=this._scrollListHeightArr.length-1;	
			let maxY:number = this._scrollListHeightArr[lastIndex].y+this._scrollListHeightArr[lastIndex].height-this._scrollRect.height;
			if(this.scrollTop>=maxY-this._scrollListItemArr[lastIndex].getSpaceY())
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		return true;
	}

	public bindMoveCompleteCallback(callback:Function,callbackObj:any):void
	{
		this._moveCompleteCallBack=callback;
		this._moveComPleteCallBackObj=callbackObj;
	}

		/**
     * 箭头翻阅提示
     */
	public checkShowArrow():boolean{
		let view = this;
		let flag = false;
		let content : any = view.content;

		let paramH = 0;
		if(view._curShowItem && view._curShowItem.max){
			let lastitem = view.getItemByIndex(view._curShowItem.max);
			if(lastitem){
				paramH = lastitem.height - Math.min(lastitem.getSpaceY(), 10);
			}
		}
		
		let height = content.height - (view.height + paramH);
		if(this.verticalScrollPolicy != 'off'){
			if(height > 0 && view.scrollTop < height){
				flag = true;
			}
		}
		return (flag && this._isShowArrow);
	}

	public dispose():void
	{
		this._moveCompleteCallBack=null;
		this._moveComPleteCallBackObj=null;
		this.removeTouchTap();
		this.removeTouch();
		if(this._scrollListItemArr&&this._scrollListItemArr.length>0)
		{
			while(this._scrollListItemArr.length>0)
			{
				let item:ScrollListItem = this._scrollListItemArr.pop();
				if(item)
				{
					ScrollListItem.release(item);
				}
			}
		}
		super.dispose();
		this._scrollListItemArr.length=0;
		this._scrollListHeightArr.length=0;
		if(this._scrollRect)
		{
			this._scrollRect=null;
		}
		if(this._lastPos)
		{
			egret.Point.release(this._lastPos);
			this._lastPos=null;
		}
		this._curShowItem=null;
		this._widthCount=-1;
		this._curPageIndex=1;
		this._maxPage=1;
		this._itemParam=null;
		this._isFill = false;
		this._useHeight = false;
	}
}

