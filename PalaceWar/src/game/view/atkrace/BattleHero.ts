

class BattleHero extends BaseDisplayObjectContainer
{
	public _type:number = 0; // 2 关卡boos战  3 副本  4 八王称帝 玩家  5皇陵 
	private _servantFullImg:BaseLoadBitmap  = null;

	private _infoContainer:BaseDisplayObjectContainer = null;
	private _textArray:BaseTextField[] = [];
	private _picName : string = '';
	private _rect : egret.Rectangle = null;
	private _tmpMap1 :BaseLoadBitmap = null;
	private _tmpMap2 :BaseLoadBitmap = null;
	private _tmpMap3 :BaseLoadBitmap = null;
	private _area : number = 0;
	private _clip : CustomMovieClip = null;
	private _skinnamebg : BaseBitmap = null;
	private _skinnameTxt : BaseTextField = null;

	public constructor() {
		super();
	}

	public get tmpMap(){
		return this._tmpMap3
	}

	public init(heroPic:string, info?:any , type?:number, area?:number, eff?:boolean):void
	{
		this._area = area;
		if (type != null) {
			this._type = type;
		}
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,405*0.8,467*0.8);
		if(this._type == 3) {
			rect.setTo(0,0,405*0.6,467*0.6);
		}
		if(this._type == 5) {
			rect.setTo(0,0,444,456);
		}
	
		this._rect = rect;
		
		if (heroPic == null) {
			heroPic = "servant_empty";
		}
		this._picName = heroPic;
				
		let aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
		this.addChild(aureoleClip);
	
		if(eff){
			aureoleClip.alpha = 1;
		}

