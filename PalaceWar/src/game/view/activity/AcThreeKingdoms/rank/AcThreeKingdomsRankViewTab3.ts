//冲榜物资奖励
class AcThreeKingdomsRankViewTab3 extends CommonViewTab{
	private _list : ScrollList = null;

	public constructor(data){
		super();
		this.param = data;
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
	
	protected initView():void{	
		let view = this;
		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		//App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETCROSSACTIVEREWARDS,this.rewardCallBack,this);
		// NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_HEROINFO,{
		// 	activeId : view.acTivityId
		// });
		
		let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		let code = view.getUiCode();

		let juzhou = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsjzhou`, code));
		view.addChild(juzhou);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[0,0],true);
		//第四周
		// let start = view.vo.activeSt + (4 - 1) * (7 * 86400);
		// let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[1];
		// let tmp = 2;
		// let datest = start;
		// let dateet = start + 4 * 86400;
		// let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
		// let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
		// let timeparam = `${App.DateUtil.getFormatBySecond(datest,7)}-${App.DateUtil.getFormatBySecond(dateet,7)}`;
		// let timeparam2 = `${App.DateUtil.getFormatBySecond(st,12)}-${App.DateUtil.getFormatBySecond(et,12)}`;

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3Tip1`, code)), 20, TextFieldConst.COLOR_BROWN);
		tipTxt.lineSpacing = 5;
		// tipTxt.textAlign= egret.HorizontalAlign.CENTER;
		tipTxt.width = 470;
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop,tipTxt,juzhou,[30,23]);

		let rewardBtn = ComponentManager.getButton(`threekingdomspranksupplyrewardbtn`, ``, ()=>{
			ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSRANKFOODREWARDVIEW,{
				code : view.code,
				aid : view.aid
			})
		}, view);
		view.addChild(rewardBtn);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter,rewardBtn,juzhou,[25,0]);

		let info = view.vo.getCrossActivity();
		// week : i,
		// weekst : start,
		// weeket : end,
		//排名列表
		
		let list = ComponentManager.getScrollList(AcThreeKingdomsActicityItem,info,new egret.Rectangle(0,0,618,view.height-juzhou.height-20), view.code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, juzhou, [0,juzhou.height+10]);
		view.addChild(list);
		view._list = list;

		TickManager.addTick(this.tick,this);
		this.tick();
	}

	public tick():void{
		let view = this;
	}

	private update():void{
		let view = this;
	}

	protected getBigFrame():string{
		return `commonview_bigframe`;
	}

	public dispose():void{	
		let view = this;
		TickManager.removeTick(this.tick,this);
		view._list = null;
		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		//App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETCROSSACTIVEREWARDS,this.rewardCallBack,this);
		super.dispose();
	}
}