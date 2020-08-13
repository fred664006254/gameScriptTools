
class LevyScrollItem extends ScrollListItem {

    //场景
    private _contentBg: BaseLoadBitmap = null;
    //锁
    private _lockBm: BaseBitmap = null;
    private _progress: ProgressBar|BaseTextField = null;
    private _starList:BaseBitmap[] = [];
    public constructor() {
        super();
    }
    protected initItem(index: number, data: any) {

        this._index = index;
        let itemBg = BaseBitmap.create("levy_itembg");
        this.width = itemBg.width;
        this.height = itemBg.height;

        this.addChild(itemBg);

        let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(`levy_levyitem_title${index}`),24,TextFieldConst.COLOR_TITLE_NAME) ;
        titleTxt.setPosition(this.width / 2 - titleTxt.width / 2, 5)
        this.addChild(titleTxt);

        let contentBg = BaseLoadBitmap.create(`levy_itemcontentbg${index}`,new egret.Rectangle(0,0,572,166));
        contentBg.setPosition(this.width / 2 - contentBg.width / 2, 35.5)
        this.addChild(contentBg);
        this._contentBg = contentBg;

        let starBg = BaseBitmap.create("levy_starbg");
        starBg.setPosition(this.width / 2 - starBg.width / 2, 45)
        this.addChild(starBg);
        starBg.visible = this._index > 0;


