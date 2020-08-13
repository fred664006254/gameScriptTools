//
class AcConquerMainLandDetailViewTab2Tab2 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	//private _countDownText:BaseTextField = null;
	
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}
	
	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		let code = baseview.getUiCode();
		return code;
	}

	protected getListType():number
	{
		return 2;
	}

	protected initView():void
	{
		let view = this;
		let code = view.uiCode;
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;

		view._nodeContainer = new BaseDisplayObjectContainer();
		view._nodeContainer.width = view.width;
		let str = '';

		let rankList = view.cfg.serverRank;
		let tmpX = 20;
		let scroStartY = 3;

		let rankmax = view.vo.zidarr.length;
		for (let index = 0; index < rankList.length; index++) {
			let id = index;
			let rItem = rankList[index];
			let key = index + 1;
			let ranknum = 0;
			let rank = rItem.serRank;
			if(rankmax < rank[0]){
				continue;
			}
			if (Number(key) < 4){
				ranknum = Number(key);
			}
			else{
				if(rankmax <= rank[1]){
					ranknum = rankmax;
				}
				else{
					ranknum = rank[1];
				}
			}


			let winBottomBg = BaseBitmap.create("public_9_bg23");
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
			
			let txt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
			if (Number(key) < 4)
			{
				txt.text = LanguageManager.getlocal("acRank_rank6",[key.toString()]);
			}else
			{
				if(rank[0] < ranknum){
					txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(ranknum) ] );
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
        let bottomBg = BaseBitmap.create("wifeview_bottombg");
		bottomBg.height = 93;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0,7]);
		view.addChild(bottomBg);

		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceBtnRank', view.rankCLick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
		view.addChild(rankBtn);
		let rankstr = '';
		let rankV = view.vo.getMyServerRank();
		if(rankV == 0){
			rankstr = LanguageManager.getlocal('atkracedes4');
		}
		else{
			rankstr = rankV.toString();
		}
		let color = String(0x21eb39);
		if(view.vo.getCurPeriod() == 1){
			rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
		}

		let txt3 = ComponentManager.getTextField("",20);
		txt3.text = LanguageManager.getlocal(`acConquerMainLandrank2-${code}`, [color,rankstr]);
		txt3.x =  bottomBg.x + 30;
		txt3.y = bottomBg.y + 25;
		this.addChild(txt3);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandrank3-${view.uiCode}`, [String(view.cfg.settleTime / 60)]), 20);
		tipTxt.x =  txt3.x;
		tipTxt.y = txt3.y + 35;	
		this.addChild(tipTxt);	

		// TickManager.addTick(this.tick,this);
		// let vo = this.vo;
		// this._countDownText = ComponentManager.getTextField("",20);
		// this.tick();
		// this._countDownText.x =  txt3.x;
		// this._countDownText.y = txt3.y + 35;		
		// this.addChild(this._countDownText);

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-7);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = -3;
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

	private rankCLick():void{
		let view = this;
		if(view.vo.isEnd){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
			return;
		}
		if(view.vo.getCurPeriod() == 1){
			App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
			return
		}
		if(view.vo.isInJudge()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip11-1`));
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDZRANKVIEW,{
			aid : view.param.data.aid,
			code : view.param.data.code,
		});
	}

	private getCountTimeStr(time:number):string
	{	
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	public dispose():void
	{
		this._nodeContainer = null;
		// this._countDownText = null;
		// TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}