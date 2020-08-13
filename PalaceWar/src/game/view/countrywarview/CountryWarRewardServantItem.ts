/**
 * 	国战点将录item相关
 * author 张朝阳
 * date 2018/11/16
 * @class CountryWarRewardServantItem
 */
class CountryWarRewardServantItem extends ScrollListItem {

    public constructor() {
        super();
    }

    protected initItem(index: number, data: any, itemParam: any) {
        this.width = 528;
        this.height = 170;
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = this.width;
        bg.height = this.height;
        this.addChild(bg);

        let startDate = App.DateUtil.getFormatBySecond(data.startTime, 7);
        let endDate = App.DateUtil.getFormatBySecond((data.endTime - 86400), 7);
        let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardServantDate", [startDate, endDate]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        dateTxt.setPosition(bg.x + 325 - dateTxt.width / 2, bg.y + 15);
        this.addChild(dateTxt);

        // let powerTxt  = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardServantAddPower",["20"]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN2);
        // powerTxt.setPosition(bg.x + 320 - powerTxt.width / 2,bg.y + 14);
        // this.addChild(powerTxt);

        let line = BaseBitmap.create("public_line1");
        line.setPosition(bg.x + bg.width / 2 - line.width / 2, dateTxt.y + dateTxt.height + 5);
        this.addChild(line);

        let dateBg = BaseBitmap.create("countrywarrewardview_date1");
        dateBg.setPosition(bg.x + 40, line.y + line.height + 5);
        this.addChild(dateBg);

        let dataList = Api.countryWarVoApi.getServantAddPower(data.cfg);
        let rectWidth = 121 * dataList.length;
        let rect = new egret.Rectangle(0, 0, rectWidth, 110);
        let scrollList = ComponentManager.getScrollList(CountryWayServantItem, dataList, rect, { width: 116, height: 108, temW: 108, numTxtScale: 0.7, nameSize: TextFieldConst.FONTSIZE_CONTENT_SMALL });
        scrollList.setPosition(dateTxt.x + dateTxt.width / 2 - scrollList.width / 2, line.y + line.height + 5);
        this.addChild(scrollList);
        if (data.startTime <= GameData.serverTime && GameData.serverTime < data.endTime) {
            dateBg.setRes("countrywarrewardview_date1");
            bg.setRes("public_9_bg55");
        }
        else if (data.startTime > GameData.serverTime) {
            bg.setRes("public_9_bg14");
            if (index == 1) {
                dateBg.setRes("countrywarrewardview_date3");
            }
            else {
                dateBg.setVisible(false);
            }

        }
        else if (GameData.serverTime >= data.endTime) {
            dateBg.setRes("countrywarrewardview_date2");
            let bgMask = BaseBitmap.create("public_9_bg54");
            bgMask.width = bg.width;
            bgMask.height = bg.height;
            bgMask.setPosition(bg.x,bg.y);
            this.addChild(bgMask);

        }

    }
    public dispose(): void {
        super.dispose();
    }
}