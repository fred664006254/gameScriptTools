/**
 * 权倾朝野
 * date 2020.7.14
 * author ycg
 * @class AcPowerFullView
 */
class AcPowerFullView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _timeTxt:BaseTextField = null;
    private _rechargeTip:BaseTextField = null;
    private _rewardData:any = null;
    private _isPlay:boolean = false;
    private _isTenPlay:boolean = false;
    private _isBatch:boolean = false;
    private _isSkipAni:boolean = false;
    private _skipContainer:BaseDisplayObjectContainer = null;
    private _playMoreContainer:BaseDisplayObjectContainer = null;
    private _playBtnTxt:BaseBitmap = null;
    private _toolNumTxt:BaseTextField = null;
    private _freeDesc:BaseTextField = null;
    private _pieceNum:BaseTextField = null;
    private _detailBg:BaseBitmap = null;
    private _processNum:BaseTextField = null;
    private _processRed:BaseBitmap = null;
    private _proContainer:BaseDisplayObjectContainer = null;
    private _scrollView:ScrollView = null;
    private _boxList:any[] = [];
    private _skinContainer:BaseDisplayObjectContainer = null;

    public constructor(){
        super();
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return App.CommonUtil.getResByCode("acpowerfull_titlebg", this.getUicode());
    }

    protected getBgName():string{
        return App.CommonUtil.getResByCode("acpowerfull_bg", this.getUicode());
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return App.CommonUtil.getCnByCode("acPowerFullRuleInfo", this.getUicode());
    }

    protected getRuleInfoParam():string[]{
        return [""+this.cfg.needGem];
    }

    protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
    }

    protected getProbablyInfo():string{
        return App.CommonUtil.getCnByCode("acPowerFullProbablyInfo", this.getUicode());
    }

    protected getResourceList():string[]{
        let list:string[] = [

        ];
        return super.getResourceList().concat([
            "acpowerfullcode1", "acpowerfullcode"+this.getUicode(), "acwealthcarpview_servantskintxt",
        ]).concat(list);
    }

    private get cfg():Config.AcCfg.PowerFullCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcPowerFullVo{
        return <AcPowerFullVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private getUicode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY, this.playCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_ACHIEVERWD, this.getRewardCallback, this);

        let bg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_bg", this.getUicode()));
        bg.y = GameConfig.stageHeigth - bg.height;
        this.addChildToContainer(bg);

        let localKey = "startDialog"+this.vo.aidAndCode+Api.playerVoApi.getPlayerID()+this.vo.st;
        let isShow = LocalStorageManager.get(localKey);
        if (isShow && isShow != ""){
            // this.showSkinNumChangeView();
        }
        else{
            this.showStartDialog();
        }

        let infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_infobg", this.getUicode()));
        infoBg.setPosition(0, GameConfig.stageHeigth - infoBg.height);
        infoBg.touchEnabled = true;
        
        //角色
        let roleContainer = new BaseDisplayObjectContainer();
        roleContainer.width = GameConfig.stageWidth;
        this.addChildToContainer(roleContainer);
        //主角
        let title = Api.playerVoApi.getTitleInfo();
        let titleData = {title: title, level: Api.playerVoApi.getPlayerLevel(), pic: Api.playerVoApi.getPlayePicId()};
        let player = this.getRoleContainer(titleData);
        player.setScale(0.65);
        player.setPosition(60 + 40, 0);
        roleContainer.setPosition(0, GameConfig.stageHeigth - infoBg.height - 180 + 20);
        roleContainer.addTouchTap(this.roleClick, this);

        //衣装
        // let skinIdArr = this.vo.getHasSkinId();
        let skinIdArr = ["20041", "20042"];
        if (skinIdArr.length > 0){
            for (let i=0; i < 2; i++){
                if (Api.switchVoApi.checkIsServantSkinState(skinIdArr[i])){
                    let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinIdArr[i]);
                    let skinImg = BaseLoadBitmap.create(skinCfg.body);
                    skinImg.width = 405;
                    skinImg.height = 467;
                    skinImg.setScale(0.45);
                    skinImg.x = (i == 0 ? 100 : GameConfig.stageWidth - skinImg.width * skinImg.scaleX - 100);
                    if (i == 1){
                        skinImg.scaleX = -0.45;
                        skinImg.x += skinImg.width * Math.abs(skinImg.scaleX);
                    }
                    skinImg.y = 30;
                    roleContainer.addChild(skinImg);
                    if (!Api.servantVoApi.isOwnSkinOfSkinId(skinIdArr[i])){
                        App.DisplayUtil.changeToGray(skinImg);
                    }
                    skinImg.addTouchTap(this.roleClick, this);
                }
            }
        }
        roleContainer.addChild(player);
        this.addChildToContainer(infoBg);

        //活动时间   
        let dateText = ComponentManager.getTextField(LanguageManager.getlocal("acComm_time", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = infoBg.x + 20;
        dateText.y = infoBg.y + 60;
        this.addChildToContainer(dateText);

        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + 27;
		this.addChildToContainer(this._timeBg);
		this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 40 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
		this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);

        //碎片数量
        // let needItemVo = this.vo.getShowSkinData();
        // let pieceData = Api.itemVoApi.getItemInfoVoById(needItemVo.id);
        // let currPieceNum = 0;
        // if (pieceData){
        //     currPieceNum = pieceData.num;
        // }
        let currPieceNum = this.cfg.special.specialLimit - this.vo.getSpecailNum();
        if (currPieceNum < 0){
            currPieceNum = 0;
        }
        let pieceNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullPieceNum", this.getUicode()), [""+currPieceNum, ""+this.cfg.special.specialLimit]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        pieceNum.setPosition(dateText.x, dateText.y + dateText.height + 5);
        this.addChildToContainer(pieceNum);
        this._pieceNum = pieceNum;

        //充值信息
        let rechargeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullRechargeInfo", this.getUicode()), [""+this.vo.getNeedRecharge()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTip.setPosition(GameConfig.stageWidth - rechargeTip.width - 15, pieceNum.y);
        this.addChildToContainer(rechargeTip);
        this._rechargeTip = rechargeTip;

        //活动文本
        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullDesc", this.getUicode()), [""+this.cfg.needGem]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 600;
        descTxt.lineSpacing = 4;
        descTxt.x = dateText.x;
        descTxt.y = pieceNum.y + pieceNum.height + 5;
        this.addChildToContainer(descTxt);

        // play btn
        let playBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acpowerfull_playbtn", this.getUicode()), "", this.playBtnClick, this);
        // let playBtn = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_playbtn", this.getUicode()));
        playBtn.setPosition(GameConfig.stageWidth/2 - playBtn.width * playBtn.scaleX /2, GameConfig.stageHeigth - 390 - 160);
        this.addChildToContainer(playBtn);
        
        //道具数量
        let toolNum = this.vo.getToolNum();
        let toolNumBg = BaseBitmap.create("acpowerfull_numbg-1");
        this.addChildToContainer(toolNumBg);
        toolNumBg.setPosition(GameConfig.stageWidth/2 - toolNumBg.width/2, playBtn.y + playBtn.height - 25);
        let toolNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullUseNum", this.getUicode()), [""+toolNum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        toolNumTxt.setPosition(toolNumBg.x + toolNumBg.width/2 - toolNumTxt.width/2, toolNumBg.y + toolNumBg.height/2 - toolNumTxt.height/2 + 2);
        this.addChildToContainer(toolNumTxt);
        this._toolNumTxt = toolNumTxt;

        //免费
        let freeDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullPlayFree", this.getUicode())), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(toolNumTxt.x + toolNumTxt.width, toolNumTxt.y);
        this.addChildToContainer(freeDesc);
        freeDesc.visible = false;
        this._freeDesc = freeDesc;

        //一次，十次
        let playBtnKey = "acpowerfull_playbtntxt1";
        if (toolNum >= 10){
            playBtnKey = "acpowerfull_playbtntxt2";
        }
        if (this._isBatch){
            playBtnKey = "acpowerfull_playbtntxt3";
        }
        let playBtnTxt = BaseBitmap.create(App.CommonUtil.getResByCode(playBtnKey, this.getUicode()));
        // playBtnTxt.setPosition(GameConfig.stageWidth/2 - playBtnTxt.width/2, playBtn.y + 85);
        // this.addChildToContainer(playBtnTxt);
        playBtnTxt.setPosition(playBtn.width /2 - playBtnTxt.width/2, 85 - 10);
        playBtn.addChild(playBtnTxt);
        this._playBtnTxt = playBtnTxt;

        if (this.vo.isFree()){
            playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt1", this.getUicode()))
            freeDesc.visible = true;
            toolNumTxt.x = GameConfig.stageWidth/2 - (toolNumTxt.width + freeDesc.width)/2;
            freeDesc.x = toolNumTxt.x + toolNumTxt.width;
        }

        //进度背景
        let topBg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_progressbg", this.getUicode()));
        topBg.setPosition(0, playBtn.y - topBg.height - 5);

        let roleOffY = topBg.y + topBg.height - 20 - this.titleBg.height - this.titleBg.y + 10;

        //皮肤衣装
        let skinContainer = new BaseDisplayObjectContainer();
        skinContainer.width = GameConfig.stageWidth;
        skinContainer.height = roleOffY;
        this.addChildToContainer(skinContainer);
        skinContainer.anchorOffsetX = skinContainer.width/2;
        this._skinContainer = skinContainer;
        skinContainer.setPosition(GameConfig.stageWidth/2, this.titleBg.y + this.titleBg.height);
        let skinMask = new egret.Rectangle(0, 0, GameConfig.stageWidth, skinContainer.height);
        skinContainer.mask = skinMask;
        let skinId = this.cfg.show;
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        let roleScale = 0.65 + 0.2 * (roleOffY - 300) /(470 - 300);//300
        roleScale = roleScale > 0.85 ? 0.85 : roleScale;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantIcon.setScale(roleScale);
            servantIcon.anchorOffsetY = servantIcon.height;
            servantIcon.anchorOffsetX = servantIcon.width / 2;
            servantIcon.x = skinContainer.width/2;
            servantIcon.y = skinContainer.height;//-5
            skinContainer.addChild(servantIcon);
        }
        else {
            let skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.setScale(roleScale);
            skinImg.x = skinContainer.width / 2;
            skinImg.y = skinContainer.height;
            skinContainer.addChild(skinImg);
        }   
        this.addChildToContainer(topBg);
 
        //衣装预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(topBg.x + topBg.width/2 - skinTxtEffect.width/2, topBg.y - 100);
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
		skinTxt1.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACPOWERFULLDETAILVIEWTAB4, {aid: this.aid, code: this.code});
        }, this);

        //跳过动画
        let skipContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(skipContainer);
        this._skipContainer = skipContainer;
        let skipBottom = BaseBitmap.create("public_9_bg12");
        skipBottom.height = 42;
        skipBottom.setPosition(12, playBtn.y + 28);
        skipContainer.addChild(skipBottom);
        skipBottom.alpha = 0.8;

        let skipBg = BaseBitmap.create("public_select");
        skipBg.setPosition(15, playBtn.y + 30);
        skipContainer.addChild(skipBg);
        skipBg.addTouchTap(()=>{
            this._isSkipAni = !this._isSkipAni;
            if (this._isSkipAni){
                skipBg.setRes("public_select_down");
            }
            else{
                skipBg.setRes("public_select");
            }
        }, this);
        let skipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullSkipTip", this.getUicode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        skipTxt.setPosition(skipBg.x + skipBg.width + 5, skipBg.y + skipBg.height/2 - skipTxt.height/2);
        skipContainer.addChild(skipTxt);
        skipBottom.width = skipBg.width + skipTxt.width + 40;

        //搭救50次
        let goMoreContainer = new BaseDisplayObjectContainer();
        skipContainer.addChild(goMoreContainer);
        this._playMoreContainer = goMoreContainer;
        let goMoreBottom = BaseBitmap.create("public_9_bg12");
        goMoreBottom.height = 42;
        goMoreBottom.setPosition(skipBottom.x, skipBg.y + skipBg.height + 10);
        goMoreContainer.addChild(goMoreBottom);
        goMoreBottom.alpha = 0.8;
        let goMoreBg = BaseBitmap.create("public_select");
        goMoreBg.setPosition(skipBg.x, skipBg.y + skipBg.height + 12);
        goMoreContainer.addChild(goMoreBg);
        goMoreBg.addTouchTap(()=>{
            let currToolNum = this.vo.getToolNum();
            this._isBatch = !this._isBatch;
            if (this._isBatch){
                goMoreBg.setRes("public_select_down");
                // if (this.vo.isFree()){
                //     playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt1", this.getUicode()))
                // }
                // else{
                    playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt3", this.getUicode()))
                // }
            }
            else{
                goMoreBg.setRes("public_select");
                if (currToolNum < 10 || this.vo.isFree()){
                    playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt1", this.getUicode()))
                }
                else{
                    playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt2", this.getUicode()))
                }
            }
        }, this);
        let goMoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullPlayMultiTip", this.getUicode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        goMoreTxt.setPosition(goMoreBg.x + goMoreBg.width + 5, goMoreBg.y + goMoreBg.height/2 - goMoreTxt.height/2);
        goMoreContainer.addChild(goMoreTxt);
        goMoreBottom.width = goMoreBg.width + goMoreTxt.width + 40;

        if (this.vo.getProcessNum() >= 50){
            this._playMoreContainer.visible = true;
        }
        else{
            this._playMoreContainer.visible = false;
        }

        //进度
        let detailBg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_detailbg", this.getUicode()));
        detailBg.setPosition(5, topBg.y);
        detailBg.addTouchTap(()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACPOWERFULLDETAILVIEW, {aid: this.aid, code: this.code});
        }, this);
        this._detailBg = detailBg;

        let processRed = BaseBitmap.create("public_dot2");
        processRed.setPosition(detailBg.x + detailBg.width - 28, detailBg.y - 9);
        this.addChildToContainer(processRed);
        this._processRed = processRed;
        if (this.vo.checkAchieveRed() || this.vo.checkExchangeRed()){
            processRed.visible = true;
        }
        else{
            processRed.visible = false;
        }

        let currProNum = this.vo.getProcessNum();
        let processNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullProcessNum", this.getUicode()), [""+currProNum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        processNum.textAlign = TextFieldConst.ALIGH_CENTER;
        processNum.$anchorOffsetX = processNum.width/2;
        processNum.setPosition(detailBg.x + detailBg.width/2, detailBg.y + detailBg.height/2 - processNum.height/2 - 10);
        this._processNum = processNum;

        //进度
        let proContainer = new BaseDisplayObjectContainer();
        proContainer.height = 140;
        this._proContainer = proContainer;

        let scrollView = ComponentManager.getScrollView(proContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth - 95, proContainer.height));
        scrollView.setPosition(95, topBg.y - 25);
        this.addChildToContainer(scrollView);
        scrollView.bounces = false;
        this._scrollView = scrollView;

        this.addChildToContainer(detailBg);
        this.addChildToContainer(processNum);

        this.initProContainer();    
    }

    //进度 间距
    private get progressOffX():number{
        return 120;
    }

    //进度相关
    private initProContainer():void{
        let data = this.cfg.getAchieveList();
        let len = data.length;
        let proW = this.progressOffX * len + 10;
        this._proContainer.width = proW;
        for (let i=0; i < len; i++){
            let boxCon = new BaseDisplayObjectContainer();
            boxCon.width = 100;
            boxCon.height = this._proContainer.height;

            let box = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_box", this.getUicode()));
            box.setPosition(boxCon.width/2 - box.width/2, 20);
            box.name = "box"+i;

            let boxEff = ComponentManager.getCustomMovieClip(`acpowerfull_boxeffect`, 15);
            boxEff.name = `eff${i}`;
            boxCon.addChild(boxEff);
            boxEff.width = 200;
            boxEff.height = 200;
            boxEff.playWithTime(-1);
            boxEff.x = box.x + box.width/2 - boxEff.width * boxEff.scaleX/2;
            boxEff.y = box.y + box.height/2 - boxEff.height * boxEff.scaleY/2;

            boxCon.addChild(box);

            let killFlag = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_killed", this.getUicode()));
            killFlag.setScale(0.8);
            killFlag.setPosition(boxCon.width/2 - killFlag.width * killFlag.scaleX/2, box.y + 20);
            boxCon.addChild(killFlag);
            killFlag.name = "killFlag"+i;
            
            let proNumBg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_processnumbg", this.getUicode()));
            proNumBg.setPosition(boxCon.width/2 - proNumBg.width/2, box.y + box.height - 10);
            boxCon.addChild(proNumBg);

            let proNum= ComponentManager.getTextField(data[i].needNum+"", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxCon.addChild(proNum);
            proNum.setPosition(proNumBg.x + proNumBg.width/2 - proNum.width/2, proNumBg.y + proNumBg.height/2 - proNum.height/2);

            boxCon.setPosition(10 + i * this.progressOffX, 0);
            this._proContainer.addChild(boxCon);
            boxCon.addTouchTap(()=>{
                //进度
                ViewController.getInstance().openView(ViewConst.POPUP.ACPOWERFULLDETAILVIEWTAB2, {aid: this.aid, code: this.code, id:data[i].id});
            }, this);

            this._boxList[i] = boxCon;
        }

        this.refreshProContainer();
        
        let curId = this.vo.getCurProcessIndex();
        this._scrollView.scrollLeft =this._proContainer.width - this._scrollView.width;
        let posX = Math.min(Math.max(0, (curId + 1 - 3) * this.progressOffX), this._proContainer.width - this._scrollView.width);
        this.showViewMask();
        egret.Tween.get(this._scrollView).wait(300).to({scrollLeft : posX}, (this._scrollView.scrollLeft - posX)).call(()=>{
            this.hideViewMask();
            egret.Tween.removeTweens(this._scrollView);
        }, this);
    }

    //刷新进度
    private refreshProContainer():void{
        let currProNum = this.vo.getProcessNum();
        let data = this.cfg.getAchieveList();
        for (let i=0; i < data.length; i++){
            let group = this._boxList[i];
            let eff = <CustomMovieClip>group.getChildByName("eff"+i);
            let box = <BaseBitmap>group.getChildByName("box"+i);
            let killFlag = <BaseBitmap>group.getChildByName("killFlag"+i);
            eff.visible = false;
            if (this.vo.isGetAchieveRewardById(data[i].id)){
                killFlag.visible = true;
            }
            else{
                killFlag.visible = false;
                if (currProNum >= data[i].needNum){
                    eff.visible = true;
                }
            }
        }
    }

    private refreshProcess():void{
        this.refreshProContainer();
        let curId = this.vo.getCurProcessIndex();
        let posX = Math.min(Math.max(0, (curId + 1 - 3) * this.progressOffX), this._proContainer.width - this._scrollView.width);
        egret.Tween.get(this._scrollView).wait(500).to({scrollLeft : posX}, (this._scrollView.scrollLeft - posX)).call(()=>{
            egret.Tween.removeTweens(this._scrollView);
        }, this);
    }

    private getRewardCallback():void{
        this.refreshProContainer();
    }

    private playBtnClick():void{
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return ;
        }
        if (this._isPlay){
            return;
        }
        let toolNum = this.vo.getToolNum();
        if (this._isBatch){
            if (toolNum < 50){
                this.showRechargeTip();
                return;
            }
            this._isTenPlay = true;
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY, {activeId: this.vo.aidAndCode, isTenPlay: 0, isFifthPlay: 1});
        }
        else{
            if (this.vo.isFree()){
                this._isPlay = true;
                NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY, {activeId: this.vo.aidAndCode, isTenPlay: 0});
            }
            else{
                let toolNum = this.vo.getToolNum();
                if (toolNum <= 0){
                    this.showRechargeTip();
                    return;
                }
                let isTen = 0;
                this._isPlay = true;
                if (toolNum < 10){
                    this._isTenPlay = false;
                }
                else{
                    isTen = 1;
                    this._isTenPlay = true;
                }
                NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY, {activeId: this.vo.aidAndCode, isTenPlay: isTen}); 
            }
        }
    }

    private playCallback(evt: egret.Event):void{
        if (!evt.data.ret){
            this._isPlay = false;
            return;
        }
        let rData = evt.data.data.data;
        this._rewardData = rData;
        if (this._isSkipAni){
            this._isPlay = false;
            this.showRewardView();
        }
        else{
            this.showPlayAni();
        }
    }

    private showPlayAni():void{
        this.showViewMask();
        let swordBMStr = "acmarryview_sword";
        let boneName = 'acmarryview_sword';
        let swordPosX = GameConfig.stageWidth/4 - 95;
        if (this._isTenPlay || this._isBatch){
            swordBMStr = "acmarryview_knife";
            boneName = 'acmarryview_knife';
            swordPosX = GameConfig.stageWidth * 3/4 - 95;
        }
        
		let sword = BaseLoadBitmap.create(swordBMStr);
		sword.width = 190;
        sword.height = 285;
        this.addChildToContainer(sword);
        sword.setPosition(swordPosX, GameConfig.stageHeigth - sword.height - 100);

        egret.Tween.get(sword, {loop: false})
        .to({x: GameConfig.stageWidth/2 - sword.width/2 , y: this._skinContainer.y + this._skinContainer.height/2 - 20}, 150, egret.Ease.sineIn)
        .call(()=>{
            egret.Tween.removeTweens(sword);
            sword.visible = false;
            if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && boneName && RES.hasRes(boneName)){
                let knifeBone  = App.DragonBonesUtil.getLoadDragonBones(boneName, 1);
                knifeBone.setPosition(this._skinContainer.x, sword.y);
                this.addChildToContainer(knifeBone);
                knifeBone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                    knifeBone.dispose();
                }, this);
            }
            this.showRoleAni();
            sword.dispose();
        })

    }

    //人物受攻击效果
    private showRoleAni():void{
        let count = 0;
        egret.Tween.get(this._skinContainer, {loop: true})
        .to({scaleX: 0.85, scaleY: 0.85}, 100)
        .to({scaleX: 1, scaleY: 1}, 150)
        .call(()=>{
            count ++;
            if (count >= 4){
                egret.Tween.removeTweens(this._skinContainer);
                this._skinContainer.setScale(1);
                this.showRewardView();
            }
        })
    }

    private showRewardView():void{
        this.hideViewMask();
        this._isPlay = false;
        if (this._rewardData){
            let rewards = this._rewardData.rewards;
            let replacerewards = this._rewardData.replacerewards;
            let isSameAdd = false;
            if (this._isTenPlay){
                isSameAdd = true;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards, "isPlayAni":true, "isSameAdd": isSameAdd, "callback":()=>{
                this.refreshProcess();
            }});
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    }

    private refreshView():void{
        if (this.vo.getProcessNum() >= 50){
            this._playMoreContainer.visible = true;
        }
        else{
            this._playMoreContainer.visible = false;
        }

        let currToolNum = this.vo.getToolNum();
        this._toolNumTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullUseNum", this.getUicode()), [""+currToolNum]);
        if (this.vo.isFree()){
            this._freeDesc.visible = true;
            this._playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt1", this.getUicode()))
            this._freeDesc.visible = true;
            this._toolNumTxt.x = GameConfig.stageWidth/2 - (this._toolNumTxt.width + this._freeDesc.width)/2;
            this._freeDesc.x = this._toolNumTxt.x + this._toolNumTxt.width;
        }
        else{
            this._freeDesc.visible = false;
            this._toolNumTxt.x = GameConfig.stageWidth/2 - this._toolNumTxt.width/2;
            let playBtnKey = "acpowerfull_playbtntxt1";
            if (currToolNum >= 10){
                playBtnKey = "acpowerfull_playbtntxt2";
            }
            if (this._isBatch){
                playBtnKey = "acpowerfull_playbtntxt3";
            }
            this._playBtnTxt.setRes(App.CommonUtil.getResByCode(playBtnKey, this.getUicode()))
        }

        //碎片数量
        // let needItemVo = this.vo.getShowSkinData();
        // let pieceData = Api.itemVoApi.getItemInfoVoById(needItemVo.id);
        // let currPieceNum = 0;
        // if (pieceData){
        //     currPieceNum = pieceData.num;
        // }
        let currPieceNum = this.cfg.special.specialLimit - this.vo.getSpecailNum();
        if (currPieceNum < 0){
            currPieceNum = 0;
        }
        this._pieceNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullPieceNum", this.getUicode()), [""+currPieceNum, ""+this.cfg.special.specialLimit]);

        //充值提示
        this._rechargeTip.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullRechargeInfo", this.getUiCode()), [""+this.vo.getNeedRecharge()]);
        this._rechargeTip.x = GameConfig.stageWidth - this._rechargeTip.width - 15;

        if (this.vo.checkAchieveRed() || this.vo.checkExchangeRed()){
            this._processRed.visible = true;
        }
        else{
            this._processRed.visible = false;
        }

        //进度
        let currProNum = this.vo.getProcessNum();
        this._processNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullProcessNum", this.getUicode()), [""+currProNum])
        this._processNum.anchorOffsetX = this._processNum.width/2;
    }

    //充值提示
    public showRechargeTip():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acPowerFullPlayNumNotEnough`, this.getUicode())),
            touchMaskClose : true,
            title : `itemUseConstPopupViewTitle`,
            callback : ()=>{
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handle : this,
            needClose : 1,
            needCancel : true,
            confirmTxt : `taskGoBtn`,
            // recommand : false
        });
    }

    //首次进入对话
    private showStartDialog():void{
        let localKey = "startDialog"+this.vo.aidAndCode+Api.playerVoApi.getPlayerID()+this.vo.st;
        LocalStorageManager.set(localKey, String(this.vo.st));
        let view = this;
        let keyStr = "startDialog_"+this.getUicode();
        let startCfg = view.cfg[keyStr];
        let skinNum = this.vo.getHasSkinNum();
        App.LogUtil.log("showStartDialog "+skinNum);
        if (skinNum == 0){
            startCfg["1"]["10"].nextId = null;
        }
        else if (skinNum == 1){
            let servantInfoVo = Api.servantVoApi.getServantObj("2004");
            if (servantInfoVo){
                let skinId = servantInfoVo.getAllSkinList()[0];
                startCfg["1"]["11"].personPic = "skin_full_"+skinId;
            }
        }
        else{
            startCfg["1"]["11"].personPic = "skin_full_20042";
        }
        // let bgName = App.CommonUtil.getResByCode("acpowerfull_bg", this.getUicode());
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,{
            aid : view.aid,
            code : view.getUicode(),
            AVGDialog : startCfg,
            visitId : "1",
            talkKey: "acPowerFullStartDialog",
            // bgName: bgName,
            // callBack: this.showSkinNumChangeView,
            // obj: view,
        });
    }

    private showSkinNumChangeView():void{
        App.LogUtil.log("showSkinNumChangeView ");
        let id = this.vo.getShowSkinDialogId();
        if (id){
            let msg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullRewardTip"+id, this.getUicode()));
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg: msg,
                callback:() =>{
                    NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_PLOT, {plotId: id, activeId: this.vo.aidAndCode});
                },
                handler:this,
            });
        }
    }

    private roleClick():void{
        let skinNum = this.vo.getHasSkinNum();
        if (skinNum > 2){
            skinNum = 2;
        }
        let msg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullRewardTip"+(skinNum+1), this.getUicode()));
        App.CommonUtil.showTip(msg);
    }

    public tick():void{
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
		this._timeBg.width = 40 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
		this._timeTxt.x = this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2;
    }

    public getRoleContainer(data:any):BaseDisplayObjectContainer{
		if (!data){
			return null;
		}
        let titleData = App.CommonUtil.getTitleData(data.title);
		let curLevel = 1;
		if (titleData.clv){
			curLevel = titleData.clv;
		}
		let titleconfig = null;
		let curTitleId = null;
        if (titleData.clothes){
			titleconfig = Config.TitleCfg.getTitleCfgById(titleData.clothes);
			curTitleId = titleData.clothes;
        }
        
		if(titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7) ){
            curTitleId = titleData.clothes;
            curLevel = titleData.tlv;
			if(curLevel == 0){
				curLevel = 1;
			}
        }
		let userContainer:BaseDisplayObjectContainer = null;
		App.LogUtil.log("curTitleId "+curTitleId);
		if(curTitleId){
			userContainer = new BaseDisplayObjectContainer();
			userContainer.name = "userContainer";
			this.addChildToContainer(userContainer);

			let role = null;
			// let tcfg = Config.TitleCfg.getTitleCfgById(curTitleId);
			// let resPath = "palace_db_" + curTitleId + (tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(data.pic)}` : ``);
			// if((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")){
			// 	App.LogUtil.log("aaa dragonbone ");
			// 	role = App.CommonUtil.getPlayerDragonRole(curTitleId, data.pic, curLevel, true);
			// 	role.x = 340; //w432, h508
			// 	role.y = 35;
			// 	userContainer.addChild(role);
			// 	role.name = 'role';
			// 	userContainer.height = 790;
			// }else{
				role = Api.playerVoApi.getPlayerPortrait(Number(curTitleId), data.pic,null,null,null,null,null,true);
				role.y = -30;
				let isnew = Api.playerVoApi.getNewPalaceRole(curTitleId);
				if (isnew){
					role.x = 0;
				}
				else{
					role.x = 155;
				}
				userContainer.addChild(role);
				userContainer.height = 765;
			// }
		}else{
			userContainer = new BaseDisplayObjectContainer();
			// let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic,0,false,null,null,curLevel);
			let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic,0,false,null,null,curLevel,true);
			role.width = 300;
			role.y = -30;
			role.x = 190;
			userContainer.name = "userContainer";
			userContainer.addChild(role);
			userContainer.height = 765;
		}
        return userContainer;
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

    public dispose():void{
        this.hideViewMask();
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY, this.playCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_ACHIEVERWD, this.getRewardCallback, this);

        if (this._scrollView){
            egret.Tween.removeTweens(this._scrollView);
        }
        if (this._skinContainer){
            egret.Tween.removeTweens(this._skinContainer);
        }
        this._timeBg = null;
        this._timeTxt = null;
        this._rechargeTip = null;
        this._rewardData = null;
        this._isPlay = false;
        this._isTenPlay = false;
        this._isBatch = false;
        this._isSkipAni = false;
        this._skipContainer = null;
        this._playMoreContainer = null;
        this._playBtnTxt = null;
        this._toolNumTxt = null;
        this._freeDesc = null;
        this._pieceNum = null;
        this._proContainer = null;
        this._scrollView = null;
        this._boxList = [];
        this._processRed = null;
        this._detailBg = null;
        this._processNum = null;
        this._skinContainer = null;

        super.dispose();
    }
}