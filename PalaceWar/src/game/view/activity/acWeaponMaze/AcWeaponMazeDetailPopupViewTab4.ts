/**
 * 	神器预览
 * author ycg
 * date 2019.8.1
 * @class AcWeaponMazeDetailPopupViewTab4
 */
class AcWeaponMazeDetailPopupViewTab4 extends CommonViewTab {
    private _bg:BaseBitmap = null;
    private _weaponIds:number[] = null;
    private _curIdx:number = 0;
    private _infoContaioner:BaseDisplayObjectContainer = null;
    private _isPlaying:boolean = false;
    private _showContaioner:BaseDisplayObjectContainer = null;
    private _arrowLeft:BaseButton = null;
    private _arrowRight:BaseButton = null;

	public constructor(data?:any) {
		super();
        this.param = data;
        this.initView();
    }

    private get vo():AcWeaponMazeVo{
        return <AcWeaponMazeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponMazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        else if (this.code == "4"){
            return "3";
        }
        return this.code;
    }

	public initView(): void {
        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(26, 53);
        this.addChild(rewardBg);
        this._bg = rewardBg;

        if (!this.cfg.coreReward1){
            let bgStr = "servantweaponshowbg"; //acchristmasview_rewardmidbg_4 544 400
            let bg = BaseBitmap.create(bgStr);
            bg.setPosition(rewardBg.x, rewardBg.y + 1);
            this.addChild(bg);
            let bgMask = new egret.Rectangle(11, 0, 522, bg.height);
            bg.mask = bgMask;
            bg.x = rewardBg.x - 6;

            let rect = new egret.Rectangle(0, 0, 544, 364);
            let maskContaner = new BaseDisplayObjectContainer();
            maskContaner.width = 544;
            maskContaner.height = 400;
            maskContaner.mask = rect;
            maskContaner.setPosition(bg.x + bg.width / 2 - maskContaner.width / 2, bg.y + 30);
            this.addChild(maskContaner);

            let topbg = BaseBitmap.create("ackite_skintopbg");
            topbg.setPosition(rewardBg.x + rewardBg.width / 2 - topbg.width / 2, rewardBg.y + 1);
            this.addChild(topbg);
            
            let topbgLine = BaseBitmap.create("ackite_skintopline");
            topbgLine.setPosition(topbg.x + topbg.width / 2 - topbgLine.width / 2, topbg.y + topbg.height - 1);
            this.addChild(topbgLine);

            let clip = ComponentManager.getCustomMovieClip(`destorysameshenqitexiao`, 20);
            clip.width = 250;
            clip.height = 250;
            clip.anchorOffsetX = clip.width / 2;
            clip.anchorOffsetY = clip.height / 2;
            this.addChild(clip);
            clip.setScale(2);
            clip.playWithTime(-1);
            
            let weaponId = this.cfg.coreReward;
            let weaponCfg = Config.ServantweaponCfg.getWeaponItemById(weaponId);
            let coreNeed = this.vo.getCoreShowNeed();
            let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailPreviewInfo", this.getTypeCode()), [""+coreNeed, weaponCfg.name]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 + 2);
            this.addChild(topDesc);

            let servantCfg = Config.ServantCfg.getServantItemById(weaponCfg.servantID);
            let icon = BaseLoadBitmap.create(weaponCfg.icon);
            icon.width = 346;
            icon.height = 346;
            this.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg);
            clip.x = icon.x + icon.width / 2;
            clip.y = icon.y + icon.height / 2;

            let namebg = BaseBitmap.create(`specialview_commoni_namebg`);
            this.addChild(namebg);

            let nametxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip8`, [servantCfg.name, `<font color=${TextFieldConst.COLOR_WARN_YELLOW}>${weaponCfg.name}</font>`]), 20);
            this.addChild(nametxt);
            namebg.width = nametxt.textWidth + 40;

            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, bg, [0,15]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, namebg);

            let buttomBg = BaseBitmap.create("public_popupscrollitembg");
            buttomBg.height = 275;
            buttomBg.setPosition(rewardBg.x + rewardBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
            this.addChild(buttomBg);
            
            let str1 = LanguageManager.getlocal("weapon_belong",[servantCfg.name]);
            let skill1 = String(weaponCfg.skill1[0] * 100);
            let str2 = LanguageManager.getlocal("weapon_skill1_desc3",[servantCfg.name,skill1]);
            let skill2 = String(weaponCfg.skill2[0] * 100);
            let str4 = LanguageManager.getlocal("weapon_skill2_desc4",[skill2]);
            let str3 = LanguageManager.getlocal("weapon_immediately");
            let desc1 = ComponentManager.getTextField(str1, 20, TextFieldConst.COLOR_BROWN);
            desc1.width = 470;
            desc1.lineSpacing =  6;
            desc1.setPosition(buttomBg.x + 20, buttomBg.y + 25);
            this.addChild(desc1);

            let desc2 = ComponentManager.getTextField(str2, 20, TextFieldConst.COLOR_BROWN);
            desc2.width = desc1.width;
            desc2.lineSpacing = 6;
            desc2.setPosition(desc1.x, desc1.y+desc1.height+15);
            this.addChild(desc2);

            let desc3 = ComponentManager.getTextField(str3, 20, TextFieldConst.COLOR_BROWN);
            desc3.width = desc1.width;
            desc3.lineSpacing =  6;
            desc3.setPosition(desc1.x, desc2.y+desc2.height+6);
            this.addChild(desc3);

            let desc4 = ComponentManager.getTextField(str4, 20, TextFieldConst.COLOR_BROWN);
            desc4.width = desc1.width;
            desc4.lineSpacing = 6;
            desc4.setPosition(desc1.x, desc3.y+desc3.height+15);
            this.addChild(desc4);
        }
        else{
            this.initMultiWeapon();
        }

		// let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifeSkinRewardPopupViewButtomDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		// buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
        // this.addChildToContainer(buttomTipTxt);
    }
    
    private initMultiWeapon():void
    {
        this._weaponIds = this.cfg.coreReward1;

        this._infoContaioner = new BaseDisplayObjectContainer();
        this.addChild(this._infoContaioner);
        this._infoContaioner.width = this._bg.width;
        this._infoContaioner.height = this._bg.height;
        this._infoContaioner.setPosition(this._bg.x, this._bg.y);
        let rect = new egret.Rectangle();
        rect.setTo(0, 0, this._bg.width, this._bg.height);
        this._infoContaioner.mask = rect;

        let topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(this._bg.x + this._bg.width / 2 - topbg.width / 2, this._bg.y + 1);
        this.addChild(topbg);
        
        let topbgLine = BaseBitmap.create("ackite_skintopline");
        topbgLine.setPosition(topbg.x + topbg.width / 2 - topbgLine.width / 2, topbg.y + topbg.height - 1);
        this.addChild(topbgLine);

        let coreNeed = this.vo.getCoreShowNeed();
        App.LogUtil.log("coreNeed "+coreNeed);
        let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailPreviewInfo", this.getTypeCode()), [""+coreNeed]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 + 2);
        this.addChild(topDesc);

        let arrow_leftBtn = ComponentManager.getButton("titleupgradearrow","",this.switchHandler,this,["left"]);
		arrow_leftBtn.x = this._bg.x + 15 + arrow_leftBtn.width;
        arrow_leftBtn.scaleX = -1;
		arrow_leftBtn.y = this._bg.y + 150;
		this.addChild(arrow_leftBtn);

		let arrow_rightBtn = ComponentManager.getButton("titleupgradearrow","",this.switchHandler,this,["right"]);
		arrow_rightBtn.x = this._bg.x + this._bg.width - arrow_rightBtn.width - 15;
		arrow_rightBtn.y = arrow_leftBtn.y;
        this.addChild(arrow_rightBtn);

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
                newnode.x = -this._infoContaioner.width;
                egret.Tween.get(this._showContaioner).to({x:this._infoContaioner.width},300);
                egret.Tween.get(newnode).to({x:0},300).call(()=>{

                    egret.Tween.removeTweens(newnode);
                    this._showContaioner.dispose();
                    this._isPlaying = false;
                    this._showContaioner= newnode;
                    newnode.x = 0;
                });
             }
            else
            {
                newnode.x = this._infoContaioner.width;
                egret.Tween.get(this._showContaioner).to({x:-this._infoContaioner.width},300);
                egret.Tween.get(newnode).to({x:0},300).call(()=>{

                    egret.Tween.removeTweens(newnode);
                    this._showContaioner.dispose();
                    this._isPlaying = false;
                    this._showContaioner= newnode;
                    newnode.x = 0;
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
        node.width = this._infoContaioner.width;
        let bgStr = "servantweaponshowbg";
        let bg = BaseBitmap.create(bgStr);
        // bg.setPosition(this._bg.x, this._bg.y + 1);
        node.addChild(bg);
        let bgMask = new egret.Rectangle(11, 0, 522, bg.height);
        bg.mask = bgMask;
        bg.x = -6;

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

		let buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.height = 275;
        buttomBg.setPosition(node.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
		node.addChild(buttomBg);
        
        let str1 = LanguageManager.getlocal("weapon_belong",[servantCfg.name]);
        let skill1 = String(weaponCfg.skill1[0] * 100);
        let str2 = LanguageManager.getlocal("weapon_skill1_desc3",[servantCfg.name,skill1]);
        let skill2 = String(weaponCfg.skill2[0] * 100);
        let str4 = LanguageManager.getlocal("weapon_skill2_desc4",[skill2]);
        let str3 = LanguageManager.getlocal("weapon_immediately");
        let desc1 = ComponentManager.getTextField(str1, 20, TextFieldConst.COLOR_BLACK);
        desc1.width = 540;
        desc1.lineSpacing =  6;
        desc1.setPosition(buttomBg.x + 20, buttomBg.y + 25);
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

	public dispose(): void {
        this._bg = null;
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