/**
* 据点 item 
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoScrollItem2
*/
class SixSection1SeatInfoScrollItem2 extends ScrollListItem{

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
        
        let atkInfo:any = null;
        let defenInfo:any = null;
        let buildName:string = null;
        if (data.type == "director"){
            atkInfo = data.uinfo;
            defenInfo = data.fuinfo;
            let buildCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.x);
            buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName"+(buildCfg.baseCfg.index+1));
        }
        else if (data.type == "build"){
            // atkInfo = data.pklogs[0][3];
            // defenInfo = data.pklogs[0][4];
            atkInfo = data.minfo;
            defenInfo = data.finfo;
            let buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.x);
            buildName = LanguageManager.getlocal("sixSection1BuildName"+(buildCfg.baseCfg.index+1));
        }
        else if (data.type == "investigate"){
            //侦查
            atkInfo = data.minfo;
            let buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.x);
            buildName = LanguageManager.getlocal("sixSection1BuildName"+(buildCfg.baseCfg.index+1));
        }
        else if (data.type == "search"){
            //编号查询
            atkInfo = data.minfo;
        }

        //攻击方
        let svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(atkInfo.uid);
        let titleNameStr = (index+1)+"."+ atkInfo.name + "("+svNameStr+", "+atkInfo.uid+")";
        let titleName = ComponentManager.getTextField(titleNameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON , TextFieldConst.COLOR_LIGHT_YELLOW);
        titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height/2 - titleName.height/2);
        this.addChild(titleName);

        let timeDownStr = App.DateUtil.getFormatBySecond(GameData.serverTime - data.fightst, 4);
        let timeDown = ComponentManager.getTextField(timeDownStr,TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height/2 - timeDown.height/2);
        this.addChild(timeDown);

        let isWin = false;
        let defendInfoStr = "";
        if (data.type == "build" || data.type == "director"){
            if (data.winuid == Api.playerVoApi.getPlayerID()){
                isWin = true;
            }
            let defendKey = "sixSection1SeatInfoDefendInfo1";
            if (isWin){
                defendKey = "sixSection1SeatInfoDefendInfo2";
            }
            if (data.type == "director"){
                defendKey = "sixSection1SeatInfoDefendInfo3";
                if (isWin){
                    defendKey = "sixSection1SeatInfoDefendInfo4";
                }
            }
            defendInfoStr = LanguageManager.getlocal(defendKey, [buildName]);
        }
        else if (data.type == "investigate"){
            //阵容
            // defendInfoStr = "sixSection1SeatInfoDefendInfo5";
            defendInfoStr = LanguageManager.getlocal("sixSection1SeatInfoDefendInfo5", [buildName, ""+data.x, ""+data.y]);
        }
        else if (data.type == "search"){
            //编号查询
            // defendInfoStr = "sixSection1SeatInfoDefendInfo6";
            defendInfoStr = LanguageManager.getlocal("sixSection1SeatInfoDefendInfo6");
        }
        //防守信息
        let defendInfo = ComponentManager.getTextField(defendInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_BROWN);
        defendInfo.setPosition(bg.x + 15, titleBg.y + titleBg.height + 10);
        this.addChild(defendInfo);
        defendInfo.width = 480;
        defendInfo.lineSpacing = 5;

        if (data.type == "investigate" || data.type == "search"){
            defendInfo.y = titleBg.y + titleBg.height + 20;
            bg.height = defendInfo.y + defendInfo.height + 20 > bg.height ? defendInfo.y + defendInfo.height + 20 : bg.height;
        }
        else if (data.type == "director" || data.type == "build"){
            let batleInfoStr = LanguageManager.getlocal("sixSection1SeatInfoDefendBattleInfo2");
            if (!isWin){
                batleInfoStr = LanguageManager.getlocal("sixSection1SeatInfoDefendBattleInfo1", [""+buildName, ""+data.getResource]);
            }
            if (data.type == "director"){
                if (!isWin){
                    batleInfoStr = LanguageManager.getlocal("sixSection1SeatInfoDefendBattleInfo3", [""+buildName]);
                }
                else{
                    batleInfoStr = "";
                }
            }
            
            //战斗信息
            let battleInfo = ComponentManager.getTextField(batleInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_WARN_RED2);
            battleInfo.setPosition(defendInfo.x, defendInfo.y + defendInfo.height + 10);
            this.addChild(battleInfo);

            bg.height = battleInfo.y + battleInfo.height + 15;
        }
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