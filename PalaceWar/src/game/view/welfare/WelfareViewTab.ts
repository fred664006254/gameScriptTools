/**
 * 福利界面tab父类
 * author dmj
 * date 2017/11/03
 * @class WelfareViewTab
 */
abstract class WelfareViewTab extends BaseLoadDisplayObjectContiner
{
	public bottomBg:BaseBitmap; 
	public isWanbaBoo:boolean = false;
	// 参数
	protected param:any;
	// 页签
	protected tabbarGroup:TabBarGroup;
	protected tabbarGroupBg:BaseBitmap;
	// 保存tabview数据
	protected tabViewData:Object = {};
	// 当前选中的页签
	protected _selectedTabIndex:number = 0;
	// 上次选中的页签
	private _lastSelectedTabIndex:number = null;
	//大框
	protected bigframe:BaseBitmap = null;

	public constructor() 
	{
		super();
	}

	protected init():void
	{	
		this.isWanbaBoo =Api.switchVoApi.checknewRecharge();		
		var logdStr = BaseBitmap.create(this.getResPreName() + "_bg");
		let totalSignDay = Api.arrivalVoApi.getTotalSignDay();
		let weizheng = false;
		if(this.getResPreName()=="signin")
		{
			if(totalSignDay<=Config.GameprojectCfg.sign2Day)
			{
				if(!Api.sevenDaysSignupLoginVoApi.checkUserIsNewer())
				{
					logdStr.setRes(this.getResPreName() + "3_bg");
					weizheng = true;
				}
			}
			else if(totalSignDay>Config.GameprojectCfg.sign2Day && totalSignDay<=Config.GameprojectCfg.sign7Day)
			{
				if(!Api.sevenDaysSignupLoginVoApi.checkUserIsNewer())
				{
					logdStr.setRes(this.getResPreName() + "2_bg");
				}
			}
			else if(totalSignDay>Config.GameprojectCfg.sign7Day && totalSignDay<=Config.GameprojectCfg.sign30Day)
			{
				if(Api.switchVoApi.checkOpenNewSignIn())
				{
					logdStr.setRes(this.getResPreName() + "5_bg");
				}
				
			}
			else if(totalSignDay>Config.GameprojectCfg.sign30Day && totalSignDay<=Config.GameprojectCfg.sign100Day)
			{
				if(Api.switchVoApi.checkOpenNewSignIn())
				{
					logdStr.setRes(this.getResPreName() + "6_bg");
				}
				
			}
			else if(totalSignDay>Config.GameprojectCfg.sign100Day && totalSignDay<=Config.GameprojectCfg.sign365Day)
			{
				if(Api.switchVoApi.checkOpenNewSignIn())
				{
					logdStr.setRes(this.getResPreName() + "4_bg");
				}
			}
			else if(totalSignDay>Config.GameprojectCfg.sign365Day && totalSignDay<=Config.Signup500dayCfg.showDay)
			{
				if(Api.switchVoApi.checkOpenNewSignIn())
				{
					logdStr.setRes(Api.switchVoApi.checkOpenBlueWife() ? "sign_bg_500_blueType" : "sign_bg_500");
				}
			}
			else if(totalSignDay>Config.Signup500dayCfg.showDay && totalSignDay<=Config.Signup500dayCfg.showLastDay())
			{
				if(Api.switchVoApi.checkOpenNewSignIn())
				{
					logdStr.setRes("sign_bg_560");
				}
			}
			else if(totalSignDay>Config.Signup500dayCfg.showLastDay() && totalSignDay<=Config.GameprojectCfg.sign600Day)
			{
				if(Api.switchVoApi.checkOpenNewSignIn())
				{
					logdStr.setRes("sign_bg_600");
				}
			}
			else if(totalSignDay>Config.GameprojectCfg.sign600Day && totalSignDay<=Config.GameprojectCfg.sign700Day)
			{
				if(Api.switchVoApi.checkOpenNewSignIn())
				{
					logdStr.setRes("sign_bg_700");
				}
			}
			else if(totalSignDay>Config.GameprojectCfg.sign700Day && totalSignDay<=Config.GameprojectCfg.sign800Day)
			{
				if(Api.switchVoApi.checkOpenNewSignIn())
				{
					logdStr.setRes("sign_bg_800");
				}
			}
			else if(totalSignDay>Config.GameprojectCfg.sign800Day && totalSignDay<=Config.GameprojectCfg.sign900Day)
			{
				if(Api.switchVoApi.checkOpenNewSignIn())
				{
					logdStr.setRes("sign_bg_900");
				}
			}
		} 
		else if (this.getResPreName()=="yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) {
			// vip折扣
			let picname = this.getResPreName() + (PlatformManager.checkIsXlSp()?"_discount_xianlaiType_bg":"_discount_bg");
			logdStr =BaseBitmap.create(picname);
		}
		else if(this.isWanbaBoo&&this.getResPreName()=="firstrecharge")
		{
			let picname = "firstrecharge2_bg";
			logdStr =BaseBitmap.create(picname);
		}
		var bg:BaseBitmap =logdStr;  

		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&(this.getResPreName().indexOf("monthcard") > -1 || this.getResPreName().indexOf("yearcard") > -1))
		{
			this.bottomBg = BaseBitmap.create("welfareview_bg");
			this.bottomBg.y = bg.y + bg.height -78;
			 
		}
		else
		{
			this.bottomBg = BaseBitmap.create("common_9_bg");
			this.bottomBg.y = bg.height;
			this.bottomBg.height = GameConfig.stageHeigth - 89 - bg.height;
		}

