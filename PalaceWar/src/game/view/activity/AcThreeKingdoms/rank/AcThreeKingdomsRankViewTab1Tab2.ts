//赛季阵营
class AcThreeKingdomsRankViewTab1Tab2 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _rankTxt:BaseTextField=null;
	private _list : ScrollList = null;
	private _rankArr = [];
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

	protected initView():void
	{
		let view = this;
		let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;
		let code = view.getUiCode();

		let juzhou = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsjzhou`, code));
		view.addChild(juzhou);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[0,0],true);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip19`, code)), 20, TextFieldConst.COLOR_BROWN);
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
		view._bottombg = bottomBg;
		//上轮排名 
		// let rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, 'allianceBtnRank', view.rankCLick, view);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [210,0]);
		// view.addChild(rankBtn);
		//查看奖励
		let rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip3`, code), ()=>{
			ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSREWARDVIEW2, {
				code : view.code,
				aid : view.aid
			})
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, bottomBg, [25,0]);
		view.addChild(rewardBtn);

		let arr = [];
		for(let i = 1; i <= 3; ++ i){
			arr.push({
				kingdomid : i,
				value : view.vo.getMyZrankSeasonPoints(i)
			});
		}
		arr.sort((a,b)=>{
			return b.value - a.value;
		});
		let rankV = 0;
		for(let i = 0; i < arr.length; ++ i){
			if(arr[i].kingdomid == view.vo.getMyKingdoms()){
				rankV = Number(i) + 1;
				break;
			}	
		}
		//排名列表
		let list = ComponentManager.getScrollList(AcThreeKingdomsZrankItem,arr,new egret.Rectangle(0,0,614,bottomBg.y-juzhou.y-juzhou.height-10));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, juzhou, [0,juzhou.height+10]);
		view.addChild(list);
		view._list = list;
		//我的阵营
		let myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip4-${code}`, [LanguageManager.getlocal(`acThreeKingdomsTeam${view.vo.getMyKingdoms()}-${code}`)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, view._bottombg, [25,35]);
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
	}

	private getCountTimeStr(time:number):string{	
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	public dispose():void
	{
		let view = this;
		this._nodeContainer = null;
		this._rankTxt = null;
		this._rankArr = [];
		this._bottombg = null;
		//this._countDownText = null;
		// TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}