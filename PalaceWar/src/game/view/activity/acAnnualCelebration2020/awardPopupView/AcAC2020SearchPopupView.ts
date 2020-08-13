class AcAC2020SearchPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		let resArr:string[]=["searchbottombg"];
		let bgname:string = this.param.data.bgname;
		resArr.push(bgname);
		return super.getResourceList().concat(resArr);
	}

	protected initView():void
	{
		let bgname:string = this.param.data.bgname;
        let wifeId = this.param.data.wife;
		let skinId = this.param.data.skin;

		let bg:BaseBitmap = BaseBitmap.create(bgname);
		bg.setPosition(App.CommonUtil.getCenterX(this.viewBg,bg,true),0);
        this.addChildToContainer(bg);

		let wifecfg = Config.WifeCfg.getWifeCfgById(wifeId)

        let iconKey:string = "wife_full_" + wifeId;
		if (skinId)
		{
			iconKey = "wife_skin_" + skinId;
		}

        let icon:BaseBitmap=BaseLoadBitmap.create(iconKey);
        icon.setScale(340/640);
        icon.setPosition((this.viewBg.width-330)/2,bg.y+bg.height-840*icon.scaleY+10);
        this.checkDro(wifeId,icon);

        this.addChildToContainer(icon);

        let nameBg:BaseBitmap=BaseBitmap.create("public_infobg2");
        nameBg.setPosition(100+GameData.popupviewOffsetX,30);
        this.addChildToContainer(nameBg);

        let fontSize:number=30;
        let nameTxt:BaseTextField=ComponentManager.getTextField(wifecfg.name,fontSize);
        if(PlatformManager.checkIsTextHorizontal())
        {
            nameTxt.setPosition(bg.x + bg.width / 2 - nameTxt.width / 2, 2 * bg.height / 3 + 20);
            nameBg.width = nameTxt.width + 20;
            nameBg.setPosition(nameTxt.x + nameTxt.width / 2 - nameBg.width / 2 - 5,nameTxt.y + nameTxt.height / 2 - nameBg.height / 2)
        }
        else
        {	
            nameTxt.width=fontSize+2;
            let pos=App.CommonUtil.getCenterPos(nameBg,nameTxt,false);
            nameTxt.setPosition(pos.x+4,pos.y-3);
        }

        this.addChildToContainer(nameTxt);
		

		let buttomBg:BaseBitmap=BaseBitmap.create("searchbottombg");
		buttomBg.width=bg.width;
		buttomBg.height=78;
		buttomBg.setPosition(bg.x,bg.y+bg.height);
		this.addChildToContainer(buttomBg);
		let talkStr:string = this.param.data.desc;

		let descTxt:BaseTextField=ComponentManager.getTextField(talkStr,18);
		descTxt.width=buttomBg.width-20;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, buttomBg, [10,0]);
		this.addChildToContainer(descTxt);


		this.addTouchTap(this.removeTween,this);

		let ths=this;
		egret.Tween.get(this.container).to({alpha:1},500).call(function(){
			ths.removeTouchTap();
			ths.addTouchTap(ths.hide,ths);
		});
	}

	private checkDro(wifeId:any,wifeIcon:any)
	{
		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId)
		let droWifeIcon;
		let bg2Index = this.container.getChildIndex(wifeIcon);
		

		let skinId = this.param.data.skin;
		let wifebone = "wife_full_" + wifeId;
		if (skinId)
		{
			wifebone = "wife_full3_" + skinId;
		}

        if(Api.wifeVoApi.isHaveBone(wifebone + "_ske"))
        {

            droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(wifebone);
            this.container.addChildAt(droWifeIcon,bg2Index);
            wifeIcon.visible = false;
        }
		
		if(droWifeIcon)
		{
			droWifeIcon.setScale(0.6)
			droWifeIcon.x = wifeIcon.x + 140;
			droWifeIcon.y = wifeIcon.y + 760*0.6 - 20;
			wifeIcon.visible = false;
		}
		else{
			wifeIcon.visible = true;
		}
	}
	private removeTween():void
	{
		if(this.container)
		{
			egret.Tween.removeTweens(this.container);
			this.container.alpha=1;
		}
		this.removeTouchTap();
		this.addTouchTap(this.hide,this);
	}

	protected getBgExtraHeight():number
	{
		return 0;
	}


	protected getTitleStr():string
	{
		return this.param.data.title;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

    public hide():void
	{	
		
		if ( this.param.data.f)
        {
            this.param.data.f.apply(this.param.data.o);
        }
		super.hide();
	}

	public dispose():void
	{
		super.dispose();
	}
}