/**
  * 情定鹊桥 活动
  * @author shaoliang
  * date 2020/7/15
  * @class AcBirdBridgeView
  */

class AcBirdBridgeView extends AcCommonView 
{       
    private _countDownTime: BaseTextField = null;
	private _countDownTimeBg: BaseBitmap = null;
    private _detailBtn:BaseButton = null;
    private _playTimesText : BaseTextField = null;
    private _rewardNodeTab :BirdBridgeRewardNode[] = [];
    private _theBridge:BaseLoadBitmap = null;
    private _man:BaseBitmap = null;
    private _woman:BaseBitmap = null;
    private _achievemantLevel:number = -1;

    private _itembg:BaseBitmap = null;
    private _itemIcon:BaseDisplayObjectContainer = null;

    private _wishDescText : BaseTextField = null;
    private _wishNumText : BaseTextField = null;
    private _progressbar:ProgressBar = null;
    private _curWishId :number = 0;
    
    //底部信息
    private _itemNumText:BaseTextField = null;

    private _tenWishCheck:BaseBitmap = null;
    private _50WishCheck:BaseBitmap = null;
    private _50WishText:BaseTextField = null;
    private _checkTimes:number = 1; 
    private _btnTime:number = 1; 

    private _wishBtn:BaseButton = null;
    private _btnTimes:BaseTextField = null;
    private _btnText:BaseTextField = null;
    private _btnFreeText:BaseTextField = null;
    private _btnIcon:BaseBitmap = null;
    private _btnChooseText:BaseTextField = null;

    private _rewardBtn:BaseButton = null;

    private _lihuaNode:BaseDisplayObjectContainer = null;
    private _isShowLihua:boolean = false;

    private _isPlaying:boolean = false;

