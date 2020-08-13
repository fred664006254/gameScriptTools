/*
author : qinajun
*/
class AcNewYearRedView extends AcCommonView{

	private _timeCountTxt : BaseTextField = null;
	private _timebg : BaseBitmap = null;
	private _redGroup : BaseDisplayObjectContainer = null;
	private _progressBar : ProgressBar = null;
	private _bubble : BaseBitmap = null;
	private _jinduTxt : BaseTextField = null;
	private _stop : boolean = false;
	private _proLight:BaseBitmap = null;

	public constructor(){
		super();
	}

	private get cfg() : Config.AcCfg.NewYearRedCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNewYearRedVo{
        return <AcNewYearRedVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}
	
	protected getBgName():string{
		return this.getResByCode(`newyearredbg`);
	}

	protected initBg():void{
		let bgtop = BaseBitmap.create(this.getResByCode(`newyearredbg2`));
		this.addChild(bgtop);

		let bgtop2 = BaseBitmap.create(this.getResByCode(`newyearredbg2`));
		this.addChild(bgtop2);
		super.initBg();
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bgtop, this.viewBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bgtop2, bgtop, [bgtop.width - 5,0]);
		egret.Tween.get(bgtop,{loop : true}).
			to({x : - bgtop.width},bgtop.width * 300). 
			to({x : bgtop.width - 10}, 1).
			to({x : 0},(bgtop.width - 10) * 300);

