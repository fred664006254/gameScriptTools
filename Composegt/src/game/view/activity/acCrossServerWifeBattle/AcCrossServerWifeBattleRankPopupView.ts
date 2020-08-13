/**
 * 活动排名
 * author qianjun
 */
class AcCrossServerWifeBattleRankPopupView extends PopupView
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
	private _titleTxt4: BaseTextField = null;
	private bottomBg : BaseBitmap = null;
	private _bg2: BaseBitmap = null;
	private _index = 0;
	public constructor() 
	{

		super();
	}
	
	// private get api() : CrossServerWipeBossVoApi{
    //     return Api.crossServerWipeBossVoApi;
    // }
	
	private get cfg() : Config.AcCfg.CrossServerWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getTabbarTextArr():Array<string>
	{
		return [
			"acCrossServerWifeBattleRankTabTitle1",
			"acCrossServerWifeBattleRankTabTitle2",
		
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
		return ButtonConst.BTN_WINTAB;
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
		this._bg2 = bg2;

		let bottomBg = BaseBitmap.create("public_tc_bg03");
		bottomBg.width = bg1.width;;
		bottomBg.height = 96;
		bottomBg.setPosition(bg1.x,bg1.y + bg1.height + 9);
		view.bottomBg = bottomBg;
		this.addChildToContainer(bottomBg);

	

		let name = "";
		let rankV = 0;//this.vo.rankData.merank;//view.api.getMyRank();
		let score = 0;//this.vo.rankData.mepoint;//view.api.getMyScore();
		let server = "";
		// if(this.param.data.index == 0){
		// 	name = this.vo.getRankServerName();
		// 	rankV = this.vo.getRankServerRank();
		// 	score = this.vo.getRankServerScore();
		// } else if(this.param.data.index == 1){
		// 	name = this.vo.getRankMyName();
		// 	rankV = this.vo.getRankMyRank();
		// 	score = this.vo.getRankMyScore();
		// 	server = this.vo.getRankMyServer();
		// }
		name = this.vo.getRankServerName();
		rankV = this.vo.getRankServerRank();
		score = this.vo.getRankServerScore();
		let myNameTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_WARN_GREEN); 
		
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25,10]);
		this.addChildToContainer(myNameTxt);
		
		this._myNameTxt = myNameTxt;
		this._myNameTxt.text = LanguageManager.getlocal("acCrossServerWifeBattleRankServerName", [name]);

		
		let str = '';
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}

		// if(this.param.data.index != 1){
			if(!this.vo.isCanJoin){
				str = LanguageManager.getlocal('crossImacyNoAccess');
			}
		// }


		let myRankStr =  ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleRankServerRank",[str.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN); 
		// App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25,10]);
		myRankStr.x = myNameTxt.x;
		myRankStr.y = myNameTxt.y + myNameTxt.height + 5;
		view.addChildToContainer(myRankStr);
		view._myRankTxt = myRankStr;

		let scoreStr =  ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleRankServerScore",[score.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN); 
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
        titleTxt2.x = bg2.x + 150;//175;
        titleTxt2.y = titleTxt1.y;
		view.addChildToContainer(titleTxt2);
		view._titleTxt = titleTxt2;

		// this._titleTxt.text = LanguageManager.getlocal(this.param.data.index == 0 ? "serverListServer2" : "acRankPop_title2");
		this._titleTxt.text = LanguageManager.getlocal("serverListServer2");
		this._titleTxt.x = this._bg2.x + 220


		let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("serverListServer2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt3.x = bg2.x + 300;//175;
        titleTxt3.y = titleTxt1.y;
		view.addChildToContainer(titleTxt3);
		// view._quTitleTxt = titleTxt3;
		this._titleTxt3 = titleTxt3;
		titleTxt3.visible = this.param.data.index == 1;

		
        let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt4.x = bg2.x + 415;
		this._x = titleTxt4.x;
        titleTxt4.y = titleTxt1.y;
		this._titleTxt4 = titleTxt4;
		view.addChildToContainer(titleTxt4);
		
	}
	
	private _x = 0;

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		// let view = this;
		// view.api.setRankInfo(data.data.data);
		console.log("rankdata--->",data,data.data.data);
		this.vo.setRankData(data.data.data);
	}


	protected clickTabbarHandler(params:any){
		let view = this;
		super.clickTabbarHandler(params);
		view._curTabIdx = params.index;
		//view.api.getRankInfo().allimyrank.name
		
		let str = '';
		let rankV = 0;
		let score = 0;
		let scorename = 'acCrossServerWifeBattleRankServerScore';
		let name = "";
		let server = "";
		switch(params.index){
			case 0:
				name = this.vo.getRankServerName();
				rankV = this.vo.getRankServerRank();
				score = this.vo.getRankServerScore();
				break;
			case 1:
				name = this.vo.getRankMyName();
				rankV = this.vo.getRankMyRank();
				score = this.vo.getRankMyScore();
				server = this.vo.getRankMyServer();
				break;

		}
		// params.index == 0 ? view.api.getMyPrank() :  view.api.getMyAllPrank();
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}
		if(params.index != 1){
			if(!this.vo.isCanJoin){
				str = LanguageManager.getlocal('crossImacyNoAccess');
			}
		}
		this._myNameTxt.text = LanguageManager.getlocal(params.index == 1 ? "acCrossServerWifeBattleRankMyName" : 'acCrossServerWifeBattleRankServerName', [name]);
		this._myRankTxt.text = LanguageManager.getlocal('acCrossServerWifeBattleRankServerRank', [str]);
		this._myScoreTxt.text = LanguageManager.getlocal(scorename, [score.toString()]);
		this._titleTxt.text = LanguageManager.getlocal(params.index == 1 ? "acRankPop_title2":"serverListServer2" );
		this._titleTxt.x = params.index == 1?this._bg2.x + 150:this._bg2.x + 220;
		// this._titleTxt3.text = LanguageManager.getlocal(params.index == 1 ? `acRankPop_title3_12_1` : `acPunish_score`);
		this._titleTxt3.visible = params.index == 1;
		
		// this._titleTxt.x = params.index == 2?this._bg2 

		// if(params.index == 0){
		// 	this._titleTxt.x = this._bg2.x + 150;
		// } else if(params.index == 1){
		// 	this._titleTxt.x = this._bg2.x + 220;
		// } else {
		// 	this._titleTxt.x = this._bg2.x + 220;
		// }

		// this._titleTxt4.x = params.index == 0?this._bg2.x + 440 : this._bg2.x + 410; 
		// this._titleTxt3.x = this._x + (params.index == 2 ? -48 : 0);//params.index == 2 ? contentBg.x + 430 - view._titleTxt3.width / 2;; 
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
		return 'acCrossServerWipeBoss_rankTitle';
	}


	public hide():void{
		AcCrossServerWifeBattleView.isOpenWin = false;
		super.hide();
	}
	protected isShowOpenAni():boolean
	{
		return false;
	}

	public dispose():void{
		let view = this;
		view._myNameTxt = null;
		view._myRankTxt = null;
		view._myScoreTxt = null;
		view._titleTxt = null;
		this._titleTxt3 = null;
		this._titleTxt4 = null;
		view.bottomBg = null;
		this._bg2 = null;
		this._index = 0;
		super.dispose();
	}
}