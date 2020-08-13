/**
  * 海滨伊人 活动
  * @author shaoliang
  * date 2020/7/7
  * @class AcSeaWomanView
  */

class AcSeaWomanView extends AcCommonView 
{   

    private _timeRechargeTxt : BaseTextField = null;
    private _acTimeText : BaseTextField = null;
    private _playTimesText : BaseTextField = null;
    private _canplayTimesText : BaseTextField = null;
    private _rewardNodeTab :SeaWomanRewardNode[] = [];
    private _playNodeTab :SeaWomanPlayNode[] = [];

    private _showId:number = 0;
    private _touchId:number = 0;
    private _shakeId:number = 0;
    private _fullFlag:boolean = false;
    private _delFlag:boolean = false;
    private _isPlaying:boolean = false;
    private _detailBtn:BaseButton = null;

    public constructor() 
    {
        super();
    }

     // 标题背景名称
	protected getTitleBgName():string
	{
		return "seawoman_title-" + this.getUiCode();
	}

    protected getTitleStr():string
	{
		return null;
	}

    protected getBgName():string
	{	
		return "seawoman_bg-" + this.getUiCode();
	}

    protected getRuleBtnName():string
	{	
		return "seawoman_rule-" + this.getUiCode();
	}

    protected getRuleInfo():string{
		return "acSeaWomanRuleInfo-" + this.getUiCode();
    } 

    protected getCloseBtnName():string
	{
		return "seawoman_close-" + this.getUiCode();
	}

