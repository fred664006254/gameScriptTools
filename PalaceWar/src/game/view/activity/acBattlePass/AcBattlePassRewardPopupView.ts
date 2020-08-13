class AcBattlePassRewardPopupView extends PopupView
{ 

    private _curIdx = 0;
    private _leftbtn = null;
    private _rightbtn = null;
    public constructor(){
		super();
	}

    private get cfg() : Config.AcCfg.BattlePassCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattlePassVo{
        return <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    protected get uicode():string{
        let code = ``;
        switch(Number(this.code)){
            case 2:
                code = '1';
                break;
            case 7:
                code = '4';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

    public get aidAndCode():string
	{
		return this.aid+"-"+this.code;
    }

    protected getTabbarTextArr():Array<string>{
        let code = this.uicode;
        let arr = [];
        for(let i in this.cfg.showDetail){
            let unit = GameData.formatRewardItem(this.cfg.showDetail[i])[0];
            let str = `battlepassreward_${unit.type}`;
            if(unit.type == 1){
                continue;
            }
            if(unit.type == 11){
                let tfg = Config.TitleCfg.getTitleCfgById(unit.id);
                str += `_${tfg.isTitle}`
            }
            if((unit.type == 1025 || unit.type == 1026)){
                if((arr.indexOf(`battlepassreward_1025`) == -1) && (arr.indexOf(`battlepassreward_1026`) == -1)){
                    arr.push(str);
                }
            }
            else{
                arr.push(str);
            }
            
        }
        return arr;
    }
    // 初始化tabbarGroup
	protected initTabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{   
            if(this.getTabbarTextArr().length > 3)
            {
                this.tabbarGroup = ComponentManager.getScroTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this,null,TabBarGroup.ALIGN_HORIZONTAL,455,false,null,66);
                let tabBarX:number=(this instanceof PopupView)?30:15;
                this.addChild(this.tabbarGroup);
                this.setTabBarPosition();
                this.tabbarGroup.setColor(0xe1ba86,0x472c26);
                this.container.y = this.getTitleButtomY();
                this.tabbarGroup.selectedIndex=this._selectedTabIndex;
            }
            else
            {
                this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this,null);
                let tabBarX:number=(this instanceof PopupView)?30:15;
                this.addChild(this.tabbarGroup);
                this.setTabBarPosition();
                this.tabbarGroup.setColor(0xe1ba86,0x472c26);
                this.container.y = this.getTitleButtomY();
                this.tabbarGroup.selectedIndex=this._selectedTabIndex;
            }

			
			// this.changeTab();
		}
    }
    
    protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX:number=0;
			let tabY:number=0;
			tabX=this.viewBg.x+(this.getTabbarTextArr().length > 3?55:20)+GameData.popupviewOffsetX;
			tabY=this.viewBg.y+67-16;
			this.tabbarGroup.setPosition(tabX,tabY);
		}
	}

    protected getTitleStr():string{
        return `battlepassreward`;
    }

    protected getShowHeight():number{
		return Number(this.uicode) <= 3 ? 795 : 825
	}

	protected getShowWidth():number{
		return 560;
	}

    protected getResourceList():string[]{
		return super.getResourceList().concat([
           `battlepassrewardbg`,`battlepassrewardbg1`,`battlepassrewardbg2`,`battlepassrewardwordbg`,"skin_detail_namebg",`servant_star`,
           "servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",`studyatk_arrow`,`qingyuanitemtitlebg`,
		]);
    }

    protected resetBgSize():void{
        let view = this;
        super.resetBgSize();
        if(this.getTabbarTextArr().length > 3){
            let leftbtn = ComponentManager.getButton(`btn_leftpage`, ``, ()=>{
                let idx = view.selectedTabIndex - 1;
                if(idx < 0){
    
                }
                else{
                    view.clickTabbarHandler({index : idx}); 
                    view.selectedTabIndex = idx;
                    view.tabbarGroup.selectedIndex = idx;
                    view.tabbarGroup.setTarBarScrollLeft(idx * 145);
                }
    
                leftbtn.visible = idx > 0;
                rightbtn.visible = idx < (view.getTabbarTextArr().length - 1);
            }, view);
            leftbtn.setScale(0.7);
            view.addChild(leftbtn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftbtn, view.tabbarGroup, [-leftbtn.width*leftbtn.scaleX-10, 0]);
            leftbtn.x = 45;
    
            let rightbtn = ComponentManager.getButton(`btn_leftpage`, ``, ()=>{
                let idx = view.selectedTabIndex + 1;
                if(idx >= view.getTabbarTextArr().length){
    
                }
                else{
                    view.clickTabbarHandler({index : idx}); 
                    view.selectedTabIndex = idx;
                    view.tabbarGroup.selectedIndex = idx;
                    view.tabbarGroup.setTarBarScrollLeft(idx * 145);
                }
                leftbtn.visible = idx > 0;
                rightbtn.visible = idx < (view.getTabbarTextArr().length - 1);
            }, view);
            rightbtn.anchorOffsetX = rightbtn.width / 2;
            rightbtn.scaleX = -0.7;
            rightbtn.scaleY = 0.7;
            view.addChild(rightbtn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rightbtn, view.tabbarGroup, [view.tabbarGroup.width+10, 0]);
            rightbtn.x = 570;
    
            view._leftbtn = leftbtn;
            view._rightbtn = rightbtn;
            leftbtn.visible = view.selectedTabIndex > 0;
            rightbtn.visible = view.selectedTabIndex < (view.getTabbarTextArr().length - 1);
        }
    }

    public initView():void{
        //  this.showHand();
        let view = this;

        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
            view.tabbarGroup.setTarBarScrollLeft((tab - 1) * 145);
        }
    }

    protected clickTabbarHandler(data):void{
        super.clickTabbarHandler(data);
        let view = this;
        if(view._leftbtn){
            view._leftbtn.visible = view.selectedTabIndex > 0;
            view._rightbtn.visible = view.selectedTabIndex < (view.getTabbarTextArr().length - 1);
        }
    }

    protected getOffsetX():number
	{
		return 34;
	}

    protected getOffsetY():number
	{	
		return 6;
	}

    public dispose():void
	{ 
        let view = this;
        view._leftbtn = null;
        view._rightbtn = null;
        view._curIdx = 0;
        super.dispose();
    }
}