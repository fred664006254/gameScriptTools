/**
 * 国庆节活动 衣装奖励
 * author yangchengguo
 * date 2019.9.10
 * @class AcNationalDayClothesView
 */
class AcNationalDayClothesView extends CommonView{
    private _nodeContainer:BaseDisplayObjectContainer = null;
    private _skinContainer:BaseDisplayObjectContainer = null;
    private _skinArr:BaseDisplayObjectContainer[] = [];
    private _skinIndex:number = 0;
    private _skinNameTxt:BaseTextField = null;
    private _servantNameTxt:BaseTextField = null;
    private _skinNameBg:BaseBitmap = null;
    private _servantIcon:BaseLoadDragonBones = null;
    private _servantImg:BaseLoadBitmap = null;
    private _maskContainer:BaseDisplayObjectContainer = null;
    private _isSelectServant:boolean = false;
    public constructor(){
        super();
    }

    public initView():void{
        if (this.param && this.param.data && this.param.data.index){
            this._skinIndex = this.param.data.index;
        }
        let nodeContainer = new BaseDisplayObjectContainer();
        nodeContainer.width = GameConfig.stageWidth;
        nodeContainer.height = GameConfig.stageHeigth;
        this.addChildToContainer(nodeContainer);
        this._nodeContainer = nodeContainer;

        let titleImg = ResourceManager.hasRes("acnationalday_clothes_titlebg-" + this.getTypeCode()) ? "acnationalday_clothes_titlebg-" + this.getTypeCode():"acnationalday_clothes_titlebg-1";
        let titleBg = BaseBitmap.create(titleImg);
        titleBg.setPosition(GameConfig.stageWidth/2 - titleBg.width/2, 0);
        nodeContainer.addChild(titleBg);

        //樱花 acnationalday_blossom_ske  "ac_throwstone_car-1"
        let blossomBone = "acnationalday_blossom";
        let blossomBoneName = blossomBone + "_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && RES.hasRes(blossomBoneName) && App.CommonUtil.check_dragon()) {
            let blossomIcon = App.DragonBonesUtil.getLoadDragonBones("acnationalday_blossom", 0 , "acnationalday_blossom");
            blossomIcon.anchorOffsetX = blossomIcon.width / 2;
            blossomIcon.x = GameConfig.stageWidth/2 - blossomIcon.width / 2;
            blossomIcon.y = 100;
            nodeContainer.addChild(blossomIcon);
        }

        let titleStr = ResourceManager.hasRes("acnationalday_clothes_title_text-" + this.getTypeCode()) ? "acnationalday_clothes_title_text-" + this.getTypeCode():"acnationalday_clothes_title_text-1";
        let title = BaseBitmap.create(titleStr);
        title.setPosition(titleBg.x + titleBg.width/2 - title.width/2, titleBg.y + 20);
        nodeContainer.addChild(title);

        let titleEffect = ComponentManager.getCustomMovieClip("acnationalday_textlight_effect", 12, 70);
        let titleEffect1 = BaseBitmap.create("acnationalday_textlight_effect1");
        App.LogUtil.log("titleEffect1.width: "+titleEffect1.width);
        titleEffect.setScale(1.2);
        titleEffect.setPosition(title.x - 80, title.y - 45);
        nodeContainer.addChild(titleEffect);
        titleEffect.playWithTime(1);
        titleEffect.setEndCallBack(()=>{
            titleEffect.visible = false;
            egret.Tween.get(titleEffect).wait(4000).call(()=>{
                titleEffect.visible = true;
                titleEffect.playWithTime(1);
            })
        }, this);


        // let topLine: BaseBitmap = BaseBitmap.create("public_line3");
        // nodeContainer.addChild(topLine);
        let titleInfoStr = ResourceManager.hasRes("acnationalday_title_info-" + this.getTypeCode()) ? "acnationalday_title_info-" + this.getTypeCode():"acnationalday_title_info-1";
        let titleInfo = BaseBitmap.create(titleInfoStr);
        titleInfo.setPosition(GameConfig.stageWidth/2 - titleInfo.width/2, title.y + title.height + 15);
        nodeContainer.addChild(titleInfo);
        // topLine.width = 600;
        // topLine.setPosition(20, titleInfo.y + titleInfo.height/2 - 5);

        //门客显示
        this.showServantView();