    private get cfg() : Config.AcCfg.SeaWomanCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSeaWomanVo{
        return <AcSeaWomanVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

    protected  getUiCode():string
	{   
        if (this.code == "2")
        {
            return "1";
        }
		return this.code;
	}

    protected getRuleInfoParam():string[]
	{
		return [String(this.cfg.cost)];
	}


    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `seawomancode${code}`, `seawoman_bg-${code}`, `seawoman_middlebg-${code}`, `seawoman_topbg-${code}`,
            "acwealthcarpview_skineffect","acsearchproofview_common_skintxt","acmousegold_yun1","acmousegold_yun2",
            "seawoman_effect_haixing","seawoman_effect_open","seawoman_effect_bomb","seawoman_effect_openball"
        ]);
    }

    protected initBg():void
    {
        this.viewBg = BaseBitmap.create(this.getBgName());
		this.addChild(this.viewBg);
        this.viewBg.y = (GameConfig.stageHeigth-1136)/2.03
    }

    protected getProbablyInfo(): string {
		return App.CommonUtil.getCnByCode(`acSeaWomanProbablyInfo`, this.code);
    }

    protected initProbablyBtn():void
	{
		if(Api.switchVoApi.checkOpenProbably()==true && this.getProbablyInfo())
		{
            let probablyBtn = ComponentManager.getButton("seawoman_probably-"+this.getUiCode(),"",this.clickProbablyBtnHandler,this);
			let posX:number = 12;
			if (PlatformManager.hasSpcialCloseBtn())
			{
				posX+=80;
			}
			if (this._ruleBtn)
			{
				posX=this._ruleBtn.x+this._ruleBtn.width+10;
			}
			probablyBtn.x = posX;
			probablyBtn.y = 22;
			this.addChild(probablyBtn);
		}
	}

    public initView() 
    {   
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);

        this.closeBtn.y = 12;
        this.closeBtn.x = 573;
        this._ruleBtn.y = 15;
        
        let offset = 1136-GameConfig.stageHeigth;
        let code = this.getUiCode();
        let vo = this.vo;

        let key: string = this.acTivityId+ Api.playerVoApi.getPlayerID() + String(vo.st);
		let storage = LocalStorageManager.get(key);
		if (!storage) {

            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, {
				idx: "acSeawoman_1-" + this.getUiCode(), f: () => {
				}, o: this
			});

			LocalStorageManager.set(key, vo.aidAndCode);
		}
		
        
        let rewardstr:string = this.cfg.change["getItem"];
        let rewardvo = GameData.formatRewardItem(rewardstr)[0];
        let skincfg = Config.WifeskinCfg.getWifeCfgById(rewardvo.id);

        let skinBone = skincfg.bone;
        if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(skinBone+"_ske"))
        {
            let wifeskinDB = App.DragonBonesUtil.getLoadDragonBones(skinBone);
            wifeskinDB.setScale(0.58);
			wifeskinDB.setPosition(150, 500- offset*0.4);
			this.addChildToContainer(wifeskinDB);
        }
        else
        {   
            let wifeskinPic = BaseLoadBitmap.create(skincfg.body);
            wifeskinPic.width = 640*0.45;
            wifeskinPic.height = 840*0.45;
			wifeskinPic.setPosition(0, 173- offset*0.4);
			this.addChildToContainer(wifeskinPic);
        }
        //亦庄预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;

		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(148 - skinTxtEffectBM.width / 2,350 -offset*0.4);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinTxteffect, skinTxt);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

        //透明点击区域
		let touchPos = BaseBitmap.create("public_alphabg");
		touchPos.width = 160;
		touchPos.height = 80;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, touchPos, skinTxtEffect);
		view.addChildToContainer(touchPos);
		touchPos.addTouchTap(() => {
            if (this._isPlaying)
            {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACSEAWOMANPOPVIEWTAB3,{
                aid:this.aid, 
                code:this.code,
                uicode:this.getUiCode(),
            });

        }, ViewController);

        //活动信息
        let topbg = BaseBitmap.create(`seawoman_topbg-${code}`);
        topbg.setPosition(250,122-offset*0.12);
        view.addChildToContainer(topbg);

        let timeTxt = ComponentManager.getTextField(view.vo.getAcLocalTime(true,"0xfff7e8"), 18, TextFieldConst.COLOR_BLUE);
        timeTxt.width = 600;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [25,23]);
        view.addChildToContainer(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acSeaWomanDesc-${code}`,[String(this.cfg.cost)]), 18, TextFieldConst.COLOR_BLACK);
        tipTxt.width = topbg.width-50;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0,timeTxt.textHeight + 8]);
        view.addChildToContainer(tipTxt);


        let rechargeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acSeaWomanRechargeInfo-${code}`,[String(this.vo.getNextTimeNeedRecharge())]), 18, TextFieldConst.COLOR_BLACK);
        rechargeTxt.width =  tipTxt.width;
        rechargeTxt.lineSpacing = 3;
        rechargeTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rechargeTxt, topbg, [0,46]);
        view.addChildToContainer(rechargeTxt);
        this._timeRechargeTxt = rechargeTxt;
        
        let timebg = BaseBitmap.create(`seawoman_timebg-${code}`);
        timebg.setPosition(topbg.x+23,topbg.y+topbg.height-25);
        view.addChildToContainer(timebg);

        let timeText = ComponentManager.getTextField(this.vo.getCountDownTime(), 18, TextFieldConst.COLOR_WHITE);
        timebg.width = timeText.width+30;
        timeText.width = 320;
        timeText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeText, timebg);
        view.addChildToContainer(timeText);

        this._acTimeText = timeText;

        let greenGrass = BaseBitmap.create("seawoman_grass-"+code);
        greenGrass.setPosition(topbg.x+topbg.width-22,topbg.y+topbg.height-112);
        view.addChildToContainer(greenGrass);

        //middle
        let middleBg = BaseBitmap.create("seawoman_middlebg-"+code);
        middleBg.setPosition(GameConfig.stageWidth/2-middleBg.width/2,this.viewBg.y+475-offset*0.12);
        view.addChildToContainer(middleBg);

        let detailBtn =  ComponentManager.getButton(`seawoman_detail-${code}`, null,this.detailBtnHandler,this);
        detailBtn.setPosition(GameConfig.stageWidth-113,middleBg.y-60);
        view.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        if (this.vo.isCangetAchieveReward()|| this.vo.isCanExchange())
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let reddot = this._detailBtn.getChildByName("reddot");
            reddot.x = 51;
            reddot.y =  10;
        }

        let timesbg = BaseBitmap.create("seawoman_timesbg-"+code);
        timesbg.setPosition(middleBg.x+middleBg.width/2-timesbg.width/2,middleBg.y-18);
        view.addChildToContainer(timesbg);


        let canplaystr = LanguageManager.getlocal("acSeaWomanCanPlayTimes-"+code,[String(this.vo.num)]);
        if (this.vo.isFree())
        {
            canplaystr = LanguageManager.getlocal("acSeaWomanCanPlayTimes2-"+code,[String(this.vo.num)]);
        }
        let canplaytimeText = ComponentManager.getTextField(canplaystr, 18, TextFieldConst.COLOR_BLACK);
        canplaytimeText.width = 220;
        canplaytimeText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, canplaytimeText, timesbg);
        view.addChildToContainer(canplaytimeText);
        this._canplayTimesText = canplaytimeText;


        //底部
        let playtimesBg1 = BaseBitmap.create("seawoman_timesbg1-"+code);
        playtimesBg1.setPosition(17,middleBg.y+middleBg.height+28-offset*0.05);
        view.addChildToContainer(playtimesBg1);

        playtimesBg1.addTouchTap(()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACSEAWOMANPOPVIEW,{
                aid:this.aid, 
                code:this.code,
                uicode:this.getUiCode(),
            });
        },this);

        let playtimesBg2 = BaseBitmap.create("seawoman_timesbg2-"+code);
        playtimesBg2.setPosition(playtimesBg1.x+32,playtimesBg1.y-18);
        view.addChildToContainer(playtimesBg2);

        let playstr = LanguageManager.getlocal("acSeaWomanPlayTimes-"+code,[String(this.vo.ainfo.v)]);
        let playtimeText = ComponentManager.getTextField(playstr, 18, TextFieldConst.COLOR_WHITE);
        playtimeText.width = 120;
        playtimeText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playtimeText, playtimesBg2);
        view.addChildToContainer(playtimeText);
        this._playTimesText = playtimeText;
        
        let scrollContiner = new BaseDisplayObjectContainer()
        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,460,90);

		let scrollView = ComponentManager.getScrollView(scrollContiner,rect);
		this.addChildToContainer(scrollView);
        scrollView.setPosition(GameConfig.stageWidth-rect.width,playtimesBg2.y+6);
        scrollView.verticalScrollPolicy = "off";
        let cfgs = this.cfg.chessNum;
        for (let i=0; i<cfgs.length; i++)
        {
            let oneNode = new SeaWomanRewardNode();
            oneNode.init(cfgs[i],code,this.rewardHandle,this);
            oneNode.setPosition(i*114,0);
            scrollContiner.addChild(oneNode);
            oneNode.setShowType(this.vo.getAchievementType(i+1));
            this._rewardNodeTab.push(oneNode);
        }
        scrollContiner.width+=10;
        scrollView.setScrollLeft(scrollContiner.width-rect.width);
        egret.Tween.get(scrollView).wait(1).call(()=>{
            scrollView.setScrollLeft(0, 1000);
        });

        for (let i=1; i<=16 ; i++)
        {
            let onePlay = new SeaWomanPlayNode();
            onePlay.init(i,code,this.playHandle,this);
            onePlay.setPosition(70+(i-1)%4*125,middleBg.y+0+Math.floor((i-1)/4)*115);
            this.addChildToContainer(onePlay);
            this._playNodeTab.push(onePlay);
            let oneinfo=this.vo.getMapInfo(i);
            if (oneinfo)
            {   
                onePlay.setInfo(oneinfo);
            }
            else
            {
                onePlay.setEmpty();
            }
        }
        this._showId = this.vo.getShowId();
        if (this._showId)
        {
            this._shakeId = this.vo.getShakeId(this._showId);
            if (this._shakeId)
            {
                this._playNodeTab[this._shakeId-1].setShake(true);
            }
        }

        let sunnyBone = "acseawomanview_sun"
        if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(sunnyBone+"_ske"))
        {
            let sunBone = App.DragonBonesUtil.getLoadDragonBones(sunnyBone);
			sunBone.setPosition(0,90);
			this.addChild(sunBone);
        }
    }

    private rewardHandle(id : number):void
    {
        if (this._isPlaying)
        {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACSEAWOMANPOPVIEW,{
			aid:this.aid, 
			code:this.code,
            uicode:this.getUiCode(),
            id:id,
		});
    }

    private playHandle(onePlay : SeaWomanPlayNode):void
    {
        if (onePlay._show || this._isPlaying)
        {
            return;
        }

        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
            return;
        }

        if (this.vo.num <=0 && this.vo.isFree()==false)
        {   
            let view= this;
            let code = this.getUiCode();
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : LanguageManager.getlocal(`acSeaWomanRechargeTip-${code}`),
                title : `itemUseConstPopupViewTitle`,
                touchMaskClose : true,
                callback : ()=>{
                    if(!view.vo.isInActivity()){
                        App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                        return;
                    }		
                    //充值
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handle : view,
                needClose : 1,
                needCancel : true,
                confirmTxt : `gotocharge`
            });
            return;
        }
        this._isPlaying = true;
        this._touchId = onePlay._id;
        if (this._shakeId)
        {
            this._playNodeTab[this._shakeId-1].setShake(false);
            this._shakeId=0;
        }
        this.request(NetRequestConst.REQUEST_AC_SEAWOMANFLOP,{activeId:this.acTivityId,pos:String(onePlay._id)});

    }

    protected receiveData(data:{ret:boolean,data:any}):void{
        let view = this
        if(data.ret){
            if (data.data.cmd == NetRequestConst.REQUEST_AC_SEAWOMANFLOP)
            {   
                let rData = data.data.data;
                let rewards = rData.rewards;
                let replacerewards = rData.replacerewards;
                let rewardsVo = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rewardsVo);
                if (replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: replacerewards });
                }

                this._delFlag = rData.delFlag;
                this._fullFlag = rData.fullFlag;

                if (this._delFlag == false && this._showId ==0)
                {   
                    view._playNodeTab[this._touchId-1].setShow(true,true,null,null);
                    this._isPlaying = false;
                    this._showId = this._touchId;
                    this._touchId = 0;
                    this._shakeId = this.vo.getShakeId(this._showId);
                    if (this._shakeId)
                    {
                        this._playNodeTab[this._shakeId-1].setShake(true);
                    }
                    
                }
                else
                {
                    view._playNodeTab[this._touchId-1].setShow(true,true,()=>{
                        view.resetPlayNode();
                    },view);
                }

                
                // egret.Tween.get(this.container).wait(500).call(this.resetPlayNode,this);

                

            }
        }
        else
        {
            if (data.data.cmd == NetRequestConst.REQUEST_AC_SEAWOMANFLOP)
            {
                this._isPlaying = false;
            }
        }
    }

    private resetPlayNode():void
    {   
       //消除
       let view = this;
        if (this._delFlag)
        {   
            if (!this._showId || !this._touchId)
            {
                return;
            }
            this._delFlag = false;
            this._playNodeTab[this._showId-1].setRemove(null,null);
            this._playNodeTab[this._touchId-1].setRemove(()=>{
                view.checkFull();
            },view);
            this._showId = 0;
            this._touchId = 0;

            // egret.Tween.get(this.container).wait(500).call(this.checkFull,this);
        }
        //没消除
        else
        {   
            //第二个
            if (this._showId)
            {
                this._playNodeTab[this._showId-1].setShow(false,true,null,null);
                this._playNodeTab[this._touchId-1].setShow(false,true,()=>{
                    view._isPlaying = false;
                },view);
                this._showId = 0;
                this._touchId = 0;
            }
            else
            {
                // this._showId = this._touchId;
                // this._touchId = 0;
                // // this._playNodeTab[this._showId-1].setShow(false,true,()=>{
                //     // this._isPlaying = false;
                //      this._shakeId = this.vo.getShakeId(this._showId);
                //     if (this._shakeId)
                //     {
                //         this._playNodeTab[this._shakeId-1].setShake(true);
                //     }
                // });
            }
        }
        
    }

    private checkFull():void
    {
        if (this._fullFlag)
        {
           
            this.showViewMask();
            this.refreshGame();
        }
        else
        {
            this._isPlaying = false;
        }
    }

    private refreshGame():void
    {

        let yunLeft = BaseBitmap.create("acmousegold_yun1");
        yunLeft.setPosition(-yunLeft.width,0);
        this.addChild(yunLeft);

        let yunRight = BaseBitmap.create("acmousegold_yun2");
        yunRight.setPosition(GameConfig.stageWidth,0);
        this.addChild(yunRight);

        egret.Tween.get(yunLeft).to({x : 0}, 600); 

        egret.Tween.get(yunRight).to({x : GameConfig.stageWidth-yunRight.width}, 600).call(()=>
        {
            egret.Tween.removeTweens(yunRight);
            egret.Tween.removeTweens(yunLeft);
           
            for (let i=0; i<16 ; i++)
            {
                let onePlay = this._playNodeTab[i];
                onePlay.visible = true;
                let oneinfo=this.vo.getMapInfo(i+1);
                onePlay.setInfo(oneinfo);
            }

            let t = egret.setTimeout(()=>
            {
                this._isPlaying = false;

                egret.Tween.get(yunLeft).to({x : -yunLeft.width}, 600).call(()=>
                {
                    egret.Tween.removeTweens(yunLeft);
                    yunLeft.dispose();
                    yunLeft = null;
                }, this);
                egret.Tween.get(yunRight).to({x : GameConfig.stageWidth}, 600).call(()=>
                {
                    egret.Tween.removeTweens(yunRight);
                    yunRight.dispose();
                    yunRight = null;
                    this.hideViewMask();
                }, this);
            },this,1500);
        }, this);
    } 

    public showViewMask():void{
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    }

    public hideViewMask():void{
        let touchPos = <BaseBitmap>this.getChildByName("viewMaskTouchPos");
        if (touchPos){
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    }

    private detailBtnHandler():void{
		ViewController.getInstance().openView(ViewConst.POPUP.ACSEAWOMANPOPVIEW,{
			aid:this.aid, 
			code:this.code,
            uicode:this.getUiCode(),
		});
	}

    public tick():void
    {
        this._acTimeText.text = this.vo.getCountDownTime();
    }

    private freshView():void
    {
        this._playTimesText.text = LanguageManager.getlocal("acSeaWomanPlayTimes-"+this.getUiCode(),[String(this.vo.ainfo.v)]);
         let canplaystr = LanguageManager.getlocal("acSeaWomanCanPlayTimes-"+this.getUiCode(),[String(this.vo.num)]);
        if (this.vo.isFree())
        {
            canplaystr = LanguageManager.getlocal("acSeaWomanCanPlayTimes2-"+this.getUiCode(),[String(this.vo.num)]);
        }
        this._canplayTimesText.text = canplaystr;
        if (this.vo.isCangetAchieveReward() || this.vo.isCanExchange())
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let reddot = this._detailBtn.getChildByName("reddot");
            reddot.x = 51;
            reddot.y =  10;
        }
        else
        {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        for (let i=0; i<this._rewardNodeTab.length; i++)
        {
            let oneNode = this._rewardNodeTab[i];
            oneNode.setShowType(this.vo.getAchievementType(i+1));
        }

        this._timeRechargeTxt.text = LanguageManager.getlocal(`acSeaWomanRechargeInfo-${this.getUiCode()}`,[String(this.vo.getNextTimeNeedRecharge())]);
    }

    public dispose():void 
	{   
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        this._timeRechargeTxt = null;
        this._acTimeText = null;
        this._playTimesText = null;
        this._rewardNodeTab.length = 0;
        this._playNodeTab.length = 0;

        this._showId = 0;
        this._touchId = 0;
        this._shakeId = 0;
        this._fullFlag = false;
        this._delFlag = false;
        this._isPlaying = false;
        this._canplayTimesText = null;
        this._detailBtn = null;

		super.dispose();
	}
}