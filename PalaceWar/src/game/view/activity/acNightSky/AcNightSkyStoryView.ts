/**
* 夜观天象
* date 2020.6.15
* author ycg
* @name AcNightSkyStoryView
*/
class AcNightSkyStoryView extends CommonView{

    public constructor() {
        super();
    }

    protected getBgName():string{
        return "";
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return "";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return ""
    }

    protected getProbablyInfo():string{
        return ""
    }

    protected getCloseBtnName():string{
        return null;
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            
        ).concat(list);
    }

    protected isTouchMaskClose():boolean{
        return true;
    }

    protected getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        if (this.code == "4"){
            return "3";
        }
        return this.code;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcNightSkyVo{
        return <AcNightSkyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.NightSkyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public initView():void{
        let bg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_storybg", this.getTypeCode()));
        bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, GameConfig.stageHeigth/2 - bg.height/2);
        this.addChildToContainer(bg);

        let bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_storybottombg", this.getTypeCode()));
        // bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, GameConfig.stageHeigth/2 - bg.height/2 - (bottomBg.height - 130)/2);
        bottomBg.setPosition(bg.x + bg.width/2 - bottomBg.width/2, bg.y + bg.height - bottomBg.height);

        //衣装
        let skinId = this.cfg.show;
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let boneName = null;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
			let droIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
			droIcon.setScale(1);
			droIcon.anchorOffsetY = droIcon.height;
			droIcon.anchorOffsetX = droIcon.width / 2;
            droIcon.x = bg.x + bg.width / 2;
			droIcon.y = bottomBg.y + 10;
			this.addChildToContainer(droIcon);
		}
		else {
			let skinImg = BaseLoadBitmap.create(skinCfg.body);
			skinImg.width = 406;
			skinImg.height = 467;
			skinImg.anchorOffsetY = skinImg.height;
			skinImg.anchorOffsetX = skinImg.width / 2;
			skinImg.setScale(1);
			skinImg.x = bg.x + bg.width / 2;
			skinImg.y = bottomBg.y + 50;
			this.addChildToContainer(skinImg);
        }
        this.addChildToContainer(bottomBg);

        //name 
        let nameBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_storynamebg", this.getTypeCode()));
        nameBg.setPosition(bg.x + 80, bg.y + 80);
        this.addChildToContainer(nameBg);

        let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        let skinName = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON , TextFieldConst.COLOR_LIGHT_YELLOW);
        skinName.setPosition(nameBg.x + 11 + 124/2 - skinName.width/2, nameBg.y + 19);
        this.addChildToContainer(skinName);

        let skinDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyStoryInfo", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        skinDesc.setPosition(bg.x + 107, bg.y + 639);
        skinDesc.width = 420;
        skinDesc.lineSpacing = 6;
        this.addChildToContainer(skinDesc);
    }

    public dispose():void{
        
        super.dispose();
    }
}