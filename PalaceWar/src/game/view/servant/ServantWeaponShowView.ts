/**
 * 	通用神器预览
 * @author yangchengguo
 * date 2019.8.1
 * @class AcCommonTitleRewardPopupView
 */
class ServantWeaponShowView extends PopupView {

    private _weaponIds:number[] = null;
    private _curIdx:number = 0;
    private _infoContaioner:BaseDisplayObjectContainer = null;
    private _isPlaying:boolean = false;
    private _showContaioner:BaseDisplayObjectContainer = null;
    private _arrowLeft:BaseButton = null;
    private _arrowRight:BaseButton = null;

	public constructor() {
		super();
    }

	public initView(): void {
 
        if (this.param.data.weaponIds)
        {
            this.initMultiWeapon();
        }
        else
        {
            this.initSingleWeapon();
        }
	}

    private initMultiWeapon():void
    {
        this._weaponIds = this.param.data.weaponIds;

        this._infoContaioner = new BaseDisplayObjectContainer();
        this.addChildToContainer( this._infoContaioner);
        let rect = new egret.Rectangle();
        rect.setTo(41,0,541,680);
        this._infoContaioner.mask = rect;

        

        let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		topbg.width = 544;
		topbg.height = 36;
		topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
		this.addChildToContainer(topbg);

        let topMsg = this.param.data.topMsg;
		let topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        this.addChildToContainer(topDesc);

        let arrow_leftBtn = ComponentManager.getButton("titleupgradearrow","",this.switchHandler,this,["left"]);
		arrow_leftBtn.x = 98;
        arrow_leftBtn.scaleX = -1;
		arrow_leftBtn.y = 150;
		this.addChildToContainer(arrow_leftBtn);

		let arrow_rightBtn = ComponentManager.getButton("titleupgradearrow","",this.switchHandler,this,["right"]);
		arrow_rightBtn.x = 521;
		arrow_rightBtn.y = arrow_leftBtn.y;
        this.addChildToContainer(arrow_rightBtn);

        this._arrowLeft = arrow_leftBtn;
        this._arrowRight = arrow_rightBtn;

        this.showWeaponById(String(this._weaponIds[this._curIdx]),null);
    }

    private switchHandler(param:any)
    {
        if (this._isPlaying)
        {
            return;
        }

        if(param == "left")
        {
            this._curIdx --;
            if (this._curIdx<0)
            {
                this._curIdx = this._weaponIds.length-1;
            }    
        }
        else if(param == "right"){
            this._curIdx ++;
            if (this._curIdx>=this._weaponIds.length)
            {
                this._curIdx = 0;
            }  
        }

        this.showWeaponById(String(this._weaponIds[this._curIdx]),param);
    }

    private showWeaponById(wid : string,param:string):void
    {
        let newnode = this.getWeaponNode(wid);
        this._infoContaioner.addChild(newnode);
        if (this._showContaioner)
        {   
            this._isPlaying = true;


             if(param == "left")
             {
                 newnode.x = -541;
                egret.Tween.get(this._showContaioner).to({x:541},300);
                egret.Tween.get(newnode).to({x:-10},300).call(()=>{

                    egret.Tween.removeTweens(newnode);
                    this._showContaioner.dispose();
                    this._isPlaying = false;
                    this._showContaioner= newnode;
                    newnode.x = -10;
                });
             }
            else
            {
                newnode.x = 541;
                egret.Tween.get(this._showContaioner).to({x:-541},300);
                egret.Tween.get(newnode).to({x:-10},300).call(()=>{

                    egret.Tween.removeTweens(newnode);
                    this._showContaioner.dispose();
                    this._isPlaying = false;
                    this._showContaioner= newnode;
                    newnode.x = -10;
                });
            }
            
        }
        else
        {
            
            this._showContaioner= newnode;
        }
      
    }

