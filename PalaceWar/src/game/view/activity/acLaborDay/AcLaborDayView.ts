/*
author : qianjun
date : 2018.4.14
desc : 劳动节活动
*/
class AcLaborDayView extends AcCommonView{
    private _rewardBtn : BaseButton = null;
    private _clickIdx : number = 0;
    private _timeCountTxt : BaseTextField = null;
    private _topbg : BaseBitmap = null;
    public constructor(){
        super();
    }

    private get cfg() : Config.AcCfg.LaborDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLaborDayVo{
        return <AcLaborDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
    //

    protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_LABORINFO,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		// view.vo.setRankInfo(data.data.data);
	}

	protected initBg():void
	{
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
    
        let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
        let len = Object.keys(view.cfg.teamReward).length;
        for(let i = 1; i <= len; ++ i){
            let status = view.vo.getLandStatusById(i);
            let land = BaseLoadBitmap.create(`laborland${i}_${status}-${view.getUiCode()}`, null, {
                callback : ()=>{
                    let curjindu = view.vo.getCurJindu();
                    let landGroup : BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
                    landGroup.width = 51;
                    landGroup.height = 62;
                    landGroup.anchorOffsetX = landGroup.width / 2;
                    landGroup.anchorOffsetY = landGroup.height;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, landGroup, land, [0,-42]);
                    landGroup.name = `landgroup${i}`
                    view.addChild(landGroup);

                    let bubble = BaseBitmap.create(`labordaybubble-${view.getUiCode()}`);
                    landGroup.addChild(bubble);

                    let boxstatus = Math.max(1,status - 1);
                    let box = BaseBitmap.create(`labordaybox${boxstatus}-${view.getUiCode()}`);
                    box.name = `landbox${i}`;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, box, bubble);   
                    landGroup.addChild(box);

                    if(boxstatus == 1){
                        let tmpY = landGroup.y;
                        egret.Tween.get(landGroup, {loop : true}).
                        to({y : tmpY + 5}, 1000).
                        to({y : tmpY}, 1000);
                    }
                    else if(boxstatus == 2 && !view.vo.isGetJinduAward(i)){
                        /**
                         * 混合叠加模式，播放速度0.07秒每张图。

                        摇摆动画：
                        旋转：0  -5   8   -6    5    -4   3   -2    1    -1   每个过程用时0.066秒.
                        -1  至 0 用时0.1秒 .
                        间隔0.3秒后再次摇摆.
                         *  */
                        let laborboxeff = ComponentManager.getCustomMovieClip(`laborboxeff${view.getUiCode()}-`, 10, 70);
                        laborboxeff.name = `laborboxeff${i}`
                        laborboxeff.blendMode = egret.BlendMode.ADD;
                        laborboxeff.width = 115;
                        laborboxeff.height = 122;
                        laborboxeff.anchorOffsetX = laborboxeff.width / 2;
                        laborboxeff.anchorOffsetY = laborboxeff.height / 2;
                        laborboxeff.playWithTime(-1);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, laborboxeff, box);
                        landGroup.addChild(laborboxeff);

                        let time1 = 130;
                        let time2 = 200;
                        egret.Tween.get(landGroup, {loop : true}).
                        to({rotation : -5}, time1).
                        to({rotation : 8}, time1).
                        to({rotation : -6}, time1).
                        to({rotation : 5}, time1).
                        to({rotation : -4}, time1).
                        to({rotation : 3}, time1).
                        to({rotation : -2}, time1).
                        to({rotation : 1}, time1).
                        to({rotation : -1}, time1).
                        to({rotation : 0}, time2).
                        wait(600);
                    }
                    box.addTouchTap(()=>{
                        if(view._clickIdx > 0){
                            return;
                        }
                        let status = view.vo.getLandStatusById(i);
                        let boxRewardId = i;
                        let lqFlag = view.vo.isGetJinduAward(i);
                        if(lqFlag || status < 3)
                        {
                            // this.playBoxAni(boxRewardId);
                            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{
                                'type' : AcConst.AID_LABORDAY,
                                'id' : boxRewardId,
                                "code" : this.code
                            });
                        }
                        else
                        {
                            view._clickIdx = i;
                            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LABORJINDU,{
                                activeId : view.acTivityId, 
                                rechargeId : boxRewardId
                            });
                        }
                    }, view);

