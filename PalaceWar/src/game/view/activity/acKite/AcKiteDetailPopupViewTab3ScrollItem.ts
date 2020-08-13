/**
 * 任务奖励item
 * @author ycg
 */
class AcKiteDetailPopupViewTab3ScrollItem extends ScrollListItem {
    private itemParam: any = null;
    private _itemData:any = null;

    public constructor() {
        super();
    }
    private get vo(): AcKiteVo {
        return <AcKiteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg(): Config.AcCfg.KiteCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    protected get aid() {
        return this.itemParam.aid;
    }
    protected get code() {
        return this.itemParam.code;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    protected initItem(index: number, data: any, itemParam: any) {
        this.itemParam = itemParam;
        this._itemData = data;

        this.width = 530;
        //item bg
        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width/2 - bg.width/2;
        this.addChild(bg);

        let titleBg = BaseBitmap.create(this.getDefaultRes("ackite_tasktitlebg"));
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width/2 - titleBg.width/2;
        bg.y = titleBg.y + 5;
        
        //title txt
        let titleTxtStr = "";
        if (data.group == 1){

        }
        else{
            if (data.questType){
                titleTxtStr = LanguageManager.getlocal("taskDesc"+data.questType, [""+data.value]);
            }
        }
        
        let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        titleTxt.x = this.width/2 - titleTxt.width/2;
        titleTxt.y = titleBg.y + 10;
        this.addChild(titleTxt);

        let rewards = data.getReward;
		if (this._itemData.specialGift) {
			rewards = "1052_0_" + data.specialGift + "_" + this.getTypeCode() + "|" + rewards;
		}
        let rewardIconList = GameData.getRewardItemIcons(rewards, true, true);
		let scale = 0.8;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 10;
        let spaceY = 10;
        let stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX)/2;
        let stY = bg.y + 45;
        let offHeight = 90;
        
        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = bg.width - 20;
		rewardBg.x = bg.x + bg.width/2 - rewardBg.width/2;
		rewardBg.y = stY - 10;
        this.addChild(rewardBg);
        
		for (let i = 0; i < rewardIconList.length; i++) {
            let rewardDB = rewardIconList[i];
			rewardDB.setScale(scale);
			rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB);
		}
		let bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight;
		if (bgHeight > bg.height){
			bg.height = bgHeight;
        }
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;
        
        //进度条
        let progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 320);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        let currNum = this.vo.getTaskNum(data.questType);
        let progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteDetailProcess", this.getTypeCode()), [String(currNum), String(data.value)]);
        progress.setPercentage(currNum / data.value, progressStr, TextFieldConst.COLOR_WHITE);

        if (this.vo.getTaskStatus(data.id)) {
            let reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else{
            if (this.vo.getTaskNum(data.questType) >= data.value){
                let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => {
                    if ((!this.vo.isStart)) {
                        this.vo.showAcEndTip();
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACKITE_GETTASKREWARD, { activeId: this.vo.aidAndCode, taskId: data.id}); 
                }, this);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
                reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
            }
            else{
                if (data.questType == 111){
                    let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => {
                        if ((!this.vo.isInActivity())) {
                            this.vo.showAcEndTip();
                            return;
                        }
                    }, this);
                    reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                    this.addChild(reviceBtn);
                    reviceBtn.setEnable(false);
                    reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
                }
                else{
                    let goBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", this.taskGoBtnHandler, this);
                    goBtn.setPosition(bg.x + bg.width - goBtn.width - 15, bg.y + bg.height - goBtn.height - 15);
                    this.addChild(goBtn);
                    goBtn.setColor(TextFieldConst.COLOR_BLACK);
                    if (!this.vo.isInActivity()) {
                        goBtn.setGray(true);
                    }
                }
            }
            
        }   
        
		this.height = bg.y + bg.height + this.getSpaceY();
    }

    public taskGoBtnHandler():void{
        let vo = <AcCourtDutyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (!vo.isInActivity()) {
            vo.showAcEndTip();
            return;
        }
        if (this._itemData.group == 3){
            ViewController.getInstance().openView("ShopView");
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

    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode ? defaultCode : "1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } 
        else if (ResourceManager.hasRes(resName+"-"+defaultCode)){
            return resName+"-"+defaultCode;
        }
        else{
            return resName;
        }
    }

    public getSpaceX(): number {
        return 0;
    }
	/**
	 * 不同格子Y间距
	 */
    public getSpaceY(): number {
        return 5;
    }
    
    public dispose(): void {
        this.itemParam = null;
        this._itemData = null;
        super.dispose();
    }
}