/**
 * 连连看
 */
class AcMouseTreasureGameView extends AcCommonView 
{   
    private _ss :number = 0.89; 
    private mapArrBtn: { [key: string]: BaseButton };
    private selected: { x: number, y: number };

    private nextCanLink: false | [{ x: number, y: number }, { x: number, y: number }];
    private resetFlag: boolean = false;
    private selectedEffect: [CustomMovieClip, CustomMovieClip];
    private tipEffect: [CustomMovieClip, CustomMovieClip];
    private xiaochuEffect: [CustomMovieClip, CustomMovieClip];
    private lineEffect: Array<{ line: CustomMovieClip, par: CustomMovieClip }>;
    private cellLayer: BaseDisplayObjectContainer;
    private selectLayer: BaseDisplayObjectContainer;
    private lineLayer: BaseDisplayObjectContainer;
    private boomLayer: BaseDisplayObjectContainer;
    /** 玩家无操作提示玩家的定时任务的句柄 */
    private tipHandler: false | number = false;


    //连线次数
    private _xcTimesTxt:BaseTextField=null;
    //免费次数
    private _timeText1:BaseTextField=null;
    //下次免费倒计时
    private _timeText2:BaseTextField=null;
    //分数
    private _scoreText1:BaseTextField=null;
    //双倍次数
    private _scoreText2:BaseTextField=null;
    //体力数
    private _itemText1:BaseTextField=null;
    //绣球数
    private _itemText2:BaseTextField=null;

    private _50attackBtn:BaseButton = null;

    private _clickHand:BaseBitmap = null;
    
    private _thisWidth:number;

    private _rewardNodeTab :MouseTreasureRewardNode[] = [];

    private _thebone:BaseLoadDragonBones = null;

    private destroyInfo:any=null;
    private _storage:string = null;
    private _timeRechargeTxt:BaseTextField=null;

