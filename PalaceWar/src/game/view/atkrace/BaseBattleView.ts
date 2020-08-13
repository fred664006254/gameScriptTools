/**
 * boss战基类
 */
class BaseBattleView extends CommonView
{
	/**
	 * 顶部血条
	 */
	protected _topProgress:ProgressBar=null;
	protected _topMaxValue:number = 0;
	protected _topCurValue:number = 0;
	private _topProgressType:number = 1; // 1 ,分数  2 百分比
	/**
	 * 底部血条
	 */
	protected _bottomProgress:ProgressBar=null;
	protected _bottomMaxValue:number = 0;
	protected _bottomCurValue:number = 0;
	/**
	 * 上面的人物
	 */
	protected _upHero:BattleHero = null;
	protected _upPositon:egret.Point = null;
	/**
	 * 下面的人物
	 */
	protected _downHero:BattleHero = null;
	protected _downPositon:egret.Point = null;

	protected _isMoving:boolean=false;

	protected _heroArray:BattleHero[] = [];
	protected _damage:number = 0;
	protected _area:number = 0;
	private _isCrit:boolean = false;

	private _damageText:BaseBitmapText|BaseTextField = null;
	private _beAttackClip:CustomMovieClip = null;



	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			this.getHitAnimSources(),"weapon_info_title","damage_fnt","atkrace_crit_bg","atkrace_crit_text","enermycrit_circle","enermycrit_light","critenermyflash1","critenermyflash2","critenermyflash3","critenermyspeed1","critenermyspeed2","critenermyspeed3","critenermyspeed4","critenermyspeed5","mycrit_circle","mycrit_light","critmyflash1","critmyflash2","critmyflash3","critmyspeed1","critmyspeed2","critmyspeed3","critmyspeed4","critmyspeed5",`acwealthcarpeffect`,`skinshowkuang3`,
		]);
	}
	
	protected getHitAnimSources():string
	{
		return "battle_attack_anim";
	}

	protected getHitAnimInfo():any[]
	{
		return ["atk_anim_",7];
	}

	protected getBgName():string
	{	
		return this.getClassName().toLowerCase().replace("view","")+"_bg";
	}

	protected init():void
	{	
		super.init();

		this.container.y=this.getTitleButtomY();
		this._beAttackClip = ComponentManager.getCustomMovieClip(this.getHitAnimInfo()[0],this.getHitAnimInfo()[1],70);
		this._beAttackClip.setEndCallBack(this.clipEndCallback,this);
	}

	// 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,640,1136);
			this.viewBg = BaseLoadBitmap.create(bgName,rect);
			this.viewBg.setPosition(0,(GameConfig.stageHeigth-this.viewBg.height)/2);
			this.addChild(this.viewBg); 
		}
	}

	protected setTopProgress(value:number,maxValue?:number, progressWidth?:number , type:number=1):void
	{
		if (value < 0) {
			value=0;
		}
		if (maxValue) {
			this._topMaxValue =  Math.ceil(maxValue);
		}
		if (this._topProgress == null) {
			this._topProgress = ComponentManager.getProgressBar("progress8","progress7_bg", progressWidth ? progressWidth :GameConfig.stageWidth);
			this._topProgress.setPosition((GameConfig.stageWidth-this._topProgress.width)/2,0);
			this.addChildToContainer(this._topProgress);
			if (!maxValue) {
				this._topMaxValue = value;
			}
			if (type) {
				this._topProgressType = type;
			}
		}
		this._topCurValue = value;//Math.ceil(value);
		if (this._topProgressType == 1) {
			this._topCurValue= Math.ceil(this._topCurValue*100)/100;
			let attrValue:number= Math.ceil(this._topCurValue);
			this._topProgress.setText(attrValue.toString() +"/"+ this._topMaxValue);
			this._topProgress.setPercentage( this._topCurValue / this._topMaxValue );
		}
		else if (this._topProgressType == 3){
			this._topProgress.setText(LanguageManager.getlocal("allianceBoss_progressTxt3"));
			this._topProgress.setPercentage(1);
		}
		else {
			let valueTemp:number = Math.ceil(this._topCurValue*10000/this._topMaxValue);
			let str :string = ( valueTemp/100).toString()+"%";
			this._topProgress.setText(str);
			this._topProgress.setPercentage( this._topCurValue / this._topMaxValue );
		}
		
		
	}

	protected setBottomProgress(value:number,maxValue?:number,progressWidth?:number):void
	{	
		if (value < 0) {
			value=0;
		}
		if (this._bottomProgress == null) {
			this._bottomProgress = ComponentManager.getProgressBar("progress8","progress7_bg",progressWidth?progressWidth:GameConfig.stageWidth);
			this._bottomProgress.y = GameConfig.stageHeigth - this._bottomProgress.height;
			this.addChildToContainer(this._bottomProgress);
			if (maxValue) {
				this._bottomMaxValue = maxValue;
			}
			else {
				this._bottomMaxValue = value;
			}
		}
		this._bottomCurValue = value;//Math.floor(value);
		this._bottomCurValue= Math.ceil(this._bottomCurValue*100)/100;
		let attrValue:number= Math.ceil(this._bottomCurValue);
		this._bottomProgress.setText(attrValue.toString()+"/"+ this._bottomMaxValue);
		this._bottomProgress.setPercentage( this._bottomCurValue / this._bottomMaxValue );
	}

	protected setUpHero(picName:string,info?:any,type?:number, eff?:boolean):void
	{
		if (this._upHero) {
			this._upHero.dispose();
			this._upHero = null;
		}

		this._upHero = new BattleHero();
		this._upHero.init(picName, info, type, 0, eff);
		this._upHero.setPosition(GameConfig.stageWidth/2 - this._upHero.width/2 , 60);
		this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
		this.addChildToContainer(this._upHero);
	}	

	protected setDownHero(picName:string,info?:any,type?:number, eff?:boolean):void
	{
		if (this._downHero) {
			this._downHero.dispose();
			this._downHero = null;
		}

		this._downHero = new BattleHero();
		this._downHero.init(picName, info ,type, 1, eff);
		this._downHero.setPosition(GameConfig.stageWidth/2 - this._upHero.width/2 , GameConfig.stageHeigth - this._downHero.height - 60 - this.getTitleButtomY());
		this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);
		this.addChildToContainer(this._downHero);
	}
	/**
	 * 攻击动画
	 * @param area  1,我房  2 敌方
	 */
	protected attackHandle(area:number,damage:number,isCrit?:boolean):void
	{
		if (this._isMoving == true) {
			return;
		}
		this._isMoving = true;
		this._heroArray.length = 0;
		this._damage = damage;
		this._area = area;
		let offsetY:number; 
		let moveY:number;
		let scaleTo:number = 0.75;
		let offsetX:number;
		if (area == 1) {
			this._heroArray=[this._downHero,this._upHero];
			offsetY = 50;
			moveY = this._upHero.y+100;
			offsetX= offsetY*(this._downHero.x - this._upHero.x)/(this._downHero.y - this._upHero.y);
		}
		else {
			this._heroArray=[this._upHero,this._downHero];
			offsetY = -50;
			moveY = this._downHero.y-100 + this._downHero.height*(1-scaleTo);
			offsetX = offsetY*(this._downHero.x - this._upHero.x)/(this._downHero.y - this._upHero.y);
		}

		if (this.container.getChildIndex(this._heroArray[0])< this.container.getChildIndex(this._heroArray[1])) {
			this.container.swapChildren(this._heroArray[0],this._heroArray[1]);
		}

		let critTime:number = 0;
		if (isCrit==true) {
			critTime = 1530;
			this._isCrit = true;
			this.showCritAnim(area);
		}
		else {
			this._isCrit = false;
		}
		let moveTime1:number = 60;
		let moveTime2:number = 260;
		
		let moveTo:egret.Point = egret.Point.create( this._heroArray[1].x + (1-scaleTo)*this._heroArray[0].width/2 ,moveY);

		let scaleBig:number = 1.06;
		let moveFirst:egret.Point = egret.Point.create( this._heroArray[0].x - (scaleBig-1)*this._heroArray[0].width/2 ,this._heroArray[0].y - (scaleBig-1)*this._heroArray[0].height/2);
		//hero
		egret.Tween.get(this._heroArray[0]).wait(critTime).call(()=>{
			if(this._isCrit){
				if(this._heroArray[0]._type != 4){
					egret.Tween.get(this._heroArray[0].tmpMap).to({alpha : 1} , 300).call(()=>{
						this._heroArray[0].tmpMap.alpha = 0;
						egret.Tween.removeTweens(this._heroArray[0].tmpMap);
					},this);
				}
			}
		},this).
		to({x : this._heroArray[0].x + (area == 1 ? 20 : -20), y : this._heroArray[0].y + (area == 1 ? 20 : -20), },300).//后移
		//to({x:moveFirst.x,y:moveFirst.y,alpha : 1,scaleX:scaleBig, scaleY:scaleBig},500).
		call(()=>{
			if(this._isCrit && this._heroArray[0]._type != 4){
				this._heroArray[0].setMaskOffSet();
			}
		},this).
		to({x:moveTo.x,y:moveTo.y,scaleX:scaleTo,scaleY:scaleTo,},moveTime1).
		//to({x:moveFirst.x+offsetX, y:moveFirst.y+offsetY},150).
		call(()=>{
			egret.Tween.get(this._heroArray[0]).to({scaleX : 1, scaleY : 1},400);
		},this).
		to({x:this._heroArray[0].x,y:this._heroArray[0].y},moveTime2).call(()=>{
			if(this._isCrit && this._heroArray[0]._type != 4){
				this._heroArray[0].resetMaskOffSet();
			}
		},this);
		if(this._isCrit){
			//暴击 残影效果
		}
		TimerManager.doTimer(critTime + 300 + moveTime1,1,this.showBeAttackAnim,this);
	}

	protected playHitEffcet():void
	{
		SoundManager.playEffect(SoundConst.EFFECT_BATTLE_HIT);
	}


	protected resetTopProgressAfterDamage():void
	{
		this.setTopProgress(this._topCurValue - this._damage);
	}
	/**
	 * 受吉动画
	 */
	protected showBeAttackAnim():void
	{
		if (this._heroArray.length == 0) {
			return;
		}
		let beAttackHero:BattleHero = this._heroArray[1];
		let offsetY:number;
		if (this._area == 1) {
			offsetY = -30;
			this.resetTopProgressAfterDamage();
		}
		else {
			offsetY = 30;
			this.setBottomProgress(this._bottomCurValue - this._damage);
		}
		egret.Tween.get(beAttackHero).to({y:beAttackHero.y+offsetY},100).to({y:beAttackHero.y},120);

		let tempBitmap:BaseBitmap = BaseBitmap.create(this.getHitAnimInfo()[0]+"1");
		let hitY:number = beAttackHero.y + beAttackHero.height/2  - tempBitmap.height/2;
		if (beAttackHero._type == 4)
		{
			hitY =beAttackHero.y + 150 - tempBitmap.height/2;
		}
		
		let posx = this._heroArray[1].x + this._heroArray[1].width/2;
		if (this._heroArray[1].width > 460)
		{
			posx = this._heroArray[1].x + 200;
		}

		this._beAttackClip.setPosition(posx - tempBitmap.width/2 ,hitY);
		this.addChildToContainer(this._beAttackClip);
		this._beAttackClip.goToAndPlay(0);
		this._beAttackClip.playWithTime(1);

		let fontName:string;
		let isBMfont = false;
		if (this._isCrit) {
			fontName = "crit_fnt";
		}
		else {
			fontName = "damage_fnt";
			isBMfont = true;
		}

		let damageY:number = beAttackHero.y + beAttackHero.height/2  - 50;
		if (beAttackHero._type == 4)
		{
			damageY =beAttackHero.y + 200;
		}

		this._damageText = ComponentManager.getBitmapText("-"+Math.floor(this._damage).toString(),fontName,undefined,undefined,isBMfont);
		this._damageText.setPosition(posx - this._damageText.width/2 ,damageY);
		this.addChildToContainer(this._damageText);
		egret.Tween.get(this._damageText).to({y:this._damageText.y+offsetY*3},300).to({y:this._damageText.y+offsetY*6,alpha:0.1},600).call(this.playEnd,this);

		this.playHitEffcet();
	}
	private clipEndCallback():void
	{
		if (this._beAttackClip) {
			this.removeChildFromContainer(this._beAttackClip);
		}
	}


	/**
	 * 暴击动画
	 */
	private showCritAnim(area:number):void
	{
		let pref = area == 1 ? 'my' : 'enermy';
		let baseobject = area == 1 ? this._downHero : this._upHero;
		//黑色遮罩出现 透明度0%-70% 用时0.13秒。   
		let crit_bg = new BaseShape();
		crit_bg.graphics.beginFill(0x000000,0.7);
		crit_bg.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
		crit_bg.graphics.endFill();

		this.container.addChildAt(crit_bg,0);
		crit_bg.alpha = 0;
		egret.Tween.get(crit_bg).to({alpha : 0.7} , 130).call(()=>{
			//播放 闪光 序列帧
			let flash_eff = ComponentManager.getCustomMovieClip(`crit${pref}flash`,3,60);
			flash_eff.scaleX = flash_eff.scaleY = 2;
			flash_eff.x = baseobject.x + baseobject.width / 2 - 160 * 2;
			flash_eff.y = baseobject.y + baseobject.height / 2 - 90 * 2;
			this.addChildToContainer(flash_eff);
			flash_eff.setEndCallBack(()=>{
				this.container.removeChild(flash_eff);
				flash_eff.dispose();
				flash_eff = null;
			},this);
			flash_eff.playWithTime(1);
		},this).wait(2500).to({alpha : 0},170).call(()=>{
			egret.Tween.get(crit_bg);
			this.container.removeChild(crit_bg);
			crit_bg.dispose();
			crit_bg = null;
		},this);

		//速度线序列帧从 X：202%  Y：15% 放大至 X：202  Y：200   （用时0.13秒）。循环1秒，然后Y轴缩放至1%后消失（用时0.13秒）
		let speed_eff = ComponentManager.getCustomMovieClip(`crit${pref}speed`,5,100);
		let speed_endX = (GameConfig.stageWidth - 320 * 2) / 2;
		let speed_endY = baseobject.y - (226 * 1.6 - baseobject.height) / 2;
		speed_eff.x = speed_endX;
		speed_eff.y = speed_endY;
		speed_eff.scaleX = 2;
		speed_eff.scaleY = 0.15;
		speed_eff.alpha = 0;
		let index = this.container.getChildIndex(baseobject);
		this.container.addChildAt(speed_eff,index - 1);
		speed_eff.playWithTime(-1);
		egret.Tween.get(speed_eff).wait(200).to({scaleY : 1.6 , alpha : 1} , 130).call(()=>{
			//三个光圈
			let circle_arr = [{
				x : area == 1 ? (baseobject.x + baseobject.width / 2) : (baseobject.x - 30),
				y : speed_eff.y + 50,
				moveX : 10,
				moveY : 15,
				scale : 0.5,
			},{
				x : area == 1 ? (baseobject.x + baseobject.width / 2 + 40) : (baseobject.x - 60),
				y : speed_eff.y + 53,
				moveX : -15,
				moveY : -20,
				scale : 0.7,
			},{
				x : area == 1 ? (baseobject.x - 234) : (baseobject.x + baseobject.width + 80),
				y : speed_eff.y + 100,
				moveX : -30,
				moveY : 0,
				scale : 1,
			}];
			for(let unit of circle_arr){
				let circle:BaseBitmap = BaseBitmap.create(`${pref}crit_circle`);
				circle.scaleX = circle.scaleY = unit.scale;
				circle.alpha = 0.7;
				let index = this.container.getChildIndex(baseobject);
				circle.x = unit.x;
				circle.y = unit.y;
				this.container.addChildAt(circle,index - 1);
				egret.Tween.get(circle).to({x : circle.x + unit.moveX, y : circle.y + unit.moveY} , 1000).to({scaleY : 0.01,y : circle.y + circle.height * (unit.scale - 0.01) / 2, alpha : 0} , 130).call(()=>{
					egret.Tween.removeTweens(circle);
					this.container.removeChild(circle);
					BaseBitmap.release(circle);
					circle = null;
				},this);
			}
			//三个横线
			let light_arr = [{
				x : -100,
				y : baseobject.y + 50,
				moveX : 30,
			},{
				x : GameConfig.stageWidth - 240 * 2 + 140,
				y : baseobject.y + 160,
				moveX : 30,
			},{
				x : -50	,
				y : baseobject.y + 270,
				moveX : 30,
			}];
			for(let unit of light_arr){
				let light:BaseBitmap = BaseBitmap.create(`${pref}crit_light`);
				let index = this.container.getChildIndex(baseobject);
				light.scaleX = 2.5;
				light.x = area == 1 ? unit.x : (GameConfig.stageWidth - unit.x - light.width * 2.5);
				light.y = unit.y;
				this.container.addChildAt(light,index + 1);
				egret.Tween.get(light).to({x : light.x + unit.moveX} , 1000).to({scaleY : 0.01,y : light.y + light.height * (1 - 0.01) / 2, alpha : 0} , 130).call(()=>{
					egret.Tween.removeTweens(light);
					this.container.removeChild(light);
					BaseBitmap.release(light);
					light = null;
				},this);
			}
		},this).wait(1000).to({scaleY : 0.01,x : speed_endX, y : speed_endY + 226 * (2 - 0.01) / 2, alpha : 0} , 130).call(()=>{
			egret.Tween.removeTweens(speed_eff);
			this.container.removeChild(speed_eff);
			speed_eff.dispose();
			speed_eff = null;
		},this);
		//暴击字体从尺寸400%，透明度33% 至  尺寸125% 透明度100%。（用时0.13秒） 再放大至135%（0.06秒）
		let crittext_eff:BaseBitmap = BaseBitmap.create("atkrace_crit_text");
		crittext_eff.alpha = 0;
		crittext_eff.scaleX = crittext_eff.scaleY = 4;
		let endX = area == 1 ? (80) : (baseobject.x + baseobject.width);
		let endY = baseobject.y + baseobject.height / 2 - 75 * 0.7;
		crittext_eff.x = endX - (4 - 1) * 137 / 2;
		crittext_eff.y = endY - (4 - 1) * 75 / 2;
		this.addChildToContainer(crittext_eff);

		egret.Tween.get(crittext_eff).
		to({alpha : 0.33}, 260).
		to({alpha : 1, scaleX : 1.25, scaleY : 1.25,x : endX - (1.25- 1) * 137 / 2, y : endY - (1.25 - 1) * 75 / 2},130).
		to({scaleX : 1.35, scaleY : 1.35,x : endX - (1.35 - 1) * 137 / 2, y : endY - (1.35 - 1) * 75 / 2},60).
		wait(880).
		to({x : (area == 1 ? (0 - 1.35 * 137): (GameConfig.stageWidth)), alpha : 0} , 200).
		call(()=>{
			//后续移除
			egret.Tween.removeTweens(crittext_eff);
			this.container.removeChild(crittext_eff);
			BaseBitmap.release(crittext_eff);
			crittext_eff = null;
		},this);
		//暴击字体黑色背景淡入出现（用时0.13秒）
		let fontbg:BaseBitmap = BaseBitmap.create(`atkrace_crit_bg`);
		let ftindex = this.container.getChildIndex(crittext_eff);
		fontbg.x = endX - (1.35 - 1) * 137 / 2 - (258 - 1.35 * 137) / 2;
		fontbg.y = endY - (1.35 - 1) * 75 / 2 - (80 - 1.35 * 75) / 2;
		fontbg.alpha = 0;
		this.container.addChildAt(fontbg,ftindex - 1);
		egret.Tween.get(fontbg).wait(400).to({alpha : 1} , 130).wait(800).
		to({x : (area == 1 ? (0 - 258): (GameConfig.stageWidth)), alpha : 0} , 200).
		call(()=>{
			egret.Tween.removeTweens(fontbg);
			this.container.removeChild(fontbg);
			BaseBitmap.release(fontbg);
			fontbg = null;
		},this);
		//0.26秒 角色变色，持续0.06秒，然后变回原色（0.2秒）
		if(baseobject._type == 4){

		}
		else{
			egret.Tween.get(baseobject.tmpMap).wait(260).to({alpha : 1}, 10).wait(60).to({alpha : 0}, 200).call(()=>{
				egret.Tween.removeTweens(baseobject.tmpMap);
			},this);
		}
	}

	private playEnd():void
	{	
		this.removeChildFromContainer(this._damageText);
		this._damageText = null;
		this._isMoving = false;
		egret.Tween.removeTweens(this._upHero);
		egret.Tween.removeTweens(this._downHero);
		this._upHero.setScale(1);
		this._downHero.setScale(1);
		this._upHero.setPosition(this._upPositon.x,this._upPositon.y);
		this._downHero.setPosition(this._downPositon.x,this._downPositon.y);

		this.atkEndCallback();
	}

	protected atkEndCallback():void
	{	

	}

	protected initView():void
	{

	}

	/**
	 * @param type 1,下面， 2上面
	 * @param sid 门客ID
	 * @param value 加成，没有的话取自己的神器
	 * @param atype 战斗类型
	 */
	protected setDownWeaponInfo(sid:string, value:number ,atype:number):void
	{
		let oneinfo = new WeaponInfoNode();
		oneinfo.init(sid,value,atype);
		oneinfo.setPosition(20,GameConfig.stageHeigth-300);
		this.addChild(oneinfo);
	}

	protected setUpWeaponInfo(sid:string, value:number ,atype:number):void
	{
		let oneinfo = new WeaponInfoNode();
		oneinfo.init(sid,value,atype);
		oneinfo.setPosition(GameConfig.stageWidth-10-oneinfo.width,180);
		this.addChild(oneinfo);
	}

	public dispose():void
	{
		this._topProgress = null;
		this._bottomProgress = null;
		this._topMaxValue = 0;
		this._bottomMaxValue = 0;
		this._topCurValue = 0;
		this._bottomCurValue = 0;
		this._upHero = null;
		this._downHero = null;
		this._isMoving = false;
		this._heroArray.length = 0;
		this._damage = 0;
		this._damageText = null;
		this._area = 0;
		if (this._beAttackClip) {
			this._beAttackClip.dispose();
		}
		this._beAttackClip = null;
		this._isCrit = false;
		this._upPositon = null;
		this._downPositon = null;
		this._topProgressType = null;

		super.dispose();
	}
}