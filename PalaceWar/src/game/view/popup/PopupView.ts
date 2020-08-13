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
	protected _hudieClip:CustomMovieClip = null;
	private _frame:BaseBitmap = null;
	
	public constructor() 
	{
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected init():void
	{
		
		super.init();
		this.initFrame();
		this.initButton();
		this.resetBgSize();
	}


	protected getFrameName():string
	{
		return null;
	}

	protected getFrameWidth():number
	{
		return 530;
	}

	private initFrame():void
	{
		if (this.getFrameName())
		{
			this._frame = BaseBitmap.create(this.getFrameName());
			this._frame.width = this.getFrameWidth();
			this._frame.x = this.viewBg.width/2-this._frame.width/2
			this.container.addChildAt(this._frame,0);
		}
	}

	public show(data?:any):void
	{
		if(this.isShow())
		{
			this.switchToTop(data);
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
		this.checkAndPushRes(this.getFrameName(),resArr);
		this.checkAndPushRes(this.getRuleBtnName(),resArr);
		let lowClassName:string=this.getClassName().toLowerCase();
		if(RES.hasRes(lowClassName))
		{
			resArr[resArr.length]=lowClassName;
		}
		return super.getResourceList().concat(resArr);
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			if(bgName == "public_rule_bg")
			{
				this.viewBg = App.CommonUtil.getContainerByLeftHalfRes(bgName);
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
			if(bgName == "popupview_bg1")
			{
				this.viewBg.width = this.getShowWidth();
			}
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
				this.titleTF.size = TextFieldConst.FONTSIZE_TITLE_COMMON;
				if (PlatformManager.checkIsRuSp())
				{
					this.titleTF.size = 16;
				}else if (PlatformManager.checkIsThSp())
				{
					this.titleTF.size = 20;
				}

				this.titleTF.x = this.viewBg.x + this.viewBg.width/2 - this.titleTF.width/2;
				this.titleTF.y = this.viewBg.y + 15;
				if (this.uiType == "2")
				{	
					this.titleTF.size = TextFieldConst.FONTSIZE_TITLE_SMALL;
					this.titleTF.x = this.viewBg.x + this.viewBg.width/2 - this.titleTF.width/2;
					this.titleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
					this.titleTF.y = this.viewBg.y+32;
				}
			}
			if(this.closeBtn)
			{
				if(this.getBgName() != "public_rule_bg")
				{
					this.closeBtn.y = this.viewBg.y - 15;
					this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 15);
					if (this.uiType == "2")
					{
						this.closeBtn.y= this.viewBg.y-1;
						this.closeBtn.x = (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 12);
						if (!this._hudieClip)
						{
							this._hudieClip = ComponentManager.getCustomMovieClip("popupviewhudie",10);
							this._hudieClip.x = this.closeBtn.x-45;
							this._hudieClip.y = this.closeBtn.y-45;
							this._hudieClip.blendMode = egret.BlendMode.ADD;
							this.addChild(this._hudieClip);
							this._hudieClip.playWithTime();
						}
					}
				}
				else
				{
					this.closeBtn.y = this.viewBg.y - 18;
					this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
					
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

			if (this._frame)
			{
				this._frame.height =this.viewBg.y+ this.viewBg.height - this.container.y-25;
			}

			this.setTabBarPosition();
			this.resetRuleBtn();
			if(this.getBgName() == "popupview_bg3" && this.titleTF){
				if(this.closeBtn){
					this.closeBtn.y += 10;
				}
				this.titleTF.x = GameConfig.stageWidth/2 - this.titleTF.width/2;
				this.titleTF.y = this.viewBg.y + 29;
				this.titleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);

				// let butterfly = ComponentManager.getCustomMovieClip(`tabhudie`, 8)//BaseBitmap.create("btn2_tab_fly");
				// butterfly.width = 33;
				// butterfly.height = 31;
				// butterfly.scaleX = -1;
				// butterfly.playWithTime(-1);
				// this.addChild(butterfly);

				// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, butterfly,this.closeBtn, [20,-10]);
				if (!this._hudieClip && this.closeBtn)
				{
					this._hudieClip = ComponentManager.getCustomMovieClip("popupviewhudie",10);
					this._hudieClip.x = this.closeBtn.x-45;
					this._hudieClip.y = this.closeBtn.y-45;
					this._hudieClip.blendMode = egret.BlendMode.ADD;
					this.addChild(this._hudieClip);
					this._hudieClip.playWithTime();
				}
			}
		}

		//new ui
		if (this.getBgName() == "popupview_bg3")
		{	
			if (this.tabViewData[this.selectedTabIndex])
			{
				this.tabViewData[this.selectedTabIndex].x = this.getOffsetX();
			}
			
		}
	}

	protected changeTab():void
    {
        super.changeTab();
		//new ui
		if (this.getBgName() == "popupview_bg3")
		{
			if (this.tabViewData[this.selectedTabIndex])
			{
				this.tabViewData[this.selectedTabIndex].x = this.getOffsetX();
			}
		}
    }

	protected getOffsetX():number
	{
		return 29;
	}

	protected getOffsetY():number
	{	

		if ( this.tabbarGroup instanceof TabBarScrollGroup)
		{
			return 16;
		}

		if (this.getTabbarName() == ButtonConst.BTN2_TAB)
		{
			return 0;
		}

		
		return 16;
	}

	protected setTabBarPosition():void
	{
        super.setTabBarPosition();
		//new ui
		if (this.getBgName() == "popupview_bg3" && this.tabbarGroup)
		{	
			this.tabbarGroup.y +=this.getOffsetY();
		}
    }



	private resetRuleBtn():void
	{
		if(this._ruleBtn)
		{
			this._ruleBtn.x = 32 + (PlatformManager.hasSpcialCloseBtn()?100:0);
			this._ruleBtn.y = this.closeBtn.y + 10;
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
			if (!obj.measuredHeight)
			{
				continue;
			}
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
		if (this.uiType == "2")
		{
			return "popupview_bg3";
		}
		return "popupview_bg1";
	}
	// 标题背景名称
	protected getTitleBgName():string
	{
		return null;
	}

	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{	
		if (this.uiType == "2")
		{
			return ButtonConst.POPUP_CLOSE_BTN_2;
		}
		return ButtonConst.POPUP_CLOSE_BTN_1;
	}

	//rule btn
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN_RULE;
	}

	// 确认按钮名称
	protected getConfirmBtnName():string
	{	
		if (this.uiType == "2")
		{
			return ButtonConst.BTN2_TAB;
		}
		return ButtonConst.BTN_TAB;
	}

	protected getConfirmBtnStr():string
	{
		return "";
	}

	public hide():void{
		this.playHideViewEffect();
	}

	//显示弹窗动效
	protected playOpenViewEffect():void{
		if(!Api.rookieVoApi.isInGuiding && Api.switchVoApi.checkShowOpenViewAni() && this.isShowOpenAni())
		{
			//打开特效
			this.alpha=0;
			this.scaleX=0.5;
			this.scaleY=0.5;
			this.anchorOffsetX=GameConfig.stageWidth/2;
			this.anchorOffsetY=GameConfig.stageHeigth/2;
			this.x = GameConfig.stageWidth/2;
			this.y = GameConfig.stageHeigth/2;
			if(this._maskBmp)
			{
				this._maskBmp.setScale(2);
				this._maskBmp.x = -GameConfig.stageWidth/2;
				this._maskBmp.y = -GameConfig.stageHeigth/2;
			}
			egret.Tween.get(this, {loop : false}).to({scaleX : 1.1, scaleY : 1.1,alpha:1},200).to({scaleX : 1, scaleY : 1},100)
			.call(function()
			{
				egret.Tween.removeTweens(this);
				if(this._maskBmp)
				{
					this._maskBmp.setScale(1);
					this._maskBmp.x = 0;
					this._maskBmp.y = 0;
				}
				
			},this);	
		}
	}

	//关闭弹窗动效
	protected playHideViewEffect():void{
		if(this.isInit()==true && !Api.rookieVoApi.isInGuiding && Api.switchVoApi.checkShowOpenViewAni() && this.isShowOpenAni()&&(!this["__notShowHideEffect"]))
		{	
			//关闭特效
			if(this._maskBmp)
			{
				this._maskBmp.setScale(2);
				this._maskBmp.x = -GameConfig.stageWidth/2;
				this._maskBmp.y = -GameConfig.stageHeigth/2;
			}
			
			egret.Tween.get(this, {loop : false}).to({scaleX : 0.5, scaleY : 0.5,alpha:0},200)
			.call(()=>
			{
				egret.Tween.removeTweens(this);
				if(this._maskBmp)
				{
					this._maskBmp.setScale(1);
					this._maskBmp.x = 0;
					this._maskBmp.y = 0;
				}
				this.anchorOffsetX=0;
				this.anchorOffsetY=0;
				this.x = 0;
				this.y = 0;
				this.setScale(1);
				super.hide();	
			},this);		
		}
		else{
			super.hide();
		}
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
		this._hudieClip = null;
		this._frame = null;
		
		super.dispose();
	}
}