        //衣装名字
        let skinNamebg = BaseBitmap.create("skin_detail_namebg");
		skinNamebg.setPosition(60, titleInfo.y + 105);
        nodeContainer.addChild(skinNamebg);
        this._skinNameBg = skinNamebg;

        let skinId = this.cfg.show1[this._skinIndex];
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
		skinNameTxt.setPosition(skinNamebg.x + skinNamebg.width / 2 - skinNameTxt.width / 2, skinNamebg.y + 33);
        nodeContainer.addChild(skinNameTxt);
        this._skinNameTxt = skinNameTxt;
        
        let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinNamebg.x + skinNamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        nodeContainer.addChild(servantNameTxt);
        this._servantNameTxt = servantNameTxt;
        
        //bottom
        let bottomDescBg = BaseBitmap.create("public_9_bg86");
        bottomDescBg.width = 620;
        bottomDescBg.x = GameConfig.stageWidth/2 - bottomDescBg.width/2;
        nodeContainer.addChild(bottomDescBg);

        let bottomDesc = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayClothesGetInfo-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomDesc.width = bottomDescBg.width;
        bottomDesc.lineSpacing = 3;
        bottomDesc.textAlign = TextFieldConst.ALIGH_CENTER;
        nodeContainer.addChild(bottomDesc);
        bottomDescBg.height = bottomDesc.height + 30;
        
        let bottomBgStr = ResourceManager.hasRes("acnationalday_clothes_select_bg-" + this.getTypeCode()) ? "acnationalday_clothes_select_bg-" + this.getTypeCode() : "acnationalday_clothes_select_bg-1";
        let bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.x = GameConfig.stageWidth/2 - bottomBg.width/2;
        bottomBg.y =  GameConfig.stageHeigth - bottomBg.height - 40;
        nodeContainer.addChild(bottomBg);
        bottomDescBg.y = bottomBg.y - bottomDescBg.height + 10;
        bottomDesc.setPosition(bottomDescBg.x + bottomDescBg.width/2 - bottomDesc.width/2, bottomDescBg.y + bottomDescBg.height/2 - bottomDesc.height/2 - 3);

        let skinContainer = new BaseDisplayObjectContainer();
        skinContainer.setPosition(bottomBg.x, bottomBg.y);
        this.addChildToContainer(skinContainer);
        this._skinContainer = skinContainer;

        let skinData = this.cfg.show1;
        for (let i = 0; i < 5; i++){
            let container = new BaseDisplayObjectContainer();
            let skinImg = ResourceManager.hasRes("acnationalday_clothes-"+ this.getTypeCode() +"_" + (skinData[i])) ? "acnationalday_clothes-" + this.getTypeCode() +"_" + (skinData[i]) : "acnationalday_clothes-1_"+ (skinData[i]);
            let skinBg = BaseBitmap.create(skinImg);
            container.width = skinBg.width;
            container.height = skinBg.height;
            container.anchorOffsetX = container.width/2;
            container.anchorOffsetY = container.height/2;
            container.addChild(skinBg);
            skinBg.addTouchTap(this.skinClickHandler, this, [i]);

            let skinId = skinData[i];
            let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
            let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
            let name = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
            name.setPosition(skinBg.x + skinBg.width/2 - name.width/2, skinBg.y + skinBg.height - name.height - 10);
            container.addChild(name);
            
            // skinBg.setScale(0.73);
            // skinBg.anchorOffsetX = skinBg.width/2;
            // skinBg.anchorOffsetY = skinBg.height/2;
            // skinBg.setPosition(3 + skinBg.width/2 * skinBg.scaleX + i * (skinBg.width * skinBg.scaleX), 40 + skinBg.height/2 * skinBg.scaleY);
            // skinContainer.addChildAt(skinBg, 1);
            
            let skinEffect = ComponentManager.getCustomMovieClip("acnationalday_select_effect", 12, 70);
            skinEffect.anchorOffsetX = 125;
            skinEffect.anchorOffsetY = 175;
            skinEffect.setScale(1.1);
            skinEffect.setPosition(container.width/2, container.height/2 - 3);
            container.addChild(skinEffect);
            skinEffect.playWithTime(0);
            skinEffect.visible = false;
            skinEffect.name = "skinEffect";

            container.setScale(0.73);
            container.setPosition(3 + container.width/2 * container.scaleX + i * (container.width * container.scaleX), 40 + container.height/2 * container.scaleY);
            skinContainer.addChildAt(container, 1);

            this._skinArr[i] = container;
        }

