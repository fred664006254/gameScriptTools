/**
 * 	国战奖励item相关
 * author 张朝阳
 * date 2018/11/16
 * @class CountryWarRewardItem
 */
class CountryWarRewardItem extends ScrollListItem {
    private _data = null;
    public constructor() {
        super();
    }

    protected initItem(index: number, data: any, itemParam: any) {
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 528;
        this.addChild(bg);

        let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 508;
        titleBg.height = 33;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);

        let titleTxtStr: string = null;
        switch (itemParam.type) {
            case 1:
                if (index == 0) {
                    titleTxtStr = LanguageManager.getlocal("countryWarRewardItemWin");
                }
                else if(index == 1){
                    titleTxtStr = LanguageManager.getlocal("countryWarRewardItemLose");
                }
                else{
                    titleTxtStr = LanguageManager.getlocal("countryWarRewardItemLast");
                }
                this._data = data;
                break;
            case 2:
                titleTxtStr = LanguageManager.getlocal("countryWarRewardItemHaveCity",[data.cityNum]);
                this._data = data.cityReward;
                break;
            case 3:
                let rankstr = "";
                if(data.maxRank == data.minRank)
                {
                    rankstr = String(data.maxRank)
                }
                else
                {
                    rankstr =  String(data.minRank) + "-"+  String(data.maxRank)
                }
                titleTxtStr = LanguageManager.getlocal("countryWarRewardItemRank",[rankstr]);
                this._data = data.powerReward;
                break;
        }
        let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.setPosition(titleBg.x + titleBg.width / 2 - titleTxt.width / 2, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
        this.addChild(titleTxt);

        let leftLine = BaseBitmap.create("public_line3");
        leftLine.width += titleTxt.width;
        leftLine.setPosition(titleTxt.x + titleTxt.width / 2 - leftLine.width / 2, titleTxt.y + titleTxt.height / 2 - leftLine.height / 2);
        this.addChild(leftLine);

        let rewardVoList = GameData.formatRewardItem(this._data);
        let scaleValue = 0.85;
        let offestHeight = 0;
        let startWidth = 11.5;
        for (let i = 0; i < rewardVoList.length; i++) {

            let rewardDB = GameData.getItemIcon(rewardVoList[i],true);
            rewardDB.setScale(scaleValue);
            let rewardDBWidth = rewardDB.width * scaleValue;
            let posX = bg.x + startWidth  + (((i) % 5) * (rewardDBWidth + startWidth));
            let posY = titleBg.y + titleBg.height + 10 + (Math.floor((i) / 5) * (rewardDB.height * scaleValue + 5));
            rewardDB.setPosition(posX, posY);
            this.addChild(rewardDB);
            offestHeight = rewardDB.height * scaleValue;
        }
        bg.height += offestHeight * (Math.floor(rewardVoList.length / 6) + 1) - 25;

        this.width = bg.width;
        this.height = bg.height;
    }

    public dispose(): void {
        this._data = null;
        super.dispose();
    }
}