/*
    author : shaoliang
    date : 2019.5.22
    desc : 粽叶飘香-端午节活动
*/
class AcDuanWuPopupView extends PopupView{
	
    private _itemNumTextTab:BaseTextField[] = [];
    
    public constructor() {
		super();
	}

    private get cfg() : Config.AcCfg.DuanWuCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDuanWuVo{
        return <AcDuanWuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }

    private get uicode() : string{
        return `${this.param.data.uicode}`;
    }

    public getUiCode() : string{
        return this.uicode;
    }

    protected getResourceList():string[]
	{
        let view = this;
        let arr = [];
        return super.getResourceList().concat([
            `alliance_taskwotdbg1`,
            `progress5`,`progress3_bg`,`accarnivalview_tab_red`,`accarnivalview_tab_green`,`collectflag`,`acduanwu_topbg1_${this.uicode}`,`acduanwu_topbg2_${this.uicode}`,
            `activity_charge_red`,`fourpeople_bottom`,"shopview_corner",
            `acduanwu_plus`,`acduanwu_arrow`,
        ]).concat(arr);
    }
	
	protected getTabbarTextArr():Array<string>{
        let code = this.uicode;
        return [
			`acDuanWuTab1-${code}`,
            `acDuanWuTab2-${code}`,
            `acDuanWuTab3-${code}`,
            `acDuanWuTab4-${code}`,
		];
    }
    
    protected initTabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
			this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr,this.clickTabbarHandler,this);
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			this.tabbarGroup.x = 0;
		}
    }
    
    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
        this.tabbarGroup.x = 0;
	}

    protected getTitleStr():string{
        return `acDuanWu-1_Title`;
    }

	protected initView():void
    {	
        let view = this;

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);


        let bottombg:BaseBitmap = BaseBitmap.create(`alliance_taskwotdbg1`);
        bottombg.scaleX = (this.getShowWidth()-50)/bottombg.width;
        bottombg.scaleY = 50/bottombg.height;
        bottombg.setPosition(25+GameData.popupviewOffsetX, this.getShowHeight()-123);
        bottombg.alpha = 0.7;
        this.addChildToContainer(bottombg);
        
        for (let i:number = 1; i<=3; i++)
        {
            let icon:BaseBitmap = BaseBitmap.create(`duanwuiconsmall${i}-${this.uicode}`);
            icon.setPosition(68+(i-1)*170+GameData.popupviewOffsetX,bottombg.y);
            this.addChildToContainer(icon);

            let numText:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            numText.setPosition(icon.x+icon.width+10,icon.y+10);
            this.addChildToContainer(numText);

            this._itemNumTextTab.push(numText);
        }

        view.freshView();

        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    }

     protected getShowWidth():number{
		return 580;
    }

	protected getShowHeight():number{
		return 840;
    }

    public freshView():void{
        let view = this;
        if(view.vo.getpublicRedhot1()){
            view.tabbarGroup.addRedPoint(0);
        }
        else{
            view.tabbarGroup.removeRedPoint(0);
        }

        if(view.vo.getpublicRedhot2()){
            view.tabbarGroup.addRedPoint(1);
        }
        else{
            view.tabbarGroup.removeRedPoint(1);
        }

        if(view.vo.getpublicRedhot3()){
            view.tabbarGroup.addRedPoint(2);
        }
        else{
            view.tabbarGroup.removeRedPoint(2);
        }

        if(view.vo.getpublicRedhot4()){
            view.tabbarGroup.addRedPoint(3);
        }
        else{
            view.tabbarGroup.removeRedPoint(3);
        }

        for (let i:number = 1; i<=3; i++)
        {
            this._itemNumTextTab[i-1].text = String(this.vo.getActivityItem(i));
        }
    }

    protected changeTab():void
    {
        super.changeTab();
        this.tabViewData[this.selectedTabIndex].x = 28;
    }

     protected resetBgSize():void{
        super.resetBgSize();
        this.tabViewData[this.selectedTabIndex].x = 28;
     }


    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        this._itemNumTextTab.length = 0;

		super.dispose();
	}
}