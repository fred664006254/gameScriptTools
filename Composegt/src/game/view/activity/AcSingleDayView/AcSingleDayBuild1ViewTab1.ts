class AcSingleDayBuild1ViewTab1 extends CommonViewTab{
	private _cdtxt : BaseTextField = null;
	private _cdImg : BaseBitmap = null;
	private _midGroup : BaseDisplayObjectContainer = null;
	private _redGroup : BaseDisplayObjectContainer = null;
	private _redPt : BaseBitmap = null;
	private _cdBg : BaseBitmap = null;
	private _tipbg : BaseBitmap = null;
	private _tiptxt : BaseTextField = null;

    public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	private get cfg() : Config.AcCfg.SingleDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcSingleDayVo{
        return <AcSingleDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
	}

	public initView():void{
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SINGLEDAY_GETREDPT), view.getRedPtCallBack, view);

		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth - view.y - 110;

		let bgmask = BaseBitmap.create('public_9_bg20');
		bgmask.width = view.width;
		bgmask.height = view.height - 162;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bgmask, view, [0,0]);
		view.addChild(bgmask);

		let midGroup:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		midGroup.width = view.width;
		midGroup.height = GameConfig.stageHeigth;
		midGroup.y = -view.y;
		view.addChild(midGroup);
		midGroup.visible = false;
		view._midGroup = midGroup;

		let redGroup:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		redGroup.width = view.width;
		redGroup.height = GameConfig.stageHeigth;
		view.addChild(redGroup);
		redGroup.visible = false;
		view._redGroup = redGroup;

		if(view.vo.isInActivity()){
			for(let i = 0; i < 20; ++ i){
				let redImg = BaseBitmap.create('acsingleday_couponIcon');
				redImg.x = App.MathUtil.getRandom(30,GameConfig.stageWidth - redImg.width - 30);
				redImg.y = redImg.y;
				redImg.alpha = 0;
				view._redGroup.addChild(redImg);
				let startX = redImg.x;
				egret.Tween.get(redImg,{loop : true}).wait(i * 1000).
				to({alpha : 1, y : 0}, redImg.height * 10).
				to({y : 100, x : startX - 30}, 1000).
				to({y : 200, x : startX}, 1000).
				to({y : 300, x : startX + 30}, 1000).
				to({y : 400, x : startX}, 1000).
				to({y : 500, x : startX - 30}, 1000).
				to({y : 600, x : startX}, 1000).
				to({y : 700, x : startX + 30}, 1000).call(()=>{
					redImg.x = App.MathUtil.getRandom(30,GameConfig.stageWidth - redImg.width - 30);
					redImg.y = -redImg.height;
					redImg.alpha = 0;
					startX = redImg.x;
				},view);
			}
		}


		let redbg = BaseBitmap.create('acsingledayredpt');
		redbg.anchorOffsetX = redbg.width / 2;
		redbg.anchorOffsetY = redbg.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, redbg, redGroup, [0,250], true);
		redGroup.addChild(redbg);
		redbg.addTouchTap(()=>{
			// NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:2, kid:"singleDayAc"});
			view.showRedReward();
		},view);
		egret.Tween.get(redbg,{loop : true}).to({rotation : -10} , 100).to({rotation : 0} , 100).to({rotation : 10} , 100).to({rotation : 0} , 100).wait(1500);

		let redTxtbg = BaseBitmap.create('public_icontimebg');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, redTxtbg, redbg, [0, -10]);
		redGroup.addChild(redTxtbg);
		
		let redTxt = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayGetRed2'), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, redTxt, redTxtbg);
		redGroup.addChild(redTxt);

		let cdbg = BaseBitmap.create('acsingleday_cdbg');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cdbg, bgmask, [0,300]);
		midGroup.addChild(cdbg);
		view._cdBg = cdbg;

		let cdTxt = ComponentManager.getTextField(LanguageManager.getlocal('activitycddesc', [App.DateUtil.getFormatBySecond(view.vo.getCountDownCD())]), 20, TextFieldConst.COLOR_BROWN);
		cdTxt.textAlign = egret.HorizontalAlign.CENTER;
		cdTxt.lineSpacing = 5;
		cdTxt.visible = false;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cdTxt, cdbg);
		midGroup.addChild(cdTxt);
		view._cdtxt = cdTxt;

		let cdImg = BaseBitmap.create('acsingleday_cd_num3');
		cdImg.visible = false;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cdImg, cdbg);
		midGroup.addChild(cdImg);
		view._cdImg = cdImg;

		let tipbg = BaseBitmap.create('public_tipbg');
		midGroup.addChild(tipbg);
		view._tipbg = tipbg;

		let rewarddesc = ComponentManager.getTextField(LanguageManager.getlocal('activityredrewarddesc'), 20, TextFieldConst.COLOR_WARN_GREEN2);
		rewarddesc.textAlign = egret.HorizontalAlign.CENTER;
		rewarddesc.lineSpacing = 5;
		midGroup.addChild(rewarddesc);
		view._tiptxt = rewarddesc;

		view._tipbg.visible = view._tiptxt.visible = view.vo.isInActivity();

		tipbg.height = rewarddesc.textHeight + 20;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, cdbg, [0,-tipbg.height-30]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewarddesc, tipbg, [0,20]);

		TickManager.addTick(view.tick,view);
		view.tick();
	}
	
	private getRedPtCallBack(evt : egret.Event):void{
		let view = this;
		if(evt.data.data.data.redPtKey){
			//展示
			ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAYGETREDPTPOPUPVIEW,{
				id : evt.data.data.data.redPtKey,
				aid : this.param.data.aid, 
				code : this.param.data.code
            });
		}
		view._getRedPt = false;
		view._redGroup.visible = true;
	}

	private _getRedPt : boolean = false;
	//红包雨
	private showRedReward():void{
		let view = this;
		if(!view._getRedPt){
			view._getRedPt = true;
			if(view.vo.getIsCollectMax()){
				App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDayGetTip1", [App.DateUtil.getFormatBySecond(view.vo.getCountDownCD())]));
				view._getRedPt = false;
			}
			else{
				NetManager.request(NetRequestConst.REQUEST_SINGLEDAY_GETREDPT,{activeId : view.acTivityId});
			}
		}
	}

	public hide():void{
		let view = this;
		if(!view._getRedPt){
			super.hide();
		}
	}

	private _cd = 4;
	protected tick():void{
		let view = this;
		if(view.vo.getIsCollectMax()){
			view._midGroup.visible = true;
		}
		else{
			view._midGroup.visible = view.vo.getCurPeriod() > 1;
		}
		view._redGroup.visible = !view._midGroup.visible;
		view._tipbg.visible = view._tiptxt.visible = view.vo.isInActivity();
		if(view.vo.isInActivity()){
			if(GameData.serverTime >= (view.vo.et - 86400 + view.cfg.startTime + view.cfg.luckyPacketCD) && (view.vo.getIsCollectMax() || (GameData.serverTime >= (view.vo.et - 86400 + view.cfg.startTime + view.cfg.luckyPacketCD + view.cfg.luckyPacketPurchase)))){
				view._midGroup.visible = true;
				view._redGroup.visible = false;
				view._cdtxt.visible = true;
				view._cdtxt.text = LanguageManager.getlocal('acSingleDayRedPtEnd');
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdtxt, view._cdBg);
			}
			else{
				let cd = view.vo.getCountDownCD();
				view._cdtxt.visible = cd > 3;
				view._cdImg.visible = !view._cdtxt.visible;
				if(cd > 3){
					view._cdtxt.text = LanguageManager.getlocal('activitycddesc',[App.DateUtil.getFormatBySecond(cd)]);
				}
				else{
					if(cd == 0){
						view._midGroup.visible = false;
						view._redGroup.visible = true;
					}
					else{
						view._cdImg.setRes(`acsingleday_cd_num${cd}`);
					}
				}
			}
		}
		else{
			view._midGroup.visible = true;
			view._redGroup.visible = false;
			view._cdtxt.visible = true;
			view._cdtxt.text = LanguageManager.getlocal('acSingleDayRedPtEnd');
			if(view._cdtxt && view._cdBg){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdtxt, view._cdBg);
			}
		}
		// let cd = view.vo.getCountDownCD()
		// view._cdtxt.visible = cd > 3;
		// view._cdImg.visible = !view._cdtxt.visible;
		// if(cd > 3){
		// 	view._cdtxt.text = LanguageManager.getlocal('activitycddesc',[App.DateUtil.getFormatBySecond(cd)]);
		// }
		// else{
		// 	if(cd == 0){
		// 		view._midGroup.visible = false;
		// 		view._redGroup.visible = true;
		// 		//view.showRedReward();
		// 	}
		// 	else{
		// 		view._cdImg.setRes(`acsingleday_cd_num${cd}`);
		// 	}
		// }
	}

	public dispose():void{
		let view = this;
		TickManager.removeTick(view.tick,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SINGLEDAY_GETREDPT), view.getRedPtCallBack, view);
		view._cdtxt = null;
		view._cdImg = null;
		view._midGroup = null;
		view._redGroup = null;
		view._getRedPt = false;
	}
}