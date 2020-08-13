//突袭奖励
class AcThreeKingdomsRankViewTab4 extends CommonViewTab{
	private _lockGroup : BaseDisplayObjectContainer = null;
	private _juzhou : BaseBitmap = null;
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
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HEROINFO,this.infoCallback,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HEROREWARD,this.rewardCallBack,this);
		NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_HEROINFO,{
			activeId : view.acTivityId
		});
		
		let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		let code = view.getUiCode();

		let juzhou = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsjzhou`, code));
		view.addChild(juzhou);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[0,0],true);
		view._juzhou = juzhou;
		//第四周
		let start = view.vo.activeSt + (4 - 1) * (7 * 86400);
		let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[1];
		let tmp = 2;
		let datest = start;
		let dateet = start + 4 * 86400;
		let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
		let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
		let timeparam = `${App.DateUtil.getFormatBySecond(datest,7)}-${App.DateUtil.getFormatBySecond(dateet,7)}`;
		let timeparam2 = `${App.DateUtil.getFormatBySecond(st,12)}-${App.DateUtil.getFormatBySecond(et,12)}`;

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip13`, code), [timeparam,timeparam2]), 20, TextFieldConst.COLOR_BROWN);
		tipTxt.lineSpacing = 10;
		tipTxt.textAlign= egret.HorizontalAlign.CENTER;
		tipTxt.width = 560;
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt,juzhou,[0,18]);

		//排名列表
		let list = ComponentManager.getScrollList(AcThreeKingdomsHeroAttackItem,[],new egret.Rectangle(0,0,639,view.height-view._juzhou.height-20), {code : view.code, bosshp : 0, heroHpList : {}});
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, view._juzhou, [0,view._juzhou.height+10]);
		view.addChild(list);
		view._list = list;
		
		let lockGroup = new BaseDisplayObjectContainer();
		lockGroup.width = view.width;
		lockGroup.height = view.height;
		view.addChild(lockGroup);

		let mask = BaseBitmap.create(`public_9_viewmask`);
		mask.width = view.width;
		mask.height = GameConfig.stageHeigth;
		lockGroup.addChild(mask);

		let lockImg = BaseBitmap.create(`threekingdomsprankofficerlock`);
		lockGroup.addChild(lockImg);

		let tipbg = BaseLoadBitmap.create(`countrywarrewardview_itembg`);
		tipbg.width = 560;
        tipbg.height = 85;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom,tipbg,lockGroup,[0,145], true);
		lockGroup.addChild(tipbg);

		let lockTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip14`, code), [timeparam]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		lockTxt.lineSpacing = 6;
		lockTxt.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,lockTxt,tipbg);
		lockGroup.addChild(lockTxt);
		//未解锁
		lockGroup.visible = view.vo.getCurWeek() < 4;
		view._lockGroup = lockGroup;
		lockGroup.touchEnabled = true;
		lockGroup.addTouchTap(()=>{
			
		}, view);

		TickManager.addTick(this.tick,this);
		this.tick();
	}

	protected getBigFrame():string{
		return `commonview_bigframe`;
	}

	public tick():void{
		let view = this;
		view._lockGroup.visible = view.vo.getCurWeek() < 4;
		view._list.verticalScrollPolicy = view._lockGroup.visible ? 'off' : 'on';
	}

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		if(evt.data.ret){
			let rData = evt.data.data.data;
			// if(!rData){
			//     App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
			//     return;
			// }
			let rewards = rData.rewards;
			let cfg = view.cfg.recharge[view.vo.lastidx];
			let str = rewards;
			let rewardList =  GameData.formatRewardItem(str);
			let pos = this.vo.lastpos;
			App.CommonUtil.playRewardFlyAction(rewardList,pos);
			let item = <AcThreeKingdomsHeroAttackItem>view._list.getItemByIndex(view.vo.lastidx);
			item.refreshUI();
			this.vo.lastidx = null;
			
			
		}
	}

	private infoCallback(evt : egret.Event):void{
		let view = this;
		let bosshp = view.cfg.heroHp;
		let heroHpList = {};
		if(evt.data.ret){
			let data = evt.data.data.data;
			bosshp = data.bosshp;
			heroHpList = data.heroHpList;
		}

		let arr = [];
		for(let i = 1; i <= 5; ++ i){
			arr.push(i);
		}
		let today = view.vo.getCurWeek() < 4 ? 1 : Math.min(5,view.vo.getTodayWeek());
		view._list.refreshData(arr, {code : view.code, bosshp : bosshp, heroHpList : heroHpList});
	}

	private update():void{
		let view = this;
	}

	public dispose():void{	
		let view = this;
		TickManager.removeTick(this.tick,this);
		view._lockGroup.dispose();
		view._lockGroup  = null;
		view._juzhou = null;
		view._list = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HEROINFO,this.infoCallback,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HEROREWARD,this.rewardCallBack,this);
		
		super.dispose();
	}
}