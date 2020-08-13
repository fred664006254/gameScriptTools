/**
 * 欢乐圣诞新奖励展示
 * date 2019.11.26
 * @class AcChristmasNewRewardView
 */
class AcChristmasNewRewardView extends CommonView{
    private _floor:number = null;

    public constructor(){
        super();
    }

    protected getContainerY():number
	{
		return 0;
	}

    public initView():void{
        App.LogUtil.log("AcChristmasNewRewardView: "+this.param.data.code);
        this._floor = this.param.data.floor;
        let aid = this.param.data.aid;
        let code = this.param.data.code;

        let infoBgStr = ResourceManager.hasRes("acchristmas-"+this.getTypeCode()+"_rewardInfobg") ? "acchristmas-"+this.getTypeCode()+"_rewardInfobg" : "acchristmas-8_rewardInfobg";
        let infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(GameConfig.stageWidth/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 1);
        this.addChildToContainer(infoBg);

        let lineStr = ResourceManager.hasRes("acchristmas-"+this.getTypeCode()+"_line") ? "acchristmas-"+this.getTypeCode()+"_line" : "acchristmas-_line";
        let line = BaseBitmap.create(lineStr);
        line.setPosition(infoBg.x + infoBg.width/2 - line.width/2, infoBg.y + 1);
        this.addChildToContainer(line);

        let bg = BaseBitmap.create("dragonboattab1bg");
		bg.width = GameConfig.stageWidth;
		bg.height = GameConfig.stageHeigth - infoBg.height - infoBg.y + 2;
		bg.setPosition(0, infoBg.y + infoBg.height - 2);
        this.addChildToContainer(bg);
        
        // let listBg = BaseBitmap.create("public_9_bg43");
		// listBg.width = bg.width - 30;
		// listBg.height = bg.height - 30;
		// listBg.setPosition(bg.x + bg.width/2 - listBg.width/2, bg.y + 15);
        // this.addChildToContainer(listBg);

        let bottomBg = BaseBitmap.create("mainui_chatbg"); //public_9_bg11
        bottomBg.width = bg.width - 24;
        bottomBg.height = 30;
        bottomBg.setPosition(bg.x + bg.width/2 - bottomBg.width/2, bg.y + bg.height - 16 - bottomBg.height);
        
        let index = 3;
        if (this.vo.getFloor() >= 4){
            index = 4;
        }
        let data:any[] = [];
        for (let i = index; i > 0; i--){
            let floorData = this.cfg.getFloorRewardPoolList(""+i);
            let _data = {data:floorData, id:i};
            data.push(_data);
        }
        App.LogUtil.log("AcChristmasNewRewardView datalength: "+data.length+" cdoe:"+code);
        let rect = new egret.Rectangle(0, 0, bg.width - 30, bg.height - 30 - bottomBg.height);
        let list = ComponentManager.getScrollList(AcChristmasNewRewardScrollItem, data, rect, {aid:aid, code:code});
        list.setPosition(bg.x + 15, bg.y + 15);
        this.addChildToContainer(list);
        list.horizontalScrollPolicy = "off";
        if (this._floor){
            // if (this.vo.getFloor() >= 4){
            //     this._floor = 4 - this._floor;
            // }
            // else{
            //     this._floor = 3 - this._floor;
            // }
            let floor = this.vo.getFloor();
            if (floor >= 4){
                floor = 0;
            }
            else{
                floor = 3 - floor;
            }
            list.setScrollTopByIndex(floor, 1000);
        }
        this.addChildToContainer(bottomBg);

        let bottomTip = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasAchieve-"+this.getTypeCode()+"_bottomTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomTip.setPosition(bottomBg.x + bottomBg.width/2 - bottomTip.width/2, bottomBg.y + bottomBg.height/2 - bottomTip.height/2);
        this.addChildToContainer(bottomTip);
    }

    private get vo():AcChristmasVo{
        return <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code)
    }

    private get cfg(){
        return <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private getTypeCode():string{
        if (this.code == "9" || this.code == "10"){
            return "8";
        }
        return this.code;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    protected getTitleStr():string{
        return "";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    // 标题背景名称
    protected getTitleBgName(): string {
        return "acchristmasview_titlebg_"+this.getTypeCode();;
    }

    protected getRuleInfo(): string {
        return "acChristmasRuleInfo_"+ this.param.data.code;
    }

    protected getResourceList(): string[] {
        let list:string[] = [];
        if (this.getTypeCode() == "8"){
            list = [
                "acchristmasviewcode8",
            ];
        }
        return super.getResourceList().concat([
            "dragonboattab1bg", "acchristmasview_smalldescbg",
        ]).concat(list);
    }

    public dispose():void{
        this._floor = null;

        super.dispose();
    }
}