/**
 * 才情分页签
 * author qianjun
 */
class WifeTalentView extends CommonView {
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
			"wifetalentbg2",
			"wifetalentbg1",
			"wifeview_artistryicon"
        ]);
	}
	public initView()
	{
		let view = this;
		if(this.checkHaveBuff()){
			let key = `wifebattleactivity-${Api.playerVoApi.getPlayerID()}`;
			let storage = LocalStorageManager.get(key);
			LocalStorageManager.set(key, `1`);
		}

		let bottomBg = BaseLoadBitmap.create("servant_bottombg");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - 75;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY()
		this.addChildToContainer(bottomBg); 

        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    }
    
    private checkHaveBuff():boolean
	{
		let modelList:AcBaseVo[] = Api.acVoApi.getRanActives();
		for(let i in modelList){
			let unit = modelList[i];
			if(unit.atype == `22`){
				let t = unit.et - GameData.serverTime - 86400 * 1;
				if(t>0){
					return true;
				}
			}
		}
		return false;
	}
	
	protected getTabbarTextArr():Array<string>
	{
		var	tabArr =[
			"wifeTalentPlusPopupViewTab1",
            "wifeTalentPlusPopupViewTab2",
		];  
		if(this.checkHaveBuff())
		{
			tabArr.push("wifeTalentPlusPopupViewTab3");
		}
		return  tabArr; 
	}
	
	public dispose()
	{
		super.dispose();
	}
}
