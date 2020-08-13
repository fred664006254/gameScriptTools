/**
 * 制作月饼
 * author yangchengguo
 * date 2019.8.21
 * @class AcSweetGiftMakeCakePopView
 */
class AcSweetGiftMakeCakePopView extends PopupView{
    public _makeContainer:BaseDisplayObjectContainer = null;
    public _materials:BaseBitmap[] = [];
    public _flagGreen:BaseBitmap = null;
    public _flagRed:BaseBitmap = null;
    public _flagYellow:BaseBitmap = null;
    public _rotateTw:egret.Tween = null;
    public _moveContainer:BaseDisplayObjectContainer = null;
    public _hitPos:number = 0;
    public _isMakeOne:boolean = false;
    public _needIcon:BaseBitmap = null;
    public _needTf:BaseTextField = null;
    public _makeBtn:BaseButton = null;
    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_MAKE, this.makeRequestCallback, this);

        let bg = BaseBitmap.create("battlepassrewardbg");
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y - 5);
        this.addChildToContainer(bg);

        let infoBg = BaseBitmap.create("acsweetgift_make_infobg-1");
        infoBg.width = 557;
        infoBg.height = 188;
        infoBg.setPosition(this.viewBg.x + this.viewBg.width/2 - infoBg.width/2, this.viewBg.y);
        this.addChildToContainer(infoBg);

        let infoIconImg = "wife_skinhalf_"+this.cfg.show2;
        let infoIcon = BaseLoadBitmap.create(infoIconImg);
        infoIcon.width = 205;
        infoIcon.height = 196;
        infoIcon.setScale(0.78);
        infoIcon.x = infoBg.x + 20;
        infoIcon.y = infoBg.y + infoBg.height - infoIcon.height * infoIcon.scaleY - 10;
        this.addChildToContainer(infoIcon);

        let moonCakeList = this.cfg.getMoonCakeList();
        let makeDesc = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftMakeDesc-"+this.code, [String(moonCakeList[0].score), String(moonCakeList[1].score), String(moonCakeList[2].score)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        makeDesc.width = 370;
        makeDesc.lineSpacing = 6;
        makeDesc.setPosition(160+GameData.popupviewOffsetX, infoBg.y + infoBg.height/2 - makeDesc.height/2 + 9);
        this.addChildToContainer(makeDesc);

        let makeBg = BaseBitmap.create("ac_sweetgift_make_item_bg-1");
        makeBg.setPosition(infoBg.x + infoBg.width/2 - makeBg.width/2, infoBg.y + infoBg.height + 25);
        this.addChildToContainer(makeBg);

        //转盘
        let makeContainer = new BaseDisplayObjectContainer();
        let rotateBg = BaseBitmap.create("acsweetgift_make_rotate_table-1");
        makeContainer.width = rotateBg.width;
        makeContainer.height = rotateBg.height;
        makeContainer.anchorOffsetX = makeContainer.width/2;
        makeContainer.anchorOffsetY = makeContainer.height/2;
        makeContainer.setPosition(makeBg.x +makeBg.width/2 - 3, makeBg.y + makeBg.height/2 + 10);
        this.addChildToContainer(makeContainer);
        rotateBg.setPosition(0, 0);
        makeContainer.addChild(rotateBg);
        this._makeContainer = makeContainer;

        for (let i=0; i < 4; i++){
            let materialImg = ResourceManager.hasRes("acsweetgift_make_material-"+this.code+"_"+(i+1)) ? "acsweetgift_make_material-"+this.code+"_"+(i+1) : "acsweetgift_make_material-1_1";
            let material = BaseBitmap.create(materialImg);
            material.anchorOffsetX = material.width/2;
            material.anchorOffsetY = material.height/2;
            let posX = makeContainer.width/4 + (i%2) * makeContainer.width/2;
            let posY = makeContainer.height/4 + Math.floor(i/2) * makeContainer.height/2;
            material.setPosition(posX, posY);
            makeContainer.addChild(material);
            this._materials[i] = material;
        }

        //中心问号
        let centerCakeImg = ResourceManager.hasRes("acsweetgift_make_flag-"+this.code) ? "acsweetgift_make_flag-"+this.code : "acsweetgift_make_flag-1";
        let centerCake = BaseBitmap.create(centerCakeImg);
        centerCake.anchorOffsetX = centerCake.width/2;
        centerCake.anchorOffsetY = centerCake.height/2;
        centerCake.setPosition(makeContainer.x, makeContainer.y);
        this.addChildToContainer(centerCake);

        //花
        let flowerLeftImg = ResourceManager.hasRes("acsweetgift_make_flower-"+this.code+"_2") ? "acsweetgift_make_flower-"+this.code+"_2" : "acsweetgift_make_flower-1_2";
        let flowerLeft = BaseBitmap.create(flowerLeftImg);
        flowerLeft.setPosition(makeBg.x - flowerLeft.width/2 + 50, makeBg.y + 130);
        this.addChildToContainer(flowerLeft);

        let flowerRightImg = ResourceManager.hasRes("acsweetgift_make_flower-"+this.code+"_1") ? "acsweetgift_make_flower-"+this.code+"_1" : "acsweetgift_make_flower-1_1";
        let flowerRight = BaseBitmap.create(flowerRightImg);
        flowerRight.setPosition(makeBg.x + makeBg.width/2 + flowerRight.width/2 + 38, makeBg.y + 33);
        this.addChildToContainer(flowerRight);

        //底部
        let table = BaseBitmap.create("acsweetgift_make_table-1");
        table.width = 550;
        table.height = 160;
        table.setPosition(this.viewBg.x + this.viewBg.width/2 - table.width/2, this.getShowHeight() - table.height - 65);
        this.addChildToContainer(table);

        let makeBtn = ComponentManager.getButton("acsweetgift_make_btn-1", "sweetgiftMakeBtnLable-"+this.code, this.makeBtnHandler, this);
        makeBtn.setPosition(this.viewBg.x + this.viewBg.width/2 - makeBtn.width/2, table.y + 70);
        this.addChildToContainer(makeBtn);
        this._makeBtn = makeBtn;

        //元宝
		let needIcon = BaseBitmap.create("itemicon1");
        needIcon.setScale(0.4);
        this.addChildToContainer(needIcon);
        this._needIcon = needIcon;
        
        let playerGem = Api.playerVoApi.getPlayerGem();
        let needStr = LanguageManager.getlocal("sweetgiftMakeFree");
        if (!this.vo.isFree()){
            needStr = LanguageManager.getlocal("sweetgiftNeedMoneyYellowStr-"+this.code, [String(this.cfg.cost), String(playerGem)]);
            if (playerGem < this.cfg.cost){
                needStr = LanguageManager.getlocal("sweetgiftNeedMoneyRedStr-"+this.code, [String(this.cfg.cost), String(playerGem)]);
            }
        }
        
		let needTF = ComponentManager.getTextField(needStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(needTF);
        this._needTf = needTF;
        needIcon.x = makeBtn.x + makeBtn.width/2 - (needIcon.width * needIcon.scaleX + needTF.width)/2 + 3;
        needIcon.y = makeBtn.y + makeBtn.height -3;
        needTF.setPosition(needIcon.x + needIcon.width * needIcon.scaleX, needIcon.y + needIcon.height * needIcon.scaleY /2 - needTF.height/2 + 3);
        if (this.vo.isFree()){
            needIcon.visible = false;
            needTF.setPosition(makeBtn.x + makeBtn.width/2 - needTF.width/2 + 8, makeBtn.y + makeBtn.height + 5);
            needTF.setColor(TextFieldConst.COLOR_WARN_GREEN);
        }

        let scoreBg = BaseBitmap.create("progress16_bg");
        scoreBg.width = 460;
        scoreBg.height = 27;
        scoreBg.setPosition(table.x + table.width/2 - scoreBg.width/2, table.y - 13);
        this.addChildToContainer(scoreBg);

        let flagGreen = BaseBitmap.create("ac_sweetgift_make_green");
        flagGreen.width = 460;
        flagGreen.setPosition(scoreBg.x, scoreBg.y);
        this.addChildToContainer(flagGreen);
        this._flagGreen = flagGreen;

        // let flagRed= BaseBitmap.create("ac_sweetgift_make_red");
        // flagRed.width = 80;
        // flagRed.setPosition(flagGreen.x + 80, flagGreen.y);
        // this.addChildToContainer(flagRed);
        // this._flagRed = flagRed;

        // let flagYellow = BaseBitmap.create("ac_sweetgift_make_yellow");
        // flagYellow.width = 160;
        // flagYellow.setPosition(flagRed.x + flagRed.width - 8, flagRed.y);
        // this.addChildToContainer(flagYellow);  
        // this._flagYellow = flagYellow;

        let flagYellow = BaseBitmap.create("ac_sweetgift_make_yellow");
        flagYellow.width = 180;
        flagYellow.setPosition(flagGreen.x + flagGreen.width/2 - 40, flagGreen.y);
        this.addChildToContainer(flagYellow);  
        this._flagYellow = flagYellow;

        let flagRed= BaseBitmap.create("ac_sweetgift_make_red");
        flagRed.width = 70;
        flagRed.height = flagGreen.height + 2;
        flagRed.setPosition(flagYellow.x + flagYellow.width/2 - flagRed.width/2, flagGreen.y - 1);
        this.addChildToContainer(flagRed);
        this._flagRed = flagRed;

        this._rotateTw = egret.Tween.get(makeContainer,{loop: true}).to({rotation: 360}, 2500);
        for (let i=0; i < this._materials.length; i++){
            egret.Tween.get(this._materials[i],{loop: true}).to({rotation: -360}, 2500);
        }

        //游标
        let moveContainer = new BaseDisplayObjectContainer();
        let moveFlag = BaseBitmap.create("luckydrawslider-2");
        moveContainer.width = moveFlag.width;
        moveContainer.height = moveFlag.height;
        moveContainer.anchorOffsetX = moveFlag.width/2;
        moveContainer.anchorOffsetY = moveFlag.height;
        moveContainer.setPosition(scoreBg.x, scoreBg.y + 15);
        this.addChildToContainer(moveContainer);
        //游标呼吸效果
        let moveLight = BaseBitmap.create("ac_sweetgift_moveflag_light");
        moveLight.setPosition(moveContainer.width/2 - moveLight.width/2, moveContainer.height/2 - moveLight.height/2);
        moveContainer.addChild(moveLight);

        moveContainer.addChild(moveFlag);
        this._moveContainer = moveContainer;

        egret.Tween.get(moveLight, {loop:true}).
        to({alpha:0}, 200).
        to({alpha:1}, 200);

        egret.Tween.get(moveContainer, {loop:true}).
        to({x:scoreBg.x+scoreBg.width - 2}, 3000).
        to({x:scoreBg.x + 2}, 3000);
    }

    public startRotateAni():void{
        for (let i=0; i < 4; i++){
            let materialImg = ResourceManager.hasRes("acsweetgift_make_material-"+this.code+"_"+(i+1)) ? "acsweetgift_make_material-"+this.code+"_"+(i+1) : "acsweetgift_make_material-1_1";
            let material = BaseBitmap.create(materialImg);
            material.anchorOffsetX = material.width/2;
            material.anchorOffsetY = material.height/2;
            let posX = this._makeContainer.width/4 + (i%2) * this._makeContainer.width/2;
            let posY = this._makeContainer.height/4 + Math.floor(i/2) * this._makeContainer.height/2;
            material.setPosition(posX, posY);
            this._makeContainer.addChild(material);
            this._materials[i] = material;
        }
        this._rotateTw = egret.Tween.get(this._makeContainer,{loop: true}).to({rotation: 360}, 2500);
        for (let i=0; i < this._materials.length; i++){
            egret.Tween.get(this._materials[i],{loop: true}).to({rotation: -360}, 2500);
        }
    }

    public getHitPos():number{
        egret.Tween.pauseTweens(this._moveContainer);
        if (this._moveContainer.x >= this._flagRed.x + 4 && this._moveContainer.x < this._flagRed.x + this._flagRed.width - 4){
            return 1;
        }
        else if (this._moveContainer.x >= this._flagYellow.x + 4 && this._moveContainer.x < this._flagYellow.x + this._flagYellow.width - 4){
            return 2;
        }
        else{
            return 3;
        }
    }

    public makeBtnHandler():void{
        if (!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (!this.vo.isFree() && Api.playerVoApi.getPlayerGem() < this.cfg.cost){
            // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            this.showRechargeTipView();
            return;
        }
        this._isMakeOne = true;
        this._makeBtn.setGray(true);
        this._makeBtn.touchEnabled = false;
        let isFree = 0;
        if (this.vo.isFree()){
            isFree = 1;
        }
        this._hitPos = this.getHitPos();
        this.playMoveFlagEffect();
        App.LogUtil.log("hitpos is:"+this._hitPos);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_MAKE, { activeId: this.vo.aidAndCode, isTenPlay:0, hitPos:this._hitPos, isFree: isFree});
    }

    //制作回调
    public makeRequestCallback(event:egret.Event):void{
        if (!this._isMakeOne){
            return;
        }
        let rData = event.data.data.data;
        this._isMakeOne = false;
        //转盘动画
        egret.Tween.removeTweens(this._makeContainer);
        this._rotateTw = null;
        for (let i=0; i < this._materials.length; i++){
            egret.Tween.removeTweens(this._materials[i]);
        }

        let view = this;
        for (let i=0; i < this._materials.length; i++){
            let tw = egret.Tween.get(this._materials[i]).to({rotation: -360}, 800, egret.Ease.sineIn).to({x:this._makeContainer.width/2, y:this._makeContainer.height/2}, 200).call(()=>{
                this._materials[i].dispose(); 
            },this);
        }

        egret.Tween.get(view._makeContainer).to({rotation:360}, 1000, egret.Ease.sineIn);
        egret.Tween.get(this._makeBtn).wait(800).call(()=>{
            let effect = ComponentManager.getCustomMovieClip("acsweetgift_make_effect", 20, 50);
            effect.setPosition(this._makeContainer.x - 90 - this._makeContainer.width/2, this._makeContainer.y - 70 - this._makeContainer.height/2);
            this.addChildToContainer(effect);
            effect.playWithTime(1);
            effect.setEndCallBack(()=>{
                let itemStr = rData.rewards.split("|")[0];
                let itemId = itemStr.split("_")[1];
                let itemData = this.vo.getCakeDataById(itemId);
                let itemName = LanguageManager.getlocal("itemName_" + itemId);
                let msgStr = LanguageManager.getlocal("sweetgiftMakeGetRewardMsg-"+this.code, ["1", itemName, String(itemData.score)]);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards,"isPlayAni":true, tipMsg: msgStr, "callback":view.rewardEnterCallBack, "handler":view});
                this._makeBtn.setGray(false);
                this._makeBtn.touchEnabled = true;
                effect.dispose();
            }, this);
        }, view);
    }

    //恭喜获得回调
    public rewardEnterCallBack():void{
        egret.Tween.resumeTweens(this._moveContainer);
        this.startRotateAni();
    }

    //游标爆点
    public playMoveFlagEffect():void{
        let effect = ComponentManager.getCustomMovieClip("acsweetgift_moveflag_effect", 7, 50);
        effect.setPosition(-this._moveContainer.width/2 - 13, -this._moveContainer.height/2 - 8);
        this._moveContainer.addChild(effect);
        effect.playWithTime(1);
        effect.setEndCallBack(()=>{
            effect.dispose();
        }, this);
    }

    public showRechargeTipView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"sweetgiftTipTitle",
            msg:LanguageManager.getlocal("sweetgiftTipMsg"),
            callback:() =>{
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handler:this,
            needCancel:true,
            });
    }

    public refreshView():void{
        if (this.vo.isFree()){
            this._needTf.text = LanguageManager.getlocal("sweetgiftMakeFree");
            this._needIcon.visible = false;
            this._needTf.setPosition(this._makeBtn.x + this._makeBtn.width/2 - this._needTf.width/2 + 8, this._makeBtn.y + this._makeBtn.height + 5);
            this._needTf.setColor(TextFieldConst.COLOR_WARN_GREEN);
        }
        else{
            let playerGem = Api.playerVoApi.getPlayerGem();
            let needKey = "sweetgiftNeedMoneyYellowStr-";
            if (playerGem < this.cfg.cost){
                needKey = "sweetgiftNeedMoneyRedStr-";
            }
            this._needTf.text = LanguageManager.getlocal(needKey+this.code, [String(this.cfg.cost), String(playerGem)]);
            this._needIcon.visible = true;
            this._needIcon.x = this._makeBtn.x + this._makeBtn.width/2 - (this._needIcon.width * this._needIcon.scaleX + this._needTf.width)/2 + 3;
            this._needIcon.y = this._makeBtn.y + this._makeBtn.height - 3;
            this._needTf.setPosition(this._needIcon.x + this._needIcon.width * this._needIcon.scaleX, this._needIcon.y + this._needIcon.height * this._needIcon.scaleY /2 - this._needTf.height/2 +3);
            this._needTf.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        } 
    }

	private get cfg() : Config.AcCfg.SweetGiftCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcSweetGiftVo{
        return <AcSweetGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }
    
    protected getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

     /**标题 */
	protected getTitleStr():string
	{
		return "sweetgiftMakeCakeTitle-"+this.code;
    }
    
	protected getShowHeight():number
	{
		return 880;
    }

    protected getShowWidth():number
	{
		return 565;
	}
    
    protected getResourceList():string[]
	{
        let arrList:string[] = [];
        if (this.getTypeCode() != "1"){
            arrList = ["acsweetgift_make_material-1_1", "acsweetgift_make_material-1_2", "acsweetgift_make_material-1_3", "acsweetgift_make_material-1_4", "acsweetgift_make_flower-1_1", "acsweetgift_make_flower-1_2", "acsweetgift_make_flag-1"];
        }
		return super.getResourceList().concat([
            "acsweetgift_make_infobg-1", "ac_sweetgift_make_item_bg-1", "acsweetgift_make_rotate_table-1", "acsweetgift_make_table-1", 
            "acsweetgift_make_btn-1", "ac_sweetgift_make_green", "ac_sweetgift_make_red", "ac_sweetgift_make_yellow", "progress16_bg", "luckydrawslider-2", "battlepassrewardbg", "ac_sweetgift_moveflag_light", "itemicon1",
            "acsweetgift_make_flower-"+this.getTypeCode()+"_1", 
            "acsweetgift_make_flower-"+this.getTypeCode()+"_2", 
            "acsweetgift_make_flag-"+this.getTypeCode(), 
            "acsweetgift_make_material-"+this.getTypeCode()+"_1", 
            "acsweetgift_make_material-"+this.getTypeCode()+"_2", 
            "acsweetgift_make_material-"+this.getTypeCode()+"_3", 
            "acsweetgift_make_material-"+this.getTypeCode()+"_4", 
		]).concat(arrList);
	}

     public dispose(){
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_MAKE, this.makeRequestCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        egret.Tween.removeTweens(this._makeContainer);
        egret.Tween.removeTweens(this._moveContainer);
        this._makeContainer = null;
        this._materials = [];
        this._flagGreen = null;
        this._flagRed = null;
        this._flagYellow = null;
        this._moveContainer = null;
        this._isMakeOne = false;
        this._rotateTw = null;
        this._needIcon = null;
        this._needTf = null;
        this._makeBtn = null;
        super.dispose();
     }
}