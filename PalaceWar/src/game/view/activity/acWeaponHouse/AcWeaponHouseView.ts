/**
* 神兵宝库
* date 2020.6.10
* author yangtao
* @name AcWeaponHouseView
*/
class AcWeaponHouseView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _timeTxt:BaseTextField = null;
    private _scrollView:ScrollView = null;
    private _proContainer:BaseDisplayObjectContainer = null;
    private _toolNum:BaseTextField = null;
    private _freeDesc:BaseTextField = null;
    private _onceNeedContainer:BaseDisplayObjectContainer = null;
    private _boxList:any[] = [];
    private _lightList:any[] = [];
    private _isPlayTen:boolean = false;
    private _isPlay:boolean = false;
    private _isMove:boolean = false;
    private _processContainer:BaseDisplayObjectContainer = null;
    private _processNum:BaseTextField = null;
    private _progressBar:ProgressBar = null;
    
    private _proLight:BaseBitmap = null;
    private _rewardData:any = null;
    private _detailBtn:BaseButton = null;
    private _rechargeTip:BaseTextField = null;
    private spendexplain:BaseTextField = null;
    private spendNum:BaseTextField = null;
    private _boxGroup:BaseDisplayObjectContainer = null;
    private _startPoint: egret.Point;//开始
    private _endPoint: egret.Point;//结束
    private items: GridItemData[][] = [[], [], [], []];
    private powerTitle:BaseTextField = null;
    private buyPowerTitle:BaseTextField = null;
    private checkBox:CheckBox = null;
    private moveType:number = 1;
    private lvArr = [];
    private map = [];
    private running: number = 0;
    private record: number = 0;
    private bestRecord: number = 0;
    private _nowscore:BaseTextField = null;
    private _clickHand:BaseBitmap = null;
    private buyBtn:BaseButton=null;
    private phytext:number;
    private showHand:BaseBitmap = null;

    private timeDescText:BaseTextField = null;
    private timeDescBg:BaseBitmap = null;
    private _isFrist:boolean = false;
    private _isFirstMove:boolean = false;
    private _addNum:number = 0;//用于计数引导步数
    private _time:number = 50000;

    /** 玩家无操作提示玩家的定时任务的句柄 */
    private tipHandler: false | number = false;


    public constructor() {
        super();
    }

    protected getBgName():string{
        return App.CommonUtil.getResByCode("linkgame_bg_enter", this.getUiCode());
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return App.CommonUtil.getResByCode("ac_weaponhouse_title", this.getUiCode());
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return '1';
    }
    protected getExtraRuleInfo():string{
		return LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouseRuleInfo", this.getUiCode()), [String(this.cfg.costTime),String(this.cfg.baseScore)]);
	}
    

    protected getRuleInfoParam():string[]{
        return [""];
    }

    protected getProbablyInfo():string{
        return App.CommonUtil.getCnByCode("acWeaponHouseProbablyInfo", this.getUiCode());
    }

    protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "acliangbiographyview_common_acbg","palace_bg4","searchnpc_full92","public_9_bg11",
            "acweaponhousecode1", "acweaponhousecode"+this.getUiCode(),
           
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

    private get vo():AcWeaponHouseVo{
        return <AcWeaponHouseVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponHouseCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    //进度 间距
    private get progressOffX():number{
        return 80;
    }

    //物品数量
    private getLightNum():number{
        return 9;
    }

    public initView():void{
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_MOVE, this.lotteryCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_BUYNUM, this.reGameCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_RESETMAP, this.reCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_END2,this.doGuide,this);
        let infoBg = BaseBitmap.create(`acliangbiographyview_common_acbg`);
        infoBg.width = GameConfig.stageWidth;
        infoBg.setPosition(this.titleBg.x + this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height);
        this.addChildToContainer(infoBg);

        this._isFirstMove = true;
        
        //活动时间   
        let dateText = ComponentManager.getTextField(LanguageManager.getlocal("acComm_time", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        dateText.x = infoBg.x + 30;
        dateText.y = infoBg.y + 10;
        this.addChildToContainer(dateText);

        //活动文本
        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouseDescInfo", this.getUiCode())), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        descTxt.width = 580;
        descTxt.lineSpacing = 4;
        descTxt.x = infoBg.x + 30;
        descTxt.y = infoBg.y + infoBg.height + 10 + dateText.height;
        this.addChildToContainer(descTxt);

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoBg, view.container, [0,-3], true);
        if(PlatformManager.checkIsThSp())
        {
            infoBg.height = descTxt.y + descTxt.height + 20 - infoBg.y;
        }else
        {
            infoBg.height = descTxt.height + 5 + 50 + descTxt.height + dateText.height + dateText.height;
        }
        //倒计时
        this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - 17 - this._timeBg.height / 2;
        this._timeBg.width = this._timeTxt.width + 40+28;
       
		this.addChildToContainer(this._timeBg);
        this.addChildToContainer(this._timeTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this._timeBg, infoBg, [40,-10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._timeTxt, this._timeBg);
        
        //底部按钮背景
        let btnBg = BaseBitmap.create(App.CommonUtil.getResByCode("ac_weaponhouse_btn_bg", this.getUiCode()));
        btnBg.setPosition(this.titleBg.x + this.titleBg.width/2 - btnBg.width/2, view.height - btnBg.height);
        this.addChildToContainer(btnBg);

        //棋盘背景  
        this._boxGroup = new BaseDisplayObjectContainer();
        let checker = BaseBitmap.create(App.CommonUtil.getResByCode("ac_weaponhouse_checker_bg", this.getUiCode()));
        this._boxGroup.width = checker.width;
        this._boxGroup.height = checker.height;
        this._boxGroup.setPosition(this.titleBg.x + this.titleBg.width/2 - this._boxGroup.width/2, infoBg.y + infoBg.height+10);
        this.addChildToContainer(this._boxGroup);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._boxGroup, view, [0,infoBg.y + infoBg.height - 7]);
        this._boxGroup.addChild(checker);
        this._boxGroup.touchEnabled = true;
        this._boxGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onclick, this);
        
        //个人积分
        this._nowscore = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_myScore_title", this.getUiCode()), [this.vo.getScoreNum()+""]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.addChildToContainer(this._nowscore);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._nowscore, this._boxGroup, [0,21]);

        //重置按钮
        let resetBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("ac_weaponhouse_re_btn", this.getUiCode()),"", ()=>{
            if (!this.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (this.vo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(this.vo.step<5)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_stepOpenRe", this.getUiCode())));
            }else{
                let str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acWeaponHouse_reTurnPlay_title`, this.getUiCode()));
                view.rePlayBtnClick(str);
            }
            
        },view);
        resetBtn.setPosition(this._boxGroup.x-resetBtn.width + 20, this._boxGroup.y);
        this.addChildToContainer(resetBtn);
        
        //奖励按钮
        this._detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("ac_weaponhouse_award_btn", this.getUiCode()),"", ()=>{
            if(this.vo.isInAct())
            {
                NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEALLLIST, { activeId: this.vo.aidAndCode });
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONHOUSEPOPUPVIEW, {aid:this.aid, code:this.code});

        },view);
        this.addChildToContainer(this._detailBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._detailBtn, btnBg, [5,-93]);

        //排行榜按钮
        let rankBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("ac_weaponhouse_rank_btn", this.getUiCode()),"", ()=>{
             ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONHOUSERANKPOPUPVIEW, {aid:this.aid, code:this.code});
        },view);
        this.addChildToContainer(rankBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rankBtn, btnBg, [5,-93]);

        //倒计时
        this.timeDescText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rePhyTime", this.getUiCode()), [this.vo.getDuTime(),"1"]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.timeDescText.lineSpacing = 5;
        this.timeDescText.width = 230;
        this.timeDescText.textAlign = egret.HorizontalAlign.CENTER;

		this.timeDescBg = BaseBitmap.create("public_9_bg11");
		this.timeDescBg.width = 260;
        this.timeDescBg.height = 42;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang()){
            this.timeDescBg.height = 50;
        }
		this.addChildToContainer(this.timeDescBg);
        this.addChildToContainer(this.timeDescText);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this.timeDescBg, btnBg, [100,-38]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this.timeDescText, this.timeDescBg);	

        this.powerTitle = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_phy_title", this.getUiCode()), [this.vo.rePhy()+""]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(this.powerTitle);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this.powerTitle, btnBg, [130,28]);

        this.buyPowerTitle = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_buy_title", this.getUiCode()), [this.vo.v+""]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(this.buyPowerTitle);
        this.buyPowerTitle.setPosition(btnBg.width/2+60, this.powerTitle.y);
        
        this.checkBox=ComponentManager.getCheckBox("");
        this.addChildToContainer(this.checkBox);
        this.checkBox.addTouchTap(this.onCheckClick,this);

        let tenTitle = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_phyGetTen_title", this.getUiCode())), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(tenTitle);

        this.buyBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("ac_weaponhouse_btn", this.getUiCode()),"",  ()=>{
            let siTen = 0;
            let gemnum = 0;
            if (!this.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (this.vo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(this.checkBox.checkSelected())
            {
                this.phytext = 100;
                siTen = 1;
                gemnum = this.vo.showGoldNumTen();
            }else{
                this.phytext = 10;
                siTen = 0;
                gemnum = this.vo.shouGoldNum();
            }	
            if(Api.playerVoApi.getPlayerGem() < gemnum)
            {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_Notenoughdes_title", this.getUiCode())),
                    touchMaskClose : false,
                    title : `itemUseConstPopupViewTitle`,
                    callback : ()=>{
                        //前往充值
                        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                    },
                    handle : this,
                    needClose : 1,
                    needCancel : true,
                    confirmTxt : `confirmBtn`,
                    // recommand : false
                });		

            }else{
                NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_BUYNUM, {activeId: this.vo.aidAndCode,isTenPlay:siTen});
            }
        }, view);
        this.addChildToContainer(this.buyBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.buyBtn, btnBg, [0,10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this.checkBox, this.buyBtn, [-(this.checkBox.width + 10),-10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, tenTitle, this.buyBtn, [-(tenTitle.width + 10),30]);
        let shoeBg = BaseLoadBitmap.create("itemicon1");
        shoeBg.scaleX = 0.5;
        shoeBg.scaleY = 0.5;
        this.addChildToContainer(shoeBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, shoeBg, this.buyBtn, [-40,5]);

        this.spendNum = ComponentManager.getTextField("200", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(this.spendNum);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.spendNum, this.buyBtn, [30,25]);

        this.spendexplain = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_pay_title", this.getUiCode()), ["10"]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(this.spendexplain);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.spendexplain, this.buyBtn, [0,20]);
        this.reMapDataGrids();
        this.refreshView();
        this.showStartDialog();
        this.speedNum(1);
        this.showHand = BaseBitmap.create("guide_hand");
        this._boxGroup.addChild(this.showHand);
        this.showHand.visible = false;
        if(this._isFrist)
        {
            this.isShowTipHand();
        }
    }
    private doGuide(){
        this.isShowTipHand();
    }

       /**新游戏 */
    private resetGrids() {
        /**清空 */
        for (let i = 0; i < this.items.length; i++) {
            for (let j: number = 0; j < this.items[i].length; j++) {
                if (this.items[i][j].item) {
                    this.items[i][j].item.resetItem(String(1));;
                    this.items[i][j].value = 0;
                    this.removeFromParent(this.items[i][j].item);

                }
            }
         }
        /**新建 */
        for (let i = 0; i < this.items.length; i++) {
            for (let j: number = 0; j < 4; j++) {
                if (!this.items[i]) this.items[i] = [];
                let data: GridItemData = new GridItemData();
                data.value = 0;
                data.i = 0;
                data.j = 0;
                this.items[i][j] = data;
                this.items[i][j].i = i;
                this.items[i][j].j = j;
            }
        }
    }

     /**滑动事件 */
    private onclick(e: egret.TouchEvent): void {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                this._startPoint = new egret.Point(e.stageX, e.stageY);
                this._boxGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onclick, this);
            } else if (e.type == egret.TouchEvent.TOUCH_MOVE) {
                this._endPoint = new egret.Point(e.stageX, e.stageY);
                let disX: number = this._endPoint.x - this._startPoint.x;
                let disY: number = this._endPoint.y - this._startPoint.y;
                //方向区分不太明确，忽略操作
                if (Math.abs(disX - disY) <= 40 || this._netFlag) {
                    return;
                }
                // 0:上, 1:右, 2:下, 3:左
                let direction: number = Math.abs(disX) > Math.abs(disY) ? (disX > 0 ? 1 : 3) : (disY > 0 ? 2 : 0);
                this.isMove(direction);
                this._boxGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onclick, this);
            }
    }

    // 根据滑动方向生成list的四个数组（方便计算）
    private formList(dir): GridItemData[][] {
        let list: GridItemData[][] = [[], [], [], []];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                switch (dir) {
                    case 0:
                        list[i].push(this.items[j][i]);
                        break;
                    case 1:
                        list[i].push(this.items[i][3 - j]);
                        break;
                    case 2:
                        list[i].push(this.items[3 - j][i]);
                        break;
                    case 3:
                        list[i].push(this.items[i][j]);
                        break;
                }
            }
        }
        return list;
    }
     /**
     * 随机创建数字
     * @param size 数量
     */
    public addNewGrids(size: number,isFirst=false): void 
    {
        if (!this.isOver()) 
        {
            if(!isFirst && !this._moveFlag)
            {
                return;
            }
            for (let i: number = 0; i < size; i++) {
                let cells: GridItemData = this.selectCell();
                if (!cells) 
                {
                    return;
                }
                /**为2的概率 */
                let num: number = Math.random() < this.cfg.refreshRatio[0] ? 1 : 2;
                let grid: AcWeaponHouseItem = new AcWeaponHouseItem({aid: num, code: this.code});
                grid.resetItem(String(num));
                grid.x = cells.disX;
                grid.y = cells.disY;
                this._boxGroup.addChild(grid);
                this.items[cells.i][cells.j].item = grid;
                this.items[cells.i][cells.j].value = num;
            }
            if(this._moveFlag)
            {
                this.getMapData();
                if(this._isMove)
                {
                    let sendArr = this.lvArr[this._netCount] ? this.lvArr[this._netCount] : [];
                    this._netCount++;
                    NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_MOVE, {activeId: this.vo.aidAndCode,map:this.map,lvArr:sendArr});
                    this.regTipCell(true);
                }
                this._isMove = false;               
                this._moveFlag = false;
            }
        }
    }
    //测试
     public addNewGrids11(size: number): void {
        if (!this.isOver()) {
            for (let i: number = 0; i < size; i++) {
                let cells: GridItemData = this.selectCell();
                if (!cells) return;
                /**为2的概率 */
                let num: number = 11;
                let grid: AcWeaponHouseItem = new AcWeaponHouseItem({aid: num, code: this.code});
                grid.resetItem(String(num));
                grid.x = cells.disX;
                grid.y = cells.disY;
                this._boxGroup.addChild(grid);
                this.items[cells.i][cells.j].item = grid;
                this.items[cells.i][cells.j].value = num;
            }
        }
    }

        /**随机获取一个格子数据 */
    private selectCell(): GridItemData {
        let cells: GridItemData[] = this.usefulCell();
        /**随机获取 */
        if (cells.length) {
            return cells[Math.floor(Math.random() * cells.length)];
        }
    }

    private _moveFlag = false;
    private _netFlag = false;
    private isMove(type)
    {
        if(this.showHand)
        {
            this.showHand.visible = false;
            egret.Tween.removeTweens(this.showHand);
        }
        this._isMove = false;
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }	
        if(this.vo.isFree())
        {
            this._moveFlag = true;
            this.doMove(type);
            
        }else{
            this.addGamePhy();
        }
    }

    private _moveCount = 0;
    private _netCount = 0;

    private doMove(type): void {
        if (this.isOver()) return;
        if(!this.lvArr)
        {
            this.lvArr = [];
        }
        this.lvArr[this._moveCount] = [];
        this._moveCount++;
        let arr: GridItemData[][] = this.formList(type);
        let nextI: number;
        for (let i: number = 0; i < arr.length; i++) {
            for (let j: number = 0; j < arr[i].length; j++) {
                nextI = -1;
                for (let m: number = j + 1; m < arr[i].length; m++) {
                    if (arr[i][m].value != 0) {
                        nextI = m;
                        break;
                    }
                }
                if (nextI !== -1) {
                    let curData: GridItemData = arr[i][j];
                    let nextData: GridItemData = arr[i][nextI];
                    let time = Math.abs(j - nextI) * 60;
                    if (curData.value == 0) {
                        this.running += 1;
                        let value: number = nextData.value;
                        curData.value = value;
                        curData.item = nextData.item;
                        nextData.item = null;
                        nextData.value = 0;
                        j--;
                        this._isMove = true;
                        egret.Tween.get(curData.item).to({ x: curData.disX, y: curData.disY }, time).call(() => {
                            this.running -= 1;
                            if (this.running <= 0) {
                                this.addNewGrids(1);
                            }
                        }, this);
                    } else if (curData.value == nextData.value) {
                        if((curData.value == 11)&&(nextData.value == 11))
                        {
                            // this.running -= 1;
                            // this._isMove = true;
                            // if (this.running <= 0)
                            // {
                            //     let t = egret.setTimeout(()=>
                            //     {
                            //         egret.clearTimeout(t);
                            //         this.addNewGrids(1);
                            //     },this,310);
                            // }
                            continue;
                        }
                        this.running += 1;
                        if (this._boxGroup.getChildIndex(nextData.item) < this._boxGroup.getChildIndex(curData.item)) {
                            this._boxGroup.swapChildren(nextData.item, curData.item);
                        }
                        let nextItem: AcWeaponHouseItem = nextData.item;
                        let curItem: AcWeaponHouseItem = curData.item;
                        let icon: BaseBitmap = nextItem._icon0;
                        let value: number = nextData.value +1;
                        nextData.value = 0;
                        nextData.item = null;
                        curData.value = value;
                        this.lvArr[this._netCount].push(value);
                        this._isMove = true;
                        egret.Tween.get(nextItem).to({ x: curData.disX, y: curData.disY }, time).to(
                            { scaleX: 1.2, scaleY: 1.2 }, 100).to(
                            { scaleX: 0.8, scaleY: 0.8 }, 100).to(
                            { scaleX: 1, scaleY: 1 }, 100).call(
                            (curItem: AcWeaponHouseItem, itemData: AcWeaponHouseItem) => {
                                this.running -= 1;
                                curItem.resetItem(String(value));//.setData(Util.numStyle[value]);
                                this.removeFromParent(nextItem);
                                /**小弹幕 */
                                if (value >= 11) {
                                    // let str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acWeaponHouse_SucceedPlay_title`, this.getUiCode()),[value+""]);
                                    // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                                    //     msg : str,
                                    //     title : "itemUseConstPopupViewTitle",
                                    //     touchMaskClose : true,
                                    //     callback : ()=>
                                    //     {
                                    //         this.reGame();
                                    //     },
                                    //     cancelcallback:()=>
                                    //     {
                                    //         this.reGame();
                                    //     },
                                    //     closecallback:()=>
                                    //     {
                                    //         this.reGame();
                                    //     },                
                                    //     handler : this,
                                    //     needClose : 1,
                                    //     needCancel : true
                                    // });
                                }
                                if (this.running <= 0) {
                                    this.addNewGrids(1);
                                }
                            }, this, [curItem, nextItem]);
                    }
                }
            }
        }
        if(!this._isMove)
        {
            this._moveCount--;
        }
    }

     /**游戏是否结束 */
    private isOver(): boolean {
        if (this.usefulCell().length > 0) {
            return false;
        } else {
            for (let i: number = 0; i < this.items.length; i++) // 左右不等
                for (let j: number = 1; j < this.items[i].length; j++) {
                    if (this.items[i][j].value == this.items[i][j - 1].value && this.items[i][j].value!=11)
                        return false;
                }
            for (let j: number = 0; j < this.items.length; j++)  // 上下不等
                for (let i: number = 1; i < this.items[j].length; i++) {
                    if (this.items[i][j].value == this.items[i - 1][j].value && this.items[i][j].value!=11)
                        return false;
                }
        }
        /**结束弹窗动画 */
        let str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acWeaponHouse_rePlay_title`, this.getUiCode()));
        this.rePlayBtnClick(str);
        return true;
    }

     /**记录空的格子数据 */
    private usefulCell(): GridItemData[] {
        let cells: GridItemData[] = [];
        for (let i: number = 0; i < 4; i++) {
            for (let j: number = 0; j < 4; j++) {
                if (this.items[i][j] && this.items[i][j].value == 0) {
                    this.items[i][j].j = j;
                    this.items[i][j].i = i;
                    cells.push(this.items[i][j]);
                }
            }
        }
        return cells;
    }

        /**移除组件 */
    public removeFromParent(child: egret.DisplayObject) {
        if (!child || child.parent == null)
            return;
        child.parent.removeChild(child);
    }

    //重置
    private rePlayBtnClick(str):void{
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            msg : str,
            touchMaskClose : false,
            title : `itemUseConstPopupViewTitle`,
            callback : ()=>{
                view.reGame();
            },
            handle : this,
            needClose : 1,
            needCancel : true,
            confirmTxt : `confirmBtn`,
            // recommand : false
        });

    }
    private reGame():void
    {
        this.resetGrids();
        /**重置添加1个随机格子 */
        this.addNewGrids(1,true);
        this.getMapData()
        NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_RESETMAP, {activeId: this.vo.aidAndCode,map:this.map});
    }

    private reCallback():void{
        this.regTipCell();
    }
    private lotteryCallback(evt:egret.Event):void{
        this._netFlag = false;
        if (evt.data.ret){
            let rData = evt.data.data.data;
            let rewards = rData.rewards;
            this._nowscore.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_myScore_title", this.getUiCode()), [this.vo.getScoreNum()+""]);
            let rewardVoList = GameData.formatRewardItem(rewards);
            let score = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acWeaponHouse_addScose_title`, this.getUiCode()),[rData.score]);
            let item: { icon: string, tipMessage: string, type: number } = { icon: "", tipMessage: score, type: 0};
            let itemList :{ icon: string, tipMessage: string, type: number }[] = [];
            itemList.push(item)
            let potion :egret.Point = egret.Point.create(this._boxGroup.x+this._boxGroup.width/2,this._boxGroup.y);
            App.CommonUtil.playRewardFlyAction(itemList,potion);
            egret.setTimeout( ()=>{
				App.CommonUtil.playRewardFlyAction(rewardVoList,potion);
			},this,300)
            return ;
        }
    }
    private reGameCallback(evt:egret.Event):void{
        if (evt.data.ret){
            if(this._clickHand)
            {
                this._clickHand.visible = false;
            } 
            let phytext = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acWeaponHouse_addPhy_title`, this.getUiCode()),[this.phytext+""]);
            let item: { icon: string, tipMessage: string, type: number } = { icon: "", tipMessage: phytext, type: 0};
            let itemList :{ icon: string, tipMessage: string, type: number }[] = [];
            itemList.push(item);
            let potion :egret.Point = egret.Point.create(this.buyBtn.x+this.buyBtn.width/2,this.buyBtn.y);
            App.CommonUtil.playRewardFlyAction(itemList,potion);
            if(this.checkBox.checkSelected()){
                this.speedNum(10);
            }else{
                this.speedNum(1);
            }
            
            return ;
        }
    }

    private addGamePhy():void
    {
        let message: string = LanguageManager.getlocal("findsame_notstart");
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
        msg : message,
        title : "itemUseConstPopupViewTitle",
        touchMaskClose : true,
        callback : ()=>
        {
            if(!this._clickHand)
            {
                this._clickHand = BaseBitmap.create("guide_hand");
                this._clickHand.rotation = - 30;
                this.buyBtn.parent.addChild(this._clickHand);
                this._clickHand.setPosition(this.buyBtn.x + this.buyBtn.width/2-10,this.buyBtn.y + this.buyBtn.height/2-5);
                egret.Tween.get(this._clickHand,{loop:true})
                .to({scaleX: 0.9,scaleY:0.9}, 500)
                .to({scaleX: 1,scaleY:1}, 500);                       
            }
            this._clickHand.visible = true;
        },
        cancelcallback:()=>
        {
            if(this._clickHand)
            {
                this._clickHand.visible = false;
            }
        },
        closecallback:()=>
        {
            if(this._clickHand)
            {
                this._clickHand.visible = false;
            }
        },                
        handler : this,
        needClose : 1,
        needCancel : true
    }); 
    }

    private reMapDataGrids():void
    {
        //重置数据
        this.resetGrids();
        let mapdata = this.vo.getMapData();
        if(mapdata.length>0)
        {
            for (let i = 0; i < mapdata.length; i++) {
                for (let j: number = 0; j < mapdata[i].length; j++) {
                    if(mapdata[i][j]>0)
                    {
                        let cells:GridItemData = this.items[i][j];
                        let grid: AcWeaponHouseItem = new AcWeaponHouseItem({aid: mapdata[i][j], code: this.code});
                        grid.resetItem(String(mapdata[i][j]));
                        grid.x = cells.disX;
                        grid.y = cells.disY;
                        this._boxGroup.addChild(grid);
                        this.items[i][j].item = grid;
                        this.items[i][j].value = mapdata[i][j];
                        this.items[i][j].i = i;
                        this.items[i][j].j = j;
                    }
                }
            }
        }else{
            for (let i = 0; i < this.items.length; i++) {
                for (let j: number = 0; j < this.items[i].length; j++) {
                    if((i == 2&&j == 1)||(i == 2&&j == 2))
                    {
                        let cells:GridItemData = this.items[i][j];
                        let grid: AcWeaponHouseItem = new AcWeaponHouseItem({aid: 1, code: this.code});
                        grid.resetItem(String(1));
                        grid.x = cells.disX;
                        grid.y = cells.disY;
                        this._boxGroup.addChild(grid);
                        this.items[i][j].item = grid;
                        this.items[i][j].value = 1;
                        this.items[i][j].i = i;
                        this.items[i][j].j = j;
                    }
                }
            }
        }
    }
    private getMapData():void
    {
        let mapData = [];
        for (let i = 0; i < this.items.length; i++) {
            let mapData1 = [];
            for (let j: number = 0; j < this.items[i].length; j++) {
                mapData1.push(this.items[i][j].value);
            }
            mapData.push(mapData1);
         }
         this.map = mapData;;
    }
    private showTipMove(dirStart:egret.Point,dirEnd:egret.Point):void
    {
        if (!this.vo.isInActivity()) {
            if(this._isFirstMove)
            {
                this._isFirstMove = false;
                return;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.checkIsInEndShowTime()) {
            if(this._isFirstMove)
            {
                this._isFirstMove = false;
                return;
            }            
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }

        var num = this._boxGroup.numChildren;
        this._boxGroup.setChildIndex(this.showHand, num - 1);
        this.showHand.visible = true;
        this.showHand.alpha = 0;
        this.showHand.setPosition(dirStart.x,dirStart.y);

        egret.Tween.get(this.showHand,{loop:true})
        .to({alpha:1},300)
        .to({x: dirStart.x,y:dirStart.y}, 800)
        .to({x: dirEnd.x,y:dirEnd.y}, 800)
        .to({alpha:0},300);
    }

    private isShowTipHand():void{
        if(this.vo.step<5)
        {
            let dir = this.showTipHand();
            let pointStart:egret.Point = new egret.Point();
            let pointEnd:egret.Point = new egret.Point();
            switch(dir)
            {
                case 0:
                    pointStart.x = this._boxGroup.x+this._boxGroup.width/4 + 150;
                    pointStart.y = this._boxGroup.y+this._boxGroup.height/4;
                    pointEnd.x = this._boxGroup.x+this._boxGroup.width/4 - 150;
                    pointEnd.y = this._boxGroup.y+this._boxGroup.height/4;
                break;
                case 1:
                    pointStart.x = this._boxGroup.x+this._boxGroup.width/4 - 150;
                    pointStart.y = this._boxGroup.y+this._boxGroup.height/4;
                    pointEnd.x = this._boxGroup.x+this._boxGroup.width/4 + 150;
                    pointEnd.y = this._boxGroup.y+this._boxGroup.height/4;
                break;
                case 2:
                    pointStart.x = this._boxGroup.x+this._boxGroup.width/4;
                    pointStart.y = this._boxGroup.y+this._boxGroup.height/4 - 150;
                    pointEnd.x = this._boxGroup.x+this._boxGroup.width/4;
                    pointEnd.y = this._boxGroup.y+this._boxGroup.height/4 + 150;
                break;
                case 3:
                    pointStart.x = this._boxGroup.x+this._boxGroup.width/4;
                    pointStart.y = this._boxGroup.y+this._boxGroup.height/4 + 150;
                    pointEnd.x = this._boxGroup.x+this._boxGroup.width/4;
                    pointEnd.y = this._boxGroup.y+this._boxGroup.height/4 - 150;
                break;
            }
            this.showTipMove(pointStart,pointEnd);
        }
    }
    //智能提示方向 0左1右2上3下
    private showTipHand():number
    {
        let dirNum:number = 0;
        for (let i = 0; i < this.items.length; i++) {
            for (let j: number = 0; j < this.items[i].length; j++) {
                if(i<=1&&j<=1)
                {
                    if(this.items[i][j].value>0)
                    {
                        dirNum = 0;
                        return dirNum;
                    }
                    
                }else if(i>1&&j<=1)
                {
                    if(this.items[i][j].value>0)
                    {
                        dirNum = 1;
                        return dirNum;
                    }
                }else if(i<=1&&j>1)
                {
                    if(this.items[i][j].value>0)
                    {
                        dirNum = 2;
                        return dirNum;
                    }
                }else{
                    if(this.items[i][j].value>0)
                    {
                        dirNum = 3;
                        return dirNum;
                    }
                }
            }
         }
         return dirNum;
    }
    private onCheckClick():void{
        if(this.checkBox.checkSelected())
        {
            this.speedNum(10);
            this.spendexplain.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_pay_title", this.getUiCode()), ["100"]);
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acWeaponHouse_openCheck`, this.getUiCode())));
        }else{
            this.speedNum(1);
            this.spendexplain.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_pay_title", this.getUiCode()), ["10"]);
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acWeaponHouse_closeCheck`, this.getUiCode())));
        }
    }
    private speedNum(v:number):void
    {
        if(v == 10)
        {
            this.spendNum.text = this.vo.showGoldNumTen()+"";
        }else{
            this.spendNum.text = this.vo.shouGoldNum()+"";
        }
    }

    private refreshView():void{
        this.powerTitle.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_phy_title", this.getUiCode()), [this.vo.rePhy()+""]);
        this.buyPowerTitle.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_buy_title", this.getUiCode()), [this.vo.v+""]);
        // this.timeDescText.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rePhyTime", this.getUiCode()), [this.vo.getDuTime(),"1"]);
        
        if(this.checkBox.checkSelected())
        {
            this.speedNum(10);
        }else{
            this.speedNum(1);
        }
        if (this.vo.getRedPoint()){
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        if(this.vo.rePhy() >= this.cfg.baseTime || this.vo.checkIsInEndShowTime())
        {
            this.timeDescText.visible = false;
            this.timeDescBg.visible = false;
        }else{
            this.timeDescText.visible = true;
            this.timeDescBg.visible = true;
        }        
    }

    private _isShowHand:boolean=false;
    /** 提示框 */
    private regTipCell(v:boolean = false) {
        if(this.vo.step>=5){
            return;
        }
        this._isShowHand = false;
        if (this.tipHandler) {
            clearInterval(this.tipHandler);
        }
        this.tipHandler = setInterval(() => {
            this._isShowHand = true;
            this.isShowTipHand();
        }, 5 * 1000);
    }

    private refreshUI():void{
        //this.refreshProContainer();
    }

    public tick():void{
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
        this.timeDescText.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rePhyTime", this.getUiCode()), [this.vo.getDuTime(),"1"]);
        
        this.powerTitle.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_phy_title", this.getUiCode()), [this.vo.rePhy()+""]);
        
        // if(this.vo.refresh.num>=this.cfg.baseTime)
        if(this.vo.rePhy() >= this.cfg.baseTime || this.vo.checkIsInEndShowTime())
        {
            this.timeDescText.visible = false;
            this.timeDescBg.visible = false;
        }else{
            this.timeDescText.visible = true;
            this.timeDescBg.visible = true;
        }
    }

    public showRechargeTip():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acMouseComeRechargeTip`, this.getUiCode())),
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
            this._isFrist = true;
            return;
        }
        LocalStorageManager.set(localkey, String(this.vo.et));
        let view = this;
        let keyStr = "startDialog_"+this.getUiCode();
        let startCfg = view.cfg[keyStr];
        let bgName = "palace_bg4";
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,
        {
            aid : view.aid,
            code : ""+view.getUiCode(),
            AVGDialog : startCfg,
            visitId : "1",
            talkKey: "acWeaponHouseStartTalk_",
            bgName: bgName,
            callBack:this.chessShowView,
        });
    } 
       
    private chessShowView():void
    {
        let view = this;
        ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"acWeaponHouse_1",f: null,o:view});
    }
        
    public dispose():void{
        this.hideViewMask();
        this._moveCount = 0;
        this._netCount = 0;
        this.lvArr = null;
        this._timeBg = null;
        this._timeTxt = null;
        this._scrollView = null;
        this._proContainer = null;
        this._toolNum = null;
        this._freeDesc = null;
        this._onceNeedContainer = null;
        this._boxList = [];
        this._lightList = [];
        this._isPlayTen = false;
        this._isPlay = false;
        this._isMove = false;
        this._processContainer = null;
        this._processNum = null;
        this._progressBar = null;
        this._proLight = null;
        this._rewardData = null;
        this._detailBtn = null;
        this._rechargeTip = null;
        this._addNum = 0;
        this.timeDescText = null;
        this.timeDescBg = null;
        this._moveFlag = false;
        this._isShowHand = false;

        this.items = [[], [], [], []];
        if(this._clickHand)
        {
            egret.Tween.removeTweens(this._clickHand);
            this._clickHand = null;
        }
        if(this.showHand)
        {
            egret.Tween.removeTweens(this.showHand);
            this.showHand = null;
        }
        if (this.tipHandler) {
            clearInterval(this.tipHandler);
        }  
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_MOVE, this.lotteryCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_BUYNUM, this.reGameCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_RESETMAP, this.reCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_END2,this.doGuide,this);
        super.dispose();
    }
}