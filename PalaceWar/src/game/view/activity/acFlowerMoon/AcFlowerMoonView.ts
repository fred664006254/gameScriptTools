/*
    author : wxz
    date : 2020/8/4
    desc : 中秋活动--后羿衣装【九幽府君】 嫦娥衣装【九天仙女】
*/
class AcFlowerMoonView extends AcCommonView
{
    private _timeCountTxt : BaseTextField = null;
    private _timebg:BaseBitmap = null;

    private _btn:BaseButton = null;
    private _haveTxt:BaseTextField=null;
    private _haveCon:BaseDisplayObjectContainer = null;

    private _progressBar:ProgressBar = null;
    private _processContainer:BaseDisplayObjectContainer = null;
    private _processNum:BaseTextField=null;
    private _detailBtn:BaseButton = null;
    private _rankBtn:BaseButton = null;
    private _boxList:any[] = [];

    private _exchangeNumTxt:BaseTextField=null;
    private _exchangeNumTxt2:BaseTextField=null;

    private _isMove = false;

    private _infobg:BaseBitmap=null;
    private _scrollView:ScrollView = null;
    private _proContainer:BaseDisplayObjectContainer = null;
    private _qiaojiEffect:BaseLoadDragonBones=null;
    private _payTxt:BaseTextField=null;
    private _botImg:BaseBitmap=null;
    private _ybBtnArr:BaseButton[] = null;

    private _boneCon:BaseDisplayObjectContainer = null;

    private _checkBox1:CheckBox = null;
    private _checkTxt1:BaseTextField=null;

    public constructor(){
        super();
    }

