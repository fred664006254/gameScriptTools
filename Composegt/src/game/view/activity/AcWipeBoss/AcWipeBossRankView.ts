/**
 * 活动排名
 * author qianjun
 */
class AcWipeBossRankView extends PopupView
{
	// 滑动列表

	private _selectChildData:any;
	private _curTabIdx=0;

	private _acData :any;
	private _myNameTxt : BaseTextField = null;
	private _myRankTxt : BaseTextField = null;
	private _myScoreTxt : BaseTextField = null;
	private _titleTxt : BaseTextField = null;
	private _titleTxt3 : BaseTextField = null;
	private bottomBg : BaseBitmap = null;
	public constructor() 
	{
		super();
	}
	
	private get api() : WipeBossVoApi{
        return Api.wipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getTabbarTextArr():Array<string>
	{
		return [
			"acPunishRankTab1",
			"acPunishRankTab2",
			"acPunishRankTab3",
		];
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"rank_biao"
		]);
	}
    protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_WINTAB_OLD;
	}
	protected getTabbarGroupX():number
    {
        return 17;
    }

	public initView():void
	{		
		this.tabbarGroup.setSpace(10);
		let scrollListBgRect=egret.Rectangle.create();
		scrollListBgRect.setTo(0,0,518,541);
		let view = this;

		let contentBg = BaseBitmap.create("public_tc_bg01");
		contentBg.width = scrollListBgRect.width + 20; //538
		contentBg.height = scrollListBgRect.height + 20 + 96 + 9; //666
		contentBg.x = this.viewBg.width / 2 - contentBg.width/2;//view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 55;
		view.addChildToContainer(contentBg);

		let bg1= BaseBitmap.create("public_tc_bg03");
        bg1.width = scrollListBgRect.width;
        bg1.height = scrollListBgRect.height;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 65;
		scrollListBgRect.x=bg1.x;
		scrollListBgRect.y=bg1.y;
        this.addChildToContainer(bg1);

		let bg2= BaseBitmap.create("rank_biao");
		bg2.width = bg1.width - 30;

        bg2.x = this.viewBg.width/2 - bg2.width/2;
        bg2.y = bg1.y + 14;
        this.addChildToContainer(bg2);

		let bottomBg = BaseBitmap.create("public_tc_bg03");
		bottomBg.width = bg1.width;;
		bottomBg.height = 96;
		bottomBg.setPosition(bg1.x,bg1.y + bg1.height + 9);
		view.bottomBg = bottomBg;
		this.addChildToContainer(bottomBg);


		//acwipeBossAllianceName acwipeBossPlayerName
		let myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossPlayerName', [Api.playerVoApi.getPlayerName()]), 22, TextFieldConst.COLOR_WARN_GREEN); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25,10]);
		view.addChildToContainer(myNameTxt);
		view._myNameTxt = myNameTxt;

		let rankV = view.api.getMyPrank();
		let addV = view.api.getMyPScore();
		
		let str = '';
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}

		let myRankStr =  ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerRank",[str.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN); 
		// App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25,10]);
		myRankStr.x = myNameTxt.x;
		myRankStr.y = myNameTxt.y + myNameTxt.height + 5;
		view.addChildToContainer(myRankStr);
		view._myRankTxt = myRankStr;

		let scoreStr =  ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerScore",[addV.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN); 
		// App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [65,10]);
		scoreStr.x = myNameTxt.x;
		scoreStr.y = myRankStr.y + myRankStr.height + 5;
		view.addChildToContainer(scoreStr);
		view._myScoreTxt = scoreStr;

	// 	cRankPop_title1":"排名",
    // "acRankPop_title2":"玩家名称",
	// "acRankPop_titleAlliance":"帮会名称",
	// "acRankPop_title3_11":"积分",
	
		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), 22,TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 40;
        titleTxt1.y = bg2.y + bg2.height / 2 -titleTxt1.height / 2; //contentBg.y + 8;
        view.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.x = bg2.x + 175;
        titleTxt2.y = titleTxt1.y;
		view.addChildToContainer(titleTxt2);
		view._titleTxt = titleTxt2;
		
        let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt3.x = bg2.x + 400 - titleTxt3.width / 2;
		this._x = titleTxt3.x;
        titleTxt3.y = titleTxt1.y;
		view.addChildToContainer(titleTxt3);
		this._titleTxt3 = titleTxt3;
	}
	
	private _x = 0;

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.api.setRankInfo(data.data.data);
	}


	protected clickTabbarHandler(params:any){
		let view = this;
		super.clickTabbarHandler(params);
		view._curTabIdx = params.index;
		//view.api.getRankInfo().allimyrank.name
		
		let str = '';
		let rankV = 0;
		let score = 0;
		let scorename = 'acwipeBossPlayerScore';
		switch(params.index){
			case 0:
				rankV = view.api.getMyPrank();
				score = view.api.getMyPScore();
				break;
			case 1:
				rankV = view.api.getMyAllPrank();
				score = view.api.getMyAScore();
				break;
			case 2:
				rankV = view.api.getMyAlliMemPrank();
				score = view.api.getMyAlliMemScore();
				scorename = 'acwipeBossPlayerMem';
				break;
		}
		// params.index == 0 ? view.api.getMyPrank() :  view.api.getMyAllPrank();
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}
		view._titleTxt.text = LanguageManager.getlocal(params.index == 1 ? "acRankPop_titleAlliance" : "acRankPop_title2");
		view._myNameTxt.text = LanguageManager.getlocal(params.index == 1 ? "acwipeBossAllianceName" : 'acwipeBossPlayerName', [params.index == 1 ? Api.playerVoApi.getPlayerAllianceName() : Api.playerVoApi.getPlayerName()]);
		view._myRankTxt.text = LanguageManager.getlocal('acwipeBossPlayerRank', [str]);
		view._myScoreTxt.text = LanguageManager.getlocal(scorename, [score.toString()]);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view._myScoreTxt, view.bottomBg, [65,10]);
		view._titleTxt3.text = LanguageManager.getlocal(params.index == 2 ? `acRankPop_title3_12_1` : `acPunish_score`);
		
		view._titleTxt3.x = this._x + (params.index == 2 ? -48 : 0);//params.index == 2 ? contentBg.x + 430 - view._titleTxt3.width / 2;; 
	}

	// protected getRequestData():{requestType:string,requestData:any}
	// {
	// 	// ["activity.getdragonrank"] = "划龙舟活动排行榜",
	// 	// --返回 data.rankArr 所有人排行信息
	// 	// --返回 data.myrankArr 我的排行信息
	// 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_DBRANK,requestData:{activeId : this.acTivityId}};
	// }

	protected getShowHeight():number{
		return 830;
	}
	
	protected getTitleStr():string{
		return 'rankViewTitle';
	}


	public hide():void{
		super.hide();
	}


	public dispose():void{
		let view = this;
		view._myNameTxt = null;
		view._myRankTxt = null;
		view._myScoreTxt = null;
		view._titleTxt = null;
		view.bottomBg = null;
		super.dispose();
	}
}