/**
 * 排行榜奖励item
 * @author ycg
 */
class AcKiteDetailPopupViewTab1ScrollItem extends ScrollListItem {
    private itemParam: any = null;

    public constructor() {
        super();
    }
    private get vo(): AcKiteVo {
        return <AcKiteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg(): Config.AcCfg.KiteCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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

        let titleBgImg = "ackite_ranktitlebg4"
        if (index < 3){
            titleBgImg = "ackite_ranktitlebg"+(index+1);
        }
        //title bg
        let titleBg = BaseBitmap.create(this.getDefaultRes(titleBgImg));
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width/2 - titleBg.width/2;
        bg.y = titleBg.y;
        if (index < 3){
            bg.y = titleBg.y + 22;
        }

        //title txt
        let titleTxtStr = "";
        if (index < 3){
            titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteDetailRank"+(index+1), this.getTypeCode()));
        }
        else{
            titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteDetailRank4", this.getTypeCode()), [""+data.minRank, ""+data.maxRank]);
        }
        let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        titleTxt.x = this.width/2 - titleTxt.width/2;
        titleTxt.y = titleBg.y + 5;
        if (index < 3){
            titleTxt.y = titleBg.y + 27;
        }
        this.addChild(titleTxt);

        if (Number(index) == 0) {
            let firstInfo = itemParam.firstInfo;
            let userPic = null;
            let nameString = LanguageManager.getlocal("acKiteNoone");
            let score = 0;
            if (firstInfo) {
                if (firstInfo.pic) {
                    userPic = firstInfo.pic;
                }
                if (firstInfo.name) {
                    nameString = firstInfo.name;
                }
                if (firstInfo.value) {
                    score = Number(firstInfo.value) * this.cfg.unitLength;
                }
            }

            let _posContainer = Api.playerVoApi.getPlayerCircleHead(userPic, "head_circle_bg_4043");
            _posContainer.setScale(1.2);
            _posContainer.x = bg.x + 45;
            _posContainer.y = bg.y + 45;
            this.addChild(_posContainer);

            let nameTxt = ComponentManager.getTextField(nameString, 22, TextFieldConst.COLOR_BROWN);
            nameTxt.x = 220;
            nameTxt.y = 100;
            this.addChild(nameTxt);

            if (score) {
                let scoreStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acKiteDetailRankScore`, this.getTypeCode()), [""+score]);
                let scoreTxt = ComponentManager.getTextField(scoreStr, 22, TextFieldConst.COLOR_BROWN);
                scoreTxt.x = nameTxt.x;
                scoreTxt.y = nameTxt.y + nameTxt.height + 10;
                this.addChild(scoreTxt);
            }

            let line = BaseBitmap.create("settingview_line");
            line.setPosition(bg.x + bg.width/2 - line.width/2, bg.y + 165 + 6);
            this.addChild(line);
        }

        let rewardIconList = GameData.getRewardItemIcons(data.getReward, true, true);
		let scale = 0.8;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 10;
        let spaceY = 10;
        let stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX)/2;
        let stY = bg.y + 60;
        let offHeight = 20;
        if (index == 0){
            stY = 220;
        }
        if (index < 3){
            offHeight = 0;
        }
        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = bg.width - 20;
		rewardBg.x = bg.x + bg.width/2 - rewardBg.width/2;
		rewardBg.y = stY - 10;
        this.addChild(rewardBg);

		for (let i = 0; i < rewardIconList.length; i++) {
            let rewardDB = rewardIconList[i];
			rewardDB.setScale(scale);
			rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB);
		}
		let bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight + 10;
		if (bgHeight > bg.height){
			bg.height = bgHeight;
        }
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;

		this.height = bg.y + bg.height + this.getSpaceY();
    }

    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode ? defaultCode : "1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } 
        else if (ResourceManager.hasRes(resName+"-"+defaultCode)){
            return resName+"-"+defaultCode;
        }
        else{
            return resName;
        }
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