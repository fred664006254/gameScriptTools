/*
author : qianjun
desc : 霍去病活动
*/
class AcBeatXiongNuView extends AcCommonView{
    private _timebg : BaseBitmap = null;
    private _cdText : BaseTextField = null; 
    private _getOneBtn : BaseButton = null;
    private _curLuckyTxt : BaseTextField = null; 
    private _isPlay: boolean = false;
    private _rewardbtn : BaseButton = null; 
    private _numTxt : BaseTextField = null;
    private _isbatch = false;
    private _mapGroup : BaseDisplayObjectContainer = null;
    private _freeTxt : BaseTextField = null; 
    private _bubbleTopGroup : BaseDisplayObjectContainer = null;
    private _clickHand : BaseBitmap = null;

    public constructor(){
        super();
    }

    private get cfg() : Config.AcCfg.BeatXiongNuCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBeatXiongNuVo{
        return <AcBeatXiongNuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

    private _posCfg = {
        1 : [
            { "x": 49, "y": 65, scalex: -1, scaley: 1, arrx: 265, arry: 55, rotation : -40},
            { "x": 330, "y": 45, scalex: -1, scaley: 1, arrx: 180, arry: 130, rotation : 20},
            { "x": 427, "y": 185, scalex: 1, scaley: 1, arrx: 40, arry: 155, rotation : -20},
            { "x": 321, "y": 329, scalex: -1, scaley: 1, arrx: 170, arry: 175,rotation : 10},
            { "x": 424, "y": 519, scalex: 1, scaley: 1, arrx: 10, arry: 130,rotation : 0},
        ]
    } 

    /** 
     * 重写区
    */
    protected getRuleInfo():string{
		return App.CommonUtil.getCnByCode(`acbeatxiongnurule`, this.code);
    } 
    protected getRuleInfoParam():string[]{
        let skin = Config.ServantskinCfg.getServantSkinItemById(this.cfg.show);
        let name = ``;
        if(skin){
            name = skin.name;
        }
		return [this.cfg.getGemNeed().toString(), name];
    } 
    protected getTitleStr():string{
        return null;
    }
    protected getTitleBgName():string{
        return App.CommonUtil.getResByCode(`beatxiongnutitle`, this.code);
    }
    protected getProbablyInfo(): string {
		return App.CommonUtil.getCnByCode(`acbeatxiongnuProbablyInfo`, this.code);
    }
    protected getBgName() : string{
        return App.CommonUtil.getResByCode(`beatxiongnubg`, this.code);
    }
    protected getCloseBtnName() : string{
        return App.CommonUtil.getResByCode(`beatxiongnuclosebtn`, this.code);
    }
    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `beatxiongnubg`,`beatxiongnucode1`,`progress7`,`progress7_bg`,`acliangbiographyview_common_acbg`,`acnationalday_common_rewardtxt`,`acwealthcarpview_skineffect1`,`dailytask_box_light`
        ]);
    }

    protected clickRuleBtnHandler(param:any):void
	{
		if(this._isPlay){
            return;
        }
        super.clickRuleBtnHandler(param);
    }
    
	protected clickProbablyBtnHandler(param:any):void
	{
		if(this._isPlay){
            return;
        }
        super.clickProbablyBtnHandler(param);
	}

    /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}
	{
        let key = `${AcConst.AID_BEATXIONGNU}-${this.code}report-${Api.playerVoApi.getPlayerID()}-${this.vo.st}-${App.DateUtil.getWeeTs(GameData.serverTime)}`;
        let storage = LocalStorageManager.get(key);
        if (!storage) {
            LocalStorageManager.set(key, `1`);
            return {title:{key:this.getCnByCode("acbeatxiongnureporttitle", this.code)},msg:{key:this.getCnByCode("acbeatxiongnureportmsg", this.code)}};
        }
        else{
            return null;
        }
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
        let code = view.getUiCode();
        /***顶部信息***/
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,view.freshView,view); 
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_XIONGNU_ATK,view.pickCallBack,view);
        //top背景图
        let topbg = BaseBitmap.create(`acliangbiographyview_common_acbg`);
        topbg.width = GameConfig.stageWidth;
        view.addChildToContainer(topbg);
        
        let timeTxt = ComponentManager.getTextField(view.vo.getAcLocalTime(true), 20);
        timeTxt.lineSpacing = 5;
        view.addChildToContainer(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acbeatxiongnudesc`,view.code), [view.cfg.getGemNeed().toString(),view.cfg.getSkinName(code)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 600;
        tipTxt.lineSpacing = 5;
        view.addChildToContainer(tipTxt);

        topbg.height = timeTxt.textHeight + 5 + tipTxt.textHeight + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.container, [0,-3], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [20,10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0,timeTxt.textHeight + 5]);
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
        let bottombg = BaseBitmap.create(App.CommonUtil.getResByCode(`beatxiongnubottom`, view.code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0,0], true);

        let temp = 0;
        let oneBtn = ComponentManager.getButton(App.CommonUtil.getResByCode(view.vo.getCheerNum() >= 10 ? `beatxiongnubtn2` : `beatxiongnubtn1`, view.code), ``, ()=>{
            if(view._isPlay){
                return;
            }
            if(!view.vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(view.vo.getCheerNum() < 1 && !view.vo.isFree()){
                //确认弹框
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acbeatxiongnutip1`,code)),
					touchMaskClose : true,
					title : `itemUseConstPopupViewTitle`,
					callback : ()=>{
						ViewController.getInstance().openView(ViewConst.POPUP.ACBEATXIONGNUREWARDVIEW,{
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
            let isbatch = view.vo.isFree() ? 0 : (view.vo.getCheerNum() < 10 ? 0 : 1);
            view._isbatch = isbatch == 1;
            NetManager.request(NetRequestConst.REQUEST_XIONGNU_ATK,{ 
                activeId : view.vo.aidAndCode, 
                isTenPlay : isbatch,
            });
        
        }, view, null, 3);
        oneBtn.anchorOffsetX = oneBtn.width / 2;
        oneBtn.anchorOffsetY = oneBtn.height / 2;
        view._getOneBtn = oneBtn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, oneBtn, bottombg, [50,50]);

        let enterclip = ComponentManager.getCustomMovieClip(`threekingdomsentereff`, 10);
        enterclip.width = 286;
        enterclip.height = 73;
        enterclip.anchorOffsetX = enterclip.width / 2;
        enterclip.anchorOffsetY = enterclip.height / 2;
        enterclip.setScale(0.9);
        enterclip.playWithTime(-1);
        enterclip.blendMode = egret.BlendMode.ADD;
        enterclip.setPosition(oneBtn.x,oneBtn.y);
        /***中部展示***/
        //中部底图
        let mapgroup = new BaseDisplayObjectContainer();
        mapgroup.width = view.width;
        view._mapGroup = mapgroup;
        // mapgroup.height = ;
        let maxarr = view.cfg.getProcessNum(code);
        for(let i = 0; i < maxarr.length; ++ i){
            let id = maxarr[i];
            let unit = view.cfg.achievement[id];
            if(unit){
                let poscfg = view._posCfg[code][i]
                let buildGroup = new BaseDisplayObjectContainer();
                buildGroup.name = `buildGroup${id}`;
                mapgroup.addChild(buildGroup);

                let build = BaseBitmap.create(App.CommonUtil.getResByCode(`beatxiongnubuilding${i == 0 ? 4 : 2}`, code));
                build.name = `build`;
                buildGroup.addChild(build);
                build.pixelHitTest = true;
                build.addTouchTap(()=>{
                    if(view._isPlay){
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.POPUP.ACBEATXIONGNUREWARDVIEW2,{
                        aid : view.aid,
                        code : view.code,
                        id : id
                    });
                },view);

                let build_light = BaseBitmap.create(App.CommonUtil.getResByCode(`beatxiongnubuilding${i == 0 ? 4 : 2}_light`, code));
                build_light.name = `build_light`;
                buildGroup.addChild(build_light);

                let arrow = BaseBitmap.create(App.CommonUtil.getResByCode(`beatxiongnuarrow1`, code));
                arrow.anchorOffsetX = arrow.width / 2;
                arrow.anchorOffsetY = arrow.height / 2;
                arrow.name = `arrow`;
                buildGroup.addChild(arrow);

                arrow.scaleX = poscfg.scalex;
                arrow.scaleY = poscfg.scaley;
                arrow.rotation = poscfg.rotation;

                arrow.x = poscfg.arrx;
                arrow.y = poscfg.arry;

                buildGroup.x = poscfg.x;
                buildGroup.y = poscfg.y;
            }
        }

        let progreessFlagGroup = new BaseDisplayObjectContainer();
        progreessFlagGroup.width = 119;
        progreessFlagGroup.height = 114;
        progreessFlagGroup.name = `progreessFlagGroup`;
        mapgroup.addChild(progreessFlagGroup);

        let flag = BaseBitmap.create(App.CommonUtil.getResByCode(`beatxiongnuflag`, code));
        progreessFlagGroup.addChild(flag);
        flag.name = `flag`;

        let processTxt = ComponentManager.getBitmapText(`0%`, TextFieldConst.FONTNAME_ITEMTIP);
        progreessFlagGroup.addChild(processTxt);
        processTxt.name = `processTxt`;

        view._clickHand = BaseBitmap.create("guide_hand");
        view._clickHand.x = 0;
        view._clickHand.y = 0;
        mapgroup.addChild(view._clickHand);
        view._clickHand.visible = false;
        egret.Tween.get(this._clickHand, { loop: true })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
            .to({ scaleX: 1, scaleY: 1 }, 500);

    
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, progreessFlagGroup, mapgroup);

        let scrollview = ComponentManager.getScrollView(mapgroup, new egret.Rectangle(0,0,view.width,oneBtn.y - topbg.y - topbg.height));
        view.addChildToContainer(scrollview);
        scrollview.bounces = false;
        scrollview.verticalScrollPolicy = `off`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, topbg, [0,topbg.height]);
        //龙骨
        view.addChildToContainer(bottombg);
        if(this.cfg.show){
            let skinbone = view.cfg.getSkinBone(view.code);
            let boneName = undefined;
            let wife = null;
            if(skinbone) {
                boneName = skinbone + "_ske";
            }
            let isDragon = (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon();
            if (isDragon){
                wife = App.DragonBonesUtil.getLoadDragonBones(skinbone);
                wife.width = 458;
                wife.height = 508;
                wife.setAnchorOffset(-200, -400);
                // if(PlatformManager.checkIsTextHorizontal())
                // {
                //     wife.setAnchorOffset(-138.5, -650);
                // }
            }
            else{
                let wcfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.show);
                wife = BaseLoadBitmap.create(wcfg.body);
                wife.width = 405;
                wife.height = 467;
            }
            view.container.addChildAt(wife, view.container.getChildIndex(bottombg));
    
            if(isDragon){
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, bottombg, [-50, 0]);
            }
            else{
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, bottombg, [-50, 0]);
            }

            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
			// this._effect.setScale(2);
			let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
			skinTxtEffect.setPosition(wife.x + 100, wife.y+wife.height*wife.scaleY-80 - skinTxtEffectBM.height / 2 );
			skinTxtEffect.blendMode = egret.BlendMode.ADD;
			this.addChildToContainer(skinTxtEffect);
			skinTxtEffect.playWithTime(-1);

			let skinTxt = BaseBitmap.create("acnationalday_common_rewardtxt");
			skinTxt.anchorOffsetX = skinTxt.width / 2;
			skinTxt.anchorOffsetY = skinTxt.height / 2;
			skinTxt.setPosition(wife.x + 200, wife.y+wife.height*wife.scaleY-80);
            this.addChildToContainer(skinTxt);
            skinTxt.name = "skinTxt";
			egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


			let skinTxteffect = BaseBitmap.create("acnationalday_common_rewardtxt");
			skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
			skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
			skinTxteffect.setPosition(wife.x + 200, wife.y+wife.height*wife.scaleY-80);
			this.addChildToContainer(skinTxteffect);
			skinTxteffect.blendMode = egret.BlendMode.ADD;
			skinTxteffect.alpha = 0;
			egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
			
			//透明点击区域
			let touchPos = BaseBitmap.create("public_alphabg");
			touchPos.width = 180;
			touchPos.height = 120;
			touchPos.setPosition(wife.x + 100, wife.y+wife.height*wife.scaleY-120);
            touchPos.name = "touch";
			view.addChildToContainer(touchPos);
			touchPos.addTouchTap(() => {
                if(view._isPlay){
                    return;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACBEATXIONGNUREWARDVIEW4,{
                    aid : view.aid,
                    code : view.code
                });
            }, ViewController);
            

            let bubbleTopGroup = new BaseDisplayObjectContainer();
            view.addChildToContainer(bubbleTopGroup);

            let descBg = BaseBitmap.create('public_9_bg42');
            view.addChild(descBg);
            bubbleTopGroup.addChild(descBg);

            let arrowBM = BaseBitmap.create("public_9_bg13_tail");
            arrowBM.anchorOffsetX = arrowBM.width / 2;
            arrowBM.anchorOffsetY = arrowBM.height / 2;
            bubbleTopGroup.addChild(arrowBM);

            let descTxt =ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acbeatxiongnutip7`, code)), 20, TextFieldConst.COLOR_BLACK);
            descTxt.lineSpacing = 5;
            bubbleTopGroup.addChild(descTxt);

            descBg.width = descTxt.textWidth + 40;
            descBg.height = descTxt.textHeight + 66;
            bubbleTopGroup.width = descBg.width;
            bubbleTopGroup.height = descBg.height + arrowBM.height;
            
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bubbleTopGroup, [0,0], true);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [arrowBM.anchorOffsetX + 15, arrowBM.anchorOffsetY + descBg.height - 13]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
            view._bubbleTopGroup = bubbleTopGroup;
            bubbleTopGroup.alpha = 0;

            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bubbleTopGroup, wife, [250,-bubbleTopGroup.height/2]);
        }

        view.addChildToContainer(oneBtn);
        view.addChildToContainer(enterclip);
        let rewardbtn = ComponentManager.getButton(App.CommonUtil.getResByCode(`beatxiongnudetailbtn`, view.code), ``, ()=>{
            if(view._isPlay){
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACBEATXIONGNUREWARDVIEW, {
                    aid: this.aid, 
                    code: this.code, 
            });
        }, view);
        view.addChildToContainer(rewardbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rewardbtn, topbg, [7,topbg.height+7]);
        view._rewardbtn = rewardbtn;
        /***底部进度***/
        //数量TF
        let numTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acbeatxiongnutip3`, code), [view.vo.getCheerNum().toString()]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._numTxt = numTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, oneBtn, [0, oneBtn.height]);
        view.addChildToContainer(numTxt);

        let freeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`sysFreeDesc`), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._freeTxt = freeTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, freeTxt, oneBtn, [0, oneBtn.height]);
        view.addChildToContainer(freeTxt);
		// view._curLuckyTxt = ComponentManager.getTextField(view.vo.getLuckyProgress().toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		// view._curLuckyTxt.width = 60;
		// view._curLuckyTxt.textAlign = egret.HorizontalAlign.CENTER;
		// view._curLuckyTxt.setPosition(numDescTF.x + numDescTF.width / 2 - view._curLuckyTxt.width / 2, numDescTF.y + numDescTF.height + 2);
        // view.addChildToContainer(view._curLuckyTxt);

        view.tick();
        view.freshView();
        view.closeBtn.x = view.width - view.closeBtn.width - 10;
        view.closeBtn.y = 10;
      
    }

    private pickCallBack(evt : egret.Event):void{
        let view = this;
        //物品奖励
        if(evt.data.ret){
            let data = evt.data.data.data;
            view.showMovie(data.rewards, data.criticalNum);
        }
        else{
            view._isPlay = false;
        }
    }

    private showMovie(rewards:string, iscrit:number):void{
        let view = this;
        let luanziClip = ComponentManager.getCustomMovieClip("redlotus_yanwu", 21, 100);//redlotus_yanwu 21
        luanziClip.setScale(2.5);
        luanziClip.setPosition(GameConfig.stageWidth / 2 - 256 / 2 * luanziClip.scaleX, GameConfig.stageHeigth / 2 - 380 / 2 * luanziClip.scaleX - 100);
        view.addChildToContainer(luanziClip);
        luanziClip.setEndCallBack(()=>{
            view.showReward(rewards, iscrit);
            luanziClip.dispose();
            luanziClip = null;
        },view);

        view.container.setChildIndex(view._bubbleTopGroup,100);

        view._bubbleTopGroup.alpha = 1;
        egret.Tween.get(view._bubbleTopGroup).wait(800).to({alpha : 0}, 500).call(()=>{
            luanziClip.playWithTime(1);
        },view);
    }

    private showReward(rewards:string, iscrit:number):void{
        let view = this;
        let str = null;
        ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW,{
            rewards : rewards, 
            callback : ()=>{
                view._isPlay = false;
            },
            handler : view,
            isPlayAni : true,
            tipMsg : iscrit ? LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acbeatxiongnutip6`, view.getUiCode()),[iscrit.toString()]) : null
        });
    }


    private freshView():void{
        let view = this;
        let code = view.getUiCode();
        view._numTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acbeatxiongnutip3`, code), [view.vo.getCheerNum().toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._numTxt, view._getOneBtn, [0, view._getOneBtn.height]);
        view._freeTxt.visible = view.vo.isFree();
        view._numTxt.visible = !view._freeTxt.visible;
        //进度条
        //充值奖励 任务奖励
        if(view.vo.getpublicRedhot1() || view.vo.getpublicRedhot3()) {
			App.CommonUtil.addIconToBDOC(view._rewardbtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._rewardbtn);
		}
        //好感度
        // view._curLuckyTxt.text = view.vo.getLuckyProgress().toString();
        view._getOneBtn.setBtnBitMap(`beatxiongnubtn${view.vo.isFree() ? 1 : (view.vo.getCheerNum()>=10?2:1)}`);
        //进度显示
        let maxarr = view.cfg.getProcessNum(code);
        let mapgroup = view._mapGroup;
        //当前进度
        let totalprogress = view.cfg.getTotalProgress();
        let cur = Math.min(view.vo.getLuckyProgress(),totalprogress);
       
        let progreessFlagGroup = <BaseDisplayObjectContainer>mapgroup.getChildByName(`progreessFlagGroup`);
        let flag = <BaseBitmap>progreessFlagGroup.getChildByName(`flag`);
        let processTxt = <BaseBitmapText>progreessFlagGroup.getChildByName(`processTxt`);
        processTxt.text = `${(Math.min(cur/totalprogress, 1)*100).toFixed(0)}%`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, processTxt, flag, [-15,-5]);

        let key = `${AcConst.AID_BEATXIONGNU}-${this.code}report-${Api.playerVoApi.getPlayerID()}-${this.vo.st}-hand`;
        let storage = LocalStorageManager.get(key);
        if (!storage) {
            this._clickHand.visible = true;
        }
        else{
            this._clickHand.visible = false;
        }

        let maxid = maxarr[0];
        let maxcfg : Config.AcCfg.BeatXiongNuProgressItemCfg = view.cfg.achievement[maxid];
        for(let i = 0; i < maxarr.length; ++ i){
            let id = maxarr[i];
            let isspecial = i == 0;
            let unit : Config.AcCfg.BeatXiongNuProgressItemCfg = view.cfg.achievement[id];
            if(unit){
                let poscfg = view._posCfg[code][i];
                let buildGroup = <BaseDisplayObjectContainer>mapgroup.getChildByName(`buildGroup${id}`);
                let build = <BaseBitmap>buildGroup.getChildByName(`build`);
                let build_light = <BaseBitmap>buildGroup.getChildByName(`build_light`);
                let arrow = <BaseBitmap>buildGroup.getChildByName(`arrow`);
                build_light.visible = false;

                let res = `beatxiongnubuilding${isspecial ? 4 : 2}`;
                if(view.vo.isGetJinduAward(id)){
                    res = `beatxiongnubuilding${isspecial ? 3 : 1}`;
                }
                else{
                    if(cur >= unit.specialnum){
                        build_light.visible = true;
                    }
                    if(i == 0){
                        view._clickHand.x = buildGroup.x+50;
                        view._clickHand.y = buildGroup.y+50;
                    }
                }
                build.setRes(App.CommonUtil.getResByCode(res, code));
                arrow.setRes(App.CommonUtil.getResByCode(`beatxiongnuarrow${cur >= unit.specialnum ? 2 : 1}`, code));

                if(cur >= maxcfg.specialnum){
                    if(maxid == id){
                        progreessFlagGroup.setPosition(buildGroup.x+arrow.x-10, buildGroup.y+arrow.y-progreessFlagGroup.height);
                    }
                }
                else{
                    if(cur <= unit.specialnum){
                        progreessFlagGroup.setPosition(buildGroup.x+arrow.x-10, buildGroup.y+arrow.y-progreessFlagGroup.height);
                    }
                }
            }
        }
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

        let key = `${AcConst.AID_BEATXIONGNU}-${this.code}report-${Api.playerVoApi.getPlayerID()}-${this.vo.st}-hand`;
        let storage = LocalStorageManager.get(key);
        if (!storage) {
            this._clickHand.visible = true;
        }
        else{
            this._clickHand.visible = false;
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
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_XIONGNU_ATK,view.pickCallBack,view);
        
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 
        view._timebg = null;
        view._cdText = null; 
        view._getOneBtn = null;
        view._curLuckyTxt = null; 
        view._numTxt = null;
        view._isbatch = false;
        view._rewardbtn = null;
        view._mapGroup = null;
        view._freeTxt = null;
        view._bubbleTopGroup = null;
        view._clickHand = null;;
        super.dispose();
    }
}