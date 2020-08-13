/**
 * 任务item
 * author ycg
 * date 2020.3.24
 * @class AcChaoTingViewTabScrollItem3
 */

class AcChaoTingViewTabScrollItem3 extends ScrollListItem{
    private _itemData:any = null;
    private _aid:string = null;
    private _code:string = null;
    private _vo:any = null;

    public constructor() {
		super();
	}
	
	public initItem(index: number, data: any, itemParam: any): void {
        this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;

        let vo = <AcChaoTingVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this._vo = vo;

		this.width = 640;
		let bgImg = ResourceManager.hasRes("acchaoting_itembg-"+this.getTypeCode()) ? "acchaoting_itembg-"+this.getTypeCode() : "acchaoting_itembg-1";
		let bg = BaseBitmap.create(bgImg);
		bg.x = this.width/2 - bg.width/2;
		this.addChild(bg);

		let topBgImg = ResourceManager.hasRes("acchaoting_itemtitlebg-"+this.getTypeCode()) ? "acchaoting_itemtitlebg-"+this.getTypeCode() : "acchaoting_itemtitlebg-1";
		let topBg:BaseBitmap = BaseBitmap.create(topBgImg);
		topBg.y = 0;
		topBg.x = this.width/2 - topBg.width/2;
		bg.y = topBg.y + 13;
		this.addChild(topBg);

		let topName = ComponentManager.getTextField(LanguageManager.getlocal("taskDesc"+data.questType, [""+data.value]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		topName.setPosition(topBg.x + topBg.width/2 - topName.width/2, topBg.y + 17);
		this.addChild(topName);
        
		let rewardVoList = GameData.formatRewardItem(data.getReward);
		let scale = 0.95;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 14;
		let spaceY = 12;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(scale);
			rewardDB.setPosition(bg.x + 21 + ((rewardDB.width * scale + spaceX) * (i % 5)), bg.y + 45 + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB);
		}
		let rHeight = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.ceil(rewardVoList.length / 5)) * (itemHeight * scale + spaceY) - spaceY;

		let bgH = bg.y + 45 + rHeight + 70;
		if (bgH > bg.height){
			bg.height = bgH;
        }
        this.height = bgH + 13 + this.getSpaceY();

        let progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 420);
		progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        
		let currNum = vo.getTaskNum(data.questType);
		let progressStr = ""+currNum+"/"+data.value;
        progress.setPercentage(currNum / data.value, progressStr, TextFieldConst.COLOR_WHITE);
        
        if (vo.isGetTaskRewardById(data.id)){
            let collectflag = BaseBitmap.create("collectflag");
            collectflag.setScale(0.7);
            collectflag.setPosition(bg.x + bg.width - collectflag.width * 0.7 - 10, bg.y + bg.height - collectflag.height * 0.7);
            this.addChild(collectflag); 
        }
        else{
            if (currNum >= data.value){
                let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => {
					if ((!vo.isStart)) {
						vo.showAcEndTip();
						return;
                    }
					NetManager.request(NetRequestConst.REQUEST_ACCHAOTING_GETTASK, { activeId: vo.aidAndCode, taskId: data.id });
				}, this);
				reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }
            else{
                if (data.questType == 111){
                    let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => {
                        if ((!vo.isInActivity())) {
                            vo.showAcEndTip();
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
                    if (!vo.isInActivity()) {
                        goBtn.setGray(true);
                    }
                }
            }
        }
    }

    public taskGoBtnHandler():void{
        let vo = <AcCourtDutyVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (!vo.isInActivity()) {
            vo.showAcEndTip();
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

    public getTypeCode():string{
        return this._code;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this._itemData = null;
        this._aid = null;
        this._code = null;
        this._vo = null;

        super.dispose();
    }
}