                    let lqFlag = view.vo.isGetJinduAward(i);
                    if((!lqFlag && status == 3) || curjindu == i){
                        //发光效果
                        landGroup.alpha = 1;
                    }
                    else{
                        landGroup.alpha = 0.7;
                    }
                    //进度条
                    let progressbar = ComponentManager.getProgressBar(`labordayprogress-${view.getUiCode()}`,`labordayprogress_bg-${view.getUiCode()}`,138);
                    progressbar.setTextSize(14);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, progressbar, land, [13.5,25]);
                    view.addChild(progressbar);
                    progressbar.name = `progressbar${i}`;
                    let percent = view.vo.getJinduPercent(i);
                    progressbar.setPercentage(percent, `${view.vo.getTotalRiceNum()}/${view.cfg.teamReward[i - 1].needMeter}`);

                    let progressicon = BaseBitmap.create(`labordayprogressicon-${view.getUiCode()}`);
                    progressicon.name = `progressicon${i}`;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressicon, progressbar, [-27,0]);
                    view.addChild(progressicon);

                    if(curjindu == i && status < 3){
                        progressicon.visible = progressbar.visible = true;
                    }
                    else{
                        progressicon.visible = progressbar.visible = false;
                    }
                }, 
                callbackThisObj : view
            });
            land.x = view._pos[i].x;
            land.y = view._pos[i].y + view.viewBg.y;
            land.name = `land${i}`;
            view.addChild(land);
        }
	}

    protected getBgName():string{
        return `labordaybg-${this.getUiCode()}`
    }

    private _pos = {
        1 : {x : 437, y : 524},
        2 : {x : 252, y : 576},
        3 : {x : 82, y : 540},
        4 : {x : 130, y : 625},
        5 : {x : 373, y : 671},
        6 : {x : 0, y : 666},
        7 : {x : 153, y : 774},
        8 : {x : 166, y : 926},
    };

    public initView(){
        let view = this;
        view._clickIdx = 0;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LABOR_FRESH,this.update,this); 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LABORJINDU),view.jinduCallBack,view);
        //top背景图
        let topbg = BaseBitmap.create(`labortop-${view.getUiCode()}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0,view.titleBg.height]);
        view.addChild(topbg);

        let timeTxt = ComponentManager.getTextField(`${view.vo.getAcLocalTime(true)}`, 20);
        // 423 205
        timeTxt.width = 385;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [225,73]);
        view.addChild(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acLaborTip1-${view.code}`), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 385;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0,timeTxt.textHeight + 5]);
        view.addChild(tipTxt);
        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.y = (topbg.y+topbg.height - 14);
        view._topbg = timebg;
 
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChild(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y  = timebg.y+6; 

        timebg.width = tip2Text.width+50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = view._topbg.x+(view._topbg.width-view._timeCountTxt.width)*0.5;


		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		// this._effect.setScale(2);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(topbg.x + 103 - skinTxtEffectBM.width / 2, topbg.y + 160 - skinTxtEffectBM.height / 2);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChild(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(topbg.x + 103, topbg.y + 160);
		this.addChild(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


		let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(topbg.x + 103, topbg.y + 160);
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
            ViewController.getInstance().openView(ViewConst.POPUP.ACLABORDAYSKINPOPUPVIEW, {
                aid : view.aid,
                code : view.code
            });
		}, ViewController);
        let rewardBtn = ComponentManager.getButton(`labordayreward-${view.getUiCode()}`, '', ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACLABORDAYPOPUPVIEW, {
                aid : view.aid,
                code : view.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, rewardBtn, view, [40,35]);
        view.addChild(rewardBtn);
        view._rewardBtn = rewardBtn;

        let shopBtn = ComponentManager.getButton(`labordayshop-${view.getUiCode()}`, '', ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACLABORDAYPOPUPVIEW, {
                aid : view.aid,
                code : view.code,
                index : 3
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, shopBtn, view, [40,35]);
        view.addChild(shopBtn);

        view.update();
        view.setChildIndex(view.closeBtn, 99999);
    }

    private jinduCallBack(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        if(data){
            let rewards = data.rewards
            let rewardList =  GameData.formatRewardItem(rewards);
            let group = <BaseDisplayObjectContainer>view.getChildByName(`landgroup${view._clickIdx}`);
            let pos = null;
            if(group){
                let box = <BaseBitmap>group.getChildByName(`landbox${view._clickIdx}`);
                let boomeff = ComponentManager.getCustomMovieClip(`laborboxboom${view.getUiCode()}-`, 7, 70);
                boomeff.blendMode = egret.BlendMode.ADD;
                boomeff.width = 194;
                boomeff.height = 196;
                boomeff.anchorOffsetX = boomeff.width / 2;
                boomeff.anchorOffsetY = boomeff.height / 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boomeff, box, [1, -5]);
                group.addChild(boomeff);

                boomeff.playWithTime(1);

                let landeff = <CustomMovieClip>group.getChildByName(`laborboxeff${view._clickIdx}`);
                if(landeff){
                    egret.Tween.get(landeff).to({alpha : 0}, 700).call(()=>{
                        egret.Tween.removeTweens(group);
                    }, view);
                }

                boomeff.setEndCallBack(()=>{
                    group.removeChild(boomeff);
                    let land = <BaseLoadBitmap>view.getChildByName(`land${view._clickIdx}`);
                    if(land){
                        /*混合叠加模式，播放速度0.07秒每张图。
                        点击后。光效效果淡出用时0.7秒。*/
                        egret.Tween.get(land).to({alpha : 0}, 500).call(()=>{
                            egret.Tween.removeTweens(land);

                            let status = view.vo.getLandStatusById(view._clickIdx); 
                            let boxstatus = Math.max(1,status - 1);
                            group.alpha = 0.7;
    
                            let landeff = <CustomMovieClip>group.getChildByName(`laborboxeff${view._clickIdx}`);
                            if(landeff){
                                egret.Tween.removeTweens(group);
                                landeff.dispose();
                            }

                            land.setload(`laborland${view._clickIdx}_${status}-${view.getUiCode()}`);
                            land.alpha = 1;
                            view._clickIdx = 0;

                            box.setRes(`labordaybox${boxstatus}-${view.getUiCode()}`);
                            pos = new egret.Point(group.x + group.width/2, group.y + group.height/2);
                            App.CommonUtil.playRewardFlyAction(rewardList,pos);
                        }, view);
                    }
                }, view);
            }
            else{
                pos = new egret.Point(view.width/2, GameConfig.stageHeigth - 200);
                view._clickIdx = 0;
                App.CommonUtil.playRewardFlyAction(rewardList,pos);
            }
        }
    }

    private freshLand():void{
        let view = this;
        let len = Object.keys(view.cfg.teamReward).length;
        for(let i = 1; i <= len; ++ i){
            let curJindu = view.vo.getCurJindu();
            let land = <BaseLoadBitmap>view.getChildByName(`land${i}`);
            if(land && view._clickIdx !== i){
                let status = view.vo.getLandStatusById(i);
                land.setload(`laborland${i}_${status}-${view.getUiCode()}`);

                let landGroup = <BaseDisplayObjectContainer>view.getChildByName(`landgroup${i}`);
                if(landGroup){
                    let boxstatus = Math.max(1,status - 1);
                    let box = <BaseBitmap>landGroup.getChildByName(`landbox${i}`);
                    if(box){
                        box.setRes(`labordaybox${boxstatus}-${view.getUiCode()}`);

                        let lqFlag = view.vo.isGetJinduAward(i);
                        if((!lqFlag && status == 3) || curJindu == i){
                            //发光效果
                            landGroup.alpha = 1;
                        }
                        else{
                            landGroup.alpha = 0.7;
                        }
                    }
                    let landeff = <CustomMovieClip>landGroup.getChildByName(`laborboxeff${i}`);
                    if(!landeff && boxstatus == 2 && !view.vo.isGetJinduAward(i)){
                        egret.Tween.removeTweens(landGroup);

                        let laborboxeff = ComponentManager.getCustomMovieClip(`laborboxeff${view.getUiCode()}-`, 10, 70);
                        laborboxeff.name = `laborboxeff${i}`
                        laborboxeff.blendMode = egret.BlendMode.ADD;
                        laborboxeff.width = 115;
                        laborboxeff.height = 124;
                        laborboxeff.anchorOffsetX = laborboxeff.width / 2;
                        laborboxeff.anchorOffsetY = laborboxeff.height / 2;
                        laborboxeff.playWithTime(-1);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, laborboxeff, box);
                        landGroup.addChild(laborboxeff);

                        let time1 = 130;
                        let time2 = 200;
                        egret.Tween.get(landGroup, {loop : true}).
                        to({rotation : -5}, time1).
                        to({rotation : 8}, time1).
                        to({rotation : -6}, time1).
                        to({rotation : 5}, time1).
                        to({rotation : -4}, time1).
                        to({rotation : 3}, time1).
                        to({rotation : -2}, time1).
                        to({rotation : 1}, time1).
                        to({rotation : -1}, time1).
                        to({rotation : 0}, time2).
                        wait(600);
                    }
                    else{
                        if(landeff && view.vo.isGetJinduAward(i)){
                            egret.Tween.removeTweens(landGroup);
                            landeff.dispose();
                        }
                    }
                    let progressbar = <ProgressBar>view.getChildByName(`progressbar${i}`);
                    let progressicon = <BaseBitmap>view.getChildByName(`progressicon${i}`);

                    if(progressbar){
                        let percent = view.vo.getJinduPercent(i);
                        progressbar.setPercentage(percent, `${view.vo.getTotalRiceNum()}/${view.cfg.teamReward[i - 1].needMeter}`);
                        if(curJindu == i && status < 3){
                            progressicon.visible = progressbar.visible = true;
                        }
                        else{
                            progressicon.visible = progressbar.visible = false;
                        }
                    }
                }
            }
        }
    }

    protected getRuleInfo():string{
		return "acLaborDayRuleInfo-" + this.code;
    } 

    protected getResourceList():string[]
	{
        let view = this;
        let arr = [];
        let code = this.getUiCode();
        return super.getResourceList().concat([
            `labordaybg-${code}`,`acwealthcarpview_servantskintxt`,`acwealthcarpview_skineffect1`,`acwealthcarpview_skineffect`,
            `aclaborday${code}`,`laborboxeff${code}-`,`laborboxboom${code}-`
        ]).concat(arr);
    }
    
    // public get tabHeight():number{
    //     let view = this;
    //     return view._bottomBg.height;
    // }

    // public get tabWidth():number{
    //     let view = this;
    //     return view.width;
    // }

    private update(): void
    { 
        let view = this;
        //第一页 红点
        let vo = view.vo;
        if(!vo)
        {
            return;
        }	
        if(vo.getpublicRedhot2() || vo.getpublicRedhot3()){
            App.CommonUtil.addIconToBDOC(view._rewardBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
        //  if(this.public_dot1)
        //  {
        //      this.public_dot1.visible = vo.getpublicRedhot1();
        //  }
        //  //第二页 红点
        //  if(this.public_dot2)
        //  {
        //       this.public_dot2.visible =  vo.getpublicRedhot2();
        //  }    
 
        //  //第三页 红点
        //  if(this.public_dot3)
        //  {
        //       this.public_dot3.visible =  vo.getpublicRedhot3();
        //  }   

        // if(this.code=="5")
        // {
        //     this.tabbarGroup.visible =false; 
        //     this.public_dot3.visible =false;
        //     this.public_dot2.visible =false;
        //     this.public_dot1.visible =false;
        // }  
        view.freshLand();
    } 

    public tick():void{
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._topbg.x = GameConfig.stageWidth - view._topbg.width - 12;
        view._timeCountTxt.x = view._topbg.x+(view._topbg.width-view._timeCountTxt.width)*0.5;
    }
    protected getUiCode(): string {
		if (this.code == "2") {
			return "1";
		}
		return super.getUiCode();
	}
    
    public dispose():void
	{   
        let view = this;
        view._timeCountTxt = null;
        view._clickIdx = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LABOR_FRESH,this.update,this); 
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LABORJINDU),view.jinduCallBack,view);
        view._rewardBtn = null;

        let len = Object.keys(view.cfg.teamReward).length;
        let curJindu = view.vo.getCurJindu();
        for(let i = 1; i <= len; ++ i){
            let land = <BaseLoadBitmap>view.getChildByName(`land${i}`);
            if(land){
                let landGroup = <BaseDisplayObjectContainer>view.getChildByName(`landgroup${i}`);
                if(landGroup){
                    let box = <BaseBitmap>landGroup.getChildByName(`landbox${i}`);
                    if(box){
                        box.removeTouchTap();
                        box.dispose();
                    }

                    let landeff = <CustomMovieClip>landGroup.getChildByName(`laborboxeff${i}`);
                    if(landeff){
                        egret.Tween.removeTweens(landGroup);
                        landeff.dispose();
                    }
                    landGroup.dispose();
                }

                let progressbar = <ProgressBar>view.getChildByName(`progressbar${i}`);
                if(progressbar){
                    progressbar.dispose();
                }

                let progressicon = <BaseBitmap>view.getChildByName(`progressicon${i}`);
                if(progressicon){
                    progressicon.dispose();
                }
                land.dispose();
            }
        }
        super.dispose();
    }
}