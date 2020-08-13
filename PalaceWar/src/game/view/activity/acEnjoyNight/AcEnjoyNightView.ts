/*
    author : shaoliang  
    desc : 京城夜赏
    date : 2019.6.5
*/

class AcEnjoyNightView extends AcCommonView
{   
    private _cdText : BaseTextField = null;
    private _bgGroup : BaseDisplayObjectContainer = null;
    private _noticescrollView : ScrollView = null;

    private _oneBtn: BaseButton = null;
	private _oneBtnBM: BaseBitmap = null;
	private _oneBtnLeftTF: BaseTextField = null;
	private _oneBtnRightTF: BaseTextField = null;
    private _tenBtn: BaseButton = null;
	private _tenBtnRightTF: BaseTextField = null;

    private _oneBtnFree: BaseTextField = null;

    private _depth: number = 0;
    /**进度条 */
	private _progressBar: ProgressBar = null;
	private _progressBM: BaseBitmap = null;
	private _progressLight: BaseBitmap = null;
    private _startPercent:number = 0;
    private _progressTF: BaseTextField = null;
    private _numTF: BaseTextField = null;
    private _boxBM: BaseBitmap = null;
	private _boxLightBM: BaseBitmap = null;
    //成就红点
    private _redDot: BaseBitmap = null;
    //奖励红点
    private _awardRedDot: BaseBitmap = null;

    private _countDownTime: BaseTextField = null;
	private _countDownTimeBg: BaseBitmap = null;
    private _boxInfoList: { boxBM: BaseBitmap, isPlayAni: boolean, percent: number, itemCfg: Config.AcCfg.EnjoyNightAchievementCfg }[] = [];

    private _speakStr: string = null;
	private _speakTF: BaseTextField = null;
	private _speakTail: BaseBitmap = null;
	private _speakBg: BaseBitmap = null;
	private _messageLength: number = 0;
    private _timesText:BaseTextField = null;
    private _chargeBtn: BaseButton = null;
		
	private _carGroup : BaseDisplayObjectContainer = null;
    private _car : BaseBitmap = null;
    private _carTip : BaseBitmap = null;
    private _stopPlay : boolean = false;
    private _stopClick : boolean = null;
    // private _checkBox : CheckBox = null;
    private _oneKeySearchStatus : boolean = false;

    private _bglv:number = 0;

    private _isPlay: boolean = false;
    private _skinPreviewBtn:BaseButton = null;


    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.EnjoyNightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    private get vo() : AcEnjoyNightVo{
        return <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get uicode():string
    {
        if (this.code == "2")
        {
            return "1";
        }
        return this.code;
    }

    protected getTitleStr():string
	{
		return null;
	}

    // 标题背景名称
	protected getTitleBgName():string
	{
		return null;
	}
    


    protected getRuleInfo() : string{
        return `acEnjoyNightRule-` + this.uicode;
    }

    protected getResourceList():string[]{
        let ret = super.getResourceList();
        let code = this.uicode;
        ret = ret.concat([
           `enjoynight_title-${this.uicode}`,`acworshipview_common_acbg`,"enjoynight_itembg-"+code,
           `acenjoynight${this.uicode}`,"progress12", "progress12_bg", `acenjoynight_bottombg`,
           "acworshipview_slider", "acwealthcomingview_progresslight", "acwealthcomingview_numbg", "acworshipview_box1", "acworshipview_box2",
           "acworshipview_box3", "acworshipview_word", "acwealthcomingview_box_light",
		   
           `enjoynightcarbg-`+code, `enjoynightcar1-`,`treasuregquan-1`,`treasuregquan1-`,
           `treasurecarmove1-`,`treasurecarscale-1`,
        ]);
		return ret;
	}

    public initView()
    {
        let view = this; 
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTROLL),view.playBoxCallback,view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTACHIEVEMENT, this.resetbg, this);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let code = view.uicode;


       	let titleBg = BaseBitmap.create(`enjoynight_title-${this.uicode}`);
		titleBg.width = 640;
		titleBg.height = 92;
		titleBg.setPosition(0, 0);

		let acDescBg = BaseBitmap.create("acworshipview_common_acbg")
		acDescBg.width = 640;
		acDescBg.height = 130;
		acDescBg.setPosition(titleBg.x, titleBg.y + titleBg.height - 7);

		this.addChildToContainer(acDescBg);
		this.addChildToContainer(titleBg);

        let skinPreviewBtn = ComponentManager.getButton(`enjoynightscene-${code}`, null, ()=>{
            if(this._stopClick){
                return;
            }
            if (this._isPlay) {
				return;
			}
            ViewController.getInstance().openView(ViewConst.POPUP.ACENJOYNIGHTEXCHANGEVIEW,{
                code : view.code,
                uicode : view.uicode,
                aid : view.aid
            })

            //test code
            //  ViewController.getInstance().openView(ViewConst.BASE.ACENJOYNIGHTAVGVIEW,{
            //     aid : view.aid,
            //     code : view.code,
            //     uicode : view.uicode,
            //     mapId : "4",
            //     key : view.vo.getMapTimes(),
                
            // });
            // view.showAvg();
            // ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTGAMEVIEW,{});
            // ViewController.getInstance().openView(ViewConst.POPUP.ACENJOYNIGHTTENPOPUPVIEW,{
            //     code : view.code,
            //     aid : view.aid
            // });
            // ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTGAMEVIEW,{
			// 		aid : this.param.data.aid,
			// 		code : this.param.data.code,
			// 		mapId: "4",
					
			// 	});

        }, this);
		skinPreviewBtn.setPosition(acDescBg.x + 8, acDescBg.y + acDescBg.height / 2 - skinPreviewBtn.height / 2);
		this.addChildToContainer(skinPreviewBtn);
        this._skinPreviewBtn = skinPreviewBtn;

        let vo = this.vo;

        //活动时间
		let timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewAcTime-" + code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeTF.width = 540;
		timeTF.setPosition(skinPreviewBtn.x + skinPreviewBtn.width + 6, acDescBg.y + 15);
		this.addChildToContainer(timeTF);


