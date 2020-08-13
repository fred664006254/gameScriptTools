class ServantNewSkinButton extends BaseDisplayObjectContainer
{   
    private _selectLight:BaseBitmap = null;
    public _servantSkinId :string = null;

    public constructor()
	{
		super();
	}

	public init(skinId:string,servantId:string,f:Function,o:any):void
	{
        this._servantSkinId = skinId;

        let btnBg = "servant_skin_bg";
        let btnType = 1;
        let titleBg:string = null;
        let picStr:string ;
        if (this._servantSkinId == "")
        {
            picStr = "servant_half_"+servantId;
        }
        else
        {
            let skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
            picStr = skincfg.icon;
            if (skincfg.type && (skincfg.type == 2 || skincfg.type == 3)){
                btnType = skincfg.type;
                btnBg = "servant_skin_bg_"+btnType;
                btnBg = ResourceManager.hasRes("servant_skin_bg_"+btnType) ? "servant_skin_bg_"+btnType : "servant_skin_bg";
                // titleBg = "servant_skin_title_"+btnType;
            }
        }
        
        let bgButton = ComponentManager.getButton(btnBg,null,f,o,[skinId,this],3);
        this.addChild(bgButton);
        
        let icon = BaseLoadBitmap.create(picStr);
		icon.setScale(0.5);

		var circle:egret.Shape = new egret.Shape();
		circle.graphics.beginFill(0x0000ff);
		circle.graphics.drawRect(0,0,72,72);
		circle.graphics.endFill();
        circle.rotation = 45;
        circle.x = 58;
        circle.y = 8;
		this.addChild(circle);

		icon.mask = circle;
		this.cacheAsBitmap = true;
		icon.x = 10;
        icon.y = 20;
        this.addChild(icon);
        
        //btnEffect
        let btnEffect:CustomMovieClip = null;
        if (btnType > 1){
            btnEffect = ComponentManager.getCustomMovieClip("servant_skinbtn_selecteffect", 16, 70); // w133 h 105 
            btnEffect.setPosition(bgButton.x - 8 ,bgButton.y + 6);
            btnEffect.playWithTime(0);
            this.addChild(btnEffect);
        }

        this._selectLight = BaseBitmap.create("servant_skin_selected");
        this.addChild(this._selectLight);

        if(this._servantSkinId != "" && !Api.servantVoApi.isOwnSkinOfSkinId(this._servantSkinId))
        {
            App.DisplayUtil.changeToGray(bgButton);
            App.DisplayUtil.changeToGray(icon);
            if (btnEffect){
                App.DisplayUtil.changeToGray(btnEffect);
            }
        }  
        let flag = App.CommonUtil.getServantSkinFlagById(this._servantSkinId);
        if(flag){
            flag.setScale(0.8);
            this.addChild(flag);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, flag, bgButton, [0, -flag.height * flag.scaleY/2]);
        }    
    }

    public setSelect(b:boolean):void
    {
        this._selectLight.visible = b;
    }

    public dispose()
    {
        this._selectLight = null;
        this._servantSkinId = null;

        super.dispose();
    }
}