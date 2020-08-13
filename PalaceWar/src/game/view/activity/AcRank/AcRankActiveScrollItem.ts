/**
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcRankActiveScrollItem
 */
class AcRankActiveScrollItem  extends ScrollListItem
{
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        let rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(data.aid,""+data.code);
        let rList = rankcfg.getRankList();
        
        let key = data.key;
        let rItem = rList[key];
        let id = rItem.id;
        let scroStartY = 10;

        let line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        line1.x = GameConfig.stageWidth/2 - line1.width/2;
        line1.y = scroStartY;
        this.addChild(line1);

        let len = 1;
        if( rItem.reward1 && rItem.reward1 != ""){
            len = 2;
        }

        let txt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_BROWN);
        if (Number(key) < 4){
            txt.text =LanguageManager.getlocal("acRank_rank"+key);
        }else{
            txt.text =LanguageManager.getlocal("acRank_rank4",[String(rItem.minRank),String(rItem.maxRank) ] );
        }

        txt.x = line1.x + line1.width/2 - txt.width/2;
        txt.y = scroStartY + 10 - txt.height/2;
        this.addChild(txt);
           
        let addH = 0;
        if (Number(key) == 1 && (rankcfg.type != 11)){
            let officerTxt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_BROWN);
            officerTxt.text = LanguageManager.getlocal("acRank_getofficer");
            if(len == 2)
            {
                officerTxt.text = LanguageManager.getlocal("acRank_alliance_masterget2");
            }
            officerTxt.x = txt.x + txt.width/2 -officerTxt.width;
            officerTxt.y = txt.y + txt.height + 20;
            this.addChild(officerTxt);
            
            
            let titleImg = App.CommonUtil.getTitlePic(rankcfg.title);
            let deltaV = 0.8;
            titleImg.setScale(deltaV);
            titleImg.x = officerTxt.x + officerTxt.width;
            titleImg.y = officerTxt.y + officerTxt.height/2 - 30 ;
            this.addChild(titleImg);
        }
            
        let rIcons = rItem.rewardIcons;
            
        for (let outIdx = 0; outIdx < len; outIdx++) {
            if(outIdx == 1)
            {
                rIcons = rItem.reward1Icons;
            }
            let innerbg = BaseBitmap.create("public_9_managebg");
            innerbg.width = GameConfig.stageWidth - 50;
            innerbg.height = 125;
            innerbg.x = 25;
            innerbg.y = scroStartY +30 ;
            this.addChild(innerbg);
            
            addH = 0;
            if (Number(key) == 1 && outIdx == 0)
            {
                addH = 35;
                scroStartY += 35 ;
            }

            scroStartY += 40;
            if( len == 2 ){
                let memberGetTxt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_BROWN);
                memberGetTxt.y = innerbg.y + 10;
                if(outIdx == 1){
                    memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_memberget");
                    memberGetTxt.x = innerbg.x + innerbg.width/2 -memberGetTxt.width/2;
                    this.addChild(memberGetTxt);
                    scroStartY += 40;
                }else if(outIdx == 0 && Number(key) >1 ){
                    memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_masterget1");
                    memberGetTxt.x = innerbg.x + innerbg.width/2 -memberGetTxt.width/2;
                    this.addChild(memberGetTxt);
                    scroStartY += 40;
                }
            }
               
            let tmpX = 33;
            for (var idx = 0; idx < rIcons.length; idx++) {
                var element = rIcons[idx];
                element.x = tmpX;
                element.y = scroStartY;
                tmpX +=  (element.width+8);
                //换行处理
                if (tmpX >= GameConfig.stageWidth){
                    tmpX = 33;
                    scroStartY += element.height + 15;
                    element.x = tmpX;
                    element.y = scroStartY;
                    addH += element.height + 15;
                    tmpX +=  (element.width+8);
                }
                this.addChild(element);
            }

            if(len == 2){
                if(outIdx == 0){
                    scroStartY += 105;
                }else{
                    scroStartY += 145;
                }
                if(Number(key) == 1 && outIdx == 0 ){
                }else{
                    addH += 45;
                }
            }else{
                scroStartY += 145;
            }

            innerbg.height += addH+5;
            this.height = innerbg.y + innerbg.height + 15;
        }

        // this.height = innerbg.y + innerbg.height + 10;
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
        super.dispose();
    }
}