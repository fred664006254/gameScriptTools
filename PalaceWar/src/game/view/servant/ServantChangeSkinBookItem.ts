/**
 * 换装界面 下面的书籍item
 * author shaoliang
 * date 2019/7/12
 * @class ServantChangeSkinBookItem
 */
class ServantChangeSkinBookItem  extends ScrollListItem
{
    public constructor()
    {
        super();
    }

    public initItem(index:number,data:any,parms :any)
    {
        let bookId:string = data;
        let skinId:string = parms[0];
        let isShowStar:boolean = parms[1];
        let attrImg:string = parms[2];
        let bookcfg = GameConfig.config.abilityCfg[bookId];

        if (isShowStar)
        {
            this.width = 290;
        }
        else
        {
            this.width = 245;
        }
        let attrBgStr = "public_9_managebg";
        if (attrImg){
            attrBgStr = attrImg;
        }
        let attrbg = BaseBitmap.create(attrBgStr);
        attrbg.width = this.width-30;
        attrbg.height = 71;
        attrbg.x = 25;
        attrbg.y = 10;
        this.addChild(attrbg);

        let attrIcon = BaseLoadBitmap.create("servant_skin_book"+bookcfg.type);
        this.addChild(attrIcon);

        // if (isShowStar)
        // {
            let starImg = this.getStars(bookcfg.num);
            starImg.x = attrIcon.x +45 - starImg.width/2;
            starImg.y = attrIcon.y + 65;
            this.addChild(starImg);
        // }
        

        let blv = Api.servantVoApi.getSerSkinBookId(skinId,bookId);
        let showCorner = false;
        if ( Api.servantVoApi.getSerSkinBookId2(skinId,bookId))
        {
            showCorner = true;
        }
		if (!blv || !isShowStar)
        {
            blv = 1;
        }

        let attrNameTxt = ComponentManager.getTextField(" ",20,TextFieldConst.COLOR_BROWN);
        if (isShowStar)
        {
            attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt"+bookId)+"Lv"+blv;
        }
        else
        {
            attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt"+bookId);
        }
        attrNameTxt.x = attrIcon.x + 72;
        attrNameTxt.y = attrbg.y+10;
        this.addChild(attrNameTxt);

        let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + bookcfg.type)+bookcfg.num*blv,18,TextFieldConst.COLOR_BROWN);
        attrTxt.x = attrNameTxt.x+13;
        attrTxt.y = attrNameTxt.y + 30;
        this.addChild(attrTxt);

        if (showCorner)
        {
            let corner = BaseLoadBitmap.create("public_got_corner");
            corner.x = attrbg.x+attrbg.width-80;
            corner.y = attrbg.y+attrbg.height-60;
            this.addChild(corner);
        }
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
}