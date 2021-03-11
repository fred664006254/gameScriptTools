/**
 * 排行榜奖励item
 * @author yangtao
 */
class AcWeaponHouseRankScrollItem2 extends ScrollListItem {
    private itemParam: any = null;

    public constructor() {
        super();
    }

    private get cfg() : Config.AcCfg.MouseComeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcMouseComeVo{
        return <AcMouseComeVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected get aid() {
        return this.itemParam.aid;
    }
    protected get code() {
        return this.itemParam.code;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    protected initItem(index: number, data: any, itemParam: any) {
        this.itemParam = itemParam;

        this.width = 530;
        //item bg
        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width/2 - bg.width/2;
        this.addChild(bg);

        let titleBgImg = "ackite_ranktitlebg4-1"
        if (index < 3){
            titleBgImg = "ackite_ranktitlebg"+(index+1)+"-1";
        }
        //title bg
        let titleBg = BaseBitmap.create(titleBgImg);
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width/2 - titleBg.width/2;
        bg.y = titleBg.y;
        if (index < 3){
            bg.y = titleBg.y + 22;
        }

        //title txt
        let titleTxtStr = "";
        if (index < 3){
            titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailRank"+(index+1), this.getTypeCode()));
        }
        else{
            titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailRank4", this.getTypeCode()), [""+data.downLimit, ""+data.upLimit]);
        }
        let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        titleTxt.x = this.width/2 - titleTxt.width/2;
        titleTxt.y = titleBg.y + 5;
        if (index < 3){
            titleTxt.y = titleBg.y + 27;
        }
        this.addChild(titleTxt);

        //帮主获得
        let rewardIconList = GameData.getRewardItemIcons(data.getReward1, true, true);
		let scale = 0.75;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 10;
        let spaceY = 10;
        let gangtitleTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankGang_title", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this.addChild(gangtitleTxt);
        gangtitleTxt.x = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX) - 40;
        gangtitleTxt.y = bg.y + 104;
        let stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX)/2+gangtitleTxt.height - 30;
        let stY = bg.y + 60;
        let offHeight = 20;
        let offy = 20;
        if (index < 3){
            offHeight = 0;
        }
        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = bg.width - 20;
		rewardBg.x = bg.x + bg.width/2 - rewardBg.width/2;
		rewardBg.y = stY - 10;

		for (let i = 0; i < rewardIconList.length; i++) {
            let rewardDB = rewardIconList[i];
			rewardDB.setScale(scale);
			rewardDB.setPosition(stX + 100 + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB);
		}
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;

        //帮众获得
        let rewardIcononeList = GameData.getRewardItemIcons(data.getReward2, true, true);
        let gangonetitleTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankOne_title", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this.addChild(gangonetitleTxt);
        gangonetitleTxt.x = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX) - 40;
        gangonetitleTxt.y = bg.y + 104+itemHeight;

        for (let i = 0; i < rewardIcononeList.length; i++) {
            let rewardDB1 = rewardIcononeList[i];
			rewardDB1.setScale(scale);
			rewardDB1.setPosition(stX + 100 + ((rewardDB1.width * scale + spaceX) * (i % 5)), stY + itemHeight  + ((rewardDB1.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB1);
		}
        let bgHeight = ((rewardIconList.length + rewardIcononeList.length)% 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight + 10 + itemHeight + 20;
		if (bgHeight > bg.height){
			bg.height = bgHeight;
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
        this.itemParam = null;
        super.dispose();
    }
}