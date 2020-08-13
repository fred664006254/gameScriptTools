/**
* 鼠来招财
* date 2020.6.29
* author wxz
* @name AcMouseGoldView
*/
class AcMouseGoldView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _timeTxt:BaseTextField = null;
    private _scrollView:ScrollView = null;
    private _proContainer:BaseDisplayObjectContainer = null;
    private _freeDesc:BaseTextField = null;
    private _timesTxt:BaseTextField = null;
    private _bgNameTxt:BaseTextField = null;
    private _boxList:any[] = [];
    private _lightList:any[] = [];
    private _isPlay:boolean = false;
    private _isMove:boolean = false;
    private _processContainer:BaseDisplayObjectContainer = null;
    private _processNum:BaseTextField = null;
    private _progressBar:ProgressBar = null;
    private _proLight:BaseBitmap = null;
    private _rewardData:any = null;
    private _detailBtn:BaseButton = null;
    private _rechargeTip:BaseTextField = null;
    private _cellConArr:BaseDisplayObjectContainer[] = null;
    private _smallTxtArr:BaseTextField[] = null;

    private _tipsTxt:BaseTextField = null;
    private _allBtn:BaseButton = null;
    private _tempMap:any = null;

    private _bgResNameArr = ["discussviewbg","homescene_17001273","atkracecross_bg2","acskysound_bg-1",
                            "acdrinktea_bg-1","chooserole_bg","homescene_17009017"];
    public constructor() {
        super();
    }

    protected getBgName():string{
        return this._bgResNameArr[this.vo.layer%this._bgResNameArr.length];
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return App.CommonUtil.getResByCode("acmousegold_title", this.getUiCode());
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return App.CommonUtil.getCnByCode("acMouseGoldRuleInfo", this.getUiCode());
    }

    protected getRuleInfoParam():string[]{
        return [""+this.cfg.needGem];
    }

    protected getProbablyInfo():string{
        return App.CommonUtil.getCnByCode("acMouseGoldProbablyInfo", this.getUiCode());
    }

    protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
    }
    
    protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
        return { title: { key: App.CommonUtil.getCnByCode("acMouseGoldReportTitle", this.getUiCode())}, msg: { key: App.CommonUtil.getCnByCode("acMouseGoldReportMsg", this.getUiCode())}};
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "acmousegoldcode1", "acmousegoldcode"+this.getUiCode(),
            "acwealthcarpview_servantskintxt",this._bgResNameArr[this.vo.layer%this._bgResNameArr.length]
        ).concat(list);
    }

    protected getUiCode():string{
        let code:string= "";
        switch(Number(this.code)){
            case 2:
               code = "1";
               break;
            default:
                code = this.code;
                break; 
        }
        return code;
    }

    private get vo():AcMouseGoldVo{
        return <AcMouseGoldVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.MouseGoldCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    //进度 间距
    private get progressOffX():number{
        return 90;
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOP, this.flopCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_GETSPEREWARD, this.getSpRewardCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_NEXT, this.nextCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOPALL, this.flopAllCallback, this);

        let bottomMask = BaseBitmap.create("acmousegold_maskbg");
        bottomMask.setPosition(GameConfig.stageWidth/2 - bottomMask.width/2, 120);
        this.addChildToContainer(bottomMask);
        this.container.setChildIndex(bottomMask,1);

        let infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_infobg", this.getUiCode()));
        infoBg.setPosition(this.titleBg.x + this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);

        //活动时间
        let dateText = ComponentManager.getTextField(LanguageManager.getlocal("acComm_time", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        dateText.x = infoBg.x + 30;
        dateText.y = infoBg.y + 16;
        this.addChildToContainer(dateText);

        let change:string = this.cfg.exchange.needItem;
        //活动文本
        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldInfo", this.getUiCode()), [""+this.cfg.needGem,change.split("_")[2]]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        descTxt.width = 580;
        descTxt.lineSpacing = 4;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 5;
        this.addChildToContainer(descTxt);

        let rechargeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRechargeInfo", this.getUiCode()), [""+this.vo.getNeedRecharge()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTip.setPosition(descTxt.x, infoBg.y + infoBg.height - rechargeTip.height - 23);
        this.addChildToContainer(rechargeTip);
        this._rechargeTip = rechargeTip;

        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - 17 - this._timeBg.height / 2;
		this.addChildToContainer(this._timeBg);
		this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 260;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 20;
		this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);

        //进度条上方
        let progressZshi = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_progresszshi", this.getUiCode()));
        progressZshi.setPosition(infoBg.x +infoBg.width/2 - progressZshi.width/2, infoBg.y + infoBg.height);
        this.addChildToContainer(progressZshi);
        //进度条底
        let proBottom = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_probottom", this.getUiCode()));
        proBottom.setPosition(0, progressZshi.y + progressZshi.height - 5);
        this.addChildToContainer(proBottom);

        //进度条
        let proContainer = new BaseDisplayObjectContainer();
        proContainer.height = 160;
        this._proContainer = proContainer;

        let scrollView = ComponentManager.getScrollView(proContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth - 63, proContainer.height));
        scrollView.setPosition(63, infoBg.y + infoBg.height - 35 + 12);
        // this.addChildToContainer(scrollView);
        scrollView.bounces = false;
        this._scrollView = scrollView;

        //详情按钮
        let detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acmousegold_detailbtn", this.getUiCode()), "", ()=>{
            if (!this.vo.isStart)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSEGOLDREWARDPOPVIEW, {aid: this.aid, code: this.code});
        }, this);
        detailBtn.setPosition(10, infoBg.y + infoBg.height - 8);
        // this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;

        //进度条相关
        this.initProContainer();
        //bottom
        let bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_bot", this.getUiCode()));
        bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2, GameConfig.stageHeigth - bottomBg.height);

        //衣装
        let skinId = this.cfg.show;
        App.LogUtil.log("skinId: "+skinId);
        let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        let boneName = null;
        if (skinCfg && skinCfg.bone){
            boneName = skinCfg.bone + "_ske";
        }
        let wife = null;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wife.setScale(0.9);
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = bottomBg.x + bottomBg.width/4 - 20;
            wife.y = bottomBg.y + 80; 
        }
        else {
            wife = BaseLoadBitmap.create(skinCfg.body);
            wife.width = 640;
            wife.height = 840;
            wife.setScale(0.7);
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = bottomBg.x + bottomBg.width/4;
            wife.y = bottomBg.y + 120;
        }
        this.addChildToContainer(wife);

        //lightBg
        let lightBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_cellkuang", this.getUiCode()));
        lightBg.setPosition(GameConfig.stageWidth - lightBg.width, bottomBg.y - lightBg.height + 30);

        this._cellConArr = [];
        let allCellCon = new BaseDisplayObjectContainer();
        for(let i = 0; i < 20; i++)
        {
            let con = new BaseDisplayObjectContainer();
            let bgimg = BaseBitmap.create("acmousegold_cell1");
            bgimg.name = "bgimg_"+i;
            bgimg.touchEnabled = true;
            bgimg.addTouchTap(this.clickBgImg,this);
            con.addChild(bgimg);

            let x = i%4;
            let y = Math.floor(i/4);
            bgimg.x = x*bgimg.width;
            bgimg.y = y*bgimg.height;
            
            allCellCon.addChild(con);
            this._cellConArr.push(con);
        }
        allCellCon.x = lightBg.x+20;
        allCellCon.y = lightBg.y+5;
        this.addChildToContainer(allCellCon);
        this.addChildToContainer(lightBg);

        let topbg = BaseBitmap.create("acmousegold_txtbg3");
        topbg.height = 28;
        topbg.width += 50;
        topbg.x = lightBg.x + lightBg.width/2 - topbg.width/2;
        topbg.y = lightBg.y - topbg.height + 5;
        this.addChildToContainer(topbg);

        let layer = (this.vo.layer%this._bgResNameArr.length)+1;
        let bgNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldBgName"+layer), 22, TextFieldConst.COLOR_WARN_YELLOW);
        bgNameTxt.x = topbg.x + 10;
        bgNameTxt.y = topbg.y+topbg.height/2 - bgNameTxt.height/2;
        this.addChildToContainer(bgNameTxt);
        this._bgNameTxt = bgNameTxt;

        let times = this.vo.getToolNum();
        let timesTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldTimesTxt",[times+""]), 20, TextFieldConst.COLOR_WHITE);
        timesTxt.x = bgNameTxt.x + bgNameTxt.width + 10;
        timesTxt.y = bgNameTxt.y+1;
        this.addChildToContainer(timesTxt);
        this._timesTxt = timesTxt;

        let freeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldFreeTimeTxt"), 18, TextFieldConst.COLOR_WARN_GREEN);
        freeTxt.x = timesTxt.x + timesTxt.width+3;
        freeTxt.y = timesTxt.y;
        this.addChildToContainer(freeTxt);        
        this._freeDesc = freeTxt;

        let botbg = BaseBitmap.create("acmousegold_txtbg2");
        botbg.x = lightBg.x + lightBg.width/2 - botbg.width/2;
        botbg.y = lightBg.y + lightBg.height + 5;
        this.addChildToContainer(botbg);

        let specialTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldSpecialNumTxt"), 20, TextFieldConst.COLOR_WHITE);
        specialTxt.x = botbg.x + 45;
        specialTxt.y = botbg.y + botbg.height/2 - specialTxt.height/2 + 2;
        this.addChildToContainer(specialTxt);      

        let special:string[] = this.cfg.special;
        this._smallTxtArr = [];
        for(let i = 0; i < special.length; i++)
        {
            let itemcfg = Config.ItemCfg.getItemCfgById(special[i].split("_")[1]);
            let smallIcon = BaseLoadBitmap.create(itemcfg.icon);
            smallIcon.setScale(0.4);
            smallIcon.x = 400 + i*(60)
            smallIcon.y = botbg.y + botbg.height/2 - smallIcon.height*smallIcon.scaleY/2 - 20;
            this.addChildToContainer(smallIcon);

            let numObj = this.vo.getMapItems();
            let num = numObj[special[i]] ? numObj[special[i]] : 0;
            let smallTxt = ComponentManager.getTextField(String(num), 16, TextFieldConst.COLOR_WHITE);
            smallTxt.x = smallIcon.x+30;
            smallTxt.y = smallIcon.y+20;
            this.addChildToContainer(smallTxt);
            this._smallTxtArr.push(smallTxt);
        }  

        this.addChildToContainer(bottomBg);
        this.addChildToContainer(scrollView);
        this.addChildToContainer(detailBtn);

        let tipsTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldViewTip"), 18, TextFieldConst.COLOR_WHITE);
        tipsTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        tipsTxt.setPosition(lightBg.x+lightBg.width/2-tipsTxt.width/2-15,GameConfig.stageHeigth-tipsTxt.height-10);
        this.addChildToContainer(tipsTxt);
        this._tipsTxt = tipsTxt;

        let allBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acMouseGoldViewTipBtn", ()=>
        {
            if (!this.vo.isInActivity() || !this.vo.isStart)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }            
            let cost = this.vo.getAllCost();
            if(cost == 0)
            {
                this._isPlay = true;
                this.showViewMask();
                this.vo.tempMap = this.vo.map;
                this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOPALL, {activeId: this.vo.aidAndCode});               
                return;
            }
            let times = this.vo.getToolNum();
            if(times >= cost)
            {
                this._isPlay = true;
                this.showViewMask();
                this.vo.tempMap = this.vo.map;
                this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOPALL, {activeId: this.vo.aidAndCode}); 
            }else
            {
                this.showRechargeTip();
            }
        }, this);
        allBtn.setPosition(lightBg.x+lightBg.width/2-allBtn.width/2,tipsTxt.y - allBtn.height - 5);
        this.addChildToContainer(allBtn);
        this._allBtn = allBtn;

        //衣装预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(bottomBg.x + 20, bottomBg.y - 25);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt1.anchorOffsetX = skinTxt1.width / 2;
		skinTxt1.anchorOffsetY = skinTxt1.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
		this.addChildToContainer(skinTxt1);
		skinTxt1.blendMode = egret.BlendMode.ADD;
		skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		skinTxt1.addTouchTap(() => 
        {
            if(this.vo.isStart)
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSEGOLDREWARDPOPVIEWTAB4, {aid: this.aid, code: this.code});
            }else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            }
        }, this);

        this.refreshView();
    }

    private clickBgImg(e:egret.TouchEvent):void
    {
        let namestr:string = (e.currentTarget).name;
        let index = parseInt(namestr.split("_")[1]);

        if(this.vo.checkCanClick(index))
        {
            let data = this.vo.getMapDataById(index+1);
            if(data)
            {
                if(!data.flag)
                {
                    if (!this.vo.isInActivity() || !this.vo.isStart)
                    {
                        App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                        return;
                    }
                    let times = this.vo.getToolNum();
                    if(times > 0 || this.vo.isFree())
                    {
                        this._isPlay = true;
                        this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOP, {activeId: this.vo.aidAndCode,pos:index+1});
                    }else
                    {
                        this.showRechargeTip();
                    }
                }else
                {
                    if(data.itemid && !data.isget)
                    {
                        if (!this.vo.isStart)
                        {
                            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                            return;
                        }
                        this._isPlay = true;
                        this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_GETSPEREWARD, {activeId: this.vo.aidAndCode,pos:index+1});
                    }
                    if(data.door)
                    {
                        if (!this.vo.isInActivity() || !this.vo.isStart)
                        {
                            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                            return;
                        }
                        let special:string[] = this.cfg.special;
                        for(let i = 0; i < special.length; i++)
                        {

                            let numObj = this.vo.getMapItems();
                            let num = numObj[special[i]] ? numObj[special[i]] : 0;
                            if(num > 0)
                            {
                                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,
                                {
                                    msg : LanguageManager.getlocal("acMouseGoldNextRewardTip"),
                                    touchMaskClose : true,
                                    title : `itemUseConstPopupViewTitle`,
                                    callback : ()=>
                                    {
                                        this._isPlay = true;
                                        this.showViewMask();
                                        this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_NEXT, {activeId: this.vo.aidAndCode,pos:index+1});
                                    },
                                    handle : this,
                                    needClose : 1,
                                    needCancel : true,
                                    confirmTxt : `taskGoBtn`,
                                });
                                return;                        
                            }
                        }
                        this._isPlay = true;
                        this.showViewMask();
                        this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_NEXT, {activeId: this.vo.aidAndCode,pos:index+1});
                    }
                }
            }
        }
    }

    //进度相关
    private initProContainer():void{
        let data = this.cfg.getAchieveCfg();
        let len = data.length;
        let proW = this.progressOffX * len;
        this._proContainer.width = proW + 105;

        let progressBar = ComponentManager.getProgressBar(App.CommonUtil.getResByCode("acmousegold_progress", this.getUiCode()), App.CommonUtil.getResByCode("acmousegold_progressbg", this.getUiCode()), proW);
        progressBar.setPosition(40, 53 - 12);
        this._progressBar = progressBar;

        let proLight = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_progresslight", this.getUiCode()));
        proLight.anchorOffsetX = 17;
        proLight.anchorOffsetY = proLight.height/2;
        proLight.y = progressBar.y + progressBar.height/2;
        proLight.x = progressBar.x;
        this._proLight = proLight;

        //当前进度
        let processContainer = new BaseDisplayObjectContainer();
        this._processContainer = processContainer;
        let processBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_bubble", this.getUiCode()));
        processContainer.width = processBg.width;
        processContainer.height = processBg.height;
        processContainer.addChild(processBg);
        processContainer.x = progressBar.x - processContainer.width/2;

        let currProcessNum = this.vo.getProcessNum();
        let processNum = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldProcessNum", [""+currProcessNum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        processNum.setPosition(processContainer.width/2 - processNum.width/2, 10);
        processContainer.addChild(processNum);
        this._processNum = processNum;

        let curId = 0;
        for (let i=0; i < len; i++){
            let boxCon = new BaseDisplayObjectContainer();

            let boxImg = "acmousegold_box";
            let box = BaseBitmap.create(App.CommonUtil.getResByCode(boxImg, this.getUiCode()));
            boxCon.addChild(box);
            box.name = "box"+i;
            boxCon.width = box.width;
            boxCon.anchorOffsetX = boxCon.width/2;
            box.anchorOffsetX = box.width/2;
            boxCon.height = box.y + box.height;

            let proNum = ComponentManager.getTextField(data[i].specialnum+"", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            proNum.anchorOffsetX = proNum.width/2;
            boxCon.addChild(proNum);
            proNum.setPosition(0, box.y + box.height - 5);
            proNum.name = "proNum"+i;

            boxCon.setPosition(progressBar.x + (i+1) * this.progressOffX + boxCon.width/2, this._progressBar.y + this._progressBar.height - 2);
            this._proContainer.addChild(boxCon);
            boxCon.addTouchTap(()=>{
                //进度
                if (!this.vo.isStart)
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSEGOLDREWARDPOPVIEWTAB2, {aid: this.aid, code: this.code, id:data[i].id});
            }, this);

            this._boxList[i] = boxCon;
            if (curId == 0 && this.vo.getProcessNum() < data[i].specialnum){
                curId = i;
            }
        }

        this._proContainer.addChild(progressBar);
        this._proContainer.addChild(proLight);
        this._proContainer.addChild(processContainer);

        this._isMove = true;
        this._scrollView.scrollLeft =this._proContainer.width - this._scrollView.width;
        this.showViewMask();
        let posX = Math.min(Math.max(0, (curId + 1 - 4) * this.progressOffX), this._proContainer.width - this._scrollView.width);
        egret.Tween.get(this._scrollView).wait(500).to({scrollLeft : posX}, (this._scrollView.scrollLeft - posX)).call(()=>{
            this.hideViewMask();
            egret.Tween.removeTweens(this._scrollView);
            this._isMove = false;
        }, this);
    }

    //刷新进度
    private refreshProContainer():void{
        let currProNum = this.vo.getProcessNum();
        let data = this.cfg.getAchieveCfg();
        for (let i=0; i < data.length; i++){
            let group = this._boxList[i];
            let eff = <CustomMovieClip>group.getChildByName("eff"+i);
            let box = <BaseBitmap>group.getChildByName("box"+i);
            let proNum = <BaseTextField>group.getChildByName("proNum"+i);
            if (this.vo.isGetAchieveRewardById(data[i].id)){
                if (eff){
                    eff.dispose();
                    eff = null;
                }
                App.DisplayUtil.changeToGray(box);
            }
            else{
                App.DisplayUtil.changeToNormal(box);
                if (currProNum >= data[i].specialnum){
                    if (!eff){
                        eff = ComponentManager.getCustomMovieClip(`mousegoldach`, 10);
						eff.name = `eff${i}`;
                        group.addChildAt(eff, group.getChildIndex(proNum));
                        eff.width = 160;
                        eff.height = 160;
                        eff.playWithTime(-1);
						eff.x = -eff.width * eff.scaleX/2;
						eff.y = box.y + box.height/2 - eff.height * eff.scaleY/2;
						eff.blendMode = egret.BlendMode.ADD;
                    }
                }
                else{
					if(eff){
						eff.dispose();
						eff = null;
					}
				}
            }
        }

        let curProIndex = this.vo.getCurrProIndex();
        if (curProIndex == -1){
            this._progressBar.setPercentage(1);
        }
        else{
            let currNum = curProIndex == 0 ? 0 : data[curProIndex - 1].specialnum;
            let nextNum = data[curProIndex].specialnum;
            let offX = 0;
            if (curProIndex == 0){
                offX = (currProNum - currNum) * this.progressOffX / (nextNum - currNum);
            }
            else{
                offX = curProIndex * this.progressOffX + (currProNum - currNum) * this.progressOffX / (nextNum - currNum);
            }
            this._progressBar.setPercentage(offX/this._progressBar.width);
        }
        this._proLight.x = this._progressBar.x + this._progressBar.width * this._progressBar.getPercent();
        this._processContainer.x = this._progressBar.x + this._progressBar.width * this._progressBar.getPercent() - this._processContainer.width/2;
        this._processNum.text = LanguageManager.getlocal("acMouseGoldProcessNum", [""+currProNum]);
        this._processNum.x = this._processContainer.width/2 - this._processNum.width/2;
    }

    private playLightAni():void
    {
        this.showViewMask();
    }

    private refreshView():void
    {
        if(this._isPlay)
        {
            return;
        }

        let times = this.vo.getToolNum();
        this._timesTxt.text = LanguageManager.getlocal("acMouseGoldTimesTxt",[times+""]);
        if (this.vo.isFree())
        {
            this._freeDesc.visible = true;
            this._freeDesc.x = GameConfig.stageWidth - this._freeDesc.width - 30;

            this._timesTxt.x = this._freeDesc.x - this._timesTxt.width - 3;
        }else
        {
            this._freeDesc.visible = false;

            this._timesTxt.x = GameConfig.stageWidth - this._timesTxt.width - 30;
        }
        let layer = (this.vo.layer%this._bgResNameArr.length)+1;
        this._bgNameTxt.text = LanguageManager.getlocal("acMouseGoldBgName"+layer);
        this._bgNameTxt.x = this._timesTxt.x - this._bgNameTxt.width - 10;

        this._tipsTxt.visible = this.vo.layer >= 2;
        this._allBtn.visible = this.vo.layer >= 2;
        
        let special:string[] = this.cfg.special;
        for(let i = 0; i < special.length; i++)
        {
            let numObj = this.vo.getMapItems();
            let num = numObj[special[i]] ? numObj[special[i]] : 0;
            this._smallTxtArr[i].text = String(num);
        }

        this.refreshProContainer();

        if (this.vo.isCangetAchieveReward() || this.vo.isCanExchange())
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }else
        {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        this._rechargeTip.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRechargeInfo", this.getUiCode()), [""+this.vo.getNeedRecharge()]);
    
        this.freshMap();
    }

    private freshMap(isNext:boolean=false):void
    {
        let len = this._cellConArr.length;
        for(let i = 0; i < len; i++)
        {
            let bgimg = <BaseBitmap>this._cellConArr[i].getChildByName("bgimg_"+i);
            let itemicon = <BaseBitmap>this._cellConArr[i].getChildByName("itemicon");
            let kuang1 = <BaseBitmap>this._cellConArr[i].getChildByName("kuang1");
            let kuang2 = <BaseBitmap>this._cellConArr[i].getChildByName("kuang2");
            let door = <BaseBitmap>this._cellConArr[i].getChildByName("door");
            let itemEff = <CustomMovieClip>this._cellConArr[i].getChildByName("itemEff");
            let data;
            if(isNext)
            {
                data = this.vo.getTempMapDataById(i+1);
            }else
            {
                data = this.vo.getMapDataById(i+1);
            }
            if(data.flag == 0)
            {
                bgimg.setRes("acmousegold_cell1");
                if(itemicon)
                {
                    itemicon.dispose();
                    itemicon = null;
                }
                if(door)
                {
                    door.dispose();
                    door = null;
                }
                if(itemEff)
                {
                    itemEff.dispose();
                    itemEff = null;
                }
                if(this.vo.checkCanClick(i))
                {
                    if(!kuang1)
                    {
                        kuang1 = BaseBitmap.create("acmousegold_cell3");
                        kuang1.name = "kuang1";
                        kuang1.setPosition(bgimg.x,bgimg.y);
                        this._cellConArr[i].addChild(kuang1);
                    }
                    if(!kuang2)
                    {
                        kuang2 = BaseBitmap.create("acmousegold_cell3");
                        kuang2.name = "kuang2";
                        kuang2.setPosition(bgimg.x,bgimg.y);
                        this._cellConArr[i].addChild(kuang2);
                    }
                    egret.Tween.get(kuang1,{loop:true}).to({alpha: 0.7},400).to({alpha:1}, 400);
                    egret.Tween.get(kuang2,{loop:true}).to({alpha: 0.2},400).to({alpha:0.5}, 400);
                }else
                {
                    if(kuang1)
                    {
                        kuang1.dispose();
                        kuang1 = null;
                    }
                    if(kuang2)
                    {
                        kuang2.dispose();
                        kuang2 = null;
                    }                    
                }
            }else
            {
                bgimg.setRes("acmousegold_cell2");
                if(kuang1)
                {
                    kuang1.dispose();
                    kuang1 = null;
                }
                if(kuang2)
                {
                    kuang2.dispose();
                    kuang2 = null;
                }                
                if(data.itemid)
                {
                    if(!data.isget)
                    {
                        if(!itemEff)
                        {
                            let itemEff = ComponentManager.getCustomMovieClip("mousegoldaward", 10, 100);
                            itemEff.name = "itemEff";
                            itemEff.playWithTime(-1);
                            itemEff.setPosition(bgimg.x-12.5,bgimg.y-12.5);
                            this._cellConArr[i].addChild(itemEff);
                        }
                    }else
                    {
                        if(itemEff)
                        {
                            itemEff.dispose();
                            itemEff = null;
                        }
                    }
                    if(!itemicon)
                    {
                        let cfg = Config.ItemCfg.getItemCfgById(data.itemid.split("_")[1]);
                        itemicon = BaseLoadBitmap.create(cfg.icon);
                        itemicon.width = 100;
                        itemicon.height = 100;
                        itemicon.setScale(0.8);
                        itemicon.name = "itemicon";
                        itemicon.x = bgimg.x + bgimg.width/2 - itemicon.width*itemicon.scaleX/2;
                        itemicon.y = bgimg.y + bgimg.height/2 - itemicon.height*itemicon.scaleY/2;
                        this._cellConArr[i].addChild(itemicon);
                    }
                    if(data.isget)
                    {
                        App.DisplayUtil.changeToGray(itemicon);                      
                    }else
                    {
                        App.DisplayUtil.changeToNormal(itemicon);
                    }
                }
                if(data.door)
                {
                    if(!door)
                    {
                        door = BaseBitmap.create("acmousegold_nexticon");
                        door.setScale(0.8);
                        door.name = "door";
                        door.x = bgimg.x + bgimg.width/2 - door.width*door.scaleX/2;
                        door.y = bgimg.y + bgimg.height/2 - door.height*door.scaleY/2;  
                        this._cellConArr[i].addChild(door);
                    }
                }
            }
        }
    }

    public tick():void{
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
		this._timeTxt.x = this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2;
    }

    public showRechargeTip():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acMouseGoldRechargeTip`, this.getUiCode())),
            touchMaskClose : true,
            title : `itemUseConstPopupViewTitle`,
            callback : ()=>{
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handle : this,
            needClose : 1,
            needCancel : true,
            confirmTxt : `taskGoBtn`,
        });
    }

    //mask
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

    private flopCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!event.data.ret)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(rData.rewards)
        {
            let rewardVoList = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList); 
        }
        this._isPlay = false;
        this.refreshView();
    }
    private getSpRewardCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!event.data.ret)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(rData.rewards)
        {
            let rewardVoList = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList); 
        }
        this._isPlay = false;
        this.refreshView();        
    }
    private flopAllCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!event.data.ret)
        {
            this.hideViewMask();
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(rData.rewards)
        {
            let rewardVoList = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList); 
        }
        this.freshMap(true);
        let t = egret.setTimeout(()=>
        {
            egret.clearTimeout(t);
            this.showNext();
        },this,600);        
    }
    private nextCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!event.data.ret)
        {
            this.hideViewMask();
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this.showNext();
    } 

    private showNext():void
    {
        let yunLeft = BaseBitmap.create("acmousegold_yun1");
        yunLeft.setPosition(-yunLeft.width,0);
        this.addChild(yunLeft);

        let yunRight = BaseBitmap.create("acmousegold_yun2");
        yunRight.setPosition(GameConfig.stageWidth,0);
        this.addChild(yunRight);

        egret.Tween.get(yunLeft).to({x : 0}, 600).call(()=>
        {
            egret.Tween.removeTweens(yunLeft);
        }, this); 
        egret.Tween.get(yunRight).to({x : GameConfig.stageWidth-yunRight.width}, 600).call(()=>
        {
            egret.Tween.removeTweens(yunRight);
            this._isPlay = false;
            this.refreshView();

            this.changeBg();

            let prebg = BaseBitmap.create("acmousegold_txtbg1");
            prebg.width = 420;
            prebg.setPosition(GameConfig.stageWidth/2-prebg.width/2,GameConfig.stageHeigth/2-prebg.height/2);
            this.addChild(prebg);

            let layer = (this.vo.layer%this._bgResNameArr.length)+1;
            let name = LanguageManager.getlocal("acMouseGoldBgName"+layer);
            let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldNextShowTip",[name]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            tipTxt.setPosition(GameConfig.stageWidth/2-tipTxt.width/2,GameConfig.stageHeigth/2-tipTxt.height/2);
            this.addChild(tipTxt);

            let t = egret.setTimeout(()=>
            {
                prebg.dispose();
                prebg = null;
                tipTxt.dispose();
                tipTxt = null;                
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

    private changeBg():void
    {
        let newBg = BaseLoadBitmap.create(this._bgResNameArr[this.vo.layer%this._bgResNameArr.length]);
        this.addChild(newBg);

        let prebg = <BaseBitmap>this.getChildByName("newBg");
        if(prebg)
        {
            prebg.name = "";
            this.setChildIndex(newBg,this.getChildIndex(prebg)+1);
            prebg.dispose();
            prebg = null;
        }else
        {
            this.setChildIndex(newBg,this.getChildIndex(this.viewBg)+1);
        }
        newBg.name = "newBg";
    }
    public dispose():void{
        this.hideViewMask();
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOP, this.flopCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_GETSPEREWARD, this.getSpRewardCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_NEXT, this.nextCallback, this);   
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOPALL, this.flopAllCallback, this);     
        this._timeBg = null;
        this._timeTxt = null;
        this._scrollView = null;
        this._proContainer = null;
        this._freeDesc = null;
        this._timesTxt = null;
        this._bgNameTxt = null;
        this._boxList = [];
        this._lightList = [];
        this._isPlay = false;
        this._isMove = false;
        this._processContainer = null;
        this._processNum = null;
        this._progressBar = null;
        this._proLight = null;
        this._rewardData = null;
        this._detailBtn = null;
        this._rechargeTip = null;
        this._tipsTxt = null;
        this._allBtn = null;
        for(let i = 0; i < this._smallTxtArr.length; i++)
        {
            this._smallTxtArr[i] = null;
        }
        this._smallTxtArr = null;
        for(let i = 0; i < this._cellConArr.length; i++)
        {
            this._cellConArr[i] = null;
        }        
        this._cellConArr = null;
        super.dispose();
    }
}