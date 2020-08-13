/*
author : qinajun
*/
class AcLanternView extends AcCommonView{

	private _timeCountTxt : BaseTextField = null;
	private _timebg : BaseBitmap = null;
	private _redGroup : BaseDisplayObjectContainer = null;
	private _progressBar : ProgressBar = null;
	private _bubble : BaseBitmap = null;
	private _bubblelight : BaseBitmap = null;
	private _jinduTxt : BaseTextField = null;
	private _stop : boolean = false;
	private _tenplay = false;
	private _useTxt : BaseTextField = null;
	private _haveTxtBg : BaseBitmap = null;
    private _haveTxt : BaseTextField = null;
	private _itemicon : BaseBitmap = null;
	private _detailBtn : BaseButton = null;
	private _destroyoneBtn : BaseButton = null;
	private _useIcon : BaseBitmap = null;
	public constructor(){
		super();
	}

	private get cfg() : Config.AcCfg.LanternCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcLanternVo{
        return <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}

	protected getProbablyInfo(): string {
        return App.CommonUtil.getCnByCode(`acLanternProbablyInfo`, this.getUiCode());
    }
	
	protected getBgName():string{
		return this.getResByCode(`lanternglou`);
	}
	
    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 1:
			case 2:
			case 3:
				code = `1`;
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

