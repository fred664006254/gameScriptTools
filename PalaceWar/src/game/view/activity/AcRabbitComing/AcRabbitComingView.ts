/*
author : qianjun
desc : 兔宝来袭活动
*/
class AcRabbitComingView extends AcCommonView{
    private _timebg : BaseBitmap = null;
    private _cdText : BaseTextField = null; 

    private _numImg : BaseBitmap = null;
    private _getOneBtn : BaseButton = null;

    private _progressBubbleGroup : BaseDisplayObjectContainer = null;
    private _progressBar : ProgressBar = null;
    private _startPercent = 0;
    private _maxLength : number = 1;
    private _curLuckyTxt : BaseTextField = null; 
    private _numDescTF : BaseTextField = null;
    private _boxRewardImg : BaseButton = null;
    private _boxLightBM: BaseBitmap = null;
    private _lightBall: BaseBitmap = null;
    private _progressBg: BaseBitmap = null;
    private _progressTF : BaseTextField = null; 
    private _progressTFBg : BaseBitmap = null; 
    private _progressBM: BaseBitmap = null;
    private _progressLight: BaseBitmap = null;
    /**鞭炮的 Container*/
	private _bangerContainer: BaseDisplayObjectContainer = null;
	private _bangerInfo: { id: string, bangerBM: BaseBitmap, value: number, isPlayAni: boolean, percent: number,bangerEff : CustomMovieClip}[] = [];
	private _log: any = null;
	private _loopTopBg: BaseBitmap = null;
	private _isSecond: boolean = false;
    private _isPlay: boolean = false;
    private _resbg : BaseBitmap = null;
    private _shopbtn : BaseButton = null; 
    private _rewardbtn : BaseButton = null; 
    private _numTxt : BaseTextField = null;
    private _isbatch = false;
    private _rabbitDragon = null;

    public constructor(){
        super();
    }

