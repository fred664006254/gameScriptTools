

class BattleHero extends BaseDisplayObjectContainer
{
	private _type:number = 0; // 2 关卡boos战  3 副本 
	private _servantFullImg:BaseLoadBitmap = null;

	private _infoContainer:BaseDisplayObjectContainer = null;
	private _textArray:BaseTextField[] = [];
	private _picName : string = '';
	private _rect : egret.Rectangle = null;
	private _tmpMap1 :BaseLoadBitmap = null;
	private _tmpMap2 :BaseLoadBitmap = null;
	private _tmpMap3 :BaseLoadBitmap = null;
	public constructor() {
		super();
	}

	public get tmpMap(){
		return this._tmpMap3
	}

	public init(heroPic:string, info?:any , type?:number, area?:number):void
	{
		if (type != null) {
			this._type = type;
		}
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,405*0.8,467*0.8);
		if (this._type == 3) {
			rect.setTo(0,0,405*0.6,467*0.6);
		}
		this._rect = rect;
		
		if (heroPic == null) {
			heroPic = "servant_empty";
		}
		if( heroPic.indexOf("servant_full") > -1  ||  heroPic.indexOf("skin_full_") > -1 ){
			rect.setTo(0,0,640*0.6,482*0.6);
		}
		this._picName = heroPic;
		this._servantFullImg = BaseLoadBitmap.create(heroPic);
		this._servantFullImg.width=rect.width;
		this._servantFullImg.height=rect.height;
		this.addChild(this._servantFullImg);

		if (info && this._type == 0) {
			let infoBg:BaseBitmap;
			infoBg = BaseBitmap.create("atkrace_battle_info");
			infoBg.y = this._servantFullImg.height - infoBg.height + 20;
			infoBg.name = "infoBg";
			this.addChild(infoBg);
			
			let level:number = info.level;
			let levelText:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(level.toString(),TextFieldConst.FONTNAME_BOSS_SCORE);
			levelText.setScale(0.9);

			levelText.setPosition(48- levelText.width/2*levelText.scaleX+10,infoBg.y+40);
			this.addChild(levelText);

			let servantName:BaseTextField = ComponentManager.getTextField(info.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
			servantName.setPosition(100, infoBg.y+ 35);
			this.addChild(servantName);

			let infoDesc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_1"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			infoDesc1.setPosition(servantName.x, servantName.y+ servantName.height+3);
			this.addChild(infoDesc1);

			let ability:number = info.ability;
			let infoText1:BaseTextField = ComponentManager.getTextField(ability.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
			infoText1.setPosition(infoDesc1.x + infoDesc1.width , infoDesc1.y);
			this.addChild(infoText1);
		}
		else if (info && this._type == 2) {

			this._infoContainer = new BaseDisplayObjectContainer();
			
			this.addChild(this._infoContainer);

			let buttomBg:BaseBitmap=BaseBitmap.create("public_9v_bg05");
			buttomBg.width=270;
			this._infoContainer.x = this._servantFullImg.width/2 - buttomBg.width/2;
			this._infoContainer.addChild(buttomBg);
			buttomBg.name = "buttomBg";
			let idx:number = 0;
			for (let k in info) 
			{	
				let v:any = info[k];
				let infoText:BaseTextField = ComponentManager.getTextField( v[0],TextFieldConst.FONTSIZE_CONTENT_SMALL, v[1]);
				infoText.setPosition(buttomBg.width/2 - infoText.width/2 , 20 + idx*30);
				this._infoContainer.addChild(infoText);
				idx++;
				this._textArray.push(infoText);
			}
			buttomBg.height=30+idx*30;
			
			this._infoContainer.y = this._servantFullImg.height - buttomBg.height;

			if ("servant_empty" == heroPic) {
				this._infoContainer.visible = false;
			}
			
		}
		if(this._type != 3){
			this.addHeroFilter(area);
		}
		this._servantFullImg.x = this._rect.width/2 - this._servantFullImg.width/2;
		this.resetSkinName();
	}

	public resetHero(pic?:string,power?:number):void
	{
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,405*0.8,467*0.95);
		if (this._type == 3) {
			rect.setTo(0,0,405*0.6,467*0.6);
		}
		
		if (pic) {
			if( pic.indexOf("servant_full") > -1  ||  pic.indexOf("skin_full_") > -1 ){
				rect.setTo(0,0,640*0.6,482*0.6);
			}
			this._servantFullImg.setload(pic);
			this._servantFullImg.width=rect.width;
			this._servantFullImg.height=rect.height;
			this._picName = pic;
			if (this._type == 2) {
				if (this._infoContainer) {
					this._infoContainer.visible = true;
					let buttomBg:BaseBitmap = <BaseBitmap>this._infoContainer.getChildByName("buttomBg");
					if(buttomBg){
						this._infoContainer.y = this._servantFullImg.height - buttomBg.height;
					}
				}
				if (power) {
					this.resetInfoText(LanguageManager.getlocal("fightForce")+":"+power);
				}
			}
			let infoBg = <BaseBitmap>this.getChildByName("infoBg");
			if(infoBg){
				infoBg.y = this._servantFullImg.height - infoBg.height + 20;
			}
			
		}
		else {
			if (this._infoContainer) {
				this._infoContainer.visible = false;
			}
			this._picName = 'servant_empty';
			this._servantFullImg.setload("servant_empty",rect);
		}
		this._rect = rect;
		this.addHeroFilter(1);
		this.resetSkinName();
	}

