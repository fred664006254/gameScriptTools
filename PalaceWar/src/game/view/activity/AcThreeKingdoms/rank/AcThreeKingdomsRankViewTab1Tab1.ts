//赛季个人
class AcThreeKingdomsRankViewTab1Tab1 extends CommonViewTab
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

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
		let view = this;
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK, view.prankCallback, view);
		let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;
		let code = view.getUiCode();

		let juzhou = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsjzhou`, code));
		view.addChild(juzhou);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[0,0],true);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip7`, code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
		tipTxt.lineSpacing = 10;
		tipTxt.textAlign= egret.HorizontalAlign.CENTER;
		tipTxt.width = 560;
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt,juzhou,[0,33]);

		let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip2`, code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
		view.addChild(dateTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,dateTxt,tipTxt,[0,tipTxt.textHeight+10]);
		//膜拜背景
		let bottomBg = BaseBitmap.create("arena_bottom");
		bottomBg.height = 135;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0,0], true);
		view.addChild(bottomBg);
		//上轮排名 
		// let rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, 'allianceBtnRank', view.rankCLick, view);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [210,0]);
		// view.addChild(rankBtn);
		//查看奖励
		let rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip3`, code), ()=>{
			ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSREWARDVIEW, {
				code : view.code,
				aid : view.aid
			})
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, bottomBg, [25,0]);
		view.addChild(rewardBtn);

		let mypoint = 0;
		let rankV = 0;
		let arr = [];

		if(view.vo.prankseasonarr && view.vo.prankseasonarr.rankArr){
			arr = view.vo.prankseasonarr.rankArr;
		}

		if(view.vo.prankseasonarr && view.vo.prankseasonarr.myrankArr){
			let myrankarr = view.vo.prankseasonarr.myrankArr;
			if(myrankarr && myrankarr.myrank){
				rankV = myrankarr.myrank;
			}
			if(myrankarr && myrankarr.value){
				mypoint = myrankarr.value;
			}
		}
		
		//我的赛季分数
		let myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip12-${code}`, [mypoint.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25,35]);
		view.addChild(myKingdomTxt);
		//赛季排名
		let rankstr = ``;
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
		//排名列表
		let title= BaseBitmap.create("qingyuanitemtitlebg");
		title.width = 610;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,title,juzhou,[0,juzhou.height+7]);
		this.addChild(title);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(42 , title.y+8);
		this.addChild(rankText);

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(115 , rankText.y);
		this.addChild(nameText);

		let titleTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_title3"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTxt.setPosition(275 , rankText.y);
		this.addChild(titleTxt);

		
		let serverTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		serverTxt.setPosition(400 , rankText.y);
		this.addChild(serverTxt);

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip8-1"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(475 , rankText.y);
		this.addChild(scoreText);

		let list = ComponentManager.getScrollList(AcThreeKingdomsPrankItem,arr,new egret.Rectangle(0,0,610,bottomBg.y-title.y-title.height-10));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, title, [0,title.height+5]);
		view.addChild(list);
		list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

		// NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK,{
		// 	activeId:view.acTivityId,
		// });
	}


	private getCountTimeStr(time:number):string
	{	
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	private prankCallback(evt : egret.Event):void{
		// if(evt.data.data.data){
		// 	this.vo.setPrankinfo(evt.data.data.data);
		// 	let rankstr = '';
		// 	let rankV = this.vo.getMyPrank();
		// 	if(rankV == 0){
		// 		rankstr = LanguageManager.getlocal('atkracedes4');
		// 	}
		// 	else{
		// 		rankstr = rankV.toString();
		// 	}
		// 	let color = String(0x21eb39);
		// 	if(this.vo.getCurPeriod() == 1){
		// 		rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
		// 	}
		// 	else{
		// 		if(!this.vo.isCanJoin()){
		// 			rankstr = LanguageManager.getlocal('crossImacyNoAccess');
		// 			color = String(0xff3c3c);
		// 		}
		// 	}
		// 	this._rankTxt.text = LanguageManager.getlocal(`acConquerMainLandrank1-${this.uiCode}`, [color,rankstr]);
        // }
	}

	public dispose():void
	{
		let view = this;
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK, view.prankCallback, view);
		this._nodeContainer = null;
		this._rankTxt = null;
		//this._countDownText = null;
		// TickManager.removeTick(this.tick,this);
		super.dispose();
	}
}