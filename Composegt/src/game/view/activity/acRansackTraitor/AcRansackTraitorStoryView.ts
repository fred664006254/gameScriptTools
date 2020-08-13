/**
 * 20190401
 * 奸臣皮肤兑换
 */
class AcRansackTraitorStoryView extends AcCommonView {

	public constructor() {
		super();
	}
	 private _droWifeIcon:BaseLoadDragonBones=undefined;
	private _skinImg:BaseLoadBitmap=undefined;
	private decode():string{

		switch(String(this.param.data.code)){
			case "1":
				return "1";
			case "2":
				return "2";
			case "3":
				return "3";
			case "4":

				return "4";
			case "5":
			
				return "1";
			case "6":

				return "2";
			case "7":

				return "3";
			case "8":

				return "4";
		}
	}
	protected initView(): void {


		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let acvo  = <AcRansackTraitorVo> Api.acVoApi.getActivityVoByAidAndCode(aid,code);
		let cfg = <Config.AcCfg.RansackTraitorCfg>acvo.config;
		let skinId = cfg.getRewardSkinId();
		let skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
		let sercfg = Config.ServantCfg.getServantItemById(skincfg.servantId);

		let topbg:BaseBitmap = BaseBitmap.create("ransackTraitor_bg5");
		let topbg2 = BaseBitmap.create("ransackTraitor_bg3");
		topbg.x =  GameConfig.stageWidth/2 - topbg.width/2;
		topbg2.x =  GameConfig.stageWidth/2 - topbg2.width/2 * topbg.scaleX;
		if(GameConfig.stageHeigth <= 960)
		{
			// topbg2.setScale(0.9);
			topbg.y = 0;
			topbg2.y = topbg.y + topbg.height* topbg.scaleX - 10;
		}else{
			topbg.y = 30;
			topbg2.y = topbg.y + topbg.height + 30;
		}

		this.addChildToContainer(topbg);
		this.addChildToContainer(topbg2);

		let searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		searchtxt1.text  = LanguageManager.getlocal("acRansackTraitor_storybgtxt" + this.decode());
		searchtxt1.multiline = true;
		searchtxt1.lineSpacing = 3;
		searchtxt1.width = topbg.width - 140;
		searchtxt1.y = topbg.y + 80;
		searchtxt1.x = topbg.x + topbg.width/2 -searchtxt1.width/2 ;
		this.addChildToContainer(searchtxt1);

		let txt1 = BaseBitmap.create("ransackTraitor_txt4");
		txt1.x = topbg2.x + topbg2.width/2 -txt1.width/2;
		txt1.y = topbg2.y + 30;
		this.addChildToContainer(txt1);

		
		let servantFullImg = BaseLoadBitmap.create(skincfg.body);
		servantFullImg.width = 640*topbg2.scaleY;
		servantFullImg.height = 482*topbg2.scaleY;
		servantFullImg.anchorOffsetY = servantFullImg.height;
		servantFullImg.x = GameConfig.stageWidth/2 - servantFullImg.width/2; 
		this.addChildToContainer(servantFullImg);
		let posY =  topbg2.y + topbg2.height*topbg2.scaleY -10; 
		servantFullImg.y =posY;

		// this.showDBDragon(skincfg,posY);
		let namebg = BaseBitmap.create("ransackTraitor_namebg2");
		namebg.x = topbg2.x+10 ;
		namebg.y = txt1.y + txt1.height + 40 ;
		this.addChildToContainer(namebg);

		let nametxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		nametxt.text  = sercfg.name;
		nametxt.y = namebg.y + 35;
		nametxt.x = namebg.x + namebg.width/2 - nametxt.width/2;
		this.addChildToContainer(nametxt);

		let flag =  BaseBitmap.create("ransackTraitor_flag");
		flag.x = topbg2.x + topbg2.width*topbg2.scaleY - flag.width ;
		flag.y = topbg2.y + topbg2.height*topbg2.scaleY - flag.height-8 ;
		this.addChildToContainer(flag);
		this.addTouchTap(this.hide,this);
	}
   
	private showDBDragon(serSkincfg:any,posY:number)
	{

		let dagonBonesName = undefined ;
        if(serSkincfg && serSkincfg.bone){
            dagonBonesName = serSkincfg.bone
        }
        let boneName = dagonBonesName + "_ske";
        
        if(  !Api.switchVoApi.checkServantCloseBone() && boneName  && RES.hasRes(boneName)&&App.CommonUtil.check_dragon() ){
            if(this._skinImg){
                this._skinImg.visible = false;
            }
            if(this._droWifeIcon){
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._droWifeIcon.visible = true; 
            this._droWifeIcon.setScale(0.8);
            this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
            this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width/2 *this._droWifeIcon.scaleX;
            this._droWifeIcon.x = GameConfig.stageWidth/2;
            this._droWifeIcon.y = posY;
			// this._droWifeIcon.mask = new egret.Rectangle(0,0,this._droWifeIcon.width,)
            this.addChildToContainer(this._droWifeIcon);
        }else{
			if(!this._skinImg){
				let skinW =640;
				let skinH = 482;
				let tarScale = 1.0;
				let serCfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
				let skinImgPath = serCfg.fullIcon;
				this._skinImg = BaseLoadBitmap.create(skinImgPath);
				this._skinImg.width = skinW;
				this._skinImg.height = skinH;
				this._skinImg.setScale(tarScale);
				this._skinImg.anchorOffsetY = this._skinImg.height;
				this._skinImg.anchorOffsetX = this._skinImg.width/2;
				this._skinImg.x = GameConfig.stageWidth/2;
				this._skinImg.y =posY;
				this.addChildToContainer(this._skinImg);
			}
		}
	}

	protected getBgName():string
	{
		return null;
	}

	protected getResourceList():string[]
	{
		return [
		];
	}
	protected getTitleStr():string
	{
		return null;
	}
	protected getButtomLineBg():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected getTitleBgName():string
	{
		return null;
	}

	public dispose():void
	{
		if(this._droWifeIcon){
			this._droWifeIcon.dispose();
			this._droWifeIcon = null;
		}
        this._skinImg = null;
		super.dispose();
	}
}