        this.skinClickHandler(null, this._skinIndex);

        /**详细预览 */
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(GameConfig.stageWidth/2 - 100, bottomDescBg.y - 40 - skinTxtEffectBM.height / 2);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
		skinTxtEffect.addTouchTap(() => {
            let servantSkinId = this.cfg.show1[this._skinIndex];
            let wifeId = this.cfg.show2[this._skinIndex];
            let servantTopMsg = LanguageManager.getlocal("acNationalDayServantSkinTopInfo-"
            +this.getTypeCode());
            let wifeTopMsg = LanguageManager.getlocal("acNationalDayWifeTopInfo-"+this.getTypeCode());
            let servantBg = "acnationalday_servant_bg-"+this.getTypeCode();
            // let data = [
            //     {id:""+servantSkinId, type:"servantSkin", topMsg:servantTopMsg, bgName:servantBg},
            //     {id:""+wifeId, type:"wife", topMsg:wifeTopMsg, bgName:""}
            // ];
            // ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONCLOTHESPOPUPVIEW, data);
            let servantSkinType = Config.ServantskinCfg.formatRewardItemVoStr(servantSkinId);
			let wifeType = Config.WifeCfg.formatRewardItemVoStr(wifeId);
            let data = {data:[
                {idType:servantSkinType, topMsg:servantTopMsg, bgName:servantBg},
                {idType:wifeType, topMsg:wifeTopMsg, bgName:""}
            ]};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
        }, this);

		let skinTxt = BaseBitmap.create("acnationalday_skin_detail_txt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(skinTxtEffect.x + 100, bottomDescBg.y - 40);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

        let skinTxteffect = BaseBitmap.create("acnationalday_skin_detail_txt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
    }

    public showServantView(){
        let container = new BaseDisplayObjectContainer();
        container.width = GameConfig.stageWidth; 
        container.height = 540;
        container.x = 0;
        container.y = GameConfig.stageHeigth - 320 - container.height;
        this._nodeContainer.addChild(container);

        // let rect = new egret.Rectangle(0, 0, container.width, container.height);
        let maskContainer = new BaseDisplayObjectContainer();
        maskContainer.width = container.width;
        maskContainer.height = container.height;
        // maskContainer.mask = rect;
        maskContainer.setPosition(0, 0);
        container.addChild(maskContainer);
        this._maskContainer = maskContainer;

        let skinId = this.cfg.show1[this._skinIndex];
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantIcon.scaleY = 1;
            servantIcon.scaleX = 1;
            servantIcon.anchorOffsetY = servantIcon.height;
            servantIcon.anchorOffsetX = servantIcon.width / 2;
            servantIcon.x = maskContainer.width / 2;
            servantIcon.y = maskContainer.y + maskContainer.height;
            maskContainer.addChild(servantIcon);
            this._servantIcon = servantIcon;
        }
        else {
            let skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(1);
            skinImg.x = maskContainer.width / 2;
            skinImg.y = maskContainer.y + maskContainer.height;
            maskContainer.addChild(skinImg);
            this._servantImg = skinImg;
        }
    }

