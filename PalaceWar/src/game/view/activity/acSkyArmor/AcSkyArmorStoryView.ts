/*
    author : wxz
    date : 2020/6/22
    desc : 天魔铠甲--吕布衣装
*/
class AcSkyArmorStoryView extends CommonView{

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
        return this.code;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcSkyArmorVo{
        return <AcSkyArmorVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.SkyArmorCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public initView():void{
        let bg = BaseBitmap.create(App.CommonUtil.getResByCode("acskyarmor_storybg", this.getTypeCode()));
        bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, GameConfig.stageHeigth/2 - bg.height/2);
        this.addChildToContainer(bg);

        let bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acskyarmor_storybottombg", this.getTypeCode()));
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
            droIcon.x = bg.x + bg.width / 2 - 40;
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
        let skinnamebg = BaseBitmap.create(App.CommonUtil.getResByCode("acskyarmor_storynamebg", this.getTypeCode()));
        skinnamebg.height = 80;
        skinnamebg.setPosition(bg.x + 80, bg.y + 80);
        this.addChildToContainer(skinnamebg);

        let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        // let skinName = ComponentManager.getTextField(skinCfg.name + " " + servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_LIGHT_YELLOW);
        // skinName.setPosition(nameBg.x + 11 + 124/2 - skinName.width/2, nameBg.y + 19);
        // this.addChildToContainer(skinName);

        // let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        // skinnamebg.setPosition(bg.x+80, bg.y + 80);
        // this.addChildToContainer(skinnamebg);

        let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 18);
        this.addChildToContainer(skinNameTxt);

        let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 26);
        this.addChildToContainer(servantNameTxt);        

        let skinDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorStoryInfo", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        skinDesc.setPosition(bg.x + 107, bg.y + 639);
        skinDesc.width = 420;
        skinDesc.lineSpacing = 6;
        this.addChildToContainer(skinDesc);

        let con = this.vo.getAuraCon();
        con.x = skinDesc.x+skinDesc.width-con.width*con.scaleX/2-15;
        con.y = skinDesc.y - con.height*con.scaleY - 20;
        this.addChildToContainer(con);
    }

    public dispose():void{
        super.dispose();
    }
}