//
class AcCrossServerHegemonyMatchViewTab3 extends CommonViewTab
{

	private _timeCdText:BaseTextField = null;
    private startCurMatchTime = (12 * 24 + 21) * 60 * 60;

    private _mapContainer: BaseDisplayObjectContainer = null;
    private _redBg:BaseBitmap = null;

    private _winNameBgList:BaseBitmap[] = [];
    private _winNameTextList:BaseTextField[] = [];

    private _nameBgList:BaseBitmap[] = [];
    private _nameTextList:BaseTextField[] = [];

    private _lineList:any[] = [];

	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}


	
	private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
        let redBg = BaseBitmap.create("accshegemony_matchredbg");
        redBg.x = GameConfig.stageWidth/2 - redBg.width/2;
        redBg.y = 8;
        this.addChild(redBg);
        this._redBg = redBg;

        let matchName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyMatchTab3"),24,TextFieldConst.COLOR_WARN_YELLOW2)
        matchName.x = redBg.x + redBg.width/2 - matchName.width/2;
        matchName.y = redBg.y + 8;
        this.addChild(matchName);

        this._timeCdText = ComponentManager.getTextField(" ",24,TextFieldConst.COLOR_WARN_YELLOW);
        this._timeCdText.x = GameConfig.stageWidth/2 - this._timeCdText.width/2;
        this._timeCdText.y = matchName.y + matchName.height + 5;
        this.addChild(this._timeCdText);
        

        this.refreshTimeText();
        this.createMatchMap();
        this.initMatchMap();

	}
    private createMatchMap():void
    {
        this._mapContainer = new BaseDisplayObjectContainer();
        this._mapContainer.width = GameConfig.stageWidth;
        this._mapContainer.height = 460 * 2;
        let touchAlpha = BaseBitmap.create("public_alphabg");
        touchAlpha.width = this._mapContainer.width;
        touchAlpha.height = this._mapContainer.height;
        this._mapContainer.addChild(touchAlpha);
        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,890 - 8 - (1136 - GameConfig.stageHeigth));
        let mapScrollView = ComponentManager.getScrollView(this._mapContainer,rect);
        mapScrollView.x = GameConfig.stageWidth/2 - mapScrollView.width/2;
        mapScrollView.y = this._redBg.y + this._redBg.height ;
        this.addChild(mapScrollView);
        //130
        for(let i = 0; i < 2; i ++){
            let startY = i * 450; //460
            ///////////up
            let winBgUp = BaseBitmap.create("accshegemony_matchnamebg2");
            winBgUp.x = GameConfig.stageWidth/2 - winBgUp.width/2;
            winBgUp.y = startY + 183 - winBgUp.height/2;
            this._mapContainer.addChild(winBgUp);
            this._winNameBgList.push(winBgUp);
       
            let winTextUp = ComponentManager.getTextField("",22,TextFieldConst.COLOR_WARN_YELLOW);
            this._mapContainer.addChild(winTextUp);
            this._winNameTextList.push(winTextUp);
            

            let bgUp1 = BaseBitmap.create("accshegemony_matchnamebg1");
            bgUp1.x = 100 - bgUp1.width/2;
            bgUp1.y = startY + 117 - bgUp1.height/2;
            this._mapContainer.addChild(bgUp1);
            this._nameBgList.push(bgUp1);

            let textUp1 = ComponentManager.getTextField("",22,0x9adbff);
            this._mapContainer.addChild(textUp1);
            this._nameTextList.push(textUp1);


            let bgUp2 = BaseBitmap.create("accshegemony_matchnamebg1");
            bgUp2.x = 100 - bgUp2.width/2;
            bgUp2.y = startY + 344 - bgUp2.height/2;
            this._mapContainer.addChild(bgUp2);  
            this._nameBgList.push(bgUp2);       

            let textUp2 = ComponentManager.getTextField("",22,0x9adbff);
            this._mapContainer.addChild(textUp2);
            this._nameTextList.push(textUp2);

            let upLine1 = BaseBitmap.create("accshegemony_matchline3_1");
            upLine1.x = 210 - upLine1.width/2;
            upLine1.y = startY + 230 - upLine1.height/2;
            this._mapContainer.addChild(upLine1);

            let upLine2 = BaseBitmap.create("accshegemony_matchline3_2");
            upLine2.x = 210 - upLine2.width/2;
            upLine2.y = startY + 230 - upLine2.height/2;
            this._mapContainer.addChild(upLine2);
            upLine2.visible = false;
            let upLine3 = BaseBitmap.create("accshegemony_matchline3_3");
            upLine3.x = 210 - upLine3.width/2;
            upLine3.y = startY + 230 - upLine3.height/2;
            this._mapContainer.addChild(upLine3);
            upLine3.visible = false;
            let upLine = {line1:upLine1, line2:upLine2, line3:upLine3};
            this._lineList.push(upLine);

            ////////////down
            let winBgDown = BaseBitmap.create("accshegemony_matchnamebg2");
            winBgDown.x = GameConfig.stageWidth/2 - winBgDown.width/2;
            winBgDown.y = startY + 280 - winBgDown.height/2;
            this._mapContainer.addChild(winBgDown);
            this._winNameBgList.push(winBgDown);

            let winTextDown = ComponentManager.getTextField("",22,TextFieldConst.COLOR_WARN_YELLOW);
            this._mapContainer.addChild(winTextDown);
            this._winNameTextList.push(winTextDown);

            let bgDown1 = BaseBitmap.create("accshegemony_matchnamebg1");
            bgDown1.x = 540 - bgDown1.width/2;
            bgDown1.y = startY + 117 - bgDown1.height/2;
            this._mapContainer.addChild(bgDown1);
            this._nameBgList.push(bgDown1);

            let textDown1 = ComponentManager.getTextField("",22,0x9adbff);
            this._mapContainer.addChild(textDown1);
            this._nameTextList.push(textDown1);

            let bgDown2 = BaseBitmap.create("accshegemony_matchnamebg1");
            bgDown2.x = 540 - bgDown2.width/2;
            bgDown2.y = startY + 344 - bgDown2.height/2;
            this._mapContainer.addChild(bgDown2); 
            this._nameBgList.push(bgDown2); 

            let textDown2 = ComponentManager.getTextField("",22,0x9adbff);
            this._mapContainer.addChild(textDown2);
            this._nameTextList.push(textDown2);

            let downLine1 = BaseBitmap.create("accshegemony_matchline3_1");
            downLine1.setScale(-1);
            downLine1.x = 430 - downLine1.width * downLine1.scaleX / 2;
            downLine1.y = startY + 230 - downLine1.height * downLine1.scaleY / 2;
            this._mapContainer.addChild(downLine1);

            let downLine2 = BaseBitmap.create("accshegemony_matchline3_3");
            downLine2.setScale(-1);
            downLine2.x = 430 - downLine2.width * downLine2.scaleX / 2;
            downLine2.y = startY + 230 - downLine2.height * downLine2.scaleY / 2;
            downLine2.visible = false;
            this._mapContainer.addChild(downLine2);

            let downLine3 = BaseBitmap.create("accshegemony_matchline3_2");
            downLine3.setScale(-1);
            downLine3.x = 430 - downLine3.width * downLine3.scaleX / 2;
            downLine3.y = startY + 230 - downLine3.height * downLine3.scaleY / 2;
            downLine3.visible = false;
            this._mapContainer.addChild(downLine3);
            let downLine = {line1:downLine1, line2:downLine2, line3:downLine3};
            this._lineList.push(downLine);

            if(i != 2 - 1){
                let line = BaseBitmap.create("accshegemony_matchline");
                line.x = GameConfig.stageWidth/2 - line.width/2;
                line.y = startY + 450 - line.height/2;
                this._mapContainer.addChild(line);  
            }
        }
    }
    private initMatchMap():void
    {

        let dataList = Api.crossServerHegemonyVoApi.getDetailPkInfo(2);
        // let dataList = [];
        for(let i = 0 ;i < this._nameBgList.length; i += 2){
            let nameBg1 = this._nameBgList[i];
            let nameText1 = this._nameTextList[i];

            let nameBg2 = this._nameBgList[i+1];
            let nameText2 = this._nameTextList[i+1];
            if(i/2 < dataList.length){
                 if (dataList[i/2]["name1"]) 
                {
                    nameText1.text = dataList[i/2]["name1"];
                }
                else
                {
                    nameText1.text = LanguageManager.getlocal("countryWarRewardType9");
                    nameText1.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                }
                if (dataList[i/2]["name2"]) 
                {
                    nameText2.text = dataList[i/2]["name2"];
                }
                else
                {
                    nameText2.text = LanguageManager.getlocal("countryWarRewardType9");
                    nameText2.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                }
 
            } else {
                 nameText1.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["8"]);
                 nameText2.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["8"]);
            }
           
            nameText1.x = nameBg1.x + nameBg1.width/2 - nameText1.width/2;
            nameText1.y = nameBg1.y + nameBg1.height/2 - nameText1.height/2;
            nameText2.x = nameBg2.x + nameBg2.width/2 - nameText2.width/2;
            nameText2.y = nameBg2.y + nameBg2.height/2 - nameText2.height/2;
        }
        for(let j = 0 ;j < this._winNameBgList.length; j ++){
            let nameBg = this._winNameBgList[j];
            let nameText = this._winNameTextList[j];
            if(j < dataList.length){
                if(dataList[j]["win"] == -1) {
                    nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["4"]);
                } else if(dataList[j]["win"] == 1) {
                    nameText.text = dataList[j]["name1"];
                } else {
                    nameText.text = dataList[j]["name2"];
                }
            } else {
                nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["4"]);
            }
            nameText.x = nameBg.x + nameBg.width/2 - nameText.width/2;
            nameText.y = nameBg.y + nameBg.height/2 - nameText.height/2;
        }  
        // for(let i = 0 ;i < this._nameBgList.length; i ++){
        //     let nameBg = this._nameBgList[i];
        //     let nameText = this._nameTextList[i];
        //     nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["8"]);
        //     nameText.x = nameBg.x + nameBg.width/2 - nameText.width/2;
        //     nameText.y = nameBg.y + nameBg.height/2 - nameText.height/2;
        // }
        // for(let j = 0 ;j < this._winNameBgList.length; j ++){
        //     let nameBg = this._winNameBgList[j];
        //     let nameText = this._winNameTextList[j];
        //     nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["4"]);
        //     nameText.x = nameBg.x + nameBg.width/2 - nameText.width/2;
        //     nameText.y = nameBg.y + nameBg.height/2 - nameText.height/2;
        // }   


    }
    private refreshTimeText():void
    {

        let curStatus = this.vo.getCurStatus();
        let timeStr = "";
        let zeroSt = App.DateUtil.getWeeTs(this.vo.st) + 24 * 60 * 60;
        if(curStatus < 13){
            //显示开战时间
            let time = zeroSt + this.startCurMatchTime;
            timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip1",[String(App.DateUtil.getFormatBySecond(time,13))]);
            this._timeCdText.text = timeStr;
        } else if(curStatus == 13){
            //显示倒计时，或者正在战斗 //或者战斗结束
            
            let sTime = zeroSt + this.startCurMatchTime;
            let oTime = zeroSt + this.startCurMatchTime + Api.crossServerHegemonyVoApi.getMatchTime();
            
            if(sTime > GameData.serverTime){
                //显示倒计时
                let time = sTime - GameData.serverTime;
                timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip2",[String(App.DateUtil.getFormatBySecond(time,1))]);
                this._timeCdText.text = timeStr;
            } else if(sTime <= GameData.serverTime && oTime >= GameData.serverTime){
                //正在进行
                let time = oTime - GameData.serverTime;
                timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip3",[String(App.DateUtil.getFormatBySecond(time,1))]);
                this._timeCdText.text = timeStr;

            } else {
                //战斗结束
                timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip4");
                this._timeCdText.text = timeStr;
            }

        } else if(curStatus > 13){
            //显示战斗结束
            timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip4");
            this._timeCdText.text = timeStr;
        }
        this._timeCdText.x = GameConfig.stageWidth/2 - this._timeCdText.width/2;

    }


	public tick():void{	

        this.refreshTimeText();
	}


	public dispose():void
	{
	    this._timeCdText = null;
        this.startCurMatchTime = 0;
        this._mapContainer = null;
        this._redBg  = null;

        this._winNameBgList = [];
        this._winNameTextList = [];

        this._nameBgList = [];
        this._nameTextList = [];

        this._lineList = [];
		super.dispose();
	}

}