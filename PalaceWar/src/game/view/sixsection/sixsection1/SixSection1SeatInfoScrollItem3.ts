/**
* 仇人 item 
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoScrollItem3
*/
class SixSection1SeatInfoScrollItem3 extends ScrollListItem{

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        this.width = 530;
        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width/2 - bg.width/2;
        this.addChild(bg);

        let titleBg = BaseBitmap.create("sixsection1_spointresult_titlebg");
        titleBg.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(titleBg);
        titleBg.width = bg.width - 25;

        let eInfo:any = null;
        let defenInfo:any = null;
        let buildName:string = null;
        if (data.data[0].type == "director"){
            eInfo = data.data[0].uinfo;
            let buildCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.data[0].x);
            buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName"+(buildCfg.baseCfg.index+1));
        }
        else{
            // eInfo = data.data[0].pklogs[0][3];
            eInfo = data.data[0].minfo;
            let buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.data[0].x);
            buildName = LanguageManager.getlocal("sixSection1BuildName"+(buildCfg.baseCfg.index+1));
        }

        //仇人
        let svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(eInfo.uid);
        let titleNameStr = (index+1)+"."+ eInfo.name + "("+svNameStr+", "+eInfo.uid+")";
        let titleName = ComponentManager.getTextField(titleNameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON , TextFieldConst.COLOR_LIGHT_YELLOW);
        titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height/2 - titleName.height/2);
        this.addChild(titleName);

        let timeDownStr = App.DateUtil.getFormatBySecond(GameData.serverTime - data.data[0].fightst, 4);
        let timeDown = ComponentManager.getTextField(timeDownStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON , TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height/2 - timeDown.height/2);
        this.addChild(timeDown);

        //官品
        let levelNum = eInfo.level;
        let level = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoEnemyLv", [LanguageManager.getlocal("officialTitle"+levelNum)]) , TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_BROWN);
        level.setPosition(bg.x + 20, titleBg.y + titleBg.height + 10);
        this.addChild(level);

        //势力
        let powerNum = 0;
        if (eInfo.power){
            powerNum = eInfo.power;
        }
        let power = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoEnemyPower", [""+App.StringUtil.changeIntToText(powerNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_BROWN);
        power.setPosition(level.x, level.y + level.height + 10);
        this.addChild(power);

        //抢夺数
        let holdNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoEnemyHoldNum", [""+data.data.length]), TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_BROWN);
        holdNum.setPosition(power.x, power.y + power.height + 10);
        this.addChild(holdNum);

        //最近抢夺
        let holdInfoStr = LanguageManager.getlocal("sixSection1SeatInfoEnemyCurrHold", [""+buildName, ""+data.data[0].x, ""+data.data[0].y]);
        let holdInfo = ComponentManager.getTextField(holdInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_BROWN);
        holdInfo.setPosition(holdNum.x, holdNum.y + holdNum.height + 10);
        this.addChild(holdInfo);

        let infoBg = BaseBitmap.create("sixsection1_spointinfobg");
        infoBg.width = bg.width - 10;
        infoBg.height = 42;
        infoBg.x = bg.x + bg.width/2 - infoBg.width/2;
        infoBg.y = holdInfo.y + holdInfo.height + 10;
        this.addChild(infoBg);

        let arrowContainer = new BaseDisplayObjectContainer();
        this.addChild(arrowContainer);
        arrowContainer.height = 42;
        let arrow = BaseBitmap.create("sixsectionmainui_downflag");
        arrowContainer.addChild(arrow);
        let arrowTxt = BaseBitmap.create("sixsection1_downtxt");
        arrowContainer.addChild(arrowTxt);
        arrow.y = arrowContainer.height/2 - arrow.height/2;
        arrowTxt.x = arrow.x + arrow.width - 10;
        arrowContainer.x = infoBg.x + infoBg.width/2 - (arrow.width + arrowTxt.width - 10)/2;
        arrowContainer.y = infoBg.y + infoBg.height/2 - arrowContainer.height/2;

        let isShowAll = data.isShowAll;
        arrowContainer.addTouchTap(()=>{
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_SEATINFO_REFRESH, {index: index, isShowAll: !isShowAll});
        }, this);
        
        if (isShowAll){
            holdInfo.text = LanguageManager.getlocal("sixSection1SeatInfoEnemyHoldDetail");
            //添加 具体数据
            for (let i=0; i < data.data.length; i++){
                let bNameStr:string = "";
                if (data.data[i].type == "build"){
                    let buildTmpCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.data[i].x);
                    bNameStr = LanguageManager.getlocal("sixSection1BuildName"+(buildTmpCfg.baseCfg.index+1));
                }
                else{
                    let buildTmpCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.data[i].x);
                    bNameStr = LanguageManager.getlocal("sixSection1TitlePopupItemName"+(buildTmpCfg.baseCfg.index+1));
                }
                let timeStr = App.DateUtil.getFormatBySecond(data.data[i].fightst, 2);
                let time = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                time.setPosition(infoBg.x + 35, infoBg.y + 15 + i * (time.height + 10));
                this.addChild(time);
                let bName = ComponentManager.getTextField(bNameStr+"("+data.data[i].x+", "+data.data[i].y+")", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                bName.setPosition(infoBg.x + infoBg.width/2 + 20, time.y);
                this.addChild(bName);
            }
            infoBg.height = 15 + data.data.length * 30 + 45;
            arrow.setRes("sixsectionmainui_upflag");
            arrowTxt.setRes("sixsection1_uptxt");
            arrowContainer.y = infoBg.y + infoBg.height - arrowContainer.height;
        }
        bg.height = infoBg.y + infoBg.height + 5;
    }

    public getSpaceX():number{
        return 5;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        
        super.dispose();
    }
}