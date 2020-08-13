/**
 * 通用弹板的父类
 * author dmj
 * date 2017/9/19
 * @class PopupView
 */
abstract class PopupView extends BaseView 
{
	// 确认按钮
	private _confirmBtn:BaseButton;
	
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		
		super.init();
		
		this.initButton();
		this.resetBgSize();
	}
	/**生成新标头 */
	protected isHaveTitle():boolean
	{
		return false;
	}
	/**是否需要木板背景 只有在有tab页签的时候才能用*/
	protected isHaveTabBg():boolean
	{
		return false;
	}
	protected initViewBg():void
	{
		super.initViewBg();
		this.initTitleBg();
		

	}
	public show(data?:any):void
	{
		if(this.isShow())
		{
			return;
		}
		if(data)
		{
			this.param = data;
		}
		super.show(data);
	}

	// 需要加载的资源
	protected getResourceList():string[]
	{
		let resArr:string[]=[];
		this.checkAndPushRes(this.getBgName(),resArr);
		this.checkAndPushRes(this.getTitleBgName(),resArr);
		this.checkAndPushRes(this.getCloseBtnName(),resArr);

		let titleArr:string[] = [];
		if(this.isHaveTitle()){

			titleArr.push("popupview_bg3");
			titleArr.push("popupview_bg4");
			titleArr.push("popupview_bg5");
		}


		let lowClassName:string=this.getClassName().toLowerCase();

		if(RES.hasRes(lowClassName))
		{
			resArr[resArr.length]=lowClassName;
		}
		return super.getResourceList().concat(resArr).concat(titleArr);
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			if(bgName == "public_rule_bg")
			// if(bgName == "promotion_scroll")
			{
				this.viewBg = App.CommonUtil.getContainerByLeftHalfRes(bgName);
			
				// this.viewBg = new BaseDisplayObjectContainer();
				// let panel = BaseBitmap.create("promotion_scroll_1");
				// let scrollLeft = BaseBitmap.create("promotion_scroll");
				// let scrollRight = BaseBitmap.create("promotion_scroll");

				
				// this.viewBg.width = panel.width + scrollLeft.width * 2;
				// this.viewBg.height = scrollLeft.height;
				// panel.x = this.viewBg.width / 2 - panel.width/2;
				// panel.y = this.viewBg.height /2 - panel.height/2;

				// scrollLeft.scaleX = -1;
				// scrollLeft.x = scrollLeft.width;
				// scrollLeft.y = this.viewBg.height /2 - scrollLeft.height/2;

				// scrollRight.x = panel.width + panel.x;
				// scrollRight.y = this.viewBg.height /2 - scrollRight.height/2;

				// this.viewBg.addChild(panel);
				// this.viewBg.addChild(scrollLeft);
				// this.viewBg.addChild(scrollRight);
		

			}
			else
			{
				this.viewBg = BaseBitmap.create(bgName);
			}
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			this.addChild(this.viewBg);
			if(bgName == "popupview_bg2")
			{
				this.viewBg.width = this.getShowWidth();

			}
		}
	}
	private initTitleBg():void
	{
		if(this.isHaveTitle()){

			let newTitleBg = BaseBitmap.create("popupview_bg3");
			newTitleBg.x = this.viewBg.width/2 - newTitleBg.width/2;
			newTitleBg.y = this.viewBg.y-5;
			newTitleBg.name = "newTitleBg";
			this.addChildToContainer(newTitleBg);

			let newLine = BaseBitmap.create("popupview_bg5");
			let newRedBg = BaseBitmap.create("popupview_bg4");
			newLine.name = "newLine";
			newRedBg.name = "newRedBg";
			newLine.width = newRedBg.width;
			newLine.x = this.viewBg.width/2 - newLine.width/2;
			newLine.y = newTitleBg.y + 10;

			newRedBg.x = this.viewBg.width/2 - newRedBg.width/2;
			newRedBg.y = newLine.y;
			this.addChildToContainer(newLine);
			this.addChildToContainer(newRedBg);
		

		}
	}
	private initButton():void
	{
		if(this.getConfirmBtnStr())
		{
			this._confirmBtn = ComponentManager.getButton(this.getConfirmBtnName(),this.getConfirmBtnStr(),this.clickConfirmHandler,this);
			this._confirmBtn.x = this.getShowWidth()/2 - this._confirmBtn.width/2;
			this._confirmBtn.y = this.container.height - this._confirmBtn.height - 10;
			this.addChildToContainer(this._confirmBtn);
		}
	}

	// 重置背景的高度,popupview才用
	protected resetBgSize():void
	{
		if(this.viewBg)
		{

			if(this.getShowHeight() == 0)
			{
				if(this.getBgName() != "public_rule_bg")
				{
					let containerPosData=this.getContainerRealHeight();
					let containerRealHeight:number=containerPosData.maxH;
					let minY:number=Math.max(containerPosData.startY,0);
					if(this.container.height+minY > containerRealHeight)
					{
						this.container.height = containerRealHeight-minY;
					}
					if((this.container.y+this.container.height + minY + this.getBgExtraHeight()+13)<=900)
					{
						if(this.viewBg.height <= this.container.y+this.container.height + minY + this.getBgExtraHeight()+13)
						{
							this.viewBg.height = this.container.y+this.container.height + minY + this.getBgExtraHeight()+13;
						}
					}
					else
					{
						this.viewBg.height = 900;
					}
				}
			}
			else
			{
				this.viewBg.height = this.getShowHeight();
			}
			this.viewBg.x = GameConfig.stageWidth/2 - this.viewBg.width/2;
			this.viewBg.y = GameConfig.stageHeigth/2 - this.viewBg.height/2;

			this.container.x = this.viewBg.x;
			this.container.y = this.viewBg.y + this.getContainerY();




			if(this._confirmBtn)
			{
				if(this.getShowHeight() == 0)
				{
					this._confirmBtn.y = this.container.height + 10;
				}
				else
				{
					this._confirmBtn.y = this.viewBg.height - this.getContainerY() - this._confirmBtn.height - 25;
				}
				
			}
			if(this.titleBg)
			{
				this.titleBg.x = this.viewBg.x + this.viewBg.width/2 - this.titleBg.width/2;
				if(this.getBgName() == "public_rule_bg")
				{
					this.titleBg.y = this.viewBg.y + 5;
				}
				else
				{
					this.titleBg.y = this.viewBg.y + 20;
				}
			}
			if(this.titleTF)
			{
				this.titleTF.size = TextFieldConst.FONTSIZE_TITLE_SMALL;
				this.titleTF.x = this.viewBg.x + this.viewBg.width/2 - this.titleTF.width/2;
				this.titleTF.y = this.viewBg.y + 14 + 5;
			}
			if(this.closeBtn)
			{
				if(this.getBgName() != "public_rule_bg")
				{
					this.closeBtn.y = this.viewBg.y + 30 + 23;
					this.closeBtn.x = this.viewBg.x + this.viewBg.width - this.closeBtn.width + 6;
				}
				else
				{
					this.closeBtn.y = this.viewBg.y - 18;
					this.closeBtn.x = this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37;
				}
				
			}
			if(this.tabViewData)
			{
				for(let tabidx in this.tabViewData)
				{
					let tabView:ViewTab = this.tabViewData[tabidx];
					tabView.setPosition(this.container.x,this.container.y);
				}
			}
			if(this.tabbarBg){
				this.tabbarBg.y = this.viewBg.y + 62;
				this.tabbarBgLine.y = this.tabbarBg.y + 69-this.tabbarBgLine.height+7;
			}

			this.setTabBarPosition();
		}
	}
	protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX:number=0;
			let tabY:number=0;
			// if(egret.is(this,"PopupView"))
			// {
			// 	if(this.tabbarBg){
			// 		tabX = this.tabbarBg.x + 10;
			// 		tabY = this.tabbarBgLine.y - this.tabbarGroup.height;
			// 	} else{
			// 		tabX=this.viewBg.x+30;
			// 		// tabY=this.viewBg.y+60;
			// 		tabY=this.viewBg.y+75;
			// 	}

			// }
			if(this.tabbarBg){
					tabX = this.tabbarBg.x + 10;
					tabY = this.tabbarBgLine.y - this.tabbarGroup.height;
			} else{
				tabX=this.viewBg.x+30;
				// tabY=this.viewBg.y+60;
				tabY=this.viewBg.y+75;
			}
			tabX+=this.getTabbarGroupX(); 
			tabY+=this.getTabbarGroupY();
			this.tabbarGroup.setPosition(tabX,tabY);
			if(this.isHaveTabBg() && this.tabbarBg){
				this.tabbarBg.height = this.viewBg.height - 94;
			}
		}
	}
	/**
	 * 计算container实际高度
	 */
	protected getContainerRealHeight():{maxH:number,startY:number}
	{
		let maxH:number = 0;
		let startY:number=Number.MAX_VALUE;
		for(let i=0;i<this.container.numChildren;i++)
		{
			let obj = this.container.getChildAt(i);
			if(obj && (obj.y + obj.height*obj.scaleY) > maxH)
			{
				maxH = obj.y + obj.height*obj.scaleY;
			}
			if(obj.y<startY)
			{
				startY=obj.y;
			}
		}

		return {maxH:maxH,startY:startY};
	}

	/**
	 * 设置确认按钮坐标
	 * @param x 
	 * @param y 
	 */
	public setConfirmBtnPosition(x:number,y:number):void
	{
		if(this._confirmBtn)
		{
			if(x)
			{
				this._confirmBtn.x = x;
			}
			if(y)
			{
				this._confirmBtn.y = y;
			}
		}
	}

	/**
	 * 设置按钮显示状态
	 * @param isshow true：显示
	 */
	public setConfirmBtnVisible(isshow:boolean):void
	{
		if(this._confirmBtn)
		{
			this._confirmBtn.visible = isshow;
		}
	}

	// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 40;
	}

	protected clickConfirmHandler(data:any):void
	{
		App.LogUtil.log("clickConfirmHandler");
		this.hide();
	}

	// 背景图名称
	protected getBgName():string
	{
		return "popupview_bg2";
	}
	// 标题背景名称
	protected getTitleBgName():string
	{
		return null;
	}

	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return ButtonConst.POPUP_CLOSE_BTN_1;
	}

	// 确认按钮名称
	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_TAB;
	}

	protected getConfirmBtnStr():string
	{
		return "";
	}

	public dispose():void
	{
		
		if(this._confirmBtn)
		{
			this.removeChildFromContainer(this._confirmBtn);
			this._confirmBtn.dispose();
			this._confirmBtn = null;
		}
		this.param = null;
		
		super.dispose();
	}
}