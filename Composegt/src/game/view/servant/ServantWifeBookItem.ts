
/**
 * 门客详情 资质信息部分
 * author jiangliuyang
 * 
 * @class ServantWifeBookItem
 */
class ServantWifeBookItem extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _bookNameTxtList = [];
    private _servantInfoObj:any = null;

	private _isPractice:boolean = false;
	private _mainTaskHandKey:string = null;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number,isPractice:boolean = false):void
	{

		
        this._servantId = servantId; 

		//下部信息
		let ability = [];
		let servantCfg = GameConfig.config.servantCfg[this._servantId];


        ability = servantCfg.ability;
		let lineNum = Math.ceil(ability.length/2);

		let starNumTxt:BaseTextField =  null;
		let titleTxt:BaseTextField =  null;
		titleTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		titleTxt.name = "titleTxt";
		titleTxt.x = 160;
		titleTxt.y = 78; 
		this.addChild( titleTxt); 
		
		let posX = 10;
		let posY = 0;
		let totalStar=0;
        let totalBookV = 0;
		//需支持滑动，属性数量并不固定
		let proNode = new BaseDisplayObjectContainer();
		this.addChild(proNode);
		proNode.y = 0;
		// 找第一个未满级的书
		var firstFlag = false;
		var firstPosX = 0;
		var firstPosY = 0;
		var firstIndex2 = -1;
		var firstAttrBg = null;
		for (var index2 = 0; index2 < ability.length; index2++) {


			let aid = ability[index2];
			
			if (index2%2 == 1)
			{
				posX = GameConfig.stageWidth/2+2;
			}else
			{
				posX = 21;
			}
			
			// let probg = "public_listbg";
            // let probg = "public_9v_bg04";
            let probg = "servant_wifebookbg";

			let attrbg = BaseBitmap.create(probg);
			attrbg.width = 297;
			// attrbg.height = 127;
            attrbg.height = 120;
			attrbg.x = posX; 
			attrbg.y = posY;
			proNode.addChild(attrbg);

			let leftBg = BaseBitmap.create("public_left");
			leftBg.width = 119;
			leftBg.height = 108;
			leftBg.x =  attrbg.x+5;
			leftBg.y =  attrbg.y +6;
			proNode.addChild(leftBg);

			let tmpAcfg =undefined;
			let aLv:number =1;
            tmpAcfg = GameConfig.config.abilityCfg[aid];
		
			let attrIcon = BaseBitmap.create("servant_infoPro"+tmpAcfg.type);
			attrIcon.x = posX+15;
			attrIcon.y = posY + attrbg.height/2 -attrIcon.height/2;//-10;
			proNode.addChild(attrIcon);

			let attrColor = TextFieldConst.COLOR_LIGHT_YELLOW;
			if (this._isPractice == false)
			{
				attrColor = TextFieldConst.COLOR_BLACK;

				let starImg = this.getStars(tmpAcfg.num);
				starImg.x = attrIcon.x +attrIcon.width/2 - starImg.width/2+140;
				starImg.y = attrIcon.y + 105-40;
				proNode.addChild(starImg);
				
				//书名字
				let attrNameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
				attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt"+aid) + "Lv"+ String(aLv);
				attrNameTxt.x = attrIcon.x + 47+70-15;
				attrNameTxt.y = posY + 13;
				attrNameTxt.width =175;
				// if(PlatformManager.checkIsViSp()||PlatformManager.checkIsViSp())
				// {
					attrNameTxt.size =18;
				// }
			
				attrNameTxt.textAlign =TextFieldConst.ALIGH_CENTER;
				proNode.addChild(attrNameTxt);
				this._bookNameTxtList.push(attrNameTxt);
			}

			let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + tmpAcfg.type),18,TextFieldConst.COLOR_BROWN);
			attrTxt.x = attrIcon.x + 130;
			if(PlatformManager.checkIsViSp())
			{  
				attrTxt.x = attrIcon.x + 130-3;
			}
			attrTxt.y = attrbg.y + attrbg.height/2 -attrTxt.height/2-40;
			if (this._isPractice == false)
			{
				attrTxt.y = posY + 50;
			}
			proNode.addChild(attrTxt); 

			let attrValueTxt = ComponentManager.getTextField((aLv * tmpAcfg.num).toString(),18,TextFieldConst.COLOR_BROWN);
			attrValueTxt.x = attrTxt.x + attrTxt.width + 15;
			attrValueTxt.y = attrTxt.y;
			proNode.addChild(attrValueTxt);
            this._bookNameTxtList.push(attrValueTxt);
			totalStar += tmpAcfg.num;
			if (index2%2 == 1)
			{
				// posY += 132;
                posY += 125;
			}
            totalBookV += aLv * tmpAcfg.num;

			if(starNumTxt)
			{
				starNumTxt.text = totalStar.toString();
			}
		}






		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH);
		let scrolView = ComponentManager.getScrollView(proNode,rect);
		scrolView.y = 0;
		this.addChild(scrolView);

	

	
    }


    protected getStars(num:number)
	{
		let objContainer = new BaseDisplayObjectContainer;

		for (var index = 1; index <= num; index++) {
			let starImg = BaseBitmap.create("servant_star")
			starImg.setScale(0.6);
			starImg.x = (index-1) * starImg.width*0.6;
			starImg.y = 0;
			objContainer.addChild(starImg);
		}
		return objContainer;
	}




    public dispose()
    {

		this._bookNameTxtList = [];
        this._servantInfoObj = null
		
		this._isPractice = false;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;

        super.dispose();
    }
}