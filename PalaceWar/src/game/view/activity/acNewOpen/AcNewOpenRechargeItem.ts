class AcNewOpenRechargeItem extends ScrollListItem
{
    private _code: any = null;

    public constructor() {
        super();
    }

    private get cfg() : Config.AcCfg.NewOpenCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNewOpenVo{
        return <AcNewOpenVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_NEWOPEN;
    }

    private get code() : string{
        return this._code;
	}

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    protected initItem(index: number, data: Config.AcCfg.NewOpenRechargeItemCfg, itemParam: any) {
        this._code = itemParam;

        let bg = BaseBitmap.create("public_scrollitembg");
        bg.x = GameConfig.stageWidth/2-bg.width/2;
        bg.height = 210; 
        this.addChild(bg);

        let titleBg = BaseBitmap.create("acnewopen_reward_title-"+this.getTypeCode());
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width/2 - titleBg.width/2;
        bg.y = titleBg.y + 13;
        
        let titleTxtStr = LanguageManager.getlocal("acNewOpenType2", [""+data.needGem]);
        let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt.x = bg.x + bg.width/2 - titleTxt.width/2;
        titleTxt.y = titleBg.y + 14;
        this.addChild(titleTxt);

        let str = `1053_0_${data.specialGift}_${this.getTypeCode()}|` + data.getReward;
        let rewardIconList = GameData.getRewardItemIcons(str, true, false);
		let scale = 0.9;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 10;
        let spaceY = 10;
        let stX = bg.x + 36;
        let stY = bg.y + 45;
        let offHeight = 85;
        
        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = bg.width - 40;
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
        

        let times = data.maxNum - this.vo.isGetRecharge(data.id);
        let timestr:string = times>0 ? LanguageManager.getlocal("acDuanWuBuyTaskTimes",[String(times),String(data.maxNum)]) : LanguageManager.getlocal("acDuanWuBuyTaskTimes2",[String(0),String(data.maxNum)]);
        

        //进度条
        let progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 385);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 15);
        this.addChild(progress);
        let currNum = this.vo.getChargeNum() - this.vo.isGetRecharge(data.id)*data.needGem;

        if (currNum > data.needGem || this.vo.isGetRecharge(data.id)>=data.maxNum)
        {
            currNum=data.needGem;
        }

        let progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusDetailProcessNum", this.getTypeCode()), [String(currNum), String(data.needGem)]);
        progress.setPercentage(currNum / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);


         let timesText = ComponentManager.getTextField(timestr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		timesText.setPosition(progress.x+progress.width/2-timesText.width/2,rewardBg.y+rewardBg.height+15);
		this.addChild(timesText); 

        if (this.vo.isGetRecharge(data.id)>=data.maxNum) {
            let reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else{

            if (currNum < data.needGem)
            {
                let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_RED, "taskGoBtn", () => {
                    if ((!this.vo.isStart)) {
                        this.vo.showAcEndTip();
                        return;
                    }
                    if (!this.vo.isInActivity()){
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
                }, this);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }
            else
            {
                let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "taskCollect", () => {
                    if ((!this.vo.isStart)) {
                        this.vo.showAcEndTip();
                        return;
                    }
                    this.vo.lastidx = data.id;
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NEWOPENRINFOREWARDS, { activeId: this.vo.aidAndCode, rkey: data.id}); 
                }, this);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }

            
        }  

    }

    public getSpaceY(): number {
        return 5;
    }
    
    public dispose(): void {
        this._code = null;
        super.dispose();
    }
}