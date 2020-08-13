//
class AcCrossServerWifeBattleRewardViewTab2 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	
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
		view._nodeContainer = new BaseDisplayObjectContainer();
		this.addChild(this._nodeContainer);
		let str = '';

		let zidNum = this.vo.getPkzidNum();
		if(zidNum == 2){
			this.initDoubleServer(zidNum);

		} else {
			this.initMultiServer(zidNum);
		}



	}
	private initDoubleServer(zidNum){

		let rankList = this.cfg.getServerRankRewards();//this.vo.getArr('personRankReward');
		let tmpX = 20;
		let scroStartY = 0;

		for (let index = 0; index < rankList.length; index++) {
			let id = index;
			let rItem = rankList[index];
			let key =  index+1;//rItem.id;
			

			let winBottomBg = BaseBitmap.create("public_9_bg23");
			winBottomBg.width = 628;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);

			let winbg = BaseBitmap.create(`tombrewardrankbg-1`);
			winbg.y = scroStartY;
			winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
			this._nodeContainer.addChild(winbg);
			winbg.y = scroStartY;

			let line1 = BaseBitmap.create("public_line3");
			line1.width = 480;
			line1.x = GameConfig.stageWidth/2 - line1.width/2;
			line1.y = winbg.y + winbg.height/2 - line1.height/2;
			this._nodeContainer.addChild(line1);
			
		
			// let rIcons = rItem.rewardIcons;
			let rIcons:any[] = GameData.formatRewardItem(rItem.reward);

			//  GameData.getItemIcon(this._rewardArrList[count],true,true);
			let rank = rItem.rank
			let txt = null;
			let offY = 0;
			let offH = 0;
		

			txt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
			if (Number(key) < 4)
			{
				txt.text = LanguageManager.getlocal("acRank_rank6",[String(key)]);
			}else
			{
				if(rank[0] < rank[1]){
					txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
				}
				else{
					txt.text =LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
				}
			}
			txt.x = GameConfig.stageWidth/2 - txt.width/2;
			txt.y = winbg.y + winbg.height/2 - txt.height/2;
			this._nodeContainer.addChild(txt);
			let len = rIcons.length;
			let startY = winbg.y + winbg.height+ 10 + offH;
			tmpX = 20;
			// tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
			scroStartY = startY;

			for (let innerIdx = 0; innerIdx < len; innerIdx++) {
				// var element = rIcons[innerIdx];
				let element = GameData.getItemIcon(rIcons[innerIdx],true,true);
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				if (tmpX >= GameConfig.stageWidth)
				{
					tmpX = 20;
					scroStartY += element.height + 15;
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+ 15);
				}
				element.cacheAsBitmap = true;
				this._nodeContainer.addChild(element);
			}
			scroStartY += 130;
			winBottomBg.height = scroStartY - winBottomBg.y - 2;
		}
		
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
        let bottomText4 = ComponentManager.getTextField("rank", 20, TextFieldConst.COLOR_WHITE);
        bottomText4.text = LanguageManager.getlocal("acLadder_rank",[rankstr]);
		bottomText4.setPosition(bottomText3.x, bottomText2.y);
        this.addChild(bottomText4);

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-3);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = 0;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);		
	}

	private initMultiServer(zidNum){
		let rankList = this.cfg.getMulServerPRankRewards();//this.vo.getArr('personRankReward');
		let tmpX = 20;
		let scroStartY = 0;

		for (let index = 0; index < rankList.length; index++) {
			let id = index;
			let rItem = rankList[index];
			let key =  index+1;//rItem.id;
		
			let winBottomBg = BaseBitmap.create("public_9_bg23");
			winBottomBg.width = 628;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);

			let winbg = BaseBitmap.create(`tombrewardrankbg-1`);
			winbg.y = scroStartY;
			winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
			this._nodeContainer.addChild(winbg);
			winbg.y = scroStartY;

			let line1 = BaseBitmap.create("public_line3");
			line1.width = 480;
			line1.x = GameConfig.stageWidth/2 - line1.width/2;
			line1.y = winbg.y + winbg.height/2 - line1.height/2;
			this._nodeContainer.addChild(line1);
			
			// let rIcons = rItem.rewardIcons;
			let rIcons:any[] = GameData.formatRewardItem(rItem.reward);
			let rank = rItem.rank
			let txt = null;
			let offY = 0;
			let offH = 0;

			txt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
			if (Number(key) < 4)
			{
				txt.text = LanguageManager.getlocal("acRank_rank6",[String(key)]);
			}else
			{
				if(rank[0] < rank[1]){
					txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
				}
				else{
					txt.text =LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
				}
			}
			txt.x = GameConfig.stageWidth/2 - txt.width/2;
			txt.y = winbg.y + winbg.height/2 - txt.height/2;
			this._nodeContainer.addChild(txt);
			
			let len = rIcons.length;
			let startY = winbg.y + winbg.height+ 10 + offH;
			tmpX = 20;
			// tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
			scroStartY = startY;

			for (let innerIdx = 0; innerIdx < len; innerIdx++) {
				// var element = rIcons[innerIdx];
				let element = GameData.getItemIcon(rIcons[innerIdx],true,true);
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				if (tmpX >= GameConfig.stageWidth)
				{
					tmpX = 20;
					scroStartY += element.height + 15;
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+ 15);
				}
				element.cacheAsBitmap = true;
				this._nodeContainer.addChild(element);
			}
			scroStartY += 130;
			winBottomBg.height = scroStartY - winBottomBg.y - 2;
		}
		
		 // 膜拜背景
        let bottomBg = BaseBitmap.create("emparena_bottom");
  		bottomBg.height = 120;
		bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width/2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 142;
		this.addChild(bottomBg);

		// let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab1', view.rankCLick, view);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
		// view.addChild(rankBtn);
		// 

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

        let bottomText4 = ComponentManager.getTextField("rank", 20, TextFieldConst.COLOR_WHITE);
        bottomText4.text = LanguageManager.getlocal("acLadder_rank",[rankstr]);
		bottomText4.setPosition(bottomText3.x, bottomText2.y);
        this.addChild(bottomText4);

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-3);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = 0;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);
	}

	public dispose():void
	{
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		this._nodeContainer = null;
		super.dispose();
	}

}