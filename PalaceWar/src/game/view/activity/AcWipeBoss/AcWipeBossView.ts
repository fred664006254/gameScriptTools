/**
 * author:qianjun
 * desc:围剿鳌拜活动首页
*/
class AcWipeBossView extends AcCommonView
{
	private _enterBtn : BaseButton = null;
	private _endGroup : BaseDisplayObjectContainer = null;
	private _shopBtn : BaseButton = null;

	public constructor() 
	{
		super();
	}

	private get api() : WipeBossVoApi{
        return Api.wipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"aobaibg1","aobaibg2","aobaibg3","aobaibg4"
		]);
	}

	protected initTitle() : void{
		return null;
	}

	protected getBgName():string
	{
		return `aobaibg1`;
	}

	protected getCloseBtnName():string
	{
		return ButtonConst.POPUP_CLOSE_BTN_1;
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = GameConfig.stageHeigth - 1136;
		}
	}

	protected getTitleStr():string
	{
		return null;
	}

	private getBossNum(event : egret.Event):void{
		let view = this;
		view.api.setBossNumInfo(event.data.data.data);
	}

	public initView():void
	{	
		let view = this;
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM),view.getBossNum,view);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
			activeId : this.vo.aidAndCode,
		});	
		//NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER, {});
		let title = BaseBitmap.create('aobaititle');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0,25]);
		view.addChild(title);

		let descbg = BaseBitmap.create('public_9_downbg');
		descbg.width = 604;
		descbg.height = 106;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, title, [0,title.height]);
		view.addChild(descbg);

		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossDesc'), 22);
		descTxt.width = descbg.width - 20;
		descTxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
		view.addChild(descTxt);

		let endGroup = new BaseDisplayObjectContainer();
		endGroup.width = 189;
		endGroup.height = 35;
		endGroup.visible = false;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, endGroup, view, [0,150]);
		view.addChild(endGroup);
		view._endGroup = endGroup;

		let endBg = BaseBitmap.create('aobaibottom');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, endBg, endGroup, [0,0], true);
		endGroup.addChild(endBg);

		let endTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossEnd'), 20, TextFieldConst.COLOR_WARN_RED3);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, endTxt, endBg);
		endGroup.addChild(endTxt);

		let enterbtn = ComponentManager.getButton('aobaikswjian','',view.enterInHandler, view, null, 3);
		enterbtn.anchorOffsetX = enterbtn.width / 2;
		enterbtn.anchorOffsetY = enterbtn.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enterbtn, view);
		egret.Tween.get(enterbtn, {loop : true}).to({scaleX : 0.8, scaleY : 0.8},800).to({scaleX : 1, scaleY : 1},800);
		view.addChild(enterbtn);
		view._enterBtn = enterbtn;

		//中部
		view.freshView();
		//底部
		let vo = view.vo;
		let bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 180;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
		view.addChild(bottomBg);

		//说明文本
		let xqingTxt = ComponentManager.getTextField(LanguageManager.getlocal('acmidAutumnAcInfoTitle'), 25, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, xqingTxt, bottomBg, [30,15]);
		view.addChild(xqingTxt);
		
		let dateTxt= ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossDate', [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_WARN_GREEN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, xqingTxt, [0,xqingTxt.textHeight + 10]);
		view.addChild(dateTxt);
		var time1 = view.cfg.actTime[0];
		var time2 = view.cfg.actTime[1];

		let zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(time1).hour;
		let zoneStr2 = App.DateUtil.formatSvrHourByLocalTimeZone(time2).hour;

		let timeTxt= ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossTime', [zoneStr+"",zoneStr2+""]), 20, TextFieldConst.COLOR_WARN_GREEN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, dateTxt, [0,dateTxt.textHeight + 10]);
		view.addChild(timeTxt);

		//按钮
		let shopBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acwipeBossShop', view.shopClick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, shopBtn, bottomBg, [50,10]);
		view.addChild(shopBtn);
		view._shopBtn = shopBtn;

		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acwipeBossRank', view.rankClick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, rankBtn, bottomBg, [50,10]);
		view.addChild(rankBtn);

		if(!PlatformManager.hasSpcialCloseBtn()){
			// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [-15,-15]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [15,15]);
		}
		else{
			// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view.closeBtn, view, [-15,-15]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view.closeBtn, view, [0,0]);
		}

		if(view.vo.getpublicRedhot2()){
			App.CommonUtil.addIconToBDOC(view._shopBtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._shopBtn);
		}
		view.setChildIndex(view._ruleBtn, 9999);
	}

	private shopClick():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSSHOPVIEW,{
			aid : view.aid,
			code : view.code
		});
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.api.setRankInfo(data.data.data);
	}

	private rankClick():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSREWARDVIEW,{
			aid : view.aid,
			code : view.code
		});
	}

	private freshView():void{
		let view = this;
		if(!view.vo.isInTansuoTime()){
			view._enterBtn.visible = false;
			view._endGroup.visible = true;
		}
	}

	protected getRuleInfo():string{
		return 'acwipeBossRuleInfo';
	}

	protected getRuleInfoParam():string[]
	{	  
        var zoneStr:number = 0;
		zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour; 
		return [zoneStr+"",zoneStr+"",zoneStr+""];  
	}

	protected getSoundBgName():string
	{
		return SoundConst.MUSIC_ALLIANCEBOSSBATTLE;
	}

	public tick():void
	{	
		let view = this;
		if(!view.vo.isInTansuoTime()){
			view._enterBtn.visible = false;
			view._endGroup.visible = true;
		}
		if(view.vo.getpublicRedhot2()){
			App.CommonUtil.addIconToBDOC(view._shopBtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._shopBtn);
		}
		//view.freshView();
	}

	private enterInHandler() : void{
		let view = this;
		if(Api.playerVoApi.getPlayerLevel() >= view.cfg.needLv){
			if(view.vo.isInTansuoTime()){
				ViewController.getInstance().openView(ViewConst.COMMON.ACWIPEBOSSENTERVIEW,{
					aid : this.aid,
					code : this.code
				});
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime0`));
			}
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal(`acwipeBossOpenTip`, [Api.playerVoApi.getPlayerOfficeByLevel(view.cfg.needLv)]));
		}
	}

	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM),view.getBossNum,view);
		view._endGroup.dispose();
		view._endGroup = null;
		egret.Tween.removeTweens(view._enterBtn);
		view._enterBtn.removeTouchTap();
		view._enterBtn = null;
		view._shopBtn = null;
		super.dispose();
	}
}