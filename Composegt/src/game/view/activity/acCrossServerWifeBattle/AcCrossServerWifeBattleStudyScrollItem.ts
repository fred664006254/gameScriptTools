/**
 * 永乐大典
 * author jiangliuyang
 * @class WifebattleStudyScrollItem
 */
class AcCrossServerWifeBattleStudyScrollItem  extends ScrollListItem
{
	static lastUpgradeBookId:string= "";
	static lastUpgradeIdx:number= -1;
	private _idx:number=0;
	private _flagImg:BaseBitmap;
	private _btn:BaseButton;
	private _mask:BaseBitmap;
    private _unlockTF:BaseTextField;
    private _unlockImg:BaseBitmap;
    private _data:any;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP),this.upgradeCallback,this);



        this._data = data;

		this._idx = index;
		let cfgData = data;
		let ability = GameConfig.config.abilityCfg[cfgData.ability];
		let bg = BaseBitmap.create("public_listbg");
        bg.width = 520;
        bg.height = 139;
		this.height = bg.height + this.getSpaceY();
		bg.x = 5;
        this.addChild(bg);	

        let leftBg = BaseBitmap.create("public_left");
		leftBg.width = 110;
		leftBg.height = 120.5;
		leftBg.x = 11.5;
		leftBg.y = 5.5;
		this.addChild(leftBg);


		let attrIcon = BaseLoadBitmap.create("wifebattleview_studyicon");
		attrIcon.width = 100;
		attrIcon.height = 100;
		attrIcon.x = bg.x +20;
		attrIcon.y = bg.y + bg.height/2 -attrIcon.height/2;
		this.addChild(attrIcon);
		
		// let nameBg = BaseBitmap.create("public_biaoti2");
		// nameBg.x = leftBg.x + leftBg.width + 5;
		// nameBg.y = 15;
		// nameBg.width = 160;
		// this.addChild(nameBg);

        


		// wifeBattleStudy_name
		let name = LanguageManager.getlocal("wifeBattleStudy_name",[this._data.id]);
		let strCfg=[
			{
				txt:LanguageManager.getlocal("wifeBattleStudy_expplus",[cfgData.wifeSkillExp])
			},
			{
				txt:LanguageManager.getlocal("wifeBattleStudy_needtxt",[App.StringUtil.changeIntToText(cfgData.itemCost)])
			},
            {
                txt:LanguageManager.getlocal("wifeBattleStudy_unlock",[cfgData.wifeStatusNum])
            }
		]
		// let startX = nameBg.x;
		// let startY = nameBg.y + nameBg.height/2;

        let nameTF = ComponentManager.getTextField(name,22,TextFieldConst.COLOR_QUALITY_GREEN);
        nameTF.x = 130;
        nameTF.y = 10;
        this.addChild(nameTF);

        this._unlockTF = ComponentManager.getTextField(strCfg[2].txt,20,TextFieldConst.COLOR_WARN_RED);
        this._unlockTF.x = nameTF.x + nameTF.width + 10;
        this._unlockTF.y = nameTF.y + nameTF.height/2 - this._unlockTF.height/2;
        this.addChild(this._unlockTF); 


		let bookTxt1 = ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN);
		bookTxt1.text = strCfg[0].txt;
		bookTxt1.width = 250;
		bookTxt1.x = nameTF.x;
		bookTxt1.y = nameTF.y + nameTF.height + 10;
		bookTxt1.name = "bookTxt"+0
		this.addChild(bookTxt1);
		


        let bookTxt2 = ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN);
		bookTxt2.text = strCfg[1].txt;
		bookTxt2.width = 250;
		bookTxt2.x = bookTxt1.x;
		bookTxt2.y = bookTxt1.y + bookTxt1.height + 10;
		bookTxt2.name = "bookTxt"+0
		this.addChild(bookTxt2);


		// for (var index = 1; index < 3; index++) {
		// 	let bookTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		// 	bookTxt1.text = strCfg[index].txt;
		// 	bookTxt1.x = startX;
		// 	bookTxt1.y = startY - bookTxt1.height/2;
		// 	bookTxt1.name = "bookTxt"+index
		// 	this.addChild(bookTxt1);
		// 	startY += 28;
		// }
		// let lv = Api.studyatkVoApi.getStudySkillInfoLv();
		
		// if(lv <= this._idx)
		// {
			// let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"studyatkBook_studyOver",this.btnHandler,this);
            // btn.x = bg.x + bg.width -btn.width - 10;
            // btn.y = bg.y + bg.height/2 - btn.height/2;
			// if(PlatformManager.checkIsTextHorizontal()){
			// 	btn.x = bg.x + bg.width -btn.width - 13;
			// 	btn.y = bg.y + bg.height/2 - btn.height/2 - 32;
			// }
			// btn.visible = false;
			// btn.name = "btn";
			// this.addChild(btn);
			// this._btn = btn;
		// }
		
		let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeBattleStudyBtn",this.btnHandler,this);
		btn.x = bg.x + bg.width -btn.width - 10;
		btn.y = bg.y + bg.height/2 - btn.height/2;
		if(PlatformManager.checkIsTextHorizontal()){
			btn.x = bg.x + bg.width -btn.width - 13;
			btn.y = bg.y + bg.height/2 - btn.height/2 - 32;
		}
		btn.visible = false;
		btn.name = "btn";
		this.addChild(btn);
		this._btn = btn;

		let flagImg = BaseBitmap.create("wifebattleview_study");
		flagImg.width = 131;
		flagImg.height = 86;
		flagImg.x = bg.x + bg.width - flagImg.width - 10;
		flagImg.y = bg.y + bg.height/2 - flagImg.height/2;
		this.addChild(flagImg) ;
		this._flagImg = flagImg;


        let mask = BaseBitmap.create("public_9_viewmask");
        mask.width = bg.width;
        mask.height = bg.height;
        mask.x =bg.x;
        mask.y = bg.y;
        mask.alpha = 0.7;
        mask.name = "mask";
        this.addChild(mask);
        
        this._mask = mask;
		// }

        this._unlockImg = BaseBitmap.create("public_unlock");
		this._unlockImg.width = 131;
		this._unlockImg.height = 86;
		this._unlockImg.x = bg.x + bg.width - this._unlockImg.width - 10;
		this._unlockImg.y = bg.y + bg.height/2 - this._unlockImg.height/2;
		this.addChild(this._unlockImg) ;

		this.refreshUI();
		
	}
	protected refreshUI()
	{
		// let lv = Api.studyatkVoApi.getStudySkillInfoLv();
        let statusNum = Api.wifestatusVoApi.getStatusWifeNum();
        let itemHaveNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.itemCostID);
        let curLv = Api.wifebattleVoApi.wifebattleVo.info.ylinfo?Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv:0;
        
    
        let needStatusNum = this._data.wifeStatusNum;
        let itemNeedNum = this._data.itemCost;
        let isUnlock = false;
        if(statusNum >= needStatusNum && curLv >= Number(this._data.id-1)){
            isUnlock = true;
        }

        
        if(isUnlock){
         
            if(curLv >= Number(this._data.id)){
                this._flagImg.visible = true;
                this._btn.visible = false;
            } else {
                this._flagImg.visible = false;
                this._btn.visible = true;
            }
            this._unlockImg.visible = false;
            this._unlockTF.visible = false;
            this._mask.visible = false;

        } else {
            this._flagImg.visible = false;
            this._btn.visible = false;
            this._unlockImg.visible = true;
            this._unlockTF.visible = true;
            this._mask.visible = true;
            
        }

		// if(lv == this._idx)
		// {
		// 	this._btn.visible = true;
		// 	this._flagImg.visible = false;
		// 	this.getChildByName("bookTxt2").visible = true;
		// 	if(this._mask)
		// 		this._mask.visible = false;
		// }else if (lv > this._idx)
		// {
		// 	if(this._btn)
		// 		this._btn.visible = false;
			
		// 	if(this._mask)
		// 		this._mask.visible = false;
		// 	this._flagImg.texture = ResourceManager.getRes("public_grasp");
		// 	this._flagImg.visible = true;
		// 	this.getChildByName("bookTxt2").visible = true;
		// }else if (lv < this._idx)
		// {
		// 	if(this._mask)
		// 		this._mask.visible = true;
		// 	this._btn.visible = false;
		// 	this._flagImg.texture = ResourceManager.getRes("public_unlock");
		// 	this._flagImg.visible = true;
		// 	this.getChildByName("bookTxt2").visible = false;
		// }
		
	}
	protected btnHandler()
	{
		let itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.itemCostID);
		// let cfgData = Config.StudyatkCfg.getStudyatkCfgById(String(this._idx +1));
		if(itemNum<this._data.itemCost)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_upgradeTip'));
			return;
		}
		// StudyatkBookScrollItem.lastUpgradeBookId = cfgData.ability;
		// StudyatkBookScrollItem.lastUpgradeIdx = this._idx;
		//test---

		AcCrossServerWifeBattleStudyPopupView.lastUpgradeId = this._data.id;
		NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP,{});
	}
	protected getStars(num:number)
	{
		let objContainer = new BaseDisplayObjectContainer;

		for (var index = 1; index <= num; index++) {
			let starImg = BaseBitmap.create("servant_star")
			starImg.setScale(0.5);
			starImg.x = (index-1) * starImg.width*0.5;
			starImg.y = 0;
			objContainer.addChild(starImg);
		}
		return objContainer;
	}
	protected upgradeCallback(event:egret.Event)
    {
        let rData = event.data.data;
        if(rData.ret == 0 )
        {
            
            this.refreshUI();

		} 
	}
	// public getSpaceX():number
	// {
	// 	return 0;
	// }
	// public getSpaceY():number
	// {
	// 	return 20;
	// }
    public dispose():void
    {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP),this.upgradeCallback,this);
		this._idx =null;
		this._flagImg =null;
		this._btn =null;
		this._mask = null;
		this._unlockTF = null;
        this._unlockImg = null;
        this._data = null;
		super.dispose();
	}
}