	/**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
    protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
        return { title: { key: App.CommonUtil.getCnByCode(`aclanterntip12`, this.getUiCode())}, msg: { key: App.CommonUtil.getCnByCode(`aclanterntip13`, this.getUiCode())} };
    }

	protected initBg():void{
		let bgtop = BaseBitmap.create(this.getResByCode(`newyearredbg2`));
		this.addChild(bgtop);
		
		let bgtop2 = BaseBitmap.create(this.getResByCode(`newyearredbg2`));
		this.addChild(bgtop2);
		bgtop.y = bgtop2.y = 200
		super.initBg();
		App.DisplayUtil.setLayoutPosition(LayoutConst.left, bgtop, this.viewBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.left, bgtop2, bgtop, [bgtop.width - 5]);
		egret.Tween.get(bgtop,{loop : true}).
			to({x : - bgtop.width},bgtop.width * 300). 
			to({x : bgtop.width - 10}, 1).
			to({x : 0},(bgtop.width - 10) * 300);

		egret.Tween.get(bgtop2,{loop : true}).
		to({x : - bgtop2.width}, (bgtop.width * 2 - 10) * 300).
		to({x : bgtop2.width - 10}, 1);
	}

	protected isHideTitleBgShadow():boolean{
		return true;
	}
	
	protected getResourceList():string[]{
		let code = this.getUiCode();
		let arr = [`lantern${code}`,`acwealthcarpview_skineffect1`,`acsearchproofview_common_skintxt`,`progress10`,`progress10_bg`,`newyearredbg2-1`,`specialview_commoni_namebg`,
		];
		return super.getResourceList().concat(arr);
	}

	protected getRuleInfo():string{
		return App.CommonUtil.getCnByCode(`aclanternruleinfo`, this.getUiCode());
	}

	protected getTitleStr():string{
		return null;
	}

	protected getTitleBgName():string{
		return `lanterntitle-${this.getUiCode()}`
	}

	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LANTERN_LOTTERY),view.attackCallback,view);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
	//REQUEST_LANTERN_LOTTERY
		view.height = GameConfig.stageHeigth;
		view.width = GameConfig.stageWidth;
		view.container.height = view.height - this.getContainerY();
		let code = view.getUiCode();

		let topbg = BaseBitmap.create(this.getResByCode(`lanterntopbg`));
		view.addChildToContainer(topbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.container, [0,0], true);
		
		let timeTxt = ComponentManager.getTextField(`${view.vo.getAcLocalTime(true,String(0xffffff))}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [27,20]);
        view.addChildToContainer(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getCnByCode(`aclanterntip1`),[view.cfg.getCoreRewardGemNum(this.code).toString()]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 590;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0,timeTxt.textHeight + 10]);
        view.addChildToContainer(tipTxt);

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        view.addChildToContainer(timebg);
        timebg.y = topbg.y + topbg.height - timebg.height - 2;
        view._timebg = timebg;
 
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChildToContainer(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y+6; 

        timebg.width = tip2Text.width+50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
		tip2Text.x = timebg.x+(timebg.width-tip2Text.width)*0.5;

		let bottombg = BaseBitmap.create(this.getResByCode(`lanternbtnbg`));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0,0], true);

		let wifeCfg = null;
		let codetype = this.cfg.getCoreRewardType(view.code);
		if(codetype == 'servantskin'){
			wifeCfg = Config.ServantskinCfg.getServantSkinItemById(view.cfg.coreReward);//
		}
		let boneName = undefined;
		if (wifeCfg && wifeCfg.bone) {
			boneName = wifeCfg.bone + "_ske";
		}
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {//
			let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
			droWifeIcon.anchorOffsetY = droWifeIcon.height;
			droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
			droWifeIcon.x = 150;
			droWifeIcon.y = bottombg.y + 190;
			droWifeIcon.mask = new egret.Rectangle(-354, -800, 914, 820);
			droWifeIcon.setScale(0.8);
			view.addChildToContainer(droWifeIcon);
		}
		else {
			let wifeImg = BaseLoadBitmap.create(wifeCfg.body);//
			wifeImg.width = codetype == 'servantskin' ? 405 : 640;
			wifeImg.height = codetype == 'servantskin' ? 467 : 840;
			wifeImg.setScale(0.8);
			view.addChildToContainer(wifeImg);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wifeImg, bottombg, [25,230]);
		}
			
		view.addChildToContainer(bottombg);
		let chargebtn = ComponentManager.getButton(this.getResByCode(`lanternchargebtn`), ``, ()=>{
			//打开充值奖励弹窗
			ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNPOPUPVIEW,{
				aid : view.aid,
				code : view.code
			});	
		}, view); 
		view.addChildToContainer(chargebtn);

		view._detailBtn = chargebtn;
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, chargebtn, bottombg, [20,bottombg.height-80]);

		let poolbtn = ComponentManager.getButton(this.getResByCode(`lanternrewardpoolbtn`), ``, ()=>{
			//打开奖池弹窗
			ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNPOOLVIEW,{
				aid : view.aid,
				code : view.code
			});		
		}, view); 
		view.addChildToContainer(poolbtn);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, poolbtn, chargebtn, [0,chargebtn.height+12]);
		//底部按钮
		let destroyone = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, App.CommonUtil.getCnByCode(`aclanterntip2`, code), ()=>{
            //消耗一次
            if(view._stop){
                return;
            }
            if(!view.vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(view.vo.getFreeNum() == 0 && view.vo.getItemNum() < 1){
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"achuntingTipTitle",
					msg:LanguageManager.getlocal(App.CommonUtil.getCnByCode(`aclanterntip4`, code)),
					callback:()=>{
						ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNPOPUPVIEW, { aid: this.aid, code: this.code });
					},
					handler:this,
					needCancel:true,
				}); 
            }
            else{
                //
                view._stop = true;
                view._tenplay = false;
                NetManager.request(NetRequestConst.REQUEST_LANTERN_LOTTERY,{
                    activeId:view.vo.aidAndCode, 
                    isFree:view.vo.getFreeNum() > 0 ? 1 : 0,
                    isBatch:0        
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, destroyone, bottombg, [80,25]);
		view.addChildToContainer(destroyone);
		view._destroyoneBtn = destroyone;

        let useIcon = BaseBitmap.create(App.CommonUtil.getResByCode(`lanternicon2`, code));
		view.addChildToContainer(useIcon);
		view._useIcon = useIcon;

        let useTxt = ComponentManager.getTextField(LanguageManager.getlocal(`sysFreeDesc`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(useTxt);
        view._useTxt = useTxt;

        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, useIcon, destroyone, [30,-useIcon.height+7]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, useTxt, useIcon, [useIcon.width,0]);

        let destroyall = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, App.CommonUtil.getCnByCode(`aclanterntip3`, code), ()=>{
            if(view._stop){
                return;
            }
            if(!view.vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(view.vo.getItemNum() < 10){
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"achuntingTipTitle",
					msg:LanguageManager.getlocal(App.CommonUtil.getCnByCode(`aclanterntip4`, code)),
					callback:()=>{
						ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNPOPUPVIEW, { aid: this.aid, code: this.code });
					},
					handler:this,
					needCancel:true,
				}); 
            }
            else{
                //
                view._stop = true;
                view._tenplay = true;
				NetManager.request(NetRequestConst.REQUEST_LANTERN_LOTTERY,{
                    activeId:view.vo.aidAndCode, 
                    isBatch:1        
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, destroyall, bottombg, [80,27])
        view.addChildToContainer(destroyall);

        let alluseIcon = BaseBitmap.create(App.CommonUtil.getResByCode(`lanternicon2`, code));
        view.addChildToContainer(alluseIcon);

        let alluseTxt2 = ComponentManager.getTextField(`X10`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(alluseTxt2)

        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, alluseIcon, destroyall, [35,-alluseIcon.height+7]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alluseTxt2, alluseIcon, [alluseIcon.width,0]);

        let haveTxtbg = BaseBitmap.create(`specialview_commoni_namebg`);
        view.addChildToContainer(haveTxtbg);
        view._haveTxtBg = haveTxtbg;

        let itemicon = BaseBitmap.create(App.CommonUtil.getResByCode(`lanternicon2-1`, code));
        view.addChildToContainer(itemicon);
        view._itemicon = itemicon;

        let haveTxt = ComponentManager.getTextField(`${view.vo.getItemNum()}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(haveTxt);
        view._haveTxt = haveTxt;

        haveTxtbg.width = haveTxt.width + 80;

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, haveTxtbg, bottombg, [0,100]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, haveTxtbg, [7,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, haveTxt, haveTxtbg);


        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, skinTxtEffect, bottombg, [80,180]);

		let skinTxt = BaseBitmap.create(`acsearchproofview_common_skintxt`);
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect, [0,0]);

		let skinTxteffect = BaseBitmap.create(`acsearchproofview_common_skintxt`);
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
			ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNPOPUPVIEW3, {
				aid  : view.aid,
				code : view.code
			});
		}, ViewController);


		let zshi = BaseBitmap.create(view.getResByCode(`lanternprogresszshi`));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, zshi, topbg, [0,topbg.height]);
		view.addChildToContainer(zshi);

		let dban = BaseBitmap.create(view.getResByCode(`lanternprogressdban`));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dban, zshi, [0,zshi.height-6]);
		view.addChildToContainer(dban);

		let group = new BaseDisplayObjectContainer();

		let bubble = BaseBitmap.create(this.getResByCode(`lanternbubble`));
		bubble.anchorOffsetX = bubble.width / 2;
		view._bubble = bubble;

		let bubblelight = BaseBitmap.create(this.getResByCode(`lanternprogresslight`));
		bubblelight.anchorOffsetX = bubble.width / 2;
		view._bubblelight = bubblelight;

		//lanternprogresslight-1

		let jinduTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		view._jinduTxt = jinduTxt;

		let width = 140 * (Number(Object.keys(this.cfg.answerList).length)) - 40;
		let progressbar = ComponentManager.getProgressBar(`lanternprogress-${code}`,`lanternprogressbg-${code}`,width);
		progressbar.x = 35;
		progressbar.y = 45;
		group.addChild(progressbar);
		view._redGroup = group;
		view._progressBar = progressbar;

		group.addChild(bubble);
		group.addChild(jinduTxt);

		let scrollview = ComponentManager.getScrollView(group, new egret.Rectangle(0,0,GameConfig.stageWidth,340));
		view.addChildToContainer(scrollview);
		scrollview.bounces = false;
		scrollview.horizontalScrollPolicy = 'on';
		scrollview.verticalScrollPolicy = 'off';
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, topbg, [0,topbg.height-28]);


		let curId = 1;
		for(let i in view.cfg.answerList){
			let unit : Config.AcCfg.LanternAnswerItemCfg = view.cfg.answerList[i];
			let unitgroup = new BaseDisplayObjectContainer();
			unitgroup.name = `group${i}`;
			group.addChild(unitgroup);
			unitgroup.x = progressbar.x + 90 + (Number(i) - 1) * 140;
			unitgroup.y = progressbar.y + progressbar.height;
			//unitgroup.mask = new egret.Rectangle(-20,0,220,unit.show?300:220);
			
			let red = ComponentManager.getButton(this.getResByCode(`lanternlamp${unit.show ? 2 : 1}`), '', ()=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNPOPUPVIEW2,{
					aid : view.aid,
					code : view.code,
					id : unit.id,
				});	
			}, view);
			unitgroup.addChild(red);
			red.name = `red${i}`;

			let txt = ComponentManager.getTextField(LanguageManager.getlocal(this.getCnByCode(`aclanterntip5`), [unit.answerfrequency.toString()]), 20, TextFieldConst.COLOR_BLACK);
			unitgroup.addChild(txt);
			txt.textAlign = egret.HorizontalAlign.CENTER;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, red, [unit.show?5:0,unit.show?140:90]);
			txt.name = `txt${i}`;
			if(0){//view.vo.getpublicRedhot2()
				if(view.vo.getProcessNum() >= unit.answerfrequency && curId == 1 && !view.vo.isGetprocessReward(unit.id)){
					curId = unit.id;
				}
			}
			else{
				if(view.vo.getProcessNum() >= unit.answerfrequency){
					curId = unit.id;
				}
			}
			
			// if(view.cfg.getCoreRewardGemIdx() == Number(i)){
			// 	let wifecfg = Config.WifeCfg.getWifeCfgById(view.cfg.coreReward);
			// 	let wifeicon = BaseLoadBitmap.create(`wife_half_235`);//wifecfg.icon
			// 	wifeicon.width = 205;
			// 	wifeicon.height = 196;
			// 	wifeicon.setScale(0.5);
			// 	wifeicon.setPosition(7,105);
			// 	//App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wifeicon, txt);
			// 	unitgroup.addChildAt(wifeicon,3);
			// 	wifeicon.alpha = 0.2;
			// 	egret.Tween.get(wifeicon,{loop:true}).to({alpha : 0.6}, 1500).to({alpha : 0.2}, 1500);
			// }

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

		view.update();

		if(view.vo.getProcessNum() >= view.cfg.getCoreRewardGemNum(this.code)){
			scrollview.scrollLeft = Math.min(Math.max(0,90 + (curId - 3) * 140), group.width - scrollview.width);
		}
		else{
			let posX = 0;
			view._stop = true;
			// let coreid = view.cfg.getCoreRewardGemIdx();
			posX = Math.min(Math.max(0,90 + (curId - 3) * 140), group.width - scrollview.width);
			scrollview.scrollLeft = group.width - scrollview.width;//90 + (coreid - 2)* 140;
			egret.Tween.get(scrollview).wait(500).to({scrollLeft : posX}, (scrollview.scrollLeft - posX)).call(()=>{
				egret.Tween.removeTweens(scrollview);
				view._stop = false;
			}, view);
		}

		group.addChild(bubblelight);
		bubblelight.y = 37;

		view.showlihua();
	}


	public tick():void{
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x+(view._timebg.width-view._timeCountTxt.width)*0.5;
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
			this.container.addChildAt(fireeff, 0);
		
			fireeff.setEndCallBack(()=>{
				fireeff.dispose();
				fireeff = null;
			}, view);

			let lihua = ComponentManager.getCustomMovieClip(`newyearlihua${cfg.color}`, cfg.framenum, 70);
			lihua.width = cfg.width;
			lihua.height = cfg.height;
			this.container.addChildAt(lihua, 0);
			
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


	private update():void{
		let view = this;
		let redgroup = view._redGroup;
		let jindu = 0;
		for(let i in view.cfg.answerList){
			let unit : Config.AcCfg.LanternAnswerItemCfg = view.cfg.answerList[i];
			let unitgroup = <BaseDisplayObjectContainer>redgroup.getChildByName(`group${i}`);
			let red =  <BaseButton>unitgroup.getChildByName(`red${i}`);
			let txt =  <BaseTextField>unitgroup.getChildByName(`txt${i}`);
			let eff = <CustomMovieClip>unitgroup.getChildByName(`eff${i}`);
			if(view.vo.isGetprocessReward(unit.id)){
				jindu = unit.id;
				red.setBtnBitMap(this.getResByCode(`lanternlamp${unit.show ? 2 : 1}`));
				txt.text = LanguageManager.getlocal(`candyGetAlready`);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, red, [unit.show?5:0,unit.show?140:90]);
				if(eff){
					eff.dispose();
					eff = null;
				}
			}
			else{
				if(view.vo.getProcessNum() >= unit.answerfrequency){
					red.setBtnBitMap(this.getResByCode(`lanternlamp${unit.show ? 2 : 1}_light`));
					jindu = unit.id;
					if(!eff){
						eff = ComponentManager.getCustomMovieClip(unit.show ? `newyearredeff` : 'lanternlampeff', unit.show ? 10 : 8);
						eff.name = `eff${i}`;
						eff.blendMode = egret.BlendMode.ADD;
						unitgroup.addChild(eff);
						eff.playWithTime(-1);
						eff.x = unit.show?-15:-42;
						eff.y = unit.show?-15:-10;
					}
				}
				else{
					red.setBtnBitMap(this.getResByCode(`lanternlamp${unit.show ? 2 : 1}`));
				}
			}
		}
		
		let cur = 0;
		if(jindu == 0){
			cur = 0;
		}
		else if(jindu == Object.keys(view.cfg.answerList).length){
			cur = view._progressBar.width;
		}
		else{
			let curcfg : Config.AcCfg.LanternAnswerItemCfg = view.cfg.answerList[jindu];
			let nextcfg = view.cfg.answerList[jindu + 1];
			cur = (jindu - 1) * 140 + 90 +   (view.vo.getProcessNum() - curcfg.answerfrequency) / ((nextcfg.answerfrequency - curcfg.answerfrequency)/140);
		}
		let per = cur / view._progressBar.width;//view.vo.getChargeNum() / (view.cfg.recharge[Object.keys(view.cfg.recharge).length].needGem);
		view._progressBar.setPercentage(per);

		view._bubble.x = view._progressBar.x + view._progressBar.width * per;
		view._bubblelight.x = view._progressBar.x + view._progressBar.width * per + 13;
		view._jinduTxt.text = LanguageManager.getlocal(view.getCnByCode(`aclanterntip5`), [view.vo.getProcessNum().toString()])
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._jinduTxt, view._bubble);

		let left = 0;
		if(view.vo.getFreeNum()){
			left = 30;
            view._useTxt.text = LanguageManager.getlocal(`sysFreeDesc`);
        }
        else{
			left = 40;
            view._useTxt.text = ` X1`;
		}
		App.DisplayUtil.setLayoutPosition(LayoutConst.left, view._useIcon, view._destroyoneBtn, [left]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._useTxt, view._useIcon, [view._useIcon.width,0]);

		if(view.vo.getpublicRedhot2() || view.vo.getpublicRedhot3()){
			App.CommonUtil.addIconToBDOC(view._detailBtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._detailBtn);
		}

        view._haveTxt.text = view.vo.getItemNum().toString();
        view._haveTxtBg.width = view._haveTxt.width + 80;
        view._haveTxtBg.x = (GameConfig.stageWidth - view._haveTxtBg.width) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._itemicon, view._haveTxtBg, [7,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._haveTxt, view._haveTxtBg,);
	}

	private attackCallback(evt : egret.Event):void{
		let view = this;
		if(evt.data.ret){
			let data = evt.data.data.data;
			view._stop = false;
			if(data){	
				if(view._tenplay){
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
						rewards: data.rewards,
						isPlayAni : true
					});
				}	
				else{
					ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNPROBLEMPOPUPVIEW,{
						aid : view.aid,
						code : view.code,
						callback : ()=>{
							ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
								rewards: data.rewards,
								isPlayAni : true
							});
						},
						callobj : view
					});
				}
			}
		}
	}

	public hide():void{
		let view = this;
		if(view._stop){
			return;
		}
		super.hide();
	}
	
	public dispose():void{	
		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LANTERN_LOTTERY),view.attackCallback,view);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		view._tenplay = false;
		view._timeCountTxt = null;
		view._timebg = null;
		view._redGroup = null;
		view._progressBar = null;
		view._bubble = null;
		view._bubblelight = null;
		view._jinduTxt = null;
		view._stop = false;
		view._useTxt = null;
		view._haveTxtBg = null;
		view._haveTxt = null;
		view._itemicon = null;
		view._detailBtn = null;
		view._destroyoneBtn = null;
		view._useIcon = null;
		super.dispose();
	}
}