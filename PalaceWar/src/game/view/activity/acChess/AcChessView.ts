/**
 * 棋社对弈
 * @author weixiaozhe  2020.5.7
 */
class AcChessView extends AcCommonView {

    public static AID: string = null;
    public static CODE: string = null;
    public static IS_SHOW_RECHARGE: boolean = false;
    public static IS_SHOW_PROCESS: number = 0;
    private _detailBtn:BaseButton;
    private _topTxtBg:BaseBitmap=null;
    private _proText2:BaseTextField=null;
    private _totalProText:BaseTextField=null;
    private _progressBar : ProgressBar = null;
    private _boxRewardImg : BaseBitmap = null;
    private _timeTxt: BaseTextField = null;
    private _icon1:BaseBitmap=null;
    private _costTxt1:BaseTextField=null;
    private _freeLab:BaseTextField=null;
    private _panPos:egret.Point=null;
    private _timebgwidth:number = 0;
    private _timebgx:number;
    private _haveTxt:BaseTextField=null;
    private _limitTxt:BaseTextField=null;

    protected initBg(): void {
        let bgName: string = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.viewBg.setPosition(0, GameConfig.stageHeigth - this.viewBg.height);
            this.addChild(this.viewBg);
        }
        let topTxtBg = BaseBitmap.create("luckydrawwordbg");
        topTxtBg.width = GameConfig.stageWidth;
        topTxtBg.height = 115;
        topTxtBg.x = GameConfig.stageWidth / 2 - topTxtBg.width / 2;
        topTxtBg.y = 92-10;
        this.addChild(topTxtBg);
        this._topTxtBg = topTxtBg;
    }
	protected getBgName():string
	{	
		return "acchess_bg-" + this.TypeCode;
	}    
    //规则
    protected getRuleInfo(): string {
        return "acChessRuleInfo-" + this.code;
    }    
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}    
    private get TypeCode():string
    {
        if(this.code == "2")
        {
            return "1";
        }
        return this.code;
    }
	protected getProbablyInfo():string
	{
		return "acChessProbablyInfo-"+this.code;
    }     
    protected getTitleStr(): string {
        return null;
    }
    protected getTitleBgName(): string {
        return this.getDefaultRes('acchess_title');
    }  
    public initView() {

        // this.visible = false;

        AcChessView.AID = this.aid;
        AcChessView.CODE = this.code;

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHESS_GETNUMREWARDS, this.freshProcess, this);

        this.showStartDialog();

        //活动时间   
        let dateText = ComponentManager.getTextField(this.vo.acTimeAndHour, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = this._topTxtBg.x + 10;
        dateText.y = this._topTxtBg.y + 10;
        this.addChild(dateText);

        let timebg  = BaseBitmap.create("public_9_bg61");
        timebg.width = 230;
        this.addChild(timebg);
        this.setLayoutPosition(LayoutConst.rightbottom,timebg,this._topTxtBg,[15,-timebg.height/2+3])

        //剩余时间
        let timeTxt = ComponentManager.getTextField(this.vo.acCountDown, 18,TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.x = timebg.x + timebg.width / 2 - timeTxt.width / 2;
        timeTxt.y = timebg.y + timebg.height/2 - timeTxt.height/2;
        this.addChild(timeTxt);
        this._timeTxt = timeTxt;
        this._timebgwidth = timebg.width;
        this._timebgx = timebg.x;

        let needMoney = this.vo.getNeedMoney2();
        let needItem = this.cfg.change.needItem.split("_")[2];

        //活动规则文本
        let descTxt  = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acChessInfo"),[String(needMoney),needItem]), 18);
        descTxt.width = 610;
        descTxt.lineSpacing = 5;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 10;
        this.addChild(descTxt);

        //活动详情
        let detailBtnBg = ResourceManager.hasRes("acchess_detailbtn-"+this.getUiCode()) ? "acchess_detailbtn-"+this.getUiCode() : "acchess_detailbtn-1";
        let detailBtn = ComponentManager.getButton(detailBtnBg, "", ()=>
        {
            AcChessView.IS_SHOW_RECHARGE = false;
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSREWARDPOPVIEW, {aid:this.aid, code:this.code});
        }, this,null,);
        detailBtn.setPosition(10, 210);
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;

        let panImg  = BaseBitmap.create("chess_pan");
        this.addChild(panImg);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,panImg,this,[0,-110]);
        this._panPos = new egret.Point(panImg.x,panImg.y);
        this.freshQizi();

		let bottomNameImag: BaseBitmap = BaseBitmap.create("public_resnumbg");
        bottomNameImag.width = 260;
        this.addChild(bottomNameImag);
        this.setLayoutPosition(LayoutConst.horizontalCentertop,bottomNameImag,panImg,[0,-(10+bottomNameImag.height)]);

        let str:string = this.cfg.change.needItem;
        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        let itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
        itemicon.width = 40;
        itemicon.height = 40;
        itemicon.x = bottomNameImag.x + bottomNameImag.width/2 - itemicon.width - 75;
        itemicon.y = bottomNameImag.y + bottomNameImag.height/2 - itemicon.height/2;
        this.addChild(itemicon); 

        let have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
        let haveTxt = ComponentManager.getTextField(String(have), 20,TextFieldConst.COLOR_WARN_YELLOW);
        haveTxt.x = itemicon.x + itemicon.width;
        haveTxt.y = bottomNameImag.y + bottomNameImag.height/2 - haveTxt.height/2;
        this.addChild(haveTxt);
        this._haveTxt = haveTxt;

        let limitleft = this.cfg.sepcialLimit - this.vo.slimit;
        let limitstr = limitleft > 0 ? "acChessLimitDesc" : "acChessLimitDesc2";
        let limitTxt  = ComponentManager.getTextField(LanguageManager.getlocal(limitstr,[String(limitleft)]),20,TextFieldConst.COLOR_WARN_YELLOW);
        limitTxt.x = haveTxt.x + haveTxt.width + 2;
        limitTxt.y = bottomNameImag.y + bottomNameImag.height/2 - limitTxt.height/2;
        this.addChild(limitTxt);
        this._limitTxt = limitTxt;

        this.showEffect();

        let botbg = BaseBitmap.create("arena_bottom");
        botbg.height = 130;
        botbg.x = GameConfig.stageWidth/2 - botbg.width/2;
        botbg.y = GameConfig.stageHeigth - botbg.height;
        this.addChild(botbg);

        // 底部背景--桌子
        let bottomBg = BaseBitmap.create(this.getDefaultRes("acchess_desk"));
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - botbg.height;
        this.addChild(bottomBg);

        let processBg = BaseBitmap.create("acchess_processbg");
        processBg.x = 10;
        processBg.y = bottomBg.y - 25;
        this.addChild(processBg);
        let proText1 = ComponentManager.getTextField(LanguageManager.getlocal("acChess_processtxt"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        let proText2 = ComponentManager.getTextField("0", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._proText2 = proText2;
        proText1.x = processBg.x + processBg.width/2 - proText1.width/2;
        proText1.y = processBg.y + 30;
        this.addChild(proText1);

        proText2.width = processBg.width;
        proText2.textAlign = egret.HorizontalAlign.CENTER;
        proText2.x = processBg.x;
        proText2.y = processBg.y + processBg.height - proText2.height - 20;
        this.addChild(proText2);

        //进度条
		let progressbar = ComponentManager.getProgressBar("progress12", "progress12_bg", 470);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progressbar, bottomBg, [processBg.width+processBg.x-5,15]); 
        this.addChild(progressbar);
        this._progressBar = progressbar;
        this._boxRewardImg = BaseBitmap.create("acchess_qihe1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this._boxRewardImg, bottomBg, [20,-10]);
        this.addChild(this._boxRewardImg);
		this._boxRewardImg.addTouchTap(() => 
        {
            AcChessView.IS_SHOW_PROCESS = 5;
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSREWARDPOPVIEWTAB2, {
                aid: this.aid, 
                code: this.code,
                index:-1
            });
        }, this);
        let boxbotimg = BaseBitmap.create("luckydrawrewardword-2");
        boxbotimg.x = this._boxRewardImg.x + this._boxRewardImg.width/2 - boxbotimg.width/2;
        boxbotimg.y = this._boxRewardImg.y + this._boxRewardImg.height - boxbotimg.height/2;
        this.addChild(boxbotimg);

        this._totalProText = ComponentManager.getTextField(LanguageManager.getlocal("acChessProcessNum",["0","0"]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(this._totalProText);
        this._totalProText.width = 100;
        this._totalProText.textAlign = egret.HorizontalAlign.CENTER;
        this._totalProText.x = this.width/2 - this._totalProText.width/2;
        this._totalProText.y = bottomBg.y + bottomBg.height - this._totalProText.height + 33;
        this.freshProcess();        

        // 对弈按钮
        let chessBtn1 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acChess_btn1", this.chessBtnHandle1, this);
        this.addChild(chessBtn1);
        this.setLayoutPosition(LayoutConst.leftbottom,chessBtn1,botbg,[50,15]);
        let chessBtn10 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acChess_btn10", this.chessBtnHandle10, this);
        this.addChild(chessBtn10);
        this.setLayoutPosition(LayoutConst.rightbottom,chessBtn10,botbg,[50,15]);

        let icon1 = BaseBitmap.create("itemicon1");
        icon1.setScale(0.4);
        icon1.x = chessBtn1.x + chessBtn1.width/2 - icon1.width*icon1.scaleX/2 - 20;
		icon1.y = chessBtn1.y - icon1.height*icon1.scaleY - 10;
		this.addChild(icon1);
        let costTxt1 = ComponentManager.getTextField(String(this.cfg.cost1), 22,TextFieldConst.COLOR_LIGHT_YELLOW);
        costTxt1.x = icon1.x + icon1.width*icon1.scaleX;
        costTxt1.y = icon1.y + 13;
        this.addChild(costTxt1);
        let freeLab = ComponentManager.getTextField(LanguageManager.getlocal("acChess_free"), 24,TextFieldConst.COLOR_LIGHT_YELLOW);
        freeLab.x = chessBtn1.x + chessBtn1.width/2 - freeLab.width/2;
        freeLab.y = icon1.y + 10;
        this.addChild(freeLab);

        this._icon1 = icon1;
        this._costTxt1 = costTxt1;
        this._freeLab = freeLab;
        this.freshFreeLab();

        let icon10 = BaseBitmap.create("itemicon1");
        icon10.setScale(0.4);
        icon10.x = chessBtn10.x + chessBtn10.width/2 - icon10.width*icon10.scaleX/2 - 25;
		icon10.y = chessBtn10.y - icon10.height*icon10.scaleY - 10;
		this.addChild(icon10);
        let costTxt10 = ComponentManager.getTextField(String(this.cfg.cost10), 22,TextFieldConst.COLOR_LIGHT_YELLOW);
        costTxt10.x = icon10.x + icon10.width*icon10.scaleX;
        costTxt10.y = icon10.y + 13;
        this.addChild(costTxt10);

        if (this.vo.firstOpen != 1) {
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.acVo.aid + "-" + this.acVo.code, flagkey: "firstOpen", value: 1 });
        }
        if (this.vo.avgShow != 1) {
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.acVo.aid + "-" + this.acVo.code, flagkey: "avgShow", value: 1 });
            // ViewController.getInstance().openView(ViewConst.BASE.ACLINKGAMEAVGVIEW,{
            //     f : this.avgendCallback,
            //     o : this,
            //     idx : 1,
            //     aid : this.aid,
            //     code : this.code
            // });
        }
        this.refreshRed();
    }
    private avgendCallback()
    {

    }

    private freshFreeLab():void
    {
        if(this.vo.isfree > 0)
        {
            this._freeLab.visible = true;
            this._icon1.visible = false;
            this._costTxt1.visible = false;
        }else
        {
            this._freeLab.visible = false;
            this._icon1.visible = true;
            this._costTxt1.visible = true;            
        }
    }

    private _proObjArr:egret.DisplayObject[]=null;
    private _proEffImg1:BaseBitmap[] = [null,null,null,null];
    private _proEffImg2:BaseBitmap[] = [null,null,null,null];
    private freshProcess():void
    {
        if(this._proObjArr == null)
        {
            this._proObjArr = [];
        }else
        {
            for(let i = 0; i < this._proObjArr.length; i++)
            {
                if(this._proObjArr[i])
                {
                    this._proObjArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.processHandle,this);
                    if(this._proObjArr[i].parent)
                    {
                        this._proObjArr[i].parent.removeChild(this._proObjArr[i]);
                    }
                    this._proObjArr[i] = null;
                }
            }
            this._proObjArr = [];
        }

        let achItems = this.vo.getSortAchievementCfg(false);

        let len = achItems.length > 5 ? 5 : achItems.length;
        let width = this._progressBar.width;

        let maxNeed = achItems[len-1].needNum;

        this._proText2.text = String(this.vo.getProcess());
        this._totalProText.text = String(this.vo.getProcess()) + "/" + achItems[achItems.length-1].needNum;
        this._progressBar.setPercentage(this.vo.getProcess()/maxNeed);

        for(let i = 0; i < len; i++)
        {
            if(i != len-1)
            {
                if(this.vo.isGetAchievementById(String(achItems[i].id)))
                {
                    let img = BaseBitmap.create("acchess_qibtnnull");
                    img.touchEnabled = true;
                    img.anchorOffsetX = img.width/2;
                    img.x = achItems[i].needNum/maxNeed * width + this._progressBar.x;
                    img.y = this._progressBar.y;
                    this.addChild(img);
                    img["nameIndex"] = achItems[i].id;
                    img.addEventListener(egret.TouchEvent.TOUCH_TAP,this.processHandle,this);
                    this._proObjArr.push(img);
                    if(this._proEffImg1[i])
                    {
                        egret.Tween.removeTweens(this._proEffImg1[i]);
                        this._proEffImg1[i].dispose();
                        this._proEffImg1[i] = null;
                    }
                    if(this._proEffImg2[i])
                    {
                        egret.Tween.removeTweens(this._proEffImg2[i]);
                        this._proEffImg2[i].dispose();
                        this._proEffImg2[i] = null;
                    }                    
                }else if(this.vo.getProcess() >= achItems[i].needNum)
                {
                    let x = achItems[i].needNum/maxNeed * width + this._progressBar.x;
                    if(!this._proEffImg1[i])
                    {
                        this._proEffImg1[i] = BaseBitmap.create("chess_glow");
                        this._proEffImg1[i].anchorOffsetX = this._proEffImg1[i].width/2;
                        this._proEffImg1[i].anchorOffsetY = this._proEffImg1[i].height/2;
                        this._proEffImg1[i].x = x;
                        this._proEffImg1[i].y = this._progressBar.y + 20;
                        this.addChild(this._proEffImg1[i]);
                        egret.Tween.get(this._proEffImg1[i], {loop:true}).to({rotation:360},8000);
                    }
                    let img = BaseBitmap.create("acchess_qibtn");
                    img.touchEnabled = true;
                    img.anchorOffsetX = img.width/2;
                    img.x = x;
                    img.y = this._progressBar.y;
                    this.addChild(img);
                    img["nameIndex"] = achItems[i].id;
                    img.addEventListener(egret.TouchEvent.TOUCH_TAP,this.processHandle,this);
                    this._proObjArr.push(img);
                    if(!this._proEffImg2[i])
                    {
                        this._proEffImg2[i] = BaseBitmap.create("chess_guanglow");
                        this._proEffImg2[i].anchorOffsetX = this._proEffImg2[i].width/2;
                        this._proEffImg2[i].anchorOffsetY = this._proEffImg2[i].height/2;
                        this._proEffImg2[i].x = x;
                        this._proEffImg2[i].y = this._progressBar.y + 20;
                        this.addChild(this._proEffImg2[i]);
                        egret.Tween.get(this._proEffImg2[i],{loop:true}).to({alpha:0.2},1000).to({alpha:1},1000);                       
                    }else
                    {
                        this.setChildIndex(this._proEffImg2[i],this.getChildIndex(img)+1);
                    }
                }else
                {
                    let img = BaseBitmap.create("acchess_qibtnhui");
                    img.touchEnabled = true;
                    img.anchorOffsetX = img.width/2;
                    img.x = achItems[i].needNum/maxNeed * width + this._progressBar.x;
                    img.y = this._progressBar.y;
                    this.addChild(img);
                    img["nameIndex"] = achItems[i].id;
                    img.addEventListener(egret.TouchEvent.TOUCH_TAP,this.processHandle,this);
                    this._proObjArr.push(img);
                }
            }
        }
    }
    private processHandle(e:egret.TouchEvent):void
    {
        let n = (e.currentTarget)["nameIndex"];
        AcChessView.IS_SHOW_PROCESS = n;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSREWARDPOPVIEWTAB2, {
            aid: this.aid, 
            code: this.code,
        });
    }

    private _chessIconArr:BaseBitmap[] = [];
    private _tempTimes:number=0;
    private _tempCheckerboard:number=1;
    private _isTen:boolean=false;
    private freshQizi(isFirst=true,isFinish=false):void
    {
        if(!this._chessIconArr)
        {
            this._chessIconArr = [];
        }
        let initPos:egret.Point = new egret.Point(this._panPos.x + 12+21/2, this._panPos.y + 14+24/2);
        let cellX = 24;
        let cellY = 24;

        let posObj = this.cfg.checkerBoard[this.vo.checkerboard-1];
        let num = this.vo.getTimes()*2;
        if(isFinish)
        {
            posObj = this.cfg.checkerBoard[this._tempCheckerboard-1];
            // num = this._tempTimes*2+1;
            num = (this._tempTimes+(10-this.vo.getTimes()))*2-1;
        }
        for(let i = 1; i <= num; i++)
        {
            if(posObj[i])
            {
                if(this._chessIconArr[i-1] && this._chessIconArr[i-1].visible)
                {
                    continue;
                }
                let chessIcon:BaseBitmap;
                if(this._chessIconArr[i-1] && !this._chessIconArr[i-1].visible)
                {
                    chessIcon = this._chessIconArr[i-1];
                    chessIcon.visible = true;
                }else
                {
                    if(i%2 != 0)   //我下的--黑棋
                    {
                        chessIcon = BaseBitmap.create("chess_icon1");
                        chessIcon.anchorOffsetX = chessIcon.width/2;
                        chessIcon.anchorOffsetY = chessIcon.height/2;
                        this.addChild(chessIcon);
                    }else          //电脑下的--白棋
                    {
                        chessIcon = BaseBitmap.create("chess_icon2");
                        chessIcon.anchorOffsetX = chessIcon.width/2;
                        chessIcon.anchorOffsetY = chessIcon.height/2;
                        this.addChild(chessIcon);
                    }
                    this._chessIconArr.push(chessIcon);
                }
                let px = initPos.x + cellX*(posObj[i]["coordinate"][0]-1);
                let py = initPos.y + cellY*(posObj[i]["coordinate"][1]-1);
                if(isFirst)
                {
                    chessIcon.x = px;
                    chessIcon.y = py;
                }else
                {
                    chessIcon.alpha = 0;
                    this.showQiziEffect(chessIcon,px,py,isFinish);
                }
            }
        }
    }
    private chessBtnHandle1():void
    {
        this.chessBtnHandle(1);
    }
    private chessBtnHandle10():void
    {
        this.chessBtnHandle(2);
    }
    private chessBtnHandle(type:number):void
    {
        if(this._isQiziEffect)
        {
            return;
        }
        if (!this.vo.isInActivity()) 
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }       
        if (this.vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }         
        let cost = type == 1 ? this.cfg.cost1 : this.cfg.cost10;
        if(type == 1 && this.vo.isfree > 0)
        {
            cost = 0;
        }
        let have = Api.playerVoApi.getPlayerGem();
        if(have < cost)
        {
            let message: string = LanguageManager.getlocal("acChess_notbuy");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : message,
                title : "itemUseConstPopupViewTitle",
                touchMaskClose : true,
                callback : ()=>
                {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, {rechargeId: cost});
                },
                handler : this,
                needClose : 1,
                needCancel : true
            });
            return;
        }
        this._tempTimes = this.vo.getTimes();
        this._tempCheckerboard = this.vo.checkerboard;
        this._isTen = type != 1;
        this.request(NetRequestConst.REQUEST_CHESS_PLAY, 
        {
            activeId: this.vo.aidAndCode,
            isFree:(this.vo.isfree > 0 && type == 1) ? 1 : 0,
            isTenPlay:type == 1 ? 0 : 1
        });        
    }

    private _tempAwards:any=null;
    //请求回调
    protected receiveData(data: { ret: boolean, data: any }): void {
        if (!data.ret) 
        {
            App.CommonUtil.showTip(data.data.ret);
        }
        // ViewController.getInstance().openView(ViewConst.COMMON.ACFINDSAMEGAMEVIEW, { "aid": this.aid, "code": this.code });
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_CHESS_PLAY) 
        {
            this.freshFreeLab();
            this.freshProcess();
            this.refreshRed();
            if(data.data.data.rewards)
            {
                this._tempAwards = data.data.data.rewards;
            }
            if(data.data.data.fullFlag)
            {
                this.freshQizi(false,true);
            }else
            {
                this.freshQizi(false);
            }       
        }
    }

    private _waitObjArr:any[] = null;
    private _isQiziEffect:boolean = false;
    private showQiziEffect(qizi:egret.DisplayObject,px:number,py:number,isFinish=false):void
    {
        if(this._isQiziEffect)
        {
            if(this._waitObjArr == null)
            {
                this._waitObjArr = [];
            }
            this._waitObjArr.push({qz:qizi,x:px,y:py});
        }else
        {
            this._isQiziEffect = true;
            qizi.alpha = 0;
            qizi.scaleX = qizi.scaleY = 0;
            qizi.x = px;
            qizi.y = py - 60;
            let time = this._isTen ? 150 : 1000;
            egret.Tween.get(qizi).to({alpha:1,scaleX:1,scaleY:1,y:py},time).call(()=>
            {
                egret.Tween.removeTweens(qizi);
                if(this._waitObjArr && this._waitObjArr.length > 0)
                {
                    this._isQiziEffect = false;
                    this.showQiziEffect(this._waitObjArr[0].qz,this._waitObjArr[0].x,this._waitObjArr[0].y,isFinish);
                    this._waitObjArr.shift();
                }else
                {
                    this._isQiziEffect = false;
                    if(isFinish)
                    {
                        this._isQiziEffect = true;
                        this.showWin();
                    }else
                    {
                        if(this._tempAwards)
                        {
                            if(this._isTen)
                            {
                                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this.countRewards(this._tempAwards),"isPlayAni":true, "callback":null, "handler":null});
                            }else
                            {
                                let rewardVoList = GameData.formatRewardItem(this._tempAwards);
                                App.CommonUtil.playRewardFlyAction(rewardVoList);
                            }
                        }
                    }
                }
            },this);
        }
    }
    private countRewards(rewards:any):any
    {
        let strArr:string[] = rewards.split("|");
        let obj = {};
        let typeObj = {};
        for(let i = 0; i < strArr.length; i++)
        {
            let arr = strArr[i].split("_");
            if(obj[arr[1]])
            {
                obj[arr[1]] += parseInt(arr[2]);
            }else
            {
                obj[arr[1]] = parseInt(arr[2]);
            }
            typeObj[arr[1]] = arr[0];
        }

        let itemArr:string[] = [];
        for(let item in obj)
        {
            itemArr.push(typeObj[item]+"_"+item+"_"+obj[item]);
        }
        itemArr.sort((a:string,b:string)=>
        {
            if(a.split("_")[1] == "2284" && b.split("_")[1] != "2284")
            {
                return -1;
            }
            if(a.split("_")[1] != "2284" && b.split("_")[1] == "2284")
            {
                return 1;
            }            
            return 0;
        });
        return itemArr.join("|");
    }
    private showWin():void
    {
        let img = BaseBitmap.create("acchess_win");
        img.anchorOffsetX = img.width/2;
        img.anchorOffsetY = img.height/2;
        img.x = GameConfig.stageWidth/2;
        img.y = 350;
        this.addChild(img);
        img.alpha = 0;
        img.scaleX = img.scaleY = 0;
        egret.Tween.get(img).to({alpha:1,scaleX:1.3,scaleY:1.3},2000).call(()=>
        {
            egret.Tween.removeTweens(img);
            if(this._tempAwards)
            {
                img.dispose();
                img = null;
                if(this._isTen)
                {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this.countRewards(this._tempAwards),"isPlayAni":true, "callback":this.handleGet, "handler":this});
                }else
                {
                    let rewardVoList = GameData.formatRewardItem(this._tempAwards);
                    App.CommonUtil.playRewardFlyAction(rewardVoList);  
                    this.handleGet();                 
                }
            }else
            {
                img.dispose();
                img = null;
                this.handleGet();
            }
            this._isQiziEffect = false;
        });
    }
    private handleGet():void
    {
		let tmpmask:BaseShape=new BaseShape();
        tmpmask.graphics.beginFill(0,0.6);
        tmpmask.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
        tmpmask.graphics.endFill();
        this.addChild(tmpmask);
        tmpmask.touchEnabled = true;

        let img = BaseBitmap.create("chess_qiguan");
        img.anchorOffsetX = img.width/2;
        img.anchorOffsetY = img.height;
        this.addChild(img);
        img.x = GameConfig.stageWidth/2;
        img.y = this.height/2-20;

        let effect = ComponentManager.getCustomMovieClip("qiluo_", 8, 100);
        effect.x = 100;
        effect.y = 150;
        this.addChild(effect);
        effect.playWithTime(2);

        egret.Tween.get(img).wait(200).to({rotation:-2},200).to({rotation:2},200).to({rotation:0},200).call(()=>
        {
            egret.Tween.removeTweens(img);
            for(let i = 0; i < this._chessIconArr.length; i++)
            {
                this._chessIconArr[i].visible = false;
            }        
            this.freshQizi();
            tmpmask.dispose();
            tmpmask = null;
            img.dispose();
            img = null;
            effect.dispose();
            effect = null;
        });

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
    protected getResourceList(): string[] {
        let codeRes = this.getDefaultResList([
            "acchess_bg",
            "acchess_desk",
            "acchess_title",
            "acchess_detailbtn",
        ])
        let baseList = [
            "acchess_processbg",
            "acchess_qibtn",
            "acchess_qibtnhui",
            "acchess_qibtnnull",
            "chess_icon1",
            "chess_icon2","acchess_exchange2",
            "chess_pan","acchess_qihe1","acchess_qihe2",
            "luckydrawwordbg","arena_bottom",
            'progress12','progress12_bg',
            "itemicon1","luckydrawrewardword-2",
            "acsearchproofview_common_skintxt",
            "story_bg6","acchess_win","chess_qiguan","chess_glow","chess_guanglow",
            "qiluo_1","qiluo_2","qiluo_3","qiluo_4","qiluo_5","qiluo_6","qiluo_7","qiluo_8",
        ];
        let codeList = null;
        if (this.code == "1") {
            codeList = [
            ]
        }
        return super.getResourceList().concat(baseList).concat(codeList).concat(codeRes);
    }
    private refreshRed() 
    {
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward() || this.vo.isShowTaskRewardRedDot())
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let detailRed = <BaseBitmap>this._detailBtn.getChildByName("reddot");
            if (detailRed){
                detailRed.setPosition(70, 0);
            }
        }else
        {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        if(this.vo.showExchangeDot())
        {
            App.CommonUtil.addIconToBDOC(this);
            let dot = <BaseBitmap>this.getChildByName("reddot");
            if(dot)
            {
                dot.setPosition(190,GameConfig.stageHeigth-275);
            }
        }else
        {
            App.CommonUtil.removeIconFromBDOC(this);
        }
        if(this.vo.isCangetAchieveReward())
        {
            this._boxRewardImg.setRes("acchess_qihe2");
        }else
        {
            this._boxRewardImg.setRes("acchess_qihe1");
        }

        let str:string = this.cfg.change.needItem;
        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        let have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
        this._haveTxt.text = String(have);

        let limitleft = this.cfg.sepcialLimit - this.vo.slimit;
        let limitstr = limitleft > 0 ? "acChessLimitDesc" : "acChessLimitDesc2";
        this._limitTxt.text = LanguageManager.getlocal(limitstr,[String(limitleft)]);
        this._limitTxt.x = this._haveTxt.x + this._haveTxt.width + 2;
    }

    private showEffect():void
    {
        let view = this;
        //门客
        let servantNeedMoney = 10;
        let wifeNeedMoney = 30;

        let servantSkinId = this.cfg.show1;
        let wifeSkinId = this.cfg.show2;
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(servantSkinId);
        let boneName = undefined;
        if (skinCfg && skinCfg.bone) 
        {
            boneName = skinCfg.bone + "_ske";
        }
        
        let servantBaseCon = new BaseDisplayObjectContainer();
        view.addChild(servantBaseCon);

        let fun1 = ()=>
        {
            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.setPosition(150-104, GameConfig.stageHeigth-320);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            servantBaseCon.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            skinTxtEffect.addTouchTap(() => 
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSSKINPOPUPVIEW, { 
                    wifeId: wifeSkinId, //this.cfg.show2,
                    servantId:servantSkinId,   //this.cfg.show1,
                    wifeNeedText: "acchessShowWifeTopMsg-"+this.code,
                    servantNeedText: "acchessShowServentTopMsg-"+this.code,
                    wifeNeed: "",
                    servantNeed: "",
                    isShowWife:false
                });
            }, this);

            let skinTxt1 = BaseBitmap.create("acchess_exchange2");
            skinTxt1.setPosition(skinTxtEffect.x+skinTxtEffect.width/2-skinTxt1.width/2+105, skinTxtEffect.y+skinTxtEffect.height/2-skinTxt1.height/2+77);
            servantBaseCon.addChild(skinTxt1);
            egret.Tween.get(skinTxt1, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

            let skinTxteffect = BaseBitmap.create("acchess_exchange2");
            skinTxteffect.setPosition(skinTxt1.x,skinTxt1.y);
            servantBaseCon.addChild(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) 
        {
            ResourceManager.loadResources(this.getBonesResArr(skinCfg.bone),null,()=>
            {
                let servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                servantBaseCon.addChild(servant);
                servant.setScale(0.8);
                servant.setPosition(110,GameConfig.stageHeigth-230+this.resetPosY());
                fun1();
            },null,this);
        }else
        {
            let servant = BaseLoadBitmap.create(skinCfg.body);
            servantBaseCon.addChild(servant);
            servant.setScale(0.85);
            servant.scaleX = -0.85;
            servant.setPosition(305,GameConfig.stageHeigth-595+this.resetPosY());
            fun1();
        }

        //佳人
        let wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinId);
        if (wifeSkinCfg && wifeSkinCfg.bone)
        {
            boneName = wifeSkinCfg.bone + "_ske";
        }
        let baseCon = new BaseDisplayObjectContainer();
        view.addChild(baseCon);
        let fun2 = ()=>
        {
            let skinTxtEffect2 = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect2.setPosition(480-104, GameConfig.stageHeigth-320);
            skinTxtEffect2.blendMode = egret.BlendMode.ADD;
            baseCon.addChild(skinTxtEffect2);
            skinTxtEffect2.playWithTime(-1);
            skinTxtEffect2.addTouchTap(() => 
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSSKINPOPUPVIEW, { 
                    wifeId: wifeSkinId, //this.cfg.show2,
                    servantId:servantSkinId,   //this.cfg.show1,
                    wifeNeedText: "acchessShowWifeTopMsg-"+this.code,
                    servantNeedText: "acchessShowServentTopMsg-"+this.code,
                    wifeNeed: ""+wifeNeedMoney,
                    servantNeed: ""+servantNeedMoney,
                    isShowWife:true
                });
            }, this);            

            let skinTxt3 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt3.setPosition(skinTxtEffect2.x+skinTxtEffect2.width/2-skinTxt3.width/2+105, skinTxtEffect2.y+skinTxtEffect2.height/2-skinTxt3.height/2+75);
            baseCon.addChild(skinTxt3);
            egret.Tween.get(skinTxt3, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

            let skinTxt4 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt4.setPosition(skinTxt3.x,skinTxt3.y);
            baseCon.addChild(skinTxt4);
            skinTxt4.blendMode = egret.BlendMode.ADD;
            skinTxt4.alpha = 0;
            egret.Tween.get(skinTxt4, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

        }
        if (wifeSkinCfg && (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) 
        {
            ResourceManager.loadResources(this.getBonesResArr(wifeSkinCfg.bone),null,()=>
            {
                let wife = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
                wife.anchorOffsetX = wife.width / 2;
                wife.anchorOffsetY = wife.height;
                baseCon.addChild(wife);
                wife.setPosition(0,0);
                wife.setScale(0.65);
                wife.setPosition(525,GameConfig.stageHeigth-190+this.resetPosY());
                fun2(); 
            },null,this);            
        }else
        {
            let wife = BaseLoadBitmap.create(wifeSkinCfg.body);
            baseCon.addChild(wife);
            wife.anchorOffsetX = wife.width / 2;
            wife.anchorOffsetY = wife.height;
            wife.setPosition(0,0);
            wife.setScale(0.65);
            wife.setPosition(330,GameConfig.stageHeigth-650+this.resetPosY()); 
            fun2(); 
        }
   }

   private resetPosY():number
   {
       return (1136-GameConfig.stageHeigth)/2;
   }

   	private getBonesResArr(name:string):string[]
	{
		return [name+"_ske",name+"_tex_json",name+"_tex_png"];
	}

    private tick() 
    {
        this._timeTxt.setString(this.vo.acCountDown);
        this._timeTxt.x = this._timebgx + this._timebgwidth/2 - this._timeTxt.width/2;
    }
    private get cfg(): Config.AcCfg.ChessCfg 
    {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcChessVo {
        return <AcChessVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId(): string {
        return `${AcChessView.AID}-${AcChessView.CODE}`;
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
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }     
    private showStartDialog():void
    {
        let localkey:string = this.vo.aidAndCode + Api.playerVoApi.getPlayerID()+"dialog";
        let lastTime:number = 0;
        let timeStr:string = LocalStorageManager.get(localkey);
        if (timeStr && timeStr!="")
        {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.vo.et)
        {	
            this.chessShowView();
            return;
        }
        LocalStorageManager.set(localkey, String(this.vo.et));
        let view = this;
        let keyStr = "startDialog_"+this.TypeCode;
        let startCfg = view.cfg[keyStr];
        let bgName = "story_bg6";
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,
        {
            aid : view.aid,
            code : ""+view.TypeCode,
            AVGDialog : startCfg,
            visitId : "1",
            talkKey: "acChessStartTalk_",
            bgName: bgName,
            callBack:this.chessShowView,
        });
    }      
    private chessShowView():void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSSHOWVIEW,{
            aid : this.aid,
            code : ""+this.code,
            pnode:this
        });
    }
    public dispose(): void {
        super.dispose();      
        this._waitObjArr = null;
        this._isQiziEffect = false;
        this._haveTxt = null;
        this._limitTxt = null;
        if(this._proObjArr)
        {
            for(let i = 0; i < this._proObjArr.length; i++)
            {
                if(this._proObjArr[i])
                {
                    this._proObjArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.processHandle,this);
                }
                if(this._proObjArr[i].parent)
                {
                    this._proObjArr[i].parent.removeChild(this._proObjArr[i]);
                }
                this._proObjArr[i] = null;
            }
            this._proObjArr = null;
        }
        for(let i = 0; i < this._proEffImg1.length; i++)
        {
            if(this._proEffImg1[i])
            {
                egret.Tween.removeTweens(this._proEffImg1[i]);
                this._proEffImg1[i].dispose();
                this._proEffImg1[i] = null;
            }
        }
        for(let i = 0; i < this._proEffImg2.length; i++)
        {
            if(this._proEffImg2[i])
            {
                egret.Tween.removeTweens(this._proEffImg2[i]);
                this._proEffImg2[i].dispose();
                this._proEffImg2[i] = null;
            }
        }        
        for(let i = 0; i < this._chessIconArr.length; i++)
        {
            this._chessIconArr[i].dispose();
            this._chessIconArr[i] = null;
        }
        this._chessIconArr = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshRed, this);   
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHESS_GETNUMREWARDS, this.freshProcess, this);   
    }
}