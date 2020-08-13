/**
 * 
 * desc:奖励弹窗
*/
class AcCrossServerHegemonyMatchView extends CommonView
{

	public constructor() {
		super();
	}
    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
	protected getRequestData():{requestType:string,requestData:any}
	{

		if(this.param.data.aid && this.param.data.code)
		{
			return {requestType:NetRequestConst.REQUEST_ACHEGEMONY_GETWEEDOUTINFO,requestData:{activeId:this.param.data.aid + "-" + this.param.data.code}};
		}
        // return null;
		
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (!data.ret){
			return;
		}
		let pkinfo = data.data.data.pkinfo;
		// console.log(pkinfo);
		if(pkinfo){
			Api.crossServerHegemonyVoApi.setPkinfo(pkinfo);
		}
	}


	protected getTabbarTextArr():Array<string>
	{
        let status = this.vo.getCurStatus();
       
        // if(status == 15){
        //     return [
        //         "acCrossServerHegemonyMatchTab1",
        //         "acCrossServerHegemonyMatchTab2",
        //         "acCrossServerHegemonyMatchTab3",
        //         "acCrossServerHegemonyMatchTab5",
        //     ];
        // } else {
        //     return [
        //         "acCrossServerHegemonyMatchTab1",
        //         "acCrossServerHegemonyMatchTab2",
        //         "acCrossServerHegemonyMatchTab3",
        //         "acCrossServerHegemonyMatchTab4",
        //     ];
		// }
		return [
			"acCrossServerHegemonyMatchTab1",
			"acCrossServerHegemonyMatchTab2",
			"acCrossServerHegemonyMatchTab3",
			"acCrossServerHegemonyMatchTab6",
		];

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

	protected getCloseBtnName():string{
        return ButtonConst.COMMON_CLOSE_1;
    }

	public tick():void
	{
		// console.log(this.tabViewData);
	// 	console.log(1111);
		for(let key in this.tabViewData){
			this.tabViewData[key].tick();
		}
	}
	protected getResourceList():string[]
	{ 

		return super.getResourceList().concat([
            "accshegemony_matchfirstbg",
			"accshegemony_matchfirsttitle",
			"accshegemony_matchfirst_lightbg",
            "accshegemony_matchlastbg",
            "accshegemony_matchline",
            "accshegemony_matchline1_1",
            "accshegemony_matchline1_2",
            "accshegemony_matchline1_3",
            "accshegemony_matchline2_1",
            "accshegemony_matchline2_2",
            "accshegemony_matchline2_3",
            "accshegemony_matchline3_1",
            "accshegemony_matchline3_2",
            "accshegemony_matchline3_3",
            "accshegemony_matchline4_1",
            "accshegemony_matchline4_2",
            "accshegemony_matchline4_3",
            "accshegemony_matchline4_5",
            "accshegemony_matchnamebg1",
            "accshegemony_matchnamebg2",
			"accshegemony_matchredbg",
			"achegemonymatch_titlebg-1",
			"achegemonymatch_bg-1",
		]);
	} 

	// 背景图名称
	protected getBgName():string
	{
		return ResourceManager.hasRes("achegemonymatch_bg-"+this.param.data.code) ? "achegemonymatch_bg-"+this.param.data.code : "achegemonymatch_bg-1";
	}

	protected getTitleBgName():string{
		return ResourceManager.hasRes("achegemonymatch_titlebg-"+this.param.data.code) ? "achegemonymatch_titlebg-"+this.param.data.code : "achegemonymatch_titlebg-1";
	}

	protected getTitleStr():string{
		return "";
	}

	protected isHideTitleBgShadow():boolean{
		return true;
	}

	protected initView():void
	{	
		App.LogUtil.log("matchview initView");
		this.tabbarGroup.setSpace(0);
		this.setTabBarPosition();
		this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
		this.tabbarGroup.y = this.titleBg.y + this.titleBg.height - 12;
		if(this.tabbarGroupBg){
			this.tabbarGroupBg.x = GameConfig.stageWidth/2 - this.tabbarGroupBg.width/2;
			this.tabbarGroupBg.y = this.titleBg.y + this.titleBg.height - 3;
		}
		this.setBigFameY(-(this.tabbarGroup.y + this.tabbarGroup.height));
		this.setBigFameHeight(GameConfig.stageHeigth - 5);

		let tab = this.param.tab ? parseInt(this.param.tab) : 0;
		if(tab){
			this.clickTabbarHandler({index : tab - 1}); 
			this.selectedTabIndex = tab - 1;
			this.tabbarGroup.selectedIndex = tab - 1;
		}
	}

	public dispose():void
	{
		

		super.dispose();
	}
}