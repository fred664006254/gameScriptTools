/*
author : qianjun
date : 2018.4.14
desc : 建造斗场
*/
class AcArenaView extends AcCommonView{
    private _timeCountTxt : BaseTextField = null;
    private _timebg : BaseBitmap = null;
    private _progressBar : ProgressBar = null;
    private _numbg : BaseBitmap = null;
    private _zziTxt : BaseTextField = null;
    private _curMeterTxt : BaseTextField = null;
    private _dbnumricecurbg : BaseBitmap = null;
    private _curRiceTxt : BaseTextField = null;
    private _dbnumricenextbg : BaseBitmap = null;
    private _nextRiceTxt : BaseTextField = null;
    private _collectflag : BaseBitmap = null;
    private _curJindu : number = 0;
    private _awardbg : BaseBitmap = null;
    private _scrollList : ScrollList = null;
    private _lqBtn : BaseButton = null;
    private _prevBtn : BaseButton = null;
    private _prevAwardRiceTxt : BaseTextField = null;
    private _nextBtn : BaseButton = null;
    private _nextAwardRiceTxt : BaseTextField = null;
    private _curAwardRiceTxt : BaseTextField = null;
	private _bottomBg : BaseBitmap = null;
	private _midBuild : BaseBitmap = null;
	private _movieGroup : BaseDisplayObjectContainer = null;
	private _prevBuildStatus : number = 0;

    public constructor(){
        super();
    }