		this.addChild(this.bottomBg);
		this.addChild(bg); 

		if (weizheng)
		{
			let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById("1050");
            if(servantCfg.quality2)
			{	
				let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
				cornerImg.x = 395;
				cornerImg.y = 150;
				cornerImg.setScale(1.3);
				this.addChild(cornerImg);
			}
		}

	}

	protected getParent():egret.DisplayObjectContainer
	{
		return null;
	}

	protected getResourceList():string[]
	{
		let preName:string = this.getResPreName();
		let arr:string[] = [];
		arr.push(preName + "_btn");
		if (preName=="yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) {
			arr.push(preName + (PlatformManager.checkIsXlSp()?"_discount_xianlaiType_bg":"_discount_bg"));
		} else {
			arr.push(preName + "_bg");
		}
		let descImage = preName + "_desc";
		let iconImage = preName + "_icon";
		if(RES.hasRes(descImage))
		{
			arr.push(descImage);
		}
		if(RES.hasRes(iconImage))
		{
			arr.push(iconImage);
		}
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
		{
			arr.push("welfareview_bg");
		}
		return arr;
	}

	protected getResPreName():string
	{
		let className:string = egret.getQualifiedClassName(this);
		let preName:string = className.substring(11,className.length);
		return preName.toLowerCase();
	}


	protected getTabbarTextArr():Array<string>
	{
		return [];
	}
	// 页签图名称
	protected getTabbarName():string|string[]{
		return ButtonConst.BTN_TAB;
	}

	protected addTabbarGroupBg():boolean{
		return false;
	}

	protected get uiType():string
	{
		return "";
	}


	protected initTabbarGroup():void{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
			if(this.addTabbarGroupBg()){
				let bg = BaseBitmap.create(`commonview_tabbar_bg`);
				this.addChild(bg);
				this.tabbarGroupBg = bg;
			}


			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this);
			let tabBarX:number=(this instanceof PopupView)?30:15;
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;

			if (this.uiType == "2")
			{
				this.tabbarGroup.setSpace(0);
				this.tabbarGroup.x+=5;
				this.tabbarGroup.setColor(0xe1ba86,0x472c26);
				this.setBigFameY(0);
			}
			
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
		}
			// this.changeTab();
	}


	protected setBigFameY(y:number):void
	{
		if (this.bigframe)
		{
			this.bigframe.y = y;
			this.bigframe.height = GameConfig.stageHeigth - this.y - y;
		}
	}

	protected setTabBarPosition():void{
		
	}

	protected getTabbarGroupY():number{
		return 0;
	}

	protected clickTabbarHandler(data:any):void
	{
		
		App.LogUtil.log("index: " + data.index);
		var index = Number(data.index);
		if(this.checkTabCondition(index) == false)
		{
			// 重新checkTabCondition方法处理
			this.tabbarGroup.selectedIndex=this.selectedTabIndex;
			return;
		}
		this.lastSelectedTabIndex = this.selectedTabIndex;
		this.selectedTabIndex = index;
		this.changeTab();
	}
	// (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{
		return true;
	}

	protected set selectedTabIndex(index:number)
	{
		if(!isNaN(index))
		{
			this._selectedTabIndex = index;
		}
	}
	protected get selectedTabIndex():number
	{
		return this._selectedTabIndex;
	}
	protected set lastSelectedTabIndex(index:number)
	{
		if(!isNaN(index))
		{
			this._lastSelectedTabIndex = index; 
		}
		
	}
	protected get lastSelectedTabIndex():number
	{
		return this._lastSelectedTabIndex;
	}

	protected changeTab():void
	{
		let tabveiwClass:any = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex+1));
		if(tabveiwClass)
		{
			let commViewTab:ViewTab=<ViewTab>this.tabViewData[this.selectedTabIndex];
			if(commViewTab)
			{
				this.addChild(commViewTab);
				commViewTab.refreshWhenSwitchBack();
			}
			else
			{
				let tabView:ViewTab = new tabveiwClass(this.param);
				tabView.setPosition(0,this.y + this.getTabbarGroupY());
				this.tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"]=this.param;
				this.addChild(tabView);
				// this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
		
	}

	/**获取当前选中的tab实例 */
	public getSelectedTab():ViewTab
	{
		if(this.tabViewData && this.tabViewData[this.selectedTabIndex])
		{
			return this.tabViewData[this.selectedTabIndex];
		}
		return null;
	}

	/**检查是否为当前选中的页签 */
	public checkSelectedTab(index:number):boolean
	{
		if(index == this.selectedTabIndex)
		{
			return true;
		}
		return false;
	}

	protected addRedPoint(index:number):void
	{
		if(this.tabbarGroup)
		{
			this.tabbarGroup.addRedPoint(index);
		}
	}

	protected removeRedPoint(index:number):void
	{
		if(this.tabbarGroup)
		{
			this.tabbarGroup.removeRedPoint(index);
		}
	}

	/**
	 * 切换页签
	 */
	public refreshWhenSwitchBack():void
	{

	}

	public dispose():void
	{
		if(this.bottomBg)
		{
			this.removeChild(this.bottomBg);
			this.bottomBg.dispose();
			this.bottomBg = null;
		}
		super.dispose();
	}
}