    public constructor() 
    {
        super();
    }
    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_AC_BIRDBRIDGEGETMODEL,requestData:{activeId:this.acTivityId}};
	}


    // 标题背景名称
	protected getTitleBgName():string
	{
		return App.CommonUtil.getResByCode(`birdbridge_title`,this.getUiCode());
	}

    protected getProbablyInfo(): string {
		return App.CommonUtil.getCnByCode(`acBirdbridgeProbablyInfo`, this.code);
    }

    protected  getUiCode():string
	{   
        if (this.code == "2")
        {
            return "1";
        }
        if (this.code == "4")
        {
            return "3";
        }
		return this.code;
	}

    protected getTitleStr():string
	{
		return null;
	}

    protected getBgName():string
	{	
        return  App.CommonUtil.getResByCode("birdbridge_bg",this.getUiCode());
	}

    protected getCloseBtnName():string
	{
		return "acchaoting_closebtn";
	}

    protected getRuleInfo():string{
        let code = this.getUiCode();
        let desckey = App.CommonUtil.getCnByCode(`acBirdBridgeRuleInfo`,code);
        if(Api.switchVoApi.checkServantRefuseBattle()&& LanguageManager.checkHasKey(desckey+`_withOpenRefusal`)){
            desckey += `_withOpenRefusal`;
        }

		return desckey;
    } 

    private get cfg() : Config.AcCfg.BirdBridgeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBirdBridgeVo{
        return <AcBirdBridgeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

    protected initBg():void
    {
        this.viewBg = BaseBitmap.create(this.getBgName());
		this.addChild(this.viewBg);
    }
     
    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `birdbridgecode1`,
            `birdbridgecode${code}`,  `birdbridge_bottombg-1`,
            "acwealthcarpview_skineffect","acgiftreturnview_common_skintxt","progress3", "progress3_bg",
        ]);
    }

     
    public initView() 
    { 
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_AC_BIRDBRIDGECHOOSEWISH, this.refreshWishInfo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH, this.resetWish, this);

        let code = this.getUiCode();
        let vo = this.vo;

        let key: string = this.acTivityId+ Api.playerVoApi.getPlayerID() + String(vo.st);
		let storage = LocalStorageManager.get(key);
		if (!storage) {

            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, {
				idx: "acBirdBridge_1-" + this.getUiCode(), f: () => {
				}, o: this
			});

			LocalStorageManager.set(key, vo.aidAndCode);
		}

        let acDescBg = BaseBitmap.create(App.CommonUtil.getResByCode(`birdbridge_descbg`,code));
		acDescBg.y = 91;
		this.addChildToContainer(acDescBg);

        //活动时间
		let timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewAcTime-1", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeTF.width = 540;
		timeTF.setPosition(20,acDescBg.y+22);
		this.addChildToContainer(timeTF);

        let desckey = App.CommonUtil.getCnByCode(`acBirdBridgeDesc`,code);
        if(Api.switchVoApi.checkServantRefuseBattle() && LanguageManager.checkHasKey(desckey+`_withOpenRefusal`)){
            desckey += `_withOpenRefusal`;
        }

		let descTF = ComponentManager.getTextField(LanguageManager.getlocal(desckey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		descTF.width = 600;
		descTF.lineSpacing = 5;
		descTF.setPosition(timeTF.x, timeTF.y + timeTF.height + 8);
		this.addChildToContainer(descTF);

        let onenode = new BaseDisplayObjectContainer();
        // onenode.y = acDescBg.height+acDescBg.y;
        this.addChildToContainer(onenode);
        this._lihuaNode = onenode;

        let rewardNode = new BaseDisplayObjectContainer();
        rewardNode.y = acDescBg.height+acDescBg.y;
        this.addChildToContainer(rewardNode);
       

		this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
		this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height / 2;
		this.addChildToContainer(this._countDownTimeBg);

		this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
		this.addChildToContainer(this._countDownTime);

        let detailBtn =  ComponentManager.getButton(App.CommonUtil.getResByCode(`birdbridge_detail`,code), null,this.detailBtnHandler,this,null,1);
        detailBtn.setPosition(5,10);
        rewardNode.addChild(detailBtn);
        this._detailBtn = detailBtn;
        if (this.vo.isShowDetailRedDot)
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let reddot = this._detailBtn.getChildByName("reddot");
            reddot.x = 77;
            reddot.y =  10;
        }

        let playstr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgeTimes",code),[String(this.vo.ainfo[0].v)]);
        let playtimeText = ComponentManager.getTextField(playstr, 20, TextFieldConst.COLOR_BLACK);
        playtimeText.width = 120;
        playtimeText.lineSpacing = 3;
        playtimeText.textAlign = egret.HorizontalAlign.CENTER;
        playtimeText.setPosition(detailBtn.width/2 - playtimeText.width/2-2,28);
        detailBtn.addChild(playtimeText);
        this._playTimesText = playtimeText;

         //成就奖励
        let scrollContiner = new BaseDisplayObjectContainer()
        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,530,120);

		let scrollView = ComponentManager.getScrollView(scrollContiner,rect);
		rewardNode.addChild(scrollView);
        scrollView.setPosition(GameConfig.stageWidth-rect.width,0);
        scrollView.verticalScrollPolicy = "off";
        let cfgs = this.cfg.achievementOne;
        for (let i=0; i<cfgs.length; i++)
        {
            let oneNode = new BirdBridgeRewardNode();
            oneNode.init(cfgs[i],code,this.rewardHandle,this);
            oneNode.setPosition(i*92+5,0);
            scrollContiner.addChild(oneNode);
            oneNode.setShowType(this.vo.getAchievementOneType(i+1));
            this._rewardNodeTab.push(oneNode);
        }
        scrollContiner.width+=10;
        scrollView.setScrollLeft(scrollContiner.width-rect.width);
        egret.Tween.get(scrollView).wait(1).call(()=>{
            scrollView.setScrollLeft(0, 1000);
        });

        //鹊桥
        this._theBridge = BaseLoadBitmap.create(App.CommonUtil.getResByCode("birdbridge_bridge2",code));
        this._theBridge.y = 345;
        this.addChildToContainer(this._theBridge);

        if (code != "1")
        {
            this._theBridge.visible = false;
        }

        this.resetBridge();

        //水池
        let pool = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_pool",code));
        pool.setPosition(GameConfig.stageWidth/2-pool.width/2,GameConfig.stageHeigth-360);
        this.addChildToContainer(pool);

        let progressbg = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_progressbg",code));
        progressbg.setPosition(GameConfig.stageWidth/2-progressbg.width/2,pool.y-progressbg.height);
        this.addChildToContainer(progressbg);

        let itembg = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_itembg",code));
        itembg.setPosition(GameConfig.stageWidth/2-itembg.width/2,progressbg.y-itembg.height);
        this.addChildToContainer(itembg);
        this._itembg = itembg;
        itembg.addTouchTap(()=>{

            if (this._isPlaying)
            {
                return;
            }
            if (this.vo.isCanGetCurWish())
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode('acBirdbridgeNeedReward',code)));
                return ;
            }

             ViewController.getInstance().openView(ViewConst.POPUP.BIRDBRIDGECHOOSEVIEW,{
                aid:this.aid, 
                code:this.code,
                uicode:this.getUiCode(),
            });
        },this);

        this._progressbar = ComponentManager.getProgressBar(App.CommonUtil.getResByCode("birdbridge_progress",code), App.CommonUtil.getResByCode("birdbridge_progress",code), 333);
        this._progressbar._progressBarBg.alpha = 0;
		this._progressbar.setPosition(163,progressbg.y+39);
		this.addChildToContainer(this._progressbar);

        let wishdesc = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WHITE);
		wishdesc.width = GameConfig.stageWidth;
		wishdesc.textAlign = egret.HorizontalAlign.CENTER;
		wishdesc.setPosition(10,progressbg.y+15);
		this.addChildToContainer(wishdesc);
        this._wishDescText =wishdesc;

        let wishnum = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WHITE);
		wishnum.width = GameConfig.stageWidth;
		wishnum.textAlign = egret.HorizontalAlign.CENTER;
		wishnum.setPosition(10,progressbg.y+55);
		this.addChildToContainer(wishnum);
        this._wishNumText =wishnum;
        
       
        if (code == "1")
        {
               //人物
            let servantBone = "servant_full2_1067";
            // Api.switchVoApi.checkCloseBone=function(){return true;}
            if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(servantBone+"_ske"))//+"_ske"
            {
                let servantDB = App.DragonBonesUtil.getLoadDragonBones(servantBone);
                servantDB.setPosition(0+ view.viewBg.x+100,  GameConfig.stageHeigth);
                servantDB.anchorOffsetY = servantDB.height;
                servantDB.anchorOffsetX = servantDB.width / 2;
                servantDB.scaleX = -0.88;
                servantDB.scaleY = 0.88;
                this.addChild(servantDB);
            }
            else
            {   
                let servantPic = BaseLoadBitmap.create("servant_full_1067");
                servantPic.scaleX = -0.83;
                servantPic.scaleY = 0.83;
                servantPic.setPosition(300, GameConfig.stageHeigth-420);
                this.addChild(servantPic);
            }

            let wifeBone = "wife_full_254";
            if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(wifeBone+"_ske"))//
            {
                let wifetDB = App.DragonBonesUtil.getLoadDragonBones(wifeBone);
                wifetDB.setPosition(158+ view.viewBg.x +410, GameConfig.stageHeigth);
                wifetDB.anchorOffsetY = wifetDB.height;
                wifetDB.anchorOffsetX = wifetDB.width;
                wifetDB.scaleX = -0.7;
                wifetDB.scaleY = 0.7;
                this.addChild(wifetDB);
            }
            else
            {   
                let rect:egret.Rectangle = egret.Rectangle.create();
                rect.setTo(0,0,640,840);
                let wifepic = BaseLoadBitmap.create("wife_full_254",rect);
                wifepic.scaleX = -0.5;
                wifepic.scaleY = 0.5;
                wifepic.setPosition(GameConfig.stageWidth, GameConfig.stageHeigth-420);
                this.addChild(wifepic);
            }
        }
        
            let bottombg = BaseBitmap.create(App.CommonUtil.getResByCode(`birdbridge_bottombg`,code));
            bottombg.y = GameConfig.stageHeigth - bottombg.height;
            this.addChild(bottombg);

        if (code == "1")
        {
            //预览
            let topBg = {x:17,y:GameConfig.stageHeigth - 312};
            for (let i=1; i<=2; i++)
            {   
                if (i==2)
                {
                    topBg = {x:430,y:GameConfig.stageHeigth - 312};
                }
                let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                // this._effect.setScale(2);
                let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(topBg.x + 103 - skinTxtEffectBM.width / 2, topBg.y + 160 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);

                let skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(topBg.x + 103, topBg.y + 160);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


                let skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(topBg.x + 103, topBg.y + 160);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
                
                //透明点击区域
                let touchPos = BaseBitmap.create("public_alphabg");
                touchPos.width = 180;
                touchPos.height = 176;
                touchPos.setPosition(topBg.x, topBg.y);
                view.addChild(touchPos);
                touchPos.addTouchTap(() => {
                    //if (i == 1)
                    let servantcfg = this.cfg.wish[0];
                    let wifecfg = this.cfg.wish[1];
                    
                    let wifeTopMsg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgeWifeTopMsg",code), [""+wifecfg.needTime]);
                    let servantTopMsg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgeServantTopMsg",code), [""+servantcfg.needTime]);
                    // let wifeOtherTip = LanguageManager.getlocal("acRechargeBoxSpPreviewWifeTip-"+this.code);
                    let wifId = Config.WifeCfg.formatRewardItemVoStr(wifecfg.getReward);
                    let itemvo = GameData.formatRewardItem(servantcfg.getReward)[0];
                    let itemcfg= Config.ItemCfg.getItemCfgById(itemvo.id);
                    let servantvo = GameData.formatRewardItem(itemcfg.getRewards)[0];
                    let servantId = Config.ServantCfg.formatRewardItemVoStr(servantvo.id);
                    
                    let showTypee = i==1 ?servantId :wifId; 
        
                    let data = {data:[
                        {idType: servantId, topMsg:servantTopMsg, bgName:"", scale: 0.73, offY: 13},
                        {idType: wifId, topMsg:wifeTopMsg, bgName:"", scale: 0.62, offY: 13},
                    ], showType:showTypee};
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
                    
                }, ViewController);
            }

        }
     
        let numbg = BaseBitmap.create("public_numbg");
        numbg.width = 140;
        numbg.height = 24;
        numbg.setPosition(GameConfig.stageWidth/2 - numbg.width/2, GameConfig.stageHeigth-142);
        this.addChild(numbg);

        let wishIcon1 = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_itemicon",code));
        wishIcon1.setScale(0.4);
        wishIcon1.setPosition(numbg.x+20, numbg.y+numbg.height/2-wishIcon1.height*wishIcon1.scaleX/2);
        this.addChild(wishIcon1);

        let itemNumText = ComponentManager.getTextField( " X"+this.vo.getItemNum(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		itemNumText.setPosition(wishIcon1.x+wishIcon1.width*wishIcon1.scaleX, numbg.y+numbg.height/2-itemNumText.height/2);
		this.addChild(itemNumText);
        this._itemNumText = itemNumText;


        let checkIcon = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_selected1",code));
        checkIcon.x = 90;
        checkIcon.y = GameConfig.stageHeigth-90;
        this.addChild(checkIcon);
        checkIcon.addTouchTap(this.tenChooseHandle,this);
        this._tenWishCheck = checkIcon;

        let tenText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgePlay1",code),["10"]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		tenText.setPosition(checkIcon.x+checkIcon.width,checkIcon.y+checkIcon.height/2-tenText.height/2);
		this.addChild(tenText);

        let checkIcon2 = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_selected1",code));
        checkIcon2.x = 440;
        checkIcon2.y = checkIcon.y;
        this.addChild(checkIcon2);
        checkIcon2.addTouchTap(this.choose50Handle,this);
        this._50WishCheck = checkIcon2;

        let _50Text = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgePlay1",code),["50"]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		_50Text.setPosition(checkIcon2.x+checkIcon2.width,checkIcon2.y+checkIcon2.height/2-_50Text.height/2);
		this.addChild(_50Text);
        this._50WishText = _50Text;

        this._50WishCheck.visible = false;
        this._50WishText.visible = false;

       if (this.vo.ainfo[0].v >= 50)
       {
            this._50WishCheck.visible = true;
            this._50WishText.visible = true;
       }
        // let btnBitmap = BaseBitmap.create("birdbridge_btn-"+code);
        // btnBitmap.setPosition(GameConfig.stageWidth/2 - btnBitmap.width/2, GameConfig.stageHeigth-btnBitmap.height);
		// this.addChild(btnBitmap);

        let wishBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("birdbridge_btn",code),null,this.wishHandle,this,null,3);
        // wishBtn.width = 200;
        // wishBtn.height = 80;
        wishBtn.setPosition(GameConfig.stageWidth/2 - wishBtn.width/2, GameConfig.stageHeigth-wishBtn.height);
		this.addChild(wishBtn);
        this._wishBtn = wishBtn;

        //  //透明点击区域
        // let touchPos2 = BaseBitmap.create("public_alphabg");
        // touchPos2.width = wishBtn.width;
        // touchPos2.height = wishBtn.height;
        // wishBtn.addChild(touchPos2);

        let wishIcon = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_itemicon",code));
        wishIcon.setScale(0.4);
        wishIcon.setPosition(wishBtn.width/2-wishIcon.width*wishIcon.scaleX,21);
        wishBtn.addChild(wishIcon);
        this._btnIcon = wishIcon;

        let wishtime = ComponentManager.getTextField(" X"+this._checkTimes, 18, TextFieldConst.COLOR_BLACK);
		wishtime.setPosition(wishIcon.x+wishIcon.width*wishIcon.scaleX,wishIcon.y+wishIcon.height/2*wishIcon.scaleY-wishtime.height/2);
		wishBtn.addChild(wishtime);
        this._btnTimes = wishtime;

       
        let wishText = ComponentManager.getTextField(" ", 24, TextFieldConst.COLOR_BLACK);
        wishText.width = wishBtn.width;
        wishText.textAlign = egret.HorizontalAlign.CENTER;
		wishText.setPosition(0,wishIcon.y+wishIcon.height*wishIcon.scaleY-2);
		wishBtn.addChild(wishText);
        this._btnText = wishText;

        let chooseText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgeChooseRewards",code)), 22, TextFieldConst.COLOR_BLACK);
        chooseText.width = wishBtn.width;
        chooseText.textAlign = egret.HorizontalAlign.CENTER;
		chooseText.setPosition(0,44);
		wishBtn.addChild(chooseText);
        this._btnChooseText = chooseText;

        let freeText = ComponentManager.getTextField(LanguageManager.getlocal("sysFreeDesc"), 26, TextFieldConst.COLOR_BLACK);
        freeText.width = wishBtn.width;
        freeText.textAlign = egret.HorizontalAlign.CENTER;
		freeText.setPosition(0,42);
		wishBtn.addChild(freeText);
        this._btnFreeText = freeText;



        let rewardBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("birdbridge_btn",code),null,this.rewardBtnHandle,this,null,3);
        // rewardBtn.width = 200;
        // rewardBtn.height = 80;
        rewardBtn.setPosition(GameConfig.stageWidth/2 - rewardBtn.width/2, GameConfig.stageHeigth-rewardBtn.height);
		this.addChild(rewardBtn);
        this._rewardBtn = rewardBtn;

        // //透明点击区域
        // let touchPos1 = BaseBitmap.create("public_alphabg");
        // touchPos1.width = rewardBtn.width;
        // touchPos1.height = rewardBtn.height;
        // rewardBtn.addChild(touchPos1);


        let reardText = ComponentManager.getTextField(LanguageManager.getlocal("DragonBoatDayLq"), 24, TextFieldConst.COLOR_BLACK);
        reardText.width = rewardBtn.width;
        reardText.textAlign = egret.HorizontalAlign.CENTER;
		reardText.setPosition(0,42);
		rewardBtn.addChild(reardText);

        this.checkBottomBtn();
        // this.checkShowChoose();
        this.resetBtnInfo();
        this.refreshWishInfo();
        this.checkShowLihua();
    }

    private checkBottomBtn():void
    {
        if (this.vo.isCanGetCurWish())
        {
            this._wishBtn.visible = false;
            this._rewardBtn.visible = true;
        }
        else
        {
            this._wishBtn.visible = true;
            this._rewardBtn.visible = false;
        }
    }

    // private checkShowChoose():void
    // {
    //     if ((this.vo.winfo.idx == 0 || this.vo.isWishMaxById(this.vo.winfo.idx)) && this.vo.isWishMax()==false )
    //     {
    //         ViewController.getInstance().openView(ViewConst.POPUP.BIRDBRIDGECHOOSEVIEW,{
    //             aid:this.aid, 
    //             code:this.code,
    //             uicode:this.getUiCode(),
    //         });
    //     }
    // }

    private isShowChoose():boolean
    {
        if ((this.vo.winfo.idx == 0 || this.vo.isWishMaxById(this.vo.winfo.idx)) && this.vo.isWishMax()==false )
        {
            return true;
        }
        return false;
    }

    private wishHandle():void
    {   
        if (this.isShowChoose())
        {
             ViewController.getInstance().openView(ViewConst.POPUP.BIRDBRIDGECHOOSEVIEW,{
                aid:this.aid, 
                code:this.code,
                uicode:this.getUiCode(),
            });
            return;
        }

        if(!this.vo.isInActivity())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }

       

        if (this._checkTimes == 1 && this.vo.isFree())
        {   
             if (this._isPlaying)
            {
                return;
            }
            this._isPlaying = true;
            this.request(NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH,{activeId:this.acTivityId,isFree:1,playNum:1});
            return;
        }

        if(this.vo.getItemNum()<=0)
        {
            let message: string = LanguageManager.getlocal(App.CommonUtil.getCnByCode('acBirdBridgeNoItem',this.getUiCode()));
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : message,
                title : "itemUseConstPopupViewTitle",
                touchMaskClose : true,
                callback : ()=>
                {
                    
                    ViewController.getInstance().openView(ViewConst.POPUP.ACBIRDBRIDGEPOPVIEW,{
                            aid:this.aid, 
                            code:this.code,
                            uicode:this.getUiCode(),
                        });
                },
                handler : this,
                needClose : 1,
                needCancel : true
            });
            return;
        }

        this.request(NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH,{activeId:this.acTivityId,isFree:0,playNum:this._btnTime});
    }

    private rewardBtnHandle():void
    {   
        if (this.vo.isWishMaxById(this.vo.winfo.idx) && this.vo.isWishMax()==true)
        {   
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode('acBirdBridgeRewadMax',this.getUiCode())));
            return;
        }

        if (this.vo.isStart)
        {   
            if (this._isPlaying)
            {
                return;
            }
            this._isPlaying = true;
             this.request(NetRequestConst.REQUEST_AC_BIRDBRIDGEGETWISH,{activeId:this.acTivityId,rkey:String(this.vo.winfo.idx)});
        }
        else
        {   
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            this.hide()
        }
    }

    private tenChooseHandle():void
    {   
        let code = this.getUiCode();
        if (this._checkTimes == 10)
        {
            this._checkTimes = 1;
            this._tenWishCheck.texture = ResourceManager.getRes(App.CommonUtil.getResByCode("birdbridge_selected1",code));
        }
        else
        {
            this._checkTimes = 10;
            this._tenWishCheck.texture = ResourceManager.getRes(App.CommonUtil.getResByCode("birdbridge_selected2",code));
        }
        this._50WishCheck.texture = ResourceManager.getRes(App.CommonUtil.getResByCode("birdbridge_selected1",code));
        this.resetBtnInfo();
    }

    private choose50Handle():void
    {   
        let code = this.getUiCode();
        if (this._checkTimes == 50)
        {
            this._checkTimes = 1;
            this._50WishCheck.texture = ResourceManager.getRes(App.CommonUtil.getResByCode("birdbridge_selected1",code));
        }
        else
        {
            this._checkTimes = 50;
            this._50WishCheck.texture = ResourceManager.getRes(App.CommonUtil.getResByCode("birdbridge_selected2",code));
        }
        this._tenWishCheck.texture = ResourceManager.getRes(App.CommonUtil.getResByCode("birdbridge_selected1",code));
        this.resetBtnInfo();
    }



    private resetBtnInfo():void
    {
        let btnstr = "";
        let code = this.getUiCode();


      

        if (this.vo.getItemNum() == 0)
        {
            this._btnTime = this._checkTimes;
        }
        else
        {
            this._btnTime = Math.min(this._checkTimes,this.vo.getCurCanWishMaxNum());
        }

        if (this.isShowChoose())
        {   
            this._btnChooseText.visible = true;
            this._btnFreeText.visible = false;
            this._btnIcon.visible = false;
            this._btnTimes.visible = false;
            this._btnText.visible = false;
        }
        else if (this._checkTimes == 1 && this.vo.isFree())
        {   
            this._btnChooseText.visible = false;
            this._btnFreeText.visible = true;
            this._btnIcon.visible = false;
            this._btnTimes.visible = false;
            this._btnText.visible = false;
        }
        else
        {   
            this._btnChooseText.visible = false;
            this._btnFreeText.visible = false;
            this._btnIcon.visible = true;
            this._btnTimes.visible = true;
            this._btnText.visible = true;
        }
        if (this._btnTime==0)
        {
            this._btnTime =1;
        }
        
        this._btnText.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgePlay1",code),[String(this._btnTime)]);;
        this._btnTimes.text = " X"+this._btnTime;
    }


    private manPos = {
        "man":[[0,37],[43,28],[87,15],[125,0],[164,-13]],
        "woman":[[540,37],[488,24],[438,0],[389,-4],[349,-13]],
    }

    private resetBridge():void
    {   
        if (this.getUiCode() == "3")
        {
            return;
        }

        let lv = this.vo.getAchievementAllLevel();
        if (lv == this._achievemantLevel)
        {
            return;
        }
        this._achievemantLevel = lv;
        let code = this.getUiCode();
        if (lv >= this.cfg.achievementAll.length)
        {
            this._theBridge.setload("birdbridge_bridge2-"+code);
            if (this._man)
            {
                this._man.dispose();
                this._man = null;
            }
            if (this._woman)
            {
                this._woman.dispose();
                this._woman = null;
            }

        }
        else
        {
            this._theBridge.setload("birdbridge_bridge1-"+code);
            if (!this._man)
            {
                this._man = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_man",code));
                this.addChildToContainer(this._man);
                 
            }
            if (!this._woman)
            {
                this._woman=BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_woman",code));
                this.addChildToContainer(this._woman);
                
            }

            let  manpos:any = this.manPos["man"][lv];
            let  womanpos:any = this.manPos["woman"][lv];
            this._man.setPosition(manpos[0],manpos[1]+this._theBridge.y);
            this._woman.setPosition(womanpos[0],womanpos[1]+this._theBridge.y);
            egret.Tween.get(this._man,{loop:true}).to({y:this._man.y - 5},1000).wait(100).to({y:this._man.y},1000).wait(100);
            egret.Tween.get(this._woman,{loop:true}).to({y:this._woman.y - 5},1000).wait(100).to({y:this._woman.y},1000).wait(100);

        }



    }

    private detailBtnHandler():void{
        if (this._isPlaying)
            {
                return;
            }
		 ViewController.getInstance().openView(ViewConst.POPUP.ACBIRDBRIDGEPOPVIEW,{
                aid:this.aid, 
                code:this.code,
                uicode:this.getUiCode(),
            });
	}

    private rewardHandle(id : number):void
    {   
        if (this._isPlaying)
            {
                return;
            }
        ViewController.getInstance().openView(ViewConst.POPUP.ACBIRDBRIDGEPOPVIEWTAB2,{
                aid:this.aid, 
                code:this.code,
                uicode:this.getUiCode(),
                id:id,
            });
        
    }

    private tick() {
		let cfg = this.cfg;
		let vo = this.vo;

        
		// if (vo.checkIsInEndShowTime()) {
		// 	this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
		// }
		// else {
			this._countDownTime.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
		// }
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);

	}

    private freshView():void
    {   
        this._playTimesText.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgeTimes",this.getUiCode()),[String(this.vo.ainfo[0].v)]);

        if (this.vo.isShowDetailRedDot)
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let reddot = this._detailBtn.getChildByName("reddot");
            reddot.x = 77;
            reddot.y =  10;
        }
        else
        {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        this.resetBridge();

        for (let i=0; i<this._rewardNodeTab.length; i++)
        {
            let oneNode = this._rewardNodeTab[i];
            oneNode.setShowType(this.vo.getAchievementOneType(i+1));
        }
        this._itemNumText.text = " X"+this.vo.getItemNum();
        this.checkShowLihua();
        this.resetBtnInfo();
    }

    private resetWish():void
    {
        if (this.vo.ainfo[0].v >= 50)
        {
           this._50WishCheck.visible = true;
            this._50WishText.visible = true;
        }
    }

    //许愿信息刷新
    private refreshWishInfo():void
    {   
        if (this.isShowChoose())
        {
            this._curWishId = 0;
            if (this._itemIcon)
            {
                this._itemIcon.dispose();
                this._itemIcon = null;
            }
            this._itemIcon = new BaseDisplayObjectContainer();
            this.addChildToContainer( this._itemIcon);
            let choose = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_choose1",this.getUiCode()));
            this._itemIcon.addChild(choose);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,this._itemIcon,this._itembg);

            egret.Tween.get(choose,{loop:true}).to({alpha:0.5},800).to({alpha:1},800);

              this._wishDescText.visible = false;
           this._wishNumText.visible = false;
           this._progressbar.setPercentage(0);
            return;
        }

        if (this.vo.winfo.idx != this._curWishId)
        {
            this._curWishId = this.vo.winfo.idx;
            if (this._itemIcon)
            {
                this._itemIcon.dispose();
                this._itemIcon = null;
            }
           
            
            if (this._curWishId !=0)
            {
                let wiscfg = this.cfg.getWishCfg(this._curWishId);
                this._itemIcon = GameData.getRewardItemIcons(wiscfg.getReward)[0];
                this.addChildToContainer( this._itemIcon);
                 this._itemIcon.setScale(0.85);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,this._itemIcon,this._itembg);
            }

        }

        
       if (this._curWishId ==0)
       {
           this._wishDescText.visible = false;
           this._wishNumText.visible = false;
           this._progressbar.setPercentage(0);
       }
       else
       {
           this._wishDescText.visible = true;
           this._wishNumText.visible = true;
           let wiscfg = this.cfg.getWishCfg(this._curWishId);
           let v1 = this.vo.getWishValueById(this._curWishId);
           let v2 = wiscfg.needTime;
           this._wishDescText.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdBridgeGetRewards",this.getUiCode()),[String(wiscfg.needTime)]);
           this._wishNumText.text = LanguageManager.getlocal("AcMazeViewTaskPlan",[String(v1),String(v2)]);
           this._progressbar.setPercentage(v1/v2);
       }

       if (this.vo.isWishMax())
       {
           if (this._itemIcon)
            {
                this._itemIcon.dispose();
                this._itemIcon = null;
            }

            this._wishDescText.visible = true;
           this._wishNumText.visible = false;
           this._wishDescText.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBirdbridgeRewardMax",this.getUiCode()));
           this._wishBtn.setEnable(false);
           this._progressbar.setPercentage(0);
       }

    }

    protected receiveData(data:{ret:boolean,data:any}):void{
        let view = this
        if(data.ret){
            // 领取许愿奖励
             this._isPlaying = false;
            if (data.data.cmd == NetRequestConst.REQUEST_AC_BIRDBRIDGEGETWISH)
            {   
                let rData = data.data.data;
                let rewards = rData.rewards;
                let replacerewards = rData.replacerewards;
                let rewardsVo = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rewardsVo);
                if (replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: replacerewards });
                }
                this.checkBottomBtn();
                this.resetBtnInfo();
                this.refreshWishInfo();
                // this.checkShowChoose();
            }
            else if (data.data.cmd == NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH)
            {   
                let rData = data.data.data;
                let rewards = rData.rewards;
                let replacerewards = rData.replacerewards;
                // let rewardsVo = GameData.formatRewardItem(rewards);
                //App.CommonUtil.playRewardFlyAction(rewardsVo);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,isSameAdd:true,"isPlayAni":true, "callback":()=>{
                    if (replacerewards) {
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: replacerewards });
                    }
                }, "handler":this});
               

                this.checkBottomBtn();
                this.resetBtnInfo();
                this.refreshWishInfo();
                // this.checkShowChoose();
            }
        }
        else
        {
             this._isPlaying = false;
        }
    }

    private checkShowLihua():void
    {
        if (this._isShowLihua == false  && this.vo.getAchievementAllLevel()>=this.cfg.achievementAll.length)//
        {   
            this._isShowLihua = true;
            this.showLihua();
        }
    }

   private lihuaCfg = {
    1 : {color : `purple`, framenum : 12, firenum : 10, width : 450, height : 450, x: -40, y: 177, scale: 0.5},
    2 : {color : `blue`, framenum : 11, firenum : 10, width : 450, height : 450, x: 156, y: 125, scale: 0.5},
    3 : {color : `green`, framenum : 11, firenum : 10, width : 400, height : 400, x: 56, y: 244, scale: 0.6},
    4 : {color : `red`, framenum : 10, firenum : 10, width : 500, height : 500, x: 223, y: 128, scale: 0.8},
    5 : {color : `purple`, framenum : 12, firenum : 10, width : 450, height : 450, x: 291, y: 125, scale: 1},
    6 : {color : `green`, framenum : 11, firenum : 10, width : 400, height : 400, x: 435, y: 302, scale: 0.5},
    7 : {color : `blue`, framenum : 11, firenum : 10, width : 450, height : 450, x: -178, y: 282, scale: 0.7},
    8 : {color : `red`, framenum : 10, firenum : 10, width : 500, height : 500, x: 35, y: 374, scale: 0.5},
    9 : {color : `purple`, framenum : 12, firenum : 10, width : 450, height : 450, x: 314, y: 207, scale: 0.5},
    10 : {color : `blue`, framenum : 11, firenum : 10, width : 450, height : 450, x: 338, y: 419, scale: 0.4},
    11 : {color : `green`, framenum : 11, firenum : 10, width : 400, height : 400, x: 513, y: 177, scale: 0.5},
    }
    private _idx = 1;

    private showLihua():void{
        
		let view = this;

        let cfg = this.lihuaCfg[this._idx];
			let fireeff = ComponentManager.getCustomMovieClip(`newyearlihua${cfg.color}fire`, cfg.firenum, 70);
			fireeff.width = 150;
			fireeff.height = 500;
			fireeff.playWithTime(1);
			this._lihuaNode.addChildAt(fireeff, 1);
		
			fireeff.setEndCallBack(()=>{
				fireeff.dispose();
				fireeff = null;
			}, view);

			let lihua = ComponentManager.getCustomMovieClip(`newyearlihua${cfg.color}`, cfg.framenum, 70);
			lihua.width = cfg.width;
			lihua.height = cfg.height;
			this._lihuaNode.addChildAt(lihua, 1);
			
			lihua.setEndCallBack(()=>{
				lihua.dispose();
				lihua = null;
				
			}, view);

			lihua.setPosition(cfg.x, cfg.y);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fireeff, lihua, [0,200]);

			egret.Tween.get(lihua).wait((cfg.firenum - 3) * 70).call(()=>{
				lihua.playWithTime(1);
				++ this._idx;
				if(this._idx == 10){
					this._idx = 1;
				}
				view.showLihua();
				egret.Tween.removeTweens(lihua);
			}, view);   
	}

    public dispose():void 
	{   
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_AC_BIRDBRIDGECHOOSEWISH, this.refreshWishInfo, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH, this.resetWish, this);

        this._btnChooseText = null;
        this._countDownTime = null;
		this._countDownTimeBg = null;
        this._detailBtn = null;
        this._playTimesText = null;
        this._theBridge = null;
        this._achievemantLevel = -1;
        this._itembg = null;
        this._itemIcon = null;
        this._wishDescText = null;
        this._wishNumText = null;
        this._progressbar = null;
        this._curWishId = 0;
        this._itemNumText = null;
        this._tenWishCheck = null;
        this._50WishText = null;
        this._50WishCheck = null;
        this._checkTimes = 1;
        this._wishBtn = null;
        this._btnTimes = null;
        this._btnText = null;
        this._rewardBtn = null;
        this._btnTime = 1;
        this._btnIcon = null;
        this._btnFreeText = null;
        this._lihuaNode = null;
        this._isShowLihua = false;
        this._rewardNodeTab.length = 0;
        this._man = null;
        this._woman = null;
        this._isPlaying = false;

		super.dispose();
	}
}