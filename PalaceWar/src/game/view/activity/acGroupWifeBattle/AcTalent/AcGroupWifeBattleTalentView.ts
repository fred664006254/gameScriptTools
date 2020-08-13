/**
 * 才情分页签
 * author qianjun----wxz
 */
class AcGroupWifeBattleTalentView extends CommonView {
	public constructor() {
		super();
	}
	protected getResourceList():string[]
	{
        return super.getResourceList().concat(["acsweetgift_make_infobg-1","progress3","progress3_bg","qingyuanitemtitlebg",
            "wifebattleview_updown",
            "qingyuanitemtitlebg",
            "wifestatus_headbg",
            "wifestatus_namebg",
            "wifetalentnumbg",
			"wifetalenttopbg",
			"acgroupwifebattle_itembg2",
			"acgroupwifebattle_itembg1",
			"wifeview_artistryicon",
			"commonview_tabbar_bg",
			"public_popupscrollitembg"
        ]);
	}

	protected initTabbarGroup():void
	{
		let tabbg = BaseBitmap.create("commonview_tabbar_bg");
		tabbg.x = 10;
		tabbg.y = 90;
		this.addChild(tabbg);		
		super.initTabbarGroup();
	}

	public initView()
	{
		let view = this;

		this.bigframe.height = GameConfig.stageHeigth - this.container.y+60;
		this.bigframe.y = -60;

		let code = this.getUiCode();

        let bottomleft = BaseBitmap.create(`acgroupwifebattlecorner-${code}`);
        bottomleft.setPosition(0,GameConfig.stageHeigth-bottomleft.height);
        view.addChild(bottomleft);
        let bottomright = BaseBitmap.create(`acgroupwifebattlecorner-${code}`);
        bottomright.scaleX = -1;
        bottomright.setPosition(GameConfig.stageWidth,GameConfig.stageHeigth-bottomright.height);
        view.addChild(bottomright);		

		if(this.checkHaveBuff())
		{
			let key = `wifebattleactivity-${Api.playerVoApi.getPlayerID()}`;
			let storage = LocalStorageManager.get(key);
			LocalStorageManager.set(key, `1`);
		}

		// let bottomBg = BaseLoadBitmap.create("servant_bottombg");
		// bottomBg.width = GameConfig.stageWidth;
		// bottomBg.height = GameConfig.stageHeigth - 75;
		// bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY()
		// this.addChildToContainer(bottomBg); 

        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    }
    
    private checkHaveBuff():boolean
	{
		return true;
	}

	protected getTitleStr():string{
		return `wifeBattleftalentup`;
	}
	
	protected getTabbarTextArr():Array<string>
	{
		var	tabArr =[
			"acGroupWifeBattleTalentTab1",
            "wifeTalentPlusPopupViewTab2",
		];  
		if(this.checkHaveBuff())
		{
			tabArr.push("wifeTalentPlusPopupViewTab3");
		}
		return  tabArr; 
	}
	protected get uiType():string
	{
		return "2";
	}
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}  
    protected getRuleInfo() : string{
        let code = this.getUiCode();
        // if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
		// 	return "acBattleRoundRule-1_newRule_withOpenRefusal";
		// }
        // return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${code}_newRule`) : (`acBattleRoundRule-${code}`);
        return `acGroupWifeBattleRule-${code}`;
    }
    
    protected getRuleInfoParam() : string[]{
        return this.vo.getRuleInfoParam();
    } 
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}
	protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }		
	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}
	public dispose()
	{
		super.dispose();
	}
}