    private getWeaponNode(wid : string):BaseDisplayObjectContainer
    {
        let node = new BaseDisplayObjectContainer();


        let bgStr = "servantweaponshowbg";
		let bg = BaseBitmap.create(bgStr);
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        node.addChild(bg);

         let clip = ComponentManager.getCustomMovieClip(`destorysameshenqitexiao`, 20);
        clip.width = 250;
        clip.height = 250;
        clip.anchorOffsetX = clip.width / 2;
        clip.anchorOffsetY = clip.height / 2;
        node.addChild(clip);
        clip.setScale(2);
        clip.playWithTime(-1);
        
        let weaponCfg = Config.ServantweaponCfg.getWeaponItemById(wid);
        let servantCfg = Config.ServantCfg.getServantItemById(weaponCfg.servantID);
        let icon = BaseLoadBitmap.create(weaponCfg.icon);
        icon.width = 346;
        icon.height = 346;
        node.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg);
        clip.x = icon.x + icon.width / 2;
        clip.y = icon.y + icon.height / 2;

        let namebg = BaseBitmap.create(`specialview_commoni_namebg`);
        node.addChild(namebg);

        let nametxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip8`, [servantCfg.name, `<font color=${TextFieldConst.COLOR_WARN_YELLOW}>${weaponCfg.name}</font>`]), 20);
        node.addChild(nametxt);
        namebg.width = nametxt.textWidth + 40;

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, bg, [0,15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, namebg);

		let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		buttomBg.width = 530;
		buttomBg.height = 180;
		buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
		node.addChild(buttomBg);

		let buttomBg2 = BaseBitmap.create("public_9_bg14");
		buttomBg2.width = 525;
		buttomBg2.height = 168;
		buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        node.addChild(buttomBg2);
        
        let str1 = LanguageManager.getlocal("weapon_belong",[servantCfg.name]);
        let skill1 = String(weaponCfg.skill1[0] * 100);
        let str2 = LanguageManager.getlocal("weapon_skill1_desc3",[servantCfg.name,skill1]);
        let skill2 = String(weaponCfg.skill2[0] * 100);
        let str4 = LanguageManager.getlocal("weapon_skill2_desc4",[skill2]);
        let str3 = LanguageManager.getlocal("weapon_immediately");
        let desc1 = ComponentManager.getTextField(str1, 20, TextFieldConst.COLOR_BLACK);
        desc1.width = 540;
        desc1.lineSpacing =  6;
        desc1.setPosition(buttomBg2.x + 50, buttomBg2.y + 25);
        node.addChild(desc1);

        let desc2 = ComponentManager.getTextField(str2, 20, TextFieldConst.COLOR_BLACK);
        desc2.width = desc1.width;
        desc2.lineSpacing = 6;
        desc2.setPosition(desc1.x, desc1.y+desc1.height+15);
       node.addChild(desc2);

        let desc3 = ComponentManager.getTextField(str3, 20, TextFieldConst.COLOR_BLACK);
        desc3.width = desc1.width;
        desc3.lineSpacing =  6;
        desc3.setPosition(desc1.x, desc2.y+desc2.height+6);
        node.addChild(desc3);

        let desc4 = ComponentManager.getTextField(str4, 20, TextFieldConst.COLOR_BLACK);
        desc4.width = desc1.width;
        desc4.lineSpacing = 6;
        desc4.setPosition(desc1.x, desc3.y+desc3.height+15);
        node.addChild(desc4);

        return node;
    }

    private initSingleWeapon():void
    {
        let titleIds = this.param.data.weaponId;
		let topMsg = this.param.data.topMsg;

        let bgStr = "servantweaponshowbg"; //acchristmasview_rewardmidbg_4
		let bg = BaseBitmap.create(bgStr);
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);

        let rect = new egret.Rectangle(0, 0, 544, 364);
        let maskContaner = new BaseDisplayObjectContainer();
        maskContaner.width = 544;
        maskContaner.height = 400;
        maskContaner.mask = rect;
        maskContaner.setPosition(bg.x + bg.width / 2 - maskContaner.width / 2, bg.y + 30);
        this.addChildToContainer(maskContaner);

		let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		topbg.width = 544;
		topbg.height = 36;
		topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
		this.addChildToContainer(topbg);

		let topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        this.addChildToContainer(topDesc);

        let clip = ComponentManager.getCustomMovieClip(`destorysameshenqitexiao`, 20);
        clip.width = 250;
        clip.height = 250;
        clip.anchorOffsetX = clip.width / 2;
        clip.anchorOffsetY = clip.height / 2;
        this.addChildToContainer(clip);
        clip.setScale(2);
        clip.playWithTime(-1);
        
        let weaponCfg = Config.ServantweaponCfg.getWeaponItemById(titleIds);
        let servantCfg = Config.ServantCfg.getServantItemById(weaponCfg.servantID);
        let icon = BaseLoadBitmap.create(weaponCfg.icon);
        icon.width = 346;
        icon.height = 346;
        this.addChildToContainer(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg);
        clip.x = icon.x + icon.width / 2;
        clip.y = icon.y + icon.height / 2;

        let namebg = BaseBitmap.create(`specialview_commoni_namebg`);
        this.addChildToContainer(namebg);

        let nametxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip8`, [servantCfg.name, `<font color=${TextFieldConst.COLOR_WARN_YELLOW}>${weaponCfg.name}</font>`]), 20);
        this.addChildToContainer(nametxt);
        namebg.width = nametxt.textWidth + 40;

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, bg, [0,15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, namebg);

		let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		buttomBg.width = 530;
		buttomBg.height = 180;
		buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
		this.addChildToContainer(buttomBg);

		let buttomBg2 = BaseBitmap.create("public_9_bg14");
		buttomBg2.width = 525;
		buttomBg2.height = 168;
		buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        this.addChildToContainer(buttomBg2);
        
        let str1 = LanguageManager.getlocal("weapon_belong",[servantCfg.name]);
        let skill1 = String(weaponCfg.skill1[0] * 100);
        let str2 = LanguageManager.getlocal("weapon_skill1_desc3",[servantCfg.name,skill1]);
        let skill2 = String(weaponCfg.skill2[0] * 100);
        let str4 = LanguageManager.getlocal("weapon_skill2_desc4",[skill2]);
        let str3 = LanguageManager.getlocal("weapon_immediately");
        let desc1 = ComponentManager.getTextField(str1, 20, TextFieldConst.COLOR_BLACK);
        desc1.width = 540;
        desc1.lineSpacing =  6;
        desc1.setPosition(buttomBg2.x + 50, buttomBg2.y + 25);
        this.addChildToContainer(desc1);

        let desc2 = ComponentManager.getTextField(str2, 20, TextFieldConst.COLOR_BLACK);
        desc2.width = desc1.width;
        desc2.lineSpacing = 6;
        desc2.setPosition(desc1.x, desc1.y+desc1.height+15);
        this.addChildToContainer(desc2);

        let desc3 = ComponentManager.getTextField(str3, 20, TextFieldConst.COLOR_BLACK);
        desc3.width = desc1.width;
        desc3.lineSpacing =  6;
        desc3.setPosition(desc1.x, desc2.y+desc2.height+6);
        this.addChildToContainer(desc3);

        let desc4 = ComponentManager.getTextField(str4, 20, TextFieldConst.COLOR_BLACK);
        desc4.width = desc1.width;
        desc4.lineSpacing = 6;
        desc4.setPosition(desc1.x, desc3.y+desc3.height+15);
        this.addChildToContainer(desc4);
    }

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"skin_detail_namebg",`servantweaponshowbg`,`specialview_commoni_namebg`,`tailor_get_light`,
            "titleupgradearrow",
		]);
	}
	protected getTitleStr(): string {
		return "weapon_show";
	}

    protected getBgExtraHeight():number
	{
		return 0;
	}

	public dispose(): void {

        this._weaponIds = null;
        this._curIdx = 0;
        this._isPlaying = false;
        this._infoContaioner = null;
        this._arrowLeft = null;
        this._arrowRight = null; 
        this._showContaioner = null;

		super.dispose();
	}
}