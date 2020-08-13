//
class AcConquerMainLandDetailViewTab2Tab1 extends CommonViewTab
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
		return 1;
	}

	protected initView():void
	{
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;
		
		view._nodeContainer = new BaseDisplayObjectContainer();
		view._nodeContainer.width = view.width;
		let str = '';

		let rankList = view.cfg.indivdualRank;
		let tmpX = 20;
		let scroStartY = 3;
		let rankLen = rankList&&rankList.length ? rankList.length : 0;
		for (let index = 0; index < rankLen; index++) {
			let id = index;
			let rItem = rankList[index];
			let key = index + 1;

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
			let rank = rItem.idvRank;
			let txt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
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
			
			let len = rIcons&&rIcons.length ? rIcons.length : 0;
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

		let rankstr = ``;
		let rankV = view.vo.getMyPrank();
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
		
		let txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandrank1-1", [color,rankstr]),20);
		txt3.x =  bottomBg.x + 30;
		txt3.y = bottomBg.y + 25;
		this.addChild(txt3);
		this._rankTxt = txt3;

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
		ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDPRANKVIEW,{
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

	private prankCallback(evt : egret.Event):void{
		if(evt.data.ret && evt.data.data.data){
			this.vo.setPrankinfo(evt.data.data.data);
			let rankstr = '';
			let rankV = this.vo.getMyPrank();
			if(rankV == 0){
				rankstr = LanguageManager.getlocal('atkracedes4');
			}
			else{
				rankstr = rankV.toString();
			}
			let color = String(0x21eb39);
			if(this.vo.getCurPeriod() == 1){
				rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
			}
			else{
				if(!this.vo.isCanJoin()){
					rankstr = LanguageManager.getlocal('crossImacyNoAccess');
					color = String(0xff3c3c);
				}
			}
			if(this._rankTxt)
			{
				this._rankTxt.text = LanguageManager.getlocal(`acConquerMainLandrank1-${this.uiCode}`, [color,rankstr]);
			}
        }
	}

	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
		this._nodeContainer = null;
		this._rankTxt = null;
		//this._countDownText = null;
		// TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}