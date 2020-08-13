/**
 * 武穆遗书 列表节点
 * author yanyuling
 * date 2017/11/30
 * @class StudyatkBookScrollItem
 */
class StudyatkBookScrollItem  extends ScrollListItem
{
	static lastUpgradeBookId:string= "";
	static lastUpgradeIdx:number= -1;
	private _idx:number=0;
	private _flagImg:BaseBitmap;
	private _btn:BaseButton;
	private _mask:BaseBitmap;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE),this.upgradeCallback,this);



	

		this._idx = index;
		let cfgData = Config.StudyatkCfg.getStudyatkCfgById(data);
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


		let attrIcon = BaseLoadBitmap.create("servant_infoPro"+ability.type);
		attrIcon.width = 80;
		attrIcon.height = 83;
		attrIcon.x = bg.x +20;
		attrIcon.y = bg.y + bg.height/2 -attrIcon.height/2;
		this.addChild(attrIcon);
		
		let nameBg = BaseBitmap.create("public_biaoti2");
		nameBg.x = leftBg.x + leftBg.width + 5;
		nameBg.y = 15;
		nameBg.width = 160;
		this.addChild(nameBg);


		// 
		let name = LanguageManager.getlocal("servant_attrNameTxt"+cfgData.ability);
		let strCfg=[
			{
				txt:LanguageManager.getlocal("studyatkBook_txt1",[cfgData.id]),
			},
			{
				txt:LanguageManager.getlocal("studyatkBook_txt2",[name,cfgData.upLv]),
			},
			{
				txt:LanguageManager.getlocal("studyatkBook_txt3",[App.StringUtil.changeIntToText(cfgData.needExp)]),
			},
		]
		let startX = nameBg.x;
		let startY = nameBg.y + nameBg.height/2;

		let bookTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_QUALITY_GREEN);
		bookTxt1.text = strCfg[0].txt;
		bookTxt1.x = startX + nameBg.width/2 - bookTxt1.width/2;
		bookTxt1.y = startY - bookTxt1.height/2;
		bookTxt1.name = "bookTxt"+0
		this.addChild(bookTxt1);
		startY += 38;


		for (var index = 1; index < 3; index++) {
			let bookTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
			bookTxt1.text = strCfg[index].txt;
			bookTxt1.x = startX;
			bookTxt1.y = startY - bookTxt1.height/2;
			bookTxt1.name = "bookTxt"+index
			this.addChild(bookTxt1);
			startY += 28;
		}
		let lv = Api.studyatkVoApi.getStudySkillInfoLv();
		
		if(lv <= this._idx)
		{
			let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"studyatkBook_studyOver",this.btnHandler,this);
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
		}
		
		let flagImg = BaseBitmap.create("public_grasp");
		flagImg.width = 131;
		flagImg.height = 86;
		flagImg.x = bg.x + bg.width - flagImg.width - 10;
		flagImg.y = bg.y + bg.height/2 - flagImg.height/2;
		this.addChild(flagImg) ;
		this._flagImg = flagImg;
		if (lv < this._idx)
		{
			let mask = BaseBitmap.create("public_9_viewmask");
			mask.width = bg.width;
			mask.height = bg.height;
			mask.x =bg.x;
			mask.y = bg.y;
			mask.alpha = 0.7;
			mask.name = "mask";
			this.addChild(mask);
			flagImg.texture = ResourceManager.getRes("public_unlock");
			this._mask = mask;
		}
		this.refreshUI();
		
	}
	protected refreshUI()
	{
		let lv = Api.studyatkVoApi.getStudySkillInfoLv();
		if(lv == this._idx)
		{
			this._btn.visible = true;
			this._flagImg.visible = false;
			this.getChildByName("bookTxt2").visible = true;
			if(this._mask)
				this._mask.visible = false;
		}else if (lv > this._idx)
		{
			if(this._btn)
				this._btn.visible = false;
			
			if(this._mask)
				this._mask.visible = false;
			this._flagImg.texture = ResourceManager.getRes("public_grasp");
			this._flagImg.visible = true;
			this.getChildByName("bookTxt2").visible = true;
		}else if (lv < this._idx)
		{
			if(this._mask)
				this._mask.visible = true;
			this._btn.visible = false;
			this._flagImg.texture = ResourceManager.getRes("public_unlock");
			this._flagImg.visible = true;
			this.getChildByName("bookTxt2").visible = false;
		}
		
	}
	protected btnHandler()
	{
		let totalExp = Api.studyatkVoApi.getStudySkillInfoTotalExp();
		let cfgData = Config.StudyatkCfg.getStudyatkCfgById(String(this._idx +1));
		if(totalExp<cfgData.needExp)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal('studyatkBook_upgradeTip'));
			return;
		}
		StudyatkBookScrollItem.lastUpgradeBookId = cfgData.ability;
		StudyatkBookScrollItem.lastUpgradeIdx = this._idx;
		//test---
		/*
		let tmpBid = 161;
		let upservants = {
			1004:12357,
			1008:4463,
			1009:7363,
			1016:1020,
			1020:521,
			1021:1019,
			1025:1025,
			1026:10,
			1034:2286,
			1038:16130,
			1039:16130,
			2001:192,
			2004:10,
			2005:10,
			2008:547
		};
		*/
		// ViewController.getInstance().openView(ViewConst.BASE.STUDYATKBOOLLVUPSUCCESSVIEW,[tmpBid,upservants]);

		NetManager.request(NetRequestConst.REQUEST_STUDYATK_UPGRADE,{});
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
        if(rData.ret == 0 && StudyatkBookScrollItem.lastUpgradeBookId != "")
        {
			if(this._idx == 0)
			{
				let upservants = rData.data.upservants;
				let tmpBid = StudyatkBookScrollItem.lastUpgradeBookId;

				ViewController.getInstance().openView(ViewConst.BASE.STUDYATKBOOLLVUPSUCCESSVIEW,[tmpBid,upservants]);
			}
			//是刷新当前和下一级的数据
			if(this._idx == StudyatkBookScrollItem.lastUpgradeIdx)
			{
				this.refreshUI();
			}
			if(this._idx == StudyatkBookScrollItem.lastUpgradeIdx +1)
			{
				let tmpNode =this;
				egret.Tween.get(this,{loop:false}).wait(500).call(function(){
					tmpNode.refreshUI();
				},this)
				// StudyatkBookScrollItem.lastUpgradeBookId = "";
				// StudyatkBookScrollItem.lastUpgradeIdx = -1;
			}
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
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE),this.upgradeCallback,this);
		this._idx =null;
		this._flagImg =null;
		this._btn =null;
		this._mask = null;
		
		super.dispose();
	}
}