		this._servantFullImg = BaseLoadBitmap.create(heroPic,rect);
		this.addChild(this._servantFullImg);
		aureoleClip.x = this._servantFullImg.width / 2;
		aureoleClip.y = this._servantFullImg.height / 2 + 50;
		let height = this._servantFullImg.height - 55;
		if (info && this._type == 0) {
			let infoBg:BaseBitmap;
			infoBg = BaseBitmap.create("atkrace_battle_info");
			infoBg.y = this._servantFullImg.height - infoBg.height + 10;
			height = infoBg.y;
			this.addChild(infoBg);
			
			let level:number = info.level;
			let levelText:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(level.toString(),TextFieldConst.FONTNAME_BOSS_SCORE);
			levelText.setScale(0.9);

			levelText.setPosition(48- levelText.width/2*levelText.scaleX,infoBg.y+40);
			this.addChild(levelText);

			let servantName:BaseTextField = ComponentManager.getTextField(info.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
			servantName.setPosition(95, infoBg.y+ 20);
			this.addChild(servantName);
			// info.skin = "10011"
			// if(info.skin && info.skin != ""){
			// 	let skincfg = Config.ServantskinCfg.getServantSkinItemById(info.skin);
			// 	let skinnamebg = BaseBitmap.create(`skinshowkuang3`);
			// 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinnamebg, this, [-30,-skinnamebg.height-5]);
			// 	this.addChild(skinnamebg);

			// 	let skinnameTxt = ComponentManager.getTextField(skincfg.name, 22, TextFieldConst.COLOR_BLACK);
			// 	skinnameTxt.height = 22;
			// 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinnamebg);
			// 	this.addChild(skinnameTxt);
			// }

			if (info.ability != null)
			{
				let infoDesc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_1"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
				infoDesc1.setPosition(servantName.x, servantName.y+ servantName.height+3);
				this.addChild(infoDesc1);

				let ability:number = info.ability;
				let infoText1:BaseTextField = ComponentManager.getTextField(ability.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
				infoText1.setPosition(infoDesc1.x + infoDesc1.width , infoDesc1.y);
				this.addChild(infoText1);
			}
			if (info.quality != null)
			{
				let infoDesc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt"+info.pos),TextFieldConst.FONTSIZE_CONTENT_SMALL);
				infoDesc1.setPosition(servantName.x, servantName.y+ servantName.height+3);
				this.addChild(infoDesc1);

				let ability:number = info.quality;
				let infoText1:BaseTextField = ComponentManager.getTextField(ability.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
				infoText1.setPosition(infoDesc1.x + infoDesc1.width , infoDesc1.y);
				this.addChild(infoText1);
			}
			
		}
		else if (info && (this._type == 2 || this._type == 6)) {

			this._infoContainer = new BaseDisplayObjectContainer();
			
			this.addChild(this._infoContainer);

			let buttomBg:BaseBitmap=BaseBitmap.create(this._type == 6 ? "threekingdomsheroattackinfobg" : "public_9_downbg");
			buttomBg.width=270;
			this._infoContainer.x = this._servantFullImg.width/2 - buttomBg.width/2;
			this._infoContainer.addChild(buttomBg);

			if(this._type == 6){
				this._servantFullImg.x = (this.width - rect.width) / 2;
			}

			let idx:number = 0;
			for (let k in info) 
			{	
				let v:any = info[k];
				let infoText:BaseTextField = ComponentManager.getTextField( v[0],TextFieldConst.FONTSIZE_CONTENT_SMALL, v[1]);
		
				if(PlatformManager.checkIsEnLang()){
				
					// infoText.setPosition(20 , 10 + idx*30);
					infoText.setPosition(buttomBg.width/2 - infoText.width/2 , 10 + idx*30);
				} else {
					infoText.setPosition(buttomBg.width/2 - infoText.width/2 , this._type == 2 ? (10 + idx*30) : (20 + idx*25));
				}
				this._infoContainer.addChild(infoText);
				idx++;
				this._textArray.push(infoText);
			}
			buttomBg.height=10+idx*30;
			
			this._infoContainer.y = this._servantFullImg.height - buttomBg.height;

			if ("servant_empty" == heroPic) {
				this._infoContainer.visible = false;
			}
			height = this._infoContainer.y;
		}
		//八王称帝 玩家
		else if (info && this._type == 4) {
			this.removeChild(this._servantFullImg);
			this._servantFullImg=null;

			let curLv = info.level;
			if(info.title){
				let titleinfo = App.CommonUtil.getTitleData(info.title);
				if(titleinfo.clothes != ``){
					if(!Config.TitleCfg.getIsTitleOnly(titleinfo.clothes)){
						curLv = titleinfo.clothes;
					}
				}
			}

			let isnew = Api.playerVoApi.getNewPalaceRole(curLv);
			let playerImg:BaseDisplayObjectContainer =  Api.playerVoApi.getPlayerPortrait(curLv,info.pic);
			playerImg.x = isnew ? -160 : 0;
			this.addChild(playerImg);
			let maskRect:egret.Rectangle = new egret.Rectangle();
			maskRect.setTo(0, 0, playerImg.width, 320);
			playerImg.mask = maskRect;

		
			
			let ability:number = info.quality;
			if (ability != null)
			{	
				let infoBg = BaseBitmap.create("atkrace_battle_info");
				infoBg.y = 320 - infoBg.height + 10;
				this.addChild(infoBg);

				let level:number = info.level;
				let levelText:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(info.plevel),TextFieldConst.FONTNAME_BOSS_SCORE);
				levelText.setScale(0.9);

				levelText.setPosition(48- levelText.width/2*levelText.scaleX,infoBg.y+40);
				this.addChild(levelText);

				let servantName:BaseTextField = ComponentManager.getTextField(info.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
				servantName.setPosition(95, infoBg.y+ 20);
				this.addChild(servantName);

				let infoDesc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("child_quality"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
				infoDesc1.setPosition(servantName.x, servantName.y+ servantName.height+3);
				this.addChild(infoDesc1);

				
				let infoText1:BaseTextField = ComponentManager.getTextField(String(ability),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
				infoText1.setPosition(infoDesc1.x + infoDesc1.width , infoDesc1.y);
				this.addChild(infoText1);
			}

			
		}

		if(this._type != 3){
			this.addHeroFilter(area);
		}
		this.width = this.width;
		this.height = this.height;

		let aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
		aureoleClip.blendMode = egret.BlendMode.ADD;
		aureoleClip.width = aureoleBM.width;
		aureoleClip.height = aureoleBM.height;
		aureoleClip.anchorOffsetX = aureoleBM.width / 2;
		aureoleClip.anchorOffsetY = aureoleBM.height / 2;
		aureoleClip.setScale(2.5 * 0.8);
		
		aureoleClip.playWithTime(-1);
		this._clip = aureoleClip;
		aureoleClip.alpha = eff ? 1 : 0; 
		
		let skinnamebg = BaseBitmap.create(`skinshowkuang3`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinnamebg, this, [-30,-skinnamebg.height-5], true);
		skinnamebg.y = height - skinnamebg.height - 5;
		this.addChild(skinnamebg);
		this._skinnamebg = skinnamebg;

		let skinnameTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
		skinnameTxt.height = 22;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinnamebg);
		this.addChild(skinnameTxt);
		this._skinnameTxt = skinnameTxt;
		
		skinnamebg.alpha = skinnameTxt.alpha = eff ? 1 : 0;
		if(eff){
			let skin = heroPic.split(`_`)[2];
			let skincfg = Config.ServantskinCfg.getServantSkinItemById(skin);
			if(skin && skincfg){	
				skinnameTxt.text = skincfg.name;
			}
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinnamebg);
		} 
		
	}

	public resetHero(pic?:string,power?:number,eff?:boolean):void
	{
		if (pic) {
			this._servantFullImg.setload(pic);
			this._picName = pic;
			if (this._type == 2 || this._type == 6) {
				if (this._infoContainer) {
					this._infoContainer.visible = true;
				}
				if (power) {
					this.resetInfoText(LanguageManager.getlocal("fightForce")+":"+power);
				}
			}
			if(this._clip){
				this._clip.alpha = eff ? 1 : 0;
				this._skinnamebg.alpha = this._skinnameTxt.alpha = eff ? 1 : 0; 
				let skin = pic.split(`_`)[2];
				let skincfg = Config.ServantskinCfg.getServantSkinItemById(skin);
				if(skin && skincfg){	
					this._skinnameTxt.text = skincfg.name;
				}
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._skinnameTxt, this._skinnamebg);
			}
			
		}
		else {
			if (this._infoContainer) {
				this._infoContainer.visible = false;
			}
			this._picName = 'servant_empty';
			this._servantFullImg.setload("servant_empty");
			if(this._clip){
				this._clip.alpha = 0;
				this._skinnamebg.alpha = this._skinnameTxt.alpha = 0;
			}
		}
		this.addHeroFilter(this._area);
	}

	public resetInfoText(s:string,idx:number = 0):void
	{
		this._textArray[idx].text = s;
		this._textArray[idx].x = this._infoContainer.width/2 - this._textArray[idx].width/2;
	}

	public setMaskOffSet(){
		this._tmpMap1.alpha = 0.8;
		this._tmpMap2.alpha = 0.4;
		this._tmpMap3.alpha = 0;
	}

	public resetMaskOffSet(){
		egret.Tween.get(this._tmpMap1).to({x : 0, y : 0, alpha : 0},100);
		egret.Tween.get(this._tmpMap2).to({x : 0, y : 0, alpha : 0},150);
	}
	
	private addHeroFilter(area:number){
		if(this._type == 4){
			return;
		}
		//遮罩
		let mycolor_matrix = [ [
			0,0,0,0,0,
			0,1,0,0,0,
			0,0,1,0,50,
			0,0,0,1,0
		], [
			0,0,0,0,0,
			0,1,0,0,0,
			0,0,1,0,30,
			0,0,0,1,0
		],[
			0,0,0,0,0,
			0,1,0,0,0,
			0,0,1,0,50,
			0,0,0,1,0
		]];
		let enermycolor_matrix = [ [
			1,0,0,0,50,
			0,1,0,0,0,
			0,0,1,0,0,
			0,0,0,1,0
		], [
			1,0,0,0,30,
			0,1,0,0,0,
			0,0,1,0,0,
			0,0,0,1,0
		],[
			1,0,0,0,50,
			0,1,0,0,0,
			0,0,1,0,0,
			0,0,0,1,0
		]];
		for(let i = 1; i < 4; ++ i){
			let selefmap : BaseLoadBitmap = this[`_tmpMap${i}`];
			let str = this._picName;
			if(selefmap){
				selefmap.setload(str);
			}
			else{
				let temp = BaseLoadBitmap.create(str);
				temp.width = this._rect.width;
				temp.height = this._rect.height;
				this.addChild(temp);
				let color_matrix = area == 1 ? mycolor_matrix : enermycolor_matrix; 
				var colorFlilter = new egret.ColorMatrixFilter(color_matrix[i - 1]);
				temp.filters = [colorFlilter];
				colorFlilter = null;
				this[`_tmpMap${i}`] = temp;
			}
		}
		mycolor_matrix = enermycolor_matrix = null;
		let maxIndex = this.numChildren;
		this.setChildIndex(this._tmpMap1, maxIndex);
		let baseIndex = this.getChildIndex(this._servantFullImg);
		this.setChildIndex(this._tmpMap1, Math.max(0 , baseIndex - 1));
		this.setChildIndex(this._tmpMap2, Math.max(0 , baseIndex - 2));
		this.setChildIndex(this._tmpMap3, baseIndex + 3);
		this._tmpMap1.x = -20;
		this._tmpMap1.y = -40;
		this._tmpMap1.alpha = 0;
		this._tmpMap2.x = -40;
		this._tmpMap2.y = -80;
		this._tmpMap2.alpha = 0;
		this._tmpMap3.x = 0;
		this._tmpMap3.y = 0;
		this._tmpMap3.alpha = 0;
	}

	public clearHero():void{
		egret.Tween.removeTweens(this);
		this.addHeroFilter(this._area);
	}

	public showLight(f?:Function,o?:any):void
	{	
		if (!this._picName)
		{
			return;
		}

		let onerect = new egret.Rectangle();
		onerect.setTo(0,0,this._rect.width,this._rect.height);
		let light = BaseLoadBitmap.create(this._picName,onerect );
		light.anchorOffsetX = this._rect.width/2;
		light.anchorOffsetY = this._rect.height/2;
		light.x = this._servantFullImg.x+this._rect.width/2;
		light.y = this._servantFullImg.y+this._rect.height/2;
		light.blendMode = egret.BlendMode.ADD;
		this.addChildAt(light,this.getChildIndex(this._servantFullImg)+1);

		egret.Tween.get(light).to({scaleX:1.3,scaleY:1.3,alpha:0},300).call(()=>{
			light.dispose();
			if (f && o)
			{
				f.apply(o);
			}
		});
	}

	public dispose():void
	{
		egret.Tween.removeTweens(this);
		this._servantFullImg = null;
		this._type = null;
		this._infoContainer = null;
		this._textArray.length = 0;
		this._picName = '';
		this._rect = null;
		this._skinnameTxt = null;
		this._skinnamebg = null;
		if(this._clip){
			this._clip.dispose();
			this._clip = null;
		}
		
		for(let i = 1; i < 4; ++ i){
			if(this[`_tmpMap${i}`]){
				this[`_tmpMap${i}`].filters = null;
				BaseLoadBitmap.release(this[`_tmpMap${i}`]);
				this[`_tmpMap${i}`] = null;
			}
		}
		super.dispose();
	}

}