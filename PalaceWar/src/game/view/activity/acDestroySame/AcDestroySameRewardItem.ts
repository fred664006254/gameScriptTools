/**
 * author : qianjun
 * desc : 奖励展示
 */
class AcDestroySameRewardItem  extends ScrollListItem
{
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.DestroySameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDestroySameVo{
        return <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_DESTROYSAME;
    }

    private get code() : string{
        return this._code;
    }
    
        protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                code = `4`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    private _code : string = '';
	protected initItem(index:number,data:Config.AcCfg.DSRechargeItemCfg,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
        let code = view.getUiCode();
		view.width = 530;
		view.height = 250;

        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height;
        this.addChild(bg);

        let typecolor = index + 1;
        // if(Number(code) == 4){
		// 	let color = [];
		// 	switch(Number(view._code)){
		// 		case 4:
		// 		case 5:
		// 			color = [3,1,2];
		// 			break;
		// 		case 6:
		// 		case 7:
		// 			color = [2,4,3];
		// 			break;
		// 		case 8:
		// 		case 9:
		// 			color = [1,2,4];
		// 			break;
		// 		case 10:
		// 		case 11:
		// 			color = [4,3,1];
		// 			break;
		// 	}
		// 	typecolor = color[index];
		// }

        let card = BaseBitmap.create(App.CommonUtil.getResByCode(`destroycard${typecolor}`,code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, card, bg, [15,0]);
        this.addChild(card);
        if(Number(this.getUiCode()) == 3){
            let icon = BaseBitmap.create(`destroybigicon${index + 1}-3`);
            this.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, card, [0,51])

            let eff = `destoysameegg${index + 1}eff`;
            let eggeff = ComponentManager.getCustomMovieClip(eff, 10);
            eggeff.width = 160;
            eggeff.height = 180;
            eggeff.blendMode = egret.BlendMode.ADD;
            this.addChild(eggeff);
            eggeff.playWithTime(-1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, eggeff, card, [0,21]);
        }

        let titlebg = BaseBitmap.create(`countrywarrewardview_itembg`);
        titlebg.scaleX = 340 / titlebg.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titlebg, card, [card.width+3,0]);
        this.addChild(titlebg);

        let line = BaseBitmap.create(`public_line3`);
        this.addChild(line);

        let titletxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroysameicontype${typecolor}`, this.code, code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        line.width = titletxt.width + 270;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, titlebg);
        
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titletxt, titlebg);
        this.addChild(titletxt);

        let itembg = BaseBitmap.create("public_9_managebg");
        itembg.width = 300;
        itembg.height = 195;
        this.addChild(itembg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, itembg, titlebg, [20,titlebg.height+3]);

        let arr = view.cfg[`pumpkinPool${index+1}`];
        let str = ``;
        for(let i in arr){
            if(Number(i) == (arr.length - 1)){
                str += `${arr[i][0]}`;
            }
            else{
                str += `${arr[i][0]}|`;
            }
        }
        let rewardArr =  GameData.formatRewardItem(str);
        let scroStartY = itembg.y+8;
        let len = 3;
        let scalx = 83/108;
        let tmpX = itembg.x + (itembg.width - len * 108 * scalx - (len - 1) * 15) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 10);
            if (tmpX > (itembg.x + itembg.width))
            {
                tmpX = itembg.x + (itembg.width - len * 108 * scalx - (len - 1) * 15) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width  * iconItem.scaleX + 10);
            }
            
            this.addChild(iconItem);
        }
    }

    public getSpaceX():number
    {
        return 0;
    }
    /**
     * 不同格子Y间距
     */
    public getSpaceY():number
    {
        return 5;
    }
    public dispose():void
    {
        // this._lastReqIdx = null;
        super.dispose();
    }
}