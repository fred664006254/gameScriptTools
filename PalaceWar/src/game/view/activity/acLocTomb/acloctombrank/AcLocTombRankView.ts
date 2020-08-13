/**
 * 活动排名
 * author qianjun
 */
class AcLocTombRankView extends PopupView
{
	// 滑动列表

	private _selectChildData:any;
	private _curTabIdx=0;

	private _acData :any;
	private _myNameTxt : BaseTextField = null;
	private _myRankTxt : BaseTextField = null;
	private _myScoreTxt : BaseTextField = null;
	private _titleTxt : BaseTextField = null;
	private _titleTxt4 : BaseTextField = null;
	private bottomBg : BaseBitmap = null;
	private _tipTxt : BaseTextField = null;
	public constructor() 
	{
		super();
	}
	
	private get cfg() : Config.AcCfg.LocTombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLocTombVo{
        return <AcLocTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

	protected getTabbarTextArr():Array<string>
	{
		return [
			"acPunishRankTab1",
			"acPunishRankTab2",
			"acPunishRankTab3",
		];
	}

	public initView():void
	{		
		let view = this;
		let contentBg = BaseBitmap.create("public_9_bg39");
		contentBg.width = 528;
		contentBg.height = 540;
		contentBg.x = view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 59;
		view.addChildToContainer(contentBg);

		let bottomBg = BaseBitmap.create("public_9_bg1");
		bottomBg.width = 528;
		bottomBg.height = 86;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = contentBg.y + contentBg.height + 5;
		view.addChildToContainer(bottomBg);
		view.bottomBg = bottomBg;


		let titlebg = BaseBitmap.create("public_9_bg33");
		titlebg.width = 528;
		titlebg.height = 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, contentBg);
		view.addChildToContainer(titlebg);

		//acwipeBossAllianceName acwipeBossPlayerName
		let myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossPlayerName', [Api.playerVoApi.getPlayerName()]), 22); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25,10]);
		view.addChildToContainer(myNameTxt);
		view._myNameTxt = myNameTxt;

		let rankV = view.vo.getMyPrank();
		let addV = view.vo.getMyPScore();
		
		let str = '';
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}
		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(!view.vo.getAttendQUality()){
			str = LanguageManager.getlocal('crossImacyNoAccess');
			color = 0xff3c3c;
		}

		let myRankStr =  ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerRank",[str.toString()]), 22, color); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25,10]);
		view.addChildToContainer(myRankStr);
		view._myRankTxt = myRankStr;

		let scoreStr =  ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerScore",[addV.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [65,10]);
		view.addChildToContainer(scoreStr);
		view._myScoreTxt = scoreStr;
	
		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = contentBg.x + 40;
        titleTxt1.y = contentBg.y + 8;
        view.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.x = contentBg.x + 175;
        titleTxt2.y = titleTxt1.y;
		view.addChildToContainer(titleTxt2);
		view._titleTxt = titleTxt2;
		

		let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt4.x = contentBg.x + 430 - titleTxt4.width / 2;
		this._x = titleTxt4.x;
        titleTxt4.y = titleTxt1.y;
		view.addChildToContainer(titleTxt4);
		this._titleTxt4 = titleTxt4;
	}
	
	private _x = 0;

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRANK,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.vo.setRankInfo(data.data.data);
	}

	protected resetBgSize():void{
		super.resetBgSize();
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombranktip-${this.code}`),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [0,this.viewBg.height+10]);
		this.addChild(tipTxt);
		tipTxt.visible = false;
		this._tipTxt = tipTxt;
	}

	protected clickTabbarHandler(params:any){
		let view = this;
		super.clickTabbarHandler(params);
		view._curTabIdx = params.index;
		
		let str = '';
		let rankV = 0;
		let score = 0;
		let scorename = 'acwipeBossPlayerScore';
		switch(params.index){
			case 0:
				rankV = view.vo.getMyPrank();
				score = view.vo.getMyPScore();
				break;
			case 1:
				rankV = view.vo.getMyAllPrank();
				score = view.vo.getMyAScore();
				break;
			case 2:
				rankV = view.vo.getMyAlliMemPrank();
				score = view.vo.getMyAlliMemScore();
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

		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(!view.vo.getAttendQUality()){
			str = LanguageManager.getlocal('crossImacyNoAccess');
			color = 0xff3c3c;
		}
		view._titleTxt.text = LanguageManager.getlocal(params.index == 1 ? "acRankPop_titleAlliance" : "acRankPop_title2");
		view._myNameTxt.text = LanguageManager.getlocal(params.index == 1 ? "acwipeBossAllianceName" : 'acwipeBossPlayerName', [params.index == 1 ? Api.playerVoApi.getPlayerAllianceName() : Api.playerVoApi.getPlayerName()]);
		view._myRankTxt.text = LanguageManager.getlocal('acwipeBossPlayerRank', [str]);
		view._myRankTxt.textColor = color;
		view._myScoreTxt.text = LanguageManager.getlocal(scorename, [score.toString()]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view._myScoreTxt, view.bottomBg, [65,10]);
		view._titleTxt4.text = LanguageManager.getlocal(params.index == 2 ? `acRankPop_title3_12_1` : `acPunish_score`);
		view._titleTxt4.x = this._x + (params.index == 2 ? -48 : 0);//params.index == 2 ? contentBg.x + 430 - view._titleTxt3.width / 2;; 
		view._tipTxt.visible = params.index == 2;
	}

	protected getShowHeight():number{
		return 798;
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
		view._curTabIdx = 0;
		view._acData = null;
		view._selectChildData = null;
		view._titleTxt4 = null;
		view._tipTxt = null;
		super.dispose();
	}
}