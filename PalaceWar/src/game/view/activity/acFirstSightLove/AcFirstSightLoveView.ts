/**
 * 女优活动1 依见钟情
 * author ycg
 * date 2019.10
 * @class AcFirstSightLoveView
 */
class AcFirstSightLoveView extends AcCommonView{
    public _showHeight:number = 0;

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, this.refreshGetInfo, this);

        let tabBtnName = [
            ResourceManager.hasRes("ac_firstsightlove_lovebtn-"+this.getTypeCode()) ? "ac_firstsightlove_lovebtn-"+this.getTypeCode() : "ac_firstsightlove_lovebtn-1",
            ResourceManager.hasRes("ac_firstsightlove_truthbtn-"+this.getTypeCode()) ? "ac_firstsightlove_truthbtn-"+this.getTypeCode() : "ac_firstsightlove_truthbtn-1",
            ResourceManager.hasRes("ac_firstsightlove_meetbtn-"+this.getTypeCode()) ? "ac_firstsightlove_meetbtn-"+this.getTypeCode() : "ac_firstsightlove_meetbtn-1"
        ];

        let tabTextArr = [
            "acFirstSightLoveBtnLoveName-"+this.getTypeCode(), "acFirstSightLoveBtnTruthName-"+this.getTypeCode(), "acFirstSightLoveBtnMeetName-"+this.getTypeCode()
        ];
        
        let tabBg = BaseBitmap.create("ac_firstsightlove_btnbg");
        tabBg.setPosition(this.titleBg.x + this.titleBg.width/2 - tabBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        
        let bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - tabBg.y - tabBg.height + 8;
        bottomBg.setPosition(tabBg.x + tabBg.width/2 - bottomBg.width/2, tabBg.y + tabBg.height - 8);
        this.addChildToContainer(bottomBg);
        App.LogUtil.log("bottomBgheight: "+bottomBg.height);
        this._showHeight = bottomBg.height;

        this.addChildToContainer(tabBg);
        
        let tabbarGroup = ComponentManager.getTabBarGroup(tabBtnName, tabTextArr, this.clickTabbarHandler, this, null, null, null, true);
        tabbarGroup.setSpace(1);
        tabbarGroup.setPosition(this.titleBg.x + this.titleBg.width/2 - tabbarGroup.width/2, tabBg.y + 0);
        this.addChild(tabbarGroup);
        this.tabbarGroup = tabbarGroup;
        this.tabbarGroup.selectedIndex = this._selectedTabIndex;
        
        for (let i = 0; i < tabTextArr.length; i++){
            let tab = <TabBar>tabbarGroup.getTabBar(i);
            let tabLb = ComponentManager.getTextField(LanguageManager.getlocal(tabTextArr[i]), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
            tabLb.setPosition(85, 55);
            tab.addChild(tabLb);
        }

        let flowerStr = ResourceManager.hasRes("ac_firstsightlove_btn_flower-"+this.getTypeCode()) ? "ac_firstsightlove_btn_flower-"+this.getTypeCode() : "ac_firstsightlove_btn_flower-1";
        let flower = BaseBitmap.create(flowerStr);
        flower.setPosition(tabBg.x, tabBg.y);
        this.addChildToContainer(flower);

        this.changeTab();
        this.refreshView();
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
				tabView.setPosition(this.container.x, this.container.y + this.tabbarGroup.y + this.tabbarGroup.height + 10);
				this.tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"]=this.param;
                this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
    }

    private refreshGetInfo(evt:egret.Event):void{
        let rData = evt.data.data.data;
        if(rData)
        {   
            App.LogUtil.log("tab2 getInfoCallback");
            this.vo.totalLove = rData.totalv;
            this.refreshView();
        }
    }

    private refreshView():void{
        if (this.vo.isShowRewardRedDot()){
            this.tabbarGroup.addRedPoint(1)
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }

        if (this.vo.isShowBmRedDot()){
            this.tabbarGroup.addRedPoint(2)
        }
        else{
            this.tabbarGroup.removeRedPoint(2);
        }
    }
    
    protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO,requestData:{activeId:this.vo.aidAndCode}};
    }
    
    protected receiveData(data:{ret:boolean,data:any}):void
	{
        if(data.ret)
        { 
            this.vo.totalLove = data.data.data.totalv;
        }
	}

    public getChildShowHeight():number{
        return this._showHeight;
    }

    public getTypeCode():string{
        return this.code;
    }

    private get cfg():Config.AcCfg.FirstSightLoveCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcFirstSightLoveVo{
        return <AcFirstSightLoveVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getRuleInfo():string{
        return "acFirstSightLoveRuleInfo-"+this.getTypeCode();
    }

    protected getTitleBgName():string{
        return "ac_firstsightlove_titlebg-"+this.getTypeCode();
    }

    protected getTitleStr():string{
        return "";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        if (this.getTypeCode() != "1"){
            list = [
                "ac_firstsightlove_love_infobg-1", "ac_firstsightlove_loveitembg-1", "ac_firstsightlove_meet_mailbg-1", "ac_firstsightlove_truth_infobg-1", "ac_firstsightlove_truth_itembg-1",
                "ac_firstsightlove_box1-1", "ac_firstsightlove_box2-1", "ac_firstsightlove_box3-1", "ac_firstsightlove_box4-1", "ac_firstsightlove_btn_flower-1", "ac_firstsightlove_love_numbg-1","ac_firstsightlove_lovebtn-1", "ac_firstsightlove_lovebtn-1_down",
                "ac_firstsightlove_meetbtn-1", "ac_firstsightlove_meetbtn-1_down",
                "ac_firstsightlove_truthbtn-1", "ac_firstsightlove_truthbtn-1_down",
                "ac_firstsightlove_loveitem-1", "ac_firstsightlove_lovespecial_itembg1-1", "ac_firstsightlove_lovespecial_itembg0-1",
                "ac_firstsightlove_meet_txt-1", "ac_firstsightlove_meetrole-1", "ac_firstsightlove_meet_bg-1",
            ];
        }
        return super.getResourceList().concat([
            "ac_firstsightlove_btnbg", "ac_firstsightlove_lookbtn_down", "ac_firstsightlove_lookbtn", "ac_firstsightlove_numbg", "ac_firstsightlove_special_itembg", "ac_firstsightlove_textbg", "shopview_line", "acwealthcomingview_box_1", "ac_firstsightlove_slider", "progress12", "progress12_bg", "acwealthcomingview_progresslight", "ac_firstsightlove_joinbtn", "ac_firstsightlove_joinbtn_down", "ac_firstsightlove_superflag", "common_titlebg", "alliance_taskAttrbg1", "ac_firstsightlove_emptyrole", "acgiftreturnview_common_skintxt",
            "ac_firstsightlove_love_infobg-"+this.getTypeCode(), "ac_firstsightlove_loveitembg-"+this.getTypeCode(), "ac_firstsightlove_meet_mailbg-"+this.getTypeCode(),
            "ac_firstsightlove_titlebg-"+this.getTypeCode(),
            "ac_firstsightlove_truth_infobg-"+this.getTypeCode(),
            "ac_firstsightlove_truth_itembg-"+this.getTypeCode(),
            "ac_firstsightlove_box1-"+this.getTypeCode(),
            "ac_firstsightlove_box2-"+this.getTypeCode(),
            "ac_firstsightlove_box3-"+this.getTypeCode(),
            "ac_firstsightlove_box4-"+this.getTypeCode(),
            "ac_firstsightlove_btn_flower-"+this.getTypeCode(),
            "ac_firstsightlove_love_numbg-"+this.getTypeCode(),
            "ac_firstsightlove_lovebtn-"+this.getTypeCode(),
            "ac_firstsightlove_lovebtn-"+this.getTypeCode()+"_down",
            "ac_firstsightlove_meetbtn-"+this.getTypeCode(), 
            "ac_firstsightlove_meetbtn-"+this.getTypeCode()+"_down",
            "ac_firstsightlove_truthbtn-"+this.getTypeCode(), 
            "ac_firstsightlove_truthbtn-"+this.getTypeCode()+"_down",
            "ac_firstsightlove_loveitem-"+this.getTypeCode(),
            "ac_firstsightlove_lovespecial_itembg0-"+this.getTypeCode(),
            "ac_firstsightlove_meet_txt-"+this.getTypeCode(),
            "ac_firstsightlove_meet_bg-"+this.getTypeCode(),
            "ac_firstsightlove_meetrole-"+this.getTypeCode(),
        ]);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, this.refreshGetInfo, this);
        for (let key in this.tabViewData){
            if (this.tabViewData[key]){
                this.tabViewData[key].dispose();
            }
        }
        this.tabViewData = {};
        this.tabbarGroup = null;
        this._selectedTabIndex = 0;
        this._showHeight = 0;
        this._selectedTabIndex = 0;
        
        super.dispose();
    }
}