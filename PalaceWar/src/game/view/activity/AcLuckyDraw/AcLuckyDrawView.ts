/*
author : qianjun
desc : 幸运翻牌活动
*/
class AcLuckyDrawView extends AcCommonView{
    private _cdText : BaseTextField = null; 
    private _chargeBtn : BaseButton = null;
    private _getOneBtn : BaseButton = null;
    private _getAllBtn : BaseButton = null;
    private _oneBtnGroup : BaseDisplayObjectContainer = null;
    private _progressBubbleGroup : BaseDisplayObjectContainer = null;
    private _bottomBg : BaseBitmap = null;
    private _progressBar : ProgressBar = null;
    private _startPercent = 0;
    private _maxLength : number = 1;
    private _curLuckyTxt : BaseTextField = null; 
    private _numDescTF : BaseTextField = null;
    private _boxRewardImg : BaseBitmap = null;
    private _boxLightBM: BaseBitmap = null;
    private _lightBall: BaseBitmap = null;
    private _progressBg: BaseBitmap = null;
    private _progressTF : BaseTextField = null; 
    private _progressBM: BaseBitmap = null;
    private _progressLight: BaseBitmap = null;
    /**鞭炮的 Container*/
	private _bangerContainer: BaseDisplayObjectContainer = null;
	private _bangerInfo: { id: string, bangerBM: BaseBitmap, value: number, isPlayAni: boolean, percent: number }[] = [];
	private _log: any = null;
	private _loopTopBg: BaseBitmap = null;
	private _isSecond: boolean = false;
    private _isPlay: boolean = false;
    /**红点 */
    private _redDot: BaseBitmap = null;
    private _midBtnGroup : BaseDisplayObjectContainer = null;
    private _numTxt : BaseTextField = null;
    private _costNumTxt2 : BaseTextField = null;
    private _freeTxt : BaseTextField = null;
    private timebg:BaseBitmap =null;
    private tip2Text:BaseTextField =null;

    public constructor(){
        super();
    }

