/**
* 据点结算 item 
* date 2020.5.14
* author ycg
* @name SixSection1HoldResultScrollItem
*/
class SixSection1HoldResultScrollItem extends ScrollListItem{

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        this.width = 640;
        let bg = BaseBitmap.create("sixsection1_spointresult_itembg");
        // bg.width = 620;
        bg.x = this.width/2 - bg.width/2;
        this.addChild(bg);

        // let titleBg = BaseBitmap.create("sixsection1_spointresult_titlebg");
        // titleBg.setPosition(bg.x + 5, bg.y + 5);
        // this.addChild(titleBg);
        // titleBg.width = bg.width - 45;
        let numBg = BaseBitmap.create("sixsection1_spointresult_itemnumbg");
        numBg.setPosition(bg.x + 5, bg.y + 3);
        this.addChild(numBg);

        let itemNum = ComponentManager.getTextField(""+(index+1), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        itemNum.setPosition(numBg.x + numBg.width/2 - itemNum.width/2, numBg.y + numBg.height/2 - itemNum.height/2);
        this.addChild(itemNum);

        if (data.type == "build"){
            let getStatusStr = LanguageManager.getlocal("sixSection1HoldResultGet");
            if (data.status == 1){
                getStatusStr = LanguageManager.getlocal("sixSection1HoldResultNotGet");
            }
            let buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.data.x);
            let buildName = LanguageManager.getlocal("sixSection1BuildName"+(buildCfg.baseCfg.index+1));
            let titleName = ComponentManager.getTextField(buildName + getStatusStr, TextFieldConst.FONTSIZE_CONTENT_COMMON , TextFieldConst.COLOR_LIGHT_YELLOW);
            // titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height/2 - titleName.height/2);
            titleName.setPosition(numBg.x + numBg.width + 5, itemNum.y + itemNum.height/2 - titleName.height/2);
            this.addChild(titleName);

            let timeDownStr = App.DateUtil.getFormatBySecond(GameData.serverTime - data.data.et, 4);
            let timeDown = ComponentManager.getTextField(timeDownStr, TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_LIGHT_YELLOW);
            // timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height/2 - timeDown.height/2);
            timeDown.setPosition(bg.x + bg.width - timeDown.width - 35, titleName.y + titleName.height/2 - timeDown.height/2);
            this.addChild(timeDown);

            //获得
            let getInfoStr = LanguageManager.getlocal("sixSection1HoldSeatResName1")+"*"+data.data.res;
            let getInfo = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultItemGet")+getInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_WHITE);
            getInfo.setPosition(titleName.x, titleName.y + titleName.height + 10);
            this.addChild(getInfo);

            //损失
            if (data.data.fname || data.data.fres){
                let loseInfoStr = LanguageManager.getlocal("sixSection1HoldSeatResName1")+"*"+data.data.fres;
                let loseInfo = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultItemNotGet")+loseInfoStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON , TextFieldConst.COLOR_WHITE);
                loseInfo.setPosition(getInfo.x, getInfo.y + getInfo.height + 10);
                this.addChild(loseInfo);

                //抢夺者
                let player = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultItemPlayerInfo") + data.data.fname, TextFieldConst.FONTSIZE_ACTIVITY_COMMON , TextFieldConst.COLOR_WHITE);
                player.setPosition(loseInfo.x, loseInfo.y + loseInfo.height + 10);
                this.addChild(player);

                // bg.height = player.y + player.height + 20;
            }
            // else{
            //     bg.height = bg.height > getInfo.height + getInfo.y + 20 ? bg.height : getInfo.height + getInfo.y + 20;
            // } 
        }
        else{
            let buildCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.data.x);
            let buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName"+(buildCfg.baseCfg.index+1));
            let holdStr = LanguageManager.getlocal("sixSection1HoldResultTitleNotGet");
            let titleName = ComponentManager.getTextField(buildName + holdStr, TextFieldConst.FONTSIZE_CONTENT_COMMON , TextFieldConst.COLOR_LIGHT_YELLOW);
            // titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height/2 - titleName.height/2);
            titleName.setPosition(numBg.x + numBg.width + 5, itemNum.y + itemNum.height/2 - titleName.height/2);
            this.addChild(titleName);

            let timeDownStr = App.DateUtil.getFormatBySecond(GameData.serverTime - data.data.fightst, 4);
            let timeDown = ComponentManager.getTextField(timeDownStr, TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_LIGHT_YELLOW);
            // timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height/2 - timeDown.height/2);
            timeDown.setPosition(bg.x + bg.width - timeDown.width - 35, titleName.y + titleName.height/2 - timeDown.height/2);
            this.addChild(timeDown);

            //抢夺者
            let sv = Api.mergeServerVoApi.getAfterMergeSeverName(data.data.fuid);
            let player = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultItemPlayerInfo") + data.data.fname + "("+sv+")", TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_WHITE);
            // player.setPosition(bg.x + 15, titleBg.y + titleBg.height + 30);
            player.setPosition(titleName.x, titleName.y + titleName.height + 10);
            this.addChild(player);
            // bg.height = player.y + player.height + 20 > bg.height ? player.y + player.height + 20 : bg.height;
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