        this.refreshItem();
    }


    public refreshItem() {
        const isUnlock = Api.levyVoApi.checkLevyItemUnlock(this._index);
        this.refreshStars(isUnlock);
        this.refreshProgressBar(isUnlock);
        this.refreshBottom(isUnlock);
        this.refreshLock(isUnlock);
    }
    private refreshLock(isUnlock:boolean){
        if(isUnlock){
            if(this._lockBm){
                this._lockBm.visible = false; 
            }
        }else{
            if(!this._lockBm){
                let lockBm = BaseBitmap.create("levy_lock");
                lockBm.setPosition(this.width / 2 - lockBm.width / 2, this._contentBg.y + this._contentBg.height / 2 - lockBm.height / 2)
                this.addChild(lockBm);
                this._lockBm = lockBm;
            }
            this._lockBm.visible = !isUnlock;
        }
        const funcName = isUnlock ? "changeToNormal" : "changeToGray";
        App.DisplayUtil[funcName](this);

    }

    private getResIcons(index: number, rateName: string, rateNum: number): void {
        let resbgPath = "public_hb_bg03";
        let diffX = 175;
        let resBg: BaseBitmap  = null;
		if(this.getChildByName("resBg"+index)){
			resBg = <BaseBitmap>this.getChildByName("resBg"+index);
		}else{
			resBg= BaseBitmap.create(resbgPath);
			resBg.name = "resBg"+index;
            resBg.setPosition(60 + index * diffX, this._contentBg.y + this._contentBg.height - resBg.height - 10);
            this.addChild(resBg);
        }


        let resName: string;
        let resNum: number;
        let type: string;
        let interval = Config.LevyCfg.LevyItemList[this._index].interval;
        if (rateName == "grate") {
            resName = "public_icon2";
            type = "gold"
        }
        else if (rateName == "frate") {
            resName = "public_icon3";
            type = "food";
        }
        else if (rateName == "srate") {
            resName = "public_icon4";
            type = "soldier";
        }
        resNum = rateNum;

        let resIcon: BaseBitmap  = null;
		if(this.getChildByName("resIcon"+index)){
			resIcon = <BaseBitmap>this.getChildByName("resIcon"+index);
		}else{
			resIcon= BaseBitmap.create(resName);
			resIcon.name = "resIcon"+index;
            resIcon.setPosition(resBg.x-10, resBg.y-10);
            this.addChild(resIcon);
		}

        let resColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        if(resNum<0){
            resColor = 0xff5a5a;
        }
        let resNumText: BaseTextField  = null;
		if(this.getChildByName("resNumText"+index)){
			resNumText = <BaseTextField>this.getChildByName("resNumText"+index);
			resNumText.text = LanguageManager.getlocal("levy_addnum_withinterval", [App.StringUtil.changeIntToText3(resNum), interval]);
			resNumText.setColor(resColor);
		}else{
			resNumText= ComponentManager.getTextField(LanguageManager.getlocal("levy_addnum_withinterval", [App.StringUtil.changeIntToText3(resNum), interval]), 20, resColor);
			resNumText.name = "resNumText"+index;
            resNumText.setPosition(resBg.x+ 45, resBg.y + (resBg.height - resNumText.height) / 2);
            this.addChild(resNumText);
		}

    }

    private refreshProgressBar(isUnlock?:boolean){
        if(this._progress){
            this._progress.dispose();
            this._progress = null;
        }
        let rateObj:any = {};
        let itemRate = Api.levyVoApi.getLevyItemRate(this._index);

        let haveSpeed = false;
        if ((Math.abs(itemRate.frate)+Math.abs(itemRate.grate) +Math.abs(itemRate.srate) ) > 0) {
            haveSpeed = true;
        }
        
        if (haveSpeed) {
            rateObj = itemRate;
            let progress = Api.levyVoApi.getLevyProgressBar(this._index);
            progress.x = 45;
            progress.y = this.height - progress.height - 50;
            this.addChild(progress);
            this._progress = progress;

        } else {
            let rateCfg = Config.LevyCfg.LevyItemList[this._index];
            rateObj.grate = rateCfg.gold || 0;
            rateObj.frate = rateCfg.food || 0;
            rateObj.srate = rateCfg.soldier || 0;

            if(isUnlock){
                let progress = Api.levyVoApi.getLevyStopProgressBar();
                progress.x = 45;
                progress.y = this.height - progress.height - 45;
                this.addChild(progress);
                this._progress = progress;
            }
        }


        let index = 0;
        if(rateObj.grate){
            this.getResIcons(index, "grate", rateObj["grate"]);
            index ++ ;
        }
        if(rateObj.frate){
            this.getResIcons(index, "frate", rateObj["frate"])
            index ++;
        }
        if(rateObj.srate){
            this.getResIcons(index, "srate", rateObj["srate"])
            index ++;
        }
    }

    //初始化底部,进度条/解锁信息/派遣信息
    private refreshBottom(isUnlock: boolean) {
        if (isUnlock) {
            let infoBtn: BaseButton = null;
            if (this._index == 0) {
                infoBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "levy_scrollitem_btnname1", this.infoBtnHandle_first, this);
            } else {
                if(Api.levyVoApi.checkLevyItemIsLaunch(this._index)){
                    infoBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "levy_scrollitem_btnname2", this.infoBtnHandle, this);
                }else{
                    infoBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "levy_scrollitem_btnname3", this.infoBtnHandle, this);
                    if(Api.levyVoApi.checkItemRedPoint(this._index)){
                        App.CommonUtil.addIconToBDOC(infoBtn);
                    }
                }
            }
            this.addChild(infoBtn);
            infoBtn.setPosition(this.width - infoBtn.width - 30, this.height - infoBtn.height - 32);


        } else {
            let unlockPersonLv = Api.levyVoApi.getLevyUnlockList()[this._index];
            let lockTip = ComponentManager.getTextField(LanguageManager.getlocal("levy_locktip", [unlockPersonLv]), 26, TextFieldConst.COLOR_BROWN_NEW);
            this.addChild(lockTip);
            lockTip.setPosition(GameConfig.stageWidth / 2 - lockTip.width / 2, this.y + this.height - lockTip.height - 45);
        }
    }


    private refreshStars(isUnlock:boolean){
        if(isUnlock){
            let buffGroup = Config.LevyCfg.LevyItemList[this._index].buffGroup || {};
            let baseNum = Object.keys(buffGroup).length;
            let starNum = Api.levyVoApi.getBuffStarNum(this._index);
            let starSpace = 10;
            let startX = this.width/2 - (baseNum*50 + (baseNum-1)*starSpace)/2;
            for (let i = 0; i < baseNum; i++) {
                let starRes = "levy_star"+(i<starNum?2:1);
                if(this._starList && this._starList[i]){
                    this._starList[i].setRes("starRes")
                }else{
                    let star = BaseBitmap.create(starRes);
                    star.setPosition(startX + i*(star.width+starSpace),70);
                    this.addChild(star);
                    this._starList.push(star);
                }           
            }
        }

    }

    private infoBtnHandle() {
        Api.rookieVoApi.checkNextStep();
        ViewController.getInstance().openView(ViewConst.COMPOSE.LEVYSCROLLITEMDETAILPOPUPVIEW,{index:this._index});

    }

    private infoBtnHandle_first() {
        ViewController.getInstance().openView(ViewConst.COMPOSE.LEVYSCROLLITEM1DETAILPOPUPVIEW);
    }


    public getSpaceY(): number {
        return 10;
    }
    public getSpaceX(): number {
        return 0;
    }

    public dispose(): void {
        this._contentBg = null;
        this._lockBm = null;
        if(this._progress){
            egret.Tween.removeTweens(this._progress)
        }
        this._progress = null;

        this._starList = [];
        super.dispose();
    }
}