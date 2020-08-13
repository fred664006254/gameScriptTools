/**
 * 抢夺记录 item
 * author ycg
 * date 2020.5.8
* @name SixSection1HoldLogItem
*/

class SixSection1HoldLogItem extends ScrollListItem{

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        this.width = 620;
        // view.height = 120;
        //标号
        let numTf = ComponentManager.getTextField(""+(index+1), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        numTf.setPosition(20 - numTf.width/2, 15);
        this.addChild(numTf);

        let atkInfo:any = null;
        let defenInfo:any = null;
        let buildName:string = null;
        if (data.type == "director"){
            atkInfo = data.uinfo;
            defenInfo = data.fuinfo;
            let buildCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.x);
            buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName"+(buildCfg.baseCfg.index+1));
        }
        else{
            // atkInfo = data.pklogs[0][3];
            // defenInfo = data.pklogs[0][4];
            atkInfo = data.minfo;
            defenInfo = data.finfo;
            let buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.x);
            buildName = LanguageManager.getlocal("sixSection1BuildName"+(buildCfg.baseCfg.index+1));
        }

        //名字
        // let atkInfo = data.pklogs[0][3];
        let atkSv = Api.mergeServerVoApi.getAfterMergeSeverName(atkInfo.uid);
        let name = ComponentManager.getTextField(atkInfo.name + "(" + atkSv + ")" , TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_ORANGE);
        name.setPosition(50, 15);
        this.addChild(name);
        //称号
        let titlePic = App.CommonUtil.getTitlePic(atkInfo.title);
        if (titlePic){

            titlePic.setScale(0.85);
            titlePic.setPosition(name.x + name.width + 70, 0);
            this.addChild(titlePic);
        }
        //info
        let defenSv = Api.mergeServerVoApi.getAfterMergeSeverName(defenInfo.uid);
        let infoKey = "sixSection1HoldLogInfo1";
        if (data.type == "director"){
            infoKey = "sixSection1HoldLogInfo2";
        }
        let infoStr = LanguageManager.getlocal(infoKey, [defenInfo.name, defenSv, buildName]);
        let info = ComponentManager.getTextField(infoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        info.setPosition(name.x, name.y + name.height + 15);
        info.width = 550;
        info.lineSpacing = 7;
        this.addChild(info);

        //time
        let timeStr = App.DateUtil.getFormatBySecond(data.fightst, 2);
        let time = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldLogTime", [timeStr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        time.setPosition(info.x, info.y + info.height + 10);
        this.addChild(time);

        let line : BaseBitmap = BaseBitmap.create(`public_line1`);
		line.width = this.width;
		line.setPosition(this.width/2 - line.width/2, time.y + time.height + 10);
        this.addChild(line);
        
        this.height = line.y + line.height + 5;
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