    private get cfg() : Config.AcCfg.LuckyDrawCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLuckyDrawVo{
        return <AcLuckyDrawVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected preInit():void
	{
        super.preInit();
        let view = this;
        if (this.getTypecode  == 5)
        {   

            let localkey:string = this.acTivityId+this.vo.et+Api.playerVoApi.getPlayerID();
			let lastTime:number = 0;
			let timeStr:string = LocalStorageManager.get(localkey);
			if (timeStr && timeStr!="")
			{
				lastTime = Number(timeStr);
			}

			if (!App.DateUtil.checkIsToday(lastTime))
			{   
                LocalStorageManager.set(localkey,String(GameData.serverTime));
                ViewController.getInstance().openView(ViewConst.BASE.ACLUCKYDRAWPREVIEW,{
                    aid: view.aid, 
                    code: view.code, 
                });
            }
        }
    }

    /** 
     * 重写区
    */
    protected getRuleInfo():string{
        if (this.getTypecode == 5)
        {
            if (Api.switchVoApi.checkServantRefuseBattle())
            {
                return "acLuckyDrawRuleInfo-5_2";
            }
            else
            {
                return "acLuckyDrawRuleInfo-5";
            }
        }
		return "acLuckyDrawRuleInfo-" + this.code;
    } 
    protected getTitleStr():string{
        return null;
    }
    protected getTitleBgName():string{
        return "luckydrawtitle-" + this.getUiCode();
    }
    protected getProbablyInfo(): string {
		return "acLuckyDrawProbablyInfo-" + this.code;
	}
    protected getBgName() : string{
        return `luckydrawbg-${this.getUiCode()}`
    }

    private get getTypecode():number{
        let code = 1;
        switch(Number(this.code)){
            case 1:
            case 2:
                code = 1;
                break;
            case 5:
            case 6:
                code = 5;
                break;

        }
        return code;
    }

    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        let effectcode = view.getTypecode;
        let arr = [];
        arr.push(`dragonboatitem${code}`);

        if (this.getTypecode == 5)
        {
            arr.push("acwealthcarpview_skineffect");
            arr.push("acnationalday_common_rewardtxt");
            arr.push(`luckdrawawardnamebg-${code}`);
            arr.push(`luckdrawscrollbg1-${code}`);
            arr.push(`luckdrawscrollbg2-${code}`);
            arr.push(`luckdraw_pretitle-${code}`);
        }

        return super.getResourceList().concat([
            `luckydrawwordbg`,`luckydrawbg-${code}`,`luckdrawprogressbg-${code}`,`luckydraw-${code}`,`arena_bottom`,`acwealthcomingview_progresslight`,
            `progress12`,`progress12_bg`,`acwealthcomingview_numbg`,`acwealthcomingview_box_1`,`acwealthcomingview_box_light`,`acwealthcomingview_lightball`,`acwealthcomingview_box_2`,
            `boxboomeffect`,`boxrewardfly-${effectcode}`,`ldcardcircle1-${effectcode}`,`ldcardcircle2-${effectcode}`,`ldcardhighlight-${effectcode}`,`ldcardlight1-${effectcode}`,`ldcardlight2-${effectcode}`,`ldcardscan`,
            `ldcardparticle`,`ldcardparticle_json`,`luckdrawnpc-${code}`
        ]).concat(arr);
    }
    /** 
     * 自定义实现
    */
    public initView(){
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let code = view.code;
        /***顶部信息***/
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM,view.freshView,view); 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWLOTTERY),view.pickCallBack,view);
        

        let topBg = BaseBitmap.create(`luckydrawwordbg`);
        if (this.getTypecode == 5)
        {   
            topBg = BaseLoadBitmap.create(`luckdrawdescbg-5`);
            
        }
        topBg.width = GameConfig.stageWidth;
        view.addChild(topBg);
        //活动日期
        let tip1Text = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawTopTip1-${code}`, [view.vo.acTimeAndHour]), 18);
        view.addChild(tip1Text);
        
        let str = '';
        if(view.vo.isInActivity()){
            str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
        }
        else{
            str = `<font color=0x21eb39>${LanguageManager.getlocal(`acPunishEnd`)}</font>`;
        }
 

        let tip3Text = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawTopTip3-${code}`), 18);
        tip3Text.lineSpacing = 5;
        tip3Text.width = 610;
        view.addChild(tip3Text);

        topBg.height = tip1Text.textHeight  + tip3Text.textHeight + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0,view.titleBg.height - 10]);
        
        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.x = 380;
        timebg.y = (topBg.y+topBg.height - timebg.height)*0.5+97;
        this.timebg = timebg;


        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawTopTip2-${code}`, [str]), 20);
        view.addChild(tip2Text);
        view._cdText = tip2Text;
        tip2Text.x  = timebg.x+25;
        tip2Text.y  = timebg.y+4; 
        timebg.width = tip2Text.width+50;
        if(timebg.width<270)
        {
            timebg.width = 270;
            timebg.x =350;
            tip2Text.x = this.timebg.x+(timebg.width-tip2Text.width )*0.5;
        }
        this.tip2Text =tip2Text;
        
        

        // let tmpH = tip1Text.textHeight + tip2Text.textHeight + tip3Text.textHeight;
        // let tmpY = Math.max(0, topBg.height - tmpH) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topBg, [10,17]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Text, tip1Text, [0,tip1Text.textHeight + 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip3Text, tip1Text, [0,tip1Text.textHeight + 10]);
       
        if (this.getTypecode == 5)
        {   
            //  topBg.height = tip1Text.textHeight  + tip3Text.textHeight + 50;
        //     this.timebg.dispose();
        //     this.c = null;
        //     tip1Text.size = 18;
        //     tip2Text.size = 18;
        //     tip3Text.lineSpacing = 2;
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topBg, [10,12]);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Text, tip1Text, [0,tip1Text.textHeight + 3]);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip3Text, tip2Text, [0,tip2Text.textHeight + 3]);
        }
       
        /***中部展示***/
        //龙骨
        let skinbone = view.cfg.getSkinBone(view.code);
        let boneName = undefined;
        let wife = null;
		if (skinbone) {
			boneName = skinbone + "_ske";
        }
        let obj = {
			1 : 'wife',
			2 : 'servant',
            3 : 'wife',
            4 : 'servant',
            5 : 'wife',
            6 : 'wife',
            7 : 'wife',
            8 : 'wife',
        };
        let isDragon = (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon();
		// isDragon = false;
        if (isDragon){
            wife = App.DragonBonesUtil.getLoadDragonBones(skinbone);
            if(obj[view.code] == `wife`){
                wife.width = 354;
                wife.height = 611;
                wife.setAnchorOffset(-138.5, -610);
                if(PlatformManager.checkIsTextHorizontal())
                {
                    wife.setAnchorOffset(-138.5, -650);
                }
                wife.setScale(0.9);
                if (view.code=="7"||view.code=="8")
                {
                     wife.setScale(0.8);
                }
            }
            else{
                wife.width = 431;
                wife.height = 524;
                wife.setAnchorOffset(wife.width / 2, wife.height / 2);
                wife.scaleX = -1.05;
                wife.scaleY = 1.05;
            }
		}
		else {
            if (this.getTypecode == 5)
            {
                let wcfg = Config.WifeCfg.getWifeCfgById(this.cfg.wife);
                wife = BaseLoadBitmap.create(wcfg.body);
                wife.width = 365;
                wife.height = 486;
            }
            else
            {
                wife = BaseBitmap.create(`luckdrawnpc-${this.getUiCode()}`);
            }
        }
        view.addChild(wife);

        //气泡提示
        let bubbleTopGroup = new BaseDisplayObjectContainer();
        view.addChild(bubbleTopGroup);

        let descBg = BaseBitmap.create('public_9_bg42');
        view.addChild(descBg);
        bubbleTopGroup.addChild(descBg);

        let arrowBM = BaseBitmap.create("public_9_bg13_tail");
        arrowBM.anchorOffsetX = arrowBM.width / 2;
        arrowBM.anchorOffsetY = arrowBM.height / 2;
        bubbleTopGroup.addChild(arrowBM);

        let descTxt =ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawAwardTip1-${view.code}`,[view.cfg.getTotalProgress().toString(), view.cfg.getSkinName(view.code)]), 20, TextFieldConst.COLOR_BLACK);
        descTxt.lineSpacing = 5;
        bubbleTopGroup.addChild(descTxt);

        descBg.width = descTxt.textWidth + 40;
        descBg.height = descTxt.textHeight + 36;
        bubbleTopGroup.width = descBg.width;
        bubbleTopGroup.height = descBg.height + arrowBM.height;
        
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bubbleTopGroup, [0,0], true);
        if(PlatformManager.checkIsThSp())
        {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bubbleTopGroup, [25,0], true);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [arrowBM.anchorOffsetX + 15, arrowBM.anchorOffsetY + descBg.height - 13]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
       
        //egret.Tween.get(bubbleTopGroup,{loop : true}).to({alhpa : })
        /***底部按钮***/
        let bottombg = BaseBitmap.create(`arena_bottom`);
        bottombg.height = 140;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        view.addChild(bottombg);
        view._bottomBg = bottombg;
        
        let oneBtnGroup = new BaseDisplayObjectContainer();
        oneBtnGroup.height = bottombg.height;
        view.addChild(oneBtnGroup);
        view._oneBtnGroup = oneBtnGroup;

        let oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acLuckyDrawBtn${1}-${view.code}`, ()=>{
            if(view._isPlay){
                return;
            }
            if(!view.vo.isInActy()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(view.vo.getLuckyCoin() < 1 && !view.vo.isFree()){
                // ViewController.getInstance().openView(ViewConst.COMMON.ACLUCKYDRAWCHARGEVIEW, {
                //     aid: this.aid, 
                //     code: this.code, 
                // });
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWPOPUPVIEW2, {
                    aid: this.aid, 
                    code: this.code, 
                });
                
                return;
            }
            //翻牌一次
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWLOTTERY,{ 
                activeId : view.vo.aidAndCode, 
                isBatch : 0
            });
        
        }, view);
        view._getOneBtn = oneBtn;
        // oneBtnGroup.width = 151;
        // oneBtnGroup.addChild(oneBtn);
        view.addChild(oneBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, oneBtn, bottombg, [85,32]);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, oneBtn, oneBtnGroup, [0,0], true);

        let costNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawTip4-${code}`, ['1']), 20, TextFieldConst.COLOR_LIGHT_YELLOW)
        oneBtnGroup.addChild(costNumTxt);

        let icon = BaseLoadBitmap.create(`luckdrawluckyicon2-${this.getUiCode()}`);
        icon.width = icon.height = 50;
        oneBtnGroup.addChild(icon);

        let costNum = ComponentManager.getTextField(`1`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        oneBtnGroup.addChild(costNum);

        oneBtnGroup.width = icon.width + costNumTxt.textWidth + costNum.textWidth - 3;
        oneBtnGroup.height = icon.height;
        oneBtnGroup.visible = !view.vo.isFree();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, oneBtnGroup, oneBtn, [0,-oneBtnGroup.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costNumTxt, oneBtnGroup, [0, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, costNumTxt, [costNumTxt.width - 3,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costNum, icon, [50,0]);

        let allBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acLuckyDrawBtn2-${view.code}`, ()=>{
            if(view._isPlay){
                return;
            }
            if(!view.vo.isInActy()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(view.vo.getLuckyCoin() == 0){
                //App.CommonUtil.showTip(LanguageManager.getlocal(`acLuckyDrawTip1-${view.code}`));
                // ViewController.getInstance().openView(ViewConst.COMMON.ACLUCKYDRAWCHARGEVIEW, {
                //     aid: this.aid, 
                //     code: this.code, 
                // });  
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWPOPUPVIEW2, {
                    aid: this.aid, 
                    code: this.code, 
                });
                return;
            }
            // if(view.vo.getLuckyCoin() < view.cfg.autoDraw){
            //     App.CommonUtil.showTip(LanguageManager.getlocal(`acLuckyDrawTip1-${view.code}`));
            //     return;
            // }
            //一键翻牌
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWLOTTERY,{ 
                activeId : view.vo.aidAndCode, 
                isBatch : view.vo.getLuckyCoin() == 1 ? 0 : 1
            });            
            //view.pickCallBack();
        }, view);
        view._getAllBtn = allBtn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, allBtn, bottombg, [85,32]);
        view.addChild(allBtn);

        let icon2 = BaseLoadBitmap.create(`luckdrawluckyicon2-${this.getUiCode()}`);
        icon2.width = icon2.height = 50;
        icon2.name = `itemicon2`;
        view.addChild(icon2);

        let costTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawTip4-${code}`, [String(Math.min(10, view.vo.getLuckyCoin()))]), 20, TextFieldConst.COLOR_LIGHT_YELLOW)
        view.addChild(costTxt2);

        let costNumTxt2 = ComponentManager.getTextField(String(Math.min(10, Math.max(view.vo.getLuckyCoin(),1))), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(costNumTxt2);
        view._costNumTxt2 = costNumTxt2;

        let tmpX2 = (allBtn.width - icon2.width - costNumTxt2.textWidth - costTxt2.textWidth + 3) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costTxt2, allBtn, [tmpX2, -costTxt2.height-13]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon2, costTxt2, [costTxt2.width - 3,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costNumTxt2, icon2, [50,0]);

        let freeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`sysFreeDesc`), 20, TextFieldConst.COLOR_LIGHT_YELLOW)
        view.addChild(freeTxt);
        freeTxt.visible = view.vo.isFree();
        view._freeTxt = freeTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, freeTxt, oneBtn, [0, -freeTxt.height-10]);
        // if(view.vo.getLuckyCoin() >= view.cfg.autoDraw){
        //     allBtn.visible = true;
        // }
        // else{
        //     allBtn.visible = false;
        // }
        /***底部进度***/
        let progressbg = BaseBitmap.create(`luckdrawprogressbg-${view.getUiCode()}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbg, bottombg, [0,-progressbg.height]);
        view.addChild(progressbg);
        view._progressBg = progressbg;

        if(isDragon){
            if(obj[view.code] == `wife`){
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, progressbg, [0, progressbg.height]);
            }
            else{
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, progressbg, [-80, wife.height / 2]);
            }
        }
        else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, progressbg, [0, progressbg.height]);
        }
        
        //查看按钮

        if (this.getTypecode == 5)
        {
            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
			// this._effect.setScale(2);
			let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
			skinTxtEffect.setPosition(topBg.x + 130 - skinTxtEffectBM.width / 2, progressbg.y-30 - skinTxtEffectBM.height / 2 );
			skinTxtEffect.blendMode = egret.BlendMode.ADD;
			this.addChild(skinTxtEffect);
			skinTxtEffect.playWithTime(-1);

			let skinTxt = BaseBitmap.create("acnationalday_common_rewardtxt");
			skinTxt.anchorOffsetX = skinTxt.width / 2;
			skinTxt.anchorOffsetY = skinTxt.height / 2;
			skinTxt.setPosition(topBg.x + 130, progressbg.y-30);
            this.addChild(skinTxt);
            skinTxt.name = "skinTxt";
			egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


			let skinTxteffect = BaseBitmap.create("acnationalday_common_rewardtxt");
			skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
			skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
			skinTxteffect.setPosition(topBg.x + 130, progressbg.y-30);
			this.addChild(skinTxteffect);
			skinTxteffect.blendMode = egret.BlendMode.ADD;
			skinTxteffect.alpha = 0;
			egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
			
			//透明点击区域
			let touchPos = BaseBitmap.create("public_alphabg");
			touchPos.width = 180;
			touchPos.height = 120;
			touchPos.setPosition(topBg.x, progressbg.y-120);
            touchPos.name = "touch";
			view.addChild(touchPos);
			touchPos.addTouchTap(() => {
				let servantSkinId = this.cfg.servant;
                let wifeId = this.cfg.wife;

                let servantTopMsg = LanguageManager.getlocal("acLuckyDrawServantTopInfo-"+this.getTypecode,[String(this.cfg.getServantNeed())]);
                let wifeTopMsg = LanguageManager.getlocal("acLuckyDrawWifeTopInfo-"+this.getTypecode,[String(this.cfg.getWifeNeed())]);
                let servantBg = "skin_detailbg1";
                let wifeBg = null;//"acthrowstone_wife_preview_bg";
                // let data = [
                //     {id:""+wifeId, type:"wife", topMsg:wifeTopMsg, bgName:wifeBg,scale:0.6},
                //     {id:""+servantSkinId, type:"servant", topMsg:servantTopMsg, bgName:servantBg,scale:0.8},
                // ];
                // ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONCLOTHESPOPUPVIEW, data);
                let servantType = Config.ServantCfg.formatRewardItemVoStr(servantSkinId);
                let wifeType = Config.WifeCfg.formatRewardItemVoStr(wifeId);
                let data = {data:[
                    {idType:wifeType, topMsg:wifeTopMsg, bgName:wifeBg, scale:0.6},
                    {idType:servantType, topMsg:servantTopMsg, bgName:servantBg, scale:0.8}
                ]};
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
			}, ViewController);
        }
        else
        {
            let ckBtn = ComponentManager.getButton(`luckydrawckan-${this.getUiCode()}`, '', ()=>{
                if(view._isPlay){
                    return;
                }
                //查看奖励展示
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWSKINPOPUPVIEW,{
                    aid : view.aid,
                    code : view.code
                });
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, ckBtn, progressbg, [5, -ckBtn.height-5]);
            view.addChild(ckBtn);
        }



        //次数this._bg
		let numbg = BaseBitmap.create("acwealthcomingview_numbg");
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numbg, progressbg, [12,0]);
        view.addChild(numbg);

        //进度条
		let progressbar = ComponentManager.getProgressBar("progress12", "progress12_bg", 450);	
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressbar, progressbg, [numbg.width,0]);
        let v = view.cfg.getTotalProgress();
        view._startPercent = Math.min(1,view.vo.getLuckyProgress() / v);//this._maxLength * view.vo.getLuckyProgress() / cfg.luckyProcess;
        progressbar.setPercentage(view._startPercent);
        view._progressBar = progressbar;
        view.addChild(progressbar);

   
        
        //财运TF
		let numDescTF = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawLucky-${code}`), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		if(PlatformManager.checkIsEnLang())
		{
			numDescTF.size = 16;
		}
		numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 28);
        view.addChild(numDescTF);
        view._numDescTF = numDescTF;
        //数量TF
		view._curLuckyTxt = ComponentManager.getTextField(view.vo.getLuckyProgress().toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		view._curLuckyTxt.width = 60;
		view._curLuckyTxt.textAlign = egret.HorizontalAlign.CENTER;
		view._curLuckyTxt.setPosition(numDescTF.x + numDescTF.width / 2 - view._curLuckyTxt.width / 2, numDescTF.y + numDescTF.height + 2);
        view.addChild(view._curLuckyTxt);
        //奖励宝箱
		this._boxRewardImg = BaseBitmap.create("acwealthcomingview_box_1");
		this._boxRewardImg.anchorOffsetX = this._boxRewardImg.width / 2;
		this._boxRewardImg.anchorOffsetY = this._boxRewardImg.height;
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this._boxRewardImg, progressbg, [12,-8]);
		this.addChild(this._boxRewardImg);
		this._boxRewardImg.addTouchTap(() => {
            if(view._isPlay){
                return;
            }
			// ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWREWARDPOPUPVIEW, {
            //     aid: this.aid, 
            //     code: this.code, 
            // });
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWPOPUPVIEW, {
                aid: this.aid, 
                code: this.code, 
            });
        }, this);
        
		//宝箱光 584 816  582.5 810
		this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
		this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
		this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxRewardImg.width / 2 - 2 + 3;
		this._boxLightBM.setPosition(this._boxRewardImg.x, this._boxRewardImg.y);
		this.addChild(this._boxLightBM);
        this._boxLightBM.alpha = 0;

        this._redDot = BaseBitmap.create("public_dot2");
		this._redDot.setPosition(this._boxRewardImg.x + this._boxRewardImg.width / 2 - this._redDot.width / 2, this._boxRewardImg.y - this._boxRewardImg.height + this._redDot.height / 2)
		this.addChild(this._redDot);
		if (view.vo.getpublicRedhot3()) {
			this._boxRewardImg.setRes("acwealthcomingview_box_2")
			this._redDot.visible = true;
		}
		else {
			this._boxRewardImg.setRes("acwealthcomingview_box_1")
			this._redDot.visible = false;
		}
        //文字
		let boxWordBM = BaseBitmap.create(`luckydrawrewardword-${view.getUiCode()}`)
		boxWordBM.setPosition(this._boxRewardImg.x - boxWordBM.width / 2, this._boxRewardImg.y - boxWordBM.height / 2);
        this.addChild(boxWordBM);

        this._lightBall = BaseBitmap.create("acwealthcomingview_lightball")
		this._lightBall.anchorOffsetX = this._lightBall.width / 2;
        this._lightBall.anchorOffsetY = this._lightBall.height / 2;
        this._lightBall.blendMode = egret.BlendMode.ADD;
		this.addChild(this._lightBall);
        this._lightBall.alpha = 0;
        //进度文本
        let curJindu = view.vo.getCurjindu();
        let next = view.cfg.getTotalProgress();
        let progressstr = view.vo.getLuckyProgress() + "/" + next;
        if(view.vo.getLuckyProgress() >= view.cfg.getTotalProgress()){
            progressstr = LanguageManager.getlocal(`acLuckyDrawTip3-${code}`);
        }
		this._progressTF = ComponentManager.getTextField(progressstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 7);
		this.addChild(this._progressTF);
        
        this._progressBM = BaseBitmap.create(`luckydrawslider-${this.getUiCode()}`);
		this._progressBM.anchorOffsetX = this._progressBM.width / 2;
		this._progressBM.anchorOffsetY = this._progressBM.height;
		this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y);
        this.addChild(this._progressBM);
        
        this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
		this._progressLight.anchorOffsetX = this._progressLight.width;
		this._progressLight.anchorOffsetY = this._progressLight.height / 2;
		this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y + this._progressBar.height / 2);
		this.addChild(this._progressLight);
        this._progressLight.setVisible(false);

        //按钮
        let midBtnGroup = new BaseDisplayObjectContainer();
        midBtnGroup.width = 401;
        midBtnGroup.height = 350;
        view.addChild(midBtnGroup);
        view._midBtnGroup = midBtnGroup;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, midBtnGroup, topBg, [10, (progressbg.y - topBg.y - topBg.height - midBtnGroup.height)/2+topBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bubbleTopGroup, topBg, [140, topBg.height + 7]);
        bubbleTopGroup.y = midBtnGroup.y - bubbleTopGroup.height + 10;
        midBtnGroup.addTouchTap(()=>{
            if(view._isPlay){
                return;
            }
            //公告面板
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWCARDPOOLVIEW, {
                aid : view.aid, 
                code : view.code,
            });
        }, view);
        for(let i = 0; i < view.cfg.drawTimes.length; ++ i){
            let btnGroup = new BaseDisplayObjectContainer();
            midBtnGroup.addChild(btnGroup);
            let btn = BaseBitmap.create(`luckydrawcard3-${this.getUiCode()}`);
            btn.name = `midBtn${i}`;
            btnGroup.width = btn.width;
            btnGroup.height = btn.height;
            btnGroup.anchorOffsetX = btnGroup.width / 2;
            btnGroup.anchorOffsetY = btnGroup.height / 2;
            btnGroup.x = (i % 3) * (btnGroup.width + 10) + btnGroup.anchorOffsetX;
            btnGroup.y = Math.floor(i / 3) * (btnGroup.height) + btnGroup.anchorOffsetY;
            btnGroup.name = `midBtnGroup${i}`;
            btnGroup.addChild(btn);
        }

        //幸运币数字
        let numBg = BaseBitmap.create(`luckydrawiconbg-${this.getUiCode()}`);
        view.addChild(numBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numBg, midBtnGroup, [0,midBtnGroup.height + ((progressbg.y - midBtnGroup.y - midBtnGroup.height - numBg.height) / 2)]);
        
        let numTxt = ComponentManager.getTextField(view.vo.getLuckyCoin().toString(), 20);
        view.addChild(numTxt);
        view._numTxt = numTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numBg);

        let icon3 = BaseLoadBitmap.create(`luckdrawluckyicon2-${this.getUiCode()}`);
        icon3.width = icon3.height = 50;
        view.addChild(icon3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon3, numBg, [65,0]);

        let rechargeBtn = ComponentManager.getButton(`mainui_btn1`, ``, ()=>{
            if(view._isPlay){
                return;
            }
            //打开充值
            // ViewController.getInstance().openView(ViewConst.COMMON.ACLUCKYDRAWCHARGEVIEW, {
            //     aid: this.aid, 
            //     code: this.code, 
            // });
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWPOPUPVIEW2, {
                aid: this.aid, 
                code: this.code, 
            });

        }, view);
        rechargeBtn.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rechargeBtn, numBg, [70,0]);
        if(view.vo.getpublicRedhot2()){
            App.CommonUtil.addIconToBDOC(rechargeBtn);
            let reddot = rechargeBtn.getChildByName(`reddot`);
            if(reddot){
                reddot.x = 25;
                reddot.y = -10;
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(rechargeBtn);
        }
        view._chargeBtn = rechargeBtn;
        view.addChild(rechargeBtn);

        this._bangerContainer = new BaseDisplayObjectContainer();
		this.addChild(this._bangerContainer);
		this.initBanger();
        this.refreshBanger(this._startPercent);
        view.setChildIndex(view.titleBg, 9999);
        view.setChildIndex(view.closeBtn, 9999);
        view.setChildIndex(view._ruleBtn, 9999)
        this.tick();
    }

    private pickCallBack(evt : egret.Event):void{
        let view = this;
        //物品奖励
        let data = evt.data.data.data;
        if(data){
            if(data.isBatch){
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWRESULTVIEW, {
                    aid: view.aid, 
                    code: view.code, 
                    batchList : data.batchList,
                    o : view,
                    f : ()=>{
                        let endPercent = Math.min(1,view.vo.getLuckyProgress() / view.cfg.getTotalProgress());
                        view.playProgressBarAni(view._startPercent, endPercent, 0.005);
                    },
                });
            }
            else{
                view._isPlay = true;
                let length = data.showList.length;
                let getAll = length == 6 && (data.showList[length - 1][1] == data.showList[0][1]);
                view.cardMovie(data.showList, 0, getAll, data.rewards);//App.MathUtil.getRandom(1,6)
            }
        }
        else{

        }
      
    }

    /** 
     * 卡牌翻牌动画 card 1红 2绿  special 高级卡牌特效
    */
    private cardMovie(data : any, btnIdx : number, allGet : boolean, rewards : string):void{
        let view = this;
        let card = data[btnIdx][1] + 1;
        let endIdx = data.length - 1;
        let reward = data[btnIdx][0];
        let itemvo : any = GameData.formatRewardItem(reward)[0];
        
        let btnGroup = <BaseDisplayObjectContainer>view._midBtnGroup.getChildByName(`midBtnGroup${btnIdx}`);
        let btn = <BaseBitmap>btnGroup.getChildByName(`midBtn${btnIdx}`);
        let rewardArr = GameData.getRewardItemIcons(reward);
        let itemIcon = rewardArr[0];
        itemIcon.setScale(0.4);
        itemIcon.alpha = 0;
        itemIcon.x = 72;
        itemIcon.y = 120;
        btnGroup.addChild(itemIcon);
        itemIcon.name = `itemIcon${btnIdx}`;
        let special = true;
        if(view.cfg.isSpecial(reward)){
            if(!allGet && btnIdx == endIdx){
                special = false;
            }
        }
        else{
            special = false;
        }
        if(special){
            view._midBtnGroup.setChildIndex(btnGroup,9999);
            //光刺
            let cardCircle = BaseBitmap.create(`ldcardcircle${card}-${view.getTypecode}`);
            cardCircle.blendMode = egret.BlendMode.ADD;
            cardCircle.anchorOffsetX = cardCircle.width / 2;
            cardCircle.anchorOffsetY = cardCircle.height / 2;
            cardCircle.setScale(0.45);
            cardCircle.x = 60;
            cardCircle.y = 90;
            btnGroup.addChildAt(cardCircle, 0);

            egret.Tween.get(cardCircle).to({scaleX : 0.93, scaleY : 0.93}, 330).wait(1330).call(()=>{
                egret.Tween.removeTweens(cardCircle);
                btnGroup.removeChild(cardCircle);
                cardCircle = null;
            },view);

            egret.Tween.get(cardCircle).to({rotation : 90}, 1660);
            //聚集
            for(let i = 0; i < 4; ++ i){
                let cardlight = BaseBitmap.create(`ldcardlight${card}-${view.getTypecode}`);
                cardlight.blendMode = egret.BlendMode.ADD;
                cardlight.anchorOffsetX = cardlight.width / 2;
                cardlight.anchorOffsetY = cardlight.height / 2;
                cardlight.alpha = 0;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight, btn);
                btnGroup.addChild(cardlight);
                cardlight.setScale(1.45);

                egret.Tween.get(cardlight).wait(i * 260).to({scaleX : 1, scaleY : 1, alpha : 1}, 400).to({alpha : 0}, 260).call(()=>{
                    egret.Tween.removeTweens(cardlight);
                    btnGroup.removeChild(cardlight);
                    cardlight = null;
                },view);
            }
            let tmpX = btnGroup.x;
            let tmpY = btnGroup.y;
            egret.Tween.get(btnGroup).wait(200)
            .set({x : tmpX - 0.1, y : tmpY + 1.3}).wait(60)
            .set({x : tmpX + 1.6, y : tmpY - 1.3}).wait(60)
            .set({x : tmpX - 2.9, y : tmpY - 0.6}).wait(60)
            .set({x : tmpX, y : tmpY - 0.8}).wait(60)
            .set({x : tmpX + 1.2, y : tmpY - 3.9}).wait(60)
            .set({x : tmpX - 3.1, y : tmpY - 1.1}).wait(60)
            .set({x : tmpX - 1.8, y : tmpY + 1}).wait(60)
            .set({x : tmpX + 0.7, y : tmpY - 1.5}).wait(60)
            .set({x : tmpX - 3.5, y : tmpY - 4.2}).wait(60)
            .set({x : tmpX - 3.3, y : tmpY - 1.3}).wait(60)
            .set({x : tmpX + 1.9, y : tmpY - 2.8}).wait(60)
            .set({x : tmpX - 3, y : tmpY + 0.8}).wait(60)
            .set({x : tmpX - 1.5, y : tmpY + 1}).wait(60)
            .set({x : tmpX + 1.2, y : tmpY - 0.3}).wait(60)
            .set({x : tmpX - 2.3, y : tmpY}).wait(60)
            .set({x : tmpX, y : tmpY}).wait(60)
            .to({scaleX : 0.1, scaleY : 2.5}, 200).
            call(()=>{
                btnGroup.scaleX = -0.1;
                btn.setRes(`luckydrawcard${card}-${view.getUiCode()}`);
                itemIcon.alpha = 1;
            },view).
            to({scaleX : 0.85, scaleY : 0.85}, 130).
            to({scaleX : 1.15, scaleY : 1.15}, 70).
            to({scaleX : 1, scaleY : 1}, 260).wait(btnIdx == endIdx ? 1500 : 840)
            .call(()=>{
                egret.Tween.removeTweens(btnGroup);
                egret.Tween.removeTweens(scanEffect);
                btnGroup.removeChild(scanEffect);
                scanEffect = null;
                if(btnIdx == endIdx){
                    view.endMovie(allGet, endIdx, rewards);
                }
                else{
                    view.cardMovie(data, btnIdx + 1, allGet, rewards);
                }
                
            },view);

            egret.Tween.get(btnGroup).wait(1160).wait(200).to({alpha : 0},10).to({alpha : 1},10);

            //卡牌高亮透明度动画
            let highlight = BaseBitmap.create(`ldcardhighlight-${view.getTypecode}`);
            highlight.blendMode = egret.BlendMode.ADD;
            highlight.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, highlight, btn);
            btnGroup.addChild(highlight);
            egret.Tween.get(highlight).wait(1160).wait(330).set({alpha : 1}).wait(130).to({alpha : 0},330).call(()=>{
                egret.Tween.removeTweens(highlight);
                btnGroup.removeChild(highlight);
                highlight = null;
            }, view);

            //卡牌光晕透明度动画
            let cardbg = BaseBitmap.create(`ldcardlight${card}-${view.getTypecode}`);
            cardbg.blendMode = egret.BlendMode.ADD;
            cardbg.alpha = 0;
            cardbg.name = `ldcardlight${btnIdx}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardbg, btn);
            btnGroup.addChild(cardbg);
            egret.Tween.get(cardbg).wait(1160).wait(330).set({alpha : 1});
            //爆点光刺
            let boomeffect = BaseBitmap.create(`ldcardcircle${card}-${view.getTypecode}`);
            boomeffect.blendMode = egret.BlendMode.ADD;
            boomeffect.anchorOffsetX = boomeffect.width / 2;
            boomeffect.anchorOffsetY = boomeffect.height / 2;
            boomeffect.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boomeffect, btn);
            btnGroup.addChild(boomeffect);
            boomeffect.setScale(1.6);
            egret.Tween.get(boomeffect).wait(1160).wait(330).set({alpha : 1}).to({scaleX : 0, scaleY : 0}, 130).call(()=>{
                egret.Tween.removeTweens(boomeffect);
                btnGroup.removeChild(boomeffect);
                boomeffect = null;
            },view);
            //翻牌时扩散动画
            let cardlight1 = BaseBitmap.create(`ldcardlight${card}-${view.getTypecode}`);
            cardlight1.blendMode = egret.BlendMode.ADD;
            cardlight1.anchorOffsetX = cardlight1.width / 2;
            cardlight1.anchorOffsetY = cardlight1.height / 2;
            cardlight1.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight1, btn);
            btnGroup.addChild(cardlight1);
            cardlight1.setScale(1.08);

            egret.Tween.get(cardlight1).wait(1160).wait(330).to({scaleX : 1.8, scaleY : 1.8}, 200);

            egret.Tween.get(cardlight1).wait(1160).wait(330).set({alpha : 0.8}).to({alpha : 0}, 250).call(()=>{
                egret.Tween.removeTweens(cardlight1);
                btnGroup.removeChild(cardlight1);
                cardlight1 = null;
            },view);

            let cardlight2 = BaseBitmap.create(`ldcardlight${card}-${view.getTypecode}`);
            cardlight2.blendMode = egret.BlendMode.ADD;
            cardlight2.anchorOffsetX = cardlight2.width / 2;
            cardlight2.anchorOffsetY = cardlight2.height / 2;
            cardlight2.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight2, btn);
            btnGroup.addChild(cardlight2);
            cardlight1.setScale(0.85);

            egret.Tween.get(cardlight2).wait(1160).wait(330).to({scaleX : 1.8, scaleY : 1.8}, 330);

            egret.Tween.get(cardlight2).wait(1160).wait(330).set({alpha : 1}).to({alpha : 0}, 400).call(()=>{
                egret.Tween.removeTweens(cardlight2);
                btnGroup.removeChild(cardlight2);
                cardlight2 = null;
            },view);

            //卡牌后面旋转光刺
            let circleeffect = BaseBitmap.create(`ldcardcircle${card}-${view.getTypecode}`);
            circleeffect.blendMode = egret.BlendMode.ADD;
            circleeffect.anchorOffsetX = circleeffect.width / 2;
            circleeffect.anchorOffsetY = circleeffect.height / 2;
            circleeffect.alpha = 0;
            circleeffect.name = `circleeffect1`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect, btn);
            btnGroup.addChildAt(circleeffect,0);
            circleeffect.setScale(1);
            egret.Tween.get(circleeffect).wait(1160).wait(330).set({alpha : 1}).to({rotation : 360}, 18000);

            let circleeffect2 = BaseBitmap.create(`ldcardcircle${card}-${view.getTypecode}`);
            circleeffect2.blendMode = egret.BlendMode.ADD;
            circleeffect2.anchorOffsetX = circleeffect2.width / 2;
            circleeffect2.anchorOffsetY = circleeffect2.height / 2;
            circleeffect2.alpha = 0;
            circleeffect2.name = `circleeffect2`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect2, btn);
            btnGroup.addChildAt(circleeffect2,0);
            circleeffect2.setScale(0.85);
            egret.Tween.get(circleeffect2).wait(1160).wait(330).set({alpha : 1}).to({rotation : -360}, 13000);

            //扫光
            let scanEffect = ComponentManager.getCustomMovieClip("ldcardscan", 8, 60);
            scanEffect.width = 124;
            scanEffect.height = 163;
            scanEffect.anchorOffsetX = scanEffect.width / 2;
            scanEffect.anchorOffsetY = scanEffect.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scanEffect, btn);
            scanEffect.alpha = 0;
            btnGroup.addChild(scanEffect);
            egret.Tween.get(scanEffect).wait(1160).wait(1000).set({alpha : 1}).call(()=>{
                scanEffect.playWithTime(1);
            },view);
            //粒子效果
            let lizi = App.ParticleUtil.getParticle("ldcardparticle");
            lizi.x = -700;
            lizi.y = -250;
            btnGroup.addChild(lizi);
            egret.Tween.get(lizi).wait(1160).wait(330).call(()=>{
                lizi.start();
            },view).wait(300).call(()=>{
                egret.Tween.removeTweens(lizi);
                lizi.stop();
                btnGroup.removeChild(lizi);
                lizi = null;
            },view);
            btnGroup.setChildIndex(itemIcon, 9999);
        }
        else{
             //卡牌背面动画
            egret.Tween.get(btnGroup).
            to({scaleX : 0.1, scaleY : 1.5}, 130).
            call(()=>{
                btnGroup.scaleX = -0.1;
                itemIcon.alpha = 1;
                btn.setRes(`luckydrawcard${card}-${view.getUiCode()}`);
            },view).
            to({scaleX : 0.9, scaleY : 0.9}, 130).
            to({scaleX : 1.03, scaleY : 1.03}, 70).wait(btnIdx == endIdx ? 1000 : 0).
            call(()=>{
                if(btnIdx == endIdx){
                    view.endMovie(allGet, endIdx, rewards);
                }
                else{
                    view.cardMovie(data, btnIdx + 1, allGet, rewards);
                }
            },view).
            to({scaleX : 1, scaleY : 1}, 260);

            egret.Tween.get(btnGroup).wait(130).to({alpha : 0},10).to({alpha : 1},10);

            //卡牌高亮透明度动画
            let highlight = BaseBitmap.create(`ldcardhighlight-${view.getTypecode}`);
            highlight.blendMode = egret.BlendMode.ADD;
            highlight.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, highlight, btn);
            btnGroup.addChild(highlight);
            egret.Tween.get(highlight).wait(260).set({alpha : 1}).to({alpha : 0},330).call(()=>{
                egret.Tween.removeTweens(highlight);
                btnGroup.removeChild(highlight);
                highlight = null;
            }, view);

            //卡牌光晕透明度动画
            let cardbg = BaseBitmap.create(`ldcardlight${card}-${view.getTypecode}`);
            cardbg.blendMode = egret.BlendMode.ADD;
            cardbg.alpha = 0;
            cardbg.name = `ldcardlight${btnIdx}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardbg, btn);
            btnGroup.addChild(cardbg);
            egret.Tween.get(cardbg).wait(260).set({alpha : 1}).wait(330).to({alpha : 0},330).
            call(()=>{
                egret.Tween.removeTweens(cardbg);
                //最后一张卡不同颜色 播放完释放
                // if(btnIdx == endIdx){
                //     btnGroup.removeChild(cardbg);
                //     cardbg = null;
                // }
            },view);
            btnGroup.setChildIndex(itemIcon, 9999);
        }
    }

    private endMovie(allGet : boolean, endIdx : number, reward : string):void{
        let view = this;
        let final = allGet ? endIdx : endIdx - 1;
        for(let i = 0; i <= final; ++ i){
            let midbtnGroup : any = view._midBtnGroup.getChildByName(`midBtnGroup${i}`);
            egret.Tween.get(midbtnGroup).to({scaleX : 1.04, scaleY : 1.04}, 330).to({scaleX : 1, scaleY : 1}, 800).call(()=>{
                egret.Tween.removeTweens(midbtnGroup);
                if(i == final){
                    //移出光晕
                    let cardbg = <BaseBitmap>midbtnGroup.getChildByName(`ldcardlight${i}`);
                    if(cardbg){
                        egret.Tween.removeTweens(cardbg);
                        midbtnGroup.removeChild(cardbg);
                        cardbg = null;
                    }

                    let itemIcon =midbtnGroup.getChildByName(`itemIcon${i}`);
                    midbtnGroup.removeChild(itemIcon);
                    itemIcon = null;

                    //复原卡牌
                    ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWREWARDSHOWVIEW, {
                        rewards : reward, 
                        aid : view.aid, 
                        code : view.code,
                        callobj : view,
                        callback : ()=>{
                            view.resetMidBtn();
                            let endPercent = Math.min(1,view.vo.getLuckyProgress() / view.cfg.getTotalProgress());
                            view.playProgressBarAni(view._startPercent, endPercent, 0.005);
                        }
                    });
                }
            }, view);

            let cardbg = <BaseBitmap>midbtnGroup.getChildByName(`ldcardlight${i}`);
            if(cardbg){
                egret.Tween.get(cardbg).to({alpha : 1},330).to({alpha : 0},800).call(()=>{
                    if(cardbg){
                        egret.Tween.removeTweens(cardbg);
                        midbtnGroup.removeChild(cardbg);
                        cardbg = null;
                    }
                },view);
            }
        }
    }
    
    private resetMidBtn():void{
        let view = this;
        for(let i = 0; i <= 5; ++ i){
            let btnGroup : any = view._midBtnGroup.getChildByName(`midBtnGroup${i}`);
            btnGroup.alpha = 1;
            btnGroup.scaleX = btnGroup.scaleY = 1;
            let tmpBtn = <BaseBitmap>btnGroup.getChildByName(`midBtn${i}`);
            if(tmpBtn){
                tmpBtn.setRes(`luckydrawcard3-${view.getUiCode()}`);
            }
            let lasttemIcon = btnGroup.getChildByName(`itemIcon${i}`);
            if(lasttemIcon){
                btnGroup.removeChild(lasttemIcon);
            }

            let cardbg = <BaseBitmap>btnGroup.getChildByName(`ldcardlight${i}`);
            if(cardbg){
                egret.Tween.removeTweens(cardbg);
                btnGroup.removeChild(cardbg);
                cardbg = null;
            }

            let circleeffect : any = btnGroup.getChildByName(`circleeffect1`);
            if(circleeffect){
                egret.Tween.removeTweens(circleeffect);
                btnGroup.removeChild(circleeffect);
                circleeffect = null;
            }
            let circleeffect2 : any = btnGroup.getChildByName(`circleeffect2`);
            if(circleeffect2){
                egret.Tween.removeTweens(circleeffect2);
                btnGroup.removeChild(circleeffect2);
                circleeffect2 = null;
            }
        }
    }
    private freshView():void{
        let view = this;
        view._numTxt.text = view.vo.getLuckyCoin().toString();
        //进度条
        if (view.vo.getpublicRedhot3()) {
			this._boxRewardImg.setRes("acwealthcomingview_box_2")
			this._redDot.visible = true;
		}
		else {
			this._boxRewardImg.setRes("acwealthcomingview_box_1")
			this._redDot.visible = false;
		}
        //好感度
        view._curLuckyTxt.text = view.vo.getLuckyProgress().toString();
        view._curLuckyTxt.x = view._numDescTF.x + view._numDescTF.width / 2 - view._curLuckyTxt.width / 2;
        //数字显示
        let curJindu = view.vo.getCurjindu();
        let next = view.cfg.getTotalProgress();
        let progressstr = view.vo.getLuckyProgress() + "/" + next;
        if(view.vo.getLuckyProgress() >= view.cfg.getTotalProgress()){
            progressstr = LanguageManager.getlocal(`acLuckyDrawTip3-${view.code}`);
        }
		view._progressTF.text = progressstr;
        view._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 7);
        this.refreshBanger(this._startPercent);
        //按钮
        view._costNumTxt2.text = String(Math.min(10, Math.max(view.vo.getLuckyCoin(),1)));
        
        if(view.vo.getpublicRedhot2()){
            App.CommonUtil.addIconToBDOC(view._chargeBtn);
            let reddot = view._chargeBtn.getChildByName(`reddot`);
            if(reddot){
                reddot.x = 25;
                reddot.y = -10;
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._chargeBtn);
        }
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon2, costNumTxt2, [costNumTxt2.width + 5,0]);
    }

    /**初始化鞭炮相关 */
	private initBanger(){
        let view = this;
		for (let i = 0; i < this._bangerInfo.length; i++) {
			this._bangerContainer.removeChild(this._bangerInfo[i].bangerBM);
			this._bangerInfo[i].bangerBM.dispose();
		}
		this._bangerInfo.length = 0;
        let procsscfg = view.cfg.achievement;
        let v = view.cfg.getTotalProgress();
        for(let i in procsscfg){
            // if(Number(i) == procsscfg.length - 1){

            // }
            let value = procsscfg[i].needNum;
			let p = value / v;
			let bangerBM = BaseBitmap.create(`luckydrawbox2-${view.getUiCode()}`);
			bangerBM.anchorOffsetX = bangerBM.width / 2;
			bangerBM.anchorOffsetY = bangerBM.height / 2;
			bangerBM.setPosition(this._progressBar.x + this._progressBar.width * this._maxLength * p, this._progressBar.y + this._progressBar.height / 2 - 7);
			this._bangerContainer.addChild(bangerBM);
			bangerBM.addTouchTap(() => {
                if(view._isPlay){
                    return;
                }
                //奖励预览
				// ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWREWARDPOPUPVIEW, {
                //     aid: this.aid, 
                //     code: this.code, 
                //     id: Number(i)
                // });
                this.vo.showId = Number(i);
                 ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWPOPUPVIEW, {
                    aid: this.aid, 
                    code: this.code, 
                });
			}, this);
			let isPlayAni: boolean = view.vo.getLuckyProgress() >= value ? false : true;
			this._bangerInfo.push({ id: i, bangerBM: bangerBM, value: procsscfg[i].value, isPlayAni: isPlayAni, percent: Math.round(this._maxLength * p * 1000) });
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
			if (percentTmp >= this._bangerInfo[i].percent) {
				if (this.vo.isGetJinduAward(this._bangerInfo[i].id)) {
					this._bangerInfo[i].bangerBM.setRes(`luckydrawbox3-${view.getUiCode()}`);
				}
				else {
					this._bangerInfo[i].bangerBM.setRes(`luckydrawbox1-${view.getUiCode()}`);
				}

				if (this._bangerInfo[i].isPlayAni) {
					this._bangerInfo[i].isPlayAni = false;
					//播放动画
					this.playBangerAni(this._bangerInfo[i].bangerBM, this._bangerInfo[i].bangerBM.x, this._bangerInfo[i].bangerBM.y, this._boxRewardImg.x, this._boxRewardImg.y - this._boxRewardImg.height / 2)
				}
			}
			else {
				this._bangerInfo[i].bangerBM.setRes(`luckydrawbox2-${view.getUiCode()}`);
			}
		}
    }
    
    /**鞭炮的动画 */
	private playBangerAni(bangerBM: BaseBitmap, startPosX: number, startPosY: number, endPosX: number, endPosY: number) {
        //bangerBM.setVisible(false);
        let boomEffect = ComponentManager.getCustomMovieClip("boxboomeffect", 8, 70);
        boomEffect.anchorOffsetX = 65;
        boomEffect.anchorOffsetY = 60;
        let boom = BaseBitmap.create(`boxrewardfly-${this.getTypecode}`);

		boomEffect.setScale(1.25);
		boom.setScale(1.25);
		boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2);
		this.addChild(boomEffect);
		boomEffect.playWithTime(1);
		boomEffect.setEndCallBack(() => {
			this.removeChild(boomEffect);
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
					this._boxRewardImg.setRes("acwealthcomingview_box_2")

				}
				else {
					this._boxRewardImg.setRes("acwealthcomingview_box_1")
				}
                this._redDot.visible = false;
				this._boxRewardImg.setScale(1.1);
				this._boxLightBM.setScale(1.1);
				this._boxLightBM.alpha = 1;
				egret.Tween.get(this._boxRewardImg).to({
					scaleX: 1,
					scaleY: 1,
				}, 750).call(() => {
					if (this.vo.getpublicRedhot3()) {
						this._redDot.visible = true;
					}
					else {
						this._redDot.visible = false;
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
            let str = '';
            if(view.vo.isInActivity()){
                str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
            }
            else{
                str = `<font color=0x21eb39>${LanguageManager.getlocal(`acPunishEnd`)}</font>`;
            }
            view._cdText.text = LanguageManager.getlocal(`acLuckyDrawTopTip2-${view.code}`, [str]);

            if(this.timebg)
            {
                this.timebg.width = view._cdText.width+50;
                this.timebg.x = 350;
                this.tip2Text.x = this.timebg.x+(this.timebg.width-this._cdText.width)*0.5;
            }
        }

       
        view._freeTxt.visible = view.vo.isFree();
        view._oneBtnGroup.visible = !view.vo.isFree();
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
    protected getUiCode(): string {
		if (this.code == "3") {
			return "1";
		}
        else if(this.code == "4")
        {
            return "2";
        }
        else if(this.code == "6")
        {
            return "5";
        }

		return super.getUiCode();
	}
    /** 
     * 关闭释放
    */
    public dispose():void{   
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM,view.freshView,view); 
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWLOTTERY),view.pickCallBack,view);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 
 
        view._cdText = null; 
        view._chargeBtn = null;
        view._getOneBtn = null;
        view._getAllBtn = null;
        view._oneBtnGroup.dispose();
        view._oneBtnGroup = null;
        view._bottomBg = null;
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
        view._redDot = null;
        view._midBtnGroup.dispose();
        view._midBtnGroup = null;
        if(view._progressBubbleGroup){
            egret.Tween.removeTweens(view._progressBubbleGroup);
            view._progressBubbleGroup.dispose();
            view._progressBubbleGroup = null;
        }
        view._numDescTF = null;
        view._numTxt = null;
        view._costNumTxt2 = null;
        view._freeTxt = null;
        this.tip2Text =null;
        // private _log: any = null;
        // private _loopTopBg: BaseBitmap = null;
        // private _isSecond: boolean = false;
        // private _isPlay: boolean = false;
        super.dispose();
    }
}