/**
 * 七日签到 佳人展示-前
 * @author wxz
 * date 2020/6/9
 * @class SevenDaysSignUpFirShowView
 */
class SevenDaysSignUpFirShowView extends PopupView 
{
	private _rightBtn1:BaseButton=null;
	private _rightBtn2:BaseButton=null;
	private _wifeCon1:BaseDisplayObjectContainer=null;
	private _wifeCon2:BaseDisplayObjectContainer=null;
	private _isBone:boolean = false;
	public constructor()
	{
		super();
	}
	protected getBgName():string
	{	
		return null;;
	}
	protected getTitleBgName():string
	{
		return null;
	}
	protected getTitleStr():string
	{
		return null;
	}		
	protected getCloseBtnName():string
	{
		return null;
	}	
	protected resetBgSize():void
	{

	}
	protected initView(): void 
	{
		LocalStorageManager.set("isShowSevenDaysSignUpFirShowView"+Api.playerVoApi.getPlayerID(), '1');

		let bg = BaseBitmap.create("sevendayssignupshowbg");
		bg.x = GameConfig.stageWidth/2 - bg.width/2;
		bg.y = GameConfig.stageHeigth/2 - bg.height/2-50;
		this.addChild(bg);

		let title = BaseBitmap.create("sevendayssignupshowtitle");
		this.setLayoutPosition(LayoutConst.horizontalCentertop,title,bg,[0,-45]);
		this.addChild(title);

		let wifeCon1 = new BaseDisplayObjectContainer();
		this.addChild(wifeCon1);
		this._wifeCon1 = wifeCon1;

		let wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeIds[0]);
		let bonename = wifeCfg.bone;
		if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon())
		{
			this._wifeCon1.x = 15;
			this._wifeCon1.y = 730;
			this._isBone = true;
		}else
		{
			this._wifeCon1.x = -140;
			this._wifeCon1.y = 280;
			this._isBone = false;
		}
		this._wifeCon1.y += (GameConfig.stageHeigth-1136)/4;
		
		let wifeCon2 = new BaseDisplayObjectContainer();
		this.addChild(wifeCon2);
		this._wifeCon2 = wifeCon2;
		this._wifeCon2.x = this._wifeCon1.x;
		this._wifeCon2.y = this._wifeCon1.y;		
		
		let bot = BaseBitmap.create("sevendayssignupshowbot");
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom,bot,bg,[0,-150]);
		this.addChild(bot);	

		let txtimg = BaseBitmap.create("sevendayssignupshowtxt1");
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom,txtimg,bot,[0,110]);
		this.addChild(txtimg);

		let showEff = ComponentManager.getCustomMovieClip("sevendayssignupshowtxteff", 10, 100);
		showEff.width = 260;
		showEff.height = 130;
		showEff.setPosition(200,txtimg.y-115);
		showEff.playWithTime(0);
		this.addChild(showEff);

		let showtxtimg = BaseBitmap.create("sevendayssignupshowtxt");
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom,showtxtimg,txtimg,[0,60]);
		this.addChild(showtxtimg);

        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xff0000,1);
        shp.graphics.drawRect(0,0,640,txtimg.y);
        shp.graphics.endFill();
        this.addChild(shp);
        var shp2:egret.Shape = new egret.Shape();
        shp2.graphics.beginFill(0xff0000,1);
        shp2.graphics.drawRect(0,0,640,txtimg.y);
        shp2.graphics.endFill();
        this.addChild(shp2);		

		this._wifeCon1.mask = shp;
		this._wifeCon2.mask = shp2;

		this._rightBtn1 = ComponentManager.getButton("sevendayssignup_btn1","",this.clickRightBtn1,this)
		this._rightBtn1.x = GameConfig.stageWidth - this._rightBtn1.width - 10;
		this._rightBtn1.y = txtimg.y - 10;
		this.addChild(this._rightBtn1);

		this._rightBtn2 = ComponentManager.getButton("sevendayssignup_btn2","",this.clickRightBtn2,this)
		this._rightBtn2.x = this._rightBtn1.x;
		this._rightBtn2.y = this._rightBtn1.y;
		this.addChild(this._rightBtn2);

		this.clickRightBtn2();

		let txt = ComponentManager.getTextField(LanguageManager.getlocal("sevenDaysSignUpShowDesctxt1"),20,TextFieldConst.COLOR_LIGHT_YELLOW);	
		txt.x = txtimg.x + txtimg.width/2 - txt.width/2;
		txt.y = txtimg.y + txtimg.height + 15;
		txt.lineSpacing = 3;
		txt.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(txt);

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sevenDaysSignUpShowbtn", ()=>
		{
			this.hide();
			ViewController.getInstance().openView(ViewConst.COMMON.SEVENDAYSSIGNUPVIEW);
		}, this)
		btn.setPosition(txtimg.x+txtimg.width/2-btn.width/2, txt.y + txt.height+20);
		this.addChild(btn);

		let closebtn = ComponentManager.getButton(ButtonConst.COMMON_CLOSE_2,"",()=>
		{
			this.hide();
		},this)
		closebtn.x = GameConfig.stageWidth - closebtn.width - 15;
		closebtn.y = title.y - 125;
		this.addChild(closebtn);
	}


	private wifeIds = ["210","209","208","207","310"];
	private wifePos = [200,400,130,485,300];
	private clickRightBtn1():void
	{
		this._rightBtn1.visible = false;
		this._rightBtn2.visible = true;

		if(this._wifeCon1.numChildren == 0)
		{
			for(let i = 0; i < this.wifeIds.length; i++)
			{
				let wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeIds[i]);
				let bonename = wifeCfg.bone;
				if(this._isBone)
				{
					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					droWifeIcon.scaleX = 0.7;
					droWifeIcon.scaleY = 0.7;
					droWifeIcon.x = this.wifePos[i];
					droWifeIcon.y = i < 2 ? 0 : 140;
					this._wifeCon1.addChild(droWifeIcon);
				}else
				{
					let droWifeIcon = BaseLoadBitmap.create(wifeCfg.body);
					droWifeIcon.scaleX = 0.5;
					droWifeIcon.scaleY = 0.5;
					droWifeIcon.x = this.wifePos[i];
					droWifeIcon.y = i < 2 ? 0 : 165;
					this._wifeCon1.addChild(droWifeIcon);					
				}		
			}
		}
		this._wifeCon1.visible = true;
		this._wifeCon2.visible = false;
	}
	private clickRightBtn2():void
	{
		this._rightBtn1.visible = true;
		this._rightBtn2.visible = false;

		if(this._wifeCon2.numChildren == 0)
		{
			for(let i = 0; i < this.wifeIds.length; i++)
			{
				let wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeIds[i]);
				let bonename = wifeCfg.bone2;
				if(this._isBone)
				{
					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					droWifeIcon.scaleX = 0.7;
					droWifeIcon.scaleY = 0.7;
					droWifeIcon.x = this.wifePos[i];
					droWifeIcon.y = i < 2 ? 0 : 140;
					this._wifeCon2.addChild(droWifeIcon);
				}else
				{
					let droWifeIcon = BaseLoadBitmap.create(wifeCfg.body2);
					droWifeIcon.scaleX = 0.5;
					droWifeIcon.scaleY = 0.5;
					droWifeIcon.x = this.wifePos[i];
					droWifeIcon.y = i < 2 ? 0 : 165;
					this._wifeCon2.addChild(droWifeIcon);					
				}	
			}
		}
		this._wifeCon1.visible = false;
		this._wifeCon2.visible = true;		
	}

	protected getResourceList(): string[] {
		let arr = ["sevendayssignupshowbg","sevendayssignupshowtxt1","sevendayssignupshowtitle","sevendayssignupshowtxt",
			"sevendayssignupshowbot","sevendayssignup_btn1","sevendayssignup_btn2",ButtonConst.COMMON_CLOSE_2,
			"sevendayssignupshowtxteff1","sevendayssignupshowtxteff2","sevendayssignupshowtxteff3","sevendayssignupshowtxteff4",
			"sevendayssignupshowtxteff5","sevendayssignupshowtxteff6","sevendayssignupshowtxteff7","sevendayssignupshowtxteff8",
			"sevendayssignupshowtxteff9","sevendayssignupshowtxteff10"];
		return super.getResourceList().concat(arr);
	}
	public dispose(): void {
		super.dispose();
		this._rightBtn1 = null;
		this._rightBtn2 = null;
		this._wifeCon1 = null;
		this._wifeCon2 = null;
	}
}

