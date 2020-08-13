/**
 * 
 * desc:奖励弹窗
*/
class AcCrossServerHegemonyRewardView extends CommonView
{
	public constructor() {
		super();
	}
	
	protected getTabbarTextArr():Array<string>
	{
		return [
			"acCrossServerHegemonyRewardTab1",
			"acCrossServerHegemonyRewardTab2",
			"acCrossServerHegemonyRewardTab3"
		];
	}

	protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_TAB;
	}
	
	protected getResourceList():string[]
	{ 
		return super.getResourceList().concat([
			"arena_bottom", "acsingledayitembg","accshegemony_ranktitlebg", "aobaidescnamebg",
			"achegemonyrankreward_titlebg-1", "public_9_bg98",
		]);
	} 

	protected get uiType():string
	{
		return "2";
	}

	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

	protected addTabbarGroupBg():boolean{
		return true;
	}

	protected getTitleBgName():string{
		return ResourceManager.hasRes("achegemonyrankreward_titlebg-"+this.param.data.code) ? "achegemonyrankreward_titlebg-"+this.param.data.code : "achegemonyrankreward_titlebg-1";
	}

	protected getTitleStr():string{
		return "";
	}

	protected getCloseBtnName():string{
        return ButtonConst.COMMON_CLOSE_1;
    }

	protected initView():void
	{	
		this.tabbarGroup.setSpace(0);
		this.setTabBarPosition();
		// this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
		this.tabbarGroup.y = this.titleBg.y + this.titleBg.height - 12;
		if(this.tabbarGroupBg){
			this.tabbarGroupBg.x = GameConfig.stageWidth/2 - this.tabbarGroupBg.width/2;
			this.tabbarGroupBg.y = this.titleBg.y + this.titleBg.height - 3;
		}
		this.setBigFameY(-(this.tabbarGroup.y + this.tabbarGroup.height));
		this.setBigFameHeight(GameConfig.stageHeigth - 5);
	}

	protected isHideTitleBgShadow():boolean{
		return true;
	}

	public dispose():void
	{
		super.dispose();
	}
}