    private get cfg() : Config.AcCfg.ArenaCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcArenaVo{
        return <AcArenaVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    protected getUiCode():string{
        let code = this.code;
        return code;
    }

    protected getRuleInfo():string{
        let code = this.getUiCode();
		return `acArenaRuleInfo-${code}`;
	} 
	
	protected getRuleInfoParam():string[]{
		let view = this;
		return [view.cfg.ratio1.toString(), view.cfg.rankNeed.toString()];
    } 

    protected initBg():void{
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
    
        let bgName : string = this.getBgName();
		if(bgName){
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose()){
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
    }

    // 背景图名称
	protected getBgName():string{
        let code = this.getUiCode();
		return `arenabg-${code}`;
    }
    
    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `arenaview${code}`, `arenabg-${code}`, `arenatopbg-${code}`, `dragonboatprogress_bg`, `dragonboatprogress`, `dragonboatnumbg`,
			`acwealthcarpview_servantskintxt`,`acwealthcarpview_skineffect1`,`acwealthcarpview_skineffect`,`alliancetask_frame3`, `arenabuildstatus2-${code}`,`arenabuildstatus3-${code}`,`arenabuildstatus4-${code}`,`arenabuildstatus5-${code}`,
			`dblamp`,`lihuahong`,`lihuahuang`,`lihualan`,`collectflag`
        ]);
    }

    //建筑位置
    private _pos = {
        1 : {x : 0, y : 456, nameX : 25, nameY : 128, sceneName : ViewConst.POPUP.ACARENAPOPUPVIEW},
        2 : {x : 75, y : 705, nameX : 75, nameY : 50, sceneName : ViewConst.POPUP.ACARENAPOPUPVIEW3},
        3 : {x : 435, y : 673, nameX : -60, nameY : 35, sceneName : ViewConst.POPUP.ACARENAPOPUPVIEW4},
        4 : {x : 429, y : 477, nameX : 50, nameY : 120, sceneName : ViewConst.POPUP.ACARENAPOPUPVIEW2},
    };
    
    public initView(){
		let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARENAJINDU), view.lqJinduAward, view)
		
		//top背景图
        let topbg = BaseBitmap.create(`arenatopbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0,view.titleBg.height]);
        view.addChild(topbg);

        let timeTxt = ComponentManager.getTextField(`${view.vo.getAcLocalTime(true)}`, 20, TextFieldConst.COLOR_BLACK);
        // 423 205
        timeTxt.width = 390;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [225,23]);
        view.addChild(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acArenaTip1-${code}`), 18, TextFieldConst.COLOR_BROWN);
        tipTxt.width = 390;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0,timeTxt.textHeight + 5]);
        view.addChild(tipTxt);

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.y = (topbg.y+topbg.height - 14);
        view._timebg = timebg;
 
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChild(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y+6; 

        timebg.width = tip2Text.width+50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = timebg.x+(timebg.width-tip2Text.width)*0.5;
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		// this._effect.setScale(2);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(topbg.x + 103 - skinTxtEffectBM.width / 2, topbg.y + 130 - skinTxtEffectBM.height / 2);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChild(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(topbg.x + 103, topbg.y + 130);
		this.addChild(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(topbg.x + 103, topbg.y + 130);
		this.addChild(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        
        //透明点击区域
		let touchPos = BaseBitmap.create("public_alphabg");
		touchPos.width = 180;
		touchPos.height = 176;
		touchPos.setPosition(topbg.x, topbg.y);
		view.addChild(touchPos);
		touchPos.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSKINVIEW, {
                skinId : view.cfg.getSkin(view.code),
                need : 10000
            });
        }, ViewController);
        
        let bottomBg = BaseBitmap.create(`arenabottombg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        view._bottomBg = bottomBg;
        //石材数目
        let numbg = BaseBitmap.create(`public_numbg`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, numbg, topbg, [25, topbg.height + 20]);
		view.addChild(numbg);
		view._numbg = numbg;
		
		let zziTxt = ComponentManager.getTextField('',18, TextFieldConst.COLOR_QUALITY_WHITE);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, zziTxt, numbg,[10,0]); 
		view.addChild(zziTxt);
		view._zziTxt = zziTxt;
		
		let zziImg = BaseLoadBitmap.create(`arenaIcon-${code}`); 
		zziImg.width = zziImg.height = 100;
		zziImg.setScale(0.5); 
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, zziImg, numbg, [0-0.5*zziImg.width/2+10,0]);
        view.addChild(zziImg);
        
        //进度条
        let progress = ComponentManager.getProgressBar("dragonboatprogress","dragonboatprogress_bg",610);
        progress.width = 610;
		progress.setPercentage(0);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, bottomBg, [0,15]);
		progress.setDragIcon(`arenaIcon2-${code}`);
		view.addChild(progress);
        view._progressBar = progress;
        
        let curMeterTxt = ComponentManager.getTextField('',18, 0xfcf3b4);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, curMeterTxt, progress);
		view.addChild(curMeterTxt);
        view._curMeterTxt = curMeterTxt;
        
        let dbnumriceprevbg = BaseBitmap.create('dragonboatnumbg');
		dbnumriceprevbg.height = 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dbnumriceprevbg, progress, [0,progress.height+5]);
		view.addChild(dbnumriceprevbg);
		view._dbnumricecurbg = dbnumriceprevbg;

		let prevriceTxt = ComponentManager.getTextField(``, 18, 0xfcf3b4);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, prevriceTxt, dbnumriceprevbg, [0,2]);
		view.addChild(prevriceTxt);
		view._curRiceTxt = prevriceTxt;
		
		let dbnumricenextbg = BaseBitmap.create('dragonboatnumbg');
		dbnumricenextbg.height = 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, dbnumricenextbg, progress, [0,progress.height+5]);
		view.addChild(dbnumricenextbg);
        view._dbnumricenextbg = dbnumricenextbg;
        
        let nextriceTxt = ComponentManager.getTextField(``, 18, 0xfcf3b4);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nextriceTxt, dbnumricenextbg,[0,2]);
		view.addChild(nextriceTxt);
        view._nextRiceTxt = nextriceTxt;

        //奖励
        let awardbg = BaseBitmap.create('public_9_bg41');
		awardbg.width = 510;
		awardbg.height = 130;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, awardbg, view, [0,60]);
        view.addChild(awardbg);
        awardbg.alpha = 0;
		view._awardbg = awardbg; 
	
 		let tmpRect = new egret.Rectangle(0,0,500,115);
		let scrollList = ComponentManager.getScrollList(ItemScrollItem,null,tmpRect);
		scrollList.addTouchTap(view.clickItemHandler, view);
        view._scrollList = scrollList;
        scrollList.verticalScrollPolicy = 'off';     
		 
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, awardbg);
		view.addChild(scrollList); 

		let lqBtn = ComponentManager.getButton(`arenabtn-${code}`, 'DragonBoatDayLq', view.lqClick,view);
		lqBtn.setColor(TextFieldConst.COLOR_WHITE);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, bottomBg, [0,5]);
		view.addChild(lqBtn);
		view._lqBtn = lqBtn;

		let prevBtn = ComponentManager.getButton(`arenapagebtn-${code}`, '', view.prevClick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, prevBtn, bottomBg, [30,65]);

		view.addChild(prevBtn);
		view._prevBtn = prevBtn;

		let prevAwardRiceTxt = ComponentManager.getTextField(``, 18, 0xc2b88b);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, prevAwardRiceTxt, prevBtn, [0,0]);
		view.addChild(prevAwardRiceTxt);
		view._prevAwardRiceTxt = prevAwardRiceTxt;

		let nextBtn = ComponentManager.getButton(`arenapagebtn-${code}`, '', view.nextClick, view);
		nextBtn.anchorOffsetX = nextBtn.width / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, nextBtn, bottomBg, [30,65]);
		nextBtn.scaleX = -1;
		view.addChild(nextBtn);
		view._nextBtn = nextBtn;

		let nextWardriceTxt = ComponentManager.getTextField(``, 18, 0xc2b88b);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, nextWardriceTxt, nextBtn, [0,0]);
		view.addChild(nextWardriceTxt);
		view._nextAwardRiceTxt = nextWardriceTxt;
		 

		let curAwardRiceTxt = ComponentManager.getTextField(``, 26, 0xfcf3b4);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, curAwardRiceTxt, awardbg, [0, -27]);
		view.addChild(curAwardRiceTxt);
		view._curAwardRiceTxt = curAwardRiceTxt;
        
        let flag = BaseBitmap.create("collectflag");
		flag.setScale(0.6);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, lqBtn);
		view.addChild(flag);
		flag.visible = false;
        view._collectflag = flag;
        
		view._curJindu = view.vo.getCurJindu();

		let midBuild = BaseBitmap.create(``);
		view._midBuild = midBuild;
		view.addChild(midBuild);
		
		let group = new BaseDisplayObjectContainer();
		group.width = GameConfig.stageWidth;
		group.height = GameConfig.stageHeigth;
		view.addChild(group);
		view._movieGroup = group;

		//建筑区域
		for(let i = 1; i <= 4; ++ i){
			let buildMask = BaseBitmap.create(`arenabuild${i}-${code}`);
			buildMask.addTouch((e : egret.Event)=>{
				if(e.type==egret.TouchEvent.TOUCH_BEGIN){
					if(buildMask.alpha == 0){
						buildMask.alpha = 0.3;
					}
					else{
						buildMask.alpha = 0;
					}
				}
				else if(e.type==egret.TouchEvent.TOUCH_CANCEL){
					buildMask.alpha = 0;
				}
				if(e.type == egret.TouchEvent.TOUCH_END){
					buildMask.alpha = 0;
					if(GameData.serverTime < view.vo.et){
						//弹板
						ViewController.getInstance().openView(view._pos[i].sceneName, {
							code : view.code,
							aid : view.aid
						})
					}
					else{
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					}
				}
			},view,null,true);
			buildMask.setScale(4);
			buildMask.x = view._pos[i].x + view.viewBg.x;
			buildMask.y = view._pos[i].y + view.viewBg.y;
			view.addChild(buildMask);
			buildMask.alpha = 0;

			let buildName = ComponentManager.getButton(`arenabuild${i}name-${code}`, '', ()=>{
				//弹板
				if(GameData.serverTime < view.vo.et){
					//弹板
					ViewController.getInstance().openView(view._pos[i].sceneName, {
						code : view.code,
						aid : view.aid
					})
				}
				else{
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				}
			}, view);
			buildName.x = view._pos[i].nameX + buildMask.x;
			buildName.y = view._pos[i].nameY + buildMask.y;
			view.addChild(buildName);
			buildName.name = `buildName${i}`;
		}

		view.freshView();
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_ARENAINFO,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		// view.vo.setRankInfo(data.data.data);
	}

	private getBuildStatus() : number{
		let view = this;
		let status = 1;
		let arr = [0,2,4,6,8];//view.cfg.animation;
		let curJindu = view.vo.getCurJindu();
		for(let i in arr){
			if(curJindu >= arr[i]){
				status = Number(i) + 1;
			}
		}
		return status;
	}

	private _moviecfg = {
		1 : [{x : 265, y : 469, scaleX : 1}, {x : 324, y : 639, scaleX : -1}, {x : 355, y : 662, scaleX : -1}],
		2 : [{x : 295, y : 666, scaleX : -1}, {x : 386, y : 631, scaleX : -1}, {x : 347, y : 584, scaleX : 1}],
		3 : [{x : 267, y : 591, scaleX : -1}, {x : 279, y : 674, scaleX : 1}, {x : 346, y : 672, scaleX : -1}, {x : 393, y : 617, scaleX : -1}],
		4 : [{x : 234, y : 643, scaleX : 1}, {x : 265, y : 698, scaleX : -1}, {x : 337, y : 584, scaleX : 1}, {x : 396, y : 678, scaleX : -1}, {x : 450, y : 597, scaleX : -1}],
		5 : [{x : 168, y : 620, scaleX : 1}, {x : 272, y : 713, scaleX : -1}, {x : 295, y : 580, scaleX : -1}, {x : 393, y : 685, scaleX : -1}, {x : 431, y : 605, scaleX : -1}, {x : 444, y : 656, scaleX : -1}],
		6 : [],
	};

	private freshBuildStatus() : void{
		let view = this;
		let code = view.getUiCode();
		let midBuild = view._midBuild;
		let buildStatus = view.getBuildStatus();
		if(view._prevBuildStatus != buildStatus){
			midBuild.setRes(buildStatus == 1 ? `` : `arenabuildstatus${buildStatus}-${code}`);
			midBuild.x = view.viewBg.x + view._midPos[buildStatus].x;
			midBuild.y = view.viewBg.y + view._midPos[buildStatus].y;

			let aniNode = view._movieGroup;
			let curcfg = view._moviecfg[buildStatus];
			aniNode.removeChildren();
			if(buildStatus == 5){
				view.showLihua();
			}
			else{
				for (let key in curcfg) {
					let upgradeClip = ComponentManager.getCustomMovieClip("alliancetask_frame3", 6, 300);
					upgradeClip.setScale(0.3);
					upgradeClip.scaleX *= curcfg[key].scaleX;
					upgradeClip.x = curcfg[key].x + view.viewBg.x;
					upgradeClip.y = curcfg[key].y + view.viewBg.y;
					egret.Tween.get(upgradeClip,{loop:false}).wait(260 * (Number(key) + 1)).call(()=>{
						upgradeClip.playWithTime(0);
					},this);
					aniNode.addChild(upgradeClip);
				}
			}
		}
		view._prevBuildStatus = buildStatus;
	}
	
	private _midPos = {
		1 : {x : 0, y : 0},
		2 : {x : 215, y : 574},
		3 : {x : 185, y : 548},
		4 : {x : 104, y : 492},
		5 : {x : 63, y : 438 },
	};

    private prevClick():void{
		let view = this;
		view._curJindu = Math.max(0 , view._curJindu - 1);
		view.fresh_jindu(view._curJindu);
    }

    private nextClick():void{
		let view = this;
		if(view._curJindu == 0){
			view._curJindu = 1;
		}
		view._curJindu = Math.min(view.vo.getArr('teamReward').length , view._curJindu + 1);
		view.fresh_jindu(view._curJindu);
	}
    
    private fresh_jindu(jindu):void{
        let view = this;
        let code = view.getUiCode();
		view._zziTxt.text = view.vo.getZongzi().toString();
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._zziTxt, view._numbg);

		let totalMeter = view.vo.getTotalRiceNum();
		let str = totalMeter >= view.vo.getEndMeter() ? LanguageManager.getlocal(`acArenaEnd_`+this.getUiCode()) : (LanguageManager.getlocal(`acArenaTotalNum_`+this.getUiCode(), [view.vo.getTotalRiceNum().toString()]));
		view._curMeterTxt.text = str;//
		if(totalMeter >= view.vo.getEndMeter()){
			//
			//停止动画
			//view._boatclip.timeRate = 30;
			// if(AcDraftVoteView.CODE=="1"){
			// 	egret.Tween.removeTweens(view._dbboatbg);
			// 	egret.Tween.removeTweens(view._dbboatbg2);
			// 	view._boatclip.stop();
			// 	view._boatclip.playWithTime(1);
			// } 
			//`lihuahong`,`lihuahuang`,`lihualan`
		}

		let cur_jindu = jindu;
		//当前进度米数
		let curData = view.vo.getteamRewardDataById(cur_jindu);
		let curRice = '';
		if(curData){
			curRice = curData.needMeter.toString();
		}
		else{
			curRice = '0';
		}
		view._curRiceTxt.text = curRice;//LanguageManager.getlocal(`acArenaRwardNum_${code}`, [curRice]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curRiceTxt, view._dbnumricecurbg, [0,2]);
		
		//下一个进度米数
		let nextData = view.vo.getteamRewardDataById(cur_jindu + 1);
		let nextRice = '';
		if(nextData){
			nextRice = nextData.needMeter.toString();
		}
		else{
			let prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
			view._curRiceTxt.text = prevData.needMeter.toString();
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curRiceTxt, view._dbnumricecurbg, [0,2]);
			nextRice = curData.needMeter.toString();
		}
		view._nextRiceTxt.text = nextRice;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._nextRiceTxt, view._dbnumricenextbg,[0,2]);
		
		view.fresh_rewward(view._curJindu);
		//进度条
		let percent = 0;
		let totalRice = view.vo.getTotalRiceNum();
		let curMeter = 0;
		if(cur_jindu == 0){
			curMeter = nextData.needMeter;
			nextData = view.vo.getteamRewardDataById(2);
			nextRice = nextData.needMeter.toString();
		}
		else{
			curMeter = curData.needMeter;
		}

		if(cur_jindu == 0){
			percent = totalRice / curMeter;
		}
		else if(nextData){
			percent = (totalRice - curMeter) / (nextData.needMeter - curMeter);
		}
		else{
			if(totalRice >= view.vo.getEndMeter()){
				percent = 1;
			}
			else{
				let prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
				percent = (totalRice - curMeter) / (curMeter - prevData.needMeter);
			}
			
		}
		view._progressBar.setPercentage(percent);
		if(view._curJindu == view.vo.getCurJindu() && totalRice >= (nextData ? nextData.needMeter : curMeter)){
			view._progressBar.resetIconPosition(575);
		} 
		view._progressBar.setIconVisible(view._curJindu == view.vo.getCurJindu());
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._curMeterTxt, view, [0, view._progressBar.y + view._progressBar.height + 15 - view.y]);
    }
    
    private fresh_rewward(cur_jindu){
        let view = this;
        let code = view.getUiCode();
		if(cur_jindu == 0){
			cur_jindu = 1;
		}
		//进度奖励
		let prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
		let prevRice = '';
		if(prevData){
			view._prevAwardRiceTxt.visible = view._prevBtn.visible = true;
			prevRice = prevData.needMeter.toString();
		}
		else{
			prevRice = '';
			view._prevAwardRiceTxt.visible = view._prevBtn.visible = false;
		}
		view._prevAwardRiceTxt.text = LanguageManager.getlocal(`acArenaRwardNum_${code}`, [prevRice]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._prevAwardRiceTxt, view._prevBtn, [view._prevBtn.width,0]);
		
		let curData = view.vo.getteamRewardDataById(cur_jindu);
		let nextData = view.vo.getteamRewardDataById(cur_jindu + 1);
		let curMeter = curData.needMeter;
		let nextMeter = 0;//n
		
		view._curAwardRiceTxt.text = LanguageManager.getlocal(`acArenaRwardNum_${code}`, [curMeter]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._curAwardRiceTxt, view._bottomBg, [0,82]);
	 
		if(nextData){
			view._nextAwardRiceTxt.visible = view._nextBtn.visible = true;
			nextMeter = nextData.needMeter;
		}
		else{
			view._nextAwardRiceTxt.visible = view._nextBtn.visible = false;
		}
		view._nextAwardRiceTxt.text = LanguageManager.getlocal(`acArenaRwardNum_${code}`, [nextMeter.toString()]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, view._nextAwardRiceTxt, view._nextBtn, [view._nextBtn.width - 25, 0]);
        view._nextAwardRiceTxt.x = view._nextBtn.x - view._nextAwardRiceTxt.textWidth - 25;
        
		view._scrollList.refreshData(view.vo.gerCurRiceAward(view._curJindu), code);
		view._scrollList.width = (view.vo.gerCurRiceAward(view._curJindu)).length > 3 ? 480 : 360;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._scrollList, view._awardbg);

		let curTotalMeter = view.vo.getTotalRiceNum();
		if(curTotalMeter >= curMeter){
			view._collectflag.visible = view.vo.isGetJinduAward(view._curJindu);
			view._lqBtn.setEnable(true);
			
		}
		else{
			view._collectflag.visible = false;
			view._lqBtn.setEnable(false);
		}
		view._lqBtn.visible = !view._collectflag.visible;
		//小红点
		if(prevData && view.vo.isCanLqAwardJindu(view._curJindu - 1)){
            App.CommonUtil.addIconToBDOC(view._prevBtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._prevBtn);
        }
        
		if(nextData &&  view.vo.isCanLqAwardJindu(view._curJindu + 1,true)){
			App.CommonUtil.addIconToBDOC(view._nextBtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._nextBtn);
		}
	}

    private lqClick():void{
		let view = this;
		if(GameData.serverTime < view.vo.et){
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETARENAJINDU, {
				activeId : view.acTivityId,
				rechargeId : view._curJindu
			});
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
		}
    }
    
    private lqJinduAward(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            return;
        }
        view.fresh_rewward(view._curJindu);
        let rewards = rData.rewards;
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = new egret.Point(view.width/2, GameConfig.stageHeigth - 200);
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
	}

    public tick():void{
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x+(view._timebg.width-view._timeCountTxt.width)*0.5;
    }

    private clickItemHandler(event: egret.TouchEvent): void {
		let view = this;
		let index: number = Number(event.data);
		let arr = view.vo.gerCurRiceAward(view._curJindu);
		let item : ItemInfoVo = arr[index]; 
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item.id);
	}


    private freshView(): void{ 
         //第一页 红点
        let vo = this.vo;
        if(!vo){
            return;
        }	
        let view = this;
        let buildName1 = <BaseButton>view.getChildByName(`buildName1`); 
        if(vo.getpublicRedhot2()){
            App.CommonUtil.addIconToBDOC(buildName1);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(buildName1);
        }

        let buildName2 = <BaseButton>view.getChildByName(`buildName2`); 
        if(vo.getpublicRedhot3()){
            App.CommonUtil.addIconToBDOC(buildName2);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(buildName2);
		}
		let jindu = view.vo.getCurJindu();
		view.fresh_jindu(jindu);
		view.freshBuildStatus();
	} 
	
	/**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}{
        return {title:{key:`acArenareporttitle-${this.code}`},msg:{key:`acArenareportmsg-${this.code}`}};
	}
    
    private showLihua():void{
		let view = this;
		//dblamp1


		// let dblamp1 = ComponentManager.getCustomMovieClip("dblamp",2,800);
		// dblamp1.width = 57;
		// dblamp1.height = 181;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dblamp1, view._movieGroup, [15,315], true);
		// view._movieGroup.addChild(dblamp1);
		

		// let dblamp2 = ComponentManager.getCustomMovieClip("dblamp",2,800);
		// dblamp2.width = 57;
		// dblamp2.height = 181;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, dblamp2, view._movieGroup, [15,315], true);
		// view._movieGroup.addChild(dblamp2);

		// let dblamp3 = ComponentManager.getCustomMovieClip("dblamp",2,800);
		// dblamp3.width = 57;
		// dblamp3.height = 181;
		// dblamp3.setScale(0.7);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dblamp3, dblamp1, [15+dblamp1.width,0-40]);
		// view._movieGroup.addChild(dblamp3);

		// let dblamp4 = ComponentManager.getCustomMovieClip("dblamp",2,800);
		// dblamp4.width = 57;
		// dblamp4.height = 181;
		// dblamp4.setScale(0.7);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, dblamp4, dblamp2, [15+dblamp2.width,0-40]);
		// view._movieGroup.addChild(dblamp4);

		// dblamp1.playWithTime(-1);
		// dblamp2.playWithTime(-1);
		// dblamp3.playWithTime(-1);
		// dblamp4.playWithTime(-1);
		let deviationNum  = 0;
	
		let param = {
			1 : {color : 'hong', pos : [500,340+deviationNum], scale : 0.9, wait : 0},
			2 : {color : 'huang', pos : [80,310+deviationNum], scale : 1.85, wait : 200},
			3 : {color : 'huang', pos : [300,300+deviationNum], scale : 1.5, wait : 400},
			4 : {color : 'lan', pos : [200,250+deviationNum], scale : 2, wait : 650},
			5 : {color : 'hong', pos : [40,360+deviationNum], scale : 1, wait : 900}
		}
		let ths=this;	
		for(let i in param){
			if(view._movieGroup && !view._movieGroup.getChildByName(`lihua${i}`)){
				let unit = param[i];
				let lihuaclip = ComponentManager.getCustomMovieClip(`lihua${unit.color}`, 10, 115);
				lihuaclip.setScale(unit.scale);
				lihuaclip.name = `lihua${i}`;

				lihuaclip.x = unit.pos[0];
				lihuaclip.y = unit.pos[1];
  
 
				view._movieGroup.addChild(lihuaclip);
				egret.Tween.get(lihuaclip).wait(unit.wait).call(()=>{
 
					egret.Tween.removeTweens(lihuaclip);
					if(view._movieGroup){
						view._movieGroup.addChild(lihuaclip);
						lihuaclip.playWithTime(-1);
					}
				},view);
			}
		}
	}
    
    public dispose():void{   
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
		App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARENAJINDU), view.lqJinduAward, view)
		view._timeCountTxt = null;
        view._timebg = null;
        view._progressBar = null;
        view._numbg = null;
        view._zziTxt = null;
        view._curMeterTxt = null;
        view._dbnumricecurbg = null;
        view._curRiceTxt = null;
        view._dbnumricenextbg = null;
        view._nextRiceTxt = null;
        view._collectflag = null;
        view._curJindu = 0;
        view._awardbg = null;
        view._scrollList = null;
        view._lqBtn = null;
        view._prevBtn = null;
        view._prevAwardRiceTxt = null;
        view._nextBtn = null;
        view._nextAwardRiceTxt = null;
		view._bottomBg = null;
		view._midBuild = null;
		view._movieGroup.dispose();
		view._movieGroup = null;
		view._prevBuildStatus = 0;
        super.dispose();
    }
}