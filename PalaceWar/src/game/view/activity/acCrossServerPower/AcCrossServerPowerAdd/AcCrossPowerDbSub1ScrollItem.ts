class AcCrossPowerDbSub1ScrollItem extends ScrollListItem {
    private _aid:string = null;
    private _code:string = null;

    public constructor() {
        super();
    }

    private get vo():AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return this._aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }
    
    protected initItem(index: number, data: any, itemParam: any) {
        this._aid = itemParam.aid;
        this._code = itemParam.code;

        this.width = 530;
        //item bg
        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width/2 - bg.width/2;
        this.addChild(bg);

        let titleBg = BaseBitmap.create("shopview_itemtitle");
        titleBg.width = 450;
        this.addChild(titleBg);
        titleBg.x = bg.x + 4;
        titleBg.y = bg.y + 5;
        
        //title txt
        let titleTxtStr = LanguageManager.getlocal("acCrossServerPowerDbItemInfo", [""+data.needNum,""+data.needPower]);
        let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.x = titleBg.x + 10;
        titleTxt.y = titleBg.y + titleBg.height/2 - titleTxt.height/2;
        this.addChild(titleTxt);

        let addTxtStr = LanguageManager.getlocal("acCrossServerPowerDbItemAddTxt", [""+data.buffValue*100]);
        let addTxt = ComponentManager.getTextField(addTxtStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        addTxt.x = titleBg.x + 10;
        addTxt.y = titleBg.y + titleBg.height + 10;
        this.addChild(addTxt);

        let rewardIconList = GameData.getRewardItemIcons(data.getReward, true, true);
		let scale = 0.8;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 10;
        let spaceY = 10;
        let stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX)/2;
        let stY = bg.y + 87;
        let offHeight = 75;
        
        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = bg.width - 20;
		rewardBg.x = bg.x + bg.width/2 - rewardBg.width/2;
		rewardBg.y = stY - 10;
        this.addChild(rewardBg);
        
		for (let i = 0; i < rewardIconList.length; i++) 
        {
            let rewardDB = rewardIconList[i];
			rewardDB.setScale(scale);
			rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB);
        }
        
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;

		let bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight;
		if (bgHeight > bg.height)
        {
			bg.height = bgHeight;
        }

        let num = itemParam.num;
        
        //进度条
        let progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 330);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 20);
        this.addChild(progress);
        let currNum = this.vo.getDbProcess(num,data.id);
        let progressStr = LanguageManager.getlocal("acCrossServerPowerDbItemProTxt", [String(currNum), String(data.needNum)]);
        progress.setPercentage(currNum / data.needNum, progressStr, TextFieldConst.COLOR_WHITE);

        if (this.vo.isGetRewardDb(num,data.id)) 
        {
            let reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else
        {
            let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => 
            {
                if((!this.vo.isStart)) 
                {
                    this.vo.showAcEndTip();
                    return;
                }
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETSOLIDERREWARD, {activeId: this.vo.aidAndCode, pos:[num,data.id]}); 
            }, this);
            reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height-10);
            this.addChild(reviceBtn);
            reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
            if (currNum < data.needNum)
            {
                reviceBtn.setEnable(false);
            }
        }
		this.height = bg.y + bg.height + this.getSpaceY();
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
        this._aid = null;
        this._code = null;
        super.dispose();
    }
}