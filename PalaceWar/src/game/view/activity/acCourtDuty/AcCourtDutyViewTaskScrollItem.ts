/**
 * 依生依世 task item
 * author ycg
 * date 2019.10.28
 * @class AcCourtDutyViewTaskScrollItem
 */
class AcCourtDutyViewTaskScrollItem extends ScrollListItem{
    private _itemData:any = null;
    private _aid:string = null;
    private _code:string = null;
    private _vo:any = null;
    private _type:number = 1;
    private _timeTf:BaseTextField = null;
    private _timeBg:BaseBitmap = null;
    private _endTime:number = 0;
    private _maskContainer:BaseDisplayObjectContainer = null;

    public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {
        this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._type = itemParam.type;

        let vo = <AcCourtDutyVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this._vo = vo;
        this.width = 600;

		let itembg = BaseBitmap.create("public_9_bg14");
		itembg.width = this.width;
		this.addChild(itembg);

		let titleBg:BaseBitmap = BaseBitmap.create("activity_charge_red");
		titleBg.y = 7;
		titleBg.x = 0;
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyquestType"+data.questType, [String(data.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
        this.addChild(titleTF);
        
		let rewards = this._itemData.getReward;
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.83;
		let itemHeight:number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		itembg.height += offsetH - 20;

        this.height = itembg.height;

        let currNum = 0;
        if (this._type == 1){
            currNum = vo.getYaMenTaskCurrNum(data.taskId, data.questType);
        }
        else{
            currNum = vo.getHuangBangTaskCurrNum(data.taskId, data.questType);
        }
        let needStrKey = "acCourtDutyTaskNum2";
        if (currNum >= data.value){
            needStrKey = "acCourtDutyTaskNum1";
        }
        let needText = ComponentManager.getTextField(LanguageManager.getlocal(needStrKey, [""+currNum, ""+data.value]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        needText.anchorOffsetX = needText.width/2;
        needText.setPosition(this.width - 30, 50);
        this.addChild(needText);

        if (currNum >= data.value){
            let isGet = false;
            if (this._type == 1){
                isGet = vo.isGetYaMenTaskById(data.taskId, data.rKey);
            }
            else{
                isGet = vo.isGetHuangBangTaskById(data.taskId, data.rKey);
            }
            if (isGet){ 
                //已领取
                let collectflag = BaseBitmap.create("collectflag");
                collectflag.setScale(0.7);
                collectflag.setPosition(itembg.x + itembg.width - collectflag.width * 0.7 - 5, itembg.y + itembg.height - collectflag.height * 0.7);
                this.addChild(collectflag); 
                needText.visible = false; 
            }
            else{
                //可领取 未领取
                let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					if ((!vo.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
                    }
                    let bigType = "yaMenTask";
                    if (this._type == 2){
                        bigType = "huangBangTask";
                    }
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_GETTASK, { activeId: vo.aidAndCode, bigType: bigType, diffday: data.taskId, rkey: data.rKey });
				}, this);
				reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
                needText.setPosition(reviceBtn.x + reviceBtn.width/2, reviceBtn.y - 25);
            }
        }
        else{
            //未完成
            if (data.questType == 1004){
                let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
                    if ((!vo.isInActivity())) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
                    }
				}, this);
				reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
                reviceBtn.setGray(true);
                if (vo.isInActivity()) {
                    reviceBtn.touchEnabled = false;
                }
                else{
                    reviceBtn.touchEnabled = true;
                }
                needText.setPosition(reviceBtn.x + reviceBtn.width/2, reviceBtn.y - 25);
            }
            else{
                let goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", this.taskGoBtnHandler, this);
                goBtn.setPosition(itembg.x + itembg.width - goBtn.width - 15, itembg.y + itembg.height - goBtn.height - 15);
                this.addChild(goBtn);
                if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
                    goBtn.setGray(true);
                }
                needText.setPosition(goBtn.x + goBtn.width/2, goBtn.y - 25);
            }
        } 
        
        App.LogUtil.log("currDay: "+vo.getCurrDay()+" taskID: "+data.taskId);
        let currDay = vo.getCurrDay();
        if (data.taskId > currDay){
            let maskContainer = new BaseDisplayObjectContainer();
            maskContainer.width = this.width;
            maskContainer.height = this.height;
            this.addChild(maskContainer);
            this._maskContainer = maskContainer;
            maskContainer.touchEnabled = true;

            let mask = BaseBitmap.create("public_9_bg90");
            mask.width = this.width;
            mask.height = this.height;
            maskContainer.addChild(mask);

            let timeBg = BaseBitmap.create("public_9_bg91");
            timeBg.width = maskContainer.width;
            timeBg.setPosition(mask.x + mask.width/2 - timeBg.width/2, mask.y + mask.height - timeBg.height - 5);
            maskContainer.addChild(timeBg);
            this._timeBg = timeBg;

            let day0 = App.DateUtil.getWeeTs(GameData.serverTime);
            this._endTime = day0 + (data.taskId - currDay) * 86400;
            let timeStr = App.DateUtil.getFormatBySecond((this._endTime - GameData.serverTime), 1)

            let timeIndexStr = "_1";
            if (data.taskId > currDay + 1){
                timeIndexStr = "_2";
            }
            let timeTf = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyTaskOpenTime"+timeIndexStr, [timeStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            timeTf.anchorOffsetX = timeTf.width/2;
            timeTf.setPosition(mask.x + mask.width/2, timeBg.y + timeBg.height/2 - timeTf.height/2);
            maskContainer.addChild(timeTf);
            this._timeTf = timeTf;

            TickManager.addTick(this.tick, this);
        }  
    }

    public taskGoBtnHandler():void{
        let vo = <AcCourtDutyVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (vo.checkIsInEndShowTime() || (!vo.isStart)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if(!this._itemData.openType){
            return; 
        }
        let openType = this._itemData.openType;
        if(openType == "")
        {
            PlayerBottomUI.getInstance().show();
        } 
        else
        {
            if(Api[openType+"VoApi"]&&Api[openType+"VoApi"].isShowNpc)
            {
                let isShowNpc:boolean=Api[openType+"VoApi"].isShowNpc();
                if(!isShowNpc)
                {
                    let lockedStr:string=Api[openType+"VoApi"].getLockedString?Api[openType+"VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType +"Tip");
                    App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen") );
                    return;
                }
			}
			let viewName = App.StringUtil.firstCharToUper(openType);
			if (openType == "alliance"){
				let allid = Api.playerVoApi.getPlayerAllianceId();
				if(!allid || allid <= 0){
					viewName = `AllianceCreate`;
				}
			}
			
            if (egret.getDefinitionByName(viewName + "View"))
            {
                ViewController.getInstance().openView(viewName+ "View"); 
                
            }else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
            {
                ViewController.getInstance().openView(viewName + "PopupView");
            }
            else
            {
                if(openType=="recharge")
                {
                    ViewController.getInstance().openView(viewName+"Vip"+ "View");
                }
            } 
        } 
    }

    private tick():void{
        if (this._endTime > GameData.serverTime){
            if (this._timeTf){
                let timeStr = App.DateUtil.getFormatBySecond((this._endTime - GameData.serverTime), 1);
                let timeIndexStr = "_1";
                let currDay = this._vo.getCurrDay();
                if (this._itemData.taskId > currDay + 1){
                    timeIndexStr = "_2";
                }
                this._timeTf.text = LanguageManager.getlocal("acCourtDutyTaskOpenTime"+timeIndexStr, [timeStr]);
                this._timeTf.anchorOffsetX = this._timeTf.width/2;
            }
        }
        else{
            TickManager.removeTick(this.tick, this);
            if (this._maskContainer){
                this.removeChild(this._maskContainer);
            }
        }  
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        TickManager.removeTick(this.tick, this);
        this._itemData = null;
        this._aid = null;
        this._code = null;
        this._vo = null;
        this._timeTf = null;
        this._timeBg = null;
        this._endTime = 0;
        this._maskContainer = null;

        super.dispose();
    }
}