//
class AcCrossServerWifeBattleRewardViewTab3 extends CommonViewTab
{
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
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

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		let view = this;
		let listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 275;
        listbg.setPosition(8,0);
		this.addChild(listbg);
		let rankList = [];
		if(this.vo.test){
			for(let i = 1; i <= 5; ++ i){
				rankList.push({
					zid : i,
					point : i * 100
				});
			}
		}
		// if(view.api.getRankInfo().rankList.length){
		// 	rankList = view.api.getRankInfo().rankList;
		// }
		if(this.vo.rankData && this.vo.rankData.zidrankarr){
			rankList = this.vo.rankData.zidrankarr;
		}

		let titleBg = BaseBitmap.create("ladder_itemtitlebg");
        titleBg.width = 598;
        titleBg.height = 40;
        titleBg.setPosition(21,10);
		this.addChild(titleBg);
		
		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = titleBg.x + 40;
        titleTxt1.y = 17;
        view.addChild(titleTxt1);

		let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("serverListServer2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt3.x = titleBg.x + 234;
        titleTxt3.y = 17;
		view.addChild(titleTxt3);
		
        let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt4.x = titleBg.x + 434;
        titleTxt4.y = 17;
		view.addChild(titleTxt4);
    
		// 膜拜背景
		let bottomBg = BaseBitmap.create("emparena_bottom");
		bottomBg.height = 120;
		bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width/2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 142;
		this.addChild(bottomBg);
		
		let bottomText1 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_name",[Api.playerVoApi.getPlayerName()]) , 20, TextFieldConst.COLOR_WHITE);
		bottomText1.setPosition(65, bottomBg.y+30);
        this.addChild(bottomText1);

        let bottomText2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        bottomText2.text = LanguageManager.getlocal("acLadder_Score",[String(this.vo.getRankMyScore())]);
		bottomText2.setPosition(bottomText1.x, bottomBg.y+73);
        this.addChild(bottomText2);

        let bottomText3 = ComponentManager.getTextField("server", 20, TextFieldConst.COLOR_WHITE);
		bottomText3.setPosition(bottomText1.x+320, bottomText1.y);
        bottomText3.text = LanguageManager.getlocal("acLadder_server",[String(Api.mergeServerVoApi.getTrueZid())]);
        this.addChild(bottomText3);

        let ranknum:number = this.vo.getRankServerRank();
        let rankstr:string;
        if (ranknum)
        {
            rankstr = String(ranknum);
        }
        else
        {
            rankstr = LanguageManager.getlocal(`atkracedes4`);
		}
		
		// if(!this.vo.isCanJoin){
		// 	rankstr = LanguageManager.getlocal('crossImacyNoAccess');
		// }
        let bottomText4 = ComponentManager.getTextField("rank", 20, TextFieldConst.COLOR_WHITE);
        bottomText4.text = LanguageManager.getlocal("acLadder_rank",[rankstr]);
		bottomText4.setPosition(bottomText3.x, bottomText2.y);
		this.addChild(bottomText4);
		
		let rect = new egret.Rectangle(0,0,610,bottomBg.y-3-55);
        let scrollList = ComponentManager.getScrollList(AcCrossServerWifeBattleRankScrollItem1,rankList,rect,{aid:this.param.data.aid,code:this.param.data.code});
		scrollList.x = 15;
		scrollList.y = titleBg.y + titleBg.height + 10;
		scrollList.horizontalScrollPolicy = "off";
		view.addChild(scrollList);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
	}

	public dispose():void
	{
		super.dispose();
	}

}