		let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightDesc-" + code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		descTF.width = 540;
		descTF.lineSpacing = 5;
		descTF.setPosition(timeTF.x, timeTF.y + timeTF.height + 10);
		this.addChildToContainer(descTF)

		this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
		this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height / 2;
		this.addChildToContainer(this._countDownTimeBg);

		this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewCountDownTime-" + code, [vo.acCountDownNoExtra]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
		this.addChildToContainer(this._countDownTime);

        

        let buttombg = BaseBitmap.create(`acenjoynight_bottombg`);
        buttombg.setPosition(0, GameConfig.stageHeigth - buttombg.height);
		view.addChild(buttombg);

        this._oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acEnjoyNightOneBtn-" + code, this.oneBtnClick, this)
		this._oneBtn.setPosition(85, buttombg.y + buttombg.height - this._oneBtn.height - 22);
		this.addChild(this._oneBtn);


		//消耗品
		this._oneBtnBM = BaseBitmap.create("enjoynight_item-" + code);
		this._oneBtnBM.setPosition(this._oneBtn.x + this._oneBtn.width / 2 - this._oneBtnBM.width / 2, this._oneBtn.y - this._oneBtnBM.height - 2 -10);
		this.addChild(this._oneBtnBM);

		//按钮上部左边文字
		this._oneBtnLeftTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowViewBtnLeft-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._oneBtnLeftTF.setPosition(this._oneBtnBM.x - this._oneBtnLeftTF.width - 5, this._oneBtnBM.y + this._oneBtnBM.height / 2 - this._oneBtnLeftTF.height / 2);
		this.addChild(this._oneBtnLeftTF);


		//按钮上部右边文字
		this._oneBtnRightTF = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._oneBtnRightTF.setPosition(this._oneBtnBM.x + this._oneBtnBM.width+5, this._oneBtnBM.y + this._oneBtnBM.height / 2 - this._oneBtnRightTF.height / 2);
		this.addChild(this._oneBtnRightTF);

        this._oneBtnFree = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingViewFree" ), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._oneBtnFree.setPosition(this._oneBtn.x + this._oneBtn.width / 2 - this._oneBtnFree.width / 2, this._oneBtnRightTF.y );
		this.addChild(this._oneBtnFree);


		this._tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acEnjoyNightTenBtn-" + code, this.tenBtnClick, this)
		this._tenBtn.setPosition(GameConfig.stageWidth - this._tenBtn.width - 85, buttombg.y + buttombg.height - this._tenBtn.height - 22);
		this.addChild(this._tenBtn);


		//消耗品
		let tenBtnBM = BaseBitmap.create("enjoynight_item-" + code);
		tenBtnBM.setPosition(this._tenBtn.x + this._tenBtn.width / 2 - tenBtnBM.width / 2, this._oneBtnBM.y);
		this.addChild(tenBtnBM);

		//按钮上部左边文字
		let tenBtnLeftTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowViewBtnLeft-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		tenBtnLeftTF.setPosition(tenBtnBM.x - tenBtnLeftTF.width-5, tenBtnBM.y + tenBtnBM.height / 2 - tenBtnLeftTF.height / 2);
		this.addChild(tenBtnLeftTF);

		//按钮上部右边文字
		this._tenBtnRightTF = ComponentManager.getTextField("X10", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._tenBtnRightTF.setPosition(tenBtnBM.x + tenBtnBM.width+5, tenBtnBM.y + tenBtnBM.height / 2 - this._tenBtnRightTF.height / 2);
		this.addChild(this._tenBtnRightTF);

        //进度条
        let progressbg = BaseLoadBitmap.create("luckdrawprogressbg-1");
		progressbg.width = 640;
		progressbg.height = 107;
		progressbg.setPosition(0, buttombg.y - progressbg.height);
		this.addChildToContainer(progressbg);

        this._startPercent = this.vo.getAchievementVallue() / this.cfg.getMaxAchievementValue();

		this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 435);
		this._progressBar.setPosition(progressbg.x + progressbg.width / 2 - this._progressBar.width / 2 - 10, progressbg.y + progressbg.height / 2 - this._progressBar.height / 2);
		this.addChildToContainer(this._progressBar);
		this._progressBar.setPercentage(this._startPercent);

		let progressNumber = this.cfg.getMaxAchievementValue();
		this._progressTF = ComponentManager.getTextField(this.vo.getAchievementVallue() + "/" + progressNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 12);
		this.addChildToContainer(this._progressTF);

		this._progressBM = BaseBitmap.create("acworshipview_slider");
		this._progressBM.anchorOffsetX = this._progressBM.width / 2;
		this._progressBM.anchorOffsetY = this._progressBM.height;
		let posWidthValue: number = this._startPercent >= 1 ? 1 : this._startPercent;
		this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
		this.addChildToContainer(this._progressBM);



