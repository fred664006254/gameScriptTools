/**
 * 奖励物品icon、文字飘动动画
 * author dmj
 * date 2017/9/27
 * @class RewardFly
 */
class RewardFly extends BaseDisplayObjectContainer
{
	private _tw:egret.Tween;
	private _temScale:number = 0.6;
	public constructor() 
	{
		super();
	}

	public init(icon:string,message:string,itemtype:number=0,subNode:BaseDisplayObjectContainer,isHalve?:boolean,itemVo?:any):void
	{	
		SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
		let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		this.addChild(container);
		let temX:number = 0;
		let temY:number = 0;
		let iconBt:any=null;

		let bgPic = "public_itemtipbg2";
		if(icon){
			bgPic = "public_itemtipbg";
		}
		let numBg = BaseBitmap.create(bgPic);
		// numBg.width = 300;
		// numBg.setScale(this._temScale);
		container.addChild(numBg);
		// temX = numBg.width * this._temScale;
		// temY = numBg.height * this._temScale/2;
		if(subNode)
		{
			container.addChild(subNode);
		}
		
		
		if(icon)
		{	
			let iconBg = BaseBitmap.create("public_tipiconbg");
			// iconBg.setScale(this._temScale);
			container.addChild(iconBg);

			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,100,100);
			if(icon.indexOf("public_")==0&&ResourceManager.getRes(icon))
			{
				iconBt = BaseBitmap.create(icon);
				iconBt.width=rect.width;
				iconBt.height=rect.height;
			}
			else
			{
				iconBt = BaseLoadBitmap.create(icon,rect);
			}
			iconBt.setScale(this._temScale);
			if(itemtype==10||itemtype==8)
			{
				iconBt.scaleX =iconBt.scaleY =0.5;
			}
			container.addChild(iconBt);
			
			// temX = iconBt.width * this._temScale;
			// temY = iconBt.height * this._temScale/2;
			// iconBt.setScale(0.7);
			numBg.x = 40;
			numBg.y = iconBt.y + iconBt.height*0.7/2 - numBg.height/2 - 5;
 		}

		 if (itemVo)
		 {
			 if (itemVo.target == 7)
			{
				let picstr = "servant_half_"+itemVo.targetId;
				iconBt.setload(picstr);
				iconBt.setScale(100/180);

				let arry = itemVo.getRewards.split("_");
				let abcfg = GameConfig.config.abilityCfg[arry[1]];
				let framepic = "itemframe"+arry[0]+"_"+abcfg.type;
				let framebg = BaseLoadBitmap.create(framepic);
				framebg.y = 2;
				// framebg.x = 1;
				framebg.setScale(0.5);
				container.addChild(framebg);

				let star = BaseLoadBitmap.create("servant_star");
				star.setPosition(23,77/2);
				star.setScale(0.5);
				container.addChild(star);

				let starnum = ComponentManager.getBitmapText(String(abcfg.num),"tip_fnt");
				starnum.setPosition(star.x+27/2,star.y);
				starnum.setScale(0.5)
				container.addChild(starnum);
			}
			else if (itemVo.target == 8)
			{
				let arry = itemVo.getRewards.split("_");
				let picstr = "wife_half_"+arry[1];
				iconBt.setScale(100/205);
				iconBt.setload(picstr);
				// icon.x = 5;
				// iconBt.y = 5;

				let framepic = "itemframe"+arry[0];
				let framebg = BaseLoadBitmap.create(framepic);
				framebg.y = -1;
				framebg.x = 1;
				framebg.setScale(0.5);
				container.addChild(framebg);
			}
		 }

		let msgTF:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(message,TextFieldConst.FONTNAME_ITEMTIP,TextFieldConst.COLOR_LIGHT_YELLOW,TextFieldConst.FONTSIZE_TITLE_BIG);
		if(PlatformManager.checkIsThSp())
		{
			msgTF = <BaseTextField>msgTF;
			msgTF.bold = true;
		}
		if(iconBt)
		{
			
			temX = iconBt.width * iconBt.scaleX;
			temY = iconBt.height * iconBt.scaleY/2;
		}
		msgTF.x = temX;
		msgTF.y = temY - msgTF.height/2;

		numBg.width = msgTF.width + 50;


		msgTF.x = temX;
		if(iconBt)
		{
			msgTF.y = iconBt.y + iconBt.height*0.7/2 - msgTF.height/2;
			msgTF.y = numBg.y + numBg.height/2 - msgTF.height/2;
		}
		else
		{
			msgTF.x=numBg.x+(numBg.width-msgTF.width)/2;
			msgTF.y = numBg.y + numBg.height/2 - msgTF.height/2;
		}

		container.addChild(msgTF);

		if (isHalve)
		{
			let halve:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("halve"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			halve.setPosition(msgTF.x+msgTF.width+5, msgTF.y+msgTF.height/2 - halve.height/2);
			container.addChild(halve);
		}

		// if(message)
		// {
		// 	let msgTF:BaseTextField = ComponentManager.getTextField(message,30);
		// 	if(iconBt)
		// 	{
				
		// 		temX = iconBt.width * iconBt.scaleX;
		// 		temY = iconBt.height * iconBt.scaleY/2;
		// 	}
		// 	msgTF.x = temX;
		// 	if(iconBt)
		// 	{
		// 		msgTF.y = iconBt.y + iconBt.height*0.7/2 - msgTF.height/2;
		// 	}
		// 	else
		// 	{
		// 		msgTF.x=numBg.x+(numBg.width-msgTF.width)/2;
		// 		msgTF.y = numBg.y + numBg.height/2 - msgTF.height/2;
		// 	}
		// 	container.addChild(msgTF);
		// 	if(msgTF.width+30>numBg.width)
		// 	{
		// 		numBg.width = msgTF.width + 30;
		// 	}
		// }
		container.x = -container.width/2;
		this._tw = egret.Tween.get(container);
		this._tw.to({y:-80},1500).call(this.onComplete,this);
	}

	private onComplete():void
	{
		if(this._tw)
		{
			egret.Tween.removeTweens(this._tw);
			this._tw = null;
		}
		this.dispose();
	}

	public dispose():void
	{
		if(this._tw)
		{
			egret.Tween.removeTweens(this._tw);
			this._tw = null;
		}
		this._temScale = 0.6;
		super.dispose();
	}
}