    private get cfg() : Config.AcCfg.RabbitComingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcRabbitComingVo{
        return <AcRabbitComingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    // protected preInit():void{
    //     super.preInit();
    //     let view = this;
    //     if (this.getTypecode  == 5)
    //     {   

    //         let localkey:string = this.acTivityId+this.vo.et+Api.playerVoApi.getPlayerID();
	// 		let lastTime:number = 0;
	// 		let timeStr:string = LocalStorageManager.get(localkey);
	// 		if (timeStr && timeStr!="")
	// 		{
	// 			lastTime = Number(timeStr);
	// 		}

	// 		if (!App.DateUtil.checkIsToday(lastTime))
	// 		{   
    //             LocalStorageManager.set(localkey,String(GameData.serverTime));
    //             ViewController.getInstance().openView(ViewConst.BASE.ACLUCKYDRAWPREVIEW,{
    //                 aid: view.aid, 
    //                 code: view.code, 
    //             });
    //         }
    //     }
    // }

    /** 
     * 重写区
    */
    protected getRuleInfo():string{
		return App.CommonUtil.getCnByCode(`acrabbitcomingrule`, this.code);
    } 
    protected getRuleInfoParam():string[]{
        let skin = Config.WifeskinCfg.getWifeCfgById(this.cfg.corePrize);
        let name = ``;
        if(skin){
            name = skin.name;
        }
		return [this.cfg.getWifeNeed().toString(), name];
    } 
    protected getTitleStr():string{
        return null;
    }
    protected getTitleBgName():string{
        return App.CommonUtil.getResByCode(`rabitcomingtitle`, this.code);
    }
    protected getProbablyInfo(): string {
		return App.CommonUtil.getCnByCode(`acrabbitcomingProbablyInfo`, this.code);
    }
    protected getBgName() : string{
        return App.CommonUtil.getResByCode(`rabitbg`, this.code);
    }
    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `rabitbg`,`acrabbitcomingcode1`,`acwealthcomingview_progresslight`,`progress7`,`progress7_bg`,`acwealthcomingview_lightball`,
            `boxboomeffect`,`boxrewardfly-1`,`acliangbiographyview_common_acbg`,`luckdrawprogressbg-1`,`acnationalday_common_rewardtxt`,`acwealthcarpview_skineffect1`
        ]);
    }

    protected getContainerY():number{
        return this.titleBg.height-5;
    }
    /** 
     * 自定义实现
    */
    public initView(){
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.height = view.height - view.container.y;
        let code = view.code;
        /***顶部信息***/
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,view.freshView,view); 
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_RABBIT_CHOU,view.pickCallBack,view);
        //top背景图
        let progressbg = BaseBitmap.create(`luckdrawprogressbg-1`);
       
        view._progressBg = progressbg;
        view.addChildToContainer(progressbg);
        progressbg.alpha = 0;

        let topbg = BaseBitmap.create(`acliangbiographyview_common_acbg`);
        topbg.width = GameConfig.stageWidth;
        view.addChildToContainer(topbg);
        
        let timeTxt = ComponentManager.getTextField(view.vo.getAcLocalTime(true), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.lineSpacing = 5;
        view.addChildToContainer(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip3`,view.code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 600;
        tipTxt.lineSpacing = 5;
        view.addChildToContainer(tipTxt);

        topbg.height = timeTxt.textHeight + 5 + tipTxt.textHeight + 18;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.container, [0,0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [20,10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0,timeTxt.textHeight + 5]);

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbg, topbg, [0,topbg.height]);

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        view.addChildToContainer(timebg);
        timebg.y = (topbg.y+topbg.height - 14);
        view._timebg = timebg;

        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChildToContainer(tip2Text);
        view._cdText = tip2Text;
        tip2Text.y = timebg.y+6; 

        timebg.width = tip2Text.width+50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = timebg.x+(timebg.width-tip2Text.width)*0.5;

        /***底部按钮***/
        let bottombg = BaseBitmap.create(App.CommonUtil.getResByCode(`rabitbottom`, view.code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0,0], true);
        view.addChildToContainer(bottombg);

        //兔子
        let rabbitdragon = null;
        if(!Api.switchVoApi.checkCloseBone() && RES.hasRes(`acrabbitcoming_easterbunny_ske`) && App.CommonUtil.check_dragon()){
            rabbitdragon = App.DragonBonesUtil.getLoadDragonBones(`acrabbitcoming_easterbunny`);
            view.addChildToContainer(rabbitdragon);
            rabbitdragon.width = 170;
            rabbitdragon.height = 269;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, rabbitdragon, bottombg, [15,-30]);
            rabbitdragon.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE,()=>{
                rabbitdragon.playDragonMovie(`idle`, 0);
            },this);  
            view._rabbitDragon = rabbitdragon;
            if(Number(view.code) == 3){
                rabbitdragon.x = 320;
            }
        }
        else{
            let npc = BaseBitmap.create(`rabitnpc2`);
            view.addChildToContainer(npc);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, npc, bottombg, [25,205]);
        }

        let shopBtn = ComponentManager.getButton(App.CommonUtil.getResByCode(`rabitshopbtn`, view.code), ``, ()=>{
            if(view._isPlay){
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACRABBITCOMINGSHOPVIEW, {
                    aid: this.aid, 
                    code: this.code, 
            });
        
        }, view);
        view.addChildToContainer(shopBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, shopBtn, bottombg, [43,15]);
        view._shopbtn = shopBtn;

        let rewardbtn = ComponentManager.getButton(App.CommonUtil.getResByCode(`rabitrewardbtn`, view.code), ``, ()=>{
            if(view._isPlay){
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACRABBITCOMINGREWARDPOPUPVIEW, {
                    aid: this.aid, 
                    code: this.code, 
            });
        }, view);
        view.addChildToContainer(rewardbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, rewardbtn, bottombg, [43,15]);
        view._rewardbtn = rewardbtn;

        let resbg = BaseBitmap.create(App.CommonUtil.getResByCode(`rabiticonbg`, view.code));
        view.addChildToContainer(resbg);
        view._resbg  = resbg;

        let icon = BaseBitmap.create(App.CommonUtil.getResByCode(`rabitcomingicon2`, view.code));
        view.addChildToContainer(icon);
        
        let costNum = ComponentManager.getTextField(view.vo.getChoclateNum().toString(), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(costNum);
        view._numTxt = costNum;

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, resbg, bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, resbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, costNum, resbg, [0,0]);

        let numImg = BaseBitmap.create(App.CommonUtil.getResByCode(`rabitplay${view.vo.isFree() ? `3` : (view.vo.getChoclateNum() < 10 ? 1 : 2)}`, view.code));
        view.addChildToContainer(numImg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numImg, resbg, [0,resbg.height]);
        view._numImg = numImg;


        let temp = 0;
        let oneBtn = ComponentManager.getButton(App.CommonUtil.getResByCode(view.vo.getChoclateNum() > 0 ? `rabitplayiconstate2` : `rabitplayiconstate1`, view.code), ``, ()=>{
            if(view._isPlay){
                return;
            }
            if(!view.vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(view.vo.getChoclateNum() < 1 && !view.vo.isFree()){
                //确认弹框
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip16`,code)),
					touchMaskClose : true,
					title : `itemUseConstPopupViewTitle`,
					callback : ()=>{
						ViewController.getInstance().openView(ViewConst.POPUP.ACRABBITCOMINGSHOPVIEW,{
                            aid : view.aid,
                            code : view.code
                        });
					},
					handle : view,
					needClose : 1,
					needCancel : true,
					confirmTxt : `taskGoBtn`,
					recommand : false
				});
                //App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip16`,code)));
                return;
            }
            view._isPlay = true;
            //翻牌一次
            let isbatch = view.vo.isFree() ? 0 : (view.vo.getChoclateNum() < 10 ? 0 : 1);
            view._isbatch = isbatch == 1;
            egret.Tween.removeTweens(slidericon);
            if(isbatch){
                slidericon.x = sliderspecial.x + (sliderspecial.width - slidericon.width) / 2;
            }
            let hit = (slidericon.x >= sliderspecial.x && slidericon.x <= (sliderspecial.x+sliderspecial.width)) ? 1 : 0;
            NetManager.request(NetRequestConst.REQUEST_RABBIT_CHOU,{ 
                activeId : view.vo.aidAndCode, 
                isTenPlay : isbatch,
                hit : isbatch == 1 ? 1 : hit,
            });
        
        }, view, null, 3);
        oneBtn.anchorOffsetX = oneBtn.width / 2;
        oneBtn.anchorOffsetY = oneBtn.height / 2;
        view._getOneBtn = oneBtn;
        view.addChildToContainer(oneBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, oneBtn, numImg, [0,numImg.height-40]);
        let tmpy = view._getOneBtn.y;
        if(view.vo.getChoclateNum()){
            egret.Tween.get(view._getOneBtn, {loop : true}).to({rotation : 15, y : tmpy - 5}, 50).to({rotation : 0, y : tmpy - 10}, 50).to({rotation : -15, y : tmpy - 15}, 50).to({rotation : 0, y : tmpy - 20}, 50).to({rotation : 15, y : tmpy - 15}, 50).to({rotation : 0, y : tmpy - 10}, 50).to({rotation : -15, y : tmpy - 5}, 50).to({rotation : 0, y : tmpy}, 50);
        }
    
        //滑块部分
        let slidergroup = new BaseDisplayObjectContainer();
        view.addChildToContainer(slidergroup);
        slidergroup.width = 276;
        slidergroup.height = 26;
        slidergroup.name = `slidergroup`;

        let sliderbg = BaseBitmap.create(`rabotsliderbg`);
        slidergroup.addChild(sliderbg);
        sliderbg.name = `sliderbg`;

        let sliderspecial = BaseBitmap.create(`rabotslidersoecial`);
        slidergroup.addChild(sliderspecial);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, sliderspecial, sliderbg);
        sliderspecial.name = `sliderspecial`;

        let slidericon = BaseBitmap.create(`rabotslidericon`);
        slidergroup.addChild(slidericon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, slidericon, sliderbg);
        slidericon.name = `slidericon`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, slidergroup, oneBtn, [0,oneBtn.height-20]);

        let flash = BaseLoadBitmap.create(`rabbitchocmidlight`);
        slidergroup.addChild(flash);
        flash.width = 134;
        flash.height = 89;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flash, sliderspecial);
        flash.alpha = 0;
        flash.name = `flash`;

        view.sliderTween();
        /***中部展示***/
        //龙骨
        if(this.cfg.corePrize){
            let skinbone = view.cfg.getSkinBone(view.code);
            let boneName = undefined;
            let wife = null;
            if(skinbone) {
                boneName = skinbone + "_ske";
            }
            let obj = {
                1 : 'wife',
                2 : 'wife',
            };
            let isDragon = (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon();
            // isDragon = false;
            if (isDragon){
                wife = App.DragonBonesUtil.getLoadDragonBones(skinbone);
                if(obj[view.code] == `wife`){
                    wife.width = 580;
                    wife.height = 730;
                    wife.setAnchorOffset(-138.5, -610);
                    if(PlatformManager.checkIsTextHorizontal())
                    {
                        wife.setAnchorOffset(-138.5, -650);
                    }
                    wife.setScale(Math.min(1,(bottombg.y - topbg.y - topbg.height - 110)/wife.height));
                }
            }
            else{
                let wcfg = Config.WifeskinCfg.getWifeCfgById(this.cfg.corePrize);
                wife = BaseLoadBitmap.create(wcfg.body);
                wife.width = 640;
                wife.height = 840;
                wife.setScale(0.5);
            }
            view.container.addChildAt(wife, view.container.getChildIndex(bottombg)-1);
    
            if(isDragon){
                if(obj[view.code] == `wife`){
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, bottombg, [0, bottombg.height-140]);
                }
                else{
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bottombg, [-80, wife.height / 2]);
                }
            }
            else{
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, bottombg, [0, bottombg.height-70]);
            }
            //气泡提示
            let bubbleTopGroup = new BaseDisplayObjectContainer();
            view.addChildToContainer(bubbleTopGroup);
    
            let descBg = BaseBitmap.create('public_9_bg42');
            view.addChildToContainer(descBg);
            bubbleTopGroup.addChild(descBg);
    
            let arrowBM = BaseBitmap.create("public_9_bg13_tail");
            arrowBM.anchorOffsetX = arrowBM.width / 2;
            arrowBM.anchorOffsetY = arrowBM.height / 2;
            bubbleTopGroup.addChild(arrowBM);
    
            let descTxt =ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip1`, view.code),[view.cfg.getWifeNeed().toString(), view.cfg.getSkinName(view.code)]), 20, TextFieldConst.COLOR_BLACK);
            descTxt.lineSpacing = 5;
            bubbleTopGroup.addChild(descTxt);
    
            descBg.width = descTxt.textWidth + 40;
            descBg.height = descTxt.textHeight + 36;
            bubbleTopGroup.width = descBg.width;
            bubbleTopGroup.height = descBg.height + arrowBM.height;
            
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bubbleTopGroup, [0,0], true);
            if(PlatformManager.checkIsThSp()){
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bubbleTopGroup, [25,0], true);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [arrowBM.anchorOffsetX + 15, arrowBM.anchorOffsetY + descBg.height - 13]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bubbleTopGroup, wife, [180,-bubbleTopGroup.height+5]);

            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
			// this._effect.setScale(2);
			let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
			skinTxtEffect.setPosition(wife.x+(wife.width*wife.scaleX-skinTxtEffectBM.width)/2-skinTxtEffectBM.width/2, bottombg.y-70);
			skinTxtEffect.blendMode = egret.BlendMode.ADD;
			this.addChildToContainer(skinTxtEffect);
			skinTxtEffect.playWithTime(-1);

			let skinTxt = BaseBitmap.create("acnationalday_common_rewardtxt");
			skinTxt.anchorOffsetX = skinTxt.width / 2;
			skinTxt.anchorOffsetY = skinTxt.height / 2;
			skinTxt.setPosition(skinTxtEffect.x + 100, skinTxtEffect.y+80);
            this.addChildToContainer(skinTxt);
            skinTxt.name = "skinTxt";
			egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


			let skinTxteffect = BaseBitmap.create("acnationalday_common_rewardtxt");
			skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
			skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
			skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
			this.addChildToContainer(skinTxteffect);
			skinTxteffect.blendMode = egret.BlendMode.ADD;
			skinTxteffect.alpha = 0;
			egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
			
			//透明点击区域
			let touchPos = BaseBitmap.create("public_alphabg");
			touchPos.width = 180;
			touchPos.height = 120;
			touchPos.setPosition(wife.x + 50, bottombg.y-70);
            touchPos.name = "touch";
			view.addChildToContainer(touchPos);
			touchPos.addTouchTap(() => {
                let wifeId = this.cfg.corePrize;
                let wifeTopMsg = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip1`, view.code),[view.cfg.getWifeNeed().toString(), view.cfg.getSkinName(view.code)]);
                let wifeBg = "acthrowstone_wife_preview_bg";
                // let data = [
                //     {id:""+wifeId, type:"wife", topMsg:wifeTopMsg, bgName:wifeBg,scale:0.6},
                //     {id:""+servantSkinId, type:"servant", topMsg:servantTopMsg, bgName:servantBg,scale:0.8},
                // ];
                // ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONCLOTHESPOPUPVIEW, data);
                let wifeType = Config.WifeskinCfg.formatRewardItemVoStr(wifeId);
                let data = {data:[
                    {idType:wifeType, topMsg:wifeTopMsg, bgName:wifeBg, scale:0.6},
                ]};
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
			}, ViewController);
            
        }
        /***底部进度***/

        //次数this._bg
		let numbg = BaseBitmap.create(App.CommonUtil.getResByCode(`rabitprogressrewardbg`, view.code));
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numbg, progressbg, [0,0]);
        view.addChildToContainer(numbg);

        //进度条
        let progressbar : any = ComponentManager.getProgressBar("rabitprogress", "progress7_bg", 450);
        progressbar.width = 450;
        progressbar.height = 26;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressbar, progressbg, [numbg.width+5,5]);
        progressbar.progressBar.x = 5;
        progressbar.progressBar.y = 2;
        progressbar.progressBar.height = 21;
        let v = view.cfg.getTotalProgress();
        view._startPercent = Math.min(1,view.vo.getLuckyProgress() / v);//this._maxLength * view.vo.getLuckyProgress() / cfg.luckyProcess;
        progressbar.setPercentage(view._startPercent);
        view._progressBar = progressbar;
        view.addChildToContainer(progressbar);

        //财运TF
		let numDescTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip2`, view.code)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		if(PlatformManager.checkIsEnLang())
		{
			numDescTF.size = 16;
		}
		numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2+5, numbg.y + 38);
        view.addChildToContainer(numDescTF);
        view._numDescTF = numDescTF;
        //数量TF
		view._curLuckyTxt = ComponentManager.getTextField(view.vo.getLuckyProgress().toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		view._curLuckyTxt.width = 60;
		view._curLuckyTxt.textAlign = egret.HorizontalAlign.CENTER;
		view._curLuckyTxt.setPosition(numDescTF.x + numDescTF.width / 2 - view._curLuckyTxt.width / 2, numDescTF.y + numDescTF.height + 2);
        view.addChildToContainer(view._curLuckyTxt);
        //奖励宝箱
		this._boxRewardImg = ComponentManager.getButton(App.CommonUtil.getResByCode(`rabitprogressrewardbtn`, code), ``, () => {
            if(view._isPlay){
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACRABBITCOMINGREWARDPOPUPVIEW3, {
                aid: this.aid, 
                code: this.code, 
            });
        }, this, null,3);
		this._boxRewardImg.anchorOffsetX = this._boxRewardImg.width / 2;
		this._boxRewardImg.anchorOffsetY = this._boxRewardImg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this._boxRewardImg, progressbg, [-15,0]);
        this._boxRewardImg.x = progressbar.x + progressbar.width + this._boxRewardImg.anchorOffsetX - 7;
		this.addChildToContainer(this._boxRewardImg);
        
		//宝箱光 584 816  582.5 810
		this._boxLightBM = BaseBitmap.create("");//acwealthcomingview_box_light
		this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
		this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxRewardImg.width / 2 - 2 + 3;
		this._boxLightBM.setPosition(this._boxRewardImg.x, this._boxRewardImg.y);
		this.addChildToContainer(this._boxLightBM);
        this._boxLightBM.alpha = 0;

		if (view.vo.getpublicRedhot3()){
            // this._boxRewardImg.setRes("acwealthcomingview_box_2")
            App.CommonUtil.addIconToBDOC(this._boxRewardImg);
		}
		else {
            //this._boxRewardImg.setRes("acwealthcomingview_box_1")
            App.CommonUtil.removeIconFromBDOC(this._boxRewardImg);
		}
        //文字
		let boxWordBM = BaseBitmap.create(App.CommonUtil.getResByCode(`rabitprogressrewardtxt`, view.code))
		boxWordBM.setPosition(this._boxRewardImg.x - boxWordBM.width / 2, this._boxRewardImg.y - boxWordBM.height / 2);
        this.addChildToContainer(boxWordBM);

        this._lightBall = BaseBitmap.create("acwealthcomingview_lightball")
		this._lightBall.anchorOffsetX = this._lightBall.width / 2;
        this._lightBall.anchorOffsetY = this._lightBall.height / 2;
        this._lightBall.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(this._lightBall);
        this._lightBall.alpha = 0;
        //进度文本
        let progressTFbg = BaseBitmap.create(`rabbitprogressbg`);
        this.addChildToContainer(progressTFbg);
        this._progressTFBg = progressTFbg;

        let curJindu = view.vo.getLuckyProgress();
        let next = view.cfg.getTotalProgress();
        let progressstr = view.vo.getLuckyProgress() + "/" + next;
        if(view.vo.getLuckyProgress() >= view.cfg.getTotalProgress()){
            progressstr = LanguageManager.getlocal(`acLuckyDrawTip3-${code}`);
        }
		this._progressTF = ComponentManager.getTextField(progressstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 27);
        this.addChildToContainer(this._progressTF);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, progressTFbg, this._progressTF, [0,-2]);
        // this._progressTF.alpha = 0;
        
        this._progressBM = BaseBitmap.create(App.CommonUtil.getResByCode(`rabotslidericon`, view.code));
		this._progressBM.anchorOffsetX = this._progressBM.width / 2;
		this._progressBM.anchorOffsetY = this._progressBM.height;
		this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y);
        this.addChildToContainer(this._progressBM);
        this._progressBM.alpha = 0;
        
        this._progressLight = BaseBitmap.create(App.CommonUtil.getResByCode(`rabitprogresscur`, view.code));
		this._progressLight.anchorOffsetX = this._progressLight.width;
		this._progressLight.anchorOffsetY = this._progressLight.height / 2;
		this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y + this._progressBar.height / 2);
		this.addChildToContainer(this._progressLight);
        this._progressLight.setVisible(false);

        this._bangerContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._bangerContainer);
		this.initBanger();
        this.refreshBanger(this._startPercent);
        this.tick();
        view.freshView();
      
    }

    private showReward(rewards:string):void{
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW,{
            rewards : rewards, 
            callback : ()=>{
                let endPercent = Math.min(1,view.vo.getLuckyProgress() / view.cfg.getTotalProgress());
                view.playProgressBarAni(view._startPercent, endPercent, 0.005);
                view._isPlay = false;
            },
            handler : view,
            isPlayAni : true
        });
    }

    private showHitEffect(rewards:string):void{
        let view = this;
        let slidergroup = <BaseDisplayObjectContainer>view.container.getChildByName(`slidergroup`);
        let sliderbg = slidergroup.getChildByName(`sliderbg`);
        let sliderspecial = slidergroup.getChildByName(`sliderspecial`);
        let slidericon = slidergroup.getChildByName(`slidericon`);
        let flash = slidergroup.getChildByName(`flash`);
        let hit = false;
        hit = slidericon.x >= sliderspecial.x && slidericon.x <= (sliderspecial.x+sliderspecial.width);
        let hiteff = ComponentManager.getCustomMovieClip(`rabbitchoclight`, 8);
        hiteff.width = 136;
        hiteff.height = 98;
        hiteff.anchorOffsetX = hiteff.width / 2;
        hiteff.anchorOffsetY = hiteff.height / 2;
        hiteff.playWithTime(1);
        hiteff.blendMode = egret.BlendMode.ADD;
        slidergroup.addChild(hiteff);
        hiteff.setPosition(slidericon.x+16,slidericon.y+23);
   
        hiteff.setEndCallBack(()=>{
            hiteff.dispose();
            hiteff = null;
            if(hit){
                egret.Tween.get(flash).to({alpha : 1}, 300).to({alpha : 0}, 200).to({alpha : 1}, 300).to({alpha : 0}, 200);
            }
            egret.Tween.get(view._getOneBtn).wait(hit ? 800 : 50).call(()=>{
                if(view._rabbitDragon){
                    view._rabbitDragon.playDragonMovie(`eat${view._isbatch ? 10 : 1}`, 1);
                    egret.Tween.get(view).wait(1000).call(()=>{
                        view.showReward(rewards);
                        view.sliderTween();
                        egret.Tween.removeTweens(view);
                     },view);
                }
                else{
                    view.showReward(rewards);
                    view.sliderTween();
                }
            },view);
        },view);
    }

    private pickCallBack(evt : egret.Event):void{
        let view = this;
        //物品奖励
        if(evt.data.ret){
            let data = evt.data.data.data;
            let slidergroup = <BaseDisplayObjectContainer>view.container.getChildByName(`slidergroup`);
            let sliderbg = slidergroup.getChildByName(`sliderbg`);
            let slidericon = slidergroup.getChildByName(`slidericon`);
            if(view._isbatch){
                //rabbitchocmidlight
            }
            view.showHitEffect(data.rewards);
        }
        else{
            view._isPlay = false;
        }
    }


    private freshView():void{
        let view = this;
        view._numTxt.text = view.vo.getChoclateNum().toString();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._numTxt, view._resbg, [0,0]);
        //进度条
        if(view.vo.getpublicRedhot3()) {
            App.CommonUtil.addIconToBDOC(view._boxRewardImg);
            App.CommonUtil.addIconToBDOC(view._rewardbtn);
			// this._boxRewardImg.setRes("acwealthcomingview_box_2")
		}
		else{
            App.CommonUtil.removeIconFromBDOC(view._boxRewardImg);
            App.CommonUtil.removeIconFromBDOC(view._rewardbtn);
			// this._boxRewardImg.setRes("acwealthcomingview_box_1")
        }
        //充值奖励 任务奖励
        if(view.vo.getpublicRedhot1() || view.vo.getpublicRedhot2()) {
			App.CommonUtil.addIconToBDOC(view._shopbtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._shopbtn);
		}
        //好感度
        view._curLuckyTxt.text = view.vo.getLuckyProgress().toString();
        view._curLuckyTxt.x = view._numDescTF.x + view._numDescTF.width / 2 - view._curLuckyTxt.width / 2;
        //数字显示
        let next = view.cfg.getTotalProgress();
        let progressstr = view.vo.getLuckyProgress() + "/" + next;
        if(view.vo.getLuckyProgress() >= view.cfg.getTotalProgress()){
            progressstr = LanguageManager.getlocal(`acrabbitcomingtip17-${view.code}`);
        }
		view._progressTF.text = progressstr;
        view._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 27);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._progressTFBg, this._progressTF, [0,-2]);
        this.refreshBanger(this._startPercent);
        //按钮
        view._numTxt.text = view.vo.getChoclateNum().toString();
        view._numImg.setRes(App.CommonUtil.getResByCode(`rabitplay${view.vo.isFree() ? `3` : (view.vo.getChoclateNum() < 10 ? 1 : 2)}`, view.code));

        view._getOneBtn.setBtnBitMap(`rabitplayiconstate${view.vo.getChoclateNum()?2:1}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._getOneBtn,view._numImg,[0,view._numImg.height-40]);
        let tmpy = view._getOneBtn.y;
        egret.Tween.removeTweens(view._getOneBtn);
        if(view.vo.getChoclateNum()){
            egret.Tween.get(view._getOneBtn, {loop : true}).to({rotation : 15, y : tmpy - 5}, 50).to({rotation : 0, y : tmpy - 10}, 50).to({rotation : -15, y : tmpy - 15}, 50).to({rotation : 0, y : tmpy - 20}, 50).to({rotation : 15, y : tmpy - 15}, 50).to({rotation : 0, y : tmpy - 10}, 50).to({rotation : -15, y : tmpy - 5}, 50).to({rotation : 0, y : tmpy}, 50).wait(800);
        }
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon2, costNumTxt2, [costNumTxt2.width + 5,0]);
    }

    private sliderTween():void{
        let view = this;
        let slidergroup = <BaseDisplayObjectContainer>view.container.getChildByName(`slidergroup`);
        let sliderbg = slidergroup.getChildByName(`sliderbg`);
        let slidericon = slidergroup.getChildByName(`slidericon`);
        egret.Tween.removeTweens(slidericon);
        slidericon.x = 0;
        egret.Tween.get(slidericon, {loop : true}).to({alpha : 1, x : 0},100).to({x : sliderbg.width - slidericon.width}, 1000).call(()=>{
            slidericon.alpha = 0;
            slidericon.x = -slidericon.width/2;
        },view);
    }

    /**初始化鞭炮相关 */
	private initBanger(){
        let view = this;
		for (let i = 0; i < this._bangerInfo.length; i++) {
            this._bangerContainer.removeChild(this._bangerInfo[i].bangerBM);
            this._bangerContainer.removeChild(this._bangerInfo[i].bangerEff);
            
            this._bangerInfo[i].bangerBM.dispose();
            this._bangerInfo[i].bangerEff.dispose();
		}
		this._bangerInfo.length = 0;
        let procsscfg = view.cfg.achievement;
        let v = view.cfg.getTotalProgress();
        let arr = Number(view.getUiCode()) == 3 ? [3,6,8,9] : [3,4,5,6];
        for(let k = 0; k < arr.length; ++ k){
            let i = arr[k];
            // if(Number(i) == procsscfg.length - 1){

            // }
            let value = procsscfg[i].needNum;
			let p = value / v;
			let bangerBM = BaseBitmap.create(App.CommonUtil.getResByCode(`rabitprogressbox2`, view.getUiCode()));
			bangerBM.anchorOffsetX = bangerBM.width / 2;
			bangerBM.anchorOffsetY = bangerBM.height / 2;
			bangerBM.setPosition(this._progressBar.x + this._progressBar.width * this._maxLength * p, this._progressBar.y + this._progressBar.height / 2);
			this._bangerContainer.addChild(bangerBM);
			bangerBM.addTouchTap(() => {
                if(view._isPlay){
                    return;
                }
                //奖励预览
                ViewController.getInstance().openView(ViewConst.POPUP.ACRABBITCOMINGREWARDPOPUPVIEW3, {
                    aid: this.aid, 
                    code: this.code, 
                    id: Number(i)
                });
            }, this);
            
            let eff = ComponentManager.getCustomMovieClip(`rabbitboxeff`, 12);
            eff.width = 77;
            eff.height = 79;
            eff.blendMode = egret.BlendMode.ADD;
            eff.anchorOffsetX = eff.width / 2;
            eff.anchorOffsetY = eff.height / 2;
            eff.playWithTime(-1);
            this._bangerContainer.addChild(eff);
            eff.visible = false;
            eff.setPosition(bangerBM.x-2, bangerBM.y-2);

			let isPlayAni: boolean = view.vo.getLuckyProgress() >= value ? false : true;
			this._bangerInfo.push({id: String(i), bangerBM: bangerBM, value: procsscfg[i].needNum, isPlayAni: isPlayAni, percent: Math.round(this._maxLength * p * 1000), bangerEff : eff});
        }
    }
    
	private refreshBangerHandele() {
		this.refreshBanger(this._startPercent)
    }
    
	/**刷新 鞭炮 */
	private refreshBanger(percent: number) {
        let view = this;
		let percentTmp = Math.round(percent * 1000)
		for (let i = 0; i < this._bangerInfo.length; i++) {
            this._bangerInfo[i].bangerEff.visible = false;
			if (percentTmp >= this._bangerInfo[i].percent){
				if (this.vo.isGetJinduAward(this._bangerInfo[i].id)) {
					this._bangerInfo[i].bangerBM.setRes(App.CommonUtil.getResByCode(`rabitprogressbox3`, view.getUiCode()));
				}
				else {
                    this._bangerInfo[i].bangerBM.setRes(App.CommonUtil.getResByCode(`rabitprogressbox1`, view.getUiCode()));
                    this._bangerInfo[i].bangerEff.visible = true;
				}

				if (this._bangerInfo[i].isPlayAni) {
					this._bangerInfo[i].isPlayAni = false;
					//播放动画
					this.playBangerAni(this._bangerInfo[i].bangerBM, this._bangerInfo[i].bangerBM.x, this._bangerInfo[i].bangerBM.y, this._boxRewardImg.x, this._boxRewardImg.y - this._boxRewardImg.height / 2)
				}
			}
			else {
				this._bangerInfo[i].bangerBM.setRes(App.CommonUtil.getResByCode(`rabitprogressbox2`, view.getUiCode()));
			}
		}
    }
    
    /**鞭炮的动画 */
	private playBangerAni(bangerBM: BaseBitmap, startPosX: number, startPosY: number, endPosX: number, endPosY: number) {
        //bangerBM.setVisible(false);
        let boomEffect = ComponentManager.getCustomMovieClip("boxboomeffect", 8, 70);
        boomEffect.anchorOffsetX = 65;
        boomEffect.anchorOffsetY = 60;
        let boom = BaseBitmap.create(`boxrewardfly-1`);

		boomEffect.setScale(1.25);
		boom.setScale(1.25);
		boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2-15);
		this.addChildToContainer(boomEffect);
		boomEffect.playWithTime(1);
		boomEffect.setEndCallBack(() => {
			this.container.removeChild(boomEffect);
			boomEffect.dispose();
			this._lightBall.setPosition(startPosX, startPosY);
			this._lightBall.alpha = 1;
			this._lightBall.setScale(0.1);
			this._lightBall.rotation = 0;
			let distanceX = endPosX - startPosX;
			let distanceY = endPosY - startPosY;
			egret.Tween.get(this._lightBall).to({
				rotation: 360 * 0.14,
				scaleX: 0.8,
				scaleY: 0.8,
				x: startPosX + distanceX * 0.3,
				y: startPosY + distanceY * 0.3
			}, 140).to({
				rotation: 360 * 0.54,
				scaleX: 1,
				scaleY: 1,
				x: startPosX + distanceX * 1,
				y: startPosY + distanceY * 1
			}, 400).call(() => {
				if (this.vo.getpublicRedhot3()) {
                    App.CommonUtil.addIconToBDOC(this._boxRewardImg);
					// this._boxRewardImg.setRes("acwealthcomingview_box_2")

				}
				else {
                    App.CommonUtil.removeIconFromBDOC(this._boxRewardImg);
					// this._boxRewardImg.setRes("acwealthcomingview_box_1")
				}
				this._boxRewardImg.setScale(1.1);
				this._boxLightBM.setScale(1.1);
				this._boxLightBM.alpha = 1;
				egret.Tween.get(this._boxRewardImg).to({
					scaleX: 1,
					scaleY: 1,
				}, 750).call(() => {
					if (this.vo.getpublicRedhot3()) {
                        App.CommonUtil.addIconToBDOC(this._boxRewardImg);
					}
					else {
                        App.CommonUtil.removeIconFromBDOC(this._boxRewardImg);
                    }
					egret.Tween.removeTweens(this._boxRewardImg);
					// bangerBM.setVisible(true);
					let startPercentTmp = Math.round(this._startPercent * 1000);
					let maxLengthTmp = Math.round(this._maxLength * 1000);
					console.log("startPercentTmp:  " + startPercentTmp);
					console.log("maxLengthTmp:  " + maxLengthTmp);
				}, this);
				egret.Tween.get(this._boxLightBM).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 0,
				}, 750).call(() => {
					egret.Tween.removeTweens(this._boxLightBM);
				}, this);
			}, this).to({
				scaleX: 1.3,
				scaleY: 1,
				rotation: 360 * 1,
				alpha: 0,
			}, 460).call(() => {
				egret.Tween.removeTweens(this._lightBall);
			}, this);

		}, this);
	}

	/**
	 * 进度条的动画
	 */
	private playProgressBarAni(startPercent: number, endPercent: number, speed: number) {
		this._isPlay = true;
		let vo = <AcWealthComingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.WealthComingCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		//每次初始化
		this._progressBar.setPercentage(startPercent);
		egret.Tween.removeTweens(this._progressBar);
		this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y);
		this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y + this._progressBar.height / 2);

		let startTemp = Math.round(startPercent * 1000);
		let endTemp = Math.round(endPercent * 1000);
		let maxTemp = Math.round(this._maxLength * 1000);
		let everyTimeValue = speed;
		let op = true;
		egret.Tween.get(this._progressBar, { loop: true }).wait(0.1).call(() => {
			this._progressLight.setVisible(true);
			if (op) {
				//增量动画
				startPercent += everyTimeValue;
				this.refreshBanger(startPercent);
				startTemp = Math.round(startPercent * 1000);
				if (startTemp > endTemp) {
					egret.Tween.removeTweens(this._progressBar);
					this._progressLight.setVisible(false);
					if (startTemp > maxTemp) {
                        this._isPlay = false;
						egret.Tween.removeTweens(this._progressBar);
						this._progressLight.setVisible(false);
						return;
					}
					else {
						this._isPlay = false;
					}
					return;
				}
			}
			if (startTemp > maxTemp) {
				this.refreshBanger(startPercent);
				egret.Tween.removeTweens(this._progressBar);
				this._progressLight.setVisible(false);
				this._isPlay = false;
				return;
			}
			this.refreshBanger(startPercent);
			this._progressBar.setPercentage(startPercent);
			this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y);
			this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y + this._progressBar.height / 2);
            this._startPercent = startPercent;
            this._isPlay = false;
		}, this)
    }
    
    public hide():void{
        let view = this;
        if(view._isPlay){
            return;
        }
        super.hide();
    }

    public tick():void{
        let view = this;
        if(view._cdText){
            let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
            view._cdText.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
            view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
            view._cdText.x = view._timebg.x+(view._timebg.width-view._cdText.width)*0.5;
        }
        // if(view.vo.getLuckyCoin() >= view.cfg.autoDraw){
        //     view._getAllBtn.visible = true;
        // }
        // else{
        //     view._getAllBtn.visible = false;
        // }
        // if(view.vo.isGetJinduAward(view.cfg.achievement.length - 1)){
        //     if(view._progressBubbleGroup){
        //         view._progressBubbleGroup.alpha = 0;
        //         egret.Tween.removeTweens(view._progressBubbleGroup);
        //         view._progressBubbleGroup.dispose();
        //         view._progressBubbleGroup = null;
        //     }
        // }
    }
    /** 
     * 关闭释放
    */
    public dispose():void{   
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,view.freshView,view); 
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_RABBIT_CHOU,view.pickCallBack,view);
        
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 
        view._timebg = null;
        view._cdText = null; 
        view._getOneBtn = null;
        view._startPercent = 0;
        view._maxLength = 1;
        view._curLuckyTxt = null; 
        view._boxRewardImg = null;
        view._boxLightBM = null;
        view._lightBall = null;
        view._progressBg = null;
        view._progressTF = null; 
        view._progressBM = null;
        view._progressLight = null;
        /**鞭炮的 Container*/
        view._bangerContainer.dispose()
        view._bangerContainer = null;
        view._bangerInfo = [];
        if(view._progressBubbleGroup){
            egret.Tween.removeTweens(view._progressBubbleGroup);
            view._progressBubbleGroup.dispose();
            view._progressBubbleGroup = null;
        }
        view._numDescTF = null;
        view._numTxt = null;
        view._resbg = null;
        view._shopbtn = null;
        view._isbatch = false;
        view._rewardbtn = null;
        view._rabbitDragon = null;
        // private _log: any  null;
        // private _loopTopBg: BaseBitmap = null;
        // private _isSecond: boolean = false;
        // private _isPlay: boolean = false;
        super.dispose();
    }
}