    // 标题背景名称
	protected getTitleBgName():string
	{
		return "acflowermoon_title-" + this.typeCode;
	}
    protected getTitleStr(): string {
        return null;
    }
	protected getBgName():string
	{
		return "acflowermoon_bg-"+this.typeCode;
	}    
    protected getRuleInfo():string{
		return "acFlowerMoonRuleInfo-" + this.typeCode;
    } 
	protected getRuleInfoParam():string[]
	{
        let needNum1 = this.vo.getServantNeed();
        let needNum2 = this.vo.getWifeNeed();
        return [String(this.cfg.needGem),String(needNum1),String(needNum2)];
	}
    private get cfg() : Config.AcCfg.FlowerMoonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcFlowerMoonVo{
        return <AcFlowerMoonVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
    private get typeCode():string
    {
        if(this.code == "2")
        {
            return "1";
        }
        return this.code;
    }

    public initView()
    {
        let code = this.code;
        let typecode = this.typeCode;
        this.width = GameConfig.stageWidth;
		this.height = GameConfig.stageHeigth;

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACFLOWERMOON_SETPOS, this.freshYbBtn, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACFLOWERMOON_PLAY, this.attackCallback, this);

        this._infobg = BaseBitmap.create(`acflowermoon_infobg-${typecode}`);
        this._infobg.x = GameConfig.stageWidth/2 - this._infobg.width/2;
        this._infobg.y = this.titleBg.y+this.titleBg.height;
        this.addChild(this._infobg);

        //活动时间   
        let timeTxt = ComponentManager.getTextField(this.vo.getAcTimeAndHour(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.x = this._infobg.x + 20;
        timeTxt.y = this._infobg.y + 25;
        this.addChild(timeTxt);

        let needNum1 = this.vo.getServantNeed();
        let needNum2 = this.vo.getWifeNeed();
        let infoTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acFlowerMoonInfo-${typecode}`,[String(this.cfg.needGem),String(needNum1),String(needNum2)]), 18, TextFieldConst.COLOR_WHITE);
        infoTxt.x = timeTxt.x;
        infoTxt.y = timeTxt.y + timeTxt.height + 4;
        infoTxt.lineSpacing = 4;
        infoTxt.width = 600;
        this.addChild(infoTxt);

        let paynum = this.cfg.needGem - (this.vo.v%this.cfg.needGem);
        let payTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acFlowerMoonPayDesc-${typecode}`,[String(paynum)]), 18, TextFieldConst.COLOR_WHITE);
        payTxt.x = timeTxt.x;
        payTxt.y = infoTxt.y + infoTxt.height + 8;
        this.addChild(payTxt);
        this._payTxt = payTxt;

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        timebg.width = 260;
        this.addChild(timebg);
        this.setLayoutPosition(LayoutConst.rightbottom,timebg,this._infobg,[10,-timebg.height/2]);
        timebg.y = 225;
        this._timebg = timebg;

        let timeCountTxt = ComponentManager.getTextField(this.vo.getAcCountDown(), 18,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,timeCountTxt,timebg,[0,0]);
        this.addChild(timeCountTxt);
        this._timeCountTxt = timeCountTxt;

        let botbg = BaseBitmap.create(`acflowermoon_desk-${typecode}`);
        botbg.x = GameConfig.stageWidth/2 - botbg.width/2;
        botbg.y = GameConfig.stageHeigth - botbg.height + (1136-GameConfig.stageHeigth)/2;
        this._botImg = botbg;

        //活动详情
        let detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acflowermoon_detailbtn", typecode), "", ()=>{
            if (!this.vo.isStart)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACFLOWERMOONREWARDPOPVIEW, {aid: this.aid, code: this.code});
        }, this);
        detailBtn.setScale(1);
        detailBtn.setPosition(0, this._infobg.y + this._infobg.height - detailBtn.height - 8);
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;

        this._rankBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acturntable_rankicon", typecode), "", ()=>{
            if (!this.vo.isStart)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACFLOWERMOONRANKREWARDPOPVIEW, {aid: this.aid, code: this.code});
        }, this);
        this._rankBtn.setPosition(5, this._infobg.y + this._infobg.height);
        this.addChild(this._rankBtn);    

        this._proContainer = new BaseDisplayObjectContainer();
        this._proContainer.height = 150;

        let scrollView = ComponentManager.getScrollView(this._proContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth - 63, this._proContainer.height));
        scrollView.setPosition(95, 252);
        scrollView.bounces = false;
        this._scrollView = scrollView;
        this.addChild(this._scrollView);

        this.initProContainer();            

        this.showAcDialog();

        this._boneCon = new BaseDisplayObjectContainer();
        this.addChild(this._boneCon);

        this.showPreEffect();

        this.addChild(botbg);

        let exchangebg = BaseBitmap.create(`public_9_bg91`);
        exchangebg.width = 210;
        exchangebg.height = 32;
        this.addChild(exchangebg);

        let str:string = this.cfg.change[0].needItem;
        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        let icon = BaseLoadBitmap.create(itemCfg.icon);
        icon.width = 50;
        icon.height = 50;
        icon.setPosition(0,GameConfig.stageHeigth-85);
        this.addChild(icon);

        exchangebg.setPosition(icon.x+icon.width*icon.scaleX-20,icon.y+icon.height*icon.scaleY/2-exchangebg.height/2);

        let exchangeNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acFlowerMoonExchangeNumTxt`,["0","0"]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        exchangeNumTxt.x = icon.x + icon.width*icon.scaleX + 0;
        exchangeNumTxt.y = exchangebg.y + exchangebg.height/2 - exchangeNumTxt.height/2;
        this.addChild(exchangeNumTxt);
        this._exchangeNumTxt = exchangeNumTxt;

        this._exchangeNumTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acFlowerMoonExchangeNumTxt2`,["0"]), 20, TextFieldConst.COLOR_WHITE);
        this._exchangeNumTxt2.x = GameConfig.stageWidth/2 - this._exchangeNumTxt2.width/2;
        this._exchangeNumTxt2.y = botbg.y + 145;
        this.addChild(this._exchangeNumTxt2);

        // 前进按钮
        let drinkTeaBtn1 = ComponentManager.getButton("flowermoon_btn-"+typecode, "", this.drinkTeaBtnHandle, this);
        this.addChild(drinkTeaBtn1);
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom,drinkTeaBtn1,this,[0,0]);
        this._btn = drinkTeaBtn1;

        let numbg = BaseBitmap.create("public_numbg");
        numbg.width = 140;
        numbg.height = 24;
        numbg.setPosition(GameConfig.stageWidth/2 - numbg.width/2, GameConfig.stageHeigth-142);
        this.addChild(numbg);

        this._haveCon = new BaseDisplayObjectContainer();
        this.addChild(this._haveCon);

        let wishIcon1 = BaseBitmap.create(App.CommonUtil.getResByCode("flowermoon_itemiconsmall",code));
        wishIcon1.setScale(0.8);
        this._haveCon.addChild(wishIcon1);

        let itemNumText = ComponentManager.getTextField( "X", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        itemNumText.setPosition(wishIcon1.x+wishIcon1.width*wishIcon1.scaleX, wishIcon1.y+wishIcon1.height*wishIcon1.scaleY/2-itemNumText.height/2);
        this._haveCon.addChild(itemNumText);
        this._haveTxt = itemNumText;

        this._haveCon.y = numbg.y + numbg.height/2 - this._haveCon.height/2;

        let iconscale = 0.7;
        let icon1 = BaseBitmap.create(`flowermoon_itemiconsmall-${typecode}`);
        icon1.name = "costicon"
        icon1.setScale(iconscale);
        icon1.setPosition(drinkTeaBtn1.width/2-icon1.width*icon1.scaleX/2,21);
        drinkTeaBtn1.addChild(icon1);

        let costTxt1 = ComponentManager.getTextField("X"+this.cfg.cost1, 18,TextFieldConst.COLOR_BROWN);
        costTxt1.name = "costtxt1"
        costTxt1.x = icon1.x + icon1.width*icon1.scaleX + 1;
        costTxt1.y = icon1.y + icon1.height*icon1.scaleY/2 - costTxt1.height/2;
        drinkTeaBtn1.addChild(costTxt1);

        let costTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acFlowerMoonCostTip1"), 18,TextFieldConst.COLOR_BROWN);
        costTxt2.name = "costtxt2"
        costTxt2.x = icon1.x - costTxt2.width - 1;
        costTxt2.y = costTxt1.y;
        drinkTeaBtn1.addChild(costTxt2);            

        let freeLab = ComponentManager.getTextField(LanguageManager.getlocal("acFlowerMoonCostTip2"), 22,TextFieldConst.COLOR_BROWN);
        freeLab.name = "freelab";
        freeLab.x = drinkTeaBtn1.width/2 - freeLab.width/2;
        freeLab.y = 30;
        drinkTeaBtn1.addChild(freeLab);

        let btnTxt = ComponentManager.getTextField(LanguageManager.getlocal("acFlowerMoonCostTip3",["1"]), 22,TextFieldConst.COLOR_BROWN);
        btnTxt.name = "btntxt";
        btnTxt.x = drinkTeaBtn1.width/2 - btnTxt.width/2;
        btnTxt.y = 55;
        drinkTeaBtn1.addChild(btnTxt);        

        let chooseTxt = ComponentManager.getTextField(LanguageManager.getlocal("acFlowerMoonCostTip4"), 22,TextFieldConst.COLOR_BROWN);
        chooseTxt.name = "choosetxt";
        chooseTxt.x = drinkTeaBtn1.width/2 - chooseTxt.width/2;
        chooseTxt.y = drinkTeaBtn1.height/2 - chooseTxt.height/2-3;
        drinkTeaBtn1.addChild(chooseTxt);

        this._checkBox1=ComponentManager.getCheckBox("");
        this._checkBox1.setPosition(drinkTeaBtn1.x+drinkTeaBtn1.width+10, drinkTeaBtn1.y + 30);
        this.addChild(this._checkBox1);
        this._checkBox1.addTouchTap(this.onCheckClick1,this);        
        this._checkTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acFlowerMoonCheckTip1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._checkTxt1.setPosition(this._checkBox1.x+this._checkBox1.width+10,this._checkBox1.y+this._checkBox1.height/2-this._checkTxt1.height/2);
        this.addChild(this._checkTxt1);

        let checkTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acFlowerMoonCheckTip2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        checkTxt2.setPosition(this._checkBox1.x-20,this._checkBox1.y+this._checkBox1.height+2);
        this.addChild(checkTxt2);

        this.freshView();
        this.freshYbBtn();
    }

    private get progressOffX():number
    {
        return 95;
    }
    //进度相关
    private initProContainer():void
    {
        let data = this.vo.getSortAchievementCfg(false);
        let len = data.length;
        let proW = this.progressOffX * len;
        this._proContainer.width = proW + 130;

        let progressBar = ComponentManager.getProgressBar(App.CommonUtil.getResByCode("acflowermoon_progress", this.getUiCode()), App.CommonUtil.getResByCode("acflowermoon_progressbg", this.getUiCode()), proW);
        progressBar.setPosition(35, 65);
        this._progressBar = progressBar;

        //当前进度
        let processContainer = new BaseDisplayObjectContainer();
        this._processContainer = processContainer;
        let processBg = BaseBitmap.create(App.CommonUtil.getResByCode("acflowermoon_bubble", this.getUiCode()));
        processContainer.width = processBg.width;
        processContainer.height = processBg.height;
        processContainer.addChild(processBg);
        processContainer.x = progressBar.x - processContainer.width/2;

        let currProcessNum = this.vo.getAchieveNum();
        let processNum = ComponentManager.getTextField(String(currProcessNum), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        processNum.setPosition(processContainer.width/2 - processNum.width/2, 14);
        processContainer.addChild(processNum);
        this._processNum = processNum;

        this._boxList = [];
        let curId = 0;
        for (let i=0; i < len; i++)
        {
            let boxCon = new BaseDisplayObjectContainer();

            let boxImg = "acflowermoon_ach2";
            let box = BaseBitmap.create(App.CommonUtil.getResByCode(boxImg, this.typeCode));
            boxCon.addChild(box);
            box.name = "box"+i;
            boxCon.width = box.width;
            boxCon.anchorOffsetX = boxCon.width/2;
            box.anchorOffsetX = box.width/2;
            boxCon.height = box.y + box.height;

            let proNumBg = BaseBitmap.create("acflowermoon_numbg");
            proNumBg.name = "proNum"+i;
            proNumBg.width = 40;
            if(data[i].needNum >= 100)
            {
                proNumBg.width = 46;
            }
            proNumBg.anchorOffsetX = proNumBg.width/2;
            proNumBg.setPosition(box.x,box.y+box.height-proNumBg.height);
            boxCon.addChild(proNumBg);

            let proNum = ComponentManager.getTextField(data[i].needNum+"", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            proNum.anchorOffsetX = proNum.width/2;
            proNum.setPosition(proNumBg.x, proNumBg.y + proNumBg.height/2 - proNum.height/2);
            boxCon.addChild(proNum);

            boxCon.setPosition(progressBar.x + (i+1) * this.progressOffX + boxCon.width/2, 0);
            this._proContainer.addChild(boxCon);
            boxCon.addTouchTap(()=>{
                //进度
                if (!this.vo.isStart)
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACFLOWERMOONREWARDPOPVIEW, {aid: this.aid, code: this.code, id:data[i].id});
            }, this);

            this._boxList[i] = boxCon;
            if (curId == 0 && this.vo.getAchieveNum() < data[i].needNum){
                curId = i;
            }
        }

        processContainer.y = 75;
        this._proContainer.addChild(progressBar);
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
    private refreshProContainer():void
    {
        let currProNum = this.vo.getAchieveNum();
        let data = this.cfg.getAchieveList();
        for (let i=0; i < data.length; i++)
        {
            let group = this._boxList[i];
            let eff = <CustomMovieClip>group.getChildByName("eff"+i);
            let box = <BaseBitmap>group.getChildByName("box"+i);
            let proNum = <BaseBitmap>group.getChildByName("proNum"+i);
            if (this.vo.isGetAchievementById(data[i].id+""))
            {
                if (eff)
                {
                    eff.dispose();
                    eff = null;
                }
                box.setRes(`acflowermoon_ach1-${this.typeCode}`);
            }
            else
            {
                if (currProNum >= data[i].needNum){

                    if (!eff)
                    {
                        eff = ComponentManager.getCustomMovieClip(`flowermooneff`, 10);
						eff.name = `eff${i}`;
                        group.addChildAt(eff, group.getChildIndex(proNum));
                        eff.width = 140;
                        eff.height = 140;
                        eff.playWithTime(-1);
						eff.x = -eff.width * eff.scaleX/2;
						eff.y = box.y + box.height/2 - eff.height * eff.scaleY/2-15;
						eff.blendMode = egret.BlendMode.ADD;
                    }
                    box.setRes(`acflowermoon_ach4-${this.typeCode}`);
                }
                else
                {
                    box.setRes(`acflowermoon_ach2-${this.typeCode}`);
					if(eff)
                    {
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
            let currNum = curProIndex == 0 ? 0 : data[curProIndex - 1].needNum;
            let nextNum = data[curProIndex].needNum;
            let offX = 0;
            if (curProIndex == 0){
                offX = (currProNum - currNum) * this.progressOffX / (nextNum - currNum);
            }
            else{
                offX = curProIndex * this.progressOffX + (currProNum - currNum) * this.progressOffX / (nextNum - currNum);
            }
            this._progressBar.setPercentage(offX/this._progressBar.width);
        }
        this._processContainer.x = this._progressBar.x + this._progressBar.width * this._progressBar.getPercent() - this._processContainer.width/2;
        this._processNum.text = String(currProNum);
        this._processNum.x = this._processContainer.width/2 - this._processNum.width/2;

        if(this._processContainer.x + this._processContainer.width - this._scrollView.scrollLeft + this._scrollView.x >= 635)
        {
            this._scrollView.scrollLeft = this._processContainer.x + this._processContainer.width + this._scrollView.x - 630;
        }       
    }    

    private onCheckClick1():void
    {
        this.freshFreeLab();
    }

	protected closeHandler():void
	{
        if(this._isMove)
        {
            return;
        }
		this.hide();
	}

    private freshView():void
    {
        if(this._isShowEffect)
        {
            return;
        }

        this.freshFreeLab();
        this.freshRed();
        this.refreshProContainer();

        this._haveTxt.text = "X" + String(this.vo.getProcess());
        this._haveCon.x = GameConfig.stageWidth/2 - this._haveCon.width/2;

        let paynum = this.cfg.needGem - (this.vo.v%this.cfg.needGem);
        this._payTxt.text = LanguageManager.getlocal(`acFlowerMoonPayDesc`,[String(paynum)]);  

        if(!this._ybBtnArr)
        {
            this._ybBtnArr = [];
            let arr = [[45,50],[190,70],[370,60],[500,35]];
            for(let i = 0; i < 4; i++)
            {
                let btn = ComponentManager.getButton("acflowermoon_yb"+(i+1), "", this.ybBtnHandle, this,[i]); 
                btn.name = "index_" + i; 
                btn.setPosition(this._botImg.x+arr[i][0],this._botImg.y+arr[i][1]);   
                this.addChild(btn);
                this._ybBtnArr.push(btn);
            }
        }
        for(let j = 0; j < 4; j++)
        {
            this._ybBtnArr[j].visible = j < this.vo.maxunlockType;
        }

        let exchangeNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.change[0].needItem.split("_")[1]);
        let leftNum = this.cfg.maxNum - this.vo.slimit;

        this._exchangeNumTxt.text = LanguageManager.getlocal(`acFlowerMoonExchangeNumTxt`,[""+exchangeNum,""+leftNum]);

        let left = this.cfg.per - (this.vo.chouNum%this.cfg.per);
        this._exchangeNumTxt2.text = LanguageManager.getlocal(`acFlowerMoonExchangeNumTxt2`,[""+left]);
        this._exchangeNumTxt2.visible = leftNum > 0;

        if(this.vo.pos)
        {
            if(this._clickHand)
            {
                this._clickHand.visible = false;
            }
        }        
    }

    private ybBtnHandle(i:number):void
    {
        if (!this.vo.isInActivity() || this.vo.checkIsInEndShowTime())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }        
        if(this.vo.pos == i+1)
        {
            this.freshYbBtn();
            return;
        }
        for(let j = 0; j < 4; j++)
        {
            if(j == i)
            {
                this._ybBtnArr[j].updateButtonImage(BaseButton.BTN_STATE2);
            }else
            {
                this._ybBtnArr[j].updateButtonImage(BaseButton.BTN_STATE1);
            }
        }        
        NetManager.request(NetRequestConst.REQUEST_ACFLOWERMOON_SETPOS, {activeId: this.vo.aidAndCode, pos:i+1});
    }

    private freshYbBtn():void
    {
        let index = this.vo.pos;
        for(let j = 0; j < 4; j++)
        {
            if(j+1 == this.vo.pos)
            {
                this._ybBtnArr[j].updateButtonImage(BaseButton.BTN_STATE2);
            }else
            {
                this._ybBtnArr[j].updateButtonImage(BaseButton.BTN_STATE1);
            }
        }
    }

    protected receiveData(data: { ret: boolean, data: any }): void
    {
        if (!data.ret) 
        {
            this._isShowEffect = false;
            this.hideViewMask();            
            App.CommonUtil.showTip(data.data.ret);
            return;
        }
    }

    private _tempAwards:any=null;
    private attackCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!event.data.ret)
        {
            this._isShowEffect = false;
            this.hideViewMask();
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this._tempAwards = rData.rewards;
        this.showEffect();        
    }
    private showEffect():void
    {
        let num = this.vo.score - this._preNum;
        if(this._isTen)
        {
            if(this._tempAwards)
            {
                let str = LanguageManager.getlocal("acFlowerMoonRewardTip3-"+this.typeCode,[num+""]);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this._tempAwards,"isPlayAni":true, "callback":null, "handler":null,isSameAdd:false,wordParam:str});            
            }
            this.hideViewMask();
            this._isShowEffect = false;
            this.freshView();
        }else
        {
            let img = BaseBitmap.create("acflowermoon_ybitem"+this.vo.pos);
            this.addChild(img);
            let arr = [45,35,45,25];
            for(let i = 0; i < this._ybBtnArr.length; i++)
            {
                if(i+1 == this.vo.pos)
                {
                    img.x = this._ybBtnArr[i].x + this._ybBtnArr[i].width/2 - img.width/2;
                    img.y = this._ybBtnArr[i].y + this._ybBtnArr[i].height - arr[i];
                    let posy = img.y - 100;
                    egret.Tween.get(img).to({y : posy, alpha:0}, (1000)).call(()=>
                    {
                        egret.Tween.removeTweens(img);
                        img.dispose();
                        img = null;
                        if(this._tempAwards)
                        {
                            let str = "";
                            if(num == this.cfg.like.tureScore)
                            {
                                str = LanguageManager.getlocal("acFlowerMoonRewardTip2-"+this.typeCode,[num+""]);
                            }else
                            {
                                str = LanguageManager.getlocal("acFlowerMoonRewardTip1-"+this.typeCode,[num+""]);
                            }
                            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this._tempAwards,"isPlayAni":true, "callback":null, "handler":null,isSameAdd:false,wordParam:str});            
                        }
                        this.hideViewMask();
                        this._isShowEffect = false;
                        this.freshView();                        
                    }, this);                   
                    break;
                }
            }
        }
    }

    private _isShowEffect = false;
    private _isTen = false;
    private _preNum:number = 0;
    private _clickHand:BaseBitmap = null;
    private drinkTeaBtnHandle():void
    {
        if (!this.vo.isInActivity() || this.vo.checkIsInEndShowTime())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }       
        if(!this.vo.isSelected())
        {
            ViewController.getInstance().openView(ViewConst.POPUP.ACFLOWERMOONREWARDPOPVIEWTAB2, {aid: this.aid, code: this.code});
            return;
        }
        if(!this.vo.pos && !this._checkBox1.checkSelected())
        {
            if(!this._clickHand)
            {
                this._clickHand = BaseBitmap.create("guide_hand");
                this.addChild(this._clickHand);
                this._clickHand.setPosition(this._ybBtnArr[0].x+this._ybBtnArr[0].width/2-10,this._ybBtnArr[0].y+this._ybBtnArr[0].height/2);
                egret.Tween.get(this._clickHand,{loop:true})
                .to({scaleX: 0.9,scaleY:0.9}, 500)
                .to({scaleX: 1,scaleY:1}, 500);                  
            }
            this._clickHand.visible = true;            
            App.CommonUtil.showTip(LanguageManager.getlocal('acFlowerMoonCheckTip3'));
            return;
        }
        let cost = 1;
        if(this.vo.isfree > 0)
        {
            cost = 0;
        }
        this._isTen = false;
        if(this._checkBox1.checkSelected())
        {
            cost = 10;
            this._isTen = true;
        }
        let have = this.vo.getProcess();
        if(have < cost)
        {
            let message: string = LanguageManager.getlocal(`acFlowerMoonConfirmDesc`);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : message,
                title : "itemUseConstPopupViewTitle",
                touchMaskClose : true,
                callback : ()=>
                {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler : this,
                needClose : 1,
                needCancel : true
            });
            return;
        }
        this._isShowEffect = true;
        this.showViewMask();
        this._preNum = this.vo.score;
        this.request(NetRequestConst.REQUEST_ACFLOWERMOON_PLAY, 
        {
            activeId: this.vo.aidAndCode,
            isFree:cost==0?1:0,
            isTenPlay:cost==10 ? 1 : 0,
        });        
    }
    private freshFreeLab():void
    {
        let costicon = <BaseBitmap>this._btn.getChildByName("costicon");
        let costtxt1 = <BaseTextField>this._btn.getChildByName("costtxt1");
        let costtxt2 = <BaseTextField>this._btn.getChildByName("costtxt2");
        let freelab = <BaseTextField>this._btn.getChildByName("freelab");
        let btntxt = <BaseTextField>this._btn.getChildByName("btntxt");
        let choosetxt = <BaseTextField>this._btn.getChildByName("choosetxt");

        costicon.visible = costtxt1.visible = costtxt2.visible = freelab.visible = btntxt.visible = choosetxt.visible = false;
        
        if(this.vo.isSelected())
        {
            btntxt.visible = true;
            if(this._checkBox1.checkSelected())
            {
                costicon.visible = true;
                costtxt1.visible = true;
                costtxt2.visible = true;
                costtxt1.text = "X" + this.cfg.cost10;
                btntxt.text = LanguageManager.getlocal("acFlowerMoonCostTip3",[""+this.cfg.cost10]);
            }else
            {
                if(this.vo.isfree > 0)
                {
                    freelab.visible = true;
                }else
                {
                    costicon.visible = true;
                    costtxt1.visible = true;
                    costtxt2.visible = true;
                    costtxt1.text = "X" + this.cfg.cost1;
                    btntxt.text = LanguageManager.getlocal("acFlowerMoonCostTip3",[""+this.cfg.cost1]);
                }
            }
        }else
        {
            choosetxt.visible = true;
        }
    }
    private freshRed() 
    {
        if (this.vo.isShowAchieveDot() || this.vo.showExchangeDot())
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let detailRed = <BaseBitmap>this._detailBtn.getChildByName("reddot");
            if (detailRed)
            {
                detailRed.setPosition(75, 0);
            }
        }
        else
        {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        if (this.vo.isShowPrankDot() || this.vo.isShowZrankDot())
        {
            App.CommonUtil.addIconToBDOC(this._rankBtn);
            let red = <BaseBitmap>this._rankBtn.getChildByName("reddot");
            if (red)
            {
                red.setPosition(55, 0);
            }
        }
        else
        {
            App.CommonUtil.removeIconFromBDOC(this._rankBtn);
        }        
    }    
 
    private tick() 
    {
        this._timeCountTxt.setString(this.vo.getAcCountDown());
        this._timeCountTxt.x = this._timebg.x + this._timebg.width/2 - this._timeCountTxt.width/2;

        if(this.vo.checkIsAtEndShowTime())
        {
            NetManager.request(NetRequestConst.REQUEST_ACFLOWERMOON_CHECKREDPOINT, {activeId: this.vo.aidAndCode});
        }
    }
    private showPreEffect():void
    {
        let skinitemCfg = Config.ItemCfg.getItemCfgById(this.cfg.change[0].getReward.split("_")[1]);
        let skinId = skinitemCfg.getRewards.split("_")[1];
        let skinCfg:any = Config.ServantskinCfg.getServantSkinItemById(skinId);        
        let servantBone = "servant_full2_1067";
        // servantBone = skinCfg.bone;
        if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(servantBone+"_ske"))//+"_ske"
        {
            let servantDB = App.DragonBonesUtil.getLoadDragonBones(servantBone);
            servantDB.setPosition(0+ this.viewBg.x+140,  GameConfig.stageHeigth);
            servantDB.anchorOffsetY = servantDB.height;
            servantDB.anchorOffsetX = servantDB.width / 2;
            servantDB.scaleX = -0.88;
            servantDB.scaleY = 0.88;
            this._boneCon.addChild(servantDB);
        }
        else
        {   
            let servantPic = BaseLoadBitmap.create("servant_full_1067");
            // let servantPic = BaseLoadBitmap.create(skinCfg.body);
            servantPic.scaleX = -0.83;
            servantPic.scaleY = 0.83;
            servantPic.setPosition(300, GameConfig.stageHeigth-420);
            this._boneCon.addChild(servantPic);
        }
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(40, GameConfig.stageHeigth - 200);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this._boneCon.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);

        let skinTxt2 = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt2.anchorOffsetX = skinTxt2.width / 2;
        skinTxt2.anchorOffsetY = skinTxt2.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt2, skinTxtEffect);
        this._boneCon.addChild(skinTxt2);
        egret.Tween.get(skinTxt2, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

        let skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt1.anchorOffsetX = skinTxt1.width / 2;
        skinTxt1.anchorOffsetY = skinTxt1.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
        this._boneCon.addChild(skinTxt1);

        skinTxt1.blendMode = egret.BlendMode.ADD;
        skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxt1.addTouchTap(() => {
                ViewController.getInstance().openView(ViewConst.POPUP.ACFLOWERMOONREWARDPOPVIEWTAB3, {aid: this.aid, code: this.code});
        }, this);

        skinId = this.cfg.change[1].getReward.split("_")[1];
        let skinCfg2:any = Config.WifeskinCfg.getWifeCfgById(skinId);
        let wifeBone = "wife_full_254";
        // wifeBone = skinCfg2.bone;
        if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(wifeBone+"_ske"))//
        {
            let wifetDB = App.DragonBonesUtil.getLoadDragonBones(wifeBone);
            wifetDB.setPosition(158+ this.viewBg.x +370, GameConfig.stageHeigth);
            wifetDB.anchorOffsetY = wifetDB.height;
            wifetDB.anchorOffsetX = wifetDB.width;
            wifetDB.scaleX = -0.7;
            wifetDB.scaleY = 0.7;
            this._boneCon.addChild(wifetDB);
        }
        else
        {   
            let rect:egret.Rectangle = egret.Rectangle.create();
            rect.setTo(0,0,640,840);
            let wifepic = BaseLoadBitmap.create("wife_full_254",rect);
            // let wifepic = BaseLoadBitmap.create(skinCfg2.body,rect);
            wifepic.scaleX = -0.5;
            wifepic.scaleY = 0.5;
            wifepic.setPosition(GameConfig.stageWidth, GameConfig.stageHeigth-720);
            this._boneCon.addChild(wifepic);
        }
        let skinTxtEffect2 = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect2.width = 208;
        skinTxtEffect2.height = 154;
        skinTxtEffect2.setPosition(410, GameConfig.stageHeigth - 200);
        skinTxtEffect2.blendMode = egret.BlendMode.ADD;
        this._boneCon.addChild(skinTxtEffect2);
        skinTxtEffect2.playWithTime(-1);

        let skinTxt4 = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt4.anchorOffsetX = skinTxt4.width / 2;
        skinTxt4.anchorOffsetY = skinTxt4.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt4, skinTxtEffect2);
        this._boneCon.addChild(skinTxt4);
        egret.Tween.get(skinTxt4, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

        let skinTxt3 = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt3.anchorOffsetX = skinTxt3.width / 2;
        skinTxt3.anchorOffsetY = skinTxt3.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt3, skinTxtEffect2);
        this._boneCon.addChild(skinTxt3);

        skinTxt3.blendMode = egret.BlendMode.ADD;
        skinTxt3.alpha = 0;
        egret.Tween.get(skinTxt3, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxt3.addTouchTap(() => {
                ViewController.getInstance().openView(ViewConst.POPUP.ACFLOWERMOONREWARDPOPVIEWTAB4, {aid: this.aid, code: this.code});
        }, this);        

        this._boneCon.y = -300 + (1136-GameConfig.stageHeigth)/5*4;
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
   	private getBonesResArr(name:string):string[]
	{
		return [name+"_ske",name+"_tex_json",name+"_tex_png"];
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
    private getDefaultResList(resArr: string[]): string[] 
    {
        let arr = [];
        for (let i = 0; i < resArr.length; i++) {
            const element = resArr[i];
            let defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    }
    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `flowermooncode1`,"acturntable_rankicon","acturntable_rankicon_down","public_popupscrollitembg",
            "acwealthcarpview_skineffect","acwealthcarpview_servantskintxt","progress3", "progress3_bg","guide_hand"
        ]);
    }
    private effectRes(name:string,num:number,b:boolean=false):string[]
    {
        let arr = [];
        for(let i = 1; i <= num; i++)
        {
            arr.push(name+String(i));
        }
        if(b)
        {
            return arr;
        }
        return this.getDefaultResList(arr);
    }    
	protected getProbablyInfo():string
	{
		return "acFlowerMoonProbablyInfo-"+this.typeCode;
    }     
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	} 
    
    public dispose():void
    {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACFLOWERMOON_SETPOS, this.freshYbBtn, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACFLOWERMOON_PLAY, this.attackCallback, this);
        this._timeCountTxt = null;
        this._isShowEffect = false;
        this._haveTxt = null;
        this._payTxt = null;  
        this._haveCon = null;
        this._infobg = null;
        this._scrollView = null;
        this._proContainer = null;
        this._checkBox1 = null;
        this._checkTxt1 = null;
        this._btn = null;
        this._botImg = null;

        for(let i = 0; i < this._boxList.length; i++)
        {
            if(this._boxList[i])
            {
                this._boxList[i].dispose();
                this._boxList[i] = null;
            }
        }
        this._boxList = null;
        for(let i = 0; i < this._ybBtnArr.length; i++)
        {
            if(this._ybBtnArr[i])
            {
                this._ybBtnArr[i].dispose();
                this._ybBtnArr[i] = null;
            }
        }
        this._ybBtnArr = null;
        if(this._qiaojiEffect)
        {
            this._qiaojiEffect.dispose();
            this._qiaojiEffect = null;
        }
        this._isMove = false;
        if(this._clickHand)
        {
            egret.Tween.removeTweens(this._clickHand);
            this._clickHand = null;
        }        
        super.dispose();
    }
}