/**
 * 春节活动
 */
class AcNewYearSevenDaysView extends AcCommonView
{
    private _activityTimerText: BaseTextField = null;
    private _container : BaseDisplayObjectContainer = null;
    // public static AID:string=null;
    // public static CODE:string =null;
    
    private lastType:number=0; 
    private _topBg:BaseBitmap =null;
    private _topBg2:BaseBitmap =null;
 
    public static topBgHeight:number=0; 
    // private public_dot1:BaseBitmap =null;
    // private public_dot2:BaseBitmap =null;
    
    public constructor() {
		super();
    }
    
    private get cfg() : Config.AcCfg.NewYearSevenDaysCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNewYearSevenDaysVo{
        return <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    
    protected getUicode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = this.code;
                break;
        }
        return code;
    }

    protected getTitleStr():string{
        return null;//`acNewYearSevenDays-1_Title`;
    }

    protected getTitleBgName():string{
        let code = this.getUicode();
        return App.CommonUtil.getResByCode(`acnewyear7daytitlename`, code)
    }

	public initView():void
	{
        this.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST,this.isShowRedhot,this); 
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.isShowRedhot,this);   
	    App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT,this.isShowRedhot,this);  
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.isShowRedhot,this);

        let code = this.getUicode();

        let topBg:BaseBitmap = BaseBitmap.create(App.CommonUtil.getResByCode(`acnewyear7days_topbg`, code));
        // topBg.width = GameConfig.stageWidth+18;
        topBg.y = -this.container.y + this.titleBg.height - 7;
        this.addChild(topBg);
        this.addChildToContainer(topBg);
        this._topBg =topBg;

        let container = new BaseDisplayObjectContainer();
        this.addChildToContainer(container);
        this._container = container;
        if (code == "1"){
            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(0, 0);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            container.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            // skinTxtEffect.touchEnabled = false;
    
            let skinTxtStr = "acgiftreturnview_common_skintxt";
            let skinTxt = BaseBitmap.create(skinTxtStr);
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            container.addChild(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            // skinTxt.touchEnabled = false;

            let skinTxteffect = BaseBitmap.create(skinTxtStr);
            skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
            skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
            container.addChild(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            // skinTxteffect.touchEnabled = false;
            //透明点击区域
            let touchPos = BaseBitmap.create("public_alphabg");
            touchPos.width = 160;
            touchPos.height = 40;
            touchPos.setPosition(25, 57);
            container.addChild(touchPos);
            
            touchPos.addTouchTap(() => {
                let topMsg = LanguageManager.getlocal("acNewYear7daystitletip-" + this.code);
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEPOPUPVIEW, { titleId: `4037`, topMsg: topMsg });
            }, this);
            container.x = topBg.x + 455;
            container.y = topBg.y + 75;
        }

        let topBg2:BaseBitmap = BaseBitmap.create(App.CommonUtil.getResByCode(`acnewyear7days_topbg2`, code));
        topBg2.width = GameConfig.stageWidth;
        topBg2.y = topBg.y;
		this.addChildToContainer(topBg2);
        this._topBg2 =topBg2;
        this._topBg2.visible =false; 

        //最底部背景
        let bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth+16;
        bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y -this.container.y+9;
        bottomBg.x = -8; 
        bottomBg.y = topBg.height + topBg.y-4; 

    	//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._activityTimerText.x = 55;
		this._activityTimerText.y = topBg.y + 148; 
		this._activityTimerText.text = LanguageManager.getlocal(`sweetgiftDate`, [this.vo.acTimeAndHour]) 
        this.addChildToContainer(this._activityTimerText);
        if (code == "2"){
            this._activityTimerText.x = 40;
            this._activityTimerText.y = topBg.y + 151; 

        }
        
        let tabName = [];
        let tabY = bottomBg.y + 24;
        let tabX = 15;  


        this.isShowRedhot();
        // this.public_dot1 =BaseBitmap.create("public_dot2");
		// this.addChild(this.public_dot1);
		// this.public_dot1.x =210;
		// this.public_dot1.y = this.tabbarGroup.y + 8;  
        // this.public_dot1.visible = this.vo.firstRed();

        // this.public_dot2 =BaseBitmap.create("public_dot2");
		// this.addChild(this.public_dot2);
		// this.public_dot2.x = 607;
		// this.public_dot2.y = this.tabbarGroup.y + 8;
        // this.public_dot2.visible = this.vo.secondRed();
        AcNewYearSevenDaysView.topBgHeight = GameConfig.stageHeigth - this.tabbarGroup.y - this.tabbarGroup.height;
    }   

    private isShowRedhot():void
    {   
        // if(AcNewYearViewTab2.isStarBoo==true)
        // { 
            if(this.vo.firstRed()){
                this.tabbarGroup.addRedPoint(0);
            }
            else{
                this.tabbarGroup.removeRedPoint(0);
            }

            if(this.vo.secondRed()){
                this.tabbarGroup.addRedPoint(1);
            }
            else{
                this.tabbarGroup.removeRedPoint(1);
            }
        //    this.public_dot1.visible = ;
        //    this.public_dot2.visible = this.vo.secondRed();
        // }
        // else
        // {
        //     this.public_dot2.visible = false; 
        // }
    }
    protected clickTabbarHandler(data:any):void
	{
        super.clickTabbarHandler(data);
        this.acEnd();
        if(data.index==1)
        {
           this._topBg2.visible = true;
           this._topBg.visible = this._container.visible = false;
           this._activityTimerText.visible =false;
        }
        else
        {
            this._topBg2.visible =false;
            this._topBg.visible = this._container.visible = true;
            this._activityTimerText.visible =true;
        }
        
    }
    private  acEnd():void
	{
		if(this.vo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
	}

    protected getTabbarTextArr():Array<string>
	{
        let code = this.getUicode();
		return ["acNewYearViewTab1",
                "acNewYear7daysViewTab2-"+code,
		];
	}
 
    private goToRechargeHandler():void
    {
         ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    } 

    protected getResourceList():string[]
	{
        let code = this.getUicode();
		return super.getResourceList().concat([
            `newsingledaytab2bg-1`,
            `acgiftreturnview_common_skintxt`,
            `newyear7dayscode1`,
            "acnewyear_big_package", 
            "acnewyear_bottom", 
            "acnewyear_bottom2", 
            "acnewyear_bottom3", 
            "acnewyear_chineseknot_" + code,
            // "acnewyear_chineseknot_2",  
            "acnewyear_box",  
            "acnewyear_chineseknot2_" + code, 
            // "acnewyear_chineseknot2_2", 
            "acnewyear_look", 
            "acnewyear_small_package", 
            "acnewyear_topbg_" + code, 
            "acnewyear_topbg2_" + code,  
            // "acnewyear_topbg_2", 
            // "acnewyear_topbg2_2",  
            "progress3",
            "progress3_bg",
            "progress5",
            "servant_bottombg",
            "progress6_bg",
            "forpeople_bottom",
            "rechargevie_effects",
            "common_titlebg",
            "newsingledaytab2bottombg-1",
            "acmidautumnview_titlebg",
            `newyear7dayscode` + code,
         ]);
    } 
    protected get uiType():string
	{
		return "2";
	}

	// 页签图名称
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_BIG_TAB2;
	}

	protected addTabbarGroupBg():boolean{
		return true;
    }
    
    	// 初始化tabbarGroup
	protected initTabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{	
			if(this.addTabbarGroupBg()){
				let bg = BaseBitmap.create(`commonview_tabbar_bg`);
				this.addChild(bg);
				this.tabbarGroupBg = bg;
			}

			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this);
			
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			if (this.uiType == "2")
			{
				this.tabbarGroup.setSpace(180);
				this.tabbarGroup.setColor(0xe1ba86,0x472c26);
				this.setBigFameY(0);
			}
			
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			// this.changeTab();
			
		}
	}

	protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX:number=0;
			let tabY:number=0;
			if(egret.is(this,"PopupView"))
			{
				tabX=this.viewBg.x+30;
				tabY=this.viewBg.y+60;
			}
			else
			{
				tabX=12;
				tabY=(this.titleBg?this.titleBg.y+this.titleBg.height+222:100) - 14;
			}
            this.tabbarGroup.setPosition(tabX,tabY);

			if(this.tabbarGroupBg){
                let tabBgName = ResourceManager.hasRes("acnewyear7days_tabbg-"+this.code) ? "acnewyear7days_tabbg-"+this.code : "acnewyear7days_tabbg";
                this.tabbarGroupBg.setRes(tabBgName);
                let code = this.getUicode();
                this.tabbarGroupBg.x = 0;
                this.tabbarGroupBg.y = tabY + 6;

                let fuimg = BaseBitmap.create(App.CommonUtil.getResByCode(`acnewyear7daysfu`, code));
                this.addChild(fuimg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fuimg, this.tabbarGroupBg, [0,-14]);
			}
			
		}
    }
    
  	// 是否隐藏标题背景阴影
	protected isHideTitleBgShadow():boolean
	{
		return true;
	}

	protected getBigFrame():string{
		return `commonview_bigframe`;
    }

    	// 获取container初始y坐标 		
	protected getContainerY():number
	{
		return 360;
    }
    
    // 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		if(Api.switchVoApi.checkOpenShenheGame()&&PlatformCfg.shenheFunctionName==this.getClassName().toLowerCase().replace("view",""))
		{
			return "";
		}
		return ButtonConst.COMMON_CLOSE_1;
	}
    
	public dispose():void
	{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST,this.isShowRedhot,this);  
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.isShowRedhot,this);  
        
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT,this.isShowRedhot,this);  
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.isShowRedhot,this);

        this.lastType =0;
        this._activityTimerText =null;  
        this._topBg =null;
        this._topBg2 =null;
        AcNewYearSevenDaysView.topBgHeight =0; 
        // this.public_dot2 =null;
        this._container = null;
        super.dispose();
    }
}