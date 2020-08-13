//本轮个人
class AcThreeKingdomsRankViewTab1Tab3 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _rankTxt:BaseTextField=null;
	private _rank2Txt:BaseTextField=null;
	private _list : ScrollList = null;
	private _bottombg : BaseBitmap = null;
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

	    // protected getRequestData():{requestType:string,requestData:any}{	
	// 	return {
    //         requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK,
    //         requestData:{
    //             activeId : this.acTivityId,
    //             round : this.vo.getCurWeek()
    //         }
    //     };
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void{
    //     if(data.ret){
    //         let rdata = data.data.data;
    //         this.vo.setMapInfo
    //     }
	// }
	
	protected initView():void
	{
		let view = this;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK, view.prankCallback, view);
		let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;
		let code = view.getUiCode();

		let juzhou = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsjzhou`, code));
		view.addChild(juzhou);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[0,0],true);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip20`, code)), 20, TextFieldConst.COLOR_BROWN);
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
		
		//膜拜背景
		let bottomBg = BaseBitmap.create("arena_bottom");
		bottomBg.height = 135;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0,0], true);
		view.addChild(bottomBg);
		this._bottombg = bottomBg;
		//上轮排名 
		let rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip6`, code), view.rankCLick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [210,0]);
		view.addChild(rankBtn);
		if(view.vo.getCurWeek() == 1){
			rankBtn.setGray(true);
		}

		//查看奖励
		let rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip3`, code), ()=>{
			ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSREWARDVIEW3, {
				code : view.code,
				aid : view.aid
			})
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, bottomBg, [25,0]);
		view.addChild(rewardBtn);

		let arr = [];
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
		this._list = list;
		list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

		let myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip9-${code}`, [``]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, view._bottombg, [25,35]);
		view.addChild(myKingdomTxt);
		view._rankTxt = myKingdomTxt;
		//本轮个人排名
		let rankstr = ``;
		let color = String(0x21eb39);
		if(view.vo.getCurPeriod() == 1){
			rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
		}
		let txt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip5-${code}`, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0,myKingdomTxt.textHeight+20]);
		view.addChild(txt3);
		view._rank2Txt = txt3;


		NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK,{
			activeId:view.acTivityId,
			round : this.vo.getCurWeek()
		});
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
		if(view.vo.getCurWeek() == 1 || view.vo.getCurPeriod() == 1){
			App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip10`, view.getUiCode())));
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSLASTROUNDPRANKVIEW,{
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
		let view = this;
		let code = view.getUiCode();
		if(evt.data.ret && evt.data.data.data.round == this.vo.getCurWeek()){
			let rankarr = evt.data.data.data.rankArr;
			let myrankarr = evt.data.data.data.myrankArr;
			view.vo.prankroundarr = evt.data.data.data;
			let mypoint = 0;
			let rankV = 0;
			if(myrankarr && myrankarr.myrank){
				rankV = myrankarr.myrank;
			}
			if(myrankarr && myrankarr.value){
				mypoint = myrankarr.value;
			}

			// arr = [];
			// for(let i = 1; i < 20; ++ i){
			// 	arr.push({
			// 		uid : 1002735+i,
			// 		zid : App.MathUtil.getRandom(1,16),
			// 		title : {
			// 			title : 3000 + i,
			// 			level : App.MathUtil.getRandom(1,9),
			// 		},
			// 		name : `玩家${i}`,
			// 		kingdom : App.MathUtil.getRandom(1,4),
			// 		level : App.MathUtil.getRandom(1,9),
			// 		value : App.MathUtil.getRandom(1,10000),
			// 	});
			// }

			this._list.refreshData(rankarr);
			//我的本轮个人分数
			view._rankTxt.text = LanguageManager.getlocal(`acThreeKingdomsRanktip9-${code}`, [App.StringUtil.changeIntToText(mypoint)])
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._rankTxt, view._bottombg, [25,35]);
			//本轮个人排名
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
			view._rank2Txt.text = LanguageManager.getlocal(`acThreeKingdomsRanktip5-${code}`, [rankstr]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._rank2Txt, view._rankTxt, [0,view._rankTxt.textHeight+20]);
        }
	}

	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK, view.prankCallback, view);
		this._nodeContainer = null;
		this._rankTxt = null;
		this._bottombg = null;
		//this._countDownText = null;
		// TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}