		egret.Tween.get(bgtop2,{loop : true}).
		to({x : - bgtop2.width}, (2 * bgtop.width - 10) * 300).
		to({x : bgtop2.width - 10}, 1);
	}
	
    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 3:
				code = "1";
				break;
            default:
                code = this.code;
                break;
        }
        return code;
	}

	protected getContainerY():number{
		return 88;
	}

	protected isHideTitleBgShadow():boolean{
		return true;
	}
	
	protected getResourceList():string[]{
		let code = this.getUiCode();
		let arr = [`newyearred-${code}`,`acwealthcarpview_skineffect1`,`acthrowstone_common_wife_txt`,`newyearredbg2-1`,`newyearredbg-1`,`progress10`,`progress10_bg`,`wife_doublefly_namebg`,`wifeview_namebg`,`acwealthcarpview_servantskintxt`,`newyearred-1`
		];
		return super.getResourceList().concat(arr);
	}

	protected getRuleInfo():string{
		return App.CommonUtil.getCnByCode(`AcNewYearRedRuleInfo`, this.code);
	}

	protected getTitleStr():string{
		return null;
	}

	protected getTitleBgName():string{
		return `newyearredtitle-${this.code}`
	}

	private get progressOffX():number{
		if (this.getUiCode() == "2"){
			return 160;
		}
		return 140;
	}

	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
	
		view.height = GameConfig.stageHeigth;
		view.width = GameConfig.stageWidth;
		view.container.height = view.height - this.getContainerY();
		let code = view.getUiCode();

		let zshi = BaseBitmap.create(this.getResByCode(`newyearredtop`));
		view.addChildToContainer(zshi);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, zshi, view.container, [0,0], true);

		let bottombg = BaseBitmap.create(this.getResByCode(`newyearreddescbg`));
		// view.addChildToContainer(bottombg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0,0], true);
		
		let zshi2 = BaseBitmap.create(this.getResByCode(`newyearredtop`));
	
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, zshi2, bottombg, [0, -zshi2.height]);

		let chargebtn = ComponentManager.getButton(view.getResByCode(`newyearredrecharge`), '', ()=>{
			if(!this.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
				return;
			}
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		}, view);
		// view.addChildToContainer(chargebtn);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, chargebtn, zshi2, [25, -chargebtn.height-10]);

		let timeTxt = ComponentManager.getTextField(`${view.vo.getAcLocalTime(true,String(0xffffff))}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, bottombg, [15,10]);
		// view.addChildToContainer(timeTxt);

		let tipTxtStr = LanguageManager.getlocal(this.getCnByCode(`AcNewYearRedTip1`),[view.cfg.getCoreRewardGemNum().toString()]);
		if (view.getUiCode() == "2"){
			zshi2.visible = false;
			App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, chargebtn, bottombg, [25, -chargebtn.height+40]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, bottombg, [15,153]);

			let specialData = view.vo.getSpecailShowData();
			tipTxtStr = LanguageManager.getlocal(this.getCnByCode(`AcNewYearRedTip1`),[""+specialData.needNum]);
		}

        let tipTxt = ComponentManager.getTextField(tipTxtStr, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 590;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0,timeTxt.textHeight + 5]);
        // view.addChildToContainer(tipTxt);

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
		timebg.y = (bottombg.y-14);
		if (view.getUiCode() == "2"){
			timebg.y = bottombg.y + 115;
		}
        view._timebg = timebg;
 
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y+6; 

        timebg.width = tip2Text.width+50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
		tip2Text.x = timebg.x+(timebg.width-tip2Text.width)*0.5;
		
		let wifeCfg = null;
		if (view.getUiCode() == "1" || view.getUiCode() == "3"){
			wifeCfg = Config.WifeCfg.getWifeCfgById(view.cfg.coreReward);
		}
		else if (view.getUiCode() == "2"){
			wifeCfg = Config.WifeskinCfg.getWifeCfgById(view.cfg.coreReward);
		}
		let doubleGragon = App.CommonUtil.getDoubleGragon(view.cfg.coreReward);
		let boneName = undefined;
		if (wifeCfg && wifeCfg.bone) {
			boneName = wifeCfg.bone + "_ske";
		}
		//
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && (doubleGragon || RES.hasRes(boneName)) && App.CommonUtil.check_dragon()){
			if(doubleGragon){
				doubleGragon.x = 320;
				doubleGragon.y = zshi2.y + 50;
				// doubleGragon.mask = new egret.Rectangle(-354, -800, 914, 820);
				doubleGragon.setScale(0.75);
				view.addChildToContainer(doubleGragon);
				// let nameBg1 = <BaseBitmap>doubleGragon.getChildByName(`nameBg1`)
				// nameBg1.setPosition(-270,-550);

				// let nameBg2 = <BaseBitmap>doubleGragon.getChildByName(`nameBg2`)
				// nameBg2.setPosition(250,-550);
	
				// let nameTF1 = doubleGragon.getChildByName(`nameTF1`)
				// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1);

	
				// let nameTF2 = doubleGragon.getChildByName(`nameTF2`)
				// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2);
			}
			else{
				let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
				droWifeIcon.anchorOffsetY = droWifeIcon.height;
				droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
				droWifeIcon.x = 302;
				droWifeIcon.y = zshi2.y - 500;
				if (view.getUiCode() == "2"){
					droWifeIcon.y = bottombg.y + 90;
				}
				droWifeIcon.mask = new egret.Rectangle(-354, -800, 914, 820);
				droWifeIcon.setScale(0.75);
				view.addChildToContainer(droWifeIcon);
			}
		}
		else {
			let wifeImg = BaseLoadBitmap.create(wifeCfg.body);//
			wifeImg.width = 640;
			wifeImg.height = 840;
			wifeImg.setScale(0.52);
			view.addChildToContainer(wifeImg);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, wifeImg, zshi2, [0,zshi2.height]);
			if (view.getUiCode() == "2"){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, wifeImg, bottombg, [0, 210]);
			}
		}

		if(doubleGragon){
			let ishorizon = false;
			if(PlatformManager.checkIsEnSp() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuSp()){
				ishorizon = true;
			}

			let nameres = ishorizon ? `wife_doublefly_namebg` : `public_infobg2`;

			let nameBg1:BaseBitmap = BaseBitmap.create(nameres);
			view.addChildToContainer(nameBg1);

			let nameBg2:BaseBitmap = BaseBitmap.create(nameres);
			view.addChildToContainer(nameBg2);

			let nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
			view.addChildToContainer(nameTF1);

			let nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
			view.addChildToContainer(nameTF2);

			if(ishorizon){//
				nameBg1.setScale(0.75);
				nameBg2.setScale(0.75);
				nameTF1.setScale(0.75);
				nameTF2.setScale(0.75);
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, nameBg1, zshi2, [180,zshi2.height-3]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, nameBg2, zshi2, [330,zshi2.height-3]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2);
			}
			else{
				nameBg1.setPosition(50,zshi2.y-300);
				nameBg2.setPosition(470,zshi2.y-400);

				nameTF1.width = 27;
				nameTF2.width = 27;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1, [5,-5]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2, [5,-5]);
			}
		}

		view.addChildToContainer(bottombg);
		view.addChildToContainer(zshi2);
		view.addChildToContainer(chargebtn);
		view.addChildToContainer(timeTxt);
		view.addChildToContainer(tipTxt);
		view.addChildToContainer(timebg);
		view.addChildToContainer(tip2Text);	

        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinTxtEffect, zshi2, [0,-120]);

		let skinTxtImg = "acthrowstone_common_wife_txt";
		if (view.getUiCode() == "2"){
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinTxtEffect, bottombg, [0,-90]);
			skinTxtImg = "acwealthcarpview_servantskintxt";
		}
		let skinTxt = BaseBitmap.create(skinTxtImg);
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect, [0,0]);

		let skinTxteffect = BaseBitmap.create(skinTxtImg);
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect, [0,0]);
		
		//透明点击区域
		let touchPos = BaseBitmap.create("public_alphabg");
		touchPos.width = 180;
		touchPos.height = 176;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, touchPos, skinTxtEffect, [0,0]);
		view.addChildToContainer(touchPos);
		touchPos.addTouchTap(() => {
			let data = null;
			if (view.getUiCode() == "1"){
				let cfg = Config.WifeCfg.getWifeCfgById(this.cfg.coreReward);
				let needstr = LanguageManager.getlocal("AcNewYearRedTip3-1",[this.cfg.getCoreRewardGemNum().toString(),cfg.name]);
				let wifId = Config.WifeCfg.formatRewardItemVoStr(this.cfg.coreReward);
				data = {data:[
						{idType: wifId, topMsg:needstr, bgName:"", scale: 0.8, title:``,offY:120},
					], showType:""};
			}
			else if (view.getUiCode() == "2"){
				let cfg = Config.WifeskinCfg.getWifeCfgById(this.cfg.coreReward);
				let specialData = view.vo.getSpecailShowData();
				let needstr = LanguageManager.getlocal("AcNewYearRedTip3-2",[specialData.needNum.toString(), cfg.name]);
				let wifId = Config.WifeskinCfg.formatRewardItemVoStr(this.cfg.coreReward);
				data = {data:[
						{idType: wifId, topMsg:needstr, bgName:"", scale: 0.6, title:``,offY:0},
					], showType:""};
			}
			ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
		}, ViewController);


		let group = new BaseDisplayObjectContainer();

		let width = view.progressOffX * (Number(Object.keys(this.cfg.recharge).length)) - 40;
		if (view.getUiCode() == "2"){
			width = view.progressOffX * (Number(Object.keys(this.cfg.recharge).length)) - 50;
		}
		let progressbar = ComponentManager.getProgressBar(`newyearredprogress-${code}`,`newyearredprogressbg-${code}`,width);
		progressbar.x = 50;
		group.addChild(progressbar);
		view._redGroup = group;
		view._progressBar = progressbar;

		let scrollview = ComponentManager.getScrollView(group, new egret.Rectangle(0,0,GameConfig.stageWidth,305));
		view.addChildToContainer(scrollview);
		scrollview.bounces = false;
		scrollview.horizontalScrollPolicy = 'on';
		scrollview.verticalScrollPolicy = 'off';
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, zshi, [0,55]);
		if (view.getUiCode() == "2"){
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, zshi, [0,25]);
		}

		let curId = 1;
		for(let i in view.cfg.recharge){
			let unit : Config.AcCfg.NewYearRedRechargeItemCfg = view.cfg.recharge[i];
			let unitgroup = new BaseDisplayObjectContainer();
			unitgroup.name = `group${i}`;
			group.addChild(unitgroup);
			unitgroup.x = progressbar.x + 90 + (Number(i) - 1) * view.progressOffX;
			if (view.getUiCode() == "2"){
				unitgroup.x = progressbar.x + 110 + (Number(i) - 1) * view.progressOffX;
			}
			unitgroup.y = progressbar.y + progressbar.height;
			unitgroup.mask = new egret.Rectangle(-60,0,220,unit.show?300:220);
			
			let line = BaseBitmap.create(this.getResByCode(`newyearredline`));
			unitgroup.addChild(line);
			let red = ComponentManager.getButton(this.getResByCode(`newyearredbag${unit.show ? 2 : 1}`), '', ()=>{
				ViewController.getInstance().openView(ViewConst.COMMON.ACNEWYEARREDRECHARGEVIEW, {
					code : view.code,
					aid : view.aid,
					id :  unit.id
				});
			}, view);
			unitgroup.addChild(red);
			red.name = `red${i}`;
			
			if (view.getUiCode() == "1"){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, unitgroup, [0,unit.show ? 0 : -95], true);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, red, line, [0,unit.show ? 80 : 45]);
			}
			else if (view.getUiCode() == "2"){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, unitgroup, [0, 5], true);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, red, line, [0, 70]);
			}
			
			if (view.getUiCode() == "1"){
				if(unit.show){
					let fu = BaseBitmap.create(this.getResByCode(`newyearredfu`));
					unitgroup.addChild(fu);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fu, red, [0,red.height+15]);
				}
			}
			let txt = ComponentManager.getTextField(LanguageManager.getlocal(this.getCnByCode(`AcNewYearRedTip2`), [unit.needGem.toString()]), 20);
			unitgroup.addChild(txt);
			txt.textAlign = egret.HorizontalAlign.CENTER;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, red, [unit.show?-5:0,15]);
			if (view.getUiCode() == "2"){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, red, [0, 0]);
			}
			txt.name = `txt${i}`;
			if(0){//view.vo.getpublicRedhot2()
				if(view.vo.getChargeNum() >= unit.needGem && curId == 1 && !view.vo.isGetRecharge(unit.id)){
					curId = unit.id;
				}
			}
			else{
				if(view.vo.getChargeNum() >= unit.needGem){
					curId = unit.id;
				}
			}
			
			let wifeicon = null;
			if (view.getUiCode() == "1"){
				if(view.cfg.getCoreRewardGemIdx() == Number(i)){
					let wifecfg = Config.WifeCfg.getWifeCfgById(view.cfg.coreReward);
					wifeicon = BaseLoadBitmap.create(wifecfg.icon);//
					wifeicon.width = 205;
					wifeicon.height = 196;
					wifeicon.setScale(0.5);
					wifeicon.setPosition(7,105);
					unitgroup.addChildAt(wifeicon,3);
					wifeicon.alpha = 0.2;
					// egret.Tween.get(wifeicon,{loop:true}).to({alpha : 0.6}, 1500).to({alpha : 0.2}, 1500);
				}
			}
			else if (view.getUiCode() == "2"){
				let specialData = view.vo.getSpecailShowData();
				if (specialData.index && specialData.index == Number(i)){
					let skinCfg = Config.WifeskinCfg.getWifeCfgById(view.cfg.coreReward);
					wifeicon = BaseLoadBitmap.create(skinCfg.icon);//
					wifeicon.width = 205;
					wifeicon.height = 196;
					let iconMask = new egret.Rectangle(0, 0, 160, 132);
					wifeicon.mask = iconMask;
					wifeicon.setScale(0.5);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wifeicon, red, [0, 30]);
					unitgroup.addChildAt(wifeicon,3);
					wifeicon.alpha = 0.2;
					// egret.Tween.get(wifeicon,{loop:true}).to({alpha : 0.6}, 1500).to({alpha : 0.2}, 1500);
				}
			}
			if (wifeicon){
				egret.Tween.get(wifeicon,{loop:true}).to({alpha : 0.6}, 1500).to({alpha : 0.2}, 1500);
			}

			unitgroup.anchorOffsetX = unitgroup.width / 2;
			let randomT = 800 + Math.floor(Math.random()*1000);
            let randomR = 3.5 + 2*Math.random();
            egret.Tween.get(unitgroup,{loop:true})
            .to({rotation:randomR},randomT,egret.Ease.quadOut)
            .to({rotation:-randomR},randomT*2,egret.Ease.quadInOut)
            .to({rotation:0},randomT,egret.Ease.quadIn);
		}

		let alpha = BaseBitmap.create(`public_alpha`);
		alpha.width = group.width;
		alpha.height = group.height;
		group.addChild(alpha);

		let bubble = BaseBitmap.create(this.getResByCode(`newyearredbubble`));
		bubble.anchorOffsetX = bubble.width / 2;
		view._bubble = bubble;
		group.addChild(bubble);

		let jinduTxt = ComponentManager.getTextField(``, 20);
		group.addChild(jinduTxt);
		view._jinduTxt = jinduTxt;

		if (view.getUiCode() == "2"){
			let proLight = BaseBitmap.create(this.getResByCode(`newyearredprogresslight`));
			group.addChild(proLight);
			view._proLight = proLight;
			proLight.anchorOffsetX = proLight.width;
			proLight.anchorOffsetY = proLight.height/2;

			let proMaskLeft = BaseBitmap.create(this.getResByCode(`newyearredprogressmask`));
			proMaskLeft.setPosition(zshi.x, zshi.y + 9);
			view.addChildToContainer(proMaskLeft);

			let proMaskRight = BaseBitmap.create(this.getResByCode(`newyearredprogressmask`));
			proMaskRight.scaleX = -1;
			proMaskRight.setPosition(GameConfig.stageWidth, zshi.y + 9);
			view.addChildToContainer(proMaskRight);
		}

		view.update();

		let corNeedGem = view.cfg.getCoreRewardGemNum();
		let stX = 90;
		let specialData = this.vo.getSpecailShowData();
		if (view.getUiCode() == "2"){
			stX = 110;
			corNeedGem = specialData.needNum;
		}
	
		if(view.vo.getChargeNum() >= corNeedGem){
			scrollview.scrollLeft = Math.min(Math.max(0,stX + (curId - 3) * view.progressOffX), group.width - scrollview.width);
		}
		else{
			let posX = 0;
			let coreid = view.cfg.getCoreRewardGemIdx();
			if (view.getUiCode() == "2"){
				// let specialData = this.vo.getSpecailShowData();
				if (specialData.index){
					coreid = specialData.index;
				}
			}
			posX = Math.min(Math.max(0,stX + (curId - 3) * view.progressOffX), group.width - scrollview.width);
			scrollview.scrollLeft = stX + (coreid - 2)* view.progressOffX;
			view._stop = true;
			egret.Tween.get(scrollview).wait(1000).to({scrollLeft : posX}, (scrollview.scrollLeft - posX) / 2).call(()=>{
				egret.Tween.removeTweens(scrollview);
				view._stop = false;
			}, view);
		}
		
		this.showlihua();
	}

	private _idx = 1;
	private showlihua():void{
		let view = this;
		//for(let i in this.lihuaCfg){
			let cfg = this.lihuaCfg[this._idx];
			let fireeff = ComponentManager.getCustomMovieClip(`newyearlihua${cfg.color}fire`, cfg.firenum, 70);
			fireeff.width = 150;
			fireeff.height = 500;
			fireeff.playWithTime(1);
			this.container.addChildAt(fireeff, 1);
		
			fireeff.setEndCallBack(()=>{
				fireeff.dispose();
				fireeff = null;
			}, view);

			let lihua = ComponentManager.getCustomMovieClip(`newyearlihua${cfg.color}`, cfg.framenum, 70);
			lihua.width = cfg.width;
			lihua.height = cfg.height;
			this.container.addChildAt(lihua, 1);
			
			lihua.setEndCallBack(()=>{
				lihua.dispose();
				lihua = null;
				
			}, view);

			lihua.setPosition(cfg.x, cfg.y);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fireeff, lihua, [0,200]);

			egret.Tween.get(lihua).wait((cfg.firenum - 3) * 70).call(()=>{
				lihua.playWithTime(1);
				++ this._idx;
				if(this._idx == 10){
					this._idx = 1;
				}
				view.showlihua();
				egret.Tween.removeTweens(lihua);
			}, view);    
		//}
	}

	private lihuaCfg = {
		1 : {color : `purple`, framenum : 12, firenum : 10, width : 450, height : 450, x: -102, y: 80, scale: 1},
		2 : {color : `blue`, framenum : 11, firenum : 10, width : 450, height : 450, x: 101, y: 158, scale: 1},
		3 : {color : `green`, framenum : 11, firenum : 10, width : 400, height : 400, x: 292, y: -14, scale: 1},
		4 : {color : `red`, framenum : 10, firenum : 10, width : 500, height : 500, x: -18, y: 203, scale: 1},
		5 : {color : `purple`, framenum : 12, firenum : 10, width : 450, height : 450, x: 162, y: 288, scale: 1},
		6 : {color : `green`, framenum : 11, firenum : 10, width : 400, height : 400, x: 42, y: 0, scale: 1},
		7 : {color : `blue`, framenum : 11, firenum : 10, width : 450, height : 450, x: 415, y: 125, scale: 1},
		8 : {color : `red`, framenum : 10, firenum : 10, width : 500, height : 500, x: 308, y: 203, scale: 1},
		9 : {color : `purple`, framenum : 12, firenum : 10, width : 450, height : 450, x: -74, y: 371, scale: 1},
    }

	public tick():void{
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x+(view._timebg.width-view._timeCountTxt.width)*0.5;
    }


	private update():void{
		let view = this;
		let redgroup = view._redGroup;
		let jindu = 0;
		for(let i in view.cfg.recharge){
			let unit : Config.AcCfg.NewYearRedRechargeItemCfg = view.cfg.recharge[i];
			let unitgroup = <BaseDisplayObjectContainer>redgroup.getChildByName(`group${i}`);
			let red =  <BaseButton>unitgroup.getChildByName(`red${i}`);
			let txt =  <BaseTextField>unitgroup.getChildByName(`txt${i}`);
			let eff = <CustomMovieClip>unitgroup.getChildByName(`eff${i}`);
			if(view.vo.isGetRecharge(unit.id)){
				jindu = unit.id;
				if(eff){
					eff.dispose();
					eff = null;
				}
				txt.text = LanguageManager.getlocal(`candyGetAlready`);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, red, [unit.show?-5:0,15]);
				if (view.getUiCode() == "2"){
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, red, [0, 0]);
				}
			}
			else{
				if(view.vo.getChargeNum() >= unit.needGem){
					if(!eff){
						let eff = ComponentManager.getCustomMovieClip(`newyearredeff`, 10);
						eff.name = `eff${i}`;
						unitgroup.addChild(eff);
						eff.playWithTime(-1);
						eff.x = -50;
						eff.y = unit.show?40:-10;
						eff.blendMode = egret.BlendMode.ADD;
						if (view.getUiCode() == "2"){
							eff.x = -32;
							eff.y = 25; //40
						}
					}
					jindu = unit.id;
				}
				else{
					if(eff){
						eff.dispose();
						eff = null;
					}
				}
			}
		}
		
		let cur = 0;
		if(jindu == 0){
			cur = 0;
		}
		else if(jindu == Object.keys(view.cfg.recharge).length){
			cur = view._progressBar.width;
		}
		else{
			let stX = 90;
			if (view.getUiCode() == "2"){
				stX = 110;
			}
			let curcfg = view.cfg.recharge[jindu];
			let nextcfg = view.cfg.recharge[jindu + 1];
			cur = (jindu - 1) * view.progressOffX + stX + (view.vo.getChargeNum() - curcfg.needGem) / ((nextcfg.needGem - curcfg.needGem)/view.progressOffX);
		}
		let per = cur / view._progressBar.width;//view.vo.getChargeNum() / (view.cfg.recharge[Object.keys(view.cfg.recharge).length].needGem);
		view._progressBar.setPercentage(per);
		//App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._bubble, view._progressBar, [view._progressBar.width * per-view._bubble.anchorOffsetX, view._progressBar.height]);
		view._bubble.x = view._progressBar.x + view._progressBar.width * per;
		view._bubble.y = view._progressBar.y + view._progressBar.height;
		if (view._proLight){
			view._proLight.setPosition(view._bubble.x + 8, view._progressBar.y + view._progressBar.height/2);
		}
		
		view._jinduTxt.text = view.vo.getChargeNum().toString();
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._jinduTxt, view._bubble);
		if (view.getUiCode() == "2"){
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._jinduTxt, view._bubble, [0, 9]);
		}
	}

	public hide():void{
		if(this._stop){
			return;
		}
		super.hide();
	}
	
	public dispose():void{	
		let view = this;
		view._timeCountTxt = null;
		view._timebg = null;
		view._redGroup = null;
		view._progressBar = null;
		view._bubble = null;
		view._jinduTxt = null;
		view._stop = false;
		view._proLight = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		super.dispose();
	}
}