	private resetSkinName()
	{	
		let infoBg:BaseBitmap = <BaseBitmap>this.getChildByName("infoBg");
		if(!infoBg && !this._infoContainer){
			return;
		}
		let snamebg:BaseBitmap = <BaseBitmap>this.getChildByName("snamebg");
		let snametxt:BaseTextField = <BaseTextField>this.getChildByName("snametxt");
		if(this._picName.indexOf("skin_") > -1){
			let skinid = this._picName.split("_")[2];
			
			if(!snamebg){
				snamebg =  BaseBitmap.create("battle_skinnamebg"); //public_servantskin_namebg2
				snamebg.name = "snamebg";
				// snamebg.setScale(0.9);
				
				if(infoBg){
					infoBg.y = this._servantFullImg.height - infoBg.height + 20;
					snamebg.x = infoBg.x + infoBg.width/2 - snamebg.width/2 ;
					snamebg.y = infoBg.y -10 ;
					
				}else {
					let buttomBg:BaseBitmap = undefined;
					if(this._infoContainer){
						 buttomBg = <BaseBitmap>this._infoContainer.getChildByName("buttomBg");
						 snamebg.x = this._infoContainer.x + buttomBg.x + buttomBg.width/2 - snamebg.width/2 ;
						 snamebg.y = this._infoContainer.y + buttomBg.y - snamebg.height +18;
						this._infoContainer.y = this._servantFullImg.height - buttomBg.height;
					}else{
						snamebg.x = this._servantFullImg.x + this._servantFullImg.width/2 - snamebg.width/2 ;
						snamebg.y = this._rect.y + this._rect.height - snamebg.height  - 120;
					}
				}
				if(this._type == 3){ //雁门关
					snamebg.x = this._servantFullImg.x + this._servantFullImg.width/2 - snamebg.width/2 ;
					snamebg.y = this._rect.y + this._rect.height - snamebg.height  - 40;
				}
				this.addChild(snamebg);
			}
			snamebg.visible = true;
			if(!snametxt){
				snametxt = ComponentManager.getTextField("", 22,TextFieldConst.COLOR_LIGHT_YELLOW);
				snametxt.name = "snametxt";
				this.addChild(snametxt);
			}
			snametxt.text = LanguageManager.getlocal("servantSkinName"+ skinid);
			snametxt.x = snamebg.x + snamebg.width/2 * snamebg.scaleX - snametxt.width/2
			snametxt.y = snamebg.y + snamebg.height/2 - snametxt.height/2 -6;
		}else{
			if(snamebg){
				snamebg.visible = false;
			}
			if(snametxt){
				snametxt.text = "";
			}
		}
	}
	//判断当前展示的是否是皮肤
	public isSkinPic()
	{
		return this._picName.indexOf("skin_") > -1 ;
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
			if(selefmap){
				selefmap.setload(this._picName);
				selefmap = null;
			}
			else{
				let temp = BaseLoadBitmap.create(this._picName);
				temp.width = this._rect.width;
				temp.height = this._rect.height;
				this.addChild(temp);
				temp.cacheAsBitmap = true;
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

	public get serImgWith()
	{
		// return 435;
		return this._rect.width;
	}
	public get serImgHeight()
	{
		return 390;
		// return this._rect.height;
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
		for(let i = 1; i < 4; ++ i){
			if(this[`_tmpMap${i}`]){
				this.removeChild(this[`_tmpMap${i}`]);
				BaseLoadBitmap.release(this[`_tmpMap${i}`]);
				this[`_tmpMap${i}`].filters = null;
				this[`_tmpMap${i}`] = null;
			}
		}
		super.dispose();
	}

}