    private get cfg(): Config.AcCfg.MouseTreasureCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    protected get acVo(): AcMouseTreasureVo {
        return <AcMouseTreasureVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    protected  getUiCode():string
	{   
		return this.param.data.uicode;
	}

     // 标题背景名称
	protected getTitleBgName():string
	{
		return App.CommonUtil.getResByCode(`mousetreasure_titlebg`,this.getUiCode());
	}

    //规则
    protected getRuleInfo(): string {
         return App.CommonUtil.getCnByCode(`mouseTreasureRuleInfo`,this.getUiCode());
    }    
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}       
    protected getBgName(): string {
        return  App.CommonUtil.getResByCode("mousetreasure_bg",this.getUiCode());
    }
    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } else {
            return resName+"-"+defaultCode;
        }
    }    
     protected initBg():void
    {
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.viewBg.y = GameConfig.stageHeigth - this.viewBg.height;
		this.addChild(this.viewBg);
    }

    private freshTimesTxt():void
    {
        this._scoreText1.text = LanguageManager.getlocal("mouseTreasure_score",[String(this.acVo.getScore())]);
        if (this.acVo.addtime > 0)
        {
            this._scoreText2.visible = true;
            this._scoreText2.text = LanguageManager.getlocal("mouseTreasure_score2",[String(this.acVo.addtime)]);
        }
        else
        {
            this._scoreText2.visible = false;
        }
        this._itemText1.text = "X"+this.acVo.num;
        this._itemText2.text = "X"+this.acVo.getAddItemNum();
        
        this._xcTimesTxt.text = LanguageManager.getlocal("mouseTreasure_gametimes",[String(this.acVo.getProcess())]);

        this.tick();
    }
     
    private tick() {

        let freetime = this.acVo.getFreeTimes();
        this._timeText1.text = LanguageManager.getlocal("mouseTreasure_freetime",[String(freetime)]);

        if (freetime < this.cfg.baseChance)
        {
            this._timeText2.visible= true;
            this._timeText2.text = LanguageManager.getlocal("mouseTreasure_freetime2",[App.DateUtil.getFormatBySecond(this.acVo.getNextFreeNeedTime(),3)]);
        }
        else
        {
            this._timeText2.visible= false;
        }
    }

    public initView() {
        
       
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_USEITEM, this.requestCallback2, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_GETRECHARGE, this.refreshRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_GETACHIEVEMENT, this.refreshRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_ATTACK, this.refreshRed, this); 
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_EXCHANGE, this.refreshRed, this); 

        //下部背景
        let mainBottom = BaseBitmap.create(this.getDefaultRes("mousetreasure_bottombg2"));
        mainBottom.y = GameConfig.stageHeigth - mainBottom.height;
        this.addChildToContainer(mainBottom);

        let titleBg = BaseBitmap.create(this.getDefaultRes("mousetreasure_descbg2"));
        titleBg.y = 78;
        this.addChildToContainer(titleBg);

         let code = this.getUiCode()
        //活动详情
        let detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode(`mousetreasure_timesbg`,code), "", ()=>
        {   
            if (this._thebone)
            {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREWARDPOPVIEW, {
                aid:this.acVo.aid, code:this.acVo.code, uicode:this.getUiCode()});
        }, this,null,1);
        detailBtn.setPosition(2, 90);
        this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;

        let xcTimesTxt = ComponentManager.getTextField(LanguageManager.getlocal("mouseTreasure_gametimes",[String(this.acVo.getProcess())]), 18, TextFieldConst.COLOR_WHITE);
		xcTimesTxt.width = detailBtn.width;
        xcTimesTxt.lineSpacing =1;
        xcTimesTxt.textAlign =egret.HorizontalAlign.CENTER;
        xcTimesTxt.setPosition(0, 36);
		detailBtn.addChild(xcTimesTxt);  
        this._xcTimesTxt = xcTimesTxt;


          //成就奖励
        let scrollContiner = new BaseDisplayObjectContainer()
        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,520,120);

		let scrollView = ComponentManager.getScrollView(scrollContiner,rect);
		this.addChildToContainer(scrollView);
        scrollView.setPosition(GameConfig.stageWidth-rect.width-10,90);
        scrollView.verticalScrollPolicy = "off";
        let cfgs = this.cfg.achievementList;
        for (let i=0; i<cfgs.length; i++)
        {
            let oneNode = new MouseTreasureRewardNode();
            oneNode.init(cfgs[i],code,this.rewardHandle,this);
            oneNode.setPosition(i*92+5,0);
            scrollContiner.addChild(oneNode);
            oneNode.setShowType(this.acVo.getAchievementType(i+1));
            this._rewardNodeTab.push(oneNode);
        }
        scrollContiner.width+=10;
        scrollView.setScrollLeft(scrollContiner.width-rect.width);
        egret.Tween.get(scrollView).wait(1).call(()=>{
            scrollView.setScrollLeft(0, 1000);
        });

        //  奖池展示
         let awardsBtn = ComponentManager.getButton("acheroine_rewardpoolbtn", "", ()=>
        {   
            if (this._thebone)
            {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREAWARDVIEW, {
                aid:this.acVo.aid, code:this.acVo.code, uicode:this.getUiCode()});
        }, this,null,1);
        awardsBtn.setPosition(35, GameConfig.stageHeigth-182);
        this.addChildToContainer(awardsBtn);

        // 各个层
        this.cellLayer = new BaseDisplayObjectContainer();
        this.addChild(this.cellLayer);
        this.selectLayer = new BaseDisplayObjectContainer();
        this.addChild(this.selectLayer);
        this.lineLayer = new BaseDisplayObjectContainer();
        this.addChild(this.lineLayer);
        this.boomLayer = new BaseDisplayObjectContainer();
        this.addChild(this.boomLayer);


        let times1 = ComponentManager.getTextField(" ",20,TextFieldConst.COLOR_LIGHT_YELLOW);
        times1.setPosition(30,mainBottom.y+28);
        this.addChildToContainer(times1);
        this._timeText1 = times1;

         let times2 = ComponentManager.getTextField(" ",20,TextFieldConst.COLOR_WARN_RED);
        times2.setPosition(10,mainBottom.y+65);
        this.addChildToContainer(times2);
        this._timeText2 = times2;

        let score1 = ComponentManager.getTextField(" ",20,TextFieldConst.COLOR_LIGHT_YELLOW);
        score1.width = GameConfig.stageWidth;
        score1.textAlign = egret.HorizontalAlign.CENTER;
        score1.setPosition(0,mainBottom.y-52);
        this.addChildToContainer(score1);
        this._scoreText1 = score1;

        let score2 = ComponentManager.getTextField(" ",20,TextFieldConst.COLOR_QUALITY_GREEN);
        score2.width = GameConfig.stageWidth;
        score2.textAlign = egret.HorizontalAlign.CENTER;
        score2.setPosition(0,mainBottom.y-30);
        this.addChildToContainer(score2);
        this._scoreText2 = score2;

        let itemName1 = ComponentManager.getTextField(LanguageManager.getlocal("mouseTreasure_item1"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        itemName1.setPosition(277-itemName1.width,times1.y);
        this.addChildToContainer(itemName1);

        let icon1 = BaseLoadBitmap.create(this.getDefaultRes("mousetreasure_strengthicon"));
        icon1.width = 30;
        icon1.height = 30;
        icon1.setPosition(itemName1.x+itemName1.width,itemName1.y+itemName1.height/2-icon1.height/2);
        this.addChildToContainer(icon1);

        let itemtext1 = ComponentManager.getTextField("0",20,TextFieldConst.COLOR_QUALITY_GREEN);
        itemtext1.setPosition(icon1.x+icon1.width,itemName1.y);
        this.addChildToContainer(itemtext1);
        this._itemText1 = itemtext1;

        let itembtn1 = ComponentManager.getButton("mainui_btn1","",this.onBtnClick,this);
		itembtn1.setPosition(itemtext1.x+66,itemName1.y+itemName1.height/2-itembtn1.height/2);
		this.addChildToContainer(itembtn1);

        let itemName2 = ComponentManager.getTextField(LanguageManager.getlocal("mouseTreasure_item2"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        itemName2.setPosition(493-itemName1.width,itemName1.y);
        this.addChildToContainer(itemName2);

        let icon2 = BaseLoadBitmap.create("itemicon2299");
        icon2.width = 30;
        icon2.height = 30;
        icon2.setPosition(itemName2.x+itemName2.width,itemName2.y+itemName2.height/2-icon2.height/2);
        this.addChildToContainer(icon2);

        let itemtext2 = ComponentManager.getTextField("0",20,TextFieldConst.COLOR_QUALITY_GREEN);
        itemtext2.setPosition(icon2.x+icon2.width,itemName1.y);
        this.addChildToContainer(itemtext2);
        this._itemText2 = itemtext2;

        let itembtn2 = ComponentManager.getButton("mainui_btn1","",()=>{

            if (!this.acVo.isInActivity()) 
            {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }       
            if (this.acVo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }        
            // if (this.acVo.getAddItemNum() <=0)
            // {
                // App.CommonUtil.showTip(LanguageManager.getlocal("mouseTreasure_useitemTip2"));
                //  let message: string = LanguageManager.getlocal("mouseTreasure_useItemTip");
                //     ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                //         msg : message,
                //         title : "itemUseConstPopupViewTitle",
                //         touchMaskClose : true,
                //         callback : ()=>
                //         {
                //             if (!this.acVo.isInActivity()) {
                //                 App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                //                 return;
                //             }
                //             ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREWARDPOPVIEW,{
                //                 aid:this.acVo.aid, 
                //                 code:this.acVo.code,
                //                 uicode:this.getUiCode(),
                //             });
                //         },            
                //         handler : this,
                //         needClose : 1,
                //         needCancel : true
                //     });  
            //     return;
            // }
            
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREUSEITEMVIEW, {
                aid:this.acVo.aid, code:this.acVo.code, uicode:this.getUiCode()});

        },this);
		itembtn2.setPosition(itemtext2.x+66,itemtext2.y+itemtext2.height/2-itembtn2.height/2);
		this.addChildToContainer(itembtn2);

        //50ci
        let btn50 = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"mouseTreasure_50times",()=>{

            if (!this.acVo.isInActivity()) 
            {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }       
            if (this.acVo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }  
            if (this._thebone)
            {
                return;
            }  

            if (this.acVo.getMapTotalCouple()<=0) 
            {
                return;
            } 

            let total = this.acVo.getMapTotalCouple();
            if(this.acVo.getTotalTimes() < total)
            {
                this.checkShowBuyTimes();   
                return;
            }
            this.destroyInfo = this.acVo.getDestroyArray();
             this.request(NetRequestConst.REQUEST_MOUSETREASURE_ALLATTACK, 
                    {
                        activeId: this.param.data.aid + "-" + this.param.data.code,
                    });


        },this);
        btn50.setPosition(GameConfig.stageWidth-btn50.width,mainBottom.y-btn50.height);
        this.addChildToContainer(btn50);
        this._50attackBtn = btn50;

        let rechargeTxt = ComponentManager.getTextField(LanguageManager.getlocal("mouseTreasure_tiliTip",[String(this.acVo.getNextTimeNeedRecharge())]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTxt.setPosition(itemName1.x ,this._timeText2.y)
        this.addChildToContainer(rechargeTxt);
        this._timeRechargeTxt = rechargeTxt;


        this.refreshRed();

        this.mapArrBtn = {};
        this.refreshGrid();
        this.resetFlag = false;
        this.initEffect();
        this.cellLayer.x = 3;
        this.cellLayer.y = -15;
    }

    private checkShow50Btn():boolean
    {
        if (this.acVo.getProcess()>=50 && String(this.acVo.code) != "3")
        {
            return true;
        }
        return false;
    }

    private rewardHandle(id : number):void
    {   
        // if (this._isPlaying)
        //     {
        //         return;
        //     }
        ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREREWARDPOPVIEWTAB2,{
                aid:this.param.data.aid, 
                code:this.param.data.code,
                uicode:this.param.data.uicode,
                id:id,
            });
    }

    private _detailBtn:BaseButton;
    private refreshRed() 
    {
        if (this.acVo.isCangetAchieveReward() || this.acVo.isCangetRechargeReward() || this.acVo.isCanExchange())
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let detailRed = <BaseBitmap>this._detailBtn.getChildByName("reddot");
            if (detailRed){
                detailRed.setPosition(70, 13);
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }        
        this.freshTimesTxt();

        this._50attackBtn.visible = this.checkShow50Btn();

        for (let i=0; i<this._rewardNodeTab.length; i++)
        {
            let oneNode = this._rewardNodeTab[i];
            oneNode.setShowType(this.acVo.getAchievementType(i+1));
        }

        this._timeRechargeTxt.text = LanguageManager.getlocal("mouseTreasure_tiliTip",[String(this.acVo.getNextTimeNeedRecharge())]);
    }    

    private onBtnClick():void
    {   
        // this.showBigBone();
        // return;
        if (!this.acVo.isInActivity()) 
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }       
        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }        
        if (this.acVo.buylimit >= this.cfg.buyLimit)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("mouseTreasure_buyTip2"));
            return;
        }
        
        ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREBUYITEMVIEW, {
                aid:this.acVo.aid, code:this.acVo.code, uicode:this.getUiCode()});
    }

   
     private requestCallback2(evt:egret.Event):void{
        if (!evt.data.ret){
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("mouseTreasure_useitemTip1"));
    }

    private initEffect() {
        // 选中框
        let ss = this._ss;
        let selectedEffect0 = ComponentManager.getCustomMovieClip("findsame_select_", 12, 100);
        selectedEffect0.width = 140*ss;
        selectedEffect0.height = 140*ss;
        selectedEffect0.visible = false;
        selectedEffect0.blendMode = egret.BlendMode.ADD;
        this.selectLayer.addChild(selectedEffect0);
        let selectedEffect1 = ComponentManager.getCustomMovieClip("findsame_select_", 12, 100);
        selectedEffect1.width = 140*ss;
        selectedEffect1.height = 140*ss;
        selectedEffect1.visible = false;
        selectedEffect1.blendMode = egret.BlendMode.ADD;
        this.selectLayer.addChild(selectedEffect1);
        this.selectedEffect = [selectedEffect0, selectedEffect1];
        // 提示框
        let tipEffect0 = ComponentManager.getCustomMovieClip("findsame_select_", 12, 100);
        tipEffect0.width = 140*ss;
        tipEffect0.height = 140*ss;
        tipEffect0.visible = false;
        tipEffect0.blendMode = egret.BlendMode.ADD;
        this.selectLayer.addChild(tipEffect0);
        let tipEffect1 = ComponentManager.getCustomMovieClip("findsame_select_", 12, 100);
        tipEffect1.width = 140*ss;
        tipEffect1.height = 140*ss;
        tipEffect1.visible = false;
        tipEffect1.blendMode = egret.BlendMode.ADD;
        this.selectLayer.addChild(tipEffect1);
        this.tipEffect = [tipEffect0, tipEffect1];
        // 消除特效（碎片）
        let xiaochuEffect0 = ComponentManager.getCustomMovieClip("findsame_xiaochu_", 11, 100);
        xiaochuEffect0.width = 120*ss;
        xiaochuEffect0.height = 120*ss;
        xiaochuEffect0.visible = false;
        this.boomLayer.addChild(xiaochuEffect0);
        let xiaochuEffect1 = ComponentManager.getCustomMovieClip("findsame_xiaochu_", 11, 100);
        xiaochuEffect1.width = 120*ss;
        xiaochuEffect1.height = 120*ss;
        xiaochuEffect1.visible = false;
        this.boomLayer.addChild(xiaochuEffect1);
        this.xiaochuEffect = [xiaochuEffect0, xiaochuEffect1];
        // 连接线
        this.lineEffect = [];
        this.confirmLineCount(10);
        // 321倒计时
        if (this.acVo.st + 3 > GameData.serverTime) {
            // 如果这一局的开始时间在当前时间之前，则认为是第一次进来，则显示321倒计时
            for (var i = 3; i >= 1; i--) {
                let effect321 = ComponentManager.getBitmapText("","activity_fnt",30);
                effect321.text = String(i);
                effect321.anchorOffsetX = effect321.width/2;
                effect321.anchorOffsetY = effect321.height/2;
                effect321.x = GameConfig.stageWidth/2;
                effect321.y = GameConfig.stageHeigth/2;
                effect321.setScale(5);
                effect321.alpha = 0;
                this.addChild(effect321);
                egret.Tween.get(effect321)
                    .wait((3-i) * 1000)
                    .to({scaleX:2,scaleY:2, alpha:1}, 8/30*1000)
                    .wait(14/30 * 1000)
                    .to({alpha:0}, 8/30*1000)
                    .call(()=>{
                        effect321.parent.removeChild(effect321);
                    });
            }
        }
    }
    /** 确保有count个连接线段 */
    private confirmLineCount(count: number) {
        let ss = this._ss*0.98;
        for (var index = this.lineEffect.length; index < count; index++) {
            let oneLine = ComponentManager.getCustomMovieClip("findsame_lianxian_", 5, 50);
            oneLine.width = 260*ss;
            oneLine.height = 150*ss;
            oneLine.visible = false;
            oneLine.anchorOffsetX = oneLine.width / 2;
            oneLine.anchorOffsetY = oneLine.height / 2;
            oneLine.blendMode = egret.BlendMode.ADD;
            this.lineLayer.addChild(oneLine);
            let onePar = ComponentManager.getCustomMovieClip("findsame_par_", 13, 50);
            onePar.width = 260*ss;
            onePar.height = 150*ss;
            onePar.visible = false;
            onePar.anchorOffsetX = onePar.width / 2;
            onePar.anchorOffsetY = onePar.height / 2;
            onePar.blendMode = egret.BlendMode.ADD;
            this.lineLayer.addChild(onePar);
            this.lineEffect[index] = { line: oneLine, par: onePar };
        }
    }
    /** 播放连线特效 */
    private playLineEffect(points: Array<{ x: number, y: number }>,pos:number) {
        let allCount = 0;
        for (let i = 0; i < points.length - 1; i++) {
            allCount += Math.abs(points[i].x - points[i + 1].x) + Math.abs(points[i].y - points[i + 1].y);
        }
        App.LogUtil.log("need all line count", allCount);
        this.confirmLineCount(allCount);
        // 相临点数组
        let twoPointArr: Array<[{ x: number, y: number }, { x: number, y: number }]> = [];
        for (let i = 0; i < points.length - 1; i++) {
            let startPoint = points[i];
            let endPoint = points[i + 1];
            let points2 = this.getAllPointByTwoPoint(startPoint, endPoint);

            for (let j = 0; j < points2.length - 1; j++) {
                twoPointArr.push([points2[j], points2[j + 1]]);
            }
        }
        // 根据相临点数组，播放所有的单段动画
        for (let i = 0; i < twoPointArr.length; i++) {
            let startPoint = twoPointArr[i][0];
            let endPoint = twoPointArr[i][1];
            let centerPoint = { x: (startPoint.x + endPoint.x) / 2, y: (startPoint.y + endPoint.y) / 2 }
            let effectPos = this.getCellPos(centerPoint.x, centerPoint.y);
            let effect = this.lineEffect[i];
            effect.line.x = effectPos.x;
            effect.line.y = effectPos.y-20;
            effect.par.x = effectPos.x;
            effect.par.y = effectPos.y-20;
            if (startPoint.x == endPoint.x) {
                effect.line.rotation = 90;
                effect.par.rotation = 90;
            } else {
                effect.line.rotation = 0;
                effect.par.rotation = 0;
            }
            effect.line.visible = true;

            let addEffect = null;
            let addEffect2 = null;
            if (pos >=10)
            {
                
                let oneLine2 = ComponentManager.getCustomMovieClip("findsame_lianxian_", 5, 50);
                oneLine2.width = effect.line.width;
                oneLine2.height = effect.line.height;
                oneLine2.anchorOffsetX =effect.line.anchorOffsetX;
                oneLine2.anchorOffsetY = effect.line.anchorOffsetY;
                oneLine2.blendMode = egret.BlendMode.ADD;
                oneLine2.rotation = effect.line.rotation;
                if (effect.line.rotation == 90)
                {
                    oneLine2.x = effect.line.x-3;
                    oneLine2.y = effect.line.y;
                }
                else
                {
                    oneLine2.x = effect.line.x;
                    oneLine2.y = effect.line.y-3;
                }
                this.lineLayer.addChild(oneLine2);
                addEffect2 = oneLine2;
                oneLine2.playWithTime(1);

                let oneLine = ComponentManager.getCustomMovieClip("findsame_lianxian_", 5, 50);
                oneLine.width = effect.line.width;
                oneLine.height = effect.line.height;
                oneLine.anchorOffsetX =effect.line.anchorOffsetX;
                oneLine.anchorOffsetY = effect.line.anchorOffsetY;
                oneLine.blendMode = egret.BlendMode.ADD;
                oneLine.rotation = effect.line.rotation;
                if (effect.line.rotation == 90)
                {
                    oneLine.x = effect.line.x+3;
                    oneLine.y = effect.line.y;
                }
                else
                {
                    oneLine.x = effect.line.x;
                    oneLine.y = effect.line.y+3;
                }
                this.lineLayer.addChild(oneLine);
                addEffect = oneLine;
                oneLine.playWithTime(1);
            }


            effect.line.playWithTime(1);
            effect.line.setEndCallBack(() => {
                if (addEffect)
                {
                    addEffect.dispose();
                }
                if (addEffect2)
                {
                    addEffect2.dispose();
                }

                effect.line.visible = false;
                effect.par.visible = true;
                effect.par.playWithTime(1);
                effect.par.setEndCallBack(() => {
                    effect.par.visible = false;
                }, this);
            }, this);


        }
    }
    /** 根据两个点，列出这条线段上的所有点, 会升序排列 */
    private getAllPointByTwoPoint(p1: { x: number, y: number }, p2: { x: number, y: number }): Array<{ x: number, y: number }> {
        let rets = [];
        if (p1.x == p2.x) {
            for (let y = Math.min(p1.y, p2.y); y <= Math.max(p1.y, p2.y); y++) {
                rets.push({ x: p1.x, y: y });
            }
        } else if (p1.y == p2.y) {
            for (let x = Math.min(p1.x, p2.x); x <= Math.max(p1.x, p2.x); x++) {
                rets.push({ x: x, y: p1.y });
            }
        } else {
            App.LogUtil.log("两个点不在一条直线上");
        }
        return rets;
    }
   
    private playCellGone(pos1: number, pos2: number) {
        egret.Tween.get(this.mapArrBtn[pos1])
            .to({ alpha: 0 }, 500)
        egret.Tween.get(this.mapArrBtn[pos2])
            .to({ alpha: 0 }, 500);
    }

    private checkShowBuyTimes():void
    {
        if (this.acVo.buylimit >= this.cfg.buyLimit)
        {
           let message: string = LanguageManager.getlocal("mouseTreasure_buyTip4");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : message,
                title : "itemUseConstPopupViewTitle",
                touchMaskClose : true,
                callback : ()=>
                {
                    if (!this.acVo.isInActivity()) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },            
                handler : this,
                needClose : 1,
                needCancel : true
            });  
        }
        else
        {
            let message: string = LanguageManager.getlocal("mouseTreasure_buyTip3");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : message,
                title : "itemUseConstPopupViewTitle",
                touchMaskClose : true,
                callback : ()=>
                {   
                    if (!this.acVo.isInActivity()) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
                    ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREBUYITEMVIEW, {
                        aid:this.acVo.aid, code:this.acVo.code, uicode:this.getUiCode()
                    });
                },            
                handler : this,
                needClose : 1,
                needCancel : true
            });     
        }
    }

    private cellClick(x: number, y: number ,ppos: number) {

        if (!this.acVo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }     
        if (this.acVo.st + 3 > GameData.serverTime) {
            App.LogUtil.log("倒计时未结束");
            return;
        }
        let type = this.acVo.getMapType(ppos);
        this.regTipCell();
        if(this.acVo.getTotalTimes() <= 0)
        {
            this.checkShowBuyTimes();   
            return;
        }
        let view = this;
        let pos = x + y * this.cfg.GRID_WIDTH;
        if (this.selected) {
            let selectedPos = this.selected.x + this.selected.y * this.cfg.GRID_WIDTH;
            let linked = this.acVo.checkLink(this.selected, { x: x, y: y });
            if (linked == false) {
                // 不连通
                this.selected = { x: x, y: y };
                this.setSelectEffect(0, this.selected);
            } else {
                
                 let anim = function()
                 {
                    // 连通
                    view.playXiaochuEffect(view.selected, { x: x, y: y });
                    view.playLineEffect([view.selected, linked[0], linked[1], { x: x, y: y }],type);
                    view.playCellGone(selectedPos, pos);
                    view.setSelectEffectGone(0);
                    delete view.acVo.map.arr[selectedPos];
                    delete view.acVo.map.arr[pos];             
                    view.mapArrBtn[selectedPos].parent.removeChild(view.mapArrBtn[selectedPos]);
                    view.mapArrBtn[pos].parent.removeChild(view.mapArrBtn[pos]);
                    delete view.mapArrBtn[selectedPos];
                    delete view.mapArrBtn[pos];
                    setTimeout(() => {
                        let reset = 0;
                        if (Object.keys(view.acVo.map.arr).length > 0) { // 如果还没结束
                            view.nextCanLink = view.acVo.scanForLink();
                            App.LogUtil.log("nextCanLink", view.nextCanLink);
                            if (!view.nextCanLink) {
                                reset = 1;// 重置
                                view.resetFlag = true;
                            }
                        }
                        view.request(NetRequestConst.REQUEST_MOUSETREASURE_ATTACK, 
                        {
                            activeId: view.param.data.aid + "-" + view.param.data.code,
                            pos1: pos,
                            pos2: selectedPos,
                            reset: reset,
                        });
                    }, 500);
                    view.selected = null;
                 }

                 let needPop = false;
                 if (type == 10 )
                 {     
                     let key: string = "10"+ this.acVo.aidAndCode+ Api.playerVoApi.getPlayerID() + String(this.acVo.st); 
                     if (!this._storage)
                     {
                        this._storage = LocalStorageManager.get(key); 
                     }

                     if (!this._storage)
                     {  
                        this._storage="1";
                        LocalStorageManager.set(key, "1");
                        if (this.acVo.addtime==0)
                        {
                            needPop = true;
                        }
                     }
                 }
                //  needPop = true;
                 if (needPop)
                 {
                    let message: string = LanguageManager.getlocal("mouseTreasure_useItemTip3");
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                        msg : message,
                        title : "itemUseConstPopupViewTitle",
                        touchMaskClose : true,
                        callback : ()=>
                        {
                            if (!view.acVo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                                return;
                            }
                            let itemVo = this.cfg.getAddItemVo();
                            // if (Api.itemVoApi.getItemNumInfoVoById(itemVo.id) <=0)
                            // {
                            //     // App.CommonUtil.showTip(LanguageManager.getlocal("mouseTreasure_useitemTip2"));
                            //     let message: string = LanguageManager.getlocal("mouseTreasure_useItemTip");
                            //     ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                            //         msg : message,
                            //         title : "itemUseConstPopupViewTitle",
                            //         touchMaskClose : true,
                            //         callback : ()=>
                            //         {
                            //             if (!this.acVo.isInActivity()) {
                            //                 App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                            //                 return;
                            //             }
                            //             ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREWARDPOPVIEW,{
                            //                 aid:this.acVo.aid, 
                            //                 code:this.acVo.code,
                            //                 uicode:this.getUiCode(),
                            //             });
                            //         },            
                            //         handler : this,
                            //         needClose : 1,
                            //         needCancel : true
                            //     });  
                            //     return;
                            // }
                            // else
                            // {
                                 ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREUSEITEMVIEW,{
                                    aid:view.acVo.aid, 
                                    code:view.acVo.code,
                                    uicode:view.getUiCode(),
                                });
                            // }

                        },            
                        handler : view,
                        needClose : 1,
                        needCancel : true,
                         cancelcallback : ()=>{
                              anim();
                         },
                    });  
                    return;
                 }
                 else
                 {
                     anim();
                 }
                
               
            }
        } else {
            this.selected = { x: x, y: y };
            this.setSelectEffect(0, this.selected);
        }
    }
    /** 设置选中框 */
    private setSelectEffect(index: 0 | 1,  p?: { x: number, y: number }) {
        let cellPos = this.getCellPos(p.x, p.y);
        this.selectedEffect[index].x = cellPos.x - this.selectedEffect[index].width / 2 -2;
        this.selectedEffect[index].y = cellPos.y - this.selectedEffect[index].height / 2 - 22;
        this.selectedEffect[index].visible = true;
        this.selectedEffect[index].alpha = 1;
        this.selectedEffect[index].playWithTime(0);
    }
    /** 选中框渐 */
    private setSelectEffectGone(index: 0 | 1) {

        this.selectedEffect[index].visible = false;
        this.selectedEffect[index].stop();
    }
    /** 播放消除碎片 */
    private playXiaochuEffect(p1?: { x: number, y: number }, p2?: { x: number, y: number }) {
        let posArr = [p1, p2];
        for (let index = 0; index < this.xiaochuEffect.length; index++) {
            let element = this.xiaochuEffect[index];
            element.setEndCallBack(null,null);
            element.stop();
            element.goToAndPlay(0);
        }

        for (let index = 0; index < this.xiaochuEffect.length; index++) {
            let element = this.xiaochuEffect[index];
            let cellPos = this.getCellPos(posArr[index].x, posArr[index].y);
            element.x = cellPos.x - element.width / 2;
            element.y = cellPos.y - element.height / 2-20;
            element.visible = true;
            element.playWithTime(1);
            element.setEndCallBack(() => {
                element.visible = false;
            }, this);
        }
    }
    /** 刷新网格 */
    private refreshGrid() {
        if (this.mapArrBtn) {
            for (var key in this.mapArrBtn) {
                if (this.mapArrBtn.hasOwnProperty(key)) {
                    var btn = this.mapArrBtn[key];
                    btn.parent.removeChild(btn);
                }
            }
        }
        this.mapArrBtn = {};
        for (let x = this.cfg.GRID_WIDTH; x >= 1; x--) {
            for (let y = 1; y <= this.cfg.GRID_HEIGHT; y++) {
                let pos = x + y * this.cfg.GRID_WIDTH;
                let item = this.acVo.map.arr[pos];
                if (item) {
                    let buttonBg = ComponentManager.getButton(this.getDefaultRes("mousetreasure_iconbg"), "", () => {
                        this.cellClick(x, y,pos);
                    }, this);
                    let cellPos = this.getCellPos(x, y);
                    buttonBg.x = cellPos.x - 38;
                    buttonBg.y = cellPos.y - 38;
                    buttonBg.setScale(0.8);
                    this.cellLayer.addChild(buttonBg);
                    let icon: BaseBitmap = BaseBitmap.create(this.getDefaultRes("mousetreasure_icon" + item));
                    icon.name = "icon";
                    icon.x = 0;
                    icon.y = 0;
                    // icon.setScale(0.7);
                    buttonBg.addChild(icon);
                    this.mapArrBtn[pos] = buttonBg;

                    if (item == 10)
                    {
                        let effect = ComponentManager.getCustomMovieClip(`ac_mouset_double_ef`, 10, 100);
                        effect.width = 80;
                        effect.height = 80;
                        effect.x = icon.width/2 - effect.width/2;
                        effect.y = icon.height/2 - effect.height/2;
                        effect.playWithTime(-1);
                        buttonBg.addChild(effect);
                        effect.blendMode = egret.BlendMode.ADD;
                    }
                }
            }
        }

        this.nextCanLink = this.acVo.scanForLink();
        App.LogUtil.log("nextCanLink", this.nextCanLink);
        this.regTipCell();
    }
    /** 注册提示框 */
    private regTipCell() {

        if (this._thebone)
        {
            return;
        }

        if (this.tipHandler != false) {
            clearInterval(this.tipHandler);
        }
        let view = this;
        this.tipHandler = setInterval(() => {
            if (this._thebone)
            {
                return;
            }
            // 提示玩家
            view.fadeInOutTip(0, view.nextCanLink[0]);
            view.fadeInOutTip(1, view.nextCanLink[1]);
        }, this.cfg.tipsTime * 1000);
    }
    private fadeInOutTip(index: number, p: { x: number; y: number; }) 
    {    
        if (this._thebone)
        {
            return;
        }
        let view = this;
        let cellPos = this.getCellPos(p.x, p.y);
        this.tipEffect[index].x = cellPos.x - this.tipEffect[index].width / 2 + 4-5;
        this.tipEffect[index].y = cellPos.y - this.tipEffect[index].height / 2 - 15-5;
        this.tipEffect[index].visible = true;
        this.tipEffect[index].alpha = 0;
        this.tipEffect[index].playWithTime(0);
        this.tipEffect[index].$addListener
        egret.Tween.get(this.tipEffect[index])
            .to({ alpha: 1 }, 500)
            .to({ alpha: 0 }, 500)
            .to({ alpha: 1 }, 500)
            .to({ alpha: 0 }, 500)
            .call(() => {
                view.tipEffect[index].visible = false;
                view.tipEffect[index].stop();
            })
    }

    private stopFadeInOutTip():void
    {
        for (let k in this.tipEffect)
        {
            this.tipEffect[k].visible = false;
            this.tipEffect[k].stop();
        }
    }

    /** 播放重置动画前半段 */
    private playResetBefore(endCallback: () => void) {
        if (this.mapArrBtn) {
            for (var key in this.mapArrBtn) {
                if (this.mapArrBtn.hasOwnProperty(key)) {
                    var icon = this.mapArrBtn[key].getChildByName("icon");
                    egret.Tween.get(icon)
                        .to({ alpha: 0, y: - 30 }, 500)
                        .wait(500)
                        .call(endCallback);
                }
            }
        }
    }
    /** 播放重置动画后半段 */
    private playResetAfter(endCallback: () => void) {
        if (this.mapArrBtn) {
            for (var key in this.mapArrBtn) {
                if (this.mapArrBtn.hasOwnProperty(key)) {
                    var icon = this.mapArrBtn[key].getChildByName("icon");
                    icon.alpha = 0;
                    icon.y = - 30;
                    egret.Tween.get(icon)
                        .to({ alpha: 1, y: 0 }, 500)
                        .call(endCallback);
                }
            }
        }
    }
    //请求回调
    protected receiveData(data: { ret: boolean, data: any }): void {
        if (!data.ret) 
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("findsame_opt_fail") + data.data.ret);
        }
        this.freshTimesTxt();
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_MOUSETREASURE_ATTACK) 
        {
            if (data.data.data.mscore) 
            { // 通关了

            }else
            {
                if (Object.keys(this.acVo.map.arr).length > 0)
                {
                    if(this.resetFlag)
                    {
                        this.resetFlag = false;
                        this.cellLayer.x = 3;
                        App.CommonUtil.showTip(LanguageManager.getlocal("findsame_game_reset"));
                        egret.Tween.get(this.cellLayer).to({x:-640},750).call(()=>
                        {
                            this.refreshGrid();
                            this.cellLayer.x = 640;
                            egret.Tween.get(this.cellLayer).to({x:3},750).call(()=>
                            {
                                this.nextCanLink = this.acVo.scanForLink();
                                this.regTipCell();
                            },this);
                        },this);
                    }
                }else
                {
                    this.request(NetRequestConst.REQUEST_MOUSETREASURE_GETMAP, { "activeId": this.acVo.aidAndCode });
                }
            }
            let strList = [];
            let flyStr = LanguageManager.getlocal("acPunishGetScoreTxt4",[String(data.data.data.score)]);
			strList.push({tipMessage:flyStr} );
			
            App.CommonUtil.playRewardFlyAction(strList);
			egret.setTimeout( ()=>{
                if(data.data.data.rewards)
                {
                    let rewardVoList = GameData.formatRewardItem(data.data.data.rewards);
                    App.CommonUtil.playRewardFlyAction(rewardVoList);      
                }
            },this,800);

            
        }
        else if (data.ret && data.data.cmd == NetRequestConst.REQUEST_MOUSETREASURE_ALLATTACK)
        {   
            this.showBigBone();
            let strList = [];
            let flyStr = LanguageManager.getlocal("acPunishGetScoreTxt4",[String(data.data.data.score)]);
			strList.push({tipMessage:flyStr} );
			
            App.CommonUtil.playRewardFlyAction(strList);
			egret.setTimeout( ()=>{
                if(data.data.data.rewards)
                {
                    let rewardVoList = GameData.formatRewardItem(data.data.data.rewards);
                    App.CommonUtil.playRewardFlyAction(rewardVoList);      
                }
            },this,800);
        }
        else if (data.ret && data.data.cmd == NetRequestConst.REQUEST_MOUSETREASURE_GETMAP)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("findsame_game_reset1"));
            this.cellLayer.x = 640;
            this.refreshGrid();
            egret.Tween.get(this.cellLayer).to({x:3},750).call(()=>
            {
                this.nextCanLink = this.acVo.scanForLink();
                this.regTipCell();
            },this);

        }
        // else if (data.ret && data.data.cmd == NetRequestConst.REQUEST_MOUSETREASURE_BUYNUM)
        // {
        //     let rewardVoList = GameData.formatRewardItem(this._isTen?"1056_0_10":"1056_0_1");
        //     let gPoint = this._buyBtn.parent.localToGlobal(this._buyBtn.x,this._buyBtn.y);
        //     let point = new egret.Point(GameConfig.stageWidth/2,gPoint.y - 50);
        //     App.CommonUtil.playRewardFlyAction(rewardVoList,point);  
        //     if(this._clickHand)
        //     {
        //         this._clickHand.visible = false;
        //     }            
        // }
    }
    protected getTitleStr(): string {
        return null;
    }
    private getDefaultResList(resArr: string[]): string[] {
        let arr = [];
        for (let i = 0; i < resArr.length; i++) {
            const element = resArr[i];
            let defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    }
    /** 得到cell的位置（cell的中心位置，各个层次元素根据自身情况自己加偏移） */
    private getCellPos(x: number, y: number): { x: number, y: number } {
        const CELL_SIZE = 66;
        let retX = (GameConfig.stageWidth / 2 - CELL_SIZE * this.cfg.GRID_WIDTH / 2) + ((x + 0.5) * CELL_SIZE);
        let retY = (GameConfig.stageHeigth / 2 - CELL_SIZE * this.cfg.GRID_HEIGHT / 2) + ((y + 0.5) * CELL_SIZE)+50;
        return { x: retX, y: retY };
    }

    private showBigBone():void
    {   
        this.stopFadeInOutTip();
        let bigBone = "acmouse_boom"
        if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(bigBone+"_ske"))
        {
            let theBone = App.DragonBonesUtil.getLoadDragonBones(bigBone);
			theBone.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
			LayerManager.maskLayer.addChild(theBone);
            theBone.touchEnabled = true;
            this._thebone = theBone;

            theBone.setDragonBoneEventListener(dragonBones.EventObject.START,()=>{
                this.showDestroy();
            },this);

            theBone.setDragonBoneEventListener(dragonBones.EventObject.FRAME_EVENT,(data)=>{
                
                App.LogUtil.log("QAZ"+data);
                this.shakeScreen();
            },this);

            theBone.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE,(data)=>{
                
                theBone.dispose();
                this._thebone = null;
                
                this.stopScreen();
                this.resetGame();

            },this);
        }
        else
        {
            this.resetGame();
        }
    }

    private shakeScreen():void
    {
        let ax =5-App.MathUtil.getRandom(0,10);
        let ay =5-App.MathUtil.getRandom(0,10);
        egret.Tween.get(this).to({x:ax,y:ay},100).call(()=>{
            this.stopScreen();
        },this);
    }

    private stopScreen():void
    {
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.container);
        this.x=0;
        this.y=0;
    }

    private resetGame():void
    {
         this.request(NetRequestConst.REQUEST_MOUSETREASURE_GETMAP, { "activeId": this.acVo.aidAndCode });
    }

    private showDestroy():void
    {
        

        let destroyInfo = this.destroyInfo;
        let allkey = Object.keys(destroyInfo);
        let timeRage = 1000/allkey.length;


        for (let k = 0 ;k<allkey.length; k++)
        {
            let onekey = allkey[k];
            let infoany:any[] = destroyInfo[onekey];
            
            let waitTime = k*50;
            for (let i = 0; i< infoany.length; i++)
            {
                let pos1 =infoany[i].x + infoany[i].y * this.cfg.GRID_WIDTH; 
                
                let ss = this._ss;
                let xiaochuEffect0 = ComponentManager.getCustomMovieClip("findsame_xiaochu_", 11, 100);
                xiaochuEffect0.width = 120*ss;
                xiaochuEffect0.height = 120*ss;
                this.boomLayer.addChild(xiaochuEffect0);
                let cellPos = this.getCellPos(infoany[i].x, infoany[i].y);
                xiaochuEffect0.x = cellPos.x - xiaochuEffect0.width / 2;
                xiaochuEffect0.y = cellPos.y - xiaochuEffect0.height / 2-20;
               
                xiaochuEffect0.setEndCallBack(() => {
                    xiaochuEffect0.dispose();
                }, this);

                egret.Tween.get(this.mapArrBtn[pos1]).wait(waitTime).to({ alpha: 0 }, 500).call(()=>{
                     xiaochuEffect0.playWithTime(1);
                },this);
            }
        }
    }

    protected getResourceList(): string[] {


        let codeRes = this.getDefaultResList([
            "mousetreasure_bottombg2",
            "mousetreasure_descbg2",
            "mousetreasure_timesbg",
            "mousetreasure_reward1",
            "mousetreasure_reward2",
            "mousetreasure_iconbg",
            "mousetreasure_icon1",
            "mousetreasure_icon2",
            "mousetreasure_icon3",
            "mousetreasure_icon4",
            "mousetreasure_icon5",
            "mousetreasure_icon6",
            "mousetreasure_icon7",
            "mousetreasure_icon8",
            "mousetreasure_icon9",
            "mousetreasure_icon10",
            "mousetreasure_numbg",

        ]);
        let baseList = [
           "acheroine_rewardpoolbtn",
            "activity_fnt",
            "guide_hand",
        ];
        let codeList = [];


        return super.getResourceList().concat(baseList).concat(codeList).concat(codeRes);
    }

    public dispose():void
    {
        this.x=0;
        this.y = 0;
        
        this.mapArrBtn = null;
        this.selected = null;
        this.nextCanLink = null;
        this.resetFlag = false;
        this.selectedEffect.length = 0;
        this.xiaochuEffect.length = 0;
        this.tipEffect.length = 0;
        this.xiaochuEffect.length = 0;
        this.lineEffect.length = 0;
        this.cellLayer = null;
        this.selectLayer = null;
        this.lineLayer = null;
        this.boomLayer = null;

        if (this.tipHandler !== false) {
            clearInterval(this.tipHandler);
            this.tipHandler = false;
        }        
        if(this._clickHand)
        {
            egret.Tween.removeTweens(this._clickHand);
            this._clickHand = null;
        }
        this._timeText1 = null;
        this._timeText2 = null;
        this._scoreText1 = null;
        this._scoreText2 = null;
        this._itemText1 = null;
        this._itemText2 = null;
        this._rewardNodeTab.length = 0;
        this._50attackBtn = null;

        if (this._thebone)
        {
            this._thebone.dispose();
            this._thebone = null;
        }
        this._storage = null;
        this._timeRechargeTxt = null;

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_GETRECHARGE, this.refreshRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_GETACHIEVEMENT, this.refreshRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_ATTACK, this.refreshRed, this);       
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_EXCHANGE, this.refreshRed, this);     
        
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_USEITEM, this.requestCallback2, this);
           
        super.dispose();
    }

}