    //设置门客
    public setServantView():void{
        let skinId = this.cfg.show1[this._skinIndex];
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        if (this._servantIcon){
            this._servantIcon.dispose();
            this._servantIcon = null;
        }
        let boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantIcon.scaleY = 1;
            servantIcon.scaleX = 1;
            servantIcon.anchorOffsetY = servantIcon.height;
            servantIcon.anchorOffsetX = servantIcon.width / 2;
            servantIcon.x = this._maskContainer.width / 2;
            servantIcon.y = this._maskContainer.y + this._maskContainer.height;
            this._maskContainer.addChild(servantIcon);
            this._servantIcon = servantIcon;
            if (this._servantImg){
                this._servantImg.dispose();
                this._servantImg = null;
            }
        }
        else{
            if (this._servantImg){
                this._servantImg.setload(skinCfg.body);
            }
            else{
                let skinImg = BaseLoadBitmap.create(skinCfg.body);
                skinImg.width = 405;
                skinImg.height = 467;
                skinImg.anchorOffsetY = skinImg.height;
                skinImg.anchorOffsetX = skinImg.width / 2;
                skinImg.setScale(1);
                skinImg.x = this._maskContainer.width / 2;
                skinImg.y = this._maskContainer.y + this._maskContainer.height;
                this._maskContainer.addChild(skinImg);
                this._servantImg = skinImg;
            }  
        }
    }

    //点击皮肤
    public skinClickHandler(event:any, idx:number){
        App.LogUtil.log("skinClickHandler: idx: "+idx);
        if (this._skinIndex == idx){
            if (this._isSelectServant){
                return;
            }
        }
        else{
            this._isSelectServant = true;
        }
        for (let i = 0; i < this._skinArr.length; i++){
            this._skinContainer.setChildIndex(this._skinArr[i], 1);
            this._skinArr[i].setScale(0.73);
            let skinEffect = <BaseBitmap>this._skinArr[i].getChildByName("skinEffect");
            skinEffect.visible = false;
        }
        this._skinIndex = idx;
        let currSkin = this._skinArr[idx];
        let skinEffect = <BaseBitmap>currSkin.getChildByName("skinEffect");
        skinEffect.visible = true;
        this._skinContainer.setChildIndex(currSkin, 7);
        egret.Tween.get(currSkin).to({scaleX: 0.9, scaleY: 0.9}, 50);
        if (this._isSelectServant){
            this.changeSkin();
        }
        this._isSelectServant = true;
    }

    //切换皮肤
    public changeSkin():void{
        let skinId = this.cfg.show1[this._skinIndex];
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        this._skinNameTxt.text = skinCfg.getSkinName();
        this._skinNameTxt.x = this._skinNameBg.x + this._skinNameBg.width/2 - this._skinNameTxt.width/2;
        let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        this._servantNameTxt.text = servantCfg.name;
        this._servantNameTxt.x = this._skinNameBg.x + this._skinNameBg.width/2 - this._servantNameTxt.width/2;

        //切换骨骼或者静态图
        this.setServantView();
    }

    private get cfg():Config.AcCfg.NationalDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcNationalDayVo{
        return <AcNationalDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    public get code():string{
        return this.param.data.code;
    }

    public get aid():string{
        return this.param.data.aid;
    }

    //背景图
    protected getBgName():string{
        return ResourceManager.hasRes("acnationalday_clothes_bg-"+this.getTypeCode()) ? "acnationalday_clothes_bg-"+this.getTypeCode() : "acnationalday_clothes_bg-1";
    }

    //标题背景
    protected getTitleBgName():string{
        return "";
    }

    //标题
    protected getTitleStr():string{
        return "";
    }

    //规则
    protected getRuleInfo(): string {
        return "";
    }

    protected isHideTitleBgShadow():boolean{
		return true;
	}

    //资源
    public getResourceList():string[]{
        let list:string[] = []
        if (this.getTypeCode() != "1"){
            list = ["acnationalday_clothes_titlebg-1", "acnationalday_clothes_title_text-1", "acnationalday_title_info-1", "acnationalday_clothes-1_20091", "acnationalday_clothes-1_20101",
            "acnationalday_clothes-1_20111","acnationalday_clothes-1_20121","acnationalday_clothes-1_20131",
            "acnationalday_clothes_select_bg-1", "acnationalday_clothes_bg-1",

            ];
        }
        return super.getResourceList().concat([
            "acnationalday_skin_detail_txt", "skin_detail_namebg",
            "acnationalday_clothes_titlebg-" + this.getTypeCode(),
            "acnationalday_clothes_title_text-" + this.getTypeCode(),
            "acnationalday_title_info-" + this.getTypeCode(),
            "acnationalday_clothes-"+ this.getTypeCode() +"_20091",
            "acnationalday_clothes-"+ this.getTypeCode() +"_20101",
            "acnationalday_clothes-"+ this.getTypeCode() +"_20111",
            "acnationalday_clothes-"+ this.getTypeCode() +"_20121",
            "acnationalday_clothes-"+ this.getTypeCode() +"_20131",
            "acnationalday_clothes_select_bg-" + this.getTypeCode(),
            "acnationalday_clothes_bg-"+this.getTypeCode(),

        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACNATIONALDAY_CHANGE_VIEW);
        this._nodeContainer = null;
        this._skinContainer = null;
        this._skinArr = [];
        this._skinIndex = 0;
        this._skinNameTxt = null;
        this._servantNameTxt = null;
        this._skinNameBg = null;
        this._servantIcon = null;
        this._servantImg = null;
        this._isSelectServant = false;
        super.dispose();
    }

}