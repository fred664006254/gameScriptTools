//本轮个人
class AcThreeKingdomsRewardViewTab3 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _rankTxt:BaseTextField=null;
	//private _countDownText:BaseTextField = null;
	
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get acTivityId():string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
	
	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		let code = baseview.getUiCode();
		return code;
	}

	protected getListType():number
	{
		return 1;
	}

	protected initView():void{
		let view = this;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
		let baseview : any = ViewController.getInstance().getView('AcThreeKingdomsRewardView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		let code = view.getUiCode();

		let juzhou = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsjzhou`, code));
		view.addChild(juzhou);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[0,0],true);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip22`, code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
		tipTxt.lineSpacing = 10;
		tipTxt.textAlign= egret.HorizontalAlign.CENTER;
		tipTxt.width = 560;
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt,juzhou,[0,33]);

		//本周六的第一场攻城战
		let week = view.vo.getCurWeek();
		let start = view.vo.activeSt + (week - 1) * (7 * 86400);
		let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[0];
		//周六
		let st = start + (1 - 1) * 86400 + unit.popularityRange[0] * 3600;
		unit = view.cfg.activeTime[4];
		let et = start + (7 - 1) * 86400 + unit.popularityRange[1] * 3600;
		let timeparam = `${App.DateUtil.getFormatBySecond(st,15)}-${App.DateUtil.getFormatBySecond(et,15)}`;

		let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip21`, code), [timeparam]), 20, TextFieldConst.COLOR_BROWN);
		view.addChild(dateTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,dateTxt,tipTxt,[0,tipTxt.textHeight+10]);
		
		view._nodeContainer = new BaseDisplayObjectContainer();
		view._nodeContainer.width = view.width;

		let str = '';

		let rankList = view.cfg.person1;
		let tmpX = 20;
		let scroStartY = 3;

		for (let index = 0; index < rankList.length; index++) {
			let id = index;
			let rItem : Config.AcCfg.ThreeKingdomsPrankRewardCfg= rankList[index];
			let key = index + 1;

			let winBottomBg = BaseBitmap.create("public_alphabg");
			winBottomBg.width = view.width;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 0;
			this._nodeContainer.addChild(winBottomBg);

			let winbg = BaseBitmap.create(`tombrewardrankbg-1`);
			winbg.y = scroStartY;
			winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
			this._nodeContainer.addChild(winbg);

			let line1 = BaseBitmap.create("public_line3");
			line1.width = 480;
			line1.x = GameConfig.stageWidth/2 - line1.width/2;
			line1.y = winbg.y + winbg.height/2 - line1.height/2;
			this._nodeContainer.addChild(line1);
			
			let rewardStr = rItem.getReward;
			let rIcons = GameData.getRewardItemIcons(rewardStr, true);
			let rank = rItem.rank;
			let txt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
			// txt.text = LanguageManager.getlocal("acRank_rank6",[key.toString()]);
			if (Number(key) < 4)
			{
				txt.text = LanguageManager.getlocal("acRank_rank6",[key.toString()]);
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
			let startY = winbg.y + winbg.height+ 10;
			tmpX = 20;
			scroStartY = startY;
			for (let innerIdx = 0; innerIdx < len; innerIdx++) {
				var element = rIcons[innerIdx];
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
			winBottomBg.height = scroStartY - winBottomBg.y - 10;
			this._nodeContainer.height = winBottomBg.y + winBottomBg.height + 10;
		}
		
		// 膜拜背景
		let bottomBg = BaseBitmap.create("arena_bottom");
		bottomBg.height = 135;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0,0], true);
		view.addChild(bottomBg);
		//返回
		let backBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip11`, code), ()=>{
			baseview.hide();
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, backBtn, bottomBg, [25,0]);
		view.addChild(backBtn);

		//我的个人本轮分数
		let mypoint = this.vo.getMyPrankRoundPoints();
		let myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip9-${code}`, [App.StringUtil.changeIntToText(mypoint)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25,35]);
		view.addChild(myKingdomTxt);
		//赛季排名
		let rankstr = ``;
		let rankV = view.vo.getMyPrankRoundRank();
		if(!this.vo.getMyKingdoms()){
			rankstr = LanguageManager.getlocal(`acThreeKingdomsTeam0-${code}`);
		}
		else if(rankV == 0){
			rankstr = LanguageManager.getlocal(`atkracedes4`);
		}
		else{
			rankstr = rankV.toString();
		}
		let color = String(0x21eb39);
		if(view.vo.getCurPeriod() == 1){
			rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
		}
		let txt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip5-${code}`, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0,myKingdomTxt.textHeight+20]);
		view.addChild(txt3);

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-juzhou.height - 7);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = juzhou.y + juzhou.height;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);
	}

	// public tick():void{	
	// 	if (this._countDownText)
	// 	{
	// 		let countDownTime = this.vo.getCountDown();
	// 		if(countDownTime > 0) {
	// 			this._countDownText.text = LanguageManager.getlocal(`acFourPeople_acCD`, [App.DateUtil.getFormatBySecond(countDownTime)]);
	// 		}
	// 		else{
	// 			this._countDownText.text = LanguageManager.getlocal("acPunishEnd");
	// 		}
	// 	}
	// }

	// private prankCallback(evt : egret.Event):void{
	// 	if(evt.data.data.data){
	// 		this.vo.setPrankinfo(evt.data.data.data);
	// 		let rankstr = '';
	// 		let rankV = this.vo.getMyPrank();
	// 		if(rankV == 0){
	// 			rankstr = LanguageManager.getlocal('atkracedes4');
	// 		}
	// 		else{
	// 			rankstr = rankV.toString();
	// 		}
	// 		let color = String(0x21eb39);
	// 		if(this.vo.getCurPeriod() == 1){
	// 			rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
	// 		}
	// 		else{
	// 			if(!this.vo.isCanJoin()){
	// 				rankstr = LanguageManager.getlocal('crossImacyNoAccess');
	// 				color = String(0xff3c3c);
	// 			}
	// 		}
	// 		this._rankTxt.text = LanguageManager.getlocal(`acConquerMainLandrank1-${this.uiCode}`, [color,rankstr]);
    //     }
	// }

	public dispose():void
	{
		let view = this;
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
		this._nodeContainer = null;
		this._rankTxt = null;
		//this._countDownText = null;
		// TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}