		this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
		this._progressLight.anchorOffsetX = this._progressLight.width;
		this._progressLight.anchorOffsetY = this._progressLight.height / 2;
		this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y + this._progressBar.height / 2);
		this.addChildToContainer(this._progressLight);
		this._progressLight.setVisible(false);

		//次数this._bg
		let numbg = BaseBitmap.create("acwealthcomingview_numbg");
		numbg.setPosition(this._progressBar.x + 12 - numbg.width, this._progressBar.y + this._progressBar.height / 2 - numbg.height / 2);
		this.addChildToContainer(numbg);


		//数量TF
		let numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightNumDesc-" + code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
		numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 28);
		this.addChildToContainer(numDescTF);

		//数量TF
		this._numTF = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
		this._numTF.width = 60;
		this._numTF.textAlign = egret.HorizontalAlign.CENTER;
		this._numTF.setPosition(numDescTF.x + numDescTF.width / 2 - this._numTF.width / 2, numDescTF.y + numDescTF.height + 2);
		this.addChildToContainer(this._numTF);

		//奖励宝箱
		this._boxBM = BaseBitmap.create("acwealthcomingview_box_1");
		this._boxBM.anchorOffsetX = this._boxBM.width / 2;
		this._boxBM.anchorOffsetY = this._boxBM.height;
		this._boxBM.setPosition(this._progressBar.x + this._progressBar.width + this._boxBM.width / 2 + 22, this._progressBar.y + this._progressBar.height / 2 + this._boxBM.height / 2 - 3);
		this.addChildToContainer(this._boxBM);
		this._boxBM.addTouchTap(() => {
			ViewController.getInstance().openView(ViewConst.POPUP.ACENJOYNIGHTACHIEVEMENTPOPUPVIEW, { 
                aid: this.aid,
                code: this.code,
                uicode: this.uicode,
            });
		}, this);
		//宝箱光 584 816  582.5 810
		this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
		this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
		this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxBM.width / 2 + 3;
		this._boxLightBM.setPosition(this._boxBM.x, this._boxBM.y);
		this.addChildToContainer(this._boxLightBM);
		this._boxLightBM.alpha = 0;

		//红点	
		this._redDot = BaseBitmap.create("public_dot2");
		this._redDot.setPosition(this._boxBM.x + this._boxBM.width / 2 - this._redDot.width / 2, this._boxBM.y - this._boxBM.height + this._redDot.height / 2)
		this.addChildToContainer(this._redDot);
		if (this.vo.checkAchievementRedDot()) {
			this._boxBM.setRes("acwealthcomingview_box_2")
			this._redDot.setVisible(true);
		}
		else {
			this._boxBM.setRes("acwealthcomingview_box_1")
			this._redDot.setVisible(false);
		}

		//文字
		let boxWordBM = BaseBitmap.create("enjoynight_award-"+code)
		boxWordBM.setPosition(this._boxBM.x - boxWordBM.width / 2, this._boxBM.y - boxWordBM.height / 2 - 3);
		this.addChildToContainer(boxWordBM);

        //获取次数
        this._chargeBtn = ComponentManager.getButton("enjoynight_itembg-"+code,null,()=>{
            if(this._stopClick){
                return;
            }
            if (this._isPlay) {
				return;
			}
            ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTREWARDVIEW, { 
                aid: this.aid, 
                code: this.code,
                uicode: this.uicode,
             });

        },this,null,0);
        this._chargeBtn.setPosition(GameConfig.stageWidth-165, GameConfig.stageHeigth -370 );
        this.addChildToContainer(this._chargeBtn); 

        this._awardRedDot = BaseBitmap.create("public_dot2");
		this._awardRedDot.setPosition(120,0);
		

        //消耗品
        let rectd = new egret.Rectangle(0,0,85,85);
		let dice = BaseLoadBitmap.create("treasureboxicon-1",rectd);
        dice.setScale(0.85);
		dice.setPosition(this._chargeBtn.width / 2 - dice.width / 2+25, this._chargeBtn.height/2 - dice.height/2+10);
		this._chargeBtn.addChild(dice);
       
        let gettime = BaseBitmap.create("enjoynight_gettime-" + code);
		gettime.setPosition(this._chargeBtn.width / 2 - gettime.width / 2 +20, this._chargeBtn.height - gettime.height);
		this._chargeBtn.addChild(gettime);

        this._chargeBtn.addChild(this._awardRedDot);

        let timebg:BaseBitmap = BaseBitmap.create("public_numbg");
        timebg.setPosition(GameConfig.stageWidth-timebg.width , GameConfig.stageHeigth -278);
        this.addChildToContainer(timebg); 

        this._timesText = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureBoxNum-1",[String(vo.getBoxNum())]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._timesText.width = timebg.width;
        this._timesText.textAlign = egret.HorizontalAlign.CENTER;
        this._timesText.setPosition(timebg.x,timebg.y+9);
        this.addChildToContainer(this._timesText); 

        this.initBox();

        this.update();

        view._carGroup = new BaseDisplayObjectContainer();
        view._carGroup.width = GameConfig.stageWidth;
        view._carGroup.height = GameConfig.stageHeigth;// - 80 - 119 - view.titleBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carGroup, view);
        view._carGroup.addTouchTap(()=>{
            view._stopPlay = true;
            view.moveCar();
            view._carGroup.removeChildren();
        },view);
 

        let car = BaseBitmap.create(`enjoynightcar-1`);
        view._bgGroup.addChild(car);
        view._car = car;

        let carTip = BaseBitmap.create(`enjoynightcartip-1`);
        view._bgGroup.addChild(carTip);
        view._carTip = carTip;
        egret.Tween.get(view._carTip, {loop : true}).to({y : view._carTip.y - 15}, 500).to({y : view._carTip.y}, 500);

        view.moveCar(false);

        view.addChild(view._carGroup);


        if (this.vo.needplay > 0)
        {
            this.showAvg();
        }
        this.tick();
    }

    private freshView():void
    {
        let view = this;
        let code = view.code;

        this.update();
    }

    /**初始化宝箱相关 */
	private initBox() {
		let vo = this.vo;
		let cfg = this.cfg;
		this._boxInfoList = [];
        let code = this.uicode;

        let allKeys = Object.keys(cfg.achievement);

		for (let i = 0; i < allKeys.length; i++) {
            let itemCfg = cfg.achievement[allKeys[i]];
			let value = itemCfg.needNum;
			let v = cfg.achievement[allKeys[allKeys.length - 1]].needNum;
			let p = value / v;
			let boxBM = BaseBitmap.create("acworshipview_box3");
			boxBM.anchorOffsetX = boxBM.width / 2;
			boxBM.anchorOffsetY = boxBM.height / 2;
			boxBM.setPosition(this._progressBar.x + this._progressBar.width * p, this._progressBar.y + this._progressBar.height / 2 - 7);
			this.addChildToContainer(boxBM);
			boxBM.addTouchTap(() => {
				ViewController.getInstance().openView(ViewConst.POPUP.ACENJOYNIGHTACHIEVEMENTPOPUPVIEW, {
                     aid: this.aid, 
                     code: this.code,
                     uicode: this.uicode, 
                     id: itemCfg.id
                });
			}, this);
			let isPlayAni: boolean = vo.getAchievementVallue() >= value ? false : true;
			let percent = Math.round(p * 1000);
			let boxInfo = { boxBM: boxBM, isPlayAni: isPlayAni, percent: percent, itemCfg: itemCfg }
			this._boxInfoList.push(boxInfo);


			if (allKeys.length - 1 == i) {

				this._speakStr = LanguageManager.getlocal("acEnjoyNightSpeakTip-" + code);
				this._speakTF = ComponentManager.getTextField(this._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
				this._speakTail = BaseBitmap.create("public_9_bg25_tail");

				this._speakBg = BaseBitmap.create("public_9_bg25");
				this._speakBg.width = this._speakTF.width + 40;
				let posX = boxBM.x;
				if (posX + this._speakBg.width + 5 > GameConfig.stageWidth) {
					posX = GameConfig.stageWidth - this._speakBg.width - 15;
				}

				this._speakBg.setPosition(posX, boxBM.y - boxBM.height / 2 - this._speakBg.height - this._speakTail.height + 5);
				this.addChildToContainer(this._speakBg);

				this._speakTF.setPosition(this._speakBg.x + this._speakBg.width / 2 - this._speakTF.width / 2, this._speakBg.y + this._speakBg.height / 2 - this._speakTF.height / 2);
				this.addChildToContainer(this._speakTF);

				this._speakTail.skewY = 180
				this._speakTail.setPosition(boxBM.x, boxBM.y - boxBM.height / 2 - this._speakTail.height);
				this.addChildToContainer(this._speakTail);


				egret.Tween.get(this._speakBg, { loop: true }).call(() => {
					this._speakTF.text = "";
					this._speakTail.setVisible(true);
					this._speakTF.setVisible(true);
					this._speakBg.setVisible(true);
					this._messageLength = 0;
					egret.Tween.get(this._speakTF, { loop: true }).wait(75).call(() => {
						this._speakTF.text = this._speakStr.substr(0, this._messageLength);
						this._messageLength++;
					}, this);
				}, this).wait(this._speakStr.length * 75 + 3000).call(() => {
					this._speakTail.setVisible(false);
					this._speakTF.setVisible(false);
					this._speakBg.setVisible(false);
					this._messageLength = 0;
					egret.Tween.removeTweens(this._speakTF);
				}, this).wait(10000);
			}
		}

		this.refreshBanger(this._startPercent)
	}

    private refreshBanger(percent: number) {
		let percentTmp = Math.round(percent * 1000)
		let vo = this.vo;
		for (let i = 0; i < this._boxInfoList.length; i++) {
			let boxInfo = this._boxInfoList[i];
			if (percentTmp >= boxInfo.percent) {
				if (vo.checkAchievementFlag(Number(boxInfo.itemCfg.id))) {
					boxInfo.boxBM.setRes("acworshipview_box3");
				}
				else {
					boxInfo.boxBM.setRes("acworshipview_box1");
				}

				if (boxInfo.isPlayAni) {
					boxInfo.isPlayAni = false;
					//播放动画
					this.playBangerAni(boxInfo.boxBM, boxInfo.boxBM.x, boxInfo.boxBM.y, this._boxBM.x, this._boxBM.y - this._boxBM.height / 2, );
				}
			}
			else {
				boxInfo.boxBM.setRes("acworshipview_box2");
			}
			if (this._boxInfoList.length - 1 == i) {
				if (vo.checkAchievementFlag(Number(boxInfo.itemCfg.id))) {
					this._speakTail.alpha = 0;
					this._speakTF.alpha = 0;
					this._speakBg.alpha = 0;
				}
			}
		}
	}

    /**鞭炮的动画 */
	private playBangerAni(bangerBM: BaseBitmap, startPosX: number, startPosY: number, endPosX: number, endPosY: number) {
		let vo = this.vo;
		let cfg = this.cfg;
		// bangerBM.setVisible(false);
		let boomEffect = ComponentManager.getCustomMovieClip("boxboomeffect", 8, 70);
		let boom = BaseBitmap.create("boxboomeffect1");
		boomEffect.setScale(1.25);
		boom.setScale(1.25);
		boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2);
		this.addChildToContainer(boomEffect);
		boomEffect.playWithTime(1);
		boomEffect.setEndCallBack(() => {
			this.container.removeChild(boomEffect);
			boomEffect.dispose();
			let lightBall = BaseBitmap.create("acwealthcomingview_lightball")
			lightBall.anchorOffsetX = lightBall.width / 2;
			lightBall.anchorOffsetY = lightBall.height / 2;
			//oneone模式
			lightBall.blendMode = egret.BlendMode.ADD;
			this.addChildToContainer(lightBall);
			lightBall.alpha = 0;
			lightBall.setPosition(startPosX, startPosY);
			lightBall.alpha = 1;
			lightBall.setScale(0.1);
			lightBall.rotation = 0;
			let distanceX = endPosX - startPosX;
			let distanceY = endPosY - startPosY;
			egret.Tween.get(lightBall).to({
				rotation: 360 * 0.14,
				scaleX: 0.8,
				scaleY: 0.8,
				x: startPosX + distanceX * 0.3,
				y: startPosY + distanceY * 0.3
			}, 140).to({
				rotation: 360 * 0.54,
				scaleX: 1,
				scaleY: 1,
				x: startPosX + distanceX * 1,
				y: startPosY + distanceY * 1
			}, 400).call(() => {
				if (vo.checkAchievementRedDot()) {
					this._boxBM.setRes("acwealthcomingview_box_2");
				}
				else {
					this._boxBM.setRes("acwealthcomingview_box_1");
				}
				this._redDot.setVisible(false);
				this._boxBM.setScale(1.1);
				this._boxLightBM.setScale(1.1);
				this._boxLightBM.alpha = 1;
				egret.Tween.get(this._boxBM).to({
					scaleX: 1,
					scaleY: 1,
				}, 750).call(() => {
					if (vo.checkAchievementRedDot()) {
						this._redDot.setVisible(true);
					}
					else {
						this._redDot.setVisible(false);
					}
					// egret.Tween.removeTweens(this._boxBM);
					bangerBM.setVisible(true);
				}, this);
				egret.Tween.get(this._boxLightBM).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 0,
				}, 750).call(() => {
					// egret.Tween.removeTweens(this._boxLightBM);
				}, this);
			}, this).to({
				scaleX: 1.3,
				scaleY: 1,
				rotation: 360 * 1,
				alpha: 0,
			}, 460).call(() => {
				egret.Tween.removeTweens(lightBall);
				this.container.removeChild(lightBall);
				lightBall.dispose();
			}, this);

		}, this);
	}

    private resetbg():void
    {
         let bglv = this.vo.getMapLv();
         if (bglv != this._bglv)
         {
             let bgName:string="acenjoynight_bg"+this._bglv+"-" + this.uicode;
             let onebg = <BaseLoadBitmap>this.viewBg
             onebg.setload(bgName);
         }
         this.refreshBanger(this._startPercent);
    }

    public initBg()
    {
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;
        this._bglv = this.vo.getMapLv();
		let bgName:string="acenjoynight_bg"+this._bglv+"-" + this.uicode;
		if(bgName){
             let rect6 = new egret.Rectangle(0,0,1280,1136);
            this.viewBg = BaseLoadBitmap.create(bgName,rect6);
            if(this.isTouchMaskClose()){
				this.viewBg.touchEnabled=true;
            }

            let bggroup = new BaseDisplayObjectContainer();
            bggroup.width = this.viewBg.width;
            bggroup.height = GameConfig.stageHeigth;
            this.addChild(bggroup);
            this._bgGroup = bggroup;
			
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this.viewBg, bggroup, [0,0], true);
            bggroup.addChild(this.viewBg);

            for(let i in this.cfg.map){
                let unit = this.cfg.map[i];
                
                let picName:string = "common";
                if (unit.buildingType)
                {
                    picName = unit.buildingType;
                }
                let posCfg = this.mapPos[unit.pointID];
                let mask1 = BaseBitmap.create(`acenjoynight_b_${picName}`);
                mask1.x = posCfg.x;
                mask1.y = this.viewBg.y + posCfg.y;
                mask1.setScale(4);
                mask1.alpha = 0;
                mask1.name = `item${unit.pointID}`;
                mask1.addTouch((e : egret.Event)=>{
                    if(this._stopClick){
                        return;
                    }
                    if(e.type==egret.TouchEvent.TOUCH_BEGIN){
                        if(mask1.alpha == 0){
                            mask1.alpha = 0.3;
                        }
                        else{
                            mask1.alpha = 0;
                        }
                    }
                    else if(e.type==egret.TouchEvent.TOUCH_CANCEL){
                        mask1.alpha = 0;
                    }
                    if(e.type==egret.TouchEvent.TOUCH_END){
                        mask1.alpha = 0;
                        let viewName = '';
                        let mapId = "common";
						let mapname = "common";

						 if (unit.buildingType)
						 {
							mapId = unit.buildingType;
							mapname = "taixue";
						 }
						
                       
						ViewController.getInstance().openView("AcEnjoyNightAward"+App.StringUtil.firstCharToUper(mapname),{
                            code : this.code,
                            uicode : this.uicode,
                            aid : this.aid,
                            mapId : unit.id,
							buildingType : mapId
                        })
                    }
                },this,null,true);
                bggroup.addChild(mask1);

                
                if (posCfg.n)
                {   
                    let name = BaseLoadBitmap.create(posCfg.n);
                    if (PlatformManager.checkIsTextHorizontal())
                    {
                        name.setPosition(posCfg.np2[0],this.viewBg.y+posCfg.np2[1]);
                    }
                    else
                    {
                        name.setPosition(posCfg.np[0],this.viewBg.y+posCfg.np[1]);
                    }
                    bggroup.addChild(name);
                }
                
            }

            let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
            let noticescrollView = ComponentManager.getScrollView(bggroup,rect);
            noticescrollView.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, noticescrollView, this);
            noticescrollView.verticalScrollPolicy = 'off';
            bggroup.y = 0;
            this.addChild(noticescrollView);
            this._noticescrollView = noticescrollView;
        }
    }

    private tick() {
		let cfg = this.cfg;
		let vo = this.vo;
		if (vo.checkIsInEndShowTime()) {
			this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
		}
		else {
			this._countDownTime.text = LanguageManager.getlocal("acWorshipViewCountDownTime-" + this.uicode, [vo.acCountDownNoExtra]);
		}
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);

	}

      private mapPos = {
        1 : { x : 52, y : 568, width : 180, height : 116,n:"citynpcbookroomname",np:[212,544],np2:[92,549]}, //太学
        2 : { x : 288, y : 562, width : 54, height : 54},
        3 : { x : 358, y : 513, width : 54, height : 54},
        4 : { x : 143, y : 370, width : 180, height : 116,n:"citynpcpalacename",np:[323,402],np2:[190,423]},//皇宫
        5 : { x : 417, y : 410, width : 54, height : 54},
        6 : { x : 532, y : 421, width : 54, height : 54},
        7 : { x : 527, y : 479, width : 180, height : 116,n:"citynpcatkracename",np:[624,443],np2:[544,471]},//雷台
        8 : { x : 687, y : 477, width : 54, height : 54},
        9 : { x : 755, y : 438, width : 54, height : 54},
        10 : { x : 815, y : 375, width : 54, height : 54,n:"citynpcsearchname",np:[880,387],np2:[778,410]},//寻访
        11 : { x : 963, y : 481, width : 54, height : 54},
        12 : { x : 900, y : 518, width : 54, height : 54},
        13 : { x : 993, y : 559, width : 54, height : 54,n:"citynpcstudyatkname",np:[1150,553],np2:[1052,542]},//演武场
        14 : { x : 1197, y : 706, width : 54, height : 54},
        15 : { x : 1111, y : 745, width : 54, height : 54},
        16 : { x : 902, y : 741, width : 236, height : 132,n:"citynpcalliancename",np:[1045,719],np2:[924,722]},//帮会
        17 : { x : 802, y : 839, width : 54, height : 54},
        18 : { x : 716, y : 765, width : 54, height : 54},
        19 : { x : 567, y : 640, width : 54, height : 54,n:"citynpcdinnername",np:[697,615],np2:[560,620]},//酒楼
        20 : { x : 512, y : 742, width : 54, height : 54},
        21 : { x : 537, y : 862, width : 54, height : 54},
        22 : { x : 324, y : 790, width : 54, height : 54,n:"citynpcrankname",np:[461,760],np2:[326,772]},//排行榜
        23 : { x : 212, y : 788, width : 188, height : 124},
        24 : { x : 169, y : 696, width : 54, height : 54},
       
    }

 
    private oneBtnClick() :void
    {
		if(this._stopClick){
                return;
		}
        if (this._isPlay) {
				return;
			}
		let view = this;

        
		if(view.vo.isInActy()){
			//发送消息
            let neednum = 1;
            if (this.vo.isFree()) {
                neednum = 0;
            }
			if(view.vo.getBoxNum() >= neednum){//
				view._stopClick = true;
				NetManager.request(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTROLL,{
					activeId:view.acTivityId,
					isten:0
				});
			}
			else{
				// ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTREWARDVIEW,{
				// 	aid:this.aid,
				// 	code:this.code,
				// })
                 App.CommonUtil.showTip(LanguageManager.getlocal(`itemNumNotEnough`));
			    return;
			}
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
			return;
		}
    }

    private tenBtnClick() :void
    {
		if(this._stopClick){
                return;
		}
        if (this._isPlay) {
				return;
			}
		let view = this;
		if(view.vo.isInActy()){
			//发送消息
			if(view.vo.getBoxNum() >= 10){//
				view._stopClick = true;
				NetManager.request(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTROLL,{
					activeId:view.acTivityId,
					isten:1
				});
			}
			else{
				// ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTREWARDVIEW,{
				// 	aid:this.aid,
				// 	code:this.code,
				// })
                App.CommonUtil.showTip(LanguageManager.getlocal(`itemNumNotEnough`));
			    return;
			}
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
			return;
		}
    }

    private update():void
    {
        let vo = this.vo;
		let cfg = this.cfg;
		this._numTF.text = String(vo.getAchievementVallue());
		let progressNumber = cfg.getMaxAchievementValue();


		if (vo.getAchievementVallue() <= progressNumber) {
			this._progressTF.text = vo.getAchievementVallue() + "/" + progressNumber;
		}
		else {
			this._progressTF.text = LanguageManager.getlocal("acWorshipViewLotteryEndTip-" + this.uicode);
		}
		this._progressTF.x = this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2;

		if (vo.isFree() && (!vo.checkIsInEndShowTime())) {
			this._oneBtnFree.visible = true;
            this._oneBtnBM.visible = false;
            this._oneBtnLeftTF.visible = false;
            this._oneBtnRightTF.visible = false;
		}
		else {
			this._oneBtnFree.visible = false;
            this._oneBtnBM.visible = true;
            this._oneBtnLeftTF.visible = true;
            this._oneBtnRightTF.visible = true;
		}
		if (!vo.checkAchievementRedDot()) {
			this._boxBM.setRes("acwealthcomingview_box_1");
			this._redDot.setVisible(false);
		}
		if (vo.checkRechargeRedDot() || vo.checkTaskRedDot()) {
			this._awardRedDot.visible = true;
		}
		else {
			this._awardRedDot.visible = false;
		}

         this._timesText.text =LanguageManager.getlocal("acTreasureBoxNum-1",[String(vo.getBoxNum())]);

         if (vo.isCanExchange())
         {
              App.CommonUtil.addIconToBDOC(this._skinPreviewBtn);
         }
         else
         {
              App.CommonUtil.removeIconFromBDOC(this._skinPreviewBtn);
         }
    }

	private _rewardData : any = null;
	private playBoxCallback(evt : egret.Event):void
	{
		 let view = this;
        let data = evt.data.data.data;
        view._rewardData = null;
        view._rewardData = data;
        if(evt.data.data.ret < 0){
            view._stopClick = false;
            App.CommonUtil.showTip(LanguageManager.getlocal('limitedCollectErrorTips'));
            return;
        }
        view._stopPlay = false;
		
        ViewController.getInstance().openView(ViewConst.BASE.ACENJOYNIGHTBOXRESULTVIEW,{
            aid : view.aid,
            code : view.code,
            uicode : view.uicode,
            result : data.randNumber,
            skip : view._oneKeySearchStatus,
            confirmCallback : ()=>{
                if(view._oneKeySearchStatus){
                    view.moveCar(false);
                    view.showBoxEnd();
                }
                else{
                    if(view._carGroup){
                        view._carGroup.removeChildren();
                    }
                    view.setChildIndex(view._carGroup, 99999);
                    let bg = BaseBitmap.create(`public_9_viewmask`);
                    bg.height = view._carGroup.height;//GameConfig.stageHeigth - 80 - 119 - view.titleBg.height;
                    bg.width = GameConfig.stageWidth;
                    view._carGroup.addChild(bg);

                    let carbg = BaseBitmap.create(`enjoynightcarbg-1`);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, carbg, view._carGroup, [0,0], true);
                    view._carGroup.addChild(carbg);
            
                    let carbg2 = BaseBitmap.create(`enjoynightcarbg-1`);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, carbg2, carbg, [carbg.width,0]);
                    view._carGroup.addChild(carbg2);

                    let boatclip = ComponentManager.getCustomMovieClip(`treasurecar1-`,6,100);
                    boatclip.width = 368;
                    boatclip.height = 170;
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, boatclip, view._carGroup, [0,carbg.y + carbg.height - boatclip.height - 35], true);
                    view._carGroup.addChild(boatclip); 
                    boatclip.playWithTime(-1);

                    let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasurecarTip1-1`),22,TextFieldConst.COLOR_BLACK);
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view._carGroup, [0,carbg.y + 20], true);
                    view._carGroup.addChild(tipTxt); 

                    let tipBg = BaseBitmap.create(`public_itemtipbg2`);
                    view._carGroup.addChild(tipBg);

                    let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasurecarTip2-1`),22);
                    view._carGroup.addChild(tipTxt2); 
                    
                    tipBg.width = tipTxt2.textWidth + 60;
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view._carGroup, [0,carbg.y + carbg.height + 15], true);
                    view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, tipBg);

                    egret.Tween.get(carbg,{loop : true}).
                    to({x : -carbg.width},5000). 
                    to({x : carbg.width - 10}, 1).
                    to({x : 0},5000);
            
                    egret.Tween.get(carbg2,{loop : true}).
                    to({x : -carbg2.width}, 10000).
                    to({x : carbg2.width - 10}, 1);

                    egret.Tween.get(carbg).wait(1500).call(()=>{
                        if(!view._stopPlay){
                            view.moveCar();
                            //
                            view._carGroup.removeChildren();
                        }
                    },view);
                }
            },
            handler : view
        });
	}

	private moveCar(flag = true):void{
        let view = this;
        //小车位置
        let curMap = view.vo.getCurMapId();
        let item = view._bgGroup.getChildByName(`item${curMap}`);
        let info = view.mapPos[curMap];
        let curLeft = view._noticescrollView.scrollLeft;
        if(flag){

            if (this._startPercent < 1) {
                let endPercent = this.vo.getAchievementVallue() / this.cfg.getMaxAchievementValue();
                this.playProgressBarAni(this._startPercent, endPercent, 0.005);
            }
            //
            let lamp = ComponentManager.getCustomMovieClip(`treasurecarmove1-`,15,50);
            lamp.blendMode = egret.BlendMode.ADD;
            lamp.width = 407;
            lamp.height = 154;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lamp, view._car);
            lamp.playWithTime(1);
            egret.Tween.get(view._car).to({alpha : 0}, 230).call(()=>{
                view._carTip.alpha = 0;
            },view);

            lamp.setEndCallBack(()=>{
                if(lamp){
                    view._bgGroup.removeChild(lamp);
                }
                egret.Tween.get(view._car).wait(200).call(()=>{
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._car, item, [item.width* item.scaleX/2-15,item.height * item.scaleY + (view.cfg.map[curMap].pointType == 1 ? -20 : -35)]);
                    let posX = view._car.x + view._car.width / 2 - GameConfig.stageWidth / 2;
                    let left = Math.min(Math.max(0,posX), view.viewBg.width / 2);
                    
                    egret.Tween.get(view._noticescrollView).to({scrollLeft : left}, 500).wait(500).call(()=>{
                        let car1 = BaseBitmap.create(`treasurecarscale-1`);
                        car1.anchorOffsetX = car1.width / 2;
                        car1.anchorOffsetY = car1.height / 2;
                        car1.setScale(2);
                        view._bgGroup.addChild(car1);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car1, view._car, [40,32.5]);
                        egret.Tween.get(car1).to({scaleX : 1, scaleY : 1}, 170).wait(230).call(()=>{
                            egret.Tween.removeTweens(car1);
                            view._bgGroup.removeChild(car1);
                        },view);
        
                        let car2 = BaseBitmap.create(`treasurecarscale-1`);
                        car2.alpha = 0.08;
                        car2.anchorOffsetX = car2.width / 2;
                        car2.anchorOffsetY = car2.height / 2;
                        car2.setScale(2);
                        view._bgGroup.addChild(car2);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car2, view._car, [40,32.5]);
                        egret.Tween.get(car2).wait(130).to({scaleX : 1, scaleY : 1, alpha : 0.75}, 170).wait(100).call(()=>{
                            egret.Tween.removeTweens(car2);
                            view._bgGroup.removeChild(car2);
                        },view);
        
                        let car3 = BaseBitmap.create(`treasurecarscale-1`);
                        car3.alpha = 0.08;
                        car3.anchorOffsetX = car3.width / 2;
                        car3.anchorOffsetY = car3.height / 2;
                        car3.setScale(2);
                        view._bgGroup.addChild(car3);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car3, view._car, [40,32.5]);
                        egret.Tween.get(car3).wait(260).to({scaleX : 1, scaleY : 1, alpha : 1}, 140).call(()=>{
                            egret.Tween.removeTweens(car3);
                            view._bgGroup.removeChild(car3);
                        },view).call(()=>{
                            let lamp2 = ComponentManager.getCustomMovieClip(`treasurecarmove1-`,15,50);
                            lamp2.blendMode = egret.BlendMode.ADD;
                            lamp2.width = 407;
                            lamp2.height = 154;
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lamp2, view._car);
                            lamp2.playWithTime(1);
                            view._car.alpha = 1;
                            lamp2.setEndCallBack(()=>{
                                if(lamp2){
                                    egret.Tween.get(lamp2).to({alpha : 0}, 200).call(()=>{
                                        // view._carTip.setRes(view.vo.isInWeaith() ? `treasurewealthtip-1` : `treasurecartip-1`);
                                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carTip, item, [0,-view._carTip.height]);
                                        egret.Tween.removeTweens(view._carTip);
                                        view._carTip.alpha = 1;
                                        egret.Tween.get(view._carTip, {loop : true}).to({y : view._carTip.y - 15}, 500).to({y : view._carTip.y}, 500);
                                    },view).wait(200).call(()=>{
                                        egret.Tween.removeTweens(lamp2);
                                        view._bgGroup.removeChild(lamp2);
                                        view.showBoxEnd();
                                    },view);
                                }
                            },view);
                            view._bgGroup.addChild(lamp2);
                        },view);
                        egret.Tween.removeTweens(view._noticescrollView);
                    },view);
                },view);
            },view);
            view._bgGroup.addChild(lamp);
        }
        else{
            if(item){
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._car, item, [item.width* item.scaleX/2-15,item.height * item.scaleY + (view.cfg.map[curMap].pointType == 1 ? -20 : -35)]);
                let posX = view._car.x + view._car.width / 2 - GameConfig.stageWidth / 2;
                let left = Math.min(Math.max(0,posX), view.viewBg.width / 2);
                view._noticescrollView.scrollLeft = left;
                // view._carTip.setRes(view.vo.isInWeaith() ? `treasurewealthtip-${view.code}` : `treasurecartip-${view.code}`);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carTip, item, [0,-view._carTip.height]);
                egret.Tween.removeTweens(view._carTip);
        
                egret.Tween.get(view._carTip, {loop : true}).to({y : view._carTip.y - 15}, 500).to({y : view._carTip.y}, 500);
            }
        }
        
        // view._noticescrollView.scrollLeft = Math.min(Math.max(0,posX), view.viewBg.width / 2)
    }

	private showBoxEnd():void{
        let view = this;
        let info = view.cfg.map[view.vo.getCurMapId()];
        let data = view._rewardData;
        view.freshView();
        
        if(info.pointType == 2){
            view.showReward(data,2);
        }
        else{
            view.showReward(data);
        }
        view._stopClick = false;
    }

    private showAvg():void{
        let view = this;
        let mapId = view.vo.getCurMapId();

        ViewController.getInstance().openView(ViewConst.BASE.ACENJOYNIGHTAVGVIEW,{
            aid : view.aid,
            code : view.code,
            uicode : view.uicode,
            mapId : mapId,
            key : view.vo.getMapTimes(),
            
        });
    }

    private showReward(data : any, type=1 ):void{
        let view = this;

        if (data.isten)
        {
            ViewController.getInstance().openView(ViewConst.POPUP.ACENJOYNIGHTTENPOPUPVIEW,{
                    aid : view.aid,
                    code : view.code,
                    uicode : view.uicode,
                    info : data.rollArr,
                    
                });
        }
        else
        {
            let addValue = data.addValue;
            // let str = LanguageManager.getlocal("acEnjoyNightGetValueTip",[String(addValue)]);
            // App.CommonUtil.showTip(str);

            if (type == 2)
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACENJOYNIGHTGETREWARDVIEW,{
                    aid : view.aid,
                    code : view.code,
                    uicode : view.uicode,
                    rewards : data.rewards,
                    extra : data.wealthGodRewards,
                    addValue :addValue,
                    confirmCallback : ()=>{        
                        view.showAvg();
                    },
                    handler : view
                });
            }
            else
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACENJOYNIGHTGETREWARDVIEW,{
                    aid : view.aid,
                    code : view.code,
                    uicode : view.uicode,
                    rewards : data.rewards,
                    extra : data.wealthGodRewards,
                    addValue : addValue,

                });
            }
        }



        
    } 

    public getuicode():string
    {
        return this.uicode;
    }

    public getUicode():string
    {
        return this.getuicode()
    }

     /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}{

        

        let localkey:string = `acEnjoyNightreportTipTime`+this.code+"_"+Api.playerVoApi.getPlayerID();
        let timeStr:string = LocalStorageManager.get(localkey);
        let lastTime:number = 0;
        if (timeStr && timeStr!="")
        {   
            lastTime = Number(timeStr);
        }

        if (lastTime < this.vo.et)
        {   
            let getReportData:any = {title:{key:`acEnjoyNightreporttitle-${this.code}`},msg:{key:`acEnjoyNightreportmsg-${this.code}`}};
            LocalStorageManager.set(localkey,String(this.vo.et));
            return getReportData;
        }
        else
        {
           return null;
        }
	}


    	/**
	 * 进度条的动画
	 */
	private playProgressBarAni(startPercent: number, endPercent: number, speed: number) {

		//每次初始化
		this._progressBar.setPercentage(startPercent);
		egret.Tween.removeTweens(this._progressBar);
		let posWidthValue: number = this._startPercent >= 1 ? 1 : this._startPercent;
		this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
		this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y + this._progressBar.height / 2);

		let startTemp = Math.round(startPercent * 1000);
		let endTemp = Math.round(endPercent * 1000);
		let maxTemp = Math.round(1 * 1000);
		let everyTimeValue = speed;

		egret.Tween.get(this._progressBar, { loop: true }).wait(0.1).call(() => {
			this._progressLight.setVisible(true);
			//增量动画
			startPercent += everyTimeValue;
			// this.refreshBanger(startPercent);
			startTemp = Math.round(startPercent * 1000);
			if (startTemp > endTemp) {
				egret.Tween.removeTweens(this._progressBar);
				this._progressLight.setVisible(false);
				if (startTemp > maxTemp) {
					egret.Tween.removeTweens(this._progressBar);
					this._progressLight.setVisible(false);
					return;
				}
				else {
					this._isPlay = false;
				}
				return;
			}
			this.refreshBanger(startPercent);
			this._progressBar.setPercentage(startPercent);
			let posWidthValue: number = this._startPercent >= 1 ? 1 : this._startPercent;
			this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
			this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y + this._progressBar.height / 2);
			this._startPercent = startPercent;

		}, this)

	}

     public dispose():void
     {  
		let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTROLL),view.playBoxCallback,view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTACHIEVEMENT, this.resetbg, this);
        view._bgGroup = null;
        view._stopClick = null;
        view._cdText = null;

        this._oneBtn = null;
		this._oneBtnBM = null;
		this._oneBtnLeftTF = null;
		this._oneBtnRightTF = null;
        this._progressBar = null;
		this._progressBM = null;
		this._progressLight = null;
        this._startPercent = 0;
        this._progressTF = null;
        this._numTF = null;
        this._boxBM = null;
        this._boxLightBM = null;
        this._redDot = null;
        this._depth = 0;

        this._countDownTime = null;
		this._countDownTimeBg = null;
        this._boxInfoList = [];
		this._speakStr = null;
		this._speakTF = null;
		this._speakTail = null;
		this._speakBg = null;
		this._messageLength = 0;
        this._timesText = null;
        this._chargeBtn = null;

		view._bgGroup = null;
        if(view._carGroup){
            view._carGroup.removeTouchTap();
            view._carGroup.dispose();
            view._carGroup = null;
        }
        view._car = null;
        egret.Tween.removeTweens(view._carTip);
        view._carTip = null;
        view._noticescrollView = null;
        view._stopPlay = false;
        view._stopClick = false;
        this._awardRedDot = null;
        this._bglv = 0;
        this._isPlay= false;
        this._skinPreviewBtn = null;

        super.dispose();
     }
}