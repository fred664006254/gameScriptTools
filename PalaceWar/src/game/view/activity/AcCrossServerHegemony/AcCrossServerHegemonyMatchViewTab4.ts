//
class AcCrossServerHegemonyMatchViewTab4 extends CommonViewTab
{

    private _matchName:BaseTextField = null;
	private _timeCdText:BaseTextField = null;
    private startCurMatchTime1 = (13 * 24 + 21) * 60 * 60;
    private startCurMatchTime2 = (14 * 24 + 21) * 60 * 60;

    private _mapContainer: BaseDisplayObjectContainer = null;
    private _redBg:BaseBitmap = null;
    private _winNameBgList:BaseBitmap[] = [];
    private _winNameTextList:BaseTextField[] = [];

    private _nameBgList:BaseBitmap[] = [];
    private _nameTextList:BaseTextField[] = [];

    private _firstTextList:BaseTextField = null;

    private _lineList:any[] = [];

    private _line1:BaseBitmap = null;
    private _line11:BaseBitmap = null;
    private _line2:BaseBitmap = null;
    private _line22:BaseBitmap = null;
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

        let matchName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyMatchTab1"),24,TextFieldConst.COLOR_WARN_YELLOW2)
        matchName.x = redBg.x + redBg.width/2 - matchName.width/2;
        matchName.y = redBg.y + 8;
        this.addChild(matchName);
        this._matchName = matchName;

        this._timeCdText = ComponentManager.getTextField(" ",24,TextFieldConst.COLOR_WARN_YELLOW);
        this._timeCdText.x = GameConfig.stageWidth/2 - this._timeCdText.width/2;
        this._timeCdText.y = matchName.y + matchName.height + 5;
        this.addChild(this._timeCdText);
        

        this.refreshTimeText();
        this.createMatchMap();
        this.initMatchMap1();
        this.initMatchMap2();
	}
    private initMatchMap1():void
    {

        let dataList = Api.crossServerHegemonyVoApi.getDetailPkInfo(3);
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
                 nameText1.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["4"]);
                 nameText2.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["4"]);
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
                    nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["2"]);
                } else if(dataList[j]["win"] == 1) {
                    if (dataList[j]["name1"])
                    {
                        nameText.text = dataList[j]["name1"];
                    }
                    else
                    {
                        nameText.text = LanguageManager.getlocal("countryWarRewardType9");
                    }
                } else {
                    if (dataList[j]["name2"])
                    {
                        nameText.text = dataList[j]["name2"];
                    }
                    else
                    {
                        nameText.text = LanguageManager.getlocal("countryWarRewardType9");
                    }
                }
            } else {
                nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["2"]);
            }
            nameText.x = nameBg.x + nameBg.width/2 - nameText.width/2;
            nameText.y = nameBg.y + nameBg.height/2 - nameText.height/2;
        }   
    } 
    private initMatchMap2():void
    {
        let status = this.vo.getCurStatus();
        if(status != 15){

        }
        let dataList = Api.crossServerHegemonyVoApi.getDetailPkInfo(4);
        // let dataList = [];
        // console.log(dataList);

        for(let i = 0 ;i < this._winNameBgList.length; i += 2){
            let nameBg1 = this._winNameBgList[i];
            let nameText1 = this._winNameTextList[i];

            let nameBg2 = this._winNameBgList[i+1];
            let nameText2 = this._winNameTextList[i+1];
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
                 nameText1.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["2"]);
                 nameText2.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName1",["2"]);
            }
           
            nameText1.x = nameBg1.x + nameBg1.width/2 - nameText1.width/2;
            nameText1.y = nameBg1.y + nameBg1.height/2 - nameText1.height/2;
            nameText2.x = nameBg2.x + nameBg2.width/2 - nameText2.width/2;
            nameText2.y = nameBg2.y + nameBg2.height/2 - nameText2.height/2;
        }
        // for(let j = 0 ;j < this._firstTextList.length; j ++){
            // let nameBg = this._firstTextList[j];
            let nameText = this._firstTextList;
            if(dataList.length > 0){
                nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName2");
                // if(j < dataList.length){
                if(dataList[0]["win"] == -1) {
                    nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName2");
                } else if(dataList[0]["win"] == 1) {
                    nameText.text = dataList[0]["name1"];
                } else {
                    nameText.text = dataList[0]["name2"];
                }
                
            } else {
                nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName2");
            }
            nameText.x = GameConfig.stageWidth/2 - nameText.width/2;
            // } else {
            //     nameText.text = LanguageManager.getlocal("acCrossServerHegemonyMatchBlankName2");
            // }
            
            // nameText.y = nameBg.y + nameBg.height/2 - nameText.height/2;
        // }   
    }       

    private createMatchMap():void
    {
        this._mapContainer = new BaseDisplayObjectContainer();
        this._mapContainer.width = GameConfig.stageWidth;
        this._mapContainer.height = 800;
        // this._mapContainer.y = 80;
        let touchAlpha = BaseBitmap.create("public_alpha");
        touchAlpha.width = this._mapContainer.width;
        touchAlpha.height = this._mapContainer.height;
        this._mapContainer.addChild(touchAlpha);

    // private _winNameBgList:BaseBitmap[] = [];
    // private _winNameTextList:BaseTextField[] = [];

    // private _nameBgList:BaseBitmap[] = [];
    // private _nameTextList:BaseTextField[] = [];

    // private _firstTextList:BaseTextField = null;
        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,885 - 8 - (1136 - GameConfig.stageHeigth)); //873
        let mapScrollView = ComponentManager.getScrollView(this._mapContainer,rect);
        mapScrollView.x = GameConfig.stageWidth/2 - mapScrollView.width/2;
        mapScrollView.y = this._redBg.y + this._redBg.height ;
        this.addChild(mapScrollView);


        this._line1 = BaseBitmap.create("accshegemony_matchline4_3");
        this._line1.height = 90;
        this._line1.x = GameConfig.stageWidth/2 - this._line1.width/2;
        
        this._mapContainer.addChild(this._line1);
        this._line11 = BaseBitmap.create("accshegemony_matchline4_5");
        this._line11.height = 90;
        this._line11.x = GameConfig.stageWidth/2 - this._line11.width/2;
        this._line11.visible = false;
        this._mapContainer.addChild(this._line11);

        this._line2 = BaseBitmap.create("accshegemony_matchline4_3");
        this._line2.height = 210;
        this._line2.x = GameConfig.stageWidth/2 - this._line2.width/2;
        this._mapContainer.addChild(this._line2);
        this._line22 = BaseBitmap.create("accshegemony_matchline4_5");
        this._line22.height = 210;
        this._line22.x = GameConfig.stageWidth/2 - this._line22.width/2;
        this._line22.visible = false;
        this._mapContainer.addChild(this._line22);

        let firstBg = BaseBitmap.create("accshegemony_matchfirstbg");
        firstBg.x = GameConfig.stageWidth/2 - firstBg.width/2;
        firstBg.y = 0;
        this._mapContainer.addChild(firstBg);
        this._line1.y = firstBg.y + firstBg.height - 20;
        this._line11.y = firstBg.y + firstBg.height - 20;

        let firstIcon = BaseBitmap.create("accshegemony_matchfirsttitle");
        firstIcon.x = firstBg.x + firstBg.width/2 - firstIcon.width/2;
        firstIcon.y = firstBg.y + 10;
        this._mapContainer.addChild(firstIcon);

        let firstTextBg = BaseBitmap.create("accshegemony_matchfirst_lightbg");
        firstTextBg.x = firstBg.x + firstBg.width/2 - firstTextBg.width/2;
        firstTextBg.y = firstBg.y + firstBg.height/2 - 35;
        this._mapContainer.addChild(firstTextBg);

        let firstText = ComponentManager.getTextField(" ",22,TextFieldConst.COLOR_WARN_YELLOW);
        this._mapContainer.addChild(firstText);
        // this._nameTextList.push(firstText);
        firstText.x = GameConfig.stageWidth/2 - firstText.width/2;
        firstText.y = firstBg.y + 170 - firstText.height/2 + 7;
        this._firstTextList = firstText;

        let winBg = BaseBitmap.create("accshegemony_matchlastbg");
        winBg.x = GameConfig.stageWidth/2 - winBg.width/2;
        winBg.y = firstBg.y + 430 - winBg.height/2;
        this._mapContainer.addChild(winBg);
        this._line2.y = winBg.y + winBg.height - 5;
        this._line22.y = winBg.y + winBg.height - 5;

        let winBg1 = BaseBitmap.create("accshegemony_matchnamebg2");
        winBg1.x = 177 - winBg1.width/2;
        winBg1.y = winBg.y + winBg.height/2 - winBg1.height/2;
        this._mapContainer.addChild(winBg1);
        this._winNameBgList.push(winBg1);

        let winText1 = ComponentManager.getTextField(" ",22,TextFieldConst.COLOR_WARN_YELLOW);
        this._mapContainer.addChild(winText1);
        winText1.x = winBg1.x + winBg1.width/2 - winText1.width/2;
        winText1.y = winBg1.y + winBg1.height/2 - winText1.height/2;
        this._winNameTextList.push(winText1);


        let winBg2 = BaseBitmap.create("accshegemony_matchnamebg2");
        winBg2.x = 465 - winBg2.width/2;
        winBg2.y = winBg.y + winBg.height/2 - winBg2.height/2;
        this._mapContainer.addChild(winBg2);
        this._winNameBgList.push(winBg2);

        let winText2 = ComponentManager.getTextField(" ",22,TextFieldConst.COLOR_WARN_YELLOW);
        this._mapContainer.addChild(winText2);
        winText2.x = winBg2.x + winBg2.width/2 - winText2.width/2;
        winText2.y = winBg2.y + winBg2.height/2 - winText2.height/2;
        this._winNameTextList.push(winText2);


        let leftLine1 = BaseBitmap.create("accshegemony_matchline4_1");
        leftLine1.x = GameConfig.stageWidth/2 - leftLine1.width;
        leftLine1.y = firstBg.y + 678 - leftLine1.height/2;
        this._mapContainer.addChild(leftLine1);

        let leftLine2 = BaseBitmap.create("accshegemony_matchline4_2");
        leftLine2.x = GameConfig.stageWidth/2 - leftLine2.width;
        leftLine2.y = firstBg.y + 678 - leftLine2.height/2;
        leftLine2.visible = false;
        this._mapContainer.addChild(leftLine2);

        let leftLine3 = BaseBitmap.create("accshegemony_matchline4_2");
        leftLine3.scaleY = -1;
        leftLine3.x = GameConfig.stageWidth/2 - leftLine3.width;
        leftLine3.y = firstBg.y + 678 - leftLine3.height * leftLine3.scaleY/2;
        leftLine3.visible = false;
        this._mapContainer.addChild(leftLine3);
        let leftLine = {line1:leftLine1, line2:leftLine2, line3:leftLine3};
        this._lineList.push(leftLine);

        let rightLine1 = BaseBitmap.create("accshegemony_matchline4_1");
        rightLine1.scaleX = -1;
        rightLine1.x = GameConfig.stageWidth/2 - rightLine1.width * rightLine1.scaleX;
        rightLine1.y = firstBg.y + 678 - rightLine1.height * rightLine1.scaleY/2;
        this._mapContainer.addChild(rightLine1);

        let rightLine2 = BaseBitmap.create("accshegemony_matchline4_2");
        rightLine2.scaleX = -1;
        rightLine2.x = GameConfig.stageWidth/2 - rightLine2.width * rightLine2.scaleX;
        rightLine2.y = firstBg.y + 678 - rightLine2.height * rightLine2.scaleY/2;
        rightLine2.visible = false;
        this._mapContainer.addChild(rightLine2);

        let rightLine3 = BaseBitmap.create("accshegemony_matchline4_2");
        rightLine3.scaleX = -1;
        rightLine3.scaleY = -1;
        rightLine3.x = GameConfig.stageWidth/2 - rightLine3.width * rightLine3.scaleX;
        rightLine3.y = firstBg.y + 678 - rightLine3.height * rightLine3.scaleY/2;
        rightLine3.visible = false;
        this._mapContainer.addChild(rightLine3);
        let rightLine = {line1:rightLine1, line2:rightLine2, line3:rightLine3};
        this._lineList.push(rightLine);


        let nameBg1 = BaseBitmap.create("accshegemony_matchnamebg1");
        nameBg1.x = 126 - nameBg1.width/2;
        nameBg1.y = firstBg.y + 596 - nameBg1.height/2;
        this._mapContainer.addChild(nameBg1);
        this._nameBgList.push(nameBg1);

        let nameText1 = ComponentManager.getTextField(" ",22,0x9adbff);
        this._mapContainer.addChild(nameText1);
        nameText1.x = nameBg1.x + nameBg1.width/2 - nameText1.width/2;
        nameText1.y = nameBg1.y + nameBg1.height/2 - nameText1.height/2;
        this._nameTextList.push(nameText1);

        let nameBg2 = BaseBitmap.create("accshegemony_matchnamebg1");
        nameBg2.x = 126 - nameBg2.width/2;
        nameBg2.y = firstBg.y + 760 - nameBg2.height/2;
        this._mapContainer.addChild(nameBg2);
        this._nameBgList.push(nameBg2);
        let nameText2 = ComponentManager.getTextField(" ",22,0x9adbff);
        this._mapContainer.addChild(nameText2);
        nameText2.x = nameBg2.x + nameBg2.width/2 - nameText2.width/2;
        nameText2.y = nameBg2.y + nameBg2.height/2 - nameText2.height/2;
        this._nameTextList.push(nameText2);


        let nameBg3 = BaseBitmap.create("accshegemony_matchnamebg1");
        nameBg3.x = 514 - nameBg3.width/2;
        nameBg3.y = firstBg.y + 596 - nameBg3.height/2;
        this._mapContainer.addChild(nameBg3);
        this._nameBgList.push(nameBg3);

        let nameText3 = ComponentManager.getTextField(" ",22,0x9adbff);
        this._mapContainer.addChild(nameText3);
        nameText3.x = nameBg3.x + nameBg3.width/2 - nameText3.width/2;
        nameText3.y = nameBg3.y + nameBg3.height/2 - nameText3.height/2;
        this._nameTextList.push(nameText3);

        let nameBg4 = BaseBitmap.create("accshegemony_matchnamebg1");
        nameBg4.x = 514 - nameBg4.width/2;
        nameBg4.y = firstBg.y + 760 - nameBg4.height/2;
        this._mapContainer.addChild(nameBg4);
        this._nameBgList.push(nameBg4);

        let nameText4 = ComponentManager.getTextField(" ",22,0x9adbff);
        this._mapContainer.addChild(nameText4);
        nameText4.x = nameBg4.x + nameBg4.width/2 - nameText4.width/2;
        nameText4.y = nameBg4.y + nameBg4.height/2 - nameText4.height/2;
        this._nameTextList.push(nameText4);



    }
    private refreshTimeText():void
    {

        let curStatus = this.vo.getCurStatus();
        let timeStr = "";
        let zeroSt = App.DateUtil.getWeeTs(this.vo.st) + 24 * 60 * 60;
        let matchNameStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTab4");
        if(curStatus < 14){
            matchNameStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTab4");
            //显示开战时间
            let time = zeroSt + this.startCurMatchTime1;
            timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip1",[String(App.DateUtil.getFormatBySecond(time,13))]);
            this._timeCdText.text = timeStr;
        } else if(curStatus == 14){
            matchNameStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTab4");
            //显示倒计时，或者正在战斗 //或者战斗结束
            
            let sTime = zeroSt + this.startCurMatchTime1;
            let oTime = zeroSt + this.startCurMatchTime1 + Api.crossServerHegemonyVoApi.getMatchTime();
            
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

        } else if(curStatus == 15){
            matchNameStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTab5");
            //显示倒计时，或者正在战斗 //或者战斗结束
            
            let sTime = zeroSt + this.startCurMatchTime2;
            let oTime = zeroSt + this.startCurMatchTime2 + Api.crossServerHegemonyVoApi.getMatchTime();
            
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

        } else if(curStatus > 15){
            matchNameStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTab5");
            //显示战斗结束
            timeStr = LanguageManager.getlocal("acCrossServerHegemonyMatchTimeTip4");
            this._timeCdText.text = timeStr;
        }
        this._matchName.text = matchNameStr;
        this._matchName.x = GameConfig.stageWidth/2 - this._matchName.width/2;
        this._timeCdText.x = GameConfig.stageWidth/2 - this._timeCdText.width/2;

    }


	public tick():void{	

        this.refreshTimeText();
	}


	public dispose():void
	{
        this._matchName = null;
	    this._timeCdText = null;
        this.startCurMatchTime1 = 0;
        this.startCurMatchTime2 = 0;

        this._mapContainer = null;
        this._redBg = null;
        this._winNameBgList = [];
        this._winNameTextList = [];

        this._nameBgList = [];
        this._nameTextList = [];

        this._firstTextList = null;

        this._lineList = [];

        this._line1 = null;
        this._line11 = null;
        this._line2 = null;
        this._line22 = null;
		super.dispose();
	}

}