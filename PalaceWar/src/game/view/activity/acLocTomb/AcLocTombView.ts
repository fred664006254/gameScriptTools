/**
 * author:qianjun
 * desc:东海皇陵进入界面
*/
class AcLocTombView extends AcCommonView
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

	private get cfg() : Config.AcCfg.LocTombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLocTombVo{
        return <AcLocTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

	protected getResourceList():string[]
	{
        let code = this.code;
		return super.getResourceList().concat([
			`tombcode${code}`,`acluckycarpviewcommonwordbg`,
			'tombboat_ske','tombboat_tex_json','tombboat_tex_png',
			'whirlpool_ske','whirlpool_tex_json','whirlpool_tex_png',`tombbg6-${code}`
			//"aobaibg1","aobaibg2","aobaibg3","aobaibg4"
		]);
	}

	protected initBg():void
	{
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
			whirlpool = BaseBitmap.create(`tombbg6-${view.code}`);
			whirlpool.x = 0;
			whirlpool.y = -40;
			view._movieGroup.addChild(whirlpool);
		}
	}

	protected getTitleStr():string{
		return `loctombtitle-${this.code}`;
	}
	/**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}
	{
		return {title:{key:`acPunishReportView-1`},msg:{key:`loctombreport-${this.code}`}};
	}

	public initView():void
	{	
		let view = this;

		let code = view.code;
		view._period = view.vo.getCurPeriod();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH,view.freshView,view);
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
        let detailBg = BaseBitmap.create(`tombdetailbg-${code}`);
        view.addChild(detailBg);
        //活动日期
        let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossDate', [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(dateTxt);
		//活动时间
		let opentime = view.cfg.getActTime();
		let timeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombtime1-${code}`, [opentime[0].toString(), opentime[1].toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(timeTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, detailBg, view, [0,100]);

        bottomBg.height = GameConfig.stageHeigth - detailBg.y;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, detailBg, [25,90]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, dateTxt, [0,dateTxt.textHeight + 8]);


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
		let str = view.vo.getActDayTimeCount();
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
		ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBSHOPVIEW,{
			aid : view.aid,
			code : view.code
		});
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOCTOMBINFO,requestData:{
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
		ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBREWARDVIEW,{
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
		return `loctombrule-${this.code}`;
	}

	protected getRuleInfoParam():string[]
	{
		let time = App.DateUtil.formatSvrHourByLocalTimeZone(24).hour; 
		return [this.cfg.initialExplore.toString(), time.toString(), this.cfg.needKillNum.toString()];
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
				ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBSEAVIEW,{
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
			App.CommonUtil.showTip(LanguageManager.getlocal(`loctombtimetip3-${view.code}`));
		}
	}

	public dispose():void
	{
		let view = this;
		view._isMove = false;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH,view.freshView,view);
		view._enterBtn = null;
		view._shopBtn = null;
		view._period = 1;
		view._movieGroup = null;
		super.dispose();
	}
}