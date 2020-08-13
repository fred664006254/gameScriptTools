//攻城奖励 周六第1场
class AcThreeKingdomsRankViewTab2Tab3 extends CommonViewTab{
    private _list : ScrollList = null;
	private _number = 2;

	public constructor(param?) {
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
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_CITYREWARD, view.rewardback, view);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, view.mapinfoback, view);
		let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;
		let code = view.getUiCode();

		let tipbg = BaseLoadBitmap.create(`countrywarrewardview_itembg`);
        tipbg.width = 560;
        tipbg.height = 85;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipbg,this,[0,15], true);
		view.addChild(tipbg);
		
		let citywarRankBtn = ComponentManager.getButton(`threekingdomscitywarrank`, ``, ()=>{
			if(!view.vo.getMyKingdoms()){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip43`, code)));
                return;
            }
			ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSCITYWARPRANKVIEW,{
				aid : view.aid,
				code : view.code,
				number : view._number
			});
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter,citywarRankBtn,tipbg);
		view.addChild(citywarRankBtn);

        //本周六的第一场攻城战
        let week = view.vo.getCurWeek();
        let start = view.vo.activeSt + (week - 1) * (7 * 86400);
        let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[view._number % 2 == 1 ? 2 : 3];
		//周六
		let tmp = view._number < 3 ? 6 : 7;
        let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;

        // let st2 = start + (7 - 1) * 86400 + unit.popularityRange[0] * 3600;
        // let et2 = start + (7 - 1) * 86400 + unit.popularityRange[1] * 3600;

        let timeparam = `${App.DateUtil.getFormatBySecond(st,15)}-${App.DateUtil.getFormatBySecond(et,15)}`;
        // let timeparam2 = `${App.DateUtil.getFormatBySecond(st2,15)}-${App.DateUtil.getFormatBySecond(et2,15)}`;

        let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank2Tip7`, code), [view._number.toString(),timeparam]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(dateTxt);
        dateTxt.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, dateTxt, citywarRankBtn, [citywarRankBtn.width+7,0]);

		let arr = [];
		let obj = {
			1 : [1,2,3,4,5,6],
			2 : [3,4,5,6,1,2],
			3 : [5,6,1,2,3,4]
		}
		let cfg = obj[view.vo.getMyKingdoms()];
		for(let i = 1; i <= 6; ++ i){
			arr.push({
				cityid : cfg[i - 1],
				num : view._number,
				kingdoms : Math.ceil(cfg[i - 1]/2)
			});
		}
        let list = ComponentManager.getScrollList(AcThreeKingdomsRankViewTab2Tab2Item,arr,new egret.Rectangle(0,0,610,view.height-tipbg.height-50), view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, tipbg, [0,tipbg.height+15]);
        view.addChild(list);
		view._list = list;
		
		TickManager.addTick(view.tick, view);
        view.tick();
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

	private getCountTimeStr(time:number):string
	{	
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	private mapinfoback(evt : egret.Event):void{
		let view = this;
		if(evt.data.ret&& (evt.data.data.data.day == 6 && evt.data.data.data.ftype == 4)){
			let data = evt.data.data.data;
			let roundMainlandScore = data.roundMainlandScore;
			view.vo.setMainLandScore(roundMainlandScore);
		}
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

	private rewardback(evt : egret.Event):void{
		let view = this;
		if(evt.data.ret){
			let rData = evt.data.data.data;
			if(rData.ftype == 4 && rData.day == 6){
				let rewards = rData.rewards;
				let cfg = view.cfg.cityReward[view.vo.lastidx < 2 ? 0 : 1];
				let str = `1046_1_${cfg.specialReward2}|${rewards}`;
				let rewardList =  GameData.formatRewardItem(str);
				let pos = this.vo.lastpos;
				App.CommonUtil.playRewardFlyAction(rewardList,pos);
				let item = <AcThreeKingdomsRankViewTab2Tab2Item>view._list.getItemByIndex(view.vo.lastidx);
				if(item){
					item.refreshUI();
				}
				this.vo.lastidx = null;
			}
		}
	}

	public tick():void{
        let view = this;
        //本周激战期
        let week = view.vo.getCurWeek();
		let start = view.vo.activeSt + (week - 1) * (7 * 86400);
        let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[view._number % 2 == 1 ? 2 : 3];
        //周六 周日
		let tmp = view._number < 3 ? 6 : 7;
		let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        if(GameData.serverTime == et){
			let weekday = view.vo.getTodayWeek();
			NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO,{
				activeId:view.acTivityId,
				all : 1
			});
        }
    }

	public dispose():void
	{
		let view = this;
		TickManager.removeTick(view.tick, view);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_CITYREWARD, view.rewardback, view);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, view.mapinfoback, view);
		view._list = null;
		//this._countDownText = null;
		// TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}
