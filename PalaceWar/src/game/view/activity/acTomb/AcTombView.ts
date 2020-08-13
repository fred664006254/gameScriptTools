/**
 * author:qianjun
 * desc:东海皇陵进入界面
*/
class AcTombView extends AcCommonView
{
    private _enterBtn : BaseButton = null;
	private _shopBtn : BaseButton = null;
	private _tipBg : BaseBitmap = null;
	private _tipTxt : BaseTextField = null;
	private _period : number = 1;
	private _movieGroup : BaseDisplayObjectContainer = null;
	private _isMove : boolean = false;

	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.TombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcTombVo{
        return <AcTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	protected getResourceList():string[]
	{
        let code = this.getUiCode();
		return super.getResourceList().concat([
			`tombcode${code}`,`acluckycarpviewcommonwordbg`,
			'tombboat_ske','tombboat_tex_json','tombboat_tex_png',
			'whirlpool_ske','whirlpool_tex_json','whirlpool_tex_png',`tombbg6-${code}`
			//"aobaibg1","aobaibg2","aobaibg3","aobaibg4"
		]);
	}

	protected initBg():void
	{
		let code = this.getUiCode();
		let view = this;
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;
		view._movieGroup = new BaseDisplayObjectContainer();
		view._movieGroup.width = view.width;
		view._movieGroup.height = view.height;
		view._movieGroup.anchorOffsetX = view._movieGroup.width / 2;
		view._movieGroup.anchorOffsetY = view._movieGroup.height / 2;
		view.addChildAt(view._movieGroup,2);
		view._movieGroup.x = view._movieGroup.anchorOffsetX;
		view._movieGroup.y = view._movieGroup.anchorOffsetY;
		let whirlpool = null;
		if(App.CommonUtil.check_dragon()){//
			whirlpool = App.DragonBonesUtil.getLoadDragonBones('whirlpool',0);
			whirlpool.x = 320;
			whirlpool.y = 520;
			whirlpool.playDragonMovie(`bg`,0);
			view._movieGroup.addChild(whirlpool);

			let tombboat = App.DragonBonesUtil.getLoadDragonBones('tombboat',0);
			tombboat.x = 320;
			tombboat.y = 520;
			view._movieGroup.addChild(tombboat);
			tombboat.playDragonMovie(`bowen`,0);
		}
		else{
			whirlpool = BaseBitmap.create(`tombbg6-${code}`);
			whirlpool.x = 0;
			whirlpool.y = -40;
			view._movieGroup.addChild(whirlpool);
		}
	}

	protected getTitleStr():string{
		let code = this.getUiCode();
		return `tombtitle-${code}`;
	}

	/**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}{
		let code = this.getUiCode();
		return {title:{key:`acPunishReportView-1`},msg:{key:`tombreport-${code}`}};
	}

	public initView():void
	{	
		let view = this;
		let code = view.getUiCode();
		view._period = view.vo.getCurPeriod();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_TOMB_REFRESH,view.freshView,view);
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM),view.getBossNum,view);
		// NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
		// 	activeId : this.vo.aidAndCode,
		// });	
		//NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER, {});
		//底部
		view._isMove = false;
		let vo = view.vo;
        let bottomBg = BaseBitmap.create(`tombdetailbg2-${code}`);
        view.addChild(bottomBg);
		//按钮
		let shopBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acwipeBossShop', view.shopClick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, shopBtn, view, [80,15]);
		view.addChild(shopBtn);
		view._shopBtn = shopBtn;

		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'emperorReward', view.rankClick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, rankBtn, view, [80,15]);
        view.addChild(rankBtn);
        
		if(view.vo.getpublicRedhot2()){
			App.CommonUtil.addIconToBDOC(view._shopBtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._shopBtn);
        }
		//底部详细信息
        let attendBg = BaseBitmap.create(`acluckycarpviewcommonwordbg`);
        view.addChild(attendBg);
        
        let isAttend = view.vo.getAttendQUality();
        let attendTxt = ComponentManager.getTextField(LanguageManager.getlocal(`tombattend${isAttend ? 1 : 2}-${code}`), 20, isAttend ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED3);
        view.addChild(attendTxt);

        attendBg.width = attendTxt.textWidth + 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, attendBg, view, [0,85]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, attendTxt, attendBg);

        let detailBg = BaseBitmap.create(`tombdetailbg-${code}`);
        view.addChild(detailBg);
        //活动日期
        let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossDate', [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(dateTxt);
		//活动时间
		let opentime = view.cfg.getActTime();
		let timeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`tombtime1-${code}`, [opentime[0].toString(), opentime[1].toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(timeTxt);
        //参加区服
        let attend = ComponentManager.getTextField(LanguageManager.getlocal(`tombattend3-${code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        let attendServerTxt = ComponentManager.getTextField(view.vo.getCrossServer(), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        attendServerTxt.lineSpacing = 5;
		attendServerTxt.width = 470;
		view.addChild(attend);
		view.addChild(attendServerTxt);
        if(attendServerTxt.textHeight >= 70){
            detailBg.height += (attendServerTxt.textHeight - 70);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, detailBg, attendBg, [0,attendBg.height + 10]);

        bottomBg.height = GameConfig.stageHeigth - detailBg.y;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, detailBg, [25,90]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, dateTxt, [0,dateTxt.textHeight + 8]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, attend, timeTxt, [0,timeTxt.textHeight + 8]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, attendServerTxt, attend, [attend.textWidth,0]);

        let detailTxt = ComponentManager.getTextField(LanguageManager.getlocal(`atkracecrossDetailTitle`), 20, TextFieldConst.COLOR_WARN_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailTxt, detailBg, [0,35]);
		view.addChild(detailTxt);
		//倒计时
		let timeCDbg = BaseBitmap.create(`public_itemtipbg2`);
		view._tipBg = timeCDbg;
		view.addChild(timeCDbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeCDbg, bottomBg, [0,-timeCDbg.height-7]);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(""),20,TextFieldConst.COLOR_WARN_GREEN);
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;
		view.addChild(tipTxt);
		view._tipTxt = tipTxt;

		view.freshText();
		//进入按钮
		let enterbtn = ComponentManager.getButton(`tombchallenge-${code}`,'',view.enterInHandler, view, null, 3);
		enterbtn.anchorOffsetX = enterbtn.width / 2;
		enterbtn.anchorOffsetY = enterbtn.height / 2;
		enterbtn.x = 310;
		enterbtn.y = 380;
		//0,(detailBg.y - view.titleBg.y - view.titleBg.height - enterbtn.height) / 2 + view.titleBg.height
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, enterbtn, view, [320,380]);
		egret.Tween.get(enterbtn, {loop : true}).to({scaleX : 0.8, scaleY : 0.8},800).to({scaleX : 1, scaleY : 1},800);
		view.addChild(enterbtn);
		view._enterBtn = enterbtn;
		//中部
		view.freshView();
	}

	private freshText():void{
		let view = this;
		let period = view.vo.getCurPeriod();
		let str = view.vo.getActDayTimeCount(view.getUiCode());
		view._tipTxt.text = str;
		view._tipBg.width = view._tipTxt.textWidth + 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._tipBg, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._tipTxt, view._tipBg);
	}

	private shopClick():void{
		let view = this;
		if(view.vo.isEnd){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ACTOMBSHOPVIEW,{
			aid : view.aid,
			code : view.code
		});
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_TOMBINFO,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.vo.setZidInfo(data.data.data.zidgroup);
	}

	private rankClick():void{
		let view = this;
		if(view.vo.isEnd){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ACTOMBREWARDVIEW,{
			aid : view.aid,
			code : view.code
		});
	}

	private freshView():void{
		let view = this;
		if(!view.vo.isInActTime() || !view.vo.isInFightTime()){
			view._enterBtn.visible = false;
		}
	}

	protected getRuleInfo():string{
		let code = this.getUiCode();
		return `tombrule-${code}`;
	}

	protected clickRuleBtnHandler(param:any):void
	{
		let msg = '';
		let extra = this.getExtraRuleInfo();
		if(extra && extra !== ''){
			msg = extra;
		}
		else{
			let keyParam = this.getRuleInfoParam();
			msg = LanguageManager.getlocal(this.getRuleInfo(),keyParam);
		}
		if(Api.switchVoApi.checkOpenTombEndLess()){
			msg += LanguageManager.getlocal(`tombrule_newrule-1`, [this.cfg.maxScore.toString()]);
		}
		ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW,msg);
	}

	protected getRuleInfoParam():string[]
	{
		let time = App.DateUtil.formatSvrHourByLocalTimeZone(24).hour; 
		return [String(this.cfg?this.cfg.initialExplore:1),time.toString(),this.cfg.needKillNum.toString(), this.cfg.maxScore.toString()];
	}

	protected getSoundBgName():string
	{
		return SoundConst.MUSIC_TOMBWHIRLPOOL;
	}

	public tick():void
	{	
		let view = this;
		if(!view.vo.isInActTime() || !view.vo.isInFightTime()){
			view._enterBtn.visible = false;
		}
		if(view.vo.isInFightTime() && view.vo.isInActTime() && !view._isMove){
			view._enterBtn.visible = true;
		}
		if(view.vo.getpublicRedhot2()){
			App.CommonUtil.addIconToBDOC(view._shopBtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._shopBtn);
		}
		view.freshText();
		let period = view.vo.getCurPeriod();
		if(period != view._period){
			view.freshView();
		}
		view._period = period;
		//view.freshView();
	}

	private enterInHandler() : void{
		let view = this;
		let code = this.getUiCode();
		let period = view.vo.getCurPeriod();
		if(period <= 1){
			App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime0`));
		}
		else if(period == 2){
			view._isMove = true;
			let tmpX = view._movieGroup.x;
			let tmpY = view._movieGroup.y;
			view._enterBtn.visible = false;
			egret.Tween.get(view._movieGroup).to({scaleX : 1.7, scaleY : 1.7}, 1000).call(()=>{
				ViewController.getInstance().openView(ViewConst.COMMON.ACTOMBSEAVIEW,{
					aid : this.aid,
					code : this.code
				});
			},view).wait(1000).call(()=>{
				egret.Tween.removeTweens(view._movieGroup);
				view._movieGroup.setScale(1);
				view._movieGroup.alpha = 1;
				view._movieGroup.x = tmpX;
				view._movieGroup.y = tmpY;
				view._enterBtn.visible = true;
				view._isMove = false;
			},view);
		}
		else if(period == 3){
			App.CommonUtil.showTip(LanguageManager.getlocal(`tombtimetip3-${code}`));
		}
	}

	public dispose():void
	{
		let view = this;
		view._isMove = false;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TOMB_REFRESH,view.freshView,view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM),view.getBossNum,view);
		view._enterBtn = null;
		view._shopBtn = null;
		view._period = 1;
		view._movieGroup = null;
		super.dispose();
	}
}