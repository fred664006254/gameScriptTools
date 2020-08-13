/**
 * 任务item
 */
class AcNewappointPreviewTaskScrollItem extends ScrollListItem{
    private _aid:string = null;
    private _code:string = null;
    private _data:any = null;
    public constructor(){
        super();
    }

    public initItem(index:number, data:any, itemParam?:any){
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._data = data;
        this.width = 530;
        //item bg
        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width/2 - bg.width/2;
        this.addChild(bg);
        bg.height = 165;

        let titleBg = BaseBitmap.create("shopview_itemtitle");
        this.addChild(titleBg);
        titleBg.x = bg.x;
        titleBg.y = bg.y + 7;
        
        //title txt
        let titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewScoreItemName1", this.getTypeCode()));
        if (data.taskType != 1){
            titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewScoreItemName2", this.getTypeCode()), [""+data.taskValue]);;
        }
        let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleBg.width = titleTxt.width + 50;
        titleTxt.x = titleBg.x + 20;
        titleTxt.y = titleBg.y + titleBg.height/2 - titleTxt.height/2;
        this.addChild(titleTxt);

        let rewards = "1065_0_" + data.getScore + "_" + this.getTypeCode();
        let rewardIconList = GameData.getRewardItemIcons(rewards, true, true);
		let scale = 0.8;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 10;
        let spaceY = 10;
        // let stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX)/2;
        let stX = bg.x + 25
        let stY = titleBg.y + titleBg.height + 15;
        
        // let rewardBg = BaseBitmap.create("public_scrolllistbg");
		// rewardBg.width = bg.width - 20;
		// rewardBg.x = bg.x + bg.width/2 - rewardBg.width/2;
		// rewardBg.y = stY - 10;
        // this.addChild(rewardBg);
        
		for (let i = 0; i < rewardIconList.length; i++) {
            let rewardDB = rewardIconList[i];
			rewardDB.setScale(scale);
			rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB);
        }
        
        if (Api.acnewappointApi.isGetTaskReward(data.id)) {
            let reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height/2);
            this.addChild(reviceBM);
        }
        else{
            let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => {
                if (!Api.acnewappointApi.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip2", this.getTypeCode())));
                    return;
                }
                let acData = Api.acnewappointApi.getAcData();
                let ast = acData.yrst;
                let newZid = acData.newzid;
                let reqData:any={t:"getsorcetask",pid:LoginManager.getLocalUserName(), yrst: ast, newzid: newZid, rkey: data.id};
                NetManager.http.get(ServerCfg.svrCfgUrl, reqData, this.reviceCallback, this.reviceErrorCallback, this);
            }, this);
            reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 25);
            this.addChild(reviceBtn);
            reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
            let currNum = Api.acnewappointApi.getTaskNum();
            if (data.taskType == 1){
                if (!Api.acnewappointApi.isJoin()){
                    reviceBtn.setEnable(false);
                }
            }
            else{
                if (currNum < data.taskValue){
                    reviceBtn.setEnable(false);
                }
                //process 
                let processInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewScoreProcess", this.getTypeCode()), [""+currNum, ""+data.taskValue]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                processInfo.setPosition(reviceBtn.x + reviceBtn.width/2 - processInfo.width/2, reviceBtn.y - processInfo.height - 5);
                this.addChild(processInfo);
            }
            if (!Api.acnewappointApi.isInActivity()){
                reviceBtn.setEnable(true);
                App.DisplayUtil.changeToGray(reviceBtn);
            }
        }  

		this.height = bg.height + this.getSpaceY();
    }

    private reviceCallback(data:any):void{
        if (data){
            if (data.ret == -1){
                App.CommonUtil.showTip(LanguageManager.getlocal("requestFailCode-1"));
                return ;
            }
            if (data && data.activeData){
                //奖励
                let rewards = "1065_0_" + this._data.getScore + "_" + this.getTypeCode();
                let rewardVoList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rewardVoList);
                if (data.replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": data.replacerewards });
                }
                Api.acnewappointApi.setAcData(data.activeData);
            }
        }
    }

    private reviceErrorCallback():void{
        App.CommonUtil.showTip(LanguageManager.getlocal("requestFailCode-1"));
    }

    // private get cfg() : Config.AcCfg.NewappointCfg{
    //     return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	// }

    protected get code():string{
		return this._code;
    }

    private get aid():string{
        return this._aid;
    }

    private getTypeCode():string{
        return this.code;
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

    public dispose():void{
        this._aid = null;
        this._code = null;
        this._data = null;
        super.dispose();
    }
}