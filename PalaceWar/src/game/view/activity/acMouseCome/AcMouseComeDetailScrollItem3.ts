/**
 * 奖池item
 * @author ycg
 */
class AcMouseComeDetailScrollItem3 extends ScrollListItem {
    private _aid:string = null;
    private _code:string = null;

    public constructor() {
        super();
    }

    private get vo():AcMouseComeVo{
        return <AcMouseComeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.MouseComeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return this._aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }
    
    protected initItem(index: number, data: any, itemParam: any) {
        this._aid = itemParam.aid;
        this._code = itemParam.code;

        this.width = 530;
        let rewardStx = 0;
        let rewardW = 0;
        if (data.type == 1){
        //item bg
            let bg = BaseBitmap.create("accshegemony_ranklistbg"+data.id);
            bg.width = this.width - 14;
            bg.height = 190;
            bg.x = this.width/2 - bg.width/2;
            this.addChild(bg);

            let titleBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_poolitemtitle"+data.id, this.getTypeCode()));
            this.addChild(titleBg);
            titleBg.width = 260;
            titleBg.x = bg.x;
            titleBg.y = bg.y + 7;
            
            //title txt
            let titleTxtStr = data.id + "." + LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailPoolItemName"+data.id, this.getTypeCode()));
            let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTxt.x = titleBg.x + 10;
            titleTxt.y = titleBg.y + titleBg.height/2 - titleTxt.height/2;
            this.addChild(titleTxt);

            let lightCon = this.getLigthByType(data.id);
            this.addChild(lightCon);
            if (data.id == 1){
                lightCon.x = bg.x + 35;
                lightCon.y = titleBg.y + titleBg.height + 55;
            }
            else if (data.id == 2){
                lightCon.x = bg.x + 80;
                lightCon.y = titleBg.y + titleBg.height + 10;
            }
            else if (data.id == 3){
                lightCon.x = bg.x + 35;
                lightCon.y = titleBg.y + titleBg.height + 10;
            }

            let arrow = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardarrow", this.getTypeCode()));
            arrow.setPosition(bg.x + bg.width/2 - arrow.width/2 - 45, bg.y + bg.height/2 - arrow.height/2 + 12);
            this.addChild(arrow);

            let rewardIconList = GameData.getRewardItemIcons(data.getReward, true, true);
            let scale = 0.7;
            let spaceX = 10;
            let spaceY = 10;
            for (let i = 0; i < rewardIconList.length; i++) {
                let rewardDB = rewardIconList[i];
                rewardDB.setScale(scale);
                rewardDB.setPosition(bg.x + bg.width/2 - 10 + (rewardDB.width * scale + spaceX) * i, titleBg.y + titleBg.height + 40);
                this.addChild(rewardDB);
            }
            this.height = bg.height + this.getSpaceY();
        }
        else{
            let titleBg = BaseBitmap.create("public_textbrownbg");
            this.addChild(titleBg);
            titleBg.x = this.width/2 - titleBg.width/2;
            
            //title txt
            let titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailPoolItemName"+data.id, this.getTypeCode()));
            let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTxt.x = titleBg.x + titleBg.width/2 - titleTxt.width/2;
            titleTxt.y = titleBg.y + titleBg.height/2 - titleTxt.height/2;
            this.addChild(titleTxt);

            let rewardIconList = GameData.getRewardItemIcons(data.getReward, true, true);
            let scale = 0.8;
            let itemHeight = 108;
            let itemWidth = 108;
            let spaceX = 15;
            let spaceY = 15;
            let stX = 10 + (this.width - 20 - (itemWidth * scale + spaceX) * 5 + spaceX)/2;
            let stY = titleBg.y + titleBg.height + 15;
            let offHeight = 10;
            
            for (let i = 0; i < rewardIconList.length; i++) {
                let rewardDB = rewardIconList[i];
                rewardDB.setScale(scale);
                rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
                this.addChild(rewardDB);
            }

            let bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight;
            
            this.height = bgHeight + this.getSpaceY();
        }
    }

    public getLigthByType(id:number):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        for (let i=0; i < 3; i++){
            let light = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_light", this.getTypeCode()));
            light.setScale(0.35);
            container.addChild(light);
            if (id == 1){
                light.x = (light.width * light.scaleX + 10) * i;
            }
            else if (id == 2){
                light.y = (light.width * light.scaleY + 10) * i;
            }
            else if (id == 3){
                light.x = (light.width * light.scaleX + 10) * i;
                light.y = (light.width * light.scaleY + 10) * i;
            }
        }
        return container;
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
        this._aid = null;
        this._code = null;
        super.dispose();
    }
}