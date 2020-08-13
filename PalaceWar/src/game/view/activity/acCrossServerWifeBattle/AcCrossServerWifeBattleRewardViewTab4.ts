//
class AcCrossServerWifeBattleRewardViewTab4 extends CommonViewTab
{
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}


	
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
		
		let titleBg = BaseBitmap.create("ladder_itemtitlebg");
        titleBg.width = 598;
        titleBg.height = 40;
        titleBg.setPosition(21,10);
        this.addChild(titleBg);

        let titleText1 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText1.setPosition(85-titleText1.width/2, 17);
        this.addChild(titleText1);

        let titleText2 = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText2.setPosition(193-titleText2.width/2, titleText1.y);
        this.addChild(titleText2);
        
        let titleText3 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_title3"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText3.setPosition(335-titleText3.width/2, titleText1.y);
        this.addChild(titleText3);

        let titleText4 = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText4.setPosition(455-titleText4.width/2, titleText1.y);
        this.addChild(titleText4);

        let titleText5 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText5.setPosition(555-titleText5.width/2, titleText1.y);
		this.addChild(titleText5);
		
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

        let ranknum:number = this.vo.getRankMyRank();
        let rankstr:string;
        if (ranknum)
        {
            rankstr = String(ranknum);
        }
        else
        {
            if(this.vo.isCanJoin){
				rankstr = LanguageManager.getlocal(`emperorWarCheerNot`);
			}
			else{
				rankstr = LanguageManager.getlocal(`atkracedes4`);
			}
		}
		
		if(!this.vo.isCanJoin){
			rankstr = LanguageManager.getlocal('crossImacyNoAccess');
		}
        let bottomText4 = ComponentManager.getTextField("acLadder_rank", 20, TextFieldConst.COLOR_WHITE);
        bottomText4.text = LanguageManager.getlocal("acLadder_rank",[rankstr]);
		bottomText4.setPosition(bottomText3.x, bottomText2.y);
		this.addChild(bottomText4);

		let rankList = [];
		if(this.vo.rankData && this.vo.rankData.rankarr){
			rankList = this.vo.rankData.rankarr;
		}
		if(this.vo.test){
			for(let i = 1; i <= 5; ++ i){
				rankList.push({
					zid : i,
					point : i * 100,
					name : `玩家${i}`,
					titile : {
						titile : 3201 + i,
						lv : i
					}
				});
			}
		}
		 
		let rect = new egret.Rectangle(0,0,610,bottomBg.y-3-55);
        let scrollList = ComponentManager.getScrollList(AcCrossServerWifeBattleRankScrollItem2,rankList,rect,{aid:this.param.data.aid,code:this.param.data.code});
		scrollList.x = 15;
		scrollList.y = titleBg.y + titleBg.height + 5;
		scrollList.horizontalScrollPolicy = "off";
		view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
	}

	public dispose():